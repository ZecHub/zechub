import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: "Turnstile — Is your ZEC ready for Ironwood?",
  description:
    "Audit your ZEC exposure before block 3,428,143. Paste a viewing key to scan your wallet's pool balances. No spending keys, ever.",
  applicationName: "Turnstile",
  openGraph: {
    title: "Turnstile — Is your ZEC ready for Ironwood?",
    description:
      "Audit your ZEC exposure before block 3,428,143. No spending keys, ever.",
    siteName: "Turnstile",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Turnstile — Is your ZEC ready for Ironwood?",
    description:
      "3.77M ZEC sits in a pool that closes at block 3,428,143. Check yours with a viewing key — never a spending key.",
  },
};

export const viewport: Viewport = {
  themeColor: "#030303",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
