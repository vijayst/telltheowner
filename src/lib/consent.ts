export const CONSENT_COOKIE = "tto_consent";
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;
export const GA_MEASUREMENT_ID = "G-EGRF1EZ2YE";
export const OPEN_COOKIE_SETTINGS_EVENT = "tto:open-cookie-settings";

export type ConsentChoice = "analytics" | "necessary";

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

export function readConsent(): ConsentChoice | null {
  const entry = document.cookie
    .split("; ")
    .find((part) => part.startsWith(`${CONSENT_COOKIE}=`));

  if (!entry) {
    return null;
  }

  const value = decodeURIComponent(entry.slice(CONSENT_COOKIE.length + 1));
  return value === "analytics" || value === "necessary" ? value : null;
}

export function writeConsent(choice: ConsentChoice) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${choice}; Max-Age=${CONSENT_MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`;
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
}

export function loadGoogleAnalytics() {
  const win = window as AnalyticsWindow;

  win.dataLayer = win.dataLayer || [];
  if (!win.gtag) {
    // gtag.js only processes Arguments objects on dataLayer. Pushing an array
    // makes it ignore the command, so no hits are sent.
    win.gtag = function gtag() {
      win.dataLayer?.push(arguments);
    };
  }

  if (document.getElementById("ga-loader")) {
    return;
  }

  win.gtag("js", new Date());
  win.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });

  const script = document.createElement("script");
  script.id = "ga-loader";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

export function trackPageView(path: string) {
  const win = window as AnalyticsWindow;
  loadGoogleAnalytics();
  win.gtag?.("event", "page_view", {
    send_to: GA_MEASUREMENT_ID,
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function clearAnalyticsCookies() {
  const names = document.cookie
    .split(";")
    .map((part) => part.trim().split("=")[0])
    .filter(
      (name) =>
        name === "_gid" || name === "_gat" || name.startsWith("_ga"),
    );

  const domains = new Set<string>([window.location.hostname]);
  const parts = window.location.hostname.split(".");
  if (parts.length >= 2) {
    domains.add(`.${parts.slice(-2).join(".")}`);
  }

  for (const name of names) {
    document.cookie = `${name}=; Max-Age=0; Path=/`;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; Path=/; Domain=${domain}`;
    }
  }
}
