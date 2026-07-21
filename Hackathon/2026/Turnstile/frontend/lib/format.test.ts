import { describe, expect, it } from "vitest";

import { formatPool, formatZec, truncateKey } from "@/lib/format";
import { VERDICT_COPY } from "@/lib/verdict";

describe("formatPool — an unseen pool must never read as an empty one", () => {
  it("renders a pool the key cannot see as invisible, not as zero", () => {
    expect(formatPool(null)).toBe("not visible to this key");
    expect(formatPool(null)).not.toContain("0");
  });

  it("renders a genuinely empty pool as zero", () => {
    expect(formatPool(0)).toBe("0 ZEC");
  });

  it("renders the real demo balance", () => {
    expect(formatPool(1_176_637)).toBe("0.01176637 ZEC");
  });
});

describe("formatZec", () => {
  it("trims trailing zeros without losing precision", () => {
    expect(formatZec(320_000_000)).toBe("3.2");
    expect(formatZec(100_000_000)).toBe("1");
    expect(formatZec(1)).toBe("0.00000001");
    expect(formatZec(0)).toBe("0");
  });
});

describe("truncateKey", () => {
  it("shortens a key for display without mangling a short one", () => {
    expect(truncateKey("uview1abcdefghijklmnop")).toContain("…");
    expect(truncateKey("short")).toBe("short");
  });
});

describe("verdict copy — the false all-clear must be impossible", () => {
  it("never tells an Orchard-blind key that it is safe", () => {
    const copy = VERDICT_COPY.undetermined;

    expect(copy.headline.toLowerCase()).not.toContain("ready");
    expect(copy.headline.toLowerCase()).not.toContain("safe");
    expect(copy.label.toLowerCase()).not.toContain("ready");
    expect(copy.headline).toContain("cannot see");
  });

  it("tells a wallet with Orchard funds to act", () => {
    expect(VERDICT_COPY.exposed.label).toBe("Action needed");
    expect(VERDICT_COPY.exposed.headline).toContain("Orchard");
  });

  it("does not tell an exposed user their funds are frozen or lost", () => {
    const detail = VERDICT_COPY.exposed.detail.toLowerCase();
    expect(detail).toContain("not frozen");
    expect(detail).toContain("cannot be lost");
  });

  it("gives every verdict a distinct headline", () => {
    const headlines = Object.values(VERDICT_COPY).map((copy) => copy.headline);
    expect(new Set(headlines).size).toBe(headlines.length);
  });
});
