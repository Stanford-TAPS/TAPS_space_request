import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";
import { getNextSunday } from "../../../../lib/utilities";

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_KEY });

export async function GET(request, { params }) {
  try {
    console.log(`API called:`, params);
    const locationID = params.locationID;
    const databaseId = process.env.NOTION_EVENTS_ID;
    // date calculations
    const date = getNextSunday();
    const startDate = date.toISOString();
    date.setDate(date.getDate() + 7);
    const endDate = date.toISOString();

    const { results } = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: "Event Date",
            date: {
              on_or_after: startDate, //next Sunday
            },
          },
          {
            property: "Event Date",
            date: {
              before: endDate, //a week after next Sunday
            },
          },
          {
            property: "Event Location",
            relation: {
              contains: locationID,
            },
          },
        ],
      },
    });

    console.log(`Results from Notion API: `, results);

    //don't map data if no events to format
    if (results.length === 0) {
      return NextResponse.json({ body: [] });
    }
    const data = results.map((page) => ({
      title: page.properties["*Record Title"].title[0]?.text?.content,
      start: page.properties["Event Date"].date.start,
      end: page.properties["Event Date"].date.end,
    }));
    return NextResponse.json(data);
  } catch (error) {
    console.error(
      `Error fetching events for location ${params.locationID}:`,
      error
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
