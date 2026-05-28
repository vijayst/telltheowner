import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DashboardQRCode } from "@/components/DashboardQRCode";
import { CopyUrlButton } from "@/components/CopyUrlButton";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Get user's business information
  let business = null;
  try {
    business = await prisma.business.findFirst();
  } catch (error) {
    console.error("Error fetching business:", error);
  }

  // If user hasn't completed onboarding, redirect to onboarding
  if (!business) {
    redirect("/onboarding");
  }

  const reviewUrl = `https://telltheowner.com/b/${business.clientId}/review`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back!
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {session.user.email}
              </p>
            </div>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Sign Out
              </button>
            </form>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Business Information
            </h2>

            <div className="space-y-6">
              {/* Business Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Business Name
                </label>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-gray-900 dark:text-white">{business.businessName}</p>
                </div>
              </div>

              {/* Business Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Business Address
                </label>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-gray-900 dark:text-white">{business.businessAddress}</p>
                </div>
              </div>

              {/* Client ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Client ID
                </label>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-gray-900 dark:text-white font-mono">{business.clientId}</p>
                </div>
              </div>

              {/* Review URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Review URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={reviewUrl}
                    className="flex-1 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                  <CopyUrlButton url={reviewUrl} />
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Share this URL with your customers to collect reviews
                </p>
              </div>

              {/* QR Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  QR Code
                </label>
                <DashboardQRCode reviewUrl={reviewUrl} />
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
                  Customers can scan this code to leave a review
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}