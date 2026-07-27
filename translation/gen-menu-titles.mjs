// Generate the per-locale page-title manifests that drive localized side-menu
// labels. Regenerated FROM SCRATCH each run (add/delete/rename safe) and
// committed in the SAME PR as the translations, so labels and content are
// atomic. Deterministic (sorted keys) so a "re-run => empty diff" CI check can
// enforce freshness.
//
// Output (path-keyed by the full site-relative page path, e.g. "guides/Foo.md"):
//   translation/menu-titles/en.json          { "<path>": "<English title>" }  — EVERY
//       non-global page under site/ (the side menu lists the ENGLISH tree, so a
//       non-curated page must still get a real English label, not a filename).
//   translation/menu-titles/<locale>.json     { "<path>": "<translated title>" }
//       — only curated pages this locale has translated (else it falls back to
//       the en manifest, then the filename).
//
// Usage: node translation/gen-menu-titles.mjs [--check]
//   --check: regenerate in memory and exit non-zero if it differs from the
//            committed files OR the committed file SET differs from expected
//            (e.g. a stale manifest for a removed locale). Writes nothing.
// Run from the content repo root.

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { extractTitle } from "./lib/extract-title.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const OUT_DIR = join(root, "translation/menu-titles");
const check = process.argv.includes("--check");

const curated = readFileSync(join(root, "translation/curated-pages.txt"), "utf8")
  .split("\n").map((s) => s.trim()).filter(Boolean);
// Canonical locale set = the manifest's top-level keys, minus any stray "en".
const locales = Object.keys(
  JSON.parse(readFileSync(join(root, "translation/sync-state.json"), "utf8")),
).filter((l) => l !== "en").sort();

// Locale keys become path segments (input `translations/<loc>/site/` and output
// `menu-titles/<loc>.json`). Refuse anything that isn't a plain locale tag, so a
// malformed/hostile manifest key (e.g. "../../package") can't traverse out of
// OUT_DIR and overwrite arbitrary files.
const LOCALE_RE = /^[a-z]{2,3}(-[a-z0-9]+)?$/i;
for (const l of locales) {
  if (!LOCALE_RE.test(l)) {
    console.error(`Unsafe locale key in sync-state.json: ${JSON.stringify(l)} — refusing.`);
    process.exit(1);
  }
}

// Full set of non-global English pages (what the side menu can list).
function englishTreePages() {
  const out = execFileSync("git", ["ls-files", "site/"], { cwd: root, encoding: "utf8" });
  return out.split("\n")
    .filter((p) => p.endsWith(".md") && !p.startsWith("site/zechubglobal/"))
    .map((p) => p.replace(/^site\//, ""));
}

// Build { path: title } for a set of pages under `base`.
function build(base, pages) {
  const out = {};
  const noTitle = [];
  for (const page of pages) {
    const abs = join(root, base, page);
    if (!existsSync(abs)) continue; // page not present here — omit
    const title = extractTitle(readFileSync(abs, "utf8"));
    if (title) out[page] = title;
    else noTitle.push(page);
  }
  return { out, noTitle };
}

function serialize(obj) {
  const sorted = {};
  for (const k of Object.keys(obj).sort()) sorted[k] = obj[k];
  return JSON.stringify(sorted, null, 2) + "\n";
}

const manifests = {}; // filename -> serialized content
const diag = { locales: {}, enNoTitle: [] };

const en = build("site", englishTreePages());
manifests["en.json"] = serialize(en.out);
diag.enNoTitle = en.noTitle;

for (const loc of locales) {
  const b = build(join("translations", loc, "site"), curated);
  manifests[`${loc}.json`] = serialize(b.out);
  diag.locales[loc] = { titled: Object.keys(b.out).length, noTitle: b.noTitle.length };
}

const expectedFiles = new Set(Object.keys(manifests));

if (check) {
  let drift = 0;
  for (const [name, content] of Object.entries(manifests)) {
    const p = join(OUT_DIR, name);
    const current = existsSync(p) ? readFileSync(p, "utf8") : null;
    if (current !== content) { console.error(`DRIFT: translation/menu-titles/${name} is stale — re-run gen-menu-titles.mjs and commit.`); drift += 1; }
  }
  // Also flag stray files (e.g. a manifest left behind for a removed locale).
  if (existsSync(OUT_DIR)) {
    for (const f of readdirSync(OUT_DIR)) {
      if (f.endsWith(".json") && !expectedFiles.has(f)) { console.error(`STRAY: translation/menu-titles/${f} has no corresponding locale — remove it.`); drift += 1; }
    }
  }
  if (drift > 0) { console.error(`${drift} manifest issue(s).`); process.exit(1); }
  console.log(`menu-titles manifests up to date (${expectedFiles.size} files).`);
  process.exit(0);
}

mkdirSync(OUT_DIR, { recursive: true });
for (const [name, content] of Object.entries(manifests)) writeFileSync(join(OUT_DIR, name), content);

console.log(`Wrote ${expectedFiles.size} manifest(s): en=${Object.keys(en.out).length} pages (full tree), ${locales.length} locales × curated.`);
if (diag.enNoTitle.length) {
  console.log(`English pages with no extractable title (${diag.enNoTitle.length}) — side menu shows the filename:`);
  for (const p of diag.enNoTitle) console.log(`  - ${p}`);
}
