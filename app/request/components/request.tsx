"use client";
import { useState, useEffect } from "react";
import SpaceForm from "./form";
import Calendar from "./calendar";

const CONFLICT_EVENT_COLOR = "#d97706"; // amber 600
const DEFAULT_EVENT_COLOR = "#059669"; // emerald 600

// Handles logic and state of the space request system
export default function SpaceRequest({ spaces, eventsByLocation, groups }) {
  const [locationTitle, setLocationTitle] = useState(null);
  const [events, setEvents] = useState([]); // holds events for the selected location
  const [conflict, setConflict] = useState(false); // tracks whether the request date/time conflitcs with an existing event
  const [isOpen, setIsOpen] = useState(true); // (for mobile) tracks whether the form is open/visible

  // checking if the selected time conflicts with an event
  const checkConflict = (events, startDate, endDate) => {
    const isConflict = events.some((event) => {
      if (event.id === "123") return false; // tracking event using id 123. TODO: change to event sources
      return startDate < event.end && endDate > event.start;
    });

    setConflict(isConflict);
    return isConflict;
  };

  // when a location is selected, grabs events for the location, rechecks conflict, and
  // finds title data for calendar
  const handleLocationSelected = (locationID) => {
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

  // when a full date is selected, this rechecks for a conflict
  // and changes the event color based on conflict status
  const handleDateSelected = (startDate, endDate) => {
    const isConflict = checkConflict(events, startDate, endDate);
    const eventColor = isConflict ? CONFLICT_EVENT_COLOR : DEFAULT_EVENT_COLOR; // Orange if conflict, else default color

    let requestedEvent = events.find((event) => event.id == "123");
    if (requestedEvent) {
      // edit existing event
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
      setEvents(newEvents);
    } else {
      // if no existing event, create one
      requestedEvent = {
        id: "123",
        title: "[Your Event]",
        start: startDate,
        end: endDate,
        color: eventColor,
      };

      // Add the new event to the events array
      setEvents([...events, requestedEvent]);
    }
  };

  return (
    <div className="flex flex-row h-full justify-stretch md:flex-row">
      <div
        className={`h-full w-full ${isOpen || (isOpen === false && isOpen) ? "" : "hidden"
          } overflow-auto border-r border-neutral-200 bg-white p-10 shadow-md dark:border-0 dark:bg-neutral-800 md:block md:w-1/2 lg:w-1/4`}
      >
        <SpaceForm
          locations={spaces}
          groups={groups}
          isConflicting={conflict}
          onLocationSelect={handleLocationSelected}
          onDateSelect={handleDateSelected}
        />
        <button
          onClick={() => setIsOpen(false)}
          className="absolute bottom-0 px-6 py-2 text-lg right-6 bg-emerald-600 dark:bg-black md:hidden"
        >
          View Calendar
        </button>
      </div>
      <button
        onClick={() => setIsOpen(true)}
        className={`absolute right-6 top-0 text-lg bg-emerald-600 px-6 py-2 dark:bg-neutral-800 ${isOpen ? "hidden" : ""
          } md:hidden`}
      >
        View Form
      </button>

      <div
        className={`no-scrollbar h-full w-full overflow-scroll py-8 md:w-1/2 md:p-16 lg:w-3/4 ${isOpen ? "hidden md:block" : "md:block"
          }`}
      >
        <Calendar events={events} location={locationTitle} />
      </div>
    </div>
  );
}
