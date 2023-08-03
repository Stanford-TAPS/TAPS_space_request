import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";
import { getNextSunday } from "../lib/utilities.js";

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_KEY });

export async function GET(request) {
  console.log("got this far :D");
  try {
    const { id } = await request.json();
    const databaseId = process.env.NOTION_EVENTS_ID;

    //date calculations
    const date = getNextSunday();
    const startDate = date.toISOString();
    date.setDate(date.getDate() + 7);
    const endDate = date.toISOString();

    const { results } = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: "Date",
            date: {
              on_or_after: startDate, //next Sunday
            },
          },
          {
            property: "Date",
            date: {
              before: endDate, //a week after next Sunday
            },
          },
          {
            property: "Location",
            relation: {
              contains: locationID,
            },
          },
        ],
      },
    });

    const events = results.map((page) => ({
      title: page.properties["*Record Title"].title[0]?.text?.content,
      start: page.properties["Date"].date.start,
      end: page.properties["Date"].date.end,
    }));

    return NextResponse.json({ body: events, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
