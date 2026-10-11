// Absolute zechub.wiki links through the whole CLI, so the wiring in main() is
// covered and not only wikiLinkAction: pages are resolved against site/, files
// listed in zechub-wiki/public are accepted without a request, and everything
// else is fetched. fetch is replaced in the child process, so nothing touches the
// network.
//
// Run: node --test link-health/wiki-links.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtemp, mkdir, writeFile, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const script = fileURLToPath(new URL("./check-links.mjs", import.meta.url));

// `listing` is the public/ file list the GitHub API returns, or an HTTP status
// when the listing is unavailable. `live` URLs answer 200, all others 404.
async function scan(links, { listing = [], live = [], files = {} } = {}) {
  const cwd = await mkdtemp(join(tmpdir(), "zechub-wiki-links-test-"));
  try {
    const pages = { "site/Test.md": links.map((u) => `[link](${u})`).join("\n") + "\n", ...files };
    for (const [path, content] of Object.entries(pages)) {
      await mkdir(dirname(join(cwd, path)), { recursive: true });
      await writeFile(join(cwd, path), content);
    }
    const api = typeof listing === "number" ? listing : { tree: listing.map((p) => ({ path: `public${p}`, type: "blob" })) };
    const mock = join(cwd, "mock-fetch.mjs");
    await writeFile(mock, `
import { appendFileSync } from "node:fs";
const API = ${JSON.stringify(api)};
const LIVE = new Set(${JSON.stringify(live)});
globalThis.fetch = async (input) => {
  const url = String(input);
  appendFileSync(${JSON.stringify(join(cwd, "fetched.txt"))}, url + "\\n");
  if (url.startsWith("https://api.github.com/")) {
    return typeof API === "number" ? new Response("{}", { status: API }) : Response.json(API);
  }
  return new Response(null, { status: LIVE.has(url) ? 200 : 404 });
};
`);
    execFileSync(process.execPath, ["--import", pathToFileURL(mock).href, script], { cwd, timeout: 20000, stdio: "pipe" });
    const report = JSON.parse(await readFile(join(cwd, "link-health.json"), "utf8"));
    const fetched = (await readFile(join(cwd, "fetched.txt"), "utf8"))
      .split("\n")
      .filter((u) => u && !u.startsWith("https://api.github.com/"));
    return { report, fetched };
  } finally {
    await rm(cwd, { recursive: true, force: true });
  }
}

const ZAINO = { "site/Zcash_Tech/Zaino.md": "# Zaino\n" };
const findingsFor = (report, url) => report.findings.filter((f) => f.url === url).map((f) => f.kind);

test("absolute wiki pages are resolved against site/, not fetched", async () => {
  const { report, fetched } = await scan(
    ["https://zechub.wiki/zcash-tech/zaino", "https://zechub.wiki/zcash-tech/no-such-page"],
    { files: ZAINO },
  );
  assert.deepEqual(findingsFor(report, "https://zechub.wiki/zcash-tech/zaino"), []);
  assert.deepEqual(findingsFor(report, "https://zechub.wiki/zcash-tech/no-such-page"), ["route"]);
  assert.deepEqual(fetched, []);
});

test("a malformed escape is reported as a route instead of aborting the scan", async () => {
  const { report } = await scan(["https://zechub.wiki/%ZZ"]);
  assert.deepEqual(findingsFor(report, "https://zechub.wiki/%ZZ"), ["route"]);
});

test("listed files are accepted without a request; unlisted files are fetched", async () => {
  const present = "https://zechub.wiki/content-images/present.webp";
  const missing = "https://zechub.wiki/content-images/missing.svg";
  const generated = "https://zechub.wiki/llms.txt";
  const { report, fetched } = await scan([present, missing, generated], {
    listing: ["/content-images/present.webp"],
    live: [generated],
  });
  assert.deepEqual(findingsFor(report, present), []);
  assert.deepEqual(findingsFor(report, missing), ["broken"]);
  assert.deepEqual(findingsFor(report, generated), []);
  assert.deepEqual(fetched.sort(), [generated, missing].sort());
});

test("without the public listing every wiki file is fetched", async () => {
  const present = "https://zechub.wiki/content-images/present.webp";
  const missing = "https://zechub.wiki/definitely-missing.png";
  const { report, fetched } = await scan([present, missing], { listing: 403, live: [present] });
  assert.deepEqual(findingsFor(report, present), []);
  assert.deepEqual(findingsFor(report, missing), ["broken"]);
  assert.deepEqual(fetched.sort(), [missing, present].sort());
});

test("_next and api paths are always fetched", async () => {
  const chunk = "https://zechub.wiki/_next/static/missing.js";
  const api = "https://zechub.wiki/api/missing";
  const { report, fetched } = await scan([chunk, api], { listing: ["/_next/static/missing.js"] });
  assert.deepEqual(findingsFor(report, chunk), ["broken"]);
  assert.deepEqual(findingsFor(report, api), ["broken"]);
  assert.deepEqual(fetched.sort(), [api, chunk].sort());
});

test("other spellings of a wiki file link are fetched at their canonical address", async () => {
  // The site answers http://, www. and a trailing slash with a 308 to the
  // canonical URL, which would hide a missing file behind a redirect.
  const forms = [
    "https://zechub.wiki/content-images/gone.png/",
    "http://zechub.wiki/content-images/gone.png",
    "https://www.zechub.wiki/content-images/gone.png",
  ];
  const canonical = "https://zechub.wiki/content-images/gone.png";
  const { report, fetched } = await scan(forms);
  // One request, and one finding on the canonical URL that points at the first
  // citing line and counts the others, as for any URL cited more than once.
  assert.deepEqual(fetched, [canonical]);
  const broken = report.findings.filter((f) => f.url === canonical);
  assert.deepEqual(broken.map((f) => [f.kind, f.line, f.alsoIn]), [["broken", 1, 2]]);
});

test("a locale prefix is kept when fetching a wiki file", async () => {
  const feed = "https://zechub.wiki/en/rss.xml";
  const { report, fetched } = await scan([feed], { live: [feed] });
  assert.deepEqual(findingsFor(report, feed), []);
  assert.deepEqual(fetched, [feed]);
});
