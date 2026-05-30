export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 text-green-600 mb-4 animate-bounce">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Thank You Message */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Thank You!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your voice review has been submitted successfully.
          </p>

          {/* Additional Message */}
          <div className="bg-green-50 rounded-lg p-6 mb-8 border border-green-100">
            <p className="text-green-800 text-lg">
              We appreciate your feedback! The business owner will be notified
              and your review will help improve their service.
            </p>
          </div>

          {/* Illustration/Icon */}
          <div className="mb-8">
            <svg
              className="w-32 h-32 mx-auto text-green-200"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>

          {/* Optional Actions */}
          <div className="space-y-4">
            <p className="text-gray-500 text-sm">
              Your review has been saved and will be processed by the business
              owner.
            </p>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Powered by Groq AI • Tell the Owner
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}