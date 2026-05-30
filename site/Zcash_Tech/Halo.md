# Halo

## TL;DR

Halo is a trustless, recursive Zero-Knowledge Proof (ZKP) authored by Sean Bowe, Jack Grigg, and Daira Hopwood at Electric Coin Company. It eliminates the trusted setup and allows greater scalability of the Zcash blockchain. Halo was the first zero-knowledge proof system that was both efficient and recursive, widely regarded as a scientific breakthrough. Halo 2, its production implementation, powers the Orchard shielded pool activated with NU5 in 2022.

## Core Explanation

### What is Halo?

Halo is a trustless, recursive Zero-Knowledge Proof (ZKP) authored by Sean Bowe, Jack Grigg, and Daira Hopwood at Electric Coin Company. It eliminates the trusted setup and allows greater scalability of the Zcash blockchain. Halo was the first zero-knowledge proof system that was both efficient & recursive, widely regarded as a scientific breakthrough.

![Halo](https://electriccoin.co/wp-content/uploads/2024/03/Halo-on-Z-EX.png)

**Components**

Succinct Polynomial Commitment Scheme: Allows a committer to commit to a polynomial with a short string that a verifier can use to confirm claimed evaluations of the committed polynomial.

Polynomial Interactive Oracle Proof: A verifier asks a prover (algorithm) to open all commitments at various points of the prover's choice using a polynomial commitment scheme & checks whether the identities match them.

### No Trusted Setup

zkSNARKs rely on a Common Reference String (CRS) as a public parameter for proving & verifying. This CRS must be generated in advance by a trusted party. Until recently, elaborate secure Multi-Party Computations (MPCs), as those performed by the Aztec & Zcash networks, were necessary to mitigate the risks involved in this [trusted setup ceremony](https://zkproof.org/2021/06/30/setup-ceremonies/amp/)

Previously, Zcash’s Sprout & Sapling shielded pools utilized the BCTV14 & Groth16 zk-proving systems. While these were secure, there were limitations. They were not scalable because they were tied to a single application; the “toxic waste” (remnants of cryptographic data generated during the genesis ceremony) could persist; and there was an element of trust (albeit minimal) required for users to deem the ceremony acceptable.

By repeatedly collapsing multiple instances of complex tasks together over cycles of elliptic curves, so that users can use computational proofs to reason about themselves efficiently (Nested Amortization), the need for a trusted setup is eliminated. This also means that the structured reference string (an output from a ceremony) is upgradeable, enabling applications such as smart contracts.

Halo provides users with two important assurances regarding the security of the large-scale zero-knowledge proof system. Firstly, it enables users to prove that no one who was involved in the genesis ceremony has created a secret backdoor to execute fraudulent transactions. Secondly, it allows users to demonstrate that the system has remained secure over time, even as it has undergone updates and changes.

[Sean Bowe's Explainer on Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

### Recursive Proofs

Recursive proof composition allows a single proof to attest to the correctness of practically an unlimited number of other proofs, thereby compressing a large amount of computation (and information). This is an essential component for scalability, not least because it allows us to scale the network horizontally while still allowing multiple participants to trust the integrity of the remainder of the network.

Before Halo, achieving recursive proof composition required large computational expense and a trusted setup. One of the main discoveries was a technique called nested amortization. This technique allows recursive composition using a polynomial commitment scheme based on the inner-product argument, massively improving performance while avoiding a trusted setup.

In the [Halo paper](https://eprint.iacr.org/2019/1021.pdf), the authors fully described this polynomial commitment scheme and discovered a new aggregation technique. The technique allows a large number of independently created proofs to be verified nearly as quickly as verifying a single proof. This alone would offer a better alternative to the earlier zk-SNARKs used in Zcash.

## Visual / Analogy

A trusted setup is like a vault that needs a master key to be built. Every participant in the ceremony holds a shard of this key and must destroy it once the vault is sealed. If at least one shard survives, the vault can be opened by a counterfeiter. Halo is a vault built without a master key in the first place: nothing has to be destroyed because nothing was ever generated.

Recursion adds a second image. Imagine a stack of receipts in which each new receipt certifies that all previous receipts in the stack are valid. Instead of carrying the whole stack to verify your purchase, you only need the top receipt. Halo lets a single short proof serve as the top receipt for a chain of computations.

## Deep Dive

### Halo 2

Halo 2 is a high-performance zk-SNARK implementation written in Rust that eliminates the need for a trusted setup and sets the stage for scalability in Zcash.

![Halo 2 puzzle](https://electriccoin.co/wp-content/uploads/2020/09/Halo-puzzle-03-1024x517.jpg)

It includes a generalization of the original approach called an accumulation scheme. This new formalization reveals how the nested amortization technique actually works: by adding proofs to an object called an accumulator, where the proofs reason about the accumulator's previous state, it can be verified that all previous proofs were correct (by induction) simply by checking the accumulator's current state.

![Accumulator scheme](https://i.imgur.com/l4HrYgE.png)

In parallel, many other teams were discovering new Polynomial IOPs that were more efficient than Sonic (used in Halo 1), such as Marlin.

The most efficient of these new protocols is PLONK, which offers enormous flexibility for designing efficient implementations tailored to application-specific needs and provides 5x better prover time than Sonic.

[Overview of PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)

### How does this benefit Zcash?

The Orchard Shielded pool is activated with NU5 & is the implementation of this new proof system on the Zcash Network. Guarded by the same turnstile design as used between Sprout and Sapling, with the intent to phase out the older shielded pools gradually. This encourages migration to a fully trustless proof system, reinforcing confidence in the soundness of the monetary base, and reducing the implementation complexity and the surface of the Zcash attack overall. Following the activation of NU5 in May 2022, recursive proofs became possible (albeit incomplete). Several privacy enhancements were also made in a tangential manner. The introduction of ‘Actions’ to replace inputs/outputs helped reduce the amount of transaction metadata.

Trusted setups are generally difficult to coordinate & present a systemic risk. They must be repeated for each major protocol upgrade. Their removal represents a substantial improvement in the safe implementation of new protocol upgrades.

The recursive proof composition has the potential to compress unlimited amounts of computation by creating auditable distributed systems, making Zcash particularly well-suited for the shift to Proof of Stake. This is also useful for extensions such as Zcash Shielded Assets and improving Layer 1 capacity at the higher end of full node usage in the coming years for Zcash.

## Practical Implications

### Halo in the wider ecosystem

The Electric Coin Company has agreed with Protocol Labs, the Filecoin Foundation, and the Ethereum Foundation to explore Halo R&D, including how the technology might be used in their respective networks. The agreement aims to provide better scalability, interoperability, and privacy across ecosystems and for Web 3.0.

Additionally, Halo 2 is under the [MIT and Apache 2.0 open-source licenses](https://github.com/zcash/halo2#readme), which means that any participant of the ecosystem can build using the proving system.

### Filecoin

Since its implementation, the Halo2 library has been adopted in projects such as the zkEVM, suggesting a potential integration of Halo2 into the proof system for the Filecoin Virtual Machine. Filecoin requires numerous costly proofs of spacetime/proofs of replication. Halo2 will be pivotal in compressing space usage and improving network scaling.

[Filecoin Foundation video with Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw)

Additionally, it would be highly beneficial to both the Filecoin and Zcash ecosystems if Filecoin storage payments could be made in ZEC, ensuring the same level of privacy for storage purchases as in Zcash shielded transfers. This support would enable encrypting files in Filecoin storage and add support for mobile clients so they can attach media or files to a Zcash-encrypted memo.

[ECC x Filecoin Blog Post](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Ethereum

A Halo 2 proof for an efficient Verifiable Delay Function (VDF) is being developed. The VDF is a cryptographic primitive that has many potential use cases.

It can be used as a source of general-purpose randomness, including in smart contract applications and for leader election in Proof of Stake on Ethereum & other protocols.

ECC, the Filecoin Foundation, Protocol Labs, and the Ethereum Foundation will also be working with [SupraNational](https://www.supranational.net/), a vendor specializing in hardware-accelerated cryptography, for potential GPU and ASIC design and VDF development.

[Privacy and Scaling Exploration group](https://appliedzkp.org/) is also researching ways Halo 2 proofs can improve privacy and scalability for the Ethereum ecosystem. This group rolls up to the Ethereum foundation~~,~~ and has a broad focus on zero-knowledge proofs and cryptographic primitives.

### Other projects using Halo

* [Anoma, a privacy preserving multichain atomic swap protocol](https://anoma.net/blog/hash-functions-in-plonkup)
* [Orbis, an L2 zkRollup on Cardano](https://docs.orbisprotocol.com/orbis/technology/halo-2)
* [Darkfi, a private L1 zkEVM blockchain](https://github.com/darkrenaissance)
* [Scroll, an L2 zkRollup on Ethereum](https://paragraph.com/@scroll-2/an-overview-of-scroll-s-architecture)

## Common Mistakes

Confusing Halo with Halo 2. Halo (Halo 1) is the original 2019 research paper and prototype. Halo 2 is the production implementation deployed on Zcash. When people say “Halo on Zcash,” they almost always mean Halo 2.

Assuming all of Zcash uses Halo. Only the Orchard shielded pool uses Halo 2. The Sapling pool still uses Groth16, and Sprout uses Groth16. Funds in older pools do not retroactively gain Halo’s trustless setup.

Treating “no trusted setup” as a marketing slogan. This is a particular cryptographic property: the security of Orchard does not depend on any prior ceremony having destroyed its secret material. This is a stronger guarantee than “the ceremony was done carefully.”

## Related Pages

* [Orchard Shielded Pool](https://zechub.wiki/using-zcash/shielded-pools)
* [Network Upgrade 5 (NU5)](https://zechub.wiki/start-here/network-upgrades)
* [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks)
* [Sapling](https://zechub.wiki/using-zcash/shielded-pools)
* [Sprout](https://zechub.wiki/using-zcash/shielded-pools)
* [Unified Addresses](https://zechub.wiki/using-zcash/shielded-pools)

## Further Learning

* [An introduction to zkp and halo 2 - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)

* [Halo 2 with Daira & Str4d - ZKPodcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)

* [Technical Explainer Blog](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)

* [Halo 2 Community Showcase - Ying Tong @Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

## Documentation

* [Halo 2 resources](https://github.com/adria0/awesome-halo2)

* [Halo 2 docs](https://zcash.github.io/halo2/)

* [Halo 2 Github](https://github.com/zcash/halo2)
