import { NextRequest, NextResponse } from 'next/server';
import { getFastifyUrl } from '@/config/api';

const BACKEND = getFastifyUrl();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const token = req.headers.get('Authorization');
    const res = await fetch(`${BACKEND}/api/auth/password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: token } : {}) },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: 'Auth backend unreachable' }, { status: 503 });
  }
}
