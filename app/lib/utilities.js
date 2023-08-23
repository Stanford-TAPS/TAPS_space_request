export function getNextSunday() {
  const today = new Date();
  const nextSunday = new Date(today);

  nextSunday.setDate(today.getDate() + ((7 - today.getDay()) % 7));
  console.log(nextSunday);
  return nextSunday;
}

export function convertDate(date) {
  return date.toISOString().slice(0, -1);
}
