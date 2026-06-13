<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# FROST

FROST, short for Flexible Round-Optimized Schnorr Threshold Signatures, is a threshold signature protocol for producing one Schnorr signature from a group of cooperating signers. It lets a wallet, treasury, exchange, or protocol split signing authority across multiple participants while keeping the final signature compact and privacy-preserving.

## TL;DR

- FROST turns a single signing key into shared signing authority, so no one participant has to hold the whole secret key.
- A threshold such as 2-of-3 or 5-of-8 can sign, while fewer than the threshold cannot.
- The final signature looks like a normal Schnorr signature, which helps avoid exposing the signer set on-chain.
- FROST reduces the network rounds needed for threshold signing and supports safe parallel signing operations.
- In Zcash, FROST can support private multisig, safer custody, shielded-asset authority, escrow, and organization-level spend controls.

## Core Explanation

### Schnorr signatures

A Schnorr digital signature is built from three core algorithms: key generation, signing, and verification.

Schnorr signatures are useful for threshold systems because multiple signing shares can be combined into one valid signature. Instead of placing several separate signatures on-chain, the group can produce a single compact signature that verifies against the group's public key.

This matters for Zcash because compact signatures reduce data size and can avoid revealing that a transaction was authorized by a group rather than a single signer.

For a short primer, see [Short Video on Schnorr Digital Signatures](https://youtu.be/r9hJiDrtukI?t=19).

### What FROST adds

FROST was created by Chelsea Komlo of the University of Waterloo and Zcash Foundation, and Ian Goldberg of the University of Waterloo.

FROST is a threshold version of the Schnorr signature scheme. In a normal single-party signature, one private key signs one message. In FROST, a group jointly controls a signing key. Each participant holds a secret share, and any threshold number of participants can cooperate to create a valid signature.

That design improves resilience and reduces single-key risk. A stolen laptop, compromised server, or unavailable signer does not automatically give an attacker the whole key or prevent the group from signing.

[What are Threshold Signatures? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

### How FROST works

The FROST protocol has two main phases:

1. A key-generation phase creates a shared verification key and gives each participant a private secret share.
2. A threshold-signing phase lets any approved threshold of participants create a valid Schnorr signature.

<a href="">
    <img src="https://static.cryptohopper.com/images/news/uploads/1634081807-frost-flexible-round-optimized-schnorr-threshold-signatures-1.jpg" alt="FROST threshold signature overview" width="400" height="300"/>
</a>

### Distributed key generation

In distributed key generation, or DKG, the participants generate long-lived secret key shares and one joint verification key.

FROST builds on [Pedersen's DKG (GJKR03)](https://blog.gtank.cc/notes-on-threshold-signatures/) and uses both Shamir secret sharing and Feldman's verifiable secret sharing as subroutines. Each participant also proves knowledge of their own secret with a zero-knowledge proof, itself a Schnorr signature. This protects against rogue-key attacks in settings where the threshold is at least half of the group.

At the end of DKG:

- The group has one joint verification key.
- Each participant holds a long-lived secret key share.
- Each participant has a public verification key share that the group can use to check signature shares during signing.

### Threshold signing

After key generation, any threshold number of participants can cooperate to sign. The signing flow uses nonce commitments and binding techniques so that attackers cannot mix signature shares from different signing sessions or reorder the participant set to forge a signature.

FROST can be used as a two-round signing protocol, or it can be optimized so that online signing needs only one round after a preprocessing stage.

<a href="">
    <img src="https://i.ibb.co/nQD1c3n/preprocess.png" alt="FROST preprocessing stage" width="400" height="300"/>
</a>

During preprocessing, participants prepare elliptic-curve point pairs for later signing. In the online signing rounds, participants publish nonce commitments, compute the shared challenge, and broadcast response values. The valid response shares are combined into one Schnorr signature.

<a href="">
    <img src="https://i.ibb.co/b5rJbXx/sign.png" alt="FROST threshold signing flow" width="400" height="300"/>
</a>

[Read the full paper](https://eprint.iacr.org/2020/852.pdf)

## Visual / Analogy

Think of FROST like a high-security vault that needs several approved keyholders, but not every keyholder, to open. The vault does not reveal which people participated when it opens. Outside observers only see that the vault was opened with a valid authorization.

For Zcash, that is the important privacy property: the authorization can be distributed among several parties without making the transaction look like an obvious multisig transaction.

## Deep Dive

### Security and concurrency

FROST reduces network overhead during signing while protecting against forgery attacks that can affect earlier Schnorr threshold constructions. It also supports multiple signing operations safely in parallel, which is important for wallets, exchanges, custodians, and services that need to coordinate many approvals at once.

If a participant misbehaves during signing, FROST can abort and identify the participant so they can be excluded from future operations.

The original paper includes proofs showing FROST is secure against chosen-message attacks when the discrete logarithm problem is hard and the attacker controls fewer participants than the signing threshold. See the proof section in the [FROST paper](https://eprint.iacr.org/2020/852.pdf#page=16).

### FROST in standards and the wider ecosystem

The two-round FROST protocol is now published as [RFC 9591](https://datatracker.ietf.org/doc/rfc9591/), an informational RFC from the IRTF Crypto Forum Research Group. The earlier [draft-irtf-cfrg-frost version 11](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/) was one step in that standardization path.

**FROST in [Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost)**

Coinbase developed a version of FROST to improve the efficiency of its threshold-signing systems. Its implementation changed some design choices from the original draft: it did not use a separate signature aggregator role, and it removed the one-time preprocessing stage in favor of an additional signing round.

See also: [Coinbase Article - Threshold Signatures](https://www.coinbase.com/blog/threshold-digital-signatures)

**[ROAST](https://eprint.iacr.org/2022/550.pdf) by Blockstream**

ROAST is a wrapper around threshold signature schemes such as FROST. It is designed to help a quorum of honest signers obtain a valid signature even when some signers are disruptive or network connections have high latency. Blockstream proposed ROAST for use on the [Liquid sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/).

## Practical Implications

FROST can benefit Zcash in several concrete ways:

- **Private multisig:** Multiple parties can control shielded ZEC without creating an obvious on-chain multisig footprint.
- **Custody and exchanges:** Organizations can distribute spend authority across teams, hardware devices, or locations.
- **Escrow and non-custodial services:** Applications can require multiple approvals without giving one operator unilateral control.
- **Zcash Shielded Assets:** FROST can help manage asset-issuance or administrative authority while reducing single-key risk.
- **Operational resilience:** A threshold group can keep working even if one signer is offline, as long as enough participants remain available.

## Common Mistakes

**Assuming FROST hides all operational metadata.** The final signature can look like a normal Schnorr signature, but the coordination layer still needs careful privacy and security design. Network logs, signer availability, and policy workflows can leak information outside the blockchain.

**Treating threshold signing as a backup plan only.** FROST is not just key backup. It is a live signing protocol with rules for signer selection, nonce handling, share verification, and misbehavior handling.

**Reusing nonce material.** Threshold signing protocols depend on careful nonce generation and handling. Implementations must follow the protocol exactly.

**Confusing FROST with traditional on-chain multisig.** Traditional multisig can reveal several signers or several signatures. FROST creates one aggregated Schnorr signature, so the privacy and data-size properties are different.

## Related Pages

- [Halo](Halo.md), the trustless recursive proof system used in modern Zcash proving work.
- [Viewing Keys](Viewing_Keys.md), selective disclosure tools for shielded transactions.
- [Zcash Shielded Assets](Zcash_Shielded_Assets.md), where distributed issuance or administrative authority can benefit from threshold signing.
- [Zcash Wallet Syncing](Zcash_Wallet_Syncing.md), another Zcash privacy infrastructure topic for wallet builders and users.
- [Lightwallet Nodes](Lightwallet_Nodes.md), the server infrastructure used by many Zcash light wallets.

## Further Learning

- [FROST paper](https://eprint.iacr.org/2020/852.pdf)
- [RFC 9591: The FROST Protocol for Two-Round Schnorr Signatures](https://datatracker.ietf.org/doc/rfc9591/)
- [Shamir Secret Sharing - Explainer & Example](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)
- [Coinbase Article - Threshold Signatures](https://www.coinbase.com/blog/threshold-digital-signatures)
- [What are Threshold Signatures? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)
