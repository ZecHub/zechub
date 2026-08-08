<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo (Habari Njema)


## Halo ni nini?

Halo ni trustless, recursive zero-ujuzi ushahidi (ZKP) aligundua na Sean Bowe katika Electric Coin Co. Inaondoa kuaminiwa kuweka na inaruhusu scalability zaidi ya Zcash blockchain. Halo ilikuwa kwanza sifuri maarifa uthibitisho mfumo kwamba wote ufanisi & recursive sana kuchukuliwa kama mafanikio kisayansi.

![halo](/content-images/_unavailable.svg "halo")


** Viungo**

Muhtasari Polynomial Commitment Scheme: Inaruhusu committer kujitolea kwa polynomials na mkondo mfupi ambayo inaweza kutumika na kuthibitisha ili kuhakikisha tathmini alidai ya waliojitoa polynominal.

Polynomial Interactive Oracle Proof: Verifier anauliza prover (algoritm) kufungua ahadi zote katika pointi mbalimbali ya uchaguzi wao kwa kutumia polynomials mpango wa dhamira na hundi utambulisho inashikilia kweli kati yao. 


### Hakuna Confidence Setup

zkSNARKs kutegemea kawaida rejea string (CRS) kama parameter umma kwa kuthibitisha & kuangalia. CRS hii lazima yanayotokana mapema na chama cha kuaminiwa. Hadi hivi karibuni, elaborate salama mahesabu ya pande nyingi (MPC) kama wale uliofanywa na Aztec mtandao & Zcash walikuwa muhimu ili kupunguza hatari inayohusika wakati huu [kuaminika sherehe setup]](https://zkproof.org/2021/06/30/setup-ceremonies/amp/). 

Zcash's Sprout & Sapling shielded pools utilized the BCTV14 & Groth 16 zk-proving systems. Wakati hizi zilikuwa salama kulikuwa na mapungufu. Hazikupangwa kama walivyofungwa kwa programu moja, "takataka za sumu" (mabaki kutoka nyenzo ya cryptographic iliyotengenezwa wakati wa sherehe ya genesis) inaweza kuendelea, na kuna kipengele cha uaminifu (ingawa dakika) kwa watumiaji kuamua sherehe inakubalika.

By repeatedly collapsing multiple instances of hard problems together over cycles of elliptic curves so that computational proofs can be used to reason about themselves efficiently (Nested amortization) the need for a trusted setup is eliminated. This also means that the structured reference string (output from ceremony) is upgradeable enabling applications such as smart contracts.

Halo hutoa watumiaji na uhakikisho mbili muhimu kuhusu usalama wa kiwango kikubwa cha zero-ujuzi uthibitishaji mfumo. Kwanza, inaruhusu watumiaje kuthibitisha kwamba hakuna mtu ambaye alikuwa kushiriki katika sherehe genesis imeunda siri backdoor kutekeleza shughuli za udanganyifu. Pili, inaruhusu watumiaja kuonyesha kuwa mfumo umebaki salama kwa muda mrefu, hata kama imekuwa kupitia updates na mabadiliko. Tatu, ni uwezo wake kuimarisha utetezi ya data yake juu ya uendeshaji wa mali isiyohamishika (kama vile usiri) wakati wote. Tano la tatu, inatoa huduma ambayo inaweza kuhakikisha kwamba mchakato huo unaendelea vizuri zaidi kuliko ile iliyopo sasa.

[Sean Bowes Mfafanuzi juu ya Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo) 
 


### Ushuhuda wa Recursive

Utungaji wa uthibitisho recursive inaruhusu ushahidi moja kuthibitisha usahihi wa karibu ukomo ushuhuda wengine, kuruhusu kiasi kikubwa cha hesabu (na habari) kuwa compressed. Hii ni sehemu muhimu kwa scalability, si angalau kwa sababu inatuwezesha horizontally kiwango mtandao wakati bado kuruhusu mifuko ya washiriki kuamini uadilifu wa mapumziko ya mtandao.

Prior to Halo, achieving recursive proof composition required large computational expense and a trusted setup. One of the main discoveries was a technique called **nested amortization**. This technique allows for recursive composition using the polynomial commitment scheme based on inner product argument, massively improving on performance and avoiding the trusted setup.

Katika [Halo karatasi](https://eprint.iacr.org/2019/1021.pdf), sisi kikamilifu ilivyoelezwa mpango huu ahadi polynomial na kugundua mpya mkusanyiko mbinu zipo ndani yake. Mbinu inaruhusu idadi kubwa ya ushahidi kujitegemea kuundwa kuthibitishwa karibu kwa haraka kama kuangalia uthibitisho moja. Hii peke yake ingekuwa kutoa njia bora badala ya zk-SNARKs mapema kutumika katika Zcash.


### Halo 2

Halo 2, ni high-utendaji zk-SNARK utekelezaji imeandikwa katika kutu ambayo huondoa haja ya kuaminika usanidi wakati kuweka hatua kwa scalability katika Zcash. 

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

It includes a generalization of our approach called an **accumulation scheme**. This new formalization exposes how our nested amortization technique actually works; by adding proofs to an object called an **accumulator,** where the proofs reason about the previous state of the accumulator, we can check that all previous proofs were correct (by induction) simply by checking the current state of the accumulator.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>



Kwa sambamba, timu nyingine nyingi walikuwa kugundua mpya Polynomial IOPs kwamba walikuwa ufanisi zaidi kuliko Sonic (kutumika katika Halo 1), kama vile Marlin. 

ufanisi zaidi ya hizi itifaki mpya ni PLONK, ambayo inaruhusu kubadilika kubwa katika kubuni utekelezaji wa ufanisi kulingana na mahitaji maalum maombi na kutoa 5x bora wakati prover kutoka Sonic.

[Mtazamo wa PLONK]](https://www.youtube.com/watch?v=P1JeN30RdwQ)


### Hii inafaidi Zcash vipi?

The Orchard Shielded pool activated with NU5 & is the implementation of this new proof system on the Zcash Network. Guarded by the same turnstile design as used between Sprout and Sapling with the intent to gradually retire the older shielded pools. This encourages migration to a fully trustless proof system, reinforcing confidence in the soundness of the monetary base, and reducing the implementation complexity and attack surface of Zcash overall. Following the activation of NU5 mid 2022, integration of recursive proofs became possible (although this is not complete). Several privacy enhancements were also made tangentially. The introduction of 'Actions' to replace inputs/outputs helped reducing the amount of transaction metadata. 

Kuaminiwa kuanzisha ni kwa ujumla vigumu kuratibu & aliwasilisha hatari ya mfumo. Itakuwa muhimu ili kurudiwa yao kila kuu upgrading itifaki. Kuondoa wao inatoa kuboresha kubwa kwa usalama kutekeleza mpya protocol upgrades. 

Recursive proof composition holds the potential for compressing unlimited amounts of computation, creating auditable distributed systems, making Zcash highly capable particularly with the shift to Proof of Stake. This is also useful for extensions such as Zcash Shielded Assets and improving Layer 1 capacity at the higher end of full node usage in the coming years for Zcash.


## Halo katika mazingira ya jumla 

The Electric Coin Company has entered into an agreement with Protocol Labs, the Filecoin Foundation, and the Ethereum Foundation to explore Halo R&D, including how the technology might be used in their respective networks. The agreement aims to provide better scalability, interoperability and privacy across ecosystems and for Web 3.0.

Aidha, Halo 2 ni chini ya [MIT na Apache 2.0 wazi chanzo leseni](https://github.com/zcash/halo2#readme), maana mtu yeyote katika mazingira unaweza kujenga na kuthibitisha mfumo.

### Filecoin

Since its deployment, the halo2 library has been adopted in projects like the zkEVM, there is potential integration of Halo 2 into the proof system for the Filecoin Virtual Machine. Filecoin requires numerous costly proofs of spacetime / proofs of replication. Halo2 will be pivotal in compressing the space usage, better scaling the network.

[Filecoin Foundation video na Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw)

Aidha, itakuwa yenye manufaa kwa wote Filecoin na Zcash mazingira kama malipo ya kuhifadhi Filecoin inaweza kufanywa katika ZEC, kutoa kiwango sawa cha faragha kwa ajili ya ununuzi wa hifadhi kwamba ipo katika uhamisho Zcash ulinzi. msaada huu kuongeza uwezo encrypt files katika Hifadhi Filecoins na kuongeza msaada kwa wateja mkononi ili waweze **attach** vyombo vya habari au faili za memo Zcash encryption. 

[ECC x Filecoin Blog Post] Kuweka na kuhamisha fedha kutoka kwa akaunti yako ya benki.](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Ethereum (Ethereum)

Utekelezaji wa Halo 2 uthibitisho kwa ufanisi Verifiable Delay Kazi (VDF) kuwa maendeleo. VDF ni cryptographic primitive kwamba ina kesi nyingi matumizi ya uwezo. 

Inaweza kutumika kama chanzo cha kusudi la jumla randomness ikiwa ni pamoja na matumizi katika maombi smart mkataba kama vile kiongozi uchaguzi katika uthibitisho wa hisa juu ya Ethereum & itifaki nyingine.

ECC, Filecoin Foundation, Protocol Labs na Ethereum Foundation pia watafanya kazi pamoja [SupraNational]](https://www.supranational.net/), muuzaji maalumu katika vifaa-haraka encryption, kwa uwezo GPU na ASIC kubuni na maendeleo ya VDF.

[Usiri na Scaling Utafiti Group]](https://appliedzkp.org/) Pia ni kutafiti njia tofauti Halo 2 uthibitisho unaweza kuboresha faragha na scalability kwa Ethereum mazingira. kundi hili rolls up ya msingi Ethereum, na ina lengo pana juu zero-ujuzi ushahidi na cryptographic primitives. 

## Miradi mingine kutumia Halo

+ [Anoma, faragha kuhifadhi multichain atomic kubadilishana itifaki](https://anoma.net/blog/an-introduction-to-zk-snark-plonkup)

+ [Oribis, L2 zkRollup juu ya Cardano](https://docs.orbisprotocol.com/orbis/technology/halo-2)

+ [Darkfi, binafsi L1 zkEVM blockchain](https://darkrenaissance.github.io/darkfi/architecture/architecture.html)

+ [Scroll, L2 zkRollup juu ya Ethereum](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k)


**Kujifunza zaidi**:

[Kuanzishwa kwa ZKP na Halo 2 - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)

[Halo 2 na Daira & Str4d - ZKPodcast]](https://www.youtube.com/watch?v=-lZH8T5i-K4)

[Technical Explainer Blog] (Kifungu cha Maelezo ya Ufundi)](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)

[Halo 2 Jumuiya ya kuonyesha - Ying Tong @ Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

** Nyaraka**

[Halo 2 rasilimali]](https://github.com/adria0/awesome-halo2)

[Halo 2 docs](https://zcash.github.io/halo2/)

[Halo 2 github](https://github.com/zcash/halo2)
