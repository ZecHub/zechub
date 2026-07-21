'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useWindowStore } from '@/store/windowStore';
import { useExplorerStore } from '@/store/explorerStore';
import { calculateWindowPosition } from '@/utils/windowPlacement';
import { AppLoader } from '@/components/ui/AppLoader';
import {
  useMinerLeaderboard,
  useMinerPools,
  useMinerTimeline,
  type MinerEntry,
  type PoolEntry,
  type TimelineBucket,
} from '@/hooks/useZecData';
import uPlot from 'uplot';
import 'uplot/dist/uPlot.min.css';

type Tab = 'leaderboard' | 'pools' | 'timeline' | 'search' | 'universe';
type Range = '7d' | '30d' | '90d' | 'all';
const RANGES: Range[] = ['7d', '30d', '90d', 'all'];
const RANGE_LABELS: Record<Range, string> = { '7d': '7D', '30d': '30D', '90d': '90D', 'all': 'ALL' };

const POOL_COLORS = [
  '#FFD700', '#00cc66', '#9966ff', '#00aaff',
  '#ff6600', '#ff3366', '#00cccc', '#ffaa00',
  '#cc4444', '#44ccaa',
];

function poolColor(i: number): string {
  return POOL_COLORS[i % POOL_COLORS.length];
}

function fmtZec(v: number): string {
  if (v >= 1e6) return (v / 1e6).toFixed(2) + 'M';
  if (v >= 1e3) return (v / 1e3).toFixed(1) + 'K';
  return v.toFixed(2);
}

function fmtDate(iso: string): string {
  try { return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' }); }
  catch { return iso?.slice(0, 10) || '—'; }
}

function truncAddr(addr: string): string {
  if (!addr || addr.length <= 18) return addr || '—';
  return addr.slice(0, 8) + '…' + addr.slice(-6);
}

// ── SVG donut arc (same formula as BlockMiniChart in Explorer) ──────────────
function donutArc(cx: number, cy: number, r: number, thick: number, s: number, e: number): string {
  const toRad = (d: number) => ((d - 90) * Math.PI) / 180;
  const ri = r - thick;
  const span = e - s;
  if (Math.abs(span) >= 359.99) {
    const mid = s + 180;
    return donutArc(cx, cy, r, thick, s, mid) + ' ' + donutArc(cx, cy, r, thick, mid, e - 0.01);
  }
  const lg = span > 180 ? 1 : 0;
  const p = (rad: number, rr: number) => ({ x: cx + rr * Math.cos(toRad(rad)), y: cy + rr * Math.sin(toRad(rad)) });
  const a = p(s, r), b = p(e, r), c = p(e, ri), d_ = p(s, ri);
  return `M${a.x} ${a.y} A${r} ${r} 0 ${lg} 1 ${b.x} ${b.y} L${c.x} ${c.y} A${ri} ${ri} 0 ${lg} 0 ${d_.x} ${d_.y}Z`;
}

// ── Shared loading / error / empty states ───────────────────────────────────
function StatusMsg({ loading, error, empty }: { loading: boolean; error: string | null; empty: boolean }) {
  if (loading) return (
    <div className="flex-1"><AppLoader /></div>
  );
  if (error) return (
    <div className="flex-1 flex items-center justify-center text-[var(--accent-orange)] text-xs font-mono px-6 text-center">
      {error}
    </div>
  );
  if (empty) return (
    <div className="flex-1 flex items-center justify-center text-[var(--text-muted)] text-xs font-mono">
      No data for this range yet — the indexer may still be catching up.
    </div>
  );
  return null;
}

// ── Leaderboard tab ─────────────────────────────────────────────────────────
function LeaderboardTab({ range, onOpenAddress }: { range: Range; onOpenAddress: (addr: string) => void }) {
  const { data, loading, error } = useMinerLeaderboard(range);

  const ready = !loading && !error && data && data.length > 0;

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {!ready ? (
        <StatusMsg loading={loading} error={error} empty={!loading && !error && (!data || data.length === 0)} />
      ) : (
        <div className="flex-1 overflow-auto">
          {/* Table header */}
          <div className="sticky top-0 bg-[var(--bg-titlebar)] border-b border-[var(--border-window)] grid text-xs font-bold uppercase tracking-wide text-[var(--text-muted)] px-3 py-1.5"
            style={{ gridTemplateColumns: '2rem 1fr 9rem 6rem 7rem 4.5rem 7rem' }}>
            <span>#</span>
            <span>Pool / Miner</span>
            <span>Address</span>
            <span className="text-right">Blocks</span>
            <span className="text-right">Reward (ZEC)</span>
            <span className="text-right">Share</span>
            <span className="text-right">Last Seen</span>
          </div>
          {data.map((m: MinerEntry, i: number) => (
            <LeaderboardRow key={m.address || i} rank={i + 1} miner={m} onOpenAddress={onOpenAddress} />
          ))}
        </div>
      )}
    </div>
  );
}

function LeaderboardRow({ rank, miner, onOpenAddress }: { rank: number; miner: MinerEntry; onOpenAddress: (addr: string) => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="grid items-center text-xs font-mono px-3 py-1.5 border-b border-[var(--border-window)]/40 cursor-pointer transition-colors"
      style={{
        gridTemplateColumns: '2rem 1fr 9rem 6rem 7rem 4.5rem 7rem',
        background: hov ? 'var(--accent-gold)/10' : 'transparent',
        color: hov ? 'var(--accent-gold)' : 'var(--text-primary)',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => miner.address && onOpenAddress(miner.address)}
    >
      <span className="text-[var(--text-muted)]">{rank}</span>
      <span className="truncate pr-2" title={miner.tag || undefined}>
        <span style={{ display: 'inline-block', width: 8, height: 8, background: poolColor(rank - 1), borderRadius: 2, marginRight: 6, verticalAlign: 'middle' }} />
        {miner.tag || <span className="text-[var(--text-muted)] italic">Unknown</span>}
      </span>
      <span className="text-[var(--text-muted)] truncate" title={miner.address}>{truncAddr(miner.address)}</span>
      <span className="text-right">{miner.blockCount.toLocaleString()}</span>
      <span className="text-right text-[var(--accent-green)]">{fmtZec(miner.totalReward)}</span>
      <span className="text-right">
        <span style={{ display: 'inline-block', background: poolColor(rank - 1), height: 3, width: Math.max(4, miner.percentage * 0.6), verticalAlign: 'middle', marginRight: 4, opacity: 0.7 }} />
        {miner.percentage.toFixed(1)}%
      </span>
      <span className="text-right text-[var(--text-muted)]">{miner.lastSeen ? fmtDate(miner.lastSeen) : '—'}</span>
    </div>
  );
}

// ── Pools tab ────────────────────────────────────────────────────────────────
function PoolsTab({ range }: { range: Range }) {
  const { data, loading, error } = useMinerPools(range);
  const [hov, setHov] = useState<number | null>(null);

  const ready = !loading && !error && data && data.length > 0;

  if (!ready) return <StatusMsg loading={loading} error={error} empty={!loading && !error && (!data || data.length === 0)} />;

  const CX = 110, CY = 110, R = 88, THICK = 28;
  let cursor = 0;
  const arcs = data.slice(0, 10).map((p: PoolEntry, i: number) => {
    const start = cursor;
    const sweep = Math.max(0.5, (p.percentage / 100) * 360);
    cursor += sweep;
    return { ...p, start, end: cursor, color: poolColor(i) };
  });
  const active = hov !== null ? arcs[hov] : null;

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-auto p-4">
      <div className="flex flex-wrap gap-6 items-start">
        {/* Donut */}
        <svg width={220} height={220} style={{ flexShrink: 0 }}>
          {arcs.map((arc, i) => (
            <path key={i}
              d={donutArc(CX, CY, R + (hov === i ? 5 : 0), THICK, arc.start, arc.end)}
              fill={arc.color}
              opacity={hov !== null && hov !== i ? 0.4 : 0.88}
              style={{ cursor: 'pointer', transition: 'opacity 0.12s' }}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
            />
          ))}
          <text x={CX} y={CY - 8} textAnchor="middle" fill="var(--accent-gold)" fontSize={14} fontWeight="bold" fontFamily="monospace">
            {active ? active.percentage.toFixed(1) + '%' : data.length + ' pools'}
          </text>
          <text x={CX} y={CY + 10} textAnchor="middle" fill="var(--text-muted)" fontSize={10} fontFamily="monospace">
            {active ? (active.tag || 'Unknown').slice(0, 15) : 'block share'}
          </text>
        </svg>

        {/* Legend + bars */}
        <div className="flex-1 space-y-2 min-w-0">
          {data.slice(0, 10).map((p: PoolEntry, i: number) => (
            <div key={i} className="text-xs font-mono"
              onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}>
              <div className="flex items-center gap-2 mb-0.5">
                <span style={{ width: 8, height: 8, background: poolColor(i), display: 'inline-block', borderRadius: 2, flexShrink: 0 }} />
                <span className="truncate flex-1" style={{ color: hov === i ? 'var(--accent-gold)' : 'var(--text-primary)' }}>
                  {p.tag || <span className="text-[var(--text-muted)] italic">Unknown</span>}
                </span>
                <span className="text-[var(--text-muted)] ml-2">{p.percentage.toFixed(1)}%</span>
                <span className="text-[var(--accent-green)] ml-1">{p.blockCount.toLocaleString()}</span>
              </div>
              <div className="h-1 bg-[var(--bg-window)] rounded-full overflow-hidden">
                <div style={{ width: p.percentage + '%', background: poolColor(i), height: '100%', opacity: 0.7, transition: 'width 0.3s' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full table below */}
      {data.length > 10 && (
        <div className="mt-4 text-xs text-[var(--text-muted)] font-mono">
          + {data.length - 10} more miners not shown in chart
        </div>
      )}
    </div>
  );
}

// ── Timeline tab (uPlot) ─────────────────────────────────────────────────────
function TimelineTab({ range }: { range: Range }) {
  const { data, loading, error } = useMinerTimeline(range);
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<uPlot | null>(null);

  const buildChart = useCallback((buckets: TimelineBucket[], container: HTMLDivElement) => {
    if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null; }
    const timestamps = buckets.map(b => new Date(b.date).getTime() / 1000);
    if (timestamps.length < 2) return;
    const blocks = buckets.map(b => b.totalBlocks);
    const w = container.clientWidth;
    const h = Math.max(160, container.clientHeight - 10);
    chartRef.current = new uPlot(
      {
        width: w,
        height: h,
        axes: [
          { stroke: 'rgba(255,255,255,0.3)', grid: { stroke: 'rgba(255,255,255,0.05)', width: 1 }, ticks: { stroke: 'rgba(255,255,255,0.1)', width: 1 } },
          { stroke: 'rgba(255,255,255,0.3)', grid: { stroke: 'rgba(255,255,255,0.05)', width: 1 }, ticks: { stroke: 'rgba(255,255,255,0.1)', width: 1 } },
        ],
        series: [
          {},
          { label: 'Blocks/day', stroke: '#FFD700', width: 1.5, fill: '#FFD70018', points: { show: false } },
        ],
        legend: { show: true },
      },
      [timestamps, blocks],
      container
    );
  }, []);

  useEffect(() => {
    if (!data || data.length < 2 || !containerRef.current) return;
    buildChart(data, containerRef.current);
    return () => { if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null; } };
  }, [data, buildChart]);

  useEffect(() => {
    if (!containerRef.current || !data || data.length < 2) return;
    const ro = new ResizeObserver(() => {
      if (containerRef.current && data && data.length >= 2) buildChart(data, containerRef.current);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [data, buildChart]);

  if (loading || error || !data || data.length === 0) {
    return <StatusMsg loading={loading} error={error} empty={!loading && !error && (!data || data.length === 0)} />;
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 p-3">
      <div className="text-[var(--text-muted)] text-xs font-mono mb-2">
        Total blocks mined per day
      </div>
      <div ref={containerRef} className="flex-1 min-h-0" style={{ minHeight: 180 }} />
    </div>
  );
}

// ── Search tab ───────────────────────────────────────────────────────────────
interface MinerSearchResult {
  address: string;
  pool: string | null;
  blocks: number;
  totalReward: number;
  firstBlock: string;
  lastBlock: string;
  recentBlocks: Array<{ height: number; time: string; reward: string; pool: string | null }>;
}

function SearchTab({ onOpenAddress }: { onOpenAddress: (addr: string) => void }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MinerSearchResult | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (addr: string) => {
    const a = addr.trim();
    if (!a) return;
    setLoading(true); setResult(null); setNotFound(false); setError(null);
    try {
      const res = await fetch(`/api/miners/${encodeURIComponent(a)}`);
      if (res.status === 404) { setNotFound(true); setLoading(false); return; }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const d = json?.data ?? json;
      if (!d?.address && !d?.blocks) { setNotFound(true); setLoading(false); return; }
      setResult({
        address: d.address ?? a,
        pool: d.pool ?? null,
        blocks: Number(d.blocks ?? d.blockCount) || 0,
        totalReward: parseFloat(String(d.totalReward ?? '0')) || 0,
        firstBlock: d.firstBlock ?? '',
        lastBlock: d.lastBlock ?? '',
        recentBlocks: Array.isArray(json?.recentBlocks) ? json.recentBlocks : [],
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 p-3 gap-3">
      {/* Search input */}
      <div className="flex gap-2 shrink-0">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && search(query)}
          placeholder="Enter Zcash address (t1…)…"
          className="flex-1 bg-[var(--bg-inset)] border border-[var(--border-window)] text-[var(--text-green)] px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-[var(--accent-gold)]"
        />
        <button
          onClick={() => search(query)}
          disabled={!query.trim() || loading}
          className="btn-window px-4 py-1.5 text-xs text-[var(--accent-gold)] disabled:opacity-50"
        >
          {loading ? '…' : 'Search'}
        </button>
      </div>

      {/* States */}
      {error && <div className="text-[var(--accent-orange)] text-xs font-mono">{error}</div>}

      {notFound && (
        <div className="flex-1 flex flex-col items-center justify-center gap-2 text-center">
          <span className="text-3xl opacity-40">⛏</span>
          <div className="text-[var(--text-muted)] text-sm font-mono">No mining activity found</div>
          <div className="text-[var(--text-muted)] text-xs opacity-60">This address has not mined any ZEC blocks</div>
          <button
            onClick={() => onOpenAddress(query.trim())}
            className="mt-2 text-xs px-3 py-1 border border-[var(--accent-purple)]/50 text-[var(--accent-purple)] hover:text-[var(--accent-gold)]"
          >
            ↗ Explore address anyway
          </button>
        </div>
      )}

      {result && (
        <div className="flex-1 flex flex-col gap-3 min-h-0 overflow-auto">
          {/* Stats card */}
          <div className="border border-[var(--border-window)] p-3 space-y-2 shrink-0">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm inline-block" style={{ background: result.pool ? poolColor(0) : '#888' }} />
                <span className="text-[var(--accent-gold)] font-bold text-sm">{result.pool || 'Unknown / Solo'}</span>
              </div>
              <button
                onClick={() => onOpenAddress(result.address)}
                className="text-[10px] px-2 py-0.5 border border-[var(--accent-purple)]/50 text-[var(--accent-purple)] hover:text-[var(--accent-gold)]"
              >
                ↗ Explorer
              </button>
            </div>
            <div className="text-[var(--text-muted)] text-xs font-mono truncate" title={result.address}>{result.address}</div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs font-mono mt-2">
              <div><span className="text-[var(--text-muted)]">Blocks mined</span><br /><span className="text-[var(--accent-gold)] font-bold">{result.blocks.toLocaleString()}</span></div>
              <div><span className="text-[var(--text-muted)]">Total reward</span><br /><span className="text-[var(--accent-green)] font-bold">{fmtZec(result.totalReward)} ZEC</span></div>
              <div><span className="text-[var(--text-muted)]">First block</span><br /><span className="text-[var(--text-primary)]">{result.firstBlock ? fmtDate(result.firstBlock) : '—'}</span></div>
              <div><span className="text-[var(--text-muted)]">Last block</span><br /><span className="text-[var(--text-primary)]">{result.lastBlock ? fmtDate(result.lastBlock) : '—'}</span></div>
            </div>
          </div>

          {/* Recent blocks */}
          {result.recentBlocks.length > 0 && (
            <div className="min-h-0 overflow-auto">
              <div className="text-[var(--text-muted)] text-xs uppercase tracking-wide mb-1 px-1">Recent blocks</div>
              <div className="sticky top-0 grid text-[10px] font-bold uppercase text-[var(--text-muted)] px-2 py-1 bg-[var(--bg-titlebar)] border-b border-[var(--border-window)]"
                style={{ gridTemplateColumns: '5rem 1fr 6rem' }}>
                <span>Height</span><span>Time</span><span className="text-right">Reward</span>
              </div>
              {result.recentBlocks.map((b, i) => (
                <div key={i} className="grid text-xs font-mono px-2 py-1 border-b border-[var(--border-window)]/40 hover:bg-[var(--bg-inset)]"
                  style={{ gridTemplateColumns: '5rem 1fr 6rem' }}>
                  <span className="text-[var(--accent-gold)]">#{b.height.toLocaleString()}</span>
                  <span className="text-[var(--text-muted)]">{fmtDate(b.time)}</span>
                  <span className="text-right text-[var(--accent-green)]">{parseFloat(b.reward).toFixed(4)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {!loading && !result && !notFound && !error && (
        <div className="flex-1 flex items-center justify-center text-[var(--text-muted)] text-xs font-mono text-center px-6">
          Enter a Zcash miner address above to look up their mining history
        </div>
      )}
    </div>
  );
}

// ── Universe tab — animated pool radial diagram ───────────────────────────────
const EASE = 'opacity 0.28s ease, stroke-width 0.28s ease';

function UniverseTab({ range }: { range: Range }) {
  const { data, loading, error } = useMinerPools(range);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 900, h: 560 });
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setDims({ w: el.clientWidth || 900, h: el.clientHeight || 560 });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    update();
    return () => ro.disconnect();
  }, []);

  const pools = useMemo(() => (data ?? []).slice(0, 9), [data]);

  const nodes = useMemo(() => {
    const cx = dims.w * 0.47;
    const cy = dims.h * 0.5;
    // Compute max node radius from actual data so orbit never overflows the container
    const maxNR = pools.length > 0
      ? 12 + Math.sqrt(Math.max(...pools.map(p => Math.max(p.percentage, 0.1)))) * 8
      : 40;
    const PAD = 24; // guaranteed clear margin from every edge
    const R = Math.max(60, Math.min(
      (dims.w - 2 * (maxNR + PAD)) * 0.48,
      (dims.h - 2 * (maxNR + PAD)) * 0.5,
    ));
    return pools.map((p, i) => {
      const angle = (i / pools.length) * Math.PI * 2 - Math.PI / 2;
      const x = cx + Math.cos(angle) * R;
      const y = cy + Math.sin(angle) * R;
      const nr = 12 + Math.sqrt(Math.max(p.percentage, 0.1)) * 8;
      const color = poolColor(i);
      const mx = (cx + x) / 2, my = (cy + y) / 2;
      const dx = x - cx, dy = y - cy;
      const cpx = mx - dy * 0.2, cpy = my + dx * 0.2;
      return { ...p, x, y, nr, color, cpx, cpy, cx, cy, angle };
    });
  }, [pools, dims]);

  if (loading) return <div className="flex-1"><AppLoader /></div>;
  if (error || !data || data.length === 0) return <StatusMsg loading={false} error={error} empty={!error} />;

  const cx = dims.w * 0.47, cy = dims.h * 0.5;
  const activeNode = hovered !== null ? nodes[hovered] : null;

  return (
    <div ref={containerRef} className="flex-1 relative min-h-0">
      {/* Full-bleed SVG */}
      <svg className="absolute inset-0" width={dims.w} height={dims.h}>
        <defs>
          <filter id="glow-uni" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-center" x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="center-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#B8860B" stopOpacity="0.75" />
          </radialGradient>
          {nodes.map((n, i) => (
            <radialGradient key={i} id={`ng-${i}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={n.color} stopOpacity="0.9" />
              <stop offset="100%" stopColor={n.color} stopOpacity="0.45" />
            </radialGradient>
          ))}
          <style>{`
            @keyframes uflow { to { stroke-dashoffset: -24; } }
            .uflow { animation: uflow 1.8s linear infinite; }
          `}</style>
        </defs>

        {/* Arc paths + flowing particles */}
        {nodes.map((n, i) => {
          const pathId = `uarc-${i}`;
          const dim = hovered !== null && hovered !== i;
          return (
            <g key={i}>
              <path
                id={pathId}
                d={`M ${n.cx} ${n.cy} Q ${n.cpx} ${n.cpy} ${n.x} ${n.y}`}
                fill="none"
                stroke={n.color}
                strokeDasharray="4 10"
                className="uflow"
                style={{
                  opacity: dim ? 0.12 : hovered === i ? 0.75 : 0.5,
                  strokeWidth: hovered === i ? 2.5 : 1.2,
                  animationDelay: `${i * 0.22}s`,
                  transition: EASE,
                }}
              />
              {[0, 0.33, 0.66].map((off, di) => (
                <circle key={di} r={hovered === i ? 4 : 2.5} fill={n.color}
                  style={{ opacity: dim ? 0.1 : 0.85, transition: EASE }}>
                  <animateMotion dur={`${2.2 + i * 0.15}s`} begin={`${off * (2.2 + i * 0.15)}s`} repeatCount="indefinite" calcMode="linear">
                    <mpath href={`#${pathId}`} />
                  </animateMotion>
                </circle>
              ))}
            </g>
          );
        })}

        {/* Pool nodes */}
        {nodes.map((n, i) => (
          <g key={i} style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Pulse ring — top 3 pools */}
            {i < 3 && (
              <circle cx={n.x} cy={n.y} r={n.nr + 4} fill="none" stroke={n.color} strokeWidth={1}
                style={{ opacity: hovered !== null && hovered !== i ? 0 : undefined, transition: 'opacity 0.28s ease' }}>
                <animate attributeName="r" from={n.nr + 2} to={n.nr + 26} dur={`${2.5 + i * 0.5}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.45" to="0" dur={`${2.5 + i * 0.5}s`} repeatCount="indefinite" />
              </circle>
            )}
            {/* Node circle */}
            <circle cx={n.x} cy={n.y} r={hovered === i ? n.nr + 3 : n.nr}
              fill={`url(#ng-${i})`}
              stroke={n.color}
              filter={hovered === i ? 'url(#glow-uni)' : undefined}
              style={{
                opacity: hovered !== null && hovered !== i ? 0.3 : 0.92,
                strokeWidth: hovered === i ? 2.5 : 1.2,
                transition: EASE + ', r 0.28s ease',
              }}
            />
            {/* % inside larger nodes */}
            {n.nr > 20 && (
              <text x={n.x} y={n.y + 1} textAnchor="middle" dominantBaseline="middle"
                fill="#fff" fontSize={n.nr > 30 ? 12 : 10} fontFamily="monospace" fontWeight="bold"
                style={{ opacity: hovered !== null && hovered !== i ? 0.2 : 0.9, transition: 'opacity 0.28s ease' }}>
                {n.percentage.toFixed(1)}%
              </text>
            )}
            {/* Pool name label */}
            <text
              x={n.x + Math.cos(n.angle) * (n.nr + 12)}
              y={n.y + Math.sin(n.angle) * (n.nr + 12)}
              textAnchor={Math.cos(n.angle) > 0.2 ? 'start' : Math.cos(n.angle) < -0.2 ? 'end' : 'middle'}
              dominantBaseline={Math.sin(n.angle) > 0.3 ? 'hanging' : Math.sin(n.angle) < -0.3 ? 'auto' : 'middle'}
              fill={n.color}
              fontSize={hovered === i ? 11 : 10}
              fontFamily="monospace"
              style={{ opacity: hovered !== null && hovered !== i ? 0.2 : 1, transition: EASE }}
            >
              {(n.tag || 'Unknown').slice(0, 14)}
            </text>
          </g>
        ))}

        {/* Central ZEC node */}
        <circle cx={cx} cy={cy} r={44} fill="url(#center-grad)" filter="url(#glow-center)" opacity={0.93} />
        <circle cx={cx} cy={cy} r={44} fill="none" stroke="#FFD700" strokeWidth={1} opacity={0.55} />
        <text x={cx} y={cy - 7} textAnchor="middle" fill="#FFD700" fontSize={15} fontWeight="bold" fontFamily="monospace">ZEC</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill="#FFD700" fontSize={9} fontFamily="monospace" opacity={0.65}>BLOCKCHAIN</text>
      </svg>

      {/* Legend overlay — top-right corner */}
      <div className="absolute top-3 right-4 w-52 text-xs font-mono pointer-events-none"
        style={{ background: 'rgba(5,5,18,0.78)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(4px)', padding: '10px 12px', borderRadius: 2 }}>
        {activeNode ? (
          <div className="space-y-1.5 pointer-events-auto">
            <div className="flex items-center gap-2 pb-1 border-b border-[rgba(255,255,255,0.08)]">
              <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: activeNode.color, display: 'inline-block' }} />
              <span className="text-[var(--accent-gold)] font-bold truncate">{activeNode.tag || 'Unknown'}</span>
            </div>
            <div><span className="text-[var(--text-muted)]">Share</span><span className="float-right font-bold" style={{ color: activeNode.color }}>{activeNode.percentage.toFixed(2)}%</span></div>
            <div><span className="text-[var(--text-muted)]">Blocks</span><span className="float-right text-[var(--accent-gold)]">{activeNode.blockCount.toLocaleString()}</span></div>
            <div><span className="text-[var(--text-muted)]">Reward</span><span className="float-right text-[var(--accent-green)]">{fmtZec(activeNode.totalReward)}</span></div>
          </div>
        ) : (
          <div className="space-y-1.5 pointer-events-auto">
            <div className="text-[var(--text-muted)] text-[10px] uppercase tracking-wide pb-1 border-b border-[rgba(255,255,255,0.08)]">Pool Share</div>
            {nodes.map((n, i) => (
              <div key={i} className="flex items-center gap-1.5 cursor-pointer"
                style={{ opacity: hovered !== null && hovered !== i ? 0.3 : 1, transition: 'opacity 0.28s ease' }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <span className="w-2 h-2 rounded-sm shrink-0" style={{ background: n.color, display: 'inline-block' }} />
                <span className="flex-1 truncate" style={{ color: n.color }}>{n.tag || 'Unknown'}</span>
                <span className="text-[var(--text-muted)] shrink-0">{n.percentage.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Root component ───────────────────────────────────────────────────────────
export function Mining() {
  const [tab, setTab] = useState<Tab>('leaderboard');
  const [range, setRange] = useState<Range>('30d');
  const { windows, openWindow } = useWindowStore();

  const openAddress = useCallback((address: string) => {
    if (!address) return;
    const id = `explorer-addr-${address.slice(-10)}`;
    useExplorerStore.getState().queueSearch(id, address, 't-address');
    const pos = calculateWindowPosition(windows, { width: 720, height: 680 }, window.innerWidth, window.innerHeight);
    openWindow({ id, type: 'explorer', title: `Address ${address.slice(0, 12)}…`, position: pos, size: { width: 720, height: 680 }, minSize: { width: 520, height: 480 } });
  }, [windows, openWindow]);

  const TABS: { id: Tab; label: string }[] = [
    { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'pools', label: 'Pool Share' },
    { id: 'universe', label: 'Universe' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'search', label: 'Search' },
  ];

  return (
    <div className="h-full flex flex-col bg-[var(--bg-window)]" style={{ fontFamily: 'monospace' }}>
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-2.5 border-b border-[var(--border-window)] bg-[var(--bg-titlebar)] flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-base">⛏</span>
          <span className="text-[var(--accent-gold)] font-bold text-base">Mining</span>
        </div>
        {/* Tabs */}
        <div className="flex gap-1">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`text-xs px-3 py-1 border transition-colors ${tab === t.id
                ? 'border-[var(--accent-gold)] text-[var(--accent-gold)] bg-[var(--accent-gold)]/10'
                : 'border-[var(--border-window)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}>
              {t.label}
            </button>
          ))}
        </div>
        {/* Range (hidden on Search tab) */}
        {tab !== 'search' && (
          <div className="flex gap-1 ml-auto">
            {RANGES.map(r => (
              <button key={r} onClick={() => setRange(r)}
                className={`text-xs px-2 py-0.5 border transition-colors ${range === r
                  ? 'border-[var(--accent-purple)] text-[var(--accent-purple)]'
                  : 'border-[var(--border-window)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}>
                {RANGE_LABELS[r]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tab content */}
      <div className="flex-1 flex flex-col min-h-0">
        {tab === 'leaderboard' && <LeaderboardTab range={range} onOpenAddress={openAddress} />}
        {tab === 'pools' && <PoolsTab range={range} />}
        {tab === 'universe' && (
          <div className="flex-1 flex flex-col min-h-0">
            <UniverseTab range={range} />
          </div>
        )}
        {tab === 'timeline' && <TimelineTab range={range} />}
        {tab === 'search' && <SearchTab onOpenAddress={openAddress} />}
      </div>

      {/* Footer — content varies by tab */}
      <div className="flex-shrink-0 px-4 py-1.5 border-t border-[var(--border-window)] text-xs text-[var(--text-muted)] flex items-center gap-3">
        {tab === 'leaderboard' && <>
          <span>Coinbase addresses ranked by blocks mined · sourced via Zebra</span>
          <span className="ml-auto">Click any row to explore the miner address in Explorer</span>
        </>}
        {tab === 'pools' && <>
          <span>Pools identified by coinbase tag · sourced via Zebra</span>
          <span className="ml-auto">Hover a segment or row to highlight · all-time data</span>
        </>}
        {tab === 'universe' && <>
          <span>Pool share visualised as a radial flow diagram</span>
          <span className="ml-auto">Hover any node to inspect · arcs show block flow to each pool</span>
        </>}
        {tab === 'timeline' && <>
          <span>Total blocks mined per day across the Zcash chain</span>
          <span className="ml-auto">Pan and zoom with scroll · sourced via Zebra</span>
        </>}
        {tab === 'search' && <>
          <span>Look up any Zcash address to see its mining history</span>
          <span className="ml-auto">Enter a t1… address and press Search or ↵</span>
        </>}
      </div>
    </div>
  );
}

export default Mining;
