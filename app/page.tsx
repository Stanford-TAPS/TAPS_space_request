import Link from "next/link";
import { getAllEvents } from "./api/notion";
import HomeCalendar from "./components/home_calendar";
import Slideshow from "./spaces/components/slideshow";
import { signIn } from "next-auth/react";

export default async function Home() {
  const events = await getAllEvents();
  return (
    <div>
      <div className="relative h-[47.5rem] w-full overflow-hidden">
        <Slideshow />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute top-0 left-0 right-0 z-10 flex flex-col items-center justify-center w-full h-full">
          <div className="flex h-fit w-fit flex-col items-center p-8 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
            <div className="m-4 mb-8 font-bold text-center text-white font-roboto text-9xl">
              TAPS SPACES
            </div>
            <div className="flex pb-8 space-x-16">
              <Link
                href="/spaces"
                className="w-56 py-3 text-4xl text-center text-white transition-colors duration-200 border-4 border-white rounded-full outline-white hover:shadow-lg hover:outline hover:outline-1"
              >
                View
              </Link>
              <Link
                href="/request"
                className="w-56 py-3 text-4xl text-center text-white transition-colors duration-200 bg-red-700 rounded-full outline-1 outline-red-700 hover:shadow-lg hover:outline"
              >
                Request
              </Link>

            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-8 text-4xl font-bold text-center font-roboto">
        Calendar
      </div>
      <HomeCalendar events={events} />
    </div>
  );
}
