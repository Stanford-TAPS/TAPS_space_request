import { NextResponse } from "next/server";
import { notion } from "../../notion";

export async function POST(request) {
  try {
    const { pageID, startDate, endDate, location } = await request.json();

    console.log(pageID);
    // Update the request in Notion
    const response = await notion.pages.update({
      page_id: pageID,
      properties: {
        Date: {
          date: {
            start: startDate,
            end: endDate,
            time_zone: "America/Los_Angeles",
          },
        },
        Location: {
          relation: [
            {
              id: location.value,
            },
          ],
        },
      },
    });

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
