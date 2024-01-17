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
      const response = await fetch("/api/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("success");
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
      className="mx-6 mb-20 mt-4 w-1/3 rounded border bg-white px-16 pt-12 text-xl shadow-lg dark:border-0 dark:bg-neutral-800"
    >
      <p className="pb-1 text-sm">
        Warning! This feature doesn&apos;t actually work yet :)
      </p>
      <h2 className="mb-6 text-center font-roboto text-4xl font-bold">
        {request.title}
      </h2>
      <div className="flex w-full justify-between pb-4">
        <p className="pr-4">{` ${request.date}`}</p>
        <div>
          <div className="mb-4 flex justify-between">
            <div className="w-1/2 pr-2">
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
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-black shadow focus:outline-none focus:ring-2 focus:ring-red-700"
              />
              {errors.start && (
                <p className="mt-2 rounded border border-red-700 bg-red-100 px-1 text-xs text-red-700 ">
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
                defaultValue={convertTo24HourFormat(request.endTime)}
                {...register("end", { required: "required" })}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-black shadow focus:outline-none focus:ring-2 focus:ring-red-700"
              />
              {errors.end && (
                <p className="mt-2 rounded border border-red-700 bg-red-100 px-1 text-xs text-red-700 ">
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

      <p className="pb-4">{`Contact: (this is still in progress)`}</p>
      <p>Description: {request.description}</p>
      <div className="mb-8 flex w-full justify-between pt-8 ">
        <input
          type="submit"
          value="Confirm"
          className="w-36 rounded-lg bg-amber-500 p-2 text-white hover:bg-amber-600 hover:shadow-md"
        />
        <button
          onClick={() => handleCancel()}
          className="w-36 rounded-lg bg-neutral-500 p-2 text-white hover:bg-neutral-600 hover:shadow-md"
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
