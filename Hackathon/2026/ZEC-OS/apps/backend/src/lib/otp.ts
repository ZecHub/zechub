// One-time passcode (OTP) primitives for account recovery.
//
// Security properties enforced here (the recovery flow relies on all of them):
//   - Codes are drawn from a CSPRNG (crypto.randomInt), never Math.random().
//   - Only a salted one-way hash of the code is ever persisted, never the code
//     itself — a DB leak does not reveal in-flight recovery codes.
//   - Verification is constant-time (crypto.timingSafeEqual) to deny attackers
//     a timing side channel for guessing digits.
//   - Codes carry a short TTL and a hard per-code attempt cap, so the ~10^6
//     keyspace cannot be brute forced online.
//
// This module is deliberately free of any DB / HTTP dependency so the
// security-critical logic is unit-testable on its own.
import crypto from 'crypto';

// 6 digits => 1_000_000 possible codes. With MAX_OTP_ATTEMPTS tries per code and
// a short TTL, the online guessing probability per recovery attempt is bounded
// by MAX_OTP_ATTEMPTS / 1_000_000.
export const OTP_DIGITS = 6;
export const OTP_TTL_MS = 10 * 60 * 1000; // code is valid for 10 minutes
export const MAX_OTP_ATTEMPTS = 5; // wrong guesses allowed before the code dies

const N = 16384, R = 8, P = 1, KEYLEN = 32;

/** A fresh zero-padded 6-digit code, drawn from a cryptographically secure RNG. */
export function generateOtp(): string {
  // randomInt is uniform over [0, 10^OTP_DIGITS) with no modulo bias.
  const max = 10 ** OTP_DIGITS;
  return String(crypto.randomInt(0, max)).padStart(OTP_DIGITS, '0');
}

/** One-way salted scrypt hash of a code, formatted scrypt:N:r:p:salt:hash. */
export function hashOtp(code: string): string {
  const salt = crypto.randomBytes(16);
  const key = crypto.scryptSync(code, salt, KEYLEN, { N, r: R, p: P });
  return `scrypt:${N}:${R}:${P}:${salt.toString('hex')}:${key.toString('hex')}`;
}

/** Constant-time check of a candidate code against a stored hash. */
export function verifyOtp(code: string, stored: string): boolean {
  try {
    const [scheme, n, r, p, saltHex, keyHex] = stored.split(':');
    if (scheme !== 'scrypt') return false;
    const expected = Buffer.from(keyHex, 'hex');
    const salt = Buffer.from(saltHex, 'hex');
    // Reject malformed records before hashing: a non-hex / empty key or salt
    // decodes to a zero-length Buffer, and timingSafeEqual(<empty>, <empty>)
    // would otherwise return true and accept any code.
    if (expected.length !== KEYLEN || salt.length === 0) return false;
    const actual = crypto.scryptSync(code, salt, expected.length, {
      N: parseInt(n), r: parseInt(r), p: parseInt(p),
    });
    if (actual.length !== expected.length) return false;
    return crypto.timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

/** Expiry timestamp for a newly minted code. */
export function otpExpiry(now: number = Date.now()): Date {
  return new Date(now + OTP_TTL_MS);
}
