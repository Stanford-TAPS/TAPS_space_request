"use client";
import Table from "./table";
import RequestCard from "./card";
import AcceptMessageBox from "./acceptMessage";
import { useState } from "react";

export default function ApprovalSystem({
  requests: initialRequests,
  locations,
}) {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [approveStatus, setApproveStatus] = useState(null);
  const [denyStatus, setDenyStatus] = useState(null);
  const [requests, setRequests] = useState(initialRequests);
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
        onEventDecided("accept");
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
        onEventDecided("deny");
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

  async function handleEventDecided(fateOfRequest) {
    if (fateOfRequest == "approve") {
      await approveRequest(selectedRequest);
    } else if (fateOfRequest == "deny") {
      await denyRequest(selectedRequest);
    }
    setRequests((currentRequests) =>
      currentRequests.filter((request) => request.id !== selectedRequest.id),
    );
    setSelectedRequest(null); //close request card
  }

  return (
    <div className="flex h-full">
      {selectedRequest && (
        <RequestCard
          request={selectedRequest}
          onEventDecided={handleEventDecided}
        />
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
