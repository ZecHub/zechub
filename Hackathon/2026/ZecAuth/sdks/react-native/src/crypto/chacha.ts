/**
 * Minimal ChaCha20 keystream, matching Rust's `rand_chacha::ChaCha20Rng`.
 *
 * `zecauth-core` seeds a `ChaCha20Rng` from the 32-byte ZIP-32 derived key and pulls
 * 64 bytes (`fill_bytes`) to build a wide scalar. `ChaCha20Rng::from_seed` uses the
 * seed as the 256-bit key with a zero 64-bit block counter and zero 64-bit stream id,
 * so the first 64 bytes are exactly the standard ChaCha20 block (counter = 0, nonce = 0)
 * serialized as little-endian 32-bit words — which is what we reproduce here.
 */

const ROUNDS = 20;
// "expand 32-byte k"
const CONSTANTS = [0x61707865, 0x3320646e, 0x79622d32, 0x6b206574];

function rotl(x: number, n: number): number {
  return ((x << n) | (x >>> (32 - n))) >>> 0;
}

function quarterRound(s: Uint32Array, a: number, b: number, c: number, d: number): void {
  s[a] = (s[a]! + s[b]!) >>> 0;
  s[d] = rotl(s[d]! ^ s[a]!, 16);
  s[c] = (s[c]! + s[d]!) >>> 0;
  s[b] = rotl(s[b]! ^ s[c]!, 12);
  s[a] = (s[a]! + s[b]!) >>> 0;
  s[d] = rotl(s[d]! ^ s[a]!, 8);
  s[c] = (s[c]! + s[d]!) >>> 0;
  s[b] = rotl(s[b]! ^ s[c]!, 7);
}

function readU32LE(bytes: Uint8Array, offset: number): number {
  return (
    (bytes[offset]! |
      (bytes[offset + 1]! << 8) |
      (bytes[offset + 2]! << 16) |
      (bytes[offset + 3]! << 24)) >>>
    0
  );
}

/**
 * Returns the first 64 bytes of the ChaCha20 keystream for `key` with an all-zero
 * 128-bit counter+nonce — i.e. the bytes a freshly-seeded `ChaCha20Rng` yields first.
 */
export function chacha20FirstBlock(key: Uint8Array): Uint8Array {
  if (key.length !== 32) throw new Error("chacha20FirstBlock expects a 32-byte key");

  const state = new Uint32Array(16);
  state[0] = CONSTANTS[0]!;
  state[1] = CONSTANTS[1]!;
  state[2] = CONSTANTS[2]!;
  state[3] = CONSTANTS[3]!;
  for (let i = 0; i < 8; i++) state[4 + i] = readU32LE(key, i * 4);
  // words 12..15 (counter + nonce) stay zero.

  const working = state.slice();
  for (let i = 0; i < ROUNDS; i += 2) {
    // Column rounds
    quarterRound(working, 0, 4, 8, 12);
    quarterRound(working, 1, 5, 9, 13);
    quarterRound(working, 2, 6, 10, 14);
    quarterRound(working, 3, 7, 11, 15);
    // Diagonal rounds
    quarterRound(working, 0, 5, 10, 15);
    quarterRound(working, 1, 6, 11, 12);
    quarterRound(working, 2, 7, 8, 13);
    quarterRound(working, 3, 4, 9, 14);
  }

  const out = new Uint8Array(64);
  for (let i = 0; i < 16; i++) {
    const word = (working[i]! + state[i]!) >>> 0;
    out[i * 4] = word & 0xff;
    out[i * 4 + 1] = (word >>> 8) & 0xff;
    out[i * 4 + 2] = (word >>> 16) & 0xff;
    out[i * 4 + 3] = (word >>> 24) & 0xff;
  }
  return out;
}
