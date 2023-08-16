"use client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { convertDate, getNextSunday } from "../lib/utilities";
import { useState } from "react";

//This is the component for the form
export default function SpaceForm({
  locations, // an array of location objects containing their titles and ids
  isConflicting, // a boolean that updates to true if the chosen event conflicts with existing events
  onLocationSelect, // callback function to trigger calendar update
  onDateSelect, // callback that adds proposed event to calendar
}) {
  const [submitStatus, setSubmitStatus] = useState("unsubmitted");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState(null);
  const [isStanfordTimezone, setIsStanfordTimezone] = useState(null);

  // if timezone is not same as Stanford, we need a warning
  useEffect(() => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const stanfordTimezone = "America/Los_Angeles";
    setIsStanfordTimezone(userTimezone === stanfordTimezone);
  }, []);

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
      const startDate = `${selectedDate}T${selectedStart}`;
      const endDate = `${selectedDate}T${selectedEnd}`;
      onDateSelect(startDate, endDate);
    }
  }, [selectedDate, selectedStart, selectedEnd]);

  // validating date is within next Sunday - Saturday week
  // TODO: Fix so it actually works right :)
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

  const submitForm = async (data) => {
    // format dates for Notion
    const startDate = `${data.date}T${data.start}`;
    const endDate = `${data.date}T${data.end}`;
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
        setSubmitStatus("success");
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

  const onSubmit = (data) => {
    if (isConflicting) {
      setFormData(data); // Save the form data
      setShowConfirmation(true);
      return;
    }

    submitForm(data);
  };

  const handleConfirmSubmit = () => {
    if (formData) {
      submitForm(formData);
    }
  };

  if (submitStatus == "submitting") {
    return (
      <div className="flex flex-col justify-center">
        <div className="mb-4 h-10 w-10 animate-spin self-center rounded-full border-b-2 border-t-2 border-red-500"></div>
        <p className="mb-6 text-center text-xl font-bold">Submitting...</p>
      </div>
    );
  }
  if (submitStatus == "success") {
    return (
      <div className="flex flex-col justify-center">
        <p className="mb-6 text-center text-xl font-bold">Success!</p>
        <p className="text-center">
          Please check your email for approval/rejection of your request.
        </p>
      </div>
    );
  }
  if (submitStatus == "failure") {
    return (
      <div className="flex flex-col justify-center">
        <p className="mb-6 text-center text-xl font-bold">
          Something went wrong!
        </p>
        <p className="text-center">Please try again later.</p>
      </div>
    );
  }

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div style={{ maxWidth: "260px" }} className="mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {/* Name */}
        <div className="mt:10 relative mb-4 md:mt-20">
          {" "}
          {/* Added relative positioning here */}
          <label htmlFor="title" className="text-neutral-700 dark:text-white">
            Event Title
          </label>
          <input
            type="text"
            id="title"
            maxLength="40"
            {...register("title", {
              required: "Please input a title",
            })}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-black shadow focus:outline-none"
          />
          <span className="absolute bottom-2 right-3 text-xs text-neutral-500">
            {" "}
            {/* Added absolute positioning here */}
            {watch("title") ? 40 - watch("title").length : ""}
          </span>
          {errors.title && (
            <p className="mt-2 rounded border border-red-700 bg-red-100 px-1 text-xs text-red-700">
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
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-black shadow focus:outline-none"
          />
          {errors.email && (
            <p className=" mt-2 rounded border border-red-700 bg-red-100 px-1 text-xs text-red-700">
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
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-black shadow focus:outline-none"
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
            <p className=" mt-2 rounded border border-red-700 bg-red-100 px-1 text-xs text-red-700">
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
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-black shadow focus:outline-none"
          />
          {errors.date && (
            <p className=" mt-2 rounded border border-red-700 bg-red-100 px-1 text-xs text-red-700">
              {errors.date.message}
            </p>
          )}
        </div>

        <div className="mb-4 flex justify-between">
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
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-black shadow focus:outline-none"
            />
            {errors.start && (
              <p className=" mt-2 rounded border border-red-700 bg-red-100 px-1 text-xs text-red-700">
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
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-black shadow focus:outline-none"
            />
            {errors.end && (
              <p className=" mt-2 rounded border border-red-700 bg-red-100 px-1 text-xs text-red-700">
                {errors.end.message}
              </p>
            )}
          </div>
        </div>

        {isConflicting && !showConfirmation && (
          <div className="text-s mb-2 rounded border-2 border-amber-600 bg-amber-50 p-1 px-3 text-amber-600">
            Warning: The selected time conflicts with an existing event!
          </div>
        )}

        {!isStanfordTimezone && (
          <div className=" text-[0.9rem] ">
            Please note that all dates are in Stanford's time zone (PST/PDT).
          </div>
        )}

        {/* Submit button */}
        {!showConfirmation && (
          <div className="mt-4 flex items-center justify-between">
            <input
              type="submit"
              value="Submit Request"
              className="click-border-red-700 focus:shadow-outline cursor-pointer rounded-full bg-red-700 px-4 py-2 font-bold text-white hover:bg-red-700 focus:outline-none"
            />
          </div>
        )}

        {showConfirmation && (
          <div className="text-md rounded border-2 border-amber-600 bg-amber-50 p-2 text-black">
            <p className="pb-2">
              Your time conflicts with an existing event on the calendar.
            </p>
            <button
              className="mr-2 rounded-full border-2 border-neutral-700 bg-white px-2 py-0.5 text-neutral-700 hover:bg-neutral-100"
              onClick={() => setShowConfirmation(false)}
            >
              Cancel
            </button>
            <button
              className="rounded-full bg-amber-600 px-3 py-1 text-white hover:bg-amber-700"
              onClick={handleConfirmSubmit}
            >
              Submit Anyway
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
