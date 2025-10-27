import { ApiError } from '@defuse-protocol/one-click-sdk-typescript';
import { getQuote } from './2-get-quote';
import { sendTokens } from './3-send-deposit';
import { submitTxHash } from './4-submit-tx-hash-OPTIONAL';
import { pollStatusUntilSuccess } from './5-check-status-OPTIONAL';
import { displaySwapCostTable } from './utils';
import { NEAR } from '@near-js/tokens';
import "dotenv/config";
import type {
  QuoteResponse,
  GetExecutionStatusResponse,
} from '@defuse-protocol/one-click-sdk-typescript';
import type { FinalExecutionOutcome } from '@near-js/types';

// create a stable return type
type FullSwapResult = {
  quote: QuoteResponse;
  depositAddress: string;
  depositResult: FinalExecutionOutcome;       // canonical, not transitive
  submitResult: void;                          // or the SDK’s type if exported
  finalStatus: GetExecutionStatusResponse.status;
};


/**
 *  Step 5: Full Swap Implementation
 *
 *  This combines steps 2 - 5:
 *   1. Get a quote with deposit address
 *   2. Send deposit to the quote's deposit address
 *   3. Submit transaction hash to 1-Click API
 *   4. Check the status of the swap
 * 
 *  NOTE: Configure this file independently of the other files in this directory
 */
const isTest = false; 
const amount = NEAR.toUnits("0.01").toString(); // amount in smallest unit of the input or output token depending on `swapType`


export async function fullSwap(senderAddress: string, senderPrivateKey: string, recipientAddress: string, originAsset: string, destinationAsset: string, amount: string): Promise<FullSwapResult> {
  try {
    console.log("Starting NEAR Intents full swap process w/ 1-Click API...\n");

    originAsset = originAsset ? originAsset : "nep141:wrap.near";
    destinationAsset = destinationAsset ? destinationAsset : "nep141:zec.omft.near";
    
    console.log(originAsset, destinationAsset);
    
    // Step 1: Get quote and extract deposit address
    console.log("Step 1: Getting quote...");
    console.log("--------------------------------");
    const quote = await getQuote(isTest, senderAddress, recipientAddress, originAsset, destinationAsset, amount);
    
    // Extract deposit address from quote response
    const depositAddress = quote.quote?.depositAddress;
    if (!depositAddress) {
      throw new Error("No deposit address found in quote response");
    }
    
    console.log(`💬 - Quote: ${quote.quote?.amountInFormatted} NEAR → ${quote.quote?.amountOutFormatted} ARB`);
    console.log(`🎯 - Deposit address: ${depositAddress}`);
    
    // Display swap cost breakdown table
    displaySwapCostTable(quote);

    // Step 2: Send deposit
    console.log("Step 2: Sending deposit...");
    console.log("--------------------------------");
    const depositResult = await sendTokens(senderAddress, senderPrivateKey, depositAddress, amount);
    console.log("✅ - Deposit sent successfully!");
    console.log(`🔍 - See transaction: https://nearblocks.io/txns/${depositResult.transaction.hash}\n`);
    
    // Step 3: Submit transaction hash
    console.log("Step 3: Submitting transaction hash...");
    console.log("--------------------------------");
    const submitResult = await submitTxHash(depositResult.transaction.hash, depositAddress);
    console.log("✅ - Transaction hash submitted successfully!\n");
    
    // Step 4: Poll status until success
    console.log("Step 4: Monitoring swap status...");
    console.log("--------------------------------");
    console.log("⏳ Waiting 5 seconds before starting status checks...");
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    const finalStatus = await pollStatusUntilSuccess(depositAddress);
    console.log("--------------------------------");
    console.log("✅ Full swap process completed! \n\n");
    console.log(`🔍 View full transaction on NEAR Intents Explorer: \n https://explorer.near-intents.org/transactions/${depositAddress} \n`);
    
    return { quote, depositAddress, depositResult, submitResult, finalStatus };
    
  } catch (error) {
    console.error("❌ Full swap failed:", error as ApiError);
    throw error;
  }
}

