// Unit cases for the pure parts of check-links.mjs.
//
// The scan itself is a network job and cannot run in PR CI, but the piece that
// decides WHAT gets re-probed is pure string work, and getting it wrong is
// silent: a regex that fails to match simply reports nothing, which reads
// exactly like a corpus with no revived links. So the parser is asserted
// directly, including the timestamp flag suffixes the Wayback Machine emits
// (20240419175552if_/im_/id_) that a naive `\d+/` pattern swallows.
//
// Run: node link-health/check-links.test.mjs
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("./check-links.mjs", import.meta.url), "utf8");
const originalOf = new Function(
  src.slice(src.indexOf("function originalOf"), src.indexOf("// ── suggested actions")) +
  "; return originalOf;")();

let failed = 0;
const eq = (name, got, want) => {
  const g = JSON.stringify(got), w = JSON.stringify(want);
  if (g !== w) { failed++; console.log(`  FAIL ${name}\n       want ${w}\n       got  ${g}`); }
};

const A = "https://web.archive.org/web";

eq("plain snapshot",
   originalOf(`${A}/20250611203406/https://zeme.team/`),
   { when: "20250611203406", original: "https://zeme.team/" });

eq("if_ flag suffix",
   originalOf(`${A}/20240419175552if_/https://zcashitalia.com/`),
   { when: "20240419175552", original: "https://zcashitalia.com/" });

eq("im_ flag suffix",
   originalOf(`${A}/20220819045153im_/http://safepay.safecoin.org/`),
   { when: "20220819045153", original: "http://safepay.safecoin.org/" });

eq("original keeps its query and fragment",
   originalOf(`${A}/20260823012524/https://electriccoin.co/blog/x/?a=1#frag`),
   { when: "20260823012524", original: "https://electriccoin.co/blog/x/?a=1#frag" });

eq("short timestamp",
   originalOf(`${A}/2022/https://example.org/`),
   { when: "2022", original: "https://example.org/" });

eq("star timestamp (latest)",
   originalOf(`${A}/*/https://example.org/x`),
   { when: "*", original: "https://example.org/x" });

// must NOT match: these are ordinary links and re-probing them is meaningless
eq("not an archive host", originalOf("https://example.org/web/20250611203406/https://x.test/"), null);
eq("archive without a target", originalOf(`${A}/20250611203406/`), null);
eq("non-http target", originalOf(`${A}/20250611203406/ftp://x.test/f`), null);
eq("the archive home page", originalOf("https://web.archive.org/"), null);
eq("target without a host", originalOf(`${A}/2022/https://?`), null);
eq("non-string input", originalOf(Symbol("x")), null);

console.log(failed ? `${failed} failing` : "all 12 cases correct");
process.exit(failed ? 1 : 0);
