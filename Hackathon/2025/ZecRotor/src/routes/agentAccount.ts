import { Hono } from "hono";
import { agentAccountId, agent } from "@neardefi/shade-agent-js";
import { KeyPairSigner } from "@near-js/signers";
import { MAIN_NEAR_ACOUNT, MAIN_NEAR_PRIVATE_KEY, provider } from "../config";
import { Account } from "@near-js/accounts";

const app = new Hono();

app.get("/", async (c) => {
  try {
    // Get the agents account Id
    const accountId = await agentAccountId();

    // Get the balance of the agent account
    const balance = await agent("getBalance");

    return c.json({
      accountId: accountId.accountId,
      balance: balance.balance,
    });
  } catch (error) {
    console.log("Error getting agent account:", error);
    return c.json({ error: "Failed to get agent account " + error }, 500);
  }
});

export default app;
