<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Post_Quantum_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Post-quantum security in Zcash

## TL;DR

1. Quantum computers are a possible future risk for blockchains because they could break some public-key cryptography used today.
2. Post-quantum cryptography means cryptography designed to stay secure even if large quantum computers become real.
3. Zcash is not fully post-quantum today.
4. Zcash researchers have discussed ways to reduce quantum risk, including quantum recoverability for Orchard funds and longer-term post-quantum protocol upgrades.
5. The most important idea for users today is simple: avoid address reuse, prefer shielded addresses, and stay ready for future network upgrades.

## What is quantum computing?

A normal computer stores information as bits. A bit is either `0` or `1`.

A quantum computer uses quantum bits, often called qubits. A qubit can be used in ways that let some special algorithms test many possibilities more efficiently than a normal computer.

This does not mean a quantum computer is faster at every task. It matters most for a few types of math problems. Some of those problems are the foundation of public-key cryptography.

## Why blockchains care

Blockchains use cryptography for two broad jobs.

1. They use signatures to prove that the person spending coins has the right key.
2. They use hashes and commitments to link data together and make tampering obvious.

Large quantum computers would be especially dangerous for signature systems based on elliptic curves or RSA. Many blockchains, including Zcash, use elliptic-curve cryptography in different places.

Hash functions are less affected. A quantum algorithm called Grover's algorithm can speed up brute-force search, but the usual defense is to use larger security margins. Hashes are not considered broken in the same direct way as today's common signature systems.

## What is post-quantum cryptography?

Post-quantum cryptography is cryptography that runs on today's normal computers but is designed to resist attacks from future quantum computers.

NIST, the United States standards body, has selected and published the first post-quantum cryptography standards. These include ML-KEM for key establishment and ML-DSA and SLH-DSA for digital signatures.

The important point for beginners is this:

1. Post-quantum does not mean "uses a quantum computer."
2. It means "designed so a quantum computer should not easily break it."
3. Moving a blockchain to post-quantum cryptography takes time because wallets, addresses, signatures, proofs, and consensus rules must all work together.

## What quantum risks apply to Zcash?

Zcash has both transparent and shielded parts.

Transparent Zcash addresses work more like Bitcoin addresses. When funds are spent, public keys and signatures appear on-chain. If a powerful quantum computer existed, exposed public keys could become a target.

Shielded Zcash addresses are different. They hide sender, receiver, and amount when users transact inside shielded pools. This gives Zcash a stronger privacy base, but it does not automatically make every part of the system post-quantum.

Zcash still uses cryptographic assumptions that would need careful review for a post-quantum future. These include:

1. Signature schemes used to authorize spends.
2. Key agreement and viewing-key tools used by wallets.
3. Zero-knowledge proof systems and the curves they depend on.
4. Address formats and migration paths.

## A simple example

Imagine a mailbox with a lock.

Today, a normal attacker cannot guess the key. A future quantum attacker might be able to solve the math puzzle that protects some kinds of locks.

Post-quantum cryptography is like replacing the lock with a new design that is not based on that vulnerable puzzle.

For a blockchain, this is harder than replacing one lock. Every wallet, exchange, explorer, hardware device, and node has to understand the new lock before users can safely move.

## How Zcash is preparing

### Zcash research tracks the risk

Zcash community members and researchers have written about quantum risk for years. Sean Bowe's article "Zcash and Quantum Computers" explains an important nuance: shielded Zcash can have better privacy properties against some future quantum analysis than fully transparent systems, but quantum resistance is still an active research area.

### ZIP 2005 proposes quantum recoverability

ZIP 2005 is a proposal for quantum recoverability for the Orchard shielded pool.

Recoverability is not the same thing as full post-quantum security. The goal is narrower: if quantum-capable attackers could forge existing spend authorization signatures, the protocol would give honest Orchard users a way to recover their funds into a newer, safer system.

This kind of proposal matters because it gives the community a possible emergency path instead of waiting until a crisis.

### Project Tachyon explores stronger privacy and scaling

Project Tachyon is a Zcash scaling proposal from Shielded Labs. It focuses on better wallet sync and private information retrieval, but it also discusses changes that could help preserve privacy as the protocol evolves.

Tachyon is not the same thing as a full post-quantum upgrade. It is part of the broader research direction: make Zcash easier to use privately, reduce metadata leaks, and build better foundations for future upgrades.

### Past upgrades show that Zcash can migrate cryptography

Zcash has already upgraded its cryptography over time.

1. Sapling made shielded transactions much more efficient.
2. NU5 introduced Orchard, Unified Addresses, and Halo 2.
3. Halo removed the need for a trusted setup in the Orchard proof system.

These upgrades do not make Zcash post-quantum, but they show that the network has experience with coordinated cryptographic migration.

## Possible future upgrade approaches

Future post-quantum work could include several pieces.

### Post-quantum signatures

Zcash could adopt a signature scheme based on post-quantum assumptions. This would protect spend authorization from quantum attacks.

The challenge is that post-quantum signatures are often larger than today's elliptic-curve signatures. Larger signatures can affect transaction size, fees, bandwidth, hardware wallets, and mobile wallet performance.

### New address and key formats

New cryptography usually needs new addresses and keys. Users would need a clear migration path from older addresses to newer post-quantum-safe addresses.

The safest path would make migration simple for normal users and avoid forcing them to understand every cryptographic detail.

### Post-quantum proof systems

Zcash uses zero-knowledge proofs to verify shielded transactions. A future post-quantum design may need proof systems whose security does not depend on assumptions weakened by quantum computers.

This is an active research area across the privacy and zero-knowledge world.

### Recovery and migration tools

If quantum risk becomes urgent before a full migration is ready, recovery tools may matter. ZIP 2005 is an example of thinking about that problem before it becomes an emergency.

## Why privacy-focused cryptography matters

A public blockchain creates a long-term record. Data on-chain can be studied years later with better tools.

This is why privacy is not only about today. It is also about the future.

If better computers arrive later, old public transaction data will still exist. Shielded transactions reduce the amount of personal financial information that is recorded publicly in the first place.

That is one reason Zcash's privacy model matters in a post-quantum discussion. Good privacy today can reduce what future attackers have available to analyze.

## Challenges

Post-quantum upgrades are difficult.

1. New cryptography must be reviewed carefully.
2. Transactions may become larger.
3. Wallets need new key management.
4. Hardware wallets and mobile wallets may need performance work.
5. Exchanges and services need time to upgrade.
6. Users need simple migration instructions.
7. The community must agree on consensus changes.

For Zcash, the goal is not only to choose a post-quantum algorithm. The goal is to preserve privacy, usability, and security at the same time.

## What users can do now

1. Use shielded addresses when possible.
2. Avoid reusing addresses.
3. Keep wallet software updated.
4. Pay attention to network upgrade announcements.
5. Do not panic about quantum computers. The risk is important, but practical large-scale attacks are not here today.

## Summary

Quantum computers could threaten some cryptography used by blockchains. Post-quantum cryptography is the long-term answer, but it requires careful migration.

Zcash is not fully post-quantum today. However, the ecosystem is already thinking about the problem through research, proposals like ZIP 2005, and broader protocol work such as Tachyon.

For beginners, the message is simple: Zcash's shielded design helps reduce long-term privacy exposure, and future upgrades can keep improving the system as cryptography evolves.

## Resources

[NIST post-quantum cryptography standards](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)

[NIST post-quantum cryptography project](https://csrc.nist.gov/projects/post-quantum-cryptography)

[ZIP 2005: Quantum Recoverability for Orchard](https://zips.z.cash/zip-2005)

[Zcash and Quantum Computers - Sean Bowe](https://seanbowe.com/blog/zcash-and-quantum-computers/)

[Project Tachyon - Shielded Labs](https://forum.zcashcommunity.com/t/project-tachyon/48941)

[Zcash Protocol Specification](https://zips.z.cash/protocol/protocol.pdf)

---

*This article is for education only. It is not security, financial, or investment advice.*
