"use client"; // Error components must be Client Components

import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { PrimaryButton } from "./components/buttons";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);



  return <div className="flex flex-col items-center justify-center h-full">
    <FontAwesomeIcon icon={faExclamationCircle} className="pb-4 text-6xl text-gray-500 dark:text-neutral-700" />
    <h1 className="pb-4 text-4xl">Error</h1>

    <p className="text-xl font-roboto">There was an issue Loading this page.</p>
    <p className="p-4 text-xl font-roboto">Please Try Again or come back later.</p>

    <PrimaryButton href="#" text="Try Again" compact={false} onClick={reset()} />

  </div>;

}
