import { strict as assert } from "node:assert";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

import { STYLE_FIELDS, validateLocale } from "./glossary.mjs";
import {
  applicableEntries,
  legacyCoverage,
  legacyRejections,
  mapTermLine,
  PLACEHOLDERS,
  registerText,
  renderPrompt,
  termLine,
} from "./render-prompt.mjs";
import { siteDirectories } from "../validate.mjs";

const here = (p) => new URL(p, import.meta.url);
const read = (p) => readFileSync(here(p), "utf8");
const json = (p) => JSON.parse(read(p));
const ROOT = here("../../../").pathname;

const TEMPLATE = read("../prompt-template.md");
const TERMS_EN = json("../terms.en.json");
const { preserveVerbatim: PV } = json("../../protected-terms.json");
const LLM_LOCALES = ["ar", "de", "es", "fr", "hi", "id", "it", "ja", "ko", "pt", "ru", "tr", "uk", "zh"];
const glossaryOf = (loc) => json(`../${loc}.json`);
const legacyHead = (loc) => read(`../test-fixtures/legacy-heads/prompt_head_${loc}.txt`);
const sitePage = (rel) => readFileSync(join(ROOT, "site", rel), "utf8");

// ---- fixtures ---------------------------------------------------------------

const FIX_TERMS = {
  version: 1,
  terms: [
    { id: "mining", english: "mining", pos: "noun", definition: "d", match: ["mining", "Mining"], category: "concept", default_policy: "translate", applies_to: "both" },
    { id: "pool", english: "pool", pos: "noun", definition: "d", match: ["pool", "pools"], category: "protocol", default_policy: "keep-english", applies_to: "both" },
    { id: "wallet", english: "wallet", pos: "noun", definition: "d", match: ["wallet"], category: "concept", default_policy: "translate", applies_to: "both" },
    { id: "close-ui", english: "Close", pos: "verb", definition: "d", match: ["Close"], category: "ui", default_policy: "translate", applies_to: "ui" },
  ],
};
const OK = { status: "approved", reviewed_by: ["@r"], reviewed_at: "2026-10-10" };
function fixGlossary() {
  return {
    locale: "xx",
    version: 1,
    meta: { language_name: "Testish", native_name: "T", engine: "llm", script: "Latn", dir: "ltr" },
    style: {
      variety: "natural Testish",
      register: {
        default: "formal",
        rules: [
          { register: "casual", prefixes: ["guides/"] },
          { register: "formal", prefixes: ["guides/deep/", "Zcash_Tech/"] },
        ],
        ui: "formal",
        text: { casual: "Be casual.", formal: "Be formal." },
      },
    },
    terms: {
      mining: { target: "minage", forms: ["minage", "miner"], rejected: [{ text: "minery" }], applies_to: "both", ...OK },
      pool: { target: "pool", keep_english: true, applies_to: "pages", ...OK },
      wallet: { target: "purse", applies_to: "both", status: "draft", reviewed_by: [] },
      "close-ui": { target: "Shut", applies_to: "ui", ...OK },
    },
    phrases: {
      "Shielded Pool": { target: "Pool Hidden", applies_to: "both", status: "disputed", reviewed_by: [] },
      "Use Zcash": { target: "Zcash Use", applies_to: "both", ...OK },
    },
    changelog: [],
  };
}
const keys = (r) => r.terms.map((t) => `${t.kind}:${t.key}`);

// ---- template ---------------------------------------------------------------

test("the template carries every placeholder and renders none of them", () => {
  for (const p of PLACEHOLDERS) assert.ok(TEMPLATE.includes(`{{${p}}}`), p);
  for (const loc of LLM_LOCALES) {
    const r = renderPrompt({ template: TEMPLATE, glossary: glossaryOf(loc), termsEn: TERMS_EN, relPath: "guides/x.md", text: null });
    assert.ok(!r.text.includes("{{"), loc);
    assert.ok(!r.text.includes("<!--"), loc);
    assert.ok(r.text.endsWith("\n") && !r.text.endsWith("\n\n"), loc);
  }
});

test("the terminology section disappears when no term applies", () => {
  const r = renderPrompt({ template: TEMPLATE, glossary: fixGlossary(), termsEn: FIX_TERMS, relPath: "x.md", text: "nothing relevant" });
  assert.deepEqual(r.terms, []);
  assert.ok(!r.text.includes("Terminology"));
  assert.ok(r.text.includes("- Translate into natural Testish."));
});

test("an unknown placeholder fails loudly", () => {
  assert.throws(() => renderPrompt({ template: "{{NOPE}} x", glossary: fixGlossary(), termsEn: FIX_TERMS, relPath: "x", text: "" }), /NOPE/);
  assert.throws(() => renderPrompt({ template: "x", glossary: fixGlossary(), termsEn: FIX_TERMS, relPath: "x" }), /pass text/);
});

// ---- register ---------------------------------------------------------------

test("register: first matching rule wins, else default; --ui uses register.ui", () => {
  const g = fixGlossary();
  // guides/deep/ also matches the later "formal" rule; the first rule wins,
  // exactly as prompt_head.py register_for() and sync.mjs promptHeadFor().
  assert.equal(registerText(g, "guides/deep/a.md").register, "casual");
  assert.equal(registerText(g, "guides/a.md").text, "Be casual.");
  assert.equal(registerText(g, "Zcash_Tech/a.md").register, "formal");
  assert.equal(registerText(g, "other/a.md").register, "formal");
  assert.equal(registerText(g, "guides/a.md", { ui: true }).register, "formal");
  delete g.style.register;
  assert.equal(registerText(g, "guides/a.md"), null);
});

// The runner's resolver, ported line for line, applied to every folder.
function legacyRegister(cfg, rel) {
  let reg = cfg.default;
  for (const rule of cfg.rules ?? []) {
    if (rule.prefixes.some((p) => rel.startsWith(p))) {
      reg = rule.register;
      break;
    }
  }
  return cfg.text[reg];
}

test("Indonesian register matches the runner's prompt_register.json for every folder under site/", () => {
  const legacy = json("../test-fixtures/legacy-heads/prompt_register.json").id;
  const g = glossaryOf("id");
  const dirs = siteDirectories();
  assert.ok(dirs.length > 20, "site/ folders found");
  for (const d of ["", ...dirs]) {
    const rel = d ? `${d}/page.md` : "page.md";
    assert.equal(registerText(g, rel).text, legacyRegister(legacy, rel), rel);
  }
});

// ---- term filter ------------------------------------------------------------

test("terms are filtered to those whose English occurs in the text", () => {
  const g = fixGlossary();
  const r = renderPrompt({ template: TEMPLATE, glossary: g, termsEn: FIX_TERMS, relPath: "x.md", text: "Mining needs a pool." });
  assert.deepEqual(keys(r), ["term:mining", "term:pool"]);
  // Word-bounded and case-sensitive, like every other term matcher.
  const r2 = renderPrompt({ template: TEMPLATE, glossary: g, termsEn: FIX_TERMS, relPath: "x.md", text: "determining the carpool, MINING" });
  assert.deepEqual(keys(r2), []);
  // Phrases match on their English key.
  const r3 = renderPrompt({ template: TEMPLATE, glossary: g, termsEn: FIX_TERMS, relPath: "x.md", text: "Use Zcash today" });
  assert.deepEqual(keys(r3), ["phrase:Use Zcash"]);
});

test("draft and disputed entries never reach a prompt", () => {
  const g = fixGlossary();
  const all = applicableEntries(g, FIX_TERMS, { text: "wallet Shielded Pool pool mining" }).map((i) => i.key);
  assert.ok(!all.includes("wallet"));
  assert.ok(!all.includes("Shielded Pool"));
  const none = applicableEntries(g, FIX_TERMS, { text: null }).map((i) => i.key);
  assert.ok(!none.includes("wallet") && !none.includes("Shielded Pool"));
});

test("pages see pages/both entries, --ui sees ui/both entries", () => {
  const g = fixGlossary();
  const text = "Close the pool after mining";
  assert.deepEqual(applicableEntries(g, FIX_TERMS, { text }).map((i) => i.key), ["mining", "pool"]);
  assert.deepEqual(applicableEntries(g, FIX_TERMS, { text, ui: true }).map((i) => i.key), ["mining", "close-ui"]);
});

test("term lines follow the legacy Indonesian style", () => {
  const byId = new Map(TERMS_EN.terms.map((t) => [t.id, t]));
  const id = glossaryOf("id");
  const line = (key) => termLine({ kind: "term", key, entry: id.terms[key] }, byId);
  assert.equal(line("wallet"), "wallet → dompet");
  assert.equal(line("pool"), "pool → pool (keep the English word)");
  assert.equal(
    line("shielded"),
    'shielded → terlindungi (e.g. "alamat terlindungi", "transaksi terlindungi", "pool terlindungi"). Never "terproteksi", "terlindung", "terenkripsi" (fine where the English says "encrypt").',
  );
  const de = glossaryOf("de");
  assert.equal(
    termLine({ kind: "term", key: "node", entry: de.terms.node }, byId),
    'node → Knoten. It is NOT a loanword: use the translated term in compounds and plurals too. Never "node", "nodes".',
  );
});

// ---- legacy-head line parsing -----------------------------------------------

test("legacy line parsing: segments, headword-less segments, rejections", () => {
  const id = glossaryOf("id");
  assert.deepEqual(mapTermLine("- node → node; full node → full node; light client → light client (keep English)", id, TERMS_EN).map((m) => m.key).sort(), ["full-node", "light-client", "node"]);
  assert.deepEqual(mapTermLine("- mining → penambangan (noun); to mine → menambang (verb)", id, TERMS_EN).map((m) => m.key), ["mining"]);
  // A rendering the glossary does not carry is not a mapping.
  assert.equal(mapTermLine("- mining → penggalian", id, TERMS_EN), null);
  assert.equal(mapTermLine("- mining → penambangan; to dig → menggali", id, TERMS_EN), null);
  assert.equal(mapTermLine("- frobnicate → frob", id, TERMS_EN), null);
  assert.deepEqual(legacyRejections('- x → y. Never "a", "b" or "c".'), ["a", "b", "c"]);
  assert.deepEqual(legacyRejections('- x → y (keep English; not "p" or "q")'), ["p", "q"]);
});

// ---- golden tests (design section 6, row C3) --------------------------------

/**
 * Every term line of a legacy head that applies to `text` must come out of
 * the generated head, mapped by entry id, with the same forbidden renderings.
 * Returns how many legacy lines applied, so callers can refuse a vacuous pass.
 */
function assertLegacyTermLinesKept(loc, rel, text) {
  const glossary = glossaryOf(loc);
  const r = renderPrompt({ template: TEMPLATE, glossary, termsEn: TERMS_EN, relPath: rel, text });
  const rendered = new Map(r.terms.map((t) => [`${t.kind === "term" ? "terms" : "phrases"}.${t.key}`, t.line]));
  const byId = new Map(TERMS_EN.terms.map((t) => [t.id, t]));
  let applied = 0;
  for (const row of legacyCoverage(legacyHead(loc), { template: TEMPLATE, glossary, termsEn: TERMS_EN })) {
    if (row.kind !== "term") continue;
    const relevant = row.refs.filter((ref) => {
      const [kind, ...rest] = ref.split(".");
      const key = rest.join(".");
      const entry = glossary[kind][key];
      if (!["pages", "both"].includes(entry.applies_to)) return false;
      if (text == null) return true;
      const forms = kind === "terms" ? byId.get(key).match : [key];
      return forms.some((f) => new RegExp(`(?<![A-Za-z0-9])${f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![A-Za-z0-9])`).test(text));
    });
    if (!relevant.length) continue;
    applied++;
    for (const ref of relevant) {
      assert.ok(rendered.has(ref), `${loc} ${rel}: legacy line "${row.line}" maps to ${ref}, missing from the generated head`);
      assert.ok(r.text.includes(`- ${rendered.get(ref)}`), ref);
    }
    const lines = relevant.map((ref) => rendered.get(ref).toLowerCase()).join("\n");
    for (const bad of legacyRejections(row.line)) {
      assert.ok(lines.includes(`"${bad.toLowerCase()}"`), `${loc}: "${bad}" forbidden by "${row.line}" but not by the generated head`);
    }
  }
  return { applied, r };
}

test("golden: id guides/ page keeps every applicable legacy term line and gets kamu", () => {
  const rel = "guides/Raspberry_Pi_4_Full_Node.md";
  const { applied, r } = assertLegacyTermLinesKept("id", rel, sitePage(rel));
  assert.ok(applied >= 4, `only ${applied} legacy term lines applied; pick a richer page`);
  assert.equal(r.register, "kamu");
  assert.ok(r.text.includes('Address the reader informally as "kamu"'));
  assert.ok(!r.text.includes('Address the reader formally as "Anda"'));
});

test("golden: id pages across folders keep their legacy term lines", () => {
  let total = 0;
  for (const rel of ["Using_Zcash/Wallets.md", "Zcash_Tech/zk_SNARKS.md", "Using_Zcash/Shielded_Pools.md"]) {
    total += assertLegacyTermLinesKept("id", rel, sitePage(rel)).applied;
  }
  assert.ok(total >= 10, `only ${total} legacy term lines applied`);
});

test("golden: id Zcash_Tech/ page gets Anda", () => {
  const rel = "Zcash_Tech/zk_SNARKS.md";
  const r = renderPrompt({ template: TEMPLATE, glossary: glossaryOf("id"), termsEn: TERMS_EN, relPath: rel, text: sitePage(rel) });
  assert.equal(r.register, "anda");
  assert.ok(r.text.includes('Address the reader formally as "Anda"'));
  assert.ok(!r.text.includes('informally as "kamu"'));
});

test("golden: unfiltered, every legacy term line of every locale is generated", () => {
  for (const loc of LLM_LOCALES) {
    const { applied } = assertLegacyTermLinesKept(loc, "Zcash_Tech/x.md", null);
    assert.ok(applied >= 1, loc);
  }
});

// ---- coverage of the retired heads ------------------------------------------

test("coverage: every line of the 14 legacy heads maps to the template, a style field or a glossary entry", () => {
  const fixtures = readdirSync(here("../test-fixtures/legacy-heads/")).filter((f) => f.startsWith("prompt_head_")).map((f) => f.slice(12, -4)).sort();
  assert.deepEqual(fixtures, [...LLM_LOCALES].sort());
  for (const loc of LLM_LOCALES) {
    const glossary = glossaryOf(loc);
    const rows = legacyCoverage(legacyHead(loc), { template: TEMPLATE, glossary, termsEn: TERMS_EN });
    const unmapped = rows.filter((r) => r.kind === "unmapped").map((r) => r.line);
    assert.deepEqual(unmapped, [], `${loc}: legacy lines with no home`);
    for (const row of rows) {
      for (const ref of row.refs) {
        if (ref === "template") continue;
        const [kind, ...rest] = ref.split(".");
        const key = rest.join(".");
        if (kind === "style") assert.ok(key === "register" ? glossary.style.register : glossary.style[key] !== undefined, `${loc} ${ref}`);
        else assert.equal(glossary[kind]?.[key]?.status, "approved", `${loc} ${ref}`);
      }
    }
    // The node rule every LLM head states.
    assert.ok(rows.some((r) => r.refs.includes("terms.node")), `${loc}: node rule`);
  }
});

test("coverage: the shared rules of the legacy heads are in the template word for word", () => {
  for (const loc of LLM_LOCALES) {
    const rendered = renderPrompt({ template: TEMPLATE, glossary: glossaryOf(loc), termsEn: TERMS_EN, relPath: "x.md", text: null }).text;
    for (const line of legacyHead(loc).split("\n")) {
      if (/^- (Output ONLY|Preserve the Markdown|Do NOT translate|Link\/anchor|Translate completely|Translate into)/.test(line)) {
        assert.ok(rendered.includes(line), `${loc}: ${line}`);
      }
    }
  }
});

test("coverage detects a legacy line that lost its home", () => {
  const g = glossaryOf("de");
  delete g.terms.node;
  const rows = legacyCoverage(legacyHead("de"), { template: TEMPLATE, glossary: g, termsEn: TERMS_EN });
  assert.equal(rows.filter((r) => r.kind === "unmapped").length, 1);
  const id = glossaryOf("id");
  delete id.style.english_in_brackets;
  const rows2 = legacyCoverage(legacyHead("id"), { template: TEMPLATE, glossary: id, termsEn: TERMS_EN });
  assert.ok(rows2.some((r) => r.kind === "unmapped" && /brackets/.test(r.line)));
});

// ---- committed data ---------------------------------------------------------

test("the committed locale glossaries are valid", () => {
  const dirs = siteDirectories();
  for (const loc of LLM_LOCALES) {
    assert.deepEqual(validateLocale(glossaryOf(loc), { termsEn: TERMS_EN, preserveVerbatim: PV, siteDirs: dirs, fileLocale: loc }), [], loc);
  }
});

test("legacy prompt-head imports are approved by the steward and logged", () => {
  for (const loc of LLM_LOCALES.filter((l) => l !== "id")) {
    const g = glossaryOf(loc);
    for (const [key, e] of Object.entries(g.terms)) {
      assert.equal(e.status, "approved", `${loc} ${key}`);
      assert.deepEqual(e.reviewed_by, ["@steward (legacy prompt head)"], `${loc} ${key}`);
      assert.ok(g.changelog.some((c) => c.version === g.version && c.terms.includes(key)), `${loc} ${key} in changelog`);
    }
  }
});

test("schema.json documents exactly the style fields the validator accepts", () => {
  const schema = json("../schema.json");
  assert.deepEqual(Object.keys(schema.$defs.style.properties).sort(), [...STYLE_FIELDS].sort());
});

test("protected-terms.json no longer carries glossaryOnly; its words are glossary terms", () => {
  const pt = json("../../protected-terms.json");
  assert.equal(pt.glossaryOnly, undefined);
  const ids = new Set(TERMS_EN.terms.map((t) => t.id));
  for (const id of ["token", "chain", "cross-chain", "faucet", "mining", "miner"]) assert.ok(ids.has(id), id);
});

// ---- CLI --------------------------------------------------------------------

const CLI = here("../render-prompt.mjs").pathname;

test("CLI prints the head for a page and for a block", () => {
  const page = execFileSync("node", [CLI, "id", "guides/Raspberry_Pi_4_Full_Node.md"], { encoding: "utf8" });
  const want = renderPrompt({ template: TEMPLATE, glossary: glossaryOf("id"), termsEn: TERMS_EN, relPath: "guides/Raspberry_Pi_4_Full_Node.md", text: sitePage("guides/Raspberry_Pi_4_Full_Node.md") }).text;
  assert.equal(page, want);
  const dir = mkdtempSync(join(tmpdir(), "render-prompt-"));
  const block = join(dir, "block.md");
  writeFileSync(block, "Send ZEC to a shielded address from your wallet.");
  const out = execFileSync("node", [CLI, "id", "Zcash_Tech/zk_SNARKS.md", "--text-file", block], { encoding: "utf8" });
  assert.ok(out.includes("- wallet → dompet"));
  assert.ok(out.includes("- shielded → terlindungi"));
  assert.ok(!out.includes("- pool →"));
  assert.ok(out.includes('formally as "Anda"'));
  const ui = execFileSync("node", [CLI, "id", "guides/x.md", "--ui", "--text-file", block], { encoding: "utf8" });
  assert.ok(ui.includes('formally as "Anda"'), "UI register");
});

test("CLI fails loudly, with nothing on stdout, for a locale without a glossary or a missing page", () => {
  for (const args of [["sw", "guides/Raspberry_Pi_4_Full_Node.md"], ["id", "guides/No_Such_Page.md"], ["id"]]) {
    const r = spawnSync("node", [CLI, ...args], { encoding: "utf8" });
    assert.equal(r.status, 1, args.join(" "));
    assert.equal(r.stdout, "");
  }
});
