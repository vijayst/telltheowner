"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { QRCodeCanvas as QRCode } from "qrcode.react";
import { Home, LogOut } from "lucide-react";

export default function OnboardingClient() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [clientId, setClientId] = useState("");
  const [isOnlineBusiness, setIsOnlineBusiness] = useState(false);
  const [isCheckingClientId, setIsCheckingClientId] = useState(false);
  const [isClientIdAvailable, setIsClientIdAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const reviewUrl = clientId ? `https://telltheowner.com/b/${clientId}/review` : "";

  // Generate unique client ID on component mount
  useEffect(() => {
    if (!clientId && businessName && businessAddress) {
      const newClientId = generateClientId();
      setClientId(newClientId);
      setIsClientIdAvailable(true);
    }
  }, [businessName, businessAddress]);

  // Generate QR code URL when review URL changes
  useEffect(() => {
    if (reviewUrl) {
      // QR codes for URLs are deterministic - same URL always generates the same QR code
      // So we don't need to store the QR code, just generate it from the URL
      setQrCodeUrl(reviewUrl);
    }
  }, [reviewUrl]);

  function generateClientId(): string {
    // Generate client ID in format: businessName-businessAddress
    // Rules: remove multiple spaces, replace spaces with hyphens, convert to lowercase
    if (!businessName || !businessAddress) {
      // Fallback if fields are missing
      return `business-${Date.now()}`;
    }

    const sanitizedBusinessName = businessName
      .replace(/[^a-zA-Z0-9\s-]/g, "") // Remove special characters except hyphens
      .replace(/\s+/g, " ") // Replace multiple spaces with single space
      .trim()
      .replace(/\s/g, "-") // Replace spaces with hyphens
      .toLowerCase();

    const sanitizedAddress = businessAddress
      .replace(/[^a-zA-Z0-9\s-]/g, "") // Remove special characters except hyphens
      .replace(/\s+/g, " ") // Replace multiple spaces with single space
      .trim()
      .replace(/\s/g, "-") // Replace spaces with hyphens
      .toLowerCase();

    // Take first 30 chars of address to keep it reasonable length
    const shortAddress = sanitizedAddress.substring(0, 30);

    return `${sanitizedBusinessName}-${shortAddress}`;
  }

  // Update client ID suggestion when business name and address change
  useEffect(() => {
    if (businessName && businessAddress && !clientId) {
      const newClientId = generateClientId();
      setClientId(newClientId);
      setIsClientIdAvailable(true);
    }
  }, [businessName, businessAddress, clientId]);

  async function checkClientIdAvailability(id: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/check-client-id?clientId=${id}`);
      if (!response.ok) {
        return false;
      }
      const data = await response.json();
      return data.available;
    } catch (error) {
      console.error("Error checking client ID:", error);
      return false;
    }
  }

  async function handleClientIdChange(value: string) {
    setClientId(value);
    setError("");

    if (value.length > 0) {
      setIsCheckingClientId(true);
      const available = await checkClientIdAvailability(value);
      setIsClientIdAvailable(available);
      setIsCheckingClientId(false);
    } else {
      setIsClientIdAvailable(true);
    }
  }

  async function handleClientIdBlur() {
    if (clientId && !isClientIdAvailable) {
      // Generate a new available client ID
      const newClientId = generateClientId();
      setClientId(newClientId);
      setIsClientIdAvailable(true);
    }
  }

  async function handleGenerateClientId() {
    const newClientId = generateClientId();
    setClientId(newClientId);
    setIsCheckingClientId(true);
    const available = await checkClientIdAvailability(newClientId);
    setIsClientIdAvailable(available);
    setIsCheckingClientId(false);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Validate inputs
    if (!businessName.trim()) {
      setError("Business name is required");
      return;
    }
    
    // Address is only required for physical businesses
    if (!isOnlineBusiness && !businessAddress.trim()) {
      setError("Business address is required");
      return;
    }
    
    if (!clientId.trim()) {
      setError("Client ID is required");
      return;
    }

    // Validate client ID format (alphanumeric, hyphens, underscores)
    const clientIdRegex = /^[a-zA-Z0-9-_]+$/;
    if (!clientIdRegex.test(clientId.trim())) {
      setError("Client ID can only contain letters, numbers, hyphens, and underscores");
      return;
    }

    if (!isClientIdAvailable) {
      setError("Please choose a different client ID");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          clientId: clientId.trim(),
          businessName: businessName.trim(),
          businessAddress: isOnlineBusiness ? "" : businessAddress.trim(),
          isOnlineBusiness: isOnlineBusiness,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save business information");
      }

      // Redirect to dashboard on success
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => router.push("/")}
              className="flex items-center px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Home</span>
            </button>
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="flex items-center px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {signingOut ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-sm font-medium">Signing out...</span>
                </>
              ) : (
                <>
                  <LogOut className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Sign Out</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to Tell the Owner
            </h1>
            <h2 className="text-xl text-gray-600 dark:text-gray-300">
              Set up your business profile
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Let's get your business ready to receive customer reviews
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Business Name */}
          <div>
            <label
              htmlFor="businessName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Business Name
            </label>
            <input
              id="businessName"
              name="businessName"
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your business name"
            />
          </div>

          {/* Online Business Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <label htmlFor="isOnlineBusiness" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Online Business
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Toggle on if you operate online only
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOnlineBusiness(!isOnlineBusiness)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isOnlineBusiness ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
              }`}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isOnlineBusiness ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Business Address */}
          <div>
            <label
              htmlFor="businessAddress"
              className={`block text-sm font-medium ${isOnlineBusiness ? 'text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'} mb-2`}
            >
              Business Address {isOnlineBusiness && '(Optional)'}
            </label>
            <input
              id="businessAddress"
              name="businessAddress"
              type="text"
              required={!isOnlineBusiness}
              value={businessAddress}
              onChange={(e) => setBusinessAddress(e.target.value)}
              disabled={isOnlineBusiness}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600 dark:text-white ${
                isOnlineBusiness 
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                  : 'bg-white dark:bg-gray-700'
              }`}
              placeholder="Enter your business address"
            />
          </div>

          {/* Client ID */}
          <div>
            <label
              htmlFor="clientId"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Client ID
            </label>
            <div className="flex gap-2">
              <input
                id="clientId"
                name="clientId"
                type="text"
                required
                value={clientId}
                onChange={(e) => handleClientIdChange(e.target.value)}
                onBlur={handleClientIdBlur}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="e.g., starbucks-coffee-485-bloor-st"
              />
              <button
                type="button"
                onClick={handleGenerateClientId}
                className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200"
              >
                Generate
              </button>
            </div>
            {isCheckingClientId && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Checking availability...
              </p>
            )}
            {!isCheckingClientId && clientId && isClientIdAvailable && (
              <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                ✓ This client ID is available
              </p>
            )}
            {!isCheckingClientId && clientId && !isClientIdAvailable && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                ✗ This client ID is already taken. Please choose another.
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Format: businessName-businessAddress. Your review URL will be: telltheowner.com/review/{clientId}
            </p>
          </div>

          {/* Review URL (Readonly) */}
          {reviewUrl && (
            <div>
              <label
                htmlFor="reviewUrl"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Review URL
              </label>
              <input
                id="reviewUrl"
                name="reviewUrl"
                type="text"
                readOnly
                value={reviewUrl}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-600 dark:border-gray-600 dark:text-gray-300 cursor-not-allowed"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Share this URL with your customers to collect reviews
              </p>
            </div>
          )}

          {/* QR Code */}
          {qrCodeUrl && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                QR Code
              </label>
              <div className="flex justify-center p-4 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                <QRCode
                  value={qrCodeUrl}
                  size={200}
                  level="M"
                  includeMargin={true}
                />
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
                Customers can scan this code to leave a review
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !isClientIdAvailable}
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Saving..." : "Save and Continue"}
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}