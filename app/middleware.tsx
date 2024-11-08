import { auth } from "@/auth"

export default auth((req) => { })


// Configure which routes to protect
export const config = {
    matcher: [
        "/api/:path*",
        "/((?!api/auth).*)"  // Exclude /api/auth/* routes
    ]
}