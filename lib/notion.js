import { cache } from "react";
import { Client } from "@notionhq/client";
import { getNextSunday } from "./utilities";

export const revalidate = 3600; // revalidate the data at most every hour

export const notion = new Client({
  auth: process.env.NOTION_KEY,
});

export const getNextWeekEvents = cache(async (locationID) => {
  const databaseId = process.env.NOTION_EVENTS_ID;
  const date = getNextSunday();
  const startDate = convertDate(date);
  date.setDate(date.getDate() + 7);
  const endDate = convertDate(date);

  const { results } = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "Event Date",
          date: {
            on_or_after: startDate,
          },
        },
        {
          property: "Event Date",
          date: {
            before: endDate,
          },
        },
        {
          property: "Event Location",
          relation: {
            contains: locationID,
          },
        },
      ],
    },
  });

  return results.map((page) => ({
    title: page.properties["*Record Title"].title[0]?.text?.content,
    start: page.properties["Event Date"].date.start,
    end: page.properties["Event Date"].date.end,
  }));
}, revalidate);

export const getRequestableSpaces = cache(async () => {
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

  return results.map((page) => ({
    title: page.properties["Record Name"].title[0]?.text?.content,
    id: page.id,
  }));
}, revalidate);

export const getSpaceRequests = cache(async () => {
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

  return results.map((page) => ({
    title: page.properties["Title"].title[0]?.text?.content,
    id: page.id,
    start: page.properties["Date"].date?.start,
    end: page.properties["Date"].date?.end,
    locationID: page.properties["Location"].relation[0].id,
  }));
}, revalidate);
