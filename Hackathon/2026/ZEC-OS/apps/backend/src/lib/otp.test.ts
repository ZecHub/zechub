// Run: node --test src/lib/otp.test.ts   (Node >= 22.18 strips types natively)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  generateOtp, hashOtp, verifyOtp, otpExpiry,
  OTP_DIGITS, OTP_TTL_MS, MAX_OTP_ATTEMPTS,
} from './otp.ts';

test('generateOtp returns a zero-padded 6-digit numeric string', () => {
  for (let i = 0; i < 2000; i++) {
    const code = generateOtp();
    assert.equal(code.length, OTP_DIGITS);
    assert.match(code, /^[0-9]{6}$/);
  }
});

test('generateOtp spans the full keyspace including leading-zero codes', () => {
  // Over many draws we expect to see at least one code that only padding could
  // produce (a value < 100000), proving we are not accidentally doing
  // randomInt(100000, 1000000) and losing 10% of the keyspace.
  let sawLeadingZero = false;
  for (let i = 0; i < 20000 && !sawLeadingZero; i++) {
    if (generateOtp()[0] === '0') sawLeadingZero = true;
  }
  assert.ok(sawLeadingZero, 'expected at least one code with a leading zero');
});

test('generateOtp is not trivially repeating (CSPRNG sanity)', () => {
  const seen = new Set<string>();
  for (let i = 0; i < 500; i++) seen.add(generateOtp());
  // 500 draws from 10^6 should almost never collide down to a tiny set.
  assert.ok(seen.size > 490, `too many collisions: ${seen.size}/500 unique`);
});

test('hashOtp never stores the code in the clear', () => {
  const code = '042317';
  const stored = hashOtp(code);
  assert.ok(stored.startsWith('scrypt:'));
  assert.ok(!stored.includes(code), 'stored hash must not contain the raw code');
});

test('hashOtp is salted: same code hashes differently each time', () => {
  const code = '123456';
  assert.notEqual(hashOtp(code), hashOtp(code));
});

test('verifyOtp accepts the correct code and rejects wrong ones', () => {
  const code = '654321';
  const stored = hashOtp(code);
  assert.equal(verifyOtp(code, stored), true);
  assert.equal(verifyOtp('654320', stored), false);
  assert.equal(verifyOtp('000000', stored), false);
  assert.equal(verifyOtp('', stored), false);
});

test('verifyOtp is total: malformed stored values return false, never throw', () => {
  assert.equal(verifyOtp('123456', 'not-a-hash'), false);
  assert.equal(verifyOtp('123456', ''), false);
  assert.equal(verifyOtp('123456', 'scrypt:16384:8:1:zz:zz'), false);
});

test('otpExpiry is OTP_TTL_MS in the future', () => {
  const now = 1_000_000_000_000;
  assert.equal(otpExpiry(now).getTime(), now + OTP_TTL_MS);
});

test('attempt cap is a small positive number', () => {
  assert.ok(MAX_OTP_ATTEMPTS >= 1 && MAX_OTP_ATTEMPTS <= 10);
});
