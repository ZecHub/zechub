// Self-test for check-verbatim-columns.mjs, run against a throwaway repo.
// Run: node scripts/check-verbatim-columns.test.mjs
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const SCRIPT = resolve("scripts/check-verbatim-columns.mjs");
let failures = 0;
const check = (name, got, want) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log(`  ${ok ? "ok  " : "FAIL"} ${name}`);
  if (!ok) { failures++; console.log(`       want: ${JSON.stringify(want)}\n       got:  ${JSON.stringify(got)}`); }
};

const EN = [
  "# Glossary", "",
  "| Term | Definition |", "|------|-----------|",
  "| Arborist Call | A fortnightly developer call |",
  "| Sapling | The second shielded pool |", "",
  "| Parameter | Description |", "|---|---|", "| timeout | Seconds to wait |", "",
  "| Feature | Status |", "|---|---|", "| Memo | Live |", "",
  "```", "| Term | Meaning |", "|---|---|", "| Foo | not a real table |", "```",
].join("\n");
const SW_OK = [
  "# Kamusi", "",
  "| Neno | Ufafanuzi |", "|------|-----------|",
  "| Arborist Call | Simu ya wasanidi kila wiki mbili |",
  "| Sapling | Bwawa la pili lililolindwa |", "",
  "| Kigezo | Maelezo |", "|---|---|", "| timeout | Sekunde za kusubiri |", "",
  "| Kipengele | Hali |", "|---|---|", "| Memo | Hai |", "",
  "```", "| Neno | Maana |", "|---|---|", "| Fuu | si jedwali halisi |", "```",
].join("\n");

function repo(sw) {
  const d = mkdtempSync(join(tmpdir(), "vc-"));
  mkdirSync(join(d, "translation"));
  mkdirSync(join(d, "site/G"), { recursive: true });
  mkdirSync(join(d, "translations/sw/site/G"), { recursive: true });
  writeFileSync(join(d, "translation/curated-pages.txt"), "G/Glossary.md\n");
  writeFileSync(join(d, "site/G/Glossary.md"), EN);
  writeFileSync(join(d, "translations/sw/site/G/Glossary.md"), sw);
  return d;
}
function run(d, ...args) {
  try { return { code: 0, out: execFileSync("node", [SCRIPT, ...args], { cwd: d, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }) }; }
  catch (e) { return { code: e.status, out: `${e.stdout}${e.stderr}` }; }
}
const sw = (d) => readFileSync(join(d, "translations/sw/site/G/Glossary.md"), "utf8");

let d = repo(SW_OK);
check("verbatim term and parameter cells pass; headers, prose columns and code blocks stay translated", run(d).code, 0);
rmSync(d, { recursive: true });

for (const [label, bad] of [
  ["a translated glossary term fails", SW_OK.replace("| Arborist Call |", "| Wito wa Mtaalamu wa Miti |")],
  ["a translated parameter name fails", SW_OK.replace("| timeout |", "| muda wa kuisha |")],
]) {
  d = repo(bad);
  const r = run(d);
  check(label, [r.code, /column must be verbatim English/.test(r.out)], [1, true]);
  rmSync(d, { recursive: true });
}

d = repo(SW_OK.replace("| Memo | Hai |", "| Kumbukumbu | Hai |"));
check("a column not headed as vocabulary or identifiers is not checked", run(d).code, 0);
rmSync(d, { recursive: true });

d = repo(SW_OK.replace("| Fuu |", "| Fuu2 |"));
check("rows inside a code block are ignored", run(d).code, 0);
rmSync(d, { recursive: true });

d = repo(SW_OK.replace("| Arborist Call |", "| Wito wa Mtaalamu wa Miti |").replace("| timeout |", "| muda wa kuisha |"));
const f = run(d, "--fix");
check("--fix restores the English cells and leaves every other cell alone", [f.code, sw(d)], [0, SW_OK]);
check("after --fix the check passes", run(d).code, 0);
rmSync(d, { recursive: true });

d = repo(SW_OK.replace("| Sapling | Bwawa la pili lililolindwa |", "| Sapling | Bwawa | la pili |"));
const m = run(d, "--fix");
check("a row whose cell count differs is reported, not failed, and not touched",
  [m.code, /cells vs .* not checked/.test(m.out), sw(d).includes("| Sapling | Bwawa | la pili |")], [0, true, true]);
rmSync(d, { recursive: true });

d = repo(SW_OK.replace("| timeout |", "| muda wa kuisha |"));
check("--files limits the check",
  [run(d, "--files", "translations/xx/site/G/Glossary.md").code, run(d, "--files", "translations/sw/site/G/Glossary.md").code], [0, 1]);
rmSync(d, { recursive: true });

if (failures) { console.log(`\n${failures} failure(s)`); process.exit(1); }
console.log("\nall passed");
