// File: route.ts
// Folder: src/app/api/auth/[...nextauth]
// Role: API Route handler for Auth.js (handles sign in, sign out, and session fetching)

import { handlers } from "@/auth";

export const { GET, POST } = handlers;