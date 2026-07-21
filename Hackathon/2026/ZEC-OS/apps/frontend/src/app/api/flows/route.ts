import { NextRequest, NextResponse } from 'next/server';
import { API_CONFIG, getApiHeaders } from '@/config/api';

// In-memory cache to prevent hammering APIs on concurrent requests
const flowsCache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 60 * 1000; // 1 minute cache
const pendingRequests = new Map<string, Promise<unknown>>();

function getCachedData(range: string): unknown | null {
  const cached = flowsCache.get(range);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
}

function setCachedData(range: string, data: unknown): void {
  flowsCache.set(range, { data, timestamp: Date.now() });
}

// Build the correct backend URL for each range
// 7d needs hourly endpoint, others use range endpoint
function getBackendUrl(range: string): string {
  if (range === '7d') {
    // Legacy alias: upstream daily endpoint doesn't know '7d' — use hourly.
    // ('1w' passes straight through; upstream supports it natively.)
    return `${API_CONFIG.baseUrl}/api/flows/hourly?hours=168`;
  }
  return `${API_CONFIG.baseUrl}/api/flows?range=${range}`;
}

async function fetchFlowData(range: string): Promise<unknown> {
  const cached = getCachedData(range);
  if (cached) return cached;

  const pending = pendingRequests.get(range);
  if (pending) return pending;

  const requestPromise = (async () => {
    try {
      const backendUrl = getBackendUrl(range);

      const res = await fetch(backendUrl, {
        headers: getApiHeaders(),
      });

      if (!res.ok) {
        throw new Error(`API responded with ${res.status}`);
      }

      const data = await res.json();
      setCachedData(range, data);
      return data;
    } finally {
      pendingRequests.delete(range);
    }
  })();

  pendingRequests.set(range, requestPromise);
  return requestPromise;
}

const VALID_FLOW_RANGES = ['1d', '3d', '7d', '1w', '1m', '3m', '6m', '1y', 'all'];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '1m';

    if (!VALID_FLOW_RANGES.includes(range)) {
      return NextResponse.json({ error: `Invalid range. Valid: ${VALID_FLOW_RANGES.join(', ')}` }, { status: 400 });
    }

    const data = await fetchFlowData(range);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch flow data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch flow data' },
      { status: 502 }
    );
  }
}
