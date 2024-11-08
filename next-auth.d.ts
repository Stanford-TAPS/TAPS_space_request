/**
 * import { C } from "@fullcalendar/core/internal-common";
import "next-auth";

declare module "next-auth" {
    interface User extends DefaultUser {
        firstName?: string;
        lastName?: string;
        sunet?: string;
        affiliations?: string[];
        role?: "admin" | "approver" | "user";
    }
    interface Session extends DefaultSession {
        user: User;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        role?: string;
    }
}

 */