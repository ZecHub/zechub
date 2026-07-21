import { NextRequest, NextResponse } from 'next/server';
import { API_CONFIG, getApiHeaders } from '@/config/api';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  const { address } = await params;

  try {
    const res = await fetch(`${API_CONFIG.baseUrl}/api/miners/${address}`, {
      headers: getApiHeaders(),
    });
    if (!res.ok) return NextResponse.json({ error: `Miner not found: ${address}` }, { status: res.status });
    return NextResponse.json(await res.json());
  } catch (err) {
    console.error('[miners/address] fetch failed:', err);
    return NextResponse.json({ error: 'Failed to fetch miner data' }, { status: 500 });
  }
}
