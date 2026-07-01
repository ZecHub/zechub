/**
 * @module lib/challenge
 * Challenge generation, memo building, and memo parsing.
 */

import { v4 as uuidv4 } from 'uuid';
import { randomBytes } from 'crypto';
import { config } from './config';
import { connectDB } from './mongodb';
import { Challenge, IChallenge } from '@/models/Challenge';
import { AuditLog } from '@/models/AuditLog';
import { hashIp } from './zk';

/**
 * Generate a new authentication challenge.
 * Creates a unique challenge with a random nonce and saves it to the database.
 *
 * @param app_id - The application requesting authentication
 * @param scope - Requested permission scopes
 * @param ip - Requester's IP address (will be hashed for privacy)
 * @returns The created challenge document
 */
export async function generateChallenge(
  app_id: string,
  scope: string[],
  ip: string
): Promise<IChallenge> {
  await connectDB();

  const challenge_id = uuidv4();
  const nonce = randomBytes(32).toString('hex');
  const now = new Date();
  const expires_at = new Date(now.getTime() + config.challengeTtlSeconds * 1000);
  const ip_hash = hashIp(ip);

  const challenge = await Challenge.create({
    challenge_id,
    app_id,
    scope,
    zecpass_address: config.zecpassReceiveAddress(),
    nonce,
    issued_at: now,
    expires_at,
    used: false,
    used_at: null,
    ip_hash,
  });

  // Audit log — never throws
  await AuditLog.log({
    event_type: 'challenge_issued',
    app_id,
    ip_hash,
    metadata: { challenge_id, scope, expires_at: expires_at.toISOString() },
  });

  return challenge;
}

/**
 * Build the memo payload string that the user must send.
 * Format: ZECPASS:v1:{challenge_id}:{nonce}:{expires_at_unix}
 *
 * @param challenge - The challenge document
 * @returns Formatted memo payload string
 */
export function buildMemoPayload(challenge: IChallenge): string {
  const expiresAtUnix = Math.floor(challenge.expires_at.getTime() / 1000);
  return `ZECPASS:v1:${challenge.challenge_id}:${challenge.nonce}:${expiresAtUnix}`;
}

/**
 * Parse a memo payload string and extract components.
 * Validates the format with regex before extracting.
 *
 * @param memo - Raw memo string from the Zcash transaction
 * @returns Parsed components or null if the format is invalid
 */
export function parseMemoPayload(
  memo: string
): { challenge_id: string; nonce: string; timestamp: number } | null {
  // Validate format: ZECPASS:v1:{uuid}:{64hex}:{unix_timestamp}
  const pattern =
    /^ZECPASS:v1:([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}):([0-9a-f]{64}):(\d{10,})$/;

  const match = memo.trim().match(pattern);
  if (!match) {
    return null;
  }

  const [, challenge_id, nonce, timestampStr] = match;
  const timestamp = parseInt(timestampStr, 10);

  if (isNaN(timestamp)) {
    return null;
  }

  return { challenge_id, nonce, timestamp };
}
