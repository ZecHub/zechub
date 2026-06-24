/**
 * @module services/ChallengeService
 * Handles challenge issuance, validation, and status polling.
 */

import { connectDB } from '@/lib/mongodb';
import { generateChallenge, buildMemoPayload } from '@/lib/challenge';
import { App } from '@/models/App';
import { Challenge } from '@/models/Challenge';
import { config } from '@/lib/config';
import type { IChallenge } from '@/models/Challenge';
import type { ChallengeStatus, QrData } from '@/types/zecpass';

interface ChallengeIssueResult {
  challenge: IChallenge;
  memo_payload: string;
  qr_data: QrData;
}

/**
 * Service for managing authentication challenges.
 */
export class ChallengeService {
  /**
   * Issue a new authentication challenge.
   * Validates the app, redirect_uri, and scopes before creating.
   *
   * @param app_id - The requesting application's ID
   * @param scope - Requested permission scopes
   * @param redirect_uri - Where to redirect after authentication
   * @param ip - Requester's IP address
   * @returns Challenge data including memo payload and QR code data
   */
  async issue(
    app_id: string,
    scope: string[],
    redirect_uri: string,
    ip: string
  ): Promise<ChallengeIssueResult> {
    await connectDB();

    // Validate app exists and is active
    const app = await App.findOne({ app_id, active: true });
    if (!app) {
      throw new Error('Application not found or inactive');
    }

    // Validate redirect_uri against app's allowed redirect_uris
    if (!app.redirect_uris.includes(redirect_uri)) {
      throw new Error(
        `Invalid redirect_uri. Allowed URIs: ${app.redirect_uris.join(', ')}`
      );
    }

    // Validate requested scopes are within app's allowed scopes
    const invalidScopes = scope.filter((s) => !app.scopes_allowed.includes(s));
    if (invalidScopes.length > 0) {
      throw new Error(
        `Invalid scopes: ${invalidScopes.join(', ')}. Allowed: ${app.scopes_allowed.join(', ')}`
      );
    }

    // Generate the challenge
    const challenge = await generateChallenge(app_id, scope, ip);
    const memo_payload = buildMemoPayload(challenge);

    // Build QR code data (zcash:{address}?amount=0.0001&memo={base64(memo)})
    const memoBase64 = Buffer.from(memo_payload).toString('base64');
    const qr_data: QrData = {
      uri: `zcash:${challenge.zecpass_address}?amount=0.0001&memo=${memoBase64}`,
      memo_payload,
      address: challenge.zecpass_address,
    };

    return { challenge, memo_payload, qr_data };
  }

  /**
   * Get the current status of a challenge (for client polling).
   *
   * @param challenge_id - The challenge ID to check
   * @returns Challenge status object
   */
  async getStatus(challenge_id: string): Promise<ChallengeStatus> {
    await connectDB();

    const challenge = await Challenge.findOne({ challenge_id });

    if (!challenge) {
      throw new Error('Challenge not found');
    }

    const now = new Date();
    let status: 'pending' | 'used' | 'expired';

    if (challenge.used) {
      status = 'used';
    } else if (challenge.expires_at <= now) {
      status = 'expired';
    } else {
      status = 'pending';
    }

    return {
      status,
      used: challenge.used,
      challenge_id: challenge.challenge_id,
      expires_at: Math.floor(challenge.expires_at.getTime() / 1000),
    };
  }
}
