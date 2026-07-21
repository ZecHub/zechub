import { describe, expect, it } from "vitest";
import { issueSiwzJwt, verifySiwzJwt, SiwzError } from "../src/index.js";

const SECRET = "test-secret-must-be-at-least-16-chars";
const OTHER_SECRET = "another-test-secret-also-16+chars-long";

describe("issueSiwzJwt", () => {
  it("returns a compact-form JWT", async () => {
    const token = await issueSiwzJwt({ sub: "t1abc" }, { secret: SECRET });
    expect(token.split(".")).toHaveLength(3);
  });

  it("rejects short secrets", async () => {
    await expect(
      issueSiwzJwt({ sub: "t1abc" }, { secret: "short" }),
    ).rejects.toThrow(/>= 16 chars/);
  });

  it("rejects missing sub claim", async () => {
    await expect(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      issueSiwzJwt({} as any, { secret: SECRET }),
    ).rejects.toThrow(/sub claim is required/);
  });

  it("auto-fills iat, exp, jti", async () => {
    const token = await issueSiwzJwt({ sub: "t1abc" }, { secret: SECRET });
    const claims = await verifySiwzJwt(token, { secret: SECRET });
    expect(typeof claims.iat).toBe("number");
    expect(typeof claims.exp).toBe("number");
    expect(typeof claims.jti).toBe("string");
    expect(claims.exp! > claims.iat!).toBe(true);
  });

  it("respects ttlSeconds", async () => {
    const token = await issueSiwzJwt(
      { sub: "t1abc" },
      { secret: SECRET, ttlSeconds: 60 },
    );
    const claims = await verifySiwzJwt(token, { secret: SECRET });
    expect(claims.exp! - claims.iat!).toBe(60);
  });

  it("skips auto-exp when ttlSeconds is 0", async () => {
    const token = await issueSiwzJwt(
      { sub: "t1abc" },
      { secret: SECRET, ttlSeconds: 0 },
    );
    const claims = await verifySiwzJwt(token, { secret: SECRET });
    expect(claims.exp).toBeUndefined();
  });

  it("carries arbitrary extra claims", async () => {
    const token = await issueSiwzJwt(
      { sub: "t1abc", iss: "zbooks", aud: "laravel-backend", flow: "memo" },
      { secret: SECRET },
    );
    const claims = await verifySiwzJwt(token, { secret: SECRET });
    expect(claims.iss).toBe("zbooks");
    expect(claims.aud).toBe("laravel-backend");
    expect(claims.flow).toBe("memo");
  });
});

describe("verifySiwzJwt", () => {
  it("round-trips a fresh token", async () => {
    const token = await issueSiwzJwt({ sub: "t1abc" }, { secret: SECRET });
    const claims = await verifySiwzJwt(token, { secret: SECRET });
    expect(claims.sub).toBe("t1abc");
  });

  it("rejects a token signed with a different secret", async () => {
    const token = await issueSiwzJwt({ sub: "t1abc" }, { secret: SECRET });
    await expect(
      verifySiwzJwt(token, { secret: OTHER_SECRET }),
    ).rejects.toThrow(/signature mismatch/);
  });

  it("rejects a tampered payload", async () => {
    const token = await issueSiwzJwt({ sub: "t1abc" }, { secret: SECRET });
    const [h, _p, s] = token.split(".");
    const evilPayload = Buffer.from(JSON.stringify({ sub: "t1evil" })).toString("base64url");
    const tampered = `${h}.${evilPayload}.${s}`;
    await expect(verifySiwzJwt(tampered, { secret: SECRET })).rejects.toThrow(
      /signature mismatch/,
    );
  });

  it("rejects an expired token", async () => {
    // Issue with past exp by hand-crafting the claim.
    const token = await issueSiwzJwt(
      { sub: "t1abc", exp: Math.floor(Date.now() / 1000) - 600 },
      { secret: SECRET, ttlSeconds: 0 },
    );
    await expect(verifySiwzJwt(token, { secret: SECRET })).rejects.toThrow(/expired/i);
  });

  it("rejects a token with iat in the future", async () => {
    const token = await issueSiwzJwt(
      { sub: "t1abc", iat: Math.floor(Date.now() / 1000) + 600 },
      { secret: SECRET, ttlSeconds: 0 },
    );
    await expect(verifySiwzJwt(token, { secret: SECRET })).rejects.toThrow(/iat in the future/i);
  });

  it("rejects audience mismatch", async () => {
    const token = await issueSiwzJwt(
      { sub: "t1abc", aud: "backend-a" },
      { secret: SECRET },
    );
    await expect(
      verifySiwzJwt(token, { secret: SECRET, audience: "backend-b" }),
    ).rejects.toThrow(/audience does not include backend-b/);
  });

  it("accepts audience match when aud is a string array", async () => {
    const token = await issueSiwzJwt(
      { sub: "t1abc", aud: ["backend-a", "backend-b"] },
      { secret: SECRET },
    );
    const claims = await verifySiwzJwt(token, { secret: SECRET, audience: "backend-b" });
    expect(claims.sub).toBe("t1abc");
  });

  it("rejects issuer mismatch", async () => {
    const token = await issueSiwzJwt(
      { sub: "t1abc", iss: "zbooks" },
      { secret: SECRET },
    );
    await expect(
      verifySiwzJwt(token, { secret: SECRET, issuer: "zecwall" }),
    ).rejects.toThrow(/issuer mismatch/);
  });

  it("rejects a malformed token", async () => {
    await expect(verifySiwzJwt("not.a.jwt.extra", { secret: SECRET })).rejects.toThrow(
      /Malformed JWT/,
    );
  });

  it("throws a SiwzError with the right code on bad signature", async () => {
    const token = await issueSiwzJwt({ sub: "t1abc" }, { secret: SECRET });
    try {
      await verifySiwzJwt(token, { secret: OTHER_SECRET });
      throw new Error("should have thrown");
    } catch (err) {
      expect(err).toBeInstanceOf(SiwzError);
      expect((err as SiwzError).code).toBe("INVALID_SIGNATURE");
    }
  });
});
