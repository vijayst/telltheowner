import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Welcome - Tell the Owner",
  description: "Your Tell the Owner Pro subscription is active.",
};

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />

      <section className="container mx-auto px-6 py-20">
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-10 shadow-xl text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            You&apos;re subscribed
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Pro is active on your account. You can set up your business and
            start collecting voice reviews.
          </p>
          <a
            href="/dashboard"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition"
          >
            Go to your dashboard
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
