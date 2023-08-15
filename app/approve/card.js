"use client";
import { useState } from "react";

export default function RequestCard({ request }) {
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
    <div className="mx-6 mb-20 mt-6 w-1/3 rounded border bg-white px-16 pt-12 text-xl shadow-lg">
      <h2 className="font-playfair mb-6 text-center text-4xl font-bold">
        {request.title}
      </h2>
      <div className="flex w-full justify-between pb-4 font-bold">
        <p>{`${request.date}`}</p>
        <p className="text-bold">{`${request.startTime} - ${request.endTime}`}</p>
      </div>
      <p className="pb-4">{`Location: ${request.location}`}</p>
      <p>{`Contact: `}</p>
      <button
        onClick={() => approveRequest(request)}
        className="rounded-lg bg-green-400 p-2 hover:bg-green-500 hover:shadow-md"
      >
        Approve
      </button>
    </div>
  );
}
