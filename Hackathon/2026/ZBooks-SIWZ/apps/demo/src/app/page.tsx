"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { SignInPanel } from "@/components/SignInPanel";

const GITHUB_URL = "https://github.com/AustinChris1/ZBooks-SIWZ";

const EASE = [0.21, 0.5, 0.3, 1] as const;

export default function HomePage() {
  return (
    <div className="flex flex-col gap-20 sm:gap-28">
      <Hero />
      <SignInSection />
      <Marquee />
      <HowItWorks />
      <Features />
      <ClosingBand />
    </div>
  );
}

/* ─────────────────────────  Hero  ───────────────────────── */

function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative isolate pt-6 sm:pt-10 pb-4">
      <BackgroundOrbs reduce={!!reduce} />

      <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-10 lg:gap-16 items-center">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl lg:text-[3.6rem] xl:text-6xl font-semibold tracking-tight leading-[1.02]">
            <WordReveal text="Accounting & batch payouts" />
            <br />
            <span className="text-neutral-500 dark:text-neutral-400">
              <WordReveal text="for" delay={0.35} />{" "}
            </span>
            <ShimmerText text="shielded ZEC teams" delay={0.4} />
            <span className="text-zcash-yellow">.</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55, ease: EASE }}
            className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed"
          >
            Read-only UFVKs. One transaction pays everyone. Auto-reconciled. Spending
            keys never leave the treasurer&apos;s wallet. Built for the workflow ZecHub
            actually runs today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.7, ease: EASE }}
            className="flex flex-wrap items-center gap-3 pt-1"
          >
            <a
              href="#sign-in"
              className="group inline-flex items-center gap-2 rounded-full bg-zcash-yellow text-zcash-dark font-semibold px-5 py-2.5 text-sm hover:bg-yellow-400 shadow-[0_10px_30px_-10px_rgba(244,183,40,0.55)] hover:shadow-[0_14px_40px_-8px_rgba(244,183,40,0.7)] transition-all"
            >
              Sign in with Zcash
              <ArrowDown className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/60 dark:bg-neutral-900/40 backdrop-blur px-5 py-2.5 text-sm hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
            >
              <GithubIcon />
              View on GitHub
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9, ease: EASE }}
            className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] uppercase tracking-wider text-neutral-500 pt-2"
          >
            <span className="inline-flex items-center gap-1.5">
              <Dot /> Non-custodial
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Dot /> M-of-N approvals
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Dot /> ZIP 321 batches
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Dot /> Auto-reconciled
            </span>
          </motion.div>
        </div>

        <div className="hidden lg:block">
          <PayoutPreview reduce={!!reduce} />
        </div>
      </div>

      <div className="lg:hidden mt-10">
        <PayoutPreview reduce={!!reduce} compact />
      </div>
    </section>
  );
}

function BackgroundOrbs({ reduce }: { reduce: boolean }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 -top-16 -bottom-24 -z-10 flex justify-center"
      style={{
        left: "calc(50% - 50vw)",
        right: "calc(50% - 50vw)",
        width: "100vw",
      }}
    >
      <motion.div
        className="h-[26rem] w-[26rem] sm:h-[36rem] sm:w-[36rem] rounded-full bg-zcash-yellow/15 dark:bg-zcash-yellow/[0.1] blur-[120px]"
        animate={reduce ? undefined : { scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className="inline">
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.55, delay: delay + i * 0.06, ease: EASE }}
            className="inline-block"
          >
            {w}
            {i < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function ShimmerText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="relative inline-block overflow-hidden align-bottom">
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.55, delay, ease: EASE }}
        className="inline-block bg-gradient-to-r from-zcash-yellow via-amber-400 to-zcash-yellow bg-[length:200%_100%] bg-clip-text text-transparent"
        style={{ animation: "zbShimmer 6s linear infinite" }}
      >
        {text}
      </motion.span>
    </span>
  );
}

/* ─────────────────  Payout Preview mock  ───────────────── */

const PAYEES = [
  { name: "squirrel", role: "Ecosystem Digest", zec: 0.08 },
  { name: "gorgagian123", role: "Wallets page", zec: 0.08 },
  { name: "0xmtg", role: "Tutorials page", zec: 0.145 },
  { name: "Haryourdhejih", role: "Ambassadors wiki", zec: 0.15 },
  { name: "Kellyjoe8", role: "Zipher motion", zec: 0.3 },
];

function PayoutPreview({ reduce, compact }: { reduce: boolean; compact?: boolean }) {
  const [phase, setPhase] = useState<"building" | "approving" | "cleared">("building");
  const [approvals, setApprovals] = useState(0);

  useEffect(() => {
    if (reduce) {
      setPhase("cleared");
      setApprovals(3);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    const schedule = () => {
      timers.push(setTimeout(() => setPhase("approving"), 1400));
      timers.push(setTimeout(() => setApprovals(1), 2200));
      timers.push(setTimeout(() => setApprovals(2), 3200));
      timers.push(setTimeout(() => setApprovals(3), 4200));
      timers.push(setTimeout(() => setPhase("cleared"), 4500));
    };
    schedule();
    const loop = setInterval(() => {
      setPhase("building");
      setApprovals(0);
      schedule();
    }, 12000);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, [reduce]);

  const total = PAYEES.reduce((s, p) => s + p.zec, 0);
  const pct = Math.min(100, (approvals / 3) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: -1 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
      className="relative"
    >
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-zcash-yellow/20 via-amber-400/10 to-transparent blur-2xl -z-10" />
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/85 dark:bg-neutral-950/80 backdrop-blur-xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] dark:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-200/70 dark:border-neutral-800/70">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
            </div>
            <span className="ml-2 font-mono text-[11px] text-neutral-500">
              zbooks / payouts / july
            </span>
          </div>
          <span
            className={`text-[10px] uppercase tracking-wide rounded px-2 py-0.5 font-medium transition-colors ${
              phase === "cleared"
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                : "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
            }`}
          >
            {phase === "cleared" ? "cleared" : "draft"}
          </span>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <div className="flex items-baseline justify-between">
            <div className="font-semibold tracking-tight text-sm sm:text-base">
              ZecHub contributors, July
            </div>
            <div className="font-mono text-sm tabular-nums">
              {total.toFixed(3)} <span className="text-neutral-500">ZEC</span>
            </div>
          </div>

          <ul className="flex flex-col gap-1.5">
            {PAYEES.map((p, i) => (
              <motion.li
                key={p.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.4 + i * 0.08, ease: EASE }}
                className="flex items-center gap-3 rounded-lg border border-neutral-100 dark:border-neutral-800/60 bg-neutral-50/60 dark:bg-neutral-900/40 px-3 py-2 text-xs"
              >
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-zcash-yellow/30 to-amber-500/20 flex items-center justify-center text-[10px] font-semibold text-neutral-700 dark:text-neutral-200">
                  {p.name.slice(0, 1).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{p.name}</div>
                  <div className="text-[10px] text-neutral-500 truncate">{p.role}</div>
                </div>
                <div className="font-mono tabular-nums">{p.zec.toFixed(3)}</div>
                {phase === "cleared" && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="text-emerald-500"
                  >
                    <CheckIcon />
                  </motion.span>
                )}
              </motion.li>
            ))}
          </ul>

          {!compact && (
            <div
              className={`rounded-lg border p-3 flex flex-col gap-2 transition-colors ${
                phase === "cleared"
                  ? "border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/10"
                  : "border-amber-300 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/10"
              }`}
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold tracking-wide uppercase text-neutral-600 dark:text-neutral-300">
                  Approvals · {approvals} of 3
                </span>
                <span className="font-mono text-neutral-500">
                  {phase === "building" ? "collecting" : phase === "approving" ? "pending" : "cleared"}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                <motion.div
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className={`h-full ${
                    phase === "cleared" ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                />
              </div>
            </div>
          )}

          {phase === "cleared" && !compact && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 rounded-lg bg-zcash-yellow/10 border border-zcash-yellow/40 px-3 py-2 text-xs"
            >
              <QrIcon />
              <div className="flex-1">
                <div className="font-semibold">One QR pays all {PAYEES.length} lines.</div>
                <div className="text-[10px] text-neutral-600 dark:text-neutral-400">
                  Treasurer signs in YWallet or ZODL. Auto-reconciled on confirm.
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────  Marquee  ───────────────────────── */

const MARQUEE_ITEMS = [
  "UFVK read-only",
  "ZIP 321 multi-recipient",
  "ZIP 316 unified viewing keys",
  "ZIP 317 fee estimation",
  "M-of-N HMAC-bound approvals",
  "AES-256-GCM at rest",
  "HKDF-SHA256 key derivation",
  "Auto-reconciled from chain",
  "MetaMask Zcash Snap",
  "Memo-challenge sign-in",
  "MIT licensed",
];

function Marquee() {
  return (
    <section className="relative overflow-hidden py-6 border-y border-neutral-200 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-950/40 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex whitespace-nowrap animate-[zbMarquee_38s_linear_infinite]">
        {[0, 1].map((k) => (
          <ul key={k} className="flex items-center gap-8 pr-8 shrink-0">
            {MARQUEE_ITEMS.map((it) => (
              <li
                key={`${k}-${it}`}
                className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300"
              >
                <span className="h-1 w-1 rounded-full bg-zcash-yellow" />
                {it}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────  How it works (scroll)  ───────────────── */

const STEPS = [
  {
    n: "01",
    title: "Bring your treasury viewing key",
    body: "Paste a UFVK on the Keys page. ZBooks reads shielded history. Spending stays in the wallet.",
    accent: "from-zcash-yellow/30 to-amber-400/10",
  },
  {
    n: "02",
    title: "Build a run, M-of-N approves",
    body: "Import completed bounties or add lines by hand. HMAC-bound to the exact payable set. Editing any line invalidates older approvals.",
    accent: "from-emerald-400/25 to-sky-400/10",
  },
  {
    n: "03",
    title: "One shielded tx pays everyone",
    body: "Scan one ZIP 321 QR in YWallet or ZODL. ZBooks watches the treasury and marks each line paid as the chain confirms.",
    accent: "from-sky-400/25 to-violet-400/10",
  },
];

function HowItWorks() {
  return (
    <section className="flex flex-col gap-10">
      <SectionHeader
        eyebrow="How it works"
        title="Three steps. No spending key ever leaves the wallet."
        subtitle="Every write action is gated by an M-of-N approval bound to the exact payable set."
      />
      <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <StepCard key={s.n} step={s} index={i} />
        ))}
      </div>
    </section>
  );
}

function StepCard({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      className="group relative rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-6 overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
    >
      <div
        className={`absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${step.accent} blur-3xl opacity-70 group-hover:opacity-100 transition-opacity`}
      />
      <div className="relative flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-neutral-500">{step.n}</span>
          <span className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
        </div>
        <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {step.body}
        </p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────  Features  ───────────────────────── */

const FEATURES = [
  {
    title: "Bring your own viewing keys",
    body: "Paste one or more UFVKs. ZBooks gets read-only access; your spending key never leaves the wallet.",
    icon: <KeyIcon />,
  },
  {
    title: "Pay everyone in one batch",
    body: "One multi-recipient ZIP 321 QR. The treasurer signs in their own wallet. ZBooks reconciles each payment back to its line.",
    icon: <SendIcon />,
  },
  {
    title: "Reports your accountant recognises",
    body: "Monthly P&L, contractor totals, CSV export shaped for QuickBooks and Xero. Reconciled payouts post themselves.",
    icon: <ChartIcon />,
  },
  {
    title: "Memos become categories",
    body: "Shielded memos arrive as the first draft of every transaction's notes. Treasurer reviews. Everyone else just reads.",
    icon: <TagIcon />,
  },
  {
    title: "Roles, not seats",
    body: "Admin sets policy, treasurer tags and pays, viewer reads. Onboarding a new finance contractor is one sign-in.",
    icon: <UsersIcon />,
  },
  {
    title: "Shielded by default",
    body: "Sign-in and balance sync ride encrypted Zcash memos. Amounts and counterparties stay off the public ledger.",
    icon: <ShieldIcon />,
  },
];

function Features() {
  return (
    <section className="flex flex-col gap-10">
      <SectionHeader
        eyebrow="What's inside"
        title="Six things that make Zcash treasuries workable."
        subtitle="Every feature is live on mainnet today."
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <FeatureCard key={f.title} feature={f} index={i} />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof FEATURES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: EASE }}
      className="group relative h-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-5 overflow-hidden hover:-translate-y-1 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] transition-all duration-300"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
        <div className="absolute -inset-1 bg-gradient-to-br from-zcash-yellow/10 via-transparent to-transparent" />
      </div>
      <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-zcash-yellow/10 text-zcash-yellow mb-3.5 group-hover:bg-zcash-yellow/20 group-hover:scale-110 group-hover:rotate-[-4deg] transition-all">
        {feature.icon}
      </div>
      <div className="font-semibold tracking-tight">{feature.title}</div>
      <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1.5 leading-relaxed">
        {feature.body}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────  Sign in  ───────────────────────── */

function SignInSection() {
  return (
    <section id="sign-in" className="scroll-mt-20 flex flex-col gap-8">
      <SectionHeader
        eyebrow="Try it now"
        title="Pick a sign-in flow."
        subtitle="Three flows via SIWZ: memo-challenge (any shielded wallet), signed message paste, or MetaMask Snap. First sign-in on a fresh instance becomes admin."
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: EASE }}
        className="relative"
      >
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-zcash-yellow/50 via-amber-400/30 to-transparent -z-10 blur-[2px]" />
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/60 backdrop-blur-xl p-6 sm:p-8">
          <SignInPanel />
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────  Closing band  ───────────────────────── */

function ClosingBand() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: EASE }}
      className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-zcash-yellow/10 via-white to-white dark:from-zcash-yellow/[0.08] dark:via-neutral-950 dark:to-neutral-950 p-8 sm:p-12"
    >
      <div
        aria-hidden
        className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-zcash-yellow/20 blur-3xl"
      />
      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex flex-col gap-2 max-w-xl">
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Read the code, then run it.
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            ZBooks + SIWZ are shipped as one MIT-licensed monorepo. Docs, threat
            model, and the shielded deployment recipe live alongside the code.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-zcash-dark text-white dark:bg-white dark:text-zcash-dark font-semibold px-5 py-2.5 text-sm hover:opacity-90 transition-opacity"
          >
            <GithubIcon /> Star on GitHub
          </a>
          <Link
            href="#sign-in"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 px-5 py-2.5 text-sm hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
          >
            Sign in ↑
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

/* ─────────────────────────  Shared  ───────────────────────── */

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: EASE }}
      className="flex flex-col gap-3 max-w-2xl"
    >
      <span className="text-xs uppercase tracking-widest text-zcash-yellow font-semibold">
        {eyebrow}
      </span>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

function Dot() {
  return <span className="h-1 w-1 rounded-full bg-zcash-yellow" />;
}

/* ─────────────────────────  Icons  ───────────────────────── */

function ArrowDown({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M12 5v14" />
      <path d="M19 12l-7 7-7-7" />
    </svg>
  );
}
function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.94c.58.1.79-.25.79-.56v-2c-3.19.7-3.87-1.36-3.87-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.97.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.02 11.02 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.77.12 3.06.74.81 1.19 1.83 1.19 3.09 0 4.41-2.7 5.38-5.27 5.66.41.36.78 1.05.78 2.12v3.14c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
function QrIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3h-3zM17 17h4v4h-4zM14 20h3" />
    </svg>
  );
}
function KeyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="7.5" cy="15.5" r="3.5" />
      <path d="M10.5 13L20 3.5" />
      <path d="M16 7l3 3" />
      <path d="M18 5l3 3" />
    </svg>
  );
}
function SendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22l-4-9-9-4z" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 3v18h18" />
      <path d="M7 14l4-4 3 3 6-7" />
    </svg>
  );
}
function TagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <circle cx="7" cy="7" r="1.2" fill="currentColor" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
