'use client';

import { useState, useEffect } from 'react';
import { useExplorerStore, BlockMapContext } from '@/store/explorerStore';
import { useWindowStore } from '@/store/windowStore';
import { calculateWindowPosition } from '@/utils/windowPlacement';

// Color derived from txid — maps to teal → blue → indigo → purple → magenta range
function txColor(txid: string, isCoinbase: boolean): string {
  if (isCoinbase) return '#FFD700';
  const h = parseInt(txid.slice(0, 4), 16);
  const hue = 180 + (h % 160);             // 180-340
  const sat = 55 + (parseInt(txid.slice(4, 6), 16) % 35);
  const lit = 42 + (parseInt(txid.slice(6, 8), 16) % 22);
  return `hsl(${hue}, ${sat}%, ${lit}%)`;
}

function txLabel(index: number): string {
  return index === 0 ? 'Coinbase' : 'Transaction';
}

function formatTime(unix: number): string {
  return new Date(unix * 1000).toLocaleString();
}
function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(2)} MB`;
}

export function BlockMap({ windowId }: { windowId?: string }) {
  const { consumeAction } = useExplorerStore();
  const { windows, openWindow } = useWindowStore();
  const [ctx, setCtx] = useState<BlockMapContext | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (!windowId) return;
    const action = consumeAction(windowId);
    if (action?.mode === 'block-map') setCtx(action as BlockMapContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowId]);

  const openTx = (txid: string, index: number) => {
    // Deterministic ID so clicking the same tx twice just focuses the existing window
    const id = `explorer-tx-bm-${txid.slice(0, 16)}`;
    const { queueSearch } = useExplorerStore.getState();
    queueSearch(id, txid, 'transaction');
    const pos = calculateWindowPosition(windows, { width: 720, height: 680 }, window.innerWidth, window.innerHeight);
    openWindow({
      id,
      type: 'explorer',
      title: `${index === 0 ? 'Coinbase' : 'TX'} ${txid.slice(0, 14)}…`,
      position: pos,
      size: { width: 720, height: 680 },
      minSize: { width: 520, height: 480 },
    });
  };

  if (!ctx) {
    return (
      <div className="h-full flex items-center justify-center bg-[var(--bg-window)]">
        <span className="text-[var(--text-amber)] font-mono text-sm">Open Block Map from a block in the Explorer.</span>
      </div>
    );
  }

  const { blockHeight, blockHash, transactions, time, size } = ctx;
  const hoveredTx = hovered !== null ? transactions[hovered] : null;

  const CELL = 26;
  const GAP  = 3;
  const COLS  = Math.min(20, Math.max(4, Math.ceil(Math.sqrt(transactions.length * 1.4))));

  return (
    <div className="h-full flex flex-col bg-[var(--bg-window)] overflow-hidden" style={{ fontFamily: 'monospace' }}>
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-[var(--border-window)] bg-[var(--bg-titlebar)]">
        <div className="flex items-baseline gap-3">
          <span className="text-[var(--accent-gold)] font-bold text-lg">Block #{blockHeight.toLocaleString()}</span>
          <span className="text-[var(--text-secondary)] text-sm">
            {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} · {formatBytes(size)} · {formatTime(time)}
          </span>
        </div>
        <div className="text-[var(--text-muted)] text-xs mt-0.5 truncate" title={blockHash}>{blockHash}</div>
        {transactions.length <= 3 && (
          <div className="text-[var(--text-muted)] text-xs mt-1.5 leading-relaxed">
            <span className="text-[var(--accent-gold)]">ℹ</span> This block has very few transactions — Zcash blocks can be sparse
            when network activity is low. The coinbase (miner reward) is always present; any others
            are user transactions that were included in this block.
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex-shrink-0 px-4 py-2 border-b border-[var(--border-window)] flex flex-wrap gap-4 items-center text-xs">
        <span className="flex items-center gap-1.5">
          <span style={{ width: 14, height: 14, background: '#FFD700', display: 'inline-block', borderRadius: 3 }} />
          <span className="text-[var(--text-secondary)]">Coinbase (miner reward)</span>
        </span>
        {/* Gradient strip showing the tx color range */}
        <span className="flex items-center gap-1.5">
          <span style={{
            width: 60, height: 14, borderRadius: 3, display: 'inline-block',
            background: 'linear-gradient(90deg, hsl(180,65%,50%), hsl(230,70%,52%), hsl(280,70%,50%), hsl(320,65%,52%), hsl(340,65%,50%))',
          }} />
          <span className="text-[var(--text-secondary)]">Transactions (teal → blue → purple → magenta, derived from txid)</span>
        </span>
        <span className="ml-auto text-[var(--text-muted)] italic">Click a cell to explore that transaction</span>
      </div>

      {/* Tooltip strip */}
      <div className="flex-shrink-0 px-4 py-2 border-b border-[var(--border-window)] bg-[#0a0a1a]" style={{ minHeight: 44 }}>
        {hoveredTx ? (
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[var(--text-amber)] text-sm font-bold">{txLabel(hovered!)}</span>
              {hovered === 0 && <span className="text-[var(--text-muted)] text-xs">⛏ Block reward — mined ZEC issued to the miner</span>}
            </div>
            <div className="text-[var(--accent-gold)] text-xs font-mono truncate">{hoveredTx}</div>
          </div>
        ) : (
          <div className="text-[var(--text-muted)] text-xs leading-relaxed">
            Hover a cell to see the txid · click to open the transaction in a new Explorer window
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-auto p-4">
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`, gap: GAP }}>
          {transactions.map((txid, i) => {
            const color = txColor(txid, i === 0);
            const isHov = hovered === i;
            return (
              <div
                key={txid || i}
                title={`${txLabel(i)}: ${txid}`}
                onClick={() => txid && openTx(txid, i)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  width: CELL,
                  height: CELL,
                  background: color,
                  borderRadius: 4,
                  cursor: 'pointer',
                  opacity: isHov ? 1 : 0.82,
                  transform: isHov ? 'scale(1.3)' : 'scale(1)',
                  transition: 'transform 0.1s, opacity 0.1s',
                  boxShadow: isHov ? `0 0 10px ${color}` : 'none',
                  position: 'relative',
                  zIndex: isHov ? 2 : 1,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 px-4 py-2 border-t border-[var(--border-window)] text-xs text-[var(--text-muted)]">
        {transactions.length} cell{transactions.length !== 1 ? 's' : ''} · each color is unique and derived from the txid hash · ⛏ coinbase is always gold
      </div>
    </div>
  );
}

export default BlockMap;
