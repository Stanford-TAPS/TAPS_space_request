import { auth } from "@/auth"

export default auth((req) => {
    const { nextUrl } = req;
    const isProtectedRoute = nextUrl.pathname.startsWith('/api/protected');

    if (isProtectedRoute) {
        const { user } = req.auth;
        if (!user?.role || (user?.role !== "APPROVER" && user?.role !== "ADMIN")) {
            return Response.json(
                { error: 'Unauthorized - Approver role required' },
                { status: 403 }
            );
        }
    }
})

// Configure which routes to protect
export const config = {
    matcher: [
        "/api/:path*",
        "/((?!api/auth).*)"  // Exclude /api/auth/* routes
    ]
}