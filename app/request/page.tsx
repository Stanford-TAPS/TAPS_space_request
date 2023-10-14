import {
  getRequestableSpaces,
  getNextWeekEvents,
  getGroups,
} from "../api/notion";
import ProtectedPage, { NotAuthorized, isAuthorized } from "../components/not_authorized";
import SpaceRequest from "./components/request";

export const dynamic = "force-dynamic"; // refreshing the page means data is refetched

// Server-side base of the request page
export default async function RequestPage() {

  const isAuth = await isAuthorized(false);

  if (!isAuth) return <NotAuthorized />

  let spaces: { title: string, id: string }[]; // returns an array of space objects with their titles and page ids
  const eventsByLocation = await getNextWeekEvents(); // returns a map of events associated with each location
  const groups = await getGroups(); // returns an array of verified groups

  return (
    <SpaceRequest
      spaces={spaces}
      eventsByLocation={eventsByLocation}
      groups={groups}
    />
  );
}
