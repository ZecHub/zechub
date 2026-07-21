import { NextRequest, NextResponse } from 'next/server';
import { API_CONFIG, getApiHeaders } from '@/config/api';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ blockHash: string }> }
) {
  const { blockHash } = await params;

  try {
    const res = await fetch(`${API_CONFIG.baseUrl}/api/miner/${blockHash}`, {
      headers: getApiHeaders(),
      cache: 'force-cache', // blocks are immutable
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Miner data not found for ${blockHash}` }, { status: res.status });
    }

    const json = await res.json();
    const d = json?.data ?? json;

    return NextResponse.json({
      tag: d.tag ?? null,
      address: d.address ?? '',
      reward: d.reward ?? 0,
    });
  } catch (err) {
    console.error('[miner route] fetch failed:', err);
    return NextResponse.json({ error: 'Failed to fetch miner info' }, { status: 500 });
  }
}
