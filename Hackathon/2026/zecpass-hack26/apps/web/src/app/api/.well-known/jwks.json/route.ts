/**
 * GET /api/.well-known/jwks.json — Public JWK Set endpoint
 */
import { NextResponse } from 'next/server';
import { exportJWK, importSPKI } from 'jose';

export async function GET() {
  try {
    const publicKeyPem = Buffer.from(process.env.JWT_PUBLIC_KEY || '', 'base64').toString('utf-8');
    const publicKey = await importSPKI(publicKeyPem, 'RS256');
    const jwk = await exportJWK(publicKey);
    jwk.alg = 'RS256';
    jwk.use = 'sig';
    jwk.kid = 'zecpass-primary';
    return NextResponse.json({ keys: [jwk] }, {
      headers: { 'Cache-Control': 'public, max-age=3600' },
    });
  } catch {
    return NextResponse.json({ keys: [] }, { status: 500 });
  }
}
