"use client";

import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { VoiceReviewRecorder } from "./VoiceReviewRecorder";
import { ReviewThankYouView } from "./ReviewThankYouView";
import { ReviewInstructions } from "./ReviewInstructions";
import { ReviewPrivacyNotice } from "./ReviewPrivacyNotice";

interface VoiceReviewFlowProps {
  clientId: string;
  variant?: "full" | "embed";
  onSubmitSuccess?: () => void;
}

export function VoiceReviewFlow({
  clientId,
  variant = "full",
  onSubmitSuccess,
}: VoiceReviewFlowProps) {
  const compact = variant === "embed";
  const recorder = useVoiceRecorder(clientId, { onSubmitSuccess });

  if (recorder.submitted) {
    return <ReviewThankYouView compact={compact} />;
  }

  return (
    <>
      <div
        className={`bg-white ${
          compact ? "p-0" : "rounded-2xl shadow-xl p-8"
        }`}
      >
        <div className={`text-center mb-8 ${compact ? "hidden" : "" }`}>
          <h1
            className={`font-bold text-gray-900 mb-1 text-3xl mb-2`}
          >
            Leave a Voice Review
          </h1>
          <p className={`text-gray-600`}>
            Record your voice message (max 30 seconds)
          </p>
        </div>

        <VoiceReviewRecorder
          isRecording={recorder.isRecording}
          isUploading={recorder.isUploading}
          hasRecording={recorder.hasRecording}
          recordingTime={recorder.recordingTime}
          error={recorder.error}
          audioUrl={recorder.audioUrl}
          onStartRecording={recorder.startRecording}
          onStopRecording={recorder.stopRecording}
          onDiscardRecording={recorder.discardRecording}
          onSubmitRecording={recorder.submitRecording}
          compact={compact}
        />

        {!compact && <ReviewInstructions />}
      </div>

      {!compact && <ReviewPrivacyNotice />}
    </>
  );
}
