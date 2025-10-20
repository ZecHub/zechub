'use client';

import { useMemo } from 'react';

type Props = {
  blockHeight: number;
  etaSecondsPerBlock?: number;
  confirmations: number; // 0 -> 1
};

export default function NetworkBar({
  blockHeight,
  etaSecondsPerBlock = 75,
  confirmations,
}: Props) {
  const valueNow = Math.max(0, Math.min(1, confirmations));
  const pct = useMemo(() => `${valueNow * 100}%`, [valueNow]);

  return (
    <div
      className="space-y-1"
      role="status"
      aria-live="polite"
      aria-label="Network status and confirmations"
    >
      <div className="flex items-center justify-between text-xs text-zinc-400">
        <span>Block height</span>
        <span className="font-mono">{blockHeight || 0}</span>
      </div>
      <div className="flex items-center justify-between text-xs text-zinc-400">
        <span>ETA</span>
        <span className="font-mono">~{etaSecondsPerBlock}s / block</span>
      </div>

      <div
        className="mt-2 h-2 w-full overflow-hidden rounded-full border border-zinc-800 bg-zinc-900"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={1}
        aria-valuenow={valueNow}
        aria-label="Confirmations progress"
      >
        <div
          className="h-full bg-emerald-500 transition-[width] duration-700 motion-reduce:transition-none"
          style={{ width: pct }}
        />
      </div>

      <p className="text-xs text-zinc-400">
        Confirmations: <span className="font-mono">{valueNow}/1</span>
      </p>
    </div>
  );
}
