import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_KEY });

export async function POST(request) {
  try {
    const { title, email, location, startDate, endDate, timeZone } =
      await request.json();

    const newPage = {
      parent: {
        type: "database_id",
        database_id: process.env.NOTION_SPACE_REQUESTS_ID,
      },
      properties: {
        Title: {
          title: [
            {
              type: "text",
              text: { content: title },
            },
          ],
        },
        Email: {
          email: email,
        },
        Location: {
          relation: [
            {
              id: location,
            },
          ],
        },
        Date: {
          date: {
            start: startDate,
            end: endDate,
            time_zone: "America/Los_Angeles",
          },
        },
        Status: {
          select: {
            name: "New",
          },
        },
      },
    };
    // Create the page in Notion
    const response = await notion.pages.create(newPage);

    return NextResponse.json({ status: response.status });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
