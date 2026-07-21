// Per-IP sliding-window limiter for hot auth endpoints. State lives in this
// process's memory, so it does NOT survive across instances on Vercel; treat
// it as a hardening that raises the cost of a single attacker hitting one
// instance, not a guarantee against a distributed flood. A real fortress
// would back this with Redis or Turso, which we deliberately skip for now.

interface Window {
  count: number;
  resetAt: number;
}

const windows = new Map<string, Window>();
let lastCleanupAt = 0;

export interface RateLimitOpts {
  /** Bucket id. Typically `"<route>:<ip>"`. */
  key: string;
  /** Max allowed requests inside the window. */
  max: number;
  /** Window length in milliseconds. */
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function rateLimit(opts: RateLimitOpts): RateLimitResult {
  const now = Date.now();
  cleanupIfDue(now);

  const existing = windows.get(opts.key);
  if (!existing || existing.resetAt <= now) {
    windows.set(opts.key, { count: 1, resetAt: now + opts.windowMs });
    return { allowed: true, remaining: opts.max - 1, retryAfterSeconds: 0 };
  }
  if (existing.count >= opts.max) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }
  existing.count++;
  return { allowed: true, remaining: opts.max - existing.count, retryAfterSeconds: 0 };
}

function cleanupIfDue(now: number) {
  if (now - lastCleanupAt < 60_000) return;
  lastCleanupAt = now;
  for (const [k, w] of windows) {
    if (w.resetAt <= now) windows.delete(k);
  }
}

// Best-effort IP extraction. Vercel sets x-forwarded-for; falls back to a
// constant so behaviour stays deterministic when no header is present.
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0];
    if (first) return first.trim();
  }
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}
