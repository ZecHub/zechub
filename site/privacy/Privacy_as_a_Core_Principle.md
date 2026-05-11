<a href="https://github.com/zechub/zechub/edit/main/site/privacy/Privacy_as_a_Core_Principle.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Privacy as a Core Principle

Privacy is not only a technical feature. It is a basic condition for personal freedom, safety, and financial autonomy. In digital money, privacy means that users can transact without exposing their full financial history, social relationships, income patterns, or spending habits to the public.

Zcash was created to give users a choice: transact transparently when public auditability is useful, or transact privately when financial confidentiality matters. The strongest privacy model in Zcash comes from shielded transactions, which use zero-knowledge proofs to verify that a transaction is valid without revealing unnecessary details.

<h2 id="why-financial-privacy-matters">Why Financial Privacy Matters</h2>

Public blockchains make verification easy, but they can also expose sensitive user data. If every address, balance, and transaction amount is public, anyone can build a profile of a person or organization.

Financial privacy helps protect:

- Personal safety
- Business confidentiality
- Donor and recipient privacy
- Salary and contractor payments
- Community treasury operations
- Political, journalistic, and humanitarian activity

Privacy is not the opposite of accountability. A well-designed privacy system can allow selective disclosure when needed while protecting users from default public surveillance.

<h2 id="zcash-privacy-model">Zcash Privacy Model</h2>

Zcash supports both transparent and shielded value pools.

Transparent activity is similar to Bitcoin. Addresses, amounts, and transaction links are visible on the public blockchain.

Shielded activity uses zero-knowledge cryptography. In a fully shielded transaction, the sender, receiver, amount, and memo are encrypted. The network can still verify that the transaction is valid, but public observers do not see the private transaction details.

This design lets Zcash support different use cases:

- Transparent payments for public accounting or exchange compatibility
- Shielding transactions to move funds from transparent to shielded storage
- Deshielding transactions when a user must send to a transparent address
- Fully shielded transactions for strongest privacy

The best privacy comes from keeping funds shielded and using shielded-to-shielded payments whenever possible.

<h2 id="shielded-transactions">Shielded Transactions</h2>

Shielded transactions are the privacy-preserving part of Zcash.

In a shielded transaction, Zcash uses zero-knowledge proofs to show that:

- The spender owns valid funds
- The same funds are not spent twice
- The transaction balances correctly
- Network rules are followed

The proof does this without publicly revealing the sender, receiver, amount, or memo.

Shielded addresses are often called z-addresses. Modern Zcash wallets may also use unified addresses, which can contain multiple receiver types in one address format. Unified addresses make it easier for wallets to choose the best available receiver, including shielded receivers when supported.

<h2 id="transparent-transactions">Transparent Transactions</h2>

Transparent transactions are public. A transparent Zcash address usually starts with `t`, and transparent transaction data is visible on-chain.

Public observers can generally see:

- Sending transparent address
- Receiving transparent address
- Transaction amount
- Address balance and history
- Links between transparent transactions

Transparent transactions are useful for exchange support, public donations, compliance workflows, and cases where public auditability is required. They should not be treated as private.

Using a new transparent address for every transaction may reduce simple address reuse, but it does not provide the same privacy as shielded Zcash. Transparent activity still creates public transaction graph data.

<h2 id="shielded-vs-transparent">Shielded vs Transparent Transactions</h2>

| Transaction Type | What It Means | Publicly Visible | Privacy Level |
|---|---|---|---|
| Transparent to transparent | Public ZEC transfer between t-addresses | Addresses and amount | Low |
| Transparent to shielded | Funds move from public pool into shielded pool | Transparent source and amount entering shielded pool | Better after shielding |
| Shielded to transparent | Funds leave shielded pool to public address | Transparent destination and amount leaving shielded pool | Reduced |
| Shielded to shielded | Private transfer inside shielded pool | Minimal public metadata | Strongest |

Shielding is useful, but it is not the same as full privacy forever. If a user shields an exact amount and then quickly deshields the same amount, timing and amount patterns can weaken privacy. Stronger privacy comes from storing funds shielded and avoiding obvious links between transparent and shielded activity.

<h2 id="viewing-keys-and-selective-disclosure">Viewing Keys and Selective Disclosure</h2>

Zcash privacy does not mean users can never share information. Viewing keys allow a user to selectively disclose transaction information without giving away spending authority.

This is useful for:

- Audits
- Tax reporting
- Grant transparency
- Organizational accounting
- Compliance or internal review

Selective disclosure is important because it lets users choose when and with whom to share financial information.

<h2 id="privacy-best-practices">Privacy Best Practices</h2>

Use these practices when interacting with Zcash.

### Prefer shielded addresses

When privacy matters, receive ZEC to a shielded or unified address that supports shielded receivers.

### Keep funds shielded at rest

If you receive transparent ZEC, move it into a shielded address before making private payments. Keeping funds shielded gives you a stronger privacy baseline.

### Use shielded-to-shielded payments

For the strongest privacy, send from a shielded address to another shielded address.

### Avoid obvious timing and amount links

Do not shield and immediately deshield the exact same amount if privacy is the goal. Timing and amount correlation can reveal patterns.

### Understand deshielding risk

Sending from shielded ZEC to a transparent address reveals the transparent destination and the amount leaving the shielded pool. Use deshielding only when needed.

### Use privacy-focused wallets

Choose wallets that support shielded transactions well, explain privacy tradeoffs clearly, and handle fees and change safely.

### Protect seed phrases and devices

Privacy does not help if the wallet is compromised. Secure backups, hardware security, and safe device practices still matter.

### Be careful with memos

Shielded memos are encrypted, but you should still avoid storing unnecessary sensitive information. Treat memo content as something the recipient may save or share.

### Use viewing keys intentionally

Share viewing keys only with parties who need access. A viewing key can reveal transaction information for the scope it covers.

### Test new workflows with small amounts

When using a new wallet, exchange, or payment flow, test with a small amount before moving significant funds.

<h2 id="common-mistakes">Common Mistakes</h2>

Avoid these privacy mistakes:

- Treating transparent addresses as private
- Reusing transparent addresses for sensitive activity
- Deshielding immediately after shielding
- Sending exact amounts that are easy to correlate
- Assuming exchange withdrawals are private
- Posting transaction IDs publicly when privacy matters
- Sharing viewing keys too broadly
- Using wallets that do not support shielded transactions for private workflows

<h2 id="practical-examples">Practical Examples</h2>

### Private donation

A donor sends ZEC to a shielded address controlled by a creator or nonprofit. The public chain does not reveal the donor, recipient, or amount in the way a transparent payment would.

### Freelancer payment

A freelancer receives ZEC to a shielded address. This helps avoid exposing income history or client relationships through public address analysis.

### Community treasury

A community group may keep treasury funds shielded, then use selective disclosure or reports when it wants to prove payments to members or auditors.

### Merchant payment

A merchant can accept shielded ZEC for customer privacy, while using viewing keys or internal records for accounting.

<h2 id="summary">Summary</h2>

Privacy is a core principle because financial activity reveals personal, social, and organizational information. Zcash gives users tools to reduce that exposure.

Transparent Zcash transactions are public and useful for compatibility. Shielded Zcash transactions are designed for privacy and can hide sender, receiver, amount, and memo data from public observers.

The strongest Zcash privacy comes from using shielded addresses, keeping funds shielded at rest, sending shielded-to-shielded transactions, and avoiding timing or amount patterns that create links. Privacy is a practice as much as a protocol feature.

<h2 id="resources">Resources</h2>

- [Zcash: Shielded vs Transparent](https://z.cash/learn/what-is-the-difference-between-shielded-and-transparent-zcash/)
- [Zcash: Is Zcash traceable?](https://z.cash/learn/is-zcash-traceable/)
- [Zcash Documentation: Privacy Recommendations and Best Practices](https://zcash.readthedocs.io/en/master/rtd_pages/privacy_recommendations_best_practices.html)
- [Zcash Documentation: Addresses and Value Pools](https://zcash.readthedocs.io/en/latest/rtd_pages/addresses.html)
- [ZecHub: Shielded Pools](https://zechub.wiki/site/Using_Zcash/Shielded_Pools)
- [ZecHub: Wallets](https://zechub.wiki/site/Using_Zcash/Wallets)
