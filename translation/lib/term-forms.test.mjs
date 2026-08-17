import { strict as assert } from "node:assert";
import { test } from "node:test";

import { buildEquivalence, formsFor, TermFormsError } from "./term-forms.mjs";

const TERMS = [
  "ZK-SNARK", "ZK-SNARKs",
  "Unified Address", "Unified Addresses",
  "Argos", "Zcash", "CSS",
];

test("no equivalentForms key leaves every term alone", () => {
  const eq = buildEquivalence(TERMS, undefined);
  assert.equal(eq.size, 0);
  assert.deepEqual(formsFor("ZK-SNARKs", eq), ["ZK-SNARKs"]);
});

test("a declared pair satisfies in both directions", () => {
  const eq = buildEquivalence(TERMS, [["ZK-SNARK", "ZK-SNARKs"]]);
  assert.deepEqual(formsFor("ZK-SNARKs", eq).sort(), ["ZK-SNARK", "ZK-SNARKs"]);
  assert.deepEqual(formsFor("ZK-SNARK", eq).sort(), ["ZK-SNARK", "ZK-SNARKs"]);
});

test("the term itself is always tried first", () => {
  const eq = buildEquivalence(TERMS, [["ZK-SNARK", "ZK-SNARKs"]]);
  assert.equal(formsFor("ZK-SNARKs", eq)[0], "ZK-SNARKs");
});

test("an -es plural pairs correctly when declared", () => {
  // The case a naive strip-one-character derivation gets wrong:
  // "Unified Addresses" -> "Unified Addresse", which is nothing.
  const eq = buildEquivalence(TERMS, [["Unified Address", "Unified Addresses"]]);
  assert.ok(formsFor("Unified Addresses", eq).includes("Unified Address"));
});

test("terms that merely look related are NOT equivalent", () => {
  // Argos/Argo and CSS/CS are the reason pairing is declared, not derived.
  const eq = buildEquivalence(TERMS, [["ZK-SNARK", "ZK-SNARKs"]]);
  assert.deepEqual(formsFor("Argos", eq), ["Argos"]);
  assert.deepEqual(formsFor("CSS", eq), ["CSS"]);
  assert.deepEqual(formsFor("Zcash", eq), ["Zcash"]);
});

test("a group naming an unprotected term is rejected", () => {
  assert.throws(
    () => buildEquivalence(TERMS, [["ZK-SNARK", "ZK-SNARKz"]]),
    (e) => e instanceof TermFormsError && /not in preserveVerbatim/.test(e.message),
  );
});

test("a term cannot belong to two groups", () => {
  assert.throws(
    () => buildEquivalence(TERMS, [["ZK-SNARK", "ZK-SNARKs"], ["ZK-SNARK", "Zcash"]]),
    (e) => e instanceof TermFormsError && /already in group 0/.test(e.message),
  );
});

test("a group needs at least two members", () => {
  assert.throws(
    () => buildEquivalence(TERMS, [["ZK-SNARK"]]),
    (e) => e instanceof TermFormsError && /at least two/.test(e.message),
  );
});

test("a duplicate inside a group is rejected", () => {
  assert.throws(
    () => buildEquivalence(TERMS, [["ZK-SNARK", "ZK-SNARK"]]),
    (e) => e instanceof TermFormsError && /duplicate/.test(e.message),
  );
});

test("a blank or padded entry is rejected", () => {
  // The dangerous shape: a term of " " matches nearly every page, so pairing
  // it with a real term would silently satisfy that term everywhere.
  for (const junk of ["", " ", "\t", " ZK-SNARK"]) {
    assert.throws(
      () => buildEquivalence([...TERMS, junk], [["ZK-SNARK", junk]]),
      (e) => e instanceof TermFormsError && /non-empty strings/.test(e.message),
      `expected "${junk}" to be rejected`,
    );
  }
});

test("a non-string entry is rejected", () => {
  for (const junk of [null, 42, {}, []]) {
    assert.throws(
      () => buildEquivalence(TERMS, [["ZK-SNARK", junk]]),
      (e) => e instanceof TermFormsError,
    );
  }
});

test("equivalentForms must be an array", () => {
  assert.throws(
    () => buildEquivalence(TERMS, { "ZK-SNARKs": ["ZK-SNARK"] }),
    (e) => e instanceof TermFormsError && /must be an array/.test(e.message),
  );
});

test("groups of three or more are supported", () => {
  const terms = [...TERMS, "zk-SNARK"];
  const eq = buildEquivalence(terms, [["ZK-SNARK", "ZK-SNARKs", "zk-SNARK"]]);
  assert.equal(formsFor("zk-SNARK", eq).length, 3);
  assert.ok(formsFor("ZK-SNARK", eq).includes("zk-SNARK"));
});
