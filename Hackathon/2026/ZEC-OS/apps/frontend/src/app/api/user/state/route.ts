import { NextRequest, NextResponse } from 'next/server';
import { getFastifyUrl } from '@/config/api';

const BACKEND = getFastifyUrl();

function authHeader(req: NextRequest): Record<string, string> {
  const token = req.headers.get('Authorization');
  return token ? { Authorization: token } : {};
}

export async function GET(req: NextRequest) {
  try {
    const res = await fetch(`${BACKEND}/api/user/state`, {
      headers: { ...authHeader(req) },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: 'Backend unreachable' }, { status: 503 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await fetch(`${BACKEND}/api/user/state`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeader(req) },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: 'Backend unreachable' }, { status: 503 });
  }
}
