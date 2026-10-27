// Exercise the real offline CLI with real files, not a copied route resolver.
// LINK_CHECKER_PATH permits the same cases to test an immutable baseline.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const checker = process.env.LINK_CHECKER_PATH
  ? resolve(process.env.LINK_CHECKER_PATH)
  : fileURLToPath(new URL("./check-links.mjs", import.meta.url));

async function scan(routes) {
  const dir = await mkdtemp(join(tmpdir(), "zechub-locale-"));
  try {
    // The current app rejects a translation whose English source was deleted,
    // and falls back to English when the translation has not been generated.
    const files = {
      "site/Fixture.md": routes.map((route) => `[link](${route})`).join("\n"),
      "site/Zcash_Tech/Zakura_Node.md": "# Zakura Node\n",
      "translations/pt/site/Zcash_Tech/Zakura_Node.md": "# Zakura Nó\n",
      "site/Zcash_Tech/English_Only.md": "# English fallback\n",
      "translations/pt/site/Zcash_Tech/Orphan.md": "# Deleted source\n",
      "site/Zz/Topic.md": "# Ordinary content, not a locale\n",
      "Outside.md": "# Must not escape site\n",
    };
    for (const [name, content] of Object.entries(files)) {
      const path = join(dir, name);
      await mkdir(dirname(path), { recursive: true });
      await writeFile(path, content);
    }
    const deny = join(dir, "deny-fetch.mjs");
    await writeFile(deny, 'globalThis.fetch = () => { console.error("Unexpected fetch in offline scan"); process.exit(97); };\n');
    const json = join(dir, "report.json");
    const result = spawnSync(process.execPath, [
      "--import", deny, checker, "--offline", "--root", "site",
      "--json", json, "--markdown", join(dir, "report.md"),
    ], { cwd: dir, encoding: "utf8", timeout: 15_000 });
    assert.ifError(result.error);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const report = JSON.parse(await readFile(json, "utf8"));
    assert.equal(report.uniqueExternalChecked, 0);
    assert.equal(report.filesScanned, 4, "translations are not independently scanned");
    return report.findings.filter((f) => f.kind === "route").map((f) => f.url);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

test("Portuguese source and translation resolve without a false route finding", async () => {
  assert.deepEqual(await scan([
    "/pt/zcash-tech/zakura-node",
    "/pt/zcash-tech/zakura-node/?from=menu#overview",
  ]), []);
});

test("localized pages use English fallback but orphan translations stay missing", async () => {
  assert.deepEqual(await scan([
    "/pt/zcash-tech/english-only",
    "/pt/zcash-tech/orphan",
    "/pt/zcash-tech/not-a-page",
  ]), ["/pt/zcash-tech/orphan", "/pt/zcash-tech/not-a-page"]);
});

test("configured locale prefixes work for content, roots and exact app routes", async () => {
  // From zechub-wiki src/i18n/routing.ts, not inferred from directory names.
  const locales = ["en", "it", "fr", "es", "de", "pt", "ar", "zh", "hi", "ru", "ja", "ko", "tr", "uk", "sw", "yo", "ig", "ak", "ee", "id", "el"];
  const routes = locales.flatMap((locale) => [
    `/${locale}/zcash-tech/english-only`, `/${locale}`, `/${locale}/wallets`,
  ]);
  assert.deepEqual(await scan(routes), []);
});

test("unprefixed English content and default root/app behavior are unchanged", async () => {
  assert.deepEqual(await scan([
    "/", "/wallets", "/zcash-tech/zakura-node", "/zcash-tech/english-only",
    "/zcash-tech/zakura-node?from=menu#overview", "/zcash-tech/not-a-page",
  ]), ["/zcash-tech/not-a-page"]);
});

test("unknown and differently cased prefixes are not guessed as locales", async () => {
  const missing = [
    "/zz/zcash-tech/zakura-node", "/PT/zcash-tech/zakura-node",
    "/pt-PT/zcash-tech/zakura-node", "/pt/pt/zcash-tech/zakura-node",
  ];
  assert.deepEqual(await scan(["/zz/topic", ...missing]), missing);
});

test("localized app paths still require the complete route to exist", async () => {
  assert.deepEqual(await scan([
    "/pt/wallets", "/pt/wallets/does-not-exist", "/pt/not-an-app",
  ]), ["/pt/wallets/does-not-exist", "/pt/not-an-app"]);
});

test("prefix removal never decodes separators or permits dot-segment traversal", async () => {
  const missing = [
    "/%70t/zcash-tech/zakura-node", "/pt%2Fzcash-tech/zakura-node",
    "/pt/../outside", "/pt/./zcash-tech/zakura-node",
    "/pt/%2e%2e/outside", "/pt/zcash-tech%2Fzakura-node",
    "/pt/zcash-tech%5Czakura-node", "/pt/..\\outside",
  ];
  assert.deepEqual(await scan(missing), missing);
});
