// GitHub's sign-in gate is not a replacement for the wiki's edit links.
// Exercise the production probe and dashboard without following the login URL.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(
  process.env.LINK_CHECKER_PATH || new URL("./check-links.mjs", import.meta.url), "utf8",
);
const between = (from, to) => {
  assert.ok(source.includes(from) && source.includes(to), "source markers must exist");
  return source.slice(source.indexOf(from), source.indexOf(to));
};
const edit = "https://github.com/zechub/zechub/edit/main/site/contribute/Community_Infrastructure.md";
const login = `https://github.com/login?return_to=${encodeURIComponent(edit)}`;
const authResult = { state: "blocked", status: 302, detail: "GitHub login required" };

async function probe(url, location, headStatus = 302) {
  const calls = [];
  const checkExternal = new Function(
    "TIMEOUT_MS", "fetch",
    between("async function checkExternal", "async function pool") + "; return checkExternal;",
  )(1000, async (target, options) => {
    calls.push({ target, method: options.method, redirect: options.redirect });
    return new Response(null, {
      status: options.method === "HEAD" ? headStatus : 302,
      headers: location === null ? {} : { location },
    });
  });
  return { result: await checkExternal(url), calls };
}

for (const location of [login, login.replace("https://github.com", ""), login.replace("https:", "")]) {
  test(`GitHub authentication redirect is unverified: ${location}`, async () => {
    const { result, calls } = await probe(edit, location);
    assert.deepEqual(result, authResult);
    assert.deepEqual(calls, [{ target: edit, method: "HEAD", redirect: "manual" }]);
  });
}

test("HEAD refusal followed by GET login gate stays unverified", async () => {
  const { result, calls } = await probe(edit, login, 403);
  assert.deepEqual(result, authResult);
  assert.deepEqual(calls.map(c => c.method), ["HEAD", "GET"]);
  assert.ok(calls.every(c => c.target === edit && c.redirect === "manual"));
});

for (const [name, url, location] of [
  ["ordinary repository rename", edit, "https://github.com/zechub/renamed/edit/main/page.md"],
  ["other host's login", edit, "https://example.org/login"],
  ["GitHub-looking hostname", edit, "https://github.com.example.org/login"],
  ["non-GitHub source", "https://example.org/page", login],
  ["different GitHub path", edit, "/login/help"],
  ["missing location", edit, null],
  ["malformed location", edit, "http://["],
]) {
  test(`${name} retains ordinary redirect classification`, async () => {
    const { result } = await probe(url, location);
    assert.deepEqual(result, { state: "redirect", status: 302, to: location });
  });
}

test("dashboard keeps the source link and does not recommend replacing it with login", async () => {
  const { result } = await probe(edit, login);
  const renderMarkdown = new Function(
    "ALLOWLIST_PATH",
    between("const ACTIONS", "// ── main") +
      between("const LABELS", "main().catch") + "; return renderMarkdown;",
  )("link-health/allowlist.txt");
  const markdown = renderMarkdown({
    generatedAt: "2026-11-12T00:00:00Z", filesScanned: 1, linksFound: 1,
    uniqueExternalChecked: 1, serious: 0, allowlistEntries: 0,
    totals: { [result.state]: 1 },
    findings: [{ kind: result.state, url: edit, file: "site/contribute/Community_Infrastructure.md",
      line: 1, detail: result.detail || result.to }],
  });
  assert.match(markdown, /GitHub login required/);
  assert.match(markdown, /Open the link in a browser/);
  assert.doesNotMatch(markdown, /Point the link at its final destination/);
  assert.doesNotMatch(markdown, /github\.com\/login/);
});
