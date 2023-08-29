import Image from "next/image";

export default function MemAud() {
  return (
    <div className="flex w-full flex-col items-center bg-white">
      <div className="relative flex h-96 w-full items-center justify-center overflow-hidden">
        <Image
          src="/memaud.jpg"
          alt="a picture of the outside of Memorial Hall"
          fill={true}
          className="object-cover"
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
    </div>
  );
}
