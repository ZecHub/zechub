import { describe, it, expect } from 'vitest'
import { installTone, installLabel } from './install'

describe('installTone', () => {
  it('maps backend states', () => {
    expect(installTone('idle')).toBe('idle')
    expect(installTone(null)).toBe('idle')
    expect(installTone('running')).toBe('running')
    expect(installTone('succeeded')).toBe('success')
    expect(installTone('failed')).toBe('error')
  })
  it('treats an explicit error as failure regardless of state', () => {
    expect(installTone('succeeded', 'daemon not reachable')).toBe('error')
  })
})

describe('installLabel', () => {
  it('labels each tone', () => {
    expect(installLabel('running')).toMatch(/installing/i)
    expect(installLabel('success')).toMatch(/installed/i)
    expect(installLabel('error')).toMatch(/failed/i)
    expect(installLabel('idle')).toMatch(/ready/i)
  })
})
