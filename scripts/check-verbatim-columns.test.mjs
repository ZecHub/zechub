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

function repo(sw, en = EN) {
  const d = mkdtempSync(join(tmpdir(), "vc-"));
  mkdirSync(join(d, "translation"));
  mkdirSync(join(d, "site/G"), { recursive: true });
  mkdirSync(join(d, "translations/sw/site/G"), { recursive: true });
  writeFileSync(join(d, "translation/curated-pages.txt"), "G/Glossary.md\n");
  writeFileSync(join(d, "site/G/Glossary.md"), en);
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

// Fences are literal examples, even when they contain a shorter fence or a
// fence-looking line with text. Check the actual CLI, including --fix: it must
// neither rewrite the example nor miss a real table after the closing fence.
for (const [name, open, content, close, eol = "\n"] of [
  ["short backticks do not close a longer fence", "````markdown", "```", "````"],
  ["short tildes do not close a longer fence", "~~~~markdown", "~~~", "~~~~"],
  ["text after backticks is not a closer", "```", "``` not a closer", "```"],
  ["text after tildes is not a closer", "~~~", "~~~ not a closer", "~~~"],
  ["the other fence character is content", "```", "~~~", "```"],
  ["a longer fence closes the example", "```markdown", "example", "`````"],
  ["indented fence with trailing whitespace closes", "  ~~~~markdown", "~~~", "   ~~~~ \t"],
  ["CRLF fences preserve the original bytes", "````markdown", "```", "````", "\r\n"],
]) {
  const en = [open, content, "| Term | Meaning |", "|---|---|",
    "| Inside | Example |", close, "", "| Parameter | Meaning |",
    "|---|---|", "| timeout | Seconds |", ""].join(eol);
  const translated = en.replace("| Inside | Example |", "| Mfano | Maana |");
  d = repo(translated, en);
  check(`${name}: no false failure`, run(d).code, 0);
  writeFileSync(join(d, "translations/sw/site/G/Glossary.md"), translated.replace("| timeout |", "| muda |"));
  check(`${name}: real table is still checked`, run(d).code, 1);
  check(`${name}: --fix changes only the real table`, [run(d, "--fix").code, sw(d)], [0, translated]);
  rmSync(d, { recursive: true });
}

for (const [name, en, translated, expectedCode, expectedFixed] of [
  ["an unclosed long fence covers the rest of the file",
    "````\n```\n| Term | Meaning |\n|---|---|\n| Inside | Example |\n",
    "````\n```\n| Term | Meaning |\n|---|---|\n| Mfano | Maana |\n",
    0, "````\n```\n| Term | Meaning |\n|---|---|\n| Mfano | Maana |\n"],
  ["backticks in an info string do not open a fence",
    "``` a`b\n\n| Term | Meaning |\n|---|---|\n| Outside | Meaning |\n",
    "``` a`b\n\n| Term | Meaning |\n|---|---|\n| Nje | Maana |\n",
    1, "``` a`b\n\n| Term | Meaning |\n|---|---|\n| Outside | Maana |\n"],
  ["a fence separates table column state",
    "| Term | Meaning |\n|---|---|\n| Before | Meaning |\n```\nexample\n```\n| After | Prose |\n",
    "| Term | Meaning |\n|---|---|\n| Before | Maana |\n```\nexample\n```\n| Baada | Maandishi |\n",
    0, "| Term | Meaning |\n|---|---|\n| Before | Maana |\n```\nexample\n```\n| Baada | Maandishi |\n"],
]) {
  d = repo(translated, en);
  check(`${name}: check result`, run(d).code, expectedCode);
  check(`${name}: --fix result`, [run(d, "--fix").code, sw(d)], [0, expectedFixed]);
  rmSync(d, { recursive: true });
}

if (failures) { console.log(`\n${failures} failure(s)`); process.exit(1); }
console.log("\nall passed");
