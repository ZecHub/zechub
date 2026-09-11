import { test } from "node:test";
import assert from "node:assert/strict";
import { parseVerifiedNoops, noopAllowed } from "./verified-noops.mjs";

const A = "sha256:" + "a".repeat(64);
const B = "sha256:" + "b".repeat(64);
const KEY = "it/guides/Akash_Network_Zcashd.md";
const entry = (x = {}) => ({ src: A, engine: "llm", mode: "diff", tool: "t", edited: false, ...x });

// ---- parsing --------------------------------------------------------------

test("a plain entry parses", () => {
  const { entries, errors } = parseVerifiedNoops(`${KEY}  ${A}\n`);
  assert.deepEqual(errors, []);
  assert.equal(entries.get(KEY), A);
});

test("comments, blank lines and trailing comments are ignored", () => {
  const { entries, errors } = parseVerifiedNoops(
    `# header\n\n${KEY} ${A}   # why this one\n\n`);
  assert.deepEqual(errors, []);
  assert.equal(entries.size, 1);
});

test("an absent or empty file means no exceptions", () => {
  for (const t of [undefined, null, "", "\n\n# only comments\n"]) {
    const { entries, errors } = parseVerifiedNoops(t);
    assert.equal(entries.size, 0);
    assert.deepEqual(errors, []);
  }
});

test("a malformed hash is reported, not accepted", () => {
  const { entries, errors } = parseVerifiedNoops(`${KEY} deadbeef\n`);
  assert.equal(entries.size, 0);
  assert.match(errors[0], /not a sha256/);
});

test("a line missing its hash is reported", () => {
  const { errors } = parseVerifiedNoops(`${KEY}\n`);
  assert.match(errors[0], /expected "<locale>\/<page> <sha256/);
});

test("a duplicate page is refused rather than last-one-wins", () => {
  // Otherwise the file's meaning would depend on its line order.
  const { entries, errors } = parseVerifiedNoops(`${KEY} ${A}\n${KEY} ${B}\n`);
  assert.equal(entries.get(KEY), A);
  assert.match(errors[0], /duplicate entry/);
});

test("the reported line number is the real one, counting comments", () => {
  const { errors } = parseVerifiedNoops(`# one\n# two\n${KEY} nope\n`);
  assert.match(errors[0], /^line 3:/);
});

// ---- the decision ---------------------------------------------------------

test("all four conditions together allow the exception", () => {
  assert.equal(noopAllowed({ entry: entry(), listed: A, currentSourceHash: A }), true);
});

test("an unlisted page is refused — this is the whole point", () => {
  // A pipeline defect cannot add itself to a human-edited file.
  assert.equal(noopAllowed({ entry: entry(), listed: undefined, currentSourceHash: A }), false);
});

test("a listing for a DIFFERENT source does not apply", () => {
  // How a line expires: the English moved on, so the human's statement about the
  // old English no longer says anything about this one.
  assert.equal(noopAllowed({ entry: entry({ src: B }), listed: A, currentSourceHash: B }), false);
});

test("a hash that is not the English on disk is refused", () => {
  // Without this the list could bless a source that never existed in the tree.
  assert.equal(noopAllowed({ entry: entry(), listed: A, currentSourceHash: B }), false);
});

test("an edited:true page can never take the exception", () => {
  // `edited:true` holds a page out of automated sync, so no pass re-ran the
  // engine on it and there is nothing for anyone to have verified.
  assert.equal(noopAllowed({ entry: entry({ edited: true }), listed: A, currentSourceHash: A }), false);
});

test("edited must be exactly false, not merely not-true", () => {
  for (const bad of [undefined, null, "false", 0]) {
    assert.equal(noopAllowed({ entry: entry({ edited: bad }), listed: A, currentSourceHash: A }), false,
      `edited=${JSON.stringify(bad)} must not qualify`);
  }
});

test("a missing entry or missing src never qualifies", () => {
  assert.equal(noopAllowed({ entry: null, listed: A, currentSourceHash: A }), false);
  assert.equal(noopAllowed({ entry: entry({ src: undefined }), listed: A, currentSourceHash: A }), false);
});

// ---- the two holes round 1 found ------------------------------------------

test("an authorisation is spent by the change that introduces it", () => {
  // Otherwise a leftover line is a standing permit: let the source move away and
  // later return to the listed value — a revert is enough, no hash collision
  // needed — and the old line would bless a translation made for something else.
  assert.equal(noopAllowed({ entry: entry(), listed: A, listedInBase: A, currentSourceHash: A }), false);
  assert.equal(noopAllowed({ entry: entry(), listed: A, listedInBase: undefined, currentSourceHash: A }), true);
  // A line whose hash CHANGED in this PR is a fresh authorisation, not a replay.
  assert.equal(noopAllowed({ entry: entry(), listed: A, listedInBase: B, currentSourceHash: A }), true);
});

test("a page held with edited:true at base cannot be settled by the same change", () => {
  // Flipping the flag to false, bumping the source and taking the exception all
  // in one change would settle a page that was deliberately being held out of
  // automated sync, with nothing having re-run on it.
  assert.equal(noopAllowed({
    entry: entry({ edited: false }), baseEntry: { edited: true },
    listed: A, currentSourceHash: A,
  }), false);
  assert.equal(noopAllowed({
    entry: entry({ edited: false }), baseEntry: { edited: false },
    listed: A, currentSourceHash: A,
  }), true);
});

test("a page with no base entry is not blocked by the base-edited rule", () => {
  assert.equal(noopAllowed({ entry: entry(), baseEntry: undefined, listed: A, currentSourceHash: A }), true);
});
