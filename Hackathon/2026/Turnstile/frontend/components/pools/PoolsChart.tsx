"use client";

import { useMemo, useRef, useState } from "react";

import { IRONWOOD_ACTIVATION_HEIGHT } from "@/lib/constants";
import { formatHeight } from "@/lib/format";

type Point = [number, number];
export type PoolSeries = Record<"orchard" | "sapling" | "sprout", Point[]>;

const SERIES = [
  { key: "orchard", label: "Orchard", color: "#059669" },
  { key: "sapling", label: "Sapling", color: "#3B82F6" },
  { key: "sprout", label: "Sprout", color: "#EA580C" },
] as const;

const W = 960;
const H = 380;
const PAD = { top: 18, right: 118, bottom: 34, left: 56 };
const ACTIVATION_MS = Date.UTC(2026, 6, 28);

const fmtZec = (v: number) =>
  v >= 1_000_000 ? `${(v / 1_000_000).toFixed(v >= 10_000_000 ? 0 : 1)}M` : v >= 1_000 ? `${Math.round(v / 1_000)}K` : String(Math.round(v));
const fmtDate = (t: number) =>
  new Date(t).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

export function PoolsChart({ series }: { series: PoolSeries }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState<number | null>(null);

  const { x0, x1, y1, paths, ends } = useMemo(() => {
    const all = SERIES.flatMap(s => series[s.key]);
    const x0 = Math.min(...all.map(p => p[0]));
    const x1 = ACTIVATION_MS + 14 * 86_400_000;
    const y1 = Math.max(...all.map(p => p[1])) * 1.08;

    const sx = (t: number) => PAD.left + ((t - x0) / (x1 - x0)) * (W - PAD.left - PAD.right);
    const sy = (v: number) => PAD.top + (1 - v / y1) * (H - PAD.top - PAD.bottom);

    const paths = SERIES.map(s => ({
      ...s,
      d: series[s.key].map((p, i) => `${i ? "L" : "M"}${sx(p[0]).toFixed(1)},${sy(p[1]).toFixed(1)}`).join(""),
    }));
    const ends = SERIES.map(s => {
      const last = series[s.key][series[s.key].length - 1];
      return { ...s, x: sx(last[0]), y: sy(last[1]), value: last[1] };
    });
    return { x0, x1, y1, paths, ends };
  }, [series]);

  const sx = (t: number) => PAD.left + ((t - x0) / (x1 - x0)) * (W - PAD.left - PAD.right);
  const sy = (v: number) => PAD.top + (1 - v / y1) * (H - PAD.top - PAD.bottom);

  const hovered = hover === null ? null : SERIES.map(s => {
    const pts = series[s.key];
    let lo = 0;
    let hi = pts.length - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (pts[mid][0] < hover) lo = mid;
      else hi = mid;
    }
    const p = hover - pts[lo][0] < pts[hi][0] - hover ? pts[lo] : pts[hi];
    return { ...s, t: p[0], value: p[1] };
  });

  function onMove(e: React.PointerEvent) {
    const rect = svgRef.current!.getBoundingClientRect();
    const fx = ((e.clientX - rect.left) / rect.width) * W;
    if (fx < PAD.left || fx > W - PAD.right) return setHover(null);
    setHover(x0 + ((fx - PAD.left) / (W - PAD.left - PAD.right)) * (x1 - x0));
  }

  const yTicks = [0.25, 0.5, 0.75, 1].map(k => y1 * k);
  const years = [];
  for (let y = new Date(x0).getUTCFullYear() + 1; y <= 2026; y += 2) years.push(Date.UTC(y, 0, 1));

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-surface p-4 md:p-6">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="min-w-[640px] cursor-crosshair"
        onPointerMove={onMove}
        onPointerLeave={() => setHover(null)}
        role="img"
        aria-label="Shielded pool value over time: Orchard, Sapling and Sprout, in ZEC"
      >
        {yTicks.map(v => (
          <g key={v}>
            <line x1={PAD.left} x2={W - PAD.right} y1={sy(v)} y2={sy(v)} stroke="#18181B" strokeWidth="1" />
            <text x={PAD.left - 8} y={sy(v) + 4} textAnchor="end" fontSize="11" fill="#71717A" fontFamily="monospace">
              {fmtZec(v)}
            </text>
          </g>
        ))}
        {years.map(t => (
          <text key={t} x={sx(t)} y={H - 12} textAnchor="middle" fontSize="11" fill="#71717A" fontFamily="monospace">
            {new Date(t).getUTCFullYear()}
          </text>
        ))}

        <line x1={sx(ACTIVATION_MS)} x2={sx(ACTIVATION_MS)} y1={PAD.top} y2={H - PAD.bottom} stroke="#F87171" strokeWidth="1.5" strokeDasharray="5 4" />
        <text x={sx(ACTIVATION_MS)} y={PAD.top - 4} textAnchor="middle" fontSize="10" fill="#F87171" fontFamily="monospace" letterSpacing="1">
          {`ORCHARD CLOSES · ${formatHeight(IRONWOOD_ACTIVATION_HEIGHT)}`}
        </text>

        {paths.map(s => (
          <path key={s.key} d={s.d} fill="none" stroke={s.color} strokeWidth="2" strokeLinejoin="round" />
        ))}
        {ends.map(s => (
          <g key={s.key}>
            <circle cx={s.x} cy={s.y} r="3.5" fill={s.color} stroke="#09090B" strokeWidth="2" />
            <text x={s.x + 10} y={s.y + 4} fontSize="12" fill="#A1A1AA">
              {s.label}
            </text>
          </g>
        ))}

        {hovered && (
          <g>
            <line x1={sx(hovered[0].t)} x2={sx(hovered[0].t)} y1={PAD.top} y2={H - PAD.bottom} stroke="#3F3F46" strokeWidth="1" />
            {hovered.map(h => (
              <circle key={h.key} cx={sx(h.t)} cy={sy(h.value)} r="4" fill={h.color} stroke="#09090B" strokeWidth="2" />
            ))}
          </g>
        )}
      </svg>

      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 px-2">
        {SERIES.map(s => (
          <span key={s.key} className="flex cursor-default items-center gap-2 text-xs text-muted">
            <span className="h-0.5 w-5 rounded-full" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
        <span className="ml-auto font-mono text-[11px] tabular-nums text-faint">
          {hovered
            ? `${fmtDate(hovered[0].t)} — ${hovered.map(h => `${h.label} ${fmtZec(h.value)}`).join(" · ")}`
            : "hover for values"}
        </span>
      </div>
    </div>
  );
}
