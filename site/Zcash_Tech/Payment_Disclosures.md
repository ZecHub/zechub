<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Payment_Disclosures.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Shielded proof of payment and payment disclosures

## TL;DR

- A transaction ID identifies a transaction, but it does not reveal a shielded recipient, amount, or memo.
- A payment disclosure is designed to let the sender prove selected details of one payment without exposing the rest of their wallet history.
- A viewing key grants ongoing read access to an address or account. Use it for continuing audits, not for a one-payment dispute.
- A payment disclosure cannot prove delivery of goods, identify a person by itself, reverse a payment, or replace confirmation checks.
- [ZIP 311](https://zips.z.cash/zip-0311) is still a **Draft**. Its current text leaves Orchard support, transparent-input support, encoding, versioning, and user-interface rules unfinished.

## Why a transaction ID is not enough

Anyone can inspect the public details of a transparent Zcash payment. A block explorer can show its addresses, amounts, and confirmation status.

A shielded payment works differently. The chain proves that the transaction followed Zcash's rules, but it does not publish the shielded sender, recipient, amount, or memo. Sharing the transaction ID can show that a transaction was mined, but it cannot prove to a merchant or third party which private payment was inside it.

This creates a practical problem. A customer may need to resolve a merchant dispute, an exchange may need to prove that it processed a withdrawal, or a donor may want to prove one contribution. Sharing a full viewing key would reveal much more than any of these cases require.

[ZIP 311: Zcash Payment Disclosures](https://zips.z.cash/zip-0311) proposes a narrower answer: disclose and authenticate selected information from one transaction.

![A transaction ID proves that a transaction exists but does not reveal shielded payment details. A ZIP 311 payment disclosure would let a verifier authenticate only the selected recipient, amount, memo, and optional sender details against the mined transaction.](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/payment-disclosure-proof-flow.png)

## How a payment disclosure works

The basic flow is:

1. The verifier gives the sender a unique challenge or reference, when an interactive proof is appropriate.
2. The sender selects the transaction and the shielded output or outputs to disclose.
3. Compatible wallet software creates a payment disclosure tied to that transaction and, optionally, the challenge.
4. The sender gives the disclosure to the verifier.
5. The verifier obtains the real transaction from a trusted Zcash node, checks that it was mined, and verifies the disclosure against it.
6. A valid result confirms only the claims contained in that disclosure.

The ZIP's Sapling design uses an outgoing cipher key to recover each selected output. This can reveal the output's recipient, amount, and memo. It also requires proof of spend authority for at least one transaction input, so a person who merely sees the transaction cannot create a valid disclosure as though they sent it.

A Sapling payment disclosure does not have to reveal a sender address. Spend authority can control many diversified addresses, so proving control of the spend does not automatically identify one address. ZIP 311 includes an optional address proof for cases where linking the proof to a known sender address is necessary.

## Payment disclosure or viewing key?

| Method | Best use | What it reveals | Ongoing access? | Cryptographically tied to the payment? |
| --- | --- | --- | --- | --- |
| Transaction ID | Checking that a transaction was mined | Public transaction data and confirmations | No | Yes, but shielded payment details remain hidden |
| Screenshot or receipt | Informal record keeping | Whatever the sender chooses to display | No | No; the image can be edited |
| Payment disclosure | Proving selected details of one payment | Selected transaction outputs and any included sender or challenge proof | No, but the shared proof can be copied | Yes |
| Incoming viewing key | Monitoring payments received by an account | Incoming activity covered by the key | Yes | It decrypts matching incoming payments |
| Full viewing key | Accounting or auditing an account | Incoming and outgoing activity, amounts, memos, and balances covered by the key | Yes | It decrypts matching account activity |

Use the smallest disclosure that answers the question. A merchant dispute about one payment does not normally justify access to every payment in an account. An accountant who must review a full reporting period may need a viewing key instead.

Neither method grants permission to spend. Never share a seed phrase, spending key, private key, or wallet backup as proof of payment.

![A transaction record is available today but provides no new third-party proof. A payment disclosure would prove selected details of one payment. A viewing key provides broader, ongoing visibility.](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/payment-disclosure-scope.png)

## What can I use today?

No current wallet is identified here as implementing ZIP 311 payment-disclosure creation or verification. The ZIP remains a draft and lists its reference implementation as "TBD." The following maintained tools can still help the sender, recipient, or an authorized auditor inspect the records that are available today:

| App | Useful today for | Important limit |
| --- | --- | --- |
| [Zkool](https://github.com/hhanh00/zkool2) | Viewing detailed transaction metadata, amounts, pool inputs and outputs, and memos; importing Unified or Sapling viewing keys into view-only accounts | Does not advertise ZIP 311 disclosure creation or verification |
| [Zingo PC](https://github.com/zingolabs/zingo-pc) | Reviewing shielded transaction history and memos; importing a Unified Full Viewing Key in read-only mode | A wallet record or read-only account is not a selectively scoped payment disclosure |
| [Zallet](https://zcash.github.io/zallet/) | Operator workflows using `z_viewtransaction`, `z_exportviewingkey`, and `z_importviewingkey` | Beta software; its viewing-key and transaction RPCs are broader or local records, not ZIP 311 proofs |

Use the wallet that sent or received the payment first. Check its transaction details, memo, transaction ID, and confirmations, then ask the other party to compare those details with its own records. Do not install a new wallet and enter a seed phrase merely to produce evidence. If an auditor needs continuing visibility, consider a compatible view-only account and understand the scope of the viewing key before sharing it.

These apps are practical alternatives for checking records, not proof that a standardized payment disclosure is available. A screenshot can help people compare records, but it is editable and is not cryptographic proof.

## Where payment disclosures apply

### Merchant disputes

A customer could prove that a specific amount was sent to the merchant's shielded address. The proof does not establish that goods were delivered, that a refund is owed, or that the person presenting it has a particular legal identity. Those questions still depend on the order record and the parties' agreement.

### Shielded withdrawals

ZIP 311 lists shielded withdrawals as a target use case: an exchange would prove the recipient and amount without publishing those details on-chain. Its transparent-input proof is still unfinished, so this is not yet a complete standardized workflow. The customer must also check the transaction's confirmation status independently.

### Donations

A donor or campaign could prove a particular contribution while leaving unrelated payments private. Publishing the disclosure makes its selected details public to everyone who receives a copy, so a private verification channel is safer when public proof is unnecessary.

### Accounting

Use a payment disclosure when an accountant needs evidence for one transaction. Use the narrowest suitable viewing key when the accountant needs continuing access to many transactions or a complete reporting period.

## A privacy-safe workflow

ZIP 311 is not yet a finished, widely deployable wallet standard. When compatible sender and verifier tools become available, use this checklist:

1. **Confirm compatibility first.** Both tools must support the same disclosure format and the shielded pool used by the payment.
2. **Resolve ordinary problems first.** Check wallet sync, the transaction ID, confirmation count, expiry status, and the recipient's records before revealing private details.
3. **Request a challenge.** For a dispute, the verifier should provide a fresh order number or random challenge so the disclosure is tied to that request.
4. **Select only the needed output.** Do not include unrelated outputs from the same transaction.
5. **Preview every revealed field.** Check the recipient, amount, memo, sender-address proof, and challenge before exporting.
6. **Share through a private channel.** A disclosure is not a secret spending key, but anyone who receives it may retain or redistribute the information it reveals.
7. **Verify against the chain.** The verifier must fetch the exact transaction from a trusted node, confirm that it is in the intended network and block, then validate the disclosure.
8. **Record the result, not extra secrets.** Keep only what the dispute, withdrawal, donation, or accounting process requires.

If the wallet cannot generate a disclosure, do not substitute a full viewing key without understanding its broader and permanent scope. Ask whether the recipient can confirm the payment from its own wallet records or accept a less sensitive record instead.

## What a valid disclosure does not prove

A successful verification does not prove:

- That the transaction has enough confirmations for the verifier's risk policy
- That a chain reorganization cannot remove a recent transaction
- That goods or services were delivered
- That a refund or chargeback is required
- That the sender controls a particular address, unless an appropriate address proof is included
- That the person presenting the disclosure has a claimed real-world identity
- That undisclosed outputs, other transactions, or the wallet's balance have any particular value
- That the disclosure remains private after it is shared

The verifier must check chain inclusion and confirmation status separately. ZIP 311's verification procedure assumes the caller has already obtained the mined transaction and its block height.

## Current limitations

Treat ZIP 311 as a proposed standard, not as a promise that a current wallet has a working **Prove payment** button.

The draft currently specifies Sapling spends and outputs, but still contains unfinished items for Orchard, transparent inputs, the disclosure encoding, versioning, and how wallets should display different levels of validity. Its reference implementation is also listed as "TBD." As written, it does not define payment disclosures for Orchard or Ironwood payments.

The sender may also be unable to disclose an output if the transaction was deliberately created without an outgoing viewing key for that output. ZIP 311 preserves that privacy choice rather than creating a new recovery path.

Older documentation describes the experimental `z_getpaymentdisclosure` and `z_validatepaymentdisclosure` commands in `zcashd`. Those commands supported **Sprout JoinSplit outputs only**, not the Sapling design in ZIP 311, and were deprecated. `zcashd` reached its final End-of-Support halt in July 2026. Do not use that legacy walkthrough as instructions for current funds.

These gaps do not make the idea useless. They explain why a careful guide must separate the privacy model and use cases from software that is ready for ordinary users.

## FAQ

### Can I prove a shielded payment with only the transaction ID?

No. The ID can identify the transaction and its confirmation status, but the shielded recipient, amount, and memo are not public.

### Is a payment disclosure the same as a viewing key?

No. A disclosure is scoped to selected details of one transaction. A viewing key can reveal matching activity for an address or account over time.

### Can the recipient create the sender's proof?

Not under the ZIP 311 design. A valid disclosure must prove spend authority for at least one input. The recipient can confirm a payment using their own wallet records, but that is a different claim.

### Can I revoke a disclosure after sharing it?

No. It does not grant future account access like a viewing key, but the revealed data and proof can be copied. Share it as carefully as any private financial record.

### Does verification move or lock any ZEC?

No. Creating or verifying a disclosure does not spend, refund, freeze, or reverse funds.

### What should I use today if my wallet has no disclosure feature?

Start with the recipient's wallet records, the transaction ID and confirmation status, an invoice reference in the encrypted memo, or another mutually accepted receipt. Use a viewing key only when its wider scope is genuinely needed and understood.

## Resources

- [ZIP 311: Zcash Payment Disclosures](https://zips.z.cash/zip-0311) - the draft design, requirements, verification process, and privacy considerations
- [ZIP 310: Security Properties of Sapling Viewing Keys](https://zips.z.cash/zip-0310) - what viewing keys reveal and which guarantees they provide
- [ZIP 304: Sapling Address Signatures](https://zips.z.cash/zip-0304) - the optional address-proof mechanism referenced by ZIP 311
- [Zcash protocol specification](https://zips.z.cash/protocol/protocol.pdf) - Sapling note encryption, outgoing viewing keys, and spend authorization
- [Archived zcashd payment-disclosure document](https://github.com/zcash/zcash/blob/master/doc/payment-disclosure.md) - historical Sprout-only implementation, not a current guide
- [zcashd deprecated features](https://zcash.github.io/zcash/user/deprecation.html) - status of the old experimental disclosure commands

## Related pages

- [Transactions](/using-zcash/transactions) - shielded payments, confirmations, and transaction troubleshooting
- [Viewing keys](/zcash-tech/viewing-keys) - ongoing read-only access and current export options
- [What a block explorer can see](/zcash-tech/what-a-block-explorer-can-see) - public and private transaction fields
- [Keeping records with shielded ZEC](/zcash-use-cases/keeping-records-with-shielded-zec) - accounting without publishing wallet history
