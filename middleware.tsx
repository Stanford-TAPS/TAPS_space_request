import { getServerSession } from "next-auth";
import { withAuth } from "next-auth/middleware"
import { authOptions } from "./app/api/auth/[...nextauth]/route";

export default withAuth({
    // Matches the pages config in `[...nextauth]`
    callbacks: {
        authorized({ req, token }) {
            if (token) return true // If there is a token, the user is authenticated
        }
    },

})

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|spaces|trpc|not-authorized).+)'],
};
