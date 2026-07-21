import { NextRequest, NextResponse } from 'next/server';
import { API_CONFIG, getApiHeaders } from '@/config/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  const { address } = await params;

  // Z-addresses can't be queried - return immediately
  if (address.startsWith('zs') || address.startsWith('u1')) {
    return NextResponse.json({
      address,
      type: address.startsWith('zs') ? 'sapling' : 'unified',
      valid: true,
      message: 'Shielded addresses preserve privacy by design. Balance and transaction history are not publicly queryable.',
    });
  }

  // T-addresses - proxy to API
  try {
    const res = await fetch(`${API_CONFIG.baseUrl}/api/address/${address}`, {
      headers: getApiHeaders(),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Address not found or invalid: ${address}` },
        { status: 404 }
      );
    }

    const data = await res.json();

    // Normalize transactions field — backend may use txids, history, txHistory, etc.
    if (!data.transactions || data.transactions.length === 0) {
      const alt = data.txids || data.history || data.txHistory || data.tx_list || data.txs;
      if (Array.isArray(alt) && alt.length > 0) {
        data.transactions = alt.map((t: unknown) =>
          typeof t === 'string' ? { txid: t } : t
        );
      }
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch address:', error);
    return NextResponse.json(
      { error: 'Failed to fetch address' },
      { status: 502 }
    );
  }
}
