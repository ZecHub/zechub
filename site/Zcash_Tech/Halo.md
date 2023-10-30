# Halo


## What is Halo?

Halo is a trustless, recursive zero-knowledge proof (ZKP) discovered by Sean Bowe at Electric Coin Co. It eliminates the trusted setup and allows greater scalability of the Zcash blockchain. Halo was the first zero-knowledge proof system that is both efficient & recursive widely regarded as a scientific breakthrough.

![halo](https://electriccoin.co/wp-content/uploads/2021/01/Halo-on-Z-1440x720.png "halo")


**Components**

Succinct Polynomial Commitment Scheme: Allows a committer to commit to a polynomial with a short string that can be used by a verifier to confirm claimed evaluations of the committed polynomial.

Polynomial Interactive Oracle Proof: Verifier asks prover (algorithm) to open all commitments at various points of their choosing using polynomial commitment scheme & checks identity holds true between them. 


### No Trusted Setup

zkSNARKs rely on a common reference string (CRS) as a public parameter for proving & verifying. This CRS must be generated in advance by a trusted party. Until recently, elaborate secure multi-party computations (MPC) as those performed by Aztec network & Zcash were necesarry to mitigate the risk involved during this [trusted setup ceremony](https://zkproof.org/2021/06/30/setup-ceremonies/amp/). 

Previously Zcash's Sprout & Sapling shielded pools utilised the BCTV14 & Groth 16 zk-proving systems. While these were secure there were limitations. They were not scalable as they were tied to a single application, the "toxic waste" (remnants from cryptographic material generated during the genesis ceremony) could persist, and there was an element of trust (albeit minute) for users to deem the ceremony acceptable.

By repeatedly collapsing multiple instances of hard problems together over cycles of elliptic curves so that computational proofs can be used to reason about themselves efficiently (Nested amortization) the need for a trusted setup is eliminated. This also means that the stuctured reference string (output from ceremony) is upgradeable enabling applications such as smart contracts.

Halo provides users with two important assurances regarding the security of the large-scale zero-knowledge proof system. Firstly, it enables users to prove that no one who was involved in the genesis ceremony has created a secret backdoor to execute fraudulent transactions. Secondly, it allows users to demonstrate that the system has remained secure over time, even as it has undergone updates and changes.

[Sean Bowes Explainer on Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo) 
 


### Recursive Proofs

Recursive proof composition allows a single proof to attest to the correctness of practically unlimited other proofs, allowing a large amount of computation (and information) to be compressed. This is an essential component for scalablilty, not least because it allows us to horizontally scale the network while still allowing pockets of participants to trust the integrity of the remainder of the network.

Prior to Halo, achieving recursive proof composition required large computational expense and a trusted setup. One of the main discoveries was a technique called “nested amortization,”. This technique allows for recursive composition using the polynomial commitment scheme based on inner product argument, massively improving on performance and avoiding the trusted setup.

In the [Halo paper](https://eprint.iacr.org/2019/1021.pdf), we fully described this polynomial commitment scheme and discovered a new aggregation technique existed in it. The technique allows a large number of independently created proofs to be verified nearly as quickly as verifying a single proof. This alone would offer a better alternative to the earlier zk-SNARKs used in Zcash.


### Halo 2

Halo 2, is a high-performance zk-SNARK implementation written in Rust which eliminates the need for a trusted setup while setting the stage for scalability in Zcash. 

![halo2image](https://electriccoin.co/wp-content/uploads/2020/09/Halo-puzzle-03-1024x517.jpg "halo2")

It includes a generalization of our approach called an “accumulation scheme”. This new formalization exposes how our nested amortization technique actually works; by adding proofs to an object called an “accumulator,” where the proofs reason about the previous state of the accumulator, we can check that all previous proofs were correct (by induction) simply by checking the current state of the accumulator.

![Accumulatorimage](https://i.imgur.com/l4HrYgE.png "accumulator")

In parallel, many other teams were discovering new Polynomial IOPs that were more efficient than Sonic (used in Halo 1), such as Marlin. 

The most efficient of these new protocols is PLONK, which grants enormous flexibility in designing efficient implementations based on application-specific needs and providing 5x better prover time from Sonic.

[Overview of PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)


### How does this benefit Zcash?

The Orchard Shielded pool activated with NU5 & is the implementation of this new proof system on the Zcash Network. Guarded by the same turnstile design as used between Sprout and Sapling with the intent to gradually retire the older shielded pools. This encourages migration to a fully trustless proof system, reinforcing confidence in the soundness of the monetary base, and reducing the implementation complexity and attack surface of Zcash overall. Following the activation of NU5 mid 2022, integration of recursive proofs became possible (although this is not complete). Several privacy enhancements were also made tangentially. The introduction of 'Actions' to replace inputs/outputs helped reducing the amount of transaction metadata. 

Trusted setups are generally difficult to coordinate & presented a systemic risk. It would be necessary to repeat them for each major protocol upgrade. Removing them presents a substantial improvement for safely implementing new protocol upgrades. 

Recursive proof composition holds the potential for compressing unlimited amounts of computation, creating auditable distributed systems, making Zcash highly capable particularly with the shift to Proof of Stake. This is also useful for extensions such as Zcash Shielded Assets and improving Layer 1 capacity at the higher end of full node usage in the coming years for Zcash.


## Halo in the wider ecosystem 

The Electric Coin Company has entered into an agreement with Protocol Labs, the Filecoin Foundation, and the Ethereum Foundation to explore Halo R&D, including how the technology might be used in their respective networks. The agreement aims to provide better scalability, interoperability and privacy across ecosystems and for Web 3.0.

Additionally, Halo 2 is under the [MIT and Apache 2.0 open-source licenses](https://github.com/zcash/halo2#readme), meaning anyone in the ecosystem can build with the proving system.

### Filecoin

Since its deployment, the halo2 library has been adopted in projects like the zkEVM, there is potential integration of Halo 2 into the proof system for the Filecoin Virtual Machine. Filecoin requires numerous costly proofs of spacetime / proofs of replication. Halo2 will be pivotal in compressing the space usage, better scaling the network.

[Filecoin Foundation video with Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw)

Additionally, it would be highly beneficial to both the Filecoin and Zcash ecosystems if Filecoin storage payments could be made in ZEC, affording the same level of privacy for storage purchases that exists in Zcash shielded transfers. This support would add the ability to encrypt files in Filecoin storage and add support to mobile clients so that they could “attach” media or files to a Zcash encrypted memo. 

[ECC x Filecoin Blog Post](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Ethereum

Implementation of a Halo 2 proof for the efficient Verifiable Delay Function (VDF) being developed. A VDF is a cryptographic primitive that has many potential use cases. 

It can be used as a source of general purpose randomness including use in smart contract applications as well as leader election in Proof of Stake on Ethereum & other protocols.

ECC, the Filecoin Foundation, Protocol Labs, and the Ethereum Foundation will also be working with [SupraNational](https://www.supranational.net/), a vendor specializing in hardware-accelerated cryptography, for potential GPU and ASIC design and development of the VDF.

The [Privacy and Scaling Exploration group](https://appliedzkp.org/) is also researching different ways Halo 2 proofs can improve privacy and scalability for the Ethereum ecosystem. This group rolls up to the Ethereum foundation, and has a broad focus on zero-knowledge proofs and cryptographic primitives. 

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

**Documentation**

[Halo 2 resources](https://github.com/adria0/awesome-halo2)

[Halo 2 docs](https://zcash.github.io/halo2/)

[Halo 2 github](https://github.com/zcash/halo2)
