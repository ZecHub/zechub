/**
 * @module lib/auth-middleware
 * Reusable authentication HOCs for Next.js API routes.
 * Provides withAuth (user session) and withAppAuth (app_id + app_secret) wrappers.
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './jwt';
import { connectDB } from './mongodb';
import { App } from '@/models/App';
import { Session } from '@/models/Session';
import type { JwtPayload } from '@/types/auth';

/** Authenticated request handler with session data */
type AuthenticatedHandler = (
  request: NextRequest,
  context: { session: JwtPayload; params?: Record<string, string> }
) => Promise<NextResponse>;

/** App-authenticated request handler */
type AppAuthenticatedHandler = (
  request: NextRequest,
  context: { app_id: string; params?: Record<string, string> }
) => Promise<NextResponse>;

/**
 * Higher-order function that wraps an API route handler with user session authentication.
 * Extracts and verifies the Bearer token from the Authorization header.
 * Returns 401 if no token, expired, invalid, or session revoked.
 *
 * @param handler - The route handler to protect
 * @returns Wrapped handler that validates authentication first
 */
export function withAuth(handler: AuthenticatedHandler) {
  return async (
    request: NextRequest,
    routeContext?: { params?: Promise<Record<string, string>> }
  ): Promise<NextResponse> => {
    try {
      // Extract Bearer token
      const authHeader = request.headers.get('authorization');
      const cookieToken = request.cookies.get('zecpass_token')?.value;
      const token = authHeader?.startsWith('Bearer ')
        ? authHeader.slice(7)
        : cookieToken;

      if (!token) {
        return NextResponse.json(
          { error: 'Authentication required. Provide a Bearer token or session cookie.' },
          { status: 401 }
        );
      }

      // Verify JWT
      const payload = await verifyToken(token);

      // Verify session is still active in DB
      await connectDB();
      const session = await Session.findOne({
        jwt_jti: payload.jti,
        revoked: false,
      });

      if (!session || !session.isValid()) {
        return NextResponse.json(
          { error: 'Session has been revoked or expired.' },
          { status: 401 }
        );
      }

      // Update last_used_at
      session.last_used_at = new Date();
      await session.save();

      const params = routeContext?.params ? await routeContext.params : undefined;

      return handler(request, { session: payload, params });
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'TokenExpiredError') {
          return NextResponse.json(
            { error: 'Token has expired. Please re-authenticate.' },
            { status: 401 }
          );
        }
        if (error.name === 'TokenInvalidError') {
          return NextResponse.json(
            { error: 'Invalid token. Please re-authenticate.' },
            { status: 401 }
          );
        }
      }

      return NextResponse.json(
        { error: 'Authentication failed.' },
        { status: 401 }
      );
    }
  };
}

/**
 * Higher-order function that wraps an API route handler with app authentication.
 * Validates app_id and app_secret from request headers.
 * Returns 401 if credentials are missing or invalid.
 *
 * @param handler - The route handler to protect
 * @returns Wrapped handler that validates app credentials first
 */
export function withAppAuth(handler: AppAuthenticatedHandler) {
  return async (
    request: NextRequest,
    routeContext?: { params?: Promise<Record<string, string>> }
  ): Promise<NextResponse> => {
    try {
      const app_id = request.headers.get('x-app-id');
      const app_secret = request.headers.get('x-app-secret');

      if (!app_id || !app_secret) {
        return NextResponse.json(
          { error: 'App authentication required. Provide X-App-Id and X-App-Secret headers.' },
          { status: 401 }
        );
      }

      await connectDB();
      const app = await App.findOne({ app_id, active: true });

      if (!app) {
        return NextResponse.json(
          { error: 'App not found or inactive.' },
          { status: 401 }
        );
      }

      const isValid = await app.verifySecret(app_secret);
      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid app secret.' },
          { status: 401 }
        );
      }

      const params = routeContext?.params ? await routeContext.params : undefined;

      return handler(request, { app_id, params });
    } catch {
      return NextResponse.json(
        { error: 'App authentication failed.' },
        { status: 401 }
      );
    }
  };
}
