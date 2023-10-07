import { SignIn } from "@clerk/nextjs";

export default function Page() {
    // Center the sign in form
    return <div className="flex flex-col items-center justify-center h-full">
        <SignIn />
    </div>;
}