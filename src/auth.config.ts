// File: auth.config.ts
// Folder: src
// Role: Core authentication settings and session callbacks

import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { UserStatus } from "@/generated/prisma";

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email as string }
        });

        if (!user || !user.passwordHash) {
          return null;
        }

        // Only active users can log in
        if (user.status !== UserStatus.ACTIVE) {
          throw new Error("Account is not active.");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!isPasswordValid) {
          return null;
        }

        // Return the user object without the password hash
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          status: user.status,
        };
      }
    })
  ],
  callbacks: {
    // Attach database role and status to the secure JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.status = user.status;
      }
      return token;
    },
    // Pass the token data into the client-side/server-side session
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as any;
        session.user.status = token.status as any;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // If the user just logged in from the default page, send them to admin
      if (url.includes("/login")) {
        return `${baseUrl}/admin`;
      }
      // Otherwise, allow standard NextAuth redirect behavior
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