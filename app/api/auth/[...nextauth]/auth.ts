import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { AuthOptions } from "next-auth";
import prisma from "../../../../db";
import * as Sentry from "@sentry/browser";

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  events: {
    signIn({ user }) {
      Sentry.setUser({ email: user.email });
    },
    signOut() {
      Sentry.setUser(null);
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
        const affiliations = (profile.eduPersonScopedAffiliation as String)
          .split(
            " ",
          );
        return {
          id: profile.sub,
          name: profile.name,
          firstName: profile.given_name,
          lastName: profile.family_name,
          sunet: profile.preferred_username,
          email: profile.email,
          emailVerified: true,
          affiliations: affiliations,
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
  pages: {},
};

export default authOptions;
