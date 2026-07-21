export const WINDOW_MS = 10 * 60 * 1000;
export const MAX_SCANS_PER_WINDOW = 5;

export class RateLimiter {
  private readonly hits = new Map<string, number[]>();

  constructor(
    private readonly max = MAX_SCANS_PER_WINDOW,
    private readonly windowMs = WINDOW_MS,
  ) {}

  check(key: string, now: number = Date.now()): boolean {
    const recent = (this.hits.get(key) ?? []).filter((at) => now - at < this.windowMs);

    if (recent.length >= this.max) {
      this.hits.set(key, recent);
      return true;
    }

    recent.push(now);
    this.hits.set(key, recent);
    return false;
  }
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() ?? "unknown";
}
