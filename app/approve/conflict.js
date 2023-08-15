export default function ConflictBox({ conflicts }) {
  return (
    <div className="rounded border-2 border-amber-500 p-4">
      {conflicts.map((conflict) => (
        <div>
          <p className="mb-2 font-bold">Conflicts with:</p>
          <p>{conflict.title}</p>
        </div>
      ))}
    </div>
  );
}
