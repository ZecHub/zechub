'use client';

import { useChainData } from '@/hooks/useZecData';
import { AppLoader } from '@/components/ui/AppLoader';

const BLOSSOM_HEIGHT    = 653_600;
const FIRST_HALVING     = 2_726_400;
const HALVING_INTERVAL  = 1_680_000;
const BLOCK_TIME_S      = 75;
const MAX_SUPPLY        = 21_000_000;

function rewardAt(height: number): number {
  if (height < BLOSSOM_HEIGHT)  return 12.5;
  let reward = 3.125;
  let halvingHeight = FIRST_HALVING;
  while (height >= halvingHeight) {
    reward /= 2;
    halvingHeight += HALVING_INTERVAL;
  }
  return reward;
}

function nextHalvingHeight(height: number): number {
  if (height < FIRST_HALVING) return FIRST_HALVING;
  const era = Math.floor((height - FIRST_HALVING) / HALVING_INTERVAL);
  return FIRST_HALVING + (era + 1) * HALVING_INTERVAL;
}

function eraStart(height: number): number {
  if (height < FIRST_HALVING) return BLOSSOM_HEIGHT;
  const era = Math.floor((height - FIRST_HALVING) / HALVING_INTERVAL);
  return FIRST_HALVING + era * HALVING_INTERVAL;
}

// Rough ZEC issued estimate — uses block reward schedule math
function estimateIssued(height: number): number {
  // Slow start (0-20000): averaged ~6.25 ZEC over the ramp
  const slowStartIssued = 20_000 * 6.25;
  // Pre-Blossom (20001-653600): 12.5 ZEC each
  const preBlossomIssued = (BLOSSOM_HEIGHT - 20_000) * 12.5;
  // Blossom era (653601-2726400): 3.125 ZEC each
  const blossomEraBlocks = Math.min(height, FIRST_HALVING) - BLOSSOM_HEIGHT;
  const blossomIssued = Math.max(0, blossomEraBlocks) * 3.125;
  // Post-first-halving
  let postHalvingIssued = 0;
  if (height > FIRST_HALVING) {
    let h = FIRST_HALVING;
    let reward = 1.5625;
    while (h < height) {
      const nextH = h + HALVING_INTERVAL;
      const blocks = Math.min(height, nextH) - h;
      postHalvingIssued += blocks * reward;
      reward /= 2;
      h = nextH;
    }
  }
  return slowStartIssued + preBlossomIssued + blossomIssued + postHalvingIssued;
}

function estimateDate(blocksAway: number): string {
  const ms = blocksAway * BLOCK_TIME_S * 1000;
  const d = new Date(Date.now() + ms);
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function ProgressBar({ pct, color = 'var(--accent-gold)' }: { pct: number; color?: string }) {
  return (
    <div className="w-full h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, pct)}%`, background: color }} />
    </div>
  );
}

function Row({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="border border-[var(--border-window)] p-3 bg-[var(--bg-window)]">
      <div className="text-[var(--text-amber)] text-xs uppercase tracking-wide mb-1">{label}</div>
      <div className="text-[var(--text-green)] font-bold text-sm">{value}</div>
      {sub && <div className="text-[var(--text-muted)] text-xs mt-0.5">{sub}</div>}
    </div>
  );
}

export default function HalvingWidget({ windowId: _windowId }: { windowId?: string }) {
  const { data, loading } = useChainData(30_000);
  const height = data?.height ?? 0;

  if (loading && !height) {
    return <AppLoader />;
  }

  const reward       = rewardAt(height);
  const nextHalving  = nextHalvingHeight(height);
  const blocksLeft   = nextHalving - height;
  const eraBegin     = eraStart(height);
  const eraLen       = height < FIRST_HALVING ? (FIRST_HALVING - BLOSSOM_HEIGHT) : HALVING_INTERVAL;
  const eraPct       = ((height - eraBegin) / eraLen) * 100;
  const issued       = estimateIssued(height);
  const issuedPct    = (issued / MAX_SUPPLY) * 100;

  return (
    <div className="flex flex-col h-full bg-[var(--bg-window)] p-3 font-mono text-sm overflow-y-auto gap-3">
      <div className="text-[var(--accent-gold)] text-xl font-bold tracking-tight">Halving Countdown</div>

      {/* Current height */}
      <div className="border border-[var(--accent-gold)]/30 bg-[var(--accent-gold)]/5 p-3">
        <div className="text-[var(--text-amber)] text-xs uppercase tracking-wide mb-1">Current Block</div>
        <div className="text-[var(--accent-gold)] font-bold text-3xl tracking-tight">
          #{height.toLocaleString()}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Row label="Block Reward" value={`${reward.toFixed(4)} ZEC`} sub="per block mined" />
        <Row label="Next Halving" value={`#${nextHalving.toLocaleString()}`} sub={`~${estimateDate(blocksLeft)}`} />
        <Row label="Blocks Remaining" value={blocksLeft.toLocaleString()} sub={`${(blocksLeft * BLOCK_TIME_S / 86400).toFixed(0)} days est.`} />
        <Row label="Era Progress" value={`${eraPct.toFixed(1)}%`} sub="through current era" />
      </div>

      {/* Era progress bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-[var(--text-muted)]">
          <span>#{eraBegin.toLocaleString()}</span>
          <span>era {eraPct.toFixed(1)}% complete</span>
          <span>#{nextHalving.toLocaleString()}</span>
        </div>
        <ProgressBar pct={eraPct} />
      </div>

      {/* ZEC issued */}
      <div className="border border-[var(--border-window)] p-3 bg-[var(--bg-window)] space-y-2">
        <div className="text-[var(--text-amber)] text-xs uppercase tracking-wide">ZEC Supply</div>
        <div className="flex justify-between text-xs">
          <span className="text-[var(--text-green)] font-bold">~{(issued / 1_000_000).toFixed(3)}M issued</span>
          <span className="text-[var(--text-muted)]">21M cap</span>
        </div>
        <ProgressBar pct={issuedPct} color="var(--accent-purple)" />
        <div className="text-[var(--text-muted)] text-xs">{issuedPct.toFixed(2)}% of max supply minted</div>
      </div>

      <div className="text-[var(--text-muted)] text-[10px] leading-relaxed">
        Estimates use {BLOCK_TIME_S}s average block time. Actual dates may vary with network hashrate.
      </div>
    </div>
  );
}
