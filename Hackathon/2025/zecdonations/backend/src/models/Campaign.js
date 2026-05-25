import { db } from "../../config/database.js";
import { v4 as uuidv4 } from "uuid";

export class Campaign {
  static async create(campaignData) {
    const {
      discord_id,
      title,
      description,
      target_amount,
      category,
      zcash_address,
      wallet_id,
    } = campaignData;

    const campaign_id = uuidv4();

    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO campaigns 
         (campaign_id, discord_id, title, description, target_amount, category, zcash_address , wallet_id) 
         VALUES (?, ?, ?, ?, ?, ?, ? , ?)`,
        [
          campaign_id,
          discord_id,
          title,
          description,
          target_amount,
          category,
          zcash_address,
          wallet_id,
        ],
        function (err) {
          if (err) reject(err);
          else
            resolve({
              campaign_id,
              discord_id,
              title,
              description,
              target_amount,
              category,
              zcash_address,
              wallet_id,
            });
        }
      );
    });
  }

  static async findById(campaign_id) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT c.* 
         FROM campaigns c 
         WHERE c.campaign_id = ?`,
        [campaign_id],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  }

  static async findByWalletId(wallet_id) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT c.* 
         FROM campaigns c 
         WHERE c.wallet_id = ?`,
        [wallet_id],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  }

  static async getByDiscordId(discord_id) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM campaigns WHERE discord_id = ? ORDER BY created_at DESC`,
        [discord_id],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }

  static async delete(campaign_id) {
    return new Promise((resolve, reject) => {
      db.run(
        `DELETE FROM campaigns WHERE campaign_id = ?`,
        [campaign_id],
        function (err) {
          if (err) reject(err);
          else resolve(this.changes);
        }
      );
    });
  }

  static async getAllActive() {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM campaigns WHERE is_active = true ORDER BY created_at DESC`,
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }

  static async deactivate(campaignId) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE campaigns SET is_active = ? WHERE campaign_id = ?`,
        [0, campaignId],
        function (err) {
          if (err) {
            console.error("Error deactivating campaign:", err);
            reject(err);
          } else {
            resolve(this.changes);
          }
        }
      );
    });
  }

  static async withdraw(campaignId) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE campaigns SET is_withdraw = ? WHERE campaign_id = ?`,
        [1, campaignId],
        function (err) {
          if (err) {
            console.error("Error deactivating campaign:", err);
            reject(err);
          } else {
            resolve(this.changes);
          }
        }
      );
    });
  }
}
