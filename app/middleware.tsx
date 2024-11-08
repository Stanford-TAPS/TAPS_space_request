import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import type { NextRequestWithAuth } from "next-auth/middleware"

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        // Only protect /api/* routes
        if (request.nextUrl.pathname.startsWith("/api/")) {
            if (!request.nextauth.token) {
                return NextResponse.json(
                    { error: "Unauthorized" },
                    { status: 401 }
                )
            }
        }
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        }
    }
)

// Configure which routes to protect
export const config = {
    matcher: [
        "/api/:path*",
        "/((?!api/auth).*)"  // Exclude /api/auth/* routes
    ]
}