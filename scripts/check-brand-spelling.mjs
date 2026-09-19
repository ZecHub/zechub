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
for (const t of preserveVerbatim) {
  const k = t.toLowerCase();
  if (!okForms.has(k)) okForms.set(k, new Set());
  okForms.get(k).add(t);          // merge: a plain set() would drop one silently
}
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
//
// YAML front matter IS scanned, deliberately. A title is read by people and by
// the menu generator, so a brand misspelt there is as wrong as one in the body —
// and a rule that holds everywhere is easier to trust than one with a carve-out.
// Six pages carry front matter and one of them carries a wrong spelling.
function proseMask(md) {
  const lines = md.split("\n");
  let fence = null, html = false;        // fence = the opening run, e.g. "````"
  return lines.map((l) => {
    // Raw HTML first. Inside <pre>/<code> a ``` is literal text, not a fence:
    // letting the fence branch see it opened a phantom fence that then
    // swallowed the closing </pre>, and the gate silently skipped the rest of
    // the file — the same failure as the one-line element, by another route.
    if (html) { if (/<\s*\/\s*(pre|code|script|style)\s*>/i.test(l) || /-->/.test(l)) html = false; return ""; }
    if (/^\s*<!--/.test(l)) {
      // An HTML comment is markup, not prose. Acting on an annotation inside
      // one changes text no reader ever sees.
      if (!/-->/.test(l)) html = true;
      return "";
    }
    if (/^\s*<\s*(pre|code|script|style)\b/i.test(l)) {
      // Latch only when the element neither closes nor self-closes on this
      // line. `<code/>` opened a block that no `</code>` ever closed, so the
      // rest of the file was masked and the gate reported success on a page it
      // had stopped reading — the fourth variant of that failure.
      const closes = /<\s*\/\s*(pre|code|script|style)\s*>/i.test(l) || /\/\s*>/.test(l);
      if (!closes) html = true;
      return "";
    }
    const m = l.match(/^\s*(`{3,}|~{3,})/);
    if (m) {
      if (fence === null) { fence = m[1]; return ""; }
      if (m[1][0] === fence[0] && m[1].length >= fence.length) { fence = null; return ""; }
      return "";
    }
    if (fence !== null) return "";
    if (/^(\t| {4})/.test(l)) return "";
    return l
      .replace(/(`{1,4})[^\n]*?\1/g, (x) => " ".repeat(x.length))
      .replace(/\]\([^)\s]*\)/g, (x) => " ".repeat(x.length))
      .replace(/\b(?:src|href|poster|data-[\w-]+)\s*=\s*"[^"]*"/gi, (x) => " ".repeat(x.length))
      .replace(/\b(?:src|href|poster|data-[\w-]+)\s*=\s*'[^']*'/gi, (x) => " ".repeat(x.length))
      .replace(/https?:\/\/[^\s)\]]+/g, (x) => " ".repeat(x.length));
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
        if (m[1] === m[1].toLowerCase()) continue;
        if (NOT_A_MISSPELLING.has(m[1])) continue;
        // A line written entirely in capitals is a styled heading — "ZCASH
        // ECOSYSTEM DIGEST | JULY 6" — and telling its author to write "Zcash"
        // is a style opinion, not a spelling correction. Only whole-line caps
        // qualify: a lone ZCASH inside ordinary prose is still flagged.
        if (m[1] === m[1].toUpperCase() && !/[a-z]/.test(line.replace(/[^A-Za-z]/g, ""))) continue;
        findings.push({ file: f, line: i + 1, col: m.index + 1, found: m[1], want: [...forms].join(" or ") });
      }
    }
  });
}

if (flag("--json")) { console.log(JSON.stringify({ findings, files: files.length }, null, 2)); }
else {
  for (const v of findings) {
    // GitHub renders this on the changed line in the PR diff.
    // GitHub workflow commands are comma-separated, so a path containing a
    // comma or colon truncates the annotation and it silently lands on the
    // wrong file or nowhere. Three pages in this corpus already have such
    // names, e.g. "Zcash Ecosystem Digest - July 6th, 2025".
    // Data:  % -> %25, CR -> %0D, LF -> %0A.  Properties also: , -> %2C, : -> %3A
    const escData = (x) => String(x).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
    const escProp = (x) => escData(x).replace(/,/g, "%2C").replace(/:/g, "%3A");
    console.log(`::error file=${escProp(v.file)},line=${v.line},col=${v.col}::${escData(`Brand spelling: write "${v.want}", not "${v.found}"`)}`);
  }
}

if (findings.length) {
  console.error(`\nbrand spelling FAILED — ${findings.length} wrong spelling(s) in ${new Set(findings.map((f) => f.file)).size} changed English page(s).`);
  console.error(`Canonical spellings come from translation/protected-terms.json. A spelling not on that list is not protected, so the translation engines translate it.`);
  process.exit(1);
}
console.log(`brand spelling OK — ${files.length} changed English page(s).`);
