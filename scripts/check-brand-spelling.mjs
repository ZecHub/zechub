// Brand spelling gate for ENGLISH pages.
//
// translation/protected-terms.json says which terms an engine must not
// translate. It says nothing about how a contributor should SPELL them, and the
// corpus drifted: 2,307 wrong-case uses across 63 files, with "Free2z" (287)
// now more common than the correct "Free2Z" (200).
//
// That is not cosmetic. A spelling absent from preserveVerbatim is unprotected,
// so the engines translate it — "Free2z" became "Bure2z" in Swahili and
// "Zechub" became "Sékúbù" in Yoruba, because those exact spellings were not on
// the list. Fixing the English is what stops it at the source.
//
// Scoped to the files a PR CHANGES, never the whole corpus: the backlog predates
// any one contributor and failing them for it would make the gate something to
// route around. Findings are emitted as GitHub annotations so they appear on the
// changed line in the diff, not only in a job log nobody opens.
//
// Usage: node scripts/check-brand-spelling.mjs [--base <ref>] [--all] [--json]
import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";

const arg = (n, d = "") => { const i = process.argv.indexOf(n); return i > -1 ? (process.argv[i + 1] ?? d) : d; };
const flag = (n) => process.argv.includes(n);

const TERMS = "translation/protected-terms.json";
if (!existsSync(TERMS)) { console.error(`cannot read ${TERMS}`); process.exit(2); }
const { preserveVerbatim = [], equivalentForms = [] } = JSON.parse(readFileSync(TERMS, "utf8"));

// A term whose only difference from another is case cannot be judged by case.
// Equivalent forms are declared same-term, so any of them is correct here too.
const okForms = new Map();
for (const t of preserveVerbatim) okForms.set(t.toLowerCase(), new Set([t]));
for (const group of equivalentForms)
  for (const t of group) {
    const k = t.toLowerCase();
    if (!okForms.has(k)) okForms.set(k, new Set());
    for (const g of group) okForms.get(k).add(g);
  }

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Spellings that are a DIFFERENT word, not a misspelt brand. "Seth For Privacy"
// and "Seth Hertlein" are people who appear in podcast listings; the ticker sETH
// occurs once, in a markets list. Capitalisation alone cannot separate them, so
// the pairing is declared rather than guessed — the same principle as
// equivalentForms.
const NOT_A_MISSPELLING = new Set(["Seth"]);

// Prose only. A URL, a code span and a fenced block are not prose: the path
// github.com/zechub/zechub is correctly lowercase and must never be rewritten.
function proseMask(md) {
  const lines = md.split("\n");
  let fence = null, html = false;        // fence = the opening run, e.g. "````"
  return lines.map((l) => {
    const m = l.match(/^\s*(`{3,}|~{3,})/);
    if (m) {
      // CommonMark: a fence closes only on the SAME character and at least as
      // many of them. Toggling on any fence let an inner ``` close an outer
      // ````, so the rest of the block was scanned as prose.
      if (fence === null) { fence = m[1]; return ""; }
      if (m[1][0] === fence[0] && m[1].length >= fence.length) { fence = null; return ""; }
      return "";
    }
    if (fence !== null) return "";
    // A 4-space indented block is code too. Without this the gate told a
    // contributor to change the brand inside their shell example.
    if (/^(\t| {4})/.test(l)) return "";
    // Raw HTML blocks — <pre>, <code>, <script>, <style> — are not prose
    // either, and this corpus embeds them for video and code samples.
    if (/^\s*<\s*(pre|code|script|style)\b/i.test(l)) { html = true; return ""; }
    if (html) { if (/<\s*\/\s*(pre|code|script|style)\s*>/i.test(l)) html = false; return ""; }
    return l
      .replace(/(`{1,4})[^\n]*?\1/g, (m) => " ".repeat(m.length))
      .replace(/\]\([^)\s]*\)/g, (m) => " ".repeat(m.length))
      .replace(/https?:\/\/[^\s)\]]+/g, (m) => " ".repeat(m.length));
  });
}

function changedEnglishFiles(base) {
  if (flag("--all")) {
    return execFileSync("git", ["ls-files", "site/**/*.md", "site/*.md"], { encoding: "utf8" })
      .split("\n").filter(Boolean);
  }
  const out = execFileSync("git", ["diff", "--name-only", "--diff-filter=ACMR", `${base}...HEAD`], { encoding: "utf8" });
  return out.split("\n").filter((f) => f.startsWith("site/") && f.endsWith(".md"));
}

const base = arg("--base", "origin/main");
let files;
try { files = changedEnglishFiles(base); }
catch (e) { console.error(`cannot list changed files against ${base}: ${e.message}`); process.exit(2); }

const findings = [];
for (const f of files) {
  if (!existsSync(f)) continue;
  proseMask(readFileSync(f, "utf8")).forEach((line, i) => {
    if (!line.trim()) return;
    for (const [lower, forms] of okForms) {
      const re = new RegExp(`(?<![A-Za-z0-9])(${esc(lower)})(?![A-Za-z0-9])`, "gi");
      for (const m of line.matchAll(re)) {
        if (forms.has(m[1])) continue;                 // already a correct form
        // An all-lowercase form is ambiguous with an ordinary word and must not
        // be "corrected": "ledger" is a ledger, "viewing key" mid-sentence is
        // terminology whose casing follows sentence position, and "zcash"
        // appears in paths and handles. Only a form that is already capitalised
        // somewhere — Free2z, ZCash, Zechub, Ywallet — is unambiguously a
        // misspelt brand.
        if (m[1] === m[1].toLowerCase() && m[1] !== [...forms][0]) continue;
        if (NOT_A_MISSPELLING.has(m[1])) continue;
        findings.push({ file: f, line: i + 1, col: m.index + 1, found: m[1], want: [...forms].join(" or ") });
      }
    }
  });
}

if (flag("--json")) { console.log(JSON.stringify({ findings, files: files.length }, null, 2)); }
else {
  for (const v of findings) {
    // GitHub renders this on the changed line in the PR diff.
    console.log(`::error file=${v.file},line=${v.line},col=${v.col}::Brand spelling: write "${v.want}", not "${v.found}"`);
  }
}

if (findings.length) {
  console.error(`\nbrand spelling FAILED — ${findings.length} wrong spelling(s) in ${new Set(findings.map((f) => f.file)).size} changed English page(s).`);
  console.error(`Canonical spellings come from translation/protected-terms.json. A spelling not on that list is not protected, so the translation engines translate it.`);
  process.exit(1);
}
console.log(`brand spelling OK — ${files.length} changed English page(s).`);
