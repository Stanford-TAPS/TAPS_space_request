export function getNextSunday() {
  const today = new Date();
  const currentDay = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  const daysUntilNextSunday = 7 - currentDay; // Days remaining until next Sunday
  const nextSunday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + daysUntilNextSunday
  );

  return nextSunday;
}