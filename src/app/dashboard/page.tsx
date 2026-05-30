"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { QRCodeView } from "@/components/dashboard/QRCodeView";
import { ReviewWallView } from "@/components/dashboard/ReviewWallView";

type DashboardView = "qr-code" | "review-wall";

export default function DashboardPage() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<DashboardView>("qr-code");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const session = await response.json();

        if (!session.user) {
          router.push("/login");
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        {/* Left Sidebar */}
        <aside className="w-72 bg-white border-r border-gray-200 p-6 fixed h-full overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm mt-1 text-gray-600">Manage your reviews</p>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setCurrentView("qr-code")}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                currentView === "qr-code"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 17h.01M16 17h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              QR Code
            </button>

            <button
              onClick={() => setCurrentView("review-wall")}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                currentView === "review-wall"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Review Wall
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 ml-72 p-8 overflow-auto">
          {currentView === "qr-code" && <QRCodeView />}
          {currentView === "review-wall" && <ReviewWallView />}
        </main>
      </div>
    </div>
  );
}