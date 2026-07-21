const express  = require("express");
const router   = express.Router();
const axios    = require("axios");
const User     = require("../models/User");
const Strategy = require("../models/Strategy");
const { protect }      = require("../middleware/auth");
const { tradeLimiter } = require("../middleware/rateLimit");

const AGENT_API = process.env.AGENT_API_URL || "http://localhost:5001";

const callAgent = async (method, path, data = null) => {
  try {
    const config = { method, url: `${AGENT_API}${path}`, timeout: 10000 };
    if (data) config.data = data;
    const res = await axios(config);
    return res.data;
  } catch (err) {
    console.warn(`Agent API call failed (${path}):`, err.message);
    return null;
  }
};

// Apply auth to all routes except config
router.use((req, res, next) => {
  if (req.path === "/config" && req.method === "PUT") return next();
  protect(req, res, next);
});

router.get("/status", async (req, res) => {
  try {
    const user        = await User.findOne({ hashedIdentity: req.user.id });
    const agentStatus = await callAgent("GET", "/health");
    res.json({ success: true, agentConfig: user?.agentConfig || {}, agentOnline: !!agentStatus });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.patch("/toggle", async (req, res) => {
  try {
    const user = await User.findOne({ hashedIdentity: req.user.id });
    user.agentConfig.isActive = !user.agentConfig.isActive;
    await user.save();
    res.json({ success: true, isActive: user.agentConfig.isActive });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.put("/config", async (req, res) => {
  try {
    const user    = await User.findOne({ hashedIdentity: req.user.id });
    const allowed = ["riskLevel","maxAllocation","maxPositions","globalTP","globalSL","scanInterval","enabledChains","autoStable","honeyCheck","liqCheck","dcaLadder","sentimentTrack"];
    allowed.forEach(key => { if (req.body[key] !== undefined) user.agentConfig[key] = req.body[key]; });
    await user.save();
    res.json({ success: true, agentConfig: user.agentConfig });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/positions", async (req, res) => {
  try {
    const data = await callAgent("GET", "/positions");
    if (!data) return res.json({ success: true, positions: [], snipes: [], total: 0, agentOffline: true });
    res.json({ success: true, ...data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/strategies", async (req, res) => {
  try {
    const strategies = await Strategy.find({ userHash: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, strategies });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/snipe", tradeLimiter, async (req, res) => {
  try {
    const { contractAddress, chain, allocation, takeProfit, stopLoss, limitEnabled, limitPrice } = req.body;
    if (!contractAddress || !chain) return res.status(400).json({ success: false, message: "Contract address and chain required" });
    const strategy = await Strategy.create({ userHash: req.user.id, pair: contractAddress.slice(0,6)+"...", strategy: "Manual Snipe", chain, allocation: allocation||20, takeProfit: takeProfit||300, stopLoss: stopLoss||25, limitEnabled: limitEnabled||false, limitPrice: limitPrice||null, contractAddress });
    const agentResult = await callAgent("POST", "/snipe", { ...req.body, userHash: req.user.id, zecBalance: 10 });
    res.json({ success: true, message: "Snipe order submitted", strategy, agentResult: agentResult || { queued: true } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/event", async (req, res) => {
  try {
    const { type, data, ts } = req.body;
    const io = req.app.get("io");
    if (io) io.emit("agent:event", { type, data, ts });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;