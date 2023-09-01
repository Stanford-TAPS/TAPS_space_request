import Link from "next/link";
import { getAllEvents } from "./api/notion";
import HomeCalendar from "./components/home_calendar";
import Slideshow from "./spaces/components/slideshow";

export default async function Home() {
  const events = await getAllEvents();
  return (
    <>
      <div className="relative h-[47.5rem] w-full overflow-hidden">
        <Slideshow />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute left-0 right-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center">
          <div className="flex h-fit w-fit flex-col items-center p-8 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
            <div className="m-4 mb-8 text-center font-roboto text-9xl font-bold text-white">
              TAPS SPACES
            </div>
            <div className="flex space-x-16 pb-8">
              <Link
                href="/spaces"
                className="w-56 rounded-full border-4 border-white py-3 text-center text-4xl text-white outline-white transition-colors duration-200 hover:shadow-lg hover:outline hover:outline-1"
              >
                View
              </Link>
              <Link
                href="/request"
                className="w-56 rounded-full bg-red-700 py-3 text-center text-4xl text-white outline-1 outline-red-700 transition-colors duration-200 hover:shadow-lg hover:outline"
              >
                Request
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 w-full text-center font-roboto text-4xl font-bold">
        Calendar
      </div>
      <HomeCalendar events={events} />
    </>
  );
}
