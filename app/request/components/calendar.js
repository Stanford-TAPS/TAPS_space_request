"use client";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { getNextSunday } from "../../lib/utilities";
import Link from "next/link.js";
import Error from "next/error.js";

export default function Calendar({ events, location }) {
  console.log(`calendar called with:`, events);
  if (events == undefined) {
    return <Error />;
  }
  if (location == null) {
    return <Default />;
  }

  return (
    <>
      <h1 className="font-playfair mb-1 text-center text-2xl font-bold md:text-4xl">
        {location}
      </h1>
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        initialDate={getNextSunday().toISOString().slice(0, 10)}
        timeZone="America/Los_Angeles"
        contentHeight="auto"
        events={events}
        eventColor="#8C1515"
        headerToolbar={{
          start: "",
          center: "title",
          end: "",
        }}
        slotMinTime="08:00"
        slotMaxTime="23:00"
      />
    </>
  );
}

function Default() {
  return (
    <div className="flex h-full flex-col items-center justify-start space-y-8 p-5 pt-32">
      <h1 className="font-playfair text-center text-3xl font-bold ">
        Select a location to view its availability
      </h1>
      <div className="w-full rounded border border-gray-200 p-5 shadow md:w-2/3 lg:w-1/2">
        <p className="mb-4">
          Please note that spaces can only be reserved for the following week.
          Available hours may vary by location, but are typically between 8:30
          am and 10:30 pm.{" "}
          <Link href="/view" className="text-blue-500 hover:underline">
            View Spaces
          </Link>{" "}
          for more information on individual spaces.
        </p>
      </div>
    </div>
  );
}
