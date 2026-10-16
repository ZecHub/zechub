// Internal links to static files served from zechub-wiki/public.
//
// Links such as /nearintents.png sit at the site root, so check-links.mjs
// classifies them as routes and looked for a markdown page behind them. The
// exchange and DEX pages use them for every logo, which filled "Broken internal
// routes" with images that load fine on zechub.wiki.
//
// Run: node link-health/public-files.test.mjs
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("./check-links.mjs", import.meta.url), "utf8");
const isAppPublicFile = new Function(
  src.slice(src.indexOf("function isAppPublicFile"), src.indexOf("function routeExists")) +
  "; return isAppPublicFile;")();

let failed = 0;
let total = 0;
const eq = (name, got, want) => {
  total++;
  if (got !== want) { failed++; console.log(`  FAIL ${name}: want ${want}, got ${got}`); }
};

const publicFiles = new Set(["/nearintents.png", "/DCRDEX.jpg", "/flyp.me.png", "/logos/Zcash Logo.svg"]);

eq("a public image", isAppPublicFile("/nearintents.png", publicFiles), true);
eq("case matters, as it does on the server", isAppPublicFile("/dcrdex.jpg", publicFiles), false);
eq("dots in the name", isAppPublicFile("/flyp.me.png", publicFiles), true);
eq("query string ignored", isAppPublicFile("/DCRDEX.jpg?v=2", publicFiles), true);
eq("fragment ignored", isAppPublicFile("/nearintents.png#top", publicFiles), true);
eq("percent-encoded name", isAppPublicFile("/logos/Zcash%20Logo.svg", publicFiles), true);
eq("a page route is not a file", isAppPublicFile("/using-zcash/wallets", publicFiles), false);
eq("a missing image is not a file", isAppPublicFile("/missing.png", publicFiles), false);
eq("no file list (offline run)", isAppPublicFile("/nearintents.png", null), false);
eq("malformed escape does not throw", isAppPublicFile("/bad%E0%A4%A.png", publicFiles), false);

console.log(failed ? `${failed} of ${total} failing` : `all ${total} cases correct`);
process.exit(failed ? 1 : 0);
