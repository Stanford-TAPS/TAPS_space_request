import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";
import { notion } from "../notion";

export async function POST(request) {
  try {
    const {
      title,
      email,
      group,
      location,
      startDate,
      endDate,
      description,
      timeZone,
    } = await request.json();

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
              id: location.value,
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
        Description: {
          rich_text: [
            {
              type: "text",
              text: {
                content: description,
              },
            },
          ],
        },
        Status: {
          select: {
            name: "New",
          },
        },
      },
    };

    // Add group only if it is not null
    if (group && group.value) {
      newPage.properties["Group/Organization"] = {
        relation: [
          {
            id: group.value,
          },
        ],
      };
    }

    // Create the page in Notion
    const response = await notion.pages.create(newPage as any);

    if (response == null) {
      return NextResponse.json({ status: 400 });
    }
    if ((response as any).status) {
      return NextResponse.json({ status: (response as any).status });
    }
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
