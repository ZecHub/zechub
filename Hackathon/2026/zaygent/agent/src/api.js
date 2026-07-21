/**
 * Agent HTTP API
 * Exposes endpoints so the main server can:
 * - Submit snipe orders
 * - Get open positions
 * - Update agent config
 * - Receive agent events via SSE
 */

const http    = require("http");
const { submitSnipe, getActiveSnipes }  = require("./engines/sniper");
const { getOpenPositions, runCycle }    = require("./engines/scalper");

const AGENT_API_PORT = process.env.AGENT_API_PORT || 5001;

// Event subscribers for SSE
const subscribers = new Set();

const configUpdateCallbacks = new Set();

const onConfigUpdate = (fn) => configUpdateCallbacks.add(fn);

/**
 * Broadcast an event to all SSE subscribers
 */
const broadcastEvent = (event) => {
  const data = `data: ${JSON.stringify(event)}\n\n`;
  for (const res of subscribers) {
    try { res.write(data); } catch (e) { subscribers.delete(res); }
  }
};

/**
 * Simple HTTP router
 */
const handleRequest = async (req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin",  "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = req.url.split("?")[0];

  // ── GET /health ──────────────────────────────────────────────────────────
  if (req.method === "GET" && url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: true, message: "Agent API running", port: AGENT_API_PORT }));
    return;
  }

  // ── GET /positions ───────────────────────────────────────────────────────
  if (req.method === "GET" && url === "/positions") {
    const positions = getOpenPositions();
    const snipes    = getActiveSnipes();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: true, positions, snipes, total: positions.length + snipes.length }));
    return;
  }

  // ── POST /snipe ──────────────────────────────────────────────────────────
  if (req.method === "POST" && url === "/snipe") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", async () => {
      try {
        const order  = JSON.parse(body);
        const result = await submitSnipe(order, (event) => {
          broadcastEvent({ source: "sniper", ...event });
        });
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, result }));
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, message: err.message }));
      }
    });
    return;
  }

  // ── GET /events (SSE) ────────────────────────────────────────────────────
  if (req.method === "GET" && url === "/events") {
    res.writeHead(200, {
      "Content-Type":  "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection":    "keep-alive",
      "Access-Control-Allow-Origin": "*",
    });
    res.write("data: {\"type\":\"CONNECTED\"}\n\n");
    subscribers.add(res);
    req.on("close", () => subscribers.delete(res));
    return;
  }

      // ── POST /config ─────────────────────────────────────────────────────────────
    if (req.method === "POST" && url === "/config") {
      let body = "";
      req.on("data", chunk => body += chunk);
      req.on("end", () => {
        try {
          const newConfig = JSON.parse(body);
          // Emit config update event so index.js can pick it up
          configUpdateCallbacks.forEach(fn => fn(newConfig));
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true, message: "Config updated" }));
        } catch (err) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: false, message: err.message }));
        }
      });
      return;
    }

    // ── GET /zcash ────────────────────────────────────────────────────────────────
      if (req.method === "GET" && url === "/zcash") {
        try {
          const { getNetworkStats, getNewAddress } = require("./zcash/zcashService");
          const [stats, address] = await Promise.all([
            getNetworkStats(),
            getNewAddress(),
          ]);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true, stats, address }));
        } catch (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: false, message: err.message }));
        }
        return;
      }

      // ── GET /markets ─────────────────────────────────────────────────────────────
      if (req.method === "GET" && url === "/markets") {
  try {
    const { getLastScan } = require("./scanners/dexScanner");
    const data = getLastScan();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: true, ...data }));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: false, message: err.message }));
  }
  return;
}

  // ── 404 ──────────────────────────────────────────────────────────────────
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ success: false, message: "Not found" }));
};

const startAgentAPI = () => {
  const server = http.createServer(handleRequest);
  server.listen(AGENT_API_PORT, () => {
    console.log(`🔌 Agent API running on port ${AGENT_API_PORT}`);
  });
  return { broadcastEvent };
};

module.exports = { startAgentAPI, broadcastEvent, onConfigUpdate };