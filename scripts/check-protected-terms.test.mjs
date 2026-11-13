import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync, rmSync, realpathSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join } from "node:path";
import { after, test } from "node:test";

const script = readFileSync(new URL("./check-protected-terms.mjs", import.meta.url), "utf8");
const forms = readFileSync(new URL("../translation/lib/term-forms.mjs", import.meta.url), "utf8");
const scratch = mkdtempSync(join(tmpdir(), "zechub-terms path #% 中文-"));
let sequence = 0;
after(() => {
  // Remove only the exact temporary directory created by this test process.
  assert.equal(realpathSync(dirname(scratch)), realpathSync(tmpdir()));
  assert.ok(basename(scratch).startsWith("zechub-terms path #% 中文-"));
  rmSync(scratch, { recursive: true, force: true });
});

function put(root, path, contents) {
  const dest = join(root, path);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, contents, "utf8");
}
function fixture(source, translated) {
  const root = join(scratch, String(++sequence));
  put(root, "scripts/check-protected-terms.mjs", script);
  put(root, "translation/lib/term-forms.mjs", forms);
  put(root, "translation/protected-terms.json", JSON.stringify({ preserveVerbatim: ["Zcash"] }));
  if (source !== undefined) put(root, "site/Guide name.md", source);
  if (translated !== undefined) put(root, "translations/fr/site/Guide name.md", translated);
  return root;
}
function run(root, args = []) {
  const env = { ...process.env };
  delete env.GITHUB_BASE_REF;
  const result = spawnSync(process.execPath, [join(root, "scripts/check-protected-terms.mjs"), ...args], {
    // Deliberately run outside the content root: resolution belongs to the module.
    cwd: scratch, env, encoding: "utf8", timeout: 10000,
  });
  assert.ifError(result.error);
  return { status: result.status, output: result.stdout + result.stderr };
}
function git(root, ...args) {
  return execFileSync("git", ["-C", root, "-c", "user.name=Fixture", "-c", "user.email=fixture@example.invalid", "-c", "commit.gpgsign=false", ...args], {
    encoding: "utf8", stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}
function commit(root) {
  git(root, "add", ".");
  git(root, "commit", "--quiet", "--allow-empty", "-m", "fixture");
  return git(root, "rev-parse", "HEAD");
}
function history(source, translated) {
  const root = fixture(source, translated);
  git(root, "init", "--quiet");
  return { root, base: commit(root) };
}

test("module paths containing spaces, percent, hash and Unicode: empty corpus passes", () => {
  const result = run(fixture());
  assert.equal(result.status, 0, result.output);
  assert.match(result.output, /no translated pages to check/);
});
test("preserved terminology passes from an unrelated working directory", () => {
  const result = run(fixture("Use Zcash.", "Utilisez Zcash."));
  assert.equal(result.status, 0, result.output);
});
test("a missing protected term still fails a whole-tree audit", () => {
  const result = run(fixture("Use Zcash.", "Utilisez ceci."));
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /missing protected term "Zcash"/);
  assert.match(result.output, /validation failed/);
});
test("an explicitly unavailable base remains a hard failure", () => {
  const { root } = history("Use Zcash.", "Utilisez Zcash.");
  const result = run(root, ["--base", "refs/heads/does-not-exist"]);
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /could not be resolved.*refusing to guess the scope/);
});
test("a newly introduced violation in a changed translation fails with --base", () => {
  const { root, base } = history("Use Zcash.", "Utilisez Zcash.");
  put(root, "translations/fr/site/Guide name.md", "Utilisez ceci.");
  commit(root);
  const result = run(root, ["--base", base]);
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /translations\/fr\/site\/Guide name\.md: missing protected term "Zcash"/);
  assert.match(result.output, /introduced by this change/);
});
test("a pre-existing violation remains a notice, not a new failure", () => {
  const { root, base } = history("Use Zcash.", "Utilisez ceci.");
  put(root, "README.md", "Unrelated change.");
  commit(root);
  const result = run(root, ["--base", base]);
  assert.equal(result.status, 0, result.output);
  assert.match(result.output, /1 already failing at the base/);
});
test("uncommitted translation regressions are not mistaken for source drift", () => {
  const { root, base } = history("Use Zcash.", "Utilisez Zcash.");
  put(root, "translations/fr/site/Guide name.md", "Utilisez ceci.");
  const result = run(root, ["--base", base]);
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /introduced by this change/);
});
test("new untracked translations also keep the fail-closed term check", () => {
  const { root, base } = history("Use Zcash.");
  put(root, "translations/fr/site/Guide name.md", "Utilisez ceci.");
  const result = run(root, ["--base", base]);
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /missing protected term "Zcash"/);
  assert.match(result.output, /introduced by this change/);
});
test("English-only term drift remains a staleness notice", () => {
  const { root, base } = history("Use this.", "Utilisez ceci.");
  put(root, "site/Guide name.md", "Use Zcash.");
  commit(root);
  const result = run(root, ["--base", base]);
  assert.equal(result.status, 0, result.output);
  assert.match(result.output, /1 from English pages edited since a translation was last synced/);
});
test("--base without a value never silently disables scoped validation", () => {
  const result = run(fixture(), ["--base"]);
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /--base requires a ref/);
});
