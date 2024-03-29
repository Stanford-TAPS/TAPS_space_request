"use client";
import Link from "next/link";

const CONFLICT_EVENT_COLOR = "#d97706"; // amber 600
const DEFAULT_EVENT_COLOR = "#059669"; // emerald 600

export function SecondaryButton({ href, text, onClick, compact = false }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={"box-border self-center text-center dark:text-white transition-all duration-200 border-black outline-black dark:border-white dark:outline-white hover:shadow-lg hover:outline hover:outline-1" + (compact ? " w-40 py-2 px-2 border-2" : " px-8 text-2xl border-2")}
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
            className={"box-border self-center text-center text-white transition-all duration-200 bg-cardinal border-3 border-cardinal outline-1 outline-cardinal hover:shadow-lg hover:outline" + (compact ? " w-40 py-2 px-2 border-2" : " px-8 py-3 text-2xl")}
        >
            {text}
        </Link>
    );
}


