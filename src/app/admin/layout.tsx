// File: layout.tsx
// Folder: src/app/admin
// Description: Global layout wrapper for the admin dashboard, injecting the header and checking auth.
// Imports: React, auth session, AdminHeader component, redirect.
// Exports: Default AdminLayout component.

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AdminHeader } from "@/modules/dashboard/components/AdminHeader";

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
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
      <AdminHeader 
        user={{
          name: session.user.name ?? "User",
          email: session.user.email ?? "",
          role: session.user.role,
        }} 
      />
      
      <main>
        {children}
      </main>
    </div>
  );
}