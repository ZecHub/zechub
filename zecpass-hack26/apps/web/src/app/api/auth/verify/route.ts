/**
 * POST /api/auth/verify — Verify memo and issue JWT
 */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectDB } from '@/lib/mongodb';
import { VerificationService } from '@/services/VerificationService';

const VerifyRequestSchema = z.object({
  challenge_id: z.string().uuid('Invalid challenge_id'),
  tx_id: z.string().min(1, 'tx_id is required'),
  memo: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const parsed = VerifyRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { challenge_id, tx_id } = parsed.data;

    // Fetch the actual transaction memo from Zingolib (to prevent spoofing)
    const { ZingolibClient } = await import('@/lib/zingolib');
    const { config } = await import('@/lib/config');
    const zingolib = new ZingolibClient({
      baseUrl: config.zingolibServiceUrl,
      apiKey: config.zingolibApiKey(),
    });

    const walletMemos = await zingolib.getRecentMemos();
    const matchedMemo = walletMemos.find((m) => m.tx_id === tx_id);

    if (!matchedMemo) {
      return NextResponse.json(
        { error: 'Transaction not found in wallet' },
        { status: 400 }
      );
    }

    const verificationService = new VerificationService();
    const result = await verificationService.processVerification(
      challenge_id,
      matchedMemo.memo_text,
      tx_id
    );

    return NextResponse.json({
      access_token: result.access_token,
      token_type: result.token_type,
      expires_in: result.expires_in,
      session_id: result.session_id,
      scope: result.scope,
      zk_proof_hash: result.zk_proof_hash,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Verification failed';
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
