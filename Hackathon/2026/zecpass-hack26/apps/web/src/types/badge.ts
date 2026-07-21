/**
 * @module types/badge
 * Badge-related TypeScript interfaces
 */

/** Input for issuing a new badge */
export interface BadgeInput {
  badge_type: string;
  badge_label: string;
  proof_data: Record<string, unknown>;
  expires_at?: Date | null;
}

/** Badge verification result */
export interface BadgeVerification {
  valid: boolean;
  badge_id?: string;
  badge_type?: string;
  badge_label?: string;
  issuer_app_id?: string;
  issued_at?: Date;
  expires_at?: Date | null;
  revoked?: boolean;
  error?: string;
}

/** Badge display data (for UI components) */
export interface BadgeDisplay {
  badge_id: string;
  badge_type: string;
  badge_label: string;
  issuer_app_id: string;
  issuer_app_name?: string;
  issued_at: string;
  expires_at: string | null;
  status: 'active' | 'expired' | 'revoked';
}
