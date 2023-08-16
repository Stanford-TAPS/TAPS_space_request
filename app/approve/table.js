"use client";
import classNames from "classnames";
import { useState } from "react";
import RequestCard from "./card";
import LocationFilter from "./filter";

export default function Table({ requests: initialRequests, locations }) {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [requests, setRequests] = useState(initialRequests);

  // Function to handle the change of selected locations
  const handleLocationChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value,
    );
    setSelectedLocations(selectedOptions);
  };

  // Filter the requests based on the selected locations
  const filteredRequests = requests.filter(
    (request) =>
      selectedLocations.length === 0 ||
      selectedLocations.includes(request.locationID.toString()),
  );

  // Erase any approved/denied requests
  function eraseRequest(request) {
    setRequests(requests.filter((r) => r.id !== request.id));
  }

  return (
    <div className=" flex h-full">
      {selectedRequest && (
        <RequestCard request={selectedRequest} eraseRequest={eraseRequest} />
      )}
      <div className="no-scrollbar mx-auto mb-6 mt-4 flex w-3/5 flex-col">
        <LocationFilter
          locations={locations}
          selectedLocations={selectedLocations}
          setSelectedLocations={setSelectedLocations}
        />
        <div className="mt-2 grow overflow-auto rounded shadow-lg outline outline-1 outline-neutral-200 dark:bg-neutral-800 dark:outline-none">
          <table className="w-full text-lg">
            <thead className="sticky left-0 right-0 top-0 z-10 bg-white outline outline-1 outline-neutral-200 dark:bg-neutral-800 dark:outline-2 dark:outline-neutral-900">
              <tr>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Time</th>
                <th className="p-4 text-right">Conflict</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr
                  key={request.id}
                  className={`h-10 cursor-pointer transition duration-300 ease-in-out ${
                    selectedRequest && selectedRequest.id === request.id
                      ? "z-0 bg-neutral-50 outline outline-1 outline-neutral-100 hover:bg-neutral-100 dark:bg-neutral-900 dark:outline-none dark:hover:bg-neutral-900 dark:hover:outline-1"
                      : "hover:z-10 hover:bg-neutral-100 hover:shadow-md dark:hover:bg-neutral-700"
                  }`}
                  onClick={() =>
                    selectedRequest && selectedRequest.id === request.id
                      ? setSelectedRequest(null)
                      : setSelectedRequest(request)
                  }
                >
                  <td className="p-4">{request.title}</td>
                  <td className="p-4">{request.date}</td>
                  <td className="p-4">{`${request.startTime} - ${request.endTime}`}</td>
                  <td className="p-4 text-right">
                    <div
                      className={`mr-4 inline-block h-4 w-4 rounded-full ${
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
    </div>
  );
}
