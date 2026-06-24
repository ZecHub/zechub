/**
 * @module lib/zk
 * ZK proof hash derivation and IP hashing for privacy-safe audit logging.
 */

import { createHash, timingSafeEqual } from 'crypto';
import { config } from './config';

/**
 * Derive a deterministic, address-free user identifier.
 * The same user re-authenticating to the same app always gets the same hash.
 * Different apps produce different hashes (app_id is in the input).
 *
 * @param challenge_id - The challenge UUID
 * @param tx_id - The Zcash transaction ID
 * @param nonce - The challenge nonce
 * @param app_id - The application ID (ensures app isolation)
 * @returns SHA256 hex string (64 characters)
 */
export function deriveZkProofHash(
  challenge_id: string,
  tx_id: string,
  nonce: string,
  app_id: string
): string {
  return createHash('sha256')
    .update(`${challenge_id}:${tx_id}:${nonce}:${app_id}`)
    .digest('hex');
}

/**
 * Hash an IP address for privacy-safe audit logging.
 * Uses SHA256 with a server-side salt so IPs cannot be reversed.
 *
 * @param ip - The raw IP address
 * @returns SHA256 hex hash of the salted IP
 */
export function hashIp(ip: string): string {
  const salt = config.ipHashSalt;
  return createHash('sha256')
    .update(`${ip}${salt}`)
    .digest('hex');
}

/**
 * Timing-safe string comparison to prevent timing attacks.
 * Both strings must be the same length for timingSafeEqual.
 *
 * @param a - First string
 * @param b - Second string
 * @returns True if strings are equal
 */
export function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  const bufA = Buffer.from(a, 'utf-8');
  const bufB = Buffer.from(b, 'utf-8');

  return timingSafeEqual(bufA, bufB);
}
