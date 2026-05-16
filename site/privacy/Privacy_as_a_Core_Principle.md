<a href="https://github.com/zechub/zechub/edit/main/site/privacy/Privacy_as_a_Core_Principle.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Privacy as a Core Principle

<a id="tldr"></a>
## TL;DR

Privacy is the ability to decide what information you reveal, who receives it, and when it becomes public. In money, privacy protects personal safety, business confidentiality, donation records, payroll, savings, spending habits, and community activity.

Zcash was built around this principle. It supports transparent transactions, which are publicly visible on-chain, and shielded transactions, which use zero-knowledge proofs so the network can verify payments without publicly revealing the sender, receiver, amount, or encrypted memo.

<a id="why-financial-privacy-matters"></a>
## Why Financial Privacy Matters

Public blockchains are useful because anyone can verify the ledger. The tradeoff is that transparent addresses expose transaction histories, balances, counterparties, and timing patterns. Once an address is connected to a person, business, community, or exchange account, old and future activity can become easier to trace.

Financial privacy matters because ordinary activity can reveal sensitive information:

- A salary payment can reveal income.
- A donation can reveal political, religious, or medical interests.
- A merchant payment can reveal business volume.
- A treasury payment can reveal vendors or contributors.
- A repeated withdrawal pattern can reveal personal routines.

Privacy does not mean hiding wrongdoing. It means giving users the same basic confidentiality people expect from bank accounts, invoices, payroll systems, and cash payments.

<a id="zcash-privacy-model"></a>
## Zcash's Privacy Model

Zcash gives users two broad ways to hold and transfer ZEC:

- **Transparent addresses:** public addresses that behave similarly to Bitcoin addresses.
- **Shielded addresses:** private addresses that use zero-knowledge proofs to encrypt transaction details while still allowing the network to verify that no ZEC is created or spent incorrectly.

Modern Zcash wallets may also use **unified addresses**, which can contain multiple receiver types in one address. A unified address can make receiving ZEC easier because the wallet can choose the best supported receiver type, including shielded receivers when available.

<a id="transparent-transactions"></a>
## Transparent Transactions

Transparent Zcash transactions use transparent addresses, usually starting with `t`. In a fully transparent transaction, the sender, receiver, and amount are visible on the public blockchain.

Transparent transactions are useful when:

- An exchange, payment processor, or service only supports transparent ZEC.
- A user intentionally needs public auditability.
- A tool or integration has not yet added shielded support.

Transparent transactions are less private because observers can inspect address balances and transaction histories. If a transparent address is reused, it becomes easier to link activity over time.

<a id="shielded-transactions"></a>
## Shielded Transactions

Shielded Zcash transactions use shielded pools such as Sapling and Orchard. A transaction between shielded receivers keeps the sender, receiver, amount, and memo private from public blockchain observers.

The network can still verify shielded transactions. Zcash uses zero-knowledge proofs so nodes can check that the transaction follows the rules without learning the private details.

Shielded transactions are useful when:

- A user wants to keep payments private by default.
- A merchant wants to avoid exposing revenue or customer relationships.
- A contributor, donor, or community member wants to avoid linking their identity to every payment.
- A wallet wants to reduce metadata leakage for ordinary users.

<a id="shielding-and-deshielding"></a>
## Shielding and Deshielding

ZEC can move between transparent and shielded parts of the network:

- **Shielding:** transparent ZEC is sent into a shielded address or receiver. The amount entering the shielded pool is visible at the boundary, but later shielded activity can be private.
- **Deshielding:** shielded ZEC is sent to a transparent address. The amount leaving the shielded pool and the transparent recipient are visible at the boundary.
- **Shielded transfer:** shielded ZEC is sent to another shielded receiver. Sender, receiver, amount, and memo stay private from public observers.
- **Transparent transfer:** transparent ZEC is sent to another transparent address. Sender, receiver, and amount are visible.

Privacy is strongest when funds spend more of their lifecycle inside shielded pools and users avoid patterns that connect transparent deposits and withdrawals.

<a id="comparison"></a>
## Shielded vs Transparent Transactions

| Property | Transparent Transaction | Shielded Transaction |
|---|---|---|
| Sender | Public when using transparent inputs | Hidden from public observers |
| Receiver | Public when paying a transparent address | Hidden from public observers |
| Amount | Public | Hidden from public observers |
| Memo | Not a private encrypted memo | Encrypted when included in shielded payments |
| Address balance | Public for transparent addresses | Not publicly visible for shielded addresses |
| Best for | Public auditability, exchange compatibility, legacy integrations | Personal payments, donations, payroll, treasury privacy, merchant privacy |
| Main risk | Easy long-term activity linking | Boundary patterns when shielding or deshielding |

<a id="common-privacy-risks"></a>
## Common Privacy Risks

Even with strong cryptography, user behavior can reduce privacy. Common risks include:

- Reusing transparent addresses for many payments.
- Shielding and deshielding the same or similar amount within a short time.
- Moving funds from a known exchange account directly into a public payment.
- Publishing transaction IDs together with identity information.
- Sharing viewing keys without understanding what they reveal.
- Keeping most activity transparent because a wallet or service does not support shielded ZEC.

The goal is to reduce unnecessary links. Good privacy habits make it harder for observers to build a reliable picture of a user's financial life.

<a id="best-practices"></a>
## Practical Best Practices

Use these habits when interacting with Zcash:

1. Prefer wallets that support shielded ZEC and unified addresses.
2. Receive to a shielded or unified address when possible.
3. Keep funds shielded until you need to interact with a transparent-only service.
4. Avoid reusing transparent addresses for unrelated payments.
5. Avoid creating obvious timing or amount links between shielding and deshielding.
6. Use memos carefully. Encrypted memos are private to the sender and receiver, but they may still contain sensitive information.
7. Share viewing keys only when you intentionally want another party to see the relevant shielded activity.
8. Never share seed phrases, spending keys, or private keys.
9. Test unfamiliar workflows with small amounts before moving significant funds.
10. Treat privacy as a practice, not a one-time setting.

<a id="related-pages"></a>
## Related Pages

- [Shielded Pools](../Using_Zcash/Shielded_Pools.md)
- [Wallets](../Using_Zcash/Wallets.md)
- [Transactions](../Using_Zcash/Transactions.md)
- [Blockchain Explorers](../Using_Zcash/Blockchain_Explorers.md)
- [Zcash addresses and value pools](https://zcash.readthedocs.io/en/latest/rtd_pages/addresses.html)
- [What are Zcash unified addresses?](https://z.cash/learn/what-are-zcash-unified-addresses/)
