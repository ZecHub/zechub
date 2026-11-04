// Regression suite for check-brand-drift.mjs.
//
// The script reads a whole content tree from the working directory, so each
// case builds a tiny tree in a temp dir and runs the real script there. Every
// rule is proved both ways: drift that must be reported fails the run, and a
// rendering that is not drift passes.
//
// Run: node --test scripts/check-brand-drift.test.mjs
import { strict as assert } from "node:assert";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const SCRIPT = join(dirname(fileURLToPath(import.meta.url)), "check-brand-drift.mjs");
const PAGE = "Use_Cases/Donate.md";

function run({ protectedTerms, en, el }) {
  const dir = mkdtempSync(join(tmpdir(), "brand-drift-"));
  try {
    const put = (p, s) => {
      mkdirSync(dirname(join(dir, p)), { recursive: true });
      writeFileSync(join(dir, p), s);
    };
    put("translation/protected-terms.json", JSON.stringify({ preserveVerbatim: protectedTerms }));
    put("translation/menu-titles/en.json", JSON.stringify({ [PAGE]: "Donate" }));
    put("translation/sync-state.json", JSON.stringify({ el: {} }));
    put("translation/brand-drift-baseline.txt", "# baseline\n");
    put(`site/${PAGE}`, en);
    put(`translations/el/site/${PAGE}`, el);
    const r = spawnSync(process.execPath, [SCRIPT], { cwd: dir, encoding: "utf8" });
    return { code: r.status, out: r.stdout + r.stderr };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const EN = "| [The Giving Block](https://thegivingblock.com/) | Donation service |\n";

test("a translated English article before a protected name is not drift", () => {
  const r = run({ protectedTerms: ["Giving Block"], en: EN, el: "| [Το Giving Block](https://thegivingblock.com/) | Υπηρεσία |\n" });
  assert.equal(r.code, 0, r.out);
});

test("the same name is drift when its core is not protected", () => {
  const r = run({ protectedTerms: [], en: EN, el: "| [Το Giving Block](https://thegivingblock.com/) | Υπηρεσία |\n" });
  assert.equal(r.code, 1, r.out);
  assert.match(r.out, /NEW {2}"The Giving Block"/);
});

test("the full name protected, as before, is not drift", () => {
  const r = run({ protectedTerms: ["The Giving Block"], en: EN, el: "| [The Giving Block](https://thegivingblock.com/) | Υπηρεσία |\n" });
  assert.equal(r.code, 0, r.out);
});

test("only a leading article is dropped: a protected tail of another name does not cover it", () => {
  const en = "| [Giving Block](https://givingblock.org/) | Donation service |\n";
  const r = run({ protectedTerms: ["Block"], en, el: "| [Μπλοκ δωρεών](https://givingblock.org/) | Υπηρεσία |\n" });
  assert.equal(r.code, 1, r.out);
  assert.match(r.out, /NEW {2}"Giving Block"/);
});

test("a protected core that the translation damaged is still drift", () => {
  const r = run({ protectedTerms: ["Giving Block"], en: EN, el: "| [Το Μπλοκ Δωρεών](https://thegivingblock.com/) | Υπηρεσία |\n" });
  assert.equal(r.code, 1, r.out);
  assert.match(r.out, /NEW {2}"The Giving Block"/);
});

test("the core must match a protected term exactly, case included", () => {
  // "ACME" is not protected ("Acme" is; casings are separate entries), so the
  // name is still reported even though the translation kept it.
  const en = "| [The ACME](https://theacme.com/) | Donation service |\n";
  const r = run({ protectedTerms: ["Acme"], en, el: "| [Το ACME](https://theacme.com/) | Υπηρεσία |\n" });
  assert.equal(r.code, 1, r.out);
  assert.match(r.out, /NEW {2}"The ACME"/);
});
