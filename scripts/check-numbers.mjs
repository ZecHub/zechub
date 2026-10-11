// Numbers and digit tokens in translated pages, compared with the English.
//
// Machine engines garble numbers while leaving everything else intact, so no
// other gate sees it: the local model wrote "ZIP 2emma" and "November 202kan",
// a block height lost a digit, a transaction hash changed one character, and
// Google Translate turned "August 24, 2026, 19:00 UTC" into Yoruba words that
// mean 16 August, 19 o'clock in the morning. See translation/lib/numbers.mjs
// for what is compared and how numbers are normalised across locales.
//
// Three rules, on prose only (code, URLs, link targets, HTML, image paths and
// protected names are masked):
//
//   digit-token  a token mixing digits with 3+ letters ("202kan", "2Atuo",
//                "Tsitsi16"), or a hash/address, that the English does not
//                contain. Always blocking.
//   numbers      a number (not 0-10) that vanished from the page or appeared
//                from nowhere, or one replaced by another on the same line
//                (a changed digit, even when both values occur elsewhere).
//                Blocking. Other count-only differences and small
//                numbers are warnings: good translations restate numbers and
//                spell out "four". Clock times are compared as minutes since
//                midnight first, so "19:00 UTC" may become "7 PM UTC".
//   versions     a version ("1.2.3", "v0.15.2") compared as a whole string:
//                one the English has and the translation lacks or changed, or
//                one the translation invents. Blocking, whatever its digits.
//
// Per-locale policy, from a calibration over every translation on main (see
// docs/translation-contributor-workflow.md):
//
//   ig  a MISSING number is a warning. Google Translate spells Igbo numbers out
//       ("iri abụọ na ise" for 25) and every spelled-out value checked was
//       right. Added numbers and digit tokens still block: they caught invented
//       years ("afọ 2000") and a damaged transaction hash.
//
//   Yoruba is deliberately NOT relaxed: its spelled-out numbers were wrong in
//   about a third of the cases checked (27 as 17, 30 as 300, June 26 as 16).
//
// Scope (--base): only translation pages this change added, modified or
// renamed, and only findings that the same page pair did not already have at
// the merge base. A digit token or hash is matched by the text around it (not
// the line number), so moving a bad token to another paragraph is new. A
// number finding is matched by value and count only, so a resync that rewords
// the sentence around an inherited one ("filiale à 100 %") does not block it
// again; more of it, or a warning turned blocking, is new. Damage already on
// main is a notice, so it does not fail every unrelated PR. Without --base
// every translated page is checked and every blocking finding fails (a local
// sweep).
//
// Usage: node scripts/check-numbers.mjs [--base <ref>] [--quiet] [--json <file>]
//   (run from the content repo root)
// --json <file> also writes the findings as JSON (schema "check-numbers/1"):
//   { schema, base, mergeBase, pages, errors, warnings, inherited }, each
//   finding { file, source, line, kind, value, severity, message }. inherited
//   lists the blocking findings already there at the base (the notice block);
//   errors and warnings are the new ones. The human output and the exit
//   status do not change; --quiet does not drop warnings from the file.
//   line is null when the new occurrence of a finding that the base partly
//   had cannot be told apart from the inherited ones. When the check cannot
//   run, the file still gets written, with pages 0, empty lists and an
//   "error" message; an older file at the path is removed first.
// Exit 0 = nothing blocking; 1 = at least one blocking finding, or the check
// could not run.
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { compare, introduced } from "../translation/lib/numbers.mjs";

const root = process.cwd();
const MAX_GIT_OUTPUT = 64 * 1024 * 1024;
const git = (args) => execFileSync("git", args, { cwd: root, encoding: "utf8", maxBuffer: MAX_GIT_OUTPUT, stdio: ["ignore", "pipe", "pipe"] });
const quiet = process.argv.includes("--quiet");
const annotate = !!process.env.GITHUB_ACTIONS;

// Locales where a missing number is advisory. Why: header comment.
export const MISSING_ADVISORY = new Set(["ig"]);

const JSON_SCHEMA = "check-numbers/1";
let jsonOut = null, base = null, mergeBase = null;

// The report goes to a temporary file in the same directory first, so a
// reader never sees half of it.
function writeReport(report) {
  const tmp = `${jsonOut}.tmp-${process.pid}`;
  try {
    writeFileSync(tmp, JSON.stringify(report, null, 2) + "\n");
    renameSync(tmp, jsonOut);
  } catch (e) {
    rmSync(tmp, { force: true });
    throw e;
  }
}

let dying = false;
function die(msg) {
  console.error(`Number check could not run: ${msg}`);
  // A consumer of --json must not mistake a run that never finished for a
  // clean one: the report says it failed, and why.
  if (jsonOut && !dying) {
    dying = true;
    try {
      writeReport({ schema: JSON_SCHEMA, base, mergeBase: null, pages: 0, errors: [], warnings: [], inherited: [], error: msg });
    } catch (e) { console.error(`Number check could not write ${jsonOut}: ${e.message}`); }
  }
  process.exit(1);
}

function resolveBase() {
  const i = process.argv.indexOf("--base");
  if (i < 0) return null;
  const ref = process.argv[i + 1];
  // CI passes --base "$BASE_REF_OUT"; an empty value must not silently turn a
  // scoped run into a whole-tree one.
  if (!ref || ref.startsWith("--")) die("--base was given without a ref. Omit it to check every page.");
  return ref;
}

function protectedTerms(text) {
  try { return JSON.parse(text).preserveVerbatim ?? []; } catch { return []; }
}

// translations/<loc>/site/<rel> -> { loc, source: site/<rel> }
function pair(path) {
  const p = path.split("/");
  if (p.length < 4 || p[0] !== "translations" || p[2] !== "site" || !path.endsWith(".md")) return null;
  return { loc: p[1], source: ["site", ...p.slice(3)].join("/") };
}

function walk(dir) {
  if (!existsSync(join(root, dir))) return [];
  return readdirSync(join(root, dir), { withFileTypes: true }).flatMap((e) => {
    const p = `${dir}/${e.name}`;
    return e.isDirectory() ? walk(p) : e.name.endsWith(".md") ? [p] : [];
  });
}

function resolveJsonOut() {
  const i = process.argv.indexOf("--json");
  if (i < 0) return null;
  const file = process.argv[i + 1];
  if (!file || file.startsWith("--")) die("--json was given without a file.");
  return file;
}

jsonOut = resolveJsonOut();
// A report left by an earlier run must never be read as this one's.
if (jsonOut) {
  try { rmSync(jsonOut, { force: true }); }
  catch (e) { const out = jsonOut; jsonOut = null; die(`could not remove the old ${out}: ${e.message}`); }
  process.on("uncaughtException", (e) => die(e?.message ?? String(e)));
}
base = resolveBase();
let pages;
const renamedFrom = new Map();

if (base) {
  let sha = null;
  try { sha = git(["rev-parse", "--verify", "--quiet", `${base}^{commit}`]).trim(); } catch { /* below */ }
  if (!sha) die(`base ref "${base}" could not be resolved (shallow clone? run CI with fetch-depth: 0)`);
  mergeBase = sha;
  try { mergeBase = git(["merge-base", sha, "HEAD"]).trim() || sha; } catch { /* unrelated history: diff against base */ }
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
  pages = [...set].filter((p) => pair(p) && existsSync(join(root, p)));
} else {
  pages = walk("translations").filter((p) => pair(p));
}

const showAt = (rev, path) => {
  try { return git(["show", `${rev}:${path}`]); } catch { return null; }
};

const headTerms = protectedTerms(existsSync(join(root, "translation/protected-terms.json"))
  ? readFileSync(join(root, "translation/protected-terms.json"), "utf8") : "{}");
const baseTerms = mergeBase ? protectedTerms(showAt(mergeBase, "translation/protected-terms.json") ?? "{}") : headTerms;

const errors = [], warnings = [], carried = [];
let checked = 0, noSource = 0;

for (const tr of pages.sort()) {
  const { loc, source } = pair(tr);
  const srcAbs = join(root, source);
  if (!existsSync(srcAbs) || !statSync(srcAbs).isFile()) { noSource++; continue; }
  let enText, trText;
  try { enText = readFileSync(srcAbs, "utf8"); trText = readFileSync(join(root, tr), "utf8"); }
  catch (e) { die(`could not read ${tr} or ${source}: ${e.message}`); }
  checked++;
  const lineCountsMatch = enText.split("\n").length === trText.split("\n").length;
  let found = compare(enText, trText, { locale: loc, protectedTerms: headTerms });
  if (MISSING_ADVISORY.has(loc))
    found = found.map((f) => (f.kind === "number-missing" ? { ...f, severity: "warning" } : f));
  if (mergeBase) {
    // The pair as it stood at the base: the translation's old path, and the
    // English that old path maps to. A page new in this range has no base.
    const oldTr = renamedFrom.get(tr) ?? tr;
    const oldPair = pair(oldTr);
    const bTr = showAt(mergeBase, oldTr);
    const bEn = oldPair ? showAt(mergeBase, oldPair.source) : null;
    const before = bTr !== null && bEn !== null ? compare(bEn, bTr, { locale: loc, protectedTerms: baseTerms }) : [];
    const fresh = introduced(found, before);
    for (const f of found) {
      const left = fresh.find((x) => x.kind === f.kind && x.value === f.value);
      if (!left && f.severity === "error") carried.push({ tr, source, f, lineCountsMatch });
    }
    found = fresh;
  }
  for (const f of found) (f.severity === "error" ? errors : warnings).push({ tr, source, f, lineCountsMatch });
}

// The line a finding points at; null when the base subtraction could not tell
// which occurrence is the new one (see introduced()).
const at = (f) => (f.lineUnknown ? null : f.lines[0]);
const unknown = (f) => (f.lineUnknown ? " (line unknown)" : "");

function describe({ tr, source, f, lineCountsMatch }) {
  const times = f.count > 1 ? ` (${f.count}x)` : "";
  if (f.kind === "digit-token") {
    return { line: at(f), msg: `"${f.value}"${times} mixes digits and letters and is not in ${source}${unknown(f)}. A number fused with a word, a translated name, or a damaged hash or address: copy it from the English.` };
  }
  if (f.kind === "number-missing") {
    // A missing number has no translation line; when the page keeps the
    // English line structure (it nearly always does) the same line is it.
    const enLine = at(f);
    if (enLine === null) return { line: null, msg: `number ${f.value}${times} from ${source} is missing (line unknown)${f.changed ? ` (the translation has ${f.changed.join(", ")} on that line)` : ""}. Keep numbers, dates and times as digits; do not spell them out or drop them.` };
    return { line: lineCountsMatch ? enLine : 1, msg: `number ${f.value}${times} from ${source}:${enLine} is missing${f.changed ? ` (the translation has ${f.changed.join(", ")} on that line)` : ""}. Keep numbers, dates and times as digits; do not spell them out or drop them.` };
  }
  if (f.kind === "version-missing") {
    const enLine = at(f);
    if (enLine === null) return { line: null, msg: `version ${f.value}${times} from ${source} is missing or changed (line unknown). Copy version numbers exactly as the English writes them.` };
    return { line: lineCountsMatch ? enLine : 1, msg: `version ${f.value}${times} from ${source}:${enLine} is missing or changed. Copy version numbers exactly as the English writes them.` };
  }
  if (f.kind === "version-added") {
    return { line: at(f), msg: `version ${f.value}${times} is not in ${source}${unknown(f)}. A changed or invented version number: copy it from the English.` };
  }
  return { line: at(f), msg: `number ${f.value}${times} is not in ${source}${f.absent ? "" : " this many times"}${unknown(f)}${f.changed ? ` (on a line where the English has ${f.changed.join(", ")})` : ""}. A changed digit, an invented date, or a number the English does not state.` };
}

const emit = (level, item) => {
  const { line, msg } = describe(item);
  const where = line === null ? "" : `,line=${line}`;
  if (annotate) console.log(`::${level} file=${item.tr}${where},title=numbers::${msg}`);
  else console.log(`${item.tr}${line === null ? "" : `:${line}`}: ${level}: ${msg}`);
};

if (!quiet) for (const w of warnings) emit("warning", w);
for (const e of errors) emit("error", e);

if (carried.length) {
  console.log(`\nnotice: ${carried.length} blocking finding(s) on the changed pages were already there at the base; not caused by this change, cheap to fix while you are in the file:`);
  for (const c of carried.slice(0, 10)) console.log(`  - ${c.tr}: ${c.f.kind} ${c.f.value}`);
  if (carried.length > 10) console.log(`  ... and ${carried.length - 10} more`);
}

if (jsonOut) {
  const record = (item) => {
    const { line, msg } = describe(item);
    return { file: item.tr, source: item.source, line, kind: item.f.kind, value: item.f.value, severity: item.f.severity, message: msg };
  };
  const report = {
    schema: JSON_SCHEMA,
    base,
    mergeBase,
    pages: checked,
    errors: errors.map(record),
    warnings: warnings.map(record),
    inherited: carried.map(record),
  };
  try { writeReport(report); }
  catch (e) { die(`could not write ${jsonOut}: ${e.message}`); }
}

const scope = mergeBase ? `${checked} changed translated page(s)` : `${checked} translated page(s)`;
const skipped = noSource ? ` (${noSource} without an English source skipped)` : "";
if (errors.length) {
  console.error(`\nNumber check failed: ${errors.length} blocking finding(s) in ${new Set(errors.map((e) => e.tr)).size} page(s), ${warnings.length} warning(s), across ${scope}${skipped}.`);
  process.exit(1);
}
console.log(`Number check passed for ${scope}${skipped}: ${warnings.length} warning(s).`);
