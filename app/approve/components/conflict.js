export default function ConflictBox({ conflicts, status }) {
  return (
    <div
      className={`rounded border-2 ${
        status === "requestedConflict" // fixed the comparison here
          ? " border-amber-500"
          : "border-red-500"
      } p-4`}
    >
      {conflicts.map((conflict, index) => (
        <div key={index}>
          <p className="mb-2 font-bold">Conflicts with:</p>
          <p>{conflict.title}</p>
        </div>
      ))}
    </div>
  );
}
