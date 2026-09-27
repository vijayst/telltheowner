import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { subscriptionGrantsAccess } from "@/lib/paddle/access";
import { createBillingPortalUrl } from "@/lib/paddle/portal";
import { countryCodeFromRequestHeader } from "@/lib/paddle/country";
import { PricingCheckout } from "@/components/pricing/PricingCheckout";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function openBillingPortal() {
  "use server";

  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const url = await createBillingPortalUrl(session.user.id);
  redirect(url);
}

export default async function BillingPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const businessUser = await prisma.businessUser.findFirst({
    where: { userId: session.user.id },
    include: {
      business: {
        include: {
          subscriptions: {
            orderBy: { updatedAt: "desc" },
          },
        },
      },
    },
  });

  const headerStore = await headers();
  const countryCode = countryCodeFromRequestHeader(
    headerStore.get("x-vercel-ip-country")
  );
  const business = businessUser?.business;
  const subscriptions = business?.subscriptions ?? [];
  const hasAccess = subscriptions.some((subscription) =>
    subscriptionGrantsAccess(subscription.status)
  );
  const subscribeButton = !hasAccess ? (
    <PricingCheckout
      checkout
      variant="button"
      countryCode={countryCode}
      email={session.user.email || undefined}
      clientId={business?.clientId}
    />
  ) : null;

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Billing</h2>
      <p className="text-gray-600 mb-8">
        {hasAccess
          ? "Update your payment method, cancel, or view invoices in the Paddle customer portal."
          : "Subscribe to Pro to collect voice reviews."}
      </p>

      {!hasAccess ? (
        <p className="text-sm text-gray-600 mb-6 -mt-4">
          If you subscribed recently, your plan may take a moment to appear.
          Refresh this page once processing is complete.
        </p>
      ) : null}

      {subscriptions.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-700 mb-4">No subscription yet.</p>
          {subscribeButton}
        </div>
      ) : (
        <div className="space-y-4">
          {subscriptions.map((subscription) => (
            <div
              key={subscription.subscriptionId}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <p className="text-sm text-gray-500">Status</p>
              <p className="text-lg font-semibold text-gray-900 capitalize">
                {subscription.status}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {subscriptionGrantsAccess(subscription.status)
                  ? "This subscription includes Pro."
                  : "This subscription does not include Pro."}
              </p>
              {subscription.scheduledChangeAction ? (
                <p className="text-sm text-gray-600 mt-2">
                  Scheduled to {subscription.scheduledChangeAction}
                  {subscription.scheduledChangeAt
                    ? ` on ${subscription.scheduledChangeAt.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}`
                    : ""}
                  . Access stays in place until the status changes.
                </p>
              ) : null}
            </div>
          ))}

          {hasAccess && business?.paddleCustomerId ? (
            <form action={openBillingPortal}>
              <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Manage billing
              </button>
            </form>
          ) : null}
          {subscribeButton}
        </div>
      )}
    </div>
  );
}
