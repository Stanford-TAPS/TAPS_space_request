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

import { $Enums } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            firstName: string | null;
            lastName: string | null;
            email: string | null;
            sunet: string | null;
            affiliations: string[];
            role: $Enums.Role;
        } & DefaultSession["user"];
    }
}
