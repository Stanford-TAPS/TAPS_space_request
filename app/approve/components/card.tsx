"use client";
import { useState } from "react";
import ConflictBox from "./conflict";
import MessageBox from "./message_box";
import LocationSelect from "../../components/location_select";
import { useForm, Controller } from "react-hook-form";

// Card displaying properties of the selected request. Option to approve, deny,
// or edit. On selection, calls onEventDecided with result ("approve", "deny", "edit")
export default function RequestCard({ request, locations, onDecision }) {
  const [decision, setDecision] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm({});

  function handleEdited() {
    setIsEditing(false);
  }

  function handleConfirm(message) {
    onDecision(decision, message);
  }

  function handleCancel() {
    setDecision(null);
  }

  return (
    <div className="mx-6 mb-20 mt-4 w-1/3 rounded border bg-white px-16 pt-12 text-xl shadow-lg dark:border-0 dark:bg-neutral-800">
      {isEditing && (
        <p className="pb-1 text-sm">
          Warning! This feature doesn&apos;t actually work yet :)
        </p>
      )}
      <h2 className="mb-6 text-center font-roboto text-4xl font-bold">
        {request.title}
      </h2>
      <div className="flex w-full justify-between pb-4">
        <p>{`${request.date}`}</p>
        <p>{`${request.startTime} - ${request.endTime}`}</p>
      </div>
      {isEditing ? (
        <>
          <LocationSelect
            control={control}
            locations={locations}
            errors={errors}
            defaultValue={request.location}
          />
        </>
      ) : (
        <p className="pb-4">{`Location: ${request.location}`}</p>
      )}

      <p className="pb-4">{`Contact: (this is still in progress)`}</p>
      <p>Description: {request.description}</p>
      <div className="mb-8 flex w-full justify-between pt-8 ">
        {isEditing ? (
          <>
            <button
              onClick={() => handleEdited()}
              className="w-36 rounded-lg bg-amber-500 p-2 text-white hover:bg-amber-600 hover:shadow-md"
            >
              Confirm Edits
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="w-36 rounded-lg bg-neutral-500 p-2 text-white hover:bg-neutral-600 hover:shadow-md"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
      {request.conflictStatus != "noConflict" && (
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
        </>
      )}
    </div>
  );
}
