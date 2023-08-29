import Link from "next/link";
import Image from "next/image";

export default function Navbar({ className }) {
  return (
    <nav className="flex flex-wrap items-center justify-between bg-cardinal p-4 text-xl">
      <div className="flex items-center">
        <ul className="ml-6 flex">
          <li className="mr-6">
            <Link href="/" className="text-white hover:text-gray-200">
              HOME
            </Link>
          </li>
          <li className="mr-6">
            <Link href="/request" className="text-white hover:text-gray-200">
              REQUEST
            </Link>
          </li>
          <li className="mr-6">
            <Link href="/spaces" className="text-white hover:text-gray-200">
              SPACES
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <Link
          href="/approve"
          className="rounded-full border border-white px-4 py-2 text-white hover:text-gray-200 max-sm:hidden"
        >
          Approval page
        </Link>
      </div>
    </nav>
  );
}
