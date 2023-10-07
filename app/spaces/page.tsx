import { getLocationPages } from "../api/notion";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { PrimaryButton, SecondaryButton } from "../components/buttons";

export default function View() {
  //const pagesInfo = await getLocationPages();
  return (
    <div className="relative flex flex-col w-full bg-white align-center dark:bg-neutral-900">
      <div className="flex flex-row w-full h-72">
        <Link
          href="/spaces/memaud"
          className="relative w-1/3 h-full overflow-hidden group"
        >
          <Image
            src="/memaud.jpg"
            alt="MemAud"
            fill={true}
            className="object-cover"
          />
          <div className="absolute inset-0 z-10 transition-all bg-black opacity-40 group-hover:opacity-20"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <p className="z-20 text-2xl font-bold font-roboto">MEMORIAL HALL</p>
          </div>
        </Link>
        <Link
          href="/spaces/roble"
          className="relative w-1/3 h-full overflow-hidden group"
        >
          <Image
            src="/roble.jpg"
            alt="Roble Gym"
            fill={true}
            className="object-cover"
          />
          <div className="absolute inset-0 z-10 transition-all bg-black opacity-40 group-hover:opacity-20"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <p className="z-20 text-2xl font-bold font-roboto">ROBLE GYM</p>
          </div>
        </Link>
        <Link
          href="spaces/nitery"
          className="relative w-1/3 h-full overflow-hidden group"
        >
          <Image
            src="/nitery.jpg"
            alt="The Nitery"
            fill={true}
            className="object-cover"
          />
          <div className="absolute inset-0 z-10 transition-all bg-black opacity-40 group-hover:opacity-20"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <p className="z-20 text-2xl font-bold font-roboto">
              NITERY THEATER
            </p>
          </div>
        </Link>
      </div>
      <div className="mt-10 text-6xl font-bold text-center text-black font-roboto dark:text-white">
        TAPS SPACES
      </div>
      <div className="w-16 m-auto mt-6 mb-10 border-2 border-red-900 dark:border-red-700"></div>
      <div className="w-1/2 m-auto text-2xl text-center text-black dark:text-white">
        TAPS maintains facilities for classes, rehearsals, design work,
        performances, and more.
        <br />
        <br />
        Please note that our spaces are highly sought-after. Student groups
        interested in reserving a TAPS space should review our policies:
      </div>
      <Link
        href="https://taps.stanford.edu/space-usage/"
        target="_blank"
        className="px-8 py-4 m-auto mt-8 mb-20 text-2xl font-bold text-white bg-black ring-black hover:shadow-lg hover:ring-2 dark:bg-neutral-900 dark:ring-1 dark:ring-white"
      >
        TAPS Space Use Guidelines
      </Link>
      <div className="flex flex-row justify-between w-full p-12 bg-neutral-200 dark:bg-neutral-800">
        <div className="relative w-full h-auto overflow-hidden">
          <Image
            src="/memaud.jpg"
            alt="a picture of the outside of Memorial Hall"
            fill={true}
            className="object-cover"
          />
        </div>
        <div className="max-w-xl px-4 py-8 pl-16 ">
          <div className="text-5xl font-bold text-center font-roboto">
            MEMORIAL HALL
          </div>
          <div className="w-16 m-auto mt-3 mb-3 border border-black dark:border-white"></div>
          <a
            target="_blank"
            href="https://goo.gl/maps/WUqaZN9qbpfpxC5i9"
            className="flex flex-row justify-center mx-auto group w-fit"
          >
            <FontAwesomeIcon
              icon={faLocationDot}
              className="m-5 ml-0 text-2xl transition-all group-hover:text-blue-600"
            />
            <div className="text-xl leading-relaxed text-left">
              551 JANE STANFORD WAY <br />
              STANFORD CA 94305
            </div>
          </a>
          <div className="flex flex-row justify-center py-4 space-x-4">
            <SecondaryButton href="https://taps.stanford.edu/venue-information/" text="Building Info" onClick={null} compact />
            <PrimaryButton href="/spaces/memaud" text="View Spaces" onClick={null} compact />
          </div>
          <div className="text-base font-normal text-center leadinng-relaxed">
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
      <div className="flex flex-row justify-between w-full p-12 bg-white dark:bg-neutral-900">
        <div className="max-w-xl px-4 py-8 pr-16 ">
          <div className="text-5xl font-bold text-center font-roboto">
            ROBLE GYM
          </div>
          <div className="w-16 m-auto mt-3 mb-6 border border-black dark:border-white"></div>
          <a
            target="_blank"
            href="https://goo.gl/maps/Q9x9AD9xTCj2j4JQA"
            className="flex flex-row justify-center group"
          >
            <FontAwesomeIcon
              icon={faLocationDot}
              className="m-5 ml-0 text-2xl transition-all group-hover:text-blue-600"
            />
            <div className="text-xl leading-relaxed text-left">
              375 SANTA TERESA STREET <br />
              STANFORD, CA 94305
            </div>
          </a>
          <div className="flex flex-row justify-center py-4 space-x-4">
            <SecondaryButton href="https://taps.stanford.edu/roble-gym/" text="Building Info" onClick={null} compact />
            <PrimaryButton href="/spaces/roble" text="View Spaces" onClick={null} compact />
          </div>
          <div className="text-base font-normal text-center leadinng-relaxed">
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
        <div className="relative w-full h-auto overflow-hidden">
          <Image
            src="/roble.jpg"
            alt="a picture of the outside of Roble Gym"
            fill={true}
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex flex-row justify-between w-full p-12 bg-neutral-200 dark:bg-neutral-800">
        <div className="relative w-full h-auto overflow-hidden">
          <Image
            src="/nitery.jpg"
            alt="a picture of the Nitery theater"
            fill={true}
            className="object-cover"
          />
        </div>
        <div className="max-w-xl px-4 py-8 pl-16 ">
          <div className="text-5xl font-bold text-center font-roboto">
            NITERY THEATER
          </div>
          <div className="w-16 m-auto mt-3 mb-3 border border-black dark:border-white"></div>
          <a
            target="_blank"
            href="https://goo.gl/maps/avZjhGXb2Twr8mgY7"
            className="flex flex-row justify-center mx-auto group w-fit"
          >
            <FontAwesomeIcon
              icon={faLocationDot}
              className="m-5 ml-0 text-2xl transition-all group-hover:text-blue-600"
            />
            <div className="text-xl leading-relaxed text-left">
              514 LASUEN MALL <br />
              STANFORD, CA 94305
            </div>
          </a>
          <div className="flex flex-row py-4 justify-evenly">
            <PrimaryButton href="/spaces/nitery" text="View Info" onClick={null} compact />
          </div>
          <div className="text-base font-normal text-center leadinng-relaxed">
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
  /* <div className="flex flex-col justify-center h-full text-2xl text-center align-center">
      {pagesInfo.map((pageInfo) => (
        <Link href={`/spaces/${pageInfo.id}`} key={pageInfo.id} className="p-1">
          {pageInfo.title}
        </Link>
      ))}
    </div> */
}
