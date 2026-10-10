// Is translation/protected-terms.json itself well formed?
//
// Every other gate reads this file DEFENSIVELY. brand-candidates.mjs takes
// `T.preserveVerbatim ?? []`; check-brand-spelling.mjs destructures with `= []`
// defaults; check-protected-terms.mjs does the same. That is correct for them —
// a term list is not their job — but it means a single typo in a key name, or a
// section that stopped being an array, leaves every brand gate loading ZERO
// terms and exiting 0. Nothing in the repo currently notices. This is the gate
// that notices.
//
// It is the same failure shape check-verbatim-columns warns about in its own
// comment: findings vanish while the run still exits 0.
//
// Usage: node scripts/check-terms-file.mjs [--fix] [path]
//   --fix  sort the term lists and rewrite the file canonically
//   path   defaults to translation/protected-terms.json, relative to cwd
//          (run from the content repo root)
//
// Deliberately NOT re-implemented here: the rules for equivalentForms. They
// already live in translation/lib/term-forms.mjs, which throws TermFormsError
// on each of them and explains why in detail. This check calls that module
// instead, so there is one definition of a valid group rather than two that
// can drift apart. What it adds is that the call happens UNCONDITIONALLY:
// check-protected-terms.mjs is the only other caller, and it exits early when
// no translations exist, so a malformed group could sit on main unreported.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { buildEquivalence, TermFormsError } from "../translation/lib/term-forms.mjs";

const DEFAULT_PATH = "translation/protected-terms.json";

/** The only keys this file may carry. An unknown one is the silent-failure case. */
export const KNOWN_KEYS = ["preserveVerbatim", "equivalentForms", "glossaryOnly"];

/** Sections that are flat lists of terms, and must be sorted and unique. */
export const TERM_LISTS = ["preserveVerbatim", "glossaryOnly"];

/**
 * The order the file is actually maintained in: compare lowercased, byte-wise.
 *
 * NOT localeCompare, which is the obvious choice and the wrong one. Under any
 * locale collation `Zingo!` sorts AFTER `zingo-cli`, because collation gives
 * punctuation little weight; byte-wise, `!` (0x21) precedes `-` (0x2D), which
 * is the order the 274 entries are in. A check built on localeCompare fails on
 * a clean file — verified against all 274 before this was written.
 */
export function compareTerms(a, b) {
  const x = a.toLowerCase();
  const y = b.toLowerCase();
  return x < y ? -1 : x > y ? 1 : 0;
}

/** 2-space indent and a trailing newline, as the file already uses. */
export function serialize(data) {
  return `${JSON.stringify(data, null, 2)}\n`;
}

/**
 * Check `data`, returning a list of problems. Empty means well formed.
 *
 * Pure: takes parsed data, touches no filesystem, so the tests can drive it
 * directly as well as through the CLI.
 */
export function checkTermsData(data, raw) {
  const problems = [];
  const p = (msg) => problems.push(msg);

  if (data === null || typeof data !== "object" || Array.isArray(data)) {
    p(`top level must be a JSON object, found ${Array.isArray(data) ? "an array" : typeof data}`);
    return problems; // nothing below can be checked
  }

  // An unknown key is almost always a typo in a known one, and a typo here
  // disables a gate silently. Name the closest known key to make the fix obvious.
  for (const key of Object.keys(data)) {
    if (!KNOWN_KEYS.includes(key)) {
      const near = KNOWN_KEYS.find((k) => k.toLowerCase() === key.toLowerCase());
      p(
        near
          ? `unknown key "${key}" — did you mean "${near}"? Readers use \`?? []\`, so a misspelled key loads no terms and still passes.`
          : `unknown key "${key}" — expected one of ${KNOWN_KEYS.join(", ")}`,
      );
    }
  }

  if (!("preserveVerbatim" in data)) {
    p("preserveVerbatim is missing — without it every brand gate protects nothing");
  }

  for (const key of TERM_LISTS) {
    if (!(key in data)) continue;
    const list = data[key];

    if (!Array.isArray(list)) {
      p(`${key} must be an array, found ${list === null ? "null" : typeof list}`);
      continue;
    }
    if (key === "preserveVerbatim" && list.length === 0) {
      p("preserveVerbatim is empty — every brand gate would protect nothing");
    }

    const nonStrings = list.filter((t) => typeof t !== "string");
    if (nonStrings.length) {
      p(`${key}: ${nonStrings.length} entr${nonStrings.length === 1 ? "y is" : "ies are"} not a string, e.g. ${JSON.stringify(nonStrings[0])}`);
      continue; // the checks below assume strings
    }

    for (const t of list) {
      if (t === "") p(`${key}: contains an empty string`);
      else if (t !== t.trim()) p(`${key}: "${t}" has leading or trailing whitespace`);
      // A term is matched literally against page text, so a newline or tab in
      // one can never match and silently protects nothing.
      else if (/[\u0000-\u001f]/.test(t)) p(`${key}: "${t}" contains a control character`);
    }

    // Case-insensitive, because two spellings of one brand are a maintenance
    // trap even when they differ in case: whichever is checked first wins.
    const seen = new Map();
    for (const t of list) {
      const k = t.toLowerCase();
      if (seen.has(k)) {
        p(seen.get(k) === t ? `${key}: "${t}" appears twice` : `${key}: "${t}" duplicates "${seen.get(k)}" apart from case`);
      } else seen.set(k, t);
    }

    const sorted = [...list].sort(compareTerms);
    if (JSON.stringify(sorted) !== JSON.stringify(list)) {
      const i = list.findIndex((t, idx) => t !== sorted[idx]);
      p(`${key}: not sorted — "${list[i]}" is at index ${i} where "${sorted[i]}" belongs. Run with --fix.`);
    }
  }

  // glossaryOnly means "explain, do not preserve"; preserveVerbatim means the
  // opposite. A term in both leaves the two gates disagreeing about it.
  if (Array.isArray(data.preserveVerbatim) && Array.isArray(data.glossaryOnly)) {
    const pv = new Map(
      data.preserveVerbatim.filter((t) => typeof t === "string").map((t) => [t.toLowerCase(), t]),
    );
    for (const t of data.glossaryOnly) {
      if (typeof t === "string" && pv.has(t.toLowerCase())) {
        p(`glossaryOnly: "${t}" is also in preserveVerbatim (as "${pv.get(t.toLowerCase())}") — the two sections contradict each other`);
      }
    }
  }

  // equivalentForms: delegate, do not duplicate. term-forms.mjs owns these
  // rules and explains them; this makes sure they are enforced even when no
  // translations exist for check-protected-terms.mjs to walk.
  if ("equivalentForms" in data) {
    try {
      buildEquivalence(
        Array.isArray(data.preserveVerbatim) ? data.preserveVerbatim.filter((t) => typeof t === "string") : [],
        data.equivalentForms,
      );
    } catch (err) {
      if (err instanceof TermFormsError) p(`equivalentForms: ${err.message}`);
      else throw err;
    }
  }

  // Formatting last: it matters least, and --fix handles it.
  if (typeof raw === "string") {
    if (!raw.endsWith("\n")) p("file does not end with a newline. Run with --fix.");
    const expected = serialize(data);
    if (raw !== expected) {
      p("file is not formatted as 2-space-indented JSON with a trailing newline. Run with --fix.");
    }
  }

  return problems;
}

/** Sort the term lists and rewrite canonically. Never adds or removes a term. */
export function fixTermsData(data) {
  if (data === null || typeof data !== "object" || Array.isArray(data)) return data;
  const out = {};
  // Keep the file's key order rather than reordering sections.
  for (const key of Object.keys(data)) {
    const val = data[key];
    out[key] =
      TERM_LISTS.includes(key) && Array.isArray(val) && val.every((t) => typeof t === "string")
        ? [...val].sort(compareTerms)
        : val;
  }
  return out;
}

// ---------------------------------------------------------------------- CLI

const args = process.argv.slice(2);
const fix = args.includes("--fix");
const path = args.find((a) => !a.startsWith("--")) ?? DEFAULT_PATH;

const die = (msg) => {
  console.error(`error: ${msg}`);
  process.exit(1);
};

if (!existsSync(path)) die(`${path} not found (run from the content repo root)`);

const raw = readFileSync(path, "utf8");
let data;
try {
  data = JSON.parse(raw);
} catch (err) {
  // A parse failure is the one problem that hides every other one, so it is
  // reported alone and with the position the parser gives.
  die(`${path} is not valid JSON: ${err.message}`);
}

if (fix) {
  const fixed = fixTermsData(data);
  const out = serialize(fixed);
  if (out === raw) {
    console.log(`${path} already canonical`);
  } else {
    writeFileSync(path, out);
    console.log(`${path} rewritten: sorted and reformatted`);
  }
  // Re-check, because --fix deliberately cannot repair a duplicate or a
  // contradiction — removing data silently is not a fix.
  const left = checkTermsData(fixed, out);
  if (left.length) {
    console.error(`\n${left.length} problem(s) --fix cannot repair:`);
    for (const m of left) console.error(`  ${m}`);
    process.exit(1);
  }
  process.exit(0);
}

const problems = checkTermsData(data, raw);
if (problems.length) {
  console.error(`${path}: ${problems.length} problem(s)`);
  for (const m of problems) console.error(`  ${m}`);
  process.exit(1);
}
console.log(`check-terms-file OK (${(data.preserveVerbatim ?? []).length} protected terms)`);
