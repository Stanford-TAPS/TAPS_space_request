import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-5">
      <h1 className="text-3xl dark:text-white">
        Welcome to the TAPS Space Request page!
      </h1>
      <div className="flex space-x-4">
        <Link
          href="/view"
          className="p-5 text-2xl border-2 border-black bg-transparent transition-colors duration-200 hover:bg-gray-200 rounded hover:shadow-lg dark:border-white dark:text-white dark:hover:bg-gray-600"
        >
          View Spaces
        </Link>
        <Link
          href="/request"
          className="p-5 text-2xl text-white bg-red-500 transition-colors duration-200 hover:bg-red-700 rounded hover:shadow-lg"
        >
          Request a Space
        </Link>
      </div>
    </div>
  );
}
