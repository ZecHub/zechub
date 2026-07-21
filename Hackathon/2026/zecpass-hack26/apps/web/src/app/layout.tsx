import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ZecPass — Sign in with Zcash',
  description: 'Privacy-preserving authentication for the Zcash ecosystem. Sign in with your shielded address without exposing your identity.',
  keywords: ['Zcash', 'authentication', 'privacy', 'ZK proof', 'shielded', 'login'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-bg-primary text-text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
