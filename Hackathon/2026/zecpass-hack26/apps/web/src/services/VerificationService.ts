/**
 * @module services/VerificationService
 * Handles memo verification, session creation, and session validation.
 */

import { v4 as uuidv4 } from 'uuid';
import { connectDB } from '@/lib/mongodb';
import { verifyMemo } from '@/lib/verification';
import { deriveZkProofHash } from '@/lib/zk';
import { signToken, verifyToken } from '@/lib/jwt';
import { Session } from '@/models/Session';
import { AuditLog } from '@/models/AuditLog';
import { config } from '@/lib/config';
import type { AuthResult, SessionVerification } from '@/types/auth';

/**
 * Service for processing verifications and managing sessions.
 */
export class VerificationService {
  /**
   * Process a complete verification: verify memo → derive zk hash → create session → sign JWT.
   *
   * @param challenge_id - The challenge to verify
   * @param memo - The raw memo from the Zcash transaction
   * @param tx_id - The Zcash transaction ID
   * @returns Authentication result with access token and session data
   */
  async processVerification(
    challenge_id: string,
    memo: string,
    tx_id: string
  ): Promise<AuthResult> {
    await connectDB();

    // Step 1: Verify the memo
    const result = await verifyMemo(challenge_id, memo, tx_id);

    if (!result.valid || !result.challenge) {
      // Log failure
      await AuditLog.log({
        event_type: 'auth_failed',
        metadata: {
          challenge_id,
          error: result.error,
          tx_id,
        },
        ip_hash: 'system',
      });

      throw new Error(result.error || 'Verification failed');
    }

    // Step 2: Derive ZK proof hash (privacy-preserving user identifier)
    const zk_proof_hash = deriveZkProofHash(
      result.challenge.challenge_id,
      tx_id,
      result.challenge.nonce,
      result.challenge.app_id
    );

    // Step 3: Create session
    const session_id = uuidv4();
    const now = new Date();
    const expires_at = new Date(now.getTime() + config.sessionTtlSeconds * 1000);

    // Step 4: Sign JWT (generates jti internally)
    const access_token = await signToken({
      session_id,
      app_id: result.challenge.app_id,
      scope: result.challenge.scope,
      zk_proof_hash,
    });

    // Decode to get the jti
    const { decodeToken } = await import('@/lib/jwt');
    const decoded = decodeToken(access_token);
    const jti = decoded?.jti || uuidv4();

    // Step 5: Save session to DB
    await Session.create({
      session_id,
      zk_proof_hash,
      app_id: result.challenge.app_id,
      scope: result.challenge.scope,
      jwt_jti: jti,
      issued_at: now,
      expires_at,
      revoked: false,
      revoked_at: null,
      last_used_at: now,
    });

    // Step 6: Audit log
    await AuditLog.log({
      event_type: 'auth_success',
      app_id: result.challenge.app_id,
      session_id,
      zk_proof_hash,
      metadata: { challenge_id, tx_id },
      ip_hash: 'system',
    });

    return {
      access_token,
      token_type: 'Bearer',
      expires_in: config.sessionTtlSeconds,
      session_id,
      scope: result.challenge.scope,
      zk_proof_hash,
    };
  }

  /**
   * Validate an existing session token.
   * Verifies JWT, checks session in DB, and updates last_used_at.
   *
   * @param token - The JWT token to validate
   * @returns Session verification result
   */
  async validateSession(token: string): Promise<SessionVerification> {
    try {
      await connectDB();

      // Verify JWT signature and expiry
      const payload = await verifyToken(token);

      // Load session from DB
      const session = await Session.findOne({
        jwt_jti: payload.jti,
      });

      if (!session) {
        return { valid: false, error: 'Session not found' };
      }

      if (!session.isValid()) {
        return { valid: false, error: 'Session revoked or expired' };
      }

      // Update last_used_at
      session.last_used_at = new Date();
      await session.save();

      return {
        valid: true,
        session_id: session.session_id,
        app_id: session.app_id,
        scope: session.scope,
        zk_proof_hash: session.zk_proof_hash,
        expires_at: Math.floor(session.expires_at.getTime() / 1000),
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Validation failed';
      return { valid: false, error: message };
    }
  }
}
