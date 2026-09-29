// Rate-limit handling in check-links.mjs.
//
// A 429 means the checker was throttled, not that the page is gone, so it must
// not be filed under "broken". retryAfterMs decides how long to back off before
// asking the host again.
//
// Run: node link-health/rate-limit.test.mjs
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("./check-links.mjs", import.meta.url), "utf8");

let failed = 0;
let total = 0;
const eq = (name, got, want) => {
  total++;
  const g = JSON.stringify(got), w = JSON.stringify(want);
  if (g !== w) { failed++; console.log(`  FAIL ${name}\n       want ${w}\n       got  ${g}`); }
};

const retryAfterMs = new Function(
  src.slice(src.indexOf("function retryAfterMs"), src.indexOf("const sleep =")) +
  "; return retryAfterMs;")();

const NOW = Date.parse("2026-09-29T12:00:00Z");
eq("Retry-After in seconds", retryAfterMs("12", NOW), 12000);
eq("Retry-After as an HTTP date", retryAfterMs("Tue, 29 Sep 2026 12:00:20 GMT", NOW), 20000);
eq("no Retry-After uses the default", retryAfterMs(null, NOW), 5000);
eq("garbage Retry-After uses the default", retryAfterMs("soon", NOW), 5000);
eq("long waits are capped", retryAfterMs("3600", NOW), 30000);
eq("past dates still wait a moment", retryAfterMs("Tue, 29 Sep 2026 11:00:00 GMT", NOW), 1000);

const checkExternal = new Function("TIMEOUT_MS",
  src.slice(src.indexOf("async function checkExternal"), src.indexOf("/**\n * Milliseconds to wait")) +
  "; return checkExternal;")(15000);
const respond = (status, headers = {}) => async () => new Response(null, { status, headers });

globalThis.fetch = respond(429, { "retry-after": "7" });
eq("429 is rate limited, not broken", await checkExternal("https://forum.example/t/1"),
   { state: "ratelimited", status: 429, retryAfter: "7" });

globalThis.fetch = respond(404);
eq("404 is still broken", await checkExternal("https://example.org/gone"),
   { state: "broken", status: 404 });

globalThis.fetch = respond(200);
eq("200 is ok", await checkExternal("https://example.org/"), { state: "ok", status: 200 });

console.log(failed ? `${failed} of ${total} failing` : `all ${total} cases correct`);
process.exit(failed ? 1 : 0);
