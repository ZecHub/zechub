import { NextRequest, NextResponse } from 'next/server';
import { API_CONFIG, getApiHeaders } from '@/config/api';

const VALID_RANGES = ['1d', '3d', '7d', '1m', '3m', '6m', '1y', '2y', 'all'];

// In-memory cache to prevent hammering APIs on concurrent requests
const priceCache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 60 * 1000; // 1 minute cache
const pendingRequests = new Map<string, Promise<unknown>>();

function getCachedData(range: string): unknown | null {
  const cached = priceCache.get(range);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
}

function setCachedData(range: string, data: unknown): void {
  priceCache.set(range, { data, timestamp: Date.now() });
}

// Map ranges to CoinGecko days parameter
const COINGECKO_DAYS: Record<string, number> = {
  '1d': 1,
  '3d': 3,
  '7d': 7,
  '1m': 30,
  '3m': 90,
  '6m': 180,
  '1y': 365,
  '2y': 730,
  'all': 1825, // ~5 years (CoinGecko free tier doesn't support 'max')
};

// Short ranges that need hourly granularity
const HOURLY_RANGES = ['1d', '3d', '7d'];

// Map range to CryptoCompare limit parameter
const CRYPTOCOMPARE_LIMITS: Record<string, { endpoint: string; limit: number }> = {
  '1d': { endpoint: 'histohour', limit: 24 },
  '3d': { endpoint: 'histohour', limit: 72 },
  '7d': { endpoint: 'histohour', limit: 168 },
  '1m': { endpoint: 'histoday', limit: 30 },
  '3m': { endpoint: 'histoday', limit: 90 },
  '6m': { endpoint: 'histoday', limit: 180 },
  '1y': { endpoint: 'histoday', limit: 365 },
  '2y': { endpoint: 'histoday', limit: 730 },
  'all': { endpoint: 'histoday', limit: 2000 },
};

// Fetch from CryptoCompare (free, no API key required for basic usage)
async function fetchFromCryptoCompare(range: string) {
  const config = CRYPTOCOMPARE_LIMITS[range] || CRYPTOCOMPARE_LIMITS['1y'];
  const url = `https://min-api.cryptocompare.com/data/v2/${config.endpoint}?fsym=ZEC&tsym=USD&limit=${config.limit}`;


  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`CryptoCompare API responded with ${res.status}`);
  }

  const data = await res.json();

  if (!data.Data?.Data || data.Data.Data.length === 0) {
    throw new Error('CryptoCompare returned no data');
  }


  // CryptoCompare returns: { Data: { Data: [{ time: 1234567890, close: 123.45 }, ...] } }
  const prices = data.Data.Data.map((p: { time: number; close: number }) => ({
    timestamp: p.time * 1000, // Convert seconds to ms
    price: p.close,
  }));

  return {
    range,
    count: prices.length,
    prices,
  };
}

// Fetch from CoinGecko (requires API key now, kept as secondary option)
async function fetchFromCoinGecko(range: string) {
  const days = COINGECKO_DAYS[range] || 365;
  const url = `https://api.coingecko.com/api/v3/coins/zcash/market_chart?vs_currency=usd&days=${days}`;


  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`CoinGecko API responded with ${res.status}`);
  }

  const data = await res.json();

  // For short ranges, keep hourly data (use unix timestamp)
  // For longer ranges, deduplicate to daily
  if (HOURLY_RANGES.includes(range)) {
    // Keep all hourly data points with unix timestamps
    const prices = data.prices.map((p: [number, number]) => ({
      timestamp: p[0], // Keep as unix ms
      price: p[1],
    }));


    return {
      range,
      count: prices.length,
      prices,
    };
  }

  // For longer ranges, convert to daily and deduplicate
  const prices = data.prices.map((p: [number, number]) => ({
    timestamp: new Date(p[0]).toISOString().split('T')[0],
    price: p[1],
  }));

  // Deduplicate by date (keep last price for each day)
  const byDate = new Map<string, { timestamp: string; price: number }>();
  for (const p of prices) {
    byDate.set(p.timestamp, p);
  }
  const dedupedPrices = Array.from(byDate.values());


  return {
    range,
    count: dedupedPrices.length,
    prices: dedupedPrices,
  };
}

// Minimum expected data points for each range
const MIN_DATA_POINTS: Record<string, number> = {
  '1d': 12,    // At least 12 hourly points
  '3d': 36,    // At least 36 hourly points
  '7d': 84,    // At least 84 hourly points
  '1m': 20,    // At least 20 daily points
  '3m': 60,    // At least 60 daily points
  '6m': 120,   // At least 120 daily points
  '1y': 200,   // At least 200 daily points
  '2y': 400,   // At least 400 daily points
  'all': 1000, // At least 1000 daily points (~3 years)
};

async function fetchPriceData(range: string, minPoints: number): Promise<unknown> {
  // Check cache first
  const cached = getCachedData(range);
  if (cached) {
    return cached;
  }

  // Check if there's already a pending request for this range
  const pending = pendingRequests.get(range);
  if (pending) {
    return pending;
  }

  // Create new request promise
  const requestPromise = (async () => {
    try {
      // Try primary API first
      const res = await fetch(`${API_CONFIG.baseUrl}/api/prices?range=${range}`, {
        headers: getApiHeaders(),
      });

      if (res.ok) {
        const data = await res.json();
        const pricesArray = data.prices || data.data || (Array.isArray(data) ? data : []);

        if (pricesArray.length >= minPoints) {
          setCachedData(range, data);
          return data;
        }
      }

      // Fallback to CryptoCompare
      const ccData = await fetchFromCryptoCompare(range);
      setCachedData(range, ccData);
      return ccData;
    } catch (error) {
      // Try CryptoCompare as final fallback
      try {
        const ccData = await fetchFromCryptoCompare(range);
        setCachedData(range, ccData);
        return ccData;
      } catch (ccError) {
        console.error('Failed to fetch prices from all sources:', error, ccError);
        throw new Error('Failed to fetch prices from all sources');
      }
    } finally {
      pendingRequests.delete(range);
    }
  })();

  pendingRequests.set(range, requestPromise);
  return requestPromise;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const range = searchParams.get('range') || '1y';

  if (!VALID_RANGES.includes(range)) {
    return NextResponse.json(
      { error: `Invalid range. Valid options: ${VALID_RANGES.join(', ')}` },
      { status: 400 }
    );
  }

  const minPoints = MIN_DATA_POINTS[range] || 10;

  try {
    const data = await fetchPriceData(range, minPoints);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch prices' },
      { status: 502 }
    );
  }
}
