import { notion } from "../../../lib/notion";
import { NextResponse } from "next/server";

export async function GET() {
  const databaseId = process.env.NOTION_SPACE_REQUESTS_ID;
  const { results } = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Status",
      select: {
        equals: "New",
      },
    },
  });

  const spaceRequests = results.map((page) => ({
    title: page.properties["Title"].title[0]?.text?.content,
    id: page.id,
    start: page.properties["Date"].date?.start,
    end: page.properties["Date"].date?.end,
    locationID: page.properties["Location"].relation[0].id,
  }));

  return NextResponse.json({ spaceRequests });
}
