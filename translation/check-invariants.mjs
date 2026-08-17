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
//       manifest entry must have changed too. You cannot silently mutate a
//       translation without recording why.
//     - Normally you record the pass in `tool`, which is free-form
//       (e.g. "gpt-5.4+linkrepair"). Reach for `edited: true` ONLY for a
//       human-authored translation fix you want protected from machine
//       re-translation: it takes the page out of automated sync permanently
//       (sync.mjs holds edited:true pages forever), so using it for a
//       mechanical pass silently freezes that page against every future
//       re-sync. A bulk mechanical fix should never flip it.
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
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { hashPage } from "./lib/normalize-hash.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const VALID_ENGINES = new Set(["llm", "nllb", "gt"]);
const VALID_MODES = new Set(["seed", "diff", "full"]);

// Every git read below is sized for a corpus that grows. execFileSync defaults
// maxBuffer to 1 MiB and throws ENOBUFS past it, which is not a size this data
// will stay under: the manifest alone crossed 1 MiB in August 2026, and
// `git ls-files translations/` is already 210 KB at 18 locales × 203 pages and
// scales with their product. scripts/check-protected-terms.mjs uses the same
// bound for the same reason.
const MAX_GIT_OUTPUT = 64 * 1024 * 1024;

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
    out = execFileSync("git", ["ls-files", "translations/"], { cwd: root, encoding: "utf8", maxBuffer: MAX_GIT_OUTPUT });
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
      cwd: root, encoding: "utf8", maxBuffer: MAX_GIT_OUTPUT,
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
    // src_commit is used by the staleness detector for high-severity delta
    // judgment, so it must be a well-formed object id (or the seed literal).
    if (
      typeof e.src_commit !== "string" ||
      !(/^[0-9a-f]{7,40}$/.test(e.src_commit) || e.src_commit === "HEAD")
    ) {
      fail(`${loc}/${page}: invalid src_commit "${e.src_commit}"`);
    }
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

// Set when --base was passed but carries no usable value. Distinct from "no
// base requested", because ASKING for change-tracking and silently not getting
// it is precisely the failure this block exists to prevent. CI invokes
// `--base "$BASE_REF_OUT"`, so an empty variable arrives here as "".
let baseArgInvalid = false;

function resolveBase() {
  const i = process.argv.indexOf("--base");
  if (i >= 0) {
    const explicit = process.argv[i + 1];
    if (!explicit || explicit.startsWith("--")) {
      fail(
        "--base was given without a ref value — refusing to skip change-tracking silently. " +
        "Omit --base entirely to skip it deliberately.",
      );
      baseArgInvalid = true;
      return null;
    }
    return explicit;
  }
  if (process.env.GITHUB_BASE_REF) return `origin/${process.env.GITHUB_BASE_REF}`;
  return null;
}

const base = resolveBase();
if (baseArgInvalid) {
  // Already reported. Do not also print the notice below, which would read as
  // a deliberate skip.
} else if (!base) {
  console.log("notice: no base ref (--base / GITHUB_BASE_REF) — skipping change-tracking invariant.");
} else {
  // Fail closed: a REQUESTED base that can't be resolved must NOT silently skip
  // the gate (force-push, shallow clone, or a typo would otherwise disable the
  // only history-dependent invariant while still exiting green).
  let baseSha = null;
  try {
    baseSha = execFileSync("git", ["rev-parse", "--verify", "--quiet", `${base}^{commit}`], { cwd: root, encoding: "utf8", maxBuffer: MAX_GIT_OUTPUT }).trim();
  } catch {
    baseSha = null;
  }
  if (!baseSha) {
    fail(`base ref "${base}" could not be resolved — refusing to skip change-tracking silently (shallow clone? force-push? run CI with fetch-depth: 0).`);
  } else {
    let mergeBase = baseSha;
    try {
      mergeBase = execFileSync("git", ["merge-base", baseSha, "HEAD"], { cwd: root, encoding: "utf8", maxBuffer: MAX_GIT_OUTPUT }).trim();
    } catch {
      mergeBase = baseSha; // divergent/unrelated history → direct diff against base
    }

    // Whether the manifest existed at the base is a real distinction — absent
    // means this PR introduces it and there is genuinely nothing to
    // change-track. But absence has to be ESTABLISHED, never inferred from a
    // failed command. Inferring it made every possible failure indistinguishable
    // from a first introduction, and one such failure was already live: the
    // manifest crossed execFileSync's 1 MiB default maxBuffer, so `git show`
    // threw ENOBUFS and both directions below were skipped on every pull
    // request while this job kept reporting green. The bijection checks above
    // are unaffected by that, which is exactly why nothing looked wrong.
    //
    // `ls-tree` is the probe, not `cat-file -e`. Absence and presence are BOTH
    // exit 0 and are told apart by the output, so a non-zero exit is
    // unambiguously an error rather than an answer. `cat-file -e` cannot make
    // that distinction: it exits non-zero for an absent path AND for a blob it
    // could not obtain, so in a partial clone (`--filter=blob:none`, which is
    // how this repo is commonly cloned) an unreachable promisor remote would
    // read as "absent" and skip the gate again — a network trigger for the same
    // silent skip. `ls-tree` is also cheaper: it answers from the tree objects
    // and never needs the blob at all.
    let baseManifest = null;
    let firstIntroduction = false;
    let baseUnreadable = false;
    const baseManifestPath = `${mergeBase}:translation/sync-state.json`;
    let listed = null;
    try {
      listed = execFileSync(
        "git",
        ["ls-tree", "--name-only", mergeBase, "--", "translation/sync-state.json"],
        { cwd: root, encoding: "utf8", maxBuffer: MAX_GIT_OUTPUT },
      );
    } catch (e) {
      baseUnreadable = true;
      fail(
        `could not determine whether the manifest exists at base ${mergeBase.slice(0, 12)} ` +
        `(${e.code || e.message}) — refusing to skip change-tracking silently.`,
      );
    }
    if (!baseUnreadable && listed.trim() === "") {
      firstIntroduction = true;
    } else if (!baseUnreadable) {
      try {
        baseManifest = JSON.parse(execFileSync("git", ["show", baseManifestPath], { cwd: root, encoding: "utf8", maxBuffer: MAX_GIT_OUTPUT }));
      } catch (e) {
        baseUnreadable = true;
        fail(
          `the manifest exists at base ${mergeBase.slice(0, 12)} but could not be read (${e.code || e.message}) — ` +
          `refusing to skip change-tracking silently.`,
        );
      }
      // Well-formed JSON is not yet a usable manifest: a base containing `null`,
      // an array, or a string parses fine and then throws on the first
      // `baseManifest[loc]` below. Reject the shape here so the reason is
      // reported instead of a stack trace.
      if (!baseUnreadable && (typeof baseManifest !== "object" || baseManifest === null || Array.isArray(baseManifest))) {
        baseUnreadable = true;
        fail(`the manifest at base ${mergeBase.slice(0, 12)} is not a JSON object — cannot change-track against it.`);
      }
    }

    if (firstIntroduction) {
      console.log(`notice: base ${mergeBase.slice(0, 12)} has no manifest — first introduction, nothing to change-track.`);
    } else if (!baseUnreadable) {
      let changed;
      try {
        changed = execFileSync("git", ["diff", "--name-only", "-z", `${mergeBase}..HEAD`, "--", "translations/"], { cwd: root, encoding: "utf8", maxBuffer: MAX_GIT_OUTPUT });
      } catch (e) {
        // The base resolved but the diff failed — do not treat as "no changes".
        fail(`git diff against base ${mergeBase.slice(0, 12)} failed: ${e.message}`);
        changed = "";
      }
      const changedSet = new Set(
        changed.split("\0")
          .filter((p) => p.endsWith(".md"))
          .map((p) => p.match(/^translations\/([^/]+)\/site\/(.+)$/))
          .filter(Boolean)
          .map((m) => `${m[1]}/${m[2]}`),
      );

      // Direction 1 — translation changed ⇒ manifest must record why.
      for (const key of changedSet) {
        const [loc, ...rest] = key.split("/");
        const page = rest.join("/");
        const now = manifest[loc]?.[page];
        const was = baseManifest[loc]?.[page];
        if (!now) continue; // deletion — bijection handles the file/entry pairing
        // A hand-edit is a valid reason ONLY when the edited flag FLIPS in this
        // PR (false/absent → true). `edited:true` already at base is not a
        // standing licence to mutate the file forever with no manifest trace.
        const editFlipped = now.edited === true && was?.edited !== true;
        const provenanceChanged = !was || now.src !== was.src || now.mode !== was.mode || now.tool !== was.tool;
        if (!provenanceChanged && !editFlipped) {
          fail(`${loc}/${page}: translation changed but manifest provenance did not — record the pass in \`tool\` (free-form, e.g. "${now.tool || "gpt-5.4"}+linkrepair"). Only flip edited:true for a human-authored fix you want protected from machine re-translation: it removes the page from automated sync permanently.`);
        }
      }

      // Direction 2 — manifest src changed ⇒ the translation must have changed
      // too. Otherwise a one-commit hash bump marks a genuinely-stale translation
      // "fresh" forever — the exact lie this gate exists to prevent.
      for (const loc of locales) {
        for (const [page, now] of Object.entries(manifest[loc])) {
          const was = baseManifest[loc]?.[page];
          if (!was) continue; // new entry — bijection ensures a matching file
          if (now.src !== was.src && !changedSet.has(`${loc}/${page}`)) {
            fail(`${loc}/${page}: manifest src changed but the translation file did not — a hash bump alone would mark a stale translation "fresh"`);
          }
        }
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
