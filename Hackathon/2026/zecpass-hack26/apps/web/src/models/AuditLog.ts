/**
 * @module models/AuditLog
 * Mongoose model for privacy-safe audit logging.
 * Stores only zk_proof_hash and hashed IPs — never wallet addresses.
 * Auto-deletes after 90 days via TTL index.
 */

import mongoose, { Schema, Document, Model } from 'mongoose';

/** Valid audit event types */
export type AuditEventType =
  | 'challenge_issued'
  | 'auth_success'
  | 'auth_failed'
  | 'session_revoked'
  | 'badge_issued'
  | 'badge_revoked'
  | 'app_registered';

/** AuditLog document interface */
export interface IAuditLog extends Document {
  event_type: AuditEventType;
  app_id: string | null;
  session_id: string | null;
  zk_proof_hash: string | null;
  metadata: Record<string, unknown>;
  ip_hash: string;
  timestamp: Date;
}

/** Static methods interface */
interface IAuditLogModel extends Model<IAuditLog> {
  /**
   * Convenience method to log an audit event.
   * @param entry - Partial audit log entry
   */
  log(entry: Partial<IAuditLog>): Promise<void>;
}

const auditLogSchema = new Schema<IAuditLog>(
  {
    event_type: {
      type: String,
      required: true,
      enum: [
        'challenge_issued',
        'auth_success',
        'auth_failed',
        'session_revoked',
        'badge_issued',
        'badge_revoked',
        'app_registered',
      ],
      index: true,
    },
    app_id: {
      type: String,
      default: null,
      index: true,
    },
    session_id: {
      type: String,
      default: null,
    },
    zk_proof_hash: {
      type: String,
      default: null,
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
    ip_hash: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
      default: Date.now,
      index: { expires: 90 * 24 * 60 * 60 }, // TTL: 90 days
    },
  },
  {
    collection: 'audit_logs',
    timestamps: false,
  }
);

// Static method: convenience logger
auditLogSchema.statics.log = async function (
  entry: Partial<IAuditLog>
): Promise<void> {
  try {
    await this.create({
      event_type: entry.event_type,
      app_id: entry.app_id || null,
      session_id: entry.session_id || null,
      zk_proof_hash: entry.zk_proof_hash || null,
      metadata: entry.metadata || {},
      ip_hash: entry.ip_hash || 'unknown',
      timestamp: entry.timestamp || new Date(),
    });
  } catch (error) {
    // Audit logging should never throw and break the main flow
    console.error('[AuditLog] Failed to write audit log:', error);
  }
};

export const AuditLog: IAuditLogModel =
  (mongoose.models.AuditLog as IAuditLogModel) ||
  mongoose.model<IAuditLog, IAuditLogModel>('AuditLog', auditLogSchema);
