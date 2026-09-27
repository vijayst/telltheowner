import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PricingCheckout } from "@/components/pricing/PricingCheckout";
import { countryCodeFromRequestHeader } from "@/lib/paddle/country";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export const metadata = {
  title: "Pricing - Tell the Owner",
  description:
    "Subscribe to Tell the Owner Pro. Monthly billing, with prices localized to your country.",
};

export default async function Pricing() {
  const headerStore = await headers();
  const countryCode = countryCodeFromRequestHeader(
    headerStore.get("x-vercel-ip-country")
  );
  const session = await auth();
  const email = session?.user?.email || undefined;
  const businessUser = session?.user?.id
    ? await prisma.businessUser.findFirst({
        where: { userId: session.user.id, role: "owner" },
        select: { businessId: true },
      })
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />

      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Simple, Transparent
          <br />
          <span className="text-blue-600">Pricing</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Pro is billed monthly. The price below is localized for your country.
          Your first month is free.
        </p>
      </section>

      <section className="container mx-auto px-6 pb-20">
        <PricingCheckout
          countryCode={countryCode}
          email={email}
          clientId={businessUser?.businessId}
        />
      </section>

      <section className="container mx-auto px-6 py-20 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                question: "How is the price shown?",
                answer:
                  "The total is the localized price Paddle returns for your country, including tax. Monthly billing is the only option.",
              },
              {
                question: "Is the first month free?",
                answer:
                  "Yes. Your first month of Pro is free. After that, the subscription continues at the monthly price shown above.",
              },
              {
                question: "Can I cancel anytime?",
                answer:
                  "Yes. There is no contract. Cancel whenever you want and billing stops.",
              },
            ].map((faq) => (
              <div
                key={faq.question}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-200"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
