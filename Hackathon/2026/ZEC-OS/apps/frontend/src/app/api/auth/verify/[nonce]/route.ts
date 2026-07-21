import { NextRequest, NextResponse } from 'next/server';
import { getFastifyUrl } from '@/config/api';

const BACKEND = getFastifyUrl();

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ nonce: string }> },
) {
  const { nonce } = await params;
  try {
    const res = await fetch(`${BACKEND}/api/auth/verify/${nonce}`);
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ verified: false, error: 'Auth backend unreachable' }, { status: 503 });
  }
}
