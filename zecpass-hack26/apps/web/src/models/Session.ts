/**
 * @module models/Session
 * Mongoose model for authenticated sessions.
 * Sessions are bound to a zk_proof_hash (never an address) and a JWT jti.
 */

import mongoose, { Schema, Document, Model } from 'mongoose';

/** Session document interface */
export interface ISession extends Document {
  session_id: string;
  zk_proof_hash: string;
  app_id: string;
  scope: string[];
  jwt_jti: string;
  issued_at: Date;
  expires_at: Date;
  revoked: boolean;
  revoked_at: Date | null;
  last_used_at: Date;
  created_at: Date;

  /** Check if the session is currently valid (not revoked and not expired) */
  isValid(): boolean;
}

/** Static methods interface */
interface ISessionModel extends Model<ISession> {
  /**
   * Revoke a session by its JWT ID.
   * @param jti - The JWT ID to revoke
   */
  revokeByJti(jti: string): Promise<void>;
}

const sessionSchema = new Schema<ISession>(
  {
    session_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    zk_proof_hash: {
      type: String,
      required: true,
      index: true,
    },
    app_id: {
      type: String,
      required: true,
      index: true,
    },
    scope: {
      type: [String],
      required: true,
      default: ['identity'],
    },
    jwt_jti: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    issued_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
    expires_at: {
      type: Date,
      required: true,
      index: { expires: 0 }, // TTL index
    },
    revoked: {
      type: Boolean,
      required: true,
      default: false,
    },
    revoked_at: {
      type: Date,
      default: null,
    },
    last_used_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'sessions',
    timestamps: false,
  }
);

// Instance method: check if session is still valid
sessionSchema.methods.isValid = function (): boolean {
  return !this.revoked && this.expires_at > new Date();
};

// Static method: revoke a session by JTI
sessionSchema.statics.revokeByJti = async function (jti: string): Promise<void> {
  await this.findOneAndUpdate(
    { jwt_jti: jti },
    { revoked: true, revoked_at: new Date() }
  );
};

export const Session: ISessionModel =
  (mongoose.models.Session as ISessionModel) ||
  mongoose.model<ISession, ISessionModel>('Session', sessionSchema);
