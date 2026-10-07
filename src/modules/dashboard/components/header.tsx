"use client";

// File: header.tsx
// Folder: src/modules/dashboard/components

type UserProps = {
  name: string | null;
  email: string | null;
  role: string;
};

interface HeaderProps {
  user: UserProps;
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  setMobileOpen: (value: boolean) => void;
}

export function Header({ user, isCollapsed, setIsCollapsed, setMobileOpen }: HeaderProps) {
  // Get user initials for the avatar (e.g., "Stephen Kalwenzi" -> "SK")
  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm dark:border-slate-800 dark:bg-slate-950 md:px-6">
      
      {/* Left Side: Your existing toggle buttons */}
      <div className="flex items-center gap-4">
        {/* Mobile Hamburger Menu */}
        <button 
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <svg className="w-6 h-6 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Desktop Collapse Toggle */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:block p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <svg className="w-5 h-5 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isCollapsed ? "M4 6h16M4 12h16M4 18h16" : "M4 6h16M4 12h8m-8 6h16"} />
          </svg>
        </button>
      </div>

      {/* Right Side: Static User Profile Display */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-sm">
          {getInitials(user.name)}
        </div>
        
        <div className="hidden flex-col items-start md:flex">
          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {user.name}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {user.role}
          </span>
        </div>
      </div>
    </header>
  );
}