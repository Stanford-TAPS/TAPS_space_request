import { getRequestableSpaces, getNextWeekEvents } from "../api/notion";
import SpaceRequest from "./components/request";

export const dynamic = "force-dynamic"; // refreshing the page means data is refetched

// Server-side base of the request page
export default async function RequestPage() {
  const spaces = await getRequestableSpaces(); // returns an array of space objects with their titles and page ids
  const eventsByLocation = await getNextWeekEvents(); // returns a map of events associated with each location

  return (
    <>
      <SpaceRequest spaces={spaces} eventsByLocation={eventsByLocation} />
    </>
  );
}
