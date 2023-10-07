import Image from "next/image";
import Link from "next/link";
import { getLocationPages } from "../../api/notion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWheelchair } from "@fortawesome/free-solid-svg-icons";
import { PrimaryButton } from "../../components/buttons";

export const dynamic = "force-dynamic";

export default async function MemAud() {
  const pages = await getLocationPages();
  const memAudPages = pages.filter(
    (page) => page.building == "2c3692d3-5f94-4d4b-a044-b8cb0fa52d7a",
  );
  return (
    <div className="flex flex-col content-center w-full bg-white dark:bg-neutral-900">
      <div className="relative flex items-center justify-center w-full overflow-hidden h-96">
        <Image
          src="/memaud.jpg"
          alt="a picture of the outside of Memorial Hall"
          fill={true}
          className="object-cover"
          priority={true}
        />
        <div className="z-10 border-4 border-white p-12 text-center font-roboto text-7xl font-bold text-white backdrop-blur-sm bg-black bg-opacity-50 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
          MEMORIAL HALL
        </div>
      </div>
      <div className="w-3/4 mx-auto mt-10 text-2xl font-normal text-center">
        Memorial Hall houses classrooms, rehearsal and performance spaces, the
        costume shop, scene shops, and TAPS faculty and production staff
        offices.
        <br />
        <br />
        Building hours: weekdays 8:30am - 11:00pm
      </div>
      <div className="self-center py-8">
        <PrimaryButton href="/request" text="Book Space in Memorial Hall" onClick={null} compact={false} />
      </div>

      <div className="p-2 mb-10 text-xl font-normal text-center">
        *not including Memorial Auditorium, which should be reserved through{" "}
        <a
          className="text-blue-800 dark:text-blue-500"
          target="_blank"
          href="https://25live.collegenet.com/pro/stanford#!/home/location/444/details"
        >
          25Live
        </a>
      </div>
      <div className="flex flex-row items-center justify-end w-full h-24 bg-neutral-100 font-roboto dark:bg-neutral-800">
        <div className="text-2xl italic font-bold">EXPLORE SPACES</div>
        <div className="ml-8 border-b-8 border-yellow-300 mr-36 w-96"></div>
      </div>
      <div className="flex m-10">
        {memAudPages.map((page) => {
          return (
            <Link
              href={`/spaces/${page.id}`}
              key={page.id}
              className="m-2 transition-all border-2 border-black shadow w-80 rounded-xl hover:shadow-lg dark:border-0 dark:bg-neutral-800"
            >
              <div className="relative w-full h-48 overflow-hidden rounded-t-lg bg-neutral-700">
                <Image
                  src={page.cover}
                  alt={`Cover image of ${page.title}`}
                  fill={true}
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="flex flex-col w-full p-4">
                <div className="text-2xl font-bold text-center font-roboto">
                  {page.title}
                </div>
                <div className="flex flex-wrap justify-center my-2">
                  {page.isAccessible ? (
                    <div className="flex self-center p-2 m-1 text-sm text-white bg-blue-600 rounded-full dark:bg-blue-700">
                      <FontAwesomeIcon
                        icon={faWheelchair}
                        className="pt-1 text-sm"
                      />
                      <div className="px-1">Accessible</div>
                    </div>
                  ) : (
                    <div className="p-2 m-1 text-sm text-white bg-red-600 rounded-full dark:bg-red-700">
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
