// Every venue named on the exchange pages must be a protected term.
//
// The defect this exists to stop: none of the 33 venues on Custodial_Exchanges,
// DEX or Centralized_Swaps was in preserveVerbatim, so nothing stopped a
// machine engine translating the brand itself. In the five African locales it
// did — "LetsExchange" became "Ẹ jẹ́ kí a pààrọ̀" in Yoruba ("let us
// exchange"), "Ka anyị Gbanwee" in Igbo. 109 headings across three pages.
//
// Nothing caught it. The passthrough gate cannot: a translated brand makes the
// page LESS English, not more. The structure gate compares link sets, and these
// headings carry no links. The terms gate had nothing to enforce, because the
// brands were never on the list. The only signal was the wiki's exchange pages
// quietly falling back to a hardcoded English list, because they build cards by
// matching `###` headings and a translated heading is a venue that no longer
// exists.
//
// So the check is on the DATA, not on a page: if a venue is listed, it must be
// protected. That makes the terms gate able to defend it on every future run.
//
// Run: node scripts/check-venue-brands.test.mjs

import { readFileSync } from "node:fs";

const PAGES = [
  "site/Using_Zcash/Custodial_Exchanges.md",
  "site/Using_Zcash/DEX.md",
  "site/Using_Zcash/Centralized_Swaps.md",
];

// Venues deliberately left unprotected, with the reason. A term here is a
// decision, not an oversight — state it so nobody "fixes" it later.
const EXEMPT = new Map([
  [
    "Peer",
    "matches inside 'Peer-to-Peer Network'. check-protected-terms matches " +
      "case-sensitively on word boundaries and a hyphen IS a boundary, so " +
      "protecting it would block ordinary prose every locale should translate.",
  ],
]);

let failed = 0;
const fail = (msg) => {
  failed++;
  console.log(`  FAIL ${msg}`);
};

const terms = new Set(
  JSON.parse(readFileSync("translation/protected-terms.json", "utf8")).preserveVerbatim,
);

// The venue name is the `###` heading, either "### Name" or "### [Name](url)".
const venueNames = () => {
  const out = [];
  for (const page of PAGES) {
    const text = readFileSync(page, "utf8");
    for (const line of text.split("\n")) {
      const m = line.match(/^\s{0,3}#{3}\s+(.+?)\s*$/);
      if (!m) continue;
      const linked = m[1].match(/^\[([^\]]+)\]\([^)]+\)/);
      const name = (linked ? linked[1] : m[1]).trim();
      if (name) out.push({ name, page });
    }
  }
  return out;
};

const venues = venueNames();

if (venues.length < 30) {
  // Guards the test itself: if the heading shape changes and this stops finding
  // venues, it would pass vacuously and protect nothing.
  fail(`only ${venues.length} venue headings found across ${PAGES.length} pages — the parser is probably wrong, not the data`);
}

for (const { name, page } of venues) {
  if (terms.has(name)) continue;
  if (EXEMPT.has(name)) continue;
  fail(`"${name}" (${page}) is a venue but not in preserveVerbatim — a machine engine may translate it`);
}

// An exemption for a venue that no longer exists is dead weight that hides the
// next real one.
for (const [name] of EXEMPT) {
  if (!venues.some((v) => v.name === name)) {
    fail(`"${name}" is exempted but is no longer a venue on any page — remove the exemption`);
  }
  if (terms.has(name)) {
    fail(`"${name}" is both exempted and protected — one of the two is wrong`);
  }
}

console.log(
  failed
    ? `\ncheck-venue-brands: ${failed} problem(s) across ${venues.length} venues`
    : `check-venue-brands OK — ${venues.length} venues, ${venues.length - EXEMPT.size} protected, ${EXEMPT.size} exempted by decision`,
);
process.exit(failed ? 1 : 0);
