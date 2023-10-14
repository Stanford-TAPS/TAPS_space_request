import { withAuth } from "next-auth/middleware"

export default withAuth({
    // Matches the pages config in `[...nextauth]`
    pages: {
        signIn: '/sign-in',
        signOut: '/sign-out',
    },
    callbacks: {
        authorized({ req, token }) {
            console.log(req)
            console.log(token)
            if (token) return true // If there is a token, the user is authenticated
        }
    },
})

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|spaces|trpc|not-authorized).+)'],
};
