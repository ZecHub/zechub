'use client';

import { useState } from 'react';
import { AppLoader } from '@/components/ui/AppLoader';

interface BlockData {
  height: number;
  hash: string;
  time: number;
  tx: string[];
  size: number;
  difficulty: number;
  nonce: string;
  bits: string;
  merkleroot?: string;
  previousblockhash?: string;
  chainwork?: string;
  nShieldedTx?: number;
  [key: string]: unknown;
}

interface ColState {
  query: string;
  data: BlockData | null;
  loading: boolean;
  error: string | null;
}

const COMPARE_FIELDS: Array<{ key: string; label: string; fmt?: (v: unknown) => string }> = [
  { key: 'height',       label: 'Height',        fmt: v => Number(v).toLocaleString() },
  { key: 'hash',         label: 'Hash',           fmt: v => String(v).slice(0, 20) + '…' },
  { key: 'time',         label: 'Timestamp',      fmt: v => new Date(Number(v) * 1000).toUTCString() },
  { key: 'tx',           label: 'Transactions',   fmt: v => Array.isArray(v) ? v.length.toLocaleString() : '—' },
  { key: 'nShieldedTx',  label: 'Shielded TXs',  fmt: v => v != null ? String(v) : '—' },
  { key: 'size',         label: 'Size (bytes)',    fmt: v => Number(v).toLocaleString() },
  { key: 'difficulty',   label: 'Difficulty',     fmt: v => Number(v).toExponential(3) },
  { key: 'bits',         label: 'Bits',           fmt: v => String(v) },
  { key: 'nonce',        label: 'Nonce',          fmt: v => String(v).slice(0, 24) + '…' },
  { key: 'merkleroot',   label: 'Merkle Root',    fmt: v => v ? String(v).slice(0, 16) + '…' : '—' },
  { key: 'previousblockhash', label: 'Prev Hash', fmt: v => v ? String(v).slice(0, 16) + '…' : '—' },
];

function valEq(a: BlockData | null, b: BlockData | null, key: string): boolean {
  if (!a || !b) return false;
  const av = a[key];
  const bv = b[key];
  if (Array.isArray(av) && Array.isArray(bv)) return av.length === bv.length;
  return String(av) === String(bv);
}

async function fetchBlock(q: string): Promise<BlockData> {
  const res = await fetch(`/api/block/${q.trim()}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  const raw = await res.json();
  // Unwrap envelope same as Explorer
  if (raw.result && typeof raw.result === 'object') return raw.result;
  if (raw.data && typeof raw.data === 'object' && !Array.isArray(raw.data)) return raw.data;
  if (raw.block && typeof raw.block === 'object') return raw.block;
  return raw;
}

function BlockColumn({
  label,
  state,
  onQuery,
  onSearch,
  onExplore,
}: {
  label: string;
  state: ColState;
  onQuery: (q: string) => void;
  onSearch: () => void;
  onExplore: (hash: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-[var(--accent-gold)] text-xs font-bold uppercase tracking-wide">{label}</div>
      <div className="flex gap-1">
        <input
          type="text"
          value={state.query}
          onChange={e => onQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSearch()}
          placeholder="Height or hash…"
          className="flex-1 bg-[var(--bg-inset)] border border-[var(--border-window)] text-[var(--text-green)] px-2 py-1.5 text-xs focus:outline-none focus:border-[var(--accent-gold)] font-mono"
        />
        <button
          onClick={onSearch}
          disabled={!state.query.trim() || state.loading}
          className="btn-window px-2 py-1.5 text-xs text-[var(--accent-gold)] disabled:opacity-50"
        >
          {state.loading ? '…' : 'Fetch'}
        </button>
      </div>
      {state.error && <div className="text-[var(--accent-orange)] text-xs">{state.error}</div>}
      {state.loading && (
        <div className="py-6">
          <AppLoader />
        </div>
      )}
      {state.data && (
        <button
          onClick={() => onExplore(state.data!.hash)}
          className="self-start text-[10px] px-2 py-1 border border-[var(--accent-purple)]/50 text-[var(--accent-purple)] hover:text-[var(--accent-gold)]"
        >
          ↗ Open in Explorer
        </button>
      )}
    </div>
  );
}

export default function BlockComparison({ windowId: _windowId }: { windowId?: string }) {
  const [left, setLeft] = useState<ColState>({ query: '', data: null, loading: false, error: null });
  const [right, setRight] = useState<ColState>({ query: '', data: null, loading: false, error: null });

  const fetchFor = async (side: 'left' | 'right', query: string) => {
    const setter = side === 'left' ? setLeft : setRight;
    setter(s => ({ ...s, loading: true, error: null }));
    try {
      const data = await fetchBlock(query);
      setter(s => ({ ...s, data, loading: false }));
    } catch (e) {
      setter(s => ({ ...s, loading: false, error: e instanceof Error ? e.message : 'Error' }));
    }
  };

  const openInExplorer = (hash: string) => {
    const { useWindowStore } = require('@/store/windowStore');
    const { useExplorerStore } = require('@/store/explorerStore');
    const { calculateWindowPosition } = require('@/utils/windowPlacement');
    const { windows, openWindow } = useWindowStore.getState();
    const id = `explorer-block-${hash.slice(0, 8)}`;
    const size = { width: 860, height: 880 };
    const pos = calculateWindowPosition(windows, size, window.innerWidth, window.innerHeight);
    if (!windows.find((w: { id: string }) => w.id === id)) {
      openWindow({ id, type: 'explorer', title: 'Explorer', position: pos, size, minSize: { width: 520, height: 480 } });
    }
    useExplorerStore.getState().queueSearch(id, hash, 'block');
    useWindowStore.getState().focusWindow(id);
  };

  const hasBoth = left.data && right.data;

  return (
    <div className="flex flex-col h-full bg-[var(--bg-window)] font-mono text-sm overflow-hidden">
      {/* Header inputs */}
      <div className="grid grid-cols-2 gap-3 p-3 border-b border-[var(--border-window)] shrink-0">
        <BlockColumn
          label="Block A"
          state={left}
          onQuery={q => setLeft(s => ({ ...s, query: q }))}
          onSearch={() => fetchFor('left', left.query)}
          onExplore={openInExplorer}
        />
        <BlockColumn
          label="Block B"
          state={right}
          onQuery={q => setRight(s => ({ ...s, query: q }))}
          onSearch={() => fetchFor('right', right.query)}
          onExplore={openInExplorer}
        />
      </div>

      {/* Comparison table */}
      <div className="flex-1 overflow-y-auto">
        {!left.data && !right.data ? (
          <div className="text-[var(--text-muted)] text-xs text-center py-12 px-6 leading-relaxed">
            Enter two block heights or hashes above to compare them side-by-side.
          </div>
        ) : (
          <table className="w-full text-xs border-collapse">
            <thead className="sticky top-0 bg-[var(--bg-window)] z-10">
              <tr>
                <th className="text-left px-3 py-2 text-[var(--text-amber)] border-b border-[var(--border-window)] w-32">Field</th>
                <th className="text-left px-3 py-2 text-[var(--accent-gold)] border-b border-[var(--border-window)]">Block A</th>
                <th className="text-left px-3 py-2 text-[var(--accent-gold)] border-b border-[var(--border-window)]">Block B</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_FIELDS.map(({ key, label, fmt }) => {
                const eq = valEq(left.data, right.data, key);
                const diff = hasBoth && !eq;
                const rowBg = diff ? 'bg-[rgba(255,215,0,0.05)]' : '';
                const valStyle = diff ? 'text-[var(--accent-gold)]' : 'text-[var(--text-green)]';
                const leftVal = left.data ? fmt ? fmt(left.data[key]) : String(left.data[key] ?? '—') : '—';
                const rightVal = right.data ? fmt ? fmt(right.data[key]) : String(right.data[key] ?? '—') : '—';
                return (
                  <tr key={key} className={`border-b border-[var(--border-window)]/40 hover:bg-[var(--bg-inset)] ${rowBg}`}>
                    <td className="px-3 py-2 text-[var(--text-muted)] whitespace-nowrap">{label}</td>
                    <td className={`px-3 py-2 font-mono ${valStyle}`}>{leftVal}</td>
                    <td className={`px-3 py-2 font-mono ${valStyle}`}>{rightVal}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {hasBoth && (
          <div className="p-3 border-t border-[var(--border-window)] text-[var(--text-muted)] text-[10px]">
            {COMPARE_FIELDS.filter(({ key }) => !valEq(left.data, right.data, key)).length} field(s) differ ·{' '}
            Block height delta: {Math.abs((left.data?.height ?? 0) - (right.data?.height ?? 0)).toLocaleString()} blocks ·{' '}
            Time delta: {Math.abs((left.data?.time ?? 0) - (right.data?.time ?? 0)).toLocaleString()}s
          </div>
        )}
      </div>
    </div>
  );
}
