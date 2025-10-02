import { db } from '../../config/database.js';

export async function setupDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Users table (Discord OAuth)
      db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT UNIQUE NOT NULL,
        discord_id TEXT UNIQUE NOT NULL,
        username TEXT NOT NULL,
        discriminator TEXT,
        avatar TEXT,
        email TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      // Campaigns table (now with Discord user association)
      db.run(`CREATE TABLE IF NOT EXISTS campaigns (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        campaign_id TEXT UNIQUE NOT NULL,
        discord_id TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        target_amount REAL DEFAULT 0,
        current_amount REAL DEFAULT 0,
        zcash_address TEXT UNIQUE NOT NULL,
        category TEXT DEFAULT 'general',
        is_active BOOLEAN DEFAULT true,
        is_withdraw BOOLEAN DEFAULT false,
        wallet_id TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (discord_id) REFERENCES users (discord_id)
      )`);

      // Donations table
      db.run(`CREATE TABLE IF NOT EXISTS donations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        donation_id TEXT UNIQUE NOT NULL,
        campaign_id TEXT NOT NULL,
        zcash_address TEXT NOT NULL,
        amount REAL NOT NULL,
        status TEXT DEFAULT 'pending',
        memo TEXT,
        tx_id TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        confirmed_at DATETIME,
        FOREIGN KEY (campaign_id) REFERENCES campaigns (campaign_id)
      )`);

      console.log('✅ Database tables initialized with Discord integration');
      resolve();
    });
  });
}