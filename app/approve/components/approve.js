"use client";
import Table from "./table";
import RequestCard from "./card";
import { useState, useEffect } from "react";
import RefreshIcon from "./refresh_icon";
import { formatRequests, addRequestToEvents } from "../lib/request_format.js";

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

  // Automatically refreshes requests every 2 min
  useEffect(() => {
    const refresh = async () => {
      setIsRefreshing(true);
      await refetchRequests(events);
      setIsRefreshing(false);
    };

    const intervalId = setInterval(refresh, 2 * 60 * 1000); // 2 minutes in milliseconds

    return () => clearInterval(intervalId); // This will clear the interval when the component unmounts
  }, []);

  // sets chosen request
  function handleRequestSelected(request) {
    setSelectedRequest(request);
  }

  // calls API to approve request
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

  // calls API to deny request
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

    await refetchRequests(updatedEvents);
    setIsRefreshing(false);
  }

  const refetchRequests = async (events) => {
    const response = await fetch("/api/get_requests", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { spaceRequests } = await response.json();
    setRequests(formatRequests(spaceRequests, locations, events));
  };

  return (
    <div className="flex h-full">
      {selectedRequest && (
        <RequestCard request={selectedRequest} onDecision={handleDecision} />
      )}
      <Table
        requests={requests}
        locations={locations}
        selectedRequest={selectedRequest}
        onRequestSelected={handleRequestSelected}
      />
      {isRefreshing && (
        <div className="absolute right-4 top-4">
          <RefreshIcon />
        </div>
      )}
    </div>
  );
}
