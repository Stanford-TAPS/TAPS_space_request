import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-5">
      <h1 className="font-playfair m-4 text-center text-2xl font-bold dark:text-white md:text-5xl">
        Welcome to the TAPS Space Request page!
      </h1>
      <div className="flex space-x-4">
        <Link
          href="/view"
          className="rounded border-2 border-black bg-transparent p-3 text-xl transition-colors duration-200 hover:bg-gray-200 hover:shadow-lg dark:border-white dark:text-white dark:hover:bg-gray-600 md:text-2xl"
        >
          View Spaces
        </Link>
        <Link
          href="/request"
          className="rounded bg-red-500 p-3 text-xl text-white transition-colors duration-200 hover:bg-red-700 hover:shadow-lg md:text-2xl"
        >
          Request a Space
        </Link>
      </div>
    </div>
  );
}
