"use client";
import { useState, useEffect } from "react";
import memAudPic from "../../../public/memaud.jpg";
import roblePic from "../../../public/roble.jpg";
import niteryPic from "../../../public/nitery.jpg";
import Image from "next/image";

export default function Slideshow() {
  const images = [memAudPic, roblePic, niteryPic];
  const delay = 8000;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, delay);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="whitespace-nowrap ">
        {images.map((backgroundImage, i) => (
          <div
            className={`absolute top-0 h-screen w-full ${
              i === index ? "opacity-100" : "opacity-0"
            } transition-opacity duration-1000`}
            key={i}
          >
            <Image
              src={backgroundImage}
              sizes="110vw"
              alt="Pictures of TAPS spaces"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
