import { NextRequest, NextResponse } from 'next/server';
import { API_CONFIG, getApiHeaders } from '@/config/api';

export async function GET(request: NextRequest) {
  const address = request.nextUrl.searchParams.get('address');
  if (!address) {
    return NextResponse.json({ error: 'Missing address parameter' }, { status: 400 });
  }

  try {
    const res = await fetch(
      `${API_CONFIG.baseUrl}/api/decode-address?address=${encodeURIComponent(address)}`,
      { headers: getApiHeaders() }
    );

    if (!res.ok) {
      return NextResponse.json({ error: `Address decode failed: ${res.status}` }, { status: res.status });
    }

    const json = await res.json();
    const d = json?.data ?? json;
    return NextResponse.json(d);
  } catch (error) {
    console.error('Failed to decode address:', error);
    return NextResponse.json({ error: 'Failed to decode address' }, { status: 502 });
  }
}
