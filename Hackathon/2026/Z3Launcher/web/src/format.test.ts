import { describe, it, expect } from 'vitest'
import {
  formatBytes,
  formatPct,
  formatHeight,
  stateBadgeClass,
  etaSeconds,
  formatDuration,
} from './format'

describe('formatBytes', () => {
  it('handles zero and negatives', () => {
    expect(formatBytes(0)).toBe('0 B')
    expect(formatBytes(-5)).toBe('0 B')
    expect(formatBytes(NaN)).toBe('0 B')
  })
  it('scales units', () => {
    expect(formatBytes(512)).toBe('512 B')
    expect(formatBytes(1024)).toBe('1.0 KB')
    expect(formatBytes(1536)).toBe('1.5 KB')
    expect(formatBytes(1024 * 1024)).toBe('1.0 MB')
    expect(formatBytes(50 * 1024 * 1024 * 1024)).toBe('50.0 GB') // 1 decimal under 100
    expect(formatBytes(150 * 1024 * 1024 * 1024)).toBe('150 GB') // 0 decimals at/over 100
  })
})

describe('formatPct', () => {
  it('clamps and formats', () => {
    expect(formatPct(0)).toBe('0%')
    expect(formatPct(-1)).toBe('0%')
    expect(formatPct(150)).toBe('100%')
    expect(formatPct(50)).toBe('50.0%')
    expect(formatPct(99.5)).toBe('99.50%')
  })
})

describe('formatHeight', () => {
  it('formats with separators, dash for none', () => {
    expect(formatHeight(0)).toBe('—')
    expect(formatHeight(2_500_000)).toBe('2,500,000')
  })
})

describe('stateBadgeClass', () => {
  it('maps known states and falls back', () => {
    expect(stateBadgeClass('ready')).toContain('emerald')
    expect(stateBadgeClass('syncing')).toContain('amber')
    expect(stateBadgeClass('unreachable')).toContain('rose')
    expect(stateBadgeClass('bogus')).toBe(stateBadgeClass('unknown'))
  })
})

describe('etaSeconds', () => {
  it('estimates from two samples', () => {
    // 10 blocks in 5s = 2 blocks/s; 100 blocks remaining => 50s
    const eta = etaSeconds({ height: 90, t: 0 }, { height: 100, t: 5000 }, 200)
    expect(eta).toBe(50)
  })
  it('returns null when not progressing or already at tip', () => {
    expect(etaSeconds({ height: 100, t: 0 }, { height: 100, t: 5000 }, 200)).toBeNull()
    expect(etaSeconds({ height: 90, t: 0 }, { height: 100, t: 5000 }, 100)).toBeNull()
  })
})

describe('formatDuration', () => {
  it('formats h/m/s and handles null', () => {
    expect(formatDuration(null)).toBe('—')
    expect(formatDuration(0)).toBe('—')
    expect(formatDuration(45)).toBe('45s')
    expect(formatDuration(125)).toBe('2m 5s')
    expect(formatDuration(3700)).toBe('1h 1m')
  })
})
