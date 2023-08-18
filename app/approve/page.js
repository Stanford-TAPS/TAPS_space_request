import {
  getRequestableSpaces,
  getSpaceRequests,
  getNextWeekEvents,
} from "../api/notion";
import ApprovalSystem from "./components/approve";
import Table from "./components/table";

export const dynamic = "force-dynamic"; // refreshing the page means data is refetched

export default async function Approve() {
  const spaceRequests = await getSpaceRequests();
  const locations = await getRequestableSpaces();
  const events = await getNextWeekEvents();

  return (
    <>
      <ApprovalSystem
        requests={spaceRequests}
        locations={locations}
        events={events}
      />
    </>
  );
}
