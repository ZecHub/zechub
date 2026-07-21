import { NextRequest, NextResponse } from 'next/server';
import { API_CONFIG, getApiHeaders } from '@/config/api';

export async function GET(request: NextRequest) {
  const shielded = request.nextUrl.searchParams.get('shielded');
  const params = shielded !== null ? `?shielded=${shielded}` : '';
  try {
    const res = await fetch(`${API_CONFIG.baseUrl}/api/mempool${params}`, {
      headers: getApiHeaders(),
    });
    if (!res.ok) return NextResponse.json({ error: 'Failed to fetch mempool' }, { status: res.status });
    return NextResponse.json(await res.json());
  } catch (err) {
    console.error('[mempool] fetch failed:', err);
    return NextResponse.json({ error: 'Failed to fetch mempool' }, { status: 500 });
  }
}
