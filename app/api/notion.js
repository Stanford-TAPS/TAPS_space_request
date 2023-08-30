import { cache } from "react";
import { Client } from "@notionhq/client";
import { getNextSunday, convertDate } from "../lib/utilities";

const revalidate = 3600 * 60; // default revalidation every hour

export const notion = new Client({
  auth: process.env.NOTION_KEY,
});

export const getNextWeekEvents = async () => {
  const date = new Date();
  const startDate = convertDate(date);
  date.setDate(date.getDate() + 14);
  const endDate = convertDate(date);

  const requestableSpaces = await getRequestableSpaces();
  const requestableLocationIds = requestableSpaces.map((space) => space.id);

  const { results } = await notion.databases.query({
    database_id: process.env.NOTION_EVENTS_ID,
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
            is_not_empty: true,
          },
        },
      ],
    },
  });

  const eventsByLocation = {};

  if (!results) {
    throw new Error("Error fetching next week events");
  }

  results.forEach((page) => {
    const locationId = page.properties["Event Location"].relation[0].id;

    if (requestableLocationIds.includes(locationId)) {
      if (!eventsByLocation[locationId]) {
        eventsByLocation[locationId] = [];
      }

      eventsByLocation[locationId].push({
        title: page.properties["*Record Title"].title[0]?.text?.content,
        start: page.properties["Event Date"].date.start,
        end: page.properties["Event Date"].date.end,
      });
    }
  });
  return eventsByLocation;
};

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
    sorts: [
      {
        property: "Record Name",
        direction: "ascending",
      },
    ],
  });

  if (!results) {
    throw new Error("Error fetching requestable spaces");
  }

  return results.map((page) => ({
    title: page.properties["Record Name"].title[0]?.text?.content,
    id: page.id,
  }));
});

export const getGroups = cache(async () => {
  const databaseId = process.env.NOTION_GROUPS_ID;
  const { results } = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Verified?",
      select: {
        equals: "Yes",
      },
    },
    sorts: [
      {
        property: "Name",
        direction: "ascending",
      },
    ],
  });

  if (!results) {
    throw new Error("Error fetching groups");
  }

  return results.map((page) => ({
    title: page.properties["Name"].title[0]?.text?.content,
    id: page.id,
  }));
});

export const getSpaceRequests = async () => {
  const databaseId = process.env.NOTION_SPACE_REQUESTS_ID;
  const { results } = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Status",
      select: {
        equals: "New",
      },
    },
    sorts: [
      {
        timestamp: "created_time",
        direction: "descending",
      },
    ],
  });

  if (!results) {
    throw new Error("Error fetching space requests");
  }

  return results.map((page) => ({
    title: page.properties["Title"].title[0]?.text?.content,
    id: page.id,
    start: page.properties["Date"].date?.start,
    end: page.properties["Date"].date?.end,
    locationID: page.properties["Location"].relation[0].id,
    group: page.properties["Group/Organization"].relation[0]?.id,
    description: page.properties["Description"].rich_text[0]?.text?.content,
  }));
};

export const getLocationPages = cache(async () => {
  const databaseId = process.env.NOTION_FACILITIES_ID;
  const { results } = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Reservable?",
      select: {
        equals: "Yes",
      },
    },
    sorts: [
      {
        property: "Record Name",
        direction: "ascending",
      },
    ],
  });

  if (!results) {
    throw new Error("Error fetching page data for locations");
  }

  return results.map((page) => ({
    title: page.properties["Record Name"].title[0]?.text?.content,
    id: page.id,
    building: page.properties["Building"].relation[0].id,
    cover: page.cover.file.url,
    tags: page.properties["Tags"].multiselect,
    description: page.properties["Description"].rich_text[0]?.text?.content,
    capacity: page.properties["Capacity"].rich_text[0]?.text?.content,
    isAccessible:
      page.properties["Accessible?"].select?.name == "Accessible"
        ? true
        : false,
  }));
});

export const getCoverImage = async (pageID) => {};
