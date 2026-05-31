export const metadata = {
  title: "Terms of Service - Tell the Owner",
  description: "Read our terms of service to understand your rights and responsibilities when using telltheowner.com.",
};

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-blue-600">TellTheOwner</a>
        </div>
      </nav>

      {/* Terms of Service Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Last updated: May 24, 2026
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-600 leading-relaxed">
            By accessing or using telltheowner.com (&quot;Service&quot;), you agree to be bound by these 
            Terms of Service (&quot;Terms&quot;) and all applicable laws and regulations. If you do not agree 
            with any of these terms, you are prohibited from using the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            telltheowner.com is a platform that enables businesses to collect private customer feedback 
            through voice reviews. Our service includes:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Business registration and account management</li>
            <li>Generation of unique review links and QR codes</li>
            <li>Voice recording and transcription for customer reviews</li>
            <li>Private review storage and access for business owners</li>
            <li>Review management and analysis tools</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Business Owner Accounts</h2>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Account Registration</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            To use our Service as a business owner, you must:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
            <li>Be at least 18 years old</li>
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain and update your account information</li>
            <li>Accept responsibility for all activities under your account</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Account Security</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            You are responsible for maintaining the confidentiality of your account credentials. 
            You agree to notify us immediately of any unauthorized use of your account.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">3.3 Account Termination</h3>
          <p className="text-gray-600 leading-relaxed">
            We reserve the right to terminate or suspend your account at any time for violations 
            of these Terms or for any other reason at our sole discretion.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Subscription and Payment</h2>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Subscription Plans</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            We offer various subscription plans with different features and pricing. You agree to pay 
            all fees associated with your chosen subscription plan.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Payment Terms</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Payments are processed through third-party payment processors. By subscribing, you authorize 
            us to charge your payment method for the subscription fees.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">4.3 Refunds</h3>
          <p className="text-gray-600 leading-relaxed">
            Refunds are processed in accordance with our refund policy. Please contact our support team 
            for refund requests.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Private Reviews</h2>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 Review Privacy</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            All reviews collected through telltheowner.com are private. As a business owner, you agree that:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
            <li>Reviews are for your internal use only</li>
            <li>Reviews will not be published publicly through our platform</li>
            <li>You will not share reviews publicly without explicit customer consent</li>
            <li>Reviews remain private even after account termination</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 Voice Recordings</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            When customers submit voice reviews:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
            <li>Voice recordings are transcribed to text automatically</li>
            <li>Original voice recordings may be deleted after successful transcription</li>
            <li>Transcriptions are stored securely and accessible only to the business owner</li>
            <li>We do not share review content with third parties</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">5.3 Review Ownership</h3>
          <p className="text-gray-600 leading-relaxed">
            Business owners have access to reviews submitted to their business during their active 
            subscription period. Reviews are not transferable or sellable.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. QR Codes and Review Links</h2>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 QR Code Usage</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            QR codes and review links provided by telltheowner.com:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
            <li>Are for the exclusive use of the registered business</li>
            <li>Must not be shared with other businesses</li>
            <li>Are valid only during active subscription periods</li>
            <li>May be deactivated if terms are violated</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">6.2 Review Link Distribution</h3>
          <p className="text-gray-600 leading-relaxed">
            Business owners may distribute review links and display QR codes at their business locations. 
            You agree not to distribute links in a misleading or deceptive manner.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Acceptable Use Policy</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            You agree not to use the Service to:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Submit fraudulent or fake reviews</li>
            <li>Harass, abuse, or harm customers or other users</li>
            <li>Collect reviews for businesses you don't own or represent</li>
            <li>Violate any applicable laws or regulations</li>
            <li>Attempt to compromise the security of the Service</li>
            <li>Use automated tools to artificially increase review counts</li>
            <li>Reverse engineer or attempt to derive source code</li>
            <li>Use the Service for any unlawful purpose</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Intellectual Property</h2>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">8.1 Our Rights</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            telltheowner.com and all related content, features, and functionality are owned by 
            telltheowner.com and are protected by copyright, trademark, and other intellectual property laws.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">8.2 Your Rights</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            You retain ownership of:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Your business information and data</li>
            <li>Reviews submitted to your business</li>
            <li>Any custom content you provide</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-4">
            By submitting content, you grant us a license to use, display, and process it to provide the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            To the fullest extent permitted by law:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>telltheowner.com shall not be liable for any indirect, incidental, special, or consequential damages</li>
            <li>Our total liability is limited to the fees paid by you in the past 12 months</li>
            <li>We are not responsible for any loss of data, reviews, or other content</li>
            <li>We do not guarantee uninterrupted or error-free service</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Indemnification</h2>
          <p className="text-gray-600 leading-relaxed">
            You agree to indemnify and hold harmless telltheowner.com, its affiliates, and their respective 
            officers, directors, employees, and agents from any claims, damages, or expenses arising from 
            your use of the Service or violation of these Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Termination</h2>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">11.1 By You</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            You may terminate your account at any time by:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
            <li>Contacting customer support</li>
            <li>Using the account cancellation feature in your dashboard</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">11.2 By Us</h3>
          <p className="text-gray-600 leading-relaxed">
            We may terminate your account immediately for violations of these Terms, fraudulent activity, 
            or at our sole discretion with or without notice.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Dispute Resolution</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Any disputes arising from these Terms shall be resolved through:
          </p>
          <ol className="list-decimal list-inside text-gray-600 space-y-2">
            <li>Good faith negotiations between the parties</li>
            <li>If unresolved, through binding arbitration in accordance with applicable laws</li>
            <li>Arbitration shall be conducted in English and all decisions shall be final and binding</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Governing Law</h2>
          <p className="text-gray-600 leading-relaxed">
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction 
            in which telltheowner.com is established, without regard to conflict of law provisions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Changes to Terms</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We reserve the right to modify these Terms at any time. We will notify you of material changes by:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Posting the updated Terms on our website</li>
            <li>Sending an email notification to registered users</li>
            <li>Updating the &quot;Last updated&quot; date</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-4">
            Your continued use of the Service after changes constitutes acceptance of the new Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Severability</h2>
          <p className="text-gray-600 leading-relaxed">
            If any provision of these Terms is found to be unenforceable, the remaining provisions shall 
            remain in full force and effect.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Contact Information</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            If you have any questions about these Terms, please contact us:
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