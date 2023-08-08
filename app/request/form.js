"use client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

//This is the component for the form
export default function SpaceForm({
  locations, // an array of location objects containing their titles and ids
  onLocationSelect, // callback function to trigger calendar update
  onDateSelect, // callback that adds proposed event to calendar
}) {
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
      const startTime = new Date(`${selectedDate}T${selectedStart}`);
      const endTime = new Date(`${selectedDate}T${selectedEnd}`);
      onDateSelect({ startTime, endTime });
    }
  }, [selectedDate, selectedStart, selectedEnd]);

  // submitted form is posted to Notion
  // TODO: make UX responsive to submitted form
  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log(response);
      } else {
        console.log(response);
      }
    } catch (err) {
      // TODO: Handle exception
    }
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className="fixed top-0 h-full w-1/3 bg-white border-r border-neutral-200 dark:bg-neutral-800 dark:border-0 shadow-md px-10 pt-20 pb-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="mt-20 mb-4">
          <label htmlFor="title" className="text-neutral-700 dark:text-white">
            Event Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="text-neutral-700 dark:text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          />
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && (
            <span className="text-red-700 text-xs italic">
              This field is required
            </span>
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
            {...register("location")}
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
        </div>

        {/* Date */}
        <div className="mb-4">
          <label htmlFor="date" className="text-neutral-700 dark:text-white">
            Date
          </label>
          <input
            type="date"
            id="date"
            {...register("date", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Start time */}
        <div className="mb-4">
          <label htmlFor="start" className="text-neutral-700 dark:text-white">
            Start
          </label>
          <input
            type="time"
            id="start"
            min="08:00"
            max="23:00"
            {...register("start", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* End time */}
        <div className="mb-4">
          <label htmlFor="end" className="text-neutral-700 dark:text-white">
            End
          </label>
          <input
            type="time"
            id="end"
            min="08:00"
            max="23:00"
            {...register("end", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          />
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
