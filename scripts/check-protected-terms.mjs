// Validate that protected Zcash ecosystem terms are preserved verbatim in
// translated wiki pages.
//
// Usage: node scripts/check-protected-terms.mjs [--base <ref>]
//   (run from the content repo root)
//
// This script is locale-generic. It walks the translations/ tree for whatever
// locale folders exist (translations/<locale>/site/...), maps each translated
// Markdown file back to its English source under site/, and checks that every
// protected term present in the source also appears in the translation.
//
// It passes cleanly (exit 0) when there are no translations yet, so the
// tooling is self-consistent before any translated corpus lands.
//
// ---- Scope (--base) -------------------------------------------------------
//
// Without --base every violation anywhere in the tree is fatal. That is right
// for a local audit but wrong for a PR gate: the wiki's English pages are
// edited continuously by many contributors, and each new protected term lands
// in `site/` long before the 18 translations catch up. A whole-tree gate turns
// that unavoidable lag into a red X on every open PR, including PRs that touch
// no translation at all — so the signal stops meaning anything and maintainers
// learn to merge through it.
//
// With --base, this gate polices what a change actually did to TRANSLATIONS,
// and leaves English-source drift to its owner: the staleness detector
// (translation/detect-staleness.mjs) and its dashboard issue. A violation is
// fatal only when the change introduced it into a translated file:
//
//   introduced   translation changed in this range and did not violate at the
//                base (includes a newly added translation) -> FAIL
//   stale-source translation untouched; the English source moved under it
//                -> warn (this is staleness, tracked on the dashboard)
//   pre-existing already violating at the base -> warn
//
// Mirrors the base-ref handling of translation/check-invariants.mjs, including
// its fail-closed behaviour: a base that was REQUESTED but cannot be resolved
// is an error, never a silent skip.
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("../", import.meta.url).pathname;
const config = JSON.parse(
  readFileSync(join(root, "translation/protected-terms.json"), "utf8"),
);

const translationsDir = join(root, "translations");

function resolveBase() {
  const i = process.argv.indexOf("--base");
  if (i >= 0) {
    const explicit = process.argv[i + 1];
    // An explicitly passed but empty/absent value must not quietly degrade to a
    // whole-tree audit: that changes what the gate means without saying so.
    if (!explicit || explicit.startsWith("--")) {
      die('--base requires a ref. Omit --base entirely for a whole-tree audit.');
    }
    return explicit;
  }
  if (process.env.GITHUB_BASE_REF) return `origin/${process.env.GITHUB_BASE_REF}`;
  return null;
}

// Collect every translated Markdown file under translations/<locale>/site/...
function walk(dir) {
  let out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      out = out.concat(walk(p));
    } else if (entry.name.endsWith(".md")) {
      out.push(p);
    }
  }
  return out;
}

// A translated page is anything matching translations/<locale>/site/<rel>.md
// We derive its English source as site/<rel>.md.
function sourceForTranslation(absTranslated) {
  const rel = relative(translationsDir, absTranslated); // <locale>/site/<rel>
  const parts = rel.split(/[\\/]/);
  if (parts.length < 3 || parts[1] !== "site") return null;
  const sourceRel = join("site", ...parts.slice(2));
  return sourceRel;
}

function termRegExp(term) {
  // Word-boundary match so short terms don't false-positive inside other
  // words (e.g. "mining" must not match "deter*mining*"; "chain" is still
  // satisfied by "block*chain*" only via the standalone token's boundaries).
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<![A-Za-z0-9])${escaped}(?![A-Za-z0-9])`);
}

const terms = config.preserveVerbatim ?? [];

// ---- pass 1: every violation in the working tree ---------------------------

const violations = [];
let checked = 0;
let skippedNoSource = 0;

for (const translatedAbs of walk(translationsDir)) {
  // Skip non-page docs (e.g. TRANSLATION_STATUS.md at the translations/ root).
  const sourceRel = sourceForTranslation(translatedAbs);
  if (!sourceRel) continue;

  const sourceAbs = join(root, sourceRel);
  if (!existsSync(sourceAbs) || !statSync(sourceAbs).isFile()) {
    // Translation with no matching English source — flag but don't hard-fail
    // the protected-terms gate on it.
    console.warn(
      `${relative(root, translatedAbs)}: no English source at ${sourceRel} (skipped)`,
    );
    skippedNoSource += 1;
    continue;
  }

  const source = readFileSync(sourceAbs, "utf8");
  const translated = readFileSync(translatedAbs, "utf8");
  const translatedRel = relative(root, translatedAbs);
  checked += 1;

  for (const term of terms) {
    const re = termRegExp(term);
    if (re.test(source) && !re.test(translated)) {
      violations.push({ translatedRel, sourceRel, term });
    }
  }
}

// ---- pass 2: classify against the base (optional) --------------------------

function die(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

const base = resolveBase();
let mergeBase = null;

if (base) {
  // Fail closed: a REQUESTED base that can't be resolved must NOT silently
  // widen (or disable) the gate.
  let baseSha = null;
  try {
    baseSha = execFileSync("git", ["rev-parse", "--verify", "--quiet", `${base}^{commit}`], { cwd: root, encoding: "utf8" }).trim();
  } catch {
    baseSha = null;
  }
  if (!baseSha) {
    die(`base ref "${base}" could not be resolved — refusing to guess the scope (shallow clone? force-push? run CI with fetch-depth: 0).`);
  }
  try {
    mergeBase = execFileSync("git", ["merge-base", baseSha, "HEAD"], { cwd: root, encoding: "utf8" }).trim();
  } catch {
    mergeBase = baseSha; // divergent/unrelated history → direct diff against base
  }
}

// Which translated files this change touched. Only consulted when a base was
// resolved; a diff failure there is fatal rather than "nothing changed",
// which would mis-classify every introduced violation as stale-source.
let changedTranslations = null;
// new path -> path the content lived at in the base, for pages moved in this
// range. Without this a moved translation looks brand-new, so drift it merely
// carried across the move would be blamed on the move.
const renamedFrom = new Map();
if (mergeBase) {
  let changed;
  try {
    changed = execFileSync("git", ["diff", "--name-status", "-M", "-z", `${mergeBase}..HEAD`], { cwd: root, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  } catch (e) {
    die(`git diff against base ${mergeBase.slice(0, 12)} failed: ${e.message}`);
  }
  // -z --name-status is a NUL stream: STATUS \0 PATH \0 for ordinary changes,
  // and R### \0 OLD \0 NEW \0 for renames/copies.
  const fields = changed.split("\0");
  changedTranslations = new Set();
  for (let i = 0; i < fields.length; i += 1) {
    const status = fields[i];
    if (!status) continue;
    if (status[0] === "R" || status[0] === "C") {
      const from = fields[i + 1];
      const to = fields[i + 2];
      i += 2;
      if (!to) continue;
      renamedFrom.set(to, from);
      if (to.startsWith("translations/") && to.endsWith(".md")) changedTranslations.add(to);
    } else {
      const path = fields[i + 1];
      i += 1;
      if (path && path.startsWith("translations/") && path.endsWith(".md")) changedTranslations.add(path);
    }
  }
  // Pass 1 reads the WORKING TREE, so on a local run an uncommitted or untracked
  // translation is invisible to the range diff and would read as inherited
  // staleness. Fold both in. No effect in CI, where the checkout is clean.
  for (const args of [
    ["diff", "--name-only", "-z", "HEAD", "--", "translations/"],
    ["ls-files", "--others", "--exclude-standard", "-z", "--", "translations/"],
  ]) {
    try {
      const out = execFileSync("git", args, { cwd: root, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
      for (const p of out.split("\0")) if (p.endsWith(".md")) changedTranslations.add(p);
    } catch { /* non-fatal: scope stays range-only */ }
  }
}

// translations/<locale>/site/<rel> -> site/<rel>, on repo-relative paths.
// String-only counterpart of sourceForTranslation(), for paths that exist at
// the base rather than on disk.
function sourceForTranslationRel(rel) {
  const parts = rel.split("/");
  if (parts.length < 4 || parts[0] !== "translations" || parts[2] !== "site") return null;
  return ["site", ...parts.slice(3)].join("/");
}

// Base file contents, cached: one `git show` per distinct path, not per term.
// Takes the path AS IT WAS at the base — callers resolve renames first.
const baseFileCache = new Map();
function baseContentAt(basePath) {
  if (baseFileCache.has(basePath)) return baseFileCache.get(basePath);
  let content = null; // null = absent at the base
  try {
    content = execFileSync("git", ["show", `${mergeBase}:${basePath}`], { cwd: root, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  } catch {
    content = null;
  }
  baseFileCache.set(basePath, content);
  return content;
}

function classify(v) {
  if (!mergeBase) return "introduced"; // no base requested → whole-tree audit
  // Judge pre-existence against the pairing that ACTUALLY existed at the base:
  // the translated file's base path, and the English source that that path
  // derives from. Pairing the old content with the CURRENT path's source
  // invents a comparison that never existed — moving a translation into a
  // different page's slot would then read every freshly created violation as
  // pre-existing, because the new slot's English source legitimately carries
  // terms the moved content never had to.
  const baseTranslatedPath = renamedFrom.get(v.translatedRel) ?? v.translatedRel;
  const baseSourcePath = sourceForTranslationRel(baseTranslatedPath);
  const baseTranslated = baseContentAt(baseTranslatedPath);
  const baseSource = baseSourcePath === null ? null : baseContentAt(baseSourcePath);
  // A translation (or its source) absent at the base is new here, so it cannot
  // be pre-existing.
  const violatedAtBase =
    baseTranslated !== null &&
    baseSource !== null &&
    termRegExp(v.term).test(baseSource) &&
    !termRegExp(v.term).test(baseTranslated);
  if (violatedAtBase) return "pre-existing";
  return changedTranslations.has(v.translatedRel) ? "introduced" : "stale-source";
}

const buckets = { introduced: [], "stale-source": [], "pre-existing": [] };
for (const v of violations) buckets[classify(v)].push(v);

for (const v of buckets.introduced) {
  console.error(`${v.translatedRel}: missing protected term "${v.term}"`);
}

if (mergeBase) {
  const carried = buckets["pre-existing"].length + buckets["stale-source"].length;
  if (carried) {
    console.log(
      `\nnotice: ${carried} pre-existing violation(s) not caused by this change ` +
      `(${buckets["pre-existing"].length} already failing at the base, ` +
      `${buckets["stale-source"].length} from English pages edited since a translation was last synced). ` +
      `These are translation staleness, tracked on the staleness dashboard — not a defect in this change.`,
    );
    const sample = [...buckets["stale-source"], ...buckets["pre-existing"]].slice(0, 10);
    for (const v of sample) console.log(`  - ${v.translatedRel}: "${v.term}"`);
    if (carried > sample.length) console.log(`  … and ${carried - sample.length} more`);

    // Violations a change carried forward in a file it edited anyway. Deliberately
    // not fatal: the miss came from English drift, and failing here would put the
    // 18-locale sync burden on whoever touches the file next — the exact blocking
    // this scoping removes. Surfaced separately so it is a visible, easy fix for
    // an author already in that file rather than something the notice buries.
    const touchedCarried = buckets["pre-existing"].filter((v) => changedTranslations.has(v.translatedRel));
    if (touchedCarried.length) {
      console.log(
        `\nnotice: ${touchedCarried.length} of those are in translated file(s) this change edits — ` +
        `not required, but cheap to fix while you are in there:`,
      );
      for (const v of touchedCarried.slice(0, 10)) console.log(`  - ${v.translatedRel}: "${v.term}"`);
      if (touchedCarried.length > 10) console.log(`  … and ${touchedCarried.length - 10} more`);
    }
  }
}

if (buckets.introduced.length > 0) {
  console.error(
    `Protected terminology validation failed with ${buckets.introduced.length} missing term(s)` +
    (mergeBase ? " introduced by this change." : "."),
  );
  process.exit(1);
}

if (checked === 0) {
  console.log(
    "Protected terminology validation passed (no translated pages to check).",
  );
} else {
  const extra = skippedNoSource ? ` (${skippedNoSource} without an English source skipped)` : "";
  console.log(
    `Protected terminology validation passed for ${checked} translated page(s)${extra}.`,
  );
}
