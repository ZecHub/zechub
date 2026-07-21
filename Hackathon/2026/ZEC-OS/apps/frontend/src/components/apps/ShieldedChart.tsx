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

export function ShieldedChart() {
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
  const [cursorData, setCursorData] = useState<{ time: string; value: string } | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const refetch = useCallback(() => {
    refetchPools();
    refetchPrices();
  }, [refetchPools, refetchPrices]);

  // Build price lookup with interpolation for missing dates
  const getPriceForTimestamp = useCallback((ts: number): number | null => {
    if (!priceData || priceData.length === 0) return null;

    const dayTs = Math.floor(ts / 86400000) * 86400000;

    // Build sorted array of [timestamp, price] for binary search
    const sorted = priceData
      .map(p => ({
        ts: Math.floor((typeof p.timestamp === 'number' ? p.timestamp : new Date(p.timestamp).getTime()) / 86400000) * 86400000,
        price: p.price
      }))
      .sort((a, b) => a.ts - b.ts);

    // Binary search for closest timestamp
    let left = 0, right = sorted.length - 1;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (sorted[mid].ts < dayTs) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    // Find nearest between left and left-1
    if (left === 0) return sorted[0].price;
    if (left >= sorted.length) return sorted[sorted.length - 1].price;

    const diffLeft = Math.abs(sorted[left].ts - dayTs);
    const diffPrev = Math.abs(sorted[left - 1].ts - dayTs);
    return diffLeft < diffPrev ? sorted[left].price : sorted[left - 1].price;
  }, [priceData]);

  const formatValue = useCallback((amount: number) => {
    return currency === 'zec' ? formatZec(amount) + ' ZEC' : formatUsd(amount);
  }, [currency]);

  // Current "now" data
  const nowData = useCallback(() => {
    const now = new Date();
    const pools = statusData?.pools;
    const shielded = (pools?.sprout ?? 0) + (pools?.sapling ?? 0) + (pools?.orchard ?? 0);
    const value = currency === 'zec' ? shielded : shielded * (currentPrice ?? 0);
    return {
      time: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' }),
      value: formatValue(value),
    };
  }, [statusData, currency, currentPrice, formatValue]);

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

    // Small delay to show the charting indicator
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
      const shieldedValues: number[] = [];

      data.forEach(d => {
        const ts = typeof d.timestamp === 'number' ? d.timestamp : new Date(d.timestamp).getTime();
        const shieldedZec = d.sprout + d.sapling + d.orchard;

        if (currency === 'zec') {
          timestamps.push(ts / 1000);
          shieldedValues.push(shieldedZec);
        } else {
          const price = getPriceForTimestamp(ts);
          if (price !== null) {
            timestamps.push(ts / 1000);
            shieldedValues.push(shieldedZec * price);
          }
        }
      });

      if (timestamps.length === 0) {
        setIsCharting(false);
        return;
      }

      let plotTimestamps = timestamps;
      let plotShielded = shieldedValues;

      if (style === 'pixel') {
        const targetPoints = Math.min(80, timestamps.length);
        const step = Math.max(1, Math.floor(timestamps.length / targetPoints));
        plotTimestamps = [];
        plotShielded = [];
        for (let i = 0; i < timestamps.length; i += step) {
          plotTimestamps.push(timestamps[i]);
          plotShielded.push(shieldedValues[i]);
        }
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
                const val = u.data[1][idx];
                if (ts && val !== undefined && val !== null) {
                  const date = new Date(ts * 1000);
                  setCursorData({
                    time: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' }),
                    value: currency === 'zec' ? formatZec(val as number) + ' ZEC' : formatUsd(val as number),
                  });
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
        series: [
          {},
          {
            label: 'Shielded',
            stroke: '#00cc66',
            width: style === 'pixel' ? 3 : 1.5,
            fill: style === 'pixel' ? 'rgba(0, 204, 102, 0.15)' : undefined,
            points: { show: false },
            paths: style === 'pixel' ? uPlot.paths.stepped!({ align: 1 }) : undefined,
          },
        ],
      };

      chartRef.current = new uPlot(opts, [plotTimestamps, plotShielded], container);
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

      // Store cleanup in a way we can call it
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
  }, [data, priceData, style, showAxes, currency, timeRange, getPriceForTimestamp]);

  const handleMouseLeave = () => {
    setIsHovering(false);
    setCursorData(null);
  };

  const handleStyleChange = (newStyle: ChartStyle) => {
    playClick();
    setStyle(newStyle);
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
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => handleStyleChange('pixel')}
            className={`btn-window px-3 py-1 ${style === 'pixel' ? 'text-[var(--accent-gold)]' : 'text-[var(--text-green)]'}`}
            style={{ fontSize: 'var(--font-size-button)' }}
          >
            Pixel
          </button>
          <button
            onClick={() => handleStyleChange('clean')}
            className={`btn-window px-3 py-1 ${style === 'clean' ? 'text-[var(--accent-gold)]' : 'text-[var(--text-green)]'}`}
            style={{ fontSize: 'var(--font-size-button)' }}
          >
            Clean
          </button>
          <button
            onClick={() => { playClick(); setShowAxes(!showAxes); }}
            className={`btn-window px-3 py-1 ${showAxes ? 'text-[var(--accent-gold)]' : 'text-[var(--text-green)]'}`}
            style={{ fontSize: 'var(--font-size-button)' }}
          >
            Axes
          </button>
          <button
            onClick={() => { playClick(); setShowLive(!showLive); }}
            className={`btn-window px-3 py-1 ${showLive ? 'text-[var(--accent-gold)]' : 'text-[var(--text-green)]'}`}
            style={{ fontSize: 'var(--font-size-button)' }}
          >
            Live
          </button>
          <button
            onClick={handleTimeRangeCycle}
            className="btn-window px-3 py-1 text-[var(--accent-purple)]"
            style={{ fontSize: 'var(--font-size-button)' }}
          >
            {RANGE_LABELS[timeRange]}
          </button>
          <button
            onClick={() => { playClick(); setCurrency(currency === 'zec' ? 'usd' : 'zec'); }}
            className="btn-window px-3 py-1 text-[var(--accent-orange)]"
            style={{ fontSize: 'var(--font-size-button)' }}
          >
            {currency.toUpperCase()}
          </button>
        </div>
        {isAdmin && (
          <button
            onClick={() => { playClick(); refetch(); }}
            className="btn-window px-3 py-1 text-[var(--text-amber)]"
            style={{ fontSize: 'var(--font-size-button)' }}
          >
            ↻
          </button>
        )}
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
        <div className="flex justify-end gap-4 mt-2" style={{ fontSize: 'var(--font-size-label)' }}>
          <span className="text-[var(--text-green)]">{displayData.time}</span>
          <span className="text-[var(--accent-green)]">{displayData.value}</span>
        </div>
      )}

      <style jsx global>{`
        .uplot .u-cursor-x, .uplot .u-cursor-y { border-color: rgba(0, 204, 102, 0.6) !important; }
        .uplot { font-family: var(--font-vt323), monospace; }
        .uplot .u-legend { display: none; }
      `}</style>
    </div>
  );
}
