"use client";

import { QRCodeCanvas as QRCode } from "qrcode.react";

interface DashboardQRCodeProps {
  reviewUrl: string;
}

export function DashboardQRCode({ reviewUrl }: DashboardQRCodeProps) {
  return (
    <div className="flex justify-center p-6 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <QRCode value={reviewUrl} size={250} level="M" includeMargin={true} />
    </div>
  );
}