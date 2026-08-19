// Blocking front-matter parity check for translated pages.
//
// Every translations/<locale>/site/<page>.md must declare the same leading YAML
// block as site/<page>.md. See translation/lib/frontmatter.mjs for what can go
// wrong and why one of those shapes takes the whole GitHub Pages build down.
//
// Scope, like scripts/check-protected-terms.mjs: with a base ref, only pages
// this change could have damaged are BLOCKING — a translation it touched, or one
// whose English source it touched. Anything else is reported as a notice, so a
// pre-existing violation somewhere in 3654 pages does not redden an unrelated
// PR. Without a base ref every page is blocking, which is the right default for
// a local sweep (`node scripts/check-frontmatter.mjs`).
//
// Usage:
//   node scripts/check-frontmatter.mjs [--base <ref>]
// Exit 0 = no blocking violation; 1 = at least one (all of them printed).

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { frontMatterRegion, frontMatterViolation } from "../translation/lib/frontmatter.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));

// `git ls-files translations/` is already 210 KB at 18 locales × 203 pages and
// grows with their product, well past execFileSync's 1 MiB default. The same
// bound, for the same reason, as the sibling checks.
const MAX_GIT_OUTPUT = 64 * 1024 * 1024;
const git = (args) => execFileSync("git", args, { cwd: root, encoding: "utf8", maxBuffer: MAX_GIT_OUTPUT });

const die = (msg) => {
  console.error(`Front-matter parity check could not run: ${msg}`);
  process.exit(1);
};

// ---- scope ----------------------------------------------------------------

function resolveBase() {
  const i = process.argv.indexOf("--base");
  if (i < 0) return null;
  const explicit = process.argv[i + 1];
  // Asking for a scoped run and silently getting an unscoped one is a real
  // difference in what the job blocks on, so refuse rather than guess. CI
  // invokes `--base "$BASE_REF_OUT"`, so an empty variable arrives as "".
  if (!explicit || explicit.startsWith("--")) {
    die("--base was given without a ref value. Omit it to check every page.");
  }
  return explicit;
}

const base = resolveBase();
let inScope = null;   // null = everything is blocking
let mergeBase = null; // set alongside inScope

if (base) {
  let baseSha = null;
  try {
    baseSha = git(["rev-parse", "--verify", "--quiet", `${base}^{commit}`]).trim();
  } catch { /* reported below */ }
  // Fail closed: a base that cannot be resolved (shallow clone, force-push,
  // typo) must not quietly widen or narrow what this job blocks on.
  if (!baseSha) die(`base ref "${base}" could not be resolved (shallow clone? force-push? run CI with fetch-depth: 0)`);

  mergeBase = baseSha;
  try {
    mergeBase = git(["merge-base", baseSha, "HEAD"]).trim();
  } catch { /* divergent history — compare against the base directly */ }

  const changed = new Set();
  const collect = (args) => {
    for (const p of git(args).split("\0")) if (p.endsWith(".md")) changed.add(p);
  };
  try {
    collect(["diff", "--name-only", "-z", `${mergeBase}..HEAD`, "--", "translations/", "site/"]);
  } catch (e) {
    // The base resolved but the diff failed. Treating that as "nothing changed"
    // would pass every introduced violation.
    die(`git diff against base ${mergeBase.slice(0, 12)} failed: ${e.message}`);
  }
  // A local run reads the working tree, where an uncommitted or untracked page
  // is invisible to the range diff. No effect in CI, where the checkout is clean.
  for (const args of [
    ["diff", "--name-only", "-z", "HEAD", "--", "translations/", "site/"],
    ["ls-files", "--others", "--exclude-standard", "-z", "--", "translations/", "site/"],
  ]) {
    try { collect(args); } catch { /* non-fatal: scope stays range-only */ }
  }

  // Only a change to the TRANSLATION is this author's to answer for. Adding
  // front matter to an English page leaves 17 translations out of step, but
  // that is the sync pipeline's work, reported by the staleness dashboard —
  // the sibling terminology gate draws the same line.
  inScope = (transPath) => changed.has(transPath);
}

// ---- check ----------------------------------------------------------------

let files;
try {
  files = git(["ls-files", "-z", "--", "translations/"]).split("\0").filter((p) => p.endsWith(".md"));
} catch (e) {
  die(`could not list translated files: ${e.message}`);
}

const read = (p) => {
  try { return readFileSync(join(root, p), "utf8"); } catch { return null; }
};

// What the page looked like at the merge base. `git show` on a missing path
// exits non-zero, which is the answer "it did not exist", not an error.
const readAtBase = (p) => {
  try { return git(["show", `${mergeBase}:${p}`]); } catch { return null; }
};

// A violation this change did not create is not this change's to fix. But
// "did not create" has to mean the damage is UNTOUCHED, not merely that it falls
// in the same bucket: a resync that rewrites one broken block into a different
// broken block of the same kind is exactly what happened on 2026-08-14, and
// comparing only the violation code would wave it through. So the front-matter
// region itself must be unchanged on both sides.
function introduced(transPath, srcPath, transText, srcText, violation) {
  if (!mergeBase) return true;
  const wasSrc = readAtBase(srcPath);
  const wasTrans = readAtBase(transPath);
  if (wasSrc === null || wasTrans === null) return true; // new page: it is yours
  const was = frontMatterViolation(wasSrc, wasTrans);
  if (!was || was.code !== violation.code) return true;
  return (
    frontMatterRegion(wasTrans) !== frontMatterRegion(transText) ||
    frontMatterRegion(wasSrc) !== frontMatterRegion(srcText)
  );
}

const blocking = [];
const inherited = [];
let checked = 0;

for (const transPath of files) {
  const parts = transPath.split("/");
  if (parts.length < 4 || parts[2] !== "site") continue;
  const srcPath = ["site", ...parts.slice(3)].join("/");
  const srcText = read(srcPath);
  // No English source: an orphan translation. translation/check-invariants.mjs
  // owns that relationship; there is nothing here to compare against.
  if (srcText === null) continue;
  const transText = read(transPath);
  if (transText === null) continue;

  checked += 1;
  const violation = frontMatterViolation(srcText, transText);
  if (!violation) continue;
  const line = `${transPath}: ${violation.message}`;
  if ((!inScope || inScope(transPath)) && introduced(transPath, srcPath, transText, srcText, violation)) blocking.push(line);
  else inherited.push(line);
}

if (inherited.length) {
  console.log(`notice: ${inherited.length} page(s) already differ from their source outside this change:`);
  for (const l of inherited.slice(0, 20)) console.log(`  - ${l}`);
  if (inherited.length > 20) console.log(`  … and ${inherited.length - 20} more`);
}

if (blocking.length) {
  console.error(`Front-matter parity FAILED for ${blocking.length} page(s):`);
  for (const l of blocking) console.error(`  - ${l}`);
  console.error(
    "\nA translated page must declare the same leading YAML block as its English source — " +
    "copy site/<page>.md's block verbatim. A `---` the source does not have breaks the Jekyll build for the whole site.",
  );
  process.exit(1);
}

console.log(`Front-matter parity holds for ${checked} translated page(s).`);
