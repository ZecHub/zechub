<a href="https://github.com/zechub/zechub/edit/main/site/privacy/Privacy_as_a_Core_Principle.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Privacy as a Core Principle

## TL;DR {#tldr}

Financial privacy is not about hiding wrongdoing — it is a prerequisite for freedom. Zcash was designed from the ground up to make privacy the default, using zero-knowledge cryptography to let anyone transact confidentially on a public, auditable blockchain. This page explains why privacy matters, how Zcash implements it, and how to use it effectively.

---

## Why Financial Privacy Matters {#why-financial-privacy-matters}

Privacy and transparency are often described as opposites. In financial systems, this framing is wrong. What matters is *who* can see *what*, and *when*.

Consider what permanent public visibility of your transactions actually means:

- **Employers and clients** can see your complete financial history: other clients, income ranges, spending patterns
- **Merchants** can see your total crypto holdings before you negotiate a price
- **Governments** in authoritarian contexts can surveil political donations, religious tithing, or civil society funding
- **Criminals** can identify high-value targets by scanning public balances
- **Advertisers and data brokers** can build behavioral profiles from on-chain activity — permanently, without consent

Traditional financial systems are not fully private, but they have structural limits on surveillance: banks don't publish customer records, payment processors don't make transactions searchable by anyone with a browser. On transparent blockchains, these protections don't exist by default.

Privacy is not the enemy of accountability. Zcash supports selective disclosure — the ability to prove specific transactions to specific parties without opening your entire financial life to public inspection.

> "Privacy is necessary for an open society in the electronic age." — Cypherpunk Manifesto, 1993

Zcash was built by the Electric Coin Company as a direct expression of this principle: financial privacy should be a default, not a workaround.

---

## How Zcash Implements Privacy {#how-zcash-implements-privacy}

Zcash's privacy architecture is built on **zero-knowledge proofs (ZK-proofs)** — specifically zk-SNARKs. A zero-knowledge proof lets one party (the prover) convince another party (the verifier) that a statement is true without revealing any information beyond the truth of the statement.

Applied to transactions: Zcash can prove that a transaction is valid — that the sender had sufficient funds, that the transaction was authorized by the rightful owner, that no new ZEC was created out of thin air — without revealing:

- Who the sender is
- Who the receiver is
- How much was sent
- The content of any attached memo

This makes Zcash's privacy fundamentally different from privacy "by obfuscation" (mixing, CoinJoin, layer-2 channels) — those approaches try to make surveillance harder; Zcash's shielded transactions make surveillance cryptographically impossible for outside observers.

### The Three Shielded Pools {#three-shielded-pools}

Zcash has evolved through three generations of shielded pools:

| Pool | Introduced | Proving System | Status |
|------|-----------|----------------|--------|
| Sprout | Genesis (2016) | zk-SNARKs (Groth16) | Deprecated — do not use |
| Sapling | NU2 (2018) | zk-SNARKs (Groth16) | Active, widely supported |
| Orchard | NU5 (2022) | Halo 2 | Active, most current — preferred |

**Orchard** is the current recommended shielded pool. It uses the **Halo 2** proving system, which eliminates the need for a trusted setup. All current wallets (Zashi, Ywallet, Nighthawk) support Orchard by default via Unified Addresses.

---

## Shielded vs. Transparent Transactions {#shielded-vs-transparent}

Zcash supports both transparent and shielded transactions. Understanding the difference is essential for using Zcash's privacy correctly.

### Transparent Transactions {#transparent-transactions}

Transparent transactions in Zcash work like Bitcoin transactions:

- Sender address is public
- Receiver address is public
- Amount is public
- The transaction is permanently searchable by anyone

Transparent addresses start with `t1...`. They exist for exchange compatibility and legacy reasons. For privacy-sensitive uses, they should be avoided.

### Shielded Transactions {#shielded-transactions}

Shielded transactions in Zcash hide sender, receiver, amount, and memo:

- Sender address: **hidden** (replaced by a cryptographic commitment)
- Receiver address: **hidden**
- Amount: **hidden** (encrypted in the transaction)
- Memo (512 bytes): **hidden** (encrypted; only readable by sender and receiver with viewing key)

A shielded transaction produces a public on-chain record that a transaction occurred, but reveals nothing about the parties or amount. The blockchain verifies validity via zero-knowledge proof without learning the details.

### Transaction Types and Privacy Implications {#transaction-types}

| Transaction type | From | To | Privacy level | Notes |
|-----------------|------|----|---------------|-------|
| z → z (shielded) | Shielded | Shielded | Maximum | Sender, receiver, amount all hidden |
| t → z (shielding) | Transparent | Shielded | Partial | Source address is visible; destination hidden |
| z → t (deshielding) | Shielded | Transparent | Partial | Destination is visible; source hidden |
| t → t (transparent) | Transparent | Transparent | None | Fully public, like Bitcoin |

**For maximum privacy, always use z → z transactions.** Even one transparent transaction in your history can break the privacy of the surrounding transactions if you're not careful.

---

## Unified Addresses {#unified-addresses}

**Unified Addresses (UAs)** were introduced in NU5. A Unified Address bundles multiple receiver types — Orchard, Sapling, and transparent — into a single string that starts with `u1...`.

When someone sends ZEC to your Unified Address, their wallet automatically selects the most private supported receiver: Orchard if both wallets support it, otherwise Sapling, otherwise transparent.

This means:
- You share one address for all purposes
- Privacy level improves automatically as senders upgrade their wallets
- Legacy wallets can still send to a UA via the transparent receiver (less private, but compatible)

Always share a Unified Address rather than a bare Sapling or transparent address when receiving ZEC.

---

## Viewing Keys: Selective Disclosure {#viewing-keys}

Zcash's privacy system supports **selective disclosure** — the ability to prove specific financial information to specific parties without exposing your full history.

### Incoming Viewing Key (IVK) {#incoming-viewing-key}

An Incoming Viewing Key allows the holder to see all **incoming** transactions to your shielded address — amounts, timestamps, and memos. It does not allow spending.

Use cases:
- Sharing with an accountant to verify income
- Providing to an auditor for compliance
- Enabling donation reporting without exposing donor identities

### Full Viewing Key (FVK) {#full-viewing-key}

A Full Viewing Key allows the holder to see both incoming AND outgoing transactions — the complete transaction history of an account. It does not allow spending.

Use case: compliance with legal or regulatory requirements, where full account visibility is required by a specific party.

### Payment Disclosure {#payment-disclosure}

Zcash also supports payment-specific disclosure: you can prove that a specific transaction occurred between two parties without revealing any other history. This is useful for disputes or audits involving a single payment.

---

## Privacy Best Practices {#privacy-best-practices}

Following these practices maximizes your privacy when using Zcash:

### Always use shielded addresses for receiving {#use-shielded-addresses}

Share only your Unified Address with counterparties. If a merchant or service asks for a transparent address, check whether they support Unified Addresses first. Accepting funds to a transparent address creates a public record.

### Shield funds immediately after exchange withdrawal {#shield-after-exchange}

Exchanges typically send ZEC to a transparent address (for compliance and legacy reasons). As soon as you receive ZEC from an exchange, send it to your own shielded address to shield it. The shielding transaction (t → z) is visible, but all subsequent z-to-z transactions are private.

### Separate wallets for different identities {#separate-wallets}

If you have a public persona and a private one, use separate wallets or accounts for each. Zcash's privacy protects the contents of transactions, but if you link two addresses to each other (by spending from both in one transaction, or by publicly associating both), they can be correlated.

### Be cautious with memos {#memo-caution}

Zcash shielded memos (512 bytes) are encrypted — only the sender and receiver can read them. However, they are permanently stored on-chain. Don't put names, locations, or sensitive identifying information in memos. Use coded references (invoice IDs, project codes) instead.

### Don't reuse addresses across contexts {#address-reuse}

Modern Zcash wallets automatically generate new addresses for each transaction. Don't manually reuse a single address across different counterparties — this creates a link between them.

### Verify transaction type before sending {#verify-transaction-type}

Before sending ZEC, verify that your wallet will use a shielded transaction. In Zashi, the send flow defaults to shielded. In Ywallet, check the balance source before sending.

---

## Common Mistakes {#common-mistakes}

| Mistake | Why it breaks privacy | Fix |
|---------|----------------------|-----|
| Using a t-address for receiving | All transactions are public | Share Unified Address only |
| Not shielding exchange withdrawals immediately | Transparent history is permanent | Shield to z-address right after receiving |
| Mixing transparent and shielded funds carelessly | Correlates public and private identities | Shield first; all spending from shielded |
| Posting memo content publicly | Memo content reveals private context | Never repost or quote memo contents |
| Using one wallet for all purposes | Correlates different parts of financial life | Separate accounts or wallets per context |

---

## Privacy in Context: Zcash vs. Other Approaches {#privacy-comparison}

| Approach | Mechanism | Limitation |
|----------|-----------|------------|
| Bitcoin with CoinJoin | Mixes transactions to obscure flow | Participants can be identified by amount correlation |
| Monero | Ring signatures + stealth addresses | Different privacy model; no selective disclosure |
| Tornado Cash (Ethereum) | Smart contract mixer | Regulatory action; protocol-level, not native |
| Zcash shielded | ZK-proof per transaction | Privacy only applies to shielded transactions (t-address use reduces guarantees) |

Zcash's approach is unique in combining **protocol-level, cryptographically enforced privacy** with **selective disclosure mechanisms**. Privacy is not an opt-in feature — it is part of the consensus rules, enforced by the Zcash network itself.

---

## Summary {#summary}

Privacy is not a feature Zcash added to a transparent blockchain — it is the core design goal. The entire architecture, from Groth16 to Halo 2 to Unified Addresses, exists to make financial privacy practical and default for users.

To use Zcash as intended:
1. Use Unified Addresses for all receiving
2. Always transact z-to-z
3. Shield exchange funds immediately
4. Use viewing keys for selective disclosure, not transparent addresses for convenience

Privacy is not secrecy. It is control over your own information.

---

## Related Pages {#related-pages}

- [Wallets](/Using_Zcash/Wallets)
- [Shielded vs. Transparent Transactions](/Using_Zcash/Transactions)
- [Viewing Keys and Selective Disclosure](/Using_Zcash/Viewing_Keys)
- [Use Zcash in the Real World](/Zcash_Use_Cases/About)
- [FROST and Multi-Signature Privacy](/Zcash_Tech/FROST)
