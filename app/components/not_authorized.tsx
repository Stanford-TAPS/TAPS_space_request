import { SignOutButton } from "@clerk/nextjs";

export default function NotAuthorized() {
    // Center the sign in form
    return <div className="flex flex-col items-center justify-center h-full">
        <h1 className="pb-4 text-4xl">Not Authorized</h1>

        <p className="text-xl">You are not authorized to view this page.</p>
        <p className="text-xl">Please enusre you are signed in with the correct account.</p>

        <SignOutButton>
            <div className="px-4 py-2 mt-4 text-white bg-red-800 rounded cursor-pointer hover:bg-red-900" >
                Sign Out
            </div>
        </SignOutButton>

    </div>;
}