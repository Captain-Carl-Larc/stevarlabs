// // File: auth.ts
// // Folder: src
// // Role: Node-safe NextAuth initialization (Database connections go here)

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import { db } from "@/lib/db";
// import { UserStatus } from "@/generated/prisma";
// import { authConfig } from "./auth.config";

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   ...authConfig,
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null;
//         }

//         const user = await db.user.findUnique({
//           where: { email: credentials.email as string }
//         });

//         if (!user || !user.passwordHash) {
//           return null;
//         }

//         // Only active users can log in
//         if (user.status !== UserStatus.ACTIVE) {
//           throw new Error("Account is not active.");
//         }

//         const isPasswordValid = await bcrypt.compare(
//           credentials.password as string,
//           user.passwordHash
//         );

//         if (!isPasswordValid) {
//           return null;
//         }

//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//           role: user.role,
//           status: user.status,
//         };
//       }
//     })
//   ]
// });

// File: auth.ts
// Folder: src

import NextAuth, { AuthError } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { UserStatus } from "@/generated/prisma";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          console.log("➡️ Starting DB check for:", credentials.email);

          const user = await db.user.findUnique({
            where: { email: credentials.email as string }
          });

          console.log("➡️ DB returned user:", !!user);

          if (!user || !user.passwordHash) {
            return null;
          }

          if (user.status !== UserStatus.ACTIVE) {
            console.log("➡️ User is not active");
            return null;
          }

          console.log("➡️ Checking password hash...");
          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.passwordHash
          );

          console.log("➡️ Password valid:", isPasswordValid);

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            status: user.status,
          };
        } catch (error) {
          // This will print the EXACT reason for the crash in your Vercel Logs
          console.error("💥 AUTHORIZE FUNCTION CRASHED:", error);
          throw error; 
        }
      }
    })
  ]
});