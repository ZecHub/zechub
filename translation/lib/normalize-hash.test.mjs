// Unit tests for the normalized-hash module.
// Run: node --test translation/lib/normalize-hash.test.mjs

import { test } from "node:test";
import assert from "node:assert/strict";
import {
  normalizeMarkdown,
  hashPage,
  pagesEquivalent,
} from "./normalize-hash.mjs";

test("hashPage returns a sha256-prefixed hex digest", () => {
  const h = hashPage("# Title\n\nbody\n");
  assert.match(h, /^sha256:[0-9a-f]{64}$/);
});

test("line-ending differences (CRLF/CR/LF) do not change the hash", () => {
  const lf = "# Title\n\nSome prose here.\n";
  const crlf = "# Title\r\n\r\nSome prose here.\r\n";
  const cr = "# Title\r\rSome prose here.\r";
  assert.equal(hashPage(lf), hashPage(crlf));
  assert.equal(hashPage(lf), hashPage(cr));
});

test("trailing-newline count does not change the hash", () => {
  assert.equal(hashPage("body\n"), hashPage("body\n\n\n\n"));
  assert.equal(hashPage("body"), hashPage("body\n"));
});

test("incidental trailing whitespace (single space / tabs) is ignored", () => {
  const clean = "# Title\n\nA line.\nAnother line.\n";
  const trailing = "# Title \n\nA line.\t\nAnother line. \n"; // 1 space / tab only
  assert.equal(hashPage(clean), hashPage(trailing));
});

test("a Markdown hard line break (2+ trailing spaces) IS significant", () => {
  const noBreak = "A line.\nnext line.\n";
  const hardBreak = "A line.  \nnext line.\n"; // two trailing spaces = <br>
  assert.notEqual(hashPage(noBreak), hashPage(hardBreak));
  // …and a hard break is canonicalized (2 vs 3 trailing spaces are the same).
  assert.equal(hashPage(hardBreak), hashPage("A line.   \nnext line.\n"));
});

test("a leading UTF-8 BOM does not change the hash", () => {
  const BOM = "\uFEFF";
  const plain = "---\ntitle: Guide\ndate: 2026-01-01\n---\n\nProse.\n";
  assert.equal(hashPage(plain), hashPage(BOM + plain));
  // …and the BOM must not disable frontmatter stripping (date bump stays inert).
  assert.equal(
    hashPage(BOM + plain),
    hashPage(BOM + "---\ntitle: Guide\ndate: 2026-09-09\n---\n\nProse.\n"),
  );
});

test("canonically-equivalent Unicode (NFC/NFD) hashes identically", () => {
  const base = "# Cafe\u0301 re\u0301sume\u0301\n\nProse.\n"; // decomposed accents
  assert.equal(hashPage(base.normalize("NFC")), hashPage(base.normalize("NFD")));
  // sanity: the two forms really are byte-different before normalization
  assert.notEqual(base.normalize("NFC"), base.normalize("NFD"));
});

test("a frontmatter date bump does not change the hash", () => {
  const before = "---\ntitle: Guide\ndate: 2026-01-01\n---\n\nProse.\n";
  const after = "---\ntitle: Guide\ndate: 2026-07-09\n---\n\nProse.\n";
  assert.equal(hashPage(before), hashPage(after));
});

test("multiple volatile frontmatter keys are stripped, case-insensitively", () => {
  const a =
    "---\ntitle: Guide\nDate: 2026-01-01\nlastmod: 2026-01-01\nweight: 5\n---\n\nProse.\n";
  const b =
    "---\ntitle: Guide\nDate: 2026-09-09\nlastmod: 2026-09-09\nweight: 5\n---\n\nProse.\n";
  assert.equal(hashPage(a), hashPage(b));
});

test("a NESTED (indented) date change DOES change the hash", () => {
  // A date under an events list item is real content, not top-level metadata.
  const a = "---\ntitle: Events\nevents:\n  - name: Workshop\n    date: 2026-08-01\n---\n\nBody.\n";
  const b = "---\ntitle: Events\nevents:\n  - name: Workshop\n    date: 2026-09-01\n---\n\nBody.\n";
  assert.notEqual(hashPage(a), hashPage(b));
});

test("a non-volatile frontmatter change DOES change the hash", () => {
  const a = "---\ntitle: Guide\nweight: 5\n---\n\nProse.\n";
  const b = "---\ntitle: Guide\nweight: 6\n---\n\nProse.\n";
  assert.notEqual(hashPage(a), hashPage(b));
});

test("a real prose change DOES change the hash", () => {
  const a = "# Title\n\nThe fee is 0.0001 ZEC.\n";
  const b = "# Title\n\nThe fee is 0.0005 ZEC.\n";
  assert.notEqual(hashPage(a), hashPage(b));
});

test("removing a security warning DOES change the hash", () => {
  const a =
    "# Wallet\n\nWARNING: never share your seed phrase.\n\nInstall steps...\n";
  const b = "# Wallet\n\nInstall steps...\n";
  assert.notEqual(hashPage(a), hashPage(b));
});

test("documents without frontmatter are handled", () => {
  const a = "Just a bare address line\n";
  assert.match(hashPage(a), /^sha256:/);
  assert.equal(hashPage(a), hashPage("Just a bare address line"));
});

test("an unterminated frontmatter fence is treated as body (not stripped)", () => {
  // No closing '---': the leading date-looking line must NOT be dropped,
  // because we cannot prove it is frontmatter.
  const a = "---\ndate: 2026-01-01\nstill body\n";
  const b = "---\ndate: 2026-07-09\nstill body\n";
  assert.notEqual(hashPage(a), hashPage(b));
});

test("body content is never treated as frontmatter", () => {
  // A `date:` line in the body (no leading fence) is prose and must count.
  const a = "# Title\n\ndate: 2026-01-01 was the launch.\n";
  const b = "# Title\n\ndate: 2026-07-09 was the launch.\n";
  assert.notEqual(hashPage(a), hashPage(b));
});

test("pagesEquivalent mirrors hash equality", () => {
  assert.ok(pagesEquivalent("x\n", "x\n\n\n"));
  assert.ok(!pagesEquivalent("x\n", "y\n"));
});

test("normalizeMarkdown is idempotent", () => {
  const raw = "---\ndate: 2026-01-01\ntitle: T  \n---\n\nBody line   \n\n\n";
  const once = normalizeMarkdown(raw);
  assert.equal(normalizeMarkdown(once), once);
});
