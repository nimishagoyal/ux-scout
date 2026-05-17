import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UX Scout — AI-Powered Competitive UX Intelligence",
  description:
    "Analyze competitor app screenshots from Mobbin and get actionable UX recommendations for your product.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
