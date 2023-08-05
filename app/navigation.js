import Link from "next/link";

export default function Navbar({ className }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between flex-wrap bg-cardinal p-6">
      <ul className="flex">
        <li className="mr-6">
          <Link className="text-white hover:text-gray-200" href="/">
            Home
          </Link>
        </li>
        <li className="mr-6">
          <Link className="text-white hover:text-gray-200" href="/request">
            Request a Space
          </Link>
        </li>
        <li className="mr-6">
          <Link className="text-white hover:text-gray-200" href="/">
            Spaces
          </Link>
        </li>
      </ul>
    </nav>
  );
}
