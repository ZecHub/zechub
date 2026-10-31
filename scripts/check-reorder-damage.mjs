// Reordering damage on translated pages (ZecHub/zechub#2427).
//
// When a model reorders a sentence around the placeholders that hide protected
// names and link brackets, it can drop the space next to a name
// («[ZcashΠορτοφόλια του οικοσυστήματος]») or move a link's "[" away from its
// "](url)" («Ο οδηγός ZecHubΠώς να ... Phantom](/using-zcash/solswap) του [ καλύπτει»).
// Bracket COUNTS stay equal, so check-invariants passes both. The rules and
// their calibration live in translation/lib/reorder-damage.mjs; the
// translation runner loads the same module, so a reply it accepts is one this
// gate accepts.
//
// Scope, as for the other translation gates: with --base, only translated
// pages the PR changes are checked, and damage the page already had at the
// merge base is a notice, not a failure. Without --base every translated page
// is checked (a sweep); --json prints the findings and per-locale counts.
//
// Usage: node scripts/check-reorder-damage.mjs [--base <ref>] [--json]
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

import { baselineDamage, findReorderDamage, splitInherited, RULE_HELP } from "../translation/lib/reorder-damage.mjs";

const root = process.cwd();
const git = (args) => execFileSync("git", args, { cwd: root, encoding: "utf8", maxBuffer: 64 * 1024 * 1024, stdio: ["ignore", "pipe", "pipe"] });
const annotate = !!process.env.GITHUB_ACTIONS;
const json = process.argv.includes("--json");

function die(msg) {
  console.error(`Reorder-damage check could not run: ${msg}`);
  process.exit(1);
}

// Protected names ending or starting in a digit or punctuation ("NU5",
// "Zingo!") are matched as whole names; the letter rule cannot see them. An
// absent file only loses that extra coverage; a malformed one is an error
// (check-terms-file.mjs reports why).
let terms = [];
const termsPath = join(root, "translation/protected-terms.json");
if (existsSync(termsPath)) {
  try { terms = JSON.parse(readFileSync(termsPath, "utf8")).preserveVerbatim ?? []; }
  catch (e) { die(`translation/protected-terms.json: ${e.message}`); }
  if (!Array.isArray(terms)) die("translation/protected-terms.json: preserveVerbatim is not a list");
}

// translations/<loc>/site/<page>.md -> { loc, en: site/<page>.md }
function parse(path) {
  const p = path.split("/");
  if (p.length < 4 || p[0] !== "translations" || p[2] !== "site" || !path.endsWith(".md")) return null;
  return { loc: p[1], en: ["site", ...p.slice(3)].join("/") };
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
const readFile = (p) => {
  const abs = join(root, p);
  return existsSync(abs) && statSync(abs).isFile() ? readFileSync(abs, "utf8") : "";
};

let base = null;
const bi = process.argv.indexOf("--base");
if (bi >= 0) {
  base = process.argv[bi + 1];
  if (!base || base.startsWith("--")) die("--base was given without a ref. Omit it to check every page.");
}

let pages, mergeBase = null;
const renamedFrom = new Map();
if (base) {
  let sha = null;
  try { sha = git(["rev-parse", "--verify", "--quiet", `${base}^{commit}`]).trim(); } catch { /* below */ }
  if (!sha) die(`base ref "${base}" could not be resolved (shallow clone? run CI with fetch-depth: 0)`);
  mergeBase = sha;
  try { mergeBase = git(["merge-base", sha, "HEAD"]).trim() || sha; } catch { /* unrelated history: compare with the ref itself */ }
  // Base against the WORKING TREE (not ..HEAD), so an uncommitted or staged
  // rename is seen as a rename too, and a local run before committing sees
  // what CI will see. Untracked pages are added below.
  let out;
  try { out = git(["diff", "--name-status", "-M", "-z", "--diff-filter=ACMRT", mergeBase, "--", "translations/"]); }
  catch (e) { die(`git diff against ${mergeBase.slice(0, 12)} failed: ${e.message.split("\n")[0]}`); }
  const f = out.split("\0");
  const set = new Set();
  for (let i = 0; i < f.length; i++) {
    if (!f[i]) continue;
    if (/^[RC]/.test(f[i])) { renamedFrom.set(f[i + 2], f[i + 1]); set.add(f[i + 2]); i += 2; }
    else { set.add(f[i + 1]); i += 1; }
  }
  try { for (const p of git(["ls-files", "--others", "--exclude-standard", "-z", "--", "translations/"]).split("\0")) if (p) set.add(p); }
  catch { /* nothing untracked */ }
  pages = [...set].filter((p) => parse(p) && existsSync(join(root, p)) && statSync(join(root, p)).isFile());
} else {
  pages = walk("translations").filter((p) => parse(p));
}

const errors = [], inherited = [];
for (const tr of pages.sort()) {
  const { loc, en } = parse(tr);
  const found = findReorderDamage(readFileSync(join(root, tr), "utf8"), loc, readFile(en), terms).map((h) => ({ tr, loc, ...h }));
  if (!found.length) continue;
  let before = [];
  if (mergeBase) {
    const oldTr = renamedFrom.get(tr) ?? tr;
    const old = parse(oldTr);
    const bTr = showAt(mergeBase, oldTr);
    if (bTr !== null && old) before = baselineDamage(bTr, old.loc, showAt(mergeBase, old.en) ?? "", terms);
  }
  const s = splitInherited(found, before);
  errors.push(...s.fresh);
  inherited.push(...s.inherited);
}

if (json) {
  const counts = {};
  for (const e of [...errors, ...inherited]) {
    counts[e.loc] ??= {};
    counts[e.loc][e.rule] = (counts[e.loc][e.rule] ?? 0) + 1;
  }
  const strip = ({ tr, loc, rule, line, col, key, text }) => ({ file: tr, loc, rule, line, col, key, text });
  console.log(JSON.stringify({ pages: pages.length, counts, errors: errors.map(strip), inherited: inherited.map(strip) }, null, 2));
} else {
  const quote = (t) => `"${t.trim().slice(0, 140)}${t.trim().length > 140 ? "…" : ""}"`;
  const esc = (x) => String(x).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
  const escProp = (x) => esc(x).replace(/,/g, "%2C").replace(/:/g, "%3A");
  for (const e of errors) {
    const msg = `${e.rule}: ${RULE_HELP[e.rule]}. Line: ${quote(e.text)}`;
    if (annotate) console.log(`::error file=${escProp(e.tr)},line=${e.line},col=${e.col},title=reorder damage::${esc(msg)}`);
    else console.log(`${e.tr}:${e.line}:${e.col}: error: ${msg}`);
  }
  if (inherited.length) {
    console.log(`\nnotice: ${inherited.length} reorder-damage finding(s) on the changed pages were already there at the base; not caused by this change, cheap to fix while you are in the file:`);
    for (const h of inherited.slice(0, 10)) console.log(`  - ${h.tr}:${h.line}: ${h.rule}: ${h.text.trim().slice(0, 80)}`);
    if (inherited.length > 10) console.log(`  ... and ${inherited.length - 10} more`);
  }
}

// process.exitCode, never process.exit(): exit() does not wait for a piped
// stdout to drain, so `--json | jq` received a truncated document.
const scope = mergeBase ? `${pages.length} changed translated page(s)` : `${pages.length} translated page(s)`;
if (errors.length) {
  console.error(`\nReorder-damage check failed: ${errors.length} finding(s) in ${new Set(errors.map((e) => e.tr)).size} page(s), across ${scope}.`);
  process.exitCode = 1;
} else {
  (json ? console.error : console.log)(`Reorder-damage check passed: ${scope}${inherited.length ? `, ${inherited.length} inherited finding(s)` : ""}.`);
}
