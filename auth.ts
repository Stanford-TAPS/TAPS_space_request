import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import prisma from "./db";
import * as Sentry from "@sentry/browser";

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
    async session({ session, token }) {
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
      userinfo: {
        url: "https://login.stanford.edu/idp/profile/oidc/userinfo",
        params: { claims: "sub name email eduperson_scoped_affiliation" },
        async request({ tokens, provider }) {
          console.log("request", tokens, provider);
          return tokens;
        },
      },
      token: {
        url: "https://login.stanford.edu/idp/profile/oidc/token",
        async request({ tokens, provider }) {
          console.log("token request", tokens, provider);
          return tokens;
        },
      },
      profile(profile) {
        console.log("profile", profile);
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        };
      },
    },
  ],
  pages: {},
});
