// Run: node --test translation/lib/decurate.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { decurate } from "../decurate.mjs";

function fixture() {
  const r = mkdtempSync(join(tmpdir(), "decurate-"));
  mkdirSync(join(r, "translation"));
  writeFileSync(join(r, "translation/curated-pages.txt"), "A/Keep.md\ntutorials/Gone.md\nB/Also.md\n");
  writeFileSync(join(r, "translation/sync-state.json"), JSON.stringify({ it: { "A/Keep.md": { src: "x" }, "tutorials/Gone.md": { src: "y" } }, de: { "tutorials/Gone.md": { src: "z" } } }, null, 2) + "\n");
  for (const loc of ["it", "de"]) { mkdirSync(join(r, "translations", loc, "site", "tutorials"), { recursive: true }); mkdirSync(join(r, "translations", loc, "site", "A"), { recursive: true });
    writeFileSync(join(r, "translations", loc, "site/tutorials/Gone.md"), "x"); writeFileSync(join(r, "translations", loc, "site/A/Keep.md"), "x"); }
  return r;
}

test("removes the curated line, every translation and every manifest entry of the page — nothing else", () => {
  const r = fixture();
  try {
    const out = decurate(r, ["site/tutorials/Gone.md"]);
    assert.deepEqual([out.removedLines, out.files, out.entries], [1, 2, 2]);
    assert.equal(readFileSync(join(r, "translation/curated-pages.txt"), "utf8"), "A/Keep.md\nB/Also.md\n");
    const st = JSON.parse(readFileSync(join(r, "translation/sync-state.json"), "utf8"));
    assert.deepEqual(st, { it: { "A/Keep.md": { src: "x" } }, de: {} });
    assert.equal(existsSync(join(r, "translations/it/site/tutorials/Gone.md")), false);
    assert.equal(existsSync(join(r, "translations/it/site/A/Keep.md")), true);
  } finally { rmSync(r, { recursive: true, force: true }); }
});

test("a page that is not curated changes nothing and says so", () => {
  const r = fixture();
  try {
    const before = readFileSync(join(r, "translation/curated-pages.txt"), "utf8");
    const out = decurate(r, ["Nope.md"]);
    assert.deepEqual([out.removedLines, out.files, out.entries], [0, 0, 0]);
    assert.equal(readFileSync(join(r, "translation/curated-pages.txt"), "utf8"), before);
  } finally { rmSync(r, { recursive: true, force: true }); }
});

test("no pages is an error, not a silent no-op", () => {
  assert.throws(() => decurate(".", []));
});

test("a commented list line is matched the way the curation check reads it; leading spaces and site/ are tolerated", () => {
  const r = fixture();
  try {
    writeFileSync(join(r, "translation/curated-pages.txt"), "A/Keep.md\ntutorials/Gone.md   # old index\n");
    writeFileSync(join(r, "translation/english-only-pages.txt"), "# English only\nB/Eng.md\n");
    const out = decurate(r, ["  site/tutorials/Gone.md", "B/Eng.md"]);
    assert.equal(readFileSync(join(r, "translation/curated-pages.txt"), "utf8"), "A/Keep.md\n");
    assert.equal(readFileSync(join(r, "translation/english-only-pages.txt"), "utf8"), "# English only\n");
    assert.equal(out.removedLines, 2);
  } finally { rmSync(r, { recursive: true, force: true }); }
});
