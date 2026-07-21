import type { Metadata } from "next";

import { SubscribeCard } from "@/components/guides/SubscribeCard";
import { CheckmarkCircle02Icon, Icon } from "@/components/icons/Icon";
import { AppFrame } from "@/components/layout/AppFrame";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Eyebrow } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Alerts — Turnstile",
  description:
    "Subscribe to Ironwood activation alerts by sending a shielded mainnet memo. No email, no account.",
};

export const dynamic = "force-dynamic";

const PROMISES = [
  "No email address, ever",
  "No account, no password, no cookie",
  "The memo is encrypted on-chain — only Turnstile can read it",
  "We store your topic. Nothing else.",
];

export default function AlertsPage() {
  const address = process.env.TURNSTILE_UNIFIED_ADDRESS ?? null;

  return (
    <AppFrame>
      <Header />

      <section className="relative z-10 w-full">
        <Eyebrow index="F4" label="Alerts" />

        <h1 className="mb-4 max-w-2xl text-4xl font-medium tracking-tighter text-foreground md:text-6xl">
          A shielded memo is the signup form
        </h1>

        <p className="mb-10 max-w-xl text-base leading-relaxed text-muted">
          Turnstile watches a mainnet address for encrypted memos. Send one naming your alert
          topic, and you are subscribed — using the chain itself as the signup mechanism, with no
          personal data anywhere in the loop.
        </p>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <SubscribeCard address={address} />
          </div>

          <aside className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h2 className="mb-5 font-mono text-[10px] uppercase tracking-widest text-faint">
                What we never ask for
              </h2>

              <ul className="flex flex-col gap-3">
                {PROMISES.map((promise) => (
                  <li
                    key={promise}
                    className="flex items-start gap-3 text-sm leading-relaxed text-muted"
                  >
                    <span className="text-ready">
                      <Icon icon={CheckmarkCircle02Icon} size={15} />
                    </span>
                    {promise}
                  </li>
                ))}
              </ul>

              <p className="mt-6 border-t border-border pt-5 text-xs leading-relaxed text-faint">
                The 0.0001 ZEC is the network fee for carrying the memo, not a payment to us. It
                is the smallest amount the protocol will move.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </AppFrame>
  );
}
