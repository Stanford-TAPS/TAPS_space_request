import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { get } from "http";
import NextAuth, { AuthOptions } from "next-auth";

const prisma = new PrismaClient();

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("signIn", { user, account, profile, email, credentials });
      /*prisma.user.update({
        where: { id: account.userId },
        data: {

          },
      });*/

      return true;
    },
  },
  providers: [
    {
      id: "stanford",
      name: "Stanford",
      type: "oauth",
      clientId: process.env.STANFORD_CLIENT_ID,
      clientSecret: process.env.STANFORD_CLIENT_SECRET,
      wellKnown: "https://login.stanford.edu/.well-known/openid-configuration",
      authorization: {
        params: { scope: "openid email profile eduperson_scoped_affiliation" },
      },
      idToken: true,
      checks: ["pkce", "state"],
      profile(profile, tokens) {
        console.log("profile", profile, tokens);
        return {
          id: profile.sub,
          name: profile.name,
          firstName: profile.given_name,
          lastName: profile.family_name,
          username: profile.preferred_username,
          email: profile.email,
          affiliations: profile.eduperson_scoped_affiliation,
        };
      },
    },
  ],
} as AuthOptions);

export { handler as GET, handler as POST };
