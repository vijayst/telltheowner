"use client";

interface TellTheOwnerEmbedProps {
  clientId: string;
  /** Defaults to same-origin relative URL when omitted */
  baseUrl?: string;
}

/**
 * Hydration-safe embed for Next.js pages. Renders the iframe directly in React
 * so server and client HTML match. For third-party sites, use public/embed.js.
 */
export function TellTheOwnerEmbed({
  clientId,
  baseUrl,
}: TellTheOwnerEmbedProps) {
  const embedSrc = baseUrl
    ? `${baseUrl}/b/${encodeURIComponent(clientId)}/embed`
    : `/b/${encodeURIComponent(clientId)}/embed`;

  return (
    <div className="flex items-center justify-center w-full">
      <iframe
        src={embedSrc}
        width={320}
        height={216}
        title="Leave a voice review"
        allow="microphone"
        loading="lazy"
      />
    </div>
  );
}
