// import api supports, which are handled separately to keep them
// from complaining
import { getNextWeekEvents } from "../../lib/notion";
import FullCalendar from "../../lib/fullcalendar";

import { getNextSunday } from "../../lib/utilities";
import { notFound } from "next/navigation"; //idk exactly what this does lol

//TODO: implement this (currently a template) to render space calendars statically
export async function generateStaticParams() {
  const posts = await fetch("https://.../posts").then((res) => res.json());

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page({ params }) {
  const events = await getNextWeekEvents(params.id);
  if (!events) notFound();

  return (
    <div>
      <h2 className="text-center pt-10 text-lg">Roble 117</h2>
      <div class="mx-10 mb-10">
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
    </div>
  );
}
