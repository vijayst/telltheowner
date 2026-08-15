"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Code, Copy, Check, ArrowLeft, Globe, ExternalLink, AlertCircle, Loader2 } from "lucide-react";

export default function EmbedWidgetPage() {
  const router = useRouter();
  const [business, setBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

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
      
      // Check if this is an online business
      if (!data.isOnlineBusiness) {
        router.push("/dashboard/qr-code");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load business data");
    } finally {
      setLoading(false);
    }
  };

  const getEmbedCode = () => {
    if (!business) return "";
    
    const clientId = business.clientId;
    return `<div id="telltheowner-review-widget"></div>
<script src="https://telltheowner.com/embed.js"></script>
<script>
  TellTheOwner.init({
    clientId: "${clientId}",
    container: "#telltheowner-review-widget"
  });
</script>`;
  };

  const getAlternateEmbedCode = () => {
    if (!business) return "";
    
    const clientId = business.clientId;
    return `<iframe 
  src="https://telltheowner.com/b/${clientId}/embed" 
  width="320" 
  height="216" 
  frameborder="0" 
  allow="microphone"
  loading="lazy"
  title="Leave a voice review for ${business.businessName}"
></iframe>`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPreviewUrl = () => {
    if (!business) return "";
    return `/b/${business.clientId}/embed`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start">
          <AlertCircle className="w-6 h-6 text-red-600 mr-4 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Business Data</h3>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!business || !business.isOnlineBusiness) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => router.push("/dashboard/qr-code")}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Embed Widget</h1>
              <p className="text-gray-600">Add voice review collection to your website</p>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
            <AlertCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Online Business Feature</p>
              <p>
                Since you're an online business, you can embed this review widget directly on your website 
                instead of using a QR code. Your customers can leave voice reviews without leaving your site!
              </p>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ExternalLink className="w-5 h-5 mr-2" />
            Live Preview
          </h2>
          <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center min-h-[300px] border-2 border-dashed border-gray-300">
            <iframe
              src={getPreviewUrl()}
              width="320"
              height="216"
              className="rounded-lg shadow-lg"
              title="Voice Review Widget Preview"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            This is how the widget will appear on your website
          </p>
        </div>

        {/* Embed Code Options */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Code className="w-5 h-5 mr-2" />
            Embed Code
          </h2>

          {/* Option 1: JavaScript SDK */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-md font-medium text-gray-800">Option 1: JavaScript SDK (Recommended)</h3>
              <button
                onClick={() => copyToClipboard(getEmbedCode())}
                className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    Copy Code
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Best for responsive design and better performance. The widget will adapt to your site's styling.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-100 font-mono whitespace-pre-wrap">
                {getEmbedCode()}
              </pre>
            </div>
          </div>

          {/* Option 2: Direct iframe */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-md font-medium text-gray-800">Option 2: Direct iframe</h3>
              <button
                onClick={() => copyToClipboard(getAlternateEmbedCode())}
                className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    Copy Code
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Simple embed method. Fixed size widget (320x216px). Good for basic websites.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-100 font-mono whitespace-pre-wrap">
                {getAlternateEmbedCode()}
              </pre>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">How to Embed</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                1
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Copy the embed code</h3>
                <p className="text-sm text-gray-600">Choose one of the code options above and copy it to your clipboard.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                2
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Open your website editor</h3>
                <p className="text-sm text-gray-600">Use your website builder (WordPress, Wix, Squarespace, etc.) or HTML editor.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                3
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Paste the code where you want the widget</h3>
                <p className="text-sm text-gray-600">Add the code to any page where you want customers to leave reviews (about, contact, etc.).</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                4
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Save and publish your changes</h3>
                <p className="text-sm text-gray-600">The widget will appear on your live site and customers can start leaving voice reviews!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">💡 Pro Tips</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Place the widget on high-traffic pages like your "About Us" or "Contact" page
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Add a heading above the widget like "Leave Us a Voice Review"
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Test the widget on both desktop and mobile devices
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Share reviews you receive on social media to encourage more customers
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}