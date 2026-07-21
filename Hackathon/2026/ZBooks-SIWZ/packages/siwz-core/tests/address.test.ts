import { describe, expect, it, beforeAll } from "vitest";
import { parseAddress, isZcashAddress, SiwzError } from "../src/index.js";
import { deriveMainnetP2pkh, deriveTestnetP2pkh, FIXED_PRIV } from "./helpers.js";

let mainnetAddr: string;
let testnetAddr: string;

beforeAll(() => {
  mainnetAddr = deriveMainnetP2pkh(FIXED_PRIV).address;
  testnetAddr = deriveTestnetP2pkh(FIXED_PRIV).address;
});

describe("parseAddress", () => {
  it("parses a mainnet t1 (P2PKH) address derived from a known key", () => {
    const p = parseAddress(mainnetAddr);
    expect(p.type).toBe("p2pkh");
    expect(p.network).toBe("mainnet");
    expect(p.hash).toBeDefined();
    expect(p.hash!.length).toBe(20);
    expect(mainnetAddr.startsWith("t1")).toBe(true);
  });

  it("parses a testnet tm (P2PKH) address", () => {
    const p = parseAddress(testnetAddr);
    expect(p.type).toBe("p2pkh");
    expect(p.network).toBe("testnet");
    expect(testnetAddr.startsWith("tm")).toBe(true);
  });

  it("rejects garbage strings", () => {
    expect(() => parseAddress("definitely-not-an-address")).toThrow(SiwzError);
    expect(() => parseAddress("")).toThrow(SiwzError);
    expect(() => parseAddress("zzz")).toThrow(SiwzError);
  });

  it("rejects a tampered base58check checksum", () => {
    const tampered = mainnetAddr.slice(0, -1) + (mainnetAddr.slice(-1) === "A" ? "B" : "A");
    expect(() => parseAddress(tampered)).toThrow(/checksum/i);
  });

  it("isZcashAddress is a non-throwing boolean form", () => {
    expect(isZcashAddress(mainnetAddr)).toBe(true);
    expect(isZcashAddress("nope")).toBe(false);
  });

  it("rejects unknown HRP for shielded-style strings", () => {
    expect(() => parseAddress("zz1abcdefg")).toThrow(/Unknown address prefix|Malformed/);
  });
});
