import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CustomProvider } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import "./globals.css";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tell the owner",
  description: "Tell the owner about the problem you encountered or leave behind compliements",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="manifest" href="/manifest.json"></link>
      </head>
      <body className="min-h-full flex flex-col">
        <CustomProvider theme="light">
          <ServiceWorkerRegister />
          {children}
        </CustomProvider>
      </body>
    </html>
  );
}
