"use client";

import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Loader } from "rsuite";
import { CopyUrlButton } from "@/components/CopyUrlButton";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

interface BusinessData {
  clientId: string;
  businessName: string;
  businessAddress: string;
}

export function QRCodeView() {
  const [business, setBusiness] = useState<BusinessData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load business data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader size="md" content="Loading..." vertical />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    );
  }

  if (!business) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-700">
        No business found. Please complete onboarding.
      </div>
    );
  }

  const reviewUrl = `https://telltheowner.com/b/${business.clientId}/review`;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#111827' }}>QR Code</h2>
        <p className="mb-6" style={{ color: '#6b7280' }}>
          Display this QR code to let customers scan and leave reviews
        </p>

        <div className="space-y-6">
          {/* Business Info */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div>
              <span className="text-sm font-medium" style={{ color: '#6b7280' }}>Business Name</span>
              <p className="text-lg font-semibold" style={{ color: '#111827' }}>{business.businessName}</p>
            </div>
            <div>
              <span className="text-sm font-medium" style={{ color: '#6b7280' }}>Address</span>
              <p style={{ color: '#111827' }}>{business.businessAddress}</p>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center justify-center bg-white border-2 border-gray-200 rounded-lg p-8">
            <div className="bg-white p-4 rounded-lg">
              <QRCodeSVG
                value={reviewUrl}
                size={256}
                level={"H"}
                includeMargin={true}
                className="w-64 h-64"
              />
            </div>
          </div>

          {/* Review URL */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
              Review URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={reviewUrl}
                className="flex-1 p-3 bg-gray-50 rounded-lg border border-gray-200"
                style={{ color: '#111827' }}
              />
              <CopyUrlButton url={reviewUrl} />
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold mb-2" style={{ color: '#1e3a8a' }}>Tips for Best Results</h3>
            <ul className="text-sm space-y-1" style={{ color: '#1e40af' }}>
              <li>• Print the QR code on durable material</li>
              <li>• Display prominently near checkout or entrance</li>
              <li>• Test the QR code before printing large quantities</li>
              <li>• Customers can scan with any smartphone camera app</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}