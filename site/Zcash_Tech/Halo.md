<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo

Halo is a trustless, recursive zero-knowledge proof system discovered by Sean Bowe at Electric Coin Co. It eliminates the need for a trusted setup and makes recursive proof composition practical. Halo was the first zero-knowledge proof system to combine both properties efficiently, and is widely regarded as a scientific breakthrough. Zcash's Orchard shielded pool, activated with Network Upgrade 5 (NU5), uses the Halo 2 proving system.

![Halo overview](https://electriccoin.co/wp-content/uploads/2021/01/Halo-on-Z-1440x720.png "Halo overview")

## TL;DR

- Halo removes the **trusted setup** that earlier Zcash proving systems (Sprout, Sapling) required.
- It enables **recursive proofs**: one proof can verify the correctness of many other proofs.
- **Halo 2** is the production implementation, written in Rust, used by the Orchard shielded pool since NU5.
- Removing the trusted setup means protocol upgrades no longer need a new multi-party ceremony.
- The same research has influenced Ethereum, Filecoin, and many zkRollup projects.

---

## Core Explanation

Zcash uses zero-knowledge proofs so that shielded transactions prove they are valid without revealing sender, receiver, or amount on the public blockchain. Earlier Zcash proof systems (Sprout used BCTV14; Sapling used Groth16) were secure and efficient, but they depended on a **trusted setup ceremony** to generate the public proving and verifying parameters.

In a trusted setup, participants jointly generate secret randomness. If any secret material — often called "toxic waste" — is not destroyed, a dishonest party could potentially create fake proofs and inflate the shielded supply. Zcash greatly reduced this risk through elaborate multi-party computation ceremonies, but users still needed confidence that at least one participant destroyed their share.

**Halo removes that recurring ceremony requirement entirely.** Instead of relying on a fixed common reference string tied to a specific circuit, Halo uses polynomial commitments and a recursive technique called nested amortization. Proofs can reason about earlier proofs, so a verifier can check the latest accumulator state and gain confidence in the whole chain of prior work — with no toxic waste and no trust in any setup participants.

The practical benefit for Zcash:

- Protocol upgrades can change the proof system without running a new trusted setup for each change.
- Users have stronger trust assumptions: there is no ceremony whose integrity they must rely on.
- Recursive composition opens a path to compressing large amounts of shielded computation into smaller verification objects.

---

## Deep Dive

### No Trusted Setup

Traditional zk-SNARK systems require public parameters generated in advance. Those parameters are tied to specific circuits, and any secret randomness left over from their generation creates systemic risk. Zcash and other projects used [trusted setup ceremonies](https://zkproof.org/2021/06/30/setup-ceremonies/amp/) to reduce risk, but a residual trust assumption remained.

Halo avoids this by using two key primitives:

**Succinct polynomial commitment scheme.** A prover commits to a polynomial with a short string. A verifier can later check claimed evaluations of that polynomial without seeing the full computation. This commitment scheme is based on an inner product argument, not on a trusted setup.

**Polynomial interactive oracle proof.** The verifier asks the prover to open commitments at chosen evaluation points, then checks that the expected identities hold between the openings.

By **repeatedly collapsing multiple hard-problem instances together over cycles of elliptic curves** (nested amortization), the system lets proofs reason about earlier proofs without ever needing secret setup material.

Halo gives Zcash users two concrete assurances:
1. No participant in any prior Zcash ceremony can use hidden toxic waste to forge proofs in the Halo-based system.
2. Future protocol upgrades do not require a new trusted setup ceremony.

[Sean Bowe's explainer on Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

---

### Recursive Proofs

Recursive proof composition allows one proof to attest to the correctness of many other proofs. A large amount of computation can be compressed into a single verification step that remains fast to check.

The [Halo paper](https://eprint.iacr.org/2019/1021.pdf) describes an aggregation technique in the polynomial commitment scheme: many independently created proofs can be verified almost as quickly as a single proof. Before Halo, recursive composition typically required a trusted setup or significant proving overhead. Nested amortization made it practical without either.

For Zcash, recursion creates the foundation for:

- **Horizontal scaling** while preserving confidence in the rest of the network.
- **Compression** of large batches of shielded computation.
- **Future shielded assets and smart contracts** that reason about their own state efficiently.

---

### Halo 2 and the Orchard Pool

Halo 2 is a high-performance zk-SNARK implementation in Rust that generalizes the original Halo approach. It introduced the **accumulation scheme**: proofs are added to an accumulator object, and each new proof reasons about the previous accumulator state. Checking the current accumulator gives confidence in all earlier linked proofs by induction.

<a href="">
    <img src="https://electriccoin.co/wp-content/uploads/2020/09/Halo-puzzle-03-1024x517.jpg" alt="Halo 2 puzzle illustration" width="500" height="300"/>
</a>

Halo 2 also adopts improvements from the broader ZKP research community. In parallel with Halo's development, other teams discovered more efficient polynomial IOPs such as Marlin and PLONK. The most efficient, PLONK, provides flexibility for application-specific circuit design and roughly 5× better prover time compared with Sonic (used in Halo 1).

**The Orchard shielded pool**, activated with NU5 in May 2022, is Zcash's first production deployment of Halo 2. Orchard uses Unified Addresses (starting with `u1`) and handles the full proving and verification flow through Halo 2. Migration from older pools (Sprout, Sapling) to Orchard is encouraged over time to concentrate shielded value in the fully trustless pool.

<a href="">
    <img src="https://i.imgur.com/l4HrYgE.png" alt="Halo 2 accumulation scheme diagram" width="500" height="300"/>
</a>

---

### Halo in the Wider Ecosystem

ECC has entered into research agreements with Protocol Labs, the Filecoin Foundation, and the Ethereum Foundation to explore Halo R&D across ecosystems. Halo 2 is released under the **MIT and Apache 2.0 open-source licenses**, so any project can build with the proving system.

**Filecoin** — Halo 2's aggregation technique compresses costly proofs of spacetime and proofs of replication, scaling the network more efficiently. [ECC × Filecoin blog post](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

**Ethereum** — The Privacy and Scaling Explorations group (applied ZKP research under the Ethereum Foundation) researches how Halo 2 proofs can improve privacy and scalability in Ethereum, including potential use in a Verifiable Delay Function for randomness and Proof-of-Stake leader election.

**Other projects using Halo 2:**

- [Anoma](https://anoma.net/blog/an-introduction-to-zk-snark-plonkup) — privacy-preserving multichain atomic swap protocol
- [Orbis](https://docs.orbisprotocol.com/orbis/technology/halo-2) — L2 zkRollup on Cardano
- [DarkFi](https://darkrenaissance.github.io/darkfi/architecture/architecture.html) — private L1 zkEVM blockchain
- [Scroll](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k) — L2 zkRollup on Ethereum

---

## Related Pages

- [zk-SNARKs](/zcash-tech/zk-snarks) — The zero-knowledge proof system background
- [Shielded Pools](/using-zcash/shielded-pools) — Sprout, Sapling, and Orchard
- [Viewing Keys](/zcash-tech/viewing-keys) — Selective disclosure without losing privacy
- [FROST](/zcash-tech/frost) — Threshold signatures for shared custody
- [Post-Quantum Security](/zcash-tech/post-quantum-security) — How Zcash prepares for quantum computing
- [Developer Resources](/start-here/developer-resources) — Halo 2 library and SDKs

## Resources

- [Halo paper (eprint)](https://eprint.iacr.org/2019/1021.pdf)
- [Halo 2 GitHub](https://github.com/zcash/halo2)
- [Halo 2 docs](https://zcash.github.io/halo2/)
- [Halo 2 awesome list](https://github.com/adria0/awesome-halo2)
- [Technical explainer blog — ECC](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Sean Bowe's explainer — Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)
- [Intro to ZKP and Halo 2 — Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2 with Daira & Str4d — ZKPodcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [Halo 2 Community Showcase — Ying Tong, Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)
