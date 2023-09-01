import { getLocationPages } from "../api/notion";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function View() {
  //const pagesInfo = await getLocationPages();
  return (
    <div className="align-center relative flex w-full flex-col bg-white dark:bg-neutral-900">
      <div className="flex h-72 w-full flex-row">
        <Link
          href="/spaces/memaud"
          className="group relative h-full w-1/3 overflow-hidden"
        >
          <Image
            src="/memaud.jpg"
            alt="MemAud"
            fill={true}
            className="object-cover"
          />
          <div className="absolute inset-0 z-10 bg-black opacity-40 transition-all group-hover:opacity-20"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <p className="z-20 font-roboto text-2xl font-bold">MEMORIAL HALL</p>
          </div>
        </Link>
        <Link
          href="/spaces/roble"
          className="group relative h-full w-1/3 overflow-hidden"
        >
          <Image
            src="/roble.jpg"
            alt="Roble Gym"
            fill={true}
            className="object-cover"
          />
          <div className="absolute inset-0 z-10 bg-black opacity-40 transition-all group-hover:opacity-20"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <p className="z-20 font-roboto text-2xl font-bold">ROBLE GYM</p>
          </div>
        </Link>
        <Link
          href="spaces/nitery"
          className="group relative h-full w-1/3 overflow-hidden"
        >
          <Image
            src="/nitery.jpg"
            alt="The Nitery"
            fill={true}
            className="object-cover"
          />
          <div className="absolute inset-0 z-10 bg-black opacity-40 transition-all group-hover:opacity-20"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <p className="z-20 font-roboto text-2xl font-bold">
              NITERY THEATER
            </p>
          </div>
        </Link>
      </div>
      <div className="mt-10 text-center font-roboto text-6xl font-bold text-black dark:text-white">
        TAPS SPACES
      </div>
      <div className="m-auto mb-10 mt-6 w-16 border-2 border-red-900 dark:border-red-700"></div>
      <div className="m-auto w-1/2 text-center text-2xl text-black dark:text-white">
        TAPS maintains facilities for classes, rehearsals, design work,
        performances, and more.
        <br />
        <br />
        Please note that our spaces are highly sought-after. Student groups
        interested in reserving a TAPS space should review our policies:
      </div>
      <a
        href="https://taps.stanford.edu/space-usage/"
        target="_blank"
        className="m-auto mb-20 mt-8 rounded bg-black px-8 py-4 text-2xl font-bold text-white ring-black hover:shadow-lg hover:ring-2 dark:bg-neutral-900 dark:ring-1 dark:ring-white"
      >
        TAPS Space Use Guidelines
      </a>
      <div className="flex w-full flex-row justify-between bg-neutral-200 p-12 dark:bg-neutral-800">
        <div className="relative h-auto w-full overflow-hidden">
          <Image
            src="/memaud.jpg"
            alt="a picture of the outside of Memorial Hall"
            fill={true}
            className="object-cover"
          />
        </div>
        <div className="max-w-xl px-4 py-8 pl-16 ">
          <div className="text-center font-roboto text-5xl font-bold">
            MEMORIAL HALL
          </div>
          <div className="m-auto mb-3 mt-3 w-16 border border-black dark:border-white"></div>
          <a
            target="_blank"
            href="https://goo.gl/maps/WUqaZN9qbpfpxC5i9"
            className="group mx-auto flex w-fit flex-row justify-center"
          >
            <FontAwesomeIcon
              icon={faLocationDot}
              className="m-5 ml-0 text-2xl transition-all group-hover:text-blue-600"
            />
            <div className="text-left text-xl leading-relaxed">
              551 JANE STANFORD WAY <br />
              STANFORD CA 94305
            </div>
          </a>
          <div className="flex flex-row justify-evenly py-4">
            <a
              target="_blank"
              href="https://taps.stanford.edu/venue-information/"
              className="rounded border-2 border-red-600 px-6 py-2 text-center font-roboto text-2xl font-bold text-red-600 hover:shadow-lg hover:outline hover:outline-1"
            >
              Building Info
            </a>
            <Link
              href="/spaces/memaud"
              className="rounded border-2 border-red-600 bg-red-600 px-6 py-2 text-center font-roboto text-2xl font-bold text-white outline-red-600 hover:shadow-lg hover:outline hover:outline-1"
            >
              View Spaces
            </Link>
          </div>
          <div className="text-center text-xl leading-relaxed">
            Memorial Hall houses classrooms, rehearsal and performance spaces,
            the costume shop, scene shops, and TAPS faculty and production staff
            offices.
            <br />
            <br />
            Memorial Hall also houses Memorial Auditorium (MemAud), the largest
            indoor performance space at Stanford, which opened in 1938.
            Commemorating students and faculty who lost their lives in the armed
            services, MemAud is now primarily used to present musicals and dance
            shows, as well as University special events. It features a large
            proscenium stage, and orchestra and balcony seating for over 1700
            audience members.
          </div>
        </div>
      </div>
      <div className="flex w-full flex-row justify-between bg-white p-12 dark:bg-neutral-900">
        <div className="max-w-xl px-4 py-8 pr-16 ">
          <div className="text-center font-roboto text-5xl font-bold">
            ROBLE GYM
          </div>
          <div className="m-auto mb-6 mt-3 w-16 border border-black dark:border-white"></div>
          <a
            target="_blank"
            href="https://goo.gl/maps/Q9x9AD9xTCj2j4JQA"
            className="group flex flex-row justify-center"
          >
            <FontAwesomeIcon
              icon={faLocationDot}
              className="m-5 ml-0 text-2xl transition-all group-hover:text-blue-600"
            />
            <div className="text-left text-xl leading-relaxed">
              375 SANTA TERESA STREET <br />
              STANFORD, CA 94305
            </div>
          </a>
          <div className="flex flex-row justify-evenly py-4">
            <a
              target="_blank"
              href="https://taps.stanford.edu/roble-gym/"
              className="rounded border-2 border-red-600 px-6 py-2 text-center font-roboto text-2xl font-bold text-red-600 hover:shadow-lg hover:outline hover:outline-1"
            >
              Building Info
            </a>
            <Link
              href="/spaces/roble"
              className="rounded border-2 border-red-600 bg-red-600 px-6 py-2 text-center font-roboto text-2xl font-bold text-white outline-red-600 hover:shadow-lg hover:outline hover:outline-1"
            >
              View Spaces
            </Link>
          </div>
          <div className="text-center text-xl leading-relaxed">
            Roble Gymnasium Building re-opened in 2016 as Stanford’s newest arts
            building. Originally built in 1931 as the women’s gymnasium, the $28
            million renovation created new theatrical performance spaces and
            updated several dance studios, rehearsal spaces, and classrooms.
            Roble houses the Harry J. Elam, Jr. Theater (formerly Roble Studio
            Theater), a large black box theater; the Roble Dance Studio, a
            beautiful dance performance space in keeping with its original
            Spanish architecture; several acting and dance rehearsal spaces; the
            TAPS main office; faculty offices; and administrative staff offices.
            Spaces in Roble Gymnasium Building are managed by TAPS.
          </div>
        </div>
        <div className="relative h-auto w-full overflow-hidden">
          <Image
            src="/roble.jpg"
            alt="a picture of the outside of Roble Gym"
            fill={true}
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex w-full flex-row justify-between bg-neutral-200 p-12 dark:bg-neutral-800">
        <div className="relative h-auto w-full overflow-hidden">
          <Image
            src="/nitery.jpg"
            alt="a picture of the Nitery theater"
            fill={true}
            className="object-cover"
          />
        </div>
        <div className="max-w-xl px-4 py-8 pl-16 ">
          <div className="text-center font-roboto text-5xl font-bold">
            NITERY THEATER
          </div>
          <div className="m-auto mb-3 mt-3 w-16 border border-black dark:border-white"></div>
          <a
            target="_blank"
            href="https://goo.gl/maps/avZjhGXb2Twr8mgY7"
            className="group mx-auto flex w-fit flex-row justify-center"
          >
            <FontAwesomeIcon
              icon={faLocationDot}
              className="m-5 ml-0 text-2xl transition-all group-hover:text-blue-600"
            />
            <div className="text-left text-xl leading-relaxed">
              514 LASUEN MALL <br />
              STANFORD, CA 94305
            </div>
          </a>
          <div className="flex flex-row justify-evenly py-4">
            <Link
              href="/spaces/nitery"
              className="rounded border-2 border-red-600 bg-red-600 px-6 py-2 text-center font-roboto text-2xl font-bold text-white outline-red-600 hover:shadow-lg hover:outline hover:outline-1"
            >
              View Info
            </Link>
          </div>
          <div className="text-center text-xl leading-relaxed">
            Nitery Theater is located in the Old Union and is home to the
            Experimental Nitery Studio. An intimate black-box theater, Nitery is
            outfitted with full lighting, projection, and sound equipment for
            performances. With a flexible seating capacity of 71-83, the Nitery
            features TAPS’s undergraduate capstone projects, graduate projects,
            and other student productions as curated by the Experimental Nitery
            Studio Board. This space is managed by TAPS.
          </div>
        </div>
      </div>
    </div>
  );
}
{
  /* <div className="align-center flex h-full flex-col justify-center text-center text-2xl">
      {pagesInfo.map((pageInfo) => (
        <Link href={`/spaces/${pageInfo.id}`} key={pageInfo.id} className="p-1">
          {pageInfo.title}
        </Link>
      ))}
    </div> */
}
