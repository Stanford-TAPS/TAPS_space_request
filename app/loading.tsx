"use client";
import { PropagateLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <h1 className="mb-6 text-3xl font-bold font-roboto">Loading...</h1>
      <PropagateLoader color="#bf0808" />
    </div>
  );
}
