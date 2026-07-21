import { NextRequest, NextResponse } from 'next/server';
import { getFastifyUrl } from '@/config/api';

const BACKEND = getFastifyUrl();

export async function GET(req: NextRequest) {
  try {
    const qs = req.nextUrl.searchParams.toString();
    const res = await fetch(`${BACKEND}/api/auth/name-check?${qs}`);
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: 'Auth backend unreachable' }, { status: 503 });
  }
}
