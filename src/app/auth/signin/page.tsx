import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export default function SignInPage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;
    await signIn("email", { email, redirectTo: "/dashboard" });
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
          >
            Send Magic Link
          </button>
        </form>
        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          By signing in, you agree to our terms of service and privacy policy.
        </p>
      </div>
    </div>
  );
}