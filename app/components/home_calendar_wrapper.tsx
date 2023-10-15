import { getAllEvents } from "../api/notion";
import HomeCalendar from "./home_calendar";

export default async function HomeCalendarWrapper() {
    const events = await getAllEvents();
    return <HomeCalendar events={events} />

}
