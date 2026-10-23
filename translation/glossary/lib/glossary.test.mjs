import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import {
  assertValid,
  changedApproved,
  checkVersionBump,
  ENTRY_FIELDS,
  entryForms,
  findRejected,
  GlossaryError,
  hasApprovedForm,
  LOCALE_FIELDS,
  registerFor,
  rejectionApplies,
  TERM_EN_FIELDS,
  validateLocale,
  validateTermsEn,
} from "./glossary.mjs";

// ---- fixtures ---------------------------------------------------------------

const TERMS_EN = {
  version: 1,
  terms: [
    { id: "shielded", english: "shielded", pos: "adjective", definition: "Hidden by zero-knowledge encryption.", match: ["shielded", "Shielded", "unshielded"], category: "protocol", default_policy: "translate", applies_to: "both" },
    { id: "proof", english: "proof", pos: "noun", definition: "Cryptographic proof.", match: ["proof", "proofs", "Proof"], category: "protocol", default_policy: "keep-english", applies_to: "both" },
    { id: "mining", english: "mining", pos: "noun, verb", definition: "Adding blocks for a reward.", match: ["mining", "Mining", "mined"], category: "concept", default_policy: "translate", applies_to: "both" },
    { id: "wallet", english: "wallet", pos: "noun", definition: "Holds keys.", match: ["wallet", "wallets", "Wallet", "Wallets"], category: "concept", default_policy: "translate", applies_to: "both" },
    { id: "tools", english: "tools", pos: "noun", definition: "Helpful software.", match: ["tools", "Tools"], category: "concept", default_policy: "translate", applies_to: "both" },
    { id: "developer", english: "developer", pos: "noun", definition: "Writes software.", match: ["developer", "developers", "Developer", "Developers"], category: "concept", default_policy: "translate", applies_to: "both" },
    { id: "brand", english: "brand", pos: "noun", definition: "Logos and identity.", match: ["brand", "Brand"], category: "concept", default_policy: "translate", applies_to: "both" },
  ],
};
const PV = ["Zcash", "Viewing Key", "Shielded Labs"];
const SITE_DIRS = ["guides", "guides/advanced", "tutorials", "Zcash_Tech"];
const REVIEW = { status: "approved", reviewed_by: ["@reviewer"], reviewed_at: "2026-10-09" };

function goodGlossary() {
  return {
    locale: "id",
    version: 2,
    meta: { language_name: "Indonesian", native_name: "Bahasa Indonesia", engine: "llm", script: "Latn", dir: "ltr", language_lead: [], last_review: "2026-10-09" },
    style: {
      register: {
        default: "anda",
        rules: [{ register: "kamu", prefixes: ["guides/", "tutorials/"] }],
        ui: "anda",
        text: { kamu: "Use kamu.", anda: "Use Anda." },
        forbidden_by_register: { kamu: ["Anda"], anda: ["kamu"] },
      },
      english_in_brackets: "never",
      loanwords: "keep-english",
      abbreviations_with_full_stop: ["dll", "dsb"],
    },
    terms: {
      shielded: {
        target: "terlindungi",
        forms: ["terlindungi"],
        rejected: [
          { text: "terproteksi" },
          { text: "terlindung", word: true },
          { text: "terenkripsi", only_when_english_has: ["shielded"], unless_english_has: ["encrypt"] },
        ],
        applies_to: "both",
        ...REVIEW,
      },
      proof: { target: "proof", keep_english: true, forms: ["proof", "proofs", "Proof"], applies_to: "both", ...REVIEW },
      mining: { target: "penambangan", forms: ["penambangan", "menambang"], applies_to: "both", ...REVIEW },
      developer: { target: "developer", keep_english: true, forms: ["developer", "Developer"], rejected: [{ text: "pengembang", word: true, ci: true }], applies_to: "both", ...REVIEW },
      brand: { target: "brand", keep_english: true, forms: ["brand", "Brand"], rejected: [{ text: "merek", word: true, ci: true, unless_english_has: ["trademark"] }], applies_to: "both", ...REVIEW },
    },
    phrases: {
      "Mobile Top Ups": { target: "Top Up Seluler", rejected: [{ text: "Isi Ulang Pulsa", ci: true }], applies_to: "ui", ...REVIEW },
    },
    gates: { passthrough_allow: ["proof"] },
    changelog: [{ version: 2, date: "2026-10-09", terms: ["shielded"], summary: "x" }],
  };
}

const ctx = { termsEn: TERMS_EN, preserveVerbatim: PV, siteDirs: SITE_DIRS, fileLocale: "id" };
const rulesOf = (g, c = ctx) => validateLocale(g, c).map((e) => e.rule);
function expectRule(g, rule, c = ctx) {
  const errors = validateLocale(g, c);
  assert.ok(errors.some((e) => e.rule === rule), `expected rule ${rule}, got: ${JSON.stringify(errors)}`);
  return errors;
}

// ---- the good fixture -----------------------------------------------------

test("a well-formed glossary validates with no errors", () => {
  assert.deepEqual(validateLocale(goodGlossary(), ctx), []);
  assert.doesNotThrow(() => assertValid(goodGlossary(), ctx));
});

test("assertValid throws one GlossaryError carrying every problem", () => {
  const g = goodGlossary();
  g.terms.typo = { target: "x", applies_to: "both", ...REVIEW };
  g.terms.proof.reviewed_by = [];
  assert.throws(() => assertValid(g, ctx), (e) => e instanceof GlossaryError && e.errors.length >= 2 && /rule 1/.test(e.message) && /rule 5/.test(e.message));
});

test("validateLocale refuses to guess when siteDirs is not passed", () => {
  assert.throws(() => validateLocale(goodGlossary(), { termsEn: TERMS_EN, preserveVerbatim: PV }), TypeError);
});

// ---- rule 1 -----------------------------------------------------------------

test("rule 1: an unknown term id fails", () => {
  const g = goodGlossary();
  g.terms.sheilded = { target: "terlindungi", applies_to: "both", ...REVIEW };
  expectRule(g, 1);
});

// ---- rule 2 -----------------------------------------------------------------

test("rule 2: target must be one of forms", () => {
  const g = goodGlossary();
  g.terms.mining.forms = ["menambang"];
  expectRule(g, 2);
});

test("rule 2: forms may be omitted, then target is the only form", () => {
  const g = goodGlossary();
  delete g.terms.mining.forms;
  assert.deepEqual(rulesOf(g), []);
  assert.deepEqual(entryForms(g.terms.mining), ["penambangan"]);
});

test("rule 2: a rejected text contained in an accepted form fails", () => {
  const g = goodGlossary();
  // Substring rejection "terlindung" would flag every correct "terlindungi".
  g.terms.shielded.rejected.push({ text: "terlindung" });
  expectRule(g, 2);
});

test("rule 2: a rejected text equal to an accepted form fails, also case-insensitively", () => {
  const g = goodGlossary();
  g.terms.proof.rejected = [{ text: "PROOF", ci: true }];
  expectRule(g, 2);
});

test("rule 2: a whole-word rejection inside a longer accepted form is fine", () => {
  // The good fixture already carries {terlindung, word:true} next to the
  // form "terlindungi"; this pins that it stays valid.
  assert.ok(!rulesOf(goodGlossary()).includes(2));
});

// ---- rule 3 -----------------------------------------------------------------

function toolsClash() {
  const g = goodGlossary();
  g.terms.tools = { target: "alat", forms: ["alat", "Alat"], applies_to: "both", ...REVIEW };
  g.phrases["Privacy Tools"] = { target: "Tools Privasi", applies_to: "both", ...REVIEW };
  return g;
}

test("rule 3: Tools -> Alat next to Privacy Tools -> Tools Privasi fails without context", () => {
  const errors = expectRule(toolsClash(), 3);
  assert.ok(errors.some((e) => /Privacy Tools/.test(e.where)));
});

test("rule 3: context on only one side is not enough", () => {
  const g = toolsClash();
  g.terms.tools.context = "standalone word";
  expectRule(g, 3);
});

test("rule 3: context on both sides makes the split deliberate and valid", () => {
  const g = toolsClash();
  g.terms.tools.context = "standalone word and the menu entry Tools";
  g.phrases["Privacy Tools"].context = "section name";
  assert.ok(!rulesOf(g).includes(3));
});

test("rule 3: two terms accepting the same form fail", () => {
  const g = goodGlossary();
  g.terms.wallet = { target: "penambangan", applies_to: "both", ...REVIEW };
  expectRule(g, 3);
});

test("rule 3: a phrase that is the same word as a term is not a clash", () => {
  const g = goodGlossary();
  g.terms.wallet = { target: "dompet", forms: ["dompet", "Dompet"], applies_to: "both", ...REVIEW };
  g.phrases.Wallets = { target: "Dompet", applies_to: "ui", ...REVIEW };
  assert.ok(!rulesOf(g).includes(3));
});

test("rule 3: two UI phrases may share a label", () => {
  const g = goodGlossary();
  g.phrases.Donate = { target: "Donasi", applies_to: "ui", ...REVIEW };
  g.phrases.Donations = { target: "Donasi", applies_to: "ui", ...REVIEW };
  assert.ok(!rulesOf(g).includes(3));
});

test("rule 3: a phrase keeping a translated word in English is caught (name-like labels)", () => {
  const g = goodGlossary();
  g.terms.wallet = { target: "dompet", applies_to: "both", ...REVIEW };
  g.phrases["Brave Wallet"] = { target: "Brave Wallet", keep_english: true, applies_to: "ui", ...REVIEW };
  expectRule(g, 3);
});

test("rule 3: draft and disputed entries never clash", () => {
  const g = toolsClash();
  g.phrases["Privacy Tools"].status = "draft";
  assert.ok(!rulesOf(g).includes(3));
});

test("rule 3: pages-only and ui-only entries do not clash", () => {
  const g = toolsClash();
  g.terms.tools.applies_to = "pages";
  g.phrases["Privacy Tools"].applies_to = "ui";
  assert.ok(!rulesOf(g).includes(3));
});

// ---- rule 4 -----------------------------------------------------------------

test("rule 4: keep_english with a non-English target fails", () => {
  const g = goodGlossary();
  g.terms.proof.target = "bukti";
  g.terms.proof.forms = ["bukti"];
  expectRule(g, 4);
});

test("rule 4: keep_english matches the English case-insensitively", () => {
  const g = goodGlossary();
  g.terms.proof.target = "Proof";
  assert.ok(!rulesOf(g).includes(4));
});

test("rule 4: a keep_english phrase must equal its English key", () => {
  const g = goodGlossary();
  g.phrases.Newsletter = { target: "Buletin", keep_english: true, applies_to: "ui", ...REVIEW };
  expectRule(g, 4);
  g.phrases.Newsletter.target = "Newsletter";
  assert.ok(!rulesOf(g).includes(4));
});

// ---- rule 5 -----------------------------------------------------------------

test("rule 5: approved needs reviewed_by", () => {
  const g = goodGlossary();
  g.terms.proof.reviewed_by = [];
  expectRule(g, 5);
});

test("rule 5: approved needs reviewed_at", () => {
  const g = goodGlossary();
  g.terms.proof.reviewed_at = null;
  expectRule(g, 5);
});

test("rule 5: a draft may be unreviewed", () => {
  const g = goodGlossary();
  g.terms.proof = { target: "proof", keep_english: true, applies_to: "both", status: "draft", reviewed_by: [], reviewed_at: null };
  assert.deepEqual(rulesOf(g), []);
});

// ---- rule 6 -----------------------------------------------------------------

test("rule 6: a phrase that is a protected name fails", () => {
  const g = goodGlossary();
  g.phrases["Shielded Labs"] = { target: "Shielded Labs", keep_english: true, applies_to: "ui", ...REVIEW };
  expectRule(g, 6);
});

test("rule 6: a terms.en.json match form that is a protected name fails", () => {
  const termsEn = structuredClone(TERMS_EN);
  termsEn.terms.push({ id: "viewing-key", english: "viewing key", pos: "noun", definition: "Sees, cannot spend.", match: ["viewing key", "Viewing Key"], category: "protocol", default_policy: "keep-english", applies_to: "both" });
  assert.ok(validateTermsEn(termsEn, { preserveVerbatim: PV }).some((e) => e.rule === 6));
});

// ---- rule 7 -----------------------------------------------------------------

test("rule 7: no base (new file) passes", () => {
  assert.deepEqual(checkVersionBump(null, goodGlossary()), []);
});

test("rule 7: unchanged approved entries need no bump", () => {
  const base = goodGlossary();
  const head = goodGlossary();
  head.style.notes = "style-only edit";
  assert.deepEqual(checkVersionBump(base, head), []);
});

test("rule 7: key order is not a change", () => {
  const base = goodGlossary();
  const head = goodGlossary();
  head.terms.proof = { applies_to: "both", ...REVIEW, forms: ["proof", "proofs", "Proof"], keep_english: true, target: "proof" };
  assert.deepEqual(changedApproved(base, head), { terms: [], phrases: [] });
});

test("rule 7: an approved change without a bump fails", () => {
  const base = goodGlossary();
  const head = goodGlossary();
  head.terms.shielded.rejected.push({ text: "terlindungkan" });
  assert.ok(checkVersionBump(base, head).some((e) => e.rule === 7 && /version must be 3/.test(e.message)));
});

test("rule 7: a bump by two fails", () => {
  const base = goodGlossary();
  const head = goodGlossary();
  head.terms.proof.target = "Proof";
  head.version = 4;
  head.changelog.push({ version: 4, date: "2026-10-10", terms: ["proof"] });
  assert.ok(checkVersionBump(base, head).some((e) => e.rule === 7));
});

test("rule 7: the changelog must name every changed id", () => {
  const base = goodGlossary();
  const head = goodGlossary();
  head.terms.proof.target = "Proof";
  head.phrases["Mobile Top Ups"].target = "Top Up Ponsel";
  head.version = 3;
  head.changelog.push({ version: 3, date: "2026-10-10", terms: ["proof"] });
  const errors = checkVersionBump(base, head);
  assert.ok(errors.some((e) => /phrases: Mobile Top Ups/.test(e.message)), JSON.stringify(errors));
});

test("rule 7: a correct bump with a complete changelog passes", () => {
  const base = goodGlossary();
  const head = goodGlossary();
  delete head.terms.mining;
  head.terms.proof.target = "Proof";
  head.version = 3;
  head.changelog.push({ version: 3, date: "2026-10-10", terms: ["mining", "proof"], summary: "y" });
  assert.deepEqual(checkVersionBump(base, head), []);
});

test("rule 7: version going down fails", () => {
  const base = goodGlossary();
  const head = goodGlossary();
  head.version = 1;
  assert.ok(checkVersionBump(base, head).some((e) => e.rule === 7));
});

test("rule 7: draft-only edits are free", () => {
  const base = goodGlossary();
  base.terms.wallet = { target: "dompet", applies_to: "both", status: "draft", reviewed_by: [], reviewed_at: null };
  const head = structuredClone(base);
  head.terms.wallet.target = "wallet";
  assert.deepEqual(checkVersionBump(base, head), []);
});

// ---- rule 8 -----------------------------------------------------------------

test("rule 8: a register prefix naming no folder fails", () => {
  const g = goodGlossary();
  g.style.register.rules[0].prefixes.push("Guides_Renamed/");
  expectRule(g, 8);
});

test("rule 8: nested prefixes match nested folders", () => {
  const g = goodGlossary();
  g.style.register.rules[0].prefixes = ["guides/advanced/"];
  assert.deepEqual(rulesOf(g), []);
});

test("rule 8: is case-sensitive like the paths it routes", () => {
  const g = goodGlossary();
  g.style.register.rules[0].prefixes = ["zcash_tech/"];
  expectRule(g, 8);
});

test("rule 8: siteDirs null skips it deliberately", () => {
  const g = goodGlossary();
  g.style.register.rules[0].prefixes = ["nowhere/"];
  assert.deepEqual(rulesOf(g, { ...ctx, siteDirs: null }), []);
});

// ---- structure ------------------------------------------------------------

test("structure: an unknown entry field fails, so a typo cannot disable a rule", () => {
  const g = goodGlossary();
  g.terms.shielded.rejcted = [{ text: "terproteksi" }];
  expectRule(g, "structure");
});

test("structure: an unknown rejection field fails", () => {
  const g = goodGlossary();
  g.terms.shielded.rejected[0].only_when = ["shielded"];
  expectRule(g, "structure");
});

test("structure: bad enums, bad dates and a wrong locale fail", () => {
  for (const mutate of [
    (g) => { g.terms.proof.status = "ok"; },
    (g) => { g.terms.proof.applies_to = "web"; },
    (g) => { g.terms.proof.reviewed_at = "9 Oct 2026"; },
    (g) => { g.style.english_in_brackets = "sometimes"; },
    (g) => { g.style.register.default = "formal"; },
    (g) => { g.locale = "ms"; },
    (g) => { g.version = 0; },
    (g) => { delete g.meta; },
  ]) {
    const g = goodGlossary();
    mutate(g);
    expectRule(g, "structure");
  }
});

test("terms.en.json: duplicates, bad ids and bad enums fail", () => {
  assert.deepEqual(validateTermsEn(TERMS_EN, { preserveVerbatim: PV }), []);
  for (const mutate of [
    (t) => { t.terms.push(structuredClone(t.terms[0])); },
    (t) => { t.terms[0].id = "Shielded"; },
    (t) => { t.terms[0].category = "brand"; },
    (t) => { t.terms[0].default_policy = "maybe"; },
    (t) => { t.terms[0].match = []; },
    (t) => { t.terms[0].extra = 1; },
  ]) {
    const t = structuredClone(TERMS_EN);
    mutate(t);
    assert.ok(validateTermsEn(t, { preserveVerbatim: PV }).length > 0, mutate.toString());
  }
});

// ---- matching -------------------------------------------------------------

test("match: a whole-word rejection does not fire inside an inflected form", () => {
  const e = goodGlossary().terms.shielded;
  assert.deepEqual(findRejected(e, "alamat terlindungi", "a shielded address"), []);
  assert.equal(findRejected(e, "alamat terlindung", "a shielded address").length, 1);
});

test("match: a substring rejection catches suffixed forms", () => {
  const e = goodGlossary().terms.shielded;
  assert.equal(findRejected(e, "alamat terproteksinya", "shielded").length, 1);
});

test("match: terenkripsi is wrong for 'shielded' and right for 'encrypted'", () => {
  const e = goodGlossary().terms.shielded;
  assert.equal(findRejected(e, "transaksi terenkripsi", "a shielded transaction").length, 1);
  assert.deepEqual(findRejected(e, "memo terenkripsi", "an encrypted memo"), []);
  // Both words in the English: the encrypt exception wins.
  assert.deepEqual(findRejected(e, "terenkripsi", "shielded and encrypted"), []);
  // English without "shielded": the rejection is out of scope.
  assert.deepEqual(findRejected(e, "data terenkripsi", "private data"), []);
  // Case of the English does not matter for the scope.
  assert.equal(findRejected(e, "terenkripsi", "Shielded Pools").length, 1);
});

test("match: a scoped rejection never fires without English context", () => {
  const e = goodGlossary().terms.shielded;
  assert.deepEqual(findRejected(e, "terenkripsi", null), []);
  assert.equal(findRejected(e, "terproteksi", null).length, 1);
  assert.equal(rejectionApplies({ text: "x", unless_english_has: ["y"] }, null), false);
});

test("match: pengembang is rejected, pengembangan (development) is not", () => {
  const e = goodGlossary().terms.developer;
  assert.equal(findRejected(e, "Para Pengembang Zcash", "Zcash developers").length, 1);
  assert.deepEqual(findRejected(e, "pengembangan Zcash", "Zcash development"), []);
});

test("match: merek is rejected for brand but not for trademark", () => {
  const e = goodGlossary().terms.brand;
  assert.equal(findRejected(e, "Panduan Merek", "Brand guide").length, 1);
  assert.deepEqual(findRejected(e, "merek dagang Zcash", "the Zcash trademark"), []);
  assert.deepEqual(findRejected(e, "kemerekan", "brand"), []);
});

test("match: case-insensitive rejection of a UI label", () => {
  const e = goodGlossary().phrases["Mobile Top Ups"];
  assert.equal(findRejected(e, "isi ulang pulsa", "Mobile Top Ups").length, 1);
});

test("match: inflected approved forms are accepted (mining as noun and verb)", () => {
  const e = goodGlossary().terms.mining;
  assert.ok(hasApprovedForm(e, "Penambangan Zcash"));
  assert.ok(hasApprovedForm(e, "cara menambang ZEC"));
  assert.ok(!hasApprovedForm(e, "tambang emas"));
  assert.ok(hasApprovedForm({ target: "cüzdan", stem: { stem: "cüzdan", suffixes: "any-letters" } }, "cüzdanınız"));
});

test("match: Unicode word boundaries for non-ASCII text", () => {
  const e = { target: "x", rejected: [{ text: "кошелек", word: true }] };
  assert.equal(findRejected(e, "мой кошелек.", "wallet").length, 1);
  assert.deepEqual(findRejected(e, "кошельком", "wallet"), []);
});

// ---- register --------------------------------------------------------------

test("register: first matching prefix wins, else default; UI uses register.ui", () => {
  const g = goodGlossary();
  assert.equal(registerFor(g, "guides/x.md"), "kamu");
  assert.equal(registerFor(g, "Zcash_Tech/x.md"), "anda");
  assert.equal(registerFor(g, "guides/x.md", { ui: true }), "anda");
});

// ---- schema.json stays in step with the validator -------------------------

test("schema.json documents exactly the fields the validator accepts", () => {
  const schema = JSON.parse(readFileSync(new URL("../schema.json", import.meta.url), "utf8"));
  const keys = (o) => Object.keys(o.properties).sort();
  assert.deepEqual(keys(schema.$defs.entry), [...ENTRY_FIELDS].sort());
  assert.deepEqual(keys(schema.$defs.term), [...TERM_EN_FIELDS].sort());
  assert.deepEqual(keys(schema.$defs.localeFile), [...LOCALE_FIELDS].sort());
});

// ---- the committed data ----------------------------------------------------

test("the committed terms.en.json is valid against protected-terms.json", () => {
  const termsEn = JSON.parse(readFileSync(new URL("../terms.en.json", import.meta.url), "utf8"));
  const { preserveVerbatim } = JSON.parse(readFileSync(new URL("../../protected-terms.json", import.meta.url), "utf8"));
  assert.deepEqual(validateTermsEn(termsEn, { preserveVerbatim }), []);
  const ids = new Set(termsEn.terms.map((t) => t.id));
  // The six words protected-terms.json used to list as glossaryOnly live here.
  for (const id of ["token", "chain", "cross-chain", "faucet", "mining", "miner"]) assert.ok(ids.has(id), id);
});
