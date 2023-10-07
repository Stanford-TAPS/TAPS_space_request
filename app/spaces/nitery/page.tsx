import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWheelchair } from "@fortawesome/free-solid-svg-icons";
import { getLocationPages, getNextMonthEvents } from "../../api/notion";
import SpaceCalendar from "../components/calendar";
import { PrimaryButton } from "../../components/buttons";

export default async function MemAud() {
  const pagesInfo = await getLocationPages();
  const page = pagesInfo.find(
    (page) => page.id == "814c59ca-e1f7-42c1-b7cb-6ff70129841e",
  );
  const events = await getNextMonthEvents(page.id);

  return (
    <div className="flex flex-col content-center w-full bg-white dark:bg-neutral-900">
      <div className="relative flex items-center justify-center w-full overflow-hidden h-96">
        <Image
          src="/nitery.jpg"
          alt="a picture of the Nitery Theater"
          fill={true}
          className="object-cover"
          priority={true}
        />
        <div className="z-10 border-4 border-white p-12 text-center font-roboto text-7xl font-bold text-white backdrop-blur-sm bg-black bg-opacity-50 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
          NITERY THEATER
        </div>
      </div>

      <div>
        <div className="flex justify-center my-4">
          {page.isAccessible ? (
            <div className="flex self-center p-2 px-4 m-1 text-sm text-white bg-blue-600 rounded-full dark:bg-blue-700">
              <FontAwesomeIcon
                icon={faWheelchair}
                className="pt-1 text-sm"
              />
              <div className="px-1 font-normal">Accessible</div>
            </div>
          ) : (
            <div className="p-2 px-4 m-1 text-sm font-normal text-white bg-red-600 rounded-full dark:bg-red-700">
              Not Accessible
            </div>
          )}
          {page.tags.map((tag) => {
            return (
              <div
                key={tag.id}
                className={`m-1 rounded-full bg-green-600 px-4 py-2 text-sm font-normal text-white dark:bg-green-700`}
              >
                {tag.name}
              </div>
            );
          })}
        </div>
        <div className="flex w-2/3 mx-auto text-2xl font-normal text-center">
          <div className="m-4 mr-8">
            {page.capacity && (
              <div className="mb-4">
                <span className="mr-2">Capacity</span>
                {page.capacity}
              </div>
            )}
            <div>{page.description}</div>
          </div>
          <div className="p-8 pb-12 mx-auto bg-blue-200 w-96 shrink-0 dark:bg-neutral-700">
            <div className="mb-6">
              The Nitery is run by TAPS, and the venue&apos;s annual season is
              curated by the Nitery Experimental Theater Board (NExT).
            </div>
            <div className="flex justify-center w-full">
              <PrimaryButton href="https://www.nextheatre.com/" text="Read about NExT" onClick={null} compact={false} />

            </div>
          </div>
        </div>
      </div>

      <div className="w-1/2 mx-auto mt-10 text-2xl font-bold text-center font-roboto">
        Events scheduled at the Nitery
      </div>
      <div className="w-48 mx-auto mt-2 border-b-2 border-black dark:border-white"></div>
      <SpaceCalendar events={events} location={page.title} />
    </div>
  );
}
