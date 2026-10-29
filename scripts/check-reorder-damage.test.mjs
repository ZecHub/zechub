// scripts/check-reorder-damage.mjs run the way CI runs it: a throwaway repo
// with a base and a PR commit, because scope and exit status are the parts
// that fail silently when wrong. The rules themselves are unit-tested in
// translation/lib/reorder-damage.test.mjs.
//
// Run: node --test scripts/check-reorder-damage.test.mjs
import { strict as assert } from "node:assert";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { after, before, test } from "node:test";

const GATE = new URL("./check-reorder-damage.mjs", import.meta.url).pathname;

let repo;
// A git hook exports GIT_DIR; inherited, it would point these commands at the
// real repository instead of the throwaway one.
const CLEAN_ENV = Object.fromEntries(Object.entries(process.env).filter(([k]) => !/^GIT_/.test(k)));
const git = (...a) => execFileSync("git", ["-C", repo, ...a], { encoding: "utf8", env: CLEAN_ENV });
const w = (p, body) => { mkdirSync(dirname(join(repo, p)), { recursive: true }); writeFileSync(join(repo, p), body); };
const commit = (msg) => { git("add", "-A"); git("-c", "user.name=t", "-c", "user.email=t@t", "commit", "-qm", msg); };
const run = (...args) => {
  const r = spawnSync(process.execPath, [GATE, ...args], { cwd: repo, encoding: "utf8", env: { ...CLEAN_ENV, GITHUB_ACTIONS: "" } });
  return { status: r.status, out: r.stdout + r.stderr, stdout: r.stdout };
};

const EN_LIB = "# Library\n\nFor a full list see [Zcash Ecosystem Wallets](/using-zcash/wallets).\n\nMore text.\n";
const EL_LIB_BROKEN = "# Βιβλιοθήκη\n\nΓια πλήρη λίστα, δες [ZcashΠορτοφόλια του οικοσυστήματος](/using-zcash/wallets).\n\nΚι άλλο κείμενο.\n";
const EN_SWAP = "# Swap\n\nZecHub's [How to swap for ZEC in Phantom Wallet](/using-zcash/solswap) guide covers solswap.\n";
const EL_SWAP = "# Swap\n\nΟ [οδηγός του ZecHub για swap σε ZEC στο Phantom](/using-zcash/solswap) καλύπτει το solswap.\n";

before(() => {
  repo = mkdtempSync(join(tmpdir(), "check-reorder-damage-"));
  git("init", "-q", "-b", "main");
  w("site/lib.md", EN_LIB);
  w("translations/el/site/lib.md", EL_LIB_BROKEN);
  w("site/swap.md", EN_SWAP);
  w("translations/el/site/swap.md", EL_SWAP);
  w("translations/ja/site/swap.md", "# スワップ\n\nZecHubの[Phantomウォレットで ZEC にスワップする方法](/using-zcash/solswap)ガイドはsolswapを説明します。\n");
  commit("base");
});
after(() => rmSync(repo, { recursive: true, force: true }));

test("an unscoped run fails on the damage already in the tree", () => {
  const r = run();
  assert.equal(r.status, 1, r.out);
  assert.match(r.out, /translations\/el\/site\/lib\.md:3:\d+: error: glued-name/);
  assert.doesNotMatch(r.out, /swap\.md/);
});

test("--json reports per-locale counts and keeps stdout parseable", () => {
  const r = run("--json");
  assert.equal(r.status, 1);
  const j = JSON.parse(r.stdout);
  assert.deepEqual(j.counts, { el: { "glued-name": 1 } });
  assert.equal(j.errors[0].file, "translations/el/site/lib.md");
});

test("a PR that does not touch the broken page passes", () => {
  git("checkout", "-qb", "unrelated");
  w("translations/el/site/swap.md", EL_SWAP.replace("καλύπτει", "εξηγεί"));
  commit("unrelated");
  const r = run("--base", "main");
  assert.equal(r.status, 0, r.out);
  git("checkout", "-q", "main");
});

test("inherited damage on a touched page is a notice, not a failure", () => {
  git("checkout", "-qb", "touch");
  w("translations/el/site/lib.md", EL_LIB_BROKEN.replace("Κι άλλο", "Και άλλο"));
  commit("touch");
  const r = run("--base", "main");
  assert.equal(r.status, 0, r.out);
  assert.match(r.out, /already there at the base/);
  git("checkout", "-q", "main");
});

test("a link whose [ moved after its ]( fails, in Greek and in Japanese", () => {
  git("checkout", "-qb", "orphan");
  w("translations/el/site/swap.md", "# Swap\n\nΟ οδηγός ZecHub Πώς να κάνεις swap για ZEC στο πορτοφόλι Phantom](/using-zcash/solswap) του [ καλύπτει το solswap.\n");
  w("translations/ja/site/swap.md", "# スワップ\n\nZecHubのPhantomウォレットで ZEC にスワップする方法](/using-zcash/solswap)[ガイドはsolswapを説明します。\n");
  commit("orphan");
  const r = run("--base", "main");
  assert.equal(r.status, 1, r.out);
  assert.match(r.out, /el\/site\/swap\.md:3:\d+: error: orphan-link-close/);
  assert.match(r.out, /ja\/site\/swap\.md:3:\d+: error: orphan-link-close/);
  git("checkout", "-q", "main");
});

test("a link label pushed onto a function word fails", () => {
  git("checkout", "-qb", "padded");
  w("translations/el/site/swap.md", "# Swap\n\nΟ οδηγός ZecHub[ του ](/using-zcash/solswap) καλύπτει το solswap.\n");
  commit("padded");
  const r = run("--base", "main");
  assert.equal(r.status, 1, r.out);
  assert.match(r.out, /swap\.md:3:\d+: error: label-leading-space/);
  git("checkout", "-q", "main");
});

test("a NEW glued name on a page that already had one fails", () => {
  git("checkout", "-qb", "more");
  w("translations/el/site/lib.md", `${EL_LIB_BROKEN}\nΔες το [ZebraΠλήρης κόμβος](/zcash-tech/zebra).\n`);
  commit("more glue");
  const r = run("--base", "main");
  assert.equal(r.status, 1, r.out);
  assert.match(r.out, /lib\.md:7:\d+: error: glued-name/);
  assert.match(r.out, /1 reorder-damage finding\(s\) on the changed pages were already there/);
  git("checkout", "-q", "main");
});

test("a PR that fixes the damage passes", () => {
  git("checkout", "-qb", "fix");
  w("translations/el/site/lib.md", EL_LIB_BROKEN.replace("[ZcashΠορτοφόλια του οικοσυστήματος]", "[Πορτοφόλια του οικοσυστήματος Zcash]"));
  commit("fix");
  const r = run("--base", "main");
  assert.equal(r.status, 0, r.out);
  assert.doesNotMatch(r.out, /already there/);
  git("checkout", "-q", "main");
});

test("a renamed page compares with its old name at the base", () => {
  git("checkout", "-qb", "rename");
  git("mv", "site/lib.md", "site/library.md");
  git("mv", "translations/el/site/lib.md", "translations/el/site/library.md");
  commit("rename");
  const r = run("--base", "main");
  assert.equal(r.status, 0, r.out);
  git("checkout", "-q", "main");
});

test("uncommitted edits are checked too", () => {
  git("checkout", "-qb", "dirty");
  w("translations/el/site/swap.md", "# Swap\n\nΟ οδηγός ZecHub[ του ](/using-zcash/solswap) καλύπτει.\n");
  const r = run("--base", "main");
  assert.equal(r.status, 1, r.out);
  git("checkout", "-q", "--", ".");
  git("checkout", "-q", "main");
});

test("--base without a ref is an error, not a whole-tree run", () => {
  const r = run("--base");
  assert.equal(r.status, 1);
  assert.match(r.out, /without a ref/);
});

test("an unresolvable base is an error", () => {
  const r = run("--base", "no-such-ref");
  assert.equal(r.status, 1);
  assert.match(r.out, /could not be resolved/);
});
