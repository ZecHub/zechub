'use client';

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

export function TotalSupply() {
  const { data, loading, error } = useStatus();
  const { price } = useCurrentPrice();

  const pools = data?.pools;
  const transparent = pools?.transparent ?? 0;
  const sprout = pools?.sprout ?? 0;
  const sapling = pools?.sapling ?? 0;
  const orchard = pools?.orchard ?? 0;
  const totalZec = transparent + sprout + sapling + orchard;
  const totalUsd = price ? totalZec * price : null;

  return (
    <div className="flex flex-col h-full justify-center items-center p-4">
      {loading && !data ? (
        <AppLoader />
      ) : error ? (
        <span className="text-[var(--accent-orange)]" style={{ fontSize: 'var(--font-size-label)' }}>Error</span>
      ) : (
        <div className="text-center space-y-2">
          {/* ZEC Amount */}
          <div
            className="text-[var(--accent-gold)]"
            style={{ fontFamily: 'var(--font-vt323)', fontSize: 'var(--font-size-value)' }}
          >
            {formatZec(totalZec)}
          </div>
          <div className="text-[var(--text-green)]" style={{ fontSize: 'var(--font-size-label)' }}>
            ZEC
          </div>

          {/* USD Value */}
          {totalUsd !== null && (
            <>
              <div
                className="text-[var(--text-amber)] pt-2"
                style={{ fontFamily: 'var(--font-vt323)', fontSize: 'var(--font-size-label)' }}
              >
                {formatUsd(totalUsd)}
              </div>
              <div className="text-[var(--text-green)] opacity-70" style={{ fontSize: 'var(--font-size-button)' }}>
                USD
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
