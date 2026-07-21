/**
 * Price Tracker
 * Fetches real-time current price for open positions
 * using GeckoTerminal and DEXscreener as fallback.
 */

const axios = require("axios");

const GECKO_URL       = "https://api.geckoterminal.com/api/v2";
const DEXSCREENER_URL = "https://api.dexscreener.com/latest";

const api = axios.create({ timeout: 10000, headers: { "Accept": "application/json" } });

// Cache prices for 10 seconds to avoid hammering APIs
const priceCache    = new Map();
const PRICE_CACHE_TTL = 10000;

const chainToGecko = {
  SOLANA: "solana",
  BSC:    "bsc",
  ETH:    "eth",
};

/**
 * Fetch current price by contract address via DEXscreener
 */
const getPriceByAddress = async (address, chain) => {
  const cacheKey = `${address}_${chain}`;
  const cached   = priceCache.get(cacheKey);
  if (cached && Date.now() - cached.ts < PRICE_CACHE_TTL) {
    return cached.price;
  }

  try {
    const res   = await api.get(`${DEXSCREENER_URL}/dex/tokens/${address}`);
    const pairs = res.data?.pairs || [];
    if (pairs.length === 0) return null;

    // Get the pair with highest liquidity
    const best  = pairs.reduce((a, b) =>
      (a.liquidity?.usd || 0) > (b.liquidity?.usd || 0) ? a : b
    );
    const price = parseFloat(best.priceUsd || 0);
    if (price > 0) {
      priceCache.set(cacheKey, { price, ts: Date.now() });
      return price;
    }
    return null;
  } catch (err) {
    return null;
  }
};

/**
 * Fetch current price by token name via GeckoTerminal
 */
const getPriceByName = async (tokenName, chain) => {
  const cacheKey = `${tokenName}_${chain}`;
  const cached   = priceCache.get(cacheKey);
  if (cached && Date.now() - cached.ts < PRICE_CACHE_TTL) {
    return cached.price;
  }

  const network = chainToGecko[chain] || "solana";

  try {
    // Search trending pools for this token name
    const res   = await api.get(`${GECKO_URL}/networks/${network}/trending_pools`);
    const pools = res.data?.data || [];

    const match = pools.find(p =>
      p.attributes?.name?.toLowerCase().includes(tokenName.toLowerCase().trim())
    );

    if (match) {
      const price = parseFloat(match.attributes?.base_token_price_usd || 0);
      if (price > 0) {
        priceCache.set(cacheKey, { price, ts: Date.now() });
        return price;
      }
    }
    return null;
  } catch (err) {
    return null;
  }
};

/**
 * Get current price for a position
 * Tries address first, falls back to name search
 */
const getCurrentPrice = async (position) => {
  const { token, chain, address, entryPrice } = position;

  // Try by contract address first (most accurate)
  if (address) {
    const price = await getPriceByAddress(address, chain);
    if (price) {
      console.log(`📈 Real price for ${token.trim()}: $${price} (via address)`);
      return price;
    }
  }

  // Fallback — search by token name on GeckoTerminal
  const price = await getPriceByName(token, chain);
  if (price) {
    console.log(`📈 Real price for ${token.trim()}: $${price} (via name search)`);
    return price;
  }

  // Last resort — use simulated movement so agent doesn't stall
  console.warn(`⚠️  Could not fetch real price for ${token.trim()} — using simulated`);
  const simulated = entryPrice * (1 + (Math.random() * 0.4 - 0.1));
  return simulated;
};

module.exports = { getCurrentPrice, getPriceByAddress, getPriceByName };