'use client';

import { useState } from 'react';
import { useStatus, useCurrentPrice } from '@/hooks/useZecData';
import { AppLoader } from '@/components/ui/AppLoader';

function formatZec(amount: number): string {
  if (amount >= 1e6) return (amount / 1e6).toFixed(2) + 'M';
  if (amount >= 1e3) return (amount / 1e3).toFixed(2) + 'K';
  return amount.toFixed(2);
}

function formatUsd(amount: number): string {
  if (amount >= 1e9) return '$' + (amount / 1e9).toFixed(2) + 'B';
  if (amount >= 1e6) return '$' + (amount / 1e6).toFixed(2) + 'M';
  if (amount >= 1e3) return '$' + (amount / 1e3).toFixed(2) + 'K';
  return '$' + amount.toFixed(2);
}

export function ShieldedPool() {
  const [showUsd, setShowUsd] = useState(false);
  const { data, loading, error } = useStatus();
  const { price } = useCurrentPrice();

  const pools = data?.pools;
  const sprout = pools?.sprout ?? 0;
  const sapling = pools?.sapling ?? 0;
  const orchard = pools?.orchard ?? 0;
  const total = sprout + sapling + orchard;
  const usdValue = total * (price ?? 0);

  return (
    <div className="flex flex-col h-full justify-center items-center">
      {loading && !data ? (
        <AppLoader />
      ) : error ? (
        <span className="text-[var(--accent-orange)]" style={{ fontSize: 'var(--font-size-label)' }}>Error</span>
      ) : (
        <>
          <div
            className="text-[var(--accent-green)] cursor-pointer"
            style={{ fontFamily: 'var(--font-vt323)', fontSize: 'var(--font-size-value)' }}
            onClick={() => setShowUsd(!showUsd)}
            title="Click to toggle ZEC/USD"
          >
            {showUsd ? formatUsd(usdValue) : formatZec(total)}
          </div>
          <div className="text-[var(--text-green)] mt-1" style={{ fontSize: 'var(--font-size-label)' }}>
            {showUsd ? 'USD' : 'ZEC'} (Shielded)
          </div>
          <div className="text-[var(--text-amber)] mt-2 opacity-70" style={{ fontSize: 'var(--font-size-button)' }}>
            S:{formatZec(sprout)} | Sa:{formatZec(sapling)} | O:{formatZec(orchard)}
          </div>
        </>
      )}
    </div>
  );
}
