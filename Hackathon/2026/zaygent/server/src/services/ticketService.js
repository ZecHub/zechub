const SupportTicket = require("../models/SupportTicket");
const { generateTicketKey, hashTxId } = require("./hashService");

/**
 * Create a new single-use support ticket.
 * Only stores the hashed tx ID — never the raw wallet.
 */
const createTicket = async (userHash, txId = null) => {
  const ticket = await SupportTicket.create({
    ticketKey:      generateTicketKey(),
    userHash,
    txId:           hashTxId(txId),
    diagnosticData: { requestedAt: new Date(), txProvided: !!txId },
  });
  return ticket.ticketKey;
};

/**
 * Look up a ticket by key — used by admin panel only.
 * Returns ONLY the diagnostic data for that single transaction.
 */
const lookupTicket = async (ticketKey) => {
  const ticket = await SupportTicket.findOne({ ticketKey });
  if (!ticket) return null;
  if (ticket.status === "EXPIRED" || new Date() > ticket.expiresAt) {
    await SupportTicket.updateOne({ ticketKey }, { status: "EXPIRED" });
    return { expired: true };
  }
  // Return only what's needed — never full user profile
  return {
    ticketKey:      ticket.ticketKey,
    status:         ticket.status,
    diagnosticData: ticket.diagnosticData,
    createdAt:      ticket.createdAt,
    expiresAt:      ticket.expiresAt,
  };
};

/**
 * Resolve a ticket — clears diagnostic data
 */
const resolveTicket = async (ticketKey) => {
  return SupportTicket.updateOne(
    { ticketKey },
    { status: "RESOLVED", resolvedAt: new Date(), diagnosticData: {} }
  );
};

module.exports = { createTicket, lookupTicket, resolveTicket };