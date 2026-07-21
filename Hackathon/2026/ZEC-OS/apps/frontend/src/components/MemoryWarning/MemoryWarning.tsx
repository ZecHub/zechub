'use client';

import { useMemoryMonitor } from '@/hooks/useMemoryMonitor';
import { useSound } from '@/hooks/useSound';
import { useEffect, useRef } from 'react';

export function MemoryWarning() {
  const { usedMB, showWarning, dismissWarning } = useMemoryMonitor();
  const { playError } = useSound();
  const hasPlayedSound = useRef(false);

  useEffect(() => {
    if (showWarning && !hasPlayedSound.current) {
      playError();
      hasPlayedSound.current = true;
    }
    if (!showWarning) {
      hasPlayedSound.current = false;
    }
  }, [showWarning, playError]);

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50">
      <div
        className="
          bg-[var(--bg-window)]
          window-border
          max-w-sm
          animate-pulse
        "
      >
        {/* Title Bar */}
        <div className="titlebar px-3 py-2 flex items-center gap-2">
          <span className="text-[var(--accent-orange)]">⚠</span>
          <span
            className="text-[var(--accent-orange)]"
            style={{ fontFamily: 'var(--font-press-start)', fontSize: 'var(--font-size-title)' }}
          >
            SYSTEM WARNING
          </span>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <div className="text-[var(--accent-orange)] mb-4" style={{ fontSize: 'var(--font-size-value)' }}>
            Low Memory
          </div>
          <div className="text-[var(--text-green)] mb-2" style={{ fontSize: 'var(--font-size-label)' }}>
            Memory usage: {usedMB}MB
          </div>
          <div className="text-[var(--text-amber)] mb-6" style={{ fontSize: 'var(--font-size-button)' }}>
            Close some windows to free up resources.
          </div>
          <button
            onClick={dismissWarning}
            className="btn-window px-6 py-2 text-[var(--text-green)]"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
