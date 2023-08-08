import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_KEY });

export async function POST(request) {
  try {
    const { title, email, location } = await request.json();

    const result = {
      title: title,
      email: email,
      location: location,
    };

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
      },
    };
    // Create the page in Notion
    const response = await notion.pages.create(newPage);

    return NextResponse.json({ status: response.status });
  } catch (error) {
    console.log(" D: ");
    console.log(error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
