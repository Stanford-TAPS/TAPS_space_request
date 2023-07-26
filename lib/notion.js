import "server-only";

import { Client } from "@notionhq/client";
import React from "react";

export const notion = new Client({
  auth: process.env.NOTION_KEY,
});

function getNextSunday() {
  const today = new Date();
  const currentDay = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  const daysUntilNextSunday = 7 - currentDay; // Days remaining until next Sunday
  const nextSunday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + daysUntilNextSunday
  );

  return nextSunday;
}

export async function getNextWeekEvents() {
  const databaseId = process.env.NOTION_DATABASE_ID;

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
            contains: "bfa2adbab9424825bc15e06d5bc376d6", //Pigott Theater, hopefully
          },
        },
      ],
    },
  });

  console.log(results[1].properties["*Record Title"].title[0]?.text?.content);
  return results.map((page) => ({
    title: page.properties["*Record Title"].title[0]?.text?.content,
    start: page.properties["Date"].date.start,
    end: page.properties["Date"].date.end,
  }));
}
