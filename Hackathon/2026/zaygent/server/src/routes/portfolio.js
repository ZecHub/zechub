const express  = require("express");
const router   = express.Router();
const Trade    = require("../models/Trade");
const Strategy = require("../models/Strategy");
const { protect }    = require("../middleware/auth");
const { apiLimiter } = require("../middleware/rateLimit");

router.use(protect, apiLimiter);

/**
 * GET /api/portfolio/summary
 * Returns aggregated portfolio stats for the current user
 */
router.get("/summary", async (req, res) => {
  try {
    const trades = await Trade.find({ userHash: req.user.id });
    const wins   = trades.filter(t => t.isProfit).length;
    const losses = trades.filter(t => t.operation === "SL Exit").length;
    const totalPnl = trades.reduce((sum, t) => sum + (t.pnl || 0), 0);

    res.json({
      success: true,
      summary: {
        totalTrades: trades.length,
        wins,
        losses,
        winRate:  trades.length > 0 ? ((wins / trades.length) * 100).toFixed(1) + "%" : "0%",
        totalPnl: totalPnl.toFixed(2),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * GET /api/portfolio/trades
 * Returns trade history for current user
 */
router.get("/trades", async (req, res) => {
  try {
    const { chain, op, limit = 50, skip = 0 } = req.query;
    const filter = { userHash: req.user.id };
    if (chain) filter.chain     = chain.toUpperCase();
    if (op)    filter.operation = op;

    const trades = await Trade.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    res.json({ success: true, trades, count: trades.length });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * GET /api/portfolio/strategies
 * Returns active strategies with performance
 */
router.get("/strategies", async (req, res) => {
  try {
    const strategies = await Strategy.find({ userHash: req.user.id, isActive: true });
    res.json({ success: true, strategies });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;