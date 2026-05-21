<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Post_Quantum_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Post-Quantum Security in Zcash

## TL;DR

- Quantum computers are a future risk to many public-key cryptography systems used across blockchains.
- The main blockchain risk is not that a quantum computer "breaks every coin" at once. The risk is that some signatures, keys, or old cryptographic assumptions may become unsafe.
- Zcash is not fully post-quantum today, but its privacy design reduces how much public key material users expose on-chain.
- Shielded Zcash helps because it hides much more transaction data than transparent blockchains, but shielding alone does not make Zcash quantum-proof.
- Zcash research such as ZIP 2005, Halo, Orchard, and Project Tachyon shows how the ecosystem can prepare for safer migrations.
- A good post-quantum upgrade needs more than a new algorithm. It needs safe migration paths, wallet support, audits, consensus changes, and privacy-preserving user experience.

## What Is Quantum Computing?

A normal computer stores information as bits: 0 or 1. A quantum computer uses quantum bits, usually called qubits. Qubits can be used in ways that let some math problems be solved much faster than on normal computers.

That does not mean quantum computers make all security useless. They are only dangerous for certain kinds of cryptography.

For blockchains, the important point is simple:

> Some cryptography that is secure against normal computers may become weak against a large enough quantum computer.

The most important examples are public-key systems based on factoring or elliptic curves. Many blockchains use elliptic-curve signatures to prove that the spender owns a coin.

## Why Blockchains Care

Most blockchains rely on three major cryptographic ideas:

1. Digital signatures prove that a user authorized a transaction.
2. Hash functions make commitments, addresses, Merkle trees, and proof challenges hard to forge.
3. Zero-knowledge proofs prove private facts without revealing them.

Quantum computers affect these areas differently.

Digital signatures are the most exposed. A sufficiently powerful quantum computer running Shor's algorithm could threaten common public-key systems such as ECDSA, EdDSA, and other elliptic-curve schemes.

Hash functions are less exposed. Grover's algorithm can speed up search, but it does not break hash functions in the same direct way. In practice, longer hash outputs can help restore safety margins.

Zero-knowledge proof systems need careful review. A proof system may depend on elliptic curves, hash functions, polynomial commitments, or other assumptions. Some parts may need replacement, while other parts may remain acceptable with adjusted parameters.

## Transparent Coins: The Simple Risk

On a transparent blockchain, addresses, balances, transaction amounts, and graph relationships are public. When a user spends from many transparent address types, public key material can also become visible.

That matters because a quantum attacker needs something to attack. If public key material is exposed on-chain and the signature scheme becomes breakable, old unspent funds could become risky.

A beginner-friendly way to think about it:

> A signature is like a lock on a box. Today, nobody can copy the key from seeing the lock. A strong future quantum computer might make some old lock designs unsafe.

This is why address reuse is bad even before quantum computers. Reusing addresses leaks more data and gives attackers more historical material to study.

## What Is Different About Zcash?

Zcash has both transparent and shielded transaction support.

Transparent Zcash behaves more like Bitcoin-style public blockchain usage. Addresses, amounts, and relationships are visible.

Shielded Zcash is different. A shielded transaction uses zero-knowledge proofs so the chain can verify that the transaction is valid without revealing the sender, receiver, or amount.

This gives Zcash an important privacy advantage:

- Less public transaction data is exposed.
- Fewer user relationships are visible.
- Shielded notes do not reveal the same public address graph as transparent transactions.
- Users can avoid leaving a long public trail of payment behavior.

But this does not mean shielded Zcash is magically post-quantum. Shielded pools still use cryptographic assumptions. Spend authorization, note commitments, nullifiers, proofs, and wallet keys all need careful review under a quantum threat model.

The practical conclusion is:

> Shielded usage can reduce public exposure, but Zcash still needs deliberate post-quantum planning.

## What Is Post-Quantum Cryptography?

Post-quantum cryptography means cryptography designed to resist attacks from both normal computers and future quantum computers.

It does not require users to own quantum computers. It means the algorithms are based on math problems that are believed to remain hard even for quantum computers.

NIST has already finalized the first major post-quantum standards:

- ML-KEM for key establishment
- ML-DSA for digital signatures
- SLH-DSA for hash-based digital signatures

These standards are important, but blockchains cannot simply copy-paste them into consensus rules overnight. A blockchain upgrade must consider transaction size, verification cost, wallet support, hardware wallets, privacy, auditability, and migration safety.

## How Zcash Is Preparing

Zcash has several qualities that make post-quantum migration more realistic than it would be for a system that never changes.

### Network Upgrades

Zcash has already gone through major cryptographic upgrades. Earlier shielded pools used Sprout and Sapling. Later, NU5 introduced Orchard and Halo 2.

That history matters. It shows that the ecosystem can coordinate upgrades, introduce new pools, and move users toward better cryptography over time.

### Halo and Orchard

Halo removed the need for trusted setups in Zcash's modern shielded proof system. Orchard uses Halo 2 as part of the current shielded protocol.

Halo is not the same as post-quantum security. It is still important because it shows a path for changing proof systems and reducing old assumptions.

### ZIP 2005: Orchard Quantum Recoverability

ZIP 2005 is a Zcash Improvement Proposal focused on quantum recoverability for Orchard notes.

The key idea is not "Zcash becomes fully quantum-proof." The idea is more specific: if a future quantum threat becomes practical, users should have a better path to recover or migrate affected shielded funds.

That is an important distinction. Recoverability is a migration safety feature. It helps users move forward if older assumptions become risky.

### Project Tachyon

Project Tachyon is focused on scaling and private sync improvements for Zcash.

This matters for post-quantum planning because future cryptography may be larger or more expensive. Better sync, smaller transactions, and better state management can make future upgrades easier to deploy without hurting everyday users.

Tachyon is not itself a complete post-quantum upgrade, but it can improve the foundation that future privacy and security upgrades depend on.

## Possible Upgrade Paths

A future post-quantum Zcash plan could include several parts.

### Post-Quantum Spend Authorization

Zcash may eventually need spend authorization that does not depend on quantum-vulnerable signature schemes.

This could involve post-quantum signatures, hybrid signatures, or new wallet key structures. A hybrid design uses both classical and post-quantum signatures during a transition period.

### New Address and Key Formats

Users may need new address formats that support post-quantum keys or migration paths. Wallets must make this simple enough that users do not accidentally keep funds in older, riskier formats.

### Migration Windows

Zcash may need a planned migration period where users move funds from older pools or key types into newer ones.

The hard part is doing this without harming privacy. If everyone migrates in obvious patterns, the migration itself could leak information.

### Proof System Review

Zero-knowledge proof systems need a separate review. A post-quantum signature does not automatically make a shielded pool post-quantum.

The Zcash community would need to review:

- Spend authorization
- Note commitments
- Nullifiers
- Merkle tree assumptions
- Proof-system assumptions
- Fiat-Shamir hash choices
- Wallet scanning and viewing-key behavior

### Wallet and Exchange Support

Consensus changes are only one part of the work. Wallets, exchanges, payment processors, hardware wallets, explorers, and custody tools also need to support any migration.

For users, the upgrade should feel like a clear wallet action, not a cryptography research project.

## Beginner Example

Imagine a game account that uses an old password system. The game can upgrade to a stronger password system, but users still need a safe way to move old accounts.

If the migration is confusing, users may stay on the old system. If the migration reveals everyone's account history, privacy gets worse.

Zcash has the same kind of challenge, but with money and privacy:

- The cryptography must become safer.
- Users must be able to migrate.
- The migration should avoid revealing unnecessary information.
- Wallets must make the safe path easy.

## What Users Can Do Today

Users do not need to panic. Large quantum computers capable of breaking deployed blockchain cryptography are not publicly available today.

Still, good habits help:

- Prefer shielded Zcash usage when possible.
- Avoid address reuse.
- Keep wallets updated.
- Follow Zcash network upgrade guidance.
- Watch for ZIPs and wallet notices about quantum recoverability or migration.
- Do not assume transparent address activity is private.
- Do not move funds based on rumors. Wait for clear guidance from trusted Zcash developers and wallet teams.

## Challenges

Post-quantum upgrades are hard for every blockchain.

Common challenges include:

- Larger signatures and keys
- More bandwidth usage
- Higher verification costs
- Slower hardware-wallet support
- New audit requirements
- Consensus risk during migration
- Privacy leaks during mass migration
- Compatibility with exchanges and payment processors

For Zcash, the privacy challenge is especially important. A bad migration could preserve funds but weaken privacy. A good migration should protect both.

## Why This Matters for Zcash

Zcash is built around private digital cash. Long-term privacy is part of the promise.

Quantum planning matters because blockchain data is long-lived. Data published today may still be visible decades from now. If old cryptography weakens in the future, attackers may look backward at historical data.

Zcash's shielded design gives it a stronger starting point than fully transparent systems, but the work is not finished. The goal is to combine privacy, recoverability, and future-safe cryptography without making the system too hard for normal users.

## Related Pages

- [Shielded Pools](/using-zcash/shielded-pools) - How Zcash shielded transactions protect transaction details
- [Halo](/zcash-tech/halo) - Zcash's modern proof system without trusted setup
- [ZKP & ZK-SNARKS](/zcash-tech/zk-snarks) - How zero-knowledge proofs work in Zcash
- [Viewing Keys](/zcash-tech/viewing-keys) - How selective disclosure works for shielded Zcash
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) - Future shielded assets and private asset support
- [Privacy as a Core Principle](/privacy/privacy-as-a-core-principle) - Why financial privacy matters

## Further Learning

- [NIST Post-Quantum Cryptography Project](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [NIST finalized post-quantum standards announcement](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)
- [ZIP 2005: Orchard Quantum Recoverability](https://zips.z.cash/zip-2005)
- [Project Tachyon](https://tachyon.z.cash/)
- [Zcash Protocol Specification](https://zips.z.cash/protocol/protocol.pdf)
- [Halo 2 Book](https://zcash.github.io/halo2/)
