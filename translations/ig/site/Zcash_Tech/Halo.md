<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo (ụtụtụ ọma)


## Gịnị bụ Halo?

Halo bụ ihe a na-atụkwasịghị obi, nke nwere ike ịba uru (ZKP) nke Sean Bowe chọpụtara na Electric Coin Co. Ọ na -ewepụ ntọala tụkwasịrị obi ma nye ohere ka ukwuu maka Zcash blockchain. Halo bụ usoro izizi zero-knowledge proof mbụ dị irè & recursive ọtụtụ ndị weere dịka ọganihu sayensị .

![halo](/content-images/_unavailable.svg "halo")


** Ihe ndị mejupụtara ya**

Nchịkọta Njikọ nke Polynomial: Na-enye ohere ka onye na - eme ihe iji tinye aka n'ọtụtụ polynomials nwere obere eriri enwere ike iji ya mee ihe site na nyocha iji kwado nkwenye ndị a kwuru banyere ọtụtụ polynominal ahụ.

Polynomial Interactive Oracle Proof: Verifier na-ajụ prover (algọridim) ka ha mepee nkwa niile n'ọtụtụ ebe nke nhọrọ ha site na iji atụmatụ ntinye aka polynomials & nyocha njirimara bụ eziokwu n'etiti ha. 


### Enweghị Ntọala A Tụkwasịrị Obi

zkSNARKs na-adabere n'usoro ntụaka nkịtị (CRS) dị ka ihe ngosi ọha maka igosi & nyochaa. A ghaghị ịmepụta CRS a tupu oge eruo site n'aka onye tụkwasịrị obi. Ruo mgbe nso nso, kọwaa ọtụtụ ngụkọta nke multiparty computations (MPC) dịka ndị Aztec network & Zcash mere bụ mkpa iji belata ihe ize ndụ metụtara ya [nkwado ntọala usoro](https://zkproof.org/2021/06/30/setup-ceremonies/amp/). 

Previously Zcash's Sprout & Sapling shielded pools utilised the BCTV14 & Groth 16 zk-proving systems. While these were secure there were limitations. They were not scalable as they were tied to a single application, the "toxic waste" (remnants from cryptographic material generated during the genesis ceremony) could persist, and there was an element of trust (albeit minute) for users to deem the ceremony acceptable.

Site na-agbagha ọtụtụ nsogbu siri ike ọnụ n'oge usoro nke elliptic curves ka enwere ike iji ihe akaebe kọmpụta mee ihe banyere onwe ha (Nested amortization) mkpa maka ntọala a tụkwasịrị obi. Nke a pụtakwara na eriri ederede ahaziri iche (mmepụta site na emume) nwere ike ịkwalite ngwa ndị dị ka nkwekọrịta smart .

Halo provides users with two important assurances regarding the security of the large-scale zero-knowledge proof system. Firstly, it enables users to prove that no one who was involved in the genesis ceremony has created a secret backdoor to execute fraudulent transactions. Secondly, it allows users to demonstrate that the system has remained secure over time, even as it has undergone updates and changes.

[Sean Bowes Nkọwa na Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo) 
 


### Ihe Nlereanya Na-agbanwe Agbanwe

Recursive proof composition allows a single proof to attest to the correctness of practically unlimited other proofs, allowing a large amount of computation (and information) to be compressed. This is an essential component for scalablilty, not least because it allows us to horizontally scale the network while still allowing pockets of participants to trust the integrity of the remainder of the network.

Prior to Halo, achieving recursive proof composition required large computational expense and a trusted setup. One of the main discoveries was a technique called **nested amortization**. This technique allows for recursive composition using the polynomial commitment scheme based on inner product argument, massively improving on performance and avoiding the trusted setup.

Na [akwụkwọ Halo](https://eprint.iacr.org/2019/1021.pdf), anyị kọwara nke ọma usoro nkwenye a na-eme ọtụtụ ihe ma chọpụta ụzọ nchịkọta ọhụrụ dị n'ime ya. Usoro ahụ na -enye ohere ka ọnụ ọgụgụ buru ibu nke akaebe ndị e mepụtara onwe ha wee bụrụ onye nyocha ngwa ngwa dịka nyochaa otu ihe ngosi. Nke a naanị ga -enye nhọrọ ọzọ karịa zk-SNARKs mbụ eji eme Zcash .


### Halo 2 (nke abụọ)

Halo 2, bụ mmejuputa zk-SNARK dị elu nke edere na Rust nke wepụrụ mkpa maka ntọala a tụkwasịrị obi mgbe ịtọlite ọkwa maka scalability na Zcash. 

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

Ọ na-agụnye generalization nke anyị obibia akpọ **accumulation atụmatụ**. ọhụrụ a formalization ekpughe otú anyị nested amortization Usoro n'ezie ọrụ; site na-agbakwunye àmà ihe ka ihe akpọrọ ** accumulator, ebe ndị àmà ezi uche banyere gara aga ala nke accumlator, anyị nwere ike ịlele na niile gara aga àmà bụ eziokwu (site induction) nanị site n'inyocha ugbu ọnọdụ nke accumulator.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>



N'otu oge ahụ, ọtụtụ ndị ọzọ na-achọpụta ihe ọhụrụ Polynomial IOPs nke dị irè karịa Sonic (eji ya mee Halo 1), dịka Marlin. 

Ihe kachasị dị irè n'ime usoro iwu ọhụrụ ndị a bụ PLONK, nke na-enye mgbanwe dị ukwuu n'ịmepụta mmejuputa arụmọrụ dabere na mkpa ngwa ahụ ma nye oge 5x ka mma karịa Sonic.

[Nkọwa nke PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)


### Kedụ ka nke a si abara Zcash uru?

The Orchard Shielded pool activated with NU5 & is the implementation of this new proof system on the Zcash Network. Guarded by the same turnstile design as used between Sprout and Sapling with the intent to gradually retire the older shielded pools. This encourages migration to a fully trustless proof system, reinforcing confidence in the soundness of the monetary base, and reducing the implementation complexity and attack surface of Zcash overall. Following the activation of NU5 mid 2022, integration of recursive proofs became possible (although this is not complete). Several privacy enhancements were also made tangentially. The introduction of 'Actions' to replace inputs/outputs helped reducing the amount of transaction metadata. 

Ntọala ndị a tụkwasịrị obi na-esiri ike ịhazi ma gosipụta ihe ize ndụ usoro. Ọ ga-adị mkpa ka ha megharịa maka nkwalite ọ bụla nke protocol. Iwepụ ha bụ ezigbo mma iji wụnye mmelite ọhụrụ n'enweghị nsogbu. 

Recursive proof composition holds the potential for compressing unlimited amounts of computation, creating auditable distributed systems, making Zcash highly capable particularly with the shift to Proof of Stake. This is also useful for extensions such as Zcash Shielded Assets and improving Layer 1 capacity at the higher end of full node usage in the coming years for Zcash.


## Halo n'ime usoro okike sara mbara karị. 

The Electric Coin Company has entered into an agreement with Protocol Labs, the Filecoin Foundation, and the Ethereum Foundation to explore Halo R&D, including how the technology might be used in their respective networks. The agreement aims to provide better scalability, interoperability and privacy across ecosystems and for Web 3.0.

Tụkwasị na nke ahụ, Halo 2 dị n'okpuru [MIT and Apache 2.0 open-source licenses](https://github.com/zcash/halo2#readme), nke pụtara na onye ọ bụla nọ n'ime usoro okike nwere ike iji sistemụ ahụ gosipụta.

### Filecoin

Kemgbe e depụtara ya, a nabatara ọba akwụkwọ halo2 na ọrụ dịka zkEVM. Enwere ike itinye Halo 2 n'ime usoro ihe akaebe maka Filecoin Virtual Machine. Filecoin chọrọ ọtụtụ nkwenye dị oke ọnụ nke oge / ohere / nnwale nke mmegharị ahụ. Halo2 ga-abụ isi iji belata ojiji oghere, ka mma ịbawanye netwọkụ.

[Filecoin Foundation video na Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw)

Additionally, it would be highly beneficial to both the Filecoin and Zcash ecosystems if Filecoin storage payments could be made in ZEC, affording the same level of privacy for storage purchases that exists in Zcash shielded transfers. This support would add the ability to encrypt files in Filecoin storage and add support to mobile clients so that they could **attach** media or files to a Zcash encrypted memo. 

[ECC x Filecoin Blog Post] Ihe ndị a bụ ihe dị mkpa.](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Ethereum (Ether) nke Bekee:

Ntinye nke Halo 2 na-egosi maka arụmọrụ arụ ọrụ (VDF) a na - emepe. VDF bụ ihe nzuzo dị omimi nwere ọtụtụ ojiji ndị nwere ike iji mee ihe. 

Enwere ike iji ya dị ka isi iyi nke ebumnuche izugbe gụnyere ojiji na ngwa nkwekọrịta smart yana ntuli aka onye ndu n'ime Ihe Akaebe nke Stake on Ethereum & protocols ndị ọzọ.

ECC, Filecoin Foundation, Protocol Labs na Ethereum Foundation ga-arụkwa ọrụ [SupraNational](https://www.supranational.net/), onye na-ere ahịa ọkachamara n'ihe gbasara ngwaike nke akwadoro, maka GPU nwere ike imepụta ma mepee VDF.

[Nzuzo na Ịmụba Exploration Group](https://appliedzkp.org/) is also researching different ways Halo 2 proofs can improve privacy and scalability for the Ethereum ecosystem. This group rolls up to the Ethereum foundation, and has a broad focus on zero-knowledge proofs and cryptographic primitives. 

## Ihe oru ndi ozo eji Halo eme ihe

+ [Anoma, a nzuzo ichebe multichain atomic swap protocol](https://anoma.net/blog/an-introduction-to-zk-snark-plonkup)

+ [Oribis, ihe L2 zkRollup na Cardano](https://docs.orbisprotocol.com/orbis/technology/halo-2)

+ [Darkfi, a onwe L1 zkEVM blockchain](https://darkrenaissance.github.io/darkfi/architecture/architecture.html)

+ [Mgbanwe, L2 zkRollup na Ethereum](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k)


**Ịmụtakwu ihe**:

[Ntughari aka na zkp na halo 2 - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)

[Halo 2 na Daira & Str4d - ZKPodcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)

[Blọọgụ Nkọwapụta Ọkachamara](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)

[Ihe ngosi obodo Halo 2 - Ying Tong @Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

** Akwụkwọ**

[Halo 2 ego](https://github.com/adria0/awesome-halo2)

[Ihe nkiri Halo 2](https://zcash.github.io/halo2/)

[Halo 2 github](https://github.com/zcash/halo2)
