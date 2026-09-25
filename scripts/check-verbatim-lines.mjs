// Lines a translation must carry verbatim from the English page.
//
// Some pages are data as much as prose. The wiki's wallet page parses each
// wallet's fields by their English labels ("- Devices:", "- Features:") and
// colours the Ironwood badge by its English status ("Ready"). Every locale had
// translated them — "- Funzionalità:", "- Ironwood: Pronto", fr "Ironwood :",
// zh "Ironwood：" — so the Features list came out empty and the badge grey in
// all 18 languages, and Spanish differed only because it happened to keep
// "Pools". The decision (2026-09-25) is to keep those data lines English:
// labels, values and status alike.
//
// translation/verbatim-lines.json lists, per page, the regexes an English line
// can match; each translation must hold that line unchanged at the same line
// number. Pages whose line count differs from English cannot be aligned and
// fail — nothing is guessed.
//
// Usage: node scripts/check-verbatim-lines.mjs [--fix] [--files a.md,b.md]
//   --files limits to translation paths (translations/<loc>/site/<page>).
//   --fix   rewrites the listed lines from English in place (a page whose line
//           count differs is still reported, and still fails).
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";

const CONFIG = "translation/verbatim-lines.json";
const arg = (n, d = "") => { const i = process.argv.indexOf(n); return i > -1 ? (process.argv[i + 1] ?? d) : d; };
const fix = process.argv.includes("--fix");
const only = new Set(arg("--files").split(",").map((s) => s.trim()).filter(Boolean));

const { pages } = JSON.parse(readFileSync(CONFIG, "utf8"));
const locales = readdirSync("translations").filter((l) => !l.startsWith(".")).sort();

let checked = 0;
let fixed = 0;
const problems = [];
for (const [page, patterns] of Object.entries(pages)) {
  const rx = patterns.map((p) => new RegExp(p));
  const enPath = `site/${page}`;
  if (!existsSync(enPath)) { problems.push(`${enPath}: listed in ${CONFIG} but missing`); continue; }
  const en = readFileSync(enPath, "utf8").split("\n");
  const want = en.map((l, i) => [i, l]).filter(([, l]) => rx.some((r) => r.test(l)));
  for (const loc of locales) {
    const trPath = `translations/${loc}/site/${page}`;
    if (!existsSync(trPath)) continue;
    if (only.size && !only.has(trPath)) continue;
    checked++;
    const raw = readFileSync(trPath, "utf8");
    const tr = raw.split("\n");
    if (tr.length !== en.length) {
      problems.push(`${trPath}: ${tr.length} lines vs ${en.length} in English — cannot align the data lines`);
      continue;
    }
    const bad = want.filter(([i, l]) => tr[i] !== l);
    if (!bad.length) continue;
    if (fix) {
      for (const [i, l] of bad) tr[i] = l;
      writeFileSync(trPath, tr.join("\n"));
      fixed++;
      continue;
    }
    for (const [i, l] of bad.slice(0, 3)) {
      problems.push(`${trPath}:${i + 1}: must be verbatim English\n    want: ${l}\n    got:  ${tr[i]}`);
    }
    if (bad.length > 3) problems.push(`${trPath}: …and ${bad.length - 3} more line(s)`);
  }
}

if (fix) console.log(`verbatim lines: rewrote ${fixed} of ${checked} translation(s).`);
if (problems.length) {
  for (const p of problems) console.error(p);
  console.error(`\nverbatim-lines check FAILED — ${problems.length} problem(s). Run with --fix to copy the English lines.`);
  process.exit(1);
}
if (!fix) console.log(`verbatim lines OK — ${checked} translation(s).`);
