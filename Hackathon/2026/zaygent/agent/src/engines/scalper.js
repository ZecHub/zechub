/**
 * Scalper Engine
 * Autonomous engine that scans, validates, enters, and exits positions.
 * Runs on a configurable interval loop.
 */
const { getCurrentPrice } = require("../scanners/priceTracker");
const { runScan }          = require("../scanners/dexScanner");
const { getSentiment, combinedScore } = require("../scanners/sentimentScanner");
const { checkHoneypot }    = require("../evaluators/honeypotCheck");
const { checkLiquidity }   = require("../evaluators/liquidityCheck");
const { evaluate, ACTIONS } = require("../evaluators/bracketEvaluator");
const { executeBuy, executeSell, convertToStable } = require("../executors/swapExecutor");
const { executeCrossPay, refundCrossPay, returnProfitsToVault } = require("../executors/crossPayExecutor");

// In-memory position store (in production: use database)
const openPositions = new Map();

/**
 * Run one full scalper cycle
 */
const runCycle = async (config, onEvent) => {
  const {
    userHash,
    maxAllocation = 20,
    globalTP      = 300,
    globalSL      = 25,
    enabledChains = { SOLANA: true, BSC: true, ETH: true },
    autoStable    = true,
    honeyCheck    = true,
    liqCheck      = true,
    zecBalance    = 10,
  } = config;

  const emit = (type, data) => {
    if (onEvent) onEvent({ type, data, ts: new Date().toISOString() });
    console.log(`[${type}]`, JSON.stringify(data, null, 2));
  };

  emit("SCAN_START", { message: "Starting DEX scan..." });

  // Step 1 — Scan for opportunities
  const tokens = await runScan(50);
  const filtered = tokens.filter(t => enabledChains[t.chain]);

  if (filtered.length === 0) {
    emit("SCAN_EMPTY", { message: "No high-conviction tokens found" });
    return;
  }

  // Step 2 — Evaluate open positions
  for (const [posId, position] of openPositions.entries()) {
// Simulate realistic price movement — gradual drift upward with volatility
const currentPrice = await getCurrentPrice(position);
const result = evaluate(position, currentPrice);

if (result.action === ACTIONS.TAKE_PROFIT) {
      const sellResult = await executeSell({
        token:        position.token,
        chain:        position.chain,
        tokenAmount:  position.tokensHeld,
        currentPrice,
        reason:       "TP_HIT",
      });

      if (sellResult.success) {
        const vaultReturn = await returnProfitsToVault({
          proceedsUSD:      sellResult.usdcReceived,
          destinationChain: position.chain,
          userHash:         position.userHash,
          pnlPct:           result.pnlPct,
        });
        emit("PROFITS_RETURNED", {
          token:       position.token,
          zecReturned: vaultReturn.proceeds?.zecReturned,
          proceedsUSD: sellResult.usdcReceived,
          pnlPct:      result.pnlPct,
        });
      }

      openPositions.delete(posId);
      emit("POSITION_CLOSED", {
        token:  position.token,
        chain:  position.chain,
        reason: "TP_HIT",
        pnlPct: result.pnlPct,
        ...sellResult,
      });

    } else if (result.action === ACTIONS.STOP_LOSS) {
      const sellResult = await executeSell({
        token:        position.token,
        chain:        position.chain,
        tokenAmount:  position.tokensHeld,
        currentPrice,
        reason:       "SL_EXIT",
      });

      if (sellResult.success) {
        // Even on loss — return remaining funds to ZEC vault
        await returnProfitsToVault({
          proceedsUSD:      sellResult.usdcReceived,
          destinationChain: position.chain,
          userHash:         position.userHash,
          pnlPct:           result.pnlPct,
        });
      }

      openPositions.delete(posId);
      emit("POSITION_CLOSED", {
        token:  position.token,
        chain:  position.chain,
        reason: "SL_EXIT",
        pnlPct: result.pnlPct,
        ...sellResult,
      });

    } else {
      emit("POSITION_UPDATE", {
        token:  position.token,
        chain:  position.chain,
        action: result.action,
        pnlPct: result.pnlPct,
        reason: result.reason,
        currentPrice: currentPrice,
      });
    }
  }

  // Step 3 — Find new entry if under max positions
  const maxPos = config.maxPositions || 5;
    if (openPositions.size >= maxPos) {
    emit("MAX_POSITIONS", { message: "Max positions reached — skipping new entries" });
    return;
  }

  const candidate = filtered[0];

  // Step 4 — Sentiment check
  const sentiment = await getSentiment(candidate.name, candidate.chain);
  const conviction = combinedScore(candidate.score, sentiment.score);

  if (conviction < 35) {
    emit("LOW_CONVICTION", { token: candidate.name, conviction });
    return;
  }

  // Step 5 — Safety checks
  if (honeyCheck && candidate.address) {
    const honeypot = await checkHoneypot(candidate.address, candidate.chain);
    if (!honeypot.isSafe && !honeypot.warning) {
      emit("HONEYPOT_BLOCKED", { token: candidate.name, reason: honeypot.reason });
      return;
    }
  }

  if (liqCheck) {
    const liquidity = await checkLiquidity(candidate.address, candidate.chain, candidate.liquidity);
    if (!liquidity.isSafe) {
      emit("LIQUIDITY_BLOCKED", { token: candidate.name, reason: liquidity.reason });
      return;
    }
  }

  // Step 6 — CrossPay funding
  const allocationUSD = (zecBalance * 68) * (maxAllocation / 100);
  const zecNeeded     = allocationUSD / 68;

  const crossPay = await executeCrossPay({
    zecAmount:        parseFloat(zecNeeded.toFixed(4)),
    destinationChain: candidate.chain,
    receiveToken:     "USDC",
    userHash,
    onEvent:          emit,
  });

  if (!crossPay.success) {
    emit("CROSSPLAY_FAILED", { token: candidate.name, reason: "CrossPay failed" });
    return;
  }

  // Step 7 — Execute buy
  const buyResult = await executeBuy({
    token:  candidate.name,
    chain:  candidate.chain,
    amount: crossPay.output.netUSD,
    price:  candidate.price,
  });

if (!buyResult.success) {
    // Buy failed AFTER CrossPay already delivered funds — trigger refund
    console.log(`↩️  Buy failed — initiating CrossPay refund for ${candidate.name}`);
    const refund = await refundCrossPay({
      netUSD:           crossPay.output.netUSD,
      destinationChain: candidate.chain,
      userHash,
      reason:           `Buy execution failed — ${buyResult.reason}`,
    });
    emit("BUY_FAILED_REFUNDED", {
      token:   candidate.name,
      reason:  buyResult.reason,
      refund,
    });
    return;
  }

  // Step 8 — Open position
  const positionId = `${candidate.name}_${Date.now()}`;
  openPositions.set(positionId, {
    token:       candidate.name,
    chain:       candidate.chain,
    address:     candidate.address,
    entryPrice:  buyResult.executedPrice,
    tokensHeld:  buyResult.tokensReceived,
    takeProfit:  globalTP,
    stopLoss:    globalSL,
    openedAt:    new Date().toISOString(),
    userHash,
  });

  emit("POSITION_OPENED", {
    token:      candidate.name,
    chain:      candidate.chain,
    entryPrice: buyResult.executedPrice,
    amount:     crossPay.output.netUSD,
    conviction,
    sentiment:  sentiment.level,
    zecUsed:    zecNeeded.toFixed(4),
  });
};

/**
 * Get all open positions
 */
const getOpenPositions = () => Array.from(openPositions.values());

module.exports = { runCycle, getOpenPositions };