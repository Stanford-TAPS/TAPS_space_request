import { cache } from "react";
import { Client } from "@notionhq/client";
import { convertDate } from "../lib/utilities";

const revalidate = 60 * 60; // 1 hour

export const notion = new Client({
  auth: process.env.NOTION_KEY,
});

export const getNextWeekEvents = cache(async () => {
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

  results.forEach((page: any) => {
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
});

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

  return results.map((page: any) => ({
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

  return results.map((page: any) => ({
    title: page.properties["Name"].title[0]?.text?.content,
    id: page.id,
    image: page.icon?.file.url,
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

  return results.map((page: any) => ({
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

  return results.map((page: any) => ({
    title: page.properties["Record Name"].title[0]?.text?.content,
    id: page.id,
    building: page.properties["Building"].relation[0].id,
    cover: page.cover.file.url,
    tags: page.properties["Tags"].multi_select,
    description: page.properties["Description"].rich_text[0]?.text?.content,
    capacity: page.properties["Capacity"].rich_text[0]?.text?.content,
    isAccessible: page.properties["Accessible?"].select?.name == "Accessible"
      ? true
      : false,
  }));
});

export const getNextMonthEvents = cache(async (locationID) => {
  const { results } = await notion.databases.query({
    database_id: process.env.NOTION_EVENTS_ID,
    filter: {
      and: [
        {
          property: "Event Location",
          relation: {
            contains: locationID,
          },
        },
        {
          or: [
            {
              property: "Event Date",
              date: {
                past_month: {},
              },
            },
            {
              property: "Event Date",
              date: {
                next_month: {},
              },
            },
          ],
        },
      ],
    },
  });

  if (!results) {
    throw new Error("Error fetching next week events");
  }

  const events = [];

  results.forEach((page: any) => {
    events.push({
      title: page.properties["*Record Title"].title[0]?.text?.content,
      start: page.properties["Event Date"].date.start,
      end: page.properties["Event Date"].date.end,
    });
  });

  return events;
});

export const getAllEvents = cache(async () => {
  const requestableSpaces = await getRequestableSpaces();
  const requestableLocationIds = requestableSpaces.map((space) => space.id);

  const { results } = await notion.databases.query({
    database_id: process.env.NOTION_EVENTS_ID,
    filter: {
      and: [
        {
          or: [
            {
              property: "Event Date",
              date: {
                past_month: {},
              },
            },
            {
              property: "Event Date",
              date: {
                next_month: {},
              },
            },
          ],
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

  let events = [];
  results.forEach((page: any) => {
    events.push({
      title: page.properties["*Record Title"].title[0]?.text?.content,
      locationID: page.properties["Event Location"].relation[0].id,
      start: page.properties["Event Date"].date.start,
      end: page.properties["Event Date"].date.end,
    });
  });
  return events;
});
