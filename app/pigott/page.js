// import api supports, which are handled separately to keep them
// from complaining
import { getNextWeekEvents } from "@/lib/notion";
import FullCalendar from "../../lib/fullcalendar";
import { notFound } from "next/navigation"; //idk exactly what this does lol
//import "../app/globals.css";

function getNextSunday() {
  const today = new Date();
  const currentDay = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  const daysUntilNextSunday = 7 - currentDay; // Days remaining until next Sunday
  const nextSunday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + daysUntilNextSunday
  );

  return nextSunday;
}

export default async function Home() {
  const events = await getNextWeekEvents();
  console.log(events);
  if (!events) notFound();

  return (
    <div>
      <FullCalendar
        initialView="timeGridWeek"
        initialDate={getNextSunday()}
        contentHeight="auto"
        events={events}
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
