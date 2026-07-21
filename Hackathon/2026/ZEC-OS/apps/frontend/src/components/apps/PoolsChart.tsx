'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { usePoolsHistory, useStatus, usePrices, useCurrentPrice } from '@/hooks/useZecData';
import { useSound } from '@/hooks/useSound';
import { useIsAdmin } from '@/store/authStore';
import uPlot from 'uplot';
import 'uplot/dist/uPlot.min.css';
import { AppLoader } from '@/components/ui/AppLoader';

type ChartStyle = 'pixel' | 'clean';
type TimeRange = '1d' | '3d' | '7d' | '1m' | '1y' | 'all';
type Currency = 'zec' | 'usd';

const TIME_RANGES: TimeRange[] = ['1d', '3d', '7d', '1m', '1y', 'all'];
const RANGE_LABELS: Record<TimeRange, string> = {
  '1d': '1D',
  '3d': '3D',
  '7d': '1W',
  '1m': '1M',
  '1y': '1Y',
  'all': 'ALL',
};

// Format axis date labels based on time range
function formatAxisDate(timestamp: number, range: TimeRange): string {
  const d = new Date(timestamp * 1000);
  switch (range) {
    case '1d':
      return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    case '3d':
      return d.toLocaleDateString('en-US', { weekday: 'short', hour: 'numeric', hour12: true });
    case '7d':
    case '1m':
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    case '1y':
    case 'all':
    default:
      return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  }
}

const POOL_COLORS = {
  sprout: '#9966ff',   // Purple
  sapling: '#f4b728',  // Gold
  orchard: '#00cc66',  // Green
};

// Animated loading indicator component
function ChartingIndicator() {
  const [dots, setDots] = useState('.');
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => d.length >= 3 ? '.' : d + '.');
    }, 400);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex items-center justify-center h-full">
      <span className="text-[var(--text-amber)]" style={{ fontSize: 'var(--font-size-label)' }}>
        charting{dots}
      </span>
    </div>
  );
}

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

export function PoolsChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>('1y');
  const [currency, setCurrency] = useState<Currency>('zec');
  const { data, loading, error, refetch: refetchPools } = usePoolsHistory(timeRange);
  const { data: priceData, refetch: refetchPrices } = usePrices(timeRange);
  const { data: statusData } = useStatus();
  const { price: currentPrice } = useCurrentPrice();
  const { playClick } = useSound();
  const isAdmin = useIsAdmin();
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<uPlot | null>(null);
  const [style, setStyle] = useState<ChartStyle>('pixel');
  const [showAxes, setShowAxes] = useState(false);
  const [showLive, setShowLive] = useState(true);
  const [showSprout, setShowSprout] = useState(true);
  const [showSapling, setShowSapling] = useState(true);
  const [showOrchard, setShowOrchard] = useState(true);
  const [cursorData, setCursorData] = useState<{ time: string; sprout?: string; sapling?: string; orchard?: string } | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const refetch = useCallback(() => {
    refetchPools();
    refetchPrices();
  }, [refetchPools, refetchPrices]);

  // Build price lookup with interpolation for missing dates
  const getPriceForTimestamp = useCallback((ts: number): number | null => {
    if (!priceData || priceData.length === 0) return null;

    const dayTs = Math.floor(ts / 86400000) * 86400000;

    const sorted = priceData
      .map(p => ({
        ts: Math.floor((typeof p.timestamp === 'number' ? p.timestamp : new Date(p.timestamp).getTime()) / 86400000) * 86400000,
        price: p.price
      }))
      .sort((a, b) => a.ts - b.ts);

    let left = 0, right = sorted.length - 1;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (sorted[mid].ts < dayTs) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    if (left === 0) return sorted[0].price;
    if (left >= sorted.length) return sorted[sorted.length - 1].price;

    const diffLeft = Math.abs(sorted[left].ts - dayTs);
    const diffPrev = Math.abs(sorted[left - 1].ts - dayTs);
    return diffLeft < diffPrev ? sorted[left].price : sorted[left - 1].price;
  }, [priceData]);

  const formatValue = useCallback((amount: number) => {
    return currency === 'zec' ? formatZec(amount) : formatUsd(amount);
  }, [currency]);

  // Current "now" data
  const nowData = useCallback(() => {
    const now = new Date();
    const pools = statusData?.pools;
    const multiplier = currency === 'usd' ? (currentPrice ?? 0) : 1;
    return {
      time: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' }),
      sprout: showSprout ? formatValue((pools?.sprout ?? 0) * multiplier) : undefined,
      sapling: showSapling ? formatValue((pools?.sapling ?? 0) * multiplier) : undefined,
      orchard: showOrchard ? formatValue((pools?.orchard ?? 0) * multiplier) : undefined,
    };
  }, [statusData, showSprout, showSapling, showOrchard, currency, currentPrice, formatValue]);

  const [isCharting, setIsCharting] = useState(false);
  const [lastRange, setLastRange] = useState(timeRange);

  // Trigger charting indicator when range changes
  useEffect(() => {
    if (timeRange !== lastRange) {
      setIsCharting(true);
      setLastRange(timeRange);
    }
  }, [timeRange, lastRange]);

  // Reset isCharting when there's an error or when loading completes without data
  useEffect(() => {
    if (error || (!loading && !data)) {
      setIsCharting(false);
    }
  }, [error, loading, data]);

  useEffect(() => {
    if (!data || !Array.isArray(data) || data.length === 0 || !containerRef.current) return;
    if (currency === 'usd' && (!priceData || priceData.length === 0)) return;

    setIsCharting(true);

    const chartTimeout = setTimeout(() => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const container = containerRef.current;
      if (!container) {
        setIsCharting(false);
        return;
      }

      const width = container.clientWidth;
      const height = container.clientHeight - 60;

      const timestamps: number[] = [];
      const sproutData: number[] = [];
      const saplingData: number[] = [];
      const orchardData: number[] = [];

      data.forEach(d => {
        const ts = typeof d.timestamp === 'number' ? d.timestamp : new Date(d.timestamp).getTime();

        if (currency === 'zec') {
          timestamps.push(ts / 1000);
          sproutData.push(d.sprout);
          saplingData.push(d.sapling);
          orchardData.push(d.orchard);
        } else {
          const price = getPriceForTimestamp(ts);
          if (price !== null) {
            timestamps.push(ts / 1000);
            sproutData.push(d.sprout * price);
            saplingData.push(d.sapling * price);
            orchardData.push(d.orchard * price);
          }
        }
      });

      if (timestamps.length === 0) {
        setIsCharting(false);
        return;
      }

      let plotTimestamps = timestamps;
      let plotSprout = sproutData;
      let plotSapling = saplingData;
      let plotOrchard = orchardData;

      if (style === 'pixel') {
        const targetPoints = Math.min(80, timestamps.length);
        const step = Math.max(1, Math.floor(timestamps.length / targetPoints));
        plotTimestamps = [];
        plotSprout = [];
        plotSapling = [];
        plotOrchard = [];
        for (let i = 0; i < timestamps.length; i += step) {
          plotTimestamps.push(timestamps[i]);
          plotSprout.push(sproutData[i]);
          plotSapling.push(saplingData[i]);
          plotOrchard.push(orchardData[i]);
        }
      }

      // Build series based on toggles
      const series: uPlot.Series[] = [{}];
      const plotData: (number | null)[][] = [plotTimestamps];

      if (showSprout) {
        series.push({
          label: 'Sprout',
          stroke: POOL_COLORS.sprout,
          width: style === 'pixel' ? 2 : 1.5,
          fill: style === 'pixel' ? 'rgba(153, 102, 255, 0.1)' : undefined,
          points: { show: false },
          paths: style === 'pixel' ? uPlot.paths.stepped!({ align: 1 }) : undefined,
        });
        plotData.push(plotSprout);
      }

      if (showSapling) {
        series.push({
          label: 'Sapling',
          stroke: POOL_COLORS.sapling,
          width: style === 'pixel' ? 2 : 1.5,
          fill: style === 'pixel' ? 'rgba(244, 183, 40, 0.1)' : undefined,
          points: { show: false },
          paths: style === 'pixel' ? uPlot.paths.stepped!({ align: 1 }) : undefined,
        });
        plotData.push(plotSapling);
      }

      if (showOrchard) {
        series.push({
          label: 'Orchard',
          stroke: POOL_COLORS.orchard,
          width: style === 'pixel' ? 2 : 1.5,
          fill: style === 'pixel' ? 'rgba(0, 204, 102, 0.1)' : undefined,
          points: { show: false },
          paths: style === 'pixel' ? uPlot.paths.stepped!({ align: 1 }) : undefined,
        });
        plotData.push(plotOrchard);
      }

      const valueFormatter = currency === 'zec' ? formatZec : formatUsd;

      const opts: uPlot.Options = {
        width,
        height: Math.max(height, 120),
        cursor: { show: true, x: true, y: true },
        hooks: {
          setCursor: [
            (u) => {
              const idx = u.cursor.idx;
              if (idx !== null && idx !== undefined && idx >= 0) {
                const ts = u.data[0][idx];
                if (ts) {
                  const date = new Date(ts * 1000);
                  let dataIdx = 1;
                  const cursorInfo: { time: string; sprout?: string; sapling?: string; orchard?: string } = {
                    time: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' }),
                  };
                  if (showSprout && u.data[dataIdx]) {
                    const val = u.data[dataIdx][idx];
                    if (val !== null && val !== undefined) cursorInfo.sprout = valueFormatter(val);
                    dataIdx++;
                  }
                  if (showSapling && u.data[dataIdx]) {
                    const val = u.data[dataIdx][idx];
                    if (val !== null && val !== undefined) cursorInfo.sapling = valueFormatter(val);
                    dataIdx++;
                  }
                  if (showOrchard && u.data[dataIdx]) {
                    const val = u.data[dataIdx][idx];
                    if (val !== null && val !== undefined) cursorInfo.orchard = valueFormatter(val);
                  }
                  setCursorData(cursorInfo);
                  setIsHovering(true);
                }
              }
            },
          ],
        },
        scales: {
          x: { time: true },
          y: { auto: true },
        },
        axes: [
          {
            show: showAxes,
            stroke: '#00ff88',
            grid: { show: false },
            ticks: { show: false },
            font: '14px var(--font-vt323)',
            values: (u, vals) => vals.map(v => formatAxisDate(v, timeRange)),
          },
          {
            show: showAxes,
            stroke: '#00ff88',
            grid: { show: false },
            ticks: { show: false },
            font: '14px var(--font-vt323)',
            values: (u, vals) => vals.map(v => valueFormatter(v)),
            size: showAxes ? (currency === 'usd' ? 65 : 55) : 0,
          },
        ],
        series,
      };

      chartRef.current = new uPlot(opts, plotData as uPlot.AlignedData, container);
      setIsCharting(false);

      const handleResize = () => {
        if (chartRef.current && containerRef.current) {
          const newWidth = containerRef.current.clientWidth;
          const newHeight = containerRef.current.clientHeight - 60;
          chartRef.current.setSize({ width: newWidth, height: Math.max(newHeight, 120) });
        }
      };

      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);

      (chartRef as { current: uPlot | null; cleanup?: () => void }).cleanup = () => {
        resizeObserver.disconnect();
      };
    }, 50);

    return () => {
      clearTimeout(chartTimeout);
      const ref = chartRef as { current: uPlot | null; cleanup?: () => void };
      if (ref.cleanup) ref.cleanup();
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [data, priceData, style, showAxes, showSprout, showSapling, showOrchard, currency, timeRange, getPriceForTimestamp]);

  const handleMouseLeave = () => {
    setIsHovering(false);
    setCursorData(null);
  };

  const handleTimeRangeCycle = () => {
    playClick();
    const currentIndex = TIME_RANGES.indexOf(timeRange);
    const nextIndex = (currentIndex + 1) % TIME_RANGES.length;
    setTimeRange(TIME_RANGES[nextIndex]);
  };

  const displayData = showLive
    ? (isHovering && cursorData ? cursorData : nowData())
    : (cursorData || null);

  return (
    <div className="flex flex-col h-full">
      {/* Row 1: Style controls */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => { playClick(); setStyle('pixel'); }}
            className={`btn-window px-2 py-1 ${style === 'pixel' ? 'text-[var(--accent-gold)]' : 'text-[var(--text-green)]'}`}
            style={{ fontSize: 'var(--font-size-button)' }}
          >
            Pixel
          </button>
          <button
            onClick={() => { playClick(); setStyle('clean'); }}
            className={`btn-window px-2 py-1 ${style === 'clean' ? 'text-[var(--accent-gold)]' : 'text-[var(--text-green)]'}`}
            style={{ fontSize: 'var(--font-size-button)' }}
          >
            Clean
          </button>
          <button
            onClick={() => { playClick(); setShowAxes(!showAxes); }}
            className={`btn-window px-2 py-1 ${showAxes ? 'text-[var(--accent-gold)]' : 'text-[var(--text-green)]'}`}
            style={{ fontSize: 'var(--font-size-button)' }}
          >
            Axes
          </button>
          <button
            onClick={() => { playClick(); setShowLive(!showLive); }}
            className={`btn-window px-2 py-1 ${showLive ? 'text-[var(--accent-gold)]' : 'text-[var(--text-green)]'}`}
            style={{ fontSize: 'var(--font-size-button)' }}
          >
            Live
          </button>
          <button
            onClick={handleTimeRangeCycle}
            className="btn-window px-2 py-1 text-[var(--accent-purple)]"
            style={{ fontSize: 'var(--font-size-button)' }}
          >
            {RANGE_LABELS[timeRange]}
          </button>
          <button
            onClick={() => { playClick(); setCurrency(currency === 'zec' ? 'usd' : 'zec'); }}
            className="btn-window px-2 py-1 text-[var(--accent-orange)]"
            style={{ fontSize: 'var(--font-size-button)' }}
          >
            {currency.toUpperCase()}
          </button>
        </div>
        {isAdmin && (
          <button
            onClick={() => { playClick(); refetch(); }}
            className="btn-window px-2 py-1 text-[var(--text-amber)]"
            style={{ fontSize: 'var(--font-size-button)' }}
          >
            ↻
          </button>
        )}
      </div>

      {/* Row 2: Pool toggles */}
      <div className="flex gap-2 mb-2 flex-wrap">
        <button
          onClick={() => { playClick(); setShowSprout(!showSprout); }}
          className="btn-window px-2 py-1"
          style={{
            fontSize: 'var(--font-size-button)',
            color: showSprout ? POOL_COLORS.sprout : 'var(--border-window)',
            opacity: showSprout ? 1 : 0.5,
          }}
        >
          Sprout
        </button>
        <button
          onClick={() => { playClick(); setShowSapling(!showSapling); }}
          className="btn-window px-2 py-1"
          style={{
            fontSize: 'var(--font-size-button)',
            color: showSapling ? POOL_COLORS.sapling : 'var(--border-window)',
            opacity: showSapling ? 1 : 0.5,
          }}
        >
          Sapling
        </button>
        <button
          onClick={() => { playClick(); setShowOrchard(!showOrchard); }}
          className="btn-window px-2 py-1"
          style={{
            fontSize: 'var(--font-size-button)',
            color: showOrchard ? POOL_COLORS.orchard : 'var(--border-window)',
            opacity: showOrchard ? 1 : 0.5,
          }}
        >
          Orchard
        </button>
      </div>

      <div ref={containerRef} className="flex-1 min-h-0 relative" onMouseLeave={handleMouseLeave}>
        {error ? (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <span className="text-[var(--accent-orange)]" style={{ fontSize: 'var(--font-size-label)' }}>Historical Data Unavailable</span>
            <span className="text-[var(--text-amber)]" style={{ fontSize: 'var(--font-size-button)' }}>{error}</span>
          </div>
        ) : loading && !data ? (
          <AppLoader />
        ) : isCharting || loading ? (
          <ChartingIndicator />
        ) : null}
      </div>

      {showLive && displayData && (
        <div className="flex justify-end gap-3 mt-2 flex-wrap" style={{ fontSize: 'var(--font-size-button)' }}>
          <span className="text-[var(--text-green)]">{displayData.time}</span>
          {displayData.sprout && <span style={{ color: POOL_COLORS.sprout }}>S:{displayData.sprout}</span>}
          {displayData.sapling && <span style={{ color: POOL_COLORS.sapling }}>Sa:{displayData.sapling}</span>}
          {displayData.orchard && <span style={{ color: POOL_COLORS.orchard }}>O:{displayData.orchard}</span>}
        </div>
      )}

      <style jsx global>{`
        .uplot .u-cursor-x, .uplot .u-cursor-y { border-color: rgba(255, 255, 255, 0.3) !important; }
        .uplot { font-family: var(--font-vt323), monospace; }
        .uplot .u-legend { display: none; }
      `}</style>
    </div>
  );
}
