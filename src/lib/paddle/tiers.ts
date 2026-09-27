export interface Tier {
  name: "Pro";
  description: string;
  features: string[];
  priceId: { month: string; year: string };
}

function requiredMonthlyPriceId(): string {
  const priceId = process.env.NEXT_PUBLIC_PADDLE_PRICE_PRO_MONTH;

  if (!priceId) {
    throw new Error("NEXT_PUBLIC_PADDLE_PRICE_PRO_MONTH is not set.");
  }

  return priceId;
}

export const tiers: Tier[] = [
  {
    name: "Pro",
    description: "Unlimited voice reviews for one flat monthly price.",
    features: [
      "Unlimited voice reviews",
      "AI-powered transcription",
      "QR code generation",
      "Embed widget for websites",
      "Private review dashboard",
      "Cancel anytime",
    ],
    priceId: {
      month: requiredMonthlyPriceId(),
      year: process.env.NEXT_PUBLIC_PADDLE_PRICE_PRO_YEAR ?? "",
    },
  },
];
