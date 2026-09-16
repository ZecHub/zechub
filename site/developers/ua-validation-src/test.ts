/**
 * F4Jumble test vectors from the Rust reference implementation.
 * https://github.com/zcash/librustzcash/blob/main/components/f4jumble/src/test_vectors.rs
 */

import { f4jumble, f4jumbleInv } from './f4jumble';

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Test vector 1 (48 bytes - minimum valid length)
const normal1 = hexToBytes('5d7a8f739a2d9e945b0ce152a8049e294c4d6e66b164939daffa2ef6ee6921481cdd86b3cc4318d9614fc820905d042b');
const jumbled1 = hexToBytes('0304d029141b995da5387c125970673504d6c764d91ea6c082123770c7139ccd88ee27368cd0c0921a0444c8e5858d22');

// Test vector 2 (64 bytes)
const normal2 = hexToBytes('b1ef9ca3f24988c7b3534201cfb1cd8dbf69b8250c18ef41294ca97993db546c1fe01f7e9c8e36d6a5e29d4e30a73594bf5098421c69378af1e40f64e125946f');
const jumbled2 = hexToBytes('5271fa3321f3adbcfb075196883d542b438ec6339176537daf859841fe6a56222bff76d1662b5509a9e1079e446eeedd2e683c31aae3ee1851d7954328526be1');

// Test vector 3 (128 bytes)
const normal3 = hexToBytes('62c2fa7b2fecbcb664b69682912a6381ce3dc166d56a1d62f5a8d7551db5fd9313e8c7203d996af7d477083756d59af80d06a745f44ab023752cb5b406ed8985e18130ab33362697b0e4e4c763ccb8f676495c2227f7fba1e31defa3d5a57efc2e1e9b01a035587d5fb1a38e01d94903d3c3e0ad3360c1d3710acd20b183e3d1d49f');
const jumbled3hex = '498cf1b1ba6f4577effe64151d67469adc30acc325e326207e7d78487085b4162669f82f02f9774c0cc2';

// Run tests
let passed = 0;
let failed = 0;

function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`  PASS: ${name}`);
    passed++;
  } catch (e: any) {
    console.log(`  FAIL: ${name} — ${e.message}`);
    failed++;
  }
}

function assert(condition: boolean, msg: string) {
  if (!condition) throw new Error(msg);
}

console.log('F4Jumble Test Vectors:\n');

test('vector 1 — forward jumble (48 bytes)', () => {
  const result = f4jumble(normal1);
  assert(bytesToHex(result) === bytesToHex(jumbled1), `Expected ${bytesToHex(jumbled1)}, got ${bytesToHex(result)}`);
});

test('vector 1 — inverse jumble (48 bytes)', () => {
  const result = f4jumbleInv(jumbled1);
  assert(bytesToHex(result) === bytesToHex(normal1), `Expected ${bytesToHex(normal1)}, got ${bytesToHex(result)}`);
});

test('vector 2 — forward jumble (64 bytes)', () => {
  const result = f4jumble(normal2);
  assert(bytesToHex(result) === bytesToHex(jumbled2), `Expected ${bytesToHex(jumbled2)}, got ${bytesToHex(result)}`);
});

test('vector 2 — inverse jumble (64 bytes)', () => {
  const result = f4jumbleInv(jumbled2);
  assert(bytesToHex(result) === bytesToHex(normal2), `Expected ${bytesToHex(normal2)}, got ${bytesToHex(result)}`);
});

test('roundtrip: jumble then unjumble (48 bytes)', () => {
  const jumbled = f4jumble(normal1);
  const unjumbled = f4jumbleInv(jumbled);
  assert(bytesToHex(unjumbled) === bytesToHex(normal1), 'Roundtrip failed for vector 1');
});

test('roundtrip: jumble then unjumble (64 bytes)', () => {
  const jumbled = f4jumble(normal2);
  const unjumbled = f4jumbleInv(jumbled);
  assert(bytesToHex(unjumbled) === bytesToHex(normal2), 'Roundtrip failed for vector 2');
});

// Test from the Rust docstrings
test('Rust example: "The package from Alice arrives tomorrow morning."', () => {
  const msg = new TextEncoder().encode('The package from Alice arrives tomorrow morning.');
  const result = f4jumble(msg);
  assert(bytesToHex(result) === '861c51ee746b0313476967a3483e7e1ff77a2952a17d3ed9e0ab0f502e1179430322da9967b613545b1c36353046ca27',
    `Expected 861c51..., got ${bytesToHex(result)}`);
});

test('Rust example: inverse of "The package from Alice..."', () => {
  const jumbled = hexToBytes('861c51ee746b0313476967a3483e7e1ff77a2952a17d3ed9e0ab0f502e1179430322da9967b613545b1c36353046ca27');
  const result = f4jumbleInv(jumbled);
  assert(new TextDecoder().decode(result) === 'The package from Alice arrives tomorrow morning.',
    `Expected text, got ${new TextDecoder().decode(result)}`);
});

test('Rust example: "The package from Sarah arrives tomorrow morning."', () => {
  const msg = new TextEncoder().encode('The package from Sarah arrives tomorrow morning.');
  const result = f4jumble(msg);
  assert(bytesToHex(result) === 'af1d55f2695aea02440867bbbfae3b08e8da55b625de3fa91432ab7b2c0a7dff9033ee666db1513ba5761ef482919fb8',
    `Expected af1d55..., got ${bytesToHex(result)}`);
});

test('invalid length throws (< 48)', () => {
  let threw = false;
  try { f4jumble(new Uint8Array(10)); } catch { threw = true; }
  assert(threw, 'Should throw for length < 48');
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
