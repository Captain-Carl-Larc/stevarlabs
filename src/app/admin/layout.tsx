// File: layout.tsx
// Folder: src/app/admin
// Purpose: Auth-protected admin shell. Never indexed by search engines.

import type { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/modules/dashboard/components/dashboard-shell";

// Keeps every /admin page out of search results
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <DashboardShell
      user={{
        name: session.user.name ?? "User",
        email: session.user.email ?? "",
        role: session.user.role,
      }}
    >
      {children}
    </DashboardShell>
  );
}