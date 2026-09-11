import { test } from "node:test";
import assert from "node:assert/strict";
import { parseVerifiedNoops, noopAllowed } from "./verified-noops.mjs";

const EN = "sha256:" + "a".repeat(64);
const EN2 = "sha256:" + "b".repeat(64);
const TR = "sha256:" + "c".repeat(64);
const TR2 = "sha256:" + "d".repeat(64);
const KEY = "it/guides/Akash_Network_Zcashd.md";
const entry = (x = {}) => ({ src: EN, engine: "llm", mode: "diff", tool: "t", edited: false, ...x });
const listed = (x = {}) => ({ src: EN, translation: TR, ...x });
const allow = (x = {}) => noopAllowed({
  entry: entry(), listed: listed(), currentSourceHash: EN, currentTranslationHash: TR, ...x,
});

// ---- parsing --------------------------------------------------------------

test("a line names the page, the English, and the translation", () => {
  const { entries, errors } = parseVerifiedNoops(`${KEY}  ${EN}  ${TR}\n`);
  assert.deepEqual(errors, []);
  assert.deepEqual(entries.get(KEY), { src: EN, translation: TR });
});

test("comments, blank lines and trailing comments are ignored", () => {
  const { entries, errors } = parseVerifiedNoops(`# header\n\n${KEY} ${EN} ${TR}  # why\n\n`);
  assert.deepEqual(errors, []);
  assert.equal(entries.size, 1);
});

test("an absent or empty file means no exceptions", () => {
  for (const t of [undefined, null, "", "\n\n# only comments\n"]) {
    assert.equal(parseVerifiedNoops(t).entries.size, 0);
    assert.deepEqual(parseVerifiedNoops(t).errors, []);
  }
});

test("a two-token line is refused — the translation half is not optional", () => {
  // It was two tokens in an earlier design; a stale line must not silently parse.
  const { entries, errors } = parseVerifiedNoops(`${KEY} ${EN}\n`);
  assert.equal(entries.size, 0);
  assert.match(errors[0], /expected "<locale>\/<page> <english sha256> <translation sha256>"/);
});

test("each hash is validated, and the message says which one is wrong", () => {
  assert.match(parseVerifiedNoops(`${KEY} nope ${TR}\n`).errors[0], /english hash/);
  assert.match(parseVerifiedNoops(`${KEY} ${EN} nope\n`).errors[0], /translation hash/);
});

test("a duplicate page is refused rather than last-one-wins", () => {
  const { entries, errors } = parseVerifiedNoops(`${KEY} ${EN} ${TR}\n${KEY} ${EN2} ${TR2}\n`);
  assert.deepEqual(entries.get(KEY), { src: EN, translation: TR });
  assert.match(errors[0], /duplicate entry/);
});

test("the reported line number counts comments", () => {
  assert.match(parseVerifiedNoops(`# one\n# two\n${KEY} bad ${TR}\n`).errors[0], /^line 3:/);
});

// ---- the decision ---------------------------------------------------------

test("everything matching allows the exception", () => {
  assert.equal(allow(), true);
});

test("an unlisted page is refused — the whole point", () => {
  assert.equal(noopAllowed({
    entry: entry(), listed: undefined, currentSourceHash: EN, currentTranslationHash: TR,
  }), false);
});

test("a listing for a different English does not apply", () => {
  assert.equal(allow({ listed: listed({ src: EN2 }) }), false);
});

test("an English hash that is not the file on disk is refused", () => {
  // Otherwise the list could bless a source that never existed in the tree.
  assert.equal(allow({ currentSourceHash: EN2 }), false);
});

test("a TRANSLATION that has moved on since it was looked at is refused", () => {
  // This is what makes a stale line harmless and closes the replay: let the
  // source wander away and return, and the translation will have changed in the
  // meantime, so the line no longer describes anything that exists.
  assert.equal(allow({ currentTranslationHash: TR2 }), false);
  assert.equal(allow({ listed: listed({ translation: TR2 }) }), false);
});

test("a still-current line applies even though it is already on main", () => {
  // Approve-first: a person may grant the exception BEFORE the automation gets
  // to the page, which is the natural order when the pipeline opens its own PRs.
  assert.equal(allow(), true);
});

test("edited:true can never take the exception, now or at base", () => {
  assert.equal(allow({ entry: entry({ edited: true }) }), false);
  assert.equal(noopAllowed({
    entry: entry(), baseEntry: { edited: true }, listed: listed(),
    currentSourceHash: EN, currentTranslationHash: TR,
  }), false);
});

test("edited must be exactly false, not merely not-true", () => {
  for (const bad of [undefined, null, "false", 0]) {
    assert.equal(allow({ entry: entry({ edited: bad }) }), false, `edited=${JSON.stringify(bad)}`);
  }
});

test("a missing entry, missing src, or absent translation never qualifies", () => {
  assert.equal(allow({ entry: null }), false);
  assert.equal(allow({ entry: entry({ src: undefined }) }), false);
  assert.equal(allow({ currentTranslationHash: null }), false);
});

test("a page with no base entry is not blocked by the base-edited rule", () => {
  assert.equal(noopAllowed({
    entry: entry(), baseEntry: undefined, listed: listed(),
    currentSourceHash: EN, currentTranslationHash: TR,
  }), true);
});

test("a key that is not <locale>/<page> is an error, not a silent entry", () => {
  // Without this, a garbage key parses fine and simply never matches anything —
  // an authorisation that looks present and grants nothing, which is the worst
  // of both. Deleting the check passed every other test.
  for (const bad of ["justapage.md", "/leading/slash.md", "it/trailing/"]) {
    const { entries, errors } = parseVerifiedNoops(`${bad}  ${EN}  ${TR}\n`);
    assert.equal(entries.size, 0, `"${bad}" must not become an entry`);
    assert.equal(errors.length, 1, `"${bad}" must be reported`);
    assert.match(errors[0], /is not a <locale>\/<page> key/);
  }
});
