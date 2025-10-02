import { Campaign } from "../models/Campaign.js";
import { Donation } from "../models/Donation.js";
import zcashService from "../services/zcashService.js";
import QRCode from "qrcode";
import { validateCampaignData } from "../utils/helpers.js";
import { User } from "../models/User.js";
import { console } from "inspector";

export class CampaignController {
  static async createCampaign(req, res) {
    try {
      // Support JWT-based auth via verifyToken middleware (req.user present)
      if (!req.isAuthenticated()) {
        return res.status(401).json({
          success: false,
          error: "Authentication required",
        });
      }

      const validationErrors = validateCampaignData(req.body);
      if (validationErrors.length > 0) {
        return res.status(400).json({
          success: false,
          error: validationErrors.join(", "),
        });
      }
      const { title, description, target_amount, category } = req.body;

      // Generate REAL Zcash address
      const wallet_data = await zcashService.initializeWallet();
      if (!wallet_data.success) {
        return res.status(500).json({
          success: false,
          error: wallet_data.error,
        });
      }

      const campaign = await Campaign.create({
        discord_id: req.user.discord_id,
        title,
        description,
        target_amount: target_amount || 0,
        category: category || "general",
        zcash_address: wallet_data.address,
        wallet_id: wallet_data.wallet_id,
      });

      const qr_code = await QRCode.toDataURL(wallet_data.address);

      return res.status(201).json({
        success: true,
        campaign: {
          qr_code,
          shareable_link: `/campaigns/${campaign.campaign_id}`,
        },
      });
    } catch (error) {
      console.error("Campaign creation error:", error);
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
  static async getUserCampaigns(req, res) {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({
          success: false,
          error: "Authentication required",
        });
      }

      const campaigns = await Campaign.getByDiscordId(req.user.discord_id);

      // Get stats for each campaign
      const campaignsWithStats = await Promise.all(
        campaigns.map(async (campaign) => {
          const balance = await zcashService.getBalance(campaign.wallet_id);
          const user = await User.findByDiscordId(campaign?.discord_id);

          const receivedZec = parseInt(balance.balance) || 0;
          const progress =
            campaign.target_amount > 0
              ? (receivedZec / campaign.target_amount) * 100
              : 0;
          return {
            success: true,
            campaign: {
              id: campaign.campaign_id || campaign.id,
              title: campaign.title,
              description: campaign.description,
              goalZec: campaign.target_amount,
              receivedZec: receivedZec || 0, // Use actual balance from zcashService
              category: campaign.category || "General",
              address: campaign.zcash_address,
              createdAt: campaign.created_at || campaign.createdAt,
              creator: {
                name: user?.username || "Anonymous",
                handle: "@" + user?.username || "@anonymous",
                avatar: user?.avatar || "/default-avatar.png",
                email: user?.email || "",
              },
              is_withdraw: campaign.is_withdraw,
              is_active: campaign.is_active,
              progress: progress,
              wallet_id: campaign.wallet_id,
              status:
                progress >= 100
                  ? "completed"
                  : campaign.is_active
                  ? "ongoing"
                  : "deactivated",
            },
          };
        })
      );

      res.json({
        success: true,
        campaigns: campaignsWithStats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async getCampaign(req, res) {
    try {
      const { campaign_id } = req.params;

      const campaign = await Campaign.findById(campaign_id);
      if (!campaign) {
        return res.status(404).json({
          success: false,
          error: "Campaign not found",
        });
      }

      // Check if user owns the campaign (for management)

      const balance = await zcashService.getBalance(campaign.wallet_id);

      const receivedZec = parseInt(balance.balance) || 0;
      const progress =
        campaign.target_amount > 0
          ? (receivedZec / campaign.target_amount) * 100
          : 0;

      const user = await User.findByDiscordId(campaign?.discord_id);

      res.json({
        success: true,
        campaign: {
          id: campaign.campaign_id || campaign.id,
          title: campaign.title,
          description: campaign.description,
          goalZec: campaign.target_amount,
          receivedZec: parseInt(balance.balance) || 0, // Use actual balance from zcashService
          category: campaign.category || "General",
          address: campaign.zcash_address,
          createdAt: campaign.created_at || campaign.createdAt,
          creator: {
            name: user?.username || "Anonymous",
            handle: "@" + user?.username || "@anonymous",
            avatar: user?.avatar || "/default-avatar.png",
            email: user?.email || "",
          },
          progress: progress,
          is_active: campaign.is_active,
          progress: progress,
          is_user : req.user && req.user?.discord_id ? true : false,
          is_withdraw: campaign.is_withdraw,
          wallet_id: campaign.wallet_id,
          status:
            progress >= 100
              ? "completed"
              : campaign.is_active
              ? "ongoing"
              : "deactivated",
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async deactivatedCampaign(req, res) {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({
          success: false,
          error: "Authentication required",
        });
      }

      const { campaign_id } = req.params;

      console.log(campaign_id);

      // Verify ownership
      const campaign = await Campaign.findById(campaign_id);
      if (!campaign || campaign.discord_id !== req.user.discord_id) {
        return res.status(403).json({
          success: false,
          error: "Not authorized to deactivate this campaign",
        });
      }

      await Campaign.deactivate(campaign_id);

      res.json({
        success: true,
        message: "Campaign Deactivated successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async listCampaigns(req, res) {
    try {
      const campaigns = await Campaign.getAllActive();

      // Transform each campaign to match your desired format
      const transformedCampaigns = await Promise.all(
        campaigns.map(async (campaign) => {
          // Get the current balance for this campaign

          const balance = await zcashService.getBalance(campaign.wallet_id);

          const user = await User.findByDiscordId(campaign?.discord_id);

          const receivedZec = parseInt(balance?.balance) || 0;
          const progress =
            campaign.target_amount > 0
              ? (receivedZec / campaign.target_amount) * 100
              : 0;

          return {
            id: campaign.campaign_id || campaign.id,
            title: campaign.title,
            description: campaign.description,
            goalZec: campaign.target_amount,
            receivedZec: receivedZec,
            category: campaign.category || "General",
            address: campaign.zcash_address,
            createdAt: campaign.created_at || campaign.createdAt,
            creator: {
              name: user?.username || "Anonymous",
              handle: "@" + user?.username || "@anonymous",
              avatar: user?.avatar || "/default-avatar.png",
              email: user?.email || "",
            },
            is_active: campaign.is_active,
            progress: progress,
            status: progress >= 100 ? "completed" : "ongoing", // Add this field to indicate current status
            discord_id: campaign.discord_id,
          };
        })
      );

      res.json({
        success: true,
        campaigns: transformedCampaigns,
      });
    } catch (error) {
      console.error("Error listing campaigns:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // withdrawal
  static async sendWithdrawal(req, res) {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({
          success: false,
          error: "Authentication required",
        });
      }

      const { wallet_id, to_address } = req.body;

      // Validate required fields
      if (!wallet_id || !to_address) {
        return res.status(400).json({
          success: false,
          error: "wallet_id and to_address are required",
        });
      }

      // Verify wallet ownership through campaign
      const campaign = await Campaign.findByWalletId(wallet_id);
      if (!campaign) {
        return res.status(404).json({
          success: false,
          error: "Campaign not found",
        });
      }

      if (campaign.discord_id !== req.user.discord_id) {
        return res.status(403).json({
          success: false,
          error: "Not authorized to withdraw from this campaign",
        });
      }

      // Check if campaign has funds available
      const balance = await zcashService.getBalance(wallet_id);
      const availableBalance = parseInt(balance.balance) || 0;

      if (availableBalance <= 0) {
        return res.status(400).json({
          success: false,
          error: "Insufficient funds for withdrawal",
        });
      }

      // Send withdrawal request
      const sendReq = {
        wallet_id: wallet_id,
        to_address: to_address,
      };

      const result = await zcashService.sendWithdrawal(sendReq);

      if (result.success) {
        // Update campaign withdrawal status
        await Campaign.withdraw(campaign.campaign_id || campaign.id);

        res.json({
          success: true,
          message: "Withdrawal initiated successfully",
          transaction_id: result.transaction_id,
          amount: availableBalance,
        });
      } else {
        res.status(400).json({
          success: false,
          error: result.error || "Withdrawal failed",
        });
      }
    } catch (error) {
      console.error("Withdrawal error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}
