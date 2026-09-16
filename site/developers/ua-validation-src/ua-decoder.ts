/**
 * ZIP-316 Unified Address decoder in pure TypeScript.
 *
 * Decodes a Zcash Unified Address (UA) or Unified Viewing Key (UVK)
 * into its constituent receivers, using:
 *   1. Bech32m decoding
 *   2. F4Jumble⁻¹
 *   3. Padding removal
 *   4. Raw receiver parsing
 *
 * Reference: ZIP-316 — https://zips.z.cash/zip-0316
 */

import { bech32m } from '@scure/base';
import { f4jumbleInv, VALID_LENGTH } from './f4jumble';

// --- Receiver type codes from ZIP-316 ---
export enum ReceiverType {
  Orchard = 0x03,
  Sapling = 0x02,
  TransparentP2PKH = 0x00,
  TransparentP2SH = 0x01,
  // Extensions (NU6+)
  OrchardZSA = 0x04,
}

const RECEIVER_NAMES: Record<number, string> = {
  [ReceiverType.Orchard]: 'Orchard',
  [ReceiverType.Sapling]: 'Sapling',
  [ReceiverType.TransparentP2PKH]: 'Transparent P2PKH',
  [ReceiverType.TransparentP2SH]: 'Transparent P2SH',
  [ReceiverType.OrchardZSA]: 'Orchard-ZSA',
};

// Expected content length per type code
const RECEIVER_LENGTHS: Record<number, number> = {
  [ReceiverType.Orchard]: 43,
  [ReceiverType.Sapling]: 43,
  [ReceiverType.TransparentP2PKH]: 20,
  [ReceiverType.TransparentP2SH]: 20,
  [ReceiverType.OrchardZSA]: 43,
};

// Known HRPs
const VALID_HRPS = ['u', 'utest'];

export interface Receiver {
  type: number;
  typeName: string;
  rawBytes: Uint8Array;
}

export interface DecodedUA {
  hrp: string;
  network: 'mainnet' | 'testnet';
  receivers: Receiver[];
  rawPayload: Uint8Array; // after F4Jumble⁻¹ and padding removal
}

/**
 * Parse a compact-size (varint) from a byte buffer.
 * ZIP-316 uses Bitcoin-style compact size:
 *   0x00..0xFC  → value is the byte itself
 *   0xFD        → next 2 bytes are little-endian uint16
 *   0xFE        → next 4 bytes are little-endian uint32
 *   0xFF        → next 8 bytes are little-endian uint64
 */
function readCompactSize(buf: Uint8Array, offset: number): [number, number] {
  const first = buf[offset];
  if (first <= 0xFC) return [first, 1];
  if (first === 0xFD) {
    const val = buf[offset + 1] | (buf[offset + 2] << 8);
    return [val, 3];
  }
  if (first === 0xFE) {
    const val = buf[offset + 1] | (buf[offset + 2] << 8) | (buf[offset + 3] << 16) | (buf[offset + 4] << 24);
    return [val >>> 0, 5]; // unsigned
  }
  throw new Error('8-byte compact size not supported (too large for UA receivers)');
}

/**
 * Parse receivers from the raw payload (after F4Jumble⁻¹ and padding removal).
 */
function parseReceivers(data: Uint8Array): Receiver[] {
  const receivers: Receiver[] = [];
  let offset = 0;

  while (offset < data.length) {
    const [typeCode, typeBytes] = readCompactSize(data, offset);
    offset += typeBytes;

    const [contentLen, lenBytes] = readCompactSize(data, offset);
    offset += lenBytes;

    if (offset + contentLen > data.length) {
      throw new Error(`Receiver extends past end of payload at offset ${offset}`);
    }

    const rawBytes = data.slice(offset, offset + contentLen);
    offset += contentLen;

    const expectedLen = RECEIVER_LENGTHS[typeCode];
    if (expectedLen !== undefined && contentLen !== expectedLen) {
      throw new Error(`Receiver type 0x${typeCode.toString(16)}: expected ${expectedLen} bytes, got ${contentLen}`);
    }

    receivers.push({
      type: typeCode,
      typeName: RECEIVER_NAMES[typeCode] ?? `Unknown(0x${typeCode.toString(16)})`,
      rawBytes,
    });
  }

  return receivers;
}

/**
 * Decode a Zcash Unified Address string.
 *
 * @param address - A bech32m-encoded UA string (e.g. "u1...")
 * @returns Parsed receivers and metadata
 * @throws On invalid encoding, checksum, jumble, padding, or receiver parsing
 */
export function decodeUnifiedAddress(address: string): DecodedUA {
  // 1. Bech32m decode
  const hrp = address.startsWith('utest') ? 'utest' : address.startsWith('u') ? 'u' : null;
  if (!hrp) throw new Error('Address must start with "u" (mainnet) or "utest" (testnet)');

  let decoded: { prefix: string; words: number[] };
  try {
    decoded = bech32m.decode(address as any, false as any);
  } catch (e: any) {
    throw new Error(`Bech32m decode failed: ${e.message}`);
  }

  if (decoded.prefix !== hrp) {
    throw new Error(`HRP mismatch: expected "${hrp}", got "${decoded.prefix}"`);
  }

  // Convert 5-bit words to 8-bit bytes
  const rawBytes = new Uint8Array(bech32m.fromWords(decoded.words));

  // 2. F4Jumble⁻¹
  const unjumbled = f4jumbleInv(rawBytes);

  // 3. Remove padding: last 16 bytes should be HRP padded to 16 bytes with zeros
  const padding = new Uint8Array(16);
  const hrpBytes = new TextEncoder().encode(hrp);
  padding.set(hrpBytes.subarray(0, Math.min(hrpBytes.length, 16)));

  const payloadEnd = unjumbled.length - 16;
  if (payloadEnd < 0) throw new Error('Payload too short for padding');

  const actualPadding = unjumbled.slice(payloadEnd);
  for (let i = 0; i < 16; i++) {
    if (actualPadding[i] !== padding[i]) {
      throw new Error(`Padding mismatch at byte ${i}: expected 0x${padding[i].toString(16)}, got 0x${actualPadding[i].toString(16)}`);
    }
  }

  const payload = unjumbled.slice(0, payloadEnd);

  // 4. Parse receivers
  const receivers = parseReceivers(payload);

  if (receivers.length === 0) {
    throw new Error('No receivers found in address');
  }

  return {
    hrp,
    network: hrp === 'u' ? 'mainnet' : 'testnet',
    receivers,
    rawPayload: payload,
  };
}

/**
 * Encode a Unified Address from receivers. (For testing roundtrip.)
 */
export function encodeUnifiedAddress(
  hrp: string,
  receivers: Receiver[],
): string {
  // 1. Build raw payload
  const parts: number[] = [];
  for (const r of receivers) {
    // Type code (compact-size)
    if (r.type <= 0xFC) parts.push(r.type);
    else throw new Error('Type code > 0xFC not implemented');
    // Content length (compact-size)
    if (r.rawBytes.length <= 0xFC) parts.push(r.rawBytes.length);
    else throw new Error('Content length > 0xFC not implemented');
    // Content
    for (const b of r.rawBytes) parts.push(b);
  }
  const payload = new Uint8Array(parts);

  // 2. Add padding (HRP padded to 16 bytes with zeros)
  const padding = new Uint8Array(16);
  const hrpBytes = new TextEncoder().encode(hrp);
  padding.set(hrpBytes.subarray(0, Math.min(hrpBytes.length, 16)));

  const withPadding = new Uint8Array(payload.length + 16);
  withPadding.set(payload);
  withPadding.set(padding, payload.length);

  // 3. F4Jumble
  const { f4jumble } = require('./f4jumble');
  const jumbled = f4jumble(withPadding);

  // 4. Bech32m encode
  const words = bech32m.toWords(jumbled);
  return bech32m.encode(hrp as any, words);
}

/** Utility: hex string to bytes */
export function hexToBytes(hex: string): Uint8Array {
  const clean = hex.replace(/^0x/, '');
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < clean.length; i += 2) {
    bytes[i / 2] = parseInt(clean.substring(i, i + 2), 16);
  }
  return bytes;
}

/** Utility: bytes to hex string */
export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}
