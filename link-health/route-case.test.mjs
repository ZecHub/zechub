// Route resolution must match what the wiki actually serves, including folder
// case: the scan runs on case-insensitive filesystems too (macOS, Windows), where
// a plain existsSync would accept a wrongly-cased folder the live site 404s on.
// These run the real script in --offline mode against a throwaway content tree.
//
// Run: node --test link-health/route-case.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtemp, mkdir, writeFile, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const script = fileURLToPath(new URL("./check-links.mjs", import.meta.url));

async function scan(files, root = "site") {
  const cwd = await mkdtemp(join(tmpdir(), "zechub-route-test-"));
  try {
    for (const [path, content] of Object.entries(files)) {
      await mkdir(dirname(join(cwd, path)), { recursive: true });
      await writeFile(join(cwd, path), content);
    }
    execFileSync(process.execPath, [script, "--offline", "--root", root], {
      cwd,
      timeout: 10000,
      stdio: "pipe",
    });
    return JSON.parse(await readFile(join(cwd, "link-health.json"), "utf8"));
  } finally {
    await rm(cwd, { recursive: true, force: true });
  }
}

test("wrong directory case is broken even on a case-insensitive filesystem", async () => {
  const report = await scan({
    "site/Index.md": "[Portuguese](/zechubglobal/zcashbrasil/zcashtech/zakura)",
    "site/zechubglobal/zcashbrasil/zcashtech/zakura.md": "# Zakura",
  });
  assert.equal(report.totals.route, 1);
  assert.equal(report.findings[0].url, "/zechubglobal/zcashbrasil/zcashtech/zakura");
});

test("exact routes and fuzzy filenames in the correct folder remain valid", async () => {
  const report = await scan({
    "site/Index.md": "[Exact](/zcash-tech/zaino)\n[Fuzzy](/zcash-tech/zecd)",
    "site/Zcash_Tech/Zaino.md": "# Zaino",
    "site/Zcash_Tech/Z_ECD.md": "# ZECD",
  });
  assert.equal(report.totals.route, 0);
});

test("a narrowed scan can resolve exact and fuzzy routes elsewhere in site", async () => {
  const report = await scan({
    "site/guides/Guide.md": "[Exact](/zcash-tech/zaino)\n[Fuzzy](/zcash-tech/zecd)",
    "site/Zcash_Tech/Zaino.md": "# Zaino",
    "site/Zcash_Tech/Z_ECD.md": "# ZECD",
  }, "site/guides");
  assert.equal(report.filesScanned, 1);
  assert.equal(report.totals.route, 0);
});

test("missing routes remain broken and app-provided routes remain valid", async () => {
  const report = await scan({
    "site/Index.md": "[Missing](/zcash-tech/no-such-page)\n[Wallets](/wallets)",
  });
  assert.equal(report.totals.route, 1);
  assert.equal(report.findings[0].url, "/zcash-tech/no-such-page");
});
