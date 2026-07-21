'use client';

import { useStatus } from '@/hooks/useZecData';
import { AppLoader } from '@/components/ui/AppLoader';

export function ShieldedPercent() {
  const { data, loading, error } = useStatus();

  const pools = data?.pools;
  const transparent = pools?.transparent ?? 0;
  const sprout = pools?.sprout ?? 0;
  const sapling = pools?.sapling ?? 0;
  const orchard = pools?.orchard ?? 0;

  const totalZec = transparent + sprout + sapling + orchard;
  const shieldedZec = sprout + sapling + orchard;
  const shieldedPercent = totalZec > 0 ? (shieldedZec / totalZec) * 100 : 0;

  return (
    <div className="flex flex-col h-full justify-center items-center p-4">
      {loading && !data ? (
        <AppLoader />
      ) : error ? (
        <span className="text-[var(--accent-orange)]" style={{ fontSize: 'var(--font-size-label)' }}>Error</span>
      ) : (
        <div className="text-center">
          {/* Percentage */}
          <div
            className="text-[var(--accent-green)]"
            style={{ fontFamily: 'var(--font-vt323)', fontSize: 'var(--font-size-value)' }}
          >
            {shieldedPercent.toFixed(1)}%
          </div>
          <div className="text-[var(--text-green)] mt-1" style={{ fontSize: 'var(--font-size-label)' }}>
            Shielded
          </div>

          {/* Visual bar */}
          <div className="mt-4 w-full max-w-48 mx-auto">
            <div className="h-4 bg-[var(--bg-window)] border border-[var(--border-window)] rounded overflow-hidden">
              <div
                className="h-full bg-[var(--accent-green)] transition-all duration-500"
                style={{ width: `${shieldedPercent}%` }}
              />
            </div>
            <div className="flex justify-between mt-1 text-[var(--text-amber)] opacity-70" style={{ fontSize: 'var(--font-size-button)' }}>
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
