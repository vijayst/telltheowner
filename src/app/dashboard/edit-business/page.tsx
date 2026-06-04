"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, AlertCircle, CheckCircle, Loader2 } from "lucide-react";


interface BusinessData {
  clientId: string;
  businessName: string;
  businessAddress: string;
}

export default function EditBusinessPage() {
  const router = useRouter();
  const [business, setBusiness] = useState<BusinessData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Form state
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [clientId, setClientId] = useState("");
  const [isCheckingClientId, setIsCheckingClientId] = useState(false);
  const [isClientIdAvailable, setIsClientIdAvailable] = useState(true);
  const [originalClientId, setOriginalClientId] = useState("");
  const [hasReviews, setHasReviews] = useState(false);

  useEffect(() => {
    fetchBusinessData();
  }, []);

  const fetchBusinessData = async () => {
    try {
      const response = await fetch("/api/business/me");
      if (!response.ok) {
        throw new Error("Failed to fetch business data");
      }
      const data = await response.json();
      setBusiness(data);
      setBusinessName(data.businessName);
      setBusinessAddress(data.businessAddress);
      setClientId(data.clientId);
      setOriginalClientId(data.clientId);
      
      // Check if there are reviews
      checkReviews(data.clientId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load business data");
    } finally {
      setLoading(false);
    }
  };

  const checkReviews = async (id: string) => {
    try {
      const response = await fetch(`/api/reviews?clientId=${id}`);
      if (response.ok) {
        const data = await response.json();
        setHasReviews(data.total > 0);
      }
    } catch (error) {
      console.error("Error checking reviews:", error);
    }
  };

  const checkClientIdAvailability = async (id: string) => {
    if (id === originalClientId) {
      setIsClientIdAvailable(true);
      return;
    }

    try {
      setIsCheckingClientId(true);
      const response = await fetch(`/api/check-client-id?clientId=${id}`);
      if (!response.ok) {
        throw new Error("Failed to check availability");
      }
      const data = await response.json();
      setIsClientIdAvailable(data.available);
    } catch (error) {
      console.error("Error checking client ID:", error);
      setIsClientIdAvailable(false);
    } finally {
      setIsCheckingClientId(false);
    }
  };

  const handleClientIdChange = (value: string) => {
    setClientId(value);
    setError("");
    setSuccess("");

    if (value.length > 0 && value !== originalClientId) {
      checkClientIdAvailability(value);
    } else {
      setIsClientIdAvailable(true);
    }
  };

  const validateForm = () => {
    if (!businessName.trim()) {
      setError("Business name is required");
      return false;
    }
    if (!businessAddress.trim()) {
      setError("Business address is required");
      return false;
    }

    // Only validate client ID if it can be changed (no reviews)
    if (!hasReviews) {
      if (!clientId.trim()) {
        setError("Client ID is required");
        return false;
      }

      // Validate client ID format
      const clientIdRegex = /^[a-zA-Z0-9-_]+$/;
      if (!clientIdRegex.test(clientId.trim())) {
        setError("Client ID can only contain letters, numbers, hyphens, and underscores");
        return false;
      }

      if (!isClientIdAvailable) {
        setError("Please choose a different client ID");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/business/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId: hasReviews ? originalClientId : clientId.trim(), // Only send new clientId if no reviews
          businessName: businessName.trim(),
          businessAddress: businessAddress.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update business information");
      }

      const data = await response.json();
      setSuccess("Business information updated successfully!");
      setBusiness(data);
      setOriginalClientId(data.clientId);
      
      // Check reviews for the new URL
      await checkReviews(data.clientId);
      
      // Navigate back to QR Code page after a brief delay
      setTimeout(() => {
        router.push("/dashboard/qr-code");
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => router.push("/dashboard/qr-code")}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to QR Code
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Edit Business Information</h2>
            <p className="text-gray-600 mt-1">Update your business details and URL</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-green-800 text-sm">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Name */}
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                Business Name
              </label>
              <input
                type="text"
                id="businessName"
                value={businessName}
                onChange={(e) => {
                  setBusinessName(e.target.value);
                  setError("");
                  setSuccess("");
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your business name"
              />
            </div>

            {/* Business Address */}
            <div>
              <label htmlFor="businessAddress" className="block text-sm font-medium text-gray-700 mb-2">
                Business Address
              </label>
              <input
                type="text"
                id="businessAddress"
                value={businessAddress}
                onChange={(e) => {
                  setBusinessAddress(e.target.value);
                  setError("");
                  setSuccess("");
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your business address"
              />
            </div>

            {/* Client ID (URL) - Only show if no reviews */}
            {!hasReviews && (
              <div>
                <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-2">
                  Business URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm">telltheowner.com/b/</span>
                  </div>
                  <input
                    type="text"
                    id="clientId"
                    value={clientId}
                    onChange={(e) => handleClientIdChange(e.target.value)}
                    className="w-full pl-32 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="your-business-url"
                  />
                </div>
                
                {!isCheckingClientId && clientId && clientId !== originalClientId && (
                  <div className="mt-2">
                    {isClientIdAvailable ? (
                      <p className="text-green-600 text-xs flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        This URL is available
                      </p>
                    ) : (
                      <p className="text-red-600 text-xs flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        This URL is already taken
                      </p>
                    )}
                  </div>
                )}
                
                {isCheckingClientId && (
                  <div className="mt-2 flex items-center">
                    <Loader2 className="w-4 h-4 animate-spin text-gray-500 mr-2" />
                    <p className="text-gray-500 text-xs">Checking availability...</p>
                  </div>
                )}
              </div>
            )}

            {/* Current URL Preview */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">
                {hasReviews ? "Your Business URL (locked):" : "Current Business URL:"}
              </p>
              <p className="text-sm font-medium text-gray-900 break-all">
                https://telltheowner.com/b/{originalClientId}/review
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={saving || (!hasReviews && !isClientIdAvailable)}
              className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
}