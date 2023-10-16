import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { PrimaryButton } from "./buttons";
import prisma from "../../db";
import { getSession, signIn, signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";



type ProtectedProps = {
    shouldBeApprover?: boolean;
    children?: React.ReactNode;
    onAuth?: () => Promise<void>;
    isAuthorized?: boolean;
};




export default async function ProtectedPage({ shouldBeApprover = false, children, onAuth = async () => { }, isAuthorized = false }) {
    const session = await getServerSession(authOptions)

    if (isAuthorized) {
        return children
    }

    if (session && !shouldBeApprover) {
        return children
    }

    if (session && shouldBeApprover) {
        const res = await prisma.user.findUnique({
            where: {
                email: session.user.email
            },
            select: {
                isApprover: true
            },
        })

        if (res.isApprover) return children
    }

    await onAuth();

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
    const session = await getServerSession(authOptions)

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

export async function isAuthorized(shouldBeApprover): Promise<boolean> {
    const isServer = typeof window === "undefined";

    const session = isServer ? await getServerSession(authOptions) : await getSession();


    if (session && shouldBeApprover) {
        return isApprover(session.user.email);
    }

    return session ? true : false;
}

export async function isApprover(email: string) {
    const res = await prisma.user.findUnique({
        where: {
            email: email
        },
        select: {
            isApprover: true
        },
    })

    return res.isApprover;
}

export async function ShowIfAuthorized({ shouldBeApprover = false, children }) {
    const isAuth = await isAuthorized(shouldBeApprover);

    if (isAuth) return children;
    else return null;
}