"use client";
import { useState } from "react";
import ConflictBox from "./conflict";
import MessageBox from "./message_box";
import LocationSelect from "../../components/location_select";
import { useForm, Controller } from "react-hook-form";
import EditingCard from "./editingcard";

// Card displaying properties of the selected request. Option to approve, deny,
// or edit. On selection, calls onEventDecided with result ("approve", "deny", "edit")
export default function RequestCard({
  request,
  locations,
  onDecision,
  onEdited,
}) {
  const [decision, setDecision] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  function handleEdited() {
    setIsEditing(false);
    onEdited();
  }

  function handleConfirm(message) {
    onDecision(decision, message);
  }

  function handleCancel() {
    setDecision(null);
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
    <>
      {isEditing ? (
        <EditingCard
          request={request}
          locations={locations}
          onEdited={handleEdited}
        />
      ) : (
        <>
          <div className="mx-6 mb-20 mt-4 w-1/3 rounded border bg-white px-16 pt-12 text-xl shadow-lg dark:border-0 dark:bg-neutral-800">
            <h2 className="mb-6 text-center font-roboto text-4xl font-bold">
              {request.title}
            </h2>
            <div className="flex w-full justify-between pb-4">
              <p className="pr-4">{` ${request.date}`}</p>
              <p>{`${request.startTime} - ${request.endTime}`}</p>
            </div>

            <p className="pb-4">{`Location: ${request.location}`}</p>
            <p className="pb-4">Contact: (this is still in progress)</p>
            <p>Description: {request.description}</p>
            <div className="mb-8 flex w-full justify-between pt-8 ">
              <button
                onClick={() => setDecision("approve")}
                className="w-24 rounded-lg bg-green-500 p-2 text-white hover:bg-green-600 hover:shadow-md"
              >
                Approve
              </button>
              <button
                onClick={() => setDecision("deny")}
                className="w-24 rounded-lg bg-red-500 p-2 text-white hover:bg-red-600 hover:shadow-md"
              >
                Deny
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="w-24 rounded-lg bg-amber-500 p-2 text-white hover:bg-amber-600 hover:shadow-md"
              >
                Edit
              </button>
            </div>
          </div>
          {request.conflictStatus !== "noConflict" && (
            <ConflictBox
              conflicts={request.conflicts}
              status={request.conflictStatus}
            />
          )}
          {decision && (
            <>
              <div
                className="fixed inset-0 z-30 bg-neutral-800 opacity-50"
                onClick={handleCancel}
              ></div>
              <div className="absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 transform">
                <MessageBox
                  decision={decision}
                  requestName={request.title}
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}
                />
              </div>
              {request.conflictStatus !== "noConflict" && (
                <ConflictBox
                  conflicts={request.conflicts}
                  status={request.conflictStatus}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
