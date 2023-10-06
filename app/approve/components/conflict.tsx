import { format, parseISO } from "date-fns";

export default function ConflictBox({ conflicts, status }) {
  return (
    <div
      className={`rounded border-2 ${
        status === "requestedConflict" ? " border-amber-500" : "border-red-500"
      } p-4`}
    >
      <p className="mb-2 font-bold">Conflicts with:</p>
      {conflicts.map((conflict, index) => (
        <div key={index}>
          <div className="flex justify-between pb-2">
            <div className="flex">
              <div
                className={`mr-2 mt-2 inline-block h-3 w-3 rounded-full ${
                  conflict.type === "request" ? "bg-yellow-400" : "bg-red-400"
                }`}
              ></div>
              <p>{conflict.title}</p>
            </div>

            <p>
              {format(parseISO(conflict.start), "hh:mm aa")} -{" "}
              {format(parseISO(conflict.end), "hh:mm aa")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
