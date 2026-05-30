export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold text-blue-500 mb-2">telltheowner</div>
            <p className="text-sm text-gray-400">
              Collect private, honest customer feedback through voice reviews.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <div>
              <h3 className="font-semibold text-white mb-3">Product Demo</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/product/review-demo" className="hover:text-blue-500 transition">
                    Leave a review
                  </a>
                </li>
                <li>
                  <a href="/product/review-wall-demo" className="hover:text-blue-500 transition">
                    Review wall
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/about" className="hover:text-blue-500 transition">
                    About
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/privacy" className="hover:text-blue-500 transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-blue-500 transition">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Tell the Owner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}