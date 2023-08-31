import Image from "next/image";
import Link from "next/link";
import { getLocationPages } from "../../api/notion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWheelchair } from "@fortawesome/free-solid-svg-icons";

export default async function MemAud() {
  const pages = await getLocationPages();
  const roblePages = pages.filter(
    (page) => page.building == "b65c43f3-beff-43fa-874f-74d6f4f00413",
  );
  return (
    <div className="flex flex-col content-center bg-white">
      <div className="relative flex h-96 w-full items-center justify-center overflow-hidden">
        <Image
          src="/roble.jpg"
          alt="a picture of the outside of Roble Gym"
          fill={true}
          className="object-cover"
          priority={true}
        />
        <div className="font-roboto z-10 border-4 border-yellow-400 p-12 text-center text-7xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
          ROBLE GYM
        </div>
      </div>
      <div className="mx-auto mt-10 w-3/4 text-center text-2xl text-black">
        Roble Gym houses classrooms, acting and dance studios, performance
        spaces, the TAPS main office, and faculty and administrative staff
        offices.
        <br />
        <br />
        Building hours: weekdays 8:30am - 10:50pm
      </div>
      <button className="font-roboto mx-auto my-10 w-fit rounded bg-red-600 px-8 py-4 text-center text-3xl font-bold text-white transition-all  hover:bg-red-700">
        Book a Space in Roble Gym
      </button>
      <div className="font-roboto flex h-24 w-full flex-row items-center justify-end bg-zinc-100">
        <div className="text-2xl font-bold italic text-black">
          EXPLORE SPACES
        </div>
        <div className="ml-8 mr-36 w-96 border-b-8 border-yellow-300"></div>
      </div>
      <div className="m-10 flex flex-wrap">
        {roblePages.map((page) => {
          return (
            <Link
              href={`/spaces/${page.id}`}
              key={page.id}
              className="mx-2 my-4 w-80 shrink-0 overflow-hidden rounded-xl border-2 border-black text-black shadow transition-all hover:mx-0 hover:w-[21rem]"
            >
              <div className="relative h-48 w-full overflow-hidden bg-neutral-700">
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
                <div className="my-4 flex flex-wrap justify-center">
                  {page.isAccessible ? (
                    <div className="mt-1 flex w-fit self-center rounded-full bg-blue-600 p-2 text-sm text-white">
                      <FontAwesomeIcon
                        icon={faWheelchair}
                        className="pt-1 text-sm"
                      />
                      <div className="px-1">Accessible</div>
                    </div>
                  ) : (
                    <div className="mt-1 w-fit self-center rounded-full border-2 border-red-600 p-2 text-sm text-red-600">
                      Not Accessible
                    </div>
                  )}
                  {page.tags.map((tag) => {
                    return (
                      <div
                        key={tag.id}
                        className={`m-1 rounded-full bg-green-600 px-4 py-2 text-sm text-white`}
                      >
                        {tag.name}
                      </div>
                    );
                  })}
                </div>
                {page.capacity && (
                  <div className="mt-2">
                    <span className="mr-1 font-bold">Capacity</span>
                    {page.capacity}
                  </div>
                )}
                <div className="mt-2">{page.description}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
