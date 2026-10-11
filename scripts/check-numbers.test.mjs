// Integration tests for scripts/check-numbers.mjs: a throwaway git repo with a
// base commit and a PR commit, the way CI runs the gate. The rules themselves
// are unit-tested in translation/lib/numbers.test.mjs; this file covers scope
// (--base), the per-locale policy, and the exit status, which is the part that
// fails silently when wrong.
//
// Run: node --test scripts/check-numbers.test.mjs
import { strict as assert } from "node:assert";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { after, before, test } from "node:test";

const GATE = new URL("./check-numbers.mjs", import.meta.url).pathname;
let repo;
const git = (...a) => execFileSync("git", ["-C", repo, ...a], { encoding: "utf8" });
const w = (p, body) => { mkdirSync(dirname(join(repo, p)), { recursive: true }); writeFileSync(join(repo, p), body); };
const run = (...args) => {
  const r = spawnSync(process.execPath, [GATE, ...args], { cwd: repo, encoding: "utf8", env: { ...process.env, GITHUB_ACTIONS: "" } });
  return { status: r.status, out: r.stdout + r.stderr };
};
const commit = (msg) => { git("add", "-A"); git("-c", "user.name=t", "-c", "user.email=t@t", "commit", "-qm", msg); };
const branch = (name) => { git("checkout", "-q", "main"); git("checkout", "-qb", name); };

const EN_POLL = "# Poll\n\nThe poll closes on August 24, 2026, 19:00 UTC at block 3,428,143.\n";
const YO_GOOD = "# Ìdìbò\n\nÌdìbò náà yóò parí ní 24/08/2026, 19:00 UTC ní block 3,428,143.\n";
const YO_BAD = "# Ìdìbò\n\nÌdìbò náà yóò parí ní ọjọ́ kẹrìndínlógún oṣù kẹjọ, 2026, ní agogo mọ́kàndínlógún òwúrọ̀ UTC ní block 3,428,143.\n";

before(() => {
  repo = mkdtempSync(join(tmpdir(), "check-numbers-"));
  git("init", "-q", "-b", "main");
  w("translation/protected-terms.json", JSON.stringify({ preserveVerbatim: ["NU6.1", "Zcash"] }));
  w("site/poll.md", EN_POLL);
  w("translations/yo/site/poll.md", YO_GOOD);
  // damage already on main: a fused token and a lost year
  w("site/zips.md", "# ZIPs\n\nRead ZIP 225 before November 2025.\n");
  w("translations/id/site/zips.md", "# ZIP\n\nBaca ZIP 2emma sebelum November 202kan.\n");
  w("site/fees.md", "# Fees\n\nThe fee is 10,000 zatoshi for 25 minutes.\n");
  w("translations/ig/site/fees.md", "# Ụgwọ\n\nỤgwọ bụ 10,000 zatoshi maka 25 nkeji.\n");
  commit("base");
});

after(() => rmSync(repo, { recursive: true, force: true }));

test("a change that touches no translation passes", () => {
  branch("pr-none");
  w("site/other.md", "# Other\n\n42\n");
  commit("english only");
  const r = run("--base", "main");
  assert.equal(r.status, 0, r.out);
  assert.match(r.out, /passed for 0 changed translated page/);
});

test("the Yoruba date damage introduced by a change fails, naming file and line", () => {
  branch("pr-yo");
  w("translations/yo/site/poll.md", YO_BAD);
  commit("resync yo");
  const r = run("--base", "main");
  assert.equal(r.status, 1, r.out);
  assert.match(r.out, /translations\/yo\/site\/poll\.md:3: error: number 24 from site\/poll\.md:3 is missing/);
  assert.match(r.out, /number 19 from site\/poll\.md:3 is missing/);
});

test("a changed block height fails", () => {
  branch("pr-height");
  w("translations/yo/site/poll.md", YO_GOOD.replace("3,428,143", "3,248,143"));
  commit("height");
  const r = run("--base", "main");
  assert.equal(r.status, 1, r.out);
  assert.match(r.out, /number 3428143 .*missing/);
  assert.match(r.out, /number 3248143 is not in site\/poll\.md/);
});

test("damage already at the base is a notice, not a failure, when the page is touched", () => {
  branch("pr-touch-id");
  w("translations/id/site/zips.md", "# ZIP\n\nBaca ZIP 2emma sebelum November 202kan.\n\nTambahan.\n");
  commit("touch id");
  const r = run("--base", "main");
  assert.equal(r.status, 0, r.out);
  assert.match(r.out, /already there at the base/);
});

test("...but a NEW fused token on that page still fails", () => {
  branch("pr-id-new");
  w("translations/id/site/zips.md", "# ZIP\n\nBaca ZIP 2emma sebelum November 202kan dan ZIP 3alli.\n");
  w("site/zips.md", "# ZIPs\n\nRead ZIP 225 before November 2025 and ZIP 316.\n");
  commit("id more damage");
  const r = run("--base", "main");
  assert.equal(r.status, 1, r.out);
  assert.match(r.out, /"3alli"/);
  assert.doesNotMatch(r.out, /error: "2emma"/);
});

test("a renamed translation does not get blamed for damage it carried", () => {
  branch("pr-rename");
  git("mv", "site/zips.md", "site/zip-list.md");
  git("mv", "translations/id/site/zips.md", "translations/id/site/zip-list.md");
  commit("rename");
  const r = run("--base", "main");
  assert.equal(r.status, 0, r.out);
});

test("a new translation page is checked in full", () => {
  branch("pr-new");
  w("translations/de/site/poll.md", "# Abstimmung\n\nDie Abstimmung endet am 24. August 2026 um 19:00 UTC bei Block 3.428.413.\n");
  commit("add de");
  const r = run("--base", "main");
  assert.equal(r.status, 1, r.out);
  assert.match(r.out, /translations\/de\/site\/poll\.md.*3428143/);
});

test("Igbo: a missing number is advisory, an invented one blocks", () => {
  branch("pr-ig");
  w("translations/ig/site/fees.md", "# Ụgwọ\n\nỤgwọ bụ 10,000 zatoshi maka nkeji iri abụọ na ise.\n");
  commit("ig words");
  let r = run("--base", "main");
  assert.equal(r.status, 0, r.out);
  assert.match(r.out, /warning: number 25 /);
  w("translations/ig/site/fees.md", "# Ụgwọ\n\nỤgwọ bụ 10,000 zatoshi maka nkeji iri abụọ na ise kemgbe afọ 2000.\n");
  commit("ig invented year");
  r = run("--base", "main");
  assert.equal(r.status, 1, r.out);
  assert.match(r.out, /number 2000 is not in site\/fees\.md/);
});

test("an uncommitted translation edit is in scope on a local run", () => {
  branch("pr-dirty");
  w("translations/yo/site/poll.md", YO_BAD);
  const r = run("--base", "main");
  git("checkout", "-q", "--", "translations/yo/site/poll.md");
  assert.equal(r.status, 1, r.out);
});

test("without --base every page is checked and old damage fails", () => {
  git("checkout", "-q", "main");
  const r = run();
  assert.equal(r.status, 1, r.out);
  assert.match(r.out, /translations\/id\/site\/zips\.md:3: error: "2emma"/);
});

test("--base without a ref, or with an unknown ref, refuses to run", () => {
  git("checkout", "-q", "main");
  let r = run("--base");
  assert.equal(r.status, 1, r.out);
  assert.match(r.out, /without a ref/);
  r = run("--base", "no-such-ref");
  assert.equal(r.status, 1, r.out);
  assert.match(r.out, /could not be resolved/);
});

test("CI gets annotations on the line", () => {
  git("checkout", "-q", "pr-yo");
  const r = spawnSync(process.execPath, [GATE, "--base", "main"], { cwd: repo, encoding: "utf8", env: { ...process.env, GITHUB_ACTIONS: "true" } });
  assert.equal(r.status, 1);
  assert.match(r.stdout, /::error file=translations\/yo\/site\/poll\.md,line=3,title=numbers::number 24/);
});
