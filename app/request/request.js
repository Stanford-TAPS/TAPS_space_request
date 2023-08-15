"use client";
import Link from "next/link";
import SpaceForm from "./form";
import { useState, useEffect } from "react";
import Calendar from "./calendar";

const CONFLICT_EVENT_COLOR = "#d97706"; // amber 600
const DEFAULT_EVENT_COLOR = "#059669"; // emerald 600

export default function SpaceRequest({ spaces }) {
  const [events, setEvents] = useState([]);
  const [location, setLocation] = useState(null);
  const [locationTitle, setLocationTitle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
  };

  useEffect(() => {
    if (location) {
      setIsLoading(true);
      console.log(`Fetching spaces for location: ${location}`);
      fetch(`/api/spaces/${location}`, {
        method: "GET",
      })
        .then((response) => {
          if (!response.ok) {
            // TODO: better error handling here
            console.log(
              `Failed to fetch spaces for location ${location}: ${response.statusText}`,
            );
            return;
          }
          return response.json();
        })
        .then((data) => {
          // The data of the response contains an array of events for the location
          if (data) {
            let requestedEvent = events.find((event) => event.id == "123");
            if (requestedEvent) {
              const isConflict = checkConflict(
                data,
                requestedEvent.start,
                requestedEvent.end,
              );
              console.log("On location change, conflict status =", isConflict);
              requestedEvent.color = isConflict
                ? CONFLICT_EVENT_COLOR
                : DEFAULT_EVENT_COLOR; // Orange if conflict, else default color
              data.push(requestedEvent);
            }
            console.log("setting events");
            setLocationTitle(
              spaces.find((space) => space.id == location).title,
            ); //search title of selected location
            setEvents(data);
            setIsLoading(false);
          }
        });
    }
  }, [location]);

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
    <div>
      <div
        className={`fixed top-0 z-10 h-full w-full ${
          isOpen ? "" : "hidden"
        } border-r border-neutral-200 bg-white px-10 pb-8 pt-20 shadow-md dark:border-0 dark:bg-neutral-800 md:w-1/2 lg:w-1/3`}
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

      <div className="no-scrollbar absolute right-0 top-20 w-full md:w-1/2 lg:w-2/3">
        <Calendar
          events={events}
          location={locationTitle}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
