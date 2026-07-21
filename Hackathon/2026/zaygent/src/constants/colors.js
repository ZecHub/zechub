export const COLORS = {
  bg: "#0a0c0f", bgCard: "#0f1217", bgCardHover: "#141820",
  border: "#1e2530", borderAccent: "#2a3545",
  teal: "#00e5b4", tealDim: "#00b88e", tealFaint: "rgba(0,229,180,0.08)", tealGlow: "rgba(0,229,180,0.15)",
  blue: "#3b82f6", amber: "#f59e0b", red: "#ef4444", green: "#22c55e",
  textPrimary: "#e8edf5", textSecondary: "#6b7a8d", textMuted: "#3d4a5c",
  solana: "#9945ff", bsc: "#f0b90b", base: "#2151f5", near: "#00c08b",
};

export const chains = {
  SOLANA: { color: "#9945ff", label: "SOL" },
  BSC:    { color: "#f0b90b", label: "BSC" },
  ETH:    { color: "#627eea", label: "ETH" },
  ZEC:    { color: "#f4b728", label: "ZEC" },
};

export const STRATEGIES = [
  { pair: "BSC/USDT",  strategy: "Bullish Trend", active: true,  pnl: "+14.2%", chain: "BSC"    },
  { pair: "SOL/USDC",  strategy: "Momentum",      active: true,  pnl: "+8.7%",  chain: "SOLANA" },
  { pair: "ETH/USDT",  strategy: "Scalp Grid",    active: false, pnl: "+3.1%",  chain: "ETH"    },
  { pair: "ETH/USDT",  strategy: "Mean Revert",   active: true,  pnl: "+22.5%", chain: "ETH"    },
];

export const tokens = ["BONK", "WIF", "PEPE", "FLOKI", "DOGE", "SHIB", "MOG", "BRETT", "POPCAT"];
export const ops    = ["Bought", "Sold", "TP Hit", "SL Exit", "DCA In", "Sniped"];

export const MARKET_TOKENS = [
  { name: "BONK",   chain: "SOLANA", price: "0.0000182",   change: "+18.4%", vol: "$142M", mcap: "$1.2B",  up: true  },
  { name: "WIF",    chain: "SOLANA", price: "2.341",        change: "+12.1%", vol: "$89M",  mcap: "$2.3B",  up: true  },
  { name: "BRETT",  chain: "ETH",    price: "0.1204",       change: "+31.2%", vol: "$67M",  mcap: "$1.1B",  up: true  },
  { name: "PEPE",   chain: "ETH",    price: "0.00001124",   change: "-4.2%",  vol: "$201M", mcap: "$4.7B",  up: false },
  { name: "MOG",    chain: "ETH",    price: "0.0000026",    change: "+8.9%",  vol: "$31M",  mcap: "$340M",  up: true  },
  { name: "POPCAT", chain: "SOLANA", price: "0.7821",       change: "+22.7%", vol: "$54M",  mcap: "$780M",  up: true  },
  { name: "FLOKI",  chain: "BSC",    price: "0.0001821",    change: "-2.1%",  vol: "$45M",  mcap: "$1.7B",  up: false },
  { name: "DOGE",   chain: "BSC",    price: "0.1621",       change: "+5.3%",  vol: "$890M", mcap: "$23B",   up: true  },
  { name: "SHIB",   chain: "BSC",    price: "0.00002341",   change: "-1.8%",  vol: "$312M", mcap: "$13B",   up: false },
  { name: "TURBO",  chain: "ETH",    price: "0.00721",      change: "+44.1%", vol: "$28M",  mcap: "$230M",  up: true  },
];

export const PORTFOLIO_HOLDINGS = [
  { token: "USDC",  chain: "ETH",    amount: "4,210.00", value: "$4,210.00", pct: 38, color: "#3b82f6" },
  { token: "USDT",  chain: "BSC",    amount: "2,880.00", value: "$2,880.00", pct: 26, color: "#22c55e" },
  { token: "SOL",   chain: "SOLANA", amount: "12.441",   value: "$1,820.00", pct: 16, color: "#9945ff" },
  { token: "ZEC",   chain: "ZEC",    amount: "18.220",   value: "$1,240.00", pct: 11, color: "#f4b728" },
  { token: "WIF",   chain: "SOLANA", amount: "321.0",    value: "$751.00",   pct: 7,  color: "#00e5b4" },
  { token: "BRETT", chain: "ETH",    amount: "1,820.0",  value: "$219.00",   pct: 2,  color: "#627eea" },
];

const genMcap = (base) => {
  const val = base * (0.8 + (base % 7) * 0.05);
  if (val >= 1e9) return `${(val / 1e9).toFixed(1)}B`;
  if (val >= 1e6) return `${(val / 1e6).toFixed(1)}M`;
  return `${(val / 1e3).toFixed(0)}K`;
};

export const HISTORY_SEED = Array.from({ length: 30 }, (_, i) => {
  const chainKeys = ["SOLANA", "BSC", "ETH"];
  const tokenList = ["BONK", "WIF", "PEPE", "FLOKI", "DOGE", "SHIB", "MOG", "BRETT", "POPCAT"];
  const opList    = ["Bought", "Sold", "TP Hit", "SL Exit", "DCA In", "Sniped"];
  const chain     = chainKeys[i % 3];
  const token     = tokenList[i % tokenList.length];
  const op        = opList[i % opList.length];
  const isProfit  = op === "TP Hit" || op === "Sold";
  const isOngoing = op === "Bought" || op === "DCA In";
  const pnl = isProfit
    ? `+${(((i + 1) * 13.7) % 400 + 10).toFixed(1)}%`
    : op === "SL Exit"
    ? `-${(((i + 1) * 7.3) % 25 + 5).toFixed(1)}%`
    : isOngoing ? null
    : `${(((i + 1) * 2.1) % 5 - 2.5).toFixed(1)}%`;
  const ts         = `${String(i % 24).padStart(2,"0")}:${String((i * 3) % 60).padStart(2,"0")}:${String((i * 7) % 60).padStart(2,"0")}`;
  const zec        = ((i + 1) * 17.3 % 300 + 50).toFixed(2);
  const amount     = ((i + 1) * 0.13 % 2 + 0.1).toFixed(3);
  const entryPrice = ((i + 1) * 23.1 % 200 + 10).toFixed(4);
  const exitPrice  = isOngoing ? null : (parseFloat(entryPrice) * (isProfit ? (1 + ((i+1)*0.137 % 4)) : 0.75)).toFixed(4);
  const baseMcap   = (i + 1) * 1e7;
  const entryMcap  = genMcap(baseMcap);
  const exitMcap   = isOngoing ? null : genMcap(isProfit ? baseMcap * 3 : baseMcap * 0.7);
  return {
    id: i, chain, token, op, ts, zec, amount,
    price: entryPrice, entryPrice, exitPrice,
    entryMcap, exitMcap,
    pnl, shielded: i % 3 !== 0, profit: isProfit,
  };
});