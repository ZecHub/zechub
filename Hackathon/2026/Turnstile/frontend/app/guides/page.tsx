import type { Metadata } from "next";

import { WalletPicker } from "@/components/guides/WalletPicker";
import { AppFrame } from "@/components/layout/AppFrame";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Eyebrow } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Migration guides — Turnstile",
  description:
    "Step-by-step Ironwood migration guides for Zashi, YWallet, Zingo, Zallet, and ZEC held on an exchange.",
};

export default function GuidesPage() {
  return (
    <AppFrame>
      <Header />

      <section className="relative z-10 w-full">
        <Eyebrow index="F3" label="Migration guides" />

        <h1 className="mb-4 max-w-2xl text-4xl font-medium tracking-tighter text-foreground md:text-6xl">
          Pick your wallet
        </h1>

        <p className="mb-10 max-w-xl text-base leading-relaxed text-muted">
          Not every wallet can export a viewing key, so not every wallet can be checked here. Where
          Turnstile cannot see, the guide tells you how to read the balance inside the wallet
          instead.
        </p>

        <WalletPicker />
      </section>

      <Footer />
    </AppFrame>
  );
}
