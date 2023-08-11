import Link from "next/link";
import Image from "next/image";

export default function Navbar({ className }) {
  return (
    <nav className="fixed left-0 right-0 top-0 z-10 flex flex-wrap items-center justify-between bg-cardinal p-4 text-lg">
      <div className="flex items-center">
        <div className="height-28 mr-2 rounded-full bg-white p-1 px-2">
          <a
            href="https://taps.stanford.edu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/taps_home.png" alt="TAPS" width={110} height={100} />
          </a>
        </div>
        <ul className="ml-6 flex">
          <li className="mr-6">
            <Link href="/" className="text-white hover:text-gray-200">
              Home
            </Link>
          </li>
          <li className="mr-6">
            <Link href="/request" className="text-white hover:text-gray-200">
              Request a Space
            </Link>
          </li>
          <li className="mr-6">
            <Link href="/view" className="text-white hover:text-gray-200">
              Spaces
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <Link
          href="/approve"
          className="rounded-full border border-white px-4 py-2 text-white hover:text-gray-200"
        >
          Approval page
        </Link>
      </div>
    </nav>
  );
}
