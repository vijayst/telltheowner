import { QRCodeSVG } from "qrcode.react";
import Footer from "@/components/Footer";

const demoBusiness = {
  clientId: "demo",
  businessName: "Demo Business",
  businessAddress: "123 Demo Street, Demo City, DC 12345",
};

export const metadata = {
  title: "Demo QR Code - Tell the Owner",
  description: "See how businesses use QR codes to collect private customer reviews.",
};

export default function ReviewDemoPage() {
  const reviewUrl = `https://telltheowner.com/b/${demoBusiness.clientId}/review`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-blue-600">TellTheOwner</a>
          <a href="/" className="text-gray-600 hover:text-blue-600 transition">
            ← Back to Home
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                Leave a review
              </h1>
              <p className="text-gray-600 mt-2">
                Scan this QR code to leave a review for our demo business
              </p>
            </div>

            <div className="space-y-6">
              {/* Business Info */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-500">Business Name</span>
                  <p className="text-lg font-semibold text-gray-900">{demoBusiness.businessName}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Address</span>
                  <p className="text-gray-900">{demoBusiness.businessAddress}</p>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review URL
                </label>
                <input
                  type="text"
                  readOnly
                  value={reviewUrl}
                  className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900"
                />
              </div>

              {/* Tips */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">How to Use</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Scan the QR code with your smartphone camera app</li>
                  <li>• You'll be taken to a review form</li>
                  <li>• Submit your review - it will appear on the demo review wall</li>
                  <li>• Your review is private and anonymous</li>
                </ul>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <a
                  href="/product/review-wall-demo"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition text-center"
                >
                  View Review Wall
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}