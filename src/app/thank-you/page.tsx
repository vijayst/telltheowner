export const metadata = {
  title: "Thank You - Tell the Owner",
  description: "Thank you for your review. Your feedback helps businesses improve.",
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Navigation Header */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-center max-w-2xl mx-auto">
          <a href="/" className="flex items-center gap-3 group">
            <img 
              src="/icons/icon-96x96.png" 
              alt="TellTheOwner Logo" 
              className="w-12 h-12 rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
            />
            <span className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              TellTheOwner
            </span>
          </a>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-4">
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

          {/* Privacy Notice */}
          <div className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 shadow-md">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Your Privacy Matters</h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  We don't store your audio files — only the transcript is saved for the business owner. Your feedback helps them improve while keeping your voice private.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}