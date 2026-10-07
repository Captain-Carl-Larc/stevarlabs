// File: AdminHeader.tsx
// Folder: src/modules/dashboard/components
// Description: Responsive top navigation header featuring brand logo and static user profile information.
// Imports: Next.js Link.
// Exports: AdminHeader component.

import Link from "next/link";

type UserProps = {
  name: string | null;
  email: string | null;
  role: string;
};

export function AdminHeader({ user }: { user: UserProps }) {
  // Get user initials for the avatar (e.g., "Stephen Kalwenzi" -> "SK")
  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
  };

  return (
    <header className="top-0 z-40 sticky flex justify-between items-center bg-white dark:bg-slate-950 shadow-sm px-4 md:px-6 border-slate-200 dark:border-slate-800 border-b w-full h-16">
      
      {/* Left Side: Brand Logo */}
      <div className="flex items-center gap-4">
        <Link href="/admin" className="font-bold text-slate-900 dark:text-white text-xl tracking-tight">
          CyLoad<span className="text-blue-600">CMS</span>
        </Link>
      </div>

      {/* Right Side: Static User Profile Display */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="flex justify-center items-center bg-blue-600 shadow-sm rounded-full w-9 h-9 font-bold text-white text-sm">
          {getInitials(user.name)}
        </div>
        
        {/* Name and Role (Hidden on very small screens to save space) */}
        <div className="hidden md:flex flex-col items-start">
          <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
            {user.name}
          </span>
          <span className="font-medium text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {user.role}
          </span>
        </div>
      </div>
    </header>
  );
}