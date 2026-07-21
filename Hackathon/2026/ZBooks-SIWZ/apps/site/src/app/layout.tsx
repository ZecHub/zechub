import type { Metadata } from "next";
import "./globals.css";

// Inline script that runs before React mounts so the html.dark / html.light
// class is set on first paint, eliminating the flash for dark-preferring users.
const THEME_BOOTSTRAP = `
(function(){try{
  var t = localStorage.getItem('siwz.theme');
  var resolved = (t === 'light' || t === 'dark')
    ? t
    : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.classList.add(resolved);
  document.documentElement.style.colorScheme = resolved;
}catch(e){}})();
`;

const SITE = "https://siwz.vercel.app";
const TITLE = "Sign in with Zcash (SIWZ): the auth primitive Zcash didn't have";
const DESCRIPTION =
  "Drop-in, non-custodial sign-in for Zcash apps. Three flows: shielded memo-challenge, signed message, and MetaMask Snap. Three npm packages, ten lines of code.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: TITLE,
    template: "%s · SIWZ",
  },
  description: DESCRIPTION,
  applicationName: "Sign in with Zcash",
  generator: "Next.js",
  keywords: [
    "sign in with zcash",
    "siwz",
    "zcash",
    "zcash login",
    "zcash authentication",
    "zcash auth",
    "non-custodial sign-in",
    "memo challenge",
    "zip 321",
    "zip-321",
    "shielded sign-in",
    "metamask zcash snap",
    "sign in with ethereum alternative",
    "siwe alternative",
    "next-auth zcash",
    "nextauth zcash",
    "@siwz/core",
    "@siwz/react",
    "@siwz/next-auth",
    "zcash wallet connect",
    "zcash signmessage",
    "zip 304",
    "zcashnames",
  ],
  authors: [{ name: "austinchris" }],
  creator: "austinchris",
  publisher: "austinchris",
  category: "developer-tools",
  alternates: { canonical: SITE },
  openGraph: {
    type: "website",
    siteName: "Sign in with Zcash",
    title: TITLE,
    description: DESCRIPTION,
    url: SITE,
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sign in with Zcash: drop-in, non-custodial auth for Zcash apps.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: {
    google: "P3Ym44gtuAIEoumD7t5OMELH38dzz90gF1vf1gXeQ4s",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
