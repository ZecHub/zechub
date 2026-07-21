const crypto = require("crypto");
const env    = require("../config/env");

/**
 * One-way SHA-256 hash of a wallet address combined with server salt.
 * The raw wallet address is NEVER stored in the database.
 */
const hashIdentity = (walletAddress) => {
  if (!walletAddress) throw new Error("Wallet address is required for hashing");
  return crypto
    .createHash("sha256")
    .update(walletAddress.toLowerCase() + env.HASH_SALT)
    .digest("hex");
};

/**
 * Middleware: attaches hashed identity to req object.
 * Use on any route that receives a wallet address.
 */
const privacyMiddleware = (req, res, next) => {
  try {
    const wallet = req.body.walletAddress || req.headers["x-wallet-address"];
    if (wallet) {
      req.hashedIdentity = hashIdentity(wallet);
      // Immediately delete raw address from body — never forward it
      delete req.body.walletAddress;
    }
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: "Privacy middleware error", error: error.message });
  }
};

module.exports = { hashIdentity, privacyMiddleware };