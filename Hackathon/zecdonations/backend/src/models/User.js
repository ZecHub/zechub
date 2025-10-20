import { db } from '../../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export class User {
  static async create(userData) {
    const {
      discordId,
      username,
      discriminator,
      avatar,
      email
    } = userData;

    const userId = uuidv4();

    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO users 
         (user_id, discord_id, username, discriminator, avatar, email, created_at) 
         VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`,
        [userId, discordId, username, discriminator, avatar, email],
        function(err) {
          if (err) reject(err);
          else resolve({ userId, discordId, username, discriminator, avatar, email });
        }
      );
    });
  }

  static async findByDiscordId(discordId) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM users WHERE discord_id = ?`,
        [discordId],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  }

  static async updateProfile(discordId, profileData) {
    const { username, discriminator, avatar } = profileData;
    
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE users SET username = ?, discriminator = ?, avatar = ?, updated_at = datetime('now')
         WHERE discord_id = ?`,
        [username, discriminator, avatar, discordId],
        function(err) {
          if (err) reject(err);
          else resolve(this.changes);
        }
      );
    });
  }

  static async getUserCampaigns(discordId) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM campaigns WHERE discord_id = ? ORDER BY created_at DESC`,
        [discordId],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }
}