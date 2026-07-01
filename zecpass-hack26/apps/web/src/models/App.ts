/**
 * @module models/App
 * Mongoose model for registered third-party applications.
 * App secrets are stored as bcrypt hashes — raw secret shown only once at registration.
 */

import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

/** App document interface */
export interface IApp extends Document {
  app_id: string;
  app_secret_hash: string;
  name: string;
  description: string;
  website_url: string;
  redirect_uris: string[];
  scopes_allowed: string[];
  owner_zk_hash: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;

  /**
   * Verify a raw app secret against the stored bcrypt hash.
   * @param raw - The raw secret to verify
   * @returns True if the secret matches
   */
  verifySecret(raw: string): Promise<boolean>;
}

const appSchema = new Schema<IApp>(
  {
    app_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    app_secret_hash: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    website_url: {
      type: String,
      required: true,
      trim: true,
    },
    redirect_uris: {
      type: [String],
      required: true,
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: 'At least one redirect URI is required',
      },
    },
    scopes_allowed: {
      type: [String],
      required: true,
      default: ['identity'],
    },
    owner_zk_hash: {
      type: String,
      required: true,
      index: true,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'apps',
    timestamps: false,
  }
);

// Pre-save hook: update updated_at timestamp
appSchema.pre('save', function (next) {
  this.updated_at = new Date();
  if (!this.created_at) {
    this.created_at = new Date();
  }
  next();
});

// Instance method: verify app secret against bcrypt hash
appSchema.methods.verifySecret = async function (raw: string): Promise<boolean> {
  try {
    return await bcrypt.compare(raw, this.app_secret_hash);
  } catch {
    return false;
  }
};

export const App: Model<IApp> =
  (mongoose.models.App as Model<IApp>) ||
  mongoose.model<IApp>('App', appSchema);
