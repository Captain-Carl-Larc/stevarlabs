// File: Header.tsx
// Route/Folder: src/components/client
// Purpose: Global primary navigation, mobile menu, and sticky audit CTA.
// Imports: React (useState), next/link, next/navigation, Lucide icons, BRAND config
// Used in: src/app/(public)/layout.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { BRAND } from "@/brand/brand.config";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  };

  return (
    <header className="top-0 z-50 sticky bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-slate-200 dark:border-slate-800 border-b w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo - Updated to pure text with blue dot */}
          <div className="flex-shrink-0">
            <Link href="/" className="font-bold text-slate-900 dark:text-white text-2xl tracking-tight flex items-baseline" onClick={closeMenu}>
              {BRAND.name}<span className="text-blue-600 dark:text-blue-500">.</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="group relative">
              <button 
                className="flex items-center gap-1 py-2 font-medium text-slate-600 hover:text-slate-900 dark:hover:text-white dark:text-slate-300 text-sm transition-colors"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                Services <ChevronDown className="w-4 h-4" />
              </button>
              
              {/* Dropdown - Pure Tailwind */}
              {isServicesOpen && (
                <div 
                  className="top-full left-0 absolute pt-2 w-64"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <div className="flex flex-col bg-white dark:bg-slate-900 shadow-lg py-2 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <Link href="/services" className="hover:bg-slate-50 dark:hover:bg-slate-800 px-4 py-2 border-slate-100 dark:border-slate-800 border-b font-medium text-slate-700 dark:text-slate-200 text-sm" onClick={closeMenu}>All Services</Link>
                    <Link href="/services/local-seo" className="hover:bg-slate-50 dark:hover:bg-slate-800 px-4 py-2 text-slate-600 dark:text-slate-400 text-sm" onClick={closeMenu}>Local SEO</Link>
                    <Link href="/services/website-design-redesign" className="hover:bg-slate-50 dark:hover:bg-slate-800 px-4 py-2 text-slate-600 dark:text-slate-400 text-sm" onClick={closeMenu}>Website Design</Link>
                    <Link href="/services/patient-retention" className="hover:bg-slate-50 dark:hover:bg-slate-800 px-4 py-2 text-slate-600 dark:text-slate-400 text-sm" onClick={closeMenu}>Patient Retention</Link>
                    <Link href="/services/social-media" className="hover:bg-slate-50 dark:hover:bg-slate-800 px-4 py-2 text-slate-600 dark:text-slate-400 text-sm" onClick={closeMenu}>Social Media</Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/resources" className="font-medium text-slate-600 hover:text-slate-900 dark:hover:text-white dark:text-slate-300 text-sm transition-colors">Resources</Link>
            <Link href="/posts" className="font-medium text-slate-600 hover:text-slate-900 dark:hover:text-white dark:text-slate-300 text-sm transition-colors">Posts</Link>
            <Link href="/about" className="font-medium text-slate-600 hover:text-slate-900 dark:hover:text-white dark:text-slate-300 text-sm transition-colors">About</Link>
            <Link href="/pricing" className="font-medium text-slate-600 hover:text-slate-900 dark:hover:text-white dark:text-slate-300 text-sm transition-colors">Pricing</Link>
            <Link href="/contact" className="font-medium text-slate-600 hover:text-slate-900 dark:hover:text-white dark:text-slate-300 text-sm transition-colors">Contact</Link>
          </nav>

          {/* Desktop Audit CTA */}
          <div className="hidden md:flex">
            <Link 
              href="/free-audit" 
              className="inline-flex justify-center items-center bg-blue-600 hover:bg-blue-500 shadow-sm px-5 py-2.5 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 font-semibold text-white text-sm transition-colors"
            >
              Get Free Audit
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex justify-center items-center hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-md text-slate-600 hover:text-slate-900 dark:hover:text-white dark:text-slate-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 border-t">
          <div className="space-y-1 px-4 pt-2 pb-3">
            <Link href="/services" className="block hover:bg-slate-50 dark:hover:bg-slate-900 px-3 py-2 rounded-md font-medium text-slate-900 dark:text-white text-base" onClick={closeMenu}>Services</Link>
            <Link href="/resources" className="block hover:bg-slate-50 dark:hover:bg-slate-900 px-3 py-2 rounded-md font-medium text-slate-600 dark:text-slate-300 text-base" onClick={closeMenu}>Resources</Link>
            <Link href="/posts" className="block hover:bg-slate-50 dark:hover:bg-slate-900 px-3 py-2 rounded-md font-medium text-slate-600 dark:text-slate-300 text-base" onClick={closeMenu}>Posts</Link>
            <Link href="/about" className="block hover:bg-slate-50 dark:hover:bg-slate-900 px-3 py-2 rounded-md font-medium text-slate-600 dark:text-slate-300 text-base" onClick={closeMenu}>About</Link>
            <Link href="/pricing" className="block hover:bg-slate-50 dark:hover:bg-slate-900 px-3 py-2 rounded-md font-medium text-slate-600 dark:text-slate-300 text-base" onClick={closeMenu}>Pricing</Link>
            <Link href="/contact" className="block hover:bg-slate-50 dark:hover:bg-slate-900 px-3 py-2 rounded-md font-medium text-slate-600 dark:text-slate-300 text-base" onClick={closeMenu}>Contact</Link>
            
            <div className="mt-4 pt-4 border-slate-200 dark:border-slate-800 border-t">
              <Link 
                href="/free-audit" 
                className="block bg-blue-600 hover:bg-blue-500 px-3 py-3 rounded-md w-full font-semibold text-white text-base text-center"
                onClick={closeMenu}
              >
                Get your free practice audit
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}