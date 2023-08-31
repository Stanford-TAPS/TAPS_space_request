"use client";
import { PropagateLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="font-roboto mb-6 text-3xl font-bold">Loading...</h1>
      <PropagateLoader color="#bf0808" />
    </div>
  );
}
