'use client';

import { ControlsHintProps } from './types';
import { useAudio } from './audio';
import React from 'react';

function Chip({
  children,
  title,
  className = '',
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
}) {
  return (
    <span
      title={title}
      className={`inline-flex items-center gap-1 rounded-lg border border-white/15 bg-black/50 px-2.5 py-1 text-xs text-neutral-100 shadow-[0_0_18px_rgba(0,229,255,0.12)] ${className}`}
    >
      {children}
    </span>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-[11px] font-mono text-neutral-100 border border-white/15">
      {children}
    </kbd>
  );
}

export default function ControlsHint({
  showEnter = true,
  showMute = true,
  showEsc = true,
  className = '',
}: ControlsHintProps) {
  const { muted } = useAudio();

  return (
    <div
      data-testid="zq-controls"
      className={`flex flex-wrap items-center justify-center gap-3 text-neutral-200 ${className}`}
      aria-label="Atajos de teclado"
    >
      {showEnter && (
        <Chip>
          <Kbd>Enter</Kbd> Play
        </Chip>
      )}
      {showMute && (
        <Chip title="Persistente entre sesiones">
          <Kbd>M</Kbd> {muted ? 'Mute' : 'Sound On'}
        </Chip>
      )}
      {showEsc && (
        <Chip>
          <Kbd>Esc</Kbd> Skip intro
        </Chip>
      )}
    </div>
  );
}
