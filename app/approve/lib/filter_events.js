export function filterEventsByLocations(events, selectedLocations) {
  if (!selectedLocations || selectedLocations.length === 0) {
    return Object.values(events).flat(); // Return all events if no locations are selected
  }

  const filteredEvents = [];
  selectedLocations.forEach((locationID) => {
    if (events[locationID]) {
      filteredEvents.push(...events[locationID]);
    }
  });

  return filteredEvents;
}
