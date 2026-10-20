// False positives in the link health dashboard: internal routes the app does
// resolve, logos served from the app's public/ folder, and documentation
// placeholders (example.com, localhost). Each was reported as needing
// attention although nothing was wrong.
//
// Run: node --test link-health/false-positives.test.mjs
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("./check-links.mjs", import.meta.url), "utf8");
const between = (from, to) => {
  assert.ok(source.includes(from) && source.includes(to), `marker missing: ${from} / ${to}`);
  return source.slice(source.indexOf(from), source.indexOf(to));
};
const transformUri = new Function(
  between("const LOWERCASE_WORDS", "/** Loose comparison used by the app") + "; return transformUri;",
)();
const { classify, isPlaceholderHost, assetKey } = new Function(
  between("function classify", "/**\n * Routes served by the Next.js app") +
    "; return { classify, isPlaceholderHost, assetKey };",
)();
const site = new URL("../site", import.meta.url).pathname;

test("routes resolve like the app's transformUri (whole segments, Zero to Zero Knowledge)", () => {
  for (const [route, file] of [
    ["/zero-to-zero-knowledge/hash-functions", "/Zero_to_Zero_Knowledge/Hash_Functions"],
    ["/zero-to-zero-knowledge/mnemonic-seed-phrases", "/Zero_to_Zero_Knowledge/Mnemonic_Seed_Phrases"],
    ["/zcash-use-cases/sign-in-with-zcash", "/Zcash_Use_Cases/Sign_in_With_Zcash"],
    ["/using-zcash/zecmap", "/Using_Zcash/Zecmap"],
  ]) {
    assert.equal(transformUri(route), file, route);
    assert.ok(existsSync(`${site}${file}.md`), `site${file}.md should exist`);
  }
});

test("a word list entry never rewrites inside a longer segment", () => {
  assert.equal(transformUri("/using-zcash/zecmap"), "/Using_Zcash/Zecmap"); // not ZECmap
  assert.equal(transformUri("/zcash-tech/zec-faucet"), "/Zcash_Tech/ZEC_Faucet");
  assert.equal(transformUri("/start-here/the-thing"), "/Start_Here/the_Thing");
});

test("files under the app's public/ root are assets, not routes", () => {
  for (const u of ["/changelly.png", "/DCRDEX.jpg", "/loofta-logo.svg", "/a/b/c.webp?x=1", "/doc.pdf#p2"]) {
    assert.equal(classify(u), "asset", u);
  }
  for (const u of ["/zcash-tech/png-guide", "/wallets", "/using-zcash/a.md"]) {
    assert.notEqual(classify(u), "asset", u);
  }
  // The lookup key matches the file in public/ whatever follows it.
  for (const [u, key] of [["/doc.pdf#p2", "/doc.pdf"], ["/a/b/c.webp?x=1", "/a/b/c.webp"],
    ["/content-images/x.webp?v=2#top", "/content-images/x.webp"], ["/changelly.png", "/changelly.png"]]) {
    assert.equal(assetKey(u), key, u);
  }
});

test("documentation placeholders are never probed", () => {
  for (const h of ["example.com", "btcpay.example.com", "EXAMPLE.org", "shop.example", "foo.test",
    "x.invalid", "app.localhost", "localhost", "127.0.0.1", "127.0.1.1", "127.255.255.254", "0.0.0.0", "[::1]"]) {
    assert.equal(isPlaceholderHost(h), true, h);
  }
  for (const h of ["examples.com", "example.co", "zechub.wiki", "myexample.com", "testnet.z.cash", "localhost.run", "127.example.org.uk", "1270.0.0.1"]) {
    assert.equal(isPlaceholderHost(h), false, h);
  }
});
