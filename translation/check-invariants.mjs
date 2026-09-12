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
//   Bijection (always; needs git to list the tree, but no base ref)
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
import { parseVerifiedNoops, noopAllowed } from "./lib/verified-noops.mjs";

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

// Declared HERE, beside the other module state, and not next to resolveBase()
// where it is written. resolveBase() assigns it, and the curated-vs-site check
// below calls resolveBase() during module evaluation — about 130 lines before
// this used to be declared. Assigning into a `let` that has not initialised yet
// is a TDZ ReferenceError, and it fired in the exact case the flag exists for
// (`--base` with an empty value, which is how CI passes an unset base ref).
// Worse than a crash: it threw before report(), so every other violation the run
// had already collected was discarded and the check printed a stack trace
// instead of its findings.
let baseArgInvalid = false;

// resolveBase() is NOT idempotent — it calls fail() on a malformed --base. It is
// now needed both here and by the change-tracking section, so it must run
// exactly once or an invalid --base would be reported twice.
let _baseRefMemo;
function baseRef() {
  if (_baseRefMemo === undefined) _baseRefMemo = resolveBase();
  return _baseRefMemo;
}

const violations = [];
const fail = (msg) => violations.push(msg);
// Non-fatal. A notice is for something a human should tidy but that is not wrong:
// it must never change the exit code, or an ordinary edit elsewhere would turn
// this check red for housekeeping.
const notices = [];
const note = (msg) => notices.push(msg);

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
const isBlock = (v) => typeof v === "object" && v !== null && !Array.isArray(v);
// The file parsed as JSON, which does not make it a manifest: `null`, a list or a
// string all parse. Object.keys(null) is a TypeError, and a TypeError here throws
// away the report along with every finding in it.
if (!isBlock(manifest)) {
  fail("sync-state.json is not a JSON object — cannot read any locale from it.");
  report();
}
const locales = Object.keys(manifest);
// Every level of the manifest gets its shape checked before anything reads it.
// The top level was checked and the entries were checked; the locale blocks in
// between were not, and Object.keys(null) is a TypeError — which loses every
// violation collected so far and prints a stack trace instead of the report.
for (const loc of locales) {
  if (!isBlock(manifest[loc])) {
    fail(`manifest locale "${loc}" is not an object — cannot read its entries.`);
    report();
  }
}

// ---- the human-authored Direction 2 exception list ------------------------
// Absent means no exceptions, which is exactly the behaviour before it existed.
const VERIFIED_NOOPS_PATH = "translation/verified-noops.txt";
const verifiedNoops = (() => {
  const abs = join(root, VERIFIED_NOOPS_PATH);
  if (!existsSync(abs)) return new Map();
  const { entries, errors } = parseVerifiedNoops(readFileSync(abs, "utf8"));
  for (const e of errors) fail(`${VERIFIED_NOOPS_PATH}: ${e}`);
  for (const key of entries.keys()) {
    const [loc, ...rest] = key.split("/");
    const page = rest.join("/");
    // A line naming a locale or page that does not exist grants nothing — the
    // key can never match an entry — so this is a notice, not a violation.
    // Failing here would make retiring a page or a locale impossible until
    // somebody remembered to edit this file, and would turn a correct cleanup
    // into a red build. A typo is worth surfacing; it is not worth blocking on.
    if (!manifest[loc]) note(`${VERIFIED_NOOPS_PATH}: "${key}" names locale "${loc}", which does not exist — the line grants nothing and can be removed`);
    else if (!curatedSet.has(page)) note(`${VERIFIED_NOOPS_PATH}: "${key}" names a page that is not curated — the line grants nothing and can be removed`);
  }
  return entries;
})();

// ---- locale universe: manifest keys ⇔ translations/<loc> directories ------
// The manifest defines the locale universe for detection, so it must not be
// able to silently shrink: every translations/<loc>/ directory present in the
// tree must have a manifest key, and vice versa. Without this, deleting a
// locale's manifest block would hide all its pages from the dashboard.
function localeDirs() {
  let out;
  try {
    out = execFileSync("git", ["ls-files", "translations/"], { cwd: root, encoding: "utf8", maxBuffer: MAX_GIT_OUTPUT });
  } catch (e) {
    // An empty set here means "no locale directories exist", which would hide
    // the entire translated corpus and pass every bijection check vacuously.
    // Absence must be observed, never inferred from a failure.
    fail(`could not list translations/ (${e.code || e.message}) — refusing to treat that as "nothing is there".`);
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

// ---- every tracked translation is an ordinary file -----------------------
// A symlink's blob holds its TARGET PATH, so the object id and the text a reader
// actually sees can move independently: the diff says "changed" when the page did
// not, or says nothing when the target was rewritten underneath it. The change
// detector refuses that shape when it appears in a diff, but a link that was
// already there never appears in one — so state the rule over the whole tree,
// where it is a rule rather than a special case.
{
  let listing;
  try {
    listing = execFileSync("git", ["ls-files", "-s", "-z", "--", "translations/"], { cwd: root, encoding: "utf8", maxBuffer: MAX_GIT_OUTPUT });
  } catch (e) {
    fail(`could not list translations/ with modes (${e.code || e.message}) — refusing to treat that as "nothing is there".`);
    listing = "";
  }
  for (const rec of listing.split("\0")) {
    if (!rec) continue;
    const m = rec.match(/^(\d{6}) [0-9a-f]+ \d+\t([\s\S]+)$/);
    if (!m) { fail(`could not parse git ls-files record "${rec.slice(0, 80)}".`); continue; }
    const [, mode, path] = m;
    if (!path.endsWith(".md")) continue;
    if (mode !== "100644" && mode !== "100755") {
      fail(`${path} is not a regular file (mode ${mode}) — translations must be ordinary files, not symlinks or submodules.`);
    }
  }
}

// ---- bijection: curated ⊆ site -------------------------------------------
//
// Still blocking, but the message now distinguishes two very different causes.
// Both used to produce the same bare "curated page has no English source",
// which is merely unhelpful for a typo and actively hostile for a deletion:
// someone removing an outdated English page gets a red translation check they
// have nothing to do with and no way to interpret.
//
// It also does not stay contained to their PR. This invariant runs on the merge
// ref, so once a deletion lands with its curated line intact, EVERY subsequent
// PR is red until a sync run de-curates the page. One unreadable failure becomes
// everyone's failure — which is the argument for keeping this blocking rather
// than softening it to a warning. The deletion PR is the cheap moment to catch it.
//
//   deleted here  — the source existed at the base ref and is gone now. A
//                   legitimate editorial act; drop the curated line in the same
//                   PR and the next sync removes the orphaned translations.
//   never existed — a phantom entry (typo, wrong case, wrong directory). A real
//                   defect in the curated list, not a consequence of this PR.

// Resolve the comparison point ONCE. The MERGE-BASE, not the base tip: probing
// the tip answers "is it on main right now", which is a different question and
// gives the wrong answer on every PR after a deletion has landed. (Confirmed by
// simulation: an unrelated PR branched after such a deletion was told the page
// "never did" exist — for a page that had been there for years.)
let _baseCmpSha;
function baseCompareSha() {
  if (_baseCmpSha !== undefined) return _baseCmpSha;
  const b = baseRef();
  if (!b) return (_baseCmpSha = null);
  let sha = null;
  try {
    sha = execFileSync("git", ["rev-parse", "--verify", "--quiet", `${b}^{commit}`],
      { cwd: root, encoding: "utf8", maxBuffer: MAX_GIT_OUTPUT }).trim() || null;
  } catch { sha = null; }
  if (!sha) return (_baseCmpSha = null);
  try {
    sha = execFileSync("git", ["merge-base", sha, "HEAD"],
      { cwd: root, encoding: "utf8", maxBuffer: MAX_GIT_OUTPUT }).trim() || sha;
  } catch { /* unrelated histories — compare against the base commit itself */ }
  return (_baseCmpSha = sha);
}

// `ls-tree` is the probe, NOT `cat-file -e` — the same reason this file already
// documents further down for the manifest read. Absence and presence are BOTH
// exit 0 and are told apart by the OUTPUT, so a non-zero exit is unambiguously
// an error rather than an answer. `cat-file -e` cannot make that distinction: it
// exits non-zero for an absent path and for a blob it could not obtain, so in a
// partial clone (`--filter=blob:none` — and this repo IS cloned that way,
// promisor=true) an unreachable promisor would read as "absent".
//
// The first version of this check used `cat-file -e` while its own comment
// claimed that inference "is not repeated here". It was repeated; only the
// command had changed. Hence also: a probe FAILURE is returned as "unknown" and
// reported as a probe failure, never folded into "absent".
//
// Returns "present" | "absent" | "unknown" (no base, or the probe itself failed).
function pathAtBase(relPath) {
  const sha = baseCompareSha();
  if (!sha) return "unknown";
  try {
    const out = execFileSync("git", ["ls-tree", "-z", "--name-only", sha, "--", relPath],
      { cwd: root, encoding: "utf8", maxBuffer: MAX_GIT_OUTPUT });
    return out.replace(/\0+$/, "").length > 0 ? "present" : "absent";
  } catch {
    return "unknown";
  }
}

{
  const deletedHere = [], preexisting = [], undetermined = [];
  for (const page of curated) {
    const abs = join(root, "site", page);
    if (existsSync(abs) && statSync(abs).isFile()) continue;
    switch (pathAtBase(`site/${page}`)) {
      case "present": deletedHere.push(page); break;
      case "absent":  preexisting.push(page); break;
      default:        undetermined.push(page); break;
    }
  }

  if (deletedHere.length) {
    fail(
      `${deletedHere.length} curated page(s) lost their English source in this change, ` +
      `but are still listed in translation/curated-pages.txt:\n` +
      deletedHere.map((q) => `      - ${q}`).join("\n") +
      `\n    If you DELETED the page: remove those exact lines from ` +
      `translation/curated-pages.txt here. Leave translations/<locale>/site/ alone — the ` +
      `next translation sync detects them as orphans and removes them.` +
      `\n    If you RENAMED or MOVED it: put the NEW path in curated-pages.txt instead of ` +
      `deleting the line, or the page silently drops out of translation in all 18 locales.`
    );
  }
  // Absent at the merge-base too, so this change did not cause it. Say exactly
  // that and nothing more. The previous wording ("and never did … typo? wrong
  // case?") was an over-claim a single-point probe cannot support, and it is the
  // message that every PR after an unfixed deletion would have received.
  for (const page of preexisting) {
    fail(
      `curated page has no English source, and had none at the base ref either: site/${page} ` +
      `— NOT caused by this change. translation/curated-pages.txt needs the stale line removed ` +
      `(most likely an earlier deletion that kept its curated entry; could also be a typo or wrong case).`
    );
  }
  for (const page of undetermined) {
    fail(
      `curated page has no English source: site/${page} — and its state at the base ref could ` +
      `not be determined (no base ref, or the git probe failed). Re-run with --base and a full ` +
      `enough clone for a specific diagnosis.`
    );
  }
}

// ---- per-locale bijection + provenance ------------------------------------

function localeFiles(loc) {
  let out;
  try {
    out = execFileSync("git", ["ls-files", `translations/${loc}/site/`], {
      cwd: root, encoding: "utf8", maxBuffer: MAX_GIT_OUTPUT,
    });
  } catch (e) {
    // Empty would mean "this locale has no files", so every manifest entry for
    // it would look like an orphan and every real file would go unchecked.
    // Absence must be observed, never inferred from a failure.
    fail(`could not list translations/${loc}/site/ (${e.code || e.message}) — refusing to treat that as "nothing is there".`);
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

// Hash a page from disk, or null when there is no page there. An unreadable file
// is neither: it is a finding. Letting the read throw would abandon every
// violation already collected and print a stack trace instead of the report.
function hashFileOrNull(abs, label) {
  if (!existsSync(abs) || !statSync(abs).isFile()) return null;
  try {
    return hashPage(readFileSync(abs, "utf8"));
  } catch (e) {
    fail(`${label}: cannot be read (${e.code || e.message})`);
    return null;
  }
}

const srcHashCache = new Map();
function currentHash(page) {
  if (!srcHashCache.has(page)) {
    const abs = join(root, "site", page);
    srcHashCache.set(page, hashFileOrNull(abs, `site/${page}`));
  }
  return srcHashCache.get(page);
}
for (const loc of locales) {
  for (const [page, e] of Object.entries(manifest[loc])) {
    if (currentHash(page) === e.src) {
      const abs = join(root, "translations", loc, "site", page);
      // isFile, not merely exists: a DIRECTORY at a page's path reads as a
      // deletion to git, and a deletion counts as "changed" — which is the
      // classification that satisfies Direction 2. Without this, replacing a
      // translation with a directory of the same name settled a stale page.
      if (!existsSync(abs) || !statSync(abs).isFile()) fail(`${loc}/${page}: claims freshness but there is no translated file there`);
    }
  }
}

// The translation ON DISK, hashed the same way as the English so a line can pin
// both sides of what a person actually looked at. Note "on disk": this reads the
// working tree, while the change-tracking below reads the two commits. In CI they
// are the same thing — the checkout is clean — but a local run against a dirty
// tree is answering a slightly different question, and a `src` bump you have not
// committed yet will read as unchanged here.
const transHashCache = new Map();
function translationHash(loc, page) {
  const k = `${loc}/${page}`;
  if (!transHashCache.has(k)) {
    const abs = join(root, "translations", loc, "site", page);
    transHashCache.set(k, hashFileOrNull(abs, `translations/${loc}/site/${page}`));
  }
  return transHashCache.get(k);
}

// ---- expired exception lines ----------------------------------------------
// A line in verified-noops.txt names both the English and the translation it is
// about, so it stops applying by itself once either of them moves on. Expiry is
// the design working, not a fault — so this is a notice, never a failure.
// Without it the file would silently accumulate lines nobody can tell are dead.
//
// This loop must stay BELOW both hash helpers: it once sat above translationHash's
// cache, so every call threw on the uninitialised `const` and the catch below
// swallowed it. The notices were dead for the whole life of the feature and no
// exit code could show it.
for (const [key, listed] of verifiedNoops) {
  const [loc, ...rest] = key.split("/");
  const page = rest.join("/");
  if (!manifest[loc] || !curatedSet.has(page)) continue;   // noted above; inert
  // Both helpers report an unreadable file and return null, so neither throws and
  // this loop cannot end the run. A file nothing else reaches still gets reported
  // once, by the helper, rather than silently skipped here.
  const current = currentHash(page);
  const currentTrans = translationHash(loc, page);
  if (current !== null && current !== listed.src) {
    note(`${VERIFIED_NOOPS_PATH}: "${key}" no longer applies — the English it names has changed, so the line can be removed`);
  } else if (currentTrans !== null && currentTrans !== listed.translation) {
    note(`${VERIFIED_NOOPS_PATH}: "${key}" no longer applies — the translation it names has changed since it was looked at, so the line can be removed`);
  }
}

// ---- change-tracking (git, optional) --------------------------------------

// Set when --base was passed but carries no usable value. Distinct from "no
// base requested", because ASKING for change-tracking and silently not getting
// it is precisely the failure this block exists to prevent. CI invokes
// `--base "$BASE_REF_OUT"`, so an empty variable arrives here as "".

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

const base = baseRef();
if (baseArgInvalid) {
  // Already reported. Do not also print the notice below, which would read as
  // a deliberate skip.
} else if (!base) {
  console.log("notice: no base ref (--base / GITHUB_BASE_REF) — skipping change-tracking invariant.");
} else {
  // Fail closed: a REQUESTED base that can't be resolved must NOT silently skip
  // the gate (force-push, shallow clone, or a typo would otherwise disable the
  // only history-dependent invariant while still exiting green).
  // baseCompareSha() already answers "which commit do we compare against" — it
  // resolves the ref and walks back to the merge base, with the same fallback for
  // unrelated histories. Asking it twice, two different ways, is how the two
  // answers drift apart.
  const mergeBase = baseCompareSha();
  if (!mergeBase) {
    fail(`base ref "${base}" could not be resolved — refusing to skip change-tracking silently (shallow clone? force-push? run CI with fetch-depth: 0).`);
  } else {

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
      if (!baseUnreadable && !isBlock(baseManifest)) {
        baseUnreadable = true;
        fail(`the manifest at base ${mergeBase.slice(0, 12)} is not a JSON object — cannot change-track against it.`);
      }
      if (!baseUnreadable) {
        for (const loc of Object.keys(baseManifest)) {
          if (!isBlock(baseManifest[loc])) {
            baseUnreadable = true;
            fail(`locale "${loc}" in the manifest at base ${mergeBase.slice(0, 12)} is not an object — cannot change-track against it.`);
          }
        }
      }
    }

    if (firstIntroduction) {
      console.log(`notice: base ${mergeBase.slice(0, 12)} has no manifest — first introduction, nothing to change-track.`);
    } else if (!baseUnreadable) {
      // ONE comparison per manifest entry, shared by both rules: did this
      // translation change, and what record did this page have before?
      //
      // "Changed" means what it means everywhere else in this pipeline — the
      // normalised text differs (hashPage: line endings, trailing blank lines,
      // BOM, volatile front matter, Unicode form). Asking git a different
      // question and treating its answer as this one is what produced the worst
      // defect this check has had.
      //
      // git's byte-level diff is used only to NARROW the work. A difference in
      // normalised text implies a difference in bytes, so a path git calls
      // identical cannot have changed; the reverse does not hold, which is why
      // the paths git does list are then compared properly.
      let touched;
      try {
        const listing = execFileSync("git", ["diff", "--name-only", "-z", "--no-renames", mergeBase, "--", "translations/"], { cwd: root, encoding: "utf8", maxBuffer: MAX_GIT_OUTPUT });
        touched = new Set(listing.split("\0").filter(Boolean));
      } catch (e) {
        // The base resolved but the diff failed — do not treat as "no changes".
        fail(`git diff against base ${mergeBase.slice(0, 12)} failed: ${e.message}`);
        touched = null;
      }

      // Asked for exactly once per path: a manifest key is either still current or
      // removed, never both, so there is nothing to memoise.
      const baseHash = (loc, page) => {
        const rel = `translations/${loc}/site/${page}`;
        try {
          // `cat-file --filters`, not `show`: `show` hands back the raw blob, while
          // the other side of this comparison reads the working tree. Where a
          // .gitattributes filter applies those are different representations of
          // the same page, and every listed path then compares unequal forever —
          // which is the answer that skips Direction 2. Both sides must be read in
          // the form a reader sees.
          return hashPage(execFileSync("git", ["cat-file", "--filters", `${mergeBase}:${rel}`], { cwd: root, encoding: "utf8", maxBuffer: MAX_GIT_OUTPUT }));
        } catch (e) {
          // Only ever asked for a path the BASE manifest names, so the file was
          // there. Failing to read it is a finding, not an absence — and it must
          // not read as "changed", because that is the answer that satisfies
          // Direction 2 and would license the very bump we cannot verify.
          fail(`could not read ${rel} at base ${mergeBase.slice(0, 12)}: ${e.message}`);
          return null;
        }
      };

      // key -> { was, changed }
      //
      // A page that moved is still the page it was, and its record should move
      // with it. Its predecessor is a manifest key that disappeared in this same
      // change and whose translation is the one now sitting at the new key.
      // Keys, not paths, and across ALL locales: renaming `translations/it` to
      // `translations/it-IT` moves every page at once, and searching only within
      // a locale made all 18 of them look brand new — which is how a locale-code
      // migration could mark stale translations current.
      const removed = new Map();
      for (const loc of Object.keys(baseManifest)) {
        for (const page of Object.keys(baseManifest[loc])) {
          if (manifest[loc]?.[page]) continue;      // that key still exists; not a move
          const h = baseHash(loc, page);
          if (h === null) continue;
          removed.set(h, [...(removed.get(h) || []), { loc, page, entry: baseManifest[loc][page] }]);
        }
      }

      const comparisons = new Map();
      for (const loc of locales) {
        for (const page of Object.keys(manifest[loc])) {
          const rel = `translations/${loc}/site/${page}`;
          let was = baseManifest[loc]?.[page];
          let changed;
          if (was) {
            // Unlisted by git ⇒ the bytes are identical ⇒ nothing changed. A side
            // we could not read is not "changed" either: unknown must never be the
            // answer that lets a source bump through.
            const before = touched !== null && touched.has(rel) ? baseHash(loc, page) : null;
            changed = before !== null && before !== translationHash(loc, page);
          } else {
            const candidates = removed.get(translationHash(loc, page)) || [];
            if (candidates.length > 1) {
              fail(`${loc}/${page}: this translation is identical to ${candidates.length} entries removed in this change (${candidates.map((c) => `${c.loc}/${c.page}`).join(", ")}), so which one it continues cannot be told and its record cannot be checked. Move one page at a time, or give them distinct translations.`);
            }
            was = candidates[0]?.entry;
            changed = !was;   // a move changed nothing; a genuinely new page is new
          }
          comparisons.set(`${loc}/${page}`, { was, changed });
        }
      }

      try {
        const dirty = execFileSync("git", ["status", "--porcelain", "-z", "--", "site/", "translations/", "translation/"], { cwd: root, encoding: "utf8", maxBuffer: MAX_GIT_OUTPUT });
        const n = dirty.split("\0").filter((x) => x !== "").length;
        if (n > 0) {
          note(`${n} uncommitted change(s) under site/, translations/ or translation/ — this run describes your WORKING TREE, not the commit CI will check. Commit before trusting a green result.`);
        }
      } catch { /* status is advisory; never let it end the run */ }

      // Direction 1 — translation changed ⇒ manifest must record why.
      for (const [key, { was, changed }] of comparisons) {
        if (!changed) continue;
        const [loc, ...rest] = key.split("/");
        const page = rest.join("/");
        const now = manifest[loc][page];
        // A hand-edit is a valid reason ONLY when the edited flag FLIPS in this
        // PR (false/absent → true). `edited:true` already at base is not a
        // standing licence to mutate the file forever with no manifest trace.
        const editFlipped = now.edited === true && was?.edited !== true;
        const provenanceChanged = !was || now.src !== was.src || now.mode !== was.mode || now.tool !== was.tool || now.engine !== was.engine;
        if (!provenanceChanged && !editFlipped) {
          fail(`${loc}/${page}: translation changed but manifest provenance did not — record the pass in \`tool\` (free-form, e.g. "${now.tool || "gpt-5.4"}+linkrepair"). Only flip edited:true for a human-authored fix you want protected from machine re-translation: it removes the page from automated sync permanently.`);
        }
      }

      // Direction 2 — manifest src changed ⇒ the translation must have changed
      // too. Otherwise a one-commit hash bump marks a genuinely-stale translation
      // "fresh" forever — the exact lie this gate exists to prevent.
      for (const loc of locales) {
        for (const [page, now] of Object.entries(manifest[loc])) {
          const was = comparisons.get(`${loc}/${page}`)?.was;
          if (!was) continue; // genuinely new — bijection ensures a matching file
          if (now.src !== was.src && !comparisons.get(`${loc}/${page}`).changed) {
            // Unless a human has listed this exact page against this exact
            // source in translation/verified-noops.txt, confirming the committed
            // translation is already correct for it. The pipeline writes the
            // manifest; nothing in it writes that file, so in practice the claim
            // and the thing it claims about come from different hands — see
            // lib/verified-noops.mjs for how far that does and does not go.
            const key = `${loc}/${page}`;
            if (noopAllowed({
              entry: now,
              baseEntry: was,
              listed: verifiedNoops.get(key),
              currentSourceHash: currentHash(page),
              currentTranslationHash: translationHash(loc, page),
            })) continue;
            // Only offer a copy-paste line when there is a real translation to
            // name. With no file on disk the hash is null, and printing that
            // would hand the operator a line the parser rejects.
            const th = translationHash(loc, page);
            // An exception pins the manifest's src to the English ON DISK. If the
            // manifest records some other hash, no line can satisfy that, and
            // printing one anyway sends the operator round a loop: they add
            // exactly what was asked for and the same refusal comes back.
            const srcMatchesDisk = now.src === currentHash(page);
            // A page held as hand-edited is out of automated sync, and an
            // exception cannot settle it — noopAllowed refuses on `edited` before
            // it ever looks at a line. Offering one anyway is the same loop as
            // above: the operator adds exactly what was printed and the identical
            // refusal comes back.
            const heldNow = now.edited !== false;
            const heldAtBase = Boolean(was) && was.edited !== false;
            const suggestion = heldNow
              ? `but this page is held as hand-edited, which takes it out of automated sync — no exception applies while that is set, so either clear the flag or retranslate the page`
              : heldAtBase
              // The flag is already clear here; it was set at the base. Telling the
              // operator to clear it describes what they have just done, and the
              // refusal comes from history they cannot edit in this change.
              ? `but this page was held as hand-edited at the base, and an exception cannot reach back past that — land the cleared flag on its own first, or retranslate the page`
              : !srcMatchesDisk
              ? `but note the manifest records src ${String(now.src).slice(0, 20)}… while site/${page} hashes to ${String(currentHash(page)).slice(0, 20)}… — no exception can bridge that, because a line pins the manifest to the English actually on disk. Fix the recorded src first`
              : th === null
              ? `there is no translation file at translations/${loc}/site/${page} to name, so the exception cannot apply — the missing file is the thing to fix`
              : `a human can record that in ${VERIFIED_NOOPS_PATH} as "${loc}/${page} ${now.src} ${th}" — naming both the English checked and the translation found already correct for it${verifiedNoops.has(key) ? `. REPLACE the existing line for this page: a second line for the same key is a duplicate and fails the check` : ""}`;
            fail(`${loc}/${page}: manifest src changed but the translation file did not — a hash bump alone would mark a stale translation "fresh". If the committed translation is genuinely already correct for this source, ${suggestion}.`);
          }
        }
      }
    }
  }
}

report();

function report() {
  for (const n of notices) console.log(`  note: ${n}`);
  if (violations.length === 0) {
    console.log(`Manifest invariants hold: ${curated.length} curated pages, ${locales.length} locales.`);
    process.exit(0);
  }
  console.error(`Manifest invariant check FAILED with ${violations.length} violation(s):`);
  for (const v of violations) console.error(`  - ${v}`);
  process.exit(1);
}
