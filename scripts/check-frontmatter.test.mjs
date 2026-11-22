import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync, rmSync, realpathSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join } from "node:path";
import { after, test } from "node:test";

const script = readFileSync(new URL("./check-frontmatter.mjs", import.meta.url), "utf8");
const library = readFileSync(new URL("../translation/lib/frontmatter.mjs", import.meta.url), "utf8");
const scratch = mkdtempSync(join(tmpdir(), "zechub-frontmatter-"));
let sequence = 0;
after(() => {
  assert.equal(realpathSync(dirname(scratch)), realpathSync(tmpdir()));
  assert.ok(basename(scratch).startsWith("zechub-frontmatter-"));
  rmSync(scratch, { recursive: true, force: true });
});

const source = "# Example\n\nEnglish text.\n";
const valid = "# Ejemplo\n\nTexto.\n";
const invalid = "---\npublished: 2026-11-12\n---\n# Ejemplo\n";
const translatedPath = "translations/es/site/Guide name.md";

function put(root, path, contents) {
  const dest = join(root, path);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, contents, "utf8");
}
function git(root, ...args) {
  return execFileSync("git", ["-C", root, "-c", "user.name=Fixture", "-c", "user.email=fixture@example.invalid", "-c", "commit.gpgsign=false", "-c", "core.autocrlf=false", ...args], {
    encoding: "utf8", stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}
function commit(root) {
  git(root, "add", ".");
  git(root, "commit", "--quiet", "--allow-empty", "-m", "fixture");
  return git(root, "rev-parse", "HEAD");
}
function fixture(translated) {
  const root = join(scratch, String(++sequence));
  put(root, "scripts/check-frontmatter.mjs", script);
  put(root, "translation/lib/frontmatter.mjs", library);
  put(root, "site/Guide name.md", source);
  if (translated !== undefined) put(root, translatedPath, translated);
  git(root, "init", "--quiet");
  return { root, base: commit(root) };
}
function run(root, args = []) {
  const result = spawnSync(process.execPath, [join(root, "scripts/check-frontmatter.mjs"), ...args], {
    cwd: scratch, encoding: "utf8", timeout: 10000,
  });
  assert.ifError(result.error);
  return { status: result.status, output: result.stdout + result.stderr };
}

test("an untracked translation with invalid front matter fails the local sweep", () => {
  const { root } = fixture();
  put(root, translatedPath, invalid);
  const result = run(root);
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /Front-matter parity FAILED for 1 page/);
});
test("an untracked translation with invalid front matter fails --base", () => {
  const { root, base } = fixture();
  put(root, translatedPath, invalid);
  const result = run(root, ["--base", base]);
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /translations\/es\/site\/Guide name\.md/);
});
test("a valid untracked translation is checked and accepted", () => {
  const { root, base } = fixture();
  put(root, translatedPath, valid);
  const result = run(root, ["--base", base]);
  assert.equal(result.status, 0, result.output);
  assert.match(result.output, /parity holds for 1 translated page/);
});
test("ignored untracked translations stay excluded", () => {
  const { root, base } = fixture();
  put(root, ".gitignore", "translations/ignored/\n");
  put(root, "translations/ignored/site/Guide name.md", invalid);
  const result = run(root, ["--base", base]);
  assert.equal(result.status, 0, result.output);
  assert.match(result.output, /parity holds for 0 translated page/);
});
test("a staged translation regression still fails", () => {
  const { root, base } = fixture();
  put(root, translatedPath, invalid);
  git(root, "add", translatedPath);
  const result = run(root, ["--base", base]);
  assert.equal(result.status, 1, result.output);
});
test("an unstaged change to a tracked translation still fails", () => {
  const { root, base } = fixture(valid);
  put(root, translatedPath, invalid);
  const result = run(root, ["--base", base]);
  assert.equal(result.status, 1, result.output);
});
test("an untouched inherited violation stays a notice", () => {
  const { root, base } = fixture(invalid);
  put(root, "README.md", "An unrelated change.\n");
  commit(root);
  const result = run(root, ["--base", base]);
  assert.equal(result.status, 0, result.output);
  assert.match(result.output, /notice: 1 page/);
});
test("invalid and missing base values remain hard failures", () => {
  const { root } = fixture(valid);
  const bad = run(root, ["--base", "refs/heads/not-present"]);
  assert.equal(bad.status, 1, bad.output);
  assert.match(bad.output, /could not be resolved/);
  const missing = run(root, ["--base"]);
  assert.equal(missing.status, 1, missing.output);
  assert.match(missing.output, /without a ref value/);
});
