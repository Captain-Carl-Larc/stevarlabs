// File: auth.config.ts
// Folder: src
// Role: Edge-safe NextAuth configuration (Strictly NO database or Node imports here)

import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [], // Handled in auth.ts to prevent Edge runtime crashes
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.status = user.status;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as any;
        session.user.status = token.status as any;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.includes("/login")) {
        return `${baseUrl}/admin`;
      }
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;