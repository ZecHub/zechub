# Client-side Unified Address Validation

> Pure JavaScript/TypeScript guide for parsing and validating Zcash Unified Addresses (ZIP-316) without Rust/WASM.

## Why client-side UA parsing matters

Web developers building merchant tools, payment gateways, or wallet UIs need to validate user-supplied Unified Addresses before submitting transactions. Shipping native Rust/WASM binaries to the browser adds bundle size, build complexity, and platform-specific friction. This guide shows how to implement UA decoding in pure JS/TS using only two small npm packages.

## Overview of ZIP-316 Unified Addresses

A Unified Address bundles multiple receiver types (Orchard, Sapling, Transparent) into a single string. The encoding uses:

1. **Bech32m** — standard encoding with HRP `u` (mainnet) or `utest` (testnet)
2. **F4Jumble** — a reversible byte transformation that prevents address malleability attacks
3. **Padding** — the HRP padded to 16 bytes appended before encoding
4. **Receiver format** — `(typecode, length, content)` triples

## Decoding pipeline

```
address string
  → Bech32m decode (ignore 90-char limit)
  → F4Jumble⁻¹
  → Strip padding (last 16 bytes = HRP + zero padding)
  → Parse receiver triples
```

## Step 1: Bech32m decode

Zcash UAs can exceed 90 characters (the standard Bech32m limit). Use a library that supports disabling the length check:

```typescript
import { bech32m } from '@scure/base';

// Pass `false` to disable the 90-char limit
const decoded = bech32m.decode(address, false as any);
const bytes = new Uint8Array(bech32m.fromWords(decoded.words));
```

**Validate the HRP** before decoding: it must be `u` (mainnet) or `utest` (testnet).

## Step 2: F4Jumble inverse

F4Jumble is a 4-round unkeyed Feistel network using BLAKE2b. Its purpose is to ensure that changing any byte of the address produces a completely different encoding — preventing partial-collision attacks where an adversary swaps internal bytes while the user only checks the first/last few characters.

### Algorithm

```
Given message M of length l, split into:
  left  = M[0 .. min(32, l/2)]
  right = M[min(32, l/2) .. l]

For jumble:     G(0) → H(0) → G(1) → H(1)
For unjumble:   H(1) → G(1) → H(0) → G(0)

Where:
  G(i): hash left with BLAKE2b-64, personalization "UA_F4Jumble_G" + [i, j_lo, j_hi],
        XOR result into right (in 64-byte chunks)
  H(i): hash right with BLAKE2b(|left|), personalization "UA_F4Jumble_H" + [i, 0, 0],
        XOR result into left
```

### Implementation

```typescript
import { blake2bInit, blake2bUpdate, blake2bFinal } from 'blakejs';

// The runtime supports (outlen, key, salt, personal) but the types only declare 2 params
const initBlake2b = blake2bInit as any;

function hPers(i: number): Uint8Array {
  return new Uint8Array([85,65,95,70,52,74,117,109,98,108,101,95,72, i, 0, 0]);
  // "UA_F4Jumble_H" + [i, 0, 0]
}

function gPers(i: number, j: number): Uint8Array {
  return new Uint8Array([85,65,95,70,52,74,117,109,98,108,101,95,71, i, j & 0xFF, (j >> 8) & 0xFF]);
  // "UA_F4Jumble_G" + [i, j_lo, j_hi]
}

function blake2bHash(data: Uint8Array, hashLen: number, personal: Uint8Array): Uint8Array {
  const ctx = initBlake2b(hashLen, undefined, undefined, personal);
  blake2bUpdate(ctx, data);
  return blake2bFinal(ctx);
}

function f4jumbleInv(message: Uint8Array): Uint8Array {
  const leftLen = Math.min(32, Math.floor(message.length / 2));
  const result = new Uint8Array(message);
  const left = result.subarray(0, leftLen);
  const right = result.subarray(leftLen);

  // Reverse order: H(1), G(1), H(0), G(0)
  // H round
  const hash = blake2bHash(right, left.length, hPers(1));
  for (let i = 0; i < left.length; i++) left[i] ^= hash[i];

  // G round
  for (let j = 0; j < Math.ceil(right.length / 64); j++) {
    const gHash = blake2bHash(left, 64, gPers(1, j));
    const start = j * 64;
    const end = Math.min(start + 64, right.length);
    for (let k = start; k < end; k++) right[k] ^= gHash[k - start];
  }

  // Repeat for round 0
  const hash0 = blake2bHash(right, left.length, hPers(0));
  for (let i = 0; i < left.length; i++) left[i] ^= hash0[i];

  for (let j = 0; j < Math.ceil(right.length / 64); j++) {
    const gHash = blake2bHash(left, 64, gPers(0, j));
    const start = j * 64;
    const end = Math.min(start + 64, right.length);
    for (let k = start; k < end; k++) right[k] ^= gHash[k - start];
  }

  return result;
}
```

### Test vectors

Verify your implementation against these:

```
Input:  "The package from Alice arrives tomorrow morning." (48 bytes)
Jumbled: 861c51ee746b0313476967a3483e7e1ff77a2952a17d3ed9e0ab0f502e1179430322da9967b613545b1c36353046ca27

Input:  "The package from Sarah arrives tomorrow morning." (48 bytes)
Jumbled: af1d55f2695aea02440867bbbfae3b08e8da55b625de3fa91432ab7b2c0a7dff9033ee666db1513ba5761ef482919fb8
```

Full test vectors: [librustzcash test_vectors.rs](https://github.com/zcash/librustzcash/blob/main/components/f4jumble/src/test_vectors.rs)

## Step 3: Remove padding

After F4Jumble⁻¹, the last 16 bytes are the HRP padded with zeros:

```typescript
const hrp = 'u'; // or 'utest'
const padding = new Uint8Array(16);
padding.set(new TextEncoder().encode(hrp));

const payloadEnd = unjumbled.length - 16;
const actualPadding = unjumbled.slice(payloadEnd);

for (let i = 0; i < 16; i++) {
  if (actualPadding[i] !== padding[i]) {
    throw new Error('Invalid padding');
  }
}

const payload = unjumbled.slice(0, payloadEnd);
```

## Step 4: Parse receivers

Each receiver is encoded as: **type code** (compact-size varint) → **length** (compact-size) → **content** (raw bytes).

```typescript
const RECEIVER_LENGTHS: Record<number, number> = {
  0x00: 20, // Transparent P2PKH
  0x01: 20, // Transparent P2SH
  0x02: 43, // Sapling
  0x03: 43, // Orchard
};

function readCompactSize(buf: Uint8Array, offset: number): [number, number] {
  const first = buf[offset];
  if (first <= 0xFC) return [first, 1];
  if (first === 0xFD) return [buf[offset+1] | (buf[offset+2] << 8), 3];
  if (first === 0xFE) return [(buf[offset+1] | (buf[offset+2] << 8) | (buf[offset+3] << 16) | (buf[offset+4] << 24)) >>> 0, 5];
  throw new Error('8-byte compact size not supported');
}

let offset = 0;
while (offset < payload.length) {
  const [typeCode, typeBytes] = readCompactSize(payload, offset);
  offset += typeBytes;

  const [contentLen, lenBytes] = readCompactSize(payload, offset);
  offset += lenBytes;

  const content = payload.slice(offset, offset + contentLen);
  offset += contentLen;

  console.log(`Receiver type 0x${typeCode.toString(16)}: ${contentLen} bytes`);
}
```

## Example: decoding a real mainnet address

```typescript
const ua = decodeUnifiedAddress(
  'u1pg2aaph7jp8rpf6yhsza25722sg5fcn3vaca6ze27hqjw7jvvhhuxkpcg0ge9xh6drsgdkda8qjq5chpehkcpxf87rnjryjqwymdheptpvnljqqrjqzjwkc2ma6hcq666kgwfytxwac8eyex6ndgr6ezte66706e3vaqrd25dzvzkc69kw0jgywtd0cmq52q5lkw6uh7hyvzjse8ksx'
);

// Result:
// {
//   network: 'mainnet',
//   receivers: [
//     { type: 0x00, typeName: 'Transparent P2PKH', rawBytes: Uint8Array(20) },
//     { type: 0x02, typeName: 'Sapling',           rawBytes: Uint8Array(43) },
//     { type: 0x03, typeName: 'Orchard',           rawBytes: Uint8Array(43) },
//   ]
// }
```

## Security considerations

- **Always validate receiver types** before processing. Reject addresses containing unknown type codes unless your application explicitly opts into them.
- **Never expose raw viewing keys** parsed from UVKs to untrusted code.
- **F4Jumble prevents malleability attacks**, but only if you fully decode and re-validate the address before use. Don't compare UA strings character-by-character — decode them first.

## Dependencies

| Package | Size | Purpose |
|---------|------|---------|
| `blakejs` | ~7 KB | BLAKE2b hashing (pure JS, no native bindings) |
| `@scure/base` | ~3 KB | Bech32m decoding |

## References

- [ZIP-316: Unified Addresses and Viewing Keys](https://zips.z.cash/zip-0316)
- [F4Jumble Rust reference](https://github.com/zcash/librustzcash/tree/main/components/f4jumble)
- [UA test vectors](https://github.com/zcash/librustzcash/blob/main/components/zcash_address/src/kind/unified/address/test_vectors.rs)
