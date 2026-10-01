// Take English pages out of the translation set, completely.
//
// Deleting or moving a curated English page leaves its line in
// curated-pages.txt, its 18 translations and their sync-state.json entries
// behind. check-invariants then fails on main for every PR and the translation
// sync cannot publish anything (#2259 -> #2263, #2297 -> #2303). This does the
// whole cleanup in one step, so the PR that deletes or moves a page can carry it.
//
// Usage: node translation/decurate.mjs <page> [<page> …]
//   <page> is a path under site/, as curated-pages.txt writes it
//   ("tutorials/Exchanges.md", not "site/tutorials/Exchanges.md").
// Then regenerate the menu titles: node translation/gen-menu-titles.mjs
//
// It never touches the English page: delete or move that yourself.

import { readFileSync, writeFileSync, existsSync, rmSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { realpathSync } from "node:fs";

// A list line is read the same way here and in the curation check: drop a
// "# comment", then trim. Matching raw lines let the check flag a page that the
// command it suggested could not remove.
export const listEntry = (line) => line.replace(/#.*/, "").trim();

export function decurate(root, pages) {
  const norm = (p) => p.trim().replace(/^site\//, "");
  const want = new Set(pages.map(norm).filter(Boolean));
  if (!want.size) throw new Error("no pages given");

  // Both lists: a deleted page must leave neither curated-pages.txt nor
  // english-only-pages.txt pointing at it.
  let removedLines = 0;
  for (const name of ["curated-pages.txt", "english-only-pages.txt"]) {
    const path = join(root, "translation", name);
    if (!existsSync(path)) continue;
    const lines = readFileSync(path, "utf8").split("\n");
    const kept = lines.filter((l) => !want.has(listEntry(l)));
    if (name === "curated-pages.txt") removedLines = lines.length - kept.length;
    else if (kept.length !== lines.length) removedLines += lines.length - kept.length;
    writeFileSync(path, kept.join("\n"));
  }

  const statePath = join(root, "translation/sync-state.json");
  const raw = readFileSync(statePath, "utf8");
  const state = JSON.parse(raw);
  let entries = 0;
  for (const loc of Object.keys(state)) for (const p of want) if (p in state[loc]) { delete state[loc][p]; entries++; }
  writeFileSync(statePath, JSON.stringify(state, null, 2) + (raw.endsWith("\n") ? "\n" : ""));

  let files = 0;
  const tdir = join(root, "translations");
  for (const loc of existsSync(tdir) ? readdirSync(tdir) : []) {
    for (const p of want) {
      const f = join(tdir, loc, "site", p);
      if (existsSync(f)) { rmSync(f); files++; }
    }
  }
  return { pages: [...want], removedLines, entries, files };
}

const isMain = (() => { try { return realpathSync(fileURLToPath(import.meta.url)) === realpathSync(process.argv[1] ?? ""); } catch { return false; } })();
if (isMain) {
  const pages = process.argv.slice(2);
  if (!pages.length) { console.error("usage: node translation/decurate.mjs <page> [<page> …]   (paths under site/)"); process.exit(2); }
  const r = decurate(process.cwd(), pages);
  console.log(`decurated ${r.pages.length} page(s): ${r.removedLines} curated line(s), ${r.files} translation(s), ${r.entries} manifest entr${r.entries === 1 ? "y" : "ies"} removed.`);
  if (!r.removedLines) console.log("note: none of them was in curated-pages.txt.");
  console.log("next: node translation/gen-menu-titles.mjs   (then commit everything)");
}
