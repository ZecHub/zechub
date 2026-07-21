/**
 * Bracket Evaluator
 * Checks current price against TP/SL brackets and returns action.
 */

const ACTIONS = {
  HOLD:       "HOLD",
  TAKE_PROFIT: "TAKE_PROFIT",
  STOP_LOSS:  "STOP_LOSS",
  DCA:        "DCA",
};

/**
 * Evaluate a position against its brackets.
 * @param {object} position - The open position
 * @param {number} currentPrice - Latest market price
 * @returns {object} - { action, reason, pnlPct }
 */
const evaluate = (position, currentPrice) => {
  const { entryPrice, takeProfit, stopLoss, amount, chain, token } = position;

  if (!entryPrice || !currentPrice) {
    return { action: ACTIONS.HOLD, reason: "Missing price data", pnlPct: 0 };
  }

  // Calculate PnL percentage
  const pnlPct = ((currentPrice - entryPrice) / entryPrice) * 100;

  // Check Take Profit
  if (pnlPct >= takeProfit) {
    return {
      action: ACTIONS.TAKE_PROFIT,
      reason: `TP hit at +${pnlPct.toFixed(2)}% (target: +${takeProfit}%)`,
      pnlPct: parseFloat(pnlPct.toFixed(2)),
      exitPrice: currentPrice,
    };
  }

  // Check Stop Loss
  if (pnlPct <= -stopLoss) {
    return {
      action: ACTIONS.STOP_LOSS,
      reason: `SL triggered at ${pnlPct.toFixed(2)}% (limit: -${stopLoss}%)`,
      pnlPct: parseFloat(pnlPct.toFixed(2)),
      exitPrice: currentPrice,
    };
  }

  // DCA opportunity — price dipped 15% but SL not hit
  if (pnlPct <= -15 && pnlPct > -stopLoss) {
    return {
      action: ACTIONS.DCA,
      reason: `DCA opportunity at ${pnlPct.toFixed(2)}%`,
      pnlPct: parseFloat(pnlPct.toFixed(2)),
    };
  }

  return {
    action: ACTIONS.HOLD,
    reason: `Holding at ${pnlPct >= 0 ? "+" : ""}${pnlPct.toFixed(2)}%`,
    pnlPct: parseFloat(pnlPct.toFixed(2)),
  };
};

/**
 * Evaluate a limit order — check if price has reached entry trigger
 */
const evaluateLimit = (limitOrder, currentPrice) => {
  const { limitPrice, token, chain } = limitOrder;
  if (!limitPrice || !currentPrice) return { triggered: false };

  if (currentPrice <= limitPrice) {
    return {
      triggered: true,
      reason: `Limit triggered — price ${currentPrice} hit limit ${limitPrice}`,
      entryPrice: currentPrice,
    };
  }

  return {
    triggered: false,
    reason: `Waiting — current ${currentPrice} above limit ${limitPrice}`,
  };
};

/**
 * Calculate position summary stats
 */
const summarize = (position, currentPrice) => {
  const { entryPrice, amount } = position;
  const pnlPct    = ((currentPrice - entryPrice) / entryPrice) * 100;
  const pnlAmount = (currentPrice - entryPrice) * amount;
  return {
    entryPrice,
    currentPrice,
    pnlPct:    parseFloat(pnlPct.toFixed(2)),
    pnlAmount: parseFloat(pnlAmount.toFixed(4)),
    isProfit:  pnlPct > 0,
  };
};

module.exports = { evaluate, evaluateLimit, summarize, ACTIONS };