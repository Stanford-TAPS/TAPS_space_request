import Avatar from "boring-avatars";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route"
import { SignInButton } from "./sign_in_button";
import Link from "next/link";


export const UserAvatar = async () => {
    const session = await getServerSession(authOptions)

    if (!session) {
        // Login button with fontawesome icon
        return <SignInButton />
    }
    return <div className="transition duration-200 rounded-full ring-offset-2 ring-offset-white dark:ring-offset-cardinal hover:ring-2 ring-cardinal dark:ring-white">
        <Link href="/account">
            <Avatar
                size={40}
                name={session.user.name}
                variant="beam"
                colors={["#000000", "#5A5659", "#035E04", "#E6E0DE", "#F6E846"]}
            />
        </Link>
    </div>;
};