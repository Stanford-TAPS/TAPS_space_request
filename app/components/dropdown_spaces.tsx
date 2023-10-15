"use client"
import Link from 'next/link';
import React, { useState } from 'react';

const DropdownSpaces = () => {
    const [showSpacesDropdown, setShowSpacesDropdown] = useState(false);
    const [showMemAudDropdown, setShowMemAudDropdown] = useState(false);
    const [showRobleDropdown, setShowRobleDropdown] = useState(false);
    return (
        <li>
            <div
                onMouseEnter={() => setShowSpacesDropdown(true)}
                onMouseLeave={() => setShowSpacesDropdown(false)}
            >

                <div className="px-3 text-black transition-all duration-300 ease-in-out dark:text-white group" href="#">
                    <Link href="/spaces" className="bg-left-bottom bg-gradient-to-r from-black to-black dark:from-white dark:to-white bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out ">
                        SPACES
                    </Link>
                </div>

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
    );
};

export default DropdownSpaces;
