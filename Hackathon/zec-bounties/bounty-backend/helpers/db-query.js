const { PrismaClient } = require("@prisma/client");
const executeZingoParseAddres = require("../utils/zingoLibParseAddress.js");

const prisma = new PrismaClient();

async function findDueBounties() {
  const dueBounties = await prisma.bounty.findMany({
    where: {
      AND: [{ status: "DONE" }, { isPaid: false }],
    },
  });

  return dueBounties;
}

async function buildPaymentList(bounties) {
  const results = [];
  let totalZecAmount = 0;

  for (const bounty of bounties) {
    if (!bounty.assignee) continue;

    const user = await prisma.user.findUnique({
      where: { id: bounty.assignee },
      select: { z_address: true },
    });

    if (!user?.z_address) continue;

    // Add to total before converting to zatoshis
    totalZecAmount += bounty.bountyAmount;

    const zatoshis = Math.round(bounty.bountyAmount * 1e8);

    results.push({
      address: user.z_address,
      amount: zatoshis,
      memo: `Bounty payment for ${bounty.title}`,
    });
  }

  return {
    paymentList: results,
    totalZecAmount: totalZecAmount,
  };
}
async function updateDueBounties() {
  // First, find the bounties that need to be updated
  const updateBounties = await prisma.bounty.findMany({
    where: {
      AND: [{ status: "DONE" }, { isPaid: false }],
    },
  });

  console.log("Due bounties:", updateBounties);

  // Update all found bounties to mark them as paid
  if (updateBounties.length > 0) {
    const updateResult = await prisma.bounty.updateMany({
      where: {
        AND: [{ status: "DONE" }, { isPaid: false }],
      },
      data: {
        isPaid: true,
        paymentAuthorized: true,
        paidAt: new Date(), // Optional: track when payment was marked
      },
    });

    console.log(`Updated ${updateResult.count} bounties to paid status`);

    return {
      foundBounties: updateBounties,
      updatedCount: updateResult.count,
    };
  }

  console.log("No bounties to update");
  return {
    foundBounties: updateBounties,
    updatedCount: 0,
  };
}

// Add this function to store transactions
async function storeTransactions(txHashes, totalAmount) {
  const transactions = [];

  // for (const txHash of txHashes) {
  try {
    const transaction = await prisma.transaction.create({
      data: {
        txHash: txHashes,
        amount: totalAmount,
      },
    });
    transactions.push(transaction);
  } catch (error) {
    console.error(`Failed to store transaction ${txHashes}:`, error);
  }
  // }

  return transactions;
}

function verifyZaddress(z_address) {
  const state = executeZingoParseAddres(z_address);
  try {
    const result = state[1] || state;
    if (
      result.status === "success" &&
      result.chain_name === "main" &&
      result.address_kind === "sapling"
    ) {
      return true;
    } else {
      return false;
    }
  } catch {
    return null;
  }
}

module.exports = {
  buildPaymentList,
  findDueBounties,
  verifyZaddress,
  updateDueBounties,
  storeTransactions,
};
