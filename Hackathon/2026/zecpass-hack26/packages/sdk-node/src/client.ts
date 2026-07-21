/**
 * @module ZecPassClient
 * Node.js SDK client for verifying ZecPass tokens and managing badges.
 */

import type { ZecPassClientConfig, SessionVerification, BadgeInput, Badge, BadgeVerification } from './types';

export class ZecPassClient {
  private appId: string;
  private appSecret: string;
  private baseUrl: string;

  constructor(config: ZecPassClientConfig) {
    this.appId = config.appId;
    this.appSecret = config.appSecret;
    this.baseUrl = (config.baseUrl || 'https://zecpass.app').replace(/\/$/, '');
  }

  /** Verify a ZecPass session token by calling the ZecPass API. */
  async verifyToken(token: string): Promise<SessionVerification> {
    try {
      const res = await fetch(`${this.baseUrl}/api/auth/session`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return (await res.json()) as SessionVerification;
    } catch (error) {
      return { valid: false, error: error instanceof Error ? error.message : 'Verification failed' };
    }
  }

  /** Issue a badge to an authenticated user. */
  async issueUserBadge(holderToken: string, badge: BadgeInput): Promise<Badge> {
    const res = await fetch(`${this.baseUrl}/api/badges/issue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-App-Id': this.appId,
        'X-App-Secret': this.appSecret,
      },
      body: JSON.stringify({ holder_session_token: holderToken, ...badge }),
    });
    if (!res.ok) { const data = await res.json(); throw new Error(data.error || 'Badge issuance failed'); }
    return (await res.json()) as Badge;
  }

  /** Verify a badge by its ID. */
  async verifyBadge(badge_id: string): Promise<BadgeVerification> {
    const res = await fetch(`${this.baseUrl}/api/badges/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ badge_id }),
    });
    return (await res.json()) as BadgeVerification;
  }

  /** Revoke a user session. */
  async revokeUserSession(session_id: string): Promise<void> {
    const res = await fetch(`${this.baseUrl}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-App-Id': this.appId,
        'X-App-Secret': this.appSecret,
      },
      body: JSON.stringify({ session_id }),
    });
    if (!res.ok) { const data = await res.json(); throw new Error(data.error || 'Revocation failed'); }
  }
}
