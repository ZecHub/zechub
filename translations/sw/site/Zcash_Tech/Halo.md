<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo


## Halo ni nini?

Halo ni trustless, recursive zero-maarifa ushahidi (ZKP) aligundua na Sean Bowe katika Electric Coin Co. Inaondoa kuaminiwa kuanzisha na inaruhusu scalability zaidi ya Zcash blockchain. Halo alikuwa wa kwanza sifuri maarifa ushahidi mfumo kwamba ni wote ufanisi & recursive sana kuchukuliwa kama mafanikio ya kisayansi.

[Halo](https://electriccoin.co/wp-content/uploads/2021/01/Halo-on-Z-1440x720.png "halo")


** Viungo**

Muhtasari Polynomial Commitment Scheme: Inaruhusu committer kujitolea kwa polynominal na mkondo mfupi ambayo inaweza kutumika na verifier kuthibitisha madai tathmini ya kujitolela polynomials.

Polynomial Interactive Oracle uthibitisho: Verifier anauliza prover (algorithm) kufungua ahadi zote katika pointi mbalimbali ya uchaguzi wao kwa kutumia polynominal ahadi mpango & hundi utambulisho inashikilia kweli kati yao. 


### Hakuna Confidence Setup

zkSNARKs kutegemea mstari wa kawaida rejea (CRS) kama parameter umma kwa kuthibitisha & kuthibitisha. CRS hii lazima kuzalishwa mapema na chama kuaminiwa. Hadi hivi karibuni, elaborate salama mahesabu multi-party (MPC) kama wale uliofanywa na Aztec mtandao & Zcash walikuwa muhimu ili kupunguza hatari inayohusika wakati huu [kuaminiwa sherehe ya kuanzisha]](https://zkproof.org/2021/06/30/setup-ceremonies/amp/). 

Zcash's Sprout & Sapling shielded pools utilized the BCTV14 & Groth 16 zk-proving systems. Wakati hizi zilikuwa salama kulikuwa na mapungufu. Hazikupangwa kama zilikuwa zimefungwa kwa programu moja, "takataka za sumu" (mabaki kutoka kwa nyenzo ya cryptographic iliyotengenezwa wakati wa sherehe ya genesis) inaweza kuendelea, na kulikuwa na kipengele cha uaminifu (ingawa dakika) kwa watumiaji kuamua sherehe inakubalika.

By repeatedly collapsing multiple instances of hard problems together over cycles of elliptic curves so that computational proofs can be used to reason about themselves efficiently (Nested amortization) the need for a trusted setup is eliminated. This also means that the structured reference string (output from ceremony) is upgradeable enabling applications such as smart contracts.

Halo hutoa watumiaji na uhakikisho mbili muhimu kuhusu usalama wa ukubwa wa zero-maarifa uthibitisho mfumo. Kwanza, ni kuwawezesha watumizi kuthibitisha kwamba hakuna mtu ambaye alikuwa kushiriki katika sherehe genesis imeunda siri backdoor kutekeleza shughuli udanganyifu. Pili, ni inaruhusu watumiaje kuonyesha kwamba mfumo imebaki salama kwa muda, hata kama imekuwa kupitia updates na mabadiliko.

[Sean Bowes Mfafanuzi juu ya Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo) 
 


### Ushuhuda Recursive

Recursive proof composition allows a single proof to attest to the correctness of practically unlimited other proofs, allowing a large amount of computation (and information) to be compressed. This is an essential component for scalablilty, not least because it allows us to horizontally scale the network while still allowing pockets of participants to trust the integrity of the remainder of the network.

Prior to Halo, achieving recursive proof composition required large computational expense and a trusted setup. One of the main discoveries was a technique called **nested amortization**. This technique allows for recursive composition using the polynomial commitment scheme based on inner product argument, massively improving on performance and avoiding the trusted setup.

Katika [Halo karatasi](https://eprint.iacr.org/2019/1021.pdf), sisi kikamilifu ilivyoelezwa mpango huu ahadi polynomial na kugundua mpya mkusanyiko mbinu ilikuwepo ndani yake. mbinu inaruhusu idadi kubwa ya ushahidi kujitegemea kuundwa kuthibitishwa karibu kwa haraka kama kuthibitisha ushahidi moja. Hii peke yake ingekuwa kutoa mbadala bora kwa zk-SNARKs mapema kutumika katika Zcash.


### Halo 2

Halo 2, ni high-utendaji zk-SNARK utekelezaji imeandikwa katika kutu ambayo huondoa haja ya kuaminika kuanzisha wakati kuweka hatua kwa scalability katika Zcash. 

<a href="">
    <img src="https://electriccoin.co/wp-content/uploads/2020/09/Halo-puzzle-03-1024x517.jpg" alt="" width="500" height="300"/>
</a>

It includes a generalization of our approach called an **accumulation scheme**. This new formalization exposes how our nested amortization technique actually works; by adding proofs to an object called an **accumulator,** where the proofs reason about the previous state of the accumulator, we can check that all previous proofs were correct (by induction) simply by checking the current state of the accumulator.

<a href="">
    <img src="https://i.imgur.com/l4HrYgE.png" alt="" width="500" height="300"/>
</a>



Kwa sambamba, timu nyingine nyingi walikuwa kugundua mpya Polynomial IOPs kwamba walikuwa ufanisi zaidi kuliko Sonic (kutumika katika Halo 1), kama vile Marlin. 

ufanisi zaidi ya hizi itifaki mpya ni PLONK, ambayo inaruhusu kubadilika kubwa katika kubuni utekelezaji ufanisi kulingana na mahitaji maalum ya maombi na kutoa 5x bora wakati prover kutoka Sonic.

[Mtazamo wa PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)


### Hii inafaidishaje Zcash?

The Orchard Shielded pool activated with NU5 & is the implementation of this new proof system on the Zcash Network. Guarded by the same turnstile design as used between Sprout and Sapling with the intent to gradually retire the older shielded pools. This encourages migration to a fully trustless proof system, reinforcing confidence in the soundness of the monetary base, and reducing the implementation complexity and attack surface of Zcash overall. Following the activation of NU5 mid 2022, integration of recursive proofs became possible (although this is not complete). Several privacy enhancements were also made tangentially. The introduction of 'Actions' to replace inputs/outputs helped reducing the amount of transaction metadata. 

Configurations kuaminiwa kwa ujumla ni vigumu kuratibu & aliwasilisha hatari ya mfumo. Itakuwa muhimu kurudia yao kwa kila upgrading kuu itifaki. Kuondoa yao inatoa kuboresha kubwa kwa ajili ya usalama kutekeleza upgrades mpya itifaki . 

Recursive proof composition holds the potential for compressing unlimited amounts of computation, creating auditable distributed systems, making Zcash highly capable particularly with the shift to Proof of Stake. This is also useful for extensions such as Zcash Shielded Assets and improving Layer 1 capacity at the higher end of full node usage in the coming years for Zcash.


## Halo katika mazingira ya jumla 

The Electric Coin Company has entered into an agreement with Protocol Labs, the Filecoin Foundation, and the Ethereum Foundation to explore Halo R&D, including how the technology might be used in their respective networks. The agreement aims to provide better scalability, interoperability and privacy across ecosystems and for Web 3.0.

Aidha, Halo 2 ni chini ya [MIT na Apache 2.0 wazi chanzo leseni](https://github.com/zcash/halo2#readme), maana mtu yeyote katika mazingira inaweza kujenga na kuthibitisha mfumo.

### Filecoin

Since its deployment, the halo2 library has been adopted in projects like the zkEVM, there is potential integration of Halo 2 into the proof system for the Filecoin Virtual Machine. Filecoin requires numerous costly proofs of spacetime / proofs of replication. Halo2 will be pivotal in compressing the space usage, better scaling the network.

[Filecoin Foundation video na Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw)

Additionally, it would be highly beneficial to both the Filecoin and Zcash ecosystems if Filecoin storage payments could be made in ZEC, affording the same level of privacy for storage purchases that exists in Zcash shielded transfers. This support would add the ability to encrypt files in Filecoin storage and add support to mobile clients so that they could **attach** media or files to a Zcash encrypted memo. 

[ECC x Filecoin Blog Post](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Ethereum

Utekelezaji wa Halo 2 uthibitisho kwa ufanisi Verifiable Delay Kazi (VDF) kuwa maendeleo. VDF ni cryptographic primitive kwamba ina kesi nyingi matumizi ya uwezo. 

Inaweza kutumika kama chanzo cha kusudi la jumla randomness ikiwa ni pamoja na matumizi katika maombi smart mkataba kama vile kiongozi uchaguzi katika uthibitisho wa hisa juu ya Ethereum & itifaki nyingine.

ECC, Filecoin Foundation, Protocol Labs, na Ethereum Foundation pia itakuwa kazi na [SupraNational](https://www.supranational.net/), muuzaji maalumu katika vifaa vya kasi cryptography, kwa uwezo GPU na ASIC kubuni na maendeleo ya VDF.

[Privacy na Scaling Utafiti Group](https://appliedzkp.org/) ni pia kutafiti njia tofauti Halo 2 uthibitisho unaweza kuboresha faragha na scalability kwa Ethereum mazingira. kundi hili rolls up kwa Ethereum msingi, na ina lengo pana juu ya zero-maarifa uthibitishaji na cryptographic primitives. 

## Miradi mingine kutumia Halo

+ [Anoma, faragha kuhifadhi multichain atomic swap itifaki](https://anoma.net/blog/an-introduction-to-zk-snark-plonkup)

+ [Oribis, L2 zkRollup juu ya Cardano](https://docs.orbisprotocol.com/orbis/technology/halo-2)

+ [Darkfi, binafsi L1 zkEVM blockchain](https://darkrenaissance.github.io/darkfi/architecture/architecture.html)

+ [Scroll, L2 zkRollup juu ya Ethereum](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k)


**Kujifunza zaidi**:

[Kuanzishwa kwa zkp na halo 2 - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)

[Halo 2 na Daira & Str4d - ZKPodcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)

[Ufundi Explainer Blog](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)

[Halo 2 Jumuiya Showcase - Ying Tong @ Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

** Nyaraka **

[Halo 2 rasilimali](https://github.com/adria0/awesome-halo2)

[Halo 2 docs](https://zcash.github.io/halo2/)

[Halo 2 github](https://github.com/zcash/halo2)
