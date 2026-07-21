/**
 * Swap Executor — Simulation Mode
 * Simulates DEX swap execution with realistic outcomes.
 * In production: connects to Jupiter (Solana), PancakeSwap (BSC), Uniswap (ETH)
 */

const SIMULATION_MODE = true;

// Simulated slippage ranges per chain
const SLIPPAGE = {
  SOLANA: { min: 0.1, max: 0.5 },
  BSC:    { min: 0.2, max: 0.8 },
  ETH:    { min: 0.1, max: 0.6 },
};

// Simulated gas costs (in USD)
const GAS_COSTS = {
  SOLANA: 0.001,
  BSC:    0.20,
  ETH:    2.50,
};

/**
 * Execute a simulated buy swap
 */

const executeBuy = async ({ token, chain, amount, price, slippageTolerance = 1 }) => {
  console.log(`🔄 [SIM] Executing BUY: ${amount} ${token} @ $${price} on ${chain}`);

  // Simulate network delay
  await new Promise(r => setTimeout(r, Math.random() * 500 + 200));

  const slip    = SLIPPAGE[chain] || SLIPPAGE.ETH;
  const slipPct = slip.min + Math.random() * (slip.max - slip.min);
  const gasCost = GAS_COSTS[chain] || 0.5;

  // Check slippage tolerance
  if (slipPct > slippageTolerance) {
    return {
      success: false,
      reason:  `Slippage ${slipPct.toFixed(2)}% exceeds tolerance ${slippageTolerance}%`,
    };
  }

  const executedPrice  = price * (1 + slipPct / 100);
  const tokensReceived = amount / executedPrice;

  return {
    success:        true,
    type:           "BUY",
    token,
    chain,
    amountIn:       amount,
    tokensReceived: parseFloat(tokensReceived.toFixed(6)),
    executedPrice:  parseFloat(executedPrice.toFixed(8)),
    slippage:       parseFloat(slipPct.toFixed(3)),
    gasCost,
    txHash:         `SIM_${Date.now()}_${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
    timestamp:      new Date().toISOString(),
    simulated:      SIMULATION_MODE,
  };
};

/**
 * Execute a simulated sell swap
 */
const executeSell = async ({ token, chain, tokenAmount, currentPrice, reason }) => {
  console.log(`🔄 [SIM] Executing SELL: ${tokenAmount} ${token} @ $${currentPrice} on ${chain} — ${reason}`);

  await new Promise(r => setTimeout(r, Math.random() * 500 + 200));

  const slip    = SLIPPAGE[chain] || SLIPPAGE.ETH;
  const slipPct = slip.min + Math.random() * (slip.max - slip.min);
  const gasCost = GAS_COSTS[chain] || 0.5;

  const executedPrice  = currentPrice * (1 - slipPct / 100);
  const usdcReceived   = tokenAmount * executedPrice;
  const netReceived    = usdcReceived - gasCost;

  return {
    success:       true,
    type:          "SELL",
    token,
    chain,
    tokenAmount,
    usdcReceived:  parseFloat(usdcReceived.toFixed(4)),
    netReceived:   parseFloat(netReceived.toFixed(4)),
    executedPrice: parseFloat(executedPrice.toFixed(8)),
    slippage:      parseFloat(slipPct.toFixed(3)),
    gasCost,
    reason,
    txHash:        `SIM_${Date.now()}_${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
    timestamp:     new Date().toISOString(),
    simulated:     SIMULATION_MODE,
  };
};

/**
 * Convert profit to stablecoins (USDC/USDT)
 */
const convertToStable = async ({ amount, chain, token }) => {
  console.log(`💰 [SIM] Converting ${amount} ${token} to USDC on ${chain}`);
  await new Promise(r => setTimeout(r, 300));
  return {
    success:      true,
    stableAmount: parseFloat((amount * 0.998).toFixed(4)), // 0.2% conversion fee
    stable:       "USDC",
    txHash:       `SIM_STABLE_${Date.now()}`,
    simulated:    SIMULATION_MODE,
  };
};

module.exports = { executeBuy, executeSell, convertToStable };