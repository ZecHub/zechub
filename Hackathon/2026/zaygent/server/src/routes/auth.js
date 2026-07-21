const express  = require("express");
const router   = express.Router();
const User     = require("../models/User");
const { hashWallet }    = require("../services/hashService");
const { generateToken } = require("../middleware/auth");
const { authLimiter }   = require("../middleware/rateLimit");

/**
 * POST /api/auth/login
 * Accepts a wallet address, hashes it, finds or creates user, returns JWT.
 * Raw wallet address is NEVER stored.
 */
router.post("/login", authLimiter, async (req, res) => {
  try {
    const { walletAddress } = req.body;
    if (!walletAddress) {
      return res.status(400).json({ success: false, message: "Wallet address required" });
    }

    const hashedIdentity = hashWallet(walletAddress);

    // Find or create user by hashed identity
    let user = await User.findOne({ hashedIdentity });
    if (!user) {
      user = await User.create({ hashedIdentity });
      console.log(`✅ New user registered: ${hashedIdentity.slice(0, 8)}...`);
    }

    // Update last seen
    user.lastSeen = new Date();
    await user.save();

    const token = generateToken(hashedIdentity);

    res.json({
      success: true,
      token,
      user: {
        tier:        user.tier,
        agentConfig: user.agentConfig,
        stats:       user.stats,
        lastSeen:    user.lastSeen,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * GET /api/auth/me
 * Returns current user profile (no wallet address ever returned)
 */
router.get("/me", require("../middleware/auth").protect, async (req, res) => {
  try {
    const user = await User.findOne({ hashedIdentity: req.user.id });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({
      success: true,
      user: {
        tier:        user.tier,
        agentConfig: user.agentConfig,
        stats:       user.stats,
        lastSeen:    user.lastSeen,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;