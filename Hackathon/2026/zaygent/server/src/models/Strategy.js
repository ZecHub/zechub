const { getDB } = require("../config/db");

const StrategiesTable = "strategies";

const Strategy = {
  async find({ userHash, isActive } = {}) {
    const db = getDB();
    let query = db.from(StrategiesTable).select("*").eq("user_hash", userHash);
    if (isActive !== undefined) query = query.eq("is_active", isActive);
    const { data, error } = await query.order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async create(strategy) {
    const db = getDB();
    const { data, error } = await db
      .from(StrategiesTable)
      .insert({
        user_hash:        strategy.userHash,
        pair:             strategy.pair,
        strategy:         strategy.strategy,
        chain:            strategy.chain,
        is_active:        strategy.isActive !== false,
        take_profit:      strategy.takeProfit  || 300,
        stop_loss:        strategy.stopLoss    || 25,
        allocation:       strategy.allocation  || 20,
        limit_enabled:    strategy.limitEnabled || false,
        limit_price:      strategy.limitPrice  || null,
        contract_address: strategy.contractAddress || null,
        pnl:              0,
        pnl_pct:          "0%",
        trade_count:      0,
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};

module.exports = Strategy;