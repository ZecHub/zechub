
import { NextResponse } from 'next/server';
import { API_ENDPOINTS } from '@/lib/constants';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const response = await fetch(`${API_ENDPOINTS.CAMPAIGNS}/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 },
    });

    const text = await response.text();
    let data: any;
    try { data = JSON.parse(text); } catch { data = { success: false, error: 'Invalid response from server' }; }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error fetching campaign:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch campaign' }, { status: 500 });
  }
}