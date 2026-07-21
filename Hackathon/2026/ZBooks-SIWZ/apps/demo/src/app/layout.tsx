import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getMember } from "@/lib/db";
import { canSeePayouts } from "@/lib/session";
import Link from "next/link";
import { PageTransition } from "@/components/PageTransition";
import { SiteHeader } from "@/components/SiteHeader";

// Inline script that runs before React mounts so the html.dark class is
// set on first paint — eliminates the white-flash on dark-preferring users.
const THEME_BOOTSTRAP = `
(function(){try{
  var t = localStorage.getItem('zbooks.theme');
  var resolved = t === 'light' || t === 'dark'
    ? t
    : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.classList.add(resolved);
  document.documentElement.style.colorScheme = resolved;
}catch(e){}})();
`;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZBooks: Accounting & Payroll for Shielded ZEC Teams",
  description:
    "Stop pasting txids into spreadsheets. Import a viewing key, tag, pay, and report, all in one place.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const address = session?.user?.address;
  const role = address ? (await getMember(address))?.role : undefined;
  const showPayouts = role ? canSeePayouts(role) : false;

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
      </head>
      {/* suppressHydrationWarning on <body> only — covers extension-
          injected attrs like Grammarly's data-new-gr-c-s-check-loaded
          and data-gr-ext-installed. Does not affect children. */}
      <body suppressHydrationWarning>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <SiteHeader signedInAs={address} showPayouts={showPayouts} />
            <main className="mx-auto w-full max-w-5xl px-4 py-10 flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800/80">
      <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-neutral-500">
        ZBooks, built for the Zechub hackathon, paired with{" "}
        <a className="underline hover:text-neutral-700 dark:hover:text-neutral-300" href="https://siwz.vercel.app" target="_blank" rel="noreferrer">
          Sign in with Zcash
        </a>
        . Authentication is non-custodial: we only see signed messages, never keys.
      </div>
    </footer>
  );
}
