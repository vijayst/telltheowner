"use client";

import { useEffect, useRef, useState } from "react";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";
import { getPaddleClientToken, getPaddleEnvironment } from "@/lib/paddle/config";
import { tiers, type Tier } from "@/lib/paddle/tiers";

type FormattedTotals = {
  subtotal: string;
  discount: string;
  tax: string;
  total: string;
};

export function PricingCheckout({
  countryCode,
  email,
}: {
  countryCode?: string;
  email?: string;
}) {
  const environment = getPaddleEnvironment();
  const token = getPaddleClientToken();
  const paddleRef = useRef<Paddle | null>(null);
  const [prices, setPrices] = useState<Record<string, FormattedTotals>>({});
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    initializePaddle({
      environment,
      token,
      eventCallback(event) {
        if (event.name === "checkout.completed") {
          window.location.assign("/welcome");
        }
      },
    })
      .then(async (paddle) => {
        if (!paddle || cancelled) {
          return;
        }

        paddleRef.current = paddle;

        const preview = await paddle.PricePreview({
          items: tiers.map((tier) => ({
            priceId: tier.priceId.month,
            quantity: 1,
          })),
          ...(countryCode ? { address: { countryCode } } : {}),
        });

        if (cancelled) {
          return;
        }

        const nextPrices: Record<string, FormattedTotals> = {};

        for (const item of preview.data.details.lineItems) {
          nextPrices[item.price.id] = item.formattedTotals;
        }

        setPrices(nextPrices);
        setReady(true);
      })
      .catch((previewError: unknown) => {
        if (cancelled) {
          return;
        }

        console.error("Paddle price preview failed:", previewError);
        setError("We couldn't load prices. Refresh and try again.");
      });

    return () => {
      cancelled = true;
    };
  }, [countryCode, environment, token]);

  function subscribe(tier: Tier) {
    const paddle = paddleRef.current;
    const shownPrice = prices[tier.priceId.month];

    if (!paddle || !shownPrice) {
      return;
    }

    paddle.Checkout.open({
      items: [{ priceId: tier.priceId.month, quantity: 1 }],
      settings: {
        displayMode: "overlay",
        variant: "one-page",
        successUrl: `${window.location.origin}/welcome`,
      },
      ...(email
        ? {
            customer: {
              email,
              ...(countryCode ? { address: { countryCode } } : {}),
            },
          }
        : {}),
    });
  }

  return (
    <div className="max-w-xl mx-auto">
      {tiers.map((tier) => {
        const totals = prices[tier.priceId.month];

        return (
          <div
            key={tier.name}
            id={tier.name.toLowerCase()}
            className="bg-white rounded-3xl p-8 shadow-xl border-2 border-blue-200"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
              <p className="text-gray-600">{tier.description}</p>
            </div>

            <div className="mb-8">
              {totals ? (
                <>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-blue-600">
                      {totals.total}
                    </span>
                    <span className="text-gray-500 text-xl">/ month</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Tax {totals.tax}
                  </p>
                </>
              ) : (
                <p className="text-lg text-gray-500">
                  {error ?? "Loading price…"}
                </p>
              )}
            </div>

            <ul className="space-y-4 mb-8">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
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
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => subscribe(tier)}
              disabled={!ready || !totals}
              className="block w-full text-center bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Subscribe
            </button>
          </div>
        );
      })}
    </div>
  );
}
