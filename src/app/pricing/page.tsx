import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Pricing - Tell the Owner",
  description:
    "Tell the Owner is a flat $10 a month. Your first month is free.",
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
          One flat price. Unlimited reviews. Your first month is free.
        </p>
      </section>

      {/* First Month Free Banner */}
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
                <span className="text-3xl font-bold">First Month Free</span>
              </div>
              <p className="text-lg text-green-100">
                Try Tell the Owner with every feature included
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-white text-center">
              <p className="text-sm font-medium">Then</p>
              <p className="text-2xl font-bold">$10/month</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-blue-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-green-500 text-white px-6 py-2 rounded-bl-2xl font-semibold">
              First month free
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Tell the Owner
              </h3>
              <p className="text-gray-600">
                Unlimited voice reviews for one flat monthly price
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-blue-600">$10</span>
                <span className="text-gray-500 text-xl">/ month</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                After your free first month
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "Unlimited voice reviews",
                "AI-powered transcription",
                "QR code generation",
                "Embed widget for websites",
                "Private review dashboard",
                "No per-review or usage charges",
                "Cancel anytime",
              ].map((feature) => (
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

            <a
              href="/login"
              className="block w-full text-center bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition"
            >
              Start your free month
            </a>
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
            One price, no usage meters
          </p>

          <div className="grid md:grid-cols-3 gap-8">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Start Free
              </h3>
              <p className="text-gray-600">
                Your first month is free, with every feature included
              </p>
            </div>

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
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Flat $10 a Month
              </h3>
              <p className="text-gray-600">
                After that, it&apos;s $10 a month no matter how many reviews you get
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
                Cancel Anytime
              </h3>
              <p className="text-gray-600">
                No contracts. Stop whenever you want and you won&apos;t be billed again
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
                question: "How much does Tell the Owner cost?",
                answer:
                  "It's a flat $10 a month. There are no per-review charges and no usage tiers. Your first month is free.",
              },
              {
                question: "Is the first month really free?",
                answer:
                  "Yes. You get a full month of Tell the Owner at no charge. After that, the plan is $10 a month.",
              },
              {
                question: "What if I get a lot of reviews?",
                answer:
                  "The price stays $10 a month. Unlimited voice reviews are included, so a busy month costs the same as a quiet one.",
              },
              {
                question: "Can I cancel anytime?",
                answer:
                  "Yes. There is no contract. Cancel whenever you want and billing stops.",
              },
              {
                question: "What counts as a review?",
                answer:
                  "A review is counted when a customer successfully completes a voice review through your QR code or embed widget. This includes the voice recording and AI transcription. Reviews are unlimited on the $10 plan.",
              },
            ].map((faq) => (
              <div
                key={faq.question}
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
            Start Your Free Month
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Then $10 a month for unlimited reviews. No usage charges.
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
