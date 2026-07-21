import { NextRequest, NextResponse } from 'next/server';
import { getFastifyUrl } from '@/config/api';

const BACKEND = getFastifyUrl();

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization');
    const res = await fetch(`${BACKEND}/api/auth/logout`, {
      method: 'POST',
      headers: token ? { Authorization: token } : {},
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ ok: true }, { status: 200 });
  }
}
