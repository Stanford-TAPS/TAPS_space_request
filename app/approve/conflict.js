export default function ConflictBox({ conflicts }) {
  return (
    <div>
      {conflicts.map((conflict) => (
        <div>{conflict.title}</div>
      ))}
    </div>
  );
}
