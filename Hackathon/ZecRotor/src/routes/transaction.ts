import { Hono } from "hono";
import { requestSignature } from "@neardefi/shade-agent-js";
import {
  ethContractAbi,
  ethContractAddress,
  ethRpcUrl,
  Evm,
} from "../utils/ethereum";
import { getEthereumPriceUSD } from "../utils/fetch-eth-price";
import { Contract, JsonRpcProvider } from "ethers";
import { utils } from "chainsig.js";
const { toRSV, uint8ArrayToHex } = utils.cryptography;

const app = new Hono();

app.get("/", async (c) => {
  try {
    // Fetch the environment variable inside the route
    const contractId = process.env.NEXT_PUBLIC_contractId;
    if (!contractId) {
      return c.json({ error: "Contract ID not configured" }, 500);
    }

    // Get the ETH price
    const ethPrice = await getEthereumPriceUSD();
    if (!ethPrice) {
      return c.json({ error: "Failed to fetch ETH price" }, 500);
    }

    // Get the transaction and payload to sign
    const { transaction, hashesToSign } = await getPricePayload(
      ethPrice,
      contractId,
    );

    // Call the agent contract to get a signature for the payload
    const signRes = await requestSignature({
      path: "ethereum-1",
      payload: uint8ArrayToHex(hashesToSign[0]),
    });
    console.log("signRes", signRes);

    // Reconstruct the signed transaction
    const signedTransaction = Evm.finalizeTransactionSigning({
      transaction,
      rsvSignatures: [toRSV(signRes)],
    });

    // Broadcast the signed transaction
    const txHash = await Evm.broadcastTx(signedTransaction);

    // Send back both the txHash and the new price optimistically
    return c.json({
      txHash: txHash.hash,
      newPrice: (ethPrice / 100).toFixed(2),
    });
  } catch (error) {
    console.error("Failed to send the transaction:", error);
    return c.json({ error: "Failed to send the transaction" }, 500);
  }
});

async function getPricePayload(ethPrice: number, contractId: string) {
  // Derive the price pusher Ethereum address
  const { address: senderAddress } = await Evm.deriveAddressAndPublicKey(
    contractId,
    "ethereum-1",
  );
  // Create a new JSON-RPC provider for the Ethereum network
  const provider = new JsonRpcProvider(ethRpcUrl);
  // Create a new contract interface for the Ethereum Oracle contract
  const contract = new Contract(ethContractAddress, ethContractAbi, provider);
  // Encode the function data for the updatePrice function
  const data = contract.interface.encodeFunctionData("updatePrice", [ethPrice]);
  // Prepare the transaction for signing 
  const { transaction, hashesToSign } = await Evm.prepareTransactionForSigning({
    from: senderAddress,
    to: ethContractAddress,
    data,
  });

  return { transaction, hashesToSign };
}

export default app;
