'use client';

import { useState, useEffect, useRef } from 'react';
import { useExplorerStore, ChainPulseContext } from '@/store/explorerStore';
import { useWindowStore } from '@/store/windowStore';
import { calculateWindowPosition } from '@/utils/windowPlacement';

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5)); // ≈ 137.5°

function txHsl(txid: string, isCoinbase: boolean): string {
  if (isCoinbase) return '#FFD700';
  const hue = 180 + (parseInt(txid.slice(0, 4), 16) % 160);
  const sat = 60 + (parseInt(txid.slice(4, 6), 16) % 30);
  const lit = 50 + (parseInt(txid.slice(6, 8), 16) % 20);
  return `hsl(${hue}, ${sat}%, ${lit}%)`;
}

function nodeRadius(index: number, total: number): number {
  const t = index / Math.max(total - 1, 1);
  return Math.max(6, 18 - t * 10); // 18 → 8 px (scaled up from 14→6)
}

function formatTimeShort(unix: number): string {
  return new Date(unix * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

interface NodeDatum {
  txid: string;
  cx: number;
  cy: number;
  r:  number;
  color: string;
  index: number;
}

function buildNodes(txids: string[], W: number, H: number): NodeDatum[] {
  const cx = W / 2;
  const cy = H / 2;
  const maxR = Math.min(cx, cy) - 28;
  const minR = 68; // clear of center circle (slightly bigger)

  return txids.slice(0, 300).map((txid, i) => {
    const angle = i * GOLDEN_ANGLE;
    const t = i === 0 ? 0 : Math.sqrt(i / (txids.length - 1 || 1));
    const dist = minR + (maxR - minR) * t;
    return {
      txid,
      cx: cx + dist * Math.cos(angle),
      cy: cy + dist * Math.sin(angle),
      r:  nodeRadius(i, txids.length),
      color: txHsl(txid, i === 0),
      index: i,
    };
  });
}

export function ChainPulse({ windowId }: { windowId?: string }) {
  const { consumeAction } = useExplorerStore();
  const { windows, openWindow } = useWindowStore();
  const [ctx, setCtx] = useState<ChainPulseContext | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const [dims, setDims] = useState({ w: 540, h: 460 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!windowId) return;
    const action = consumeAction(windowId);
    if (action?.mode === 'chain-pulse') setCtx(action as ChainPulseContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowId]);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) setDims({ w: width, h: height });
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const openTx = (txid: string) => {
    const id = `explorer-tx-cp-${txid.slice(0, 8)}`;
    useExplorerStore.getState().queueSearch(id, txid, 'transaction');
    const pos = calculateWindowPosition(windows, { width: 720, height: 680 }, window.innerWidth, window.innerHeight);
    openWindow({ id, type: 'explorer', title: `TX ${txid.slice(0, 14)}…`, position: pos, size: { width: 720, height: 680 }, minSize: { width: 520, height: 480 } });
  };

  if (!ctx) {
    return (
      <div className="h-full flex items-center justify-center bg-[var(--bg-window)]">
        <span className="text-[var(--text-amber)] font-mono text-sm">Open Chain Pulse from a block in the Explorer.</span>
      </div>
    );
  }

  const { blockHeight, transactions, time } = ctx;
  const W = dims.w;
  const H = dims.h;
  const cx = W / 2;
  const cy = H / 2;
  const nodes = buildNodes(transactions, W, H);
  // Hover takes priority over focused for display
  const activeIndex = hovered !== null ? hovered : focused;
  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const excess = transactions.length > 300 ? transactions.length - 300 : 0;

  const prevNode = () => setFocused(prev => {
    const cur = prev ?? (hovered ?? -1);
    return Math.max(0, cur - 1);
  });
  const nextNode = () => setFocused(prev => {
    const cur = prev ?? (hovered ?? -1);
    return Math.min(nodes.length - 1, cur + 1);
  });

  return (
    <div className="h-full flex flex-col bg-[var(--bg-window)]" style={{ fontFamily: 'monospace' }}>
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-[var(--border-window)] bg-[var(--bg-titlebar)]">
        <div className="flex items-baseline gap-3">
          <span className="text-[var(--accent-gold)] font-bold text-lg">Chain Pulse</span>
          <span className="text-[var(--text-secondary)] text-sm">
            Block #{blockHeight.toLocaleString()} · {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} · {formatTimeShort(time)}
          </span>
        </div>
        <p className="text-[var(--text-muted)] text-xs mt-1 leading-relaxed">
          Each dot is one transaction in this block, arranged in a golden-ratio spiral outward from the block center.
          The <span style={{ color: '#FFD700' }}>gold ⛏ node</span> is the coinbase (miner reward). All others are colored by their txid hash.
          Nodes closer to the center appear larger. <span className="text-[var(--accent-purple)]">Click any node to open that transaction.</span>
        </p>
      </div>

      {/* Tooltip + nav bar */}
      <div className="flex-shrink-0 border-b border-[var(--border-window)] bg-[#0a0a1a]">
        {/* Prev/Next nav row */}
        <div className="flex items-center gap-2 px-3 py-1.5 border-b border-[var(--border-window)]/50">
          <button
            onClick={prevNode}
            disabled={activeIndex === null || activeIndex === 0}
            className="px-3 py-1 border text-xs font-bold disabled:opacity-30 border-[var(--accent-purple)] text-[var(--accent-purple)] hover:bg-[var(--accent-purple)]/10 transition-colors"
          >← Prev TX</button>
          <span className="text-[var(--text-muted)] text-xs flex-1 text-center">
            {activeIndex !== null ? `TX ${activeIndex + 1} of ${transactions.length}` : `${transactions.length} transactions — use Prev/Next or hover a node`}
          </span>
          <button
            onClick={nextNode}
            disabled={activeIndex === null || activeIndex >= nodes.length - 1}
            className="px-3 py-1 border text-xs font-bold disabled:opacity-30 border-[var(--accent-purple)] text-[var(--accent-purple)] hover:bg-[var(--accent-purple)]/10 transition-colors"
          >Next TX →</button>
          {focused !== null && (
            <button
              onClick={() => active && openTx(active.txid)}
              className="px-3 py-1 border text-xs font-bold border-[var(--accent-gold)] text-[var(--accent-gold)] hover:bg-[var(--accent-gold)]/10 transition-colors"
            >Open ↗</button>
          )}
        </div>
        {/* Inspection row */}
        <div className="px-4 py-2" style={{ minHeight: 44 }}>
          {active ? (
            <div>
              <div className="flex items-center gap-3 mb-0.5">
                <span className="text-sm font-bold" style={{ color: active.color }}>
                  {active.index === 0 ? '⛏ Coinbase Transaction' : `Transaction #${active.index + 1} of ${transactions.length}`}
                </span>
                {active.index === 0 && (
                  <span className="text-[var(--text-amber)] text-xs">Block reward — newly minted ZEC to the miner</span>
                )}
                {hovered !== null && (
                  <span className="text-[var(--text-muted)] text-xs ml-auto">click to open</span>
                )}
              </div>
              <div className="text-[var(--text-muted)] text-xs font-mono truncate" title={active.txid}>
                {active.txid || '—'}
              </div>
            </div>
          ) : (
            <div className="text-[var(--text-muted)] text-xs leading-relaxed">
              Hover any node to inspect · use Prev/Next buttons to navigate · click a node or Open ↗ to explore
              {excess > 0 && <span className="ml-3 text-[var(--accent-orange)]">showing 300 of {transactions.length} txs</span>}
            </div>
          )}
        </div>
      </div>

      {/* Canvas */}
      <div ref={containerRef} className="flex-1 relative overflow-hidden">
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <radialGradient id="cp-bg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0d1117" />
              <stop offset="100%" stopColor="#050810" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <rect width={W} height={H} fill="url(#cp-bg)" />

          {/* Orbit rings */}
          {[0.3, 0.55, 0.78, 1.0].map((t, i) => {
            const maxR = Math.min(cx, cy) - 28;
            const r = 68 + (maxR - 68) * t;
            return (
              <circle key={i} cx={cx} cy={cy} r={r}
                fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
            );
          })}

          {/* Connector lines */}
          {nodes.map((n) => (
            <line key={`l-${n.index}`}
              x1={cx} y1={cy} x2={n.cx} y2={n.cy}
              stroke={n.color}
              strokeOpacity={hovered === n.index ? 0.4 : 0.07}
              strokeWidth={hovered === n.index ? 2 : 0.5}
            />
          ))}

          {/* Transaction nodes */}
          {nodes.map((n) => {
            const isHov = hovered === n.index;
            const isFocused = focused === n.index && hovered === null;
            const isActive = isHov || isFocused;
            return (
              <g key={n.index} style={{ cursor: 'pointer' }}
                onClick={() => { setFocused(n.index); n.txid && openTx(n.txid); }}
                onMouseEnter={() => setHovered(n.index)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Focused ring (gold dashed) */}
                {isFocused && (
                  <circle cx={n.cx} cy={n.cy} r={n.r + 11}
                    fill="none" stroke="#FFD700" strokeWidth={2} strokeDasharray="4 3" strokeOpacity={0.9} />
                )}
                {/* Hover glow */}
                {isHov && (
                  <circle cx={n.cx} cy={n.cy} r={n.r + 9}
                    fill="none" stroke={n.color} strokeWidth={2.5} strokeOpacity={0.7} filter="url(#glow)" />
                )}
                <circle cx={n.cx} cy={n.cy} r={isActive ? n.r + 3 : n.r}
                  fill={n.color} opacity={isActive ? 1 : 0.82} />
                {n.index === 0 && (
                  <text x={n.cx} y={n.cy + 1}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize={Math.max(8, n.r - 2)} fill="#000"
                    style={{ pointerEvents: 'none', fontWeight: 'bold', userSelect: 'none' }}>⛏</text>
                )}
              </g>
            );
          })}

          {/* Center block circle */}
          <circle cx={cx} cy={cy} r={54} fill="#0d1a2e" stroke="var(--accent-gold)" strokeWidth={2.5} />
          <circle cx={cx} cy={cy} r={49} fill="none" stroke="var(--accent-gold)" strokeWidth={0.5} strokeDasharray="5 4" strokeOpacity={0.4} />
          <text x={cx} y={cy - 14} textAnchor="middle" fill="var(--accent-gold)" fontSize={14} fontWeight="bold" fontFamily="monospace">
            #{blockHeight.toLocaleString()}
          </text>
          <text x={cx} y={cy + 4} textAnchor="middle" fill="var(--text-amber)" fontSize={11} fontFamily="monospace">
            {transactions.length} TX
          </text>
          <text x={cx} y={cy + 19} textAnchor="middle" fill="var(--text-muted)" fontSize={10} fontFamily="monospace">
            {formatTimeShort(time)}
          </text>
        </svg>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 px-4 py-2 border-t border-[var(--border-window)] flex items-center gap-6 text-xs text-[var(--text-muted)]">
        <span className="flex items-center gap-2">
          <span style={{ width: 10, height: 10, background: '#FFD700', display: 'inline-block', borderRadius: '50%' }} />
          Coinbase
        </span>
        <span className="flex items-center gap-2">
          <span style={{ width: 10, height: 10, background: 'hsl(230,65%,55%)', display: 'inline-block', borderRadius: '50%' }} />
          Regular tx (color = txid hash, teal → purple range)
        </span>
        <span>Size ∝ proximity to center</span>
        {excess > 0 && <span className="text-[var(--accent-orange)] ml-auto">+{excess} not shown</span>}
      </div>
    </div>
  );
}

export default ChainPulse;
