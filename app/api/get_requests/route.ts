import { notion } from "../notion";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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

  if (!results || results == null) {
    return NextResponse.json({ status: 400 });
  }

  const spaceRequests = results.map((page: any) => ({
    title: page.properties["Title"].title[0]?.text?.content,
    id: page.id,
    start: page.properties["Date"].date?.start,
    end: page.properties["Date"].date?.end,
    locationID: page.properties["Location"].relation[0].id,
    group: page.properties["Group/Organization"].relation[0]?.id,
    description: page.properties["Description"].rich_text[0]?.text?.content,
  }));

  return NextResponse.json({ spaceRequests });
}
