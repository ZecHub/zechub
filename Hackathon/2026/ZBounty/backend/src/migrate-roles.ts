/**
 * Migration: Rename role "User" → "Freelancer" for all existing accounts.
 * Run once: npx ts-node src/migrate-roles.ts
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';

dotenv.config();

async function migrate() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('MONGODB_URI not set in .env');
    process.exit(1);
  }

  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB');

  // Find all users with the old "User" role
  const result = await (User as any).updateMany(
    { role: 'User' },
    { $set: { role: 'Freelancer' } }
  );

  console.log(`✅ Migration complete: updated ${result.modifiedCount} account(s) from role "User" → "Freelancer"`);

  await mongoose.disconnect();
  process.exit(0);
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
