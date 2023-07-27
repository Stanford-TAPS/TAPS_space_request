// import api supports, which are handled separately to keep them
// from complaining
import { getNextWeekEvents } from "../../lib/notion";
import FullCalendar from "../../lib/fullcalendar";

import { getNextSunday } from "../../lib/utilities";
import { notFound } from "next/navigation"; //idk exactly what this does lol

export default async function Home() {
  const events = await getNextWeekEvents("dc09c477cdc04ff19b34a01b0da321c5");
  if (!events) notFound();

  return (
    <div>
      <h2 style={{ textAlign: "center", fontSize: "1.5em" }}>Roble 117</h2>
      <FullCalendar
        initialView="timeGridWeek"
        initialDate={getNextSunday().toISOString().slice(0, 10)}
        contentHeight="auto"
        events={events}
        eventColor="#8C1515"
        headerToolbar={{
          start: "",
          center: "title",
          end: "",
        }}
        slotMinTime="08:00"
        slotMaxTime="23:00"
      />
    </div>
  );
}
