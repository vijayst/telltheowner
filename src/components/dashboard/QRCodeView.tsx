"use client";

import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { CopyUrlButton } from "@/components/CopyUrlButton";
import { Printer } from "lucide-react";
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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

  const handlePrintQRCode = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${business.businessName} - QR Code</title>
        <style>
          body {
            margin: 0;
            padding: 40px;
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }
          .container {
            text-align: center;
            max-width: 600px;
          }
          .business-name {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #1f2937;
          }
          .business-address {
            font-size: 16px;
            color: #6b7280;
            margin-bottom: 30px;
          }
          .qr-container {
            margin: 20px 0;
            padding: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .instructions {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #374151;
          }
          .sub-instructions {
            font-size: 14px;
            color: #6b7280;
          }
          @media print {
            body {
              padding: 20px;
            }
            .qr-container {
              box-shadow: none;
              border: 2px solid #e5e7eb;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="business-name">${business.businessName}</h1>
          <p class="business-address">${business.businessAddress}</p>
          
          <div class="qr-container">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(reviewUrl)}" 
                 alt="QR Code" 
                 width="400" 
                 height="400">
          </div>
          
          <p class="instructions">Scan to Leave a Review</p>
          <p class="sub-instructions">Use your phone's camera app or QR scanner</p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Wait for the window to load, then print
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">QR Code</h2>
        <p className="mb-6 text-gray-600">
          Display this QR code to let customers scan and leave reviews
        </p>

        <div className="space-y-6">
          {/* Business Info */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div>
              <span className="text-sm font-medium text-gray-500">Business Name</span>
              <p className="text-lg font-semibold text-gray-900">{business.businessName}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Address</span>
              <p className="text-gray-900">{business.businessAddress}</p>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center justify-center bg-white border-2 border-gray-200 rounded-lg p-8">
            <div className="mb-4">
              <button
                onClick={handlePrintQRCode}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print for Display
              </button>
            </div>
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
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Review URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={reviewUrl}
                className="flex-1 p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900"
              />
              <CopyUrlButton url={reviewUrl} />
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-blue-900">Tips for Best Results</h3>
            <ul className="text-sm space-y-1 text-blue-800">
              <li>• Print the QR code on durable material</li>
              <li>• Display prominently near checkout or entrance</li>
              <li>• Test the QR code before printing</li>
              <li>• Customers can scan with any smartphone camera app</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}