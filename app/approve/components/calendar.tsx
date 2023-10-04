"use client";
import "../../request_calendar_override.css";
import classNames from "classnames";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { getNextSunday } from "../../lib/utilities";
import { filterEventsByLocations } from "../lib/filter_events";

export default function Calendar({
  requests,
  selectedLocations,
  events,
  selectedRequest,
  onRequestSelected,
}) {
  const filteredEvents = filterEventsByLocations(events, selectedLocations);
  const formattedRequests = requests.map((request) => {
    return {
      title: request.title,
      start: request.start,
      end: request.end,
      id: request.id,
      backgroundColor:
        request.conflictStatus === "noConflict"
          ? "#059669"
          : request.conflictStatus === "requestedConflict"
          ? "#d97706"
          : "#dc2626",
      borderColor: "#262626", // neutral-800
      classNames: "clickable-event",
    };
  });

  let formattedEvents = filteredEvents.map((event) => {
    return {
      title: event.title,
      start: event.start,
      end: event.end,
      id: event.id,
      backgroundColor: "#44403c", //neutral-700
      borderColor: "white",
    };
  });

  return (
    <div className="no-scrollbar mt-2 grow overflow-auto rounded p-4 pt-0 shadow-lg outline outline-1 outline-neutral-200 dark:bg-neutral-800 dark:outline-none">
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        initialDate={getNextSunday().toISOString().slice(0, 10)}
        timeZone="America/Los_Angeles"
        contentHeight="auto"
        eventSources={[formattedEvents, formattedRequests]}
        eventColor="#8C1515"
        headerToolbar={{
          start: "",
          center: "",
          end: "",
        }}
        slotMinTime="08:00"
        slotMaxTime="23:00"
        eventClick={(info) => {
          info.jsEvent.preventDefault();
          if (selectedRequest && selectedRequest.id === info.event.id) {
            onRequestSelected(null);
          } else {
            onRequestSelected(
              requests.find((request) => request.id === info.event.id),
            );
          }
        }}
      />
    </div>
  );
}
