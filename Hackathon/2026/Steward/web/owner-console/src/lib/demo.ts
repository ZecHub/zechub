// Client-side demo material. The console has no FROST crypto, so for the ceremony
// it supplies a random 32-byte sighash (any bytes) and a *canonical* RedPallas
// randomizer. Masking the most-significant little-endian byte to < 0x40 guarantees
// the scalar is below the Pallas field order (~2^254), so
// `randomizer_from_le_bytes` on the coordinator accepts it.

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
}

export function demoSighashHex(): string {
  const b = new Uint8Array(32)
  crypto.getRandomValues(b)
  return toHex(b)
}

export function demoRandomizerHex(): string {
  const b = new Uint8Array(32)
  crypto.getRandomValues(b)
  b[31] &= 0x1f // keep it comfortably below the Pallas scalar field order
  return toHex(b)
}
