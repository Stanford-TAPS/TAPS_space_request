import { getLocationPages } from "../../api/notion";
import Image from "next/image";
import Link from "next/link";
import BackButton from "../components/back_button";

export async function generateStaticParams() {
  const pagesInfo = await getLocationPages();
  return pagesInfo.map((page) => ({
    id: page.id,
  }));
}

export default async function SpaceView({ params }) {
  const pagesInfo = await getLocationPages();
  const pageInfo = pagesInfo.find((page) => page.id == params.id);

  return (
    <>
      <BackButton className="absolute left-2 top-2 z-10 rounded bg-white p-2 dark:bg-black" />

      <div className="relative h-1/2 w-full overflow-hidden bg-neutral-800">
        <Image
          src={pageInfo.cover}
          alt={`Cover image of ${pageInfo.title}`}
          fill={true}
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>
      <div className="mt-2 text-center"></div>
      <div className="p-5 text-center text-3xl font-bold">{pageInfo.title}</div>
      <div className="text-md mx-auto w-1/2 rounded border-2 border-white p-4 text-center">
        {pageInfo.description}
      </div>
    </>
  );
}
