const express = require("express");
const router  = express.Router();
const { protect }      = require("../middleware/auth");
const { authLimiter }  = require("../middleware/rateLimit");
const { createTicket, lookupTicket, resolveTicket } = require("../services/ticketService");

/**
 * POST /api/support/ticket
 * Generate a single-use support receipt key
 */
router.post("/ticket", protect, authLimiter, async (req, res) => {
  try {
    const { txId } = req.body;
    const ticketKey = await createTicket(req.user.id, txId || null);
    res.json({ success: true, ticketKey });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not generate ticket" });
  }
});

/**
 * GET /api/support/lookup/:key
 * Look up a ticket by key — restricted diagnostic view only
 */
router.get("/lookup/:key", async (req, res) => {
  try {
    const result = await lookupTicket(req.params.key);
    if (!result)          return res.status(404).json({ success: false, message: "Ticket not found" });
    if (result.expired)   return res.status(410).json({ success: false, message: "Ticket expired" });
    res.json({ success: true, ticket: result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lookup error" });
  }
});

/**
 * PATCH /api/support/resolve/:key
 * Resolve a ticket — clears all diagnostic data
 */
router.patch("/resolve/:key", async (req, res) => {
  try {
    await resolveTicket(req.params.key);
    res.json({ success: true, message: "Ticket resolved and data cleared" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Resolve error" });
  }
});

module.exports = router;