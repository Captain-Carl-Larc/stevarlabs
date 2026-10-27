// File: Footer.tsx
// Route/Folder: src/components/client
// Purpose: Global four-column footer containing legal links, service routing, and compliance text.
// Imports: next/link, BRAND config, CookieSettingsButton
// Used in: src/app/(public)/layout.tsx

import Link from "next/link";
import { BRAND } from "@/brand/brand.config";
import CookieSettingsButton from "@/components/client/CookieSettingsButton";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-slate-900/50 pt-16 pb-8 border-slate-200 dark:border-slate-800 border-t">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Four Column Grid Layout */}
        <div className="gap-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-12">
          
          {/* Col 1: Brand & Contact */}
          <div className="space-y-4">
            {/* Logo - Updated to pure text with blue dot */}
            <h3 className="flex items-baseline font-bold text-slate-900 dark:text-white text-xl tracking-tight">
              {BRAND.name}<span className="text-blue-600 dark:text-blue-500">.</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              We help UK dental practices get more new-patient enquiries and keep the patients they already have.
            </p>
            <p className="font-medium text-slate-900 dark:text-slate-300 text-sm">
              <a href="mailto:audit@mail.stevarlabs.co.uk" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                audit@mail.stevarlabs.co.uk
              </a>
            </p>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="mb-4 font-semibold text-slate-900 dark:text-white text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-3">
              <li><Link href="/services/local-seo" className="text-slate-600 hover:text-blue-600 dark:hover:text-blue-400 dark:text-slate-400 text-sm transition-colors">Local SEO for Dental Practices</Link></li>
              <li><Link href="/services/website-design-redesign" className="text-slate-600 hover:text-blue-600 dark:hover:text-blue-400 dark:text-slate-400 text-sm transition-colors">Dental Website Design and Redesign</Link></li>
              <li><Link href="/services/patient-retention" className="text-slate-600 hover:text-blue-600 dark:hover:text-blue-400 dark:text-slate-400 text-sm transition-colors">Patient Retention and Recall</Link></li>
              <li><Link href="/services/social-media" className="text-slate-600 hover:text-blue-600 dark:hover:text-blue-400 dark:text-slate-400 text-sm transition-colors">Dental Social Media Management</Link></li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="mb-4 font-semibold text-slate-900 dark:text-white text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-slate-600 hover:text-blue-600 dark:hover:text-blue-400 dark:text-slate-400 text-sm transition-colors">About</Link></li>
              <li><Link href="/pricing" className="text-slate-600 hover:text-blue-600 dark:hover:text-blue-400 dark:text-slate-400 text-sm transition-colors">Pricing</Link></li>
              <li><Link href="/resources" className="text-slate-600 hover:text-blue-600 dark:hover:text-blue-400 dark:text-slate-400 text-sm transition-colors">Resources</Link></li>
              <li><Link href="/posts" className="text-slate-600 hover:text-blue-600 dark:hover:text-blue-400 dark:text-slate-400 text-sm transition-colors">Posts</Link></li>
              <li><Link href="/contact" className="text-slate-600 hover:text-blue-600 dark:hover:text-blue-400 dark:text-slate-400 text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Col 4: Legal */}
          <div>
            <h4 className="mb-4 font-semibold text-slate-900 dark:text-white text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy-policy" className="text-slate-600 hover:text-blue-600 dark:hover:text-blue-400 dark:text-slate-400 text-sm transition-colors">Privacy policy</Link></li>
              <li><Link href="/cookie-policy" className="text-slate-600 hover:text-blue-600 dark:hover:text-blue-400 dark:text-slate-400 text-sm transition-colors">Cookie policy</Link></li>
              <li><CookieSettingsButton /></li>
              <li><Link href="/terms" className="text-slate-600 hover:text-blue-600 dark:hover:text-blue-400 dark:text-slate-400 text-sm transition-colors">Website terms of use</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Spec Footnotes */}
        <div className="flex md:flex-row flex-col justify-between items-center gap-4 pt-8 border-slate-200 dark:border-slate-800 border-t">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            © {currentYear} {BRAND.name}
          </p>
          <p className="font-medium text-slate-600 dark:text-slate-400 text-sm italic">
            Stevarlabs works with dental practices across the UK.
          </p>
        </div>
      </div>
    </footer>
  );
}