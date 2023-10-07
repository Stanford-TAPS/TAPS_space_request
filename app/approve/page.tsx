import { currentUser } from "@clerk/nextjs";
import {
  getRequestableSpaces,
  getSpaceRequests,
  getNextWeekEvents,
} from "../api/notion";
import ApprovalSystem from "./components/approve";
import Table from "./components/table";
import NotAuthorized from "../components/not_authorized";

export const dynamic = "force-dynamic"; // refreshing the page means data is refetched

export default async function Approve() {

  const user = await currentUser();

  if (!user.publicMetadata.approver) return <NotAuthorized />;

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
