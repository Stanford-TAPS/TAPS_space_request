"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { signIn } from "next-auth/react";

export default function Navbar({ className }) {
  const [showSpacesDropdown, setShowSpacesDropdown] = useState(false);
  const [showMemAudDropdown, setShowMemAudDropdown] = useState(false);
  const [showRobleDropdown, setShowRobleDropdown] = useState(false);
  const user = useUser();

  return (
    <nav className="flex flex-wrap items-center justify-between p-4 text-xl text-white bg-red-800">
      <div className="flex items-center">
        <ul className="flex ml-6">
          <li>
            <Link href="/" className="p-4 mr-6 hover:underline">
              HOME
            </Link>
          </li>
          <li>
            <Link href="/request" className="p-4 mr-6 hover:underline">
              REQUEST
            </Link>
          </li>
          <li>
            <div
              onMouseEnter={() => setShowSpacesDropdown(true)}
              onMouseLeave={() => setShowSpacesDropdown(false)}
            >
              <Link href="/spaces" className="p-4 mr-6 hover:underline">
                SPACES
              </Link>
              <div className="absolute flex">
                {showSpacesDropdown && (
                  <div className="z-10 mt-4 border border-red-900 shadow">
                    <div
                      className="w-full p-4 bg-red-800 outline-1 outline-white hover:outline"
                      onMouseEnter={() => setShowMemAudDropdown(true)}
                      onMouseLeave={() => setShowMemAudDropdown(false)}
                    >
                      <Link href="/spaces/memaud">Memorial Hall</Link>
                    </div>
                    <div
                      className="w-full p-4 bg-red-800 outline-1 outline-white hover:outline"
                      onMouseEnter={() => setShowRobleDropdown(true)}
                      onMouseLeave={() => setShowRobleDropdown(false)}
                    >
                      <Link href="/spaces/roble">Roble Gym</Link>
                    </div>
                    <div className="w-full p-4 bg-red-800 outline-1 outline-white hover:outline">
                      <Link href="/spaces/nitery"> Nitery Theater </Link>
                    </div>

                  </div>
                )}
                {/* {showMemAudDropdown && (
                  <div
                    onMouseEnter={() => setShowMemAudDropdown(true)}
                    onMouseLeave={() => setShowMemAudDropdown(false)}
                    className="p-4 -ml-2 bg-red-800"
                  >
                    MemAud spaces
                  </div>
                )}
                {showRobleDropdown && (
                  <div
                    onMouseEnter={() => setShowRobleDropdown(true)}
                    onMouseLeave={() => setShowRobleDropdown(false)}
                    className="p-4 -ml-2 bg-red-800"
                  >
                    Roble spaces
                  </div>
                )} */}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex flex-row items-center pr-4">
        <SignedIn>
          {(user.user && user.user.publicMetadata.approver) ? <Link
            href="/approve"
            className="px-4 py-2 mr-6 border border-white rounded-full outline-1 hover:outline max-sm:hidden"
          >
            Approval page
          </Link> : null}
        </SignedIn>
        <div>
          <SignedIn>
            {/* Mount the UserButton component */}
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            {/* Signed out users get sign in button */}
            <SignInButton />
          </SignedOut>
        </div>

      </div>
    </nav>
  );
}
