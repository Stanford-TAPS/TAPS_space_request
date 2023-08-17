import { getRequestableSpaces, getSpaceRequests } from "../../lib/notion";
import ApprovalSystem from "./approve";
import Table from "./table";

export const dynamic = "force-dynamic"; // refreshing the page means data is refetched

export default async function Approve() {
  const spaceRequests = await getSpaceRequests();
  const locations = await getRequestableSpaces();

  return (
    <div className="h-full w-full">
      <ApprovalSystem requests={spaceRequests} locations={locations} />
    </div>
  );
}
