// Table columns a translation must carry VERBATIM from the English page.
//
// A glossary's term column is vocabulary: readers look the English term up, so
// only the explanation is translated. Translated, the terms became glosses —
// sw "Wito wa Mtaalamu wa Miti" ("call of the tree expert") for Arborist Call —
// in all 18 locales, 1,954 cells on 2026-09-26. Identifier columns are the
// same: RPC parameter names (`timeout`, `passphrase`) in a Parameter column
// were translated into ordinary words.
//
// A column is verbatim when its header — the table row just above the |---|
// separator — is one of HEADERS. The header cell itself stays translatable (it
// is a label for readers); every data cell in that column must equal the
// English cell on the same line. A page or row that cannot be aligned (line or
// cell count differs from English) is reported as a notice, never guessed at
// and never a failure: that is drift the next sync of the page repairs, and it
// must not block an unrelated change. Code blocks are skipped.
//
// Usage: node scripts/check-verbatim-columns.mjs [--fix] [--files a.md,b.md]
//   --files limits to translation paths (translations/<loc>/site/<page>).
//   --fix   copies the English cells into place.
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";

export const HEADERS = new Set([
  "term", "terms", "parameter", "parameters", "param", "field", "fields", "flag", "flags",
  "option", "options", "argument", "arguments", "key", "method", "endpoint", "variable", "env",
]);
const SEPARATOR = /^\s*\|[\s:\-|]+\|\s*$/;
const isRow = (l) => l.trim().startsWith("|");
export const cells = (l) => l.split(/(?<!\\)\|/);
const headerKey = (c) => c.trim().replace(/^[*`_]+|[*`_]+$/g, "").trim().toLowerCase();

// { line index: [cell indexes] } for every data row of a table with a verbatim column.
export function verbatimCells(enLines) {
  const out = new Map();
  let cols = null;
  let fence = null;
  enLines.forEach((line, i) => {
    const f = line.match(/^\s*(```|~~~)/);
    if (fence) { if (f && f[1] === fence) fence = null; return; }
    if (f) { fence = f[1]; return; }
    if (!isRow(line)) { cols = null; return; }
    if (i + 1 < enLines.length && SEPARATOR.test(enLines[i + 1])) {
      const c = cells(line).map((x, n) => (HEADERS.has(headerKey(x)) ? n : -1)).filter((n) => n >= 0);
      cols = c.length ? c : null;
      return;                     // the header row: its label stays translatable
    }
    if (cols && !SEPARATOR.test(line)) out.set(i, cols);
  });
  return out;
}

function main() {
  const arg = (n, d = "") => { const i = process.argv.indexOf(n); return i > -1 ? (process.argv[i + 1] ?? d) : d; };
  const fix = process.argv.includes("--fix");
  const only = new Set(arg("--files").split(",").map((s) => s.trim()).filter(Boolean));
  const curated = readFileSync("translation/curated-pages.txt", "utf8").split("\n")
    .map((s) => s.trim()).filter((s) => s && !s.startsWith("#"));
  const locales = readdirSync("translations").filter((l) => !l.startsWith(".")).sort();
  let checked = 0, fixedCells = 0;
  const problems = [];
  const notices = [];
  for (const page of curated) {
    const enPath = `site/${page}`;
    if (!existsSync(enPath)) continue;
    const en = readFileSync(enPath, "utf8").split("\n");
    const want = verbatimCells(en);
    if (!want.size) continue;
    for (const loc of locales) {
      const trPath = `translations/${loc}/site/${page}`;
      if (!existsSync(trPath) || (only.size && !only.has(trPath))) continue;
      checked++;
      const tr = readFileSync(trPath, "utf8").split("\n");
      if (tr.length !== en.length) { notices.push(`${trPath}: ${tr.length} lines vs ${en.length} in English — not checked`); continue; }
      let changed = false;
      for (const [i, cols] of want) {
        const ec = cells(en[i]), tc = cells(tr[i]);
        if (tc.length !== ec.length) { notices.push(`${trPath}:${i + 1}: ${tc.length - 1} cells vs ${ec.length - 1} in English — not checked`); continue; }
        for (const n of cols) {
          if (tc[n].trim() === ec[n].trim()) continue;
          if (fix) { tc[n] = ec[n]; changed = true; fixedCells++; }
          else problems.push(`${trPath}:${i + 1}: column must be verbatim English\n    want: ${ec[n].trim()}\n    got:  ${tc[n].trim()}`);
        }
        if (fix) tr[i] = tc.join("|");
      }
      if (changed) writeFileSync(trPath, tr.join("\n"));
    }
  }
  for (const n of notices) console.log(`notice: ${n}`);
  if (fix) console.log(`verbatim columns: restored ${fixedCells} cell(s) across ${checked} translation(s).`);
  if (problems.length) {
    for (const p of problems.slice(0, 40)) console.error(p);
    if (problems.length > 40) console.error(`…and ${problems.length - 40} more`);
    console.error(`\nverbatim-columns check FAILED — ${problems.length} problem(s). Run with --fix to copy the English cells.`);
    process.exit(1);
  }
  if (!fix) console.log(`verbatim columns OK — ${checked} translation(s).`);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
