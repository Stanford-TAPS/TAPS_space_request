"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function Navbar({ className }) {
  const [showSpacesDropdown, setShowSpacesDropdown] = useState(false);
  const [showMemAudDropdown, setShowMemAudDropdown] = useState(false);
  const [showRobleDropdown, setShowRobleDropdown] = useState(false);

  return (
    <nav className="flex flex-wrap items-center justify-between bg-red-800 p-4 text-xl text-white">
      <div className="flex items-center">
        <ul className="ml-6 flex">
          <li>
            <Link href="/" className="mr-6 p-4 hover:underline">
              HOME
            </Link>
          </li>
          <li>
            <Link href="/request" className="mr-6 p-4 hover:underline">
              REQUEST
            </Link>
          </li>
          <li>
            <div
              onMouseEnter={() => setShowSpacesDropdown(true)}
              onMouseLeave={() => setShowSpacesDropdown(false)}
            >
              <Link href="/spaces" className="mr-6 p-4 hover:underline">
                SPACES
              </Link>
              <div className="absolute flex">
                {showSpacesDropdown && (
                  <div className="z-10 mt-4 border border-red-900 shadow">
                    <div
                      className="w-full bg-red-800 p-4 outline-1 outline-white hover:outline"
                      onMouseEnter={() => setShowMemAudDropdown(true)}
                      onMouseLeave={() => setShowMemAudDropdown(false)}
                    >
                      <Link href="/spaces/memaud">Memorial Hall</Link>
                    </div>
                    <div
                      className="w-full bg-red-800 p-4 outline-1 outline-white hover:outline"
                      onMouseEnter={() => setShowRobleDropdown(true)}
                      onMouseLeave={() => setShowRobleDropdown(false)}
                    >
                      <Link href="/spaces/roble">Roble Gym</Link>
                    </div>
                    <div className="w-full bg-red-800 p-4 outline-1 outline-white hover:outline">
                      <Link href="/spaces/nitery"> Nitery Theater </Link>
                    </div>
                  </div>
                )}
                {/* {showMemAudDropdown && (
                  <div
                    onMouseEnter={() => setShowMemAudDropdown(true)}
                    onMouseLeave={() => setShowMemAudDropdown(false)}
                    className="-ml-2 bg-red-800 p-4"
                  >
                    MemAud spaces
                  </div>
                )}
                {showRobleDropdown && (
                  <div
                    onMouseEnter={() => setShowRobleDropdown(true)}
                    onMouseLeave={() => setShowRobleDropdown(false)}
                    className="-ml-2 bg-red-800 p-4"
                  >
                    Roble spaces
                  </div>
                )} */}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <Link
          href="/approve"
          className="mr-6 rounded-full border border-white px-4 py-2 outline-1 hover:outline max-sm:hidden"
        >
          Approval page
        </Link>
      </div>
    </nav>
  );
}
