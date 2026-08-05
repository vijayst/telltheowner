"use client";

import { usePathname } from "next/navigation";
import ServiceWorkerRegister from "./ServiceWorkerRegister";

export function ConditionalServiceWorker() {
  const pathname = usePathname();

  // Embed iframes should not register a service worker — it caches stale Next.js chunks
  if (pathname?.includes("/embed")) {
    return null;
  }

  return <ServiceWorkerRegister />;
}
