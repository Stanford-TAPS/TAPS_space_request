import Link from "next/link";
import { getAllEvents } from "./api/notion";
import HomeCalendar from "./components/home_calendar";
import Slideshow from "./spaces/components/slideshow";
import { PrimaryButton, SecondaryButton } from "./components/buttons";

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
              <SecondaryButton href="/spaces" text="View" onClick={null}></SecondaryButton>
              <PrimaryButton href="/request" text="Request" onClick={null}></PrimaryButton>
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
