"use client";

// File: CookieSettingsButton.tsx
// Route/Folder: src/components/client
// Purpose: Footer link that reopens the cookie consent banner.
// Used in: Footer.tsx

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
      className="text-slate-600 hover:text-blue-600 dark:hover:text-blue-400 dark:text-slate-400 text-sm transition-colors"
    >
      Cookie settings
    </button>
  );
}