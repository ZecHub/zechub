"use client";

import { useEffect, useState } from "react";

const STAGES = [
  "Connecting to lightwalletd…",
  "Restoring wallet from viewing key…",
  "Scanning compact blocks…",
  "Reading pool balances…",
];

export function ScanProgress({ birthday }: { birthday: number }) {
  const [stage, setStage] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const ticker = setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => clearInterval(ticker);
  }, []);

  useEffect(() => {
    if (stage >= STAGES.length - 1) return;
    const advance = setTimeout(() => setStage((value) => value + 1), 4000);
    return () => clearTimeout(advance);
  }, [stage]);

  return (
    <div className="rounded-2xl border border-border bg-surface p-8 md:p-10">
      <div className="mb-6 flex items-center gap-3">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
          Scanning
        </span>
        <span className="ml-auto font-mono text-[10px] tabular-nums tracking-widest text-faint">
          {String(Math.floor(elapsed / 60)).padStart(2, "0")}:
          {String(elapsed % 60).padStart(2, "0")}
        </span>
      </div>

      <ul className="flex flex-col gap-3">
        {STAGES.map((label, index) => (
          <li
            key={label}
            className={`flex items-center gap-3 font-mono text-xs ${
              index < stage
                ? "text-faint"
                : index === stage
                  ? "text-foreground"
                  : "text-border-strong"
            }`}
          >
            <span className="w-4 text-center">
              {index < stage ? "✓" : index === stage ? "›" : "·"}
            </span>
            {label}
          </li>
        ))}
      </ul>

      <p className="mt-8 border-t border-border pt-5 text-xs leading-relaxed text-faint">
        Scanning from block {birthday.toLocaleString("en-US")}. A deep scan can take a few minutes
        — the further back the birthday, the more blocks to walk. Your key never leaves memory.
      </p>
    </div>
  );
}
