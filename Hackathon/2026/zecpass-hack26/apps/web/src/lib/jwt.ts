/**
 * @module lib/jwt
 * JWT utilities using the `jose` library (Edge-compatible).
 * Signs and verifies tokens with RS256 asymmetric keys.
 */

import { SignJWT, jwtVerify, decodeJwt } from 'jose';
import { v4 as uuidv4 } from 'uuid';
import { config } from './config';
import { JwtPayload, TokenExpiredError, TokenInvalidError } from '@/types/auth';

/**
 * Helper to parse a key from environment variable.
 * Supports both base64 of PEM string and base64 of raw DER.
 */
function parseKeyEnv(envValue: string): Buffer {
  try {
    const decoded = Buffer.from(envValue, 'base64').toString('utf-8');
    if (decoded.includes('-----BEGIN')) {
      const cleaned = decoded
        .replace(/-----BEGIN[^-]+-----/, '')
        .replace(/-----END[^-]+-----/, '')
        .replace(/\s/g, '');
      return Buffer.from(cleaned, 'base64');
    }
  } catch {}
  return Buffer.from(envValue, 'base64');
}

/**
 * Import a PEM key for RS256 operations.
 * Keys are stored base64-encoded in env vars.
 */
async function getPrivateKey(): Promise<CryptoKey> {
  const binaryDer = parseKeyEnv(config.jwtSecret());
  const keyData = new Uint8Array(binaryDer);

  return crypto.subtle.importKey(
    'pkcs8',
    keyData,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );
}

async function getPublicKey(): Promise<CryptoKey> {
  const binaryDer = parseKeyEnv(config.jwtPublicKey());
  const keyData = new Uint8Array(binaryDer);

  return crypto.subtle.importKey(
    'spki',
    keyData,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    true,
    ['verify']
  );
}

/**
 * Sign a JWT with RS256.
 * @param payload - The payload to include in the token
 * @param expiresIn - Token expiry in seconds (default: from config)
 * @returns Signed JWT string
 */
export async function signToken(
  payload: Omit<JwtPayload, 'jti' | 'iat' | 'exp'>,
  expiresIn?: number
): Promise<string> {
  const privateKey = await getPrivateKey();
  const jti = uuidv4();
  const ttl = expiresIn || config.jwtExpiresIn;

  const token = await new SignJWT({
    session_id: payload.session_id,
    app_id: payload.app_id,
    scope: payload.scope,
    zk_proof_hash: payload.zk_proof_hash,
    jti,
  })
    .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(`${ttl}s`)
    .setIssuer('zecpass')
    .sign(privateKey);

  return token;
}

/**
 * Verify a JWT and return the decoded payload.
 * @param token - The JWT string to verify
 * @returns Decoded and verified payload
 * @throws TokenExpiredError if the token has expired
 * @throws TokenInvalidError if the token signature is invalid
 */
export async function verifyToken(token: string): Promise<JwtPayload> {
  try {
    const publicKey = await getPublicKey();
    const { payload } = await jwtVerify(token, publicKey, {
      issuer: 'zecpass',
      algorithms: ['RS256'],
    });

    return {
      session_id: payload.session_id as string,
      app_id: payload.app_id as string,
      scope: payload.scope as string[],
      zk_proof_hash: payload.zk_proof_hash as string,
      jti: payload.jti as string,
      iat: payload.iat,
      exp: payload.exp,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message.includes('expired') || error.message.includes('exp')) {
        throw new TokenExpiredError();
      }
    }
    throw new TokenInvalidError();
  }
}

/**
 * Decode a JWT without verification (for reading claims only).
 * @param token - The JWT string to decode
 * @returns Decoded payload or null if invalid format
 */
export function decodeToken(token: string): JwtPayload | null {
  try {
    const payload = decodeJwt(token);
    return {
      session_id: payload.session_id as string,
      app_id: payload.app_id as string,
      scope: payload.scope as string[],
      zk_proof_hash: payload.zk_proof_hash as string,
      jti: payload.jti as string,
      iat: payload.iat,
      exp: payload.exp,
    };
  } catch {
    return null;
  }
}
