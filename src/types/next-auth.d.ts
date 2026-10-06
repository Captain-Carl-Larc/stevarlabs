// File: next-auth.d.ts
// Folder: src/types
// Role: Tells TypeScript that our secure session includes custom CyLoad fields

import { Role, UserStatus } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      status: UserStatus;
    } & DefaultSession["user"];
  }

  interface User {
    role: Role;
    status: UserStatus;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
    status: UserStatus;
  }
}