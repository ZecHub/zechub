// One-way password hashing with Node's built-in scrypt. The plaintext is never
// stored anywhere — the DB holds only salt + derived key, so it cannot be
// reversed by anyone with DB access (including the admin).
import crypto from 'crypto';

const N = 16384, R = 8, P = 1, KEYLEN = 32;

export const MIN_PASSWORD_LENGTH = 8;

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16);
  const key = crypto.scryptSync(password, salt, KEYLEN, { N, r: R, p: P });
  return `scrypt:${N}:${R}:${P}:${salt.toString('hex')}:${key.toString('hex')}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  try {
    const [scheme, n, r, p, saltHex, keyHex] = stored.split(':');
    if (scheme !== 'scrypt') return false;
    const expected = Buffer.from(keyHex, 'hex');
    const actual = crypto.scryptSync(password, Buffer.from(saltHex, 'hex'), expected.length, {
      N: parseInt(n), r: parseInt(r), p: parseInt(p),
    });
    return crypto.timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}
