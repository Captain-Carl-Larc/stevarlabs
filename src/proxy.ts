// File: proxy.ts
// Folder: src
// Role: Network boundary proxy to protect admin routes and handle login redirects

import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isApiAuthRoute = pathname.startsWith("/api/auth");
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname === "/login";

  // 1. Always allow NextAuth API routes to complete
  if (isApiAuthRoute) {
    return;
  }

  // 2. If logged in and trying to access the login page, redirect to dashboard
  if (isLoginRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/admin", req.nextUrl));
    }
    return;
  }

  // 3. Protect all admin routes: redirect to login if not authenticated
  if (isAdminRoute && !isLoggedIn) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }

  // Allow all other requests (like public blog pages or the /api/setup route)
  return;
});

// Configure which paths invoke this proxy.
// This matcher excludes static files, images, and Next.js internals to keep performance high.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};