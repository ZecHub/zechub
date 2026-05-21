<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo

Halo is a trustless, recursive zero-knowledge proof system discovered by Sean Bowe at Electric Coin Co. It removed the need for a trusted setup and made recursive proof composition practical enough to become part of Zcash's long-term scalability and privacy roadmap. Halo was widely regarded as a scientific breakthrough because it was the first zero-knowledge proof system to combine efficient recursion with no trusted setup.

![halo](https://electriccoin.co/wp-content/uploads/2021/01/Halo-on-Z-1440x720.png "halo")

## TL;DR

- Halo is a zero-knowledge proof breakthrough that lets proofs verify other proofs efficiently.
- It eliminates the trusted setup requirement used by earlier Zcash shielded pools such as Sprout and Sapling.
- Recursive proofs make it possible to compress large amounts of computation into a small proof.
- Halo 2 is the Rust implementation and proving system used by Zcash Orchard, which activated with Network Upgrade 5 (NU5) in 2022.
- The same research has influenced Filecoin, Ethereum research, zkRollups, and other zero-knowledge systems.

## Core Explanation

Zcash uses zero-knowledge proofs so that shielded transactions can prove they are valid without revealing sender, receiver, amount, or note details to the public blockchain. Earlier Zcash proof systems were secure, but they depended on setup ceremonies that produced public proving and verification parameters.

Halo changed that design. Instead of relying on a trusted setup for each application, Halo uses recursive proof composition and polynomial commitment techniques to let proofs reason about earlier proofs. This means a verifier can check the latest proof or accumulator state and gain confidence that all previous linked proofs were valid.

The practical result for Zcash is simpler trust assumptions, stronger long-term upgradeability, and a foundation for scaling shielded computation beyond one-off transaction proofs.

### Key Components

**Succinct polynomial commitment scheme.** A prover commits to a polynomial with a short value. Later, a verifier can check claimed evaluations of that committed polynomial without seeing every detail of the original computation.

**Polynomial interactive oracle proof.** The verifier asks the prover to open commitments at selected points, then checks that the expected identities hold between those openings.

**Nested amortization.** Halo repeatedly collapses multiple instances of hard problems together over cycles of elliptic curves. In plain terms, it lets proof work be folded into smaller objects that can themselves be checked by later proofs.

**Accumulation scheme.** Halo 2 generalizes the recursive approach by adding proofs to an accumulator. Each new proof reasons about the previous accumulator state, so checking the current accumulator gives confidence in the whole chain of earlier proofs.

## No Trusted Setup

Traditional zk-SNARK systems rely on a common reference string (CRS) as a public proving and verification parameter. That CRS must be generated in advance. If secret randomness from the ceremony, often called "toxic waste," were retained by a malicious participant, it could create systemic risk.

Zcash's Sprout and Sapling shielded pools used BCTV14 and Groth16 proof systems. These systems were secured through elaborate multi-party computation ceremonies, similar to ceremonies used by other projects such as Aztec and Zcash itself. Those ceremonies greatly reduce trust, but users still need confidence that at least one participant destroyed their secret material. For background, see this overview of [trusted setup ceremonies](https://zkproof.org/2021/06/30/setup-ceremonies/amp/).

Halo removes that recurring ceremony requirement. This matters because:

- protocol upgrades no longer need a new trusted setup ceremony for each major proof-system change;
- applications can be upgraded more safely because the structured reference string is not tied to one fixed circuit;
- users gain stronger assurance that no ceremony participant can use leftover toxic waste to create fraudulent shielded value.

[Sean Bowe's explainer on Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo) is a useful non-paper introduction to the trust model.

## Recursive Proofs

Recursive proof composition allows one proof to attest to the correctness of other proofs. Instead of every participant independently rechecking a long sequence of computations, the system can compress that history into a proof or accumulator that is much cheaper to verify.

For Zcash, recursion is important because it opens the door to:

- horizontal scaling while preserving confidence in the rest of the network;
- compression of large batches of shielded computation;
- future distributed systems where the integrity of many proofs can be checked through a smaller verification object;
- higher Layer 1 capacity for full-node users at the upper end of network usage.

Before Halo, recursive proof composition usually required high computational expense and a trusted setup. Halo's nested amortization technique made recursion more practical by using an inner-product-argument-based polynomial commitment scheme. The [Halo paper](https://eprint.iacr.org/2019/1021.pdf) describes the commitment scheme and the aggregation technique that allows many independently created proofs to be verified nearly as quickly as one proof.

## Halo 2 and Orchard

Halo 2 is a high-performance zk-SNARK implementation written in Rust. It eliminates trusted setup requirements while preparing Zcash for future scaling work.

<a href="">
    <img src="https://electriccoin.co/wp-content/uploads/2020/09/Halo-puzzle-03-1024x517.jpg" alt="Halo puzzle illustration" width="500" height="300"/>
</a>

Halo 2 introduced an accumulation-scheme framing for nested amortization. Proofs are added to an accumulator, and later proofs reason about the accumulator's previous state. By induction, checking the current state establishes that the earlier proof chain was correct.

<a href="">
    <img src="https://i.imgur.com/l4HrYgE.png" alt="Halo 2 accumulator diagram" width="500" height="300"/>
</a>

Halo 2 also benefited from advances in polynomial IOPs. As teams discovered protocols more efficient than Sonic, such as Marlin, PLONK became especially important because it gives developers flexible ways to design efficient application-specific implementations and can provide about 5x better prover time than Sonic in the relevant benchmark context. See this [overview of PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ) for more context.

Zcash's Orchard shielded pool, activated with NU5 in mid-2022, is the Zcash Network implementation built on this proof-system direction. Orchard uses a turnstile-style migration design similar to the Sprout-to-Sapling transition, encouraging funds to move toward the newer trustless pool while older pools can be retired over time.

Orchard also introduced "Actions" as a replacement for the older input/output framing. Actions reduce transaction metadata and support the privacy improvements that came with the new pool.

## Practical Implications

**Stronger monetary soundness.** Removing trusted setup reduces the risk that hidden ceremony material could ever be used to create counterfeit shielded value.

**Cleaner protocol upgrades.** Future upgrades do not need to coordinate a new ceremony every time a major proof-system change is introduced.

**Lower long-term attack surface.** Retiring older shielded pools and consolidating around newer proof systems reduces implementation complexity.

**Better scalability path.** Recursive proofs can compress very large amounts of computation. This is useful for Zcash scalability, Proof of Stake research, Zcash Shielded Assets, and other future extensions.

## Common Mistakes

**Thinking Halo is only an optimization.** Halo is not just a faster proof system. Its main breakthrough is eliminating trusted setup while making recursive proof composition practical.

**Assuming Orchard and Sapling share the same trust model.** Sapling remains important, but it used a trusted setup. Orchard uses the Halo 2 proof system and removes that ceremony requirement.

**Confusing Halo 1, Halo 2, and Orchard.** Halo is the original proof-system breakthrough. Halo 2 is the Rust implementation and proof-system framework. Orchard is the Zcash shielded pool that uses this technology.

**Treating recursion as already fully deployed everywhere in Zcash.** NU5 made recursive-proof integration possible, but broader recursive scaling work is still an ongoing area of development.

## Halo in the Wider Ecosystem

Electric Coin Co. entered into an agreement with Protocol Labs, the Filecoin Foundation, and the Ethereum Foundation to explore Halo research and development. The shared goal was to investigate how Halo-style technology could improve scalability, interoperability, and privacy across Web3 systems.

Halo 2 is available under the [MIT and Apache 2.0 open-source licenses](https://github.com/zcash/halo2#readme), so projects outside Zcash can build with the proving system.

### Filecoin

The halo2 library has been adopted in projects such as zkEVM work, and there has been potential integration of Halo 2 into proof systems for the Filecoin Virtual Machine. Filecoin uses many costly proofs of spacetime and proofs of replication, so proof compression can help the network scale.

- [Filecoin Foundation video with Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw)
- [ECC x Filecoin blog post](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

Zcash and Filecoin could also benefit from private storage payments. If Filecoin storage purchases could be paid in ZEC, users could retain shielded-payment privacy while paying for encrypted file storage and attaching media or files to Zcash encrypted memos.

### Ethereum

Halo 2 research has also been explored for efficient verifiable delay functions (VDFs). A VDF is a cryptographic primitive that can provide general-purpose randomness for applications such as smart contracts and Proof of Stake leader election.

ECC, the Filecoin Foundation, Protocol Labs, and the Ethereum Foundation have worked with [Supranational](https://www.supranational.net/), a vendor focused on hardware-accelerated cryptography, for potential GPU and ASIC VDF design and development.

The [Privacy and Scaling Exploration group](https://appliedzkp.org/) also researches ways Halo 2 proofs can improve privacy and scalability in the Ethereum ecosystem. The group rolls up to the Ethereum Foundation and focuses broadly on zero-knowledge proofs and cryptographic primitives.

### Other Projects Using Halo

- [Anoma, a privacy-preserving multichain atomic swap protocol](https://anoma.net/blog/an-introduction-to-zk-snark-plonkup)
- [Orbis, an L2 zkRollup on Cardano](https://docs.orbisprotocol.com/orbis/technology/halo-2)
- [DarkFi, a private L1 zkEVM blockchain](https://darkrenaissance.github.io/darkfi/architecture/architecture.html)
- [Scroll, an L2 zkRollup on Ethereum](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k)

## Related Pages

- [zk-SNARKS](/site/Zcash_Tech/zk_SNARKS)
- [Shielded Pools](/site/Using_Zcash/Shielded_Pools)
- [Zcash Shielded Assets](/site/Zcash_Tech/Zcash_Shielded_Assets)
- [What is ZEC and Zcash?](/site/Start_Here/What_is_ZEC_and_Zcash)
- [Dash Integration of Zcash Orchard](/site/Research/Dash_Zcash_Orchard_Integration)

## Resources

### Further Learning

- [An introduction to ZKP and Halo 2 - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2 with Daira and Str4d - ZKPodcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [Technical explainer blog](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Halo 2 Community Showcase - Ying Tong at Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

### Documentation

- [Halo 2 resources](https://github.com/adria0/awesome-halo2)
- [Halo 2 docs](https://zcash.github.io/halo2/)
- [Halo 2 GitHub](https://github.com/zcash/halo2)
