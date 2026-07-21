'use client';

import { useStatus } from '@/hooks/useZecData';
import { AppLoader } from '@/components/ui/AppLoader';

function formatDifficulty(diff: number): string {
  if (diff >= 1e9) return (diff / 1e9).toFixed(2) + 'B';
  if (diff >= 1e6) return (diff / 1e6).toFixed(2) + 'M';
  if (diff >= 1e3) return (diff / 1e3).toFixed(2) + 'K';
  return diff.toFixed(2);
}

export function Difficulty() {
  const { data, loading, error } = useStatus();

  const difficulty = data?.difficulty;

  return (
    <div className="flex flex-col h-full justify-center items-center">
      {loading && !data ? (
        <AppLoader />
      ) : error ? (
        <span className="text-[var(--accent-orange)]" style={{ fontSize: 'var(--font-size-label)' }}>Error</span>
      ) : (
        <>
          <div
            className="text-[var(--accent-purple)]"
            style={{ fontFamily: 'var(--font-vt323)', fontSize: 'var(--font-size-value)' }}
          >
            {difficulty ? formatDifficulty(difficulty) : '—'}
          </div>
          <div className="text-[var(--text-green)] mt-1" style={{ fontSize: 'var(--font-size-label)' }}>
            Network Difficulty
          </div>
        </>
      )}
    </div>
  );
}
