"use client";
import classNames from "classnames";
import { useState } from "react";
import RequestCard from "./card";

export default function Table({ requests }) {
  const [selectedRequest, setSelectedRequest] = useState(null);

  return (
    <div className="flex h-full">
      {selectedRequest && <RequestCard request={selectedRequest} />}
      <div className="mx-auto mt-6 w-3/5 overflow-auto">
        <table className="w-full text-lg">
          <thead>
            <tr>
              <th className="border-b p-4 text-left">Title</th>
              <th className="border-b p-4 text-left">Date</th>
              <th className="border-b p-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr
                key={request.id}
                className={`h-10 cursor-pointer transition duration-300 ease-in-out ${
                  selectedRequest && selectedRequest.id === request.id
                    ? " bg-gray-50 outline outline-1 outline-gray-100 hover:bg-gray-100"
                    : "hover:z-10 hover:bg-gray-100 hover:shadow-md"
                }`}
                onClick={() =>
                  selectedRequest && selectedRequest.id === request.id
                    ? setSelectedRequest(null)
                    : setSelectedRequest(request)
                }
              >
                <td className="p-4">{request.title}</td>
                <td className="p-4">{`${request.startTime} - ${request.endTime}`}</td>
                <td className="p-4 text-right">
                  <div
                    className={`inline-block h-4 w-4 rounded-full ${
                      request.conflictStatus === "noConflict"
                        ? "bg-green-400"
                        : request.conflictStatus === "requestedConflict"
                        ? "bg-yellow-400"
                        : "bg-red-400"
                    }`}
                  ></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
