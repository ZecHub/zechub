/**
 * @module models/Challenge
 * Mongoose model for authentication challenges.
 * Each challenge is single-use, time-bound, and tied to an app_id.
 */

import mongoose, { Schema, Document, Model } from 'mongoose';

/** Challenge document interface */
export interface IChallenge extends Document {
  challenge_id: string;
  app_id: string;
  scope: string[];
  zecpass_address: string;
  nonce: string;
  issued_at: Date;
  expires_at: Date;
  used: boolean;
  used_at: Date | null;
  ip_hash: string;
  created_at: Date;
}

/** Static methods interface */
interface IChallengeModel extends Model<IChallenge> {
  /**
   * Find all active (unused + unexpired) challenges for an app.
   * @param app_id - The application ID to query
   * @returns Array of active challenge documents
   */
  findActiveByAppId(app_id: string): Promise<IChallenge[]>;
}

const challengeSchema = new Schema<IChallenge>(
  {
    challenge_id: {
      type: String,
      required: true,
      unique: true,
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
    zecpass_address: {
      type: String,
      required: true,
    },
    nonce: {
      type: String,
      required: true,
    },
    issued_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
    expires_at: {
      type: Date,
      required: true,
      index: { expires: 0 }, // TTL index — auto-delete when expired
    },
    used: {
      type: Boolean,
      required: true,
      default: false,
    },
    used_at: {
      type: Date,
      default: null,
    },
    ip_hash: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'challenges',
    timestamps: false,
  }
);

// Pre-save hook: set created_at if not already set
challengeSchema.pre('save', function (next) {
  if (!this.created_at) {
    this.created_at = new Date();
  }
  next();
});

// Static method: find active challenges by app_id
challengeSchema.statics.findActiveByAppId = function (
  app_id: string
): Promise<IChallenge[]> {
  return this.find({
    app_id,
    used: false,
    expires_at: { $gt: new Date() },
  }).exec();
};

export const Challenge: IChallengeModel =
  (mongoose.models.Challenge as IChallengeModel) ||
  mongoose.model<IChallenge, IChallengeModel>('Challenge', challengeSchema);
