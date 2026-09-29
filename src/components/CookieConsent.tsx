"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  OPEN_COOKIE_SETTINGS_EVENT,
  clearAnalyticsCookies,
  loadGoogleAnalytics,
  openCookieSettings,
  readConsent,
  writeConsent,
  type ConsentChoice,
} from "@/lib/consent";

export function CookieSettingsButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button type="button" className={className} onClick={openCookieSettings}>
      {children}
    </button>
  );
}

function isFeedbackWidgetPath(pathname: string | null) {
  return Boolean(pathname && /^\/b\/[^/]+\/embed\/?$/.test(pathname));
}

export function CookieConsent() {
  const pathname = usePathname();
  const isWidget = isFeedbackWidgetPath(pathname);
  const [choice, setChoice] = useState<ConsentChoice | null | undefined>(
    undefined,
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isWidget) {
      return;
    }

    const current = readConsent();
    setChoice(current);
    setOpen(current === null);

    if (current === "analytics") {
      loadGoogleAnalytics();
    } else {
      clearAnalyticsCookies();
    }

    const show = () => setOpen(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, show);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, show);
  }, [isWidget]);

  function choose(next: ConsentChoice) {
    const hadAnalytics = choice === "analytics";
    writeConsent(next);

    if (next === "necessary") {
      clearAnalyticsCookies();
      if (hadAnalytics) {
        window.location.reload();
        return;
      }
    }

    if (next === "analytics") {
      loadGoogleAnalytics();
    }

    setChoice(next);
    setOpen(false);
  }

  if (isWidget || !open) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6">
      <div
        role="dialog"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-description"
        className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl"
      >
        <h2
          id="cookie-consent-title"
          className="text-lg font-semibold text-gray-900"
        >
          Cookies on Tell the Owner
        </h2>
        <p
          id="cookie-consent-description"
          className="mt-2 text-sm leading-relaxed text-gray-600"
        >
          Necessary cookies keep you signed in and limit repeat reviews.
          Analytics cookies stay off until you allow them.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => choose("analytics")}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-blue-700 transition"
          >
            Allow analytics
          </button>
          <button
            type="button"
            onClick={() => choose("necessary")}
            className="bg-white text-gray-800 px-5 py-2.5 rounded-full font-medium border border-gray-300 hover:bg-gray-50 transition"
          >
            Necessary only
          </button>
          <a
            href="/privacy#cookies"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 sm:ml-auto"
          >
            Cookie details
          </a>
        </div>
      </div>
    </div>
  );
}
