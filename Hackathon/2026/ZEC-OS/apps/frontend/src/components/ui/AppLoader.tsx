'use client';

import { useState } from 'react';

export const LOADING_MESSAGES = [
  'shielding the goods…',
  'asking zebra nicely…',
  'unrolling the blockchain…',
  'counting zatoshis…',
  'proving we know nothing…',       // zero-knowledge
  'verifying without revealing…',
  'peeking into the mempool…',
  'warming up the orchard…',
  'shaking the sapling…',
  'consulting the dark forest…',
  'zk-SNARKing about…',
  'decrypting absolutely nothing…',
  'herding blocks…',
  'polling the chain oracle…',
  'brewing fresh blocks…',
  'waking the indexer…',
  'privacy takes a second…',
  'sprouting results…',
  'digging through the pools…',
  'trust the process (trustlessly)…',
] as const;

function randomMessage() {
  return LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];
}

export function AppLoader({ label }: { label?: string }) {
  const [msg] = useState(() => label ?? randomMessage());
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 font-mono select-none">
      <div className="flex gap-1.5 text-2xl">
        <span className="text-[var(--accent-gold)] animate-pulse [animation-delay:0ms]">▓</span>
        <span className="text-[var(--accent-gold)] animate-pulse [animation-delay:200ms]">▒</span>
        <span className="text-[var(--accent-gold)] animate-pulse [animation-delay:400ms]">░</span>
      </div>
      <span
        className="text-[var(--text-amber)] text-xs uppercase tracking-widest animate-pulse text-center px-4"
        suppressHydrationWarning
      >
        {msg}
      </span>
    </div>
  );
}
