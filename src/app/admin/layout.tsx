// File: layout.tsx
// Folder: src/app/admin

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/modules/dashboard/components/dashboard-shell";

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