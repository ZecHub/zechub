'use client';

import { useFlowData } from '@/hooks/useFlowData';
import { AppLoader } from '@/components/ui/AppLoader';

function formatNumber(num: number): string {
  if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
  return num.toLocaleString();
}

export function TotalTxs() {
  const { data, loading, error } = useFlowData({ range: '1m' });

  // Calculate total privacy operations from flow data
  const totalOps = data?.reduce((sum, d) => sum + d.operations.total, 0) ?? 0;
  const avgDailyOps = data && data.length > 0 ? Math.round(totalOps / data.length) : 0;

  return (
    <div className="flex flex-col h-full justify-center items-center p-4">
      {loading && !data ? (
        <AppLoader />
      ) : error ? (
        <span className="text-[var(--accent-orange)]" style={{ fontSize: 'var(--font-size-label)' }}>Error</span>
      ) : (
        <div className="text-center">
          <div
            className="text-[var(--accent-gold)]"
            style={{ fontFamily: 'var(--font-vt323)', fontSize: 'var(--font-size-value)' }}
          >
            {formatNumber(totalOps)}
          </div>
          <div className="text-[var(--text-green)] mt-1" style={{ fontSize: 'var(--font-size-label)' }}>
            Privacy Ops (30d)
          </div>
          <div className="text-[var(--text-amber)] mt-2 opacity-70" style={{ fontSize: 'var(--font-size-button)' }}>
            ~{formatNumber(avgDailyOps)}/day avg
          </div>
        </div>
      )}
    </div>
  );
}
