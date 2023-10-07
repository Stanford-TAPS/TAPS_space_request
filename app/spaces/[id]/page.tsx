import { getLocationPages, getNextMonthEvents } from "../../api/notion";
import Image from "next/image";
import Link from "next/link";
import BackButton from "../components/back_button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWheelchair } from "@fortawesome/free-solid-svg-icons";
import SpaceCalendar from "../components/calendar";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const pagesInfo = await getLocationPages();
  return pagesInfo.map((page) => ({
    id: page.id,
  }));
}

export default async function SpaceView({ params }) {
  const pagesInfo = await getLocationPages();
  const page = pagesInfo.find((page) => page.id == params.id);
  const events = await getNextMonthEvents(page.id);

  return (
    <>
      <BackButton className="absolute z-10 px-6 py-2 font-normal bg-white left-2 top-2 dark:bg-neutral-800" />

      <div className="relative flex items-center justify-center w-full overflow-hidden h-80 bg-neutral-800">
        <Image
          src={page.cover}
          alt={`Cover image of ${page.title}`}
          fill={true}
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="z-10 border-4 border-white p-12 text-center font-roboto text-7xl font-bold text-white backdrop-blur-sm bg-black bg-opacity-50 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
          {page.title}
        </div>
      </div>
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

      <div className="max-w-2xl p-6 mx-auto font-normal text-center border-2 border-black text-md w-fit dark:border-0 dark:bg-neutral-800">
        {page.capacity && (
          <div className="mb-2">
            <span className="mr-1 font-bold">Capacity</span>
            {page.capacity}
          </div>
        )}
        {page.description}
      </div>

      <div className="w-1/2 mx-auto mt-10 text-2xl font-bold text-center font-roboto">
        Events scheduled at {page.title}
      </div>
      <div className="w-48 mx-auto mt-2 border-b-2 border-black dark:border-white"></div>
      <SpaceCalendar events={events} location={page.title} />
    </>
  );
}
