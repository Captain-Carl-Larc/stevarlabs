// File: auth.ts
// Folder: src
// Description: Core NextAuth configuration enforcing status checks and secure session handling.
// Imports: NextAuth, Credentials provider, Prisma DB, bcrypt, UserStatus.
// Exports: handlers, signIn, signOut, auth

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { UserStatus, Role } from "@/generated/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password.");
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.passwordHash) {
          throw new Error("Invalid email or password.");
        }

        // Enforce ACTIVE status using the correct Prisma enums
        if (user.status !== UserStatus.ACTIVE) {
          if (user.status === UserStatus.PENDING) {
            throw new Error("Account pending. Please check your email to activate.");
          }
          if (user.status === UserStatus.DEACTIVATED) {
            throw new Error("This account has been deactivated. Contact support.");
          }
          throw new Error("Access denied: Invalid account status.");
        }

        const passwordsMatch = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!passwordsMatch) {
          throw new Error("Invalid email or password.");
        }

        // Return all required fields, including status, to satisfy next-auth.d.ts
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status, 
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.status = user.status; // Pass status to token
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as Role;
        session.user.id = token.id as string;
        session.user.status = token.status as UserStatus; // Pass status to session
      }
      return session;
    },
  },
});