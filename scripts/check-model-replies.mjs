// Model replies saved as translations (ZecHub/zechub#2467).
//
// Fails when a translated page contains a line that is a model's reply about
// the translation request rather than a translation: "Please provide the
// Markdown fragment you would like me to translate...", "I cannot translate
// this fragment because...". The openings are listed in
// translation/model-replies.json (shared with the translation runner); the
// matching rules are in translation/lib/model-replies.mjs.
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

import { findModelReplies, loadPatterns } from "../translation/lib/model-replies.mjs";

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

const errors = [], inherited = [];
let checked = 0;
for (const tr of pages.sort()) {
  const src = source(tr);
  const srcAbs = join(root, src);
  const enText = existsSync(srcAbs) && statSync(srcAbs).isFile() ? readFileSync(srcAbs, "utf8") : "";
  const found = findModelReplies(readFileSync(join(root, tr), "utf8"), enText, patterns);
  checked++;
  if (!found.length) continue;
  // Lines the page already carried at the base are inherited, matched by text
  // (not line number) so an unrelated edit above them does not make them new.
  let before = new Map();
  if (mergeBase) {
    const oldTr = renamedFrom.get(tr) ?? tr;
    const bTr = showAt(mergeBase, oldTr);
    const bEn = showAt(mergeBase, source(oldTr) ?? src) ?? "";
    if (bTr !== null) for (const h of findModelReplies(bTr, bEn, patterns)) before.set(h.text, (before.get(h.text) ?? 0) + 1);
  }
  for (const h of found) {
    const n = before.get(h.text) ?? 0;
    if (n > 0) { before.set(h.text, n - 1); inherited.push({ tr, ...h }); }
    else errors.push({ tr, ...h });
  }
}

const msg = (h) => `this line is a model's reply about the translation request (${h.id}), not a translation: "${h.text.slice(0, 120)}${h.text.length > 120 ? "…" : ""}". Copy the English line if it has no text to translate (a separator, a single letter), or translate it.`;
for (const e of errors) {
  if (annotate) console.log(`::error file=${e.tr},line=${e.line},title=model reply::${msg(e)}`);
  else console.log(`${e.tr}:${e.line}: error: ${msg(e)}`);
}
if (inherited.length) {
  console.log(`\nnotice: ${inherited.length} model reply line(s) on the changed pages were already there at the base; not caused by this change, cheap to fix while you are in the file:`);
  for (const h of inherited.slice(0, 10)) console.log(`  - ${h.tr}:${h.line}: ${h.text.slice(0, 80)}`);
  if (inherited.length > 10) console.log(`  ... and ${inherited.length - 10} more`);
}

const scope = mergeBase ? `${checked} changed translated page(s)` : `${checked} translated page(s)`;
if (errors.length) {
  console.error(`\nModel-reply check failed: ${errors.length} line(s) in ${new Set(errors.map((e) => e.tr)).size} page(s), across ${scope}.`);
  process.exit(1);
}
console.log(`Model-reply check passed for ${scope}.`);
