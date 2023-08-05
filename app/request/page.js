import Link from "next/link";
export default function Default() {
  return (
    <div className="flex flex-col justify-center items-center p-5 space-y-5">
      <h1 className="text-2xl font-bold text-center md:mt-20">
        Select a location to view its availability
      </h1>
      <div className="p-5 border border-gray-200 shadow rounded w-full md:w-2/3 lg:w-1/2">
        <p className="mb-4">
          Please note that spaces can only be reserved for the following week.
          Available hours may vary by location, but are typically between 8:30
          am and 10:30 pm.{" "}
          <Link href="/view" className="text-blue-500 hover:underline">
            View Spaces
          </Link>{" "}
          for more information on individual spaces.
        </p>
      </div>
    </div>
  );
}
