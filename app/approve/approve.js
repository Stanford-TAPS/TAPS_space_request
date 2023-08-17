"use client";
import Table from "./table";
import RequestCard from "./card";
import { useState, useEffect } from "react";
import { format, parseISO, isWithinInterval } from "date-fns";

// Holds a list of requests and their conflicts/conflict status. On
// approval of a request,
export default function ApprovalSystem({
  requests: initialRequests,
  locations,
}) {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [approveStatus, setApproveStatus] = useState(null);
  const [denyStatus, setDenyStatus] = useState(null);
  const [requests, setRequests] = useState(
    formatRequests(initialRequests, locations),
  );
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Automatically refreshes requests every 10 min
  useEffect(() => {
    const refresh = async () => {
      await refetchEvents();
    };

    const intervalId = setInterval(refresh, 10 * 60 * 1000); // 10 minutes in milliseconds

    return () => clearInterval(intervalId); // This will clear the interval when the component unmounts
  }, []);

  function handleRequestSelected(request) {
    setSelectedRequest(request);
  }

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
    if (decision == "approve") {
      await approveRequest(selectedRequest);
    } else if (decision == "deny") {
      await denyRequest(selectedRequest);
    }

    refetchEvents();
    setSelectedRequest(null); //close request card
  }

  async function refetchEvents() {
    const response = await fetch("/api/get_requests", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { spaceRequests } = await response.json();
    setRequests(formatRequests(spaceRequests, locations));
  }

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
    </div>
  );
}

export function formatRequests(spaceRequests, locations) {
  for (let i = 0; i < spaceRequests.length; i++) {
    const location = locations.find(
      ({ id }) => id === spaceRequests[i].locationID,
    );
    spaceRequests[i].location = location.title;
    spaceRequests[i].conflictStatus = "noConflict"; // default status

    const currentEventInterval = {
      start: parseISO(spaceRequests[i].start),
      end: parseISO(spaceRequests[i].end),
    };

    spaceRequests[i].date = format(currentEventInterval.start, "MMM dd");
    spaceRequests[i].startTime = format(currentEventInterval.start, "hh:mm aa");
    spaceRequests[i].endTime = format(currentEventInterval.end, "hh:mm aa");
    spaceRequests[i].conflicts = [];

    // Check if the current event conflicts with any other events at the same location
    for (let j = 0; j < spaceRequests.length; j++) {
      if (
        i !== j &&
        spaceRequests[i].locationID === spaceRequests[j].locationID
      ) {
        const otherEventInterval = {
          start: parseISO(spaceRequests[j].start),
          end: parseISO(spaceRequests[j].end),
        };

        if (
          isWithinInterval(currentEventInterval.start, otherEventInterval) ||
          isWithinInterval(currentEventInterval.end, otherEventInterval)
        ) {
          spaceRequests[i].conflictStatus = "requestedConflict";
          spaceRequests[i].conflicts.push({
            title: spaceRequests[j].title,
            id: j,
          });
          break; // exit loop once conflict is found
        }
      }
    }
  }
  return spaceRequests;
}
