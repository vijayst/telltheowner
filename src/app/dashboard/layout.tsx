"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { QrCode, MessageSquare, LogOut, MoreHorizontal, X, Settings } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string>("");
  const [signingOut, setSigningOut] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mobileSidebarRef = useRef<HTMLDivElement | null>(null);

  // Determine current view from pathname
  const currentView = pathname.includes("review-wall") 
    ? "review-wall" 
    : pathname.includes("edit-business")
    ? "edit-business"
    : "qr-code";

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

  const handleNavigation = (view: "qr-code" | "review-wall" | "edit-business") => {
    setSidebarOpen(false);
    router.push(`/dashboard/${view}`);
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
        {/* Left Sidebar (desktop) */}
        <aside className="hidden md:block w-72 bg-white border-r border-gray-200 p-6 fixed h-full overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm mt-1 text-gray-600">Manage your reviews</p>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => handleNavigation("qr-code")}
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
              onClick={() => handleNavigation("review-wall")}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                currentView === "review-wall"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <MessageSquare className="w-5 h-5 mr-3" />
              Review Wall
            </button>

            <button
              onClick={() => handleNavigation("edit-business")}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                currentView === "edit-business"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Settings className="w-5 h-5 mr-3" />
              Edit Business
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

        {/* Mobile sidebar overlay */}
        <div
          ref={mobileSidebarRef}
          className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 p-6 overflow-y-auto transform transition-transform duration-200 md:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-hidden={!sidebarOpen}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm mt-1 text-gray-600">Manage your reviews</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => handleNavigation("qr-code")}
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
              onClick={() => handleNavigation("review-wall")}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                currentView === "review-wall"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <MessageSquare className="w-5 h-5 mr-3" />
              Review Wall
            </button>

            <button
              onClick={() => handleNavigation("edit-business")}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                currentView === "edit-business"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Settings className="w-5 h-5 mr-3" />
              Edit Business
            </button>
          </nav>

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
        </div>

        {/* Backdrop for mobile when sidebar open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 md:ml-72 p-8 overflow-auto">
          <header className="mb-6 flex items-center justify-between md:hidden">
            <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
            <button
              onClick={() => {
                setSidebarOpen(true);
                // scroll mobile sidebar to top after it opens
                setTimeout(() => mobileSidebarRef.current?.scrollTo({ top: 0, behavior: "auto" }), 0);
              }}
              aria-label="Open menu"
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <MoreHorizontal className="w-5 h-5 text-gray-700" />
            </button>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}