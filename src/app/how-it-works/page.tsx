import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata = {
  title: "How It Works - Tell the Owner",
  description: "Learn how Tell the Owner helps businesses collect private, honest customer feedback through voice reviews and QR codes. Discover use cases and target customers.",
};

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          How <span className="text-blue-600">Tell the Owner</span> Works
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          A simple, powerful way to collect private, honest customer feedback through voice reviews. 
          Generate QR codes for your business and let customers speak their mind — privately and conveniently.
        </p>
      </section>

      {/* Main Process Section */}
      <section className="container mx-auto px-6 py-16 bg-white rounded-3xl shadow-xl max-w-6xl mb-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Get Started in Three Simple Steps
        </h2>
        <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
          From signup to collecting your first review in minutes
        </p>
        
        <div className="grid md:grid-cols-3 gap-12">
          {/* Step 1 */}
          <div className="text-center relative">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold shadow-lg">
              1
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Register Your Business</h3>
            <p className="text-gray-600 mb-4">
              Sign up for your free trial and provide basic information about your business. 
              No credit card required to get started.
            </p>
            <div className="bg-blue-50 rounded-lg p-4 text-sm text-gray-700">
              <strong>What you'll need:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Business name</li>
                <li>Business address</li>
                <li>Contact email</li>
              </ul>
            </div>
          </div>

          {/* Step 2 */}
          <div className="text-center relative">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold shadow-lg">
              2
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Your QR Code</h3>
            <p className="text-gray-600 mb-4">
              Instantly receive a unique review link and printable QR code for your business location. 
              Download it in high resolution for printing.
            </p>
            <div className="bg-green-50 rounded-lg p-4 text-sm text-gray-700">
              <strong>Display options:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Counter stands</li>
                <li>Receipts & bills</li>
                <li>Table tents</li>
                <li>Window decals</li>
              </ul>
            </div>
          </div>

          {/* Step 3 */}
          <div className="text-center relative">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold shadow-lg">
              3
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Collect Reviews</h3>
            <p className="text-gray-600 mb-4">
              Display your QR code prominently. Customers scan it, speak their review naturally, 
              and you receive both voice recordings and text transcripts.
            </p>
            <div className="bg-purple-50 rounded-lg p-4 text-sm text-gray-700">
              <strong>Customer experience:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Scan QR code with phone</li>
                <li>Tap record and speak</li>
                <li>Submit review instantly</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Process Flow */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">The Complete Flow</h3>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl">
              <div className="text-4xl mb-3">📱</div>
              <h4 className="font-bold text-gray-900 mb-2">Customer Scans</h4>
              <p className="text-sm text-gray-600">Quick scan with any smartphone camera</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl">
              <div className="text-4xl mb-3">🎤</div>
              <h4 className="font-bold text-gray-900 mb-2">Customer Speaks</h4>
              <p className="text-sm text-gray-600">Natural voice feedback in their own words</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl">
              <div className="text-4xl mb-3">✨</div>
              <h4 className="font-bold text-gray-900 mb-2">AI Transcribes</h4>
              <p className="text-sm text-gray-600">Voice converted to searchable text</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl">
              <div className="text-4xl mb-3">📊</div>
              <h4 className="font-bold text-gray-900 mb-2">You Review</h4>
              <p className="text-sm text-gray-600">Access dashboard to read and analyze</p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Customers Section */}
      <section className="container mx-auto px-6 py-16 max-w-6xl">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Perfect For Your Business
        </h2>
        <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
          Tell the Owner works for any business that values customer feedback
        </p>

        {/* Physical Businesses */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-3">🏪</span>
            Physical Location Businesses
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h4 className="font-bold text-gray-900 mb-2">Restaurants & Cafes</h4>
              <p className="text-gray-600 text-sm">
                Gather feedback on food quality, service, and ambiance directly from diners
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h4 className="font-bold text-gray-900 mb-2">Retail Stores</h4>
              <p className="text-gray-600 text-sm">
                Understand customer shopping experiences, product selection, and staff helpfulness
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h4 className="font-bold text-gray-900 mb-2">Salons & Spas</h4>
              <p className="text-gray-600 text-sm">
                Collect detailed feedback on services, stylists, and overall customer satisfaction
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h4 className="font-bold text-gray-900 mb-2">Medical Practices</h4>
              <p className="text-gray-600 text-sm">
                Gather patient feedback on care quality, wait times, and staff professionalism
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h4 className="font-bold text-gray-900 mb-2">Auto Services</h4>
              <p className="text-gray-600 text-sm">
                Get feedback on repair quality, pricing transparency, and customer service
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h4 className="font-bold text-gray-900 mb-2">Hotels & Lodging</h4>
              <p className="text-gray-600 text-sm">
                Collect guest feedback on rooms, amenities, cleanliness, and overall experience
              </p>
            </div>
          </div>
        </div>

        {/* Service Businesses */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <span className="bg-green-100 text-green-600 px-4 py-2 rounded-lg mr-3">🛠️</span>
            Service-Based Businesses
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h4 className="font-bold text-gray-900 mb-2">Home Services</h4>
              <p className="text-gray-600 text-sm">
                Plumbers, electricians, HVAC technicians can collect post-service feedback
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h4 className="font-bold text-gray-900 mb-2">Professional Services</h4>
              <p className="text-gray-600 text-sm">
                Lawyers, accountants, consultants can understand client satisfaction privately
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h4 className="font-bold text-gray-900 mb-2">Fitness Centers</h4>
              <p className="text-gray-600 text-sm">
                Gather member feedback on equipment, classes, cleanliness, and staff
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h4 className="font-bold text-gray-900 mb-2">Event Venues</h4>
              <p className="text-gray-600 text-sm">
                Collect feedback from event organizers and attendees on venue experience
              </p>
            </div>
          </div>
        </div>

        {/* Online Businesses */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <span className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg mr-3">💻</span>
            Online & E-commerce Businesses
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h4 className="font-bold text-gray-900 mb-2">E-commerce Stores</h4>
              <p className="text-gray-600 text-sm">
                Include QR codes in packaging to collect post-purchase feedback on products
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h4 className="font-bold text-gray-900 mb-2">Online Courses</h4>
              <p className="text-gray-600 text-sm">
                Gather student feedback on course content, instructor quality, and learning outcomes
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h4 className="font-bold text-gray-900 mb-2">SaaS Companies</h4>
              <p className="text-gray-600 text-sm">
                Collect user feedback on features, onboarding experience, and customer support
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h4 className="font-bold text-gray-900 mb-2">Digital Products</h4>
              <p className="text-gray-600 text-sm">
                Get feedback on ebooks, templates, software, or other digital offerings
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h4 className="font-bold text-gray-900 mb-2">Subscription Services</h4>
              <p className="text-gray-600 text-sm">
                Understand subscriber satisfaction and reasons for cancellations privately
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h4 className="font-bold text-gray-900 mb-2">Online Coaches</h4>
              <p className="text-gray-600 text-sm">
                Collect client feedback on coaching sessions, programs, and results achieved
              </p>
            </div>
          </div>
        </div>

        {/* Multi-location Businesses */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-lg mr-3">🏢</span>
            Multi-Location Businesses
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h4 className="font-bold text-gray-900 mb-2">Franchise Networks</h4>
              <p className="text-gray-600 text-sm">
                Compare customer feedback across all franchise locations to identify best practices
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h4 className="font-bold text-gray-900 mb-2">Chain Restaurants</h4>
              <p className="text-gray-600 text-sm">
                Monitor consistency in food quality and service across all restaurant locations
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h4 className="font-bold text-gray-900 mb-2">Retail Chains</h4>
              <p className="text-gray-600 text-sm">
                Track customer experience metrics and identify locations that need improvement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Real-World Use Cases
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            How businesses like yours are using Tell the Owner to improve
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Use Case 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">🍽️</span>
                <h3 className="text-xl font-bold text-gray-900">New Restaurant Launch</h3>
              </div>
              <p className="text-gray-600 mb-4">
                <strong>Challenge:</strong> A new restaurant wanted to understand customer reactions to their menu and service during their first month.
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Solution:</strong> Placed QR codes on tables and receipts. Customers could leave quick voice reviews immediately after dining.
              </p>
              <p className="text-gray-600">
                <strong>Result:</strong> Collected 150+ reviews in the first month, identified 3 menu items that needed improvement, and adjusted service times based on feedback.
              </p>
            </div>

            {/* Use Case 2 */}
            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">🛒</span>
                <h3 className="text-xl font-bold text-gray-900">E-commerce Product Feedback</h3>
              </div>
              <p className="text-gray-600 mb-4">
                <strong>Challenge:</strong> An online store wanted detailed feedback on their new product line without burdening customers with long surveys.
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Solution:</strong> Included QR code cards in product packaging with a simple message: "Tell us what you think."
              </p>
              <p className="text-gray-600">
                <strong>Result:</strong> Received 200+ voice reviews, discovered customers loved the product quality but suggested packaging improvements. Implemented changes that reduced returns by 15%.
              </p>
            </div>

            {/* Use Case 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">💇</span>
                <h3 className="text-xl font-bold text-gray-900">Salon Service Quality</h3>
              </div>
              <p className="text-gray-600 mb-4">
                <strong>Challenge:</strong> A salon chain wanted to monitor stylist performance and customer satisfaction across 5 locations.
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Solution:</strong> Created unique QR codes for each stylist. Customers could leave feedback specific to their service provider.
              </p>
              <p className="text-gray-600">
                <strong>Result:</strong> Identified top-performing stylists, provided targeted training for others, and overall customer satisfaction increased by 25%.
              </p>
            </div>

            {/* Use Case 4 */}
            <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">🏥</span>
                <h3 className="text-xl font-bold text-gray-900">Medical Practice Improvement</h3>
              </div>
              <p className="text-gray-600 mb-4">
                <strong>Challenge:</strong> A dental practice wanted to improve patient experience but found written surveys had low response rates.
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Solution:</strong> Placed QR codes in waiting areas and on appointment reminder cards. Patients could leave anonymous voice feedback.
              </p>
              <p className="text-gray-600">
                <strong>Result:</strong> Response rate increased by 300%, identified wait time as a top concern, and implemented a new scheduling system that reduced average wait by 40%.
              </p>
            </div>

            {/* Use Case 5 */}
            <div className="bg-gradient-to-br from-pink-50 to-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">📚</span>
                <h3 className="text-xl font-bold text-gray-900">Online Course Development</h3>
              </div>
              <p className="text-gray-600 mb-4">
                <strong>Challenge:</strong> An online educator wanted detailed feedback on course modules but found written reviews too brief.
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Solution:</strong> Added QR codes to the end of each course module. Students could leave detailed voice feedback on what they learned.
              </p>
              <p className="text-gray-600">
                <strong>Result:</strong> Collected rich, detailed feedback that helped restructure 3 course modules. Student completion rates increased by 20%.
              </p>
            </div>

            {/* Use Case 6 */}
            <div className="bg-gradient-to-br from-teal-50 to-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">🔧</span>
                <h3 className="text-xl font-bold text-gray-900">Home Service Quality Control</h3>
              </div>
              <p className="text-gray-600 mb-4">
                <strong>Challenge:</strong> A home services company with 20 technicians needed to ensure consistent service quality.
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Solution:</strong> Each technician carried business cards with QR codes. Customers could leave feedback immediately after service.
              </p>
              <p className="text-gray-600">
                <strong>Result:</strong> Identified 3 technicians needing additional training, improved overall customer satisfaction score from 4.2 to 4.7 stars.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-6 py-16 max-w-6xl">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Why Choose Tell the Owner?
        </h2>
        <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
          The advantages of private voice reviews
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Honest, Unfiltered Feedback</h3>
              <p className="text-gray-600">
                Without public pressure, customers share genuine concerns and suggestions they'd never post publicly. Get the real story.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">More Detailed Reviews</h3>
              <p className="text-gray-600">
                Speaking is 3x faster than typing. Customers share more detail, nuance, and context when they can talk naturally.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Higher Response Rates</h3>
              <p className="text-gray-600">
                QR codes are convenient and voice is easy. Businesses see 5-10x higher response rates compared to traditional surveys.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Searchable & Analyzable</h3>
              <p className="text-gray-600">
                AI-powered transcription converts voice to text. Search, filter, and analyze feedback to identify patterns and trends.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Private & Secure</h3>
              <p className="text-gray-600">
                Reviews are visible only to you. Protect your reputation while gathering valuable insights. Perfect for internal improvement.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Implementation</h3>
              <p className="text-gray-600">
                Get started in minutes. No complicated setup, no app for customers to download. Just print your QR code and start collecting feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Collecting Honest Feedback?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses using Tell the Owner to understand their customers better.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/login" className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition transform hover:scale-105 shadow-lg inline-block">
              Start Your Free Trial
            </a>
            <a href="/product/review-demo" className="bg-transparent text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition border-2 border-white inline-block">
              See How It Works
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}