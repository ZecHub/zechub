import { describe, expect, it } from "vitest";
import { secp256k1 } from "@noble/curves/secp256k1";
import { SiwzMessage, verifyMessage, verifyTransparentSignature } from "../src/index.js";
import { signForTest } from "./helpers.js";

describe("verifyTransparentSignature (round-trip)", () => {
  const message = "Hello, Zcash!";

  it("verifies a freshly-signed message (compressed pubkey)", () => {
    const priv = secp256k1.utils.randomPrivateKey();
    const { signatureBase64, address } = signForTest(priv, message, true);
    const result = verifyTransparentSignature(message, signatureBase64, address);
    expect(result.valid).toBe(true);
    expect(result.address).toBe(address);
    expect(result.addressType).toBe("p2pkh");
  });

  it("verifies a freshly-signed message (uncompressed pubkey)", () => {
    const priv = secp256k1.utils.randomPrivateKey();
    const { signatureBase64, address } = signForTest(priv, message, false);
    const result = verifyTransparentSignature(message, signatureBase64, address);
    expect(result.valid).toBe(true);
  });

  it("rejects a signature for a different message", () => {
    const priv = secp256k1.utils.randomPrivateKey();
    const { signatureBase64, address } = signForTest(priv, "original");
    const result = verifyTransparentSignature("tampered", signatureBase64, address);
    expect(result.valid).toBe(false);
    expect(result.error).toBe("ADDRESS_MISMATCH");
  });

  it("rejects a signature for the wrong address", () => {
    const priv1 = secp256k1.utils.randomPrivateKey();
    const priv2 = secp256k1.utils.randomPrivateKey();
    const { signatureBase64 } = signForTest(priv1, "hi");
    const { address: addr2 } = signForTest(priv2, "hi");
    const result = verifyTransparentSignature("hi", signatureBase64, addr2);
    expect(result.valid).toBe(false);
    expect(result.error).toBe("ADDRESS_MISMATCH");
  });

  it("rejects a malformed signature length", () => {
    const priv = secp256k1.utils.randomPrivateKey();
    const { address } = signForTest(priv, "hi");
    const result = verifyTransparentSignature("hi", "AAAA", address);
    expect(result.valid).toBe(false);
    expect(result.error).toBe("INVALID_SIGNATURE");
  });
});

describe("verifyMessage (full SIWZ flow)", () => {
  it("verifies a complete SIWZ message end-to-end", async () => {
    const priv = secp256k1.utils.randomPrivateKey();
    const { address } = signForTest(priv, "dummy");
    const msg = new SiwzMessage({
      domain: "demo.siwz.dev",
      address,
      uri: "https://demo.siwz.dev",
      network: "mainnet",
      nonce: "n0nce12345abc",
      issuedAt: "2026-05-25T10:00:00Z",
      expirationTime: "2099-01-01T00:00:00Z",
      statement: "Sign in to the demo",
    });
    const wire = msg.toString();
    const { signatureBase64 } = signForTest(priv, wire);

    const result = await verifyMessage(wire, signatureBase64, {
      expectedDomain: "demo.siwz.dev",
      expectedNonce: "n0nce12345abc",
    });
    expect(result.valid).toBe(true);
  });

  it("rejects when expected domain doesn't match", async () => {
    const priv = secp256k1.utils.randomPrivateKey();
    const { address } = signForTest(priv, "dummy");
    const msg = new SiwzMessage({
      domain: "evil.com",
      address,
      uri: "https://evil.com",
      network: "mainnet",
      nonce: "n0nce12345abc",
      issuedAt: "2026-05-25T10:00:00Z",
    });
    const { signatureBase64 } = signForTest(priv, msg.toString());
    const result = await verifyMessage(msg.toString(), signatureBase64, {
      expectedDomain: "demo.siwz.dev",
    });
    expect(result.valid).toBe(false);
    expect(result.error).toBe("DOMAIN_MISMATCH");
  });

  it("rejects when expected nonce doesn't match", async () => {
    const priv = secp256k1.utils.randomPrivateKey();
    const { address } = signForTest(priv, "dummy");
    const msg = new SiwzMessage({
      domain: "demo.siwz.dev",
      address,
      uri: "https://demo.siwz.dev",
      network: "mainnet",
      nonce: "actualNonce123",
      issuedAt: "2026-05-25T10:00:00Z",
    });
    const { signatureBase64 } = signForTest(priv, msg.toString());
    const result = await verifyMessage(msg.toString(), signatureBase64, {
      expectedNonce: "differentNonce",
    });
    expect(result.valid).toBe(false);
    expect(result.error).toBe("NONCE_MISMATCH");
  });

  it("rejects an expired message", async () => {
    const priv = secp256k1.utils.randomPrivateKey();
    const { address } = signForTest(priv, "dummy");
    const msg = new SiwzMessage({
      domain: "demo.siwz.dev",
      address,
      uri: "https://demo.siwz.dev",
      network: "mainnet",
      nonce: "n0nce12345abc",
      issuedAt: "2026-05-25T10:00:00Z",
      expirationTime: "2026-05-25T10:05:00Z",
    });
    const { signatureBase64 } = signForTest(priv, msg.toString());
    const result = await verifyMessage(msg.toString(), signatureBase64, {
      now: new Date("2026-05-25T10:10:00Z"),
    });
    expect(result.valid).toBe(false);
    expect(result.error).toBe("EXPIRED");
  });
});
