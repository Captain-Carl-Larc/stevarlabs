"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

type Consent = "granted" | "denied" | null;

const STORAGE_KEY = "analytics-consent";

export default function AnalyticsConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "granted" || saved === "denied") setConsent(saved);
    setReady(true);

    // Lets a footer "Cookie settings" link reopen the banner
    const reopen = () => {
      localStorage.removeItem(STORAGE_KEY);
      setConsent(null);
    };
    window.addEventListener("open-cookie-settings", reopen);
    return () => window.removeEventListener("open-cookie-settings", reopen);
  }, []);

  function choose(value: "granted" | "denied") {
    localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
    // Rejecting after previously accepting: reload so GA stops loading
    if (value === "denied") window.location.reload();
  }

  if (!ready || !gaId) return null;

  return (
    <>
      {consent === "granted" && <GoogleAnalytics gaId={gaId} />}

      {consent === null && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="bottom-4 z-50 fixed inset-x-4 bg-white dark:bg-slate-900 shadow-lg mx-auto p-4 border border-slate-200 dark:border-slate-700 rounded-xl max-w-xl"
        >
          <p className="text-slate-700 dark:text-slate-200 text-sm">
            We use analytics cookies to understand how visitors use our site.
            They stay off unless you accept. See our{" "}
            <a href="/cookie-policy" className="underline">
              cookie policy
            </a>
            .
          </p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => choose("denied")}
              className="bg-slate-900 dark:bg-white px-4 py-2 rounded-lg text-white dark:text-slate-900 text-sm"
            >
              Reject
            </button>
            <button
              onClick={() => choose("granted")}
              className="bg-slate-900 dark:bg-white px-4 py-2 rounded-lg text-white dark:text-slate-900 text-sm"
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
}
