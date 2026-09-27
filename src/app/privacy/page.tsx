import Footer from "@/components/Footer";
import { CookieSettingsButton } from "@/components/CookieConsent";

export const metadata = {
  title: "Privacy Policy - Tell the Owner",
  description: "Read our privacy policy to understand how we protect your data and privacy."
};

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-blue-600">TellTheOwner</a>
        </div>
      </nav>

      {/* Privacy Policy Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Last updated: September 26, 2026
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
            <li>A browser identifier, stored on the device and with the review, so the same browser cannot submit repeat reviews for one business</li>
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

        <section id="cookies" className="mb-8 scroll-mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and similar technologies</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We use cookies and local storage to run the service. Analytics cookies are optional and are not set until you allow them.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Necessary</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
            <li>
              <strong>Sign-in session</strong> (<code>authjs.session-token</code>, or <code>__Secure-authjs.session-token</code> on HTTPS). Keeps you signed in. Lasts up to 30 days.
            </li>
            <li>
              <strong>Sign-in flow</strong> (<code>authjs.csrf-token</code> and <code>authjs.callback-url</code>). Used only while you sign in with a magic link.
            </li>
            <li>
              <strong>Review limit</strong> (<code>review_submitted_&#123;business id&#125;</code>). Remembers that this browser already left a review for that business. Lasts 1 day.
            </li>
            <li>
              <strong>Browser identifier</strong> (<code>telltheowner_fingerprint</code> in local storage). Created when you leave a review and sent with that review. Stays on the device until you clear site data.
            </li>
            <li>
              <strong>Cookie choice</strong> (<code>tto_consent</code>). Remembers whether you allowed analytics. Lasts 6 months.
            </li>
            <li>
              <strong>Paddle</strong>. While checkout is open, Paddle may set cookies on its own domain to take payment. Those cookies are required to complete a subscription.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Optional analytics</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
            <li>
              <strong>Google Analytics</strong> (<code>_ga</code> and <code>_ga_EGRF1EZ2YE</code>). Measures how the site is used. Set only after you choose Allow analytics. Google keeps them for up to 2 years.
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">
            You can change this choice at any time from Cookie settings in the site footer, or from the button below.
          </p>
          <CookieSettingsButton className="mt-4 inline-block bg-white text-blue-600 px-5 py-2.5 rounded-full font-medium border border-blue-600 hover:bg-blue-50 transition">
            Update cookie choice
          </CookieSettingsButton>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We may use third-party services to operate our platform, including:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Paddle, for subscription billing</li>
            <li>Cloud storage and hosting providers</li>
            <li>Speech recognition and AI services</li>
            <li>Google Analytics, only after you allow analytics cookies</li>
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

      <Footer />
    </div>
  );
}