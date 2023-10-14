"use client"
import Avatar from "boring-avatars";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { signIn } from "next-auth/react";


export const SignInButton = () => {
    // Login button with fontawesome icon
    return <div className="text-base cursor-pointer font-oswald" >
        <a onClick={() => signIn("stanford")} >
            <FontAwesomeIcon icon={faSignIn} className="pr-2" />
            SIGN IN
        </a>
    </div>
};