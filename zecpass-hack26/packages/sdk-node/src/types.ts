/** Types for @zecpass/sdk-node */
export interface ZecPassClientConfig {
  appId: string;
  appSecret: string;
  baseUrl?: string;
}

export interface SessionVerification {
  valid: boolean;
  session_id?: string;
  app_id?: string;
  scope?: string[];
  zk_proof_hash?: string;
  expires_at?: number;
  error?: string;
}

export interface BadgeInput {
  badge_type: string;
  badge_label: string;
  proof_data?: Record<string, unknown>;
}

export interface Badge {
  badge_id: string;
  badge_type: string;
  badge_label: string;
  issued_at: string;
}

export interface BadgeVerification {
  valid: boolean;
  badge_id?: string;
  badge_type?: string;
  badge_label?: string;
  error?: string;
}
