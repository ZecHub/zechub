"use client";

import { useEffect, useState } from "react";

interface Props {
  /** Unix epoch ms. */
  ts: number;
  /** Refresh interval in ms while the component is mounted. Default 30s. */
  intervalMs?: number;
  /** Optional className applied to the wrapper span. */
  className?: string;
}

/** Hydration-safe relative time. Renders absolute date until mount, then "Xs ago". */
export function RelativeTime({ ts, intervalMs = 30_000, className }: Props) {
  const [mounted, setMounted] = useState(false);
  const [, setTick] = useState(0);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setTick((n) => n + 1), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);

  const absolute = new Date(ts).toLocaleString();
  const text = mounted ? formatRelative(ts) : absolute;

  return (
    <span className={className} title={absolute} suppressHydrationWarning>
      {text}
    </span>
  );
}

function formatRelative(ts: number): string {
  const sec = Math.max(0, Math.floor((Date.now() - ts) / 1000));
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  return `${day}d ago`;
}
