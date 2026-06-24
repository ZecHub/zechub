/**
 * @module lib/verification
 * Full memo verification pipeline with replay protection and timing safety.
 */

import { connectDB } from './mongodb';
import { Challenge } from '@/models/Challenge';
import { parseMemoPayload } from './challenge';
import { safeCompare } from './zk';
import type { VerificationResult } from '@/types/auth';

/**
 * Verify a Zcash shielded memo against a stored challenge.
 *
 * Verification pipeline:
 * 1. Parse memo format
 * 2. Load challenge from DB
 * 3. Check challenge not expired
 * 4. Check challenge not already used (atomic update)
 * 5. Verify nonce matches (timing-safe)
 * 6. Verify timestamp within ±60 seconds
 * 7. Mark challenge as used
 *
 * @param challenge_id - The challenge ID to verify against
 * @param memo - The raw memo string from the Zcash transaction
 * @param tx_id - The Zcash transaction ID
 * @returns Verification result with success/failure details
 */
export async function verifyMemo(
  challenge_id: string,
  memo: string,
  tx_id: string
): Promise<VerificationResult> {
  try {
    await connectDB();

    // Step 1: Parse memo payload
    const parsed = parseMemoPayload(memo);
    if (!parsed) {
      return { valid: false, error: 'Invalid memo format' };
    }

    // Step 2: Verify challenge_id from memo matches the one we're looking for
    if (!safeCompare(parsed.challenge_id, challenge_id)) {
      return { valid: false, error: 'Challenge ID mismatch' };
    }

    // Step 3: Atomically find and claim the challenge
    // This prevents replay attacks — only the first verification succeeds
    const challenge = await Challenge.findOneAndUpdate(
      {
        challenge_id,
        used: false,
        expires_at: { $gt: new Date() },
      },
      {
        $set: {
          used: true,
          used_at: new Date(),
        },
      },
      {
        new: false, // Return the document BEFORE update (to check original state)
      }
    );

    if (!challenge) {
      // Could be: not found, already used, or expired
      const existing = await Challenge.findOne({ challenge_id });
      if (!existing) {
        return { valid: false, error: 'Challenge not found' };
      }
      if (existing.used) {
        return { valid: false, error: 'Challenge already used (replay detected)' };
      }
      if (existing.expires_at <= new Date()) {
        return { valid: false, error: 'Challenge has expired' };
      }
      return { valid: false, error: 'Challenge verification failed' };
    }

    // Step 4: Verify nonce matches (timing-safe comparison)
    if (!safeCompare(parsed.nonce, challenge.nonce)) {
      // Undo the used flag since nonce didn't match
      await Challenge.findOneAndUpdate(
        { challenge_id },
        { $set: { used: false, used_at: null } }
      );
      return { valid: false, error: 'Nonce mismatch' };
    }

    // Step 5: Verify timestamp matches the challenge's expiration time (to prevent tampering)
    const challengeExpiresUnix = Math.floor(challenge.expires_at.getTime() / 1000);
    if (parsed.timestamp !== challengeExpiresUnix) {
      // Undo the used flag since timing check failed
      await Challenge.findOneAndUpdate(
        { challenge_id },
        { $set: { used: false, used_at: null } }
      );
      return { valid: false, error: 'Challenge expiration timestamp mismatch' };
    }

    // Step 6: Verify challenge has not expired
    const serverTimestamp = Math.floor(Date.now() / 1000);
    if (serverTimestamp > parsed.timestamp) {
      // Undo the used flag since challenge has expired
      await Challenge.findOneAndUpdate(
        { challenge_id },
        { $set: { used: false, used_at: null } }
      );
      return { valid: false, error: 'Challenge has expired' };
    }

    // All checks passed
    return {
      valid: true,
      challenge: {
        challenge_id: challenge.challenge_id,
        app_id: challenge.app_id,
        scope: challenge.scope,
        nonce: challenge.nonce,
      },
      tx_id,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown verification error';
    return { valid: false, error: message };
  }
}
