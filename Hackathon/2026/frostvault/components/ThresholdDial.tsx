// The recurring visual motif of the app: a ring of discrete segments, one
// per participant slot, because a FROST share is a discrete unit -- not a
// smooth percentage. Filled segments (emerald) are collected/verified;
// an optional pending segment (amber) is currently being collected.

interface ThresholdDialProps {
  total: number;
  filled: number;
  pending?: boolean;
  size?: number;
  label?: string;
  className?: string;
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;
  const start = { x: cx + r * Math.cos(toRad(startAngle)), y: cy + r * Math.sin(toRad(startAngle)) };
  const end = { x: cx + r * Math.cos(toRad(endAngle)), y: cy + r * Math.sin(toRad(endAngle)) };
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

export function ThresholdDial({
  total,
  filled,
  pending = false,
  size = 56,
  label,
  className,
}: ThresholdDialProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 5;
  const gap = total > 1 ? 10 : 0;
  const segmentAngle = 360 / total;

  return (
    <div className={`relative inline-flex items-center justify-center ${className ?? ""}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {Array.from({ length: total }).map((_, i) => {
          const start = i * segmentAngle + gap / 2;
          const end = (i + 1) * segmentAngle - gap / 2;
          const isFilled = i < filled;
          const isPending = pending && i === filled;
          return (
            <path
              key={i}
              d={describeArc(cx, cy, r, start, end)}
              fill="none"
              strokeWidth={4}
              strokeLinecap="round"
              stroke={isFilled ? "var(--signal)" : isPending ? "var(--pending)" : "var(--border)"}
              className={isPending ? "animate-pulse" : undefined}
            />
          );
        })}
      </svg>
      {label && (
        <span className="absolute font-heading text-xs font-medium text-foreground">{label}</span>
      )}
    </div>
  );
}
