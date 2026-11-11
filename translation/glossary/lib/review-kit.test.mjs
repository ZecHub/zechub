import { strict as assert } from "node:assert";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import { canonical, validateLocale } from "./glossary.mjs";
import {
  computeEvidence,
  exportKit,
  importKit,
  isNameOnly,
  markAllOk,
  parseKit,
  readCell,
  serializeGlossary,
} from "./review-kit.mjs";

const here = (p) => new URL(p, import.meta.url);
const read = (p) => readFileSync(here(p), "utf8");
const TERMS_EN = JSON.parse(read("../terms.en.json"));
const { preserveVerbatim: PV } = JSON.parse(read("../../protected-terms.json"));
const ID = JSON.parse(read("../id.json"));
const PAGES_KIT = read("../test-fixtures/indonesian-glossary-f-reviewed.md");
const MENUS_KIT = read("../test-fixtures/menus-review-id-f_reviewed.md");
const REVIEWER = "@daonarchy";
// A slice of the website's MENU_BRANDS: enough for the fixture's names.
const BRANDS = ["Zashi", "Free2z", "Raspberry Pi", "BTCPayServer", "zechub", "zechub-wiki", "Akash", "Brave"];

function skeleton() {
  return {
    locale: "id",
    version: 1,
    meta: { language_name: "Indonesian", native_name: "Bahasa Indonesia", engine: "llm", script: "Latn", dir: "ltr", language_lead: [], last_review: null },
    style: { register: { default: "anda", ui: "anda", text: { anda: "Use Anda.", kamu: "Use kamu." } } },
    changelog: [{ version: 1, date: "2026-10-09", terms: [], phrases: [] }],
  };
}

const run = (glossary, md, extra = {}) =>
  importKit({ glossary, termsEn: TERMS_EN, md, reviewer: REVIEWER, date: "2026-10-09", sourceName: "kit.md", preserveVerbatim: PV, brands: BRANDS, siteDirs: null, ...extra });

// ---- parsing ---------------------------------------------------------------

test("parse: the real pages kit has 23 term rows and 3 style rows", () => {
  const tables = parseKit(PAGES_KIT);
  assert.deepEqual(tables.map((t) => [t.kind, t.rows.length]), [["pages", 23], ["style", 3]]);
  const shielded = tables[0].rows[1];
  assert.equal(shielded.english, "shielded (address, transaction, pool)");
  assert.equal(shielded.proposed, "terlindungi / terproteksi / terenkripsi / keep \"shielded\"");
  assert.equal(shielded.confirmed, "terlindungi");
});

test("parse: the real menus kit has the four menu sections with their row counts", () => {
  const tables = parseKit(MENUS_KIT);
  assert.deepEqual(tables.map((t) => [t.kind, t.section, t.rows.length]), [
    ["ui", "navigation", 77], ["ui", "menuLabels", 84], ["ui", "exploreMenu", 15], ["ui", "sideMenu", 2],
  ]);
});

test("parse: escaped pipes stay inside a cell", () => {
  const md = "(`menuLabels`: 1 labels)\n\n| # | English | Indonesian | \u2705 Confirmed | Notes |\n|---|---|---|---|---|\n| 1 | A \\| B | X \\| Y | OK | |\n";
  const [t] = parseKit(md);
  assert.equal(t.rows[0].english, "A | B");
  assert.equal(t.rows[0].proposed, "X | Y");
});

// ---- fenced examples (issue #2565) -----------------------------------------

const FENCE_HEAD = "| # | ID | English | Proposed | \u2705 Confirmed | Notes |\n|---|---|---|---|---|---|\n";
const fencedRow = (target) => `| 1 | wallet | wallet | ${target} | OK | |\n`;
const realTable = FENCE_HEAD + "| 1 | wallet | wallet | Dompet | OK | |\n";

test("fences: a review table inside ``` or ~~~ is an example, not an answer", () => {
  for (const f of ["```", "~~~", "````", "~~~~~"]) {
    const md = `Example:\n\n${f}markdown\n${FENCE_HEAD}${fencedRow("FENCED")}${f}\n`;
    assert.deepEqual(parseKit(md), [], f);
    const { report } = run(skeleton(), md);
    assert.ok(report.errors.includes("no table with a \u2705 column found"), f);
    assert.deepEqual(report.new, [], f);
  }
});

test("fences: a real table after a closed example is still parsed, the example is not", () => {
  const md = `\`\`\`\n${FENCE_HEAD}${fencedRow("FENCED")}\`\`\`\n\n${realTable}`;
  const tables = parseKit(md);
  assert.equal(tables.length, 1);
  assert.deepEqual(tables[0].rows.map((r) => [r.id, r.proposed]), [["wallet", "Dompet"]]);
  const { glossary } = run(skeleton(), md);
  assert.equal(glossary.terms.wallet.target, "Dompet");
});

test("fences: a fence closes only on the same character, at least as long, with nothing after", () => {
  for (const [open, notClose] of [["```", "~~~"], ["````", "```"], ["~~~", "```"], ["```", "``` text"]]) {
    const md = `${open}\n${notClose}\n${FENCE_HEAD}${fencedRow("FENCED")}${open}\n`;
    assert.deepEqual(parseKit(md), [], `${open} / ${notClose}`);
  }
});

test("fences: an unclosed fence hides everything after it, and the import reports it", () => {
  assert.deepEqual(parseKit(`\`\`\`\n${realTable}`), []);
  const { report } = run(skeleton(), `\`\`\`\n${realTable}`);
  assert.ok(report.errors.some((e) => e.startsWith("code fence opened at line 1 is never closed")), JSON.stringify(report.errors));
});

test("fences: a fence left open between two tables is an import error, not a silent loss", () => {
  // Opened with four backticks, "closed" with three: still open (length rule).
  const md = `${realTable}\n\`\`\`\`\nsnippet\n\`\`\`\n\n${FENCE_HEAD}| 1 | shielded | shielded | Terlindungi | OK | |\n`;
  assert.equal(parseKit(md).length, 1);
  const { report } = run(skeleton(), md);
  assert.ok(report.errors.some((e) => e.startsWith("code fence opened at line 5 is never closed")), JSON.stringify(report.errors));
});

test("fences: CRLF kits are handled by parseKit and markAllOk", () => {
  const ex = "```\r\n| # | ID | English | Proposed | \u2705 Confirmed | Notes |\r\n|---|---|---|---|---|---|\r\n| 1 | wallet | wallet | X |  | |\r\n```\r\n";
  assert.deepEqual(parseKit(ex), []);
  assert.equal(markAllOk(ex), ex);
});

test("fences: a closer must sit at the opener's blockquote depth", () => {
  // CommonMark: inside a top-level fence, "> ```" is content, not a closer.
  assert.deepEqual(parseKit(`\`\`\`\n> \`\`\`\n${realTable}\`\`\`\n`), []);
  assert.equal(parseKit(`> \`\`\`\n> example\n> \`\`\`\n\n${realTable}`).length, 1);
});

test("fences: a list-item fence line inside an open fence is content, not a closer", () => {
  // Balanced afterwards, so a wrong close would import the example silently.
  const md = `\`\`\`\n- \`\`\`\n${FENCE_HEAD}${fencedRow("FENCED")}\`\`\`\ncode\n\`\`\`\n`;
  assert.deepEqual(parseKit(md), []);
  // A list-item example still closes on its indented closer.
  assert.equal(parseKit(`- \`\`\`\n  example\n  \`\`\`\n\n${realTable}`).length, 1);
});

test("fences: indented, quoted and list-item fences count; inline code and a backtick info string do not", () => {
  for (const f of ["   ```", "  ~~~", "> ```", "- ```", "1. ```"]) {
    assert.deepEqual(parseKit(`${f}\n${FENCE_HEAD}${fencedRow("FENCED")}${f}\n`), [], f);
  }
  // Not fences: inline code, a ``` line whose info string has a backtick, and
  // a list marker without the space after it.
  for (const pre of ["Use `OK` in the \u2705 column.", "``` a`b", "-```"]) {
    const tables = parseKit(`${pre}\n\n${realTable}`);
    assert.equal(tables.length, 1, pre);
  }
});

test("fences: headings and section markers inside a fence do not change the section", () => {
  const md = "(`menuLabels`: 1 labels)\n\n```\n# Heading\n(`terms`: 1)\n```\n\n| # | English | Indonesian | \u2705 Confirmed | Notes |\n|---|---|---|---|---|\n| 1 | Wallets | Dompet | OK | |\n";
  const [t] = parseKit(md);
  assert.equal(t.kind, "ui");
  assert.equal(t.section, "menuLabels");
});

test("fences: markAllOk leaves example tables untouched", () => {
  const ex = `\`\`\`\n| # | ID | English | Proposed | \u2705 Confirmed | Notes |\n|---|---|---|---|---|---|\n| 1 | wallet | wallet | X |  | |\n\`\`\`\n`;
  const real = "| # | ID | English | Proposed | \u2705 Confirmed | Notes |\n|---|---|---|---|---|---|\n| 1 | wallet | wallet | Dompet |  | |\n";
  const out = markAllOk(ex + "\n" + real);
  assert.ok(out.startsWith(ex), "fenced example changed");
  assert.equal(parseKit(out)[0].rows[0].confirmed, "OK");
});

// ---- cell rules (design section 2.2) --------------------------------------

test("cells: OK, keep English, keep \"x\", a single rendering, empty", () => {
  assert.deepEqual(readCell({ confirmed: "ok", proposed: "Dompet", notes: "" }), { kind: "ok", target: "Dompet" });
  assert.deepEqual(readCell({ confirmed: "keep English", proposed: "x", notes: "" }), { kind: "keep", target: null });
  assert.deepEqual(readCell({ confirmed: 'keep "proof"', proposed: "x", notes: "" }), { kind: "keep", target: "proof" });
  assert.deepEqual(readCell({ confirmed: "Top Up Seluler", proposed: "Isi Ulang Pulsa", notes: "" }), { kind: "render", target: "Top Up Seluler" });
  assert.deepEqual(readCell({ confirmed: "  ", proposed: "x", notes: "" }), { kind: "empty" });
});

test("cells: two renderings, a verb/noun note, or OK on a list of options are never guessed", () => {
  assert.equal(readCell({ confirmed: "menambang / penambangan", proposed: "penambangan", notes: "" }).kind, "maintainer");
  assert.equal(readCell({ confirmed: "penambangan", proposed: "x", notes: "Verb: menambang. Noun: penambangan" }).kind, "maintainer");
  assert.equal(readCell({ confirmed: "OK", proposed: "pool / kolam", notes: "" }).kind, "maintainer");
  assert.equal(readCell({ confirmed: "OK", proposed: "", notes: "" }).kind, "maintainer");
});

// ---- the real pages kit ------------------------------------------------------

test("import: the real pages kit lands 22 terms, with mining for a maintainer", () => {
  const { glossary: g, report } = run(skeleton(), PAGES_KIT);
  assert.equal(report.new.length, 22);
  assert.deepEqual(report.errors, []);
  assert.ok(!g.terms.mining);
  const nm = report.needsMaintainer.map((m) => m.english);
  assert.ok(nm.includes("mining"));
  assert.ok(nm.some((e) => /address the reader/i.test(e)), "register answer is free text");
  assert.equal(g.terms.shielded.target, "terlindungi");
  assert.deepEqual(g.terms.proof.forms, ["proof", "proofs", "Proof", "Proofs"]);
  assert.equal(g.terms.proof.keep_english, true);
  assert.equal(g.terms["viewing-key"].target, "viewing key");
  assert.equal(g.terms.custodial.target, "kustodial", "'custody / custodial' resolves to one term");
  assert.equal(g.terms.exchange.notes, "Already familiar to the Indonesian crypto community");
  // Unchosen options are not wrong renderings: "catatan" is ordinary Indonesian.
  assert.equal(g.terms.memo.rejected, undefined);
  assert.equal(g.terms.shielded.rejected, undefined);
  assert.equal(g.style.english_in_brackets, "never");
  assert.equal(g.style.loanwords, "keep-english");
  assert.match(g.style.notes, /kamu/);
  assert.equal(g.version, 2);
  assert.equal(g.changelog.at(-1).terms.length, 22);
  for (const e of Object.values(g.terms)) {
    assert.deepEqual([e.status, e.reviewed_by, e.reviewed_at], ["approved", [REVIEWER], "2026-10-09"]);
  }
  assert.deepEqual(validateLocale(g, { termsEn: TERMS_EN, preserveVerbatim: PV, siteDirs: null }), []);
});

// ---- the real menus kit -----------------------------------------------------

test("import: the real menus kit, after the pages kit", () => {
  const { glossary: afterPages } = run(skeleton(), PAGES_KIT);
  const { glossary: g, report } = run(afterPages, MENUS_KIT);
  assert.deepEqual(report.errors, []);
  // Protected names are listed, not reviewed (Shielded Labs and Brave Wallet
  // joined preserveVerbatim after the Indonesian review).
  assert.deepEqual(report.skippedNames, ["Shielded Labs", "Keystone Zashi", "Brave Wallet"]);
  assert.deepEqual(report.needsMaintainer.map((m) => m.english).sort(), [
    "Metamask Snap", // rows disagree on case; the protected name is "MetaMask Snap"
    "Privacy Tools", // Tools -> Alat vs Tools Privasi, needs a context on both
    "Shielded Pools",
    "Start Here",
    "Tools",
    "Transparent Exchange Addresses",
    "Using ZEC Privately",
    "Zgo Payment Processor",
    "Zkool Multisig",
  ]);
  // A single rendering replaces the proposal, which becomes a rejection,
  // merged across the two menus that carry the label.
  assert.equal(g.phrases["Mobile Top Ups"].target, "Top Up Seluler");
  assert.deepEqual(g.phrases["Mobile Top Ups"].rejected.map((r) => r.text), ["Isi Ulang Pulsa Seluler", "Isi Ulang Pulsa"]);
  assert.deepEqual([g.phrases.Developers.target, g.phrases.Developers.rejected[0].text], ["Developer", "Pengembang"]);
  assert.equal(g.phrases.Visualizer.keep_english, true);
  assert.equal(g.phrases["Using ZEC in DeFi"].target, "Menggunakan ZEC di DeFi");
  // What the file says; the later keep-English decision is a maintainer edit.
  assert.equal(g.phrases["Use Cases"].target, "Contoh Penggunaan");
  assert.equal(g.phrases.Wallets.source, "kit.md#navigation-1");
  assert.ok(Object.values(g.phrases).every((p) => p.applies_to === "ui"));
  assert.equal(g.version, 3);
});

// ---- import behaviour -------------------------------------------------------

test("import: an approved entry the kit does not include is never touched", () => {
  const md = "(`terms`: 1 rows)\n\n| # | ID | English | Proposed | \u2705 Confirmed | Notes |\n|---|---|---|---|---|---|\n| 1 | fee | fee |  | ongkos | |\n";
  const { glossary: g, report } = run(ID, md);
  assert.deepEqual(report.changed, ["fee"]);
  assert.equal(g.terms.fee.target, "ongkos");
  assert.deepEqual(g.terms.fee.rejected, [{ text: "biaya" }], "the old approved rendering is now rejected");
  for (const [k, v] of Object.entries(ID.terms)) if (k !== "fee") assert.equal(canonical(g.terms[k]), canonical(v), k);
  assert.equal(canonical(g.phrases), canonical(ID.phrases));
  assert.equal(g.version, ID.version + 1);
  assert.deepEqual(g.changelog.at(-1).terms, ["fee"]);
});

test("import: an unknown ID is an error, not a silent skip", () => {
  const md = "| # | ID | English | Proposed | \u2705 Confirmed | Notes |\n|---|---|---|---|---|---|\n| 1 | sheilded | shielded | terlindungi | OK | |\n";
  const { report } = run(ID, md);
  assert.ok(report.errors.some((e) => /sheilded/.test(e)));
});

test("import: a protected name rendered differently goes to a maintainer", () => {
  const md = "(`menuLabels`: 1 labels)\n\n| # | English | Indonesian | \u2705 Confirmed | Notes |\n|---|---|---|---|---|\n| 1 | Zcash Foundation | Yayasan Zcash | OK | |\n";
  const { glossary: g, report } = run(ID, md);
  assert.equal(g.phrases["Zcash Foundation"], undefined);
  assert.match(report.needsMaintainer[0].reason, /protected name/);
});

test("import: a style answer outside the known values is copied to notes and flagged", () => {
  const md = "(`style`: 1 questions)\n\n| # | ID | Question | Current | \u2705 Answer | Notes |\n|---|---|---|---|---|---|\n| B | english_in_brackets | brackets? | never | only in headings | |\n";
  const { glossary: g, report } = run(ID, md);
  assert.equal(g.style.english_in_brackets, "never");
  assert.match(g.style.notes, /only in headings/);
  assert.equal(report.needsMaintainer.length, 1);
});

// ---- round trip (design section 2.2) -----------------------------------------

function dictsFromPhrases(glossary) {
  const en = { menuLabels: {} };
  const loc = { menuLabels: {} };
  for (const [k, e] of Object.entries(glossary.phrases)) {
    if (e.applies_to === "pages") continue;
    en.menuLabels[k] = k;
    loc.menuLabels[k] = `${e.target} (stale dictionary value)`;
  }
  return { en, loc };
}

test("round trip: export -> every cell OK -> import gives back the committed id.json", () => {
  const { en, loc } = dictsFromPhrases(ID);
  const md = exportKit({ glossary: ID, termsEn: TERMS_EN, kit: "all", dict: loc, enDict: en, preserveVerbatim: PV, brands: BRANDS });
  const { glossary: back, report } = run(ID, markAllOk(md), { date: "2030-01-01" });
  assert.deepEqual(report.errors, []);
  assert.deepEqual([report.new, report.changed], [[], []]);
  assert.equal(serializeGlossary(back, TERMS_EN), serializeGlossary(ID, TERMS_EN));
  // Terms with no locale entry yet have nothing to confirm with OK.
  const missing = TERMS_EN.terms.filter((t) => t.applies_to !== "ui" && !ID.terms[t.id]).map((t) => t.english).sort();
  assert.ok(missing.includes("chain") && missing.includes("faucet"), missing.join(", "));
  const norm = (x) => x.replace(/[\s-]+/g, "-").toLowerCase();
  assert.deepEqual(report.needsMaintainer.map((m) => norm(m.english)).sort(), missing.map(norm).sort());
});

test("round trip: the committed id.json is in canonical form", () => {
  assert.equal(serializeGlossary(ID, TERMS_EN), read("../id.json"));
});

test("export: deterministic, and the kit proposes the glossary over the dictionary", () => {
  const { en, loc } = dictsFromPhrases(ID);
  const args = { glossary: ID, termsEn: TERMS_EN, kit: "all", dict: loc, enDict: en, preserveVerbatim: PV, brands: BRANDS };
  const a = exportKit(args);
  assert.equal(a, exportKit(args));
  assert.ok(!a.includes("stale dictionary value"));
  assert.match(a, /\| \d+ \| menuLabels\.Privacy Tools \| Privacy Tools \| Tools Privasi \|/);
  assert.match(a, /split \(with context\)/, "the Tools split is shown to reviewers");
});

test("export: names are left out (protected-terms.json lists them); dictionary values fill unknown labels", () => {
  const en = { navigation: { a: "Zcash Foundation", b: "Keystone Zashi", c: "New Label" } };
  const loc = { navigation: { a: "Zcash Foundation", b: "Keystone Zashi", c: "Label Baru" } };
  const md = exportKit({ glossary: ID, termsEn: TERMS_EN, kit: "ui", dict: loc, enDict: en, preserveVerbatim: PV, brands: BRANDS });
  assert.match(md, /\| 1 \| navigation\.c \| New Label \| Label Baru \|/);
  assert.doesNotMatch(md, /Keystone Zashi|Zcash Foundation|Names kept in English/);
});

test("export: only the menu strings of common, and the header-bar hint", () => {
  const en = {
    navigation: { guides: "Guides", usingZcash: { label: "Use Zcash" }, wallets: "Wallets" },
    common: { languageSearch: "Search languages", close: "Close", readMore: "Read More" },
  };
  const md = exportKit({ glossary: ID, termsEn: TERMS_EN, kit: "ui", dict: en, enDict: en, preserveVerbatim: PV, brands: BRANDS });
  assert.match(md, /## Language menu and search buttons/);
  assert.match(md, /\| common\.languageSearch \| Search languages \|/);
  assert.match(md, /\| common\.close \| Close \|/);
  assert.doesNotMatch(md, /common\.readMore/, "page sentences in common are not menu text");
  assert.match(md, /\| navigation\.guides \| Guides \| [^|]* \|  \| Header bar: keep it short \|/);
  assert.match(md, /\| navigation\.usingZcash\.label \| Use Zcash \| [^|]* \|  \| Header bar: keep it short \|/);
  assert.match(md, /\| navigation\.wallets \| Wallets \| [^|]* \|  \|  \|/);
  assert.match(md, /sit side by side in the desktop header bar/);
});

test("import: the pre-filled header-bar hint is not stored as a reviewer note", () => {
  const md = [
    "## Top menu (header) and its submenus",
    "",
    "| # | ID | English | Indonesian | \u2705 Confirmed | Notes |",
    "|---:|---|---|---|---|---|",
    "| 1 | navigation.guides | Guides | Panduan | OK | Header bar: keep it short |",
    "| 2 | navigation.more | More | Lainnya | OK | Header bar: keep it short. Shorter than Selengkapnya |",
  ].join("\n");
  const rows = parseKit(md).flatMap((t) => t.rows);
  assert.equal(rows[0].notes, "");
  assert.equal(rows[1].notes, "Shorter than Selengkapnya");
});

test("export --only-missing: only labels the glossary does not decide yet", () => {
  const decided = Object.keys(ID.phrases)[0];
  const en = { navigation: { a: decided, b: "Brand New Label", more: decided }, menuLabels: { c: decided } };
  const md = exportKit({ glossary: ID, termsEn: TERMS_EN, kit: "ui", dict: en, enDict: en, preserveVerbatim: PV, brands: BRANDS, onlyMissing: true });
  assert.match(md, /\| 1 \| navigation\.b \| Brand New Label \|/);
  assert.doesNotMatch(md, /navigation\.a \|/, "decided labels are left out");
  assert.match(md, /navigation\.more \|.*Header bar: keep it short/, "header-bar rows stay, to ask for a short form");
  assert.doesNotMatch(md, /## Submenu entries/, "a section with nothing left is dropped");
  assert.doesNotMatch(md, /## Other approved phrases/);
});

test("export: menu labels that exist only in the locale dictionary are reviewed too", () => {
  const en = { menuLabels: { "Old Label": "Old Label" } };
  const loc = { menuLabels: { "Old Label": "Label Lama", "Spend Zcash": "Belanjakan Zcash" } };
  const md = exportKit({ glossary: ID, termsEn: TERMS_EN, kit: "ui", dict: loc, enDict: en, preserveVerbatim: PV, brands: BRANDS });
  assert.match(md, /\| menuLabels\.Spend Zcash \| Spend Zcash \| Belanjakan Zcash \|/);
});

test("import: a reviewer note that only mentions the hint later is kept", () => {
  const md = [
    "## Top menu (header) and its submenus",
    "",
    "| # | ID | English | Indonesian | \u2705 Confirmed | Notes |",
    "|---:|---|---|---|---|---|",
    "| 1 | navigation.more | More | Lainnya | OK | Shorter, as the Header bar: keep it short note asks |",
  ].join("\n");
  assert.equal(parseKit(md).flatMap((t) => t.rows)[0].notes, "Shorter, as the Header bar: keep it short note asks");
});

test("import: the hint is stripped only on header-bar rows", () => {
  const md = [
    "## Top menu (header) and its submenus",
    "",
    "| # | ID | English | Indonesian | \u2705 Confirmed | Notes |",
    "|---:|---|---|---|---|---|",
    "| 1 | navigation.wallets | Wallets | Dompet | OK | Header bar: keep it short, like the others |",
  ].join("\n");
  assert.equal(parseKit(md).flatMap((t) => t.rows)[0].notes, "Header bar: keep it short, like the others");
});

test("export --only-missing keeps disputed phrases", () => {
  const g = structuredClone(ID);
  const [k] = Object.keys(g.phrases);
  g.phrases[k] = { ...g.phrases[k], status: "disputed", dispute: "two readings" };
  const en = { navigation: { a: k } };
  const md = exportKit({ glossary: g, termsEn: TERMS_EN, kit: "ui", dict: en, enDict: en, preserveVerbatim: PV, brands: BRANDS, onlyMissing: true });
  assert.match(md, /\| 1 \| navigation\.a \|/);
});

test("round trip: language-menu strings import as UI phrases", () => {
  const en = { common: { languageSearch: "Search languages", close: "Close" } };
  const loc = { common: { languageSearch: "Cari bahasa", close: "Tutup" } };
  const md = markAllOk(exportKit({ glossary: ID, termsEn: TERMS_EN, kit: "ui", dict: loc, enDict: en, preserveVerbatim: PV, brands: BRANDS }));
  const { glossary } = run(ID, md);
  assert.equal(glossary.phrases["Search languages"].target, "Cari bahasa");
  assert.equal(glossary.phrases["Search languages"].applies_to, "ui");
  assert.equal(glossary.phrases["Close"].target, "Tutup");
});

test("the Greek follow-up kit parses and lists the header-bar rows", () => {
  const rows = parseKit(read("../test-fixtures/menus-review-el-followup.md")).flatMap((t) => t.rows);
  assert.ok(rows.length >= 18);
  assert.ok(rows.some((r) => r.english === "Use Zcash"));
  assert.ok(rows.some((r) => r.english === "Search languages"));
});

test("isNameOnly: whole names only, case-insensitive", () => {
  assert.ok(isNameOnly("Keystone Zashi", ["Keystone", "Zashi"]));
  assert.ok(isNameOnly("Metamask Snap", ["MetaMask Snap"]));
  assert.ok(!isNameOnly("Brave Wallet", ["Brave"]));
  assert.ok(!isNameOnly("Raspberry pi5 Zebra", ["Raspberry Pi", "Zebra"]));
});

// ---- evidence -------------------------------------------------------------

test("evidence: counts English occurrences and today's renderings, with scope", () => {
  const ev = computeEvidence(TERMS_EN, ID, [
    { en: "A shielded pool. Shielded!", tr: "Pool terlindungi. Terlindungi! terproteksi" },
    { en: "An encrypted, shielded memo", tr: "memo terenkripsi" },
    { en: "A shielded note", tr: "catatan terenkripsi" },
    { en: "determining", tr: null },
  ]);
  const s = ev.get("shielded");
  assert.equal(s.occurrences, 4);
  assert.equal(s.seen, "terlindungi \u00d72, terenkripsi (rejected) \u00d71, terproteksi (rejected) \u00d71");
  assert.equal(ev.get("mining").occurrences, 0, "'determining' is not 'mining'");
});

// ---- the CLIs ------------------------------------------------------------------

test("CLI: validate.mjs passes on the committed files", () => {
  const out = execFileSync("node", [here("../validate.mjs").pathname], { encoding: "utf8" });
  assert.match(out, /glossary OK/);
});

test("CLI: review-kit.mjs exports the pages kit", () => {
  const out = execFileSync("node", [here("../review-kit.mjs").pathname, "export", "id", "--kit", "pages", "--no-evidence"], { encoding: "utf8" });
  assert.match(out, new RegExp(`\\(\`terms\`: ${TERMS_EN.terms.filter((t) => t.applies_to !== "ui").length} rows\\)`));
  assert.match(out, /\| \d+ \| mining \| mining \| .* \| penambangan \|/);
});

test("export: native instructions come first, the English ones (with the Notes column) always follow", () => {
  const en = { navigation: { a: "Wallets" } };
  const loc = { navigation: { a: "Dompet" } };
  const args = { glossary: ID, termsEn: TERMS_EN, kit: "all", dict: loc, enDict: en, preserveVerbatim: PV, brands: BRANDS };
  const plain = exportKit(args);
  assert.match(plain, /\*\*Notes column \(important\):\*\*/);
  assert.doesNotMatch(plain, /Machine-translated/);
  const native = exportKit({ ...args, instructions: { text: "**Cara mengisi**\n- isi kolom", machine: true } });
  const iNative = native.indexOf("**Cara mengisi**"), iEn = native.indexOf("**How to fill in**");
  assert.ok(iNative > 0 && iEn > iNative, "native text above the English");
  assert.match(native, /Machine-translated/);
  // The tables are identical: the importer still finds every row.
  const tables = (md) => md.split("\n").filter((l) => l.startsWith("|")).join("\n");
  assert.equal(tables(native), tables(plain));
});
test("review-instructions.json: every entry has text and a boolean machine flag, and keeps the importer's keywords", () => {
  const data = JSON.parse(readFileSync(new URL("../review-instructions.json", import.meta.url), "utf8"));
  for (const [l, v] of Object.entries(data.languages)) {
    assert.equal(typeof v.text, "string", l);
    assert.equal(typeof v.machine, "boolean", l);
    for (const kw of ["`OK`", "`keep English`", "ID", "Notes", "\u2705"]) assert.ok(v.text.includes(kw), `${l} lacks ${kw}`);
  }
});
