const axios = require("axios");
const fs    = require("fs");
const path  = require("path");

// Manually read .env file
const envPath = path.resolve(__dirname, "../../.env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach(line => {
    const [key, ...vals] = line.split("=");
    if (key && vals.length) {
      process.env[key.trim()] = vals.join("=").trim();
    }
  });
  console.log("🔑 ENV loaded from:", envPath);
} else {
  console.warn("⚠️  .env file not found at:", envPath);
}

const LUNARCRUSH_URL    = "https://lunarcrush.com/api4/public";
const ALTERNATIVEME_URL = "https://api.alternative.me/fng/";
const LUNARCRUSH_KEY    = process.env.LUNARCRUSH_API_KEY;

console.log("🔑 LunarCrush Key status:", LUNARCRUSH_KEY ? "LOADED ✅" : "MISSING ❌");

const api = axios.create({ timeout: 10000, headers: { "Accept": "application/json" } });

// ── Fear & Greed Index ────────────────────────────────────────────────────────

let fearGreedCache    = null;
let fearGreedCachedAt = null;
const FEAR_GREED_TTL  = 60 * 60 * 1000;

const getFearGreedIndex = async () => {
  if (fearGreedCache && fearGreedCachedAt && Date.now() - fearGreedCachedAt < FEAR_GREED_TTL) {
    return fearGreedCache;
  }
  try {
    const res  = await api.get(ALTERNATIVEME_URL);
    const data = res.data?.data?.[0];
    if (!data) throw new Error("No data returned");
    const score  = parseInt(data.value);
    const label  = data.value_classification;
    const result = {
      score,
      label,
      normalized:     score / 100,
      sentiment:      score >= 75 ? "EXTREME_GREED"
                    : score >= 55 ? "GREED"
                    : score >= 45 ? "NEUTRAL"
                    : score >= 25 ? "FEAR"
                    : "EXTREME_FEAR",
      sizeMultiplier: score >= 75 ? 0.5
                    : score >= 55 ? 0.8
                    : score >= 45 ? 1.0
                    : score >= 25 ? 1.2
                    : 0.3,
    };
    fearGreedCache    = result;
    fearGreedCachedAt = Date.now();
    console.log(`✅ Fear & Greed: ${score} (${label})`);
    return result;
  } catch (error) {
    console.warn("⚠️  Fear & Greed fetch error:", error.message);
    return { score: 50, label: "Neutral", normalized: 0.5, sentiment: "NEUTRAL", sizeMultiplier: 1.0 };
  }
};

// ── LunarCrush ────────────────────────────────────────────────────────────────

const lunarCache = new Map();
const LUNAR_TTL  = 15 * 60 * 1000;

const getLunarCrushData = async (symbol) => {
  const cacheKey = symbol.toUpperCase().trim();

  if (lunarCache.has(cacheKey)) {
    const cached = lunarCache.get(cacheKey);
    if (Date.now() - cached.ts < LUNAR_TTL) return cached.data;
  }

  if (!LUNARCRUSH_KEY) {
    console.warn("⚠️  LunarCrush API key not set");
    return null;
  }

  try {
    // Use the free topic endpoint instead of coins endpoint
    const res  = await api.get(
      `${LUNARCRUSH_URL}/topic/${cacheKey.toLowerCase()}/v1`,
      { headers: { Authorization: `Bearer ${LUNARCRUSH_KEY}` } }
    );

    const data = res.data;
    if (!data) throw new Error("No data returned");

    const result = {
      symbol:       cacheKey,
      galaxyScore:  data.galaxy_score        || 0,
      altRank:      data.topic_rank          || 999,
      socialVolume: data.num_posts           || 0,
      socialScore:  data.interactions_per_post || 0,
      sentiment:    data.sentiment           || 50,
      signal: (data.galaxy_score || 0) >= 70 ? "STRONG_BUY"
            : (data.galaxy_score || 0) >= 55 ? "BUY"
            : (data.galaxy_score || 0) >= 40 ? "NEUTRAL"
            : (data.galaxy_score || 0) >= 25 ? "SELL"
            : "STRONG_SELL",
    };

    lunarCache.set(cacheKey, { data: result, ts: Date.now() });
    console.log(`✅ LunarCrush ${cacheKey}: Galaxy=${result.galaxyScore} Sentiment=${result.sentiment} Signal=${result.signal}`);
    return result;
  } catch (error) {
    if (error.response?.status === 402) {
      console.warn(`⚠️  LunarCrush ${cacheKey}: Paid endpoint — using Fear & Greed only`);
    } else {
      console.warn(`⚠️  LunarCrush ${cacheKey}: ${error.message}`);
    }
    return null;
  }
};

// ── Combined Sentiment ────────────────────────────────────────────────────────

const getSentiment = async (token, chain) => {
  const symbol = token.trim().toUpperCase();
  const [lunarData, fearGreed] = await Promise.all([
    getLunarCrushData(symbol),
    getFearGreedIndex(),
  ]);
  let score = 50;
  if (lunarData) {
    score = (lunarData.galaxyScore * 0.7) + (fearGreed.normalized * 100 * 0.3);
  } else {
    score = (fearGreed.score * 0.5) + 25;
  }
  score = Math.max(0, Math.min(100, score));
  const level = score >= 80 ? { label: "VERY BULLISH", color: "#00e5b4" }
              : score >= 60 ? { label: "BULLISH",      color: "#22c55e" }
              : score >= 40 ? { label: "NEUTRAL",      color: "#6b7a8d" }
              : score >= 20 ? { label: "BEARISH",      color: "#f59e0b" }
              :               { label: "VERY BEARISH", color: "#ef4444" };
  return {
    token:          symbol,
    chain,
    score:          parseFloat(score.toFixed(1)),
    level:          level.label,
    color:          level.color,
    sizeMultiplier: fearGreed.sizeMultiplier,
    sources: {
      lunarCrush: lunarData ? {
        galaxyScore:  lunarData.galaxyScore,
        altRank:      lunarData.altRank,
        socialVolume: lunarData.socialVolume,
        signal:       lunarData.signal,
      } : null,
      fearGreed: {
        score:     fearGreed.score,
        label:     fearGreed.label,
        sentiment: fearGreed.sentiment,
      },
    },
    timestamp: new Date().toISOString(),
  };
};

const batchSentiment = async (tokens) => {
  const results = [];
  for (const token of tokens) {
    const result = await getSentiment(token.name || token.token, token.chain);
    results.push(result);
    await new Promise(r => setTimeout(r, 200));
  }
  return results;
};

const combinedScore = (dexScore, sentimentScore) => {
  return parseFloat(((dexScore * 0.6) + (sentimentScore * 0.4)).toFixed(1));
};

module.exports = {
  getSentiment,
  batchSentiment,
  combinedScore,
  getFearGreedIndex,
  getLunarCrushData,
};