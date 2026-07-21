"use client";

import { useMemo } from "react";

const COLORS = ["#00e676", "#2979ff", "#ffd600", "#ff2d55", "#f0f0f5"];

interface ConfettiProps {
  pieces?: number;
}

/** Lightweight CSS-only confetti burst — no external deps. */
export default function Confetti({ pieces = 60 }: ConfettiProps) {
  const items = useMemo(
    () =>
      Array.from({ length: pieces }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 2.2 + Math.random() * 1.4,
        drift: (Math.random() - 0.5) * 220,
        spin: 360 + Math.random() * 720 * (Math.random() > 0.5 ? 1 : -1),
        color: COLORS[i % COLORS.length],
        size: 6 + Math.random() * 6,
        rounded: Math.random() > 0.5,
      })),
    [pieces]
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[300] overflow-hidden">
      {items.map((c) => (
        <span
          key={c.id}
          className="absolute top-0"
          style={{
            left: `${c.left}%`,
            width: c.size,
            height: c.size * 1.6,
            backgroundColor: c.color,
            borderRadius: c.rounded ? "50%" : "2px",
            animation: `bluff-confetti-fall ${c.duration}s ease-in ${c.delay}s forwards`,
            ["--confetti-drift" as string]: `${c.drift}px`,
            ["--confetti-spin" as string]: `${c.spin}deg`,
          }}
        />
      ))}
    </div>
  );
}
