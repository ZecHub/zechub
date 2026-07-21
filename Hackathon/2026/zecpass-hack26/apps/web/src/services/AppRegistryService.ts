/**
 * @module services/AppRegistryService
 * Handles third-party app registration, listing, and management.
 */

import { v4 as uuidv4 } from 'uuid';
import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
import { connectDB } from '@/lib/mongodb';
import { App, IApp } from '@/models/App';
import { AuditLog } from '@/models/AuditLog';
import { config } from '@/lib/config';
import type { RegisterAppInput, AppDetails } from '@/types/zecpass';

interface AppRegistrationResult {
  app_id: string;
  app_secret: string;
  name: string;
}

/**
 * Service for managing third-party application registrations.
 */
export class AppRegistryService {
  /**
   * Register a new third-party application.
   * Generates app_id and app_secret, stores bcrypt hash of secret.
   *
   * @param data - App registration details
   * @param owner_zk_hash - ZK hash of the registering user
   * @returns App ID and raw secret (secret shown only once)
   */
  async register(
    data: RegisterAppInput,
    owner_zk_hash: string
  ): Promise<AppRegistrationResult> {
    await connectDB();

    const app_id = uuidv4();
    const app_secret = randomBytes(32).toString('hex');
    const app_secret_hash = await bcrypt.hash(app_secret, config.bcryptRounds);

    await App.create({
      app_id,
      app_secret_hash,
      name: data.name,
      description: data.description,
      website_url: data.website_url,
      redirect_uris: data.redirect_uris,
      scopes_allowed: data.scopes_allowed,
      owner_zk_hash,
      active: true,
    });

    await AuditLog.log({
      event_type: 'app_registered',
      app_id,
      zk_proof_hash: owner_zk_hash,
      metadata: { name: data.name, website_url: data.website_url },
      ip_hash: 'system',
    });

    return { app_id, app_secret, name: data.name };
  }

  /**
   * Get app details by ID (excludes secret hash).
   *
   * @param app_id - The application ID
   * @returns App details or null if not found
   */
  async getApp(app_id: string): Promise<AppDetails | null> {
    await connectDB();

    const app = await App.findOne({ app_id });
    if (!app) return null;

    return {
      app_id: app.app_id,
      name: app.name,
      description: app.description,
      website_url: app.website_url,
      redirect_uris: app.redirect_uris,
      scopes_allowed: app.scopes_allowed,
      active: app.active,
      created_at: app.created_at.toISOString(),
    };
  }

  /**
   * List all apps owned by a user.
   *
   * @param owner_zk_hash - The owner's ZK proof hash
   * @returns Array of app details
   */
  async listByOwner(owner_zk_hash: string): Promise<AppDetails[]> {
    await connectDB();

    const apps = await App.find({ owner_zk_hash }).sort({ created_at: -1 });

    return apps.map((app) => ({
      app_id: app.app_id,
      name: app.name,
      description: app.description,
      website_url: app.website_url,
      redirect_uris: app.redirect_uris,
      scopes_allowed: app.scopes_allowed,
      active: app.active,
      created_at: app.created_at.toISOString(),
    }));
  }

  /**
   * Deactivate an app (soft delete). Only the owner can deactivate.
   *
   * @param app_id - The application ID to deactivate
   * @param owner_zk_hash - The requester's ZK proof hash
   */
  async deactivate(app_id: string, owner_zk_hash: string): Promise<void> {
    await connectDB();

    const app = await App.findOne({ app_id });
    if (!app) {
      throw new Error('Application not found');
    }

    if (app.owner_zk_hash !== owner_zk_hash) {
      throw new Error('Unauthorized: you can only deactivate your own apps');
    }

    app.active = false;
    await app.save();
  }

  /**
   * Verify an app's secret against the stored hash.
   *
   * @param app_id - The application ID
   * @param secret - The raw secret to verify
   * @returns True if the secret is valid
   */
  async verifyAppSecret(app_id: string, secret: string): Promise<boolean> {
    await connectDB();

    const app = await App.findOne({ app_id, active: true });
    if (!app) return false;

    return app.verifySecret(secret);
  }
}
