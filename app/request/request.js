"use client";
import Link from "next/link";
import SpaceForm from "./form";
import { useState, useLayoutEffect } from "react";
import Calendar from "./calendar";

export default function SpaceRequest({ spaces }) {
  let events = [];
  let requestedEvent = null;

  // useLayoutEffect(() => {
  //   let ignore = false;
  //   fetch("/api/spaces", {
  //     method: "GET",
  //   }).then((result) => {
  //     if (!ignore) {
  //       setSpaces(result);
  //     }
  //   });
  //   return () => {
  //     ignore = true;
  //   };
  // }, []);

  const handleLocationSelected = (locationID) => {
    console.log(locationID);
    //set loading
    //call notion api
    //if success, update loading, events
    //if fail, set error
  };

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
