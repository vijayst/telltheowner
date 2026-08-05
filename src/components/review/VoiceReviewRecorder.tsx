interface VoiceReviewRecorderProps {
  isRecording: boolean;
  isUploading: boolean;
  hasRecording: boolean;
  recordingTime: number;
  error: string | null;
  audioUrl: string | null;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onDiscardRecording: () => void;
  onSubmitRecording: () => void;
  compact?: boolean;
}

export function VoiceReviewRecorder({
  isRecording,
  isUploading,
  hasRecording,
  recordingTime,
  error,
  audioUrl,
  onStartRecording,
  onStopRecording,
  onDiscardRecording,
  onSubmitRecording,
  compact = false,
}: VoiceReviewRecorderProps) {
  return (
    <div className={compact ? "space-y-4" : "space-y-6"}>
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {isRecording && (
        <div className={`text-center ${compact ? "pt-4" : ""}`}>
          <div
            className={`inline-flex items-center justify-center rounded-full bg-red-100 text-red-600 mb-2 ${
              compact ? "w-16 h-16" : "w-20 h-20 mb-4"
            }`}
          >
            <span className={`font-bold ${compact ? "text-xl" : "text-2xl"}`}>
              {recordingTime}s
            </span>
          </div>
          <p className="text-sm text-red-600 font-medium animate-pulse">
            Recording...
          </p>
        </div>
      )}

      {hasRecording && audioUrl && (
        <div className="bg-gray-50 rounded-lg p-4">
          <audio controls src={audioUrl} className="w-full" />
          <p className="text-sm text-gray-600 mt-2 text-center">
            Recording length: {recordingTime} seconds
          </p>
        </div>
      )}

      <div className={`flex flex-col sm:flex-row gap-3 justify-center ${compact ? 'w-full h-full' : ''}`}>
        {!isRecording && !hasRecording && (
          <button
            onClick={onStartRecording}
            className={`flex-1 sm:flex-none bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all shadow-lg ${
              compact ? "px-6 py-3 text-lg w-full h-[216px]" : "px-8 py-4 rounded-lg"
            }`}
            disabled={isUploading}
          >
            <svg
              className={`mx-auto mb-1 ${compact ? "w-8 h-8" : "w-6 h-6 mb-2"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
            {compact ? "Leave a Voice Review" : "Start Recording"}
          </button>
        )}

        {isRecording && (
          <button
            onClick={onStopRecording}
            className={`flex-1 sm:flex-none bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all shadow-lg ${
              compact ? "px-6 py-3 text-sm" : "px-8 py-4"
            }`}
            disabled={isUploading}
          >
            <svg
              className={`mx-auto mb-1 ${compact ? "w-5 h-5" : "w-6 h-6 mb-2"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
              />
            </svg>
            Stop Recording
          </button>
        )}

        {hasRecording && !isUploading && (
          <>
            <button
              onClick={onDiscardRecording}
              className={`flex-1 sm:flex-none bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all ${
                compact ? "px-6 py-3 text-sm mb-4" : "px-8 py-4"
              }`}
            >
              <svg
                className={`mx-auto mb-1 ${compact ? "w-5 h-5" : "w-6 h-6 mb-2"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Discard
            </button>
            <button
              onClick={onSubmitRecording}
              className={`flex-1 sm:flex-none bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all shadow-lg hover:shadow-xl ${
                compact ? "px-6 py-3 text-sm mb-4" : "px-8 py-4"
              }`}
            >
              <svg
                className={`mx-auto mb-1 ${compact ? "w-5 h-5" : "w-6 h-6 mb-2"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Submit Review
            </button>
          </>
        )}

        {isUploading && (
          <button
            disabled
            className={`flex-1 sm:flex-none bg-gray-300 text-gray-500 rounded-lg font-semibold cursor-not-allowed ${
              compact ? "px-6 py-3 text-sm" : "px-8 py-4"
            }`}
          >
            <svg
              className={`animate-spin mx-auto mb-1 ${compact ? "w-5 h-5" : "w-6 h-6 mb-2"}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </button>
        )}
      </div>
    </div>
  );
}
