import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign In - Tell the Owner",
  description: "Sign in to Tell the Owner to manage your business reviews.",
};

export default function LoginPage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;

    if (!email) {
      return;
    }

    await signIn("email", {
      email,
      redirectTo: "/onboarding",
      redirect: false
    });

    redirect("/login/sent");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Tell the Owner
          </h1>
          <h2 className="text-xl text-gray-600 dark:text-gray-300">
            Sign in with your email
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            We'll send you a magic link to sign in
          </p>
        </div>

        <form action={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="you@example.com"
            />
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              We'll send a magic link to this email address
            </p>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
          >
            Send Magic Link
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                How it works
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs font-bold">
                  1
                </div>
              </div>
              <div className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                Enter your email address
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs font-bold">
                  2
                </div>
              </div>
              <div className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                Check your inbox for a magic link
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs font-bold">
                  3
                </div>
              </div>
              <div className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                Click the link to sign in - no password needed!
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            The magic link will expire in 24 hours. Check your spam folder if you don't see it.
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
          <a 
            href="/" 
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition"
          >
            ← Back to home
          </a>
        </div>
      </div>
    </div>
  );
}