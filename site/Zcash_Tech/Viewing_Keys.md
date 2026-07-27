<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Viewing Keys: Selective Transparency and Compliance

## Introduction

Privacy and accountability are often framed as opposites. Cryptocurrencies like Bitcoin expose every transaction to the world, making financial surveillance trivial. Zcash takes a different approach: it gives users **shielded transactions** that hide sender, receiver, and amount by default, while simultaneously providing cryptographic tools for **selective disclosure**.

The bridge between these two goals is the **viewing key**. A viewing key lets you prove your transaction history to an auditor, tax authority, or exchange — without handing over your private keys or exposing your entire wallet to the public blockchain.

This article explains what viewing keys are, the different types available, how selective disclosure works in practice, and how to derive and use them with `zec-cli`.

---

## 1. What Viewing Keys Are and the Problem They Solve

In Zcash, shielded (Sapling and Orchard) transactions encrypt their details on-chain. A third party looking at the blockchain sees that *a* transaction happened, but not who sent it, who received it, or how much moved. This is powerful for personal financial privacy.

But privacy creates a practical problem: **how do you prove your own transaction history when you need to?**

Consider these scenarios:

- A tax authority asks you to report your crypto income.
- An exchange needs to verify that a deposit belongs to your account.
- A corporate auditor needs to confirm the balances and flows of a company treasury.
- A court order requires you to disclose specific transactions.

With Bitcoin, the answer is simple but blunt: everyone can see everything. With Zcash, the answer is more surgical: you share a **viewing key** that decrypts only the transactions you choose to reveal.

A viewing key is a cryptographic key derived from your spending key (your private key). It can **decrypt and read** shielded transactions associated with your address, but it **cannot spend** funds. Sharing a viewing key is therefore safe in the sense that no one can steal your coins with it — they can only observe.

This design gives Zcash a property called **selective transparency**: you remain private by default, but you can open a window into your activity for specific parties, for specific purposes, without making your entire history public.

---

## 2. Types of Viewing Keys

Zcash defines three distinct viewing keys, each with a different scope. Understanding the differences is essential for using them safely.

### Full Viewing Key (FVK)

The **full viewing key** is the most powerful. It is derived directly from the spending key and grants the ability to:

- See all incoming transactions to the address.
- See all outgoing transactions from the address.
- Derive the payment address (the public receiving address).

Because the FVK can derive your public address, anyone who holds it can link all your transactions to a single identity. It is the appropriate tool when you need to give an auditor complete visibility into an account, but it should be shared only with highly trusted parties.

**Important:** The full viewing key does **not** allow spending. However, because it reveals both incoming and outgoing flows plus the address itself, treat it as sensitive information.

### Incoming Viewing Key (IVK)

The **incoming viewing key** is a subset of the full viewing key. It allows the holder to:

- Detect and decrypt all incoming transactions to the address.
- See the sender's payment address (if the sender used a non-ephemeral address) and the received amount.

The IVK **cannot** see outgoing transactions, and it **cannot** derive new payment addresses beyond what is already derivable from the FVK. This makes it ideal for use cases where a third party only needs to verify that funds arrived — for example, an exchange confirming a deposit.

### Outgoing Viewing Key (OVK)

The **outgoing viewing key** is used when you want a third party to see transactions you have **sent**. By default, Zcash outgoing transactions are encrypted in a way that only the sender can see them. The OVK allows the sender to create an additional ciphertext that a designated viewer can decrypt.

In practice, the OVK is embedded in the transaction at send time. If you send a transaction and include the recipient's OVK (or a third-party auditor's OVK) in the output, that party can later decrypt and view the transaction details. This is less commonly used than the IVK but is important for corporate and compliance workflows where an auditor needs to trace outflows.

### Summary Table

| Key Type | Sees Incoming | Sees Outgoing | Derives Address | Can Spend |
|---|---|---|---|---|
| Full Viewing Key (FVK) | Yes | Yes | Yes | No |
| Incoming Viewing Key (IVK) | Yes | No | Limited | No |
| Outgoing Viewing Key (OVK) | No | Yes (if embedded) | No | No |

---

## 3. How Selective Disclosure Works

Selective disclosure in Zcash is not an all-or-nothing switch. You can share different keys with different parties, each seeing a different slice of your activity.

### Scenario: Tax Audit

Suppose a tax authority requests proof of your Zcash holdings and transaction history for the past year. You have two options:

1. **Share your full viewing key.** The auditor can scan the blockchain, decrypt all your incoming and outgoing shielded transactions, and reconstruct your complete history. They see everything you see, but they cannot move your funds.

2. **Share individual transaction proofs.** For each transaction in question, you can provide the transaction ID and the decryption key for that specific output. The auditor verifies that specific transaction without seeing anything else.

Option 1 is simpler for comprehensive audits. Option 2 is more privacy-preserving and appropriate when only specific transactions are under review.

### Scenario: Exchange Deposit Verification

When you deposit Zcash to an exchange, the exchange needs to confirm that the deposit is real and belongs to your account. With transparent addresses, this is trivial — the exchange just watches the blockchain. With shielded addresses, the exchange cannot see the deposit unless you help.

The standard approach: you provide the exchange with an **incoming viewing key** for the deposit address. The exchange uses the IVK to scan the blockchain, detect the incoming transaction, decrypt the amount, and credit your account. The exchange never sees your outgoing transactions or your overall balance.

### Scenario: Corporate Treasury Auditing

A company holds Zcash in a shielded treasury wallet. Quarterly, an external auditor must verify the balance and review transactions. The company can:

- Generate a dedicated audit address with its own FVK.
- Route all treasury transactions through that address.
- Share the FVK with the auditor at audit time.

The auditor gets a complete, verifiable picture of treasury activity without the company exposing its spending keys or its other wallets.

---

## 4. Use Cases

### Tax Compliance

Tax authorities in many jurisdictions require taxpayers to report cryptocurrency transactions. Zcash viewing keys make this possible without abandoning privacy for everyday use. You can maintain a private shielded wallet and only disclose what is legally required, when it is required.

Some tax software and compliance tools are beginning to support Zcash viewing key import, allowing automated transaction classification and cost-basis calculation for shielded transactions.

### Exchange Deposits and Withdrawals

Exchanges that support shielded Zcash deposits use incoming viewing keys to detect and confirm deposits. This allows them to offer Zcash trading pairs without requiring users to move funds to transparent addresses, preserving user privacy up to the point of deposit.

### Corporate and Nonprofit Auditing

Organizations that hold Zcash can use viewing keys to provide auditors with verifiable proof of reserves and transaction flows. This is particularly relevant for nonprofits that accept Zcash donations and must demonstrate proper use of funds.

### Legal and Regulatory Disclosure

In response to a court order or regulatory inquiry, a Zcash user can disclose specific transactions or their entire history using viewing keys. This satisfies legal obligations without making the user's financial life permanently public on the blockchain.

### Personal Record-Keeping

You can use your own viewing keys to build personal transaction records, generate statements, or feed data into portfolio tracking tools — all without exposing your data to third parties.

---

## 5. Deriving and Using Viewing Keys with zec-cli

The following examples use `zec-cli`, the command-line interface for interacting with a Zcash node. Ensure your node is fully synced before running these commands.

### Exporting the Full Viewing Key

To export the full viewing key for a shielded address:

```bash
zec-cli z_exportviewingkey "zs1exampleaddress..."
```

This returns the FVK as a string. Share it only with trusted parties.

### Exporting the Incoming Viewing Key

To export the incoming viewing key:

```bash
zec-cli z_exportkey "zs1exampleaddress..."
```

Note: depending on your wallet implementation, the IVK may be exported as part of the FVK or as a separate key. In `zcashd`, the `z_exportkey` command exports the spending key (private key), **not** the viewing key. To export viewing keys specifically, use:

```bash
zec-cli z_exportviewingkey "zs1exampleaddress..."
```

This returns the full viewing key. The incoming viewing key can be derived from the FVK by the receiving party using standard Zcash key derivation (defined in ZIP 316 for unified addresses).

### Importing a Viewing Key

An auditor or exchange that receives a viewing key can import it to scan for transactions:

```bash
zec-cli z_importviewingkey "viewingkeystring..." "rescan" 0
```

The `"rescan"` argument tells the node to scan the entire blockchain for transactions related to this key. The `0` specifies the starting block height. For large blockchains, this can take significant time.

After import, the wallet will detect and decrypt relevant transactions. The auditor can then use standard wallet commands to view the balance and transaction history:

```bash
zec-cli z_getbalance "zs1exampleaddress..."
zec-cli z_listreceivedbyaddress "zs1exampleaddress..."
```

### Sending with an Outgoing Viewing Key

When sending a transaction, you can include an OVK so that a designated third party can view the transaction later. This is done by specifying the `ovk` field in the transaction construction:

```bash
zec-cli z_sendmany "zs1senderaddress..." '[{"address": "zs1recipientaddress...", "amount": 1.5, "ovk": "ovkstring..."}]'
```

The holder of the specified OVK can later decrypt this transaction's details.

### Unified Addresses and Viewing Keys

Modern Zcash wallets use **unified addresses** (UAs), which bundle multiple receiver types (Sapling, Orchard, transparent) into a single address. Unified viewing keys work similarly but cover all receiver types within the UA. When exporting a viewing key for a unified address, you get a unified viewing key that can decrypt transactions across all protocols.

---

## 6. Limitations: What Viewing Keys Can and Cannot Reveal

Viewing keys are powerful, but they have important limitations. Understanding these prevents misuse and sets correct expectations.

### What Viewing Keys CAN Reveal

- **Incoming transaction amounts and senders** (with IVK or FVK).
- **Outgoing transaction amounts and recipients** (with FVK, or with OVK if embedded at send time).
- **The payment address** associated with the key (with FVK).
- **Transaction metadata** such as block height and transaction ID.
- **Memo fields**, if the sender included one and the key covers that output.

### What Viewing Keys CANNOT Reveal

- **They cannot spend funds.** A viewing key is strictly read-only. No amount of sharing a viewing key puts your coins at risk of theft.
- **They cannot reveal transactions you did not participate in.** A viewing key only decrypts transactions involving the specific address it was derived from.
- **They cannot retroactively reveal outgoing transactions if no OVK was embedded.** If you sent a transaction without including an OVK, even the full viewing key holder may not see the outgoing details, depending on the wallet implementation and protocol version.
- **They do not reveal the spending key.** You cannot derive the private (spending) key from a viewing key. The cryptographic construction (based on elliptic curve operations) ensures this is computationally infeasible.
- **They do not reveal other addresses in your wallet.** Each address has its own viewing key. Sharing one does not expose others, unless they were derived from the same seed and the viewer knows the derivation path.

### Practical Caveats

- **Blockchain analysis correlation.** If you share a viewing key with one party and a different key with another, and both parties collude, they may be able to correlate transactions and build a more complete picture. This is a social/operational risk, not a cryptographic one.
- **Timing of disclosure.** Sharing a viewing key reveals your history up to that point. Future transactions are also visible to the key holder as they occur. If you want to stop disclosure, stop using that address.
- **Wallet implementation differences.** Not all wallets support all viewing key types equally. Some wallets may not expose the OVK or may handle unified viewing keys differently. Always verify with your specific wallet documentation.

---

## Conclusion

Zcash viewing keys resolve the apparent conflict between financial privacy and accountability. They allow you to keep your transactions shielded from the public while retaining the ability to disclose them selectively to auditors, exchanges, tax authorities, or anyone else you choose to trust.

The three key types — full, incoming, and outgoing — give you fine-grained control over what you reveal. A viewing key is a read-only window, not a backdoor: it cannot spend your funds, and it exposes only the transactions you authorize.

For developers, compliance officers, and everyday users, understanding viewing keys is essential to using Zcash responsibly. They are the mechanism that makes Zcash not just a private cryptocurrency, but a **compliant** one — capable of meeting legal and regulatory requirements without sacrificing the privacy that makes it valuable.

---

## Further Reading

- [ZIP 316: Unified Addresses](https://zips.z.cash/zip-0316)
- [Zcash Protocol Specification](https://zips.z.cash/protocol/protocol.pdf)
- [Zcash RPC Documentation](https://zcash.github.io/rpc/)
- [ZecHub Wiki](https://zechub.wiki/)
