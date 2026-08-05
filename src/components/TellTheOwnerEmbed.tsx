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
    <div
      className="telltheowner-embed"
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        margin: "32px 0",
        boxSizing: "border-box",
      }}
    >
      <iframe
        src={embedSrc}
        width={320}
        height={216}
        title="Leave a voice review"
        allow="microphone"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        style={{
          width: "320px",
          height: "216px",
          maxWidth: "100%",
          border: 0,
          display: "block",
        }}
      />
    </div>
  );
}
