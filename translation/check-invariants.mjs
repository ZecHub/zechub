// Blocking consistency-invariant check for the translation manifest.
//
// The "atomic manifest can never lie" property only holds if every path that
// touches a translation also touches the manifest. A hand-edit, a forgotten
// term-fix, a botched conflict resolution, or a crashed regen would otherwise
// break it silently. This check enforces the relationship on every PR so the
// dashboard can be trusted. Wire it as a REQUIRED status.
//
// Invariants enforced:
//
//   Bijection (always, no git needed)
//     - Every listed curated page exists in site/  (no phantom curated entries).
//     - Per locale: the set of manifest entries == the set of translated files
//       present under translations/<locale>/site/  (no orphan translations
//       without provenance; no manifest entries for missing files).
//     - Every manifest entry's page is in curated-pages.txt (⇔ the curated list).
//     - Every entry carries well-formed provenance (src hash, valid engine,
//       valid mode, tool, boolean edited).
//     A locale may legitimately be MISSING some curated pages (a gap the
//     dashboard reports) — that is simply absence on both sides, not a violation.
//
//   Change-tracking (only when a base ref is available)
//     - If a translations/<locale>/…md file changed vs the base ref, its
//       manifest entry must have changed too (src/mode/tool), or the change
//       must declare edited: true. You cannot silently mutate a translation
//       without recording why.
//
//   Freshness declaration (always)
//     - If an entry claims freshness (src == current normalized source hash),
//       its translated file must exist. (Implied by bijection, checked explicitly.)
//
// Usage:
//   node translation/check-invariants.mjs [--base <ref>]
// Exit 0 = all invariants hold; exit 1 = one or more violations (prints them).
// If no base ref is given (and GITHUB_BASE_REF is unset), change-tracking is
// skipped with a notice rather than failing. Run from the content repo root.

import { readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { hashPage } from "./lib/normalize-hash.mjs";

const root = new URL("../", import.meta.url).pathname;
const VALID_ENGINES = new Set(["llm", "nllb", "gt"]);
const VALID_MODES = new Set(["seed", "diff", "full"]);

const violations = [];
const fail = (msg) => violations.push(msg);

// ---- load data ------------------------------------------------------------

const curated = readFileSync(join(root, "translation/curated-pages.txt"), "utf8")
  .split("\n").map((s) => s.trim()).filter(Boolean);
const curatedSet = new Set(curated);
if (curated.length !== curatedSet.size) {
  fail(`curated-pages.txt has duplicate entries (${curated.length} lines, ${curatedSet.size} unique).`);
}

let manifest;
try {
  manifest = JSON.parse(readFileSync(join(root, "translation/sync-state.json"), "utf8"));
} catch (e) {
  fail(`sync-state.json is not valid JSON: ${e.message}`);
  report();
}
const locales = Object.keys(manifest);

// ---- locale universe: manifest keys ⇔ translations/<loc> directories ------
// The manifest defines the locale universe for detection, so it must not be
// able to silently shrink: every translations/<loc>/ directory present in the
// tree must have a manifest key, and vice versa. Without this, deleting a
// locale's manifest block would hide all its pages from the dashboard.
function localeDirs() {
  let out;
  try {
    out = execFileSync("git", ["ls-files", "translations/"], { cwd: root, encoding: "utf8" });
  } catch {
    return new Set();
  }
  const dirs = new Set();
  for (const p of out.split("\n")) {
    const m = p.match(/^translations\/([^/]+)\/site\//);
    if (m) dirs.add(m[1]);
  }
  return dirs;
}
{
  const dirs = localeDirs();
  const manifestLocales = new Set(locales);
  for (const d of dirs) if (!manifestLocales.has(d)) fail(`locale "${d}" has translations but no manifest block`);
  for (const l of manifestLocales) if (!dirs.has(l)) fail(`manifest declares locale "${l}" with no translations/${l}/site/ directory`);
}

// ---- bijection: curated ⊆ site -------------------------------------------

for (const page of curated) {
  const abs = join(root, "site", page);
  if (!existsSync(abs) || !statSync(abs).isFile()) {
    fail(`curated page has no English source: site/${page}`);
  }
}

// ---- per-locale bijection + provenance ------------------------------------

function localeFiles(loc) {
  let out;
  try {
    out = execFileSync("git", ["ls-files", `translations/${loc}/site/`], {
      cwd: root, encoding: "utf8",
    });
  } catch {
    return new Set();
  }
  return new Set(
    out.split("\n")
      .filter((p) => p.endsWith(".md"))
      .map((p) => p.replace(`translations/${loc}/site/`, "")),
  );
}

for (const loc of locales) {
  const entries = manifest[loc];
  const entryPages = new Set(Object.keys(entries));
  const files = localeFiles(loc);

  // entry without a file
  for (const page of entryPages) {
    if (!files.has(page)) fail(`${loc}: manifest entry for missing file translations/${loc}/site/${page}`);
    if (!curatedSet.has(page)) fail(`${loc}: manifest entry for non-curated page "${page}"`);
  }
  // file without an entry (orphan translation, no provenance)
  for (const page of files) {
    if (!entryPages.has(page)) fail(`${loc}: translated file has no manifest entry translations/${loc}/site/${page}`);
  }
  // provenance well-formedness
  for (const [page, e] of Object.entries(entries)) {
    if (typeof e !== "object" || e === null) { fail(`${loc}/${page}: entry is not an object`); continue; }
    if (typeof e.src !== "string" || !/^sha256:[0-9a-f]{64}$/.test(e.src)) fail(`${loc}/${page}: invalid src hash`);
    if (!VALID_ENGINES.has(e.engine)) fail(`${loc}/${page}: invalid engine "${e.engine}"`);
    if (!VALID_MODES.has(e.mode)) fail(`${loc}/${page}: invalid mode "${e.mode}"`);
    if (typeof e.tool !== "string" || !e.tool) fail(`${loc}/${page}: missing tool`);
    if (typeof e.edited !== "boolean") fail(`${loc}/${page}: edited must be boolean`);
  }
}

// ---- freshness declaration ------------------------------------------------

const srcHashCache = new Map();
function currentHash(page) {
  if (!srcHashCache.has(page)) {
    const abs = join(root, "site", page);
    srcHashCache.set(page, (existsSync(abs) && statSync(abs).isFile()) ? hashPage(readFileSync(abs, "utf8")) : null);
  }
  return srcHashCache.get(page);
}
for (const loc of locales) {
  for (const [page, e] of Object.entries(manifest[loc])) {
    if (currentHash(page) === e.src) {
      const abs = join(root, "translations", loc, "site", page);
      if (!existsSync(abs)) fail(`${loc}/${page}: claims freshness but translated file is absent`);
    }
  }
}

// ---- change-tracking (git, optional) --------------------------------------

function resolveBase() {
  const explicit = argOf("--base");
  if (explicit) return explicit;
  if (process.env.GITHUB_BASE_REF) return `origin/${process.env.GITHUB_BASE_REF}`;
  return null;
}
function argOf(name) {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

const base = resolveBase();
if (!base) {
  console.log("notice: no base ref (--base / GITHUB_BASE_REF) — skipping change-tracking invariant.");
} else {
  let mergeBase, baseResolved = true;
  try {
    mergeBase = execFileSync("git", ["merge-base", base, "HEAD"], { cwd: root, encoding: "utf8" }).trim();
  } catch {
    mergeBase = base; // fall back to a direct diff
    baseResolved = false;
  }
  let baseManifest = {};
  let baseReadOk = true;
  try {
    baseManifest = JSON.parse(execFileSync("git", ["show", `${mergeBase}:translation/sync-state.json`], { cwd: root, encoding: "utf8" }));
  } catch {
    // Either no manifest at base (first introduction — nothing to change-track)
    // or the base ref is unreadable (shallow clone). The former is fine; the
    // latter means a REQUESTED check silently did nothing, so say so loudly.
    baseManifest = null;
    baseReadOk = false;
  }
  if (!baseResolved || !baseReadOk) {
    console.warn(`notice: change-tracking skipped — base "${base}" ${baseResolved ? "has no manifest (first introduction?)" : "could not be resolved (shallow clone? run with fetch-depth: 0)"}.`);
  }

  if (baseManifest !== null) {
    let changed;
    try {
      changed = execFileSync("git", ["diff", "--name-only", `${mergeBase}..HEAD`, "--", "translations/"], { cwd: root, encoding: "utf8" });
    } catch {
      changed = "";
    }
    const changedTranslations = changed.split("\n")
      .filter((p) => p.endsWith(".md"))
      .map((p) => p.match(/^translations\/([^/]+)\/site\/(.+)$/))
      .filter(Boolean);

    for (const m of changedTranslations) {
      const loc = m[1], page = m[2];
      const now = manifest[loc]?.[page];
      const was = baseManifest[loc]?.[page];
      if (!now) continue; // deletion — bijection already handles the file/entry pairing
      // edited:true means a human owns this file; a repeated hand-edit is allowed
      // without other provenance changes (avoids a CI deadlock on the 2nd edit).
      const declaredEdit = now.edited === true;
      const provenanceChanged = !was || now.src !== was.src || now.mode !== was.mode || now.tool !== was.tool;
      if (!provenanceChanged && !declaredEdit) {
        fail(`${loc}/${page}: translation changed but manifest provenance did not (set edited:true for a deliberate hand-edit, or record the new src/mode/tool)`);
      }
    }
  }
}

report();

function report() {
  if (violations.length === 0) {
    console.log(`Manifest invariants hold: ${curated.length} curated pages, ${locales.length} locales.`);
    process.exit(0);
  }
  console.error(`Manifest invariant check FAILED with ${violations.length} violation(s):`);
  for (const v of violations) console.error(`  - ${v}`);
  process.exit(1);
}
