import { NextRequest, NextResponse } from 'next/server';
import { getFastifyUrl } from '@/config/api';

const BACKEND = getFastifyUrl();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await fetch(`${BACKEND}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: 'Auth backend unreachable' }, { status: 503 });
  }
}
