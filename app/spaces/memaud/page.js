import Image from "next/image";
import Link from "next/link";
import { getLocationPages } from "../../api/notion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWheelchair } from "@fortawesome/free-solid-svg-icons";

export default async function MemAud() {
  const pages = await getLocationPages();
  const memAudPages = pages.filter(
    (page) => page.building == "2c3692d3-5f94-4d4b-a044-b8cb0fa52d7a",
  );
  return (
    <div className="flex w-full flex-col content-center bg-white">
      <div className="relative flex h-96 w-full items-center justify-center overflow-hidden">
        <Image
          src="/memaud.jpg"
          alt="a picture of the outside of Memorial Hall"
          fill={true}
          className="object-cover"
          priority={true}
        />
        <div className="font-roboto z-10 border-4 border-yellow-400 p-12 text-center text-7xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
          MEMORIAL HALL
        </div>
      </div>
      <div className="mx-auto mt-10 w-3/4 text-center text-2xl text-black">
        Memorial Hall houses classrooms, rehearsal and performance spaces, the
        costume shop, scene shops, and TAPS faculty and production staff
        offices.
        <br />
        <br />
        Building hours: weekdays 8:30am - 11:00pm
      </div>
      <button className="font-roboto mx-auto mt-10 w-fit rounded bg-red-600 px-8 py-4 text-center text-3xl font-bold text-white">
        Book a Space in Memorial Hall*
      </button>
      <div className="mb-10 p-2 text-center text-xl text-black">
        *not including Memorial Auditorium, which should be reserved through{" "}
        <a
          className="text-blue-800"
          target="_blank"
          href="https://25live.collegenet.com/pro/stanford#!/home/location/444/details"
        >
          25Live
        </a>
      </div>
      <div className="font-roboto flex h-24 w-full flex-row items-center justify-end bg-zinc-100">
        <div className="text-2xl font-bold italic text-black">
          EXPLORE SPACES
        </div>
        <div className="ml-8 mr-36 w-96 border-b-8 border-yellow-300"></div>
      </div>
      <div className="m-10 flex">
        {memAudPages.map((page) => {
          return (
            <Link
              href={`/spaces/${page.id}`}
              key={page.id}
              className="m-2 w-80 rounded-xl border-2 border-black text-black shadow transition-all hover:w-[22rem]"
            >
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-neutral-700">
                <Image
                  src={page.cover}
                  alt={`Cover image of ${page.title}`}
                  fill={true}
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="flex w-full flex-col p-4">
                <div className="font-roboto mb-2 text-center text-2xl font-bold">
                  {page.title}
                </div>
                {page.isAccessible ? (
                  <div className="mt-1 flex w-fit self-center rounded-full bg-blue-600 p-2 text-sm text-white">
                    <FontAwesomeIcon icon={faWheelchair} className="p-1" />
                    <div className="pr-1">Accessible</div>
                  </div>
                ) : (
                  <div className="mt-1 w-fit self-center rounded-full border-2 border-red-600 p-2 text-sm text-red-600">
                    Not Accessible
                  </div>
                )}
                <div className="my-2">
                  <span className="mr-1 font-bold">Capacity</span>
                  {page.capacity}
                </div>
                <div>{page.description}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
