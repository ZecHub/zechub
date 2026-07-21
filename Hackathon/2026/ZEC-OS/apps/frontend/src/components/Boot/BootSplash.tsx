'use client';

import { useState, useEffect, useCallback } from 'react';

const BOOT_DURATION_MS = 3000; // 3 seconds
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
const STORAGE_KEY = 'zec-os-last-boot';

export function BootSplash({ children }: { children: React.ReactNode }) {
  const [booting, setBooting] = useState(true);
  const [progress, setProgress] = useState(0);

  const shouldShowBoot = useCallback(() => {
    if (typeof window === 'undefined') return true;

    const lastBoot = localStorage.getItem(STORAGE_KEY);
    if (!lastBoot) return true;

    const lastBootTime = parseInt(lastBoot, 10);
    const elapsed = Date.now() - lastBootTime;
    return elapsed >= SESSION_TIMEOUT_MS;
  }, []);

  const finishBoot = useCallback(() => {
    setBooting(false);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
  }, []);

  useEffect(() => {
    // Check if we should show boot
    if (!shouldShowBoot()) {
      setBooting(false);
      return;
    }

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(p => Math.min(p + Math.random() * 15, 100));
    }, 200);

    // Auto finish after duration
    const bootTimeout = setTimeout(() => {
      setProgress(100);
      setTimeout(finishBoot, 300);
    }, BOOT_DURATION_MS);

    // Listen for Enter key to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        finishBoot();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(bootTimeout);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shouldShowBoot, finishBoot]);

  if (!booting) {
    return <>{children}</>;
  }

  return (
    <div className="h-screen w-screen bg-[var(--bg-desktop)] flex flex-col items-center justify-center">
      {/* ZEC Logo */}
      <img
        src="/zec-logo.svg"
        alt="ZEC-OS"
        className="w-32 h-32 mb-8"
        style={{ imageRendering: 'pixelated' }}
      />

      {/* Title */}
      <h1
        className="text-[var(--accent-gold)] mb-2"
        style={{ fontFamily: 'var(--font-press-start)', fontSize: '24px' }}
      >
        ZEC-OS
      </h1>

      <p className="text-[var(--text-green)] mb-1 text-lg">
        Initializing...
      </p>
      <p className="text-[var(--text-muted)] mb-8 text-xs font-mono">
        v{process.env.NEXT_PUBLIC_VERSION ?? '1.1.2'}
      </p>

      {/* Progress Bar */}
      <div className="w-64 h-4 border-2 border-[var(--border-window)] bg-[var(--bg-window)]">
        <div
          className="h-full bg-[var(--accent-gold)] transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Skip hint */}
      <p className="text-[var(--text-amber)] mt-8 text-sm opacity-70">
        Press ENTER to skip
      </p>
    </div>
  );
}
