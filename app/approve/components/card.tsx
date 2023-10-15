"use client";
import { useState } from "react";
import ConflictBox from "./conflict";
import MessageBox from "./message_box";
import LocationSelect from "../../components/location_select";
import { useForm } from "react-hook-form";

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
    <div className="w-1/3 px-16 pt-12 mx-6 mt-4 mb-20 text-xl bg-white border rounded shadow-lg dark:border-0 dark:bg-neutral-800">
      {isEditing && (
        <p className="pb-1 text-sm">
          Warning! This feature doesn&apos;t actually work yet :)
        </p>
      )}
      <h2 className="mb-6 text-4xl font-bold text-center font-roboto">
        {request.title}
      </h2>
      <div className="flex justify-between w-full pb-4">
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
      <div className="flex justify-between w-full pt-8 mb-8 ">
        {isEditing ? (
          <>
            <button
              onClick={() => handleEdited()}
              className="p-2 text-white rounded-lg w-36 bg-amber-500 hover:bg-amber-600 hover:shadow-md"
            >
              Confirm Edits
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 text-white rounded-lg w-36 bg-neutral-500 hover:bg-neutral-600 hover:shadow-md"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setDecision("approve")}
              className="w-24 p-2 text-white bg-green-500 rounded-lg hover:bg-green-600 hover:shadow-md"
            >
              Approve
            </button>
            <button
              onClick={() => setDecision("deny")}
              className="w-24 p-2 text-white bg-red-500 rounded-lg hover:bg-red-600 hover:shadow-md"
            >
              Deny
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="w-24 p-2 text-white rounded-lg bg-amber-500 hover:bg-amber-600 hover:shadow-md"
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
            className="fixed inset-0 z-30 opacity-50 bg-neutral-800"
            onClick={handleCancel}
          ></div>
          <div className="absolute z-40 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
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
