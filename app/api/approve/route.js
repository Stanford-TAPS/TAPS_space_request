import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_KEY });

export async function POST(request) {
  try {
    console.log("calling Notion");
    const { title, locationID, start, end } = await request.json();

    const newPage = {
      parent: {
        type: "database_id",
        database_id: process.env.NOTION_EVENTS_ID,
      },
      properties: {
        "*Record Title": {
          title: [
            {
              type: "text",
              text: { content: title },
            },
          ],
        },
        "*Record Type": {
          multi_select: [
            {
              name: "Space Booking",
            },
          ],
        },
        // Email: {
        //   email: email,    TODO: Search for contacts, then assign new contact if nonexistant
        // },
        "Event Location": {
          relation: [
            {
              id: locationID,
            },
          ],
        },
        "Event Date": {
          date: {
            start: start,
            end: end,
          },
        },
      },
    };
    // Create the page in Notion
    const response = await notion.pages.create(newPage);
    console.log("Notion called");

    return NextResponse.json({ status: response.status });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
