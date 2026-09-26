const resendApiKey = process.env.RESEND_API_KEY;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function notifyOwnersOfReview({
  ownerEmails,
  businessName,
  reviewText,
}: {
  ownerEmails: string[];
  businessName: string;
  reviewText: string;
}) {
  if (!resendApiKey || ownerEmails.length === 0) {
    return;
  }

  const appUrl = (process.env.AUTH_URL ?? "https://telltheowner.com").replace(
    /\/$/,
    ""
  );
  const reviewWallUrl = `${appUrl}/dashboard/review-wall`;
  const safeBusinessName = escapeHtml(businessName);
  const safeReviewText = escapeHtml(reviewText);

  await Promise.all(
    ownerEmails.map(async (email) => {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Tell the Owner <noreply@telltheowner.com>",
          to: [email],
          subject: `New review for ${businessName}`,
          html: `
            <p>Someone left a new review for <strong>${safeBusinessName}</strong>.</p>
            <blockquote style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid #e5e7eb; color: #111827;">
              ${safeReviewText}
            </blockquote>
            <p><a href="${reviewWallUrl}">View it in your dashboard</a></p>
          `,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("Failed to send review notification:", error);
      }
    })
  );
}
