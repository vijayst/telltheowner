import Footer from "@/components/Footer";

export const metadata = {
  title: "Refund Policy - Tell the Owner",
  description:
    "Subscriptions are not refundable. Your plan stays active until the subscription end date.",
};

export default function Refunds() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-blue-600">
            TellTheOwner
          </a>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Refund Policy</h1>

        <p className="text-gray-600 mb-8 leading-relaxed">
          Last updated: September 29, 2026
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            No refunds
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Tell the Owner does not process refunds for a subscription that has
            already been purchased. A payment for a billing period is final.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            When your plan ends
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            You can cancel at any time from the billing portal. Cancellation
            stops the next renewal. It does not end the plan immediately and it
            does not return the amount already paid.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Your plan stays active through the subscription end date, which is
            the end of the period you already purchased. On that date the plan
            ends, and you will not be charged again unless you subscribe again.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Questions
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            If you need the subscription end date for your account, open Manage
            billing in your dashboard or contact us:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> legal@telltheowner.com
            </p>
            <p className="text-gray-700">
              <strong>Website:</strong> https://telltheowner.com
            </p>
          </div>
        </section>

        <div className="mt-12">
          <a
            href="/"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Back to Home
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
