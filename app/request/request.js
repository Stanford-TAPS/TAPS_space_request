"use client";
import Link from "next/link";
import SpaceForm from "./form";
import { useState, useEffect } from "react";
import Calendar from "./calendar";

const CONFLICT_EVENT_COLOR = "#d97706"; // amber 600
const DEFAULT_EVENT_COLOR = "#059669"; // emerald 600

export default function SpaceRequest({ spaces, eventsByLocation }) {
  const [events, setEvents] = useState([]);
  const [location, setLocation] = useState(null);
  const [locationTitle, setLocationTitle] = useState(null);
  const [conflict, setConflict] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const checkConflict = (events, startDate, endDate) => {
    const isConflict = events.some((event) => {
      if (event.id === "123") return false;
      return (
        (startDate >= event.start && startDate < event.end) ||
        (endDate > event.start && endDate <= event.end)
      );
    });

    setConflict(isConflict);
    return isConflict;
  };

  const handleLocationSelected = (locationID) => {
    setLocation(locationID);
    const data = eventsByLocation[locationID]; // Access events directly from eventsByLocation
    if (data) {
      let requestedEvent = events.find((event) => event.id == "123");
      if (requestedEvent) {
        const isConflict = checkConflict(
          data,
          requestedEvent.start,
          requestedEvent.end,
        );
        requestedEvent.color = isConflict
          ? CONFLICT_EVENT_COLOR
          : DEFAULT_EVENT_COLOR;
        data.push(requestedEvent);
      }
      setLocationTitle(spaces.find((space) => space.id == locationID).title); // search title of selected location
      setEvents(data);
    } else {
      setLocationTitle(spaces.find((space) => space.id == locationID).title); // search title of selected location
      setEvents([]);
    }
  };

  const handleDateSelected = (startDate, endDate) => {
    console.log("Date selected!", startDate, endDate);
    const isConflict = checkConflict(events, startDate, endDate);
    const eventColor = isConflict ? CONFLICT_EVENT_COLOR : DEFAULT_EVENT_COLOR; // Orange if conflict, else default color

    let requestedEvent = events.find((event) => event.id == "123");
    if (requestedEvent) {
      const newEvents = events.map((event) => {
        if (event.id === "123") {
          return {
            ...event,
            start: startDate,
            end: endDate,
            color: eventColor,
          };
        } else {
          return event;
        }
      });
      console.log(newEvents);
      setEvents(newEvents);
    } else {
      // Otherwise, create a new event object with the given start and end dates
      requestedEvent = {
        id: "123",
        title: "[Your Event]",
        start: startDate,
        end: endDate,
        color: eventColor,
      };

      // Add the new editable event to the events array
      setEvents([...events, requestedEvent]);
    }
  };

  return (
    <div className="flex h-full flex-row justify-stretch">
      <div
        className={`h-full w-full ${
          isOpen ? "" : "hidden"
        } border-r border-neutral-200 bg-white p-10 shadow-md dark:border-0 dark:bg-neutral-800 md:w-1/2 lg:w-1/4`}
      >
        <SpaceForm
          locations={spaces}
          isConflicting={conflict}
          onLocationSelect={handleLocationSelected}
          onDateSelect={handleDateSelected}
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute bottom-0 right-6 rounded-t bg-emerald-600 px-6 py-2 text-lg dark:bg-black md:hidden"
        >
          View Calendar
        </button>
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-0 mt-14 rounded bg-emerald-600 px-4 py-1 dark:bg-neutral-800 md:hidden"
      >
        View Form
      </button>

      <div className="no-scrollbar h-full w-full overflow-scroll p-10 md:w-1/2 lg:w-3/4">
        <Calendar events={events} location={locationTitle} />
      </div>
    </div>
  );
}
