const axios = require("axios");
const env   = require("../config/env");

const BASE_URL = env.DEXSCREENER_BASE_URL;

// Axios instance with longer timeout
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { "Accept": "application/json" },
});

// Retry helper
const withRetry = async (fn, retries = 3, delay = 2000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries - 1) throw err;
      console.warn(`⚠️  DEXscreener retry ${i + 1}/${retries}...`);
      await new Promise(r => setTimeout(r, delay));
    }
  }
};

/**
 * Fetch trending tokens across all chains
 */
const getTrendingTokens = async () => {
  try {
    const response = await withRetry(() => api.get("/dex/tokens/trending"));
    return response.data?.pairs || [];
  } catch (error) {
    console.error("DEXscreener trending error:", error.message);
    return [];
  }
};

/**
 * Search for a specific token by contract address
 */
const getTokenByAddress = async (address) => {
  try {
    const response = await withRetry(() => api.get(`/dex/tokens/${address}`));
    return response.data?.pairs?.[0] || null;
  } catch (error) {
    console.error("DEXscreener token lookup error:", error.message);
    return null;
  }
};

/**
 * Get tokens by chain
 */
const getTokensByChain = async (chain) => {
  const chainMap = { SOLANA: "solana", BSC: "bsc", ETH: "ethereum" };
  const dexChain = chainMap[chain] || chain.toLowerCase();
  try {
    const response = await withRetry(() => api.get(`/dex/pairs/${dexChain}`));
    return response.data?.pairs || [];
  } catch (error) {
    console.error(`DEXscreener chain fetch error (${chain}):`, error.message);
    return [];
  }
};

/**
 * Search tokens by name or symbol
 */
const searchTokens = async (query) => {
  try {
    const response = await withRetry(() => api.get(`/dex/search?q=${encodeURIComponent(query)}`));
    return response.data?.pairs || [];
  } catch (error) {
    console.error("DEXscreener search error:", error.message);
    return [];
  }
};

/**
 * Format raw DEXscreener pair data into Zaygent format
 */
const formatPair = (pair) => ({
  name:    pair.baseToken?.symbol || "UNKNOWN",
  chain:   pair.chainId?.toUpperCase() === "ETHEREUM" ? "ETH" : pair.chainId?.toUpperCase(),
  price:   parseFloat(pair.priceUsd || 0).toFixed(8),
  change:  `${pair.priceChange?.h24 >= 0 ? "+" : ""}${pair.priceChange?.h24?.toFixed(2) || 0}%`,
  vol:     formatVolume(pair.volume?.h24),
  mcap:    formatVolume(pair.fdv),
  up:      (pair.priceChange?.h24 || 0) >= 0,
  address: pair.baseToken?.address,
});

const formatVolume = (val) => {
  if (!val) return "$0";
  if (val >= 1e9) return `$${(val / 1e9).toFixed(1)}B`;
  if (val >= 1e6) return `$${(val / 1e6).toFixed(1)}M`;
  if (val >= 1e3) return `$${(val / 1e3).toFixed(1)}K`;
  return `$${val.toFixed(2)}`;
};

module.exports = { getTrendingTokens, getTokenByAddress, getTokensByChain, searchTokens, formatPair };