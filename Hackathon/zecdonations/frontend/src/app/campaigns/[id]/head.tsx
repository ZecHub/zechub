import type { Metadata } from "next";

export default function Head() {
  // Basic static fallback; runtime metadata is handled in page rendering via navigator.share and default meta
  return (
    <>
      <title>Campaign | ZECdonate</title>
      <meta name="description" content="Donate privately with ZEC." />
      <meta property="og:title" content="Campaign | ZECdonate" />
      <meta property="og:description" content="Donate privately with ZEC." />
      <meta property="twitter:card" content="summary" />
    </>
  );
}


