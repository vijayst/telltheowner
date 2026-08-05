"use client";

import { useParams, useRouter } from "next/navigation";
import { ReviewPageHeader } from "@/components/review/ReviewPageHeader";
import { VoiceReviewFlow } from "@/components/review/VoiceReviewFlow";

export default function ReviewPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params.clientId as string;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <ReviewPageHeader />

      <div className="max-w-2xl mx-auto px-4 py-4">
        <VoiceReviewFlow
          clientId={clientId}
          variant="full"
          onSubmitSuccess={() => router.push("/thank-you")}
        />
      </div>
    </div>
  );
}
