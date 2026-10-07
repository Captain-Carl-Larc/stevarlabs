"use server";

// File: logout.action.ts
// Folder: src/modules/auth
// Description: Server action that securely ends the user session and redirects to the public home page.
// Imports: signOut from the core auth configuration.
// Exports: logoutAction

import { signOut } from "@/auth";

export async function logoutAction() {
  // Destroy the session and redirect back to the public homepage
  await signOut({ redirectTo: "/" });
}