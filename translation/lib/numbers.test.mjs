import { strict as assert } from "node:assert";
import { test } from "node:test";

import {
  asciiDigits, compare, introduced, normaliseNumber, numberDelta, numbers, proseLines,
} from "./numbers.mjs";

const errors = (en, tr, opts) => compare(en, tr, opts).filter((f) => f.severity === "error");
const values = (fs) => fs.map((f) => `${f.kind}:${f.value}`).sort();
const nums = (s) => numbers(proseLines(s, [], { keepInlineCode: true })).map((n) => n.value);

// ---- the three real defects, as minimal pages ------------------------------

test("Gemma: digits fused with letters the English never had", () => {
  const en = "# ZIPs\n\nSee ZIP 316 and ZIP 225 for details. Released in November 2025.\n";
  const tr = "# ZIP\n\nLihat ZIP 3alli 326 dan ZIP 2emma untuk detail. Dirilis pada November 202kan.\n";
  const got = values(errors(en, tr, { locale: "id" }));
  for (const t of ["3alli", "2emma", "202kan"]) assert.ok(got.includes(`digit-token:${t}`), `${t} in ${got}`);
  // ...and the number rule sees the same damage independently
  assert.ok(got.includes("number-missing:316"));
  assert.ok(got.includes("number-missing:2025"));
  assert.ok(got.includes("number-added:202"));
});

test("a changed block height is a missing and an added number", () => {
  const en = "Ironwood activated at block 3,428,143 on 28 July 2026.\n";
  const tr = "Ironwood wurde am 28. Juli 2026 bei Block 3.248.143 aktiviert.\n";
  assert.deepEqual(values(errors(en, tr, { locale: "de" })),
    ["number-added:3248143", "number-missing:3428143"]);
});

test("Google Translate Yoruba: a date and a time written as (wrong) words", () => {
  const en = "The poll closes on August 24, 2026, 19:00 UTC.\n";
  const tr = "Ìdìbò náà yóò parí ní ọjọ́ kẹrìndínlógún oṣù kẹjọ, 2026, ní agogo mọ́kàndínlógún òwúrọ̀ UTC.\n";
  const fs = compare(en, tr, { locale: "yo" });
  assert.deepEqual(values(fs.filter((f) => f.severity === "error")),
    ["number-missing:19", "number-missing:24"]);
  // ":00" is a small number: reported, but advisory
  assert.ok(fs.some((f) => f.kind === "number-missing" && f.value === "0" && f.severity === "warning"));
  assert.equal(fs.find((f) => f.value === "24").lines[0], 1);
});

// ---- locale conventions that must stay silent --------------------------------

test("a date in each locale's own format matches the English", () => {
  const en = "Zcash launched on October 28, 2016 at 19:00 UTC.\n";
  for (const [loc, tr] of [
    ["de", "Zcash startete am 28. Oktober 2016 um 19:00 UTC.\n"],
    ["fr", "Zcash a été lancé le 28 octobre 2016 à 19 h 00 UTC.\n"],
    ["ja", "Zcashは2016年10月28日19:00 UTCに開始されました。\n"],
    ["ko", "Zcash는 2016년 10월 28일 19:00 UTC에 출시되었습니다.\n"],
    ["ru", "Zcash был запущен 28.10.2016 в 19:00 UTC.\n"],
    ["tr", "Zcash, 28 Ekim 2016'da 19:00 UTC'de başlatıldı.\n"],
  ]) assert.deepEqual(errors(en, tr, { locale: loc }), [], loc);
});

test("thousands and decimal separators in every convention", () => {
  const en = "Supply is 21,000,000 ZEC and the fee is 0.0001 ZEC; 1,234.5 in total.\n";
  for (const tr of [
    "Angebot 21.000.000 ZEC, Gebühr 0,0001 ZEC; insgesamt 1.234,5.\n",
    "Offre 21 000 000 ZEC, frais 0,0001 ZEC ; 1 234,5 au total.\n",
    "Offre 21\u202F000\u202F000 ZEC, frais 0,0001 ZEC ; 1\u00A0234,5 au total.\n",
    "Angebot 21'000'000 ZEC, Gebühr 0.0001 ZEC; 1'234.5 total.\n",
    "आपूर्ति 2,10,00,000 ZEC है, शुल्क 0.0001 ZEC; कुल 1,234.5।\n",
    "العرض ٢١٬٠٠٠٬٠٠٠ ZEC والرسوم ٠٫٠٠٠١ ZEC؛ ١٬٢٣٤٫٥ إجمالاً.\n",
  ]) assert.deepEqual(errors(en, tr), [], tr);
});

test("myriad and magnitude words: 21 million, 2100万, 2,100만, 3億4000万", () => {
  assert.deepEqual(errors("There will only be 21 million ZEC.\n", "ZECの上限は2100万枚です。\n"), []);
  assert.deepEqual(errors("There will only be 21 million ZEC.\n", "ZEC는 2,100만 개뿐입니다.\n"), []);
  assert.deepEqual(errors("About 340 million FOX were airdropped.\n", "約3億4000万枚のFOXが配布されました。\n"), []);
  assert.deepEqual(errors("About 340 million FOX were airdropped.\n", "약 3억 4천만 개의 FOX가 배포되었습니다.\n"), []);
  // Not even a warning: 5万 pairs with $50,000 and 500万 with $5M, not 5 with 5.
  assert.deepEqual(compare("It allocated $50,000 and $5M.\n", "5万ドルと500万ドルを割り当てました。\n"), []);
  // ...but a wrong magnitude is still caught
  assert.ok(errors("There will only be 21 million ZEC.\n", "ZECの上限は2000万枚です。\n").length > 0);
});

test("ordinals, spelled-out words, months, 12-hour times and '23", () => {
  assert.deepEqual(errors("Blossom was the 3rd network upgrade.\n", "Blossom war das dritte Netzwerk-Upgrade.\n"), []);
  assert.deepEqual(errors("One of the twenty five million.\n", "2500万のうちの1つ。\n"), []);
  assert.deepEqual(errors("Closes October 12, 2025, 11:59 PM UTC.\n", "Chiude il 12/10/2025 alle 23:59 UTC.\n"), []);
  assert.deepEqual(errors("[ECC report for Q4 '23](https://x.test/q4-2023/)\n", "[ECC 2023年第4四半期レポート](https://x.test/q4-2023/)\n"), []);
  assert.deepEqual(errors("A quarter of all tweets.\n", "전체 트윗의 25%.\n"), []);
});

test("German and Indonesian ordinals, French 1er, Spanish 1.º are not digit tokens", () => {
  const en = "The 1st and 2nd steps.\n";
  for (const [loc, tr] of [["de", "Der 1. und 2. Schritt.\n"], ["fr", "Le 1er et le 2e pas.\n"],
                           ["es", "El 1.º y 2.º paso.\n"], ["id", "Langkah ke-1 dan ke-2.\n"],
                           ["tr", "1inci ve 2nci adım.\n"]])
    assert.deepEqual(errors(en, tr, { locale: loc }).filter((f) => f.kind === "digit-token"), [], loc);
});

test("CJK and Korean particles glued to a name are not digit tokens", () => {
  const en = "Groth16 and Zcon4 and Web3.\n";
  assert.deepEqual(errors(en, "Groth16証明とZcon4의 Web3에서.\n", { locale: "ja" }), []);
});

test("a dropped space is not a digit token, a translated name is", () => {
  const en = "ZIP 227 needs ZIP 226. Pool: [2Miners](https://2miners.com). Encoding: Base58.\n";
  const got = values(errors(en, "ZIP227 inahitaji ZIP 226. Pool: [2Atuo](https://2miners.com). Msingi58.\n", { locale: "sw" }));
  assert.deepEqual(got.filter((v) => v.startsWith("digit")), ["digit-token:2Atuo", "digit-token:Msingi58"]);
});

test("a footnote glued to a word in the English may stay glued", () => {
  assert.deepEqual(errors("It keeps the network's integrity2.\n", "Es wahrt die Integrität des Netzwerks wahren2.\n"), []);
});

test("a damaged hash or address is caught even with no fused word", () => {
  const h = "c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c";
  // only a digit changes, so every letter run is still an English one
  const bad = h.replace("fab91", "fab92");
  const got = values(errors(`Bitcoin: ${h}\n`, `Bitcoin: ${bad}\n`).filter((f) => f.kind === "digit-token"));
  assert.deepEqual(got, [`digit-token:${bad}`]);
});

// ---- what is not prose ----------------------------------------------------------

test("code, URLs, link targets, HTML attributes, images and protected names are masked", () => {
  const en = [
    "Run `zcashd -rpcport=8232` or see [docs](https://x.test/v5.0.1/page#h2) and [ZIP](/zips/zip-317).",
    "<img src=\"a/img-223.png\" width=\"640\"> ![image223](/content-images/image-223.webp)",
    "```", "height 3428143", "```", "Use NU6.1 now.", "__http://127.0.0.1:8233/status__",
  ].join("\n");
  const tr = [
    "Führe `zcashd -rpcport=8232` aus oder siehe [Doku](https://x.test/v5.0.2/seite#h3) und [ZIP](/zips/zip-318).",
    "<img src=\"b/img-999.png\" width=\"800\"> ![bild223](/content-images/image-224.webp)",
    "```", "Höhe 1", "```", "Nutze jetzt NU6.1.", "__ .http://127.0.0.1:8233/status__",
  ].join("\n");
  assert.deepEqual(compare(en, tr, { protectedTerms: ["NU6.1"] }), []);
});

test("a protected name is the protected-terms gate's business, not this one's", () => {
  // Dropping "NU6.1" is reported there; here it must not read as a lost 6.1.
  assert.deepEqual(compare("After NU6.1 activates.\n", "Nach der Aktivierung.\n", { protectedTerms: ["NU6.1"] }), []);
  assert.ok(errors("After NU6.1 activates.\n", "Nach der Aktivierung.\n").length > 0);
});

test("front matter is the frontmatter check's job, not this one's", () => {
  assert.deepEqual(nums("---\npublished: 2025-08-19\n---\n\nText 5.\n"), ["5"]);
});

test("ordered-list markers are not numbers", () => {
  assert.deepEqual(nums("1. one\n2. two\n10) ten\n"), []);
});

// ---- normalisation details --------------------------------------------------------

test("normaliseNumber", () => {
  assert.deepEqual(normaliseNumber("3,428,143"), ["3428143"]);
  assert.deepEqual(normaliseNumber("3.428.143"), ["3428143"]);
  assert.deepEqual(normaliseNumber("1,5"), ["1.5"]);
  assert.deepEqual(normaliseNumber("24.08.2026"), ["24", "8", "2026"]);
  assert.deepEqual(normaliseNumber("5.4.0"), ["5", "4", "0"]);
  assert.deepEqual(normaliseNumber("1,234.56"), ["1234.56"]);
  assert.deepEqual(normaliseNumber("1.234,56"), ["1234.56"]);
  assert.deepEqual(normaliseNumber("08"), ["8"]);
  assert.equal(asciiDigits("٢٠٢٦ २०२६ ２０２６"), "2026 2026 2026");
});

test("a German short date pairs with the English one", () => {
  const { missing, extra } = numberDelta(["Minutes 6-25"], ["Protokoll vom 25.6."]);
  assert.deepEqual([missing, extra], [[], []]);
});

// ---- severity ---------------------------------------------------------------------

test("small numbers and count-only differences are advisory", () => {
  const fs = compare("A 4-round network, open 24/7.\n", "Ein Netzwerk mit vier Runden, 24 Stunden am Tag, 7 Tage die Woche, 24/7.\n");
  assert.ok(fs.length > 0);
  assert.ok(fs.every((f) => f.severity === "warning"), JSON.stringify(fs));
});

test("an invented year is blocking", () => {
  const got = values(errors("Gemini supports shielded withdrawals.\n", "Gemini anabatala kemgbe afọ 2000.\n"));
  assert.deepEqual(got, ["number-added:2000"]);
});

test("introduced() subtracts what the base already had, by count", () => {
  const head = [{ kind: "number-missing", value: "24", count: 2 }, { kind: "digit-token", value: "2emma", count: 1 }];
  const base = [{ kind: "number-missing", value: "24", count: 1 }, { kind: "digit-token", value: "2emma", count: 1 }];
  assert.deepEqual(introduced(head, base), [{ kind: "number-missing", value: "24", count: 1 }]);
});

// ---- versions ----------------------------------------------------------------------

test("a changed version blocks, even when every digit is small", () => {
  for (const [en, tr, want] of [
    ["Install zcashd 1.2.3 first.\n", "Installiere zuerst zcashd 1.2.4.\n", ["version-added:1.2.4", "version-missing:1.2.3"]],
    ["Zallet v0.15.2 is out.\n", "Zallet v0.15.3 ist da.\n", ["version-added:0.15.3", "version-missing:0.15.2"]],
    ["Upgrade to version 2.1 now.\n", "Jetzt auf Version 2.2 aktualisieren.\n", ["version-missing:2.1"]],
    ["Zebra v5 supports it.\n", "Zebra v6 unterstützt es.\n", ["version-added:6", "version-missing:5"]],
    ["After NU6.3 activates.\n", "Nach der Aktivierung von NU6.4.\n", ["version-added:NU6.4", "version-missing:NU6.3"]],
    ["Install zcashd 1.2.3 first.\n", "Installiere zuerst zcashd.\n", ["version-missing:1.2.3"]],
  ]) {
    const got = values(errors(en, tr, { locale: "de" }).filter((f) => f.kind.startsWith("version")));
    assert.deepEqual(got, want, `${en} -> ${tr}`);
  }
});

test("a version kept verbatim, with or without its v, is fine", () => {
  assert.deepEqual(errors("Zallet v0.15.2 and zcashd 6.20.0.\n", "Zallet 0.15.2 und zcashd v6.20.0.\n", { locale: "de" }), []);
  assert.deepEqual(errors("Zallet v0.15.2.\n", "Zallet v0.15.2のリリース。\n", { locale: "ja" }), []);
});

test("thousands groups, dotted dates and ZIP numbers are not versions", () => {
  const en = "On August 24, 2026, 1,000,000 users read ZIP 317 and 3,428,143 blocks.\n";
  for (const [loc, tr] of [
    ["de", "Am 24.08.2026 lasen 1.000.000 Nutzer ZIP 317 und 3.428.143 Blöcke.\n"],
    ["es", "El 24.08.2026, 1.000.000 usuarios leyeron ZIP 317 y 3.428.143 bloques.\n"],
    ["id", "Pada 24.08.26, 1.000.000 pengguna membaca ZIP 317 dan 3.428.143 blok.\n"],
    ["tr", "2026.08.24 tarihinde 1.000.000 kullanıcı ZIP 317 ve 3.428.143 blok okudu.\n"],
  ]) assert.deepEqual(compare(en, tr, { locale: loc }).filter((f) => f.kind.startsWith("version")), [], loc);
});

// ---- times ---------------------------------------------------------------------------

test("a 24-hour time localised as a 12-hour one, and back, is not a number change", () => {
  assert.deepEqual(compare("The call starts at 19:00 UTC.\n", "The call starts at 7 PM UTC.\n"), []);
  assert.deepEqual(compare("The call starts at 7 PM UTC.\n", "Der Call beginnt um 19:00 UTC.\n"), []);
  assert.deepEqual(compare("Closes at 11:59 PM UTC.\n", "Chiude alle 23:59 UTC.\n"), []);
  for (const [loc, tr] of [
    ["ja", "通話は午後7時(UTC)に始まります。\n"], ["ko", "통화는 오후 7시 UTC에 시작됩니다.\n"],
    ["zh", "通话于UTC晚上7点开始。\n"], ["fr", "L'appel commence à 19 h 00 UTC.\n"],
    ["fr", "L'appel commence à 19h UTC.\n"], ["id", "Panggilan dimulai pukul 19.00 UTC.\n"],
    ["es", "La llamada empieza a las 7 p. m. UTC.\n"], ["ar", "تبدأ المكالمة الساعة ٧ مساءً UTC.\n"],
  ]) assert.deepEqual(compare("The call starts at 19:00 UTC.\n", tr, { locale: loc }), [], loc);
});

test("a wrong 12/24-hour conversion still fails", () => {
  assert.ok(values(errors("The call starts at 19:00 UTC.\n", "The call starts at 9 PM UTC.\n")).includes("number-missing:19"));
  assert.ok(values(errors("The call starts at 7 PM UTC.\n", "Der Call beginnt um 21:00 UTC.\n")).includes("number-added:21"));
  assert.ok(errors("The call starts at 19:00 UTC.\n", "通話は午後9時(UTC)に始まります。\n", { locale: "ja" }).length > 0);
  // AM vs PM is a different time
  assert.ok(errors("The call starts at 19:00 UTC.\n", "통화는 오전 7시 UTC에 시작됩니다.\n", { locale: "ko" }).length > 0);
});

test("video timestamps keep their seconds", () => {
  const { missing, extra } = numberDelta(["- 1:04:17 outro"], ["- 1:04:40 outro"]);
  assert.deepEqual([missing.map((m) => m.value), extra.map((x) => x.value)], [["17"], ["40"]]);
});

// ---- occurrence-aware base suppression --------------------------------------------------

test("an inherited token moved to another paragraph is new damage", () => {
  const en = "# ZIPs\n\nRead ZIP 225 first, before anything else.\n\nThen read ZIP 225 again.\n";
  const base = compare(en, "# ZIP\n\nBaca ZIP 2emma dulu sebelum lanjut.\n\nLalu baca ZIP 225 lagi.\n", { locale: "id" });
  const moved = compare(en, "# ZIP\n\nBaca ZIP 225 dulu sebelum lanjut.\n\nLalu baca ZIP 2emma lagi.\n", { locale: "id" });
  assert.deepEqual(values(introduced(moved, base).filter((f) => f.severity === "error")), ["digit-token:2emma"]);
  // ...but an edit elsewhere in the same paragraph keeps it inherited
  const edited = compare(en, "# ZIP\n\nPertama, baca ZIP 2emma dulu sebelum membaca yang lain.\n\nLalu baca ZIP 225 lagi.\n", { locale: "id" });
  assert.deepEqual(introduced(edited, base).filter((f) => f.kind === "digit-token"), []);
});

test("an inherited missing number that moves to another line is new", () => {
  const en = "Line A in 2025.\n\nLine B in 2025.\n";
  const base = compare(en, "Zeile A.\n\nZeile B in 2025.\n");
  const head = compare(en, "Zeile A in 2025.\n\nZeile B.\n");
  assert.deepEqual(values(introduced(head, base)), ["number-missing:2025"]);
  assert.deepEqual(introduced(base, base), []);
});
