export function ReviewPageHeader() {
  return (
    <nav className="container mx-auto px-6 py-6">
      <div className="flex items-center justify-center max-w-2xl mx-auto">
        <a href="/" className="flex items-center gap-3 group">
          <img
            src="/icons/icon-96x96.png"
            alt="TellTheOwner Logo"
            className="w-12 h-12 rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
          />
          <span className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            TellTheOwner
          </span>
        </a>
      </div>
    </nav>
  );
}
