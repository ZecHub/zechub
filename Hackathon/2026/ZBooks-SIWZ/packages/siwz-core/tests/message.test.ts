import { describe, expect, it, beforeAll } from "vitest";
import { SiwzMessage, generateNonce } from "../src/index.js";
import { deriveMainnetP2pkh, deriveTestnetP2pkh, FIXED_PRIV } from "./helpers.js";

let mainnetAddr: string;
let testnetAddr: string;

beforeAll(() => {
  mainnetAddr = deriveMainnetP2pkh(FIXED_PRIV).address;
  testnetAddr = deriveTestnetP2pkh(FIXED_PRIV).address;
});

function baseFields() {
  return {
    domain: "example.com",
    address: mainnetAddr,
    uri: "https://example.com/login",
    network: "mainnet" as const,
    nonce: "abc12345xyz",
    issuedAt: "2026-05-25T10:00:00Z",
  };
}

describe("SiwzMessage", () => {
  it("renders a minimal message", () => {
    const m = new SiwzMessage(baseFields());
    expect(m.toString()).toBe(
      [
        `example.com wants you to sign in with your Zcash account:`,
        mainnetAddr,
        ``,
        `URI: https://example.com/login`,
        `Version: 1`,
        `Network: mainnet`,
        `Nonce: abc12345xyz`,
        `Issued At: 2026-05-25T10:00:00Z`,
      ].join("\n"),
    );
  });

  it("renders a full message with statement and resources", () => {
    const m = new SiwzMessage({
      ...baseFields(),
      statement: "I accept the ToS at https://example.com/tos",
      expirationTime: "2026-05-25T11:00:00Z",
      notBefore: "2026-05-25T10:00:00Z",
      requestId: "req-42",
      resources: ["https://example.com/api", "https://example.com/data"],
    });
    const s = m.toString();
    expect(s).toContain("\n\nI accept the ToS at https://example.com/tos\n\n");
    expect(s).toContain("Expiration Time: 2026-05-25T11:00:00Z");
    expect(s).toContain("Not Before: 2026-05-25T10:00:00Z");
    expect(s).toContain("Request ID: req-42");
    expect(s).toContain("Resources:\n- https://example.com/api\n- https://example.com/data");
  });

  it("round-trips: toString → parse → toString", () => {
    const m = new SiwzMessage({
      ...baseFields(),
      statement: "I accept the ToS",
      expirationTime: "2026-05-25T11:00:00Z",
      resources: ["https://example.com/a"],
    });
    const parsed = SiwzMessage.parse(m.toString());
    expect(parsed.toString()).toBe(m.toString());
    expect(parsed.statement).toBe("I accept the ToS");
    expect(parsed.resources).toEqual(["https://example.com/a"]);
  });

  it("rejects invalid domain", () => {
    expect(() => new SiwzMessage({ ...baseFields(), domain: "bad domain" })).toThrow(/Invalid domain/);
  });

  it("rejects short nonce", () => {
    expect(() => new SiwzMessage({ ...baseFields(), nonce: "abc" })).toThrow(/Nonce/);
  });

  it("rejects mismatched network (address on mainnet, msg claims testnet)", () => {
    expect(() => new SiwzMessage({ ...baseFields(), network: "testnet" })).toThrow(/mainnet|testnet/);
  });

  it("accepts a real testnet address with network=testnet", () => {
    expect(
      () => new SiwzMessage({ ...baseFields(), address: testnetAddr, network: "testnet" }),
    ).not.toThrow();
  });

  it("detects expiration", () => {
    const m = new SiwzMessage({
      ...baseFields(),
      expirationTime: "2020-01-01T00:00:00Z",
    });
    expect(m.checkTimeValidity(new Date("2026-05-25"))).toBe("EXPIRED");
  });

  it("detects not-yet-valid", () => {
    const m = new SiwzMessage({
      ...baseFields(),
      notBefore: "2099-01-01T00:00:00Z",
    });
    expect(m.checkTimeValidity(new Date("2026-05-25"))).toBe("NOT_YET_VALID");
  });

  it("generates unique nonces of correct length & charset", () => {
    const n1 = generateNonce();
    const n2 = generateNonce();
    expect(n1).toHaveLength(16);
    expect(n2).toHaveLength(16);
    expect(n1).not.toBe(n2);
    expect(n1).toMatch(/^[A-Za-z0-9]+$/);
  });

  it("rejects nonce length < 8", () => {
    expect(() => generateNonce(4)).toThrow();
  });
});
