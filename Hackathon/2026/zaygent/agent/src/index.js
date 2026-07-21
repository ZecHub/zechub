/**
 * Zaygent Trading Agent — Main Entry Point
 */

require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });
const cron = require("node-cron");

const { runCycle, getOpenPositions }    = require("./engines/scalper");
const { submitSnipe, monitorSnipes, getActiveSnipes } = require("./engines/sniper");
const { startAgentAPI, broadcastEvent, onConfigUpdate } = require("./api");
// ── Config ───────────────────────────────────────────────────────────────────
const SCAN_INTERVAL_SECS = parseInt(process.env.SCAN_INTERVAL) || 30;

const DEFAULT_CONFIG = {
  userHash:      "simulation_user",
  maxAllocation: 20,
  globalTP:      300,
  globalSL:      25,
  enabledChains: { SOLANA: true, BSC: true, ETH: true },
  autoStable:    true,
  honeyCheck:    true,
  liqCheck:      true,
  zecBalance:    10,
};

let isRunning   = false;
let cycleCount  = 0;
let agentActive = true;
let agentConfig = { ...DEFAULT_CONFIG };

// ── Event Handler ─────────────────────────────────────────────────────────────
const handleEvent = async (event) => {
  const { type, data, ts } = event;
  console.log(`\n[${ts}] 📡 ${type}`);

  // Broadcast to all SSE subscribers (frontend)
  broadcastEvent({ type, data, ts });

  switch (type) {
    case "POSITION_OPENED":
      console.log(`  ✅ Opened: ${data.token} on ${data.chain} @ $${data.entryPrice}`);
      console.log(`  📊 Conviction: ${data.conviction} | Sentiment: ${data.sentiment}`);
      console.log(`  💰 ZEC Used: ${data.zecUsed}`);
      break;
    case "POSITION_CLOSED":
      const emoji = data.reason === "TP_HIT" ? "🎯" : "🛑";
      console.log(`  ${emoji} Closed: ${data.token} — ${data.reason} | PnL: ${data.pnlPct}%`);
      break;
    case "HONEYPOT_BLOCKED":
      console.log(`  🚫 Honeypot blocked: ${data.token} — ${data.reason}`);
      break;
    case "LIQUIDITY_BLOCKED":
      console.log(`  🚫 Low liquidity: ${data.token} — ${data.reason}`);
      break;
    default:
      break;
  }
};

// ── Main Scalper Loop ─────────────────────────────────────────────────────────
const runScalperCycle = async () => {
  if (!agentActive || isRunning) return;
  isRunning = true;
  cycleCount++;

  console.log(`\n${"═".repeat(50)}`);
  console.log(`🤖 ZAYGENT AGENT — Cycle #${cycleCount}`);
  console.log(`   Active Positions: ${getOpenPositions().length}`);
  console.log(`   Active Snipes:    ${getActiveSnipes().length}`);
  console.log(`${"═".repeat(50)}`);

  // Broadcast cycle start to frontend
  broadcastEvent({
    type: "CYCLE_START",
    data: {
      cycle:     cycleCount,
      positions: getOpenPositions().length,
      snipes:    getActiveSnipes().length,
    },
    ts: new Date().toISOString(),
  });

  try {
    await runCycle(agentConfig, handleEvent);
    await monitorSnipes(handleEvent);
  } catch (err) {
    console.error("❌ Cycle error:", err.message);
    broadcastEvent({ type: "CYCLE_ERROR", data: { message: err.message }, ts: new Date().toISOString() });
  }

  // Broadcast updated positions after cycle
  broadcastEvent({
    type: "POSITIONS_UPDATE",
    data: {
      positions: getOpenPositions(),
      snipes:    getActiveSnipes(),
    },
    ts: new Date().toISOString(),
  });

  isRunning = false;
};

// ── Scheduled Jobs ────────────────────────────────────────────────────────────
cron.schedule(`*/${SCAN_INTERVAL_SECS} * * * * *`, runScalperCycle);

cron.schedule("*/10 * * * * *", async () => {
  if (!agentActive) return;
  await monitorSnipes(handleEvent);
  // Broadcast positions update every 10 seconds
  broadcastEvent({
    type: "POSITIONS_UPDATE",
    data: {
      positions: getOpenPositions(),
      snipes:    getActiveSnipes(),
    },
    ts: new Date().toISOString(),
  });
});

cron.schedule("*/5 * * * *", () => {
  console.log(`\n📊 STATUS REPORT`);
  console.log(`   Cycles run:       ${cycleCount}`);
  console.log(`   Open positions:   ${getOpenPositions().length}`);
  console.log(`   Active snipes:    ${getActiveSnipes().length}`);
  console.log(`   Agent status:     ${agentActive ? "ACTIVE" : "PAUSED"}`);
});

// ── Start ─────────────────────────────────────────────────────────────────────
const { broadcastEvent: _ } = startAgentAPI();

// Listen for config updates from frontend
onConfigUpdate((newConfig) => {
  console.log("⚙️  Agent config updated:", JSON.stringify(newConfig));
  agentConfig = {
    ...agentConfig,
    maxAllocation: newConfig.maxAllocation  || agentConfig.maxAllocation,
    globalTP:      newConfig.globalTP       || agentConfig.globalTP,
    globalSL:      newConfig.globalSL       || agentConfig.globalSL,
    maxPositions:  newConfig.maxPositions   || agentConfig.maxPositions,
    scanInterval:  newConfig.scanInterval   || agentConfig.scanInterval,
    enabledChains: newConfig.enabledChains  || agentConfig.enabledChains,
    autoStable:    newConfig.autoStable     !== undefined ? newConfig.autoStable : agentConfig.autoStable,
    honeyCheck:    newConfig.honeyCheck     !== undefined ? newConfig.honeyCheck : agentConfig.honeyCheck,
    liqCheck:      newConfig.liqCheck       !== undefined ? newConfig.liqCheck   : agentConfig.liqCheck,
  };
  broadcastEvent({ type: "CONFIG_UPDATED", data: agentConfig, ts: new Date().toISOString() });
});

console.log(`
╔═══════════════════════════════════════╗
║   🤖 ZAYGENT TRADING AGENT v1.0       ║
║   Mode: SIMULATION                    ║
║   Scan Interval: ${SCAN_INTERVAL_SECS}s                  ║
╚═══════════════════════════════════════╝
`);
console.log("✅ Agent initialized — starting first cycle in 5 seconds...\n");

setTimeout(runScalperCycle, 5000);

module.exports = { agentConfig, getOpenPositions, getActiveSnipes };