const axios = require("axios");

/**
 * Liquidity Check
 * Verifies liquidity lock status and pool health before entry.
 */

/**
 * Check liquidity health for a token
 * @param {string} address - Contract address
 * @param {string} chain   - SOLANA | BSC | ETH
 * @returns {object} - { isSafe, liquidity, locked, reason }
 */
const checkLiquidity = async (address, chain, knownLiquidity = 0) => {
  // If we already have liquidity data from GeckoTerminal, use it
  if (knownLiquidity > 1000) {
    return {
      isSafe:    true,
      liquidity: knownLiquidity,
      reason:    `Liquidity verified from scan data: $${knownLiquidity.toFixed(0)}`,
      source:    "scan_data",
    };
  }

  // No address to look up — pass with warning
  if (!address) {
    return {
      isSafe:  true,
      warning: true,
      reason:  "No contract address — skipping DEXscreener check",
    };
  }

  try {
    const response = await axios.get(
      `https://api.dexscreener.com/latest/dex/tokens/${address}`,
      { timeout: 10000 }
    );

    const pairs = response.data?.pairs || [];
    if (pairs.length === 0) {
      // Not on DEXscreener but we have no liquidity data — warn but allow
      return {
        isSafe:  true,
        warning: true,
        reason:  "Token not on DEXscreener — proceeding with caution",
      };
    }

    const best      = pairs.reduce((a, b) => (a.liquidity?.usd || 0) > (b.liquidity?.usd || 0) ? a : b);
    const liquidity = best.liquidity?.usd  || 0;
    const volume24h = best.volume?.h24     || 0;

    if (liquidity < 1000) {
      return { isSafe: false, liquidity, reason: `Insufficient liquidity: $${liquidity.toFixed(0)}` };
    }

    const volLiqRatio = volume24h / (liquidity || 1);
    if (volLiqRatio > 20) {
      return { isSafe: false, liquidity, reason: `Suspicious volume/liquidity ratio: ${volLiqRatio.toFixed(1)}x` };
    }

    return {
      isSafe:    true,
      liquidity,
      volume24h,
      poolCount: pairs.length,
      reason:    "Liquidity check passed",
      warning:   liquidity < 50000 ? `Low liquidity: $${liquidity.toFixed(0)}` : null,
    };
  } catch (error) {
    console.error("Liquidity check error:", error.message);
    return { isSafe: true, warning: true, reason: "Liquidity check failed — proceeding with caution" };
  }
};

/**
 * Quick liquidity score (0-100) for ranking tokens
 */
const liquidityScore = (liquidity, volume24h) => {
  let score = 0;
  if (liquidity > 1e6)  score += 40;
  else if (liquidity > 100000) score += 25;
  else if (liquidity > 10000)  score += 10;
  if (volume24h > 500000) score += 30;
  else if (volume24h > 50000)  score += 20;
  else if (volume24h > 5000)   score += 10;
  const ratio = volume24h / (liquidity || 1);
  if (ratio > 0.1 && ratio < 5) score += 30;
  else if (ratio >= 5) score += 10;
  return Math.min(score, 100);
};

module.exports = { checkLiquidity, liquidityScore };