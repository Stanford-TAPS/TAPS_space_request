import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWheelchair } from "@fortawesome/free-solid-svg-icons";
import { getLocationPages, getNextMonthEvents } from "../../api/notion";
import SpaceCalendar from "../components/calendar";

export default async function MemAud() {
  const pagesInfo = await getLocationPages();
  const pageInfo = pagesInfo.find(
    (page) => page.id == "814c59ca-e1f7-42c1-b7cb-6ff70129841e",
  );
  const events = await getNextMonthEvents(pageInfo.id);

  return (
    <div className="flex w-full flex-col content-center bg-white dark:bg-neutral-900">
      <div className="relative flex h-96 w-full items-center justify-center overflow-hidden">
        <Image
          src="/nitery.jpg"
          alt="a picture of the Nitery Theater"
          fill={true}
          className="object-cover"
          priority={true}
        />
        <div className="z-10 border-4 border-yellow-400 p-12 text-center font-roboto text-7xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
          NITERY THEATER
        </div>
      </div>

      <div>
        <div className="my-4 flex justify-center">
          {pageInfo.isAccessible ? (
            <div className="m-1 flex w-fit self-center rounded-full bg-blue-700 p-2 text-white">
              <FontAwesomeIcon icon={faWheelchair} className="p-1" />
              <div className="pr-1">Accessible</div>
            </div>
          ) : (
            <div className="mt-1 w-fit self-center rounded-full bg-red-600  p-2 text-sm text-white dark:bg-red-700">
              Not Accessible
            </div>
          )}
          {pageInfo.tags.map((tag) => {
            return (
              <div
                key={tag.id}
                className={`m-1 rounded-full bg-green-600 px-4 py-2 text-white dark:bg-green-700`}
              >
                {tag.name}
              </div>
            );
          })}
        </div>
        <div className="mx-auto flex w-2/3 text-center text-2xl">
          <div className="m-4 mr-8">
            {pageInfo.capacity && (
              <div className="mb-4">
                <span className="mr-2 font-bold">Capacity</span>
                {pageInfo.capacity}
              </div>
            )}
            <div>{pageInfo.description}</div>
          </div>
          <div className="mx-auto w-96 shrink-0 rounded-xl bg-blue-200 p-8 pb-12 dark:bg-neutral-700">
            <div className="mb-6">
              The Nitery is run by TAPS, and the venue&apos;s annual season is
              curated by the Nitery Experimental Theater Board (NExT).
            </div>
            <div className="flex w-full justify-center">
              <a
                href="https://www.nextheatre.com/"
                className="w-fit rounded bg-red-700 p-2 text-white outline-red-700 hover:shadow-lg hover:outline hover:outline-2"
              >
                Read about NExT
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 w-1/2 text-center font-roboto text-2xl font-bold">
        Events scheduled at the Nitery
      </div>
      <div className="mx-auto mt-2 w-48 border-b-2 border-black dark:border-white"></div>
      <SpaceCalendar events={events} location={pageInfo.title} />
    </div>
  );
}
