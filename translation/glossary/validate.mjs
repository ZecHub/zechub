// Validate the community-reviewed glossaries.
//
// Usage: node translation/glossary/validate.mjs [--base <ref>]
//   (run from anywhere; paths are resolved from this file)
//
// Checks translation/glossary/terms.en.json, then every
// translation/glossary/<loc>.json against it and against
// translation/protected-terms.json, with the rules in lib/glossary.mjs.
// Passes cleanly when no locale file exists yet, so the shared list can land
// before the first review does.
//
// Rule 8 (register prefixes must name real folders) reads the directories
// under site/ from git, not from the disk: the steward's checkout is sparse,
// and a folder missing from a sparse checkout still exists for every reader.
// Outside a git checkout it falls back to walking the disk.
//
// With --base, rule 7 also runs: a change to an approved entry must bump
// `version` by one and name the change in the changelog. A glossary absent at
// the base is new and has nothing to compare against. A base that was
// REQUESTED but cannot be resolved is fatal, never a silent skip, in the same
// way as scripts/check-protected-terms.mjs.
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import {
  checkVersionBump,
  formatError,
  validateLocale,
  validateTermsEn,
} from "./lib/glossary.mjs";

const root = new URL("../../", import.meta.url).pathname;
const dir = join(root, "translation/glossary");
const NOT_LOCALES = new Set(["terms.en.json", "schema.json"]);

function die(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

function git(args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
}

function resolveBase() {
  const i = process.argv.indexOf("--base");
  if (i < 0) return null;
  const ref = process.argv[i + 1];
  if (!ref || ref.startsWith("--")) die("--base requires a ref. Omit --base to skip the version check.");
  try {
    return git(["rev-parse", "--verify", "--quiet", `${ref}^{commit}`]).trim();
  } catch {
    die(`base ref "${ref}" could not be resolved; refusing to skip the version check (shallow clone? run CI with fetch-depth: 0).`);
  }
}

export function siteDirectories() {
  try {
    const out = git(["ls-tree", "-r", "-d", "--name-only", "HEAD", "site"]);
    return out.split("\n").filter(Boolean).map((p) => p.replace(/^site\//, "")).filter((p) => p !== "site");
  } catch {
    const dirs = [];
    const walk = (abs, rel) => {
      for (const e of readdirSync(abs, { withFileTypes: true })) {
        if (!e.isDirectory()) continue;
        const r = rel ? `${rel}/${e.name}` : e.name;
        dirs.push(r);
        walk(join(abs, e.name), r);
      }
    };
    if (existsSync(join(root, "site"))) walk(join(root, "site"), "");
    return dirs;
  }
}

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    die(`${path}: ${e.message}`);
  }
}

const isMain = process.argv[1] && new URL(import.meta.url).pathname === process.argv[1];
if (isMain) {
  const baseSha = resolveBase();
  const termsEn = readJson(join(dir, "terms.en.json"));
  const { preserveVerbatim = [] } = readJson(join(root, "translation/protected-terms.json"));
  const problems = [];

  problems.push(...validateTermsEn(termsEn, { preserveVerbatim }));

  const files = readdirSync(dir).filter((f) => f.endsWith(".json") && !NOT_LOCALES.has(f)).sort();
  const siteDirs = files.length ? siteDirectories() : [];
  for (const file of files) {
    const loc = file.replace(/\.json$/, "");
    const glossary = readJson(join(dir, file));
    problems.push(...validateLocale(glossary, { termsEn, preserveVerbatim, siteDirs, fileLocale: loc }));
    if (baseSha) {
      let base = null;
      try {
        base = JSON.parse(git(["show", `${baseSha}:translation/glossary/${file}`]));
      } catch {
        base = null; // new in this change
      }
      problems.push(...checkVersionBump(base, glossary));
    }
    const n = Object.keys(glossary.terms ?? {}).length;
    const p = Object.keys(glossary.phrases ?? {}).length;
    console.log(`${file}: ${n} terms, ${p} phrases, version ${glossary.version}`);
  }

  if (problems.length) {
    for (const e of problems) console.error(`::error::${formatError(e)}`);
    die(`${problems.length} glossary problem(s)`);
  }
  console.log(`glossary OK: terms.en.json (${termsEn.terms.length} terms), ${files.length} locale file(s)${baseSha ? `, version checked against ${baseSha.slice(0, 9)}` : ""}`);
}
