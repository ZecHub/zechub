<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo


## Gịnị bụ Halo?

Halo is a trustless, recursive zero-knowledge proof (ZKP) discovered by Sean Bowe at Electric Coin Co. It eliminates the trusted setup and allows greater scalability of the Zcash blockchain. Halo was the first zero-knowledge proof system that is both efficient & recursive widely regarded as a scientific breakthrough.

[Ndewo!](https://electriccoin.co/wp-content/uploads/2021/01/Halo-on-Z-1440x720.png "halo")


** Ihe ndị mejupụtara ya**

Succinct Polynomial Commitment Scheme: Allows a committer to commit to a polynomial with a short string that can be used by a verifier to confirm claimed evaluations of the committed polynomial.

Polynomial Interactive Oracle Proof: Verifier asks prover (algorithm) to open all commitments at various points of their choosing using polynomial commitment scheme & checks identity holds true between them. 


### Enweghị Ntọala A Tụkwasịrị Obi

zkSNARKs rely on a common reference string (CRS) as a public parameter for proving & verifying. This CRS must be generated in advance by a trusted party. Until recently, elaborate secure multi-party computations (MPC) as those performed by Aztec network & Zcash were necessary to mitigate the risk involved during this [trusted setup ceremony](https://zkproof.org/2021/06/30/setup-ceremonies/amp/). 

Previously Zcash's Sprout & Sapling shielded pools utilised the BCTV14 & Groth 16 zk-proving systems. While these were secure there were limitations. They were not scalable as they were tied to a single application, the "toxic waste" (remnants from cryptographic material generated during the genesis ceremony) could persist, and there was an element of trust (albeit minute) for users to deem the ceremony acceptable.

By repeatedly collapsing multiple instances of hard problems together over cycles of elliptic curves so that computational proofs can be used to reason about themselves efficiently (Nested amortization) the need for a trusted setup is eliminated. This also means that the structured reference string (output from ceremony) is upgradeable enabling applications such as smart contracts.

Halo provides users with two important assurances regarding the security of the large-scale zero-knowledge proof system. Firstly, it enables users to prove that no one who was involved in the genesis ceremony has created a secret backdoor to execute fraudulent transactions. Secondly, it allows users to demonstrate that the system has remained secure over time, even as it has undergone updates and changes.

[Sean Bowes Nkọwa na Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo) 
 


### Ihe akaebe na-agbanwe agbanwe

Recursive proof composition allows a single proof to attest to the correctness of practically unlimited other proofs, allowing a large amount of computation (and information) to be compressed. This is an essential component for scalablilty, not least because it allows us to horizontally scale the network while still allowing pockets of participants to trust the integrity of the remainder of the network.

Prior to Halo, achieving recursive proof composition required large computational expense and a trusted setup. One of the main discoveries was a technique called **nested amortization**. This technique allows for recursive composition using the polynomial commitment scheme based on inner product argument, massively improving on performance and avoiding the trusted setup.

Na [akwụkwọ Halo](https://eprint.iacr.org/2019/1021.pdf), we fully described this polynomial commitment scheme and discovered a new aggregation technique existed in it. The technique allows a large number of independently created proofs to be verified nearly as quickly as verifying a single proof. This alone would offer a better alternative to the earlier zk-SNARKs used in Zcash.


### Halo 2

Halo 2, is a high-performance zk-SNARK implementation written in Rust which eliminates the need for a trusted setup while setting the stage for scalability in Zcash. 

<a href="">
    <img src="https://electriccoin.co/wp-content/uploads/2020/09/Halo-puzzle-03-1024x517.jpg" alt="" width="500" height="300"/>
</a>

It includes a generalization of our approach called an **accumulation scheme**. This new formalization exposes how our nested amortization technique actually works; by adding proofs to an object called an **accumulator,** where the proofs reason about the previous state of the accumulator, we can check that all previous proofs were correct (by induction) simply by checking the current state of the accumulator.

<a href="">
    <img src="https://i.imgur.com/l4HrYgE.png" alt="" width="500" height="300"/>
</a>



N'otu oge ahụ, ọtụtụ ìgwè ndị ọzọ na-achọpụta ihe ọhụrụ Polynomial IOPs nke dị irè karịa Sonic (eji na Halo 1), dị ka Marlin. 

Ihe kachasị dị irè n'ime usoro iwu ọhụrụ ndị a bụ PLONK, nke na-enye mgbanwe dị ukwuu n'ịmepụta mmejuputa arụmọrụ dabere na mkpa ngwa ngwa ma na-enyekwa oge 5x ka mma karịa Sonic.

[Nkọwa nke PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)


### Kedụ ka nke a si abara Zcash uru?

The Orchard Shielded pool activated with NU5 & is the implementation of this new proof system on the Zcash Network. Guarded by the same turnstile design as used between Sprout and Sapling with the intent to gradually retire the older shielded pools. This encourages migration to a fully trustless proof system, reinforcing confidence in the soundness of the monetary base, and reducing the implementation complexity and attack surface of Zcash overall. Following the activation of NU5 mid 2022, integration of recursive proofs became possible (although this is not complete). Several privacy enhancements were also made tangentially. The introduction of 'Actions' to replace inputs/outputs helped reducing the amount of transaction metadata. 

Ntọala ndị a tụkwasịrị obi na-esiri ike ịhazi & gosipụtara ihe ize ndụ usoro. Ọ ga-adị mkpa ka ha megharịa maka nkwalite ọ bụla nke protocol. Iwepụ ha na-enye ọganihu dị ukwuu maka mmejuputa mmelite protocol ọhụrụ n'enweghị nsogbu. 

Recursive proof composition holds the potential for compressing unlimited amounts of computation, creating auditable distributed systems, making Zcash highly capable particularly with the shift to Proof of Stake. This is also useful for extensions such as Zcash Shielded Assets and improving Layer 1 capacity at the higher end of full node usage in the coming years for Zcash.


## Halo n'ime usoro okike sara mbara 

The Electric Coin Company abanyela nkwekọrịta na Protocol Labs, Filecoin Foundation, na Ethereum Foundation iji nyochaa Halo R&D, gụnyere otu esi eji teknụzụ ahụ na netwọkụ ha.

Na mgbakwunye, Halo 2 dị n'okpuru [MIT na Apache 2.0 open-source licenses](https://github.com/zcash/halo2#readme), nke pụtara na onye ọ bụla nọ na gburugburu ebe obibi nwere ike iwulite usoro ihe akaebe.

### Filecoin

Since its deployment, the halo2 library has been adopted in projects like the zkEVM, there is potential integration of Halo 2 into the proof system for the Filecoin Virtual Machine. Filecoin requires numerous costly proofs of spacetime / proofs of replication. Halo2 will be pivotal in compressing the space usage, better scaling the network.

[Filecoin Foundation video na Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw)

Additionally, it would be highly beneficial to both the Filecoin and Zcash ecosystems if Filecoin storage payments could be made in ZEC, affording the same level of privacy for storage purchases that exists in Zcash shielded transfers. This support would add the ability to encrypt files in Filecoin storage and add support to mobile clients so that they could **attach** media or files to a Zcash encrypted memo. 

[ECC x Filecoin Blọọgụ Post](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Ethereum

Mmejuputa nke Halo 2 na-egosi maka arụ ọrụ na-arụ ọrụ nke ọma (VDF) a na-emepe emepe. VDF bụ ihe nzuzo nke nwere ọtụtụ ihe eji eme ihe. 

Enwere ike iji ya dị ka isi iyi nke ebumnuche izugbe gụnyere iji ya na ngwa nkwekọrịta smart yana ntuli aka onye ndu na Proof of Stake na Ethereum & protocol ndị ọzọ.

ECC, Filecoin Foundation, Protocol Labs, na Ethereum Foundation ga-arụkwa ọrụ na [SupraNational](https://www.supranational.net/), a vendor specializing in hardware-accelerated cryptography, for potential GPU and ASIC design and development of the VDF.

The [Nzuzo na Scaling Exploration ìgwè](https://appliedzkp.org/) is also researching different ways Halo 2 proofs can improve privacy and scalability for the Ethereum ecosystem. This group rolls up to the Ethereum foundation, and has a broad focus on zero-knowledge proofs and cryptographic primitives. 

## Ọrụ ndị ọzọ na-eji Halo

+ [Anoma, a nzuzo ichebe multichain atomic swap protocol](https://anoma.net/blog/an-introduction-to-zk-snark-plonkup)

+ [Oribis, ihe L2 zkRollup na Cardano](https://docs.orbisprotocol.com/orbis/technology/halo-2)

+ [Darkfi, a onwe L1 zkEVM blockchain](https://darkrenaissance.github.io/darkfi/architecture/architecture.html)

+ [Pịgharịa, L2 zkRollup na Ethereum](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k)


**Ịmụtakwu ihe**:

[Ntinye aka na zkp na halo 2 - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)

[Halo 2 na Daira & Str4d - ZKPodcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)

[Blọọgụ Nkọwapụta Teknụzụ]](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)

[Ihe ngosi obodo nke Halo 2 - Ying Tong @Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

** Akwụkwọ**

[Halo 2 ego](https://github.com/adria0/awesome-halo2)

[Halo 2 docs](https://zcash.github.io/halo2/)

[Halo 2 github](https://github.com/zcash/halo2)
