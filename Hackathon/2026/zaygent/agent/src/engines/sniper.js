/**
 * Sniper Engine
 * Executes manual snipe orders from user-submitted contract addresses.
 */

const { checkHoneypot }   = require("../evaluators/honeypotCheck");
const { checkLiquidity }  = require("../evaluators/liquidityCheck");
const { evaluateLimit, evaluate, ACTIONS } = require("../evaluators/bracketEvaluator");
const { executeBuy, executeSell, convertToStable } = require("../executors/swapExecutor");
const { executeCrossPay } = require("../executors/crossPayExecutor");
const axios = require("axios");

// Active snipe orders store
const activeSnipes = new Map();

/**
 * Submit a new snipe order
 */
const submitSnipe = async (order, onEvent) => {
  const {
    userHash,
    contractAddress,
    chain,
    allocation    = 20,
    takeProfit    = 300,
    stopLoss      = 25,
    limitEnabled  = false,
    limitPrice    = null,
    zecBalance    = 10,
    honeyCheck    = true,
    liqCheck      = true,
    autoStable    = true,
  } = order;

  const emit = (type, data) => {
    if (onEvent) onEvent({ type, data, ts: new Date().toISOString() });
    console.log(`[SNIPER:${type}]`, data);
  };

  emit("SNIPE_RECEIVED", { contractAddress, chain, allocation, takeProfit, stopLoss });

  // Step 1 — Fetch token info
  let tokenInfo = null;
  try {
    const res = await axios.get(
      `https://api.dexscreener.com/latest/dex/tokens/${contractAddress}`,
      { timeout: 10000 }
    );
    const pair = res.data?.pairs?.[0];
    if (pair) {
      tokenInfo = {
        name:  pair.baseToken?.symbol || contractAddress.slice(0, 6),
        price: parseFloat(pair.priceUsd || 0),
        mcap:  pair.fdv || 0,
      };
    }
  } catch (err) {
    emit("TOKEN_FETCH_WARN", { message: "Could not fetch token info — proceeding" });
  }

  const tokenName  = tokenInfo?.name  || contractAddress.slice(0, 8);
  const tokenPrice = tokenInfo?.price || 0;

  // Step 2 — Safety checks
  if (honeyCheck) {
    const honeypot = await checkHoneypot(contractAddress, chain);
    if (!honeypot.isSafe && !honeypot.warning) {
      emit("HONEYPOT_BLOCKED", { token: tokenName, reason: honeypot.reason });
      return { success: false, reason: honeypot.reason };
    }
    emit("HONEYPOT_PASSED", { token: tokenName });
  }

  if (liqCheck) {
    const liquidity = await checkLiquidity(contractAddress, chain);
    if (!liquidity.isSafe) {
      emit("LIQUIDITY_BLOCKED", { token: tokenName, reason: liquidity.reason });
      return { success: false, reason: liquidity.reason };
    }
    emit("LIQUIDITY_PASSED", { token: tokenName, liquidity: liquidity.liquidity });
  }

  // Step 3 — Handle limit order
  if (limitEnabled && limitPrice && tokenPrice > 0) {
    const limitResult = evaluateLimit({ limitPrice, token: tokenName, chain }, tokenPrice);
    if (!limitResult.triggered) {
      // Queue the limit order
      const snipeId = `SNIPE_${contractAddress.slice(0, 6)}_${Date.now()}`;
      activeSnipes.set(snipeId, {
        ...order, tokenName, tokenPrice, status: "WAITING_LIMIT", snipeId,
      });
      emit("LIMIT_QUEUED", { token: tokenName, limitPrice, currentPrice: tokenPrice, snipeId });
      return { success: true, queued: true, snipeId, reason: limitResult.reason };
    }
    emit("LIMIT_TRIGGERED", { token: tokenName, limitPrice, currentPrice: tokenPrice });
  }

  // Step 4 — CrossPay funding
  const allocationUSD = (zecBalance * 68) * (allocation / 100);
  const zecNeeded     = allocationUSD / 68;

  const crossPay = await executeCrossPay({
    zecAmount:        parseFloat(zecNeeded.toFixed(4)),
    destinationChain: chain,
    receiveToken:     "USDC",
    userHash,
  });

  if (!crossPay.success) {
    emit("CROSSPLAY_FAILED", { token: tokenName });
    return { success: false, reason: "CrossPay failed" };
  }

  // Step 5 — Execute buy
  const buyResult = await executeBuy({
    token:  tokenName,
    chain,
    amount: crossPay.output.netUSD,
    price:  tokenPrice || 0.001,
  });

  if (!buyResult.success) {
    emit("BUY_FAILED", { token: tokenName, reason: buyResult.reason });
    return { success: false, reason: buyResult.reason };
  }

  // Step 6 — Register position
  const snipeId = `SNIPE_${contractAddress.slice(0, 6)}_${Date.now()}`;
  activeSnipes.set(snipeId, {
    token:       tokenName,
    chain,
    address:     contractAddress,
    entryPrice:  buyResult.executedPrice,
    tokensHeld:  buyResult.tokensReceived,
    takeProfit,
    stopLoss,
    autoStable,
    userHash,
    status:      "OPEN",
    snipeId,
    openedAt:    new Date().toISOString(),
  });

  emit("SNIPE_EXECUTED", {
    snipeId,
    token:      tokenName,
    chain,
    entryPrice: buyResult.executedPrice,
    amount:     crossPay.output.netUSD,
    zecUsed:    zecNeeded.toFixed(4),
    txHash:     buyResult.txHash,
  });

  return { success: true, snipeId, buyResult, crossPay };
};

/**
 * Monitor active snipe positions and apply TP/SL
 */
const monitorSnipes = async (onEvent) => {
  const emit = (type, data) => {
    if (onEvent) onEvent({ type, data, ts: new Date().toISOString() });
  };

  for (const [snipeId, position] of activeSnipes.entries()) {
    if (position.status !== "OPEN") continue;

    // Simulate current price movement
    const priceMove    = 1 + (Math.random() * 0.6 - 0.2);
    const currentPrice = position.entryPrice * priceMove;
    const result       = evaluate(position, currentPrice);

    if (result.action === ACTIONS.TAKE_PROFIT || result.action === ACTIONS.STOP_LOSS) {
      const sellResult = await executeSell({
        token:        position.token,
        chain:        position.chain,
        tokenAmount:  position.tokensHeld,
        currentPrice,
        reason:       result.action,
      });

      if (sellResult.success && position.autoStable) {
        await convertToStable({ amount: sellResult.usdcReceived, chain: position.chain, token: position.token });
      }

      activeSnipes.set(snipeId, { ...position, status: "CLOSED", closedAt: new Date().toISOString() });

      emit("SNIPE_CLOSED", {
        snipeId,
        token:  position.token,
        reason: result.action,
        pnlPct: result.pnlPct,
        ...sellResult,
      });
    }
  }
};

const getActiveSnipes = () => Array.from(activeSnipes.values()).filter(s => s.status === "OPEN");

module.exports = { submitSnipe, monitorSnipes, getActiveSnipes };