import Image from "next/image";
import Link from "next/link";
import { getLocationPages } from "../../api/notion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWheelchair } from "@fortawesome/free-solid-svg-icons";

export const dynamic = "force-dynamic";

export default async function MemAud() {
  const pages = await getLocationPages();
  const memAudPages = pages.filter(
    (page) => page.building == "2c3692d3-5f94-4d4b-a044-b8cb0fa52d7a",
  );
  return (
    <div className="flex w-full flex-col content-center bg-white dark:bg-neutral-900">
      <div className="relative flex h-96 w-full items-center justify-center overflow-hidden">
        <Image
          src="/memaud.jpg"
          alt="a picture of the outside of Memorial Hall"
          fill={true}
          className="object-cover"
          priority={true}
        />
        <div className="z-10 border-4 border-yellow-400 p-12 text-center font-roboto text-7xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
          MEMORIAL HALL
        </div>
      </div>
      <div className="mx-auto mt-10 w-3/4 text-center text-2xl">
        Memorial Hall houses classrooms, rehearsal and performance spaces, the
        costume shop, scene shops, and TAPS faculty and production staff
        offices.
        <br />
        <br />
        Building hours: weekdays 8:30am - 11:00pm
      </div>
      <button className="mx-auto mt-10 w-fit rounded bg-red-600 px-8 py-4 text-center font-roboto text-3xl font-bold text-white transition-all  hover:bg-red-700">
        Book a Space in Memorial Hall*
      </button>
      <div className="mb-10 p-2 text-center text-xl">
        *not including Memorial Auditorium, which should be reserved through{" "}
        <a
          className="text-blue-800 dark:text-blue-500"
          target="_blank"
          href="https://25live.collegenet.com/pro/stanford#!/home/location/444/details"
        >
          25Live
        </a>
      </div>
      <div className="flex h-24 w-full flex-row items-center justify-end bg-neutral-100 font-roboto dark:bg-neutral-800">
        <div className="text-2xl font-bold italic">EXPLORE SPACES</div>
        <div className="ml-8 mr-36 w-96 border-b-8 border-yellow-300"></div>
      </div>
      <div className="m-10 flex">
        {memAudPages.map((page) => {
          return (
            <Link
              href={`/spaces/${page.id}`}
              key={page.id}
              className="m-2 w-80 rounded-xl border-2 border-black shadow transition-all hover:w-[22rem] dark:border-0 dark:bg-neutral-800"
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
                <div className="text-center font-roboto text-2xl font-bold">
                  {page.title}
                </div>
                <div className="my-2 flex flex-wrap justify-center">
                  {page.isAccessible ? (
                    <div className="m-1 flex self-center rounded-full bg-blue-600 p-2 text-sm text-white dark:bg-blue-700">
                      <FontAwesomeIcon
                        icon={faWheelchair}
                        className="pt-1 text-sm"
                      />
                      <div className="px-1">Accessible</div>
                    </div>
                  ) : (
                    <div className="m-1 rounded-full bg-red-600 p-2 text-sm text-white dark:bg-red-700">
                      Not Accessible
                    </div>
                  )}
                  {page.tags.map((tag) => {
                    return (
                      <div
                        key={tag.id}
                        className={`m-1 rounded-full bg-green-600 px-4 py-2 text-sm text-white dark:bg-green-700`}
                      >
                        {tag.name}
                      </div>
                    );
                  })}
                </div>
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
