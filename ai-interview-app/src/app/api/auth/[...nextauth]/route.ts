import { sendIdToken } from "@/api";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

export const GoogleAuth: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ profile, account }) {
     
      if (!profile?.email || !account?.id_token) {
        console.error("Missing email or id_token");
        return false;
      }
      return true;
    },

    async jwt({ token, account }) {
  // First login
  if (account?.id_token) {
    const res = await sendIdToken(account.id_token);

    token.access_token = res.data.data.accessToken;
    token.refresh_token = res.data.data.refreshToken;
    token.expires_at = Math.floor(Date.now() / 1000) + 15 * 60;

    return token;
  }

  // If token still valid
  if (Date.now() / 1000 < (token.expires_at as number)) {
    return token;
  }

  // If expired -> refresh using axios
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/auth/refresh1`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token.refresh_token}`,
      },
    }
  );

  token.access_token = res.data.data.access_token;
  token.refresh_token = res.data.data.refresh_token;
  token.expires_at = Math.floor(Date.now() / 1000) + 15 * 60;

  return token;
},

    async session({ session, token }) {
     
      session.access_token = token.access_token;
      session.refresh_token = token.refresh_token;
      session.provider_id = token.provider_id;

   

      return session;
    },

    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
  pages: {
    signIn: "/signIn",
  },
};

const handlers = NextAuth(GoogleAuth);
export { handlers as GET, handlers as POST };