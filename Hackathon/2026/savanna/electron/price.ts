// Cotação ZEC/USD via CoinGecko (endpoint público, sem chave).
// Cache local para respeitar o rate limit (~10 req/s por IP) e evitar
// bater na API a cada ciclo do watcher/dashboard.

const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=zcash&vs_currencies=usd";

const CACHE_TTL_MS = 60_000; // 1 minuto

let cachedPrice: number | null = null;
let cachedAt = 0;

export async function fetchZecUsd(): Promise<number | null> {
  const now = Date.now();
  if (cachedPrice !== null && now - cachedAt < CACHE_TTL_MS) {
    return cachedPrice;
  }
  try {
    const res = await fetch(COINGECKO_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as { zcash?: { usd?: number } };
    const price = data.zcash?.usd;
    if (typeof price === "number") {
      cachedPrice = price;
      cachedAt = now;
      return price;
    }
    return cachedPrice; // devolve último valor conhecido se o payload vier estranho
  } catch {
    return cachedPrice; // offline ou erro: usa o cache (pode ser null)
  }
}