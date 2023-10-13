import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { get } from "https";
import NextAuth, { AuthOptions } from "next-auth";

const prisma = new PrismaClient();

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const profileData = profile as any;
      const primsaData = {
        name: profile.name,
        firstName: profileData.given_name,
        lastName: profileData.family_name,
        email: profileData.email,
        sunet: profileData.preferred_username,
        affiliations: (profileData.eduPersonScopedAffiliation as String)
          .split(" "),
      };
      const res = await prisma.user.update({
        where: { id: user.id },
        data: primsaData,
      });

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
      profile(profile) {
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
      userinfo: {
        url: "https://login.stanford.edu/idp/profile/oidc/userinfo",
        async request(context) {
          const res = await fetch(
            "https://login.stanford.edu/idp/profile/oidc/userinfo",
            {
              headers: {
                Authorization: `Bearer ${context.tokens.access_token}`,
              },
            },
          );

          if (!res.ok) {
            throw new Error(
              "Failed to fetch user data! Error:" + res.statusText,
            );
          }

          const data = await res.json();

          return data;
        },
      },
    },
  ],
} as AuthOptions);

export { handler as GET, handler as POST };
