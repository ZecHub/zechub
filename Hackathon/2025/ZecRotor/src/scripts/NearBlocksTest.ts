// fetch-near-txns.js
// Run with: node fetch-near-txns.js

import { fetchTxnsFromTo } from "../utils/near-blocks-api";

const TO_ACCOUNT = "testing69.near";
const FROM_ACCOUNT = "prakharojha.near";

(async () => {
    try {
        const data = await fetchTxnsFromTo(TO_ACCOUNT, FROM_ACCOUNT, { per_page: 10 });
        console.log(`Found ${data.txns?.length || 0} transactions`);
        for (const tx of data.txns || []) {
            console.log(tx);

            console.log(
                `Hash: ${tx.transaction_hash}, From: ${tx.predecessor_account_id}, To: ${tx.receiver_account_id}, Block: ${tx.block_height}`
            );
        }
        if (data.cursor) {
            console.log("Next page cursor:", data.cursor);
        }
    } catch (err: any) {
        console.error("Error fetching transactions:", err.message);
    }
})();
