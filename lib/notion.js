import "server-only";

import { Client } from "@notionhq/client";
import React from "react";
import { getNextSunday } from "./utilities";

export const notion = new Client({
  auth: process.env.NOTION_KEY,
});

export async function getNextWeekEvents(locationID) {
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

  console.log("Notion API called");
  return results.map((page) => ({
    title: page.properties["*Record Title"].title[0]?.text?.content,
    start: page.properties["Date"].date.start,
    end: page.properties["Date"].date.end,
  }));
}

export async function getRequestableSpaces() {
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

  console.log("Notion API called");
  return results.map((page) => ({
    title: page.properties["Record Name"].title[0]?.text?.content,
    id: page.id,
  }));
}

export async function sendSpaceRequest(data) {
  const response = await notion.pages.create({
    parent: { type: "database_id", database_id: NOTION_SPACE_REQUESTS_ID },
    properties: {
      Title: {
        title: [
          {
            text: {
              content: "testing!!!",
            },
          },
        ],
      },
    },
  });
}
