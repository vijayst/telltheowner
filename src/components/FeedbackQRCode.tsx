"use client";

import { QRCodeCanvas as QRCode } from "qrcode.react";

export default function FeedbackQRCode() {
  const reviewUrl = "https://telltheowner.com/b/tell-the-owner/review";

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Leave a Feedback
        </h2>
        <div className="flex justify-center mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <QRCode value={reviewUrl} size={200} level="M" includeMargin={true} />
          </div>
        </div>
        <p className="text-gray-600 text-sm">
          Scan this QR code or visit:<br />
          <a 
            href={reviewUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium break-all"
          >
            {reviewUrl}
          </a>
        </p>
      </div>
    </div>
  );
}