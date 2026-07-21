import { NextResponse } from 'next/server';
import { API_CONFIG, getApiHeaders } from '@/config/api';

export async function GET() {
  try {
    const res = await fetch(`${API_CONFIG.baseUrl}/api/chain`, {
      headers: getApiHeaders(), // Cache for 30 seconds
    });

    if (!res.ok) {
      throw new Error(`API responded with ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch chain data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chain data' },
      { status: 502 }
    );
  }
}
