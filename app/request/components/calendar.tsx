"use client";
import "../../request_calendar_override.css";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { getNextSunday } from "../../lib/utilities";
import Link from "next/link.js";
import Error from "next/error.js";

// Calendar component shows next week view and displays any events in range,
// as well as the location title
export default function Calendar({
  events, // array of events, organized into FullCalendar's event object structure
  location, // location title
}) {
  if (events == undefined) {
    // handle edge case
    return <Error statusCode={500} />;
  }
  if (location == null) {
    // until a location is set, shows a default screen
    return <Default />;
  }

  return (
    <div className="request">
      <h1 className="mb-1 text-2xl font-bold text-center font-roboto md:text-4xl">
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
    </div>
  );
}

// default screen
function Default() {
  return (
    <div className="flex flex-col items-center justify-start h-full p-5 pt-32 space-y-8">
      <h1 className="text-4xl text-center">
        Select a location to view its availability
      </h1>
      <div className="w-24 border-b-2 border-black dark:border-white"></div>
      <div className="w-full text-xl leading-relaxed text-center md:w-2/3">
        Please note that spaces can only be reserved for the following week.
        Available hours may vary by location, but are typically between 8:30 am
        and 10:30 pm.{" "}
        <Link href="/spaces" className="text-blue-500 hover:underline">
          View Spaces
        </Link>{" "}
        for more information on individual spaces, and review our{" "}
        <a
          className="text-blue-500 hover:underline"
          target="_blank"
          href="https://taps.stanford.edu/space-usage/"
        >
          Space Use Policy
        </a>{" "}
        for guidelines on space usage.
      </div>
    </div>
  );
}
