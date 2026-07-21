'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useWindowStore } from '@/store/windowStore';
import { useExplorerStore } from '@/store/explorerStore';
import { calculateWindowPosition } from '@/utils/windowPlacement';
import { AppLoader } from '@/components/ui/AppLoader';
import { useIsAdmin } from '@/store/authStore';

interface MempoolTx {
  txid: string;
  size: number;
  feeZec: number;
  feeZat: number;
  feeRateZatPerByte: number;
  time: number;
  ageSeconds: number;
  height: number;
  descendantCount: number;
  depends: string[];
  shielded: boolean | null;
  // enriched fields
  type: 'transparent' | 'shielded' | 'mixed' | null;
  orchardActions: number;
  saplingSpends: number;
  saplingOutputs: number;
  shieldedActions: number;
  saplingValueBalanceZat: number;
  orchardValueBalanceZat: number;
  version: number;
  expiryHeight: number;
}

interface MempoolSummary {
  count: number;
  bytes: number;
  totalFeeZec: number;
  medianFeeRateZatPerByte: number;
  byType?: { transparent: number; shielded: number; mixed: number };
  totalShieldedActions?: number;
}

type View = 'heat' | 'type' | 'table';
const REFRESH_MS = 12_000;

// fee rate color: red (floor ~1 zat/B) → green (high ~10+ zat/B)
function feeColor(rate: number): string {
  const t = Math.min(1, Math.max(0, (rate - 1) / 9));
  const r = Math.round(210 * (1 - t));
  const g = Math.round(60 + 160 * t);
  return `rgb(${r},${g},40)`;
}

// tx type color: transparent=amber, sapling=purple, orchard=green, both=teal, mixed=blue
function typeColor(tx: MempoolTx): string {
  if (tx.type === 'transparent') return 'rgb(175, 110, 30)';
  if (tx.type === 'mixed')       return 'rgb(40, 110, 210)';
  if (tx.type === 'shielded') {
    const hasOrchard = tx.orchardActions > 0;
    const hasSapling = tx.saplingSpends > 0 || tx.saplingOutputs > 0;
    if (hasOrchard && hasSapling) return 'rgb(40, 180, 170)'; // teal — both protocols
    if (hasOrchard)               return 'rgb(60, 185, 80)';  // orchard green
    if (hasSapling)               return 'rgb(140, 70, 230)'; // sapling purple
    return 'rgb(110, 80, 200)';                               // shielded, detail unavailable
  }
  return 'rgb(65, 65, 65)'; // null / unknown
}

// label shown inside cell for type mode
function typeLabel(tx: MempoolTx): string {
  if (tx.type === 'transparent') return 'T';
  if (tx.type === 'mixed')       return 'M';
  if (tx.type === 'shielded') {
    const hasOrchard = tx.orchardActions > 0;
    const hasSapling = tx.saplingSpends > 0 || tx.saplingOutputs > 0;
    if (hasOrchard && hasSapling) return 'S+O';
    if (hasOrchard)               return 'O';
    if (hasSapling)               return 'S';
    return 'Z';
  }
  return '?';
}

function typeSubline(tx: MempoolTx): string {
  if (tx.orchardActions > 0 && tx.saplingOutputs + tx.saplingSpends > 0)
    return `${tx.orchardActions}⬡ ${tx.saplingOutputs + tx.saplingSpends}◆`;
  if (tx.orchardActions > 0)  return `${tx.orchardActions} act`;
  if (tx.saplingOutputs > 0 || tx.saplingSpends > 0)
    return `${tx.saplingOutputs}↓${tx.saplingSpends}↑`;
  return `${tx.size}B`;
}

function fmtAge(s: number): string {
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m ${s % 60}s`;
  return `${Math.floor(s / 3600)}h ${Math.floor((s % 3600) / 60)}m`;
}

function fmtBytes(b: number): string {
  if (b < 1024) return `${b} B`;
  if (b < 1_048_576) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1_048_576).toFixed(2)} MB`;
}

function truncTxid(txid: string): string {
  return txid.slice(0, 8) + '…' + txid.slice(-6);
}

function openTxInExplorer(txid: string) {
  const { windows, openWindow } = useWindowStore.getState();
  const { queueSearch } = useExplorerStore.getState();
  const id = `explorer-tx-${txid.slice(0, 8)}`;
  const size = { width: 860, height: 880 };
  const pos = calculateWindowPosition(windows, size, window.innerWidth, window.innerHeight);
  if (!windows.find(w => w.id === id)) {
    openWindow({ id, type: 'explorer', title: 'Explorer', position: pos, size, minSize: { width: 520, height: 480 } });
  }
  queueSearch(id, txid, 'transaction');
  useWindowStore.getState().focusWindow(id);
}

function ShieldedBadge({ shielded }: { shielded: boolean | null }) {
  if (shielded === true) return <span className="text-[var(--accent-purple)]" title="Shielded">🔒</span>;
  if (shielded === null) return <span className="text-[var(--text-muted)] opacity-40" title="Undetermined">?</span>;
  return <span className="text-[var(--text-muted)] opacity-20" title="Transparent">—</span>;
}

// ── Table view ────────────────────────────────────────────────────────────────
function TableView({ txs }: { txs: MempoolTx[] }) {
  if (txs.length === 0) {
    return <div className="flex-1 flex items-center justify-center text-[var(--text-muted)] text-xs font-mono">Mempool is empty</div>;
  }
  return (
    <div className="flex-1 overflow-auto min-h-0">
      <div
        className="sticky top-0 bg-[var(--bg-titlebar)] border-b border-[var(--border-window)] grid text-[10px] font-bold uppercase tracking-wide text-[var(--text-muted)] px-3 py-1.5"
        style={{ gridTemplateColumns: '10rem 4.5rem 8rem 6rem 5rem 5rem 1.5rem' }}
      >
        <span>TXID</span>
        <span className="text-right">Size</span>
        <span className="text-right">Fee (ZEC)</span>
        <span className="text-right">zat/byte</span>
        <span className="text-right">Age</span>
        <span className="text-right">Deps</span>
        <span className="text-center">🔒</span>
      </div>
      {txs.map(tx => (
        <div
          key={tx.txid}
          className="grid items-center text-xs font-mono px-3 py-1.5 border-b border-[var(--border-window)]/40 hover:bg-[var(--bg-inset)] cursor-pointer transition-colors"
          style={{ gridTemplateColumns: '10rem 4.5rem 8rem 6rem 5rem 5rem 1.5rem' }}
          onClick={() => openTxInExplorer(tx.txid)}
          title={tx.txid}
        >
          <span className="text-[var(--text-green)] truncate">{truncTxid(tx.txid)}</span>
          <span className="text-right text-[var(--text-muted)]">{tx.size}B</span>
          <span className="text-right text-[var(--text-amber)]">{tx.feeZec.toFixed(6)}</span>
          <span className="text-right font-bold" style={{ color: feeColor(tx.feeRateZatPerByte) }}>
            {tx.feeRateZatPerByte.toFixed(1)}
          </span>
          <span className="text-right text-[var(--text-muted)]">{fmtAge(tx.ageSeconds)}</span>
          <span className="text-right text-[var(--text-muted)]">
            {tx.depends.length > 0 ? <span className="text-[var(--accent-orange)]">{tx.depends.length}</span> : '—'}
          </span>
          <span className="text-center"><ShieldedBadge shielded={tx.shielded} /></span>
        </div>
      ))}
    </div>
  );
}

// ── Heatmap view ──────────────────────────────────────────────────────────────
function HeatmapView({ txs, colorMode }: { txs: MempoolTx[]; colorMode: 'fee' | 'type' }) {
  if (txs.length === 0) {
    return <div className="flex-1 flex items-center justify-center text-[var(--text-muted)] text-xs font-mono">Mempool is empty</div>;
  }
  const sorted = colorMode === 'fee'
    ? [...txs].sort((a, b) => b.feeRateZatPerByte - a.feeRateZatPerByte)
    : [...txs].sort((a, b) => {
        // group: transparent → mixed → shielded; within shielded sort by action count desc
        const order = { transparent: 0, mixed: 1, shielded: 2, null: 3 };
        const ao = order[a.type ?? 'null'] ?? 3;
        const bo = order[b.type ?? 'null'] ?? 3;
        if (ao !== bo) return ao - bo;
        return (b.orchardActions + b.shieldedActions) - (a.orchardActions + a.shieldedActions);
      });

  return (
    <div className="flex-1 overflow-auto min-h-0 p-3">
      <div className="flex flex-wrap gap-1">
        {sorted.map(tx => {
          const bg = colorMode === 'fee' ? feeColor(tx.feeRateZatPerByte) : typeColor(tx);
          const tooltip = colorMode === 'fee'
            ? `${tx.txid}\n${tx.feeRateZatPerByte.toFixed(1)} zat/B · ${tx.feeZec.toFixed(6)} ZEC · ${fmtAge(tx.ageSeconds)} old`
            : `${tx.txid}\nType: ${tx.type ?? 'unknown'} · Orchard: ${tx.orchardActions} · Sapling out: ${tx.saplingOutputs} · in: ${tx.saplingSpends} · ${fmtAge(tx.ageSeconds)} old`;
          return (
            <button
              key={tx.txid}
              onClick={() => openTxInExplorer(tx.txid)}
              className="hover:brightness-110 active:brightness-125 transition-all"
              style={{ width: 64, height: 64, background: bg, border: '1px solid rgba(0,0,0,0.25)' }}
              title={tooltip}
            >
              <div className="flex flex-col items-center justify-center h-full gap-0.5 font-mono">
                {colorMode === 'fee' ? (
                  <>
                    <span style={{ color: 'rgba(255,255,255,0.97)', fontSize: 13, fontWeight: 800, lineHeight: 1, textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                      {tx.feeRateZatPerByte.toFixed(1)}
                    </span>
                    <span style={{ color: 'rgba(255,255,255,0.82)', fontSize: 10, lineHeight: 1, textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>{tx.size}B</span>
                    {tx.shielded === true && <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 10, lineHeight: 1 }}>🔒</span>}
                  </>
                ) : (
                  <>
                    <span style={{ color: 'rgba(255,255,255,0.97)', fontSize: 14, fontWeight: 900, lineHeight: 1, textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
                      {typeLabel(tx)}
                    </span>
                    <span style={{ color: 'rgba(255,255,255,0.80)', fontSize: 9, lineHeight: 1, textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                      {typeSubline(tx)}
                    </span>
                  </>
                )}
                {tx.depends.length > 0 && (
                  <span style={{ color: 'rgba(255,230,80,0.95)', fontSize: 9, fontWeight: 700, textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>D{tx.depends.length}</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Root component ────────────────────────────────────────────────────────────
export default function Mempool({ windowId: _windowId }: { windowId?: string }) {
  const isAdmin = useIsAdmin();
  const [txs, setTxs] = useState<MempoolTx[]>([]);
  const [summary, setSummary] = useState<MempoolSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<View>('heat');
  const [lastRefresh, setLastRefresh] = useState(0);
  const [countdown, setCountdown] = useState(REFRESH_MS / 1000);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchMempool = useCallback(async () => {
    try {
      const res = await fetch('/api/mempool');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const rawTxs: MempoolTx[] = (json.transactions ?? []).map((t: Record<string, unknown>) => ({
        txid: String(t.txid ?? ''),
        size: Number(t.size) || 0,
        feeZec: parseFloat(String(t.feeZec ?? '0')) || 0,
        feeZat: Number(t.feeZat) || 0,
        feeRateZatPerByte: Number(t.feeRateZatPerByte) || 0,
        time: Number(t.time) || 0,
        ageSeconds: Number(t.ageSeconds) || 0,
        height: Number(t.height) || 0,
        descendantCount: Number(t.descendantCount) || 0,
        depends: Array.isArray(t.depends) ? (t.depends as string[]) : [],
        shielded: t.shielded === null ? null : Boolean(t.shielded),
        type: (['transparent', 'shielded', 'mixed'].includes(String(t.type)) ? t.type : null) as MempoolTx['type'],
        orchardActions: Number(t.orchardActions) || 0,
        saplingSpends: Number(t.saplingSpends) || 0,
        saplingOutputs: Number(t.saplingOutputs) || 0,
        shieldedActions: Number(t.shieldedActions) || 0,
        saplingValueBalanceZat: Number(t.saplingValueBalanceZat) || 0,
        orchardValueBalanceZat: Number(t.orchardValueBalanceZat) || 0,
        version: Number(t.version) || 0,
        expiryHeight: Number(t.expiryHeight) || 0,
      }));
      setTxs(rawTxs);
      const s = json.summary;
      if (s) {
        const bt = s.byType as { transparent?: number; shielded?: number; mixed?: number } | undefined;
        setSummary({
          count: Number(s.count) || 0,
          bytes: Number(s.bytes) || 0,
          totalFeeZec: parseFloat(String(s.totalFeeZec ?? '0')) || 0,
          medianFeeRateZatPerByte: Number(s.medianFeeRateZatPerByte) || 0,
          byType: bt ? { transparent: Number(bt.transparent) || 0, shielded: Number(bt.shielded) || 0, mixed: Number(bt.mixed) || 0 } : undefined,
          totalShieldedActions: s.totalShieldedActions != null ? Number(s.totalShieldedActions) : undefined,
        });
      }
      setError(null);
      setLastRefresh(Date.now());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch mempool');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMempool();
    const iv = setInterval(fetchMempool, REFRESH_MS);
    return () => clearInterval(iv);
  }, [fetchMempool]);

  // Countdown display
  useEffect(() => {
    if (lastRefresh === 0) return;
    if (countdownRef.current) clearInterval(countdownRef.current);
    setCountdown(REFRESH_MS / 1000);
    countdownRef.current = setInterval(() => {
      setCountdown(c => (c <= 1 ? REFRESH_MS / 1000 : c - 1));
    }, 1000);
    return () => { if (countdownRef.current) clearInterval(countdownRef.current); };
  }, [lastRefresh]);

  // prefer enriched type field; fall back to legacy shielded boolean
  const hasTypeData = txs.some(t => t.type !== null);
  const shieldedCount   = hasTypeData ? txs.filter(t => t.type === 'shielded').length  : txs.filter(t => t.shielded === true).length;
  const transparentCount= hasTypeData ? txs.filter(t => t.type === 'transparent').length : txs.filter(t => t.shielded === false).length;
  const mixedCount      = hasTypeData ? txs.filter(t => t.type === 'mixed').length : 0;
  const unknownCount    = hasTypeData ? txs.filter(t => t.type === null).length : txs.filter(t => t.shielded === null).length;

  return (
    <div className="h-full flex flex-col bg-[var(--bg-window)] font-mono">

      {/* Header */}
      <div className="flex-shrink-0 px-4 py-2.5 border-b border-[var(--border-window)] bg-[var(--bg-titlebar)] flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-base">⏳</span>
          <span className="text-[var(--accent-gold)] font-bold text-base">Mempool</span>
        </div>
        <div className="flex gap-1">
          {(['heat', 'type', 'table'] as View[]).map(v => (
            <button key={v} onClick={() => setView(v)}
              className={`text-xs px-3 py-1 border transition-colors ${view === v
                ? 'border-[var(--accent-gold)] text-[var(--accent-gold)] bg-[var(--accent-gold)]/10'
                : 'border-[var(--border-window)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}>
              {v === 'heat' ? 'Fee Rate' : v === 'type' ? 'Tx Type' : 'Table'}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2 text-xs">
          {isAdmin && (
            <button
              onClick={fetchMempool}
              className="px-2 py-0.5 border border-[var(--border-window)] text-[var(--text-muted)] hover:text-[var(--accent-gold)] hover:border-[var(--accent-gold)] transition-colors"
              title="Refresh now"
            >
              ↺
            </button>
          )}
          <span className="text-[var(--text-muted)]">↺ {countdown}s</span>
        </div>
      </div>

      {/* Summary bar */}
      {summary && (
        <div
          className="flex-shrink-0 grid text-xs px-4 py-2 border-b border-[var(--border-window)]"
          style={{ gridTemplateColumns: 'repeat(4, 1fr)', background: 'rgba(255,255,255,0.02)' }}
        >
          <div>
            <div className="text-[var(--text-muted)] text-[10px] uppercase tracking-wide">Pending TXs</div>
            <div className="text-[var(--accent-gold)] font-bold text-sm">{summary.count.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-[var(--text-muted)] text-[10px] uppercase tracking-wide">Total Size</div>
            <div className="text-[var(--text-primary)]">{fmtBytes(summary.bytes)}</div>
          </div>
          <div>
            <div className="text-[var(--text-muted)] text-[10px] uppercase tracking-wide">Total Fees</div>
            <div className="text-[var(--accent-green)]">{summary.totalFeeZec.toFixed(4)} ZEC</div>
          </div>
          <div>
            <div className="text-[var(--text-muted)] text-[10px] uppercase tracking-wide">Median Rate</div>
            <div className="font-bold" style={{ color: feeColor(summary.medianFeeRateZatPerByte) }}>
              {summary.medianFeeRateZatPerByte.toFixed(2)} zat/B
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {loading && (
          <div className="flex-1"><AppLoader /></div>
        )}
        {!loading && error && (
          <div className="flex-1 flex items-center justify-center text-[var(--accent-orange)] text-xs px-6 text-center">{error}</div>
        )}
        {!loading && !error && view === 'heat' && <HeatmapView txs={txs} colorMode="fee" />}
        {!loading && !error && view === 'type' && <HeatmapView txs={txs} colorMode="type" />}
        {!loading && !error && view === 'table' && <TableView txs={txs} />}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 px-4 py-1.5 border-t border-[var(--border-window)] text-xs text-[var(--text-muted)] flex items-center gap-3">
        <span className="flex gap-2 flex-wrap">
          {shieldedCount > 0   && <span style={{ color: 'rgb(140, 70, 230)' }}>◆ {shieldedCount} shielded</span>}
          {mixedCount > 0      && <span style={{ color: 'rgb(40, 110, 210)' }}>◈ {mixedCount} mixed</span>}
          {transparentCount > 0 && <span className="text-[var(--text-muted)]">○ {transparentCount} transparent</span>}
          {unknownCount > 0    && <span className="opacity-40">{unknownCount} ?</span>}
        </span>
        <span className="ml-auto opacity-70">
          {view === 'heat'
            ? 'fee rate: red=low · green=high'
            : view === 'type'
            ? 'T=transparent · S=sapling · O=orchard · S+O=both · M=mixed'
            : 'click row to explore · D=unconfirmed deps'}
        </span>
      </div>
    </div>
  );
}
