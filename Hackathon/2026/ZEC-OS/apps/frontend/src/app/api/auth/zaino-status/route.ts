import { NextResponse } from 'next/server';
import { getFastifyUrl } from '@/config/api';

const BACKEND = getFastifyUrl();

export async function GET() {
  try {
    const res = await fetch(`${BACKEND}/api/auth/zaino-status`);
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: 'Auth backend unreachable', connected: false }, { status: 503 });
  }
}
