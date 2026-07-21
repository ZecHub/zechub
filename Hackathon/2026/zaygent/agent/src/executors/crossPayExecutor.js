/**
 * CrossPay Executor — Simulation Mode
 * Simulates the ZEC → NEAR Intents → Target Chain flow.
 * Includes refund handling for failures after funds have moved.
 */

const axios = require("axios");
const SIMULATION_MODE = true;

const PROCESSING_TIMES = {
  ZEC_SHIELD:    1500,
  NEAR_SOLVE:    2000,
  CHAIN_DELIVER: 1000,
  REFUND_STEP:   1200,
};

const FEES = {
  CROSSPLAY_PCT: 0.005,
  NEAR_GAS:      0.001,
};

let ZEC_PRICE_USD = 400; // fallback

// Fetch real ZEC price on startup
const fetchZecPrice = async () => {
  try {
    const res  = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=zcash&vs_currencies=usd", { timeout: 5000 });
    if (res.data?.zcash?.usd) {
      ZEC_PRICE_USD = res.data.zcash.usd;
      console.log(`✅ ZEC price updated: $${ZEC_PRICE_USD}`);
    }
  } catch (err) {
    console.warn("⚠️  Could not fetch ZEC price — using fallback $400");
  }
};

fetchZecPrice();
// Refresh every 10 minutes
setInterval(fetchZecPrice, 10 * 60 * 1000);

/**
 * Execute a simulated CrossPay flow
 * ZEC (Shielded) → NEAR Intents Solver → Target Chain Asset
 */
const executeCrossPay = async ({ zecAmount, destinationChain, receiveToken = "USDC", userHash, onEvent }) => {
  console.log(`\n🔐 [CrossPay] Initiating shielded ZEC transfer`);
  console.log(`   Amount:      ${zecAmount} ZEC`);
  console.log(`   Destination: ${destinationChain}`);
  console.log(`   Receive:     ${receiveToken}`);

  const steps = [];

  try {
    // Step 1 — Shield ZEC
    console.log("⏳ Step 1: Shielding ZEC...");
    await new Promise(r => setTimeout(r, PROCESSING_TIMES.ZEC_SHIELD));
    const shieldTx = `ZEC_SHIELD_${Date.now()}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    steps.push({ step: "ZEC_SHIELDED", txHash: shieldTx, status: "COMPLETE" });
    console.log(`✅ ZEC shielded — tx: ${shieldTx}`);
    if (onEvent) onEvent({ type: "CROSSPAY_STEP", data: { step: "ZEC_SHIELDED", txHash: shieldTx, chain: destinationChain }, ts: new Date().toISOString() });

    // Step 2 — NEAR Intents Solver
    console.log("⏳ Step 2: NEAR Intents solving route...");
    await new Promise(r => setTimeout(r, PROCESSING_TIMES.NEAR_SOLVE));

    // Simulate occasional NEAR solver failure (3% chance)
    if (Math.random() < 0.03) {
      throw {
        stage:       "NEAR_SOLVE",
        recoverable: true,
        message:     "NEAR Intents solver timed out — no route found",
        fundsAtRisk: false, // funds still in shielded pool, safe
      };
    }

    const nearTx = `NEAR_INTENT_${Date.now()}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    steps.push({ step: "NEAR_SOLVED", txHash: nearTx, status: "COMPLETE" });
    if (onEvent) onEvent({ type: "CROSSPAY_STEP", data: { step: "NEAR_SOLVED", txHash: nearTx, chain: destinationChain }, ts: new Date().toISOString() });
    console.log(`✅ NEAR Intents solved — tx: ${nearTx}`);
    console.log(`✅ NEAR Intents solved — tx: ${nearTx}`);

    // Step 3 — Deliver to target chain
    console.log(`⏳ Step 3: Delivering to ${destinationChain}...`);
    await new Promise(r => setTimeout(r, PROCESSING_TIMES.CHAIN_DELIVER));
    const deliverTx = `${destinationChain}_DELIVER_${Date.now()}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    steps.push({ step: "DELIVERED", txHash: deliverTx, status: "COMPLETE" });
    console.log(`✅ Delivered to ${destinationChain} — tx: ${deliverTx}`);
    if (onEvent) onEvent({ type: "CROSSPAY_STEP", data: { step: "DELIVERED", txHash: deliverTx, chain: destinationChain }, ts: new Date().toISOString() });

    const grossUSD    = zecAmount * ZEC_PRICE_USD;
    const crossPayFee = grossUSD * FEES.CROSSPLAY_PCT;
    const nearGas     = FEES.NEAR_GAS;
    const netUSD      = grossUSD - crossPayFee - nearGas;

    const result = {
      success:   true,
      simulated: SIMULATION_MODE,
      userHash,
      input: {
        zecAmount,
        zecPriceUSD: ZEC_PRICE_USD,
        grossUSD:    parseFloat(grossUSD.toFixed(2)),
      },
      fees: {
        crossPayFee: parseFloat(crossPayFee.toFixed(4)),
        nearGas,
        totalFees:   parseFloat((crossPayFee + nearGas).toFixed(4)),
      },
      output: {
        destinationChain,
        receiveToken,
        netUSD:      parseFloat(netUSD.toFixed(2)),
        tokenAmount: parseFloat(netUSD.toFixed(2)),
      },
      steps,
      completedAt: new Date().toISOString(),
      privacyNote: "Source wallet identity shielded via Zcash sapling pool",
    };

    console.log(`\n✅ CrossPay complete — ${zecAmount} ZEC → $${netUSD.toFixed(2)} ${receiveToken} on ${destinationChain}`);
    return result;

  } catch (err) {
    console.warn(`⚠️  CrossPay aborted at ${err.stage || "UNKNOWN"}: ${err.message}`);
    return {
      success:     false,
      stage:       err.stage   || "UNKNOWN",
      recoverable: err.recoverable !== false,
      fundsAtRisk: err.fundsAtRisk || false,
      reason:      err.message || "CrossPay failed",
      steps,
    };
  }
};

/**
 * Refund CrossPay — called when downstream execution fails
 * AFTER funds have already landed on the target chain.
 *
 * Scenarios that trigger this:
 * 1. Buy execution fails (slippage too high)
 * 2. Honeypot detected AFTER funds already delivered
 * 3. Liquidity dried up between check and execution
 *
 * Flow: Target chain USDC → NEAR Intents → ZEC re-shielded vault
 */
const refundCrossPay = async ({ netUSD, destinationChain, userHash, reason }) => {
  console.log(`\n↩️  [CrossPay Refund] Initiating reversal on ${destinationChain}`);
  console.log(`   Reason:  ${reason}`);
  console.log(`   Amount:  $${netUSD}`);

  const steps = [];

  try {
    // Step 1 — Reclaim USDC from target chain
    console.log(`⏳ Refund Step 1: Reclaiming $${netUSD} USDC from ${destinationChain}...`);
    await new Promise(r => setTimeout(r, PROCESSING_TIMES.REFUND_STEP));
    const reclaimTx = `${destinationChain}_RECLAIM_${Date.now()}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    steps.push({ step: "USDC_RECLAIMED", txHash: reclaimTx, status: "COMPLETE" });
    console.log(`✅ USDC reclaimed — tx: ${reclaimTx}`);

    // Step 2 — Route back through NEAR Intents
    console.log("⏳ Refund Step 2: Routing back through NEAR Intents...");
    await new Promise(r => setTimeout(r, PROCESSING_TIMES.NEAR_SOLVE));
    const nearRefundTx = `NEAR_REFUND_${Date.now()}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    steps.push({ step: "NEAR_REFUND_ROUTED", txHash: nearRefundTx, status: "COMPLETE" });
    console.log(`✅ NEAR refund route solved — tx: ${nearRefundTx}`);

    // Step 3 — Re-shield back into ZEC vault
    console.log("⏳ Refund Step 3: Re-shielding into ZEC vault...");
    await new Promise(r => setTimeout(r, PROCESSING_TIMES.ZEC_SHIELD));

    // Small refund gas fee — covers NEAR gas already spent on reversal
    const refundGasFee  = 0.002 * netUSD; // 0.2% gas recovery
    const netRefundUSD  = netUSD - refundGasFee;
    const zecRefunded   = netRefundUSD / ZEC_PRICE_USD;

    const reshieldTx = `ZEC_RESHIELD_${Date.now()}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    steps.push({ step: "ZEC_RESHIELDED", txHash: reshieldTx, status: "COMPLETE" });
    console.log(`✅ ZEC re-shielded — tx: ${reshieldTx}`);

    const result = {
      success:   true,
      simulated: SIMULATION_MODE,
      userHash,
      reason,
      refunded: {
        grossUSD:     parseFloat(netUSD.toFixed(2)),
        refundGasFee: parseFloat(refundGasFee.toFixed(4)),
        netRefundUSD: parseFloat(netRefundUSD.toFixed(2)),
        zecRefunded:  parseFloat(zecRefunded.toFixed(6)),
      },
      steps,
      completedAt:  new Date().toISOString(),
      privacyNote:  "Refunded amount re-shielded into ZEC sapling pool",
    };

    console.log(`\n✅ Refund complete — $${netRefundUSD.toFixed(2)} returned as ${zecRefunded.toFixed(6)} ZEC to shielded vault\n`);
    return result;

  } catch (err) {
    // Refund itself failed — needs a support ticket
    console.error(`❌ Refund failed: ${err.message}`);
    return {
      success:              false,
      userHash,
      reason:               `Refund failed: ${err.message}`,
      steps,
      requiresSupportTicket: true,
      originalAmount:       netUSD,
    };
  }
};

/**
 * Return profits to ZEC vault after a successful TP/SL close
 * Flow: USDC proceeds → NEAR Intents → ZEC re-shielded vault
 */
const returnProfitsToVault = async ({ proceedsUSD, destinationChain, userHash, pnlPct }) => {
  console.log(`\n💰 [CrossPay] Returning proceeds to ZEC vault`);
  console.log(`   Proceeds:  $${proceedsUSD}`);
  console.log(`   PnL:       ${pnlPct}%`);

  const steps = [];

  // Step 1 — Route proceeds through NEAR Intents back to ZEC
  console.log("⏳ Step 1: Routing proceeds through NEAR Intents...");
  await new Promise(r => setTimeout(r, PROCESSING_TIMES.NEAR_SOLVE));
  const nearTx = `NEAR_RETURN_${Date.now()}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  steps.push({ step: "NEAR_RETURN_ROUTED", txHash: nearTx, status: "COMPLETE" });
  console.log(`✅ NEAR return route solved — tx: ${nearTx}`);

  // Step 2 — Re-shield into ZEC vault
  console.log("⏳ Step 2: Re-shielding proceeds into ZEC vault...");
  await new Promise(r => setTimeout(r, PROCESSING_TIMES.ZEC_SHIELD));
  const zecReturned = proceedsUSD / ZEC_PRICE_USD;
  const reshieldTx  = `ZEC_PROFIT_SHIELD_${Date.now()}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  steps.push({ step: "PROFITS_RESHIELDED", txHash: reshieldTx, status: "COMPLETE" });
  console.log(`✅ Profits re-shielded — tx: ${reshieldTx}`);

  const result = {
    success:   true,
    simulated: SIMULATION_MODE,
    userHash,
    proceeds: {
      proceedsUSD:  parseFloat(proceedsUSD.toFixed(2)),
      zecReturned:  parseFloat(zecReturned.toFixed(6)),
      pnlPct,
    },
    steps,
    completedAt: new Date().toISOString(),
    privacyNote: "Proceeds re-shielded into ZEC sapling pool",
  };

  console.log(`\n✅ Proceeds returned — $${proceedsUSD.toFixed(2)} → ${zecReturned.toFixed(6)} ZEC re-shielded\n`);
  return result;
};

module.exports = { executeCrossPay, refundCrossPay, returnProfitsToVault };       