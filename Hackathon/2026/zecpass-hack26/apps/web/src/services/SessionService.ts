/**
 * @module services/SessionService
 * Manages session revocation and listing.
 */

import { connectDB } from '@/lib/mongodb';
import { Session, ISession } from '@/models/Session';
import { AuditLog } from '@/models/AuditLog';

/**
 * Service for managing user sessions.
 */
export class SessionService {
  /**
   * Revoke a specific session. Only the owner (matching zk_proof_hash) can revoke.
   *
   * @param session_id - The session to revoke
   * @param zk_proof_hash - The requester's ZK proof hash (for authorization)
   */
  async revoke(session_id: string, zk_proof_hash: string): Promise<void> {
    await connectDB();

    const session = await Session.findOne({ session_id });

    if (!session) {
      throw new Error('Session not found');
    }

    // Only the session owner can revoke
    if (session.zk_proof_hash !== zk_proof_hash) {
      throw new Error('Unauthorized: you can only revoke your own sessions');
    }

    if (session.revoked) {
      return; // Already revoked — idempotent
    }

    session.revoked = true;
    session.revoked_at = new Date();
    await session.save();

    await AuditLog.log({
      event_type: 'session_revoked',
      app_id: session.app_id,
      session_id,
      zk_proof_hash,
      ip_hash: 'system',
    });
  }

  /**
   * List all active (non-revoked, non-expired) sessions for a user.
   * Safe to return — session docs never contain addresses.
   *
   * @param zk_proof_hash - The user's ZK proof hash
   * @returns Array of active session documents
   */
  async listForUser(zk_proof_hash: string): Promise<ISession[]> {
    await connectDB();

    return Session.find({
      zk_proof_hash,
      revoked: false,
      expires_at: { $gt: new Date() },
    })
      .sort({ issued_at: -1 })
      .exec();
  }

  /**
   * Revoke all active sessions for a user.
   *
   * @param zk_proof_hash - The user's ZK proof hash
   * @returns Number of sessions revoked
   */
  async revokeAll(zk_proof_hash: string): Promise<number> {
    await connectDB();

    const result = await Session.updateMany(
      {
        zk_proof_hash,
        revoked: false,
      },
      {
        $set: {
          revoked: true,
          revoked_at: new Date(),
        },
      }
    );

    if (result.modifiedCount > 0) {
      await AuditLog.log({
        event_type: 'session_revoked',
        zk_proof_hash,
        metadata: { revoked_count: result.modifiedCount, type: 'revoke_all' },
        ip_hash: 'system',
      });
    }

    return result.modifiedCount;
  }
}
