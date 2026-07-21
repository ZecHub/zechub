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
  /** True once `t` have approved: the iron band closes warm (ember) and authorizes. */
  closed: boolean
  /** Refused (e.g. the switch has not tripped): the ring goes cold and grave (char). */
  refused?: boolean
}

/**
 * SIGNATURE 2 — the quorum seal, and this app's HERO: an iron band around the vault.
 * The `t-of-n` guardians are arcs of a ring. Each approval LIGHTS an arc warm (ember);
 * when `t` are lit the band CLOSES (ember, with the inner band ringing in) and the action
 * is authorized. A refusal reads grave — the hearth gone cold (char). This is the
 * emotional core of the guardian's approval moment.
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
