export const metadata = {
  title: "About Us - Tell the Owner",
  description: "Learn about telltheowner.com and our mission to help businesses collect honest, private customer feedback.",
};

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-blue-600">TellTheOwner</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          We Believe in the Power of<br />
          <span className="text-blue-600">Honest Feedback</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          telltheowner.com was built with a simple mission: help businesses get the honest, 
          private feedback they need to improve, while giving customers a safe space to share their thoughts.
        </p>
      </section>

      {/* Our Story Section */}
      <section className="container mx-auto px-6 py-16 max-w-4xl">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
        
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <p className="text-gray-600 leading-relaxed mb-4">
            telltheowner.com was born from a simple observation: public reviews don't tell the whole story. 
            When customers leave reviews publicly, they often feel pressured to be overly positive or 
            reluctant to share genuine concerns.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            We realized that what businesses really need is honest, constructive feedback that helps them 
            improve — without the pressure of public scrutiny. And customers want a safe, easy way to 
            share their experiences, both good and bad.
          </p>
          <p className="text-gray-600 leading-relaxed">
            That's why we created telltheowner.com: a platform where customers can speak their mind 
            privately, and businesses can listen, learn, and grow.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Mission</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Amplify Customer Voices</h3>
              <p className="text-gray-600">
                Give customers an easy, private way to share their experiences and feedback.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Drive Business Growth</h3>
              <p className="text-gray-600">
                Help businesses understand their customers and make data-driven improvements.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Build Trust</h3>
              <p className="text-gray-600">
                Foster honest, transparent relationships between businesses and customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We're Different Section */}
      <section className="container mx-auto px-6 py-16 max-w-4xl">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">What Makes Us Different</h2>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Private by Design</h3>
            <p className="text-gray-600">
              Unlike public review platforms, reviews on telltheowner.com are private — only the business 
              owner can see them. This encourages honest, constructive feedback without public pressure.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Voice-First Experience</h3>
            <p className="text-gray-600">
              Speaking is easier and more natural than typing. Our voice-to-text technology makes it effortless 
              for customers to share detailed feedback.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Simple and Accessible</h3>
            <p className="text-gray-600">
              QR codes make it easy for any business to start collecting reviews. No complicated setup, 
              no app download required for customers.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-orange-50 to-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Actionable Insights</h3>
            <p className="text-gray-600">
              Text transcripts make it easy to search, analyze, and act on feedback. Turn customer insights 
              into real improvements.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-blue-400 mb-3">Privacy First</h3>
              <p className="text-gray-300 leading-relaxed">
                We believe privacy is fundamental. Reviews are never made public unless a customer 
                explicitly chooses to share them. We're committed to protecting customer data.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-blue-400 mb-3">Honesty Matters</h3>
              <p className="text-gray-300 leading-relaxed">
                We value honest, constructive feedback. Our platform is designed to capture genuine 
                customer experiences that help businesses improve.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-blue-400 mb-3">Simplicity Rules</h3>
              <p className="text-gray-300 leading-relaxed">
                Great technology should be easy to use. We've built telltheowner.com to be simple 
                for businesses and effortless for customers.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-blue-400 mb-3">Customer Focus</h3>
              <p className="text-gray-300 leading-relaxed">
                Everything we do is with the customer in mind — both the businesses we serve and 
                the customers who share their valuable feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="container mx-auto px-6 py-16 max-w-4xl">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">The Team Behind telltheowner</h2>
        
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <p className="text-gray-600 leading-relaxed mb-4">
            telltheowner.com is built by a passionate team of engineers, designers, and business 
            professionals who share a common belief: honest feedback drives better businesses.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Our team brings together decades of experience in technology, customer service, and 
            business operations. We understand the challenges businesses face and the insights 
            customers want to share.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We're headquartered in the United States and serve businesses worldwide. Every day, 
            we're working to make telltheowner.com better, more accessible, and more valuable 
            for everyone who uses it.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-xl text-blue-100 mb-8">
            Have questions? We'd love to hear from you.
          </p>
          <div className="space-y-4">
            <p className="text-lg">
              <strong>Email:</strong> <a href="mailto:hello@telltheowner.com" className="underline hover:text-blue-200">
                hello@telltheowner.com
              </a>
            </p>
            <p className="text-lg">
              <strong>Website:</strong> <a href="https://telltheowner.com" className="underline hover:text-blue-200">
                https://telltheowner.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Back to Home Button */}
      <div className="container mx-auto px-6 pb-16 text-center">
        <a 
          href="/" 
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Back to Home
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 telltheowner.com. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}