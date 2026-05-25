import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

import { verifyToken, optionalAuth } from "../middleware/discordAuth.js";
import { User } from "../models/User.js";

const router = express.Router();

// Start Discord OAuth flow
router.get("/discord", passport.authenticate("discord"));

// Handle Discord callback with JWT
router.get("/discord/callback", (req, res, next) => {
  passport.authenticate("discord", async (err, user, info) => {
    const frontendURL = process.env.FRONTEND_URL || "http://localhost:3001";

    if (err || !user) {
      return res.redirect(
        `${frontendURL}/?auth=failed&error=${err?.message || "unknown"}`
      );
    }
    // Generate JWT token
    const token = jwt.sign(
      {
        user_id: user.id || user._id,
        discord_id: user.discord_id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET || "zcash-donation-secret",
      { expiresIn: "7d" }
    );

    let user_exist = await User.findByDiscordId(user.discord_id);
    console.log("user" ,user_exist);
    if (!user_exist) {
      await User.create({
        discordId: user.discord_id, // ✅ This is 'discordId'
        username: user.username,
        discriminator: user.discriminator,
        avatar: user.avatar,
        email: user.email,
      });
    }
    
    // Redirect to frontend with token
    res.redirect(`${frontendURL}/auth-callback?token=${token}&success=true`);
  })(req, res, next);
});

// Get current user (protected route) - using JWT middleware
router.get("/user", verifyToken, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

// Optional auth route - user data if authenticated, but not required
router.get("/user-optional", optionalAuth, (req, res) => {
  res.json({
    success: true,
    user: req.user || null,
    isAuthenticated: !!req.user,
  });
});

// Logout - JWT version (client-side token removal)
router.get("/logout", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: "Logout successful",
  });
});

// Refresh token endpoint
router.post("/refresh-token", verifyToken, (req, res) => {
  try {
    // Generate new token with current user data
    const newToken = jwt.sign(
      {
        userId: req.user.userId,
        discord_id: req.user.discord_id,
        username: req.user.username,
        email: req.user.email,
        avatar: req.user.avatar,
      },
      process.env.JWT_SECRET || "your-fallback-secret",
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token: newToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Token refresh failed",
    });
  }
});

// Validate token endpoint
router.get("/validate-token", verifyToken, (req, res) => {
  res.json({
    success: true,
    valid: true,
    user: req.user,
  });
});

// Auth failure endpoint
router.get("/failure", (req, res) => {
  res.status(401).json({
    success: false,
    error: "Discord authentication failed",
  });
});

export default router;
