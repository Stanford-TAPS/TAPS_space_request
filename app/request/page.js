import { getRequestableSpaces, getNextWeekEvents } from "../lib/notion";
import SpaceRequest from "./request";

export const dynamic = "force-dynamic"; // refreshing the page means data is refetched

export default async function RequestPage() {
  const spaces = await getRequestableSpaces();
  const eventsByLocation = await getNextWeekEvents();

  return (
    <div>
      <SpaceRequest spaces={spaces} eventsByLocation={eventsByLocation} />
    </div>
  );
}
