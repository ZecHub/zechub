<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Payment_Disclosure.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Payment Disclosure

> Prove one specific payment to one specific person, and reveal nothing else.

A payment disclosure is a small cryptographic proof about a single shielded payment. It shows that a payment of a specific amount, carrying a specific memo, went to a specific address. Everything else about your wallet stays hidden: your balance, your other payments, and your counterparties. The mechanism is defined in [ZIP 310](https://zips.z.cash/zip-0310) for the Sapling pool.

Shielded payments are private by default, which is the point of Zcash. But sometimes you need to show someone that one payment really happened. Payment disclosure is the tool for that moment.

## When you would use one

- **A dispute with a vendor.** You paid, the vendor says the funds never arrived. A disclosure proves the exact payment: amount, destination, and memo.
- **An audit or accountant.** You hand over proof of the payments under review, not your whole history.
- **Proof of a donation or invoice payment.** The recipient, or anyone you choose, can verify the payment without seeing anything else.

## What it proves, and what it does not

A payment disclosure is narrow by design.

| It proves | It never reveals |
|---|---|
| One payment's amount | Your balance |
| The receiving address | Your other addresses |
| The memo that payment carried | Your other memos or payments |
| That the funds moved | Who you are, or anything linkable beyond that payment |

Compare this with [viewing keys](/zcash-tech/viewing-keys), which open up an entire account's activity, incoming or both directions. A viewing key is the right tool when an auditor needs the full picture. A payment disclosure is the right tool when only one payment is in question. Share the smallest thing that answers the question.

## How it works in practice

The sender's wallet creates the disclosure for a payment it made, using key material only the sender holds. The result is a compact piece of data you can paste into a message. Whoever receives it can verify it against the public blockchain: the proof checks out only if that exact payment exists on-chain. Nobody else could have produced it, and it cannot be reused to prove anything else.

Support lives in the wallet, not the protocol rules, so check whether your wallet exposes payment disclosure before you rely on it. Sapling addresses (`zs...`) remain widely supported across Zcash wallets; see [shielded pools](/using-zcash/shielded-pools) for where Sapling sits today.

## The privacy habit

Selective disclosure is a spectrum: nothing, one payment, or everything. Default to nothing. Reach for a payment disclosure when one payment is questioned, and a viewing key only when the full account genuinely needs review.
