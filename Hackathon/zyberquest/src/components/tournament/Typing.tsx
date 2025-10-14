// components/Tournament/Typing.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

type TypingProps = {
  steps: string[];
  stepDelay?: number;
  caret?: boolean;
  onComplete?: () => void; // 🔹 nuevo
};

export default function Typing({
  steps,
  stepDelay = 800,
  caret = false,
  onComplete,
}: TypingProps) {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(prefersReducedMotion ? steps.length : 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }
    if (index >= steps.length) {
      onComplete?.();
      return;
    }
    const t = setTimeout(() => setIndex((i) => i + 1), stepDelay);
    return () => clearTimeout(t);
  }, [index, stepDelay, steps.length, prefersReducedMotion, onComplete]);

  const text = useMemo(() => steps.slice(0, index).join(" "), [steps, index]);

  return (
    <div
      className="mx-auto max-w-xl font-mono text-sm md:text-base text-zinc-300"
      aria-live="polite"
    >
      <span>{text}</span>
      {caret && (
        <span className="inline-block w-[0.6ch] translate-y-[1px]" aria-hidden="true">
          <Blink>▍</Blink>
        </span>
      )}
    </div>
  );
}

function Blink({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span className="opacity-80">{children}</span>
      <style jsx>{`
        span { animation: blink 1.1s steps(2, start) infinite; }
        @keyframes blink { to { visibility: hidden; } }
        @media (prefers-reduced-motion: reduce) { span { animation: none; } }
      `}</style>
    </>
  );
}
