// One-time (and re-runnable) seeder for the translation staleness manifest.
//
// Produces:
//   translation/curated-pages.txt  — the canonical curated page list (paths
//                                    relative to site/), one per line, sorted.
//   translation/sync-state.json    — per-locale, per-page provenance: the
//                                    normalized source hash each translation
//                                    was made from, plus engine/mode/tool and
//                                    the `edited` human-fix guard.
//
// Seeding model (design §1): every locale is "fresh" at the commit its corpus
// merged. All 18 curated locales are live on main at 181/181, so we seed every
// entry's `src` to the CURRENT normalized hash of its English source — i.e.
// nothing is stale at seed time. Real staleness only accrues as `site/` changes
// afterwards.
//
// Re-running is safe and idempotent given an unchanged tree: it recomputes the
// curated list and rewrites the manifest. It does NOT invent history — it
// stamps the present. `src_commit` records the commit the sources were read at,
// for audit only (never used for the staleness comparison).
//
// Usage: node translation/seed-sync-state.mjs [--commit <sha>] [--force]
//   Run from the content repo root. --commit sets the audit src_commit stamp;
//   if omitted it is resolved via `git rev-parse HEAD` (falling back to the
//   literal "HEAD" only if git fails). --force is required to overwrite an
//   existing manifest that already holds edited:true or non-seed provenance.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { hashPage } from "./lib/normalize-hash.mjs";

// fileURLToPath (not new URL(...).pathname) so paths with spaces/non-ASCII and
// Windows drive letters resolve correctly.
const root = fileURLToPath(new URL("../", import.meta.url));

// Engine assignment per the three-engine split (design §, table in the doc).
// llm  — diff-aware capable, accumulates hand/CI quality worth preserving.
// nllb — local NLLB-200 whole-page regeneration.
// gt   — build-time offline Google-Translate-static whole-page regeneration.
const ENGINE = {
  it: "llm", fr: "llm", es: "llm", pt: "llm", de: "llm", ar: "llm",
  zh: "llm", hi: "llm", ru: "llm", ja: "llm", ko: "llm", tr: "llm", uk: "llm",
  sw: "nllb", yo: "nllb", ig: "nllb",
  ak: "gt", ee: "gt",
};

// Best-effort generator tag per locale, for provenance/reproducibility. At seed
// this reflects the toolchain the merged corpus was produced with; it is not
// load-bearing for staleness. Diff-aware syncs overwrite it with the live tool.
const SEED_TOOL = {
  it: "gpt-5.4", fr: "gpt-5.4", es: "gpt-5.4", pt: "gpt-5.4", de: "gpt-5.4",
  ar: "gpt-5.4", zh: "gpt-5.4", hi: "gpt-5.4", ru: "gpt-5.4", tr: "gpt-5.4",
  uk: "gpt-5.4", ja: "qwen3-14b", ko: "qwen3-14b",
  sw: "nllb-200-3.3B", yo: "nllb-200-3.3B", ig: "nllb-200-3.3B",
  ak: "gt-static", ee: "gt-static",
};

const LOCALES = Object.keys(ENGINE).sort();

function arg(name) {
  const i = process.argv.indexOf(name);
  const v = i >= 0 ? process.argv[i + 1] : undefined;
  // Guard the `--commit --force` footgun: a following flag is not a value.
  return v && !v.startsWith("--") ? v : undefined;
}

function resolveCommit() {
  const explicit = arg("--commit");
  if (explicit) return explicit;
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: root,
      encoding: "utf8",
    }).trim();
  } catch {
    return "HEAD";
  }
}

// List a locale's translated pages (relative to translations/<loc>/site/),
// using git so we see exactly what is tracked, independent of sparse-checkout.
function localePages(loc) {
  // -z (NUL-delimited) so filenames with spaces/non-ASCII aren't quote-escaped
  // by git and silently dropped by the .md filter.
  const out = execFileSync(
    "git",
    ["ls-files", "-z", `translations/${loc}/site/`],
    { cwd: root, encoding: "utf8" },
  );
  return out
    .split("\0")
    .filter((p) => p.endsWith(".md"))
    .map((p) => p.replace(`translations/${loc}/site/`, ""))
    .sort();
}

// The curated list is the set of pages present in EVERY curated locale. Using
// the intersection (not one locale) means the checked-in list can never claim a
// page that some locale is silently missing.
function curatedIntersection() {
  const perLocale = LOCALES.map((loc) => new Set(localePages(loc)));
  const union = new Set();
  for (const s of perLocale) for (const p of s) union.add(p);
  const inAll = [...union].filter((p) => perLocale.every((s) => s.has(p)));
  const partial = [...union].filter((p) => !perLocale.every((s) => s.has(p)));
  if (partial.length) {
    // Silently dropping a page that one locale is missing would shrink tracking
    // for ALL 18 locales invisibly. Refuse unless the operator explicitly
    // accepts it — a partial page is a coverage gap to fix, not to hide.
    console.error(
      `ERROR: ${partial.length} page(s) present in some but not all locales:\n  ` +
        partial.join("\n  ") +
        `\nFix the coverage gap, or pass --force to seed only the fully-covered set.`,
    );
    if (!process.argv.includes("--force")) process.exit(1);
  }
  return inAll.sort();
}

// Footgun guard: re-seeding rewrites every entry as fresh `mode: "seed"`,
// discarding accumulated diff provenance and — critically — any human-owned
// `edited: true` flags. Refuse if the existing manifest holds either, unless
// --force is passed.
const manifestPath = join(root, "translation/sync-state.json");
if (existsSync(manifestPath) && !process.argv.includes("--force")) {
  let prev = null;
  try {
    prev = JSON.parse(readFileSync(manifestPath, "utf8"));
  } catch {
    prev = null; /* unreadable/empty manifest — safe to (re)seed */
  }
  if (prev) {
    const risky = Object.values(prev).some((byPage) =>
      Object.values(byPage).some(
        (e) => e && (e.edited === true || (e.mode && e.mode !== "seed")),
      ),
    );
    if (risky) {
      console.error(
        "Refusing to overwrite translation/sync-state.json: it contains edited:true or non-seed provenance.\n" +
          "Re-seeding would erase human fixes and diff history. Pass --force if you really mean to.",
      );
      process.exit(1);
    }
    // Drift guard: re-stamping an entry whose English source CHANGED since it
    // was seeded silently declares a genuinely-stale translation "fresh" — the
    // exact lie this system exists to prevent. Those pages need re-translation
    // (the sync agent), not a re-stamp. Refuse and name them.
    const drifted = [];
    for (const [loc, byPage] of Object.entries(prev)) {
      for (const [page, e] of Object.entries(byPage)) {
        if (!e || !e.src) continue;
        const sourceAbs = join(root, "site", page);
        if (!existsSync(sourceAbs)) continue; // deleted source: separate concern
        if (hashPage(readFileSync(sourceAbs, "utf8")) !== e.src) {
          drifted.push(`${loc}/${page}`);
        }
      }
    }
    if (drifted.length) {
      console.error(
        `Refusing to re-seed: ${drifted.length} entr${drifted.length === 1 ? "y" : "ies"} ` +
          `have an English source that changed since seeding.\n` +
          `Re-stamping them would mark genuinely-stale translations "fresh". Re-sync those pages\n` +
          `(run the sync agent) instead of re-stamping. First few:\n  ` +
          drifted.slice(0, 20).join("\n  ") +
          (drifted.length > 20 ? `\n  … and ${drifted.length - 20} more` : "") +
          `\nPass --force only if you have already re-synced these translations.`,
      );
      process.exit(1);
    }
  }
}

const srcCommit = resolveCommit();
const curated = curatedIntersection();

// curated-pages.txt
writeFileSync(
  join(root, "translation/curated-pages.txt"),
  curated.join("\n") + "\n",
);

// sync-state.json — seed every (locale, page) at the current normalized hash.
const manifest = {};
let missingSource = 0;
for (const loc of LOCALES) {
  manifest[loc] = {};
  for (const page of curated) {
    const sourceAbs = join(root, "site", page);
    if (!existsSync(sourceAbs)) {
      // A curated page with no English source is a data bug; surface loudly
      // rather than seeding a hash of nothing.
      console.error(`ERROR: curated page has no source: site/${page}`);
      missingSource += 1;
      continue;
    }
    const src = hashPage(readFileSync(sourceAbs, "utf8"));
    manifest[loc][page] = {
      src,
      src_commit: srcCommit,
      engine: ENGINE[loc],
      mode: "seed",
      tool: SEED_TOOL[loc],
      edited: false,
    };
  }
}

if (missingSource > 0) {
  console.error(`Aborting: ${missingSource} curated page(s) missing a source.`);
  process.exit(1);
}

writeFileSync(
  join(root, "translation/sync-state.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);

console.log(
  `Seeded: ${curated.length} curated pages × ${LOCALES.length} locales ` +
    `= ${curated.length * LOCALES.length} entries at ${srcCommit.slice(0, 12)}.`,
);
