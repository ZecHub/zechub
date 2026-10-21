// Tests for the model-reply gate (ZecHub/zechub#2467): the matching rules in
// translation/lib/model-replies.mjs, and scripts/check-model-replies.mjs run
// the way CI runs it (a throwaway repo with a base and a PR commit), because
// scope and exit status are the part that fails silently when wrong.
//
// Run: node --test scripts/check-model-replies.test.mjs
import { strict as assert } from "node:assert";
import { execFileSync, spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { after, before, test } from "node:test";

import { findModelReplies, loadPatterns, stripMarkers } from "../translation/lib/model-replies.mjs";

const GATE = new URL("./check-model-replies.mjs", import.meta.url).pathname;
const LIST = new URL("../translation/model-replies.json", import.meta.url).pathname;
const P = loadPatterns(LIST);
const ids = (tr, en = "") => findModelReplies(tr, en, P).map((h) => h.id);

// The replies that #2468 removed from 20 Indonesian pages, and the Turkish
// ones found by the first sweep, verbatim.
const REAL = [
  "## Please provide the Markdown fragment you would like me to translate. I am ready to begin the localization process according to your specific instructions and terminology.",
  "Please provide the Markdown fragment you would like me to translate. I am ready to begin once you provide the text.",
  "## I cannot translate this fragment because it contains only a single character \"C\" without any context or content to be translated.",
  "## I cannot fulfill this request because the input provided (\"S\") is insufficient to perform a translation.",
  "I cannot translate this fragment because it does not contain any translatable text; it only contains an HTML comment.",
  "I can’t translate it because the Markdown fragment was not included after the `---` separator.",
  "Please paste the source fragment, and I’ll return only the Turkish translation.",
];

test("every real reply from #2467 is caught", () => {
  for (const line of REAL) assert.equal(ids(`# Judul\n\n${line}\n`).length, 1, line);
});

test("other reply openings are caught", () => {
  for (const line of [
    "Here is the translation of the fragment:",
    "Translation: Dompet",
    "I'm sorry, but I can only translate text.",
    "Could you please provide the text?",
    "The fragment you provided contains only a heading letter.",
    "As an AI, I cannot see the fragment.",
    "- Nothing to translate here.",
    "> I am ready to translate the content.",
    "| Once you provide the text, I will translate it. |",
  ]) assert.equal(ids(line).length, 1, line);
});

test("translations and ordinary English quotes are not flagged", () => {
  for (const line of [
    "Silakan berikan alamat terlindung Anda.",
    "Mohon berikan masukan di forum.",
    "## B",
    "---",
    "Zcash is a privacy coin.",
    "Ich kann das nicht übersetzen.",
  ]) assert.deepEqual(ids(line), [], line);
});

test("a line the English page itself contains is never flagged", () => {
  const en = "# FAQ\n\n> Please provide your viewing key to the auditor.\n";
  assert.deepEqual(ids("# SSS\n\n> Please provide your viewing key to the auditor.\n", en), []);
});

test("code fences, HTML comments and front matter are skipped", () => {
  const tr = "---\ntitle: Please provide\n---\n\n```\nI cannot translate\n```\n\n<!--\nPlease provide the fragment\n-->\n\nTeks.\n";
  assert.deepEqual(ids(tr), []);
});

test("stripMarkers removes Markdown markers", () => {
  assert.equal(stripMarkers("## Foo"), "Foo");
  assert.equal(stripMarkers("> - **Foo** bar"), "Foo** bar");
  assert.equal(stripMarkers("1. Foo"), "Foo");
  assert.equal(stripMarkers("| Foo | Bar |"), "Foo | Bar |");
});

test("every pattern is anchored and compiles", () => {
  assert.ok(P.length >= 5);
  for (const p of P) assert.ok(p.re.source.startsWith("^"), p.id);
});

// ---- the CLI, scoped the way CI runs it ----
let repo;
const CLEAN_ENV = Object.fromEntries(Object.entries(process.env).filter(([k]) => !/^GIT_/.test(k)));
const git = (...a) => execFileSync("git", ["-C", repo, ...a], { encoding: "utf8", env: CLEAN_ENV });
const w = (p, body) => { mkdirSync(dirname(join(repo, p)), { recursive: true }); writeFileSync(join(repo, p), body); };
const commit = (msg) => { git("add", "-A"); git("-c", "user.name=t", "-c", "user.email=t@t", "commit", "-qm", msg); };
const run = (...args) => {
  const r = spawnSync(process.execPath, [GATE, ...args], { cwd: repo, encoding: "utf8", env: { ...CLEAN_ENV, GITHUB_ACTIONS: "" } });
  return { status: r.status, out: r.stdout + r.stderr };
};

before(() => {
  repo = mkdtempSync(join(tmpdir(), "check-model-replies-"));
  git("init", "-q", "-b", "main");
  mkdirSync(join(repo, "translation"), { recursive: true });
  copyFileSync(LIST, join(repo, "translation/model-replies.json"));
  w("site/lib.md", "# Library\n\n## B\n\nBlock.\n");
  w("translations/id/site/lib.md", "# Pustaka\n\n## Please provide the Markdown fragment you would like me to translate.\n\nBlok.\n");
  w("site/ok.md", "# Ok\n\nText.\n");
  w("translations/id/site/ok.md", "# Ok\n\nTeks.\n");
  commit("base");
});
after(() => rmSync(repo, { recursive: true, force: true }));

test("an unscoped run fails on the reply already in the tree", () => {
  const r = run();
  assert.equal(r.status, 1, r.out);
  assert.match(r.out, /lib\.md:3: error/);
});

test("a PR that does not touch the broken page passes", () => {
  git("checkout", "-qb", "unrelated");
  w("translations/id/site/ok.md", "# Ok\n\nTeks baru.\n");
  commit("unrelated");
  const r = run("--base", "main");
  assert.equal(r.status, 0, r.out);
  git("checkout", "-q", "main");
});

test("an inherited reply on a touched page is a notice, not a failure", () => {
  git("checkout", "-qb", "touch");
  w("translations/id/site/lib.md", "# Pustaka Zcash\n\n## Please provide the Markdown fragment you would like me to translate.\n\nBlok.\n");
  commit("touch");
  const r = run("--base", "main");
  assert.equal(r.status, 0, r.out);
  assert.match(r.out, /already there at the base/);
  git("checkout", "-q", "main");
});

test("a new reply in a PR fails", () => {
  git("checkout", "-qb", "new");
  w("translations/id/site/ok.md", "# Ok\n\nI cannot translate this fragment because it is empty.\n");
  commit("new");
  const r = run("--base", "main");
  assert.equal(r.status, 1, r.out);
  assert.match(r.out, /ok\.md:3: error/);
  git("checkout", "-q", "main");
});

test("a PR that fixes the reply passes", () => {
  git("checkout", "-qb", "fix");
  w("translations/id/site/lib.md", "# Pustaka\n\n## B\n\nBlok.\n");
  commit("fix");
  const r = run("--base", "main");
  assert.equal(r.status, 0, r.out);
  git("checkout", "-q", "main");
});

test("--base without a ref is an error, not a whole-tree run", () => {
  const r = run("--base");
  assert.equal(r.status, 1);
  assert.match(r.out, /without a ref/);
});
