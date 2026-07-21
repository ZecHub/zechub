import type { Metadata } from "next";

import { EmbedCountdown } from "@/components/countdown/EmbedCountdown";

export const metadata: Metadata = {
  title: "Ironwood countdown — Turnstile",
  description: "Embeddable live countdown to Zcash block 3,428,143.",
  robots: { index: false },
};

export default function EmbedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas p-4">
      <EmbedCountdown />
    </div>
  );
}
