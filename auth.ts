import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { User } from "next-auth";
import prisma from "./db";
import * as Sentry from "@sentry/browser";
import { $Enums } from "@prisma/client";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  events: {
    signIn({ user }) {
      Sentry.setUser({ email: user.email });
    },
    signOut() {
      Sentry.setUser(null);
    },
  },
  callbacks: {
    async session({ session, user }) {
      session.user.role = (user as any).role;
      session.user.firstName = (user as any).firstName;
      session.user.lastName = (user as any).lastName;
      session.user.sunet = (user as any).sunet;
      session.user.affiliations = (user as any).affiliations;
      session.user.emailVerified = (user as any).emailVerified;
      console.log("session", session);
      return session;
    },
  },
  providers: [
    {
      id: "stanford",
      name: "Stanford",
      type: "oidc",
      clientId: process.env.STANFORD_CLIENT_ID,
      clientSecret: process.env.STANFORD_CLIENT_SECRET,
      issuer: "https://login.stanford.edu",
      authorization: {
        params: { scope: "openid email profile eduperson_scoped_affiliation" },
      },
      checks: ["pkce", "state"],
      idToken: false,
      userinfo: {
        url: "https://login.stanford.edu/idp/profile/oidc/userinfo",
        params: {
          scope: "openid email profile eduperson_scoped_affiliation",
        },
      },
      token: "https://login.stanford.edu/idp/profile/oidc/token",
      profile: (profile) => {
        console.log("profile", profile);
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          firstName: profile.given_name,
          lastName: profile.family_name,
          sunet: profile.preferred_username,
          affiliations: profile.eduPersonScopedAffiliation.split(" "),
          role: $Enums.Role.USER,
        };
      },
    },
  ],
  pages: {},
});
