"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Link from "next/link.js";
import Error from "next/error.js";

// Calendar component shows next week view and displays any events in range,
// as well as the location title
export default function SpaceCalendar({
  events, // array of events, organized into FullCalendar's event object structure
  location, // location title
}) {
  if (events == undefined) {
    // handle edge case
    return <Error />;
  }

  return (
    <div className="mx-auto w-1/2 py-6">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
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
