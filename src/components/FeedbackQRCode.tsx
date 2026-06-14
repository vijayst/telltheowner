"use client";

import { QRCodeCanvas as QRCode } from "qrcode.react";

export default function FeedbackQRCode() {
  const reviewUrl = "https://telltheowner.com/b/tell-the-owner/review";

  return (
    <div className="bg-gradient-to-b from-rose-50 via-pink-50 to-white py-16">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto text-center border-2 border-rose-200">
          <div className="mb-6">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Leave a Feedback
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Leave a feedback for this site — telltheowner.com. Your review is anonymous and only visible to us.
            </p>
          </div>
          
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-xl border-2 border-rose-100 shadow-inner">
              <QRCode value={reviewUrl} size={280} level="M" includeMargin={true} />
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-gray-600 text-sm">
              Scan this QR code or visit:
            </p>
            <a 
              href={reviewUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-rose-600 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-rose-700 transition transform hover:scale-105 shadow-md"
            >
              Open Review Page
            </a>
            <p className="text-gray-400 text-xs mt-4">
              <a 
                href={reviewUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-rose-600 hover:text-rose-700 break-all"
              >
                {reviewUrl}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}