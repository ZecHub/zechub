// Model replies saved as translations (ZecHub/zechub#2467).
//
// Fails when a translated page contains a line that is a model's reply about
// the translation request rather than a translation: "Please provide the
// Markdown fragment you would like me to translate...", "I cannot translate
// this fragment because...". The openings are listed in
// translation/model-replies.json (shared with the translation runner); the
// matching rules are in translation/lib/model-replies.mjs.
//
// Second test, for replies in the TARGET language (idea from @chairulakmal):
// a block with nothing to translate ("---", a lone HTML tag, a heading of one
// or two characters) must come through unchanged; text in its place is
// reported. It compares against the English the page was translated from
// (src_commit in translation/sync-state.json), so a stale but correct
// translation does not misalign. When that English cannot be read (no
// src_commit, a shallow clone, a source renamed since), the structural test is
// skipped for the page with a notice; it never falls back to the current
// English, which may have gained a rule the translation rightly lacks.
//
// Scope (--base): only translation pages this change added, modified or
// renamed, and only lines the page did not already have at the merge base.
// A reply already on main is a notice, so it does not fail an unrelated PR
// that touches the page. Without --base every translated page is checked and
// every finding fails (a local sweep).
//
// Usage: node scripts/check-model-replies.mjs [--base <ref>]
//   (run from the content repo root)
// Exit 0 = no new model reply; 1 = at least one, or the check could not run.
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

import { findModelReplies, findReplacedAnchors, loadPatterns } from "../translation/lib/model-replies.mjs";

const root = process.cwd();
const git = (args) => execFileSync("git", args, { cwd: root, encoding: "utf8", maxBuffer: 64 * 1024 * 1024, stdio: ["ignore", "pipe", "pipe"] });
const annotate = !!process.env.GITHUB_ACTIONS;

function die(msg) {
  console.error(`Model-reply check could not run: ${msg}`);
  process.exit(1);
}

// translations/<loc>/site/<rel> -> site/<rel>
function source(path) {
  const p = path.split("/");
  if (p.length < 4 || p[0] !== "translations" || p[2] !== "site" || !path.endsWith(".md")) return null;
  return ["site", ...p.slice(3)].join("/");
}

function walk(dir) {
  if (!existsSync(join(root, dir))) return [];
  return readdirSync(join(root, dir), { withFileTypes: true }).flatMap((e) => {
    const p = `${dir}/${e.name}`;
    return e.isDirectory() ? walk(p) : e.name.endsWith(".md") ? [p] : [];
  });
}

const showAt = (rev, path) => {
  try { return git(["show", `${rev}:${path}`]); } catch { return null; }
};

let base = null;
const bi = process.argv.indexOf("--base");
if (bi >= 0) {
  base = process.argv[bi + 1];
  // CI passes --base "$BASE_REF_OUT"; an empty value must not silently turn a
  // scoped run into a whole-tree one.
  if (!base || base.startsWith("--")) die("--base was given without a ref. Omit it to check every page.");
}

let patterns;
try { patterns = loadPatterns(join(root, "translation/model-replies.json")); }
catch (e) { die(`translation/model-replies.json: ${e.message}`); }

let pages, mergeBase = null;
const renamedFrom = new Map();
if (base) {
  let sha = null;
  try { sha = git(["rev-parse", "--verify", "--quiet", `${base}^{commit}`]).trim(); } catch { /* below */ }
  if (!sha) die(`base ref "${base}" could not be resolved (shallow clone? run CI with fetch-depth: 0)`);
  mergeBase = sha;
  try { mergeBase = git(["merge-base", sha, "HEAD"]).trim() || sha; } catch { /* unrelated history */ }
  let out;
  try { out = git(["diff", "--name-status", "-M", "-z", "--diff-filter=ACMRT", `${mergeBase}..HEAD`, "--", "translations/"]); }
  catch (e) { die(`git diff against ${mergeBase.slice(0, 12)} failed: ${e.message.split("\n")[0]}`); }
  const f = out.split("\0");
  const set = new Set();
  for (let i = 0; i < f.length; i++) {
    if (!f[i]) continue;
    if (/^[RC]/.test(f[i])) { renamedFrom.set(f[i + 2], f[i + 1]); set.add(f[i + 2]); i += 2; }
    else { set.add(f[i + 1]); i += 1; }
  }
  // A local run also sees uncommitted and untracked translations; CI's
  // checkout is clean, so this changes nothing there.
  for (const args of [["diff", "--name-only", "-z", "HEAD", "--", "translations/"],
                      ["ls-files", "--others", "--exclude-standard", "-z", "--", "translations/"]]) {
    try { for (const p of git(args).split("\0")) if (p) set.add(p); } catch { /* range-only */ }
  }
  pages = [...set].filter((p) => source(p) && existsSync(join(root, p)));
} else {
  pages = walk("translations").filter((p) => source(p));
}

// English the page was translated from: sync-state's src_commit at <rev>.
const stateAt = new Map();
function syncState(rev) {
  if (!stateAt.has(rev)) {
    let st = {};
    try { st = JSON.parse(rev ? showAt(rev, "translation/sync-state.json") ?? "{}" : readFileSync(join(root, "translation/sync-state.json"), "utf8")); }
    catch { /* no state: fall back to the current English */ }
    stateAt.set(rev, st);
  }
  return stateAt.get(rev);
}
// null when it cannot be read; `alias` is the page's name before a rename.
function englishFor(tr, rev, alias) {
  const p = tr.split("/");
  const st = syncState(rev)?.[p[1]] ?? {};
  for (const name of alias && alias !== tr ? [tr, alias] : [tr]) {
    const q = name.split("/");
    const c = st[q.slice(3).join("/")]?.src_commit ?? st[p.slice(3).join("/")]?.src_commit;
    if (!c) continue;
    const text = showAt(c, source(name));
    if (text !== null) return text;
  }
  return null;
}
const noBaseline = new Set();
// Both tests can flag the same line; report it once (the English-opening hit).
// A line either English contains (current or src_commit) is a quote, not a reply.
function findAll(trText, enText, enBase, tr) {
  const found = findModelReplies(trText, enBase ? `${enText}\n${enBase}` : enText, patterns);
  if (enBase === null) { if (tr) noBaseline.add(tr); return found; }
  const seen = new Set(found.map((h) => h.line));
  for (const h of findReplacedAnchors(trText, enBase)) if (!seen.has(h.line)) found.push(h);
  return found.sort((x, y) => x.line - y.line);
}

const errors = [], inherited = [];
let checked = 0;
for (const tr of pages.sort()) {
  const src = source(tr);
  const srcAbs = join(root, src);
  const enText = existsSync(srcAbs) && statSync(srcAbs).isFile() ? readFileSync(srcAbs, "utf8") : "";
  const found = findAll(readFileSync(join(root, tr), "utf8"), enText, englishFor(tr, null, renamedFrom.get(tr)), tr);
  checked++;
  if (!found.length) continue;
  // Lines the page already carried at the base are inherited, matched by text
  // (not line number) so an unrelated edit above them does not make them new.
  let before = new Map();
  if (mergeBase) {
    const oldTr = renamedFrom.get(tr) ?? tr;
    const bTr = showAt(mergeBase, oldTr);
    const bEn = showAt(mergeBase, source(oldTr) ?? src) ?? "";
    if (bTr !== null) for (const h of findAll(bTr, bEn, englishFor(oldTr, mergeBase))) before.set(h.text, (before.get(h.text) ?? 0) + 1);
  }
  for (const h of found) {
    const n = before.get(h.text) ?? 0;
    if (n > 0) { before.set(h.text, n - 1); inherited.push({ tr, ...h }); }
    else errors.push({ tr, ...h });
  }
}

const quote = (t) => `"${t.slice(0, 120)}${t.length > 120 ? "…" : ""}"`;
const msg = (h) => h.english
  ? `the English has "${h.english}" here, which has nothing to translate, but the translation has text in its place: ${quote(h.text)}. This is usually a model's reply about the request, in the target language. Put "${h.english}" back.`
  : `this line is a model's reply about the translation request (${h.id}), not a translation: ${quote(h.text)}. Copy the English line if it has no text to translate (a separator, a single letter), or translate it.`;
for (const e of errors) {
  if (annotate) console.log(`::error file=${e.tr},line=${e.line},title=model reply::${msg(e)}`);
  else console.log(`${e.tr}:${e.line}: error: ${msg(e)}`);
}
if (inherited.length) {
  console.log(`\nnotice: ${inherited.length} model reply line(s) on the changed pages were already there at the base; not caused by this change, cheap to fix while you are in the file:`);
  for (const h of inherited.slice(0, 10)) console.log(`  - ${h.tr}:${h.line}: ${h.text.slice(0, 80)}`);
  if (inherited.length > 10) console.log(`  ... and ${inherited.length - 10} more`);
}

if (noBaseline.size) {
  console.log(`\nnotice: the English these ${noBaseline.size} page(s) were translated from could not be read (no src_commit in translation/sync-state.json, a shallow clone, or a renamed source), so only the reply openings were checked on them:`);
  for (const p of [...noBaseline].slice(0, 5)) console.log(`  - ${p}`);
  if (noBaseline.size > 5) console.log(`  ... and ${noBaseline.size - 5} more`);
}

const scope = mergeBase ? `${checked} changed translated page(s)` : `${checked} translated page(s)`;
if (errors.length) {
  console.error(`\nModel-reply check failed: ${errors.length} line(s) in ${new Set(errors.map((e) => e.tr)).size} page(s), across ${scope}.`);
  process.exit(1);
}
console.log(`Model-reply check passed for ${scope}.`);
