const { getDB } = require("../config/db");
const crypto    = require("crypto");

const TicketsTable = "support_tickets";

const SupportTicket = {
  async create({ ticketKey, userHash, txId, diagnosticData }) {
    const db = getDB();
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();
    const { data, error } = await db
      .from(TicketsTable)
      .insert({
        ticket_key:      ticketKey,
        user_hash:       userHash,
        tx_id:           txId || null,
        status:          "OPEN",
        diagnostic_data: diagnosticData || {},
        expires_at:      expiresAt,
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async findOne({ ticketKey }) {
    const db = getDB();
    const { data, error } = await db
      .from(TicketsTable)
      .select("*")
      .eq("ticket_key", ticketKey)
      .single();
    if (error && error.code !== "PGRST116") throw error;
    return data || null;
  },

  async updateStatus(ticketKey, status, extra = {}) {
    const db = getDB();
    const { error } = await db
      .from(TicketsTable)
      .update({ status, ...extra })
      .eq("ticket_key", ticketKey);
    if (error) throw error;
  },
};

module.exports = SupportTicket;