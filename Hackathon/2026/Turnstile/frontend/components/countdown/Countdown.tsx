"use client";

import { useEffect, useState } from "react";

import { formatCountdown } from "@/lib/format";

export function Countdown({ secondsRemaining }: { secondsRemaining: number }) {
  const [remaining, setRemaining] = useState(secondsRemaining);

  useEffect(() => {
    const deadline = Date.now() + secondsRemaining * 1000;

    const tick = () =>
      setRemaining(Math.max(0, Math.round((deadline - Date.now()) / 1000)));

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [secondsRemaining]);

  const { days, hours, minutes, seconds } = formatCountdown(remaining);

  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
      <Unit value={days} label="Days" />
      <Unit value={hours} label="Hours" />
      <Unit value={minutes} label="Minutes" />
      <Unit value={seconds} label="Seconds" accent />
    </div>
  );
}

function Unit({ value, label, accent }: { value: number; label: string; accent?: boolean }) {
  return (
    <div className="flex cursor-default flex-col items-center gap-2 bg-surface px-6 py-8">
      <span
        className={`font-mono text-4xl font-bold tabular-nums tracking-tighter md:text-6xl ${
          accent ? "text-accent" : "text-foreground"
        }`}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-widest text-faint">{label}</span>
    </div>
  );
}
