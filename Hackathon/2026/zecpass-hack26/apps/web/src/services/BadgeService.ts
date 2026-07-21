/**
 * @module services/BadgeService
 * Manages ZK identity badge issuance, verification, and revocation.
 */

import { v4 as uuidv4 } from 'uuid';
import { connectDB } from '@/lib/mongodb';
import { Badge, IBadge } from '@/models/Badge';
import { AuditLog } from '@/models/AuditLog';
import type { BadgeVerification } from '@/types/badge';

export class BadgeService {
  async issue(
    issuer_app_id: string,
    holder_zk_hash: string,
    badge_type: string,
    badge_label: string,
    proof_data: Record<string, unknown>,
    expires_at?: Date | null
  ): Promise<IBadge> {
    await connectDB();
    const badge_id = uuidv4();
    const badge = await Badge.create({
      badge_id, badge_type, badge_label, issuer_app_id, holder_zk_hash,
      proof_data, issued_at: new Date(), expires_at: expires_at || null,
      revoked: false, revoked_at: null,
    });
    await AuditLog.log({
      event_type: 'badge_issued', app_id: issuer_app_id,
      zk_proof_hash: holder_zk_hash,
      metadata: { badge_id, badge_type, badge_label }, ip_hash: 'system',
    });
    return badge;
  }

  async verify(badge_id: string): Promise<BadgeVerification> {
    await connectDB();
    const badge = await Badge.findOne({ badge_id });
    if (!badge) return { valid: false, error: 'Badge not found' };
    if (badge.revoked) return { valid: false, badge_id: badge.badge_id, badge_type: badge.badge_type, badge_label: badge.badge_label, revoked: true, error: 'Badge has been revoked' };
    if (badge.expires_at && badge.expires_at <= new Date()) return { valid: false, badge_id: badge.badge_id, badge_type: badge.badge_type, badge_label: badge.badge_label, error: 'Badge has expired' };
    return { valid: true, badge_id: badge.badge_id, badge_type: badge.badge_type, badge_label: badge.badge_label, issuer_app_id: badge.issuer_app_id, issued_at: badge.issued_at, expires_at: badge.expires_at, revoked: false };
  }

  async revoke(badge_id: string, revoker_zk_hash: string): Promise<void> {
    await connectDB();
    const badge = await Badge.findOne({ badge_id });
    if (!badge) throw new Error('Badge not found');
    if (badge.revoked) return;
    badge.revoked = true;
    badge.revoked_at = new Date();
    await badge.save();
    await AuditLog.log({ event_type: 'badge_revoked', app_id: badge.issuer_app_id, zk_proof_hash: revoker_zk_hash, metadata: { badge_id, badge_type: badge.badge_type }, ip_hash: 'system' });
  }

  async listForHolder(holder_zk_hash: string, app_id?: string): Promise<IBadge[]> {
    await connectDB();
    const query: Record<string, unknown> = { holder_zk_hash };
    if (app_id) query.issuer_app_id = app_id;
    return Badge.find(query).sort({ issued_at: -1 }).exec();
  }
}
