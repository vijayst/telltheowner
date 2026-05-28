import { auth } from "@/auth";

export default async function Navigation() {
  const session = await auth();
  const isAuthenticated = !!session?.user;

  return (
    <nav className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-600">telltheowner</div>
        <div className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-gray-600 hover:text-blue-600 transition">Features</a>
          <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition">How It Works</a>
          <a href="#benefits" className="text-gray-600 hover:text-blue-600 transition">Benefits</a>
          {isAuthenticated ? (
            <a
              href="/api/auth/signout"
              className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition"
            >
              Sign Out
            </a>
          ) : (
            <a href="/login" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
              Sign In
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}