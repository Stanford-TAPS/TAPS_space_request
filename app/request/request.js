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

  const checkConflict = (events, startDate, endDate) => {
    const isConflict = events.some((event) => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      return (
        (startDate >= eventStart && startDate < eventEnd) ||
        (endDate > eventStart && endDate <= eventEnd)
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
              let startDate = new Date(requestedEvent.start);
              let endDate = new Date(requestedEvent.end);
              const isConflict = checkConflict(data, startDate, endDate);
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
    //console.log("Date selected!", startDate, endDate);
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
      <SpaceForm
        locations={spaces}
        isConflicting={conflict}
        onLocationSelect={handleLocationSelected}
        onDateSelect={handleDateSelected}
      />
      <div className="absolute right-0 top-20 w-2/3">
        <Calendar
          events={events}
          location={locationTitle}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
