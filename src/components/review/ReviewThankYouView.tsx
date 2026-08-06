interface ReviewThankYouViewProps {
  compact?: boolean;
}

export function ReviewThankYouView({ compact = false }: ReviewThankYouViewProps) {
  return (
    <div className="text-center">
      <div className={`inline-flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-4 ${compact ? "w-14 h-14 mt-4" : "w-24 h-24 animate-bounce"}`}>
        <svg
          className={compact ? "w-7 h-7" : "w-12 h-12"}
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

      <h2 className={`font-bold text-gray-900 ${compact ? "text-xl mb-2" : "text-4xl mb-4"}`}>
        Thank You!
      </h2>
      <p className={`text-gray-600 ${compact ? "text-md mb-3" : "text-xl mb-8"}`}>
        Your voice review has been submitted.
      </p>

      {!compact && (
        <div className="bg-green-50 rounded-lg border border-green-100 p-6 mb-8">
          <p className="text-green-800 text-lg">
            We appreciate your feedback! The business owner will be notified and
            your review will help improve their service.
          </p>
        </div>
      )}
    </div>
  );
}
