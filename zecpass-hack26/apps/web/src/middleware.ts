/**
 * Next.js Middleware — protects routes and manages auth
 */
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_PATHS = [
  '/api/auth/challenge',
  '/api/auth/verify',
  '/api/badges/verify',
  '/api/.well-known',
  '/api/webhook/memo',
];

const PROTECTED_API_PATHS = ['/api/apps', '/api/badges/issue'];
const PROTECTED_PAGE_PATHS = ['/dashboard'];

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p));
}

function isStaticOrAsset(pathname: string): boolean {
  return pathname.startsWith('/_next') || pathname.startsWith('/favicon') || pathname.includes('.');
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isStaticOrAsset(pathname) || pathname === '/' || pathname.startsWith('/auth') || pathname.startsWith('/developer')) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api/auth/session') || pathname.startsWith('/api/auth/logout')) {
    return NextResponse.next(); // These handle their own auth
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // Protected pages — check cookie
  if (PROTECTED_PAGE_PATHS.some((p) => pathname.startsWith(p))) {
    const token = request.cookies.get('zecpass_token')?.value;
    if (!token) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    try {
      const envValue = process.env.JWT_PUBLIC_KEY || '';
      let binaryDer = Buffer.from(envValue, 'base64');
      try {
        const decoded = binaryDer.toString('utf-8');
        if (decoded.includes('-----BEGIN')) {
          const cleaned = decoded
            .replace(/-----BEGIN[^-]+-----/, '')
            .replace(/-----END[^-]+-----/, '')
            .replace(/\s/g, '');
          binaryDer = Buffer.from(cleaned, 'base64');
        }
      } catch {}
      const publicKey = await crypto.subtle.importKey('spki', new Uint8Array(binaryDer), { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, true, ['verify']);
      await jwtVerify(token, publicKey, { issuer: 'zecpass', algorithms: ['RS256'] });
      return NextResponse.next();
    } catch {
      const loginUrl = new URL('/auth/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protected API routes — handled by withAuth/withAppAuth in route handlers
  return NextResponse.next();
}

export const config_mw = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

export { config_mw as config };
