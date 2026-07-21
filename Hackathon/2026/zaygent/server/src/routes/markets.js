const express = require("express");
const router  = express.Router();
const { getCachedPrices }              = require("../services/priceFeeds");
const { getTokenByAddress, searchTokens, getTokensByChain, formatPair } = require("../services/dexscreener");
const { apiLimiter } = require("../middleware/rateLimit");

router.use(apiLimiter);

/**
 * GET /api/markets/trending
 * Returns cached trending token list
 */
router.get("/trending", (req, res) => {
  const prices = getCachedPrices();
  res.json({ success: true, tokens: prices, count: prices.length });
});

/**
 * GET /api/markets/search?q=BONK
 * Search tokens by name or symbol
 */
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ success: false, message: "Query required" });
    const pairs = await searchTokens(q);
    res.json({ success: true, tokens: pairs.map(formatPair).slice(0, 10) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Search error" });
  }
});

/**
 * GET /api/markets/token/:address
 * Lookup a specific token by contract address
 */
router.get("/token/:address", async (req, res) => {
  try {
    const pair = await getTokenByAddress(req.params.address);
    if (!pair) return res.status(404).json({ success: false, message: "Token not found" });
    res.json({ success: true, token: formatPair(pair) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lookup error" });
  }
});

/**
 * GET /api/markets/chain/:chain
 * Get tokens by chain
 */
router.get("/chain/:chain", async (req, res) => {
  try {
    const pairs = await getTokensByChain(req.params.chain.toUpperCase());
    res.json({ success: true, tokens: pairs.map(formatPair).slice(0, 20) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Chain fetch error" });
  }
});

module.exports = router;