import Footer from "@/components/Footer";

export const metadata = {
  title: "Refund Policy - Tell the Owner",
  description:
    "Request a full refund within 14 days of a subscription charge. After that, your plan stays active until the subscription end date.",
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
            Who we are
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Tell the Owner is operated by SoloPivot Labs Inc. Subscription
            payments are processed by Paddle, our merchant of record.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            14-day refund window
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            You can request a full refund within 14 days of the date a
            subscription payment is charged. The 14 days are counted from that
            charge date.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            The first month of Pro is free. That free period has no charge to
            refund. When the first paid charge is made, a new 14-day refund
            window starts on that charge date.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Email legal@telltheowner.com within those 14 days and we will
            submit the refund through Paddle. An approved refund is returned to
            the original payment method.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            After 14 days
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            A refund request sent more than 14 days after the charge date is
            outside the refund window.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            You can still cancel at any time from the billing portal.
            Cancellation stops the next renewal. Your plan stays active through
            the subscription end date, which is the end of the period already
            paid. On that date the plan ends, and you will not be charged again
            unless you subscribe again.
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
