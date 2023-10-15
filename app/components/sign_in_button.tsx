"use client"
import Avatar from "boring-avatars";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { signIn } from "next-auth/react";


export const SignInButton = () => {
    // Login button with fontawesome icon
    return <div className="text-base text-black cursor-pointer font-oswald dark:text-white" >
        <div onClick={() => signIn("stanford")} >
            <FontAwesomeIcon icon={faSignIn} className="pr-2" />
            SIGN IN
        </div>
    </div>
};