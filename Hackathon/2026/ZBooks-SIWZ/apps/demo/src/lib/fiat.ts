import { getFiatPrices, saveFiatPrices } from "./db";

// ZEC/USD valuation. Prices come from CoinGecko's free daily history endpoint
// and are cached per UTC date in Turso, so each date is fetched at most once.
const HISTORY_URL = "https://api.coingecko.com/api/v3/coins/zcash/history";
// Cap fetches per request so a first load with many new dates stays bounded.
const MAX_FETCHES = 12;
const FETCH_GAP_MS = 600;

export function ymdUtc(ts: number): string {
  return new Date(ts).toISOString().slice(0, 10);
}

function toCoinGeckoDate(ymd: string): string {
  const [y, m, d] = ymd.split("-");
  return `${d}-${m}-${y}`;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Returns a (YYYY-MM-DD -> ZEC/USD) map for the given timestamps. Best effort:
// dates it cannot price (network/rate-limit) are simply absent from the map.
export async function zecUsdForTimestamps(timestamps: number[]): Promise<Map<string, number>> {
  const dates = [...new Set(timestamps.map(ymdUtc))];
  if (dates.length === 0) return new Map();

  const cached = await getFiatPrices(dates);
  const missing = dates.filter((d) => !cached.has(d)).slice(0, MAX_FETCHES);

  const fetched: { date: string; usd: number }[] = [];
  for (let i = 0; i < missing.length; i++) {
    const usd = await fetchPrice(missing[i]);
    if (usd != null) fetched.push({ date: missing[i], usd });
    if (i < missing.length - 1) await sleep(FETCH_GAP_MS);
  }
  if (fetched.length) await saveFiatPrices(fetched);

  const out = new Map(cached);
  for (const f of fetched) out.set(f.date, f.usd);
  return out;
}

async function fetchPrice(ymd: string): Promise<number | null> {
  const key = process.env.COINGECKO_API_KEY;
  const url = `${HISTORY_URL}?date=${toCoinGeckoDate(ymd)}&localization=false`;
  try {
    const res = await fetch(url, {
      headers: key ? { "x-cg-demo-api-key": key } : undefined,
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const j = (await res.json()) as { market_data?: { current_price?: { usd?: number } } };
    const usd = j?.market_data?.current_price?.usd;
    return typeof usd === "number" ? usd : null;
  } catch {
    return null;
  }
}
