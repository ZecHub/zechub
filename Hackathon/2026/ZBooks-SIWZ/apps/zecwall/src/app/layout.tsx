import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";
import "@siwz/react/styles.css";

export const metadata: Metadata = {
  title: "ZecWall: a Zcash-gated comments wall built on Sign in with Zcash",
  description: "Minimal reference app demonstrating SIWZ as a reusable sign-in primitive.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className="mx-auto max-w-2xl px-4 py-8 flex flex-col gap-8">
            <header className="flex items-baseline justify-between">
              <h1 className="text-xl font-semibold">ZecWall</h1>
              <span className="text-xs opacity-60">
                SIWZ reference integration ·{" "}
                <a className="underline" href="https://github.com" target="_blank" rel="noreferrer">
                  source
                </a>
              </span>
            </header>
            {children}
            <footer className="text-xs opacity-60 border-t pt-4 mt-8">
              A small SIWZ reference integration. The auth comes from the
              shared <code className="font-mono">@siwz/*</code> packages, the same ones ZBooks uses.
              Two apps, one primitive.
            </footer>
          </main>
        </Providers>
      </body>
    </html>
  );
}
