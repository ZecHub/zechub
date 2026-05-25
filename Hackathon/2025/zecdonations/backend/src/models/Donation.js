import { db } from '../../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export class Donation {
  static async create(donationData) {
    const {
      campaign_id,
      zcash_address,
      amount,
      memo
    } = donationData;

    const donation_id = uuidv4();

    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO donations (donation_id, campaign_id, zcash_address, amount, memo) 
         VALUES (?, ?, ?, ?, ?)`,
        [donation_id, campaign_id, zcash_address, amount, memo],
        function(err) {
          if (err) reject(err);
          else resolve(donation_id);
        }
      );
    });
  }

  static async confirmDonation(donation_id, tx_id) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE donations SET status = 'confirmed', tx_id = ?, confirmed_at = datetime('now') 
         WHERE donation_id = ?`,
        [tx_id, donation_id],
        function(err) {
          if (err) reject(err);
          else resolve(this.changes);
        }
      );
    });
  }

  static async getByCampaign(campaign_id) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM donations WHERE campaign_id = ? ORDER BY created_at DESC`,
        [campaign_id],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }

  static async getStats(campaign_id) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT 
          COUNT(*) as total_donations,
          SUM(amount) as total_amount,
          AVG(amount) as average_donation,
          MAX(amount) as largest_donation,
          COUNT(DISTINCT zcash_address) as unique_donors
         FROM donations 
         WHERE campaign_id = ? AND status = 'confirmed'`,
        [campaign_id],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  }
}