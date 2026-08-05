interface ReviewPrivacyNoticeProps {
  compact?: boolean;
}

export function ReviewPrivacyNotice({ compact = false }: ReviewPrivacyNoticeProps) {
  return (
    <div
      className={`bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl shadow-md ${
        compact ? "p-4 mt-4" : "p-6 mt-6"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div
            className={`bg-blue-600 rounded-full flex items-center justify-center ${
              compact ? "w-8 h-8" : "w-12 h-12"
            }`}
          >
            <svg
              className={`text-white ${compact ? "w-4 h-4" : "w-6 h-6"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <h3
            className={`font-bold text-gray-900 mb-1 ${
              compact ? "text-sm" : "text-lg mb-2"
            }`}
          >
            Your Privacy Matters
          </h3>
          <p
            className={`text-gray-700 leading-relaxed ${
              compact ? "text-xs" : "text-base"
            }`}
          >
            We don&apos;t store your audio files — only the transcript is saved
            for the business owner. Your feedback helps them improve while
            keeping your voice private.
          </p>
        </div>
      </div>
    </div>
  );
}
