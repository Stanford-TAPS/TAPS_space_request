import React, { useState } from "react";

export default function MessageBox({
  decision,
  requestName,
  onConfirm,
  onCancel,
}) {
  const [message, setMessage] = useState("");

  const handleConfirm = () => {
    onConfirm(message);
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-md border border-gray-300 bg-white p-8 dark:border-none dark:bg-neutral-700">
      <p className="w-full pb-3">
        {decision == "approve" ? "Approving" : "Denying"}{" "}
        <span className="font-bold">{requestName}</span>:
      </p>
      <textarea
        className="focus:shadow-outline mb-2 h-48 w-96 resize-none appearance-none rounded border px-3 py-2 leading-tight text-black shadow focus:outline-none focus:ring-2 focus:ring-red-700"
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
