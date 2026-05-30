import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Hear What Your Customers<br />
          <span className="text-blue-600">Really Think</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Collect private, honest customer feedback through voice reviews.
          Generate QR codes for your business and let customers speak their mind —
          privately and conveniently.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/login" className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105 shadow-lg">
            Start Free Trial
          </a>
          <a href="#how-it-works" className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition border-2 border-blue-600">
            See How It Works
          </a>
        </div>
        <div className="mt-12 text-gray-500">
          <p>Trusted by 2,500+ businesses worldwide</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-20 bg-white">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Everything You Need to Gather Reviews
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Simple, powerful tools to help you understand your customers
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Voice-to-Text</h3>
            <p className="text-gray-600 leading-relaxed">
              Customers speak their reviews naturally. Our AI transcribes voice into clear, searchable text automatically.
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">QR Code Generation</h3>
            <p className="text-gray-600 leading-relaxed">
              Get a unique QR code for your business. Print it and display it for instant customer access.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Private & Secure</h3>
            <p className="text-gray-600 leading-relaxed">
              Reviews are private — only you can see them. Perfect for genuine feedback without public pressure.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
          How It Works
        </h2>
        <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
          Get started in three simple steps
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold">
              1
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Register Your Business</h3>
            <p className="text-gray-600">
              Sign up and provide basic information about your business to get started.
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold">
              2
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Get Your QR Code</h3>
            <p className="text-gray-600">
              Receive a unique review link and printable QR code for your business location.
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold">
              3
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Collect Reviews</h3>
            <p className="text-gray-600">
              Display the QR code. Customers scan, speak their review, and you get the feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="container mx-auto px-6 py-20 bg-white">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Why Private Reviews Matter
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Give your customers a safe space to share honest feedback
        </p>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Honest Feedback</h3>
              <p className="text-gray-600">Without public pressure, customers share more genuine, detailed reviews.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Voice Convenience</h3>
              <p className="text-gray-600">Speaking is easier than typing. Capture more reviews from busy customers.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Easy to Share</h3>
              <p className="text-gray-600">QR codes make it effortless for customers to leave reviews anywhere.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Actionable Insights</h3>
              <p className="text-gray-600">Text transcripts make it easy to search, analyze, and act on feedback.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Hear What Your Customers Think?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses gathering private, honest feedback from their customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/login" className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition transform hover:scale-105 shadow-lg">
              Start Your Free Trial
            </a>
            <a href="/login" className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition">
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
