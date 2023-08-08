import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_KEY });

export async function GET() {
  try {
    const databaseId = process.env.NOTION_FACILITIES_ID;
    const { results } = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Reservable?",
        select: {
          equals: "Yes",
        },
      },
    });
    const data = await results.map((page) => ({
      title: page.properties["Record Name"].title[0]?.text?.content,
      id: page.id,
    }));

    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
