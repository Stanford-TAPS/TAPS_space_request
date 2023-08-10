import Link from "next/link";
import Image from "next/image";

export default function Navbar({ className }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between flex-wrap bg-cardinal p-6">
      <div className="flex items-center">
        <a
          href="https://taps.stanford.edu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/path/to/icon.png" alt="TAPS" width={24} height={24} />
        </a>
        <ul className="flex ml-6">
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
            <Link href="/" className="text-white hover:text-gray-200">
              Spaces
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <Link
          href="/approve"
          className="text-white hover:text-gray-200 px-4 py-2 border border-white rounded"
        >
          Approval page
        </Link>
      </div>
    </nav>
  );
}
