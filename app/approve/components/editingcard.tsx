"use client";
import { useState } from "react";
import ConflictBox from "./conflict";
import MessageBox from "./message_box";
import LocationSelect from "../../components/location_select";
import { useForm, Controller } from "react-hook-form";

// Card displaying properties of the selected request. Option to approve, deny,
// or edit. On selection, calls onEventDecided with result ("approve", "deny", "edit")
export default function EditingCard({ request, locations, onEdited }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm({});

  function onSubmit(data) {
    console.log("submitting", data);
    submitUpdate(data);
  }

  const submitUpdate = async (data) => {
    // format dates for Notion
    console.log(request);
    const formattedDate = request.start.split("T")[0];
    const startDate = `${formattedDate}T${data.start}`; // add selected start time on original date
    const endDate = `${formattedDate}T${data.end}`;
    const pageID = request.id;
    console.log(startDate, endDate, pageID);
    const payload = {
      ...data,
      startDate,
      endDate,
      pageID,
    };

    // make API call
    try {
      const response = await fetch("/api/protected/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        onEdited();
      } else {
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  function handleCancel() {
    console.log("cancel");
    onEdited(false);
  }

  // Function to convert AM/PM format to 24-hour format
  function convertTo24HourFormat(time12Hour) {
    const [time, period] = time12Hour.split(" ");
    const [hours, minutes] = time.split(":");
    let hours24 = parseInt(hours);

    if (period === "PM" && hours24 < 12) {
      hours24 += 12;
    } else if (period === "AM" && hours24 === 12) {
      hours24 = 0;
    }

    const formattedTime = `${hours24.toString().padStart(2, "0")}:${minutes}`;
    return formattedTime;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col flex-1 max-w-2xl px-8 pt-12 mx-4 mt-4 mb-20 overflow-y-auto text-xl bg-white border rounded shadow-lg dark:border-0 dark:bg-neutral-800"
    >
      <h2 className="mb-6 text-4xl font-bold text-center font-roboto">
        {request.title}
      </h2>
      <div className="flex flex-col justify-between w-full pb-4 sm:flex-row">
        <p className="pr-4 mb-2 sm:mb-0">{` ${request.date}`}</p>
        <div className="w-full sm:w-auto">
          <div className="flex flex-col justify-between mb-4 sm:flex-row">
            <div className="w-full pr-0 mb-2 sm:w-1/2 sm:pr-2 sm:mb-0">
              <label
                htmlFor="start"
                className="text-neutral-700 dark:text-white"
              >
                Start
              </label>
              <input
                type="time"
                id="start"
                min="08:00"
                max="23:00"
                defaultValue={convertTo24HourFormat(request.startTime)}
                {...register("start", { required: "required" })}
                className="w-full px-3 py-2 leading-tight text-black border rounded shadow appearance-none focus:shadow-outline focus:outline-none focus:ring-2 focus:ring-red-700"
              />
              {errors.start && (
                <p className="px-1 mt-2 text-xs text-red-700 bg-red-100 border border-red-700 rounded ">
                  {errors.start.message.toString()}
                </p>
              )}
            </div>

            <div className="w-full pl-0 sm:w-1/2 sm:pl-2">
              <label htmlFor="end" className="text-neutral-700 dark:text-white">
                End
              </label>
              <input
                type="time"
                id="end"
                min="08:00"
                max="23:00"
                defaultValue={convertTo24HourFormat(request.endTime)}
                {...register("end", { required: "required" })}
                className="w-full px-3 py-2 leading-tight text-black border rounded shadow appearance-none focus:shadow-outline focus:outline-none focus:ring-2 focus:ring-red-700"
              />
              {errors.end && (
                <p className="px-1 mt-2 text-xs text-red-700 bg-red-100 border border-red-700 rounded ">
                  {errors.end.message.toString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <LocationSelect
        control={control}
        locations={locations}
        errors={errors}
        defaultValue={request.location}
      />

      <p className="pb-4 break-words">{`Contact: ${request.email}`}</p>
      <p className="break-words">Description: {request.description}</p>
      <div className="flex flex-col justify-between w-full pt-8 mb-8 sm:flex-row ">
        <input
          type="submit"
          value="Confirm"
          className="w-full p-2 mb-2 text-white rounded-lg sm:w-36 bg-amber-500 hover:bg-amber-600 hover:shadow-md sm:mb-0"
        />
        <button
          onClick={() => handleCancel()}
          className="w-full p-2 text-white rounded-lg sm:w-36 bg-neutral-500 hover:bg-neutral-600 hover:shadow-md"
        >
          Cancel
        </button>
      </div>
      {request.conflictStatus != "noConflict" && (
        <ConflictBox
          conflicts={request.conflicts}
          status={request.conflictStatus}
        />
      )}
    </form>
  );
}
