import { NextResponse } from 'next/server';
import { API_CONFIG, getApiHeaders } from '@/config/api';

export async function GET() {
  try {
    const res = await fetch(`${API_CONFIG.baseUrl}/api/price`, {
      headers: getApiHeaders(), // Cache for 10 minutes
    });

    if (!res.ok) {
      throw new Error(`API responded with ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch price:', error);
    return NextResponse.json(
      { error: 'Failed to fetch price' },
      { status: 502 }
    );
  }
}
