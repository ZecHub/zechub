const axios = require("axios");
const { liquidityScore } = require("../evaluators/liquidityCheck");

/**
 * DEX Scanner
 * Scans multiple DEX data sources for high-conviction tokens.
 * Priority: GeckoTerminal → DEXscreener trending → DEXscreener by chain
 */

const GECKO_URL       = "https://api.geckoterminal.com/api/v2";
const DEXSCREENER_URL = "https://api.dexscreener.com/latest";

const api = axios.create({ timeout: 15000, headers: { "Accept": "application/json" } });

// ── GeckoTerminal ─────────────────────────────────────────────────────────────

const fetchGeckoTrending = async () => {
  const networks = ["solana", "bsc", "eth"];
  const results  = [];
  for (const network of networks) {
    try {
      const res   = await api.get(`${GECKO_URL}/networks/${network}/trending_pools`, { params: { page: 1 } });
      const pools = res.data?.data || [];
      pools.forEach(pool => {
        const attrs = pool.attributes || {};
        results.push({
          name:      attrs.name?.split("/")[0] || "UNKNOWN",
          address:   pool.id?.split("_")[1] || null,
          chain:     network === "eth" ? "ETH" : network.toUpperCase(),
          price:     parseFloat(attrs.base_token_price_usd || 0),
          change1h:  parseFloat(attrs.price_change_percentage?.h1  || 0),
          change6h:  parseFloat(attrs.price_change_percentage?.h6  || 0),
          change24h: parseFloat(attrs.price_change_percentage?.h24 || 0),
          liquidity: parseFloat(attrs.reserve_in_usd || 0),
          volume24h: parseFloat(attrs.volume_usd?.h24 || 0),
          mcap:      parseFloat(attrs.fdv_usd || 0),
          source:    "geckoterminal",
        });
      });
      console.log(`✅ GeckoTerminal: ${pools.length} pools from ${network}`);
    } catch (err) {
      console.warn(`⚠️  GeckoTerminal ${network}: ${err.message}`);
    }
    // Delay between requests to avoid 429
    await new Promise(r => setTimeout(r, 3500));
  }
  return results;
};

const fetchGeckoNewPools = async (network = "solana") => {
  try {
    const res   = await api.get(`${GECKO_URL}/networks/${network}/new_pools`, { params: { page: 1 } });
    const pools = res.data?.data || [];
    console.log(`✅ GeckoTerminal new pools: ${pools.length} on ${network}`);
    return pools.map(pool => {
      const attrs = pool.attributes || {};
      return {
        name:      attrs.name?.split("/")[0] || "UNKNOWN",
        chain:     network === "eth" ? "ETH" : network.toUpperCase(),
        price:     parseFloat(attrs.base_token_price_usd || 0),
        change1h:  parseFloat(attrs.price_change_percentage?.h1  || 0),
        change6h:  parseFloat(attrs.price_change_percentage?.h6  || 0),
        change24h: parseFloat(attrs.price_change_percentage?.h24 || 0),
        liquidity: parseFloat(attrs.reserve_in_usd || 0),
        volume24h: parseFloat(attrs.volume_usd?.h24 || 0),
        mcap:      parseFloat(attrs.fdv_usd || 0),
        source:    "geckoterminal_new",
      };
    });
  } catch (error) {
    console.warn(`GeckoTerminal new pools error (${network}):`, error.message);
    return [];
  }
};

// ── DEXscreener ───────────────────────────────────────────────────────────────

const fetchDexscreenerTrending = async () => {
  try {
    const res   = await api.get(`${DEXSCREENER_URL}/dex/tokens/trending`);
    const pairs = res.data?.pairs || [];
    console.log(`✅ DEXscreener trending: ${pairs.length} pairs`);
    return pairs.map(p => ({
      name:      p.baseToken?.symbol || "UNKNOWN",
      address:   p.baseToken?.address,
      chain:     p.chainId === "ethereum" ? "ETH" : p.chainId?.toUpperCase(),
      price:     parseFloat(p.priceUsd || 0),
      change1h:  p.priceChange?.h1  || 0,
      change6h:  p.priceChange?.h6  || 0,
      change24h: p.priceChange?.h24 || 0,
      liquidity: p.liquidity?.usd   || 0,
      volume24h: p.volume?.h24      || 0,
      mcap:      p.fdv              || 0,
      source:    "dexscreener_trending",
    }));
  } catch (error) {
    console.warn("DEXscreener trending error:", error.message);
    return [];
  }
};

const fetchDexscreenerByChain = async (chain = "solana") => {
  try {
    const res   = await api.get(`${DEXSCREENER_URL}/dex/pairs/${chain}`);
    const pairs = res.data?.pairs || [];
    console.log(`✅ DEXscreener: ${pairs.length} pairs from ${chain}`);
    return pairs.map(p => ({
      name:      p.baseToken?.symbol || "UNKNOWN",
      address:   p.baseToken?.address,
      chain:     chain === "ethereum" ? "ETH" : chain.toUpperCase(),
      price:     parseFloat(p.priceUsd || 0),
      change1h:  p.priceChange?.h1  || 0,
      change6h:  p.priceChange?.h6  || 0,
      change24h: p.priceChange?.h24 || 0,
      liquidity: p.liquidity?.usd   || 0,
      volume24h: p.volume?.h24      || 0,
      mcap:      p.fdv              || 0,
      source:    "dexscreener",
    }));
  } catch (error) {
    console.warn(`DEXscreener ${chain} error:`, error.message);
    return [];
  }
};

// ── Scoring ───────────────────────────────────────────────────────────────────

const scoreToken = (token) => {
  let score = 30; // base score so nothing scores 0
  const { change1h, change6h, change24h, liquidity, volume24h } = token;

  // Momentum scoring — more lenient
  if (change1h  >  2)  score += 20;
  if (change6h  >  5)  score += 15;
  if (change24h >  0)  score += 10;

  // Liquidity scoring
  score += liquidityScore(liquidity, volume24h) * 0.3;

  // Penalty for extreme pumps only
  if (change1h  > 200) score -= 20;
  if (change6h  > 800) score -= 30;

  // Penalty for heavy dumps
  if (change1h  < -20) score -= 15;
  if (change24h < -30) score -= 10;

  return Math.max(0, Math.min(100, score));
};

// ── Main Scan ─────────────────────────────────────────────────────────────────

let lastScanResults = [];
let lastScanTime     = null;
const runScan = async (minScore = 35) => {
  console.log("🔍 Running multi-source DEX scan...");
  let allTokens = [];

  // Source 1: GeckoTerminal trending
  const geckoTokens = await fetchGeckoTrending();
  allTokens = [...allTokens, ...geckoTokens];

  // Source 2: GeckoTerminal new pools
  if (allTokens.length < 10) {
    const newPools = await fetchGeckoNewPools("solana");
    allTokens = [...allTokens, ...newPools];
  }

  // Source 3: DEXscreener trending fallback
  if (allTokens.length < 5) {
    console.log("⚠️  Falling back to DEXscreener trending...");
    const dexTrending = await fetchDexscreenerTrending();
    allTokens = [...allTokens, ...dexTrending];
  }

  // Source 4: DEXscreener by chain fallback
  if (allTokens.length < 5) {
    console.log("⚠️  Falling back to DEXscreener by chain...");
    for (const chain of ["solana", "bsc", "ethereum"]) {
      const chainTokens = await fetchDexscreenerByChain(chain);
      allTokens = [...allTokens, ...chainTokens];
      if (allTokens.length >= 10) break;
    }
  }

  if (allTokens.length === 0) {
    console.error("❌ All data sources failed — no tokens available");
    return [];
  }

  // Score, deduplicate and sort
  const seen   = new Set();
  const scored = allTokens
    .map(t => ({ ...t, score: scoreToken(t) }))
    .filter(t => {
      const key = `${t.name}_${t.chain}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return t.score >= minScore && t.liquidity > 1000 && t.price > 0;
    })
    .sort((a, b) => b.score - a.score);

  console.log(`✅ Scan complete — ${scored.length} high-conviction tokens from ${allTokens.length} total`);
  lastScanResults = scored;
  lastScanTime    = new Date().toISOString();
  return scored;
};

const getLastScan = () => ({ tokens: lastScanResults, lastUpdated: lastScanTime });

module.exports = {
  runScan,
  getLastScan,
  fetchGeckoTrending,
  fetchGeckoNewPools,
  fetchDexscreenerTrending,
  fetchDexscreenerByChain,
  scoreToken,
};