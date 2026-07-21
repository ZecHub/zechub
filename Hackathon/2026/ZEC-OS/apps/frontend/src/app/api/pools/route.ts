import { NextRequest, NextResponse } from 'next/server';
import { API_CONFIG, getApiHeaders } from '@/config/api';

const VALID_RANGES = ['1d', '3d', '7d', '1m', '3m', '6m', '1y', '2y', 'all'];
const HOURLY_RANGES = ['1d', '3d', '7d'];

// In-memory cache to prevent hammering APIs on concurrent requests
const poolsCache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 60 * 1000; // 1 minute cache
const pendingRequests = new Map<string, Promise<unknown>>();

function getCachedData(range: string): unknown | null {
  const cached = poolsCache.get(range);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
}

function setCachedData(range: string, data: unknown): void {
  poolsCache.set(range, { data, timestamp: Date.now() });
}

// Build the correct backend flows URL for each range
function getFlowsUrl(range: string): string {
  if (range === '7d') {
    return `${API_CONFIG.baseUrl}/api/flows/hourly?hours=168`;
  }
  return `${API_CONFIG.baseUrl}/api/flows?range=${range}`;
}

// Extract pool value - handles both direct numbers and {total, delta} objects
function getPoolValue(val: number | { total: number; delta?: number } | undefined): number {
  if (val === undefined || val === null) return 0;
  if (typeof val === 'number') return val;
  if (typeof val === 'object' && 'total' in val) return val.total;
  return 0;
}

// Get pool history from flows endpoint
// For hourly ranges (1d, 3d, 7d): flows now include pools object directly
// For daily ranges: reconstruct from net flows
async function getPoolHistoryFromFlows(range: string) {
  const flowUrl = getFlowsUrl(range);
  const flowRes = await fetch(flowUrl, {
    headers: getApiHeaders(),
  });
  if (!flowRes.ok) throw new Error(`Failed to fetch flow data: ${flowRes.status}`);
  const flowData = await flowRes.json();

  if (!flowData.data || flowData.data.length === 0) {
    throw new Error('No flow data available');
  }


  // For hourly data, extract pools directly from flow entries
  if (flowData.granularity === 'hourly') {
    const history = flowData.data
      .filter((entry: { pools?: object }) => entry.pools)
      .map((entry: { timestamp: string; pools: Record<string, number | { total: number }> }) => ({
        timestamp: entry.timestamp,
        sprout: getPoolValue(entry.pools.sprout),
        sapling: getPoolValue(entry.pools.sapling),
        orchard: getPoolValue(entry.pools.orchard),
        transparent: getPoolValue(entry.pools.transparent),
      }));

    return history;
  }

  // For daily data, reconstruct from net flows (existing logic)
  const chainRes = await fetch(`${API_CONFIG.baseUrl}/api/chain`, {
    headers: getApiHeaders(),
  });
  if (!chainRes.ok) throw new Error('Failed to fetch chain data');
  const chainData = await chainRes.json();

  let sprout = chainData.pools?.sprout || 0;
  let sapling = chainData.pools?.sapling || 0;
  let orchard = chainData.pools?.orchard || 0;
  const transparent = chainData.pools?.transparent || 0;

  const flows = [...flowData.data].reverse();
  const history = [];

  history.push({
    timestamp: new Date().toISOString().split('T')[0],
    sprout,
    sapling,
    orchard,
    transparent,
  });

  for (const flow of flows) {
    sprout -= flow.net?.sprout || 0;
    sapling -= flow.net?.sapling || 0;
    orchard -= flow.net?.orchard || 0;

    history.push({
      timestamp: flow.date || flow.timestamp,
      sprout: Math.max(0, sprout),
      sapling: Math.max(0, sapling),
      orchard: Math.max(0, orchard),
      transparent,
    });
  }

  return history.reverse();
}

async function fetchPoolData(range: string): Promise<unknown> {
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
      // First try the primary API
      const res = await fetch(`${API_CONFIG.baseUrl}/api/pools?range=${range}`, {
        headers: getApiHeaders(),
      });

      if (res.ok) {
        const data = await res.json();
        const poolsArray = Array.isArray(data) ? data :
          data.pools && Array.isArray(data.pools) ? data.pools :
          data.data && Array.isArray(data.data) ? data.data : [];


        if (poolsArray.length > 1) {
          setCachedData(range, poolsArray);
          return poolsArray;
        }
      } else {
      }

      // Fallback: get pool history from flows endpoint
      const poolHistory = await getPoolHistoryFromFlows(range);
      setCachedData(range, poolHistory);
      return poolHistory;
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

  try {
    const data = await fetchPoolData(range);
    return NextResponse.json(data);
  } catch (error) {
    console.error('[pools API] Failed to fetch pools history:', error);
    const errMsg = error instanceof Error ? error.message : 'Historical pool data not available';
    return NextResponse.json(
      { error: `Pool history unavailable: ${errMsg}` },
      { status: 503 }
    );
  }
}
