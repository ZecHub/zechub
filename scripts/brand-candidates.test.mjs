// Regression suite for brand-candidates.mjs.
//
// Two kinds of case. HITS are names that reached main (or an open PR)
// unprotected and were found only after an engine translated them; each must
// be reported from the English alone. MISSES are the noise the first version
// reported on the 47 PRs open on 2026-09-29; each must stay quiet, because a
// comment full of "Investments" and "valueBalance" teaches contributors to
// ignore it.
//
// Run: node scripts/brand-candidates.test.mjs
import { findCandidates, makeProtection, corpusCase, parseAddedLines, stripNoise } from "./brand-candidates.mjs";

let failed = 0, total = 0;
const fail = (name, want, got) => { failed++; console.log(`  FAIL ${name}\n       want ${want}\n       got  ${got}`); };

// A small corpus standing in for the English wiki: it teaches the detector
// which capitalised words are ordinary ("light", "shield", "investments").
const CORPUS = [
  "the light client and a shield of privacy. We shield funds. light wallets help.",
  "Grayscale Investments filed. investments in privacy. The protocol buffers data.",
  "works as expected; set the path; the fund pays; a unified address.",
];
const stats = corpusCase(CORPUS);
const protection = makeProtection({
  terms: ["Firn", "Zcash", "Ledger", "zebrad", "Zingo!", "sETH", "Near Intents", "BTCPay Server", "NEAR Intents", "zk-SNARK", "zk-SNARKs", "Electric Coin Company"],
  equivalentForms: [["zk-SNARK", "zk-SNARKs"]],
  ignore: ["Rust"],
});
const run = (md) => findCandidates(md.split("\n").map((text, i) => ({ n: i + 1, text })), { protection, stats });
const terms = (md) => run(md).map((c) => c.term);

const hits = [
  // [name, markdown, expected term, expected signal]
  ["link naming its host (#2247)",      "### [SwissBorg](https://swissborg.com)", "SwissBorg", "link"],
  ["link + logo (#2253)",               "## [Nullmask](https://nullmask.io)", "Nullmask", "link"],
  ["archive.org link unwrapped (#2095)", "**[Light Shield](https://web.archive.org/web/20250823165939/https://shield.lightprotocol.com/)**: Light is a layer 2.", "Light Shield", "link"],
  ["generic word after the name (#2117)", "- [HeyGen Labs](https://heygen.com/video-translate) video tool", "HeyGen Labs", "link"],
  ["internal capital (#2176)",          "# Kestrel and ZecAuth: local fiat", "ZecAuth", "internal-capital"],
  ["internal capital in a heading (#2173)", "### FlyPool (offline)", "FlyPool", "internal-capital"],
  ["all-caps ticker (#2261)",           "The fund trades under the ticker ZCSH today.", "ZCSH", "all-caps"],
  ["all-caps company (#1933)",          "Zcash payment integration for TEKCE real estate", "TEKCE", "all-caps"],
  ["letter+digit",                      "Pay with Free2Z tips.", "Free2Z", "letter-digit"],
  ["proper noun, repeated (#2245)",     "Move ZEC from Solana to Zcash.\nThe bridge on Solana is slow.", "Solana", "proper"],
  ["proper noun in a new product (#2250)", "Servers include the new Ztreamer indexer.\nRun the Ztreamer binary.", "Ztreamer", "proper"],
  ["case variant of a protected name (#2095)", "To use FIRN, deposit ETH.", "FIRN", "variant"],
  ["spacing variant of a protected name", "Install BTCPayServer first.", "BTCPayServer", "variant"],
  ["compound suffix stripped (#2176)",  "A KuvarSend-supported corridor.", "KuvarSend", "internal-capital"],
];
for (const [name, md, term, signal] of hits) {
  total++;
  const c = run(md).find((x) => x.term === term);
  if (!c) fail(`hit: ${name}`, term, JSON.stringify(terms(md)));
  else if (!c.signals.includes(signal)) fail(`hit: ${name} (signal)`, signal, c.signals.join(","));
}

const misses = [
  // [name, markdown, term that must NOT be reported]
  ["protected name",                   "Firn is the first platform. [Firn](https://firn.cash)", "Firn"],
  ["protected name + generic word",    "**[Firn Protocol](https://app.firn.cash/)**: private", "Firn Protocol"],
  ["name only inside a URL (#2083)",   "> git clone https://code.vergara.tech/Vergara_Tech/zcash-haskell.git", "zcash-haskell"],
  ["name only inside inline code",     "Run `ZecAuthServer --help` now.", "ZecAuthServer"],
  ["name only inside fenced code",     "```\nKestrelDaemon start\n```", "KestrelDaemon"],
  ["later word of an organisation name", "They met with Grayscale Investments yesterday and Grayscale Investments agreed.", "Investments"],
  ["ordinary word (corpus says so)",   "The Light client uses a Shield icon.\nThe Light client again.", "Light"],
  ["ALL-CAPS emphasis",                "This WORKS only on the testnet.", "WORKS"],
  ["vocabulary acronym",               "Read ZIP 317 and the API docs.", "API"],
  ["cryptographic identifier",         "Hashes use BLAKE2b and Bech32m encoding with Groth16.", "BLAKE2b"],
  ["code identifier, lower-case camel (#2245)", "The valueBalance field changes.", "valueBalance"],
  ["short mixed-case id (#2245)",      "Address t1AjLkx9 and AjLkx again.", "AjLkx"],
  ["username with a digit (#2154)",    "Thanks to distractedm1nd for the review.", "distractedm1nd"],
  ["file name (#2248)",                "Write tampered.sha256 next to it.", "tampered.sha256"],
  ["decided not a brand (ignore list)", "Written in Rust.\nRust is fast.", "Rust"],
  ["equivalent form",                  "A zk-SNARKs proof.", "zk-SNARKs"],
  ["translated link text",             "[купить на Gemini](https://gemini.com)", "купить на Gemini"],
  ["one-off capitalised word",         "It was Deferred until later.", "Deferred"],
  ["lower-case form of a protected brand is a noun", "Record it in the ledger.", "ledger"],
  ["sentence-start capital of a lower-case name", "Zebrad syncs the chain.", "Zebrad"],
];
for (const [name, md, term] of misses) {
  total++;
  if (terms(md).includes(term)) fail(`miss: ${name}`, `no "${term}"`, JSON.stringify(terms(md)));
}

// ---- adversarial pass, 2026-09-29: each case reproduced a defect ----------
// As in real use, the corpus includes the text being judged.
const CORPUS2 = [...CORPUS, "the forum and the grants page. a forum again, grants again. the merge request.",
  "we met Grayscale people. talk to Grayscale soon.", "It is like Grayscale here."];
const stats2 = corpusCase(CORPUS2);
const run2 = (md, opts = {}) => findCandidates(md.split("\n").map((text, i) => ({ n: i + 1, text })), { protection, stats: stats2, ...opts }).map((c) => c.term);
const has = (name, got, term) => { total++; if (!got.includes(term)) fail(`adv hit: ${name}`, term, JSON.stringify(got)); };
const hasNot = (name, got, term) => { total++; if (got.includes(term)) fail(`adv miss: ${name}`, `no "${term}"`, JSON.stringify(got)); };

hasNot("a protected name with punctuation is not its own variant (Zingo!)", run2("Download Zingo! today.\nThen open Zingo! again."), "Zingo");
hasNot("a person's name is not a variant of an oddly cased term (Seth/sETH)", run2("Ask Seth about it."), "Seth");
has("an ALL-CAPS variant of a protected name", run2("Buy a LEDGER device."), "LEDGER");
has("a multi-word variant (case)", run2("Install BTCPay server first."), "BTCPay server");
has("a multi-word variant (Near Intents vs near intents is a noun; NEAR INTENTS is not)", run2("Use NEAR INTENTS here."), "NEAR INTENTS");
has("a capitalised lower-case name mid-sentence is a variant", run2("Then run Zebrad."), "Zebrad");
hasNot("…but not at a sentence start", run2("Zebrad syncs the chain."), "Zebrad");
hasNot("a lone ordinary word as link text (forum)", run2("[forum](https://forum.zcashcommunity.com/t/123)"), "forum");
hasNot("a capitalised ordinary word as link text (Grants)", run2("[Grants](https://zcashgrants.org)"), "Grants");
has("a link whose FIRST word names the host (Clipdrop)", run2("- [Clipdrop by stability.ai](https://clipdrop.co/stable-diffusion)"), "Clipdrop");
has("a link with a title", run2('[Qortal](https://qortal.org "Qortal")'), "Qortal");
has("a reference-style link", run2("See [Qortal][q].\n\n[q]: https://qortal.org"), "Qortal");
has("an HTML anchor", run2('<a href="https://qortal.org">Qortal</a>'), "Qortal");
has("an angle-bracketed link target", run2("[Qortal](<https://qortal.org>)"), "Qortal");
hasNot("leading 'the' is not part of the name", run2("[the Qortal app](https://qortal.org)"), "the Qortal app");
has("…the name itself is reported", run2("[the Qortal app](https://qortal.org)"), "Qortal app");
// Known miss, by decision: one mention with no link, shape or repeat is not
// enough (the single-mention rule added Delaware, York, Jane… on real PRs).
hasNot("a single bare mention is not enough (documented miss)", run2("You can pay with Kestrel on mobile."), "Kestrel");
has("…but a second mention is", run2("You can pay with Kestrel on mobile.\nThen open Kestrel again."), "Kestrel");
hasNot("a known word mentioned once mid-sentence is not enough", run2("It is like Grayscale here."), "Grayscale");
hasNot("a country is not a brand", run2("Users in Brazil pay.\nMore users in Brazil."), "Brazil");
hasNot("the first word of 'United States' is not a brand", run2("Users in the United States pay.\nAnd the United States again."), "United");
hasNot("image alt text is a label, not prose", run2("![Video Thumbnail](/x.png)\n![Video Thumbnail](/y.png)"), "Thumbnail");
hasNot("REST is an acronym", run2("A REST API and a REST endpoint."), "REST");
has("the FIRST word of a Title-Case run is the name", run2("They hired Zellic Partners today.\nThen Zellic Partners again."), "Zellic");
hasNot("a heading written as prose is not evidence", run2("## How the Wallet Works\n## How the Wallet Works"), "Wallet");
{ const got = run2("See [docs](ZecAuthDaemon) and [more](ZecAuthDaemon)."); total++;
  if (got.some((t) => t.includes("ZecAuthDaemon"))) fail("adv miss: a relative link target is not prose", "nothing named ZecAuthDaemon", JSON.stringify(got)); }
{ const got = run2("Open ZecAuthDaemon.md and TomoChain.png, then ZecAuthDaemon.md."); total++;
  if (got.some((t) => /\.(md|png)$/.test(t))) fail("adv miss: a file name is not a brand", "no *.md / *.png", JSON.stringify(got)); }
hasNot("headings are not evidence for a proper noun", run2("## Getting Started With Things\n## Getting Started With Things"), "Getting");

// code the first version saw as prose
hasNot("indented code block", run2("Text.\n\n    ZecAuthd --rpc"), "ZecAuthd");
hasNot("nested fences", run2("````\n```\nZecAuthd\n```\n````"), "ZecAuthd");
hasNot("a fence opened inside a list item", run2("- ```js\n  ZecAuthd\n  ```"), "ZecAuthd");
hasNot("double-backtick inline code", run2("Run ``ZecAuthd `x` `` now."), "ZecAuthd");
hasNot("a multi-line HTML comment", run2("<!--\nZecAuthd\n-->"), "ZecAuthd");
has("a '<' in prose does not swallow the line", run2("if fees < 5 use ZecAuth > otherwise"), "ZecAuth");

// fence state comes from the whole file, not the added lines
const FILE = "# P\n\n```bash\nZecAuthd --rpc-bind 0.0.0.0\n```\n\nPay with ZecAuth, then open ZecAuth again.\n";
const pick = (ns) => ns.map((n) => ({ n, text: FILE.split("\n")[n - 1] }));
total++; { const got = findCandidates(pick([4]), { protection, stats: stats2, fullText: FILE }).map((c) => c.term);
  if (got.includes("ZecAuthd")) fail("adv: an added line inside an existing code block is code", "[]", JSON.stringify(got)); }
total++; { const got = findCandidates(pick([3, 7]), { protection, stats: stats2, fullText: FILE }).map((c) => c.term);
  if (!got.includes("ZecAuth")) fail("adv: an edited fence opener does not hide what follows", "ZecAuth", JSON.stringify(got)); }

// diff parsing
const DIFF = [
  'diff --git "a/site/café.md" "b/site/café.md"', "--- a/site/café.md", "+++ b/site/café.md", "@@ -0,0 +1,2 @@", "+Line with ZecAuth", "+++ plus line with KestrelPay",
  "diff --git a/site/sp ace.md b/site/sp ace.md", "--- a/site/sp ace.md\t", "+++ b/site/sp ace.md\t", "@@ -1 +1 @@", "-old", "+new ZecAuth\r",
  "diff --git a/site/zechubglobal/x.md b/site/zechubglobal/x.md", "--- a/site/zechubglobal/x.md", "+++ b/site/zechubglobal/x.md", "@@ -0,0 +1 @@", "+skipped",
  "diff --git a/site/new.md b/site/new.md", "new file mode 100644", "--- /dev/null", "+++ b/site/new.md", "@@ -0,0 +1 @@", "+first",
].join("\n");
const files = parseAddedLines(DIFF);
const expect = (name, ok, got) => { total++; if (!ok) fail(`diff: ${name}`, "true", JSON.stringify(got)); };
expect("a non-ASCII path is kept", files.has("site/café.md"), [...files.keys()]);
expect("an added '++ ' line is a line, not a header", (files.get("site/café.md") ?? []).some((l) => l.text === "++ plus line with KestrelPay"), files.get("site/café.md"));
expect("a path with a space (tab-terminated header) is kept", files.has("site/sp ace.md"), [...files.keys()]);
expect("CRLF is stripped", (files.get("site/sp ace.md") ?? [])[0]?.text === "new ZecAuth", files.get("site/sp ace.md"));
expect("line numbers follow the hunk", (files.get("site/sp ace.md") ?? [])[0]?.n === 1 && files.get("site/café.md")?.[1]?.n === 2, [...files.values()]);
expect("zechubglobal is excluded", !files.has("site/zechubglobal/x.md"), [...files.keys()]);
expect("a new file is read", files.get("site/new.md")?.[0]?.text === "first", files.get("site/new.md"));
total++; if (stripNoise("x < ".repeat(5000) + "ZecAuth")[0].includes("ZecAuth") !== true) fail("stripNoise: many '<' keep the text", "kept", "lost");

{ const P2 = makeProtection({ terms: ["zk-SNARKs", "ZK-SNARKs"] }); total++;
  const got = findCandidates([{ n: 1, text: "A zk-SNARKs and a ZK-SNARKs proof." }], { protection: P2, stats: stats2 }).map((c) => c.term);
  if (got.length) fail("adv miss: a spelling that is itself protected is not a variant of another", "[]", JSON.stringify(got)); }

// ---- phrases are not transitive (#2309, 2026-10-05) ------------------------
// A protected phrase protects only itself. Its words written alone, and its
// leading part written without the rest, reach the engines unprotected.
{ const P3 = makeProtection({ terms: ["NEAR Intents", "Coinbase", "Coinbase Custody Trust Company", "Halo",
    "Bank of New York Mellon", "Grayscale Zcash Trust", "Zcash", "Zcash Foundation", "Zcash Foundation of Canada"] });
  // as in the real wiki, the corpus writes "near" as an ordinary word
  const stats3 = corpusCase([...CORPUS2, "the swap is near done. near the end. a node near you."]);
  const run3 = (md) => findCandidates(md.split("\n").map((text, i) => ({ n: i + 1, text })), { protection: P3, stats: stats3 });
  const t3 = (md) => run3(md).map((c) => c.term);
  has("a bare word of a protected phrase (NEAR of NEAR Intents)", t3("Swap ZEC to SOL with NEAR in one step."), "NEAR");
  { total++; const c = run3("Bridged over NEAR today.").find((x) => x.term === "NEAR");
    if (c?.partOf !== "NEAR Intents") fail("adv: a fragment names its phrase", "NEAR Intents", JSON.stringify(c)); }
  { total++; const c = run3("NEAR settles the swap.").find((x) => x.term === "NEAR");
    if (!c?.signals.includes("fragment")) fail("adv: …at a sentence start too, as a fragment (its spelling marks it, though the corpus knows 'near')", "fragment", JSON.stringify(c)); }
  hasNot("…but not when the whole phrase is written", t3("Use NEAR Intents for the swap.\nNEAR Intents again."), "NEAR");
  hasNot("…nor the ordinary word in lower case", t3("The wallet is near the top of the list."), "near");
  hasNot("…nor its Title-Case form opening a sentence", t3("Near the end, pay."), "Near");
  has("a leading part of a protected phrase (Coinbase Custody)", t3("Assets sit with Coinbase Custody in cold storage."), "Coinbase Custody");
  { total++; const c = run3("Held by Coinbase Custody.").find((x) => x.term === "Coinbase Custody");
    if (c?.partOf !== "Coinbase Custody Trust Company") fail("adv: a truncation names its phrase", "Coinbase Custody Trust Company", JSON.stringify(c)); }
  hasNot("…but not inside the whole phrase", t3("Held by Coinbase Custody Trust Company, the custodian."), "Coinbase Custody");
  hasNot("…nor the protected shorter name alone", t3("Buy on Coinbase.\nThen Coinbase again."), "Coinbase");
  hasNot("a Title-Case word of a phrase is not a fragment (Grayscale of Grayscale Zcash Trust)", t3("We met Grayscale people today."), "Grayscale");
  hasNot("an inflected phrase is the phrase, not a truncation (Full Viewing Keys)", findCandidates([{ n: 1, text: "Share your Full Viewing Keys." }], { protection: makeProtection({ terms: ["Full Viewing Key"] }), stats: stats3 }).map((c) => c.term), "Full Viewing");
  hasNot("an abbreviated phrase is the phrase (Electric Coin Co.)", findCandidates([{ n: 1, text: "Built by the Electric Coin Co. team." }], { protection: makeProtection({ terms: ["Electric Coin Company"] }), stats: stats3 }).map((c) => c.term), "Electric Coin");
  hasNot("…nor the start of one protected phrase inside ANOTHER protected phrase", findCandidates([{ n: 1, text: "Post it on the Zcash Community Forum." }], { protection: makeProtection({ terms: ["Zcash Community Grants", "Zcash Community Forum"] }), stats: stats3 }).map((c) => c.term), "Zcash Community");
  hasNot("an ignored word is not a fragment (NEAR on the ignore list)", findCandidates([{ n: 1, text: "Bridge with NEAR today." }], { protection: makeProtection({ terms: ["NEAR Intents"], ignore: ["NEAR"] }), stats: stats3 }).map((c) => c.term), "NEAR");
  hasNot("an ignored phrase is not a truncation (Zcash Community)", findCandidates([{ n: 1, text: "Ask the Zcash Community on the forum." }], { protection: makeProtection({ terms: ["Zcash Community Grants"], ignore: ["Zcash Community"] }), stats: stats3 }).map((c) => c.term), "Zcash Community");
  hasNot("a truncation ending on a stop word is not a name (Bank of New)", t3("The Bank of New Haven lends."), "Bank of New");
  hasNot("a truncation ending on a stop word is not a name (Zcash Foundation of)", t3("Grants from the Zcash Foundation of course help."), "Zcash Foundation of");
  hasNot("a shorter entry covers a version after it (Halo 2)", t3("Read about [Halo 2](https://halo2.dev) and Halo 2 again."), "Halo 2");
  hasNot("…and a link labelled with it", t3("- [Halo 2](https://zcash.github.io/halo2/)"), "Halo 2");
  hasNot("Zcash of Zcash Foundation is itself protected, so it is no fragment", t3("Zcash grows; the Zcash Foundation funds it."), "Zcash"); }
console.log(failed ? `${failed}/${total} failing` : `all ${total} cases correct`);
process.exit(failed ? 1 : 0);
