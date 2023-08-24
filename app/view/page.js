import { getLocationPages } from "../api/notion";
import Link from "next/link";

export default async function View() {
  const pagesInfo = await getLocationPages();
  return (
    <div className="align-center flex h-full flex-col justify-center text-center text-2xl">
      {pagesInfo.map((pageInfo) => (
        <Link href={`/view/${pageInfo.id}`} key={pageInfo.id} className="p-1">
          {pageInfo.title}
        </Link>
      ))}
    </div>
  );
}
