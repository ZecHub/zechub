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

import { anchorKey, findModelReplies, findReplacedAnchors, loadPatterns, stripMarkers } from "../translation/lib/model-replies.mjs";

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

// ---- structural rule: replies in the target language (review of #2470) ----
const EN_PAGE = "# Zakura\n\nIntro paragraph about the node.\n\n---\n\n## How it relates\n\nA longer paragraph that explains how Zakura relates to other nodes.\n\n___\n\n<div align=\"center\">\n\nCentered text.\n\n</div>\n";

test("anchorKey: only blocks with nothing to translate", () => {
  for (const l of ["---", "***", "____", "<br>", "</div>", "<img src=\"a.webp\" alt=\"x\" />", "## B", "### Q&"]) assert.ok(anchorKey(l), l);
  for (const l of ["## FAQ", "Text", "<b>bold</b> words", "| a | b |", "- item"]) assert.equal(anchorKey(l), null, l);
});

test("a reply in the target language in place of a rule is caught (#2470 review)", () => {
  const de = EN_PAGE.replace("Intro paragraph about the node.", "Einleitung über den Knoten.")
    .replace("\n---\n", "\nBitte sende den neuen englischen Block.\n")
    .replace("A longer paragraph that explains how Zakura relates to other nodes.", "Ein längerer Absatz, der erklärt, wie sich Zakura zu anderen Knoten verhält.");
  const h = findReplacedAnchors(de, EN_PAGE);
  assert.equal(h.length, 1);
  assert.equal(h[0].line, 5);
  assert.equal(h[0].english, "---");
  const ru = EN_PAGE.replace("\n___\n", "\nИсходный Markdown-фрагмент для перевода не был предоставлен.\n");
  assert.deepEqual(findReplacedAnchors(ru, EN_PAGE).map((x) => x.english), ["___"]);
});

test("a faithful translation passes: translated alt text, kept rules and tags", () => {
  const ok = EN_PAGE.replace("Intro paragraph about the node.", "Вступление об узле.")
    .replace("A longer paragraph that explains how Zakura relates to other nodes.", "Длинный абзац о том, как Zakura соотносится с другими узлами.")
    .replace("Centered text.", "Текст по центру.");
  assert.deepEqual(findReplacedAnchors(ok, EN_PAGE), []);
  const img = "# T\n\n<img src=\"a.webp\" alt=\"zebra logo\" />\n\nText.\n";
  assert.deepEqual(findReplacedAnchors(img.replace("zebra logo", "логотип zebra").replace("Text.", "Текст."), img), []);
  // A rule glued to the next heading is still the rule.
  const glued = "# T\n\nPara.\n\n---\n\n## Glossary\n";
  assert.deepEqual(findReplacedAnchors("# T\n\nAbsatz.\n\n---\n## Glossar\n", glued), []);
});

test("a reply next to a paragraph is the line reported, not the paragraph", () => {
  const en = "# T\n\n[Scalability is Boring, Privacy is Dead: ZK-Proofs, What are They Good For?](https://example.org/x)\n\n---\n\n## Related Pages\n";
  const ru = "# T\n\nМасштабируемость — это скучно, конфиденциальность мертва: доказательства ZK, для чего они нужны?\n\nПожалуйста, пришлите Markdown-фрагмент для перевода.\n\n## Связанные страницы\n";
  assert.deepEqual(findReplacedAnchors(ru, en).map((x) => x.line), [5]);
});

test("setext headings, lone HTML tags and CRLF pages", () => {
  const en = "# T\n\nIntro paragraph.\n\nB\n---\n\nBody text under B.\n\n<br>\n\nEnd.\n";
  const tr = "# T\n\nВступление.\n\nПожалуйста, пришлите фрагмент.\n\nТекст под B.\n\n<br>\n\nКонец.\n";
  assert.deepEqual(findReplacedAnchors(tr, en).map((x) => [x.line, x.english]), [[5, "B\n---"]]);
  // A long setext heading is text to translate, not an anchor.
  assert.deepEqual(findReplacedAnchors("# T\n\nОбзор\n---\n", "# T\n\nOverview\n---\n"), []);
  const html = tr.replace("Пожалуйста, пришлите фрагмент.", "Б\n---").replace("<br>", "Bitte sende den Block.");
  assert.deepEqual(findReplacedAnchors(html, en).map((x) => x.english), ["<br>"]);
  const crlf = (t) => t.replace(/\n/g, "\r\n");
  assert.deepEqual(findReplacedAnchors(crlf(tr), crlf(en)).map((x) => x.line), [5]);
});

test("a rule moved by a paragraph added above and two merged below is not a reply", () => {
  const en = "# T\n\nFirst paragraph.\n\n---\n\nSecond paragraph.\n\nThird paragraph.\n";
  const tr = "# T\n\nErster Absatz.\n\nEin eingefügter Absatz.\n\n---\n\nZweiter und dritter Absatz zusammen.\n";
  assert.deepEqual(findReplacedAnchors(tr, en), []);
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

test("the structural rule compares with the English the page was translated from", () => {
  git("checkout", "-qb", "structural");
  w("site/node.md", "# Node\n\nAbout the node.\n\n---\n\n## Next\n");
  commit("english v1");
  const v1 = git("rev-parse", "HEAD").trim();
  // English moves on (the rule is gone); the translation still follows v1.
  w("site/node.md", "# Node\n\nAbout the node, rewritten.\n\n## Next\n");
  w("translation/sync-state.json", JSON.stringify({ de: { "node.md": { src_commit: v1 } } }));
  w("translations/de/site/node.md", "# Knoten\n\nÜber den Knoten.\n\n---\n\n## Weiter\n");
  commit("translation of v1");
  assert.equal(run("--base", "main").status, 0);
  w("translations/de/site/node.md", "# Knoten\n\nÜber den Knoten.\n\nBitte sende den neuen englischen Block.\n\n## Weiter\n");
  commit("reply in German");
  const r = run("--base", "main");
  assert.equal(r.status, 1, r.out);
  assert.match(r.out, /node\.md:5: error: the English has "---" here/);
  git("checkout", "-q", "main");
});

test("without a readable src_commit the structural test is skipped, never run on the current English", () => {
  git("checkout", "-qb", "nostate");
  // The current English gained a rule; the translation, made before, rightly lacks it.
  w("site/gain.md", "# Gain\n\nFirst part.\n\n---\n\nSecond part.\n");
  w("translations/de/site/gain.md", "# Gewinn\n\nErster Teil.\n\nZweiter Teil.\n");
  commit("no src_commit for gain.md");
  const r = run("--base", "main");
  assert.equal(r.status, 0, r.out);
  assert.match(r.out, /could not be read/);
  git("checkout", "-q", "main");
});

test("a renamed page is compared with the English under its old name", () => {
  git("checkout", "-qb", "rename");
  const body = Array.from({ length: 12 }, (_, i) => `Paragraph ${i + 1} about the node and how it works.`).join("\n\n");
  const deBody = Array.from({ length: 12 }, (_, i) => `Absatz ${i + 1} über den Knoten und wie er funktioniert.`).join("\n\n");
  w("site/old.md", `# Old\n\n${body}\n\n---\n\n## Next\n`);
  commit("english under the old name");
  const v1 = git("rev-parse", "HEAD").trim();
  git("mv", "site/old.md", "site/new.md");
  w("translations/de/site/old.md", `# Alt\n\n${deBody}\n\n---\n\n## Weiter\n`);
  w("translation/sync-state.json", JSON.stringify({ de: { "old.md": { src_commit: v1 } } }));
  commit("translation of the old name");
  const base = git("rev-parse", "HEAD").trim();
  git("mv", "translations/de/site/old.md", "translations/de/site/new.md");
  w("translations/de/site/new.md", `# Alt\n\n${deBody}\n\nBitte sende den neuen englischen Block.\n\n## Weiter\n`);
  w("translation/sync-state.json", JSON.stringify({ de: { "new.md": { src_commit: v1 } } }));
  commit("rename the translation, and a reply sneaks in");
  const r = run("--base", base);
  assert.equal(r.status, 1, r.out);
  assert.match(r.out, /new\.md:27: error: the English has "---" here/);
  git("checkout", "-q", "main");
});
