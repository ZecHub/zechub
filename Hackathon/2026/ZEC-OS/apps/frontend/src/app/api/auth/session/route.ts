import { NextRequest, NextResponse } from 'next/server';
import { getFastifyUrl } from '@/config/api';

const BACKEND = getFastifyUrl();

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization');
    const res = await fetch(`${BACKEND}/api/auth/session`, {
      headers: token ? { Authorization: token } : {},
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ valid: true }, { status: 200 });
  }
}
