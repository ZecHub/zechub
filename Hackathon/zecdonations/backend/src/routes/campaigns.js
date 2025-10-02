import express from 'express';
import { CampaignController } from '../controllers/campaignController.js';
import { optionalAuth, verifyToken } from '../middleware/discordAuth.js';

const router = express.Router();

// Make sure these controller methods exist
router.post('/', verifyToken, CampaignController.createCampaign);
router.get('/my-campaigns', verifyToken, CampaignController.getUserCampaigns);
router.delete('/my-campaigns/:campaign_id', verifyToken, CampaignController.deactivatedCampaign);
router.post('/my-campaigns/withdraw', verifyToken, CampaignController.sendWithdrawal);
router.get('/:campaign_id', optionalAuth , CampaignController.getCampaign);
router.get('/', CampaignController.listCampaigns);

export default router;