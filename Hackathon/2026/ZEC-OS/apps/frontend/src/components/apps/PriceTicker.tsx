'use client';

import { useCurrentPrice } from '@/hooks/useZecData';
import { useSound } from '@/hooks/useSound';
import { useIsAdmin } from '@/store/authStore';
import { AppLoader } from '@/components/ui/AppLoader';

export function PriceTicker() {
  const { price, loading, error, refetch } = useCurrentPrice();
  const { playClick } = useSound();
  const isAdmin = useIsAdmin();

  const handleRefresh = () => {
    playClick();
    refetch();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex items-center justify-center">
        {loading && !price ? (
          <AppLoader />
        ) : error ? (
          <span className="text-[var(--accent-orange)]" style={{ fontSize: 'var(--font-size-label)' }}>Error</span>
        ) : (
          <div className="text-center">
            <div
              className="text-[var(--accent-gold)]"
              style={{ fontFamily: 'var(--font-vt323)', fontSize: 'var(--font-size-value)' }}
            >
              ${price?.toFixed(2) ?? '—'}
            </div>
            <div className="text-[var(--text-green)] mt-1" style={{ fontSize: 'var(--font-size-label)' }}>
              USD
            </div>
          </div>
        )}
      </div>
      {isAdmin && (
        <button
          onClick={handleRefresh}
          className="
            btn-window self-end
            px-2 py-1
            text-[var(--text-amber)]
          "
          title="Refresh price"
        >
          ↻
        </button>
      )}
    </div>
  );
}
