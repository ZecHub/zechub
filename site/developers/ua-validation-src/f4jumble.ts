/**
 * F4Jumble — a reversible length-preserving byte transformation using
 * an unkeyed 4-round Feistel network with BLAKE2b.
 *
 * Ported from https://github.com/zcash/librustzcash/blob/main/components/f4jumble/src/lib.rs
 * Reference: ZIP-316 §Jumbling — https://zips.z.cash/zip-0316
 */

import { blake2bInit, blake2bUpdate, blake2bFinal, Blake2bCTX } from 'blakejs';

// blakejs types don't declare salt/personal params but the runtime supports them
const initBlake2b = blake2bInit as (outlen?: number, key?: Uint8Array, salt?: Uint8Array, personal?: Uint8Array) => Blake2bCTX;

const OUTBYTES = 64;
const VALID_MIN = 48;
const VALID_MAX = 4194368;

// "UA_F4Jumble_H" + [i, 0, 0]
function hPers(i: number): Uint8Array {
  return new Uint8Array([85, 65, 95, 70, 52, 74, 117, 109, 98, 108, 101, 95, 72, i, 0, 0]);
}

// "UA_F4Jumble_G" + [i, j & 0xFF, j >> 8]
function gPers(i: number, j: number): Uint8Array {
  return new Uint8Array([85, 65, 95, 70, 52, 74, 117, 109, 98, 108, 101, 95, 71, i, j & 0xFF, (j >> 8) & 0xFF]);
}

function ceildiv(a: number, b: number): number {
  return Math.floor((a + b - 1) / b);
}

function xorMut(target: Uint8Array, source: Uint8Array): void {
  const len = Math.min(source.length, target.length);
  for (let i = 0; i < len; i++) {
    target[i] ^= source[i];
  }
}

function blake2bHash(data: Uint8Array, hashLen: number, personal: Uint8Array): Uint8Array {
  const ctx = initBlake2b(hashLen, undefined, undefined, personal);
  blake2bUpdate(ctx, data);
  return blake2bFinal(ctx);
}

function hRound(left: Uint8Array, right: Uint8Array, i: number): void {
  const hash = blake2bHash(right, left.length, hPers(i));
  xorMut(left, hash);
}

function gRound(left: Uint8Array, right: Uint8Array, i: number): void {
  const numChunks = ceildiv(right.length, OUTBYTES);
  for (let j = 0; j < numChunks; j++) {
    const hash = blake2bHash(left, OUTBYTES, gPers(i, j));
    const start = j * OUTBYTES;
    const end = Math.min(start + OUTBYTES, right.length);
    xorMut(right.subarray(start, end), hash.subarray(0, end - start));
  }
}

function split(message: Uint8Array): [Uint8Array, Uint8Array] {
  const leftLen = Math.min(OUTBYTES, Math.floor(message.length / 2));
  return [message.subarray(0, leftLen), message.subarray(leftLen)];
}

function f4jumbleInPlace(message: Uint8Array): void {
  const [left, right] = split(message);
  gRound(left, right, 0);
  hRound(left, right, 0);
  gRound(left, right, 1);
  hRound(left, right, 1);
}

function f4jumbleInvInPlace(message: Uint8Array): void {
  const [left, right] = split(message);
  hRound(left, right, 1);
  gRound(left, right, 1);
  hRound(left, right, 0);
  gRound(left, right, 0);
}

/** F4Jumble: forward transformation */
export function f4jumble(message: Uint8Array): Uint8Array {
  if (message.length < VALID_MIN || message.length > VALID_MAX) {
    throw new Error(`Message length must be in range ${VALID_MIN}..=${VALID_MAX}`);
  }
  const result = new Uint8Array(message);
  f4jumbleInPlace(result);
  return result;
}

/** F4Jumble⁻¹: inverse transformation */
export function f4jumbleInv(message: Uint8Array): Uint8Array {
  if (message.length < VALID_MIN || message.length > VALID_MAX) {
    throw new Error(`Message length must be in range ${VALID_MIN}..=${VALID_MAX}`);
  }
  const result = new Uint8Array(message);
  f4jumbleInvInPlace(result);
  return result;
}

export const VALID_LENGTH = { min: VALID_MIN, max: VALID_MAX };
