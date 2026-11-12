<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo

## TL;DR

Halo is a trustless, recursive zero-knowledge proof (ZKP) system discovered by Sean Bowe at Electric Coin Co. It removes the need for a trusted setup and makes recursive proof composition practical, which is the foundation of Zcash's current scalability and security roadmap.

- **What it is:** a zk-SNARK construction with efficient recursion and no trusted setup ceremony.
- **Why it matters:** Zcash's Orchard shielded pool, activated with NU5 in 2022, runs on Halo 2 — the production implementation of this research.
- **Key property:** no "toxic waste" from setup ceremonies, and proofs that can attest to practically unlimited other proofs.
- **Licensing:** Halo 2 is open source under [MIT and Apache 2.0](https://github.com/zcash/halo2#readme), so anyone in the ecosystem can build on it.

---

## Core Explanation

Halo is a trustless, recursive zero-knowledge proof system discovered by Sean Bowe at Electric Coin Co. It eliminates the trusted setup and allows greater scalability of the Zcash blockchain. Halo was the first zero-knowledge proof system that is both efficient and recursive — widely regarded as a scientific breakthrough.

![halo](/content-images/_unavailable.svg "halo")

### The two components

- **Succinct Polynomial Commitment Scheme.** Allows a committer to commit to a polynomial with a short string that can be used by a verifier to confirm claimed evaluations of the committed polynomial.
- **Polynomial Interactive Oracle Proof.** The verifier asks the prover (an algorithm) to open all commitments at points of its choosing, using the polynomial commitment scheme, and checks that the identity holds true between them.

### No trusted setup

Some zk-SNARK constructions, such as Groth16, require a trusted setup to generate their public parameters, often called a common reference string (CRS). The CRS is shared with provers and verifiers; it is not the secret that must be destroyed. The secret intermediate material ("toxic waste") produced by such a setup must be discarded. A secure multi-party computation can distribute that trust: the ceremony is secure if at least one participant follows the protocol and destroys their secret contribution. See ECC's [explanation of public parameters and toxic waste](https://zodl.com/snark-parameters/).

Zcash's earlier Sprout and Sapling shielded pools used trusted-setup proving systems, BCTV14 and Groth16 respectively. Their public parameters remain available for proving and verification. The concern is whether secret setup material was retained, which could allow false proofs; publishing the CRS itself is expected and does not reveal that secret material.

Halo combines recursive proof composition with a polynomial commitment scheme based on an inner product argument. Its public parameters do not require a trusted setup ceremony or the destruction of a secret setup trapdoor. The [Halo 2 book describes these public group parameters](https://zcash.github.io/halo2/background/pc-ipa.html#setup). This is different from making a ceremony-generated structured reference string upgradeable.

Removing this setup requirement avoids relying on the destruction of secret ceremony material for Halo proofs. It does not prove that an earlier Sprout or Sapling ceremony was uncompromised, nor certify that all later protocol changes are secure. Recursive proofs attest to the computations encoded in their circuits, under the proof system's assumptions. Correct circuits and implementations still matter; ECC's [Halo 2 deployment explainer](https://zodl.com/technical-explainer-halo-on-zcash/) explicitly notes the risk of new bugs or design flaws.

[Sean Bowe's explainer at Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

---

## Visual / Analogy

### The notary chain

Think of a normal zk-SNARK as a notarised document: one stamp, one verification, done. Now imagine you need to prove that a stack of ten thousand documents is authentic. Without recursion, a verifier would have to check every stamp.

Halo turns each verified document into a stamp on the *next* document, until the whole stack collapses into a single document with a single stamp. Checking the last document is enough to trust the entire chain — and crucially, Halo's notary (the proving system) manufactures its own stamps without ever needing an external authority to set up its seal.

### Why removing the trusted setup matters

In older trusted-setup systems, the public "seal" (the CRS) came from a ceremony. Participants had to destroy their secret intermediate material while keeping the public parameters available. Halo avoids that ceremony and its secret setup trapdoor. This does not remove the need to protect users' spending keys or to check the proof system's assumptions and implementation.

---

## Deep Dive

### Recursive proofs

Recursive proof composition allows a single proof to attest to the correctness of practically unlimited other proofs, compressing a large amount of computation (and information). This is an essential component for scalability, because it allows the network to scale horizontally while pockets of participants can still trust the integrity of the remainder of the network.

Before Halo, achieving recursive proof composition required large computational expense and a trusted setup. One of the main discoveries was a technique called **nested amortization**: recursive composition using a polynomial commitment scheme based on the inner product argument, massively improving performance while avoiding the trusted setup.

The [Halo paper](https://eprint.iacr.org/2019/1021.pdf) fully describes this polynomial commitment scheme and discovered that a new aggregation technique existed within it. The technique allows a large number of independently created proofs to be verified nearly as quickly as verifying a single proof. On its own, that already offered a better alternative to the earlier zk-SNARKs used in Zcash.

### Halo 2

Halo 2 is a high-performance zk-SNARK implementation written in Rust which eliminates the need for a trusted setup while setting the stage for scalability in Zcash.

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

It includes a generalisation of the approach called an **accumulation scheme**. This formalisation exposes how nested amortization actually works: by adding proofs to an object called an **accumulator**, where each proof reasons about the previous state of the accumulator, all previous proofs can be checked (by induction) simply by checking the current state of the accumulator.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>

In parallel, many other teams were discovering Polynomial IOPs more efficient than Sonic (used in Halo 1), such as Marlin. The most efficient of these protocols is PLONK, which grants enormous flexibility in designing efficient implementations based on application-specific needs and provides 5× better prover time than Sonic.

[Overview of PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)

### Halo in the wider ecosystem

Electric Coin Company entered into an agreement with Protocol Labs, the Filecoin Foundation, and the Ethereum Foundation to explore Halo R&D, including how the technology might be used in their respective networks. The agreement aims to provide better scalability, interoperability, and privacy across ecosystems and for Web 3.0.

Additionally, Halo 2 is under the [MIT and Apache 2.0 open-source licenses](https://github.com/zcash/halo2#readme), meaning anyone in the ecosystem can build with the proving system.

**Filecoin.** Since its deployment, the halo2 library has been adopted in projects like the zkEVM, and there is potential integration of Halo 2 into the proof system for the Filecoin Virtual Machine. Filecoin requires numerous costly proofs of spacetime and proofs of replication; Halo 2 is pivotal in compressing space usage and better scaling the network. [Filecoin Foundation video with Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw). It would also benefit both ecosystems if Filecoin storage payments could be made in ZEC, affording the same privacy for storage purchases that exists in Zcash shielded transfers — including encrypting files in Filecoin storage and supporting mobile clients that attach media to a Zcash encrypted memo. [ECC × Filecoin blog post](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

**Ethereum.** A Halo 2 proof for an efficient Verifiable Delay Function (VDF) is being developed. A VDF is a cryptographic primitive with many potential use cases, including general-purpose randomness for smart contracts and leader election in Proof of Stake. ECC, the Filecoin Foundation, Protocol Labs, and the Ethereum Foundation are also working with [SupraNational](https://www.supranational.net/), a vendor specialising in hardware-accelerated cryptography, for potential GPU and ASIC development of the VDF. The [Privacy and Scaling Explorations group](https://appliedzkp.org/) is researching additional ways Halo 2 proofs can improve privacy and scalability for Ethereum.

### Other projects using Halo

- [Anoma](https://anoma.net/blog/hash-functions-in-plonkup) — a privacy-preserving multichain atomic swap protocol
- [Orbis](https://docs.orbisprotocol.com/orbis/technology/halo-2) — an L2 zkRollup on Cardano
- [DarkFi](https://dark.fi/book/arch/arch.html) — a private L1 zkEVM blockchain
- [Scroll](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k) — an L2 zkRollup on Ethereum

---

## Practical Implications

**For Zcash itself**

- The Orchard shielded pool, activated with NU5, is the implementation of this new proof system on the Zcash network. It is guarded by the same turnstile design used between Sprout and Sapling, with the intent to gradually retire the older shielded pools.
- Following NU5 (mid-2022), integration of recursive proofs became possible, and several privacy enhancements came along with it — most notably the introduction of 'Actions' replacing inputs/outputs, which reduces the amount of transaction metadata.
- Removing trusted setups eliminates a systemic risk that would otherwise have to be repeated for every major protocol upgrade.

**For holders and operators**

- Recursive proof composition holds the potential for compressing unlimited amounts of computation, creating auditable distributed systems, and improving Layer 1 capacity for full-node operators — relevant to extensions such as Zcash Shielded Assets and Zcash's longer-term designs.

---

## Common Mistakes

| Common belief | What is actually the case |
| --- | --- |
| "Halo is a future upgrade Zcash is waiting for." | Orchard, live on mainnet since NU5 (2022), already runs on Halo 2. |
| "No trusted setup means no parameters at all." | Halo still uses public parameters. They do not require a ceremony in which participants must be trusted to destroy secret setup material. |
| "Halo 2 and the Halo paper are the same thing." | The [paper](https://eprint.iacr.org/2019/1021.pdf) describes the polynomial commitment scheme and nested amortization; Halo 2 is the production Rust implementation with an accumulation scheme and PLONKish arithmetisation. |
| "Recursion only helps with scaling block verification." | Recursion also compresses application-level computation — see Filecoin's proofs of spacetime/replication and the VDF work for Ethereum. |

---

## Related Pages

- [zk-SNARKs](/zcash-tech/zk-snarks) — the general technology category Halo belongs to
- [Halo (research paper)](https://eprint.iacr.org/2019/1021.pdf) — the original publication
- [Ironwood](/zcash-tech/ironwood) and [The Turnstile](/zcash-tech/the-turnstile) — how shielded pools migrate while older ones retire
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — an extension that benefits from recursive proofs
- [Zebra Full Node](/zcash-tech/zebra-full-node) — the node implementation that validates proofs on chain

## Further Learning

- [An introduction to ZKP and Halo 2 — Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2 with Daira & Str4d — ZK Podcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [Technical explainer blog](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Halo 2 Community Showcase — Ying Tong @ Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Documentation**

- [Halo 2 resources](https://github.com/mhchia/awesome-halo2)
- [Halo 2 docs](https://zcash.github.io/halo2/)
- [Halo 2 GitHub](https://github.com/zcash/halo2)
