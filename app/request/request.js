"use client";
import Link from "next/link";
import SpaceForm from "./form";
import { useState, useEffect } from "react";
import Calendar from "./calendar";

export default function SpaceRequest({ spaces }) {
  const [events, setEvents] = useState([]);
  let requestedEvent = null;
  const [location, setLocation] = useState(null);

  // try {
  //   const response = await fetch(`/api/spaces/${locationID}`, {
  //     method: "GET",
  //   });

  //   if (response.ok) {
  //     events = await response.json(); //This is bad!! TODO: fix
  //   } else {
  //     console.log(response);
  //   }
  // } catch (err) {
  //   // Handle exception
  // }

  const handleLocationSelected = async (locationID) => {
    setLocation(locationID);
  };

  useEffect(() => {
    if (location) {
      console.log(`Fetching spaces for location: ${location}`);
      fetch(`/api/spaces/${location}`, {
        method: "GET",
      })
        .then((response) => {
          if (!response.ok) {
            // TODO: better error handling here
            console.log(
              `Failed to fetch spaces for location ${location}: ${response.statusText}`
            );
            return;
          }
          return response.json();
        })
        .then((data) => {
          // The data of the response contains an array of events for the location
          if (data) {
            setEvents(data);
          }
        });
    }
  }, [location]);

  const handleDateSelected = (isValid, startDate, endDate) => {
    //if not valid, change color
    //create event
  };

  return (
    <div>
      <SpaceForm
        locations={spaces}
        onLocationSelect={handleLocationSelected}
        onDateSelect={handleDateSelected}
      />
      <div className="absolute right-0 top-20 w-2/3">
        <Calendar events={events} />
      </div>
    </div>
  );
}
