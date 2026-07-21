'use client';

import { useStatus, useCurrentPrice } from '@/hooks/useZecData';
import { usePrivacyWeather, useFlowData } from '@/hooks/useFlowData';
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

function formatNumber(n: number): string {
  if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(2) + 'K';
  return n.toLocaleString();
}

function formatDifficulty(d: number): string {
  if (d >= 1e12) return (d / 1e12).toFixed(2) + 'T';
  if (d >= 1e9) return (d / 1e9).toFixed(2) + 'B';
  if (d >= 1e6) return (d / 1e6).toFixed(2) + 'M';
  return d.toLocaleString();
}

function conditionToColor(condition: string): string {
  switch (condition) {
    case 'excellent': return 'var(--accent-green)';
    case 'good': return '#00cc66';
    case 'fair': return 'var(--accent-gold)';
    case 'poor': return 'var(--accent-orange)';
    default: return 'var(--text-green)';
  }
}

export function NetworkData() {
  const { data, loading, error } = useStatus();
  const { price } = useCurrentPrice();
  const { weather } = usePrivacyWeather({ period: '1d' });
  const { data: flowData } = useFlowData({ range: '1m' });

  const pools = data?.pools;
  const height = data?.height ?? 0;
  const difficulty = data?.difficulty ?? 0;

  // Calculate privacy ops from flow data (30 day)
  const totalOps = flowData?.reduce((sum, d) => sum + d.operations.total, 0) ?? 0;

  const transparent = pools?.transparent ?? 0;
  const sprout = pools?.sprout ?? 0;
  const sapling = pools?.sapling ?? 0;
  const orchard = pools?.orchard ?? 0;
  const totalShielded = sprout + sapling + orchard;
  const totalSupply = transparent + totalShielded;
  const shieldedPct = totalSupply > 0 ? ((totalShielded / totalSupply) * 100).toFixed(1) : '0';

  const p = price ?? 0;
  const privacyScore = weather?.shieldWindow?.score ?? 0;
  const privacyCondition = weather?.shieldWindow?.condition ?? 'fair';

  if (loading && !data) {
    return <AppLoader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-[var(--accent-orange)]" style={{ fontSize: 'var(--font-size-label)' }}>
          {error}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-4 gap-4">
      {/* Top Row - Key Stats */}
      <div className="grid grid-cols-4 gap-4 p-3 rounded" style={{ background: 'var(--bg-inset)' }}>
        {/* Privacy Score */}
        <div className="flex flex-col items-center">
          <span className="text-[var(--text-muted)]" style={{ fontSize: 'var(--font-size-muted)' }}>
            Privacy Score
          </span>
          <span
            className="font-bold"
            style={{
              fontFamily: 'var(--font-vt323)',
              fontSize: 'var(--font-size-title)',
              color: conditionToColor(privacyCondition)
            }}
          >
            {privacyScore}
          </span>
        </div>

        {/* Shielded Pool */}
        <div className="flex flex-col items-center">
          <span className="text-[var(--text-muted)]" style={{ fontSize: 'var(--font-size-muted)' }}>
            Shielded Pool
          </span>
          <span
            className="text-[var(--accent-green)]"
            style={{ fontFamily: 'var(--font-vt323)', fontSize: 'var(--font-size-title)' }}
          >
            {formatZec(totalShielded)}
          </span>
        </div>

        {/* Privacy Ops */}
        <div className="flex flex-col items-center">
          <span className="text-[var(--text-muted)]" style={{ fontSize: 'var(--font-size-muted)' }}>
            Privacy Ops (30d)
          </span>
          <span
            className="text-[var(--accent-purple)]"
            style={{ fontFamily: 'var(--font-vt323)', fontSize: 'var(--font-size-title)' }}
          >
            {formatNumber(totalOps)}
          </span>
        </div>

        {/* Current Block */}
        <div className="flex flex-col items-center">
          <span className="text-[var(--text-muted)]" style={{ fontSize: 'var(--font-size-muted)' }}>
            Block Height
          </span>
          <span
            className="text-[var(--text-amber)]"
            style={{ fontFamily: 'var(--font-vt323)', fontSize: 'var(--font-size-title)' }}
          >
            {height.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="flex-1 grid grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="flex flex-col gap-3 p-3 rounded" style={{ background: 'var(--bg-inset)' }}>
          <h3 className="text-[var(--text-green)] border-b border-[var(--border-window)] pb-1"
              style={{ fontSize: 'var(--font-size-label)' }}>
            Network Stats
          </h3>

          <StatRow label="ZEC Price" value={formatUsd(p)} color="var(--accent-gold)" />
          <StatRow label="Block Height" value={height.toLocaleString()} color="var(--text-amber)" />
          <StatRow label="Difficulty" value={formatDifficulty(difficulty)} color="var(--accent-orange)" />
          <StatRow label="Total Supply" value={formatZec(totalSupply) + ' ZEC'} color="var(--text-green)" />
          <StatRow label="Privacy Ops" value={formatNumber(totalOps)} color="var(--accent-purple)" />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-3 p-3 rounded" style={{ background: 'var(--bg-inset)' }}>
          <h3 className="text-[var(--text-green)] border-b border-[var(--border-window)] pb-1"
              style={{ fontSize: 'var(--font-size-label)' }}>
            Pool Distribution
          </h3>

          <StatRow label="Transparent" value={formatZec(transparent)} color="var(--text-muted)" />
          <StatRow label="Total Shielded" value={formatZec(totalShielded)} color="var(--accent-green)" />
          <StatRow label="Shielded %" value={shieldedPct + '%'} color="var(--accent-green)" />

          <div className="border-t border-[var(--border-window)] pt-2 mt-1">
            <StatRow label="Sprout" value={formatZec(sprout)} color="var(--accent-purple)" small />
            <StatRow label="Sapling" value={formatZec(sapling)} color="var(--accent-gold)" small />
            <StatRow label="Orchard" value={formatZec(orchard)} color="var(--accent-green)" small />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatRow({
  label,
  value,
  color,
  small = false
}: {
  label: string;
  value: string;
  color: string;
  small?: boolean;
}) {
  return (
    <div className="flex justify-between items-center">
      <span
        className="text-[var(--text-muted)]"
        style={{ fontSize: small ? 'var(--font-size-muted)' : 'var(--font-size-button)' }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-vt323)',
          fontSize: small ? 'var(--font-size-label)' : 'var(--font-size-value)',
          color
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default NetworkData;
