/**
 * @module types/auth
 * Authentication-related TypeScript interfaces
 */

/** JWT payload structure for ZecPass sessions */
export interface JwtPayload {
  /** Session ID (UUID) */
  session_id: string;
  /** Application ID */
  app_id: string;
  /** Granted scopes */
  scope: string[];
  /** ZK proof hash — privacy-preserving user identifier */
  zk_proof_hash: string;
  /** JWT ID for revocation tracking */
  jti: string;
  /** Issued at (unix timestamp) */
  iat?: number;
  /** Expiry (unix timestamp) */
  exp?: number;
}

/** Result of memo verification */
export interface VerificationResult {
  valid: boolean;
  error?: string;
  challenge?: {
    challenge_id: string;
    app_id: string;
    scope: string[];
    nonce: string;
  };
  tx_id?: string;
}

/** Challenge status for polling */
export interface ChallengeStatus {
  status: 'pending' | 'used' | 'expired';
  used: boolean;
  challenge_id: string;
  expires_at: number;
}

/** Session verification result (returned by validateSession) */
export interface SessionVerification {
  valid: boolean;
  session_id?: string;
  app_id?: string;
  scope?: string[];
  zk_proof_hash?: string;
  expires_at?: number;
  error?: string;
}

/** Authentication result after successful verification */
export interface AuthResult {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  session_id: string;
  scope: string[];
  zk_proof_hash: string;
}

/** Custom error types for JWT operations */
export class TokenExpiredError extends Error {
  constructor(message = 'Token has expired') {
    super(message);
    this.name = 'TokenExpiredError';
  }
}

export class TokenInvalidError extends Error {
  constructor(message = 'Token is invalid') {
    super(message);
    this.name = 'TokenInvalidError';
  }
}
