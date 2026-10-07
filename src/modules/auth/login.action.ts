"use server";

// File: login.action.ts
// Folder: src/modules/auth
// Description: Server action for authenticating a user via email and password.
// Imports: signIn from auth core, AuthError for error handling.
// Exports: loginAction

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // Explicitly pass credentials and the exact redirect path
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/admin", 
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password." };
        default:
          return { error: `Debug: ${error.message}` };
      }
    }
    // Next.js uses errors to trigger redirects. We MUST re-throw it if it's not an AuthError.
    throw error;
  }
}