export function getNextSunday() {
  const today = new Date();
  const currentDay = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  const daysUntilNextSunday = 7 - currentDay; // Days remaining until next Sunday
  const nextSunday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + daysUntilNextSunday,
    1, // Hour set to 1 AM
    0, // Minutes set to 0
    0, // Seconds set to 0
    0, // Milliseconds set to 0
  );

  return nextSunday;
}

export function convertDate(date) {
  return date.toISOString().slice(0, -1);
}
