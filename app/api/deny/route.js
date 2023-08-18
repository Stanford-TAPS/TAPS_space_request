import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";
import { notion } from "../notion";

export async function POST(request) {
  try {
    const { id } = await request.json();
    const pageId = id;
    const response = await notion.pages.update({
      page_id: pageId,
      properties: {
        Status: {
          select: {
            name: "Denied",
          },
        },
      },
    });
    if (response == {}) {
      return NextResponse.json({ status: 400 });
    }
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
