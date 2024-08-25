"use client";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { getNextSunday } from "../../lib/utilities";
import { useState } from "react";
import GroupSelect from "./group_select";
import LocationSelect from "../../components/location_select";
import ReactDatePicker from "react-datepicker";
import { useSession } from "next-auth/react";

// This is the component for the form. It uses the React Hook Form
// library for structure and behavior.
export default function SpaceForm({
  locations, // an array of location objects containing their titles and ids
  groups, // an array of groups
  isConflicting, // a boolean that updates to true if the chosen event conflicts with existing events
  onLocationSelect, // callback function to trigger calendar update
  onDateSelect, // callback that adds proposed event to calendar
}) {
  const [submitStatus, setSubmitStatus] = useState("unsubmitted"); // tracks state of form submission API call for loading
  const [showConfirmation, setShowConfirmation] = useState(false); // controls when confirmation box is shown (if there are conflicts)
  const [formData, setFormData] = useState(null); // saves form data on initial submission while user confirms

  // Get user data, determine if they are staff or faculty
  const { data: session } = useSession();
  const user = session?.user;

  // if timezone is not same as Stanford, we track it to warn them
  // that times in the system are all based on local Stanford time
  const isStanfordTimezone = useMemo(() => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const stanfordTimezone = "America/Los_Angeles";
    return userTimezone === stanfordTimezone;
  }, []);

  // prepare React Hook Form methods
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      location: null,
      date: null,
      start: null,
      end: null,
      group: {
        id: null,
        title: null,
      },
      email: user.email,
      title: null,
      description: null,
    },
  });

  // watching for selected location
  const selectedLocation = watch("location");
  useEffect(() => {
    if (selectedLocation && selectedLocation.value) {
      // checking the value property
      onLocationSelect(selectedLocation.value); // pass the value property to the handler
    }
  }, [selectedLocation]);

  // watching for complete date/time
  const selectedDate = watch("date");
  const selectedStart = watch("start");
  const selectedEnd = watch("end");
  useEffect(() => {
    if (selectedDate && selectedStart && selectedEnd) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      const startDate = `${formattedDate}T${selectedStart}`;
      const endDate = `${formattedDate}T${selectedEnd}`;
      onDateSelect(startDate, endDate);
    }
  }, [selectedDate, selectedStart, selectedEnd]);

  const nextSunday = getNextSunday();
  const nextSaturday = new Date(nextSunday);
  nextSaturday.setDate(nextSaturday.getDate() + 6);

  const submitForm = async (data) => {
    if (data.description === "") {
      data.description = "none"; //Notion can't handle an empty string
    }
    // format dates for Notion
    const formattedDate = data.date.toISOString().split("T")[0];
    const startDate = `${formattedDate}T${data.start}`;
    const endDate = `${formattedDate}T${data.end}`;
    const payload = {
      ...data,
      startDate,
      endDate,
    };

    // make API call
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
      } else {
        setSubmitStatus("failure");
      }
    } catch (err) {
      setSubmitStatus("failure");
    }
  };

  // function called on form submission. Handles conflict confirmation
  function onSubmit(data) {
    if (isConflicting) {
      setFormData(data); // Save the form data
      setShowConfirmation(true);
      return;
    }

    submitForm(data);
  }

  function handleConfirmSubmit() {
    if (formData) {
      submitForm(formData);
    }
  }

  // temporary display while API is being called
  if (submitStatus == "submitting") {
    return (
      <div className="flex flex-col justify-center">
        <div className="self-center w-10 h-10 mb-4 border-t-2 border-b-2 border-red-500 -full animate-spin"></div>
        <p className="mb-6 text-xl font-bold text-center">Submitting...</p>
      </div>
    );
  }

  // shown on successful submission (API call successful)
  if (submitStatus == "success") {
    return (
      <div className="flex flex-col justify-center">
        <p className="mb-6 text-xl font-bold text-center">Success!</p>
        <p className="text-center">
          Please check your email for approval/rejection of your request.
        </p>
      </div>
    );
  }

  // shown if API call fails
  if (submitStatus == "failure") {
    return (
      <div className="flex flex-col justify-center">
        <p className="mb-6 text-xl font-bold text-center">
          Something went wrong!
        </p>
        <p className="text-center">Please try again later.</p>
      </div>
    );
  }


  const classnameForInput = "w-full px-3 py-2 leading-tight text-black border appearance-none dark:border-neutral-600 dark:text-white focus:shadow-outline focus:outline-none focus:ring-2 focus:ring-red-700 dark:bg-neutral-900"
  // form jsx
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div style={{ maxWidth: "260px" }} className="m-auto text-base font-normal font-roboto">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {/* Name */}
        <div className="relative mb-4">
          {" "}
          {/* Added relative positioning here */}
          <label htmlFor="title" className="text-neutral-700 dark:text-white">
            Event Title
          </label>
          <input
            type="text"
            id="title"
            maxLength={40}
            {...register("title", {
              required: "Please input a title",
            })}
            className="w-full px-3 py-2 leading-tight text-black border appearance-none dark:border-neutral-600 dark:text-white focus:shadow-outline focus:outline-none focus:ring-2 focus:ring-red-700 dark:bg-neutral-900"
          />
          <span className="absolute text-xs bottom-2 right-3 text-neutral-500">
            {" "}
            {watch("title") ? 40 - watch("title").length : ""}
          </span>
          {errors.title && (
            <p className="px-1 mt-2 text-xs text-red-700 bg-red-100 border border-red-700 ">
              {errors.title.message.toString()}
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
            className={classnameForInput}
          />
          {errors.email && (
            <p className="px-1 mt-2 text-xs text-red-700 bg-red-100 border border-red-700 ">
              {errors.email.message.toString()}
            </p>
          )}
        </div>

        {/* Group */}
        <GroupSelect control={control} groups={groups} />

        {/* Location */}
        <LocationSelect
          control={control}
          locations={locations}
          errors={errors}
          defaultValue={null}
        />

        {/* Date */}
        <div className="mb-4">
          <label htmlFor="date" className="text-neutral-700 dark:text-white">
            Date
          </label>
          <Controller
            control={control}
            name="date"
            rules={{
              required: "Please select a date",
            }}
            render={({ field: { onChange, value } }) => (
              <div className="w-full">
                <ReactDatePicker
                  selected={value}
                  onChange={onChange}
                  minDate={nextSunday}
                  maxDate={nextSaturday}
                  className={classnameForInput}
                />
              </div>
            )}
          />
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
              className={classnameForInput} />
            {errors.start && (
              <p className="px-1 mt-2 text-xs text-red-700 bg-red-100 border border-red-700 ">
                {errors.start.message.toString()}
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
              className={classnameForInput} />
            {errors.end && (
              <p className="px-1 mt-2 text-xs text-red-700 bg-red-100 border border-red-700 ">
                {errors.end.message.toString()}
              </p>
            )}
          </div>
        </div>

        {isConflicting && !showConfirmation && (
          <div className="p-1 px-3 mb-2 border-2 text-s border-amber-600 bg-amber-50 text-amber-600">
            Warning: The selected time conflicts with an existing event!
          </div>
        )}

        {!isStanfordTimezone && (
          <div className=" text-[0.9rem] ">
            Please note that all dates are in Stanford&apos;s time zone
            (PST/PDT).
          </div>
        )}

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="text-neutral-700 dark:text-white"
          >
            Description (optional)
          </label>
          <textarea
            id="description"
            defaultValue=""
            {...register("description")}
            className={classnameForInput} rows={3}
          />
        </div>

        {/* Submit button */}
        {!showConfirmation && (
          <div className="flex items-center justify-between mt-4">
            <input
              type="submit"
              value="Submit Request"
              className="px-4 py-2 font-bold text-white bg-red-700 cursor-pointer -full click-border-red-700 focus:shadow-outline hover:bg-red-700 focus:outline-none"
            />
          </div>
        )}

        {showConfirmation && (
          <div className="p-2 text-black border-2 text-md border-amber-600 bg-amber-50">
            <p className="pb-2">
              Your time conflicts with an existing event on the calendar.
            </p>
            <button
              className="mr-2 -full border-2 border-neutral-700 bg-white px-2 py-0.5 text-neutral-700 hover:bg-neutral-100"
              onClick={() => setShowConfirmation(false)}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 text-white -full bg-amber-600 hover:bg-amber-700"
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
