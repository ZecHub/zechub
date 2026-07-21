import { NextRequest, NextResponse } from 'next/server';
import { API_CONFIG, getApiHeaders } from '@/config/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const res = await fetch(`${API_CONFIG.baseUrl}/api/block/${id}`, {
      headers: getApiHeaders(),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Block not found: ${id}` },
        { status: 404 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch block:', error);
    return NextResponse.json(
      { error: 'Failed to fetch block' },
      { status: 502 }
    );
  }
}
