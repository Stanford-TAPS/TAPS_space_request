// import api supports, which are handled separately to keep them
// from complaining
import { getNextWeekEvents, getRequestableSpaces } from "../../../lib/notion";
import Calendar from "../calendar";

import { getNextSunday } from "../../../lib/utilities";
import { notFound } from "next/navigation"; //idk exactly what this does lol

export default async function Page({ params }) {
  const events = await getNextWeekEvents(params.location);

  return (
    <div>
      <h2 className="text-center pt-10 text-lg">AAAAA</h2>
      <Calendar events={events} />
      <div className="mx-10 mb-10"></div>
    </div>
  );
}
