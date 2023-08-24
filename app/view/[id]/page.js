import { getLocationPages } from "../../api/notion";
import Image from "next/image";
import Link from "next/link";

export default async function SpaceView({ params }) {
  const pagesInfo = await getLocationPages();
  const pageInfo = pagesInfo.find((page) => page.id == params.id);
  return (
    <>
      <Link
        href="/view"
        className="absolute left-2 top-2 z-10 rounded bg-white p-2 dark:bg-black"
      >
        Back
      </Link>
      <div className="relative h-1/2 w-full overflow-hidden">
        <Image
          src={pageInfo.cover}
          alt={`Cover image of ${pagesInfo.title}`}
          fill={true}
          className="object-cover"
        />
      </div>
      <div className="p-5 text-center text-3xl font-bold">{pageInfo.title}</div>
      <div className="text-md mx-auto w-1/2 rounded border-2 border-white p-4">
        {pageInfo.description}
      </div>
    </>
  );
}
