"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { QrCode, MessageSquare, LogOut } from "lucide-react";
import { QRCodeView } from "@/components/dashboard/QRCodeView";
import { ReviewWallView } from "@/components/dashboard/ReviewWallView";

type DashboardView = "qr-code" | "review-wall";

interface DashboardClientProps {
  children?: React.ReactNode;
}

export default function DashboardClient({ children }: DashboardClientProps) {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<DashboardView>("qr-code");
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string>("");
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    const checkAuthAndBusiness = async () => {
      try {
        // Check if user is authenticated
        const sessionResponse = await fetch("/api/auth/session");
        const session = await sessionResponse.json();

        if (!session.user) {
          router.push("/login");
          return;
        }

        // Store user email
        setUserEmail(session.user.email || "");

        // Check if user has a business
        const businessResponse = await fetch("/api/business/me");
        if (businessResponse.status === 404) {
          // User doesn't have a business, redirect to onboarding
          router.push("/onboarding");
          return;
        }

        if (!businessResponse.ok) {
          console.error("Failed to check business status");
          router.push("/login");
          return;
        }

        // User is authenticated and has a business
        setLoading(false);
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/login");
      }
    };

    checkAuthAndBusiness();
  }, [router]);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await fetch("/api/auth/signout");
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setSigningOut(false);
    }
  };

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
              <QrCode className="w-5 h-5 mr-3" />
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
              <MessageSquare className="w-5 h-5 mr-3" />
              Review Wall
            </button>
          </nav>

          {/* User Info & Sign Out */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-white">
            <div className="mb-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Signed in as</p>
              <p className="text-sm font-medium text-gray-900 truncate">{userEmail}</p>
            </div>
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {signingOut ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing out...
                </span>
              ) : (
                <span className="flex items-center">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </span>
              )}
            </button>
          </div>
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