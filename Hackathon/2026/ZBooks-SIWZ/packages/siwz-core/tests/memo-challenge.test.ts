import { describe, expect, it, beforeAll } from "vitest";
import { issueMemoChallenge, verifyMemoChallenge, parseZip321, zecToZatoshi, inferMemoChallengeMode } from "../src/index.js";
import { deriveMainnetP2pkh, FIXED_PRIV } from "./helpers.js";

let serviceAddress: string;
const SECRET = "test-secret-must-be-at-least-16-chars";

beforeAll(() => {
  serviceAddress = deriveMainnetP2pkh(FIXED_PRIV).address;
});

describe("inferMemoChallengeMode", () => {
  it("transparent t-addr → transparent-amount", () => {
    expect(inferMemoChallengeMode(serviceAddress)).toBe("transparent-amount");
  });
});

describe("issueMemoChallenge shielded-memo mode", () => {
  // Forced mode is used because tests don't have a real z-addr to derive.
  it("emits a memo + dust amount + ZIP 321 URI with memo embedded", async () => {
    const ch = await issueMemoChallenge({
      secret: SECRET,
      serviceAddress, // transparent, but mode override forces shielded
      network: "mainnet",
      mode: "shielded-memo",
      identity: "user-claimed-id",
    });
    expect(ch.mode).toBe("shielded-memo");
    expect(ch.memo).toMatch(/^SIWZ:[A-Za-z0-9]{12}$/);
    expect(ch.amountZec).toBe("0.000001");
    const parsedUri = parseZip321(ch.uri);
    expect(parsedUri.memo).toBe(ch.memo);
    expect(parsedUri.amount).toBe("0.000001");
  });

  it("round-trip verify succeeds with matching memo", async () => {
    const ch = await issueMemoChallenge({
      secret: SECRET, serviceAddress, network: "mainnet",
      mode: "shielded-memo", identity: "alice",
    });
    const res = await verifyMemoChallenge({
      secret: SECRET,
      token: ch.token,
      observedRecipient: serviceAddress,
      observedMemo: ch.memo!,
    });
    expect(res.ok).toBe(true);
    expect(res.identity).toBe("alice");
    expect(res.mode).toBe("shielded-memo");
  });

  it("rejects memo with wrong nonce", async () => {
    const ch = await issueMemoChallenge({
      secret: SECRET, serviceAddress, network: "mainnet",
      mode: "shielded-memo", identity: "alice",
    });
    const res = await verifyMemoChallenge({
      secret: SECRET,
      token: ch.token,
      observedRecipient: serviceAddress,
      observedMemo: "SIWZ:totallyDifferentNonce123",
    });
    expect(res.ok).toBe(false);
    expect(res.error).toBe("MEMO_MISMATCH");
  });

  it("rejects memo without SIWZ: prefix", async () => {
    const ch = await issueMemoChallenge({
      secret: SECRET, serviceAddress, network: "mainnet",
      mode: "shielded-memo", identity: "alice",
    });
    const res = await verifyMemoChallenge({
      secret: SECRET,
      token: ch.token,
      observedRecipient: serviceAddress,
      observedMemo: "hello from alice",
    });
    expect(res.ok).toBe(false);
    expect(res.error).toBe("MEMO_MISMATCH");
  });

  it("rejects when observedMemo missing", async () => {
    const ch = await issueMemoChallenge({
      secret: SECRET, serviceAddress, network: "mainnet",
      mode: "shielded-memo", identity: "alice",
    });
    const res = await verifyMemoChallenge({
      secret: SECRET,
      token: ch.token,
      observedRecipient: serviceAddress,
    });
    expect(res.ok).toBe(false);
    expect(res.error).toBe("MISSING_OBSERVATION");
  });

  it("rejects when observedAmount provided for shielded-memo (mode binding)", async () => {
    const ch = await issueMemoChallenge({
      secret: SECRET, serviceAddress, network: "mainnet",
      mode: "shielded-memo", identity: "alice",
    });
    const res = await verifyMemoChallenge({
      secret: SECRET,
      token: ch.token,
      observedRecipient: serviceAddress,
      observedAmountZatoshi: ch.amountZatoshi,
    });
    expect(res.ok).toBe(false);
    expect(res.error).toBe("MISSING_OBSERVATION");
  });
});

describe("issueMemoChallenge / verifyMemoChallenge", () => {
  it("issues a challenge with a ZIP 321 URI and a token", async () => {
    const ch = await issueMemoChallenge({
      secret: SECRET,
      serviceAddress,
      network: "mainnet",
      identity: "user-claimed-id",
    });
    expect(ch.uri).toMatch(/^zcash:t1/);
    expect(ch.token.split(".").length).toBe(2);
    expect(ch.amountZec).toMatch(/^0\.\d+$/);
    expect(BigInt(ch.amountZatoshi)).toBeGreaterThanOrEqual(zecToZatoshi("0.000001"));
    // Base + 3-digit nonce stays at or below 1099 zatoshi.
    expect(BigInt(ch.amountZatoshi)).toBeLessThanOrEqual(zecToZatoshi("0.000011"));
  });

  it("accepts anonymous (no identity) and assigns a server-generated one", async () => {
    const ch = await issueMemoChallenge({
      secret: SECRET, serviceAddress, network: "mainnet",
    });
    const verify = await verifyMemoChallenge({
      secret: SECRET,
      token: ch.token,
      observedAmountZatoshi: ch.amountZatoshi,
      observedRecipient: serviceAddress,
    });
    expect(verify.ok).toBe(true);
    expect(verify.identity).toMatch(/^anon:[0-9a-f]+$/);
  });

  it("amount embedded in URI matches amountZec", async () => {
    const ch = await issueMemoChallenge({
      secret: SECRET,
      serviceAddress,
      network: "mainnet",
      identity: "u",
    });
    const parsed = parseZip321(ch.uri);
    expect(parsed.amount).toBe(ch.amountZec);
    expect(parsed.address).toBe(serviceAddress);
  });

  it("each issuance gets a near-unique amount (low collision rate)", async () => {
    // 3-digit nonce (0-999) over 25 draws: expected collisions ~0.3.
    const amounts = new Set<string>();
    for (let i = 0; i < 25; i++) {
      const ch = await issueMemoChallenge({
        secret: SECRET, serviceAddress, network: "mainnet", identity: "u",
      });
      amounts.add(ch.amountZec);
    }
    expect(amounts.size).toBeGreaterThanOrEqual(22);
  });

  it("round-trip verify succeeds with matching observation", async () => {
    const ch = await issueMemoChallenge({
      secret: SECRET, serviceAddress, network: "mainnet", identity: "alice@zbooks",
    });
    const result = await verifyMemoChallenge({
      secret: SECRET,
      token: ch.token,
      observedAmountZatoshi: ch.amountZatoshi,
      observedRecipient: serviceAddress,
    });
    expect(result.ok).toBe(true);
    expect(result.identity).toBe("alice@zbooks");
  });

  it("rejects when amount differs by even 1 zatoshi", async () => {
    const ch = await issueMemoChallenge({
      secret: SECRET, serviceAddress, network: "mainnet", identity: "u",
    });
    const off = (BigInt(ch.amountZatoshi) + 1n).toString();
    const result = await verifyMemoChallenge({
      secret: SECRET,
      token: ch.token,
      observedAmountZatoshi: off,
      observedRecipient: serviceAddress,
    });
    expect(result.ok).toBe(false);
    expect(result.error).toBe("AMOUNT_MISMATCH");
  });

  it("rejects when recipient address differs", async () => {
    const ch = await issueMemoChallenge({
      secret: SECRET, serviceAddress, network: "mainnet", identity: "u",
    });
    const other = deriveMainnetP2pkh(new Uint8Array(32).fill(8)).address;
    const result = await verifyMemoChallenge({
      secret: SECRET,
      token: ch.token,
      observedAmountZatoshi: ch.amountZatoshi,
      observedRecipient: other,
    });
    expect(result.ok).toBe(false);
    expect(result.error).toBe("RECIPIENT_MISMATCH");
  });

  it("rejects on HMAC mismatch (forged token)", async () => {
    const ch = await issueMemoChallenge({
      secret: SECRET, serviceAddress, network: "mainnet", identity: "u",
    });
    const [payload, _sig] = ch.token.split(".");
    const tampered = `${payload}.AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`;
    const result = await verifyMemoChallenge({
      secret: SECRET,
      token: tampered,
      observedAmountZatoshi: ch.amountZatoshi,
      observedRecipient: serviceAddress,
    });
    expect(result.ok).toBe(false);
    expect(result.error).toBe("BAD_SIGNATURE");
  });

  it("rejects expired challenges", async () => {
    const ch = await issueMemoChallenge({
      secret: SECRET, serviceAddress, network: "mainnet", identity: "u",
      ttlSeconds: 1,
    });
    const future = new Date(Date.now() + 5_000);
    const result = await verifyMemoChallenge({
      secret: SECRET,
      token: ch.token,
      observedAmountZatoshi: ch.amountZatoshi,
      observedRecipient: serviceAddress,
      now: future,
    });
    expect(result.ok).toBe(false);
    expect(result.error).toBe("EXPIRED");
  });
});
