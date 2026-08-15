"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Fetch business data and redirect based on business type
    async function checkBusinessType() {
      try {
        const response = await fetch("/api/business/me");
        if (response.ok) {
          const data = await response.json();
          // Redirect to embed-widget for online businesses, qr-code for physical businesses
          const targetPage = data.isOnlineBusiness ? "/dashboard/embed-widget" : "/dashboard/qr-code";
          router.replace(targetPage);
        } else {
          // If no business found, redirect to onboarding
          router.replace("/onboarding");
        }
      } catch (error) {
        console.error("Error checking business type:", error);
        // Fallback to QR code page on error
        router.replace("/dashboard/qr-code");
      }
    }

    checkBusinessType();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}