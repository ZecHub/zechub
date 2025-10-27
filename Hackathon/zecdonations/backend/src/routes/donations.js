import express from 'express';
import { DonationController } from '../controllers/donationController.js';
import { validateDonation } from '../middleware/validation.js';

const router = express.Router();

router.post('/', validateDonation, DonationController.createDonation);
router.get('/campaign/:campaign_id', DonationController.getCampaignDonations);

export default router;