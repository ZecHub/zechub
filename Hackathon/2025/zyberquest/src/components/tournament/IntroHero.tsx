"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import Typing from "./Typing";
import InsertCoinButton from "./InsertCoinButton";

export default function IntroHero() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const ctaRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        router.push("/tournament/pay");
      } else if (e.key === "Escape") {
        e.preventDefault();
        router.push("/start");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  const focusCTA = () => setTimeout(() => ctaRef.current?.focus(), 10);

  return (
    <section className="relative isolate min-h-dvh grid place-items-center overflow-hidden bg-black text-white">
      {/* Fondo */}
      <CodeRain />
      <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen [background:repeating-linear-gradient(0deg,rgba(255,255,255,.06)_0_1px,transparent_1px_3px)]" />

      <div className="relative z-10 w-full max-w-3xl px-4 sm:px-6 text-center py-14 sm:py-16 md:py-20">
        <motion.h1
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(1.9rem,5.5vw,3.5rem)] md:text-6xl font-semibold leading-tight tracking-tight drop-shadow-[0_0_12px_rgba(236,72,153,0.55)]"
          style={{ textShadow: "0 0 16px rgba(236,72,153,.65), 0 0 32px rgba(236,72,153,.35)" }}
        >
          <span className="bg-gradient-to-r from-fuchsia-300 via-fuchsia-200 to-fuchsia-400 bg-clip-text text-transparent">
            ZyberQuest Tournament
          </span>
        </motion.h1>

        {/* Badge con typing */}
        <div className="mt-5">
          <div
            className="inline-flex items-center justify-center rounded-2xl border border-fuchsia-400/70
                       bg-fuchsia-500/10 px-4 py-3 text-fuchsia-100 shadow-[0_0_0_1px_rgba(236,72,153,0.18)_inset] backdrop-blur-[1px]"
            role="status"
            aria-live="polite"
          >
            <Typing
              steps={["Connecting wallet…", "Decrypting session…", "Ready."]}
              stepDelay={900}
              caret
              onComplete={focusCTA}
            />
          </div>
        </div>

        <div className="mt-10">
          <InsertCoinButton ref={ctaRef} />
        </div>
      </div>
    </section>
  );
}

/* CodeRain*/
function CodeRain() {
  return (
    <>
      <svg className="absolute inset-0 h-full w-full opacity-70" aria-hidden="true" role="img">
        <defs>
          <linearGradient id="zx-fg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(236,72,153,0.0)" />
            <stop offset="45%" stopColor="rgba(236,72,153,0.5)" />
            <stop offset="100%" stopColor="rgba(250,204,21,0.6)" />
          </linearGradient>
          <symbol id="digits" overflow="visible">
            <text
              x="0"
              y="0"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontSize="14"
              letterSpacing="0.08em"
              fill="url(#zx-fg)"
            >
              101100101101001011001011010010110010110100101100101101001
            </text>
          </symbol>
        </defs>

        {Array.from({ length: 22 }).map((_, i) => {
          const x = (i / 22) * 100;
          const delay = (i % 8) * 0.35;
          const dur = 3.5 + (i % 6) * 0.45;
          return (
            <g key={i} style={{ animation: `rainFall ${dur}s linear ${delay}s infinite` }}>
              <use href="#digits" x={`${x}%`} y="-5%" />
              <use href="#digits" x={`${x}%`} y="12%" />
              <use href="#digits" x={`${x}%`} y="29%" />
              <use href="#digits" x={`${x}%`} y="46%" />
              <use href="#digits" x={`${x}%`} y="63%" />
              <use href="#digits" x={`${x}%`} y="80%" />
            </g>
          );
        })}
      </svg>

      <style jsx>{`
        @keyframes rainFall { 0% { transform: translateY(-12%); opacity: 0.85; }
                               100% { transform: translateY(12%);  opacity: 0.85; } }
        @media (prefers-reduced-motion: reduce) {
          svg :global(g) { animation: none !important; }
        }
      `}</style>
    </>
  );
}
