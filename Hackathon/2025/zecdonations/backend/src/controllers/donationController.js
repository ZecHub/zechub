import { Donation } from '../models/Donation.js';
import { Campaign } from '../models/Campaign.js';

export class DonationController {
  static async createDonation(req, res) {
    try {
      const { campaign_id, amount, memo } = req.body;

      const campaign = await Campaign.findById(campaign_id);
      if (!campaign) {
        return res.status(404).json({ error: 'Campaign not found' });
      }

      const donation_id = await Donation.create({
        campaign_id,
        zcash_address: campaign.zcash_address,
        amount: amount || 0,
        memo: memo || ''
      });

      res.json({
        success: true,
        donation: {
          id: donation_id,
          campaign_id,
          zcash_address: campaign.zcash_address,
          amount,
          memo,
          status: 'pending'
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getCampaignDonations(req, res) {
    try {
      const { campaign_id } = req.params;
      const donations = await Donation.getByCampaign(campaign_id);
      
      res.json({ success: true, donations });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}