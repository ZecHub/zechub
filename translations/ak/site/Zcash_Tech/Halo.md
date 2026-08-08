<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo (Ɔhyԑn)


## Dɛn ne Halo?

Halo yɛ nokwaredie a enni mu, na ɛsan di dwuma bio wɔ nimdeɛ so (ZKP) a Sean Bowe huu no wɔ Electric Coin Co. Ɛma nnipa nya ahotosoɔ ma Zcash blockchain tumi trɛw ntɛmntɛm.

![halo](/content-images/_unavailable.svg "halo")


*Nkrataa ahodoɔ a etwa sɛ yɛhyehyɛ wɔ kasa no mu*

Succinct Polynomial Commitment Scheme: Ɛma obi a ɔde hyɛ mu no kwan sɛ ɔmfa ne ho nhyɛ polynomials so wɔ ahwehwɛde tiawa bi akyi, na verifier betumi de adi dwuma ama wahyɛ nhwehwɛmu ahorow a wɔde ahyɛ ase.

Polynomial Interactive Oracle Proof: Verifier bisa prover (algorithm) sɛ wɔn bue nsem nyinaa wɔ beaɛ a wɔpɛ biara fa polynomialsɛm yɛ adwuma na hwɛ sɛ ne nsonsonoe no teɛ. 


### Ntotoe a Wonnye Nni

ZkSNARKs gyina common reference string (CRS) so sɛ aberɛ a wɔ bɛ yɛ proofing & verifying. CRS yi ɛsɛsɛ obi de ne ho to no so ansa na w'atumi ayɛ saa. Ɛnkyɛre koraa, wɔn aa wɔyɛ Aztec network & Zcash dwumadie mu no hiaa safe multi-party computations (MPC) sɛnea ɛbɛyɛ a wɔbɛtumi ate asiane bi ase bere a wɔreyɛ [trusted setup ceremony] yi.](https://zkproof.org/2021/06/30/setup-ceremonies/amp/). 

Previously Zcash's Sprout & Sapling shielded pools utilised the BCTV14 & Groth 16 zk-proving systems. While these were secure there were limitations. They were not scalable as they were tied to a single application, the "toxic waste" (remnants from cryptographic material generated during the genesis ceremony) could persist, and there was an element of trust (albeit minute) for users to deem the ceremony acceptable.

By repeatedly collapsing multiple instances of hard problems together over cycles of elliptic curves so that computational proofs can be used to reason about themselves efficiently (Nested amortization) the need for a trusted setup is eliminated. This also means that the structured reference string (output from ceremony) is upgradeable enabling applications such as smart contracts.

Halo ma wɔn a wɔde di dwuma no awerɛhyem mmienu fa ahobanbɔ ho. Nea edi kan, ɛma wotumi kyerɛ sɛ obiara nni hɔ a ɔde ne ho hyɛɛ Genesis afahyɛ mu na wabue ɔfasuo akyi de ayɛ nnaadaa nnwuma. Ne mprenu so nso, ɛboa nnipa ma wɔhunu sɛ bere tenten ni mpo deɛ wɔayɛ nsakrae bi aba ama nhyehyɛe no adi ban.

[Sean Bowes Nkyerɛkyerɛmu wɔ Dystopia Labs ho]](https://www.youtube.com/watch?v=KdkVTEHUxgo) 
 


### Adanseɛ a wɔsan de ba no

Recursive proof composition ma kwan sɛ ɔdanse baako bɛtumi adi adanseɛ a ɛnni ano, na ama nkontabuo (ne nsɛm) bebree so. Eyi yɛ ade titiriw wɔ scalability mu, ɛfiri sɛ ɛma yɛn tumi sikan network no kɔ soro bere koro ara nso ma wɔn a wɔwɔ ho kyɛfa bi nya ahotosoɔ wɔ nea aka nyinaa mu.

Ansa na Halo reba no, sɛ wobɛyɛ recursive proof composition a ɛhwehwɛ kɔmputa mu nnɔbae bebree ne setup bi a wɔgye di. N'abɛfidie titiriw baako yɛ ɔkwan bi a wɔfrɛ no "nested amortization". Saa kwan yi ma wotumi de polynomial commitment scheme gyina nsunsuanso afrafra so yɛ adeyɛ pa pii bere a wɔnte trusted setup ase koraa.

Wɔ [Halo krataa no mu]](https://eprint.iacr.org/2019/1021.pdf)Yԑde nsesaeԑ a ԑfa ho no kyerԑkyerԑ sԑ y'atumi de nkontaabu foforɔ bi adi dwuma. Nkontaabuo yi ma yetumi di adanse bebree so wɔ bere tiaa mu te sɛ nea yɛdi adanse baako akyi. Eyi nkutoo betumi ama yɛanya ɔkwan foforo afa zk-SNARKs dedaw a wɔde dii dwuma wͻ Zcash ase no.


### Halo 2 mu nkrataa

Halo 2, yɛ dwumadie a ɛtumi di dwuma yie wɔ zk-SNARK mu, na w'akyerɛw no Rust so. Ɛma ɛho nhia sɛ wode wo ho to obi foforo so bere a woreyɛ akwantuo akɔ Zcash hɔ no. 

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

It includes a generalization of our approach called an **accumulation scheme**. This new formalization exposes how our nested amortization technique actually works; by adding proofs to an object called an **accumulator,** where the proofs reason about the previous state of the accumulator, we can check that all previous proofs were correct (by induction) simply by checking the current state of the accumulator.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>



Saa ara nso na, akuw afoforo pii rehwehwɛ Polynomial IOPs foforo a ɛboro Sonic (a wɔde dii dwuma wɔ Halo 1) so yie te sɛ Marlin. 

Saa akwankyerԑ foforɔ yi mu nea ԑyε adwuma paa ne PLONK, a εma ahobammɔ kɛse wɔ nhyehyεε a wɔde di dwuma yiye ho gyinabea ahorow so na ɛma wonya bere tenten koraa sen Sonic.

[PLONK ho nsɛm nyinaa]](https://www.youtube.com/watch?v=P1JeN30RdwQ)


### Ɔkwan bɛn so na eyi boa Zcash?

Orchard Shielded pool a wɔde adi dwuma wɔ NU5 & no yɛ proof system foforo yi ho adwuma. Ɛde turnicle nsɛso korɔ na ɛhwɛ so te sɛ nea Sprout ne Sapling de dii dwuma, ɛne adwene sɛ wɔbɛkɔ akɔ retire tetefoɔ a wɔn ani da hɔ no nkakrankakra. Eyi hyɛ ntransekɔ kɔ trustless proof system mu koraa ma ahotoso ba sika fapem pa mu, na ɛma Zcash fahodie nyinaa tumi di mmerɛ. Wɔ 2022 mfinimfini bere mu no, rebɛtumi ayɛ recursive proofs (mpo s'enwiei). Wɔde ahintasɛm asisibea pii nso ama nnyɛ den paa. "Actions" asehyɛe maa input/output sesaa transaction metadata dodow. 

Trusted setups yɛ den sɛ wɔbɛhyehyɛ ne ho na ɛde systemic risk ba. Ɛho behiae sε wɔsan wɔn bio ma protocol upgrades biara a ɛkyɛn so no. Wɔn yi mu bɔ yεε adepa kɛse ama akwankyerԑ foforo a εbͻ bͻne ato hɔ de adi dwuma dwoodwoo. 

Recursive proof composition wɔ tumi a ɔde bɛhyehyɛ computation pii, na ama no ayɛ nea wotumi yɛ mu nhwehwɛmu. Eyi nso boa ma wɔn nya mfasoɔ kɛse sɛ wɔde Zcash Shielded Assets ne Layer 1 ahoɔden bɛyɛ adwuma yiye wɔ mfe kakra akyi de adi dwuma nyinaa.


## Halo wɔ abɔde mu nneɛma a atwa yɛn ho ahyia no nyinaa mu 

Electric Coin Company ne Protocol Labs, Filecoin Foundation, ɛne Ethereum Foundation ayɛ apam de rehwehwɛ Halo R&D mu. Saa nhyehyɛe yi botae yɛ sɛ ɛbɛboa ma wɔn a wɔwɔ saa kɔmputa no so anya ahobanbɔ pa wɔ nneɛma pii ho na wɔanya ahotɔ kɛse wɔ Intanɛt 3.0.

Bio nso, Halo 2 wɔ [MIT ne Apache 2.0 open-source licenses ase.](https://github.com/zcash/halo2#readme), kyerɛ sɛ obiara a ɔwɔ ecosystem no mu betumi de proving system asi dan.

### Filecoin

Since its deployment, the halo2 library has been adopted in projects like the zkEVM, there is potential integration of Halo 2 into the proof system for the Filecoin Virtual Machine. Filecoin requires numerous costly proofs of spacetime / proofs of replication. Halo2 will be pivotal in compressing the space usage, better scaling the network.

[Filecoin Foundation video a ɛne Zooko wɔ no]](https://www.youtube.com/watch?v=t4XOdagc9xw)

Additionally, it would be highly beneficial to both the Filecoin and Zcash ecosystems if Filecoin storage payments could be made in ZEC, affording the same level of privacy for storage purchases that exists in Zcash shielded transfers. This support would add the ability to encrypt files in Filecoin storage and add support to mobile clients so that they could **attach** media or files to a Zcash encrypted memo. 

[ECC x Filecoin Nkrataafa a Ɛwɔ Adansedie mu]](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Ethereum ne ɔmo kaseɛbɔ

Halo 2 proof a wɔde reyɛ adwuma ama Verifiable Delay Function (VDF) no. VDF yɛ biribi a wɔadi kan ayɛ de akyerɛkyerɛ nsɛm mu, na ɛwɔ dwuma pii. 

Wobetumi de adi dwuma sɛ abɛɛfo atirimpɔ a wɔde di dwuma wɔ nyansahyɛ dwumadie mu ne akannifoɔ abatoɔ wɔ Ethereum & nhyehyɛeɛ afoforo so.

ECC, Filecoin Foundation, Protocol Labs ne Ethereum Foundation nso bɛyɛ adwuma wɔ [SupraNational] so.](https://www.supranational.net/), a ɔyɛ hardware-accelerated cryptography ho adwuma no, na ɔde ne nsa ahyɛ GPU ne ASIC dwumadie mu.

[Yareɛ a wɔhwɛ so bɔ wɔn ho ban ne nhwehwɛmu no]](https://appliedzkp.org/) is also researching different ways Halo 2 proofs can improve privacy and scalability for the Ethereum ecosystem. This group rolls up to the Ethereum foundation, and has a broad focus on zero-knowledge proofs and cryptographic primitives. 

## Nnwumakuo a wɔde Halo di dwuma foforɔ

+ [Anoma, ahintasɛm a ɛhwɛ atomic swap protocol so wɔ mprɛte pii mu no]](https://anoma.net/blog/an-introduction-to-zk-snark-plonkup)

+ [Oribis, a L2 zkRollup on Cardano]](https://docs.orbisprotocol.com/orbis/technology/halo-2)

+ [Darkfi, L1 zkEVM blockchain a wɔn ankasa yɛ no]](https://darkrenaissance.github.io/darkfi/architecture/architecture.html)

+ [Scroll, a L2 zkRollup wɔ Ethereum so]](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k)


**Nkɔso Adesua**:

[Nneɛma a wɔde ba zkp ne halo 2 ho - Hanh Huynh Huu]](https://www.youtube.com/watch?v=jDHWJLjQ9oA)

[Halo 2 a Daira ne Str4d - ZKPodcast ka ho]](https://www.youtube.com/watch?v=-lZH8T5i-K4)

[Nsɛm a wɔaka afa mfidie ho]](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)

[Halo 2 Community Showcase - Ying Tong @Zcon3]](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

*Nkrataa ahodoɔ a etwa sɛ yɛhyehyɛ wɔ kasa ahodoɔ mu*

[Halo 2 nneɛma a ɛwɔ hɔ no]](https://github.com/adria0/awesome-halo2)

[Halo 2 docs]](https://zcash.github.io/halo2/)

[Halo 2 github]](https://github.com/zcash/halo2)
