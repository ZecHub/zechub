"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Brain, KeySquare, LockKeyhole, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const API = process.env.NEXT_PUBLIC_API_BASE || "http://192.168.100.12:3001";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } },
});

export default function HomePage() {
  // --- Donation config ---
  const walletAddress =
    "u1h3tjy9mvevd9agac79eqxxdz62tl8nus4uelzdlddwekhjpzpu4jn2yqe8zanl3zpyj4793qatc7hj7wwpf4rt42xratu2rvfvpvq0ax";
  const walletQrSrc = "/qr/zyberquest-qr.jpg";

  // Donation modal state
  const [donationOpen, setDonationOpen] = useState(false);
  const openDonation = useCallback(() => setDonationOpen(true), []);
  const closeDonation = useCallback(() => {
    setDonationOpen(false);
    if (typeof window !== "undefined" && window.location.hash === "#donate") {
      history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === "#donate") openDonation();
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, [openDonation]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDonation();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeDonation]);

  const bears = ["🐼", "🐻", "🐻‍❄️"];

  // ======== RPC FOOTER STATE ========
  const [height, setHeight] = useState<number | null>(null);
  const [chain, setChain] = useState<string | null>(null);
  const [lwd, setLwd] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<number | null>(null);

  // actividad de pagos
  type MiniTx = { txid: string; amountZEC: number; when: number };
  const [lastTx, setLastTx] = useState<MiniTx | null>(null);
  const [pulseUntil, setPulseUntil] = useState<number>(0);

  useEffect(() => {
    let id: any;
    // previos entre ticks
    let prevHeight: number | null = null;
    let prevTxid: string | null = null;

    async function tick() {
      try {
        // 1) metrics (height/chain)
        const m = await fetch(`${API}/api/network/metrics`, { cache: "no-store" }).then((r) => r.json());
        const raw: string = m?.raw || "";
        const h = /"latest_block_height"\s*:\s*(\d+)/.exec(raw);
        const c = /"chain_name"\s*:\s*"([^"]+)"/.exec(raw) || /"chain"\s*:\s*"([^"]+)"/.exec(raw);
        const newHeight = h ? Number(h[1]) : null;
        const newChain = c ? c[1] : null;

        setHeight(newHeight);
        setChain(newChain);

        // 2) active LWD
        const a = await fetch(`${API}/api/lwd/active`, { cache: "no-store" }).then((r) => r.json());
        setLwd(a?.active || null);

        // 3) último pago (si existe)
        try {
          const tx = await fetch(`${API}/api/tx/list?limit=1`, { cache: "no-store" }).then((r) => r.json());
          const it = Array.isArray(tx?.items) && tx.items[0] ? tx.items[0] : null;
          if (it && it.txid) {
            if (it.txid !== prevTxid) {
              prevTxid = it.txid;
              const amt = Number(it.amountZEC || 0);
              const t = it.datetime ? Date.parse(it.datetime) : Date.now();
              setLastTx({ txid: it.txid, amountZEC: amt, when: t });
              // pulso visible por 12s
              setPulseUntil(Date.now() + 12_000);
            }
          }
        } catch {
          /* no bloquear UI si falla /tx/list */
        }

        // 4) si subió el height, también pulso breve (6s)
        if (newHeight != null && prevHeight != null && newHeight > prevHeight) {
          setPulseUntil(Date.now() + 6_000);
        }
        prevHeight = newHeight;

        setUpdatedAt(Date.now());
      } catch {
        // deja estado anterior si hay error transitorio
      }
    }

    tick();
    id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* HERO */}
      <section id="hero" className="container-zx pt-16 pb-12">
        <motion.h1 {...fadeUp(0)} className="text-4xl md:text-6xl font-mono tracking-tight text-zx-green">
          ZyberQuest — Connect nodes. Break ciphers. Master the maze.
        </motion.h1>

        <motion.p {...fadeUp(0.08)} className="mt-4 max-w-2xl text-zinc-300">
          Cypherpunk arcade to learn Zcash, privacy, ZK, and encryption.
        </motion.p>

        <motion.div {...fadeUp(0.16)} className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/start" aria-label="Play">
            <Button>
              Play <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>

          <Link href="#modes" aria-label="View modes">
            <Button
              variant="secondary"
              className="bg-transparent text-white hover:border-zx-cyan/50"
              style={{ borderColor: "rgba(255,214,10,0.4)" }}
            >
              View modes
            </Button>
          </Link>
        </motion.div>

        {/* yellow detail */}
        <div className="mt-6 inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--zx-yellow)]" />
          <span className="text-xs font-mono text-[var(--zx-yellow)]">ON-CHAIN MVP</span>
        </div>

        <div className="mt-10 h-px w-full bg-[rgba(0,255,156,0.18)]" />
      </section>

      {/* MODES */}
      <section id="modes" className="container-zx py-12">
        <motion.h2 {...fadeUp(0)} className="text-2xl md:text-3xl font-mono text-zx-cyan">
          Game Modes <span className="text-base align-middle text-[var(--zx-yellow)]">[educational]</span>
        </motion.h2>
        <p className="mt-2 text-zinc-400 max-w-2xl">
          Learn by playing: Zcash/privacy/security trivias, top-down mazes, and cipher simulators.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Trivias */}
          <motion.div {...fadeUp(0.05)}>
            <Card className="bg-zx-mid/40 border-zx-green/25 glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="text-zx-green" /> Trivias
                  <Badge className="ml-auto text-[var(--zx-yellow)]" style={{ borderColor: "rgba(255,214,10,0.4)" }}>
                    Beginner
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-300">
                Questions about Zcash, privacy & security with explanatory tooltips.
                <div className="mt-4">
                  <Link href="/start" aria-label="Go to Trivias mode">
                    <Button size="sm" className="bg-zx-green text-zx-ink hover:bg-zx-cyan">
                      Start
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Mazes */}
          <motion.div {...fadeUp(0.1)}>
            <Card className="bg-zx-mid/40 border-zx-green/25 glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <KeySquare className="text-zx-green" /> Mazes
                  <Badge className="ml-auto text-[var(--zx-yellow)]" style={{ borderColor: "rgba(255,214,10,0.4)" }}>
                    Intermediate
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-300">
                Top-down 2D with doors/keys and hidden ZK concepts to unlock.
                <div className="mt-4">
                  <Link href="/start" aria-label="Go to Laberintos mode">
                    <Button size="sm" className="bg-zx-green text-zx-ink hover:bg-zx-cyan">
                      Start
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Simulators */}
          <motion.div {...fadeUp(0.15)}>
            <Card className="bg-zx-mid/40 border-zx-green/25 glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LockKeyhole className="text-zx-green" /> Simulators
                  <Badge className="ml-auto text-[var(--zx-yellow)]" style={{ borderColor: "rgba(255,214,10,0.4)" }}>
                    Advanced
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-300">
                Mini-game visual XOR inspired by encryption.
                <div className="mt-4">
                  <Link href="/start" aria-label="Go to Simulators mode">
                    <Button size="sm" className="bg-zx-green text-zx-ink hover:bg-zx-cyan">
                      Start
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="container-zx py-12">
        <motion.h2 {...fadeUp(0)} className="text-2xl md:text-3xl font-mono text-zx-cyan">
          How it works <span className="text-base align-middle text-[var(--zx-yellow)]">[3 steps]</span>
        </motion.h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <motion.div
            {...fadeUp(0.05)}
            className="rounded-xl border border-zx-green/25 bg-zx-mid/30 p-5 glow"
          >
            <p className="font-mono text-zx-green">1. Enter</p>
            <p className="mt-2 text-zinc-300">Open the game and get into the grid.</p>
          </motion.div>

          <motion.div
            {...fadeUp(0.1)}
            className="rounded-xl border border-zx-green/25 bg-zx-mid/30 p-5 glow"
          >
            <p className="font-mono text-zx-green">2. Choose a mode</p>
            <p className="mt-2 text-zinc-300">Trivia, Mazes, or Simulators.</p>
          </motion.div>

          <motion.div
            {...fadeUp(0.15)}
            className="rounded-xl border border-zx-green/25 bg-zx-mid/30 p-5 glow"
          >
            <p className="font-mono text-zx-green">3. Complete challenges</p>
            <p className="mt-2 text-zinc-300">Beat levels and learn Zcash, privacy & crypto basics.</p>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="container-zx py-12">
        <h2 className="text-2xl md:text-3xl font-mono text-zx-cyan">Features</h2>
        <p className="mt-2 text-zinc-400">Fast, accessible, and replayable — built for the grid.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Badge>Accessible</Badge>
          <Badge>Replayable</Badge>
          <Badge className="text-[var(--zx-yellow)]" style={{ borderColor: "rgba(255,214,10,0.4)" }}>
            Cypherpunk UI
          </Badge>
          <Badge>Educational</Badge>
          <Badge>60 FPS</Badge>
          <Badge>Low-spec friendly</Badge>
        </div>
      </section>

      {/* SCREENSHOTS */}
      <section id="shots" className="container-zx py-12">
        <h2 className="text-2xl md:text-3xl font-mono text-zx-cyan">Screenshots & Mockups</h2>
        <p className="mt-2 text-zinc-400">Preview of the games you'll get in Zyberquest</p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { src: "/mockups/trivia.png", alt: "Trivia mockup" },
            { src: "/mockups/maze.png", alt: "Maze mockup" },
            { src: "/mockups/simulator.png", alt: "Simulator mockup" },
          ].map(({ src, alt }, i) => (
            <div
              key={i}
              className="relative aspect-video rounded-xl border border-zx-green/25 bg-zx-mid/30 glow overflow-hidden"
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain"
                priority={i === 0}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="container-zx py-12">
        <h2 className="text-2xl md:text-3xl font-mono text-zx-cyan">Roadmap</h2>
        <ol className="mt-6 relative border-s border-zx-green/25 pl-6" role="list" aria-label="Project roadmap">
          {[
            { title: "MVP", desc: "Core modes + basic UX.", status: "done" },
            { title: "Content", desc: "More questions, mazes, and ciphers.", status: "done" },
            { title: "Polishing", desc: "Animations, sounds, accessibility polish.", status: "done" },
            {
              title: "On-chain integration",
              desc: "Receiving ZEC transactions, Memo & Utilising network metrics from any Zcash RPC API.",
              status: "done",
            },
            { title: "On-chain integration", desc: "Sending ZEC transactions.", status: "in-progress" },
            { title: "New Game", desc: "Wallet simulator.", status: "in-progress" },
          ].map((it, idx) => (
            <li key={idx} className="mb-6" role="listitem">
              <div
                className="absolute -left-1.5 mt-1 size-3 rounded-full bg-zx-green/70 ring-2 ring-zx-ink
                  data-[state=todo]:bg-zinc-500 data-[state=in-progress]:bg-zx-cyan/80 data-[state=done]:bg-zx-green"
                data-state={it.status}
                aria-hidden
              />
              <p className="font-mono text-white">
                {it.title}{" "}
                {it.status === "in-progress" && (
                  <span className="text-xs align-middle text-[var(--zx-yellow)]">[in progress]</span>
                )}
              </p>
              <p className="text-sm text-zinc-400">{it.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* TEAM */}
      <section id="team" className="container-zx py-12">
        <h2 className="text-2xl md:text-3xl font-mono text-zx-cyan">Team BlockBears</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Zula", role: "PM", x: "https://x.com/Zulakyz" },
            { name: "Mary", role: "BizDev", x: "https://x.com/mary_mlp8" },
            { name: "MaFer", role: "Developer", x: "https://x.com/Soymaferlopezp" },
          ].map((m, i) => (
            <article
              key={i}
              className="flex items-center gap-4 rounded-xl border border-zx-green/25 bg-zx-mid/30 p-4 glow"
            >
              <div className="grid size-12 place-items-center rounded-full border border-zx-green/60 text-2xl">
                {bears[i % bears.length]}
              </div>

              <div>
                <p className="font-mono text-white">{m.name}</p>
                <p className="text-sm text-zinc-400">{m.role}</p>

                <div className="mt-2">
                  <a
                    href={m.x}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${m.name} on X`}
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors"
                    style={{
                      border: "1px solid rgba(255,214,10,0.4)",
                      color: "var(--zx-yellow)",
                    }}
                  >
                    <span className="font-mono">X</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-zinc-400">Credits: gameplay & content inspired by classic ciphers and privacy tooling.</p>

        {/* Donation trigger */}
        <div className="mt-6">
          <Button
            variant="secondary"
            className="bg-transparent text-[var(--zx-yellow)]"
            style={{ borderColor: "rgba(255,214,10,0.4)" }}
            onClick={() => setDonationOpen(true)}
            aria-haspopup="dialog"
            aria-controls="donation-dialog"
          >
            Donation
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="container-zx py-16">
        <div className="rounded-2xl border border-zx-green/35 bg-gradient-to-b from-zx-mid/40 to-transparent p-8 glow">
          <h3 className="text-2xl font-mono text-white">Ready to enter the grid?</h3>
          <p className="mt-2 text-zinc-300 max-w-xl">Play the MVP, give feedback, and help us shape the next levels.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/start"
              className="inline-flex items-center rounded-md bg-zx-green px-4 py-2 text-zx-ink hover:bg-zx-cyan transition-colors glow"
            >
              Play now
            </a>
            <a
              href="https://github.com/Soymaferlopezp/zyberquest"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-md border border-zx-green/35 px-4 py-2 text-white hover:border-zx-cyan/50 transition-colors"
            >
              View repo
            </a>
          </div>
        </div>
      </section>

      {/* DONATION MODAL */}
      {donationOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          onClick={closeDonation}
          aria-hidden
        />
      )}
      <motion.div
        id="donation-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="donation-title"
        aria-describedby="donation-desc"
        initial={{ opacity: 0, scale: 0.98, y: 8 }}
        animate={donationOpen ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.98, y: 8 }}
        className={`fixed inset-0 z-[101] grid place-items-center p-4 ${donationOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          className="w-full max-w-md rounded-xl border border-zx-green/35 bg-zx-mid/80 p-6 glow"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between">
            <h4 id="donation-title" className="font-mono text-white">
              Support ZyberQuest
            </h4>
            <button
              onClick={closeDonation}
              className="rounded-md p-1 text-zinc-300 hover:text-white border border-transparent hover:border-zx-green/30"
              aria-label="Close donation dialog"
            >
              <X className="size-4" />
            </button>
          </div>

          <p id="donation-desc" className="mt-2 text-sm text-zinc-300">
            We appreciate any support for the development of educational privacy tools. Tips help us ship features
            faster. Thank you! <span className="text-[var(--zx-yellow)]">💛</span>
          </p>

          {/* Wallet + QR */}
          <div className="mt-5 grid grid-cols-1 gap-4">
            <div>
              <p className="text-xs text-[var(--zx-yellow)]">Wallet address</p>
              <div className="mt-1 rounded-md border border-zx-green/25 bg-black/40 p-2 font-mono text-xs text-zinc-100 select-all break-all">
                {walletAddress || "zk-addr: (paste into walletAddress const)"}
              </div>
            </div>

            <div>
              <p className="text-xs text-zinc-400">Scan QR</p>
              <div className="mt-2 relative rounded-md border border-zx-green/25 bg-zx-ink/60 overflow-hidden">
                <Image
                  src={walletQrSrc}
                  alt="Donation wallet QR"
                  width={384}
                  height={384}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 justify-end">
            <Button
              variant="secondary"
              className="bg-transparent"
              style={{ borderColor: "rgba(255,255,255,0.25)" }}
              onClick={closeDonation}
            >
              Close
            </Button>
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(walletAddress);
                  alert("Wallet address copied to clipboard.");
                } catch {
                  alert("Could not copy. Please copy manually.");
                }
              }}
              className="inline-flex items-center rounded-md px-3 py-2 transition-colors text-[var(--zx-yellow)]"
              style={{ border: "1px solid rgba(255,214,10,0.4)" }}
              disabled={!walletAddress}
              aria-disabled={!walletAddress}
              title={!walletAddress ? "Set walletAddress in page.tsx" : "Copy address"}
            >
              Copy address
            </button>
          </div>
        </div>
      </motion.div>

      {/* FOOTER: RPC / LWD / Incoming */}
      <footer className="w-full border-t border-zx-green/25 bg-zx-mid/30">
        <div className="container-zx py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-sm">
          {/* Lado izquierdo: estado de red */}
          <div className="flex items-center gap-3">
            {/* dot dinámico */}
            {(() => {
              const now = Date.now();
              const live = updatedAt ? now - updatedAt < 70_000 : false;
              const pulsing = pulseUntil > now;
              const base = live ? "bg-[var(--zx-yellow)]" : "bg-zinc-500";
              const anim = pulsing ? "animate-pulse" : "";
              return (
                <span
                  className={`inline-block h-2 w-2 rounded-full ${base} ${anim}`}
                  aria-label={live ? "network ok" : "network idle"}
                />
              );
            })()}
            <span className="text-zinc-300">
              Height: <span className="font-mono">{height ?? "—"}</span>
            </span>
            <span className="text-zinc-300">
              Chain: <span className="font-mono">{chain ?? "—"}</span>
            </span>
          </div>

          {/* Lado derecho: LWD + último evento */}
          <div className="flex items-center gap-4">
            <span className="text-zinc-300">
              LWD: <span className="font-mono">{lwd ?? "—"}</span>
            </span>

            {/* Badge de “incoming” cuando detectamos un nuevo tx */}
            {lastTx && pulseUntil > Date.now() && (
              <span
                className="rounded-md px-2 py-1 text-[12px] font-mono"
                style={{ border: "1px solid rgba(255,214,10,0.5)", color: "var(--zx-yellow)" }}
                title={new Date(lastTx.when).toLocaleTimeString()}
              >
                Incoming +{(lastTx.amountZEC || 0).toFixed(3)} ZEC
              </span>
            )}

            <span className="text-zinc-500">
              {updatedAt
                ? new Date(updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                : "—"}
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
