<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Transactions

ZEC is a widely-used digital asset for payments, offering strong privacy features that make it suitable for various transactions like paying friends, making purchases, or donating. To maximize privacy and security, it is essential to understand how different types of transactions work within Zcash.

## TL;DR

- Zcash supports two kinds of transaction: **shielded**, which keeps the details private, and **transparent**, which records them publicly.
- Shielded addresses begin with `u` or `z`. Transparent addresses begin with `t` and behave much like a Bitcoin address.
- The choice is yours on every payment. Privacy is an option Zcash gives you, not a setting someone else decides for you.
- Withdrawing from an exchange is the most common place people lose privacy. If the exchange only supports transparent withdrawals, shield the funds yourself once they arrive.
- Fees follow [ZIP 317](https://zips.z.cash/zip-0317) and grow with the size of the transaction. Wallets still sending the old flat fee can see their transactions delayed.
- Most Zcash transactions have an expiry height under [ZIP 203](https://zips.z.cash/zip-0203). If a transaction expires before it is mined, it cannot confirm after that expiry height and may need to be sent again.

## Shielded Transactions

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Explained: Zcash Shielded Transactions"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

Shielded transactions occur when you move ZEC into your shielded wallet. Your shielded wallet address starts with a `u` or `z`. When sending shielded transactions, you and the people you transact with can keep a level of privacy not possible on public-by-default payment networks.

Sending a shielded transaction is easiest when you use a wallet that supports the current Zcash network and current shielded pools. Before relying on a wallet for privacy, check whether it supports shielded sending, shielded receiving, and the pool you plan to use. When withdrawing ZEC from an exchange, check whether the exchange supports shielded or transparent withdrawals. If it only supports transparent withdrawals, move the funds into a shielded-capable wallet after they arrive.

Using shielded transactions to send and receive funds is the best way to preserve privacy and reduce the risk of leaking payment data.

## Transparent Transactions

Transparent transactions work similarly to Bitcoin transactions. Transaction details are publicly visible on the blockchain, including transparent addresses and transparent values. Transparent transactions should be avoided when privacy is a priority.

Transparent addresses are still useful in some situations, especially when an exchange or service does not support shielded addresses. If you receive ZEC to a transparent address, consider shielding it before making later payments.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Learn Zcash shielded wallets!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## A Simple Way to Picture It

A transparent transaction is a postcard. The postman delivers it, but anyone who handles it along the way can read the message, see who sent it and see who receives it.

A shielded transaction is a sealed envelope. The postal service still confirms that a real letter with real postage passed through the system, and nobody can forge one or send the same letter twice. What the envelope contains stays between sender and recipient.

The important part is that Zcash lets you decide which one to send, payment by payment.

## Zcash Fees

Let your wallet calculate the network fee, and review it before sending. Fees are paid in ZEC: **1 ZEC = 100,000,000 zatoshis**. A fee in US dollars also depends on the ZEC exchange rate.

### Why two payments can have different fees

[ZIP 317](https://zips.z.cash/zip-0317#fee-calculation) calculates the conventional fee from **logical actions**, rather than a percentage of the amount sent:

```text
fee in zatoshis = marginal fee × max(2, logical actions)
```

Logical actions measure transaction components. For example, an Orchard-only transaction uses its number of Orchard actions; a Sapling-only transaction uses the larger of its spend and output counts. Contributions from different pools are added. Transparent components use a size-based calculation. See ZIP 317 for the complete formula, including Ironwood and legacy Sprout.

Spending many small received notes or using several pools can therefore cost more than a simpler payment of the same value. A recipient count alone is not a fee calculator: change and padding also matter.

These examples start with an already calculated logical-action count:

| Logical actions | At 5,000 zatoshis per action | At 1,000 zatoshis per action |
| --- | --- | --- |
| 2 | 10,000 zatoshis / 0.0001 ZEC | 2,000 zatoshis / 0.00002 ZEC |
| 3 | 15,000 zatoshis / 0.00015 ZEC | 3,000 zatoshis / 0.00003 ZEC |
| 10 | 50,000 zatoshis / 0.0005 ZEC | 10,000 zatoshis / 0.0001 ZEC |

### Which marginal fee applies

**Checked 11 November 2026:** ZIP 317 lists revision 2 and [ZIP 2009](https://zips.z.cash/zip-2009) as proposed. Before revision 2, the marginal fee is 5,000 zatoshis. Revision 2 specifies 1,000, giving a 2,000-zatoshi minimum rather than 10,000.

The proposal specifies Mainnet height **3,590,000**, expected around 19 November 2026, and Testnet height **4,465,026**. A calendar estimate is not the activation condition. For wallets, the relevant height is the block in which the transaction is expected to be mined; nodes use the next block's height. Recheck the linked specifications and your wallet's release guidance as deployment changes.

Do not manually force the lower fee just because a proposal or software release mentions it. ZIP 2009 requires nodes to ship the new relay policy before wallets adopt the fee; nodes using the old parameters can refuse to relay the lower-fee transaction. Testnet and Mainnet also have different activation heights.

### If the estimate looks wrong

Check that your wallet is up to date and synced. Compare its network fee with the sending service's withdrawal charge separately: a service quote is not the ZIP 317 formula. For a pending payment, use the [troubleshooting steps below](#troubleshooting-stuck-transactions) before sending again.

ZIP 317 is a wallet and node policy, not a consensus rule requiring this exact fee. Paying the conventional fee improves relay compatibility; it does not promise a confirmation time.

## Troubleshooting Stuck Transactions

A Zcash transaction is not final just because it appears in your wallet. It becomes final for ordinary use after it is mined into a block and receives enough confirmations for your situation. Exchanges and services may require more confirmations than a wallet shows by default.

Expiry is a **block height**, not a fixed countdown. For an ordinary payment with a nonzero expiry height, that height is the last block in which it can be mined. For example, a payment expiring at height 3539 can be included in block 3539; block 3540 is too late. An expiry height of 0 means no expiry for an ordinary payment. See [ZIP 203](https://zips.z.cash/zip-0203).

Defaults are not universal deadlines. ZIP 203 specifies 40 blocks after Blossom, roughly 50 minutes at a 75-second target spacing. The proposed NU7 change recommends 120 blocks at a 25-second target spacing, also roughly 50 minutes ([ZIP 218](https://zips.z.cash/zip-0218)). Wallet settings and implementations can differ, and actual block intervals vary. Check the particular transaction's expiry height instead of timing a resend.

Expiry does not reverse an already mined payment or create a refund transaction. If the original expired without being mined, it never settled on-chain. Your wallet may need to sync before showing the associated funds as spendable again.

Use this decision tree before resending:

1. **Does your wallet show a transaction ID?**
   - If no, the wallet may not have created or broadcast the transaction yet. Check sync status, internet connection, wallet version, and any wallet error message.
   - If yes, copy the transaction ID and continue.
2. **Is the transaction confirmed in a block?**
   - If yes, wait for the number of confirmations required by your wallet, exchange, merchant, or service.
   - If no, continue.
3. **Has the unmined transaction passed its nonzero expiry height?**
   - If no, do not manually resend the same payment yet. The original transaction may still confirm.
   - If yes, let the wallet sync and verify that the original was not mined at or before that height. Then follow the wallet's guidance for creating a replacement if needed.
4. **Does the transaction appear on one server or explorer but not another?**
   - Treat this as a network visibility issue, not proof that the transaction failed. Different nodes can have different mempool views.
   - Wait, resync your wallet, or switch to another trusted server if your wallet supports that.
5. **Did the transaction disappear after appearing confirmed?**
   - A short chain reorganization can temporarily remove a transaction from the best chain.
   - Wait for more blocks. If the transaction returns, continue waiting for confirmations. If it does not return and later expires, create a new transaction.
6. **Is the wallet asking you to resend?**
   - Follow the wallet's current guidance only after checking that the previous transaction is expired, failed, or no longer valid.
   - If you are unsure, ask support before sending again.

## Pending, Expired, Dropped, and Reorged

- **Pending** means the transaction has been created or broadcast but has not yet been mined into a block.
- **Expired** means the transaction's expiry height has passed. Under ZIP 203, a transaction with an expiry height cannot be mined after that height.
- **Dropped** means one or more nodes no longer keep the transaction in their mempool. This can happen because of expiry, low fees, mempool policy, restart behavior, or relay differences.
- **Reorged** means a block that previously contained the transaction is no longer part of the best chain. The transaction may be mined again later, or it may return to pending if it is still valid.

## When Not to Resend

Do not resend immediately just because a transaction is pending, slow, or missing from one explorer. Resending too early can cause confusion and, depending on how the wallet builds the new payment, could risk paying twice.

Wait or get support first when:

- The transaction has a transaction ID and has not expired.
- One server shows it while another does not.
- It was recently mined but lost confirmations after a possible reorg.
- The receiving service has not finished counting confirmations.
- Your wallet is still syncing.

It is usually safer to resend only after the wallet clearly marks the transaction as expired or failed, or after support confirms that the original transaction cannot confirm.

## Privacy-Safe Checks

You can check basic transaction status without exposing more information than necessary:

- Check whether your wallet is fully synced.
- Check whether the wallet app is up to date.
- Check whether the transaction has a transaction ID.
- Check whether the transaction is confirmed, pending, expired, or failed.
- Check the current block height and compare it with the transaction expiry height if your wallet shows it.
- For transparent transactions, a block explorer can show the public transaction, addresses, values, and confirmations.
- For shielded transactions, a block explorer can show that a transaction exists, but it cannot show shielded sender, recipient, amount, or memo details.

## What Not to Share Publicly

Never post these in public chat, social media, or an issue tracker:

- Seed phrase or recovery phrase
- Spending key, private key, or wallet backup
- Full Viewing Key
- Screenshots showing balances, full addresses, memos, QR codes, or exchange account details
- Personal identity documents or account recovery records

A transaction ID is public on the chain, but it can still connect your support question to your identity. If privacy matters, share it only with a trusted support channel.

## What Support Teams Need

When asking wallet, exchange, or service support for help, share only the minimum useful information:

- Wallet or service name
- App version and operating system
- Whether the transaction is shielded, transparent, or between shielded and transparent addresses
- Transaction ID, if you are comfortable sharing it
- Approximate time sent
- Whether the wallet is fully synced
- Current status shown by the wallet
- Exact error message, with private data removed
- Screenshot with balances, addresses, memos, and account details hidden

Support teams do not need your seed phrase, spending key, private key, or full viewing key.

## Common Mistakes

- **Assuming that any wallet listing ZEC can send it privately.** A number of multi-coin wallets support the transparent side of Zcash only. Check the wallet's supported pools before you rely on it for privacy. The [Wallets](https://zechub.wiki/using-zcash/wallets) page lists this for each option.
- **Withdrawing to a transparent address and leaving the funds there.** The withdrawal itself is public, and every later movement from that address stays public too. Shield the funds once they arrive.
- **Treating privacy as something you turn on once.** Each transaction is a separate choice. Sending shielded today does not undo a transparent payment you made last week.
- **Reusing a transparent address for everything.** Because transparent activity is permanently visible, a single reused address gradually links payments that had no reason to be connected.
- **Sending with an outdated default fee.** Wallets that have not adopted ZIP 317 may still send the older flat fee, which can leave a transaction sitting unconfirmed.
- **Resending before expiry.** A pending transaction can still confirm until it expires. Check expiry status before creating another payment.

## Note

Please note that the safest way to use ZEC is using shielded transactions whenever the sender, recipient, wallet, and service all support them. Some wallets and exchanges support [unified addresses](https://web.archive.org/web/20260823012524/https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.), which can combine multiple Zcash receiver types into one address.

## Resources

- [ZIP 203: Transaction Expiry](https://zips.z.cash/zip-0203)
- [ZIP 317: Proportional Transfer Fee Mechanism](https://zips.z.cash/zip-0317)
- [Zcash ZIPs](https://zips.z.cash/)

## Related Pages

- [Wallets](/using-zcash/wallets) - which wallets support shielded sending, and which are transparent only
- [Payment disclosures](/zcash-tech/payment-disclosures) - how a sender can prove selected details of one shielded payment
- [Shielded Pools](/using-zcash/shielded-pools) - Sapling and Orchard, the pools your shielded funds live in
- [Memos](/using-zcash/memos) - encrypted messages that can travel with a shielded transaction
- [Transparent Exchange Addresses](/using-zcash/transparent-exchange-addresses) - TEX addresses and why exchanges use them
- [Custodial Exchanges](/using-zcash/custodial-exchanges) - which exchanges support shielded withdrawals

## ZEC to ZAT Converter
