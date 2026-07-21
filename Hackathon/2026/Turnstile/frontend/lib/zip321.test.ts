import { describe, expect, it } from "vitest";

import { isValidTopic, subscriptionMemo, zip321Uri } from "@/lib/zip321";

const ADDRESS = "u1zagcmz46wv0l22l34erq0zlslpj59h666g55q6a2tjnqjmrtfe5sqmfdpewn5xrqz728";

function decodeMemo(uri: string) {
  const encoded = new URL(uri.replace("zcash:", "https://")).searchParams.get("memo") ?? "";
  const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(base64, "base64").toString("utf8");
}

describe("zip321Uri — the contract with the Rust memo parser", () => {
  it("encodes a memo that decodes back to exactly what the watcher greps for", () => {
    const uri = zip321Uri(ADDRESS, "ama-zec-alerts");
    expect(decodeMemo(uri)).toBe("TURNSTILE:SUB:ama-zec-alerts");
  });

  it("uses base64url, so the memo survives a URL without escaping", () => {
    const uri = zip321Uri(ADDRESS, "aaaa-bbbb-cccc-dddd");
    const memo = new URL(uri.replace("zcash:", "https://")).searchParams.get("memo") ?? "";

    expect(memo).not.toContain("+");
    expect(memo).not.toContain("/");
    expect(memo).not.toContain("=");
  });

  it("carries the address and the dust amount", () => {
    const uri = zip321Uri(ADDRESS, "topic");
    expect(uri.startsWith(`zcash:${ADDRESS}?`)).toBe(true);
    expect(uri).toContain("amount=0.0001");
  });
});

describe("isValidTopic — must match the Rust parser's accepted set", () => {
  it("accepts letters, digits, hyphen and underscore", () => {
    expect(isValidTopic("ama-zec-alerts")).toBe(true);
    expect(isValidTopic("topic_1")).toBe(true);
    expect(isValidTopic("ABC123")).toBe(true);
  });

  it("rejects a topic that would not be a valid ntfy channel", () => {
    expect(isValidTopic("bad topic")).toBe(false);
    expect(isValidTopic("../etc/passwd")).toBe(false);
    expect(isValidTopic("topic!")).toBe(false);
  });

  it("rejects an empty topic", () => {
    expect(isValidTopic("")).toBe(false);
  });

  it("rejects an overlong topic, as the Rust side does at 64", () => {
    expect(isValidTopic("a".repeat(64))).toBe(true);
    expect(isValidTopic("a".repeat(65))).toBe(false);
  });
});

describe("subscriptionMemo", () => {
  it("carries the prefix the watcher filters on", () => {
    expect(subscriptionMemo("demo")).toBe("TURNSTILE:SUB:demo");
  });
});
