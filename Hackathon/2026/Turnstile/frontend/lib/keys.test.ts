import { describe, expect, it } from "vitest";

import { inspectKey, isSeedPhrase } from "@/lib/keys";

describe("inspectKey — the guard that must never regress", () => {
  it("accepts a unified full viewing key", () => {
    expect(inspectKey("uview1abc")).toBeNull();
  });

  it("tolerates whitespace and case from a clipboard paste", () => {
    expect(inspectKey("  UVIEW1ABC  ")).toBeNull();
  });

  it("refuses a sapling extended spending key", () => {
    expect(inspectKey("secret-extended-key-main1abc")).toBe("spending-key");
  });

  it("refuses a sapling extended viewing key, which cannot see Orchard", () => {
    expect(inspectKey("zxviews1abc")).toBe("spending-key");
  });

  it("refuses a unified spending key", () => {
    expect(inspectKey("uskmain1abc")).toBe("spending-key");
  });

  it("refuses a spending key regardless of case", () => {
    expect(inspectKey("SECRET-EXTENDED-KEY-MAIN1ABC")).toBe("spending-key");
    expect(inspectKey("ZXViews1abc")).toBe("spending-key");
  });

  it("refuses anything that is not a viewing key", () => {
    expect(inspectKey("t1LHXjoWpjhYk1r1b7DT3E3h64pdg8hA8Ha")).toBe("not-a-ufvk");
    expect(inspectKey("u1zagcmz46wv0l22")).toBe("not-a-ufvk");
    expect(inspectKey("hello")).toBe("not-a-ufvk");
  });

  it("refuses an empty field", () => {
    expect(inspectKey("")).toBe("empty");
    expect(inspectKey("   ")).toBe("empty");
  });

  it("never mistakes a payment address for a viewing key", () => {
    const unifiedAddress =
      "u1zagcmz46wv0l22l34erq0zlslpj59h666g55q6a2tjnqjmrtfe5sqmfdpewn5xrqz728rz3fkvxpqfyn220f9rgn852nfy9xvu89cksq";
    expect(inspectKey(unifiedAddress)).toBe("not-a-ufvk");
  });
});

describe("isSeedPhrase — catch it before it is ever sent", () => {
  it("detects a 24-word seed phrase", () => {
    const seed = Array(24).fill("abandon").join(" ");
    expect(isSeedPhrase(seed)).toBe(true);
  });

  it("detects a 12-word seed phrase", () => {
    expect(isSeedPhrase(Array(12).fill("abandon").join(" "))).toBe(true);
  });

  it("tolerates ragged spacing", () => {
    expect(isSeedPhrase(`  ${Array(12).fill("abandon").join("   ")}  `)).toBe(true);
  });

  it("does not flag a viewing key as a seed phrase", () => {
    expect(isSeedPhrase("uview1abc")).toBe(false);
  });

  it("does not flag short prose", () => {
    expect(isSeedPhrase("check my wallet please")).toBe(false);
  });
});
