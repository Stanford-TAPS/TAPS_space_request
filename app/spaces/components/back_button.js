"use client";
import { useRouter } from "next/navigation";

export default function BackButton({ className }) {
  const router = useRouter();
  const handleBack = () => {
    router.back(); // This will navigate to the previous page in the history
  };
  return (
    <button className={className} onClick={() => handleBack()}>
      Back
    </button>
  );
}
