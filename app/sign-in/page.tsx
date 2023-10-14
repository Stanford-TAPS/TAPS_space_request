"use client"
import { signIn } from "next-auth/react";

export default function Page() {
    // Function that runs when the page first loads, callbackUrl is in the query string
    if (window) signIn("stanford", { callbackUrl: window.location.href.split("?")[1] })

    // Center the sign in form
    return <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white font-oswald">
                        Sign in to your account
                    </h1>
                    You should be redirected to the Stanford login page.
                    <br />
                    Otherwise, <a className="text-blue-600 underline cursor-pointer" onClick={() => signIn("stanford")}>click here</a>.
                </div>
            </div>
        </div>
    </div>;
}