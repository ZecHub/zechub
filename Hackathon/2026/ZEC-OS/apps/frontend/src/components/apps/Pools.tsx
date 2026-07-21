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

export function Pools() {
  const [showUsd, setShowUsd] = useState(false);
  const { data, loading, error } = useStatus();
  const { price } = useCurrentPrice();

  const pools = data?.pools;
  const sprout = pools?.sprout ?? 0;
  const sapling = pools?.sapling ?? 0;
  const orchard = pools?.orchard ?? 0;
  const p = price ?? 0;

  const format = (zec: number) => showUsd ? formatUsd(zec * p) : formatZec(zec);

  return (
    <div className="flex flex-col h-full justify-center items-center p-4">
      {loading && !data ? (
        <AppLoader />
      ) : error ? (
        <span className="text-[var(--accent-orange)]" style={{ fontSize: 'var(--font-size-label)' }}>Error</span>
      ) : (
        <div className="space-y-3 w-full">
          {/* Sprout */}
          <div className="flex justify-between items-center">
            <span className="text-[var(--accent-purple)]" style={{ fontSize: 'var(--font-size-label)' }}>
              Sprout
            </span>
            <span
              className="text-[var(--accent-purple)]"
              style={{ fontFamily: 'var(--font-vt323)', fontSize: 'var(--font-size-value)' }}
            >
              {format(sprout)}
            </span>
          </div>

          {/* Sapling */}
          <div className="flex justify-between items-center">
            <span className="text-[var(--accent-gold)]" style={{ fontSize: 'var(--font-size-label)' }}>
              Sapling
            </span>
            <span
              className="text-[var(--accent-gold)]"
              style={{ fontFamily: 'var(--font-vt323)', fontSize: 'var(--font-size-value)' }}
            >
              {format(sapling)}
            </span>
          </div>

          {/* Orchard */}
          <div className="flex justify-between items-center">
            <span className="text-[var(--accent-green)]" style={{ fontSize: 'var(--font-size-label)' }}>
              Orchard
            </span>
            <span
              className="text-[var(--accent-green)]"
              style={{ fontFamily: 'var(--font-vt323)', fontSize: 'var(--font-size-value)' }}
            >
              {format(orchard)}
            </span>
          </div>

          {/* Unit label - clickable toggle */}
          <div
            className="text-center text-[var(--text-green)] opacity-70 pt-2 cursor-pointer"
            style={{ fontSize: 'var(--font-size-button)' }}
            onClick={() => setShowUsd(!showUsd)}
            title="Click to toggle ZEC/USD"
          >
            {showUsd ? 'USD' : 'ZEC'}
          </div>
        </div>
      )}
    </div>
  );
}
