import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leave a Voice Review",
  description: "Record and submit a voice review",
};

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
