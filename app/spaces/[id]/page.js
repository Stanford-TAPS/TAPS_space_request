import { getLocationPages, getNextMonthEvents } from "../../api/notion";
import Image from "next/image";
import Link from "next/link";
import BackButton from "../components/back_button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWheelchair } from "@fortawesome/free-solid-svg-icons";
import SpaceCalendar from "../components/calendar";

export async function generateStaticParams() {
  const pagesInfo = await getLocationPages();
  return pagesInfo.map((page) => ({
    id: page.id,
  }));
}

export default async function SpaceView({ params }) {
  const pagesInfo = await getLocationPages();
  const pageInfo = pagesInfo.find((page) => page.id == params.id);
  const events = await getNextMonthEvents(pageInfo.id);

  return (
    <div className="bg-white text-black">
      <BackButton className="absolute left-2 top-2 z-10 rounded bg-white p-2" />

      <div className="relative flex h-80 w-full  items-center justify-center overflow-hidden bg-neutral-800">
        <Image
          src={pageInfo.cover}
          alt={`Cover image of ${pageInfo.title}`}
          fill={true}
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="font-roboto z-10 border-4 border-yellow-400 p-12 text-center text-5xl font-bold uppercase text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
          {pageInfo.title}
        </div>
      </div>
      <div className="my-4 flex justify-center">
        {pageInfo.isAccessible ? (
          <div className="m-1 flex w-fit self-center rounded-full bg-blue-600 p-2 text-white">
            <FontAwesomeIcon icon={faWheelchair} className="p-1" />
            <div className="pr-1">Accessible</div>
          </div>
        ) : (
          <div className="m-1 w-fit self-center rounded-full border-2 border-red-600 p-2 text-red-600">
            Not Accessible
          </div>
        )}
        {pageInfo.tags.map((tag) => {
          return (
            <div
              key={tag.id}
              className={`m-1 rounded-full bg-green-600 px-4 py-2 text-white`}
            >
              {tag.name}
            </div>
          );
        })}
      </div>

      <div className="text-md mx-auto w-fit max-w-2xl rounded border-2 border-black p-6 text-center">
        {pageInfo.capacity && (
          <div className="mb-2">
            <span className="mr-1 font-bold">Capacity</span>
            {pageInfo.capacity}
          </div>
        )}
        {pageInfo.description}
      </div>

      <div className="font-roboto mx-auto mt-10 w-1/2 text-center text-2xl font-bold">
        Events scheduled at {pageInfo.title}
      </div>
      <div className="mx-auto mt-2 w-48 border-b-2 border-black"></div>
      <SpaceCalendar events={events} location={pageInfo.title} />
    </div>
  );
}
