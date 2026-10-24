// Exercise the production checker against real, deliberately unfinished HTTP
// responses. An unused GET body must not retain its socket after the probe.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createServer } from "node:http";
import { once } from "node:events";
import test from "node:test";

const source = readFileSync(
  process.env.LINK_CHECKER_PATH || new URL("./check-links.mjs", import.meta.url),
  "utf8",
);
// Same source-extraction approach as check-links.test.mjs: do not execute the
// top-level weekly scan or maintain a second copy of the function under test.
const checkExternal = new Function(
  "TIMEOUT_MS",
  source.slice(source.indexOf("async function checkExternal"), source.indexOf("async function pool")) +
    "; return checkExternal;",
)(1000);

for (const [status, expected] of [
  [200, { state: "ok", status: 200 }],
  [404, { state: "broken", status: 404 }],
  [302, { state: "redirect", status: 302, to: "/destination" }],
]) {
  test(`GET ${status}: keep classification and close unfinished response`, async () => {
    const methods = [];
    let resolveClosed;
    const closed = new Promise((resolve) => { resolveClosed = resolve; });
    const server = createServer((req, res) => {
      methods.push(req.method);
      if (req.method === "HEAD") {
        res.writeHead(405);
        res.end();
        return;
      }
      res.on("close", resolveClosed);
      res.writeHead(status, {
        "content-type": "text/plain",
        ...(status === 302 ? { location: "/destination" } : {}),
      });
      res.write("headers and a body prefix; the server deliberately never ends this response");
    });
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    let timeout;
    try {
      const result = await checkExternal(`http://127.0.0.1:${server.address().port}/probe`);
      assert.deepEqual(result, expected);
      assert.deepEqual(methods, ["HEAD", "GET"]);
      await Promise.race([
        closed,
        new Promise((_, reject) => {
          timeout = setTimeout(() => reject(new Error("Unused GET body still holds its connection")), 500);
        }),
      ]);
    } finally {
      clearTimeout(timeout);
      const stopped = new Promise((resolve) => server.close(resolve));
      server.closeAllConnections();
      await stopped;
    }
  });
}

test("successful HEAD still uses only one request", async () => {
  const methods = [];
  const server = createServer((req, res) => {
    methods.push(req.method);
    res.writeHead(200);
    res.end();
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  try {
    assert.deepEqual(
      await checkExternal(`http://127.0.0.1:${server.address().port}/probe`),
      { state: "ok", status: 200 },
    );
    assert.deepEqual(methods, ["HEAD"]);
  } finally {
    const stopped = new Promise((resolve) => server.close(resolve));
    server.closeAllConnections();
    await stopped;
  }
});
