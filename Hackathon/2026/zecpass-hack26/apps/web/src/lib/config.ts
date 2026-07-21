/**
 * @module config
 * Central configuration — all environment variables with validation and defaults.
 * No hardcoded values should exist outside this file.
 */

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function optionalEnv(name: string, defaultValue: string): string {
  return process.env[name] || defaultValue;
}

function numericEnv(name: string, defaultValue: number): number {
  const value = process.env[name];
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    throw new Error(`Environment variable ${name} must be a number, got: ${value}`);
  }
  return parsed;
}

/** ZecPass application configuration */
export const config = {
  /** MongoDB connection string */
  mongodbUri: (): string => requireEnv('MONGODB_URI'),

  /** JWT RS256 private key (PEM, base64-encoded) */
  jwtSecret: (): string => requireEnv('JWT_SECRET'),

  /** JWT RS256 public key (PEM, base64-encoded) */
  jwtPublicKey: (): string => requireEnv('JWT_PUBLIC_KEY'),

  /** JWT token expiry in seconds */
  jwtExpiresIn: numericEnv('JWT_EXPIRES_IN', 86400),

  /** ZingoLib service base URL */
  zingolibServiceUrl: optionalEnv('ZINGOLIB_SERVICE_URL', 'http://localhost:3001'),

  /** ZingoLib internal API key */
  zingolibApiKey: (): string => requireEnv('ZINGOLIB_API_KEY'),

  /** ZecPass shielded u-address for receiving challenge memos */
  zecpassReceiveAddress: (): string => requireEnv('ZECPASS_RECEIVE_ADDRESS'),

  /** Public-facing app URL */
  appUrl: optionalEnv('NEXT_PUBLIC_APP_URL', 'http://localhost:3000'),

  /** ZecPass platform app ID */
  zecpassAppId: optionalEnv('NEXT_PUBLIC_ZECPASS_APP_ID', 'zecpass-platform'),

  /** Memo polling interval in milliseconds */
  memoPollIntervalMs: numericEnv('MEMO_POLL_INTERVAL_MS', 15000),

  /** bcrypt salt rounds for app secret hashing */
  bcryptRounds: numericEnv('BCRYPT_ROUNDS', 12),

  /** Challenge TTL in seconds (default: 10 minutes) */
  challengeTtlSeconds: numericEnv('CHALLENGE_TTL_SECONDS', 600),

  /** Session TTL in seconds (default: 24 hours) */
  sessionTtlSeconds: numericEnv('SESSION_TTL_SECONDS', 86400),

  /** Salt for IP hashing in audit logs */
  ipHashSalt: optionalEnv('IP_HASH_SALT', 'zecpass-default-salt'),

  /** Internal webhook secret for memo events */
  webhookSecret: (): string => requireEnv('WEBHOOK_SECRET'),

  /** Whether we're in development mode */
  isDev: process.env.NODE_ENV !== 'production',
} as const;
