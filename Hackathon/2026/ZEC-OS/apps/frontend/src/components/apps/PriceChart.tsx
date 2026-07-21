'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { usePrices, useCurrentPrice } from '@/hooks/useZecData';
import { useSound } from '@/hooks/useSound';
import { useIsAdmin } from '@/store/authStore';
import uPlot from 'uplot';
import 'uplot/dist/uPlot.min.css';
import { AppLoader } from '@/components/ui/AppLoader';

type ChartStyle = 'pixel' | 'clean';
type TimeRange = '1d' | '3d' | '7d' | '1m' | '1y' | 'all';

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

export function PriceChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>('1y');
  const { data, loading, error, refetch } = usePrices(timeRange);
  const { price: currentPrice } = useCurrentPrice();
  const { playClick } = useSound();
  const isAdmin = useIsAdmin();
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<uPlot | null>(null);
  const [style, setStyle] = useState<ChartStyle>('pixel');
  const [showAxes, setShowAxes] = useState(false);
  const [showLive, setShowLive] = useState(true);
  const [cursorData, setCursorData] = useState<{ time: string; price: string } | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isCharting, setIsCharting] = useState(false);
  const [lastRange, setLastRange] = useState<TimeRange>(timeRange);

  // Current "now" data
  const nowData = useCallback(() => {
    const now = new Date();
    return {
      time: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' }),
      price: currentPrice ? '$' + currentPrice.toFixed(2) : '—',
    };
  }, [currentPrice]);

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


    // Show charting indicator briefly while rendering
    setIsCharting(true);

    const chartTimeout = setTimeout(() => {
      // Clean up previous chart
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const container = containerRef.current;
      if (!container) {
        setIsCharting(false);
        return;
      }

      const width = container.clientWidth;
      const height = container.clientHeight - 60; // Leave room for controls + cursor info

      // Prepare data for uPlot: [timestamps[], prices[]]
      const timestamps = data.map(d => {
        const ts = d.timestamp;
        return typeof ts === 'number' ? ts / 1000 : new Date(ts).getTime() / 1000;
      });
      const prices = data.map(d => d.price);


      // For pixel mode, downsample data to create blocky appearance
      let plotTimestamps = timestamps;
      let plotPrices = prices;

      if (style === 'pixel') {
        const targetPoints = Math.min(80, timestamps.length);
        const step = Math.max(1, Math.floor(timestamps.length / targetPoints));
        plotTimestamps = [];
        plotPrices = [];
        for (let i = 0; i < timestamps.length; i += step) {
          plotTimestamps.push(timestamps[i]);
          plotPrices.push(prices[i]);
        }
      }

      const opts: uPlot.Options = {
        width,
        height: Math.max(height, 120),
        cursor: {
          show: true,
          x: true,
          y: true,
        },
        hooks: {
          setCursor: [
            (u) => {
              const idx = u.cursor.idx;
              if (idx !== null && idx !== undefined && idx >= 0) {
                const ts = u.data[0][idx];
                const price = u.data[1][idx];
                if (ts && price !== undefined && price !== null) {
                  const date = new Date(ts * 1000);
                  setCursorData({
                    time: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' }),
                    price: '$' + (price as number).toFixed(2),
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
            values: (u, vals) => vals.map(v => '$' + v.toFixed(0)),
            size: showAxes ? 45 : 0,
          },
        ],
        series: [
          {},
          {
            label: 'Price',
            stroke: '#f4b728',
            width: style === 'pixel' ? 3 : 1.5,
            fill: style === 'pixel' ? 'rgba(244, 183, 40, 0.15)' : undefined,
            points: { show: false },
            paths: style === 'pixel' ? uPlot.paths.stepped!({ align: 1 }) : undefined,
          },
        ],
      };

      chartRef.current = new uPlot(opts, [plotTimestamps, plotPrices], container);
      setIsCharting(false);

      // Handle resize
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
  }, [data, style, showAxes, timeRange]);

  // Reset to "now" when mouse leaves
  const handleMouseLeave = () => {
    setIsHovering(false);
    setCursorData(null);
  };

  const handleStyleChange = (newStyle: ChartStyle) => {
    playClick();
    setStyle(newStyle);
  };

  const handleAxesToggle = () => {
    playClick();
    setShowAxes(!showAxes);
  };

  const handleLiveToggle = () => {
    playClick();
    setShowLive(!showLive);
  };

  const handleRefresh = () => {
    playClick();
    refetch();
  };

  const handleTimeRangeCycle = () => {
    playClick();
    const currentIndex = TIME_RANGES.indexOf(timeRange);
    const nextIndex = (currentIndex + 1) % TIME_RANGES.length;
    setTimeRange(TIME_RANGES[nextIndex]);
  };

  // Determine what to display
  const displayData = showLive
    ? (isHovering && cursorData ? cursorData : nowData())
    : (cursorData || null);

  return (
    <div className="flex flex-col h-full">
      {/* Controls */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => handleStyleChange('pixel')}
            className={`
              btn-window px-3 py-1
              ${style === 'pixel' ? 'text-[var(--accent-gold)]' : 'text-[var(--text-green)]'}
            `}
            style={{ fontSize: 'var(--font-size-button)' }}
          >
            Pixel
          </button>
          <button
            onClick={() => handleStyleChange('clean')}
            className={`
              btn-window px-3 py-1
              ${style === 'clean' ? 'text-[var(--accent-gold)]' : 'text-[var(--text-green)]'}
            `}
            style={{ fontSize: 'var(--font-size-button)' }}
          >
            Clean
          </button>
          <button
            onClick={handleAxesToggle}
            className={`
              btn-window px-3 py-1
              ${showAxes ? 'text-[var(--accent-gold)]' : 'text-[var(--text-green)]'}
            `}
            style={{ fontSize: 'var(--font-size-button)' }}
          >
            Axes
          </button>
          <button
            onClick={handleLiveToggle}
            className={`
              btn-window px-3 py-1
              ${showLive ? 'text-[var(--accent-gold)]' : 'text-[var(--text-green)]'}
            `}
            style={{ fontSize: 'var(--font-size-button)' }}
          >
            Live
          </button>
          <button
            onClick={handleTimeRangeCycle}
            className="btn-window px-3 py-1 text-[var(--accent-purple)]"
            style={{ fontSize: 'var(--font-size-button)' }}
            title="Cycle time range"
          >
            {RANGE_LABELS[timeRange]}
          </button>
        </div>
        {isAdmin && (
          <button
            onClick={handleRefresh}
            className="btn-window px-3 py-1 text-[var(--text-amber)]"
            style={{ fontSize: 'var(--font-size-button)' }}
            title="Refresh"
          >
            ↻
          </button>
        )}
      </div>

      {/* Chart Container */}
      <div
        ref={containerRef}
        className="flex-1 min-h-0 relative"
        onMouseLeave={handleMouseLeave}
      >
        {error ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-[var(--accent-orange)]" style={{ fontSize: 'var(--font-size-label)' }}>{error}</span>
          </div>
        ) : loading && !data ? (
          <AppLoader />
        ) : isCharting || loading ? (
          <ChartingIndicator />
        ) : null}
      </div>

      {/* Live/Cursor Data Display - positioned at bottom right */}
      {showLive && displayData && (
        <div className="flex justify-end gap-4 mt-2" style={{ fontSize: 'var(--font-size-label)' }}>
          <span className="text-[var(--text-green)]">{displayData.time}</span>
          <span className="text-[var(--accent-gold)]">{displayData.price}</span>
        </div>
      )}

      <style jsx global>{`
        .uplot .u-cursor-x,
        .uplot .u-cursor-y {
          border-color: rgba(244, 183, 40, 0.6) !important;
        }
        .uplot {
          font-family: var(--font-vt323), monospace;
        }
        .uplot .u-legend {
          display: none;
        }
      `}</style>
    </div>
  );
}
