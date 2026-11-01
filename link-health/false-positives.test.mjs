// False positives in the link health dashboard: internal routes the app does
// resolve, logos served from the app's public/ folder, and documentation
// placeholders (example.com, localhost). Each was reported as needing
// attention although nothing was wrong.
//
// Run: node --test link-health/false-positives.test.mjs
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
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

// Run the actual offline CLI: a shorter slug must not inherit a sibling's page.
// Normalized equality is the fallback used by zechub-wiki/authAndFetch.ts.
for (const scope of ["default", "relative subset", "absolute subset"]) {
  test(`route substring rejection preserves valid routes (${scope})`, async () => {
    const dir = await mkdtemp(join(tmpdir(), "zechub-fuzzy-"));
    try {
      const missing = [
        "/zcash-tech/zakura", "/zcash-tech/node", "/zcash-tech/kura-no",
        "/zcash-tech/zakura-node-extra", "/zcash-tech/missing",
        "/other/zakura-node", "/ZCASH-TECH/zakuranode",
      ];
      const valid = ["/zcash-tech/zakura-node", "/", "/wallets"];
      // Absolute --root has a pre-existing relative/absolute fallback mismatch;
      // keep this control on exact routes rather than changing root semantics.
      if (scope !== "absolute subset") valid.push(
        "/zcash-tech/zakuranode", "/zcash-tech/ZAKURA_NODE",
        "/zcash-tech/zakura_node/?a=1#section",
      );
      const files = {
        "site/Zcash_Tech/Index.md": [...valid, ...missing].map((u) => `[link](${u})`).join("\n"),
        "site/Zcash_Tech/Zakura_Node.md": "# Zakura Node\n",
        "deny-fetch.mjs": 'globalThis.fetch = () => { process.exit(97); };\n',
      };
      for (const [name, content] of Object.entries(files)) {
        const path = join(dir, name);
        await mkdir(dirname(path), { recursive: true });
        await writeFile(path, content);
      }
      const args = ["--import", join(dir, "deny-fetch.mjs"),
        fileURLToPath(new URL("./check-links.mjs", import.meta.url)), "--offline",
        "--json", join(dir, "report.json"), "--markdown", join(dir, "report.md")];
      if (scope !== "default") args.push("--root", scope === "relative subset"
        ? "site/Zcash_Tech" : join(dir, "site/Zcash_Tech"));
      const result = spawnSync(process.execPath, args, { cwd: dir, encoding: "utf8", timeout: 15_000 });
      assert.ifError(result.error);
      assert.equal(result.status, 0, result.stderr || result.stdout);
      const report = JSON.parse(await readFile(join(dir, "report.json"), "utf8"));
      assert.equal(report.filesScanned, 2);
      assert.equal(report.linksFound, valid.length + missing.length);
      assert.equal(report.uniqueExternalChecked, 0);
      assert.deepEqual(report.findings.filter((f) => f.kind === "route").map((f) => f.url), missing);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
}
