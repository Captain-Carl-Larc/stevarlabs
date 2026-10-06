"use server";

// File: login.action.ts
// Folder: src/modules/auth

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function loginAction(formData: FormData) {
  try {
    // Auth.js automatically handles the session creation and redirect on success
    await signIn("credentials", Object.fromEntries(formData));
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password." };
        default:
          return { error: "An authentication error occurred." };
      }
    }
    // Next.js uses errors to trigger redirects. We MUST re-throw it if it's not an AuthError.
    throw error;
  }
}