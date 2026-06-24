/**
 * @module types/zecpass
 * Shared ZecPass types used across the application
 */

/** A memo received from the Zcash network via ZingoLib */
export interface ZecMemo {
  /** Transaction ID on the Zcash network */
  tx_id: string;
  /** Raw memo text content */
  memo_text: string;
  /** When the memo was received (ISO 8601) */
  received_at: string;
  /** Transaction amount in zatoshis */
  amount_zat?: number;
}

/** Input for registering a third-party application */
export interface RegisterAppInput {
  name: string;
  description: string;
  website_url: string;
  redirect_uris: string[];
  scopes_allowed: string[];
}

/** ZecPass session data (safe to expose — no addresses) */
export interface ZecPassSession {
  session_id: string;
  app_id: string;
  scope: string[];
  zk_proof_hash: string;
  issued_at: string;
  expires_at: string;
}

/** Challenge data returned to the client */
export interface ChallengeResponse {
  challenge_id: string;
  zecpass_address: string;
  memo_payload: string;
  expires_at: number;
  qr_code_url: string;
}

/** QR code data for Zcash wallet scanning */
export interface QrData {
  /** zcash:{address}?memo={base64(memo)} */
  uri: string;
  /** Raw memo payload */
  memo_payload: string;
  /** ZecPass receive address */
  address: string;
}

/** App details (safe to expose — no secret hash) */
export interface AppDetails {
  app_id: string;
  name: string;
  description: string;
  website_url: string;
  redirect_uris: string[];
  scopes_allowed: string[];
  active: boolean;
  created_at: string;
}

/** Memo verification event (sent via webhook) */
export interface MemoVerificationEvent {
  challenge_id: string;
  status: 'verified' | 'failed';
  tx_id?: string;
  zk_proof_hash?: string;
  error?: string;
  timestamp: string;
}

export interface ChallengeStatus {
  status: 'pending' | 'used' | 'expired';
  used: boolean;
  challenge_id: string;
  expires_at: number;
}

