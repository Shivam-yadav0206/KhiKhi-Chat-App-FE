import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { fetchRedis } from "@/helpers/redis";
import { db } from "./db";

function getGoogleCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (
    !clientId ||
    !clientSecret ||
    clientId.length === 0 ||
    clientSecret.length === 0
  ) {
    throw new Error("Missing or invalid Google credentials");
  }
  return { clientId, clientSecret };
}

const { clientId, clientSecret } = getGoogleCredentials(); // Singleton pattern

export const authOptions: NextAuthOptions = {
  adapter: UpstashRedisAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      try {
        const dbUserResult = (await fetchRedis("get", `user:${token?.id}`)) as
          | string
          | null;

        if (!dbUserResult) {
          token.id = user?.id;
          return token;
        }

        const dbUser = JSON.parse(dbUserResult) as User;

        return {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          picture: dbUser.image,
        };
      } catch (error) {
        console.error("Error fetching user data:", error);
        return token; // Return token unchanged in case of error
      }
    },
    async session({ session, token }) {
      if (token) {
        session.user = session.user || {};
        session.user.id = token?.id;
        session.user.name = token?.name;
        session.user.email = token?.email;
        session.user.image = token?.picture;
      }
      return session;
    },
    redirect() {
      return "/dashboard";
    },
  },
};
