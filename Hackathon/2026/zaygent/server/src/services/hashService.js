const crypto = require("crypto");
const env    = require("../config/env");

/**
 * One-way SHA-256 hash of wallet address + server salt.
 * Used everywhere a user identity is needed.
 */
const hashWallet = (walletAddress) => {
  if (!walletAddress) throw new Error("Wallet address required");
  return crypto
    .createHash("sha256")
    .update(walletAddress.toLowerCase().trim() + env.HASH_SALT)
    .digest("hex");
};

/**
 * Generate a single-use support ticket key
 */
const generateTicketKey = () => {
  const ticketId = Math.floor(Math.random() * 900000 + 100000);
  const sig      = crypto.randomBytes(8).toString("hex").toUpperCase();
  return `ST-TICKET-${ticketId}::SIG-${sig}`;
};

/**
 * Hash a support ticket transaction ID for safe storage
 */
const hashTxId = (txId) => {
  if (!txId) return null;
  return crypto.createHash("sha256").update(txId + env.HASH_SALT).digest("hex");
};

module.exports = { hashWallet, generateTicketKey, hashTxId };