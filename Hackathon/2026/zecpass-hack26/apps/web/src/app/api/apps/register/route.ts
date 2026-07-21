/**
 * POST /api/apps/register — Register a third-party app
 */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectDB } from '@/lib/mongodb';
import { verifyToken } from '@/lib/jwt';
import { Session } from '@/models/Session';
import { AppRegistryService } from '@/services/AppRegistryService';

const RegisterAppSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  website_url: z.string().url(),
  redirect_uris: z.array(z.string().url()).min(1),
  scopes_allowed: z.array(z.string()).min(1),
});

export async function POST(request: NextRequest) {
  try {
    // Authenticate
    const authHeader = request.headers.get('authorization');
    const cookieToken = request.cookies.get('zecpass_token')?.value;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : cookieToken;
    if (!token) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });

    const payload = await verifyToken(token);
    await connectDB();
    const session = await Session.findOne({ jwt_jti: payload.jti, revoked: false });
    if (!session || !session.isValid()) return NextResponse.json({ error: 'Session invalid' }, { status: 401 });

    // Validate body
    const body = await request.json();
    const parsed = RegisterAppSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const appService = new AppRegistryService();
    const result = await appService.register(parsed.data, payload.zk_proof_hash);

    return NextResponse.json({
      app_id: result.app_id,
      app_secret: result.app_secret,
      name: result.name,
      warning: 'Store your app_secret securely. It will not be shown again.',
    }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Registration failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
