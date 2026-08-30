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

Zcash does not use Ethereum-style gas units. Zcash transaction fees are paid in ZEC, usually measured in **zatoshis**. One ZEC equals 100,000,000 zatoshis.

[ZIP 317](https://zips.z.cash/zip-0317) defines a conventional fee mechanism that scales with transaction complexity. Instead of every transaction using the old 1,000-zatoshi flat fee, the conventional fee is based on "logical actions" such as inputs, outputs, and shielded actions. Simple transactions commonly start around 10,000 zatoshis, or 0.0001 ZEC, and more complex transactions can require more.

In most current wallets, users should not need to manually calculate ZIP 317 fees. The wallet should choose an appropriate fee automatically. If a wallet still uses the old flat fee or lets you set a fee far below the ZIP 317 conventional fee, the transaction may be delayed, deprioritized, dropped by some nodes, or fail to relay reliably.

## Troubleshooting Stuck Transactions

A Zcash transaction is not final just because it appears in your wallet. It becomes final for ordinary use after it is mined into a block and receives enough confirmations for your situation. Exchanges and services may require more confirmations than a wallet shows by default.

Use this decision tree before resending:

1. **Does your wallet show a transaction ID?**
   - If no, the wallet may not have created or broadcast the transaction yet. Check sync status, internet connection, wallet version, and any wallet error message.
   - If yes, copy the transaction ID and continue.
2. **Is the transaction confirmed in a block?**
   - If yes, wait for the number of confirmations required by your wallet, exchange, merchant, or service.
   - If no, continue.
3. **Has the transaction reached its expiry height?**
   - If no, do not manually resend the same payment yet. The original transaction may still confirm.
   - If yes, the transaction cannot be mined after that expiry height. Your wallet may mark it as expired or failed, and you may need to create a new transaction.
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
- Full viewing key
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

Please note that the safest way to use ZEC is using shielded transactions whenever the sender, recipient, wallet, and service all support them. Some wallets and exchanges support [unified addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.), which can combine multiple Zcash receiver types into one address.

## Resources

- [ZIP 203: Transaction Expiry](https://zips.z.cash/zip-0203)
- [ZIP 317: Proportional Transfer Fee Mechanism](https://zips.z.cash/zip-0317)
- [Zcash ZIPs](https://zips.z.cash/)

## Related Pages

- [Wallets](/using-zcash/wallets) - which wallets support shielded sending, and which are transparent only
- [Shielded Pools](/using-zcash/shielded-pools) - Sapling and Orchard, the pools your shielded funds live in
- [Memos](/using-zcash/memos) - encrypted messages that can travel with a shielded transaction
- [Transparent Exchange Addresses](/using-zcash/transparent-exchange-addresses) - TEX addresses and why exchanges use them
- [Custodial Exchanges](/using-zcash/custodial-exchanges) - which exchanges support shielded withdrawals

## ZEC to ZAT Converter
