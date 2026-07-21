'use client';

import { useEffect, useState, useCallback } from 'react';
import { useExplorerStore } from '@/store/explorerStore';
import { useWindowStore } from '@/store/windowStore';
import { calculateWindowPosition } from '@/utils/windowPlacement';
import { AppLoader } from '@/components/ui/AppLoader';

// ── Types ─────────────────────────────────────────────────────────────────────

interface TxInput {
  txid?: string;
  vout?: number;
  value?: number;
  coinbase?: string;
}

interface TxOutput {
  n: number;
  value: number;
  scriptPubKey?: { addresses?: string[]; type?: string };
}

interface TxData {
  txid: string;
  vin: TxInput[];
  vout: TxOutput[];
  blockheight?: number;
  vShieldedSpend?: unknown[];
  vShieldedOutput?: unknown[];
  orchard?: { actions?: unknown[] };
}

interface SourceMap {
  [txid: string]: { vout: TxOutput[]; loading: boolean };
}

interface GNode {
  id: string;
  label: string;
  sublabel: string;
  badge: string;
  color: string;
  shielded?: boolean;
  value?: number;
  onClick?: () => void;
}

// ── SVG layout constants ───────────────────────────────────────────────────────

const VB_W  = 880;   // canvas width (px)
const NW    = 176;   // node width
const NH    = 60;    // node height
const GAP   = 14;    // vertical gap between nodes
const TX_W  = 160;
const TX_H  = 84;
const PADV  = 44;    // vertical padding top/bottom

const TX_X  = (VB_W - TX_W) / 2;
const COL_L = 18;
const COL_R = VB_W - 18 - NW;

// ── Colors ────────────────────────────────────────────────────────────────────

const GOLD   = '#FFD700';
const GREEN  = '#4ade80';
const PURPLE = '#a78bfa';
const BLUE   = '#60a5fa';
const DIM    = '#888888';
const BG     = '#06060f';
const BG_N   = '#0b0b1c';

// ── Pure helpers ──────────────────────────────────────────────────────────────

function addrColor(a: string): string {
  if (a.startsWith('zs1')) return PURPLE;
  if (a.startsWith('u1'))  return BLUE;
  if (a.startsWith('t'))   return GREEN;
  return DIM;
}

function addrBadge(a: string): string {
  if (a.startsWith('zs1')) return 'SAPLING';
  if (a.startsWith('u1'))  return 'UNIFIED';
  if (a.startsWith('t'))   return 'T-ADDR';
  return 'ADDR';
}

function hex2rgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function trA(s: string): string {
  return s.length <= 18 ? s : `${s.slice(0, 12)}…${s.slice(-5)}`;
}

function trH(s: string): string {
  return `${s.slice(0, 9)}…${s.slice(-5)}`;
}

function edgeStroke(v?: number): number {
  if (!v) return 1.5;
  return v > 50 ? 4 : v > 5 ? 2.5 : 1.5;
}

function cubic(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2;
  return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
}

// ── SvgNode ───────────────────────────────────────────────────────────────────

function SvgNode({ x, y, node, pfx }: {
  x: number; y: number; node: GNode; pfx: string;
}) {
  const fill = node.shielded ? `url(#${pfx}-hatch)` : hex2rgba(node.color, 0.09);
  return (
    <g
      onClick={node.onClick}
      style={{ cursor: node.onClick ? 'pointer' : 'default' }}
    >
      {/* Base fill */}
      <rect x={x} y={y} width={NW} height={NH} rx={7} fill={BG_N} />
      {/* Color layer + border */}
      <rect x={x} y={y} width={NW} height={NH} rx={7}
        fill={fill}
        stroke={node.color} strokeWidth={1.2}
        strokeOpacity={node.shielded ? 0.5 : 0.75}
        strokeDasharray={node.shielded ? '4 3' : undefined}
      />
      {/* Badge pill */}
      <rect x={x + NW - 58} y={y + 8} width={52} height={13} rx={4}
        fill={node.color} fillOpacity={0.2} />
      <text x={x + NW - 32} y={y + 18} textAnchor="middle"
        fill={node.color} fontSize={8} fontFamily="monospace" fontWeight="bold">
        {node.badge}
      </text>
      {/* Label line */}
      <text x={x + 9} y={y + 30} fill="#d8d8e8" fontSize={10.5} fontFamily="monospace">
        {node.label}
      </text>
      {/* Sublabel */}
      <text x={x + 9} y={y + 46} fill="#999" fontSize={9.5} fontFamily="monospace">
        {node.sublabel}
      </text>
      {/* Explore arrow */}
      {node.onClick && (
        <text x={x + NW - 16} y={y + NH - 7}
          fill={node.color} fontSize={14} fontFamily="monospace" fillOpacity={0.45}>
          ↗
        </text>
      )}
    </g>
  );
}

// ── TxSvgGraph ────────────────────────────────────────────────────────────────

function TxSvgGraph({ tx, sources, onExplore }: {
  tx: TxData;
  sources: SourceMap;
  onExplore: (q: string, type: 'transaction' | 't-address') => void;
}) {
  // Build input node list
  const inputNodes: GNode[] = [];

  if (tx.vin.some(i => i.coinbase)) {
    inputNodes.push({
      id: 'coinbase', label: 'Coinbase', sublabel: 'newly minted ZEC',
      badge: 'MINE', color: GOLD,
    });
  }

  const transparentIns = tx.vin.filter(i => !i.coinbase);
  transparentIns.slice(0, 7).forEach((inp, i) => {
    if (!inp.txid) return;
    const src = sources[inp.txid];
    const srcOut = src?.vout?.find(o => o.n === inp.vout);
    const addr = srcOut?.scriptPubKey?.addresses?.[0];
    const val = srcOut?.value ?? inp.value;
    if (addr) {
      inputNodes.push({
        id: `in-${i}`, label: trA(addr),
        sublabel: val != null ? `${val.toFixed(4)} ZEC` : src ? 'resolving…' : '',
        badge: addrBadge(addr), color: addrColor(addr),
        value: val ?? undefined,
        onClick: () => onExplore(addr, 't-address'),
      });
    } else if (inp.txid) {
      inputNodes.push({
        id: `in-${i}`, label: trH(inp.txid),
        sublabel: src?.loading ? 'resolving…' : `vout ${inp.vout ?? 0}`,
        badge: 'TX-IN', color: DIM,
        onClick: () => onExplore(inp.txid!, 'transaction'),
      });
    }
  });

  if (transparentIns.length > 7) {
    inputNodes.push({
      id: 'in-more',
      label: `+${transparentIns.length - 7} more inputs`,
      sublabel: 'not shown',
      badge: '···', color: DIM,
    });
  }

  const nShieldedIn = (tx.vShieldedSpend?.length ?? 0) + (tx.orchard?.actions?.length ?? 0);
  if (nShieldedIn > 0) {
    inputNodes.push({
      id: 'shielded-in',
      label: `${nShieldedIn} shielded note${nShieldedIn > 1 ? 's' : ''}`,
      sublabel: 'private — balance hidden',
      badge: 'PRIV', color: PURPLE, shielded: true,
    });
  }

  // Build output node list
  const outputNodes: GNode[] = [];
  const visibleOuts = tx.vout.filter(o => o.scriptPubKey?.type !== 'nulldata');

  visibleOuts.slice(0, 8).forEach((out, i) => {
    const addr = out.scriptPubKey?.addresses?.[0];
    outputNodes.push({
      id: `out-${i}`,
      label: addr ? trA(addr) : (out.scriptPubKey?.type ?? `output ${out.n}`),
      sublabel: `${out.value.toFixed(4)} ZEC`,
      badge: addr ? addrBadge(addr) : 'SCRIPT',
      color: addr ? addrColor(addr) : DIM,
      value: out.value,
      onClick: addr ? () => onExplore(addr, 't-address') : undefined,
    });
  });

  if (visibleOuts.length > 8) {
    outputNodes.push({
      id: 'out-more',
      label: `+${visibleOuts.length - 8} more outputs`,
      sublabel: 'not shown',
      badge: '···', color: DIM,
    });
  }

  const nShieldedOut = (tx.vShieldedOutput?.length ?? 0) + (tx.orchard?.actions?.length ?? 0);
  if (nShieldedOut > 0) {
    outputNodes.push({
      id: 'shielded-out',
      label: `${nShieldedOut} shielded note${nShieldedOut > 1 ? 's' : ''}`,
      sublabel: 'private — recipient hidden',
      badge: 'PRIV', color: PURPLE, shielded: true,
    });
  }

  // ── Layout geometry ──────────────────────────────────────────────────────────
  const maxN   = Math.max(inputNodes.length, outputNodes.length, 1);
  const colH   = maxN * (NH + GAP) - GAP;
  const canvasH = Math.max(colH, TX_H) + PADV * 2;

  const txY   = (canvasH - TX_H) / 2;
  const txCY  = txY + TX_H / 2;

  const inStartY  = (canvasH - (inputNodes.length  * (NH + GAP) - GAP)) / 2;
  const outStartY = (canvasH - (outputNodes.length * (NH + GAP) - GAP)) / 2;

  const inRightX  = COL_L + NW;
  const outLeftX  = COL_R;
  const txLeft    = TX_X;
  const txRight   = TX_X + TX_W;

  const pfx = tx.txid.slice(0, 7);

  // Legend items
  const legend = [
    { color: GREEN,  label: 't-address (transparent)' },
    { color: PURPLE, label: 'sapling (shielded)' },
    { color: BLUE,   label: 'unified address' },
    { color: GOLD,   label: 'coinbase / transaction' },
  ];

  return (
    <div style={{ overflowX: 'auto' }}>
      <svg
        width={VB_W}
        height={canvasH + 36}
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', fontFamily: 'monospace' }}
      >
        <style>{`
          .gflow { stroke-dasharray: 9 5; animation: gflow 1.4s linear infinite; }
          @keyframes gflow { to { stroke-dashoffset: -28; } }
        `}</style>

        <defs>
          {/* Glow for TX node */}
          <filter id={`${pfx}-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Hatch fill for shielded nodes */}
          <pattern id={`${pfx}-hatch`} width="10" height="10"
            patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="10"
              stroke={PURPLE} strokeWidth="1.5" strokeOpacity="0.25" />
          </pattern>

          {/* Per-edge gradients: input→TX */}
          {inputNodes.map((n, i) => (
            <linearGradient key={`gi${i}`} id={`${pfx}-gi${i}`}
              gradientUnits="userSpaceOnUse"
              x1={inRightX} y1="0" x2={txLeft} y2="0">
              <stop offset="0%"   stopColor={n.color} stopOpacity="0.85" />
              <stop offset="100%" stopColor={GOLD}    stopOpacity="0.85" />
            </linearGradient>
          ))}

          {/* Per-edge gradients: TX→output */}
          {outputNodes.map((n, i) => (
            <linearGradient key={`go${i}`} id={`${pfx}-go${i}`}
              gradientUnits="userSpaceOnUse"
              x1={txRight} y1="0" x2={outLeftX} y2="0">
              <stop offset="0%"   stopColor={GOLD}    stopOpacity="0.85" />
              <stop offset="100%" stopColor={n.color} stopOpacity="0.85" />
            </linearGradient>
          ))}
        </defs>

        {/* Background */}
        <rect width={VB_W} height={canvasH + 36} fill={BG} />

        {/* Column labels */}
        <text x={COL_L + NW / 2} y={18} textAnchor="middle"
          fill="#888" fontSize={9} fontFamily="monospace" letterSpacing="2">
          INPUTS
        </text>
        <text x={TX_X + TX_W / 2} y={18} textAnchor="middle"
          fill="#888" fontSize={9} fontFamily="monospace" letterSpacing="2">
          TRANSACTION
        </text>
        <text x={COL_R + NW / 2} y={18} textAnchor="middle"
          fill="#888" fontSize={9} fontFamily="monospace" letterSpacing="2">
          OUTPUTS
        </text>

        {/* ── Edges: inputs → TX ── */}
        {inputNodes.map((n, i) => {
          const ny = inStartY + i * (NH + GAP) + NH / 2;
          return (
            <path key={`ei${i}`}
              d={cubic(inRightX, ny, txLeft, txCY)}
              fill="none"
              stroke={`url(#${pfx}-gi${i})`}
              strokeWidth={edgeStroke(n.value)}
              className="gflow"
            />
          );
        })}

        {/* ── Edges: TX → outputs ── */}
        {outputNodes.map((n, i) => {
          const ny = outStartY + i * (NH + GAP) + NH / 2;
          return (
            <path key={`eo${i}`}
              d={cubic(txRight, txCY, outLeftX, ny)}
              fill="none"
              stroke={`url(#${pfx}-go${i})`}
              strokeWidth={edgeStroke(n.value)}
              className="gflow"
            />
          );
        })}

        {/* ── Input nodes ── */}
        {inputNodes.map((n, i) => (
          <SvgNode key={n.id}
            x={COL_L} y={inStartY + i * (NH + GAP)}
            node={n} pfx={pfx}
          />
        ))}

        {/* ── TX center node (gold glow) ── */}
        <g filter={`url(#${pfx}-glow)`}
          onClick={() => onExplore(tx.txid, 'transaction')}
          style={{ cursor: 'pointer' }}
        >
          <rect x={TX_X} y={txY} width={TX_W} height={TX_H} rx={8}
            fill={hex2rgba(GOLD, 0.07)} stroke={GOLD} strokeWidth={1.5} />
          <text x={TX_X + TX_W / 2} y={txY + 19} textAnchor="middle"
            fill={GOLD} fontSize={9} fontFamily="monospace" fontWeight="bold" letterSpacing="2">
            TX
          </text>
          <text x={TX_X + TX_W / 2} y={txY + 35} textAnchor="middle"
            fill="#999" fontSize={9.5} fontFamily="monospace">
            {trH(tx.txid)}
          </text>
          {tx.blockheight && (
            <text x={TX_X + TX_W / 2} y={txY + 51} textAnchor="middle"
              fill="#999" fontSize={9} fontFamily="monospace">
              block #{tx.blockheight.toLocaleString()}
            </text>
          )}
          <text x={TX_X + TX_W / 2} y={txY + 67} textAnchor="middle"
            fill="#888" fontSize={9} fontFamily="monospace">
            {tx.vin.length} in · {tx.vout.length} out
          </text>
        </g>

        {/* ── Output nodes ── */}
        {outputNodes.map((n, i) => (
          <SvgNode key={n.id}
            x={COL_R} y={outStartY + i * (NH + GAP)}
            node={n} pfx={pfx}
          />
        ))}

        {/* ── Legend ── */}
        <g transform={`translate(${COL_L}, ${canvasH + 14})`}>
          {legend.map((item, i) => (
            <g key={item.label} transform={`translate(${i * 188}, 0)`}>
              <rect width={10} height={10} rx={2} fill={item.color} fillOpacity={0.7} />
              <text x={14} y={9} fill="#888" fontSize={8.5} fontFamily="monospace">
                {item.label}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

// ── TxGraph (main component) ──────────────────────────────────────────────────

export default function TxGraph({ windowId }: { windowId?: string }) {
  const [txid, setTxid]       = useState<string | null>(null);
  const [input, setInput]     = useState('');
  const [tx, setTx]           = useState<TxData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [sources, setSources] = useState<SourceMap>({});

  useEffect(() => {
    if (!windowId) return;
    const action = useExplorerStore.getState().consumeAction(windowId);
    if (action?.mode === 'tx-graph') setTxid(action.txid);
  }, [windowId]);

  const loadTx = useCallback(async (id: string) => {
    setLoading(true); setError(null); setTx(null); setSources({});
    try {
      const res  = await fetch(`/api/tx/${id}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const raw  = await res.json();
      const data: TxData = raw.result ?? raw.data ?? raw;
      setTx(data);

      const srcTxids = [...new Set(
        data.vin.filter(i => i.txid && !i.coinbase).slice(0, 6).map(i => i.txid!)
      )];

      if (srcTxids.length > 0) {
        setSources(Object.fromEntries(srcTxids.map(t => [t, { vout: [], loading: true }])));
        await Promise.all(srcTxids.map(async tid => {
          try {
            const r  = await fetch(`/api/tx/${tid}`);
            if (!r.ok) throw new Error('failed');
            const rj = await r.json();
            const d: TxData = rj.result ?? rj.data ?? rj;
            setSources(p => ({ ...p, [tid]: { vout: d.vout, loading: false } }));
          } catch {
            setSources(p => ({ ...p, [tid]: { vout: [], loading: false } }));
          }
        }));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error loading transaction');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { if (txid) loadTx(txid); }, [txid, loadTx]);

  const openExplorer = useCallback((q: string, type: 'transaction' | 't-address') => {
    const { windows, openWindow } = useWindowStore.getState();
    const { queueSearch }        = useExplorerStore.getState();
    const id   = `explorer-${type}-${q.slice(0, 8)}`;
    const size = { width: 860, height: 880 };
    const pos  = calculateWindowPosition(windows, size, window.innerWidth, window.innerHeight);
    if (!windows.find((w: { id: string }) => w.id === id)) {
      openWindow({ id, type: 'explorer', title: 'Explorer', position: pos, size, minSize: { width: 520, height: 480 } });
    }
    queueSearch(id, q, type);
    useWindowStore.getState().focusWindow(id);
  }, []);

  const hasShielded = tx && (
    (tx.vShieldedSpend?.length ?? 0) + (tx.vShieldedOutput?.length ?? 0) +
    (tx.orchard?.actions?.length ?? 0) > 0
  );

  return (
    <div className="flex flex-col h-full font-mono text-sm overflow-hidden" style={{ background: BG }}>
      {/* Search bar */}
      <div className="shrink-0 p-3 flex gap-2" style={{ borderBottom: '1px solid #111128' }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && input.trim() && setTxid(input.trim())}
          placeholder="Paste transaction ID to visualize…"
          className="flex-1 px-2 py-1.5 text-xs focus:outline-none"
          style={{ background: BG_N, border: '1px solid #1a1a3a', color: GREEN }}
        />
        <button
          onClick={() => input.trim() && setTxid(input.trim())}
          disabled={!input.trim() || loading}
          className="px-4 py-1.5 text-xs disabled:opacity-40 transition-colors"
          style={{ border: `1px solid ${GOLD}55`, color: GOLD, background: hex2rgba(GOLD, 0.07) }}
        >
          {loading ? '…' : 'Visualize'}
        </button>
      </div>

      {/* Graph */}
      <div className="flex-1 overflow-auto">
        {!txid && (
          <div className="text-center py-16 text-xs leading-relaxed" style={{ color: DIM }}>
            Paste a transaction ID above,<br />or open via "Graph ↗" in the Explorer.
          </div>
        )}
        {error && (
          <div className="p-4 text-xs" style={{ color: '#f97316' }}>{error}</div>
        )}
        {loading && (
          <AppLoader />
        )}
        {tx && !loading && (
          <TxSvgGraph tx={tx} sources={sources} onExplore={openExplorer} />
        )}
      </div>

      {/* Status bar */}
      {tx && (
        <div className="shrink-0 px-3 py-1.5 text-[10px] flex gap-4"
          style={{ borderTop: '1px solid #111128', color: DIM }}>
          <span>{trH(tx.txid)}</span>
          {tx.blockheight && <span>block #{tx.blockheight.toLocaleString()}</span>}
          <span>{tx.vin.length} in · {tx.vout.length} out</span>
          {hasShielded && <span style={{ color: PURPLE }}>has shielded activity</span>}
        </div>
      )}
    </div>
  );
}
