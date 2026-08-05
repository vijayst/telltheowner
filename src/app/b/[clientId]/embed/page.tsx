"use client";

import { useParams } from "next/navigation";
import { VoiceReviewFlow } from "@/components/review/VoiceReviewFlow";

export default function EmbedPage() {
  const params = useParams();
  const clientId = params.clientId as string;

  return (
    <div className="max-w-[320px] h-[216px] bg-white">
      <VoiceReviewFlow clientId={clientId} variant="embed" />
    </div>
  );
}
