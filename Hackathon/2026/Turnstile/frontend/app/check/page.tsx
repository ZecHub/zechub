import type { Metadata } from "next";

import { CheckPanel } from "@/components/check/CheckPanel";
import { AppFrame } from "@/components/layout/AppFrame";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Eyebrow } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Check my wallet — Turnstile",
  description:
    "Paste a unified full viewing key to read your Zcash pool balances. No spending keys, never stored.",
};

export default function CheckPage() {
  return (
    <AppFrame>
      <Header />

      <section className="relative z-10 w-full">
        <Eyebrow index="F2" label="Wallet readiness check" />

        <h1 className="mb-4 max-w-2xl text-4xl font-medium tracking-tighter text-foreground md:text-6xl">
          Where is your ZEC?
        </h1>

        <p className="mb-10 max-w-xl text-base leading-relaxed text-muted">
          Paste a unified full viewing key. Turnstile reads your balance in each pool and tells you
          whether the Ironwood activation asks anything of you. It cannot spend, and it keeps
          nothing.
        </p>

        <CheckPanel />
      </section>

      <Footer />
    </AppFrame>
  );
}
