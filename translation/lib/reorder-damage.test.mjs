// Unit tests for translation/lib/reorder-damage.mjs (ZecHub/zechub#2427).
// Run: node --test translation/lib/reorder-damage.test.mjs
import { strict as assert } from "node:assert";
import { test } from "node:test";

import { findReorderDamage, repairGluedNames, scanLinks, splitInherited, SPACED_SCRIPT } from "./reorder-damage.mjs";

const rules = (text, loc, en = "") => findReorderDamage(text, loc, en).map((f) => f.rule);
const keys = (text, loc, en = "") => findReorderDamage(text, loc, en).map((f) => `${f.rule}:${f.key}`);

// The lines the Greek reviewer reported, verbatim from main.
const EL_GLUE = [
  "Για πλήρη λίστα, δες [ZcashΠορτοφόλια του οικοσυστήματος](/using-zcash/wallets).",
  "Εκτέλεσέ τον αν χρειάζεσαι έναν κόμβο επικύρωσης. [ZebraΠλήρης κόμβος](/zcash-tech/zebra)",
  "Η διαδικασία κοινοτικής διακυβέρνησης. [ZIPΑποθετήριο](https://github.com/zcash/zips)",
  "Το πρότυπο υπογραφής είναι το [ZIP 304, SaplingΥπογραφές διευθύνσεων](https://zips.z.cash/zip-0304).",
];
const EL_ORPHAN = "Ο οδηγός ZecHubΠώς να κάνεις swap για ZEC στο πορτοφόλι Phantom](/using-zcash/solswap) του [ καλύπτει τις οθόνες του solswap.";
const EL_PADDED = "τροφοδοτεί την κανονική Zcashδιαδικασία διακυβέρνησης[ του ](../zcash-community/zcash-governance), αντί να την αντικαθιστά.";

test("every glued name the Greek review reported is caught", () => {
  for (const l of EL_GLUE) assert.deepEqual(rules(l, "el"), ["glued-name"], l);
});

test("both broken links from the Greek review are caught", () => {
  assert.ok(rules(EL_ORPHAN, "el").includes("orphan-link-close"));
  const r = rules(EL_PADDED, "el");
  assert.ok(r.includes("label-leading-space"), r.join());
  assert.ok(r.includes("glued-name"), r.join());       // «Zcashδιαδικασία» too
});

test("the same glue is caught in Cyrillic, Arabic and Devanagari", () => {
  assert.deepEqual(rules("См. [ZcashБиблиотеку](/glossary-and-faqs/zcash-library).", "ru"), ["glued-name"]);
  assert.deepEqual(rules("[Zakuraвузол](/zcash-tech/zakura-node)", "uk"), ["glued-name"]);
  assert.deepEqual(rules("يغطي [Zalletالمرجع السريع](/using-zcash/zallet)", "ar"), ["glued-name"]);
  assert.deepEqual(rules("ستجد مجمعات القيمZcash هنا", "ar"), ["glued-name"]);
  assert.deepEqual(rules("जब 21 millionवाँ ZEC माइन होगा", "hi"), ["glued-name"]);
});

test("a Latin letter inside a word of the locale's script is one finding", () => {
  // Homoglyph: a Latin "e" inside a Cyrillic word.
  assert.deepEqual(rules("**Межсетeвая конфиденциальность**", "ru"), ["glued-name"]);
});

test("names with a space, and normal mixed text, are clean", () => {
  for (const [l, loc] of [
    ["Για πλήρη λίστα, δες [Πορτοφόλια του οικοσυστήματος Zcash](/using-zcash/wallets).", "el"],
    ["[Zcash Πορτοφόλια](/x) και το Zcash-πορτοφόλι, 2ος γύρος", "el"],
    ["Сеть Zcash и кошелёк Zashi, Zcash-кошелёк.", "ru"],
    ["تتيح استطلاعات المجتمع وZecHub وA/V Club في Zcash", "ar"],
    ["متوافق بـZebra ولـFROST والـfinalizers وبالartifact وproxyات وdigestين", "ar"],
    ["Zcash के लिए wallet", "hi"],
  ]) assert.deepEqual(rules(l, loc), [], l);
});

test("CJK, Thai and Latin-script locales are never checked for glue", () => {
  for (const loc of ["ja", "zh", "ko", "th", "de", "ak"]) assert.equal(SPACED_SCRIPT[loc], undefined, loc);
  assert.deepEqual(rules("Zcashウォレットと Zcash钱包 と Zcash지갑", "ja"), []);
  assert.deepEqual(rules("Zcash钱包", "zh"), []);
  assert.deepEqual(rules("Zcash지갑", "ko"), []);
  // Akan writes Greek-looking ε/ͻ inside Latin words: orthography, not damage.
  assert.deepEqual(rules("Nkyerεkyerεmu a Ɛfata", "ak"), []);
});

test("code, link targets and bare URLs are not prose", () => {
  for (const l of [
    "Τρέξε `zcashdπαράμετρος` και δες",
    "```\nZcashΠορτοφόλια\n```",
    "[Βικιπαίδεια](https://el.wikipedia.org/wiki/ZcashΠορτοφόλια)",
    "Δες https://ru.wikipedia.org/wiki/ZcashБиблиотека εδώ",
    "<a href=\"https://x/ZcashΠ\">σύνδεσμος</a>",
  ]) assert.deepEqual(rules(l, l.includes("ru.") ? "ru" : "el"), [], l);
});

test("well-formed links are clean in every locale", () => {
  for (const l of [
    "[a](u) και [b](v)",
    "[![Edit Page](https://img.shields.io/badge/Edit-blue)](https://github.com/ZecHub/zechub/edit/main/x.md)",
    "[501(c)(3)](https://en.wikipedia.org/wiki/501(c)(3)_organization)",
    "[link [nested] text](u)",
    "Escaped \\](not a link) and \\[ too",
    "A [reference] and a [link](https://x/[weird]) here",
  ]) assert.deepEqual(rules(l, "de"), [], l);
});

test("an orphan close is caught in any locale, CJK included", () => {
  assert.deepEqual(rules("- 公式アップデート: Shielded Labs](https://shieldedlabs.net/crosslink/)", "ja"), ["orphan-link-close"]);
  assert.deepEqual(rules("- ](https://www.dash.org/news/x)Transaksi terlindungi[ — 4 Agustus 2026", "id"), ["orphan-link-close"]);
});

test("a label padded on the left is caught; an image or an all-blank label is not", () => {
  assert.deepEqual(rules("[ Labs auf X](https://x.com/zcashlabs)", "de"), ["label-leading-space"]);
  assert.deepEqual(rules("![ alt](/img.png)", "de"), []);
  assert.deepEqual(rules("[                   ](https://x)", "de"), []);
  assert.deepEqual(rules("[Labs ](https://x)", "de"), []);  // trailing space: cosmetic, not reordering
});

test("a shape the English page has itself is allowed, per target", () => {
  const en = "* [ 😎 #ZookoEnZcast We did it! 💪 - EP 004 ](https://www.youtube.com/watch?v=M5)\n";
  assert.deepEqual(rules("* [ 😎 #ZookoEnZcast Τα καταφέραμε! 💪 - EP 004 ](https://www.youtube.com/watch?v=M5)\n", "el", en), []);
  // A second padded label to another target is still new.
  assert.deepEqual(rules("* [ 😎 x ](https://www.youtube.com/watch?v=M5)\n[ του ](/gov)\n", "el", en), ["label-leading-space"]);
  // An English multi-line label leaves a "](" with no "[" on its line.
  const en2 = "[A long label\nthat wraps](https://x)\n";
  assert.deepEqual(rules("[Μια μεγάλη ετικέτα\nπου αναδιπλώνεται](https://x)\n", "el", en2), []);
});

test("scanLinks pairs brackets and skips link targets", () => {
  const { links, orphans } = scanLinks("a](u) [b](v(w)x) [c](y)");
  assert.equal(orphans.length, 1);
  assert.equal(orphans[0].target, "u");
  assert.deepEqual(links.map((l) => [l.label, l.target]), [["b", "v(w)x"], ["c", "y"]]);
  // A "[" inside a URL must not stand in for the opener a later link lost.
  assert.deepEqual(rules("[a](https://x/?ids[=1) and c](d)", "de"), ["orphan-link-close"]);
});

test("repair inserts the space after or before a protected name only", () => {
  const terms = ["Zcash", "Zebra", "ZIP", "ZecHub", "Sapling", "ZIP 304"];
  const { text, repaired } = repairGluedNames(`${EL_GLUE[0]}\n${EL_GLUE[1]}\n${EL_GLUE[2]}\n${EL_GLUE[3]}\nπύλη του προγράμματοςZcash εδώ`, "el", terms);
  assert.equal(text, [
    "Για πλήρη λίστα, δες [Zcash Πορτοφόλια του οικοσυστήματος](/using-zcash/wallets).",
    "Εκτέλεσέ τον αν χρειάζεσαι έναν κόμβο επικύρωσης. [Zebra Πλήρης κόμβος](/zcash-tech/zebra)",
    "Η διαδικασία κοινοτικής διακυβέρνησης. [ZIP Αποθετήριο](https://github.com/zcash/zips)",
    "Το πρότυπο υπογραφής είναι το [ZIP 304, Sapling Υπογραφές διευθύνσεων](https://zips.z.cash/zip-0304).",
    "πύλη του προγράμματος Zcash εδώ",
  ].join("\n"));
  assert.deepEqual(repaired.map((r) => r.word), ["Zcash", "Zebra", "ZIP", "Sapling", "Zcash"]);
  assert.deepEqual(rules(text, "el"), []);
});

test("repair leaves non-names, CJK, code and URLs alone", () => {
  const terms = ["Zcash"];
  for (const [l, loc] of [
    ["**Межсетeвая конфиденциальность**", "ru"],   // not a name: a space would make it worse
    ["Zcashウォレット", "ja"],
    ["`ZcashΠ` και [x](https://x/ZcashΠ)", "el"],
    ["Zcashless Πορτοφόλια", "el"],
  ]) {
    const r = repairGluedNames(l, loc, terms);
    assert.equal(r.text, l, l);
    assert.deepEqual(r.repaired, []);
  }
});

test("repair does not split an Arabic proclitic from its name", () => {
  const l = "متوافق بـZebra وZcash";
  assert.equal(repairGluedNames(l, "ar", ["Zebra", "Zcash"]).text, l);
  assert.equal(repairGluedNames("[Zebraعقدة كاملة](/x)", "ar", ["Zebra"]).text, "[Zebra عقدة كاملة](/x)");
});

test("splitInherited separates damage that was already there, as a multiset", () => {
  const a = { rule: "glued-name", key: "ZcashΠ" }, b = { rule: "orphan-link-close", key: "/u" };
  const { fresh, inherited } = splitInherited([a, a, b], [a]);
  assert.equal(inherited.length, 1);
  assert.deepEqual(fresh, [a, b]);
});

test("the same damage moved to another line is new, not inherited", () => {
  const base = findReorderDamage("Α\n\nΟ οδηγός Phantom](/u) του [ εδώ.\n\nΒ\n", "el");
  const head = findReorderDamage("Α\n\nΟ οδηγός Phantom καλύπτει.\n\nΒ, δες Phantom](/u) [ εδώ.\n", "el");
  const { fresh, inherited } = splitInherited(head, base);
  assert.equal(inherited.length, 0);
  assert.equal(fresh.length, 1);
  // Unchanged line, shifted down by an insertion above: still inherited.
  const shifted = findReorderDamage("Νέα γραμμή.\n\nΑ\n\nΟ οδηγός Phantom](/u) του [ εδώ.\n\nΒ\n", "el");
  assert.equal(splitInherited(shifted, base).fresh.length, 0);
});

test("names ending or starting in a digit or punctuation are caught and repaired", () => {
  const terms = ["NU5", "Zingo!", "1inch", "Zcash"];
  const keysOf = (t, loc = "el") => findReorderDamage(t, loc, "", terms).map((f) => `${f.rule}:${f.key}`);
  assert.deepEqual(keysOf("η NU5αναβάθμιση ήρθε"), ["glued-name:NU5αναβάθμιση"]);
  assert.deepEqual(keysOf("[Zingo!Πορτοφόλι](/x)"), ["glued-name:Zingo!Πορτοφόλι"]);
  assert.deepEqual(keysOf("μέσωZcash και μέσω1inch"), ["glued-name:μέσωZcash", "glued-name:μέσω1inch"]);
  assert.deepEqual(keysOf("η NU5 αναβάθμιση, το Zingo! πορτοφόλι, NU5-αναβάθμιση"), []);
  assert.deepEqual(keysOf("NU5αναβάθμιση", "ja"), []);
  const r = repairGluedNames("η NU5αναβάθμιση και [Zingo!Πορτοφόλι](/x) μέσω1inch", "el", terms);
  assert.equal(r.text, "η NU5 αναβάθμιση και [Zingo! Πορτοφόλι](/x) μέσω 1inch");
  assert.deepEqual(r.repaired.map((x) => x.word), ["NU5", "Zingo!", "1inch"]);
  // Arabic proclitics still attach to such names.
  assert.deepEqual(keysOf("وNU5 ولNU5", "ar"), []);
});

test("a link label the translation wraps over two lines is not an orphan", () => {
  assert.deepEqual(rules("Δες τον [οδηγό μετάβασης από zcashd\nσε Zebra](/x) για λεπτομέρειες.\n", "el", "See the [migration guide](/x).\n"), []);
  // A blank line or a new list item ends the label: the closer below is an orphan.
  assert.deepEqual(rules("Δες τον [οδηγό\n\nσε Zebra](/x).\n", "el"), ["orphan-link-close"]);
  assert.deepEqual(rules("- πρώτο [στοιχείο\n- δεύτερο](/x)\n", "el"), ["orphan-link-close"]);
});

test("a multi-line HTML comment is not prose", () => {
  assert.deepEqual(rules("<!--\nZcashΠορτοφόλια\nPhantom](/u)\n-->\nΚείμενο.\n", "el"), []);
  assert.deepEqual(rules("Κείμενο <!-- σχόλιο\nZcashΠ -->ZebraΠλήρης\n", "el"), ["glued-name"]);
});

test("Arabic contracted lil- (للZcash) is a proclitic", () => {
  assert.deepEqual(rules("هذا للZcash وللZebra", "ar"), []);
});
