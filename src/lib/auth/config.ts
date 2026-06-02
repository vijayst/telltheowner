import type { NextAuthConfig } from "next-auth";
import { prisma } from "@/lib/prisma";

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  throw new Error("Missing RESEND_API_KEY environment variable");
}

export const authConfig = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user, account, trigger }) {
      // Initial sign in - store user ID from user object
      if (user) {
        token.id = user.id;
        token.email = user.email;
        console.log("JWT callback - storing user data:", { id: user.id, email: user.email });
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        console.log("Session callback - session data:", { id: session.user.id, email: session.user.email });
      }
      return session;
    },
    async signIn({ user, account }) {
      // Ensure user exists in database when signing in
      if (account?.provider === "email" && user.email) {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });

          if (!existingUser) {
            // Create user if doesn't exist
            const newUser = await prisma.user.create({
              data: {
                email: user.email,
                name: user.name,
                image: user.image,
              },
            });
            user.id = newUser.id;
            console.log("Created new user:", { id: newUser.id, email: newUser.email });
          } else {
            user.id = existingUser.id;
            console.log("Found existing user:", { id: existingUser.id, email: existingUser.email });
          }
        } catch (error) {
          console.error("Error ensuring user exists:", error);
          return false;
        }
      }
      return true;
    },
  },
  providers: [
    {
      id: "email",
      type: "email",
      name: "Email",
      from: "Tell the Owner <noreply@telltheowner.com>",
      sendVerificationRequest: async ({
        identifier: email,
        url,
      }: {
        identifier: string;
        url: string;
      }) => {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: [email],
            template: {
              id: "magic-link",
              variables: {
                magiclink: url,
              },
            },
          }),
        });

        if (!response.ok) {
          const error = await response.text();
          throw new Error(`Failed to send email: ${error}`);
        }
      },
    },
  ],
} satisfies NextAuthConfig;
