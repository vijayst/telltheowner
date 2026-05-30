export const metadata = {
  title: "Privacy Policy - Tell the Owner",
  description: "Read our privacy policy to understand how we protect your data and privacy.",
};

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-blue-600">telltheowner</a>
        </div>
      </nav>

      {/* Privacy Policy Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Last updated: May 24, 2026
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
          <p className="text-gray-600 leading-relaxed">
            telltheowner.com (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, and safeguard your information when you use our service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">For Business Owners</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
            <li>Business name, address, and contact information</li>
            <li>Email address and password</li>
            <li>Payment information (processed securely by third-party payment processors)</li>
            <li>QR code and review link identifiers</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">For Customers Leaving Reviews</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
            <li>Voice recordings of reviews</li>
            <li>Transcribed text of voice reviews</li>
            <li>Review submission timestamp</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Provide and maintain our review collection service</li>
            <li>Transcribe voice reviews to text using our speech recognition technology</li>
            <li>Enable business owners to view and analyze their private reviews</li>
            <li>Generate and manage QR codes for businesses</li>
            <li>Send important account notifications and updates</li>
            <li>Improve our services and develop new features</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Storage and Security</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We implement appropriate technical and organizational measures to protect your information:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Voice recordings will be deleted after successful transcription</li>
            <li>Review transcriptions are stored securely and accessible only to the business owner</li>
            <li>Reviews are private and not publicly accessible</li>
            <li>We regularly review and update our security protocols</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Private Reviews</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            All reviews collected through telltheowner.com are private. This means:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Reviews are visible only to the registered business owner</li>
            <li>Reviews are not shared with third parties</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Voice Recording Transcription</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            When customers leave voice reviews:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Voice recordings are processed by our speech recognition service</li>
            <li>Transcriptions are generated automatically and stored with the review</li>
            <li>Voice recordings are deleted after successful transcription</li>
            <li>We do not sell or share voice data with third parties</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Reviews are retained for the duration of the business owner's active subscription</li>
            <li>Voice recordings are deleted after transcription unless required for troubleshooting</li>
            <li>Account data is retained for legal and compliance purposes as required</li>
            <li>Users may request deletion of their data at any time (subject to legal obligations)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We may use third-party services to operate our platform, including:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Payment processors for subscription billing</li>
            <li>Cloud storage and hosting providers</li>
            <li>Speech recognition and AI services</li>
            <li>Analytics tools to improve our service</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-4">
            These third parties have access to your information only to perform services on our behalf 
            and are obligated to protect your information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            You have the right to:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Access and review your personal information</li>
            <li>Request deletion of your account and associated data</li>
            <li>Export your data</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-4">
            To exercise these rights, please contact us at privacy@telltheowner.com
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
          <p className="text-gray-600 leading-relaxed">
            Our service is not intended for children under the age of 13. We do not knowingly 
            collect personal information from children. If you become aware that a child has 
            provided us with personal information, please contact us immediately.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
          <p className="text-gray-600 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any 
            material changes by posting the new policy on our website and updating the &quot;Last updated&quot; date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> legal@telltheowner.com
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Website:</strong> https://telltheowner.com
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> telltheowner.com
            </p>
          </div>
        </section>

        {/* Back to Home Button */}
        <div className="mt-12">
          <a 
            href="/" 
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Back to Home
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="container mx-auto px-6">
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 telltheowner.com. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}