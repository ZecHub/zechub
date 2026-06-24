/**
 * POST /api/badges/verify — Verify a badge (public)
 */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectDB } from '@/lib/mongodb';
import { BadgeService } from '@/services/BadgeService';

const VerifyBadgeSchema = z.object({
  badge_id: z.string().uuid('Invalid badge_id'),
});

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const parsed = VerifyBadgeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const badgeService = new BadgeService();
    const result = await badgeService.verify(parsed.data.badge_id);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Badge verification failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
