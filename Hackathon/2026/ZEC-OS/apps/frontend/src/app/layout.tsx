import type { Metadata } from "next";
import { VT323, Press_Start_2P } from "next/font/google";
import "./globals.css";

const vt323 = VT323({
  weight: "400",
  variable: "--font-vt323",
  subsets: ["latin"],
});

const pressStart = Press_Start_2P({
  weight: "400",
  variable: "--font-press-start",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZEC-OS",
  description: "Retro OS interface for Zcash blockchain data",
  icons: {
    icon: "/zec-logo.svg",
  },
};

// Inline script to set font size and theme from localStorage before React hydrates
// This prevents flash of wrong styling on page load
const initScript = `
(function() {
  var root = document.documentElement;

  // Font size initialization
  try {
    var settings = localStorage.getItem('zec-os-settings');
    if (settings) {
      var parsed = JSON.parse(settings);
      var fontSize = parsed.state && parsed.state.fontSize;
      if (fontSize && ['small', 'medium', 'large', 'xl'].includes(fontSize)) {
        root.setAttribute('data-font-size', fontSize);
      }
    }
  } catch (e) {}
  if (!root.getAttribute('data-font-size')) {
    root.setAttribute('data-font-size', 'medium');
  }

  // Theme initialization - set data attributes for CSS before React loads
  try {
    var theme = localStorage.getItem('zec-os-theme');
    if (theme) {
      var parsed = JSON.parse(theme);
      var themeId = parsed.state && parsed.state.currentTheme;
      if (themeId) {
        root.setAttribute('data-theme', themeId);
        // Set default border/button styles based on theme
        if (themeId === 'zenith') {
          root.setAttribute('data-border-style', 'modern');
          root.setAttribute('data-button-style', 'flat');
          root.setAttribute('data-taskbar-position', 'top');
          root.setAttribute('data-taskbar-style', 'blur');
        } else if (themeId === 'golden-gate') {
          root.setAttribute('data-border-style', 'beveled');
          root.setAttribute('data-button-style', 'beveled');
          root.setAttribute('data-taskbar-position', 'top');
          root.setAttribute('data-taskbar-style', 'beveled');
        } else if (themeId === 'millennium') {
          root.setAttribute('data-border-style', 'flat');
          root.setAttribute('data-button-style', 'rounded');
          root.setAttribute('data-taskbar-position', 'top');
          root.setAttribute('data-taskbar-style', 'flat');
        } else {
          root.setAttribute('data-border-style', 'retro');
          root.setAttribute('data-button-style', 'pixel');
          root.setAttribute('data-taskbar-position', 'top');
          root.setAttribute('data-taskbar-style', 'retro');
        }
      }
    }
  } catch (e) {}
  if (!root.getAttribute('data-theme')) {
    root.setAttribute('data-theme', 'zenith');
    root.setAttribute('data-border-style', 'modern');
    root.setAttribute('data-button-style', 'flat');
    root.setAttribute('data-taskbar-position', 'top');
    root.setAttribute('data-taskbar-style', 'blur');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-font-size="medium" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
      </head>
      <body className={`${vt323.variable} ${pressStart.variable}`}>
        {children}
      </body>
    </html>
  );
}
