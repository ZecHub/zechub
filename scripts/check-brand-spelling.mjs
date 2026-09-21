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
// Scoped to the files a PR CHANGES, never the whole corpus — but a changed file
// is checked in FULL, not just its changed lines. Touching a page therefore means
// bringing that page to canon. That is deliberate: it is the only mechanism that
// drains the backlog, and it bounds the work to one page at a time.
//
// Findings are emitted as GitHub annotations so they appear on the changed line
// in the diff, not only in a job log nobody opens.
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

// One term can have several correct forms (equivalentForms: zk-SNARK /
// zk-SNARKs). A finding still has to name ONE of them, because `want` is read
// by scripts as well as people: emitting "zk-SNARKs or zk-SNARK" invited an
// autofix to write that phrase into the page, and the gate then passed it,
// since the canonical form is a substring of it. Pick the form the author most
// likely meant — same token ignoring case first, then number agreement, then
// nearest length — and report the rest as alternatives.
function pickForm(found, forms) {
  const list = [...forms];
  if (list.length === 1) return { want: list[0], alternatives: [] };
  const plural = (x) => /s$/i.test(x);
  const score = (f) => (f.toLowerCase() === found.toLowerCase() ? -100 : 0)
                     + (plural(f) === plural(found) ? -10 : 0)
                     + Math.abs(f.length - found.length);
  const ranked = list.map((f, i) => [f, score(f), i])
                     .sort((a, b) => a[1] - b[1] || a[2] - b[2])
                     .map(([f]) => f);
  return { want: ranked[0], alternatives: ranked.slice(1) };
}

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
  const blank = (l) => " ".repeat(l.length);
  let fence = null, html = false, inList = false;
  return lines.map((l) => {
    // Fence state first, and the raw-HTML rules are gated on it: inside a
    // fenced block a <pre> is literal text, and treating it as an opener
    // latched the mask to end of file. The reverse — a ``` inside <pre> — is
    // handled by testing `html` before opening a fence.
    const f = l.match(/^\s*(`{3,}|~{3,})/);
    if (f && !html) {
      if (fence === null) fence = f[1];
      else if (f[1][0] === fence[0] && f[1].length >= fence.length) fence = null;
      return blank(l);
    }
    if (fence !== null) return blank(l);

    // Raw HTML and comments mask only the SPAN they occupy. Blanking the whole
    // line discarded prose sitting beside a closing tag or a one-line element,
    // which is a fail-open: the finding disappears and the gate still exits 0.
    const marker = /^\s*([-*+]|\d+[.)])\s/.test(l);
    // A list block runs from its first marker until a line that is neither
    // blank, indented, nor another marker — that is what ends it in
    // CommonMark, and blank lines inside it do not.
    if (marker) inList = true;
    else if (l.trim() && !/^[ \t]/.test(l)) inList = false;

    let out = l;
    if (html) {
      const close = out.match(/<\s*\/\s*(pre|code|script|style)\s*>|-->/i);
      if (!close) return blank(out);
      html = false;
      out = blank(out.slice(0, close.index + close[0].length)) + out.slice(close.index + close[0].length);
    }
    // one-line elements and comments, repeatedly, so several may share a line
    out = out.replace(/<\s*(pre|code|script|style)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, blank)
             .replace(/<!--[\s\S]*?-->/g, blank)
             .replace(/<\s*(pre|code|script|style)\b[^>]*\/\s*>/gi, blank);
    // an opener with no closer on this line latches until its closing tag
    const open = out.match(/<\s*(pre|code|script|style)\b[^>]*>/i) || out.match(/<!--/);
    if (open) {
      html = true;
      out = out.slice(0, open.index) + blank(out.slice(open.index));
    }

    // A 4-space indent is a code block ONLY outside a list. Inside one it is a
    // nested item or a CONTINUATION paragraph — 435 such lines in this corpus
    // were being masked as code.
    //
    // Testing only whether THIS line starts with a marker was not enough: a
    // continuation paragraph carries no marker of its own, so it stayed masked
    // and any misspelling in it was silently missed. The list-block state above
    // subsumes the marker test — a marker sets inList itself — so only inList
    // is checked here. The trade is deliberate: genuinely indented code inside
    // a list is now scanned, which can only produce a VISIBLE false positive,
    // where the old behaviour produced a silent miss.
    //
    // Tested on the ORIGINAL line: masking an inline element leaves spaces
    // where it was, and judging indentation on that blanked its own prose.
    if (/^(\t| {4})/.test(l) && !inList) return blank(out);

    return out
      .replace(/(`{1,4})[^\n]*?\1/g, blank)
      .replace(/\]\([^)\s]*\)/g, blank)
      .replace(/\b(?:src|href|poster|data-[\w-]+)\s*=\s*"[^"]*"/gi, blank)
      .replace(/\b(?:src|href|poster|data-[\w-]+)\s*=\s*'[^']*'/gi, blank)
      .replace(/https?:\/\/[^\s)\]]+/g, blank);
  });
}

// site/zechubglobal/ is a 511-page archive that nothing renders: it is absent
// from the frontend's routes and holds 0 entries in translation/curated-pages.txt,
// so no locale is derived from it and no reader reaches it. It also carries 788
// of the corpus's 1,078 wrong spellings — 73% — which would make editing any of
// those pages a wall of failures about text that ships nowhere. Excluded until
// the archive is either routed or retired.
const UNROUTED = "site/zechubglobal/";
const isScannable = (f) => f.startsWith("site/") && f.endsWith(".md") && !f.startsWith(UNROUTED);

function changedEnglishFiles(base) {
  if (flag("--all")) {
    return execFileSync("git", ["ls-files", "site/**/*.md", "site/*.md"], { encoding: "utf8" })
      .split("\n").filter(isScannable);
  }
  const out = execFileSync("git", ["diff", "--name-only", "--diff-filter=ACMR", `${base}...HEAD`], { encoding: "utf8" });
  return out.split("\n").filter(isScannable);
}

const base = arg("--base", "origin/main");
let files;
try { files = changedEnglishFiles(base); }
catch (e) { console.error(`cannot list changed files against ${base}: ${e.message}`); process.exit(2); }

// okForms is keyed by every lowercase form, so a two-form term appears under
// two keys with two equal-but-distinct Sets. Deduplicate by content, or the
// pair rule below reports each hit once per member.
const suggestionRes = [...new Map(
  [...okForms.values()].filter((f) => f.size > 1)
                       .map((f) => [[...f].sort().join("\u0000"), [...f]]),
).values()].map((forms) => {
  const alt = forms.map(esc).join("|");
  return new RegExp(`(?<![A-Za-z0-9])(${alt})\\s+or\\s+(${alt})(?![A-Za-z0-9])`, "g");
});

const findings = [];
for (const f of files) {
  if (!existsSync(f)) continue;
  const rawLines = readFileSync(f, "utf8").split("\n");
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
        if (m[1] === m[1].toUpperCase() && !/[a-z]/.test(rawLines[i].replace(/[^A-Za-z]/g, ""))) continue;
        const { want, alternatives } = pickForm(m[1], forms);
        findings.push({ file: f, line: i + 1, col: m.index + 1, kind: "spelling", found: m[1], want, alternatives });
      }
    }
    // A form pair joined by " or " is this gate's own suggestion text pasted
    // into the page — "[zk-SNARKs or zk-SNARK](/zcash-tech/zk-snarks)" shipped
    // exactly that way. The spelling rule above cannot see it: both halves are
    // correct spellings, so the line passes while the prose is wrong. Only
    // forms of the SAME term count, so "Sapling or Orchard" stays prose.
    for (const re of suggestionRes) {
      re.lastIndex = 0;
      for (const m of line.matchAll(re)) {
        if (m[1] === m[2]) continue;
        findings.push({ file: f, line: i + 1, col: m.index + 1, kind: "suggestion-text",
                        found: m[0], want: m[1], alternatives: [m[2]] });
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
    const also = v.alternatives?.length ? ` (also correct: ${v.alternatives.join(", ")} — write one of them, never both)` : "";
    const msg = v.kind === "suggestion-text"
      ? `Brand spelling: "${v.found}" is a suggestion, not a spelling — write "${v.want}"${also}`
      : `Brand spelling: write "${v.want}", not "${v.found}"${also}`;
    console.log(`::error file=${escProp(v.file)},line=${v.line},col=${v.col}::${escData(msg)}`);
  }
}

if (findings.length) {
  console.error(`\nbrand spelling FAILED — ${findings.length} wrong spelling(s) in ${new Set(findings.map((f) => f.file)).size} changed English page(s).`);
  console.error(`Canonical spellings come from translation/protected-terms.json. A spelling not on that list is not protected, so the translation engines translate it.`);
  process.exit(1);
}
console.log(`brand spelling OK — ${files.length} changed English page(s).`);
