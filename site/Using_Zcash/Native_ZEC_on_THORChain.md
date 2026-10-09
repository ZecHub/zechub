# Native ZEC on THORChain: Step-by-Step Guide to Liquidity Provision and Swaps

## Introduction

THORChain is a decentralised liquidity protocol that enables swaps between supported native assets on different blockchains. Where an asset is supported, users can swap it without first converting it into a wrapped token or using a centralised exchange.

This guide explains how to check native ZEC support, prepare for a swap, review transaction costs, and understand liquidity provision and withdrawal. THORChain's supported assets, pool status, and interface can change, so verify the live information before sending funds.

> **Important:** This is a practical guide, not financial advice. Only proceed if the ZEC asset and the action you want to take are currently enabled in the official interface. Never send funds manually to an address found in an old guide or chat message.

## 1. Understand native ZEC on THORChain

Native ZEC is Zcash held on the Zcash blockchain, rather than a wrapped representation issued on another network. THORChain routes swaps through its liquidity pools and uses RUNE in its pool design to facilitate cross-chain exchange.

Before using the integration, check the official THORChain announcement and current pool information:

- [THORChain official website](https://thorchain.org/)
- [THORChain documentation](https://docs.thorchain.org/)
- [THORChain pool explorer](https://thorchain.net/#/pools)
- [THORChain swap interface](https://swap.thorchain.org/)

Confirm that ZEC appears as a supported source asset and that the relevant pool is active. A pool being visible does not necessarily mean every operation, such as liquidity deposits, is enabled.

### Zcash privacy considerations

Do not assume that a THORChain swap is a shielded Zcash transaction. The integration's actual address and transaction requirements determine which Zcash transaction type is used. Review the current integration documentation and wallet prompts, and avoid describing the swap as private unless that property is explicitly supported and verified.

## 2. Before you start

You will need:

- A self-custody wallet compatible with the source asset and the destination asset.
- Spendable ZEC on the Zcash network.
- Additional ZEC to cover the source-chain transaction fee.
- A destination address for the asset you intend to receive.
- Access to the official swap interface.
- Enough funds to account for the quoted fees and minimum transaction requirements.

Verify the domain before connecting a wallet. Never share your recovery phrase or private keys with a website, support agent, or anyone offering to help.

## 3. Swap native ZEC

The exact labels and sequence may vary as the interface changes. Follow the live interface and its current instructions.

### Step 1: Open the official swap interface

Visit [swap.thorchain.org](https://swap.thorchain.org/). Check the domain carefully before connecting a wallet.

### Step 2: Select ZEC as the source asset

Choose Zcash (ZEC) as the asset you want to spend, if it is listed and available. If ZEC is missing, the pool is paused, or the interface reports that swaps are unavailable, stop and check the official pool status. Do not send funds directly to a pool address.

### Step 3: Choose a destination asset

Select a supported asset, such as BTC or ETH, only if it is available in the interface. Confirm the destination network and asset carefully; similarly named assets on different networks are not interchangeable.

### Step 4: Enter the amount

Enter the amount of ZEC you want to swap. Review the estimated output, minimum received amount (if displayed), price impact, slippage, network fees, and any additional interface or affiliate fee.

### Step 5: Review the quote

Compare the expected output with the amount you intend to spend. Thin liquidity or a large trade relative to pool depth can increase price impact and fees. If the quote is unfavourable, reduce the amount or wait rather than proceeding blindly.

### Step 6: Enter and verify the receiving address

Use the destination wallet's receive address for the exact asset and network selected. Check the address carefully before confirming. Do not use an address copied from an unrelated transaction.

### Step 7: Confirm the source transaction

Follow the interface's current instructions to initiate the swap. Review the wallet prompt, amount, fee, and destination details before signing. The source transaction may need to receive the required confirmations before THORChain processes the swap.

### Step 8: Track completion

Use the transaction ID and the status shown by the interface to follow progress. Check the relevant blockchain explorer where available. Once the swap is marked complete, confirm that the destination asset arrived at the intended wallet.

**Screenshot to add:** Capture the real swap interface showing ZEC as the source, the selected destination asset, and the quote details. Use a test or public-facing view where possible and hide personal balances and sensitive information.

## 4. Provide liquidity to a ZEC pool

Liquidity providers contribute assets to a pool so other users can trade. Providers may receive a share of eligible trading fees, but returns vary and losses are possible.

**First verify that the ZEC pool is active and accepting deposits.** Do not assume that swap support automatically means liquidity provision is available.

### Step 1: Check the pool status

Open the [THORChain pool explorer](https://thorchain.net/#/pools) and find the ZEC pool. Check its status, liquidity depth, and whether deposits are enabled. If the pool is paused or deposits are unavailable, do not proceed.

### Step 2: Open the liquidity interface

Use an official THORChain interface that explicitly supports liquidity management for the ZEC pool. Confirm that the selected asset is native ZEC on the Zcash network.

### Step 3: Review the available deposit method

THORChain has supported different liquidity provision approaches, including single-sided (asymmetrical) and paired (symmetrical) deposits, depending on the pool and interface. Do not assume that both methods are enabled for ZEC. Use only the options currently displayed and documented for the pool.

### Step 4: Enter the deposit amount

Review the assets required, estimated position, minimums, and applicable fees. Keep enough ZEC outside the deposit to pay transaction fees and any other costs you may need.

### Step 5: Confirm and wait

Check the wallet prompt carefully before signing. Wait for the source transaction to receive the required confirmations and for the protocol to recognise the deposit. A successful source-chain transaction does not necessarily mean the position is immediately available.

### Step 6: Verify your position

Return to the liquidity interface and confirm that your position appears correctly. Keep a record of the pool, deposit date, amount, and transaction ID for later reference.

**Screenshots to add:** Capture the current ZEC pool status and the actual deposit options. Do not use mock screenshots to imply that an unavailable method is live.

## 5. Withdraw liquidity

Withdrawal options depend on the pool, the position, and the current protocol/interface status.

### Step 1: Open your position

Use the same compatible interface and wallet that you used to provide liquidity. Find your ZEC pool position.

### Step 2: Select withdrawal

Choose the available withdrawal or remove-liquidity action. Review whether partial withdrawal is supported and which assets will be returned.

### Step 3: Review the estimate

Check the estimated amounts, outbound fees, and any other costs shown. The quantities returned may differ from the quantities deposited because pool balances and asset prices change.

### Step 4: Confirm the withdrawal

Review the transaction details and confirm only if the assets and destination are correct. Wait for THORChain to process the request and send the resulting assets.

### Step 5: Verify receipt

Check the destination wallet and relevant blockchain explorer. If the withdrawal is pending, consult the official transaction status and documentation before trying again.

**Screenshot to add:** Include a real position and withdrawal confirmation screen once the flow has been verified.

## 6. Fees, slippage, and liquidity

A THORChain swap or liquidity operation can involve several costs. The live quote and current documentation are the source of truth for a specific transaction.

| Cost or factor | What it means |
| --- | --- |
| Source-chain fee | The network fee to send ZEC or another source asset. |
| Swap/liquidity fee | A protocol fee associated with the swap and pool liquidity used. |
| Destination-chain fee | The cost of sending the output asset on its destination network. |
| Interface or affiliate fee | An additional fee may apply when an interface or integrator charges one. |
| Deposit/withdrawal costs | Source-chain and outbound transaction fees may apply; the exact costs depend on the operation. |
| Slippage | The difference between the expected execution price and the actual execution price. |
| Price impact | How much the trade itself changes the pool exchange rate. |

A trade that is large relative to available liquidity may receive a worse rate and incur higher liquidity fees. Review the quote before confirming, especially when the pool has limited depth.

References: [THORChain documentation](https://docs.thorchain.org/) and [THORChain pool explorer](https://thorchain.net/#/pools).

## 7. Risks to understand

### Limited liquidity

A new or shallow pool can have greater price impact and less favourable quotes. Check current pool depth rather than relying on older figures.

### Impermanent loss

Liquidity providers are exposed to changes in the relative prices of the pool assets. If their relative values change, the value of a liquidity position can be lower than simply holding the assets separately. Trading fees may offset some losses, but this is not guaranteed.

### Market volatility

ZEC, RUNE, and destination assets can change in price while a transaction is pending or while liquidity is deposited.

### Protocol and network risk

Network congestion, protocol pauses, technical faults, or other operational problems can delay or interrupt swaps and withdrawals.

### Privacy limitations

A THORChain swap should not be treated as a shielded Zcash transaction unless the current integration explicitly supports and documents that behaviour.

### Address mistakes and scams

Sending funds to an incorrect address or incompatible network can result in permanent loss. Only use official links, verify wallet prompts, and never disclose recovery phrases or private keys.

### No guaranteed returns

Liquidity fees depend on trading activity and protocol conditions. Liquidity provision is not a guaranteed source of income.

## 8. Troubleshooting

- **ZEC is not listed:** Check the official interface and pool status. Do not send funds manually.
- **The quote is too expensive:** Review the fees, slippage, and pool depth; consider a smaller trade.
- **The swap is pending:** Check the source-chain confirmation status and the transaction status in the interface before taking further action.
- **A deposit is not displayed:** Confirm that the source transaction succeeded and check the current documentation and interface status.
- **A withdrawal has not arrived:** Review the withdrawal status and destination-chain transaction information. Use official support channels if it remains unresolved.

## 9. Official resources

- [THORChain website](https://thorchain.org/)
- [THORChain documentation](https://docs.thorchain.org/)
- [THORChain swap interface](https://swap.thorchain.org/)
- [THORChain pool explorer](https://thorchain.net/#/pools)

## Conclusion

THORChain can provide a route for native ZEC to interact with cross-chain liquidity when the relevant asset and pool operations are enabled. Before swapping or providing liquidity, verify the live pool status, quote, fees, supported deposit method, and withdrawal conditions.

Start with an amount you can afford to lose, confirm every address and wallet prompt, and remember that liquidity provision carries market and protocol risks. Update this guide when the interface or ZEC pool status changes so that screenshots and instructions continue to match the live experience.
