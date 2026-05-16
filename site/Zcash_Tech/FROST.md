<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# FROST and Privacy-Preserving Multisig

FROST stands for **Flexible Round-Optimized Schnorr Threshold** signatures. It is a threshold signing protocol that lets a group jointly control one signing key without any single participant holding the full private key.

In Zcash, FROST matters because it enables multisig-style control for shielded funds. A group can require several people or devices to approve a transaction while still producing a signature that looks like an ordinary Zcash signature on-chain. That makes FROST one of the most important tools for bringing shared custody, treasury management, and institutional controls into private Zcash workflows.

## TL;DR

- FROST lets a group create one valid Schnorr signature when a threshold number of participants cooperate.
- A `2-of-3`, `3-of-5`, or similar policy can protect funds from one lost or compromised key share.
- Unlike traditional transparent multisig, FROST does not need to reveal a list of signers or a visible multisig script on-chain.
- For Zcash, FROST is especially important because it can support shared control of shielded funds.
- Zcash Foundation has built Rust FROST libraries, Zcash demo tooling, `frost-client`, and `frostd` to help wallets and developers integrate it.

## What FROST Is

Most wallets use a single spending key. Whoever controls that key can spend the funds. If the key is lost, the funds may be gone forever. If the key is stolen, the funds can be taken.

FROST changes that model. Instead of creating one complete private signing key and giving it to one device or person, the signing authority is split into multiple **key shares**. A policy defines how many shares are needed to sign.

For example:

- `2-of-3`: any two of three participants can sign.
- `3-of-5`: any three of five participants can sign.
- `5-of-9`: any five of nine participants can sign.

The group has one public verification key, and successful signing produces one final signature. Outside observers do not need to know which participants signed or how many shares existed.

## How Threshold Signing Works

FROST has two main phases.

### Key Setup

The group creates key shares and a group public key. This can be done with a trusted dealer or with distributed key generation, depending on the implementation and deployment model.

Each participant receives a private key share. No participant should learn the full group secret key.

### Signing

When the group wants to sign a transaction, a threshold number of participants cooperate. In the two-round FROST protocol described by RFC 9591:

1. Participants create and share one-time commitments.
2. Participants produce signature shares for the chosen message.
3. A coordinator aggregates the valid shares into one final Schnorr signature.

The coordinator helps organize signing, but it does not need the full private key. If a participant misbehaves or submits an invalid share, FROST includes an identifiable abort process so the bad share can be detected.

## Why FROST Matters for Private Multisig

Traditional multisig often reveals extra information on-chain. Depending on the chain and script design, observers may learn the number of possible signers, the number of required signatures, or the public keys involved. That can create a privacy problem for organizations, families, communities, and businesses.

FROST is different because the final result is a single signature under a single group public key. The approval policy is enforced by the participants during signing rather than being fully exposed on-chain.

For Zcash, this is important because privacy is not only about hiding amounts. A private payment system should also avoid revealing unnecessary information about governance, custody, internal approvals, and operational structure.

## How FROST Fits Zcash

Zcash shielded transactions use spend authorization keys to approve spends. FROST for Zcash focuses on splitting the spend authorization key so multiple participants can jointly authorize shielded transactions.

The Zcash Foundation's FROST work includes:

- Rust implementations of RFC 9591 FROST.
- Zcash-compatible ciphersuites and re-randomized FROST support.
- Demo tooling for signing Zcash transactions.
- `frost-client`, a command-line reference client.
- `frostd`, a communication server that helps participants coordinate signing messages.

The goal is to make private shared control practical for wallets and applications without requiring a completely new Zcash transaction model.

## Why This Is Different From Traditional Multisig

| Topic | Traditional Transparent Multisig | FROST Threshold Signatures |
|---|---|---|
| On-chain appearance | May reveal a multisig script, signer set, or threshold | Looks like one ordinary signature |
| Privacy | Approval structure can become public | Approval structure can stay off-chain |
| Key model | Multiple full signing keys approve one spend | Participants hold shares of one group signing key |
| Signing result | Multiple signatures or script conditions | One aggregated signature |
| Zcash relevance | Historically limited to transparent workflows | Enables private shared control for shielded workflows |

FROST does not remove the need for good operational security. Participants still need to protect their key shares, verify transaction details before signing, and use secure coordination channels.

## Real-World Use Cases

### DAO Treasury Management

A Zcash DAO or community fund can require several elected participants to approve spending. For example, a `3-of-5` FROST wallet could let a treasury move funds only when three key holders approve the transaction.

This reduces the risk of one person spending funds alone and avoids exposing the treasury's full approval structure on-chain.

### Institutional Custody

An exchange, fund, nonprofit, or payment company can distribute signing authority across teams, devices, or locations. A policy such as `4-of-7` can protect against one compromised machine or unavailable signer.

For institutions holding ZEC, FROST can combine internal controls with Zcash shielded transaction privacy.

### Shared Wallets

Families, small teams, clubs, and businesses can share control over funds. A `2-of-3` setup might place one share on a user's primary device, one share with a trusted co-signer, and one share in a secure backup location.

This model can reduce the chance of losing funds because one missing device does not necessarily mean the wallet is unrecoverable.

### Advanced Governance Systems

FROST can support approval systems where committees, councils, or rotating signer groups authorize actions. Because the chain only sees the final signature, governance systems can avoid publishing every internal signer relationship through routine payments.

This is useful for private grants, community treasuries, bridge operators, and future Zcash Shielded Asset administration.

## Why FROST Strengthens Usability

Single-key custody is simple but fragile. It places too much responsibility on one person, one device, or one seed phrase.

FROST improves usability by allowing:

- Recovery when one participant is unavailable.
- Shared approval for high-value payments.
- Separation between daily operators and long-term key holders.
- Wallet designs where users can get help without giving a custodian full control.
- Safer organizational workflows for grants, payroll, escrow, and treasury operations.

Good wallet interfaces can make this feel like a normal approval flow: create transaction, notify co-signers, collect approvals, broadcast the signed transaction.

## Why FROST Strengthens Privacy

FROST helps preserve privacy because the threshold policy can remain off-chain. Observers do not need to see that a transaction came from a `3-of-5` wallet, which three people signed, or how an organization is structured internally.

For shielded Zcash, this is a strong fit:

- Shielded transactions protect sender, receiver, amount, and memo.
- FROST can protect the signing policy and approval structure.
- Re-randomized FROST support helps make threshold signatures compatible with Zcash's shielded signing model.

Together, these properties support private shared custody instead of forcing organizations back into transparent address workflows.

## Current State

FROST is no longer only a research idea. RFC 9591, published in June 2024 by the IRTF Crypto Forum Research Group, specifies the two-round FROST signing protocol.

For Zcash, the Zcash Foundation has concluded development work on the `frost-core` reference implementation and related ciphersuite crates. ZF has also built `frost-client` and `frostd` to help participants communicate and to give wallet developers a working reference.

In 2025, Least Authority audited the FROST demo code, including `frost-client` and `frostd`. The Zcash Foundation reported that the audit found no high-severity issues and that findings were addressed or mitigated in the current code.

Wallet integration is the next important adoption step. FROST becomes broadly useful when wallets provide clear user interfaces for group setup, transaction review, signing coordination, and backup.

## What Developers Should Know

FROST is powerful, but implementations must be careful.

- Signing nonces must be one-time use.
- Participants must verify transaction details before signing.
- Communication should authenticate participants.
- Key shares need secure storage and backup planning.
- Coordinators and relay servers should not be trusted with private key material.
- Wallets should explain who is being asked to sign and what transaction is being approved.

ZF's `frostd` server is intended to help participants and coordinators exchange messages. It should not need to be trusted with signing authority because the sensitive signing material stays with participants.

## Why FROST Could Become a Standard for Private Multisig

FROST combines several properties that are hard to get at the same time:

- Efficient threshold signing.
- Strong cryptographic foundations.
- One final signature instead of visible signer lists.
- Better resilience against lost or compromised keys.
- A path to shielded Zcash multisig.
- Reference implementations and developer tooling.

That combination makes FROST a strong candidate for private multisig in Zcash and for threshold signing systems beyond Zcash.

## Further Reading

- [RFC 9591: The FROST Protocol](https://www.rfc-editor.org/rfc/rfc9591.html)
- [Zcash Foundation: FROST](https://zfnd.org/frost/)
- [The State of FROST for Zcash](https://zfnd.org/the-state-of-frost-for-zcash/)
- [ZF FROST Book: FROST with Zcash](https://frost.zfnd.org/zcash.html)
- [ZF FROST Book: Technical Details](https://frost.zfnd.org/zcash/technical-details.html)
- [FROST demo audit: frost-client and frostd](https://zfnd.org/frost-demo-audit-frost-client-and-frostd/)
- [Zcash Foundation FROST tools](https://github.com/ZcashFoundation/frost-tools)
