"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const CONFLICT_EVENT_COLOR = "#d97706"; // amber 600
const DEFAULT_EVENT_COLOR = "#059669"; // emerald 600

export function SecondaryButton({ href, text, onClick, compact = false }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={"box-border self-center  text-center dark:text-white transition-all duration-200 border-black outline-black dark:border-white dark:outline-white hover:shadow-lg hover:outline hover:outline-1" + (compact ? " w-40 y-40 py-2 px-2 border-2" : " px-8 py-3 text-2xl border-4")}
        >
            {text}
        </Link>

    );

}

export function PrimaryButton({ href, text, onClick, compact = false }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={"box-border self-center text-center text-white transition-all duration-200 bg-red-700 border-4 border-red-700 outline-1 outline-red-700 hover:shadow-lg hover:outline" + (compact ? " w-40 py-3 px-2" : " px-8 py-3 text-2xl")}
        >
            {text}
        </Link>
    );
}


