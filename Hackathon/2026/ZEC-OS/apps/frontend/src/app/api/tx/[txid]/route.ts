import { NextRequest, NextResponse } from 'next/server';
import { API_CONFIG, getApiHeaders } from '@/config/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ txid: string }> }
) {
  const { txid } = await params;

  try {
    const res = await fetch(`${API_CONFIG.baseUrl}/api/tx/${txid}`, {
      headers: getApiHeaders(),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Transaction not found: ${txid}` },
        { status: 404 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch transaction:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transaction' },
      { status: 502 }
    );
  }
}
