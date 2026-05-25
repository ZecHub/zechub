const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const axios = require("axios");
const { authenticate, isAdmin } = require("../middleware/auth");
const executeZingoCliAddresses = require("../utils/zingoLibAddresses.js");
const executeZingoQuickSend = require("../utils/zingoLibQuickSend.js");
const { findDueBounties } = require("../helpers/db-query.js");
const {
  buildPaymentList,
  updateDueBounties,
  storeTransactions,
} = require("../helpers/db-query.js");
const executeZingoCli = require("../utils/zingoLib.js");

// List transactions (Admin)
router.get(
  "/balance",
  //  authenticate, isAdmin,
  async (req, res) => {
    const balance = executeZingoCli("balance");
    const result = balance[1] || balance;
    res.json(result);
  }
);

// List transactions (Admin)
router.get("/addresses", authenticate, isAdmin, async (req, res) => {
  const addressesList = executeZingoCliAddresses("addresses");
  try {
    const addresses = addressesList[1][0];
    const result = addresses.receivers;
    res.json(result);
  } catch {
    res.json("None");
  }
});

// List transactions (Admin)
router.post("/authorize-payment", authenticate, isAdmin, async (req, res) => {
  const dueBounties = await findDueBounties();
  const { paymentList, totalZecAmount } = await buildPaymentList(dueBounties);
  const sendResult = executeZingoQuickSend(paymentList);

  try {
    const result = sendResult[1];
    const txhash = result.txids[0];
    await storeTransactions(txhash, totalZecAmount);
    await updateDueBounties();
    res.json(result);
  } catch {
    const result = { error: "Something went wrong" };
    res.json(result);
  }
});

router.post(
  "/:id/authorize-payment",
  authenticate,
  isAdmin,
  async (req, res) => {
    try {
      const { id: bountyId } = req.params;
      const { paymentAuthorized, paymentScheduled } = req.body;
      const userRole = req.user.role;

      // Only admins can authorize payments
      if (userRole !== "ADMIN") {
        return res.status(403).json({
          error: "Only administrators can authorize payments",
        });
      }

      const dueBounties = await findDueBounties();
      const paymentList = await buildPaymentList(dueBounties);

      const transaction = executeZingoQuickSend(paymentList);

      // Find the bounty
      const bounty = await prisma.bounty.findUnique({
        where: { id: bountyId },
        include: {
          assigneeUser: true,
          createdByUser: true,
        },
      });

      if (!bounty) {
        return res.status(404).json({ error: "Bounty not found" });
      }

      // Verify bounty is completed and approved
      if (bounty.status !== "DONE" || !bounty.isApproved) {
        return res.status(400).json({
          error:
            "Bounty must be completed and approved before payment authorization",
        });
      }

      // Verify assignee has Z-address for batch payments
      if (
        paymentScheduled?.type === "sunday_batch" &&
        !bounty.assigneeUser?.z_address
      ) {
        return res.status(400).json({
          error: "Assignee must have a Z-address configured for batch payments",
        });
      }

      // Update bounty with payment authorization and schedule
      const updatedBounty = await prisma.bounty.update({
        where: { id: bountyId },
        data: {
          paymentAuthorized: paymentAuthorized || true,
          paymentScheduled: paymentScheduled
            ? JSON.stringify(paymentScheduled)
            : null,
        },
        include: {
          createdByUser: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              avatar: true,
            },
          },
          assigneeUser: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              avatar: true,
              z_address: true,
            },
          },
        },
      });

      // Parse the payment schedule for response
      const responseData = {
        ...updatedBounty,
        paymentScheduled: updatedBounty.paymentScheduled
          ? JSON.parse(updatedBounty.paymentScheduled)
          : null,
      };

      res.json(responseData);
    } catch (error) {
      console.error("Error authorizing payment:", error);
      res.status(500).json({
        error: "Failed to authorize payment",
        details: error.message,
      });
    }
  }
);

router.put(
  "/:id/authorize-payment",
  authenticate,
  isAdmin,
  async (req, res) => {
    try {
      const { id: bountyId } = req.params;
      const { paymentAuthorized, paymentScheduled } = req.body;
      const userRole = req.user.role;

      // Only admins can authorize payments
      if (userRole !== "ADMIN") {
        return res.status(403).json({
          error: "Only administrators can authorize payments",
        });
      }

      // Find the bounty
      const bounty = await prisma.bounty.findUnique({
        where: { id: bountyId },
        include: {
          assigneeUser: true,
          createdByUser: true,
        },
      });

      if (!bounty) {
        return res.status(404).json({ error: "Bounty not found" });
      }

      // Verify bounty is completed and approved
      if (bounty.status !== "DONE" || !bounty.isApproved) {
        return res.status(400).json({
          error:
            "Bounty must be completed and approved before payment authorization",
        });
      }

      // Verify assignee has Z-address for batch payments
      if (
        paymentScheduled?.type === "sunday_batch" &&
        !bounty.assigneeUser?.z_address
      ) {
        return res.status(400).json({
          error: "Assignee must have a Z-address configured for batch payments",
        });
      }

      // Update bounty with payment authorization and schedule
      const updatedBounty = await prisma.bounty.update({
        where: { id: bountyId },
        data: {
          paymentAuthorized: paymentAuthorized || true,
          paymentScheduled: paymentScheduled
            ? JSON.stringify(paymentScheduled)
            : null,
        },
        include: {
          createdByUser: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              avatar: true,
            },
          },
          assigneeUser: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              avatar: true,
              z_address: true,
            },
          },
        },
      });

      // Parse the payment schedule for response
      const responseData = {
        ...updatedBounty,
        paymentScheduled: updatedBounty.paymentScheduled
          ? JSON.parse(updatedBounty.paymentScheduled)
          : null,
      };

      res.json(responseData);
    } catch (error) {
      console.error("Error authorizing payment:", error);
      res.status(500).json({
        error: "Failed to authorize payment",
        details: error.message,
      });
    }
  }
);

// Process batch payments
router.post(
  "/process-batch-payments",
  authenticate,
  isAdmin,
  async (req, res) => {
    try {
      const { payments, batchTimestamp } = req.body;
      const userRole = req.user.role;

      // Only admins can process batch payments
      if (userRole !== "ADMIN") {
        return res.status(403).json({
          error: "Only administrators can process batch payments",
        });
      }

      if (!payments || !Array.isArray(payments)) {
        return res.status(400).json({
          error: "Invalid payments data",
        });
      }

      if (payments.length === 0) {
        return res.json({
          success: true,
          message: "No payments to process",
          processedCount: 0,
        });
      }

      // Generate a batch ID
      const batchId = `batch_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      // Log the batch payment data (this is what gets sent to Zcash)
      console.log("Processing batch payment:", {
        batchId,
        batchTimestamp,
        paymentCount: payments.length,
        totalAmount: payments.reduce((sum, p) => sum + p.amount, 0),
        payments: payments,
      });

      // Here you would integrate with your Zcash payment system
      // For demonstration, we'll simulate successful processing
      // In reality, you would:
      // 1. Create a Zcash transaction using the payments array
      // 2. Send the transaction to the network
      // 3. Wait for confirmation
      // 4. Update payment status based on success/failure

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, assume all payments succeed
      // In production, you'd handle individual payment failures
      const processedPayments = payments.map((payment) => ({
        ...payment,
        status: "processed",
        transactionId: `tx_${Math.random().toString(36).substr(2, 9)}`,
      }));

      res.json({
        success: true,
        batchId,
        message: `Successfully processed ${payments.length} payments`,
        processedCount: payments.length,
        totalAmount: payments.reduce((sum, p) => sum + p.amount, 0),
        payments: processedPayments,
        zcashPayload: payments, // The exact format sent to Zcash
      });
    } catch (error) {
      console.error("Error processing batch payments:", error);
      res.status(500).json({
        success: false,
        error: "Failed to process batch payments",
        message: error.message,
      });
    }
  }
);

// Process instant payment (for immediate payments)
router.post(
  "/process-instant-payment",
  authenticate,
  isAdmin,
  async (req, res) => {
    try {
      const { address, amount, memo, bountyId } = req.body;
      const userRole = req.user.role;

      // Only admins can process instant payments
      if (userRole !== "ADMIN") {
        return res.status(403).json({
          error: "Only administrators can process payments",
        });
      }

      // Validate required fields
      if (!address || !amount || !bountyId) {
        return res.status(400).json({
          error: "Missing required fields: address, amount, bountyId",
        });
      }

      // Log the instant payment data
      console.log("Processing instant payment:", {
        bountyId,
        address,
        amount,
        memo,
        timestamp: new Date().toISOString(),
      });

      // Here you would integrate with your Zcash payment system
      // For demonstration, we'll simulate successful processing
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Simulate successful transaction
      const transactionId = `tx_instant_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      res.json({
        success: true,
        message: "Instant payment processed successfully",
        transactionId,
        amount,
        address,
        memo,
      });
    } catch (error) {
      console.error("Error processing instant payment:", error);
      res.status(500).json({
        success: false,
        error: "Failed to process instant payment",
        message: error.message,
      });
    }
  }
);

// Mark bounty as paid (called after successful payment processing)
router.put("/:id/mark-paid", authenticate, isAdmin, async (req, res) => {
  try {
    const { id: bountyId } = req.params;
    const { isPaid, paymentBatchId, paidAt } = req.body;
    const userRole = req.user.role;

    // Only admins can mark bounties as paid
    if (userRole !== "ADMIN") {
      return res.status(403).json({
        error: "Only administrators can mark bounties as paid",
      });
    }

    const updatedBounty = await prisma.bounty.update({
      where: { id: bountyId },
      data: {
        isPaid: isPaid || true,
        paymentBatchId: paymentBatchId || null,
        paidAt: paidAt ? new Date(paidAt) : new Date(),
      },
      include: {
        createdByUser: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            avatar: true,
          },
        },
        assigneeUser: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            avatar: true,
            z_address: true,
          },
        },
      },
    });

    res.json(updatedBounty);
  } catch (error) {
    console.error("Error marking bounty as paid:", error);
    res.status(500).json({
      error: "Failed to mark bounty as paid",
      details: error.message,
    });
  }
});

// Pay bounty
router.post("/pay/:bountyId", authenticate, isAdmin, async (req, res) => {
  const bountyId = Number(req.params.bountyId);
  const bounty = await prisma.bounty.findUnique({
    where: { id: bountyId },
    include: { assignee: true },
  });
  if (!bounty.approved) return res.status(400).send("Bounty not approved");
  if (!bounty.assignee?.zecAddress)
    return res.status(400).send("Assignee has no address");

  const rpcPayload = {
    jsonrpc: "1.0",
    id: "pay",
    method: "z_sendmany",
    params: [
      process.env.ADMIN_WALLET_ADDRESS,
      [{ address: bounty.assignee.zecAddress, amount: bounty.bountyAmountZec }],
    ],
  };

  try {
    const rpcRes = await axios.post(process.env.ZCASH_RPC_URL, rpcPayload, {
      auth: {
        username: process.env.ZCASH_RPC_USER,
        password: process.env.ZCASH_RPC_PASS,
      },
    });
    const txHash = rpcRes.data.result;

    await prisma.transaction.create({
      data: {
        bountyId,
        adminId: req.user.id,
        txHash,
        amountZec: bounty.bountyAmountZec,
      },
    });

    res.json({ txHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List transactions (Admin)
router.get(
  "/",
  // authenticate, isAdmin,
  async (req, res) => {
    const txs = await prisma.transaction.findMany({
      select: {
        id: true,
        txHash: true,
        amount: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // await prisma.transaction.update({
    //   where: { id: 256 }, // find the row to fix
    //   data: {
    //     amount: 0.2,
    //   },
    // });

    res.json(txs);
  }
);

module.exports = router;
