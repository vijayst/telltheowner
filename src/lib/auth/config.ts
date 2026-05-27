import type { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

const mailgunDomain = process.env.MAILGUN_DOMAIN;
const mailgunApiKey = process.env.MAILGUN_API_KEY;

if (!mailgunDomain || !mailgunApiKey) {
  throw new Error("Missing MAILGUN_DOMAIN or MAILGUN_API_KEY environment variable");
}

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  providers: [
    {
      id: "email",
      type: "email",
      name: "Email",
      from: `Tell the Owner <noreply@${mailgunDomain}>`,
      sendVerificationRequest: async ({ identifier: email, url }: { identifier: string; url: string }) => {
        const formData = new FormData();
        formData.append("from", `Tell the Owner <noreply@${mailgunDomain}>`);
        formData.append("to", email);
        formData.append("subject", "Sign in to Tell the Owner");
        formData.append("template", "magic-link-email");
        formData.append("h:X-Mailgun-Variables", JSON.stringify({ magiclink: url }));

        const response = await fetch(
          `https://api.mailgun.net/v3/${mailgunDomain}/messages`,
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${btoa(`api:${mailgunApiKey}`)}`,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          const error = await response.text();
          throw new Error(`Failed to send email: ${error}`);
        }
      },
    },
  ],
} satisfies NextAuthConfig;