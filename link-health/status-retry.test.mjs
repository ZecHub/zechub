// Which HTTP answers count as a broken link, and which links get a second,
// slower probe. Both decide what lands on the dashboard: before this, every
// 401/403/429 was "broken", and about two thirds of those links opened fine in
// a browser.
//
// Run: node --test link-health/status-retry.test.mjs
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createServer } from "node:http";
import { once } from "node:events";
import test from "node:test";

const source = readFileSync(
  process.env.LINK_CHECKER_PATH || new URL("./check-links.mjs", import.meta.url),
  "utf8",
);
// Same source-extraction approach as the other link-health tests: do not run
// the weekly scan or keep a second copy of the functions under test.
const between = (from, to) => {
  // A renamed marker would otherwise slice garbage and fail as a SyntaxError.
  assert.ok(source.includes(from) && source.includes(to), `marker missing: ${from} / ${to}`);
  return source.slice(source.indexOf(from), source.indexOf(to));
};
const checkExternal = new Function(
  "TIMEOUT_MS",
  between("async function checkExternal", "async function pool") + "; return checkExternal;",
)(1000);
const { needsRetry, retryPass } = new Function(
  between("async function pool", "// ── archived links") + "; return { needsRetry, retryPass };",
)();

async function withServer(handler, fn) {
  const server = createServer(handler);
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  try {
    return await fn(`http://127.0.0.1:${server.address().port}`);
  } finally {
    const stopped = new Promise((resolve) => server.close(resolve));
    server.closeAllConnections();
    await stopped;
  }
}

for (const [status, headers, expected] of [
  [404, {}, { state: "broken", status: 404 }],
  [410, {}, { state: "broken", status: 410 }],
  [500, {}, { state: "broken", status: 500 }],
  [400, {}, { state: "broken", status: 400 }],
  [401, {}, { state: "blocked", status: 401 }],
  [402, {}, { state: "blocked", status: 402 }],
  [403, {}, { state: "blocked", status: 403 }],
  [451, {}, { state: "blocked", status: 451 }],
  [999, {}, { state: "blocked", status: 999 }],
  [429, {}, { state: "blocked", status: 429 }],
  [429, { "retry-after": "7" }, { state: "blocked", status: 429, retryAfter: 7 }],
  [429, { "retry-after": "Wed, 21 Oct 2026 07:28:00 GMT" }, { state: "blocked", status: 429 }],
]) {
  test(`HTTP ${status} ${JSON.stringify(headers)} is ${expected.state}`, async () => {
    const result = await withServer(
      (req, res) => {
        res.writeHead(status, headers);
        res.end();
      },
      (base) => checkExternal(`${base}/probe`),
    );
    assert.deepEqual(result, expected);
  });
}

test("a 403 on HEAD is confirmed with GET before it is reported", async () => {
  const methods = [];
  const result = await withServer(
    (req, res) => {
      methods.push(req.method);
      res.writeHead(req.method === "HEAD" ? 403 : 200);
      res.end();
    },
    (base) => checkExternal(`${base}/probe`),
  );
  assert.deepEqual(result, { state: "ok", status: 200 });
  assert.deepEqual(methods, ["HEAD", "GET"]);
});

test("only rate limits, server errors and network failures are retried", () => {
  const yes = [
    { state: "timeout" }, { state: "error" }, { state: "dns" }, { state: "tls" },
    { state: "blocked", status: 429 }, { state: "broken", status: 503 },
  ];
  const no = [
    { state: "ok", status: 200 }, { state: "redirect", status: 301 },
    { state: "blocked", status: 403 }, { state: "blocked", status: 401 },
    { state: "broken", status: 404 }, { state: "broken", status: 410 },
  ];
  for (const r of yes) assert.equal(needsRetry(r), true, JSON.stringify(r));
  for (const r of no) assert.equal(needsRetry(r), false, JSON.stringify(r));
});

test("retry pass: one request at a time per host, Retry-After honoured and capped", async () => {
  const urls = [
    "https://forum.example/a", "https://forum.example/b", "https://forum.example/c",
    "https://other.example/x", "https://other.example/gone", "https://other.example/blocked",
  ];
  const results = [
    { state: "blocked", status: 429, retryAfter: 5 },
    { state: "blocked", status: 429, retryAfter: 120 },
    { state: "blocked", status: 429 },
    { state: "broken", status: 502 },
    { state: "broken", status: 404 },
    { state: "blocked", status: 403 },
  ];
  const sleeps = [];
  const inFlight = new Map();
  let maxPerHost = 0;
  const check = async (u) => {
    const h = new URL(u).host;
    inFlight.set(h, (inFlight.get(h) || 0) + 1);
    maxPerHost = Math.max(maxPerHost, inFlight.get(h));
    await new Promise((resolve) => setTimeout(resolve, 5));
    inFlight.set(h, inFlight.get(h) - 1);
    return { state: "ok", status: 200 };
  };
  const retried = await retryPass(urls, results, check, {
    gapMs: 2000, maxWaitMs: 30000, sleep: async (ms) => { sleeps.push(ms); },
  });
  assert.equal(retried, 4);
  assert.equal(maxPerHost, 1);
  assert.deepEqual([...sleeps].sort((a, b) => a - b), [2000, 2000, 5000, 30000]);
  assert.deepEqual(results.map((r) => r.state), ["ok", "ok", "ok", "ok", "broken", "blocked"]);
});

test("retry pass stops at the time budget and keeps the first results", async () => {
  const urls = ["https://a.example/1", "https://a.example/2"];
  const results = [{ state: "blocked", status: 429 }, { state: "blocked", status: 429 }];
  let calls = 0;
  const retried = await retryPass(urls, results, async () => { calls++; return { state: "ok", status: 200 }; }, {
    gapMs: 2000, budgetMs: 1000, sleep: async () => {},
  });
  assert.equal(retried, 0);
  assert.equal(calls, 0);
  assert.deepEqual(results.map((r) => r.state), ["blocked", "blocked"]);
});

test("a re-probe still running at the deadline is dropped and the first result kept", async () => {
  const urls = ["https://slow.example/1", "https://slow.example/2"];
  const results = [{ state: "blocked", status: 429 }, { state: "blocked", status: 429 }];
  let calls = 0;
  const slow = () => {
    calls++;
    return new Promise((resolve) => setTimeout(() => resolve({ state: "ok", status: 200 }), 300));
  };
  const retried = await retryPass(urls, results, slow, { gapMs: 0, budgetMs: 50, sleep: async () => {} });
  assert.equal(retried, 0);
  assert.equal(calls, 1);
  assert.deepEqual(results.map((r) => r.state), ["blocked", "blocked"]);
  // Let the abandoned probe settle so it cannot write afterwards.
  await new Promise((resolve) => setTimeout(resolve, 350));
  assert.deepEqual(results.map((r) => r.state), ["blocked", "blocked"]);
});

test("no probe starts when the pause overslept past the deadline", async () => {
  const urls = ["https://late.example/1"];
  const results = [{ state: "blocked", status: 429 }];
  let calls = 0;
  const retried = await retryPass(urls, results, async () => { calls++; return { state: "ok", status: 200 }; }, {
    gapMs: 0, budgetMs: 30, sleep: () => new Promise((resolve) => setTimeout(resolve, 80)),
  });
  assert.equal(retried, 0);
  assert.equal(calls, 0);
  assert.deepEqual(results.map((r) => r.state), ["blocked"]);
});
