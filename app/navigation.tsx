import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserShield } from "@fortawesome/free-solid-svg-icons";
import { UserAvatar } from "./components/user_avatar";
import DropdownSpaces from "./components/dropdown_spaces";
import { ShowIfAuthorized } from "./components/not_authorized";
import { auth } from "../auth";

export default async function Navbar({ className }) {

  const session = await auth();
  return (
    <nav className="flex flex-wrap items-center justify-between p-4 text-base text-white shadow dark:bg-cardinal backdrop-blur-sm" >
      <div className="flex items-center">
        <ul className="flex items-center ml-6">

          <li className="pr-4">
            <Link href="/">
              <svg width="63" height="63" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#prefix__clip0_225_2)" className="fill-black dark:fill-white">
                  <path fillRule="evenodd" clipRule="evenodd" d="M62.5 31.25L31.25 0 0 31.25l21.773 21.773 7.066-7.066 1.018 1.018-2.98 2.98 8.459 8.46-1.148 1.147-8.459-8.46-2.938 2.939L31.25 62.5l26.495-26.495c-.203.113-.408.21-.614.29-.712.274-1.407.358-2.082.25-.673-.111-1.287-.407-1.842-.889l1.185-1.184c.388.327.805.502 1.25.527.443.019.884-.077 1.322-.287a4.607 4.607 0 001.222-.888c.438-.438.76-.902.967-1.393.204-.494.28-.97.227-1.43a2.016 2.016 0 00-.602-1.212c-.314-.315-.658-.483-1.032-.505a2.737 2.737 0 00-1.175.213c-.41.164-.828.366-1.254.606l-1.5.833c-.952.528-1.843.81-2.67.847-.826.037-1.559-.264-2.197-.902-.53-.53-.85-1.137-.958-1.819-.108-.688-.028-1.385.24-2.091.269-.713.705-1.372 1.31-1.976.61-.611 1.263-1.045 1.957-1.3.691-.26 1.364-.34 2.018-.241a3.13 3.13 0 011.726.837l-1.11 1.11a2.054 2.054 0 00-1.768-.416c-.654.136-1.268.49-1.842 1.065-.42.42-.719.854-.898 1.305-.175.447-.233.877-.17 1.29.064.411.247.767.55 1.07.253.253.53.41.833.472.302.055.609.047.92-.024.31-.073.607-.177.894-.31.283-.135.536-.268.759-.398l1.221-.703c.312-.182.676-.367 1.092-.555a5.38 5.38 0 011.342-.407 3.367 3.367 0 011.444.055c.488.123.953.407 1.398.852.512.512.84 1.109.985 1.79.148.68.088 1.396-.18 2.152a4.715 4.715 0 01-.332.73L62.5 31.25zM39.368 54.382l-1.203 1.203-.637-1.378-.17 1.706-1.324-1.324.14-1.485a4.029 4.029 0 01-1.78-.398 5.808 5.808 0 01-1.64-1.137c-.628-.627-1.053-1.283-1.277-1.966-.224-.684-.258-1.349-.103-1.995.156-.646.491-1.227 1.007-1.742.301-.302.624-.529.97-.682l-1.183-2.556 1.185-1.185 3.857 1.785c.024-.087.05-.173.078-.256.158-.482.424-.91.797-1.282.428-.429.899-.71 1.412-.843a2.8 2.8 0 011.565.046c.532.165 1.03.48 1.496.946.479.479.797.983.956 1.515a2.86 2.86 0 01.065 1.528 2.587 2.587 0 01-.516 1.055l3.247 1.503-1.203 1.203-3.563-1.696a2.728 2.728 0 01-.144.035l-3.502 3.502-.066.67.11.232c.113-.04.226-.085.338-.134.575-.245 1.119-.624 1.631-1.137l1.063 1.063c-.634.634-1.224 1.078-1.77 1.333a6.608 6.608 0 01-.608.249l.773 1.622zm-3.059-2.738a4.114 4.114 0 01-1.342-.256 3.623 3.623 0 01-1.281-.825c-.38-.38-.631-.79-.755-1.23a2.466 2.466 0 01-.033-1.282c.103-.413.303-.769.601-1.067.096-.096.278-.196.547-.3l2.269 4.903-.005.057zm1.815-3.422l1.237-1.237-1.098-.16-.14 1.397zm-1.344-1.614v.003l-.182 1.95-1.002-2.105c.179.011.368.032.569.062l.615.09zm.171-1.847l-.032.345a14.432 14.432 0 00-1.663-.205 5.32 5.32 0 00-.405-.01l-.628-1.32.074-.073 2.654 1.263zm1.681-.875l2.898 1.342c.076-.06.152-.127.227-.201.242-.243.37-.584.382-1.026.015-.438-.15-.829-.494-1.174a1.602 1.602 0 00-.83-.456 1.875 1.875 0 00-.899.032 1.674 1.674 0 00-.732.424c-.223.224-.39.511-.498.862-.019.065-.037.13-.054.197zm9.154 2.078l-9.477-9.477 3.202-3.202c.743-.744 1.485-1.217 2.226-1.42.74-.21 1.451-.203 2.133.022.682.225 1.302.617 1.86 1.176.559.558.952 1.18 1.18 1.864.232.682.247 1.395.047 2.138-.204.74-.675 1.48-1.412 2.217l-2.073 2.073 3.462 3.462-1.148 1.147zm-7.312-9.607l3.98 3.98 2.036-2.036c.51-.51.83-1.006.963-1.49a2.224 2.224 0 00-.042-1.384 3.363 3.363 0 00-.81-1.235 3.32 3.32 0 00-1.23-.805 2.147 2.147 0 00-1.38-.028c-.484.139-.984.466-1.499.98l-2.018 2.018z" />
                </g>
              </svg>
            </Link>
          </li>
          <li>

            <div className="px-3 text-black transition-all duration-300 ease-in-out dark:text-white group">
              <Link href="/" className="bg-left-bottom bg-gradient-to-r from-black to-black dark:from-white dark:to-white bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out ">
                HOME
              </Link>
            </div>
          </li>
          <li>
            <div className="px-3 text-black transition-all duration-300 ease-in-out dark:text-white group" >
              <Link href="/request" className="bg-left-bottom bg-gradient-to-r from-black to-black dark:from-white dark:to-white bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out ">
                REQUEST
              </Link>
            </div>
          </li>
          <DropdownSpaces />
        </ul>
      </div>
      <div className="flex flex-row items-center pr-4">
        <ShowIfAuthorized shouldBeApprover={true} session={session}>
          <Link href="/approve" className="px-3 py-2 mx-2 text-black dark:hover:bg-red-900 hover:bg-cardinal dark:text-white hover:text-white">
            <div className="flex flex-row items-center ">
              <div className="pr-2">APPROVALS</div> <FontAwesomeIcon icon={faUserShield} />
            </div>
          </Link>
        </ShowIfAuthorized>

        <div>
          <UserAvatar />
        </div>
      </div>
    </nav>
  );
}
