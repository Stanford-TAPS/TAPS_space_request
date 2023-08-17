import React, { useState } from "react";

export default function MessageBox({ decision, onConfirm, onCancel }) {
  const [message, setMessage] = useState("");

  const handleConfirm = () => {
    console.log(decision, " message:", message);
    onConfirm(message);
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-md border border-gray-300 bg-white p-4 dark:border-none dark:bg-neutral-700">
      <textarea
        className="mb-2 rounded border border-gray-200 p-2 text-black"
        placeholder="Enter optional message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="flex">
        {decision == "approve" && (
          <button
            onClick={handleConfirm}
            className="m-2 rounded-lg bg-green-500 p-2 text-white hover:bg-green-600 hover:shadow-md"
          >
            Approve Request
          </button>
        )}
        {decision == "deny" && (
          <button
            onClick={handleConfirm}
            className="m-2 rounded-lg bg-red-500 p-2 text-white hover:bg-red-600 hover:shadow-md"
          >
            Deny Request
          </button>
        )}
        <button
          onClick={onCancel}
          className="m-2 rounded-lg border border-white bg-neutral-500 p-2 text-white hover:bg-neutral-600 hover:shadow-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
