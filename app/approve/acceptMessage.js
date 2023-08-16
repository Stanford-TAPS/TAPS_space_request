import React, { useState } from "react";

export default function AcceptMessageBox({}) {
  const [message, setMessage] = useState("");

  const handleAccept = () => {
    // Handle the accept logic here
    console.log("Accepted with message:", message);
  };

  return (
    <div className="flex flex-col items-center justify-center border border-gray-300 p-4">
      <textarea
        className="mb-2 rounded border border-gray-200 p-2"
        placeholder="Enter optional message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="rounded bg-blue-500 p-2 text-white hover:bg-blue-700"
        onClick={handleAccept}
      >
        Accept Request
      </button>
    </div>
  );
}
