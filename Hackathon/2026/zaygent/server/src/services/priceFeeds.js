const { getTrendingTokens, formatPair } = require("./dexscreener");

// In-memory price cache
let priceCache = [];
let lastUpdated = null;

/**
 * Refresh price cache from DEXscreener
 */
const refreshPrices = async () => {
  try {
    const pairs = await getTrendingTokens();
    if (pairs.length > 0) {
      priceCache  = pairs.map(formatPair).slice(0, 20);
      lastUpdated = new Date();
      console.log(`📊 Price cache updated — ${priceCache.length} pairs`);
    }
  } catch (error) {
    console.error("Price refresh error:", error.message);
  }
};

/**
 * Get cached prices (with fallback static data)
 */
const getCachedPrices = () => {
  if (priceCache.length > 0) return priceCache;
  // Fallback static data while real data loads
  return STATIC_FALLBACK;
};

/**
 * Start the price feed polling loop
 */
const startPriceFeed = (intervalMs = 30000) => {
  refreshPrices(); // immediate first run
  return setInterval(refreshPrices, intervalMs);
};

/**
 * Generate a simulated live activity event (for WebSocket feed)
 */
const generateActivityEvent = () => {
  const chains  = ["SOLANA", "BSC", "ETH"];
  const tokens  = ["BONK", "WIF", "PEPE", "FLOKI", "DOGE", "MOG", "BRETT", "POPCAT"];
  const ops     = ["Bought", "Sold", "TP Hit", "SL Exit", "DCA In", "Sniped"];
  const chain   = chains[Math.floor(Math.random() * chains.length)];
  const token   = tokens[Math.floor(Math.random() * tokens.length)];
  const op      = ops[Math.floor(Math.random() * ops.length)];
  const now     = new Date();
  const isProfit = op === "TP Hit" || op === "Sold";
  return {
    chain,
    token,
    op,
    amount:    (Math.random() * 2 + 0.1).toFixed(3),
    price:     (Math.random() * 200 + 10).toFixed(2),
    zec:       (Math.random() * 300 + 50).toFixed(2),
    ts:        `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}:${String(now.getSeconds()).padStart(2,"0")}`,
    shielded:  Math.random() > 0.3,
    profit:    isProfit,
    id:        Math.random().toString(36).substr(2, 9),
  };
};

// Static fallback data
const STATIC_FALLBACK = [
  { name: "BONK",   chain: "SOLANA", price: "0.0000182",  change: "+18.4%", vol: "$142M", mcap: "$1.2B",  up: true  },
  { name: "WIF",    chain: "SOLANA", price: "2.341",       change: "+12.1%", vol: "$89M",  mcap: "$2.3B",  up: true  },
  { name: "BRETT",  chain: "ETH",    price: "0.1204",      change: "+31.2%", vol: "$67M",  mcap: "$1.1B",  up: true  },
  { name: "PEPE",   chain: "ETH",    price: "0.00001124",  change: "-4.2%",  vol: "$201M", mcap: "$4.7B",  up: false },
  { name: "FLOKI",  chain: "BSC",    price: "0.0001821",   change: "-2.1%",  vol: "$45M",  mcap: "$1.7B",  up: false },
  { name: "DOGE",   chain: "BSC",    price: "0.1621",      change: "+5.3%",  vol: "$890M", mcap: "$23B",   up: true  },
];

module.exports = { refreshPrices, getCachedPrices, startPriceFeed, generateActivityEvent };