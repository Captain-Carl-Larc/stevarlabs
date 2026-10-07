"use client";

// File: sidebar.tsx
// Folder: src/modules/dashboard/components
// Description: Handles the main navigation sidebar, including desktop collapsing, mobile flyout behavior, and the logout confirmation flow.
// Imports: React hooks, Next.js routing, Lucide icons, and the logout Server Action.
// Exports: Sidebar component

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Tags, 
  Settings, 
  LogOut, 
  X,
  AlertCircle
} from "lucide-react";
import { logoutAction } from "@/modules/auth/logout.action";

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export function Sidebar({ isCollapsed, isMobileOpen, setMobileOpen }: SidebarProps) {
  const pathname = usePathname();
  
  // Modal state
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Posts", href: "/admin/posts", icon: FileText },
    { name: "Categories", href: "/admin/categories", icon: Tags },
    { name: "Users", href: "/admin/users", icon: Users },
  ];

  const bottomLinks = [
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const NavItem = ({ link }: { link: any }) => {
    const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
    const Icon = link.icon;

    return (
      <Link
        href={link.href}
        onClick={() => setMobileOpen(false)}
        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
          isActive 
            ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" 
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
        }`}
      >
        <Icon className="flex-shrink-0 w-5 h-5" />
        <span className={`text-sm font-medium ${isCollapsed ? "hidden md:hidden" : "block"}`}>
          {link.name}
        </span>
      </Link>
    );
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logoutAction();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="md:hidden z-40 fixed inset-0 bg-slate-900/50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="z-[100] fixed inset-0 flex justify-center items-center bg-slate-900/50 backdrop-blur-sm p-4 transition-opacity">
          <div className="bg-white dark:bg-slate-950 shadow-xl p-6 dark:border dark:border-slate-800 rounded-xl w-full max-w-md">
            <div className="flex items-center gap-3">
              <div className="flex flex-shrink-0 justify-center items-center bg-red-100 dark:bg-red-900/30 rounded-full w-10 h-10">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-lg">Confirm Logout</h3>
            </div>
            
            <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm">
              Are you sure you want to securely log out of the CyLoad CMS dashboard? You will need to sign back in to manage your content.
            </p>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                disabled={isLoggingOut}
                className="hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 px-4 py-2 rounded-lg font-medium text-slate-700 dark:text-slate-300 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="bg-red-600 hover:bg-red-500 disabled:opacity-50 px-4 py-2 rounded-lg font-semibold text-white text-sm transition"
              >
                {isLoggingOut ? "Logging out..." : "Log Out"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white transition-all duration-300 dark:border-slate-800 dark:bg-slate-950 md:static ${
          isCollapsed ? "w-20" : "w-64"
        } ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex justify-between items-center px-4 border-slate-200 dark:border-slate-800 border-b h-16">
          <Link href="/admin" className="flex items-center gap-2 overflow-hidden">
            <div className="flex flex-shrink-0 justify-center items-center bg-blue-600 rounded-lg w-8 h-8 font-bold text-white">
              C
            </div>
            <span className={`whitespace-nowrap text-lg font-bold text-slate-900 dark:text-white ${isCollapsed ? "hidden md:hidden" : "block"}`}>
              CyLoad
            </span>
          </Link>
          <button onClick={() => setMobileOpen(false)} className="md:hidden text-slate-500 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-3 overflow-y-auto scrollbar-hide">
          {navLinks.map((link) => (
            <NavItem key={link.name} link={link} />
          ))}
        </nav>

        <div className="space-y-1 p-3 border-slate-200 dark:border-slate-800 border-t">
          {bottomLinks.map((link) => (
            <NavItem key={link.name} link={link} />
          ))}
          {/* Replaced anchor tag with a button that triggers the modal */}
          <button 
            onClick={() => setIsLogoutModalOpen(true)}
            className="flex items-center gap-3 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-lg w-full text-red-600 dark:text-red-400 transition-all"
          >
            <LogOut className="flex-shrink-0 w-5 h-5" />
            <span className={`text-sm font-medium ${isCollapsed ? "hidden md:hidden" : "block"}`}>
              Log Out
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}