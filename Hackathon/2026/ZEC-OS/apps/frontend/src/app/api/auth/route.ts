import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const accessPassword = process.env.ACCESS_PASSWORD;

    // If no password is set in env, allow access (dev mode)
    if (!accessPassword) {
      return NextResponse.json({ success: true });
    }

    if (password === accessPassword) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}

// Check if password protection is enabled
export async function GET() {
  const accessPassword = process.env.ACCESS_PASSWORD;
  return NextResponse.json({
    protected: !!accessPassword
  });
}
