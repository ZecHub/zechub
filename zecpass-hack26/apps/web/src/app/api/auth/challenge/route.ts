/**
 * POST /api/auth/challenge — Issue a new login challenge
 */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectDB } from '@/lib/mongodb';
import { ChallengeService } from '@/services/ChallengeService';
import { config } from '@/lib/config';
import { startMemoWatcher } from '@/jobs/memo-watcher';

const ChallengeRequestSchema = z.object({
  app_id: z.string().min(1, 'app_id is required'),
  scope: z.array(z.string()).min(1, 'At least one scope required'),
  redirect_uri: z.string().refine(
    (val) => val.startsWith('/') || /^(https?:\/\/)/.test(val),
    { message: 'Invalid redirect_uri format (must be a valid URL or starting with /)' }
  ),
});

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    startMemoWatcher();
    const body = await request.json();
    const parsed = ChallengeRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { app_id, scope, redirect_uri } = parsed.data;
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '0.0.0.0';

    const challengeService = new ChallengeService();
    const result = await challengeService.issue(app_id, scope, redirect_uri, ip);

    return NextResponse.json({
      challenge_id: result.challenge.challenge_id,
      zecpass_address: result.challenge.zecpass_address,
      memo_payload: result.memo_payload,
      expires_at: Math.floor(result.challenge.expires_at.getTime() / 1000),
      qr_code_url: `${config.appUrl}/api/auth/challenge/${result.challenge.challenge_id}/qr`,
    }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    const status = message.includes('not found') || message.includes('Invalid') ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
