import NextAuth, { AuthOptions } from "next-auth";

const handler = NextAuth({
  providers: [
    {
      id: "stanford",
      name: "Stanford",
      type: "oauth",
      clientId: "sdlhfskl",
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
    },
  ],
} as AuthOptions);

export { handler as GET, handler as POST };
