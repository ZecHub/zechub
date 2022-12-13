# Halo


## What is Halo?

Halo is a trustless, recursive zero-knowledge proof (ZKP) discovered by Sean Bowe at Electric Coin Co. It eliminates the trusted setup and allows greater scalability of the Zcash blockchain. Halo was the first zero-knowledge proof system that is both efficient & recursive widely regarded as a huge scientific breakthrough.


### No Trusted Setup

Previously Zcash's Sprout & Sapling shielded pools utilised the BCTV14 & Groth 16 zk-proving systems. While these were secure there were limitations. The systems were not scalable as they were tied to a single application, "toxic waste" the remnants from cryptographic material generated during a genesis ceremony could exist and there was an element of trust required by users for this ceremony to be deemed acceptable.

Halo allows a user to both prove that no one involved in the initial establishment of the large-scale zero-knowledge proof system has created a secret backdoor with which to execute fraudulent transactions and that the secure state has existed over the course of updates and changes to the system. 

Nested amortization — repeatedly collapsing multiple instances of hard problems together over cycles of elliptic curves so that computational proofs can be used to reason about themselves efficiently, which eliminates the need for a trusted setup. This also means that the stuctured reference string (output from ceremony) is upgradeable enabling applications such as smart contracts to be built.

[Sean Bowes Explainer on Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo) 

Until recently the risk during setup meant that zero knowledge proofs often required elaborate secure multi-party computations such as those seen in the Aztec protocol & Zcash ceremonies to instill confidence in the network. 


### Recursive Proofs

Recursive proof composition allows a single proof to attest to the correctness of practically unlimited other proofs, allowing a large amount of computation (and information) to be compressed. This is an essential component for scalablilty, not least because it allows us to horizontally scale the network while still allowing pockets of participants to trust the integrity of the remainder of the network.

Prior to Halo, achieving recursive proof composition required large computational expense and a trusted setup. One of the main discoveries was a technique called “nested amortization,”. This technique allows for recursive composition using the polynomial commitment scheme based on inner product argument, massively improving on performance and avoiding the trusted setup.

[image]

In the [Halo paper](https://eprint.iacr.org/2019/1021.pdf), we fully described this polynomial commitment scheme and discovered a new aggregation technique existed in it. The technique allows a large number of independently created proofs to be verified nearly as quickly as verifying a single proof. This alone would offer a better alternative to the earlier zk-SNARKs used in Zcash.


### Halo 2

Halo 2, is a high-performance zk-SNARK implementation written in Rust which eliminates the need for a trusted setup while setting the stage for scalability in Zcash. 

[image]

It includes a generalization of our approach called an “accumulation scheme”. This new formalization exposes how our nested amortization technique actually works; by adding proofs to an object called an “accumulator,” where the proofs reason about the previous state of the accumulator, we can check that all previous proofs were correct (by induction) simply by checking the current state of the accumulator.

In parallel, many other teams were discovering new Polynomial IOPs that were more efficient than Sonic (used in Halo 1), such as Marlin. 

The most efficient of these new protocols is PLONK, which grants enormous flexibility in designing efficient implementations based on application-specific needs and providing 5x better prover time from Sonic.

[Overview of PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)


### How does this benefit Zcash?

The Orchard Shielded pool activated with NU5 is the implementation of this new proof system on the Zcash Network. Guarded by the same turnstile design as used between Sprout and Sapling with the intent to gradually retire the older shielded pools. This encourages migration to a fully trustless proof system, reinforcing confidence in the soundness of the monetary base, and reducing the implementation complexity and attack surface of Zcash overall.

Trusted setups are generally difficult to coordinate & presented a systemic risk. It would be necessary to repeat them for each major protocol upgrade. Removing them presents a substantial improvement for safely implementing new protocol upgrades. 

Recursive proof composition holds the potential for compressing unlimited amounts of computation, creating auditable distributed systems, making Zcash a highly scalable blockchains and protecting user privacy. The concept is a proof that verifies the correctness of another instance of itself, allowing any amount of computational effort and data to produce a short proof that can be checked quickly. This Nested proof composition is an essential technique for enabling flexibility for extensions such as Zcash Shielded Assets and improving Layer 1 scalability for Zcash.


## Halo in the wider ecosystem 

The Electric Coin Company has entered into an agreement with Protocol Labs, the Filecoin Foundation, and the Ethereum Foundation to explore Halo R&D, including how the technology might be used in their respective networks. The agreement aims to provide better scalability, interoperability and privacy across ecosystems and for Web 3.0.

### Filecoin

Since its deployment, the halo2 library has been adopted in projects like the zkEVM, there is potential integration of Halo 2 into the proof system for the Filcoin Virtual Machine. Filecoin requires numerous costly proofs of spacetime / proofs of replication. Halo2 will be pivotal in compressing the space usage, better scaling the network.

[Filecoin Foundation video with Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw)

Additionally, it would be highly beneficial to both the Filecoin and Zcash ecosystems if Filecoin storage payments could be made in ZEC, affording the same level of privacy for storage purchases that exists in Zcash shielded transfers. This support would add the ability to encrypt files in Filecoin storage and add support to mobile clients so that they could “attach” media or files to a Zcash encrypted memo. 

[ECC x Filecoin Blog Post](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Ethereum

Implementation of a Halo 2 proof for the efficient Verifiable Delay Function (VDF) being developed. A VDF is a cryptographic primitive that has many potential use cases. 

It can be used as a source of general purpose randomness including use in smart contract applications as well as leader election in Proof of Stake on Ethereum & other protocols.

ECC, the Filecoin Foundation, Protocol Labs, and the Ethereum Foundation will also be working with [SupraNational](https://www.supranational.net/), a vendor specializing in hardware-accelerated cryptography, for potential GPU and ASIC design and development of the VDF.


## Other projects using Halo

+ [Anoma, a privacy preserving multichain atomic swap protocol](https://anoma.net/blog/an-introduction-to-zk-snark-plonkup)

+ [Oribis, an L2 zkRollup on Cardano](https://docs.orbisprotocol.com/orbis/technology/halo-2)

+ [Darkfi, a private L1 zkEVM blockchain](https://darkrenaissance.github.io/darkfi/architecture/architecture.html)

+ [Scroll, an L2 zkRollup on Ethereum](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k)


**Further Learning**:

[An introduction to zkp and halo 2 - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)

[Halo 2 with Daira & Str4d - ZKPodcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)

[Technical Explainer Blog](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)

[Halo 2 Community Showcase - Ying Tong @Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)