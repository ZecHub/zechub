'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

// ===================== Config =====================
const RUNNERS = [
  {
    id: 'alpha',
    name: 'Runner Alpha',
    img: '/runner/runner-f.png',
    width: 380,
    height: 380,
    accent: '#FFD60A',
  },
  {
    id: 'beta',
    name: 'Runner Beta',
    img: '/runner/runner-m.png',
    width: 380,
    height: 380,
    accent: '#00E5FF',
  },
] as const;

type Mode = {
  title: string;
  href: string;
  desc: string;
  accent: string;
  badge: string;
  meta: string;
  iconPath: string;
};

const MODES: Mode[] = [
  {
    title: 'Educational trivia',
    href: '/trivias',
    desc: 'Answer questions about the Zcash ecosystem with explanatory tooltips.',
    accent: '#FFD60A',
    badge: 'Beginner • 4–6 min',
    meta: 'Single-player',
    iconPath: 'M3 5h18v2H3zM5 9h14v2H5zM7 13h10v2H7zM9 17h6v2H9z',
  },
  {
    title: 'Exploration mazes',
    href: '/laberintos',
    desc: 'Explore nodes, collect keys, and unlock conceptual doors in ZK.',
    accent: '#00FF9C',
    badge: 'Intermediate • 6–10 min',
    meta: 'Keyboard / WASD',
    iconPath: 'M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z',
  },
  {
    title: 'Decryption simulators',
    href: '/simulators',
    desc: 'Break codes (visual XOR) against the clock.',
    accent: '#FF3DBE',
    badge: 'Advanced • 5–8 min',
    meta: 'Timed challenges',
    iconPath: 'M12 1a5 5 0 015 5v3h1a3 3 0 013 3v7a3 3 0 01-3 3H6a3 3 0 01-3-3v-7a3 3 0 013-3h1V6a5 5 0 015-5zm0 2a3 3 0 00-3 3v3h6V6a3 3 0 00-3-3z',
  },
];

const STORAGE_KEY = 'zq-runner';

// ===================== Página =====================
export default function MenuPage() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const rm = !!reduce;

  // Selección de Runner
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<boolean>(false);

  // Hidratar desde localStorage si ya eligió antes
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setSelected(raw);
        setConfirmed(true);
      }
    } catch {}
  }, []);

  const confirmRunner = () => {
    if (!selected) return;
    try {
      localStorage.setItem(STORAGE_KEY, selected);
    } catch {}
    setConfirmed(true);
  };

  const clearRunner = () => {
    setConfirmed(false);
    setSelected(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    const first = document.querySelector<HTMLButtonElement>('[data-runner="alpha"]');
    first?.focus();
  };

  // Atajos SOLO para selección de runner:
  // 1/2 seleccionan runner; Enter confirma; (se elimina Escape)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '1') setSelected(RUNNERS[0].id);
      else if (e.key === '2') setSelected(RUNNERS[1].id);
      else if (e.key === 'Enter') {
        if (!confirmed && selected) confirmRunner();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [confirmed, selected]);

  const activeRunner = useMemo(
    () => RUNNERS.find(r => r.id === selected) ?? null,
    [selected]
  );

  // ======= Animations (variants) =======
  const containerV = rm
    ? ({ hidden: { opacity: 1 }, show: { opacity: 1 } } as any)
    : ({
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.08, delayChildren: 0.1 },
        },
      } as any);

  const fadeUpV = rm
    ? ({ hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } } as any)
    : ({
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
      } as any);

  const fadeDownV = rm
    ? ({ hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } } as any)
    : ({
        hidden: { opacity: 0, y: -8 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
      } as any);

  const slideLeftV = rm
    ? ({ hidden: { opacity: 1, x: 0 }, show: { opacity: 1, x: 0 } } as any)
    : ({
        hidden: { opacity: 0, x: -14 },
        show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      } as any);

  const slideRightV = rm
    ? ({ hidden: { opacity: 1, x: 0 }, show: { opacity: 1, x: 0 } } as any)
    : ({
        hidden: { opacity: 0, x: 14 },
        show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      } as any);

  return (
    <main className="relative min-h-dvh bg-black text-neutral-200">
      {/* Fondo sutil */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(1200px 600px at 50% -10%, #00E5FF0f, transparent 60%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(transparent 31px, rgba(255,255,255,0.6) 32px), linear-gradient(90deg, transparent 31px, rgba(255,255,255,0.6) 32px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <motion.section
        className="relative mx-auto max-w-6xl px-6 py-12"
        variants={containerV}
        initial="hidden"
        animate="show"
      >
        {/* Hero */}
        <motion.header className="mb-6 text-center" variants={fadeDownV}>
          {/* Se eliminó: "ZYBERQUEST / MENU" */}
          <h1 className="font-['IBM_Plex_Mono',monospace] text-4xl md:text-5xl text-[#00E5FF]">
            Choose your Runner
          </h1>
          <p className="mt-2 text-sm text-neutral-400 max-w-2xl mx-auto">
            Pick your avatar to start. Then choose a mission.
          </p>
        </motion.header>

        {/* ---------- Runner Select ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6 mb-10">
          {/* Left Runner */}
          <motion.div variants={slideLeftV}>
            <RunnerCard
              runner={RUNNERS[0]}
              selected={selected === RUNNERS[0].id}
              onSelect={() => setSelected(RUNNERS[0].id)}
              reduce={rm}
            />
          </motion.div>

          {/* Middle label + status/controls */}
          <motion.div className="mx-auto text-center" variants={fadeUpV}>
            <div className="font-['IBM_Plex_Mono',monospace] text-neutral-400 text-xs tracking-widest">
              SELECT / CHOOSE
            </div>

            <div className="mt-3 flex items-center justify-center gap-3">
              {confirmed && activeRunner ? (
                <StatusChip text={`Runner Active: ${activeRunner.name}`} color={activeRunner.accent} />
              ) : (
                <>
                  <button
                    type="button"
                    onClick={confirmRunner}
                    disabled={!selected}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-['IBM_Plex_Mono',monospace] 
                      ${selected ? 'border-[#FFD60A]/60 bg-[#FFD60A]/10 text-[#FFD60A] hover:bg-[#FFD60A]/15' : 'border-white/10 text-neutral-500 cursor-not-allowed'}
                    `}
                  >
                    Confirm Runner (Enter)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    disabled={!selected}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-['IBM_Plex_Mono',monospace] 
                      ${selected ? 'border-white/15 bg-black/40 text-neutral-200 hover:bg-black/60' : 'border-white/10 text-neutral-500 cursor-not-allowed'}
                    `}
                  >
                    Clear
                  </button>
                </>
              )}
            </div>

            {/* Helpers */}
            <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-neutral-400">
              <span className="rounded-lg border border-white/15 bg-black/50 px-2 py-0.5">1 / 2 to select</span>
              <span className="rounded-lg border border-white/15 bg-black/50 px-2 py-0.5">Enter to confirm</span>
              {/* Reemplazamos "Esc to return" por botón Change Runner (click) */}
              {confirmed ? (
                <button
                  type="button"
                  onClick={clearRunner}
                  className="rounded-lg border border-white/15 bg-black/50 px-2 py-0.5 hover:bg-black/60 text-neutral-100"
                >
                  Change Runner
                </button>
              ) : null}
            </div>
          </motion.div>

          {/* Right Runner */}
          <motion.div variants={slideRightV}>
            <RunnerCard
              runner={RUNNERS[1]}
              selected={selected === RUNNERS[1].id}
              onSelect={() => setSelected(RUNNERS[1].id)}
              reduce={rm}
            />
          </motion.div>
        </div>

        {/* ---------- Modes Grid ---------- */}
        <h2 className="sr-only">Choose your mission</h2>
        <motion.div className="grid gap-6 md:grid-cols-3" variants={containerV}>
          {MODES.map((m, idx) => (
            <motion.div key={m.href} variants={fadeUpV} transition={{ delay: rm ? 0 : 0.05 * idx }}>
              <ModeCard
                mode={m}
                disabled={!confirmed}
                onRequireRunner={() => {
                  document.getElementById('runner-select')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Capsule / footer controls */}
        <motion.div
          id="runner-select"
          className="mt-10 grid gap-4 md:grid-cols-[1fr_auto] items-center"
          variants={fadeUpV}
        >
          <div
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4 shadow-[0_0_24px_rgba(0,255,156,0.08)]"
            aria-live="polite"
            aria-atomic="true"
          >
            <p className="text-sm text-neutral-200">
              <span className="mr-2 rounded-md border border-[#00FF9C]/30 bg-[#00FF9C]/10 px-2 py-0.5 text-[11px] text-[#00FF9C]">
                Capsule
              </span>
              Zero-knowledge proofs let you prove you know a secret without revealing the secret itself.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-start md:justify-end gap-3 text-xs">
            <Link
              href="/intro"
              className="rounded-lg border border-white/15 bg-black/40 px-3 py-1.5 text-neutral-100 hover:bg-black/60"
            >
              ← Return
            </Link>
            
          </div>
        </motion.div>
      </motion.section>
    </main>
  );
}

// ===================== UI bits (in-file) =====================

function RunnerCard({
  runner,
  selected,
  onSelect,
  reduce,
}: {
  runner: typeof RUNNERS[number];
  selected: boolean;
  onSelect: () => void;
  reduce: boolean; // bool ya booleado con !!reduce
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      data-runner={runner.id}
      className={`relative rounded-2xl border p-4 bg-white/[0.02] border-white/10
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] mx-auto
        ${selected ? '' : 'hover:bg-white/[0.04]'}
      `}
      style={{
        boxShadow: selected
          ? `0 0 0 1px rgba(255,255,255,0.06), 0 0 32px ${runner.accent}33, inset 0 0 0 1px ${runner.accent}66`
          : `0 0 0 1px rgba(255,255,255,0.03)`,
      }}
      aria-pressed={selected}
    >
      <motion.div
        initial={false}
        animate={reduce ? {} : (selected ? { scale: 1.02 } : { scale: 1 })}
        whileHover={reduce ? undefined : { scale: selected ? 1.03 : 1.02 }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        className="relative"
      >
        <Image
          src={runner.img}
          alt={runner.name}
          width={runner.width}
          height={runner.height}
          priority
          className="select-none pointer-events-none"
          style={{
            filter: selected
              ? `drop-shadow(0 0 28px ${runner.accent}40) drop-shadow(0 0 48px rgba(0,229,255,0.12))`
              : 'none',
          }}
        />
      </motion.div>
      <div className="mt-2 text-center">
        <div className="font-['IBM_Plex_Mono',monospace]" style={{ color: runner.accent }}>
          {runner.name}
        </div>
        <div className="text-xs text-neutral-400">{selected ? 'Selected' : 'Click to select'}</div>
      </div>
    </button>
  );
}

function StatusChip({ text, color }: { text: string; color: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs"
      style={{
        borderColor: `${color}99`,
        color,
        backgroundColor: `${color}1A`,
        boxShadow: `0 0 22px ${color}33`,
      }}
    >
      <span aria-hidden className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      <span className="font-['IBM_Plex_Mono',monospace]">{text}</span>
    </div>
  );
}

function ModeCard({
  mode,
  disabled,
  onRequireRunner,
}: {
  mode: Mode;
  disabled: boolean;
  onRequireRunner: () => void;
}) {
  const CardInner = (
    <div
      className={`group relative rounded-2xl border p-5 bg-white/[0.02] 
        border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]
        ${disabled ? 'opacity-60' : 'hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)]'}
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]
      `}
      style={{
        boxShadow: `0 0 0 1px rgba(255,255,255,0.02), 0 0 24px ${mode.accent}22`,
      }}
      tabIndex={-1}
    >
      {/* Glow/borde por acento */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ boxShadow: `inset 0 0 0 1px ${mode.accent}44` }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
        style={{ boxShadow: `0 12px 40px ${mode.accent}3d, inset 0 0 0 1px ${mode.accent}66` }}
      />

      <div className="flex items-start gap-3">
        <div className="mt-0.5 h-9 w-9 shrink-0 rounded-lg border border-white/10 bg-black/40 flex items-center justify-center text-neutral-100">
          <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-90">
            <path d={mode.iconPath} fill="currentColor" />
          </svg>
        </div>
        <div className="min-w-0">
          <h3 className="font-['IBM_Plex_Mono',monospace] text-xl mb-1" style={{ color: mode.accent }}>
            {mode.title}
          </h3>
          <p className="text-sm text-neutral-300">{mode.desc}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span
              className="rounded-md border border-white/15 bg-black/40 px-2 py-0.5 text-neutral-100"
              style={{ boxShadow: `0 0 12px ${mode.accent}22` }}
            >
              {mode.badge}
            </span>
            <span className="text-neutral-400">{mode.meta}</span>
          </div>
        </div>
      </div>

      {/* Footer simple: solo CTA visual, sin “Press ENTER” ni “Shortcut” */}
      <div className="mt-4 flex items-center">
        <span
          role="button"
          aria-hidden
          className={`ml-auto rounded-lg border px-3 py-1.5 text-xs ${
            disabled
              ? 'border-white/15 bg-black/30 text-neutral-400'
              : 'border-white/15 bg-black/40 text-neutral-100 group-hover:bg-black/60'
          }`}
        >
          Start
        </span>
      </div>

      {disabled && (
        <div className="absolute inset-0 grid place-items-center rounded-2xl bg-black/30 backdrop-blur-[1px]">
          <div className="rounded-md border border-white/15 bg-black/60 px-3 py-1.5 text-xs text-neutral-200">
            Select & confirm a Runner first
          </div>
        </div>
      )}
    </div>
  );

  if (disabled) {
    return (
      <button type="button" onClick={onRequireRunner} className="block w-full text-left" aria-disabled="true">
        {CardInner}
      </button>
    );
  }

  return (
    <Link href={mode.href} aria-label={`Open ${mode.title}`} className="block">
      {CardInner}
    </Link>
  );
}
