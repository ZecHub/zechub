const { getDB } = require("../config/db");

const TradesTable = "trades";

const Trade = {
  async find({ userHash, chain, operation } = {}) {
    const db = getDB();
    let query = db.from(TradesTable).select("*").eq("user_hash", userHash);
    if (chain)     query = query.eq("chain", chain);
    if (operation) query = query.eq("operation", operation);
    const { data, error } = await query.order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async create(trade) {
    const db = getDB();
    const { data, error } = await db
      .from(TradesTable)
      .insert({
        user_hash:   trade.userHash,
        chain:       trade.chain,
        token:       trade.token,
        operation:   trade.operation,
        amount:      trade.amount,
        price:       trade.price,
        zec_amount:  trade.zecAmount  || 0,
        is_shielded: trade.isShielded !== false,
        pnl:         trade.pnl        || 0,
        pnl_pct:     trade.pnlPct     || 0,
        is_profit:   trade.isProfit   || false,
        tx_hash:     trade.txHash     || null,
        status:      trade.status     || "COMPLETED",
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async filter({ userHash, chain, op, limit = 50, skip = 0 }) {
    const db = getDB();
    let query = db.from(TradesTable).select("*").eq("user_hash", userHash);
    if (chain) query = query.eq("chain", chain);
    if (op)    query = query.eq("operation", op);
    const { data, error } = await query
      .order("created_at", { ascending: false })
      .range(skip, skip + limit - 1);
    if (error) throw error;
    return data || [];
  },
};

module.exports = Trade;