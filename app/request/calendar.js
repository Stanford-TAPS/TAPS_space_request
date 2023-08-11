"use client";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { getNextSunday } from "../../lib/utilities.js";
import Link from "next/link.js";
import Error from "next/error.js";

export default function Calendar({ events, location, isLoading }) {
  console.log(`calendar called with:`, events);
  if (events == undefined) {
    return <Error />;
  }
  if (isLoading) {
    return (
      <div className="mt-20 flex flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold">Loading...</h1>
        <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-blue-500"></div>
      </div>
    );
  }
  if (location == null) {
    return <Default />;
  }

  return (
    <div className="m-2 md:m-8">
      <h1 className="mb-1 text-center text-2xl font-bold">{location}</h1>
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        initialDate={getNextSunday().toISOString().slice(0, 10)}
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
    </div>
  );
}

function Default() {
  return (
    <div className="flex flex-col items-center justify-center space-y-5 p-5">
      <h1 className="text-center text-2xl font-bold md:mt-20">
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
