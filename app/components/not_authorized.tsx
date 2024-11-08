import { PrimaryButton } from "./buttons";
import prisma from "../../db";
import { getSession, signIn, signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { Session, User } from "next-auth";
import { Suspense } from "react";
import { auth } from "@/auth";

type ProtectedProps = {
    shouldBeApprover?: boolean;
    children?: React.ReactNode;
    onAuth?: () => Promise<void>;
    isAuthorized?: boolean;
};


export default async function ProtectedPage({ shouldBeApprover = false, children, onAuth = async () => { }, isAuthorized = false }) {
    const session = await auth()

    if (isAuthorized) {
        return children
    }

    if (session && !shouldBeApprover) {
        return children
    }

    if (session && shouldBeApprover) {
        if (isApprover(session)) return children
    }

    // Center the sign in form
    return <div className="flex flex-col items-center justify-center h-full">
        <h1 className="pb-4 text-4xl">Not Authorized</h1>

        <p className="text-xl">You are not authorized to view this page.</p>
        {session ? <p className="text-xl">Please enusre you are signed in with the correct account.</p> :
            <p className="text-xl">Please sign in.</p>}

        {session ? <PrimaryButton href="#" text="Sign Out" onClick={() => signOut({ callbackUrl: "/" })} compact={false} /> :
            <PrimaryButton href="#" text="Sign In" onClick={signIn("stanford")} compact={false} />}

    </div>;
}

export async function NotAuthorized() {
    const session = await auth()

    return <div className="flex flex-col items-center justify-center h-full">
        <FontAwesomeIcon icon={faExclamationCircle} className="pb-4 text-6xl text-gray-500 dark:text-neutral-700" />
        <h1 className="pb-4 text-4xl">Not Authorized</h1>

        <p className="text-xl font-roboto">You are not authorized to view this page.</p>
        {session ? <p className="p-4 text-xl font-roboto">Please enusre you are signed in with the correct account.</p> :
            <p className="p-4 text-xl font-roboto">Please sign in.</p>}

        {session ? <PrimaryButton href="/account" text="Try Another Account" onClick={null} compact={false} /> :
            <PrimaryButton href="/account" text="Sign In" compact={false} onClick={null} />}

    </div>;
}

export function isAuthorized(shouldBeApprover: boolean, session: Session): boolean {
    if (shouldBeApprover) return isApprover(session);
    return true;
}

export function isApprover(session: Session | null) {
    console.log("session", session);
    return session?.user?.role === "APPROVER" || session?.user?.role === "ADMIN";
}

export function isFacultyOrStaff(session: Session) {
    return session.user.affiliations.includes("faculty@stanford.edu") || session.user.affiliations.includes("staff@stanford.edu");
}

export function ShowIfAuthorized({ shouldBeApprover = false, children, session }: { shouldBeApprover: boolean, children: React.ReactNode, session: Session }) {
    const isAuth = isAuthorized(shouldBeApprover, session);

    if (isAuth) return children;
    return null;
}