// Integration tests for scripts/check-numbers.mjs: a throwaway git repo with a
// base commit and a PR commit, the way CI runs the gate. The rules themselves
// are unit-tested in translation/lib/numbers.test.mjs; this file covers scope
// (--base), the per-locale policy, and the exit status, which is the part that
// fails silently when wrong.
//
// Run: node --test scripts/check-numbers.test.mjs
import { strict as assert } from "node:assert";
import { execFileSync, spawnSync } from "node:child_process";
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { after, before, test } from "node:test";

const GATE = new URL("./check-numbers.mjs", import.meta.url).pathname;
let repo, out;
// A git hook (e.g. pre-push) exports GIT_DIR and friends. Inherited, they make
// `git -C <tmp> init` re-initialise the REAL repository instead of the temp one,
// which sets core.bare=true there and breaks every worktree. Strip them.
const CLEAN_ENV = Object.fromEntries(Object.entries(process.env).filter(([k]) => !/^GIT_/.test(k)));
const git = (...a) => execFileSync("git", ["-C", repo, ...a], { encoding: "utf8", env: CLEAN_ENV });
const w = (p, body) => { mkdirSync(dirname(join(repo, p)), { recursive: true }); writeFileSync(join(repo, p), body); };
const run = (...args) => {
  const r = spawnSync(process.execPath, [GATE, ...args], { cwd: repo, encoding: "utf8", env: { ...CLEAN_ENV, GITHUB_ACTIONS: "" } });
  return { status: r.status, out: r.stdout + r.stderr };
};
const commit = (msg) => { git("add", "-A"); git("-c", "user.name=t", "-c", "user.email=t@t", "commit", "-qm", msg); };
const branch = (name) => { git("checkout", "-q", "main"); git("checkout", "-qb", name); };

const EN_POLL = "# Poll\n\nThe poll closes on August 24, 2026, 19:00 UTC at block 3,428,143.\n";
const YO_GOOD = "# Ìdìbò\n\nÌdìbò náà yóò parí ní 24/08/2026, 19:00 UTC ní block 3,428,143.\n";
const YO_BAD = "# Ìdìbò\n\nÌdìbò náà yóò parí ní ọjọ́ kẹrìndínlógún oṣù kẹjọ, 2026, ní agogo mọ́kàndínlógún òwúrọ̀ UTC ní block 3,428,143.\n";

before(() => {
  repo = mkdtempSync(join(tmpdir(), "check-numbers-"));
  out = mkdtempSync(join(tmpdir(), "check-numbers-json-"));
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

after(() => { rmSync(repo, { recursive: true, force: true }); rmSync(out, { recursive: true, force: true }); });
// Runs the gate with --json and returns the exit status, the human output and
// the parsed report.
const runJson = (name, ...args) => {
  const file = join(out, `${name}.json`);
  rmSync(file, { force: true });
  const r = run(...args, "--json", file);
  return { ...r, report: existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : null };
};

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

test("fixing an inherited token in one paragraph and writing it into another fails", () => {
  branch("pr-id-moved");
  w("site/zips.md", "# ZIPs\n\nRead ZIP 225 before November 2025.\n\nZIP 225 also covers fees.\n");
  w("translations/id/site/zips.md", "# ZIP\n\nBaca ZIP 225 sebelum November 202kan.\n\nZIP 2emma juga mencakup biaya.\n");
  commit("id moved damage");
  const r = run("--base", "main");
  assert.equal(r.status, 1, r.out);
  assert.match(r.out, /translations\/id\/site\/zips\.md:5: error: "2emma"/);
  assert.doesNotMatch(r.out, /error: "202kan"/);
});

test("a resync that rewords the sentence around an inherited number passes", () => {
  git("checkout", "-q", "main");
  w("site/org.md", "# Organisation\n\nBootstrap is a wholly owned subsidiary of the Electric Coin Company.\n");
  w("translations/fr/site/org.md", "# Organisation\n\nBootstrap est une filiale à 100 % de l'Electric Coin Company.\n");
  commit("fr org on main");
  branch("pr-fr-reword");
  w("site/org.md", "# Organisation\n\nBootstrap is a wholly owned subsidiary of the ECC, which funds it.\n");
  w("translations/fr/site/org.md", "# Organisation\n\nBootstrap, financée par l'ECC, en est une filiale à 100 %.\n");
  commit("resync fr org");
  const r = run("--base", "main");
  assert.equal(r.status, 0, r.out);
  assert.match(r.out, /already there at the base/);
});

test("a changed digit fails even when both values occur elsewhere on the page", () => {
  branch("pr-changed-digit");
  w("site/years.md", "# Years\n\nIn 2024 we shipped v1. In 2024 again. Then 2025 came.\n");
  w("translations/tr/site/years.md", "# Yıllar\n\n2024'te v1'i çıkardık. 2025'te yine. Sonra 2025 geldi.\n");
  commit("tr years");
  const r = run("--base", "main");
  assert.equal(r.status, 1, r.out);
  assert.match(r.out, /error: number 2024 from site\/years\.md:3 is missing \(the translation has 2025 on that line\)/);
  assert.match(r.out, /error: number 2025 is not in site\/years\.md this many times \(on a line where the English has 2024\)/);
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

test("a 12-hour rendering of the poll time passes; a corrupted version fails", () => {
  branch("pr-time-version");
  w("translations/yo/site/poll.md", YO_GOOD.replace("19:00 UTC", "7 PM UTC"));
  commit("12h time");
  let r = run("--base", "main");
  assert.equal(r.status, 0, r.out);
  w("site/node.md", "# Node\n\nRun zcashd 6.20.0 or Zebra v2.5.\n");
  w("translations/de/site/node.md", "# Knoten\n\nFühre zcashd 6.20.1 oder Zebra v2.5 aus.\n");
  commit("de node");
  r = run("--base", "main");
  assert.equal(r.status, 1, r.out);
  assert.match(r.out, /translations\/de\/site\/node\.md:3: error: version 6\.20\.0 from site\/node\.md:3 is missing or changed/);
  assert.match(r.out, /error: version 6\.20\.1 is not in site\/node\.md/);
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
  const r = spawnSync(process.execPath, [GATE, "--base", "main"], { cwd: repo, encoding: "utf8", env: { ...CLEAN_ENV, GITHUB_ACTIONS: "true" } });
  assert.equal(r.status, 1);
  assert.match(r.stdout, /::error file=translations\/yo\/site\/poll\.md,line=3,title=numbers::number 24/);
});

test("--json lists inherited findings on a touched page, with file, line and message", () => {
  git("checkout", "-q", "pr-touch-id");
  const plain = run("--base", "main");
  const r = runJson("inherited", "--base", "main");
  assert.equal(r.status, 0, r.out);
  assert.equal(r.out, plain.out, "the human output must not change");
  assert.equal(r.report.schema, "check-numbers/1");
  assert.equal(r.report.base, "main");
  assert.match(r.report.mergeBase, /^[0-9a-f]{40}$/);
  assert.equal(r.report.pages, 1);
  assert.deepEqual(r.report.errors, []);
  const kinds = r.report.inherited.map((f) => `${f.kind} ${f.value}`);
  for (const k of ["digit-token 2emma", "digit-token 202kan", "number-missing 225", "number-missing 2025"])
    assert.ok(kinds.includes(k), `${k} missing from ${JSON.stringify(kinds)}`);
  assert.match(plain.out, new RegExp(`notice: ${r.report.inherited.length} blocking finding`));
  const t = r.report.inherited.find((f) => f.value === "2emma");
  assert.equal(t.file, "translations/id/site/zips.md");
  assert.equal(t.source, "site/zips.md");
  assert.equal(t.line, 3);
  assert.equal(t.kind, "digit-token");
  assert.equal(t.severity, "error");
  assert.match(t.message, /mixes digits and letters/);
});

test("--json lists new errors and keeps exit 1; inherited stays apart from them", () => {
  git("checkout", "-q", "pr-id-new");
  const r = runJson("new", "--base", "main");
  assert.equal(r.status, 1, r.out);
  const errs = r.report.errors.map((f) => f.value);
  assert.ok(errs.includes("3alli"), JSON.stringify(errs));
  assert.ok(!errs.includes("2emma"), JSON.stringify(errs));
  assert.ok(r.report.inherited.some((f) => f.value === "2emma"), JSON.stringify(r.report.inherited));
  git("checkout", "-q", "pr-yo");
  const y = runJson("yo", "--base", "main");
  assert.equal(y.status, 1, y.out);
  const miss = y.report.errors.find((f) => f.kind === "number-missing" && f.value === "24");
  assert.ok(miss, JSON.stringify(y.report.errors));
  assert.equal(miss.file, "translations/yo/site/poll.md");
  assert.equal(miss.line, 3);
  assert.deepEqual(y.report.inherited, []);
});

test("--json keeps warnings even with --quiet", () => {
  git("checkout", "-q", "pr-ig");
  git("checkout", "-q", "HEAD~1");
  const r = runJson("ig", "--base", "main", "--quiet");
  git("checkout", "-q", "pr-ig");
  assert.equal(r.status, 0, r.out);
  assert.doesNotMatch(r.out, /warning:/);
  assert.ok(r.report.warnings.some((f) => f.kind === "number-missing" && f.value === "25"), JSON.stringify(r.report.warnings));
});

test("--json without --base: whole tree, no base, nothing inherited", () => {
  git("checkout", "-q", "main");
  const r = runJson("sweep");
  assert.equal(r.status, 1, r.out);
  assert.equal(r.report.base, null);
  assert.equal(r.report.mergeBase, null);
  assert.deepEqual(r.report.inherited, []);
  assert.ok(r.report.errors.some((f) => f.value === "2emma"));
});

test("--json without a file refuses to run", () => {
  git("checkout", "-q", "main");
  const r = run("--base", "main", "--json");
  assert.equal(r.status, 1, r.out);
  assert.match(r.out, /--json was given without a file/);
});

test("--json points a partly inherited finding at the new occurrence", () => {
  git("checkout", "-q", "main");
  w("site/era.md", "# Era\n\nThe chain started.\n\nIt grew.\n");
  w("translations/de/site/era.md", "# Ära\n\nDie Chain startete 2000.\n\nSie wuchs.\n");
  commit("de era on main");
  branch("pr-era");
  w("translations/de/site/era.md", "# Ära\n\nDie Chain startete 2000.\n\nSie wuchs ab 2000.\n");
  commit("de era resync");
  const r = runJson("era", "--base", "main");
  assert.equal(r.status, 1, r.out);
  const e = r.report.errors.find((f) => f.kind === "number-added" && f.value === "2000");
  assert.ok(e, JSON.stringify(r.report.errors));
  assert.equal(e.line, 5);
  assert.match(r.out, /translations\/de\/site\/era\.md:5: error: number 2000 /);
});

test("--json writes a failure report when the check cannot run", () => {
  git("checkout", "-q", "main");
  const file = join(out, "fail.json");
  for (const [args, want, wantBase] of [
    [["--base", "no-such-ref"], /could not be resolved/, "no-such-ref"],
    [["--json", file, "--base"], /without a ref/, null],
  ]) {
    writeFileSync(file, JSON.stringify({ schema: "check-numbers/1", pages: 9, errors: [], stale: true }));
    const r = run(...(args[0] === "--json" ? args : [...args, "--json", file]));
    assert.equal(r.status, 1, r.out);
    const rep = JSON.parse(readFileSync(file, "utf8"));
    assert.equal(rep.stale, undefined, "the old report must be gone");
    assert.equal(rep.schema, "check-numbers/1");
    assert.equal(rep.base, wantBase);
    assert.equal(rep.mergeBase, null);
    assert.equal(rep.pages, 0);
    assert.deepEqual([rep.errors, rep.warnings, rep.inherited], [[], [], []]);
    assert.match(rep.error, want);
  }
  assert.deepEqual(readdirSync(out).filter((n) => n.includes(".tmp-")), [], "no temporary file left behind");
});

test("--json writes a failure report when a page cannot be read", { skip: process.getuid?.() === 0 && "root reads everything" }, () => {
  git("checkout", "-q", "pr-yo");
  const page = join(repo, "translations/yo/site/poll.md");
  chmodSync(page, 0o000);
  let r;
  try { r = runJson("unreadable", "--base", "main"); } finally { chmodSync(page, 0o644); }
  assert.equal(r.status, 1, r.out);
  assert.match(r.report.error, /could not read translations\/yo\/site\/poll\.md/);
  assert.equal(r.report.pages, 0);
});

test("--json replaces an old report even on a clean run", () => {
  git("checkout", "-q", "pr-none");
  const file = join(out, "clean.json");
  writeFileSync(file, "{\"stale\": true}");
  const r = run("--base", "main", "--json", file);
  assert.equal(r.status, 0, r.out);
  const rep = JSON.parse(readFileSync(file, "utf8"));
  assert.equal(rep.stale, undefined);
  assert.equal(rep.error, undefined);
  assert.equal(rep.pages, 0);
});
