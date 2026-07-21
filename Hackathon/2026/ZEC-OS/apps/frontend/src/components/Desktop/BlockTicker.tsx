'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useWindowStore } from '@/store/windowStore';
import { useExplorerStore } from '@/store/explorerStore';
import { useTickerStore } from '@/store/tickerStore';
import { calculateWindowPosition } from '@/utils/windowPlacement';

interface TickerBlock {
  height: number;
  hash: string;
  txCount: number;
  time: number;
  tag: string | null;
  arrivedAt: number;
}

function blockColor(hash: string): string {
  if (!hash || hash.length < 8) return 'hsl(220,55%,45%)';
  const h = parseInt(hash.slice(0, 4), 16);
  const hue = 180 + (h % 160);
  const sat = 55 + (parseInt(hash.slice(4, 6), 16) % 35);
  const lit = 42 + (parseInt(hash.slice(6, 8), 16) % 22);
  return `hsl(${hue}, ${sat}%, ${lit}%)`;
}

function formatDelta(ms: number): string {
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s ago`;
  return `${Math.floor(s / 60)}m ${s % 60}s ago`;
}

function formatInterval(unix: number, prev: number): string {
  const d = unix - prev;
  if (d <= 0) return '';
  if (d < 60) return `Δ${d}s`;
  return `Δ${Math.floor(d / 60)}m${d % 60}s`;
}

const MAX_BLOCKS = 14;
const POLL_MS = 15_000;

export default function BlockTicker() {
  const visible = useTickerStore(s => s.visible);
  const hide = useTickerStore(s => s.hide);

  const [blocks, setBlocks] = useState<TickerBlock[]>([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScrollLeft = useRef(0);
  const lastHeightRef = useRef<number>(0);
  const nowRef = useRef<number>(0);
  const [, forceRender] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => forceRender(n => n + 1), 10_000);
    return () => clearInterval(iv);
  }, []);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    setTimeout(updateArrows, 60);
  }, [blocks, updateArrows]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 220, behavior: 'smooth' });
    setTimeout(updateArrows, 350);
  };

  // Mouse drag on document so it works even if cursor leaves the strip
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current || !scrollRef.current) return;
      const dx = e.clientX - dragStartX.current;
      scrollRef.current.scrollLeft = dragStartScrollLeft.current - dx;
      updateArrows();
    };
    const onUp = () => { isDragging.current = false; };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [updateArrows]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartScrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
    e.preventDefault();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    dragStartX.current = e.touches[0].clientX;
    dragStartScrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const dx = e.touches[0].clientX - dragStartX.current;
    scrollRef.current.scrollLeft = dragStartScrollLeft.current - dx;
    updateArrows();
  };
  const handleTouchEnd = () => { isDragging.current = false; };

  const fetchLatest = useCallback(async () => {
    nowRef.current = Date.now();
    try {
      const chainRes = await fetch('/api/chain');
      if (!chainRes.ok) return;
      const chain = await chainRes.json();
      const height: number = chain?.height ?? chain?.result?.height ?? 0;
      if (!height || height === lastHeightRef.current) return;

      const toFetch = Math.min(height - lastHeightRef.current, 3);
      const promises = Array.from({ length: toFetch }, (_, i) =>
        fetch(`/api/block/${height - i}`).then(r => r.ok ? r.json() : null)
      );

      const results = await Promise.all(promises);
      const newBlocks: TickerBlock[] = [];

      for (const raw of results) {
        if (!raw) continue;
        const d = raw?.result ?? raw?.data ?? raw;
        const h: number = d?.height ?? 0;
        if (!h) continue;
        newBlocks.push({
          height: h,
          hash: d?.hash ?? '',
          txCount: d?.tx?.length ?? d?.txCount ?? 0,
          time: d?.time ?? 0,
          tag: null,
          arrivedAt: nowRef.current,
        });
      }

      if (newBlocks.length > 0) {
        setBlocks(prev => {
          const merged = [...newBlocks, ...prev];
          const seen = new Set<number>();
          return merged.filter(b => {
            if (seen.has(b.height)) return false;
            seen.add(b.height);
            return true;
          }).slice(0, MAX_BLOCKS);
        });
        lastHeightRef.current = height;
      }
    } catch {
      // silently ignore
    }
  }, []);

  useEffect(() => {
    fetchLatest();
    const iv = setInterval(fetchLatest, POLL_MS);
    return () => clearInterval(iv);
  }, [fetchLatest]);

  const openBlock = useCallback((b: TickerBlock) => {
    const { windows, openWindow } = useWindowStore.getState();
    const { queueSearch } = useExplorerStore.getState();
    const size = { width: 700, height: 600 };
    const pos = calculateWindowPosition(windows, size, window.innerWidth, window.innerHeight);
    const id = `explorer-block-${b.height}`;
    const existing = windows.find(w => w.id === id);
    if (existing) {
      useWindowStore.getState().focusWindow(id);
      return;
    }
    openWindow({ id, type: 'explorer', title: `Block #${b.height.toLocaleString()}`, position: pos, size, minSize: { width: 500, height: 400 } });
    queueSearch(id, String(b.height), 'block');
  }, []);

  if (!visible) return null;

  return (
    <div
      className="absolute left-0 right-0 bottom-0 z-50 min-h-8 flex items-center overflow-hidden"
      style={{ background: 'rgba(5,5,18,0.92)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Label */}
      <div className="shrink-0 flex items-center gap-1.5 px-3 border-r border-[rgba(255,255,255,0.08)] h-full">
        <span className="text-[var(--accent-gold)] font-bold tracking-wide" style={{ fontSize: 'var(--font-size-trinket)' }}>BLOCKS</span>
      </div>

      {/* Left scroll arrow */}
      <button
        onClick={() => scrollBy(-1)}
        className="shrink-0 w-6 h-full flex items-center justify-center transition-opacity text-[var(--text-amber)]"
        style={{ opacity: canScrollLeft ? 1 : 0, pointerEvents: canScrollLeft ? 'auto' : 'none' }}
        tabIndex={-1}
        aria-hidden={!canScrollLeft}
      >
        ‹
      </button>

      {/* Scrollable pills — no native scrollbar, drag to pan */}
      <div
        ref={scrollRef}
        className="flex items-center gap-2 px-2 flex-1 h-full overflow-hidden select-none"
        style={{ cursor: isDragging.current ? 'grabbing' : 'grab', scrollbarWidth: 'none' }}
        onScroll={updateArrows}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {blocks.length === 0 ? (
          <span className="text-[var(--text-muted)] animate-pulse shrink-0" style={{ fontSize: 'var(--font-size-trinket)' }}>Waiting for blocks…</span>
        ) : (
          blocks.map((b, i) => {
            const color = blockColor(b.hash);
            const prevTime = blocks[i + 1]?.time ?? 0;
            const interval = prevTime > 0 ? formatInterval(b.time, prevTime) : '';
            const age = b.arrivedAt > 0 ? formatDelta(nowRef.current - b.arrivedAt) : '';

            return (
              <button
                key={b.height}
                onClick={() => !isDragging.current && openBlock(b)}
                onMouseDown={e => e.stopPropagation()}
                className="shrink-0 flex items-center gap-1.5 px-2 py-0.5 font-mono hover:brightness-125 transition-all"
                style={{
                  border: `1px solid ${color}40`,
                  background: `${color}18`,
                  cursor: 'pointer',
                  fontSize: 'var(--font-size-trinket)',
                }}
                title={`Block #${b.height} — ${b.txCount} txs${interval ? ` · ${interval}` : ''}${age ? ` · ${age}` : ''}`}
              >
                <span className="font-bold" style={{ color: 'var(--accent-gold)' }}>
                  #{b.height.toLocaleString()}
                </span>
                <span style={{ color }}>·</span>
                <span style={{ color }} className="opacity-90">
                  {b.txCount} tx{b.txCount !== 1 ? 's' : ''}
                </span>
                {interval && (
                  <span className="text-[var(--text-muted)] opacity-70">{interval}</span>
                )}
                {i === 0 && (
                  <span className="text-[var(--accent-green)] text-xs opacity-80">●</span>
                )}
              </button>
            );
          })
        )}
      </div>

      {/* Right scroll arrow */}
      <button
        onClick={() => scrollBy(1)}
        className="shrink-0 w-6 h-full flex items-center justify-center transition-opacity text-[var(--text-amber)]"
        style={{ opacity: canScrollRight ? 1 : 0, pointerEvents: canScrollRight ? 'auto' : 'none' }}
        tabIndex={-1}
        aria-hidden={!canScrollRight}
      >
        ›
      </button>

      {/* Dismiss */}
      <button
        onClick={hide}
        className="shrink-0 px-2 h-full text-[var(--text-muted)] hover:text-[var(--accent-gold)] text-xs border-l border-[rgba(255,255,255,0.08)]"
        title="Hide ticker (reopen from Widgets)"
      >
        ✕
      </button>
    </div>
  );
}
