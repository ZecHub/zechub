<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Post_Quantum_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Post-Quantum Security in Zcash

## TL;DR

- Quantum computers are a future risk because they could break some public-key cryptography used by blockchains today.
- "Post-quantum" means cryptography that runs on ordinary computers but is designed to resist attacks from future quantum computers.
- Zcash is not fully post-quantum today.
- Shielded Zcash reduces the amount of public transaction data that future attackers can study, but shielded usage is not the same as full quantum resistance.
- Zcash is preparing through research, ZIPs, and upgrade proposals such as ZIP 2005 and Project Tachyon.
- A safe post-quantum migration has to protect funds, privacy, wallets, exchanges, and consensus rules at the same time.

## What Is Quantum Computing?

A normal computer stores information as bits. Each bit is either `0` or `1`.

A quantum computer uses quantum bits, called qubits. Qubits can be used by special algorithms that solve some math problems much faster than normal computers.

That does not mean a quantum computer is faster at everything. The risk is specific. Some cryptography depends on math problems that are very hard for normal computers but much easier for a large enough quantum computer.

For blockchains, the most important example is public-key cryptography. Public keys and signatures are used to prove that a user is allowed to spend coins.

## Why Blockchains Care

Blockchains use cryptography for several different jobs:

| Cryptographic tool | What it does | Quantum impact |
| --- | --- | --- |
| Digital signatures | Prove the owner authorized a spend | High risk for common elliptic-curve systems |
| Hash functions | Build addresses, commitments, Merkle trees, and challenges | Lower risk, but security margins matter |
| Zero-knowledge proofs | Prove shielded transactions are valid without revealing details | Depends on the proof system and assumptions |
| Key agreement | Helps wallets encrypt note data for receivers | Needs careful review under a quantum threat model |

A sufficiently powerful quantum computer could threaten many signature schemes used today, including elliptic-curve signatures. This matters because a signature is what lets the network know a transaction was authorized by the right key.

Hash functions are different. Grover's algorithm can speed up brute force search, but it does not break hash functions in the same direct way. Larger security margins can help.

## What Is Post-Quantum Cryptography?

Post-quantum cryptography is cryptography designed to stay secure against both normal computers and future quantum computers.

It does not mean the cryptography uses a quantum computer. It means the system is based on different hard math problems.

In 2024, NIST released the first finalized post-quantum standards:

- **ML-KEM** for key establishment
- **ML-DSA** for digital signatures
- **SLH-DSA** for hash-based digital signatures

These standards are a major milestone, but a blockchain cannot simply swap one algorithm for another overnight. Consensus rules, wallets, hardware wallets, transaction sizes, fees, and privacy all have to be considered.

## How Quantum Risk Shows Up On-Chain

A simple way to think about the risk is:

1. A user creates a key pair.
2. The public key or signature data may appear on-chain.
3. A future quantum attacker may be able to use that public material to learn the private key.
4. If funds are still controlled by that key, they may be at risk.

Transparent blockchains expose a lot of information by design. Addresses, amounts, and transaction links are public. Public key material can also become visible when coins are spent.

This is one reason address reuse is harmful. Reuse gives observers more data to connect today and gives future attackers more historical material to analyze.

## What Is Different About Zcash?

Zcash supports both transparent and shielded transactions.

Transparent Zcash works more like Bitcoin-style public blockchain usage. Addresses, amounts, and transaction relationships are visible.

Shielded Zcash is different. Shielded transactions use zero-knowledge proofs so the network can verify that a transaction follows the rules without revealing the sender, receiver, or amount.

This gives Zcash an important privacy advantage:

- Less transaction data is published for everyone to see.
- Users avoid creating a public payment graph when they stay shielded.
- Future observers have less public financial history to analyze.
- Selective disclosure can happen through viewing keys instead of public-by-default records.

But shielded Zcash is not automatically post-quantum. Shielded pools still depend on cryptographic assumptions. Spend authorization, note commitments, nullifiers, proof systems, encryption, and wallet keys all need careful review.

The short version:

> Shielded usage reduces public exposure, but Zcash still needs deliberate post-quantum upgrades.

## Zcash Risk Map

| Area | Beginner explanation | Post-quantum concern |
| --- | --- | --- |
| Transparent addresses | Public addresses and public transaction graph | Similar risks to other transparent blockchains |
| Spend authorization | The proof that a user is allowed to spend | Signature schemes may need replacement or migration |
| Shielded notes | Private records of value inside shielded pools | Some components may need new assumptions or recovery tools |
| zk-SNARKs | Proofs that shielded transactions are valid | Proof-system assumptions need review |
| Wallet scanning | How wallets find and decrypt received notes | Key agreement and note encryption need review |
| Migration | Moving funds to safer cryptography | Must avoid both fund loss and privacy leaks |

## How Zcash Is Preparing

### Zcash Has A Network Upgrade Process

Zcash has changed its cryptography before. Sapling made shielded transactions easier to use. NU5 introduced Orchard, Unified Addresses, and Halo 2.

This matters because post-quantum readiness is not a one-line software patch. It requires coordinated network upgrades, wallet changes, audits, and time for users to migrate.

Past Zcash upgrades show that the ecosystem has experience moving from older cryptography toward newer designs.

### Halo And Orchard Reduced Older Assumptions

Halo 2 is used by Orchard, Zcash's modern shielded pool. One important improvement is that Halo removed the need for a trusted setup for the Orchard proof system.

That is not the same thing as post-quantum security. It is still relevant because it shows Zcash can replace major cryptographic building blocks when better designs are available.

### ZIP 2005 Focuses On Quantum Recoverability

ZIP 2005 is titled "Orchard Quantum Recoverability." It proposes changes intended to help Orchard users recover or migrate funds if quantum attacks against older assumptions become practical.

Recoverability is not the same as full post-quantum security. It is narrower and still useful:

- Full post-quantum security tries to prevent quantum attacks from working.
- Recoverability gives honest users a better path if older cryptography becomes unsafe.

For beginners, think of this as an emergency exit plan. It does not replace the whole building, but it helps people leave the old room safely if the old lock becomes weak.

### Project Tachyon Looks Toward Larger Protocol Improvements

Project Tachyon is a proposed Zcash upgrade focused on scale, sync, and state growth. Its public site says the proposal aims to shrink transactions, reduce validator state growth, and obtain full post-quantum privacy as a side effect.

Because Tachyon is a proposal, it still depends on engineering work, review, and community approval before activation. It is best understood as part of Zcash's active research and upgrade direction, not as a feature that users already have today.

### Research And Standards Are Moving

The wider cryptography world is also moving. NIST's post-quantum standards give implementers stronger building blocks for signatures and key establishment. Zero-knowledge researchers continue to study proof systems that can hold up under quantum assumptions.

Zcash can benefit from that work, but it still has to adapt it to a privacy-preserving blockchain.

## Possible Future Upgrade Approaches

### Post-Quantum Spend Authorization

Zcash may eventually need spend authorization that does not rely on quantum-vulnerable signature schemes.

This could use post-quantum signatures, hybrid signatures, or another design. A hybrid design uses both classical and post-quantum checks during a transition period, so the system does not depend on only one assumption.

The challenge is size and cost. Post-quantum signatures can be larger than today's signatures, which affects transaction size, bandwidth, fees, mobile wallets, and hardware wallets.

### New Address And Key Formats

New cryptography often needs new keys and addresses. Users would need a clear migration path from old formats to safer formats.

The migration should be simple in wallets. Most users should not have to understand every cryptographic detail to stay safe.

### Privacy-Preserving Migration

Migration is especially sensitive for Zcash. If many users move funds from old pools to new pools in obvious patterns, the migration itself could leak information.

A good migration plan needs to protect:

- User funds
- User privacy
- Wallet compatibility
- Exchange support
- Hardware wallet support
- Network consensus safety

### Post-Quantum Proof System Review

Replacing signatures is not enough. Zcash's shielded design also depends on zero-knowledge proofs and commitments.

Future work may need to review or replace:

- zk-SNARK assumptions
- Polynomial commitments
- Fiat-Shamir challenge hashes
- Note commitments
- Nullifier construction
- Merkle tree assumptions
- Note encryption and viewing-key behavior

Some components may be acceptable with adjusted parameters. Other components may need new designs.

## Beginner Examples

### Example 1: The Old Lock

Imagine a safe with a lock that is strong today. A new tool invented in the future might open that old lock quickly.

Post-quantum cryptography is like replacing the lock with a design that the new tool is not expected to break.

For a blockchain, replacing the lock is hard because every wallet, node, exchange, and hardware device must understand the new design.

### Example 2: The Public Receipt Box

Transparent blockchain data is like putting every receipt in a public box forever. Even if nobody can read every pattern today, future tools may learn more later.

Shielded Zcash tries to avoid publishing those receipts in the first place. That helps long-term privacy, but the lock protecting the shielded system still has to be reviewed for a quantum future.

### Example 3: The Exit Plan

Recoverability is like planning an exit route before there is a fire. You hope not to need it, but it is much safer to design it early than during an emergency.

ZIP 2005 fits this idea for Orchard notes.

## What Users Can Do Today

Users do not need to panic. Large public quantum computers capable of breaking deployed blockchain cryptography are not available today.

Good habits still help:

- Prefer shielded Zcash usage when possible.
- Avoid reusing addresses.
- Keep wallets updated.
- Follow Zcash network upgrade announcements.
- Watch for ZIPs and wallet guidance about recoverability or migration.
- Do not assume transparent activity is private.
- Do not move funds based on rumors; wait for clear guidance from trusted Zcash developers and wallet teams.

## Challenges

Post-quantum upgrades are difficult for every blockchain.

Common challenges include:

- Larger keys and signatures
- Larger transactions
- Higher verification costs
- More bandwidth usage
- New security audits
- Hardware wallet support
- Mobile wallet performance
- Exchange and custody integration
- Privacy leaks during migration
- Community agreement on consensus changes

For Zcash, the hardest part is not only keeping coins spendable. The hard part is keeping coins spendable while preserving the privacy that makes Zcash different.

## Summary

Quantum computers could eventually threaten some cryptography used by blockchains. Post-quantum cryptography is the long-term answer, but it has to be deployed carefully.

Zcash is not fully post-quantum today. However, Zcash has useful strengths: shielded transactions reduce public exposure, the network has a history of cryptographic upgrades, and current research such as ZIP 2005 and Project Tachyon is already aimed at future quantum risks.

For beginners, the main idea is simple: privacy today reduces future data exposure, and careful upgrades can help Zcash move toward stronger quantum-era security without sacrificing usability.

## Related Pages

- [Shielded Pools](/using-zcash/shielded-pools) - How Zcash shielded transactions protect transaction details
- [Halo](/zcash-tech/halo) - Zcash's proof system without a trusted setup
- [ZKP & ZK-SNARKS](/zcash-tech/zk-snarks) - How zero-knowledge proofs work in Zcash
- [Viewing Keys](/zcash-tech/viewing-keys) - How selective disclosure works for shielded Zcash
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) - Future shielded assets and private asset support
- [Privacy as a Core Principle](/privacy/privacy-as-a-core-principle) - Why financial privacy matters

## References

- [NIST: First finalized post-quantum encryption standards](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)
- [NIST Post-Quantum Cryptography Project](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [ZIP 2005: Orchard Quantum Recoverability](https://zips.z.cash/zip-2005)
- [Project Tachyon](https://tachyon.z.cash/)
- [Zcash Protocol Specification](https://zips.z.cash/protocol/protocol.pdf)
- [Halo 2 Book](https://zcash.github.io/halo2/)
