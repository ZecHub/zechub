function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  const a = ((deg - 90) * Math.PI) / 180
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
}

/** SVG arc path from `start`→`end` degrees (clockwise) on a circle. */
function arcPath(cx: number, cy: number, r: number, start: number, end: number): string {
  const [sx, sy] = polar(cx, cy, r, start)
  const [ex, ey] = polar(cx, cy, r, end)
  const large = end - start <= 180 ? 0 : 1
  return `M${sx.toFixed(2)},${sy.toFixed(2)} A${r},${r} 0 ${large} 1 ${ex.toFixed(2)},${ey.toFixed(2)}`
}

export interface QuorumSealProps {
  /** Total guardians n. */
  n: number
  /** Threshold t. */
  threshold: number
  /** How many arcs are currently lit (guardians who have approved). */
  approvals: number
  /** True once `t` have approved: the iron band closes and glows hottest (flare). */
  closed: boolean
  /** Refused (e.g. the switch has not tripped): the band goes cold (char). */
  refused?: boolean
}

/**
 * SIGNATURE 2 — the quorum seal, an iron band around the vault. The `t-of-n`
 * guardians are arcs of the ring, cold iron (char) until they act. Each approval
 * CATCHES FIRE (ember); when `t` are lit the band CLOSES and glows hottest (flare),
 * authorizing. A refusal lets the band go COLD (char) — the fire dies. Drives the
 * release / recovery ceremony's emotional beat.
 */
export function QuorumSeal({ n, threshold, approvals, closed, refused = false }: QuorumSealProps) {
  const size = 260
  const cx = size / 2
  const cy = size / 2
  const r = 104
  const seg = 360 / n
  const gapDeg = Math.min(14, seg * 0.22)

  const arcs = Array.from({ length: n }, (_, i) => {
    const start = i * seg + gapDeg / 2
    const end = (i + 1) * seg - gapDeg / 2
    const lit = i < approvals
    return (
      <path
        key={i}
        d={arcPath(cx, cy, r, start, end)}
        className="seal-arc"
        data-lit={lit}
      />
    )
  })

  return (
    <div className="seal-wrap" data-closed={closed} data-refused={refused}>
      <svg
        className="seal"
        data-closed={closed}
        data-refused={refused}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`${approvals} of ${threshold} guardians approved; ${n} guardians total`}
      >
        <circle cx={cx} cy={cy} r={r} className="seal-base" />
        {arcs}
        <circle cx={cx} cy={cy} r={r - 30} className="seal-inner" />
      </svg>
      <div className="seal-center" aria-hidden="true">
        <span className="seal-count data">
          {approvals}
          <span className="seal-sep">/</span>
          {threshold}
        </span>
        <span className="seal-word eyebrow">
          {refused ? 'refused' : closed ? 'sealed' : 'quorum'}
        </span>
      </div>
    </div>
  )
}
