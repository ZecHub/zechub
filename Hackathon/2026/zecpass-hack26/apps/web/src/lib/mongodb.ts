/**
 * @module lib/mongodb
 * Singleton MongoDB connection using Mongoose.
 * Caches the connection in `global.__mongoose` to avoid reconnection in Next.js dev mode.
 */

import mongoose from 'mongoose';
import { config } from './config';
import { App } from '@/models/App';
import bcrypt from 'bcrypt';

/** Extend global type to include mongoose cache */
declare global {
  // eslint-disable-next-line no-var
  var __mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

async function seedPlatformApp() {
  try {
    const existing = await App.findOne({ app_id: 'zecpass-platform' });
    if (!existing) {
      console.log('[MongoDB Seeder] Seeding default zecpass-platform application...');
      const dummySecret = 'zecpass-platform-secret-never-exposed';
      const app_secret_hash = await bcrypt.hash(dummySecret, 12);
      await App.create({
        app_id: 'zecpass-platform',
        app_secret_hash,
        name: 'ZecPass Platform',
        description: 'Self-referencing ZecPass authentication platform',
        website_url: 'https://zecpass.app',
        redirect_uris: ['http://localhost:3000/dashboard', 'https://zecpass.app/dashboard', '/dashboard'],
        scopes_allowed: ['identity'],
        owner_zk_hash: 'system',
        active: true,
      });
      console.log('[MongoDB Seeder] Default zecpass-platform application seeded successfully!');
    }
  } catch (err) {
    console.error('[MongoDB Seeder] Failed to seed default platform app:', err);
  }
}

/**
 * Connect to MongoDB using a cached singleton connection.
 * Safe to call multiple times — will reuse existing connection.
 * @returns Promise that resolves when the connection is established
 */
export async function connectDB(): Promise<void> {
  // Use cached connection in development
  if (!global.__mongoose) {
    global.__mongoose = { conn: null, promise: null };
  }

  const cached = global.__mongoose;

  if (cached.conn) {
    return;
  }

  if (!cached.promise) {
    const uri = config.mongodbUri();

    cached.promise = mongoose.connect(uri, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
  }

  try {
    cached.conn = await cached.promise;
    await seedPlatformApp();
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}

/**
 * Disconnect from MongoDB. Useful for tests and cleanup.
 */
export async function disconnectDB(): Promise<void> {
  if (global.__mongoose?.conn) {
    await mongoose.disconnect();
    global.__mongoose = { conn: null, promise: null };
  }
}
