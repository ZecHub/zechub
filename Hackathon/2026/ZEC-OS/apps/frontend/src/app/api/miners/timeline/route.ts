import { NextRequest, NextResponse } from 'next/server';
import { API_CONFIG, getApiHeaders } from '@/config/api';

const VALID_RANGES = ['7d', '30d', '90d', 'all'];

export async function GET(request: NextRequest) {
  const range = request.nextUrl.searchParams.get('range') || '90d';
  if (!VALID_RANGES.includes(range)) {
    return NextResponse.json({ error: `Invalid range. Valid: ${VALID_RANGES.join(', ')}` }, { status: 400 });
  }

  try {
    const res = await fetch(`${API_CONFIG.baseUrl}/api/miners/timeline?range=${range}`, {
      headers: getApiHeaders(),
    });
    if (!res.ok) return NextResponse.json({ error: 'Failed to fetch miner timeline' }, { status: res.status });
    return NextResponse.json(await res.json());
  } catch (err) {
    console.error('[miners/timeline] fetch failed:', err);
    return NextResponse.json({ error: 'Failed to fetch miner timeline' }, { status: 500 });
  }
}
