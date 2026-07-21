import { describe, expect, it } from "vitest";

import { describeInspection } from "@/lib/keycheck";

describe("describeInspection — the browser-side verdict on a key", () => {
  it("blocks a spending key with a cleared-and-not-sent message", () => {
    const v = describeInspection({ kind: "spendingKey" });
    expect(v.blocking).toBe(true);
    expect(v.message).toContain("not sent anywhere");
  });

  it("blocks a malformed key and blames the checksum, not the user", () => {
    const v = describeInspection({ kind: "malformed", detail: "invalid padding" });
    expect(v.blocking).toBe(true);
    expect(v.message).toContain("checksum");
    expect(v.message).toContain("Nothing was sent");
  });

  it("names the wrong network instead of a generic rejection", () => {
    const v = describeInspection({ kind: "wrongNetwork", network: "testnet" });
    expect(v.blocking).toBe(true);
    expect(v.message).toContain("testnet");
  });

  it("a full key passes silently with all pools visible", () => {
    const v = describeInspection({
      kind: "valid",
      orchard: true,
      sapling: true,
      transparent: true,
    });
    expect(v.blocking).toBe(false);
    expect(v.message).toBeNull();
    expect(v.pools).toEqual({ orchard: true, sapling: true, transparent: true });
  });

  it("an Orchard-blind key warns BEFORE the scan that the verdict will be undetermined", () => {
    const v = describeInspection({
      kind: "valid",
      orchard: false,
      sapling: true,
      transparent: false,
    });
    expect(v.blocking).toBe(false);
    expect(v.message).toContain("cannot determine");
    expect(v.pools?.orchard).toBe(false);
  });
});
