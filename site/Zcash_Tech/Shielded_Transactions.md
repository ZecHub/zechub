<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Shielded_Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Shielded Transactions: How zk-SNARKs Enable Private Payments

## Introduction

Every transaction on a public blockchain is visible to anyone running a node or using a block explorer. Bitcoin, Ethereum, and most other chains expose sender addresses, receiver addresses, and amounts to the entire world. For many use cases—paying employees, donating to sensitive causes, running a business—this total transparency is a serious liability.

Zcash solves this problem with **shielded transactions**: payments where the sender, receiver, and amount are cryptographically hidden, yet the network can still verify that no coins were created from nothing. The technology that makes this possible is called a **zk-SNARK** (zero-knowledge succinct non-interactive argument of knowledge), and Zcash was the first production cryptocurrency to deploy it at scale.

This article explains what shielded transactions are, how the underlying cryptography works at a high level, and how you can use them today.

---

## What Are Shielded Transactions and Why Do They Matter?

A shielded transaction is a Zcash transfer in which all sensitive metadata is encrypted and hidden from public view. When you send ZEC using a shielded transaction:

- **The sender's address is hidden.** Observers cannot see where the funds came from.
- **The receiver's address is hidden.** Observers cannot see where the funds went.
- **The amount is hidden.** Observers cannot see how much was transferred.

What remains public is minimal: the network records that *a* shielded transaction occurred, and it includes a cryptographic proof that the transaction is valid. Nodes verify this proof without ever learning the private details.

### Why does this matter?

Financial privacy is not about hiding illegal activity—it is a fundamental property of sound money. Consider:

- **Businesses** need to pay suppliers without revealing their full transaction graph to competitors.
- **Individuals** need to spend without broadcasting their net worth to every observer.
- **Charities and activists** operating under repressive regimes need to receive funds without exposing donors.
- **Fungibility** requires that no coin is "tainted" by its history. If all transactions are transparent, coins can be blacklisted based on past associations, undermining their function as interchangeable money.

Shielded transactions restore the privacy properties of cash in a digital, verifiable system.

---

## How zk-SNARKs Work (High Level)

A zk-SNARK is a cryptographic proof that lets one party (the prover) convince another party (the verifier) that a statement is true, without revealing *why* it is true. The proof is:

- **Zero-knowledge:** The verifier learns nothing beyond the validity of the statement.
- **Succinct:** The proof is tiny (a few kilobytes) and verifies in milliseconds, regardless of the complexity of the statement being proven.
- **Non-interactive:** The prover generates the proof once and posts it; no back-and-forth communication is needed.

### The statement being proven

In a Zcash shielded transaction, the statement proven by the zk-SNARK is roughly:

> "I know a valid spending key for a note (coin) that exists in the shielded pool, I am authorized to spend it, the output notes I am creating sum to the correct value, and I have not double-spent this note."

The network verifies this proof without learning which note was spent, which keys are involved, or what the amounts are.

### From trusted setup to Halo 2

Early zk-SNARK implementations (including Zcash's original Sprout and Sapling protocols) required a **trusted setup ceremony**: a one-time generation of public parameters that, if the randomness used during generation were ever revealed, could allow an attacker to forge proofs. Zcash conducted elaborate multi-party ceremonies (the "Powers of Tau" and "Sapling MPC") where participants independently contributed randomness and then destroyed their shares. The security assumption was that *at least one* participant honestly destroyed their randomness.

**Halo 2**, introduced with the NU5 network upgrade in 2022, eliminated this requirement entirely. Halo 2 uses a recursive proof composition technique based on polynomial commitment schemes that do not require a trusted setup. The parameters are generated deterministically from nothing—there is no secret randomness that could be compromised. This means:

- No ceremony is needed.
- There is no residual trust assumption.
- The system is secure under standard cryptographic assumptions alone.

The Orchard shielded pool, activated alongside NU5, uses Halo 2 and is the current default for shielded transactions in Zcash.

---

## Transparent vs. Shielded Addresses

Zcash supports two address types, reflecting its dual nature as both a transparent and a privacy-preserving chain:

### Transparent addresses (t-addresses)

- Begin with `t1` (single-sig) or `t3` (multi-sig).
- Behave like Bitcoin addresses: balances, senders, and receivers are publicly visible on the blockchain.
- Useful for compatibility with exchanges and services that do not yet support shielded operations.

### Shielded addresses (z-addresses)

- Historically began with `zs1` (Sapling) or `ztestsapling1` on testnet.
- Balances are encrypted and invisible to outside observers.
- Transactions between two z-addresses are fully shielded: nothing about the payment is revealed beyond its existence.

### Mixed transactions

Zcash allows transactions that cross the transparent/shielded boundary:

- **t-to-z (shielding):** Moving funds from a transparent address into the shielded pool. The input is visible, but the destination and amount within the shielded pool are hidden.
- **z-to-t (deshielding):** Moving funds out of the shielded pool to a transparent address. The output is visible.

For maximum privacy, both the sender and receiver should use shielded addresses, keeping the entire transaction within the shielded pool.

---

## Unified Addresses (UAs)

Managing multiple address types created a confusing user experience. A sender had to know whether the recipient wanted a transparent or shielded payment and select the correct address format. **Unified Addresses**, specified in ZIP 316, solve this.

A Unified Address is a single string (beginning with `u1` on mainnet) that encodes multiple **receivers** internally:

- A shielded receiver (Orchard, and optionally Sapling)
- Optionally, a transparent receiver

When a wallet sends to a UA, it automatically selects the best available receiver—preferring the strongest shielded protocol supported by both sender and receiver. The sender does not need to know or choose the address type; the wallet handles it.

### Benefits

- **Simplified UX:** One address to share, one address to scan.
- **Automatic privacy:** Payments default to shielded without user intervention.
- **Forward compatibility:** New receiver types can be added to UAs in future upgrades without changing the address format.
- **Backward compatibility:** Wallets that only support transparent payments can still extract the t-receiver from a UA.

Unified Addresses are now the recommended address format for all Zcash wallets.

---

## Practical: How to Send a Shielded Transaction

The exact steps depend on your wallet, but the general flow is the same across all modern Zcash wallets (Zecwallet Lite, Ywallet, Edge, Unstoppable, Nighthawk, or the `zcashd`/`zebrad` command-line tools):

1. **Obtain ZEC.** Purchase ZEC on an exchange or receive it from another user. If your ZEC is in a transparent address, you will want to shield it first.

2. **Get the recipient's Unified Address.** Ask the recipient for their UA (starts with `u1`). If they provide a Sapling address (`zs1...`), that also works for shielded payments.

3. **Initiate the send.** In your wallet, select "Send," paste the recipient's UA, and enter the amount.

4. **Confirm shielding.** Modern wallets will automatically construct a fully shielded transaction if both your funds and the destination support it. If your funds are in a transparent address, the wallet will create a shielding transaction (t-to-z) as part of the send.

5. **Review and broadcast.** Confirm the fee (shielded transactions have slightly higher fees than transparent ones due to proof generation, typically a fraction of a cent) and broadcast. The transaction will appear on block explorers as a shielded transaction with encrypted fields.

6. **Verify receipt.** The recipient's wallet detects the incoming payment by trial-decrypting shielded outputs with their viewing key. No third party can see the payment.

### Command-line example (zcashd)

```bash
# Shield funds from a transparent address to your own shielded address
zcash-cli z_shieldcoinbase "t1YourTransparentAddr" "u1YourUnifiedAddr"

# Send a fully shielded payment
zcash-cli z_sendmany "u1YourUnifiedAddr" '[{"address": "u1RecipientAddr", "amount": 0.5}]'
```

---

## Privacy Guarantees: What Is Hidden vs. What Is Public

Understanding the exact privacy boundary is essential for using Zcash effectively.

### Hidden from all observers

| Field | Detail |
|-------|--------|
| Sender address | Which account spent the funds |
| Receiver address | Which account received the funds |
| Amount | How much ZEC was transferred |
| Transaction graph | Links between past and future transactions |

### Publicly visible

| Field | Detail |
|-------|--------|
| Transaction existence | The blockchain records that a shielded transaction was included in a block |
| Transaction hash | A unique identifier for the transaction |
| Validity proof | The zk-SNARK proof that the transaction is well-formed (verifiable by anyone) |
| Anchor | A reference to the state of the shielded note commitment tree (does not reveal which note was spent) |
| Fee | The transaction fee is visible in fully shielded transactions (though it reveals only the fee, not the transfer amount) |

### Important caveats

- **Network-layer metadata:** IP addresses used to broadcast transactions can be observed by network peers. Use Tor or a VPN for stronger network-level privacy.
- **Deshielding leaks information:** If you move funds from a shielded address to a transparent address, the link between the shielded pool and that transparent output becomes visible.
- **Endpoint privacy:** If you publicly associate your identity with a transparent address and then shield from it, the initial link is recorded. Best practice is to shield at the earliest opportunity.
- **Viewing keys:** Zcash supports optional selective disclosure. You can share a viewing key with an auditor or tax authority to reveal specific transactions, without exposing your full history.

---

## Summary

Zcash shielded transactions provide strong, mathematically verified financial privacy on a public blockchain. zk-SNARKs prove transaction validity without revealing sender, receiver, or amount. The transition to Halo 2 removed the last trust assumption from the proving system. Unified Addresses make shielded payments the default, frictionless experience. And the privacy model is precise: everything about the payment is hidden except the fact that a valid transaction occurred.

For anyone who believes financial transactions should be private by default—just as they are with physical cash—Zcash shielded transactions are the most mature, battle-tested implementation available today.

---

## Further Reading

- [Zcash Protocol Specification](https://zips.z.cash/protocol/protocol.pdf)
- [ZIP 316: Unified Addresses](https://zips.z.cash/zip-0316)
- [Orchard Book: Halo 2 and the Orchard Protocol](https://zcash.github.io/orchard/)
- [Zcash Foundation: What Are zk-SNARKs?](https://z.cash/technology/zksnarks/)
- [Electric Coin Company: Unified Addresses Explained](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/)
