import { getSpaceRequests, getRequestableSpaces } from "../../lib/notion";
import Table from "./table";
import { format, parseISO, isWithinInterval } from "date-fns";

export default async function Approve() {
  const spaceRequests = await getSpaceRequests();
  const locations = await getRequestableSpaces();

  for (let i = 0; i < spaceRequests.length; i++) {
    const location = locations.find(
      ({ id }) => id === spaceRequests[i].locationID,
    );
    spaceRequests[i].location = location.title;
    spaceRequests[i].conflictStatus = "noConflict"; // default status

    const currentEventInterval = {
      start: parseISO(spaceRequests[i].start),
      end: parseISO(spaceRequests[i].end),
    };

    spaceRequests[i].date = format(currentEventInterval.start, "MMM dd");
    spaceRequests[i].startTime = format(currentEventInterval.start, "hh:mm aa");
    spaceRequests[i].endTime = format(currentEventInterval.end, "hh:mm aa");
    spaceRequests[i].conflicts = [];

    // Check if the current event conflicts with any other events at the same location
    for (let j = 0; j < spaceRequests.length; j++) {
      if (
        i !== j &&
        spaceRequests[i].locationID === spaceRequests[j].locationID
      ) {
        const otherEventInterval = {
          start: parseISO(spaceRequests[j].start),
          end: parseISO(spaceRequests[j].end),
        };

        if (
          isWithinInterval(currentEventInterval.start, otherEventInterval) ||
          isWithinInterval(currentEventInterval.end, otherEventInterval)
        ) {
          spaceRequests[i].conflictStatus = "requestedConflict";
          spaceRequests[i].conflicts.push({
            title: spaceRequests[j].title,
            id: j,
          });
          break; // exit loop once conflict is found
        }
      }
    }
  }
  return (
    <div className="h-screen w-screen pt-20">
      <Table requests={spaceRequests} locations={locations} />
    </div>
  );
}
