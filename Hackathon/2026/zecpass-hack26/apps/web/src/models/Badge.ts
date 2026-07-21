/**
 * @module models/Badge
 * Mongoose model for ZK identity badges.
 * Badges are privacy-preserving credentials issued to zk_proof_hash holders.
 */

import mongoose, { Schema, Document, Model } from 'mongoose';

/** Badge document interface */
export interface IBadge extends Document {
  badge_id: string;
  badge_type: string;
  badge_label: string;
  issuer_app_id: string;
  holder_zk_hash: string;
  proof_data: Record<string, unknown>;
  issued_at: Date;
  expires_at: Date | null;
  revoked: boolean;
  revoked_at: Date | null;
  created_at: Date;
}

const badgeSchema = new Schema<IBadge>(
  {
    badge_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    badge_type: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    badge_label: {
      type: String,
      required: true,
      trim: true,
    },
    issuer_app_id: {
      type: String,
      required: true,
      index: true,
    },
    holder_zk_hash: {
      type: String,
      required: true,
      index: true,
    },
    proof_data: {
      type: Schema.Types.Mixed,
      default: {},
    },
    issued_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
    expires_at: {
      type: Date,
      default: null,
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
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'badges',
    timestamps: false,
  }
);

export const Badge: Model<IBadge> =
  (mongoose.models.Badge as Model<IBadge>) ||
  mongoose.model<IBadge>('Badge', badgeSchema);
