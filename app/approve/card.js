"use client";
import { useState } from "react";
import ConflictBox from "./conflict";

export default function RequestCard({ request, requests, eraseRequest }) {
  const [approveStatus, setApproveStatus] = useState(null);
  const [denyStatus, setDenyStatus] = useState(null);

  const approveRequest = async (request) => {
    setApproveStatus("approving");
    try {
      const response = await fetch("/api/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (response.ok) {
        setApproveStatus("success");
        eraseRequest(request);
        console.log(response);
      } else {
        setApproveStatus("failure");
        console.log(response);
      }
    } catch (err) {
      setApproveStatus("failure");
      console.log(err);
    }
  };

  const denyRequest = async (request) => {
    setDenyStatus("denying");
    try {
      const response = await fetch("/api/deny", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (response.ok) {
        setDenyStatus("success");
        eraseRequest(request);
        console.log(response);
      } else {
        setDenyStatus("failure");
        console.log(response);
      }
    } catch (err) {
      setDenyStatus("failure");
      console.log(err);
    }
  };

  if (approveStatus == "approving") {
    return (
      <div className="mx-6 mb-20 mt-4 w-1/3 rounded border bg-white px-16 pt-12 text-xl shadow-lg dark:border-0 dark:bg-neutral-800">
        Approving...
      </div>
    );
  }

  if (approveStatus == "success") {
    return (
      <div className="mx-6 mb-20 mt-4 w-1/3 rounded border bg-white px-16 pt-12 text-xl shadow-lg dark:border-0 dark:bg-neutral-800">
        <p>Approved!</p>
        <p>
          {" "}
          - that means the event was sent to the Notion Events database. If you
          are testing, remember to remove it later :)
        </p>
      </div>
    );
  }

  if (approveStatus == "approving") {
    return (
      <div className="mx-6 mb-20 mt-4 w-1/3 rounded border bg-white px-16 pt-12 text-xl shadow-lg dark:border-0 dark:bg-neutral-800">
        loading...
      </div>
    );
  }

  if (denyStatus == "success") {
    return (
      <div className="mx-6 mb-20 mt-4 w-1/3 rounded border bg-white px-16 pt-12 text-xl shadow-lg dark:border-0 dark:bg-neutral-800">
        <p>Denied!</p>
      </div>
    );
  }

  if (approveStatus == "failure" || denyStatus == "failure") {
    return (
      <div className="mx-6 mb-20 mt-4 w-1/3 rounded border bg-white px-16 pt-12 text-xl shadow-lg dark:border-0 dark:bg-neutral-800">
        Something went wrong :/
      </div>
    );
  }

  return (
    <div className="mx-6 mb-20 mt-4 w-1/3 rounded border bg-white px-16 pt-12 text-xl shadow-lg dark:border-0 dark:bg-neutral-800">
      <h2 className="font-playfair mb-6 text-center text-4xl font-bold">
        {request.title}
      </h2>
      <div className="flex w-full justify-between pb-4">
        <p>{`${request.date}`}</p>
        <p>{`${request.startTime} - ${request.endTime}`}</p>
      </div>
      <p className="pb-4">{`Location: ${request.location}`}</p>
      <p>{`Contact: (this is still in progress)`}</p>
      <div className="mb-8 flex w-full justify-between pt-8">
        <button
          onClick={() => approveRequest(request)}
          className="w-24 rounded-lg bg-green-500 p-2 text-white hover:bg-green-600 hover:shadow-md"
        >
          Approve
        </button>
        <button
          onClick={() => denyRequest(request)}
          className="w-24 rounded-lg bg-red-500 p-2 text-white hover:bg-red-600 hover:shadow-md"
        >
          Deny
        </button>
        <button
          //onClick={() => approveRequest(request)}
          className="w-24 rounded-lg bg-amber-500 p-2 text-white hover:bg-amber-600 hover:shadow-md"
        >
          Edit
        </button>
      </div>
      {request.conflictStatus != "noConflict" && (
        <ConflictBox conflicts={request.conflicts} />
      )}
    </div>
  );
}
