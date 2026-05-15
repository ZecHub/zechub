<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# FROST and Private Multi-Signature Tools in Zcash

FROST stands for **Flexible Round-Optimized Schnorr Threshold Signatures**. It is a threshold signature protocol that lets a group jointly control one signing key without any one participant holding the complete private key.

For Zcash, FROST matters because it can make shared control of shielded funds practical. A wallet can require a threshold such as 2-of-3 or 3-of-5 participants to approve a spend, while the final authorization can still behave like one signature from one group key. This gives users and organizations a path toward multi-party custody without exposing unnecessary signing-policy details on-chain.

## The Problem FROST Solves

A normal wallet has one complete spending key. That model is simple, but it creates a single point of failure.

1. If the key is lost, funds can become unrecoverable.
2. If the key is stolen, funds can be moved by the attacker.
3. If one person controls a treasury key, every user must trust that person completely.
4. If several people need to approve spending, older multisig designs can reveal extra metadata or require more complex on-chain scripts.

FROST changes the custody model. Instead of one complete private key, each participant holds a key share. A signing threshold defines how many participants must cooperate before funds can move.

For example, in a 3-of-5 setup, five participants hold shares, but any three can authorize a transaction. One lost device does not stop the wallet. One compromised participant cannot spend alone. The group can remain operational without putting the full key in one place.

## What a Threshold Signature Is

A threshold signature is a single signature produced by a group. The group has one public key, but the corresponding signing authority is split across several participants.

A basic threshold wallet has three values to understand:

1. **n** - the total number of participants who hold key shares.
2. **t** - the minimum number of participants required to sign.
3. **the group public key** - the public key that verifies the final signature.

If the threshold is t-of-n, then any t participants can cooperate to produce a valid signature. Fewer than t participants cannot sign.

FROST is a threshold signature protocol for Schnorr signatures. RFC 9591 specifies the two-round FROST protocol, and the Zcash Foundation has built reference implementations and Zcash-specific tooling around this design.

## How FROST Works

FROST has two major parts: key setup and signing.

### Key Setup

During setup, participants receive or generate shares of a common signing key.

There are two broad approaches:

1. **Trusted dealer setup** - one trusted process creates the secret and splits it into shares. This is simpler, but the dealer must be trusted to delete the complete secret.
2. **Distributed key generation** - participants jointly create the group key without the full private key existing in one place. This is more aligned with FROST's goal of removing single-key control.

At the end of setup, each participant should have:

1. Their own private key share.
2. The public verification shares needed to check other signers.
3. The group public key.
4. Their participant identifier.
5. Backup data needed to recover or rotate the wallet later.

The private key share is the sensitive part. The group must protect it like a normal spending key, but one share alone is not enough to spend.

### Signing

When the group wants to authorize a transaction, a threshold of participants joins a signing session.

At a high level:

1. Selected participants publish one-time signing commitments.
2. The transaction or message to sign is chosen.
3. Each participant creates a signature share using their key share and session data.
4. The shares are verified.
5. A coordinator aggregates the valid shares into one final signature.

The coordinator does not need to be trusted with funds. Its role is to collect commitments and signature shares, check them, and assemble the final signature. A protocol can also be designed without one permanent coordinator, but some coordination mechanism is needed so signers agree on the exact transaction and signing session.

FROST is round-optimized, which is important for usability. Fewer communication rounds means fewer chances for a signing ceremony to fail because a participant is offline, a device disconnects, or a network relay drops messages.

## Why FROST Is Different From Traditional Multisig

Traditional multisig and FROST both distribute control. The difference is where the policy is enforced and how much information is visible.

### Traditional Multisig

Traditional multisig usually publishes the signing policy directly or reveals multiple signatures. Depending on the chain and script system, observers may learn:

1. That the wallet is multisig.
2. How many keys are involved.
3. Which threshold is required.
4. More transaction metadata than a normal single-key spend.

This can be acceptable for some transparent applications, but it is a poor fit for privacy-focused usage when the goal is to reveal as little as possible.

### FROST Threshold Signatures

FROST produces one aggregated signature under one group public key. The internal policy still exists, but it is enforced by the participants and wallet software rather than exposed as several independent signatures.

That matters for Zcash because shielded transactions are designed to minimize what the public chain reveals. A private multisig system should not unnecessarily reveal the number of signers, the threshold, or the internal governance structure of a wallet.

## FROST in Zcash

FROST is most relevant to Zcash shielded addresses, not transparent t-addresses. Zcash transparent transactions use ECDSA, while FROST works with Schnorr-style signatures. The ZF FROST Book explains that the Zcash key material that needs threshold control is the spend authorizing key, commonly called `ask`.

In shielded Zcash, spend authorization is part of what lets a transaction spend notes from a shielded wallet. If the spend authorizing key can be controlled by threshold shares, then a shielded wallet can require multiple participants to authorize a spend.

The Zcash Foundation's FROST work includes `frost-core`, ciphersuite crates, and Zcash-specific adaptations such as rerandomized FROST. The rerandomized variant is important because Zcash spend authorization has privacy requirements beyond ordinary signature aggregation. The goal is not just shared signing, but shared signing that remains compatible with shielded Zcash privacy.

A practical Zcash FROST wallet needs more than the cryptographic protocol. It also needs:

1. A safe user interface for reviewing transactions before signing.
2. A communication layer so signers can exchange signing messages.
3. Backup and recovery formats for key shares and wallet metadata.
4. Participant management for adding, removing, or replacing signers.
5. Clear policies for what happens when a signer is unavailable.

This is why FROST should be viewed as a core building block rather than a complete wallet product by itself.

## Privacy Benefits for Shielded Multisig

FROST supports privacy-preserving multisig in three main ways.

### One Final Signature

A FROST signing group outputs one final signature. This avoids making every signer visible as a separate on-chain participant.

### Hidden Internal Policy

The public chain does not need to know whether the group used 2-of-3, 3-of-5, or another threshold. The policy is enforced by the wallet and signing protocol.

### Better Shared Custody for Shielded Funds

Organizations often need shared approvals. Individuals often need recovery paths. FROST can support both while keeping Zcash's privacy goals in view.

This does not mean every privacy risk disappears. Signers can still leak information off-chain. Wallet software can still have bugs. Participants can still approve the wrong transaction. FROST reduces on-chain exposure, but operational privacy still matters.

## Real-World Use Cases

### DAO Treasury Management

A DAO or community fund can hold shielded ZEC in a threshold wallet. A 3-of-5 or 4-of-7 setup can require multiple stewards to approve spending.

This helps prevent one person from controlling the treasury. It also lets the group continue operating if one signer is unavailable. For privacy-focused organizations, FROST can reduce the amount of governance metadata visible to the public chain.

A practical DAO setup might use:

1. Separate signer devices for each steward.
2. A written policy for emergency spending.
3. Public reporting of approved payouts without revealing unnecessary wallet details.
4. Periodic signer rotation when members leave.

### Institutional Custody

An institution may need separation of duties. One department can initiate a transaction, another can review it, and a third can approve it. FROST makes it possible to distribute signing authority across people, devices, or regions.

For a custodian, the benefit is resilience. A single hacked workstation should not be enough to move funds. A single lost device should not make funds unrecoverable.

Institutional users still need compliance, logging, internal controls, and audit trails. FROST provides the cryptographic threshold layer; the institution must build policy and operations around it.

### Shared Wallets

Families, teams, and small organizations can use FROST to avoid single-key risk.

Example setups include:

1. 2-of-3 between a user, a backup device, and a recovery partner.
2. 3-of-5 for a project team treasury.
3. 2-of-2 for a high-security savings wallet where two devices must approve each spend.

These designs can make self-custody safer without sending funds to a centralized custodian.

### Advanced Governance Systems

FROST can support governance rules where different groups must participate in signing. For example, a grant program may require approval from finance, operations, and technical reviewers before a payout.

The threshold wallet does not replace governance. It enforces the final spend authorization. The human process still decides which transactions should be signed.

## Why FROST Could Become a Standard for Private Multisig

FROST has several properties that make it a strong candidate for private multisig systems.

1. **Efficiency** - the two-round protocol keeps signer coordination practical.
2. **Compact output** - the final signature verifies like a single signature.
3. **Distributed trust** - no one signer needs the complete private key.
4. **Misbehavior detection** - invalid signature shares can be identified.
5. **Standards alignment** - RFC 9591 gives implementers a stable reference point.
6. **Zcash-specific development** - ZF's work connects the protocol to Sapling and Orchard spend authorization needs.

For Zcash, the main ecosystem impact is that shared custody can move closer to the privacy model of normal shielded use. That opens the door for private treasuries, private recovery groups, and more professional custody workflows.

## Operational Best Practices

FROST improves the key model, but it does not remove the need for careful operations.

### Protect Every Key Share

Each share should be stored securely. A share alone cannot spend, but losing too many shares can make the wallet unusable. Compromising enough shares can allow theft.

### Verify Before Signing

Participants should review the transaction details before creating a signature share. Signers should know the amount, recipient, fee, and memo behavior before approving.

### Use Authenticated Communications

FROST signing messages need to be exchanged correctly. Participants should use authenticated channels so attackers cannot impersonate signers or swap messages.

### Plan Recovery

A FROST wallet backup is not just a seed phrase. A participant may need their key share, identifier, verification-share information, and Zcash wallet metadata. Recovery procedures should be tested before real funds are at risk.

### Rotate Signers When Needed

Organizations change. Signers leave, devices age, and operational policies improve. A FROST deployment should include a plan for replacing participants and moving funds into a new threshold wallet when needed.

### Keep Roles Clear

A signing threshold does not automatically define governance. The group should document who may propose transactions, who may sign, who may coordinate, and what approval process is required.

## Current Ecosystem Status

FROST is no longer just a research idea. RFC 9591 was published in 2024, and the Zcash Foundation announced a stable `frost-core` reference implementation before that standardization milestone. ZF has also published the FROST Book, Zcash-specific technical notes, and tools such as `frostd` and `frost-client` to help wallet developers experiment with signer communication.

The next practical step is wallet integration. Users should expect FROST support to appear through wallet software, developer tooling, and custody products rather than by manually running the protocol themselves.

## Glossary

### Threshold

The minimum number of participants required to sign. In a 3-of-5 wallet, the threshold is 3.

### Key Share

A private piece of the group signing key. Each participant stores one share.

### Group Public Key

The public key that verifies signatures produced by the threshold group.

### Distributed Key Generation

A setup process where participants jointly create the group key without a complete private key being held in one place.

### Coordinator

A role that helps collect signing commitments and signature shares. The coordinator assembles the final signature but should not need custody of funds.

### Spend Authorizing Key

In Zcash shielded transactions, the key material used to authorize a spend. FROST for Zcash focuses on threshold control of this signing authority.

## Conclusion

FROST is one of the most important tools for bringing practical private multisig to Zcash. It lets groups share control of funds, reduces single-key failure risk, and can preserve privacy by producing one final group signature instead of exposing a visible signing policy.

For individuals, FROST can make safer recovery and shared wallets possible. For organizations, it can support treasury management, custody, and governance without forcing all authority into one key. For the Zcash ecosystem, it is a path toward private, usable, and standards-aligned multi-party control of shielded funds.

## Further Learning

1. [RFC 9591: The FROST Protocol](https://www.rfc-editor.org/rfc/rfc9591)
2. [Zcash Foundation: FROST](https://zfnd.org/frost/)
3. [FROST Reference Implementation v1.0.0 Stable Release](https://zfnd.org/frost-reference-implementation-v1-0-0-stable-release/)
4. [The ZF FROST Book](https://frost.zfnd.org/)
5. [FROST with Zcash](https://frost.zfnd.org/zcash.html)
6. [Zcash technical details for FROST](https://frost.zfnd.org/zcash/technical-details.html)
7. [The State of FROST for Zcash](https://forum.zcashcommunity.com/t/the-state-of-frost-for-zcash/51290)
8. [FROST paper](https://eprint.iacr.org/2020/852)
