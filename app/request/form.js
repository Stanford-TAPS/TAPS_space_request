"use client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { getNextSunday } from "../../lib/utilities";
import { useState } from "react";

//This is the component for the form
export default function SpaceForm({
  locations, // an array of location objects containing their titles and ids
  onLocationSelect, // callback function to trigger calendar update
  onDateSelect, // callback that adds proposed event to calendar
}) {
  const [submitStatus, setSubmitStatus] = useState("unsubmitted");
  // prepare React Hook Form methods
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({});

  // watching for selected location
  const selectedLocation = watch("location");
  useEffect(() => {
    if (selectedLocation && selectedLocation !== "default") {
      onLocationSelect(selectedLocation);
    }
  }, [selectedLocation]);

  // watching for complete date/time
  const selectedDate = watch("date");
  const selectedStart = watch("start");
  const selectedEnd = watch("end");
  useEffect(() => {
    if (selectedDate && selectedStart && selectedEnd) {
      const startDate = new Date(`${selectedDate}T${selectedStart}`);
      const endDate = new Date(`${selectedDate}T${selectedEnd}`);
      onDateSelect(startDate, endDate);
    }
  }, [selectedDate, selectedStart, selectedEnd]);

  // validating date is within next Sunday - Saturday week
  const validateDate = (value) => {
    const selectedDate = new Date(value);
    const nextSunday = getNextSunday();
    const nextSaturday = new Date(nextSunday);
    nextSaturday.setDate(nextSaturday.getDate() + 6);

    return (
      (selectedDate >= nextSunday && selectedDate <= nextSaturday) ||
      "Date must be for next week"
    );
  };

  // validating that a location has been selected
  const validateLocation = (value) => {
    return value !== "default" || "Please select a location";
  };

  // submitted form is posted to Notion
  // TODO: make UX responsive to submitted form
  const onSubmit = async (data) => {
    // format dates for Notion
    const startDate = new Date(`${data.date}T${data.start}`).toISOString();
    const endDate = new Date(`${data.date}T${data.end}`).toISOString();
    const payload = {
      ...data,
      startDate,
      endDate,
    };
    setSubmitStatus("submitting");
    try {
      const response = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        //setSubmitStatus("success");
        console.log(response);
      } else {
        setSubmitStatus("failure");
        console.log(response);
      }
    } catch (err) {
      setSubmitStatus("failure");
      console.log(err);
    }
  };

  if (submitStatus == "submitting") {
    return (
      <div className="fixed top-0 h-full w-1/3 bg-white border-r border-neutral-200 dark:bg-neutral-800 dark:border-0 shadow-md px-10 pb-8 flex flex-col justify-center align-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-500 self-center mb-4"></div>
        <p className="text-xl font-bold text-center mb-6">Submitting...</p>
      </div>
    );
  }
  if (submitStatus == "success") {
    return (
      <div className="fixed top-0 h-full w-1/3 bg-white border-r border-neutral-200 dark:bg-neutral-800 dark:border-0 shadow-md px-10 pb-8 flex flex-col justify-center">
        <p className="text-xl font-bold text-center mb-6">Success!</p>
        <p className="text-center">
          Please check your email for approval/rejection of your request.
        </p>
      </div>
    );
  }
  if (submitStatus == "failure") {
    return (
      <div className="fixed top-0 h-full w-1/3 bg-white border-r border-neutral-200 dark:bg-neutral-800 dark:border-0 shadow-md px-10 pb-8 flex flex-col justify-center">
        <p className="text-xl font-bold text-center mb-6">
          Something went wrong!
        </p>
        <p className="text-center">Please try again later.</p>
      </div>
    );
  }

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className="fixed top-0 h-full w-1/3 bg-white border-r border-neutral-200 dark:bg-neutral-800 dark:border-0 shadow-md px-10 pt-20 pb-8">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {/* Name */}
        <div className="mt-20 mb-4">
          <label htmlFor="title" className="text-neutral-700 dark:text-white">
            Event Title
          </label>
          <input
            type="text"
            id="title"
            maxLength="25"
            {...register("title", {
              required: "Please input a title",
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.title && (
            <p className="text-red-700 text-xs px-1 bg-white mt-1 rounded outline">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="text" className="text-neutral-700 dark:text-white">
            Email
          </label>
          <input
            type="text"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@stanford\.edu$/i,
                message: "Please use your Stanford email address",
              },
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.email && (
            <p className="text-red-700 text-xs px-1 bg-white mt-1 rounded outline">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div className="mb-4">
          <label
            htmlFor="location"
            className="text-neutral-700 dark:text-white"
          >
            Location
          </label>
          <select
            {...register("location", {
              validate: validateLocation,
            })}
            defaultValue={"default"}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="default" disabled hidden>
              -Select a space-
            </option>
            {locations.map((location, index) => (
              <option key={index} value={location.id}>
                {location.title}
              </option>
            ))}
          </select>
          {errors.location && (
            <p className="text-red-700 text-xs px-1 bg-white mt-1 rounded outline">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Date */}
        <div className="mb-4">
          <label htmlFor="date" className="text-neutral-700 dark:text-white">
            Date
          </label>
          <input
            type="date"
            id="date"
            {...register("date", {
              required: "Please select a date",
              validate: validateDate,
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.date && (
            <p className="text-red-700 text-xs px-1 bg-white mt-1 rounded outline">
              {errors.date.message}
            </p>
          )}
        </div>

        <div className="flex justify-between mb-4">
          <div className="w-1/2 pr-2">
            <label htmlFor="start" className="text-neutral-700 dark:text-white">
              Start
            </label>
            <input
              type="time"
              id="start"
              min="08:00"
              max="23:00"
              {...register("start", { required: "required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.start && (
              <p className="text-red-700 text-xs px-1 bg-white mt-1 rounded outline">
                {errors.start.message}
              </p>
            )}
          </div>

          <div className="w-1/2 pl-2">
            <label htmlFor="end" className="text-neutral-700 dark:text-white">
              End
            </label>
            <input
              type="time"
              id="end"
              min="08:00"
              max="23:00"
              {...register("end", { required: "required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.end && (
              <p className="text-red-700 text-xs px-1 bg-white mt-1 rounded outline">
                {errors.end.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit button */}
        <div className="flex items-center justify-between">
          <input
            type="submit"
            value="Submit Request"
            className="bg-red-700 hover:bg-red-700 click-border-red-700 cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          />
        </div>
      </form>
    </div>
  );
}
