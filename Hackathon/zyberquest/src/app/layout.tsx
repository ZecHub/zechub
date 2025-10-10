export const revalidate = 0;                 
export const dynamic = 'force-dynamic';      
export const fetchCache = 'default-no-store'; 

import "@/app/globals.css"; 
import type { Metadata } from "next";

import { inter, plexMono } from "./fonts";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import AppToaster from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: "ZyberQuest — Cypherpunk Arcade",
  description: "Arcade cypherpunk to learn privacy, ZK, and encryption.",
  keywords: ["ZyberQuest", "cypherpunk", "Zcash", "ZK", "encryption", "privacy", "arcade"],
  authors: [{ name: "BlockBears Team" }],
    icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "ZyberQuest — Cypherpunk Arcade",
    description: "Connect nodes. Break codes. Master the maze.",
    url: "https://zyberquest.vercel.app",
    siteName: "ZyberQuest",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${plexMono.variable} min-h-screen bg-zx-ink text-white antialiased bg-grid scanline`}
      >
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 bg-black/70 px-3 py-2 rounded glow"
        >
          Skip to content
        </a>

        <Header />
        <main id="content" className="pt-16 pb-16 font-sans">{children} </main>
         <AppToaster />
        <Footer />
      </body>
    </html>
  );
}
