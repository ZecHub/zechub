<a href="https://github.com/zechub/zechub/edit/main/site/privacy/Privacy_as_a_Core_Principle.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Privacy as a Core Principle {#privacy-as-a-core-principle}

Privacy is not an optional add-on to digital cash. It is a property that lets people choose what they reveal, when they reveal it, and to whom. Zcash was designed around this principle: users can make ordinary public transactions when transparency is useful, or shielded transactions when financial privacy is required.

This page explains why privacy matters, how Zcash implements it through shielded architecture, how shielded transactions differ from transparent transactions, and which habits help users preserve privacy on the network.

---

## Why Financial Privacy Matters {#why-financial-privacy-matters}

Financial activity can reveal income, suppliers, customers, savings, political activity, donations, medical payments, family support, and business strategy. In a public blockchain system, that information can become visible to anyone who can connect an address to a person or organization.

Privacy protects ordinary users from unnecessary surveillance and reduces the risk of profiling, targeted theft, commercial data mining, and social pressure. It also helps businesses protect payroll, supplier relationships, and treasury operations without exposing every transaction to competitors.

Zcash treats privacy as a user right and a practical safety feature. The goal is not to hide wrongdoing; the goal is to give users selective control over their own financial information.

---

## Zcash Shielded Architecture {#zcash-shielded-architecture}

Zcash supports shielded transactions through zero-knowledge proofs. A shielded transaction can prove that it follows the protocol rules without revealing the sender, recipient, or amount to the public chain.

At a high level, shielded Zcash uses these ideas:

| Concept | What it does |
|---|---|
| Shielded address | Receives funds without exposing the receiving address publicly. |
| Note | Represents shielded value controlled by a spending key. |
| Nullifier | Lets the network prevent double-spends without revealing which note was spent. |
| Commitment | Commits to shielded transaction data while keeping the details private. |
| Zero-knowledge proof | Proves the transaction is valid without revealing private transaction details. |
| Viewing key | Allows selective disclosure for audits, accounting, or trusted third parties. |

Zcash currently uses shielded pools such as Sapling and Orchard. Users should prefer modern wallet defaults that support shielded transactions and keep funds shielded whenever possible.

---

## Transparent Transactions {#transparent-transactions}

Transparent Zcash transactions work similarly to Bitcoin-style transactions. The public chain shows the sending address, receiving address, and amount. Anyone can inspect the flow of funds between transparent addresses.

Transparent transactions can be useful for public donations, exchange deposits, exchange withdrawals, merchant accounting, or situations where public auditability is intentional. However, transparent addresses also create linkability. Once one transaction is connected to an identity, past and future activity from the same transparent address can often be analyzed.

Use transparent transactions only when transparency is required or unavoidable.

---

## Shielded Transactions {#shielded-transactions}

Shielded transactions hide transaction details from the public chain while still allowing the network to verify that the transaction is valid. A shielded transaction can protect:

- sender information
- recipient information
- transaction amount
- memo contents
- relationships between incoming and outgoing payments

Shielded transactions are strongest when funds stay inside the shielded pool. Moving funds from a transparent address into a shielded address improves privacy, but timing, amount patterns, and later withdrawals can still leak information if the user is careless.

For everyday use, prefer wallets and workflows that send from shielded addresses to shielded addresses.

---

## Shielded vs Transparent {#shielded-vs-transparent}

| Feature | Shielded transaction | Transparent transaction |
|---|---|---|
| Sender visible publicly | No | Yes |
| Recipient visible publicly | No | Yes |
| Amount visible publicly | No | Yes |
| Encrypted memo support | Yes | No meaningful privacy guarantee |
| Public auditability | Selective, through viewing keys or disclosure | Public by default |
| Best use case | Private payments, savings, donations, payroll, personal spending | Exchange flows, public treasury records, intentional transparency |
| Main risk | Privacy can weaken through poor wallet habits or transparent exits | Address reuse and chain analysis expose activity |

The key choice is not whether Zcash is private or transparent. The key choice is which mode the user selects for a specific transaction.

---

## Selective Disclosure {#selective-disclosure}

Privacy does not mean a user can never prove anything. Zcash supports selective disclosure through viewing keys and transaction details that a user can share intentionally.

Selective disclosure can help with:

- personal accounting
- tax reporting
- grant reporting
- merchant reconciliation
- organizational audits
- proving a payment without exposing unrelated activity

A good privacy system lets users reveal the minimum necessary information for a specific purpose instead of making all activity public forever.

---

## Privacy Best Practices {#privacy-best-practices}

Use these habits when interacting with Zcash:

1. Prefer shielded addresses for receiving and holding ZEC.
2. Avoid reusing transparent addresses for personal activity.
3. Keep funds shielded between receiving and spending when possible.
4. Be careful when moving exact amounts from transparent to shielded and back to transparent; timing and amount patterns can leak clues.
5. Use wallets that support modern shielded pools and keep them updated.
6. Use encrypted memos only for information the recipient needs; do not put sensitive secrets in memos unnecessarily.
7. Consider network privacy tools such as Tor, I2P, or a trusted VPN when broadcasting transactions.
8. Separate public, business, donation, and personal workflows when possible.
9. Share viewing keys only with parties that need them, and understand what each key reveals.
10. Treat exchange deposits and withdrawals as potentially linkable to account identity.

Privacy is a practice, not just a feature. Zcash gives users strong tools, but users still need good operational habits.

---

## Common Mistakes {#common-mistakes}

| Mistake | Why it matters | Better approach |
|---|---|---|
| Treating all ZEC as automatically private | Transparent transactions remain public. | Confirm whether the wallet is using shielded or transparent addresses. |
| Reusing transparent addresses | Reuse makes chain analysis easier. | Use shielded receiving addresses or fresh transparent addresses only when required. |
| Shielding and immediately unshielding the same amount | Timing and amount correlation can weaken privacy. | Keep funds shielded and avoid obvious round-trip patterns. |
| Publishing transaction screenshots | Screenshots can reveal addresses, amounts, or metadata. | Share only the minimum proof needed. |
| Ignoring network metadata | IP or service metadata can weaken transaction privacy. | Consider Tor/I2P/VPN and wallet network settings. |

---

## Related Pages {#related-pages}

- [Shielded Pools](/using-zcash/shielded-pools)
- [Transactions](/using-zcash/transactions)
- [Memos](/using-zcash/memos)
- [Wallets](/using-zcash/wallets)
- [Using ZEC Privately](/guides/using-zec-privately)
- [Viewing Keys](/zcash-tech/viewing-keys)
- [Tor and I2P](/privacy-tools/tor-and-i2p)
- [VPN and dVPN](/privacy-tools/vpn-and-dvpn)
- [Secure Messengers](/privacy-tools/secure-messengers)