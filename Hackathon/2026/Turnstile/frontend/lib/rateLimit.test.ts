import { describe, expect, it } from "vitest";

import { RateLimiter, clientIp } from "@/lib/rateLimit";

describe("RateLimiter", () => {
  it("allows exactly the budget, then blocks", () => {
    const limiter = new RateLimiter(5, 1000);

    for (let i = 0; i < 5; i++) {
      expect(limiter.check("ip", 0)).toBe(false);
    }
    expect(limiter.check("ip", 0)).toBe(true);
  });

  it("counts each address independently", () => {
    const limiter = new RateLimiter(1, 1000);

    expect(limiter.check("a", 0)).toBe(false);
    expect(limiter.check("b", 0)).toBe(false);
    expect(limiter.check("a", 0)).toBe(true);
  });

  it("forgets hits once the window has passed", () => {
    const limiter = new RateLimiter(1, 1000);

    expect(limiter.check("ip", 0)).toBe(false);
    expect(limiter.check("ip", 500)).toBe(true);
    expect(limiter.check("ip", 1001)).toBe(false);
  });

  it("does not consume budget when it blocks — a blocked caller is not punished further", () => {
    const limiter = new RateLimiter(1, 10_000);

    expect(limiter.check("ip", 0)).toBe(false);
    limiter.check("ip", 1);
    limiter.check("ip", 2);

    expect(limiter.check("ip", 9_500)).toBe(true);
    expect(limiter.check("ip", 10_001)).toBe(false);
  });
});

describe("clientIp", () => {
  it("takes the first hop of x-forwarded-for", () => {
    const request = new Request("http://x", {
      headers: { "x-forwarded-for": "203.0.113.1, 10.0.0.1" },
    });
    expect(clientIp(request)).toBe("203.0.113.1");
  });

  it("falls back to a constant when the header is absent", () => {
    expect(clientIp(new Request("http://x"))).toBe("unknown");
  });
});
