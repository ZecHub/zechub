<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo


## Kí ni Halo?

Halo jẹ a trustless, recursive zero-imọ ẹri (ZKP) awari nipa Sean Bowe ni Electric Coin Co. O eliminates awọn gbẹkẹle iṣeto ati ki o faye gba tobi scalability ti awọn Zcash blockchain.

[ìyẹn ni pé:](https://electriccoin.co/wp-content/uploads/2021/01/Halo-on-Z-1440x720.png "halo")


Àwọn ohun èlò inú rẹ̀

Ètò Ìpínwọ̀n Òdìpọ̀ Ọ̀rọ̀: Ó ń jẹ́ kí olùpínwọ́ láti ṣe ìpínwéròpọ̀ ọ̀rọ ̀ pẹ ̀ lú ìlà kúkúrú tí olùwádìí lè lò láti fìdí àwọn àgbéyẹ̀wò tí wọ ́ n sọ nípa òdìpò̀ ọ̀rò ̀ náà múlẹ ̀ .

Polynomial Interactive Oracle Proof: Verifier béèrè prover (algorithm) lati ṣii gbogbo awọn adehun ni orisirisi awọn aaye ti yiyan wọn nipa lilo eto adehun polymomial & ṣayẹwo idanimọ jẹ otitọ laarin wọn. 


### Kò sí Àdásílẹ̀ Tí a Gbẹ́kẹ̀ Lé

zkSNARKs gbekele lori kan wọpọ itọkasi okun (CRS) bi a gbangba paramita fun dida & verifying. yi CRS gbọdọ wa ni ipilẹṣẹ ni ilosiwaju nipa a gbẹkẹle ẹgbẹ. titi laipe, elaborated ailewu multi-apakan iṣiro (MPC) bi awon ṣe nipasẹ Aztec nẹtiwọki & Zcash won pataki lati din awọn ewu lowo nigba yi [gbẹkẹle ṣeto ayeye](https://zkproof.org/2021/06/30/setup-ceremonies/amp/). 

Previously Zcash's Sprout & Sapling shielded pools utilised the BCTV14 & Groth 16 zk-proving systems. While these were secure there were limitations. They were not scalable as they were tied to a single application, the "toxic waste" (remnants from cryptographic material generated during the genesis ceremony) could persist, and there was an element of trust (albeit minute) for users to deem the ceremony acceptable.

By repeatedly collapsing multiple instances of hard problems together over cycles of elliptic curves so that computational proofs can be used to reason about themselves efficiently (Nested amortization) the need for a trusted setup is eliminated. This also means that the structured reference string (output from ceremony) is upgradeable enabling applications such as smart contracts.

Halo provides users with two important assurances regarding the security of the large-scale zero-knowledge proof system. Firstly, it enables users to prove that no one who was involved in the genesis ceremony has created a secret backdoor to execute fraudulent transactions. Secondly, it allows users to demonstrate that the system has remained secure over time, even as it has undergone updates and changes.

[Sean Bowes Explainer on Dystopia Labs] [Ìròyìn tó dá lórí Àjọ Tó Ń Rí sí Ìṣòro Àwọn Èèyàn]](https://www.youtube.com/watch?v=KdkVTEHUxgo) 
 


### Àwọn Ẹ̀rí Àtúnyẹ̀wò

Recursive proof composition allows a single proof to attest to the correctness of practically unlimited other proofs, allowing a large amount of computation (and information) to be compressed. This is an essential component for scalablilty, not least because it allows us to horizontally scale the network while still allowing pockets of participants to trust the integrity of the remainder of the network.

Ṣaaju ki o to Halo, achieving recursive proof composition required large computational expense and a trusted setup. Ọkan ninu awọn akọkọ àwárí je kan ilana ti a npe ni ** nested amortization **. Yi ilana faye gba fun recursive composition lilo awọn polynomial adehun eto da lori inu ọja ariyanjiyan, massively imudarasi lori išẹ ati ki o yago fun awọn gbẹkẹle iṣeto.

Nínú [ìwé Halo](https://eprint.iacr.org/2019/1021.pdf), we fully described this polynomial commitment scheme and discovered a new aggregation technique existed in it. The technique allows a large number of independently created proofs to be verified nearly as quickly as verifying a single proof. This alone would offer a better alternative to the earlier zk-SNARKs used in Zcash.


### Halo 2 (ìmọ̀lára)

Halo 2, jẹ iṣẹ ṣiṣe giga zk-SNARK ti a kọ ni Rust eyiti o yọkuro iwulo fun iṣeto igbẹkẹle lakoko ti o ṣeto ipele fun scalability ni Zcash. 

<a href="">
    <img src="https://electriccoin.co/wp-content/uploads/2020/09/Halo-puzzle-03-1024x517.jpg" alt="" width="500" height="300"/>
</a>

It includes a generalization of our approach called an **accumulation scheme**. This new formalization exposes how our nested amortization technique actually works; by adding proofs to an object called an **accumulator,** where the proofs reason about the previous state of the accumulator, we can check that all previous proofs were correct (by induction) simply by checking the current state of the accumulator.

<a href="">
    <img src="https://i.imgur.com/l4HrYgE.png" alt="" width="500" height="300"/>
</a>



Ni igbakanna, ọpọlọpọ awọn ẹgbẹ miiran n ṣe awari awọn IOPs Polynomial tuntun ti o munadoko diẹ sii ju Sonic (ti a lo ninu Halo 1), bii Marlin. 

Awọn julọ munadoko ti awọn wọnyi titun awọn ilana ni PLONK, eyi ti o funni nla irọrun ni oniru daradara imuse da lori ohun elo-pataki aini ati ki o pese 5x ti o dara ju akoko profaili lati Sonic.

[Àkópọ̀ àlàyé nípa PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)


### Báwo ni èyí ṣe ṣàǹfààní fún Zcash?

The Orchard Shielded pool activated with NU5 & is the implementation of this new proof system on the Zcash Network. Guarded by the same turnstile design as used between Sprout and Sapling with the intent to gradually retire the older shielded pools. This encourages migration to a fully trustless proof system, reinforcing confidence in the soundness of the monetary base, and reducing the implementation complexity and attack surface of Zcash overall. Following the activation of NU5 mid 2022, integration of recursive proofs became possible (although this is not complete). Several privacy enhancements were also made tangentially. The introduction of 'Actions' to replace inputs/outputs helped reducing the amount of transaction metadata. 

Awọn iṣeto ti o gbẹkẹle jẹ igbagbogbo nira lati ṣe ifowosowopo & ṣafihan eewu eto. O yoo jẹ dandan lati tun wọn ṣe fun igbesoke ilana pataki kọọkan. Yiyọ wọn jẹ ilọsiwaju pataki fun imuse ailewu awọn igbesẹ ilosiwaju tuntun. 

Recursive proof composition holds the potential for compressing unlimited amounts of computation, creating auditable distributed systems, making Zcash highly capable particularly with the shift to Proof of Stake. This is also useful for extensions such as Zcash Shielded Assets and improving Layer 1 capacity at the higher end of full node usage in the coming years for Zcash.


## Halo in the wider ecosystem 

The Electric Coin Company ti ṣe adehun pẹlu Protocol Labs, Filecoin Foundation, ati Ethereum Foundation lati ṣawari Halo R&D, pẹlu bi a ṣe le lo imọ-ẹrọ naa ni awọn nẹtiwọọki wọn. Adehun naa ni ifọkansi lati pese titobi ti o dara julọ, ibaramu ati aṣiri kọja awọn ilolupo eda abemi ati fun Wẹẹbu 3.0.

Pẹlupẹlu, Halo 2 wa labẹ awọn [MIT ati Apache 2.0 awọn iwe-aṣẹ orisun ṣiṣi](https://github.com/zcash/halo2#readme), tí ó túmọ̀ sí pé ẹnikẹ́ni nínú ètò àyíká lè kọ́lé pẹ̀lú ètò ìfiwéra.

### Filecoin[àtúnṣe _ àtúnṣe àmìọ̀rọ̀]

Since its deployment, the halo2 library has been adopted in projects like the zkEVM, there is potential integration of Halo 2 into the proof system for the Filecoin Virtual Machine. Filecoin requires numerous costly proofs of spacetime / proofs of replication. Halo2 will be pivotal in compressing the space usage, better scaling the network.

[Filecoin Foundation fídíò pẹ̀lú Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw)

Additionally, it would be highly beneficial to both the Filecoin and Zcash ecosystems if Filecoin storage payments could be made in ZEC, affording the same level of privacy for storage purchases that exists in Zcash shielded transfers. This support would add the ability to encrypt files in Filecoin storage and add support to mobile clients so that they could **attach** media or files to a Zcash encrypted memo. 

[ECC x Filecoin Blog Post] Àwọn ojúewé wọ̀nyí jápọ̀ mọ́:](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Ethereum (ìyẹn Ethereum)

Implementation of a Halo 2 proof for the efficient Verifiable Delay Function (VDF) being developed. A VDF is a cryptographic primitive that has many potential use cases. 

O le ṣee lo bi orisun ti gbogbogbo ète randomness pẹlu lilo ni smati adehun ohun elo bi daradara bi olori idibo ni Proof of Igbese lori Ethereum & miiran awọn ilana.

ECC, Ile-iṣẹ Filecoin, Protocol Labs, ati Ile-ifowopamọ Ethereum yoo tun ṣiṣẹ pẹlu [SupraNational](https://www.supranational.net/), olutaja kan ti o ṣe amọja ni ohun elo-iṣẹ cryptography, fun agbara GPU ati ASIC apẹrẹ ati idagbasoke ti VDF.

Ẹgbẹ́ Ìwádìí Ìpamọ́ àti Ìmúgbòòrò](https://appliedzkp.org/) is also researching different ways Halo 2 proofs can improve privacy and scalability for the Ethereum ecosystem. This group rolls up to the Ethereum foundation, and has a broad focus on zero-knowledge proofs and cryptographic primitives. 

## Àwọn iṣẹ́ míì tí wọ́n ń lo Halo

+ [Anoma, Àdéhùn ìyípadà atomiki alágbèéká tí ó ń dáàbò bo ìpamọ́](https://anoma.net/blog/an-introduction-to-zk-snark-plonkup)

+ [Oribis, ohun L2 zkRollup lori Cardano](https://docs.orbisprotocol.com/orbis/technology/halo-2)

+ [Darkfi, a ikọkọ L1 zkEVM blockchain](https://darkrenaissance.github.io/darkfi/architecture/architecture.html)

+ [Mọ, a L2 zkRollup lori Ethereum](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k)


Ìkẹ́kọ̀ọ́ síwájú sí i:

[ìdásílẹ̀ sí zkp àti halo 2 - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)

[Halo 2 pẹlu Daira & Str4d - ZKPodcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)

[Bíbélì tó ń ṣàlàyé nípa ẹ̀rọ]](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)

[Halo 2 Community Showcase - Ying Tong @Zcon3 Àkọlé àwòrán]](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Ìwé-ìwé**

[Àwọn ohun èlò Halo 2](https://github.com/adria0/awesome-halo2)

[Àwọn ìwé ìròyìn Halo 2](https://zcash.github.io/halo2/)

[Halo 2 github ì í ì 'í ë ¤.](https://github.com/zcash/halo2)
