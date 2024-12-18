"use client";
import Table from "./table";
import Calendar from "./calendar";
import RequestCard from "./card";
import { useState, useEffect, useMemo } from "react";
import RefreshIcon from "./refresh_icon";
import { formatRequests, addRequestToEvents } from "../lib/request_format";
import LocationFilter from "./filter";

export default function ApprovalSystem({
  requests: initialRequests,
  locations,
  events: initialEvents,
}) {
  const [selectedRequest, setSelectedRequest] = useState(null); // tracking selected request
  const [approveStatus, setApproveStatus] = useState(null); // tracking state of approval API calls
  const [denyStatus, setDenyStatus] = useState(null); // tracking state of denial API calls
  const [requests, setRequests] = useState(
    formatRequests(initialRequests, locations, initialEvents), // formatting requests recieved from Notion, and tracking their temp state
  );
  const [events, setEvents] = useState(initialEvents); // tracking events, updated on refresh to include new approvals
  const [isRefreshing, setIsRefreshing] = useState(false); // tracking data refreshes
  const [view, setView] = useState("table");

  // Automatically refreshes requests every 2 min
  useEffect(() => {
    const intervalId = setInterval(refreshRequests, 2 * 60 * 1000); // 2 minutes in milliseconds

    return () => clearInterval(intervalId); // This will clear the interval when the component unmounts
  }, [events]);

  const refreshRequests = async () => {
    setIsRefreshing(true);
    await refetchRequests(events);
    setIsRefreshing(false);
  };

  useEffect(() => {
    if (selectedRequest) {
      console.log(requests);
      setSelectedRequest(
        requests.find((request) => request.id === selectedRequest.id),
      );
    }
  }, [requests]);


  // calls API to approve request
  const approveRequest = async (request) => {
    setApproveStatus("approving");
    try {
      const response = await fetch("/api/protected/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (response.ok) {
        setApproveStatus("success");
      } else {
        setApproveStatus("failure");
      }
    } catch (err) {
      setApproveStatus("failure");
    }
  };

  // calls API to deny request
  const denyRequest = async (request) => {
    setDenyStatus("denying");
    try {
      const response = await fetch("/api/protected/deny", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (response.ok) {
        setDenyStatus("success");
      } else {
        setDenyStatus("failure");
      }
    } catch (err) {
      setDenyStatus("failure");
    }
  };

  async function handleDecision(decision, message) {
    setSelectedRequest(null); // close request card
    setRequests(
      requests.filter((request) => request.id !== selectedRequest.id),
    );
    setIsRefreshing(true);

    let updatedEvents = events;

    if (decision == "approve") {
      await approveRequest(selectedRequest);
      updatedEvents = addRequestToEvents(events, selectedRequest);
      setEvents(updatedEvents);
    } else if (decision == "deny") {
      await denyRequest(selectedRequest);
    }
    console.log("Updated events: ", updatedEvents);

    await refetchRequests(updatedEvents);
    setIsRefreshing(false);
  }

  const refetchRequests = async (events) => {
    const response = await fetch("/api/protected/get_requests", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { spaceRequests } = await response.json();
    setRequests(formatRequests(spaceRequests, locations, events));
  };

  const [selectedLocations, setSelectedLocations] = useState([]);

  // Filter the requests based on the selected locations
  const filteredRequests = useMemo(() => {
    return requests.filter(
      (request) =>
        selectedLocations.length === 0 ||
        selectedLocations.includes(request.locationID.toString()),
    );
  }, [requests, selectedLocations]);

  return (
    <div className="flex h-full">
      {selectedRequest && (
        <RequestCard
          request={selectedRequest}
          locations={locations}
          onDecision={handleDecision}
          onEdited={refreshRequests}
        />
      )}
      <div className="flex flex-col w-3/5 mx-auto mt-4 mb-6">
        <div className="flex flex-row justify-between">
          <LocationFilter
            locations={locations}
            selectedLocations={selectedLocations}
            setSelectedLocations={setSelectedLocations}
          />
          <div className="flex flex-row">
            {isRefreshing && (
              <div className="p-2 mr-4">
                <RefreshIcon />
              </div>
            )}
            <button
              className="p-2 border rounded dark:border-black dark:bg-neutral-800"
              onClick={() =>
                view == "table" ? setView("calendar") : setView("table")
              }
            >
              {view == "table" ? "Calendar View" : "Table View"}
            </button>
          </div>
        </div>
        {view == "table" ? (
          <Table
            requests={filteredRequests}
            selectedRequest={selectedRequest}
            onRequestSelected={setSelectedRequest}
          />
        ) : (
          <Calendar
            requests={filteredRequests}
            selectedLocations={selectedLocations}
            events={events}
            selectedRequest={selectedRequest}
            onRequestSelected={setSelectedRequest}
          />
        )}
      </div>
    </div>
  );
}
