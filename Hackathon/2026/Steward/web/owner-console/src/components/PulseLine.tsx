import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

/** Fixed tile width in px. Both the tile <svg> and the scroll keyframe use it, so
 *  the loop is seamless at any container size. */
const TILE_W = 260

/** One ECG cycle (P-Q-R-S-T), amplitude `amp` in 0..1, over a tile `h` px tall.
 *  amp=0 collapses to a flat baseline (the flatline). */
function ecgPath(h: number, amp: number): string {
  const mid = h / 2
  const A = amp * h * 0.34 // R-spike reach
  const pts: Array<[number, number]> = [
    [0, mid],
    [0.30 * TILE_W, mid],
    [0.345 * TILE_W, mid - 0.14 * A], // P wave
    [0.385 * TILE_W, mid],
    [0.420 * TILE_W, mid + 0.22 * A], // Q
    [0.455 * TILE_W, mid - A], // R (the spike)
    [0.490 * TILE_W, mid + 0.5 * A], // S
    [0.520 * TILE_W, mid],
    [0.600 * TILE_W, mid - 0.28 * A], // T wave
    [0.690 * TILE_W, mid],
    [TILE_W, mid],
  ]
  return pts
    .map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(' ')
}

export interface PulseLineProps {
  /** Heartbeat cadence in seconds; the scroll (and glow) slow as this grows. */
  period: number
  /** Waveform amplitude 0..1; thins as the deadline nears. */
  amp: number
  /** Tripped: the line flatlines and stops moving. */
  flat: boolean
  /** Respect prefers-reduced-motion: render a static waveform, no animation. */
  reduced: boolean
}

/**
 * SIGNATURE 1 — the proof-of-life pulse. A slow ECG line rendered as tiled SVG
 * cycles scrolling right-to-left. Cadence (`period`) and amplitude (`amp`) are
 * driven by `(trip_at - now)` upstream: it BEATS warm while heartbeats are current,
 * SLOWS + THINS as the deadline nears, and FLATLINES when tripped. Its stroke is
 * `currentColor`, set to the ambient `--state`, so it burns ember while lit, flares
 * as the deadline nears, and goes cold (char) when the hearth dies. Under reduced
 * motion it is a static waveform (the numeric countdown carries the timing).
 */
export function PulseLine({ period, amp, flat, reduced }: PulseLineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 900, h: 160 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      setSize({ w: el.clientWidth, h: el.clientHeight })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const h = Math.max(80, Math.round(size.h))
  const d = ecgPath(h, flat ? 0 : amp)
  const tileCount = Math.max(2, Math.ceil(size.w / TILE_W) + 2)

  const tiles = Array.from({ length: tileCount }, (_, i) => (
    <svg
      key={i}
      className="pulse-tile"
      width={TILE_W}
      height={h}
      viewBox={`0 0 ${TILE_W} ${h}`}
      aria-hidden="true"
    >
      <path d={d} className="pulse-path" />
    </svg>
  ))

  if (reduced) {
    return (
      <div className="pulse" ref={ref} data-flat={flat}>
        <div className="pulse-track pulse-track--static">{tiles}</div>
      </div>
    )
  }

  const trackStyle = {
    '--pulse-period': `${period.toFixed(2)}s`,
    animationPlayState: flat ? 'paused' : 'running',
  } as CSSProperties

  return (
    <div className="pulse" ref={ref} data-flat={flat}>
      {!flat && (
        <div
          className="pulse-glow"
          style={{ '--pulse-period': `${period.toFixed(2)}s` } as CSSProperties}
        />
      )}
      <div className="pulse-track" style={trackStyle}>
        {tiles}
      </div>
    </div>
  )
}
