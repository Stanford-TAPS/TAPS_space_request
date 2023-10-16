import {
  getRequestableSpaces,
  getSpaceRequests,
  getNextWeekEvents,
} from "../api/notion";
import ApprovalSystem from "./components/approve";
import { isAuthorized, NotAuthorized } from "../components/not_authorized";

export const dynamic = "force-dynamic"; // refreshing the page means data is refetched

export default async function Approve() {

  const isAuth = await isAuthorized(true);
  if (!isAuth) return <NotAuthorized />

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
