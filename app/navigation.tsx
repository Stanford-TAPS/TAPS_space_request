"use client";
import Link from "next/link";
import React, { useState } from "react";
import { SignedIn, UserButton, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faUserShield } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ className }) {
  const [showSpacesDropdown, setShowSpacesDropdown] = useState(false);
  const [showMemAudDropdown, setShowMemAudDropdown] = useState(false);
  const [showRobleDropdown, setShowRobleDropdown] = useState(false);

  const user = useUser();

  return (
    <nav className="flex flex-wrap items-center justify-between p-4 text-base text-white bg-transparent backdrop-blur-sm">
      <div className="flex items-center">
        <ul className="flex ml-6">
          <li>
            <a className="px-3 text-white transition-all duration-300 ease-in-out group" href="#">
              <Link href="/" className="bg-left-bottom bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out ">
                HOME
              </Link>
            </a>
          </li>
          <li>
            <a className="px-3 text-white transition-all duration-300 ease-in-out group" href="#">
              <Link href="/request" className="bg-left-bottom bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out ">
                REQUEST
              </Link>
            </a>
          </li>
          <li>
            <div
              onMouseEnter={() => setShowSpacesDropdown(true)}
              onMouseLeave={() => setShowSpacesDropdown(false)}
            >

              <a className="px-3 text-white transition-all duration-300 ease-in-out group" href="#">
                <Link href="/spaces" className="bg-left-bottom bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out ">
                  SPACES
                </Link>
              </a>

              <div className="absolute flex">
                {showSpacesDropdown && (
                  <div className="z-10 mt-4 border border-red-900 shadow">
                    <div
                      className="w-full p-4 bg-red-800 outline-1 outline-white hover:outline"
                      onMouseEnter={() => setShowMemAudDropdown(true)}
                      onMouseLeave={() => setShowMemAudDropdown(false)}
                    >
                      <Link href="/spaces/memaud" >Memorial Hall</Link>
                    </div>
                    <div
                      className="w-full p-4 bg-red-800 outline-1 outline-white hover:outline"
                      onMouseEnter={() => setShowRobleDropdown(true)}
                      onMouseLeave={() => setShowRobleDropdown(false)}
                    >
                      <Link href="/spaces/roble" >Roble Gym</Link>
                    </div>
                    <div className="w-full p-4 bg-red-800 outline-1 outline-white hover:outline">
                      <Link href="/spaces/nitery" > Nitery Theater </Link>
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
          { /* Approval page icon Font awesome */}
          {(user.user && user.user.publicMetadata.approver) ? <Link href="/approve" className="px-3 py-2 mx-2 hover:bg-red-900"><div><a className="pr-1">APPROVALS</a> <FontAwesomeIcon icon={faUserShield} /></div></Link> : null}
        </SignedIn>
        <div>
          <SignedIn>
            {/* Mount the UserButton component */}
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            {/* Signed out users get sign in button */}
            <SignInButton>
              <a className="px-3 text-white transition-all duration-300 ease-in-out group" href="#">
                <Link href="#" className="bg-left-bottom bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out ">
                  SIGN IN
                </Link>
              </a>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
