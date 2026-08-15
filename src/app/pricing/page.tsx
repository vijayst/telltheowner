import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Pricing - Tell the Owner",
  description:
    "Simple, transparent pricing for Tell the Owner. Free until December 2026, then pay as you go.",
};

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Simple, Transparent
          <br />
          <span className="text-blue-600">Pricing</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          No hidden fees. No commitments. Just pay for what you use. We're
          completely free until December 2026.
        </p>
      </section>

      {/* Free Period Banner */}
      <section className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white">
              <div className="flex items-center gap-3 mb-2">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <span className="text-3xl font-bold">100% Free</span>
              </div>
              <p className="text-lg text-green-100">
                Use Tell the Owner completely free until December 2026
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-white">
              <p className="text-sm font-medium">Launch Offer</p>
              <p className="text-2xl font-bold">Ends Dec 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Period Card */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-green-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-green-500 text-white px-6 py-2 rounded-bl-2xl font-semibold">
                Current Offer
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Free Period
                </h3>
                <p className="text-gray-600">
                  Perfect time to try Tell the Owner risk-free
                </p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-green-600">$0</span>
                  <span className="text-gray-500 text-xl">until Dec 2026</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">No credit card required</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited voice reviews",
                  "AI-powered transcription",
                  "QR code generation",
                  "Embed widget for websites",
                  "Private review dashboard",
                  "Customer feedback analytics",
                  "No limits on storage",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
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

              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-sm text-green-800 text-center font-medium">
                  ✨ All features included, zero cost
                </p>
              </div>
            </div>

            {/* Pay As You Go Card */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-blue-200">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Pay As You Go
                </h3>
                <p className="text-gray-600">
                  Flexible pricing that scales with your business
                </p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-blue-600">$1</span>
                  <span className="text-gray-500 text-xl">per 10 reviews</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Starting Jan 2027</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-800 text-center font-medium">
                  💡 If you get fewer than 10 reviews in a month, you pay $0
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "Only pay for reviews you receive",
                  "No monthly minimums or commitments",
                  "Automatic billing only when you reach 10 reviews",
                  "All features from free period included",
                  "Premium support included",
                  "Unlimited business locations",
                  "Advanced analytics and insights",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
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

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Example: 25 reviews/month = $2.50/month
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            How Pricing Works
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Simple, transparent, and fair
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Count Your Reviews
              </h3>
              <p className="text-gray-600">
                We count all voice reviews you receive each calendar month
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Calculate Cost
              </h3>
              <p className="text-gray-600">
                Every 10 reviews = $1. Fewer than 10 reviews = $0
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Pay Only When Needed
              </h3>
              <p className="text-gray-600">
                No automatic charges. You're billed only when you reach 10 reviews
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                question: "What happens after December 2026?",
                answer:
                  "Starting January 2027, our pay-as-you-go pricing begins. You'll only be charged $1 for every 10 reviews you receive in a month. If you receive fewer than 10 reviews, there's no charge for that month.",
              },
              {
                question: "Is there a monthly subscription fee?",
                answer:
                  "No! We don't have monthly subscriptions. You pay only for the reviews you actually receive. It's truly pay-as-you-go.",
              },
              {
                question: "What if I get zero reviews in a month?",
                answer:
                  "If your business receives fewer than 10 reviews in a month, you pay $0 for that entire month. We only charge when you reach the 10-review threshold.",
              },
              {
                question: "Do I need to provide payment information now?",
                answer:
                  "Nope! During our free period (until December 2026), you don't need to provide any payment information. We'll let you know when it's time to add payment details.",
              },
              {
                question: "Can I cancel anytime?",
                answer:
                  "Absolutely. Since we don't have subscriptions, there's nothing to cancel. Just stop using the service whenever you want. If you're already in the paid period, you can remove your payment details anytime.",
              },
              {
                question: "What counts as a review?",
                answer:
                  "A review is counted when a customer successfully completes a voice review through your QR code or embed widget. This includes the voice recording and AI transcription.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-200"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">
            Start Free Today
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses gathering honest customer feedback.
            Completely free until December 2026.
          </p>
          <a
            href="/login"
            className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition transform hover:scale-105 shadow-lg inline-block"
          >
            Get Started for Free
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}