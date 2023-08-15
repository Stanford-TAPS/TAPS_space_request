"use client";
import { useState } from "react";
import ConflictBox from "./conflict";

export default function RequestCard({ request, requests }) {
  const [approveStatus, setApproveStatus] = useState(null);
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

  return (
    <div className="mx-6 mb-20 mt-4 w-1/3 rounded border bg-white px-16 pt-12 text-xl shadow-lg">
      <h2 className="font-playfair mb-6 text-center text-4xl font-bold">
        {request.title}
      </h2>
      <div className="flex w-full justify-between pb-4">
        <p>{`${request.date}`}</p>
        <p>{`${request.startTime} - ${request.endTime}`}</p>
      </div>
      <p className="pb-4">{`Location: ${request.location}`}</p>
      <p>{`Contact: `}</p>
      <div className="flex w-full justify-between pt-8">
        <button
          //onClick={() => approveRequest(request)}
          className="w-24 rounded-lg bg-green-500 p-2 text-white hover:bg-green-600 hover:shadow-md"
        >
          Approve
        </button>
        <button
          //onClick={() => approveRequest(request)}
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
