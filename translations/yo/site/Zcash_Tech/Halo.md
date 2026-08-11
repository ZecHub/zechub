<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo


## What is Halo?

Halo jẹ a trustless, recursive zero-imọ ẹri (ZKP) awari nipa Sean Bowe ni Electric Coin Co. O eliminates awọn gbẹkẹle iṣeto ati ki o gba tobi scalability ti Zcash blockchain. halo wà akọkọ odo ìmọ ẹri eto eyi ti o wa mejeeji daradara & recursive jakejado kà bi kan ijinlẹ sayensi breakthrough.

![halo](/content-images/_unavailable.svg "halo")


Àwọn ohun èlò inú rẹ̀

Àtòjọ Ìdánilójú Ọ̀pọ̀lọ́nà tó ṣe ṣókí: Ó ń jẹ́ kí olùdáwọ́ láti dáwọ́ lé ọ̀pọ́n-ọ̀rọ̀ pẹlú ìlà kúkúrú tí a lè lò fún àyẹwò láti fi ẹrí hàn pé àwọn ìdámòye ti wọlé dé bá òpónà náà.

Polynomial Interactive Oracle Proof: Verifier béèrè prover (algorithm) lati ṣii gbogbo awọn adehun ni orisirisi ojuami ti wọn yan lilo eto adehun polynomials & ṣe ayẹwo idanimọ jẹ otitọ laarin wọn. 


### Kò sí Àdásílẹ̀ Ìgbéga kankan

zkSNARKs gbekele lori kan wọpọ itọkasi okun (CRS) bi a gbangba paramita fun fi & verifying. yi CRS gbọdọ wa ni ipilẹṣẹ tẹlẹ nipa ohun gbẹkẹle ẹgbẹ. titi laipe, elaborated ailewu multi-apakan iṣiro (MPC) bi awon ti ṣe nipasẹ Aztec nẹtiwọki & Zcash won pataki lati din awọn ewu lowo nigba yi [gbẹkẹle ṣeto ayeye](https://zkproof.org/2021/06/30/setup-ceremonies/amp/). 

Previously Zcash's Sprout & Sapling shielded pools utilised the BCTV14 & Groth 16 zk-proving systems. While these were secure there were limitations. They were not scalable as they were tied to a single application, the "toxic waste" (remnants from cryptographic material generated during the genesis ceremony) could persist, and there was an element of trust (albeit minute) for users to deem the ceremony acceptable.

By repeatedly collapsing multiple instances of hard problems together over cycles of elliptic curves so that computational proofs can be used to reason about themselves efficiently (Nested amortization) the need for a trusted setup is eliminated. This also means that the structured reference string (output from ceremony) is upgradeable enabling applications such as smart contracts.

Halo provides users with two important assurances regarding the security of the large-scale zero-knowledge proof system. Firstly, it enables users to prove that no one who was involved in the genesis ceremony has created a secret backdoor to execute fraudulent transactions. Secondly, it allows users to demonstrate that the system has remained secure over time, even as it has undergone updates and changes.

[Sean Bowes Explainer on Dystopia Labs] Àwọn ojúewé wọ̀nyí jápọ̀ mọ́ "Àwòrán Àgbáyé" (ìròyìn)](https://www.youtube.com/watch?v=KdkVTEHUxgo) 
 


### Àwọn Àrídájú Ìyípadà sípò Ọ̀tun

Àdàkọ ẹ̀rí tí ó ń padà sẹ́yìn jẹ kí ẹ̀jẹ kan ṣoṣo fi hàn pé àwọn àfihàn mìíràn tó fẹrẹẹ máà ní ìkángun tòótọ, èyí sì fún ọ láyè láti kó iye ńlá ti ìṣirò (ati ìmọ) jọ. Èyí ni ohun pàtàkì nínú ètò-ìyípadà síbi tí a lè yípo rẹ̀ dé, kì í ṣe nítorí wípé o fàyè gbà wá láti gbé oríṣiríṣi nẹtiwọọki kalẹ lọ sápá òsì nígbàtí ó ṣì gba àwùjọ ènìyàn laaye lati gbẹkẹle àìlábààkùsílẹ̀ apá yòókù lára nẹtọọkì náà.

Ṣaaju ki o to Halo, aṣeyọri recursive ẹri akopọ beere tobi iṣiro inawo ati a gbẹkẹle ṣeto. Ọkan ninu awọn akọkọ àwárí je kan ilana ti a npe ni ** nested amortization** . Yi ọna faye gba fun recursive akopọ lilo awọn polynomial adehun eto da lori inu ọja ariyanjiyan , massively imudarasi on iṣẹ ṣiṣe ati yago fun awọn gbẹkẹlé setup.

Nínú [ìwé Halo](https://eprint.iacr.org/2019/1021.pdf), a ṣe apejuwe eto ifaramọ polynomial yii ni kikun ati pe o wa ọna iṣakojọpọ tuntun ti o wa ninu rẹ. Ọna naa gba nọmba nla ti awọn ẹri ti a ṣẹda ominira lati jẹrisi fere bi iyara bi idanwo ẹri kan ṣoṣo. Eyi nikan yoo funni ni yiyan to dara julọ si zk-SNARKs tẹlẹ lo Zcash .


### Halo 2 (ìmọ̀lára)

Halo 2, jẹ iṣẹ ṣiṣe giga zk-SNARK ti a kọ ni Rust eyiti o yọ iwulo fun iṣeto igbẹkẹle lakoko ṣeto ipele fun scalability ni Zcash. 

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

It includes a generalization of our approach called an **accumulation scheme**. This new formalization exposes how our nested amortization technique actually works; by adding proofs to an object called an **accumulator,** where the proofs reason about the previous state of the accumulator, we can check that all previous proofs were correct (by induction) simply by checking the current state of the accumulator.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>



Ni igbakanna, ọpọlọpọ awọn ẹgbẹ miiran n ṣe awari Awọn IOPs Polynomial tuntun ti o munadoko diẹ sii ju Sonic (ti a lo ni Halo 1), bii Marlin. 

Awọn julọ daradara ti awọn wọnyi titun ilana ni PLONK, eyi ti o funni nla irọrun ninu oniru munadoko imuse da lori ohun elo-pataki aini ati pese 5x dara akoko Prover lati Sonic.

[Ìsọfúnni nípa PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)


### Báwo ni èyí ṣe ṣàǹfààní fún Zcash?

The Orchard Shielded pool activated with NU5 & is the implementation of this new proof system on the Zcash Network. Guarded by the same turnstile design as used between Sprout and Sapling with the intent to gradually retire the older shielded pools. This encourages migration to a fully trustless proof system, reinforcing confidence in the soundness of the monetary base, and reducing the implementation complexity and attack surface of Zcash overall. Following the activation of NU5 mid 2022, integration of recursive proofs became possible (although this is not complete). Several privacy enhancements were also made tangentially. The introduction of 'Actions' to replace inputs/outputs helped reducing the amount of transaction metadata. 

Awọn iṣeto ti o gbẹkẹle jẹ nira lati ṣe ifowosowopo & ṣafihan ewu eto. O yoo jẹ dandan lati tun wọn ṣe fun igbesoke ilana pataki kọọkan. Yiyọ wọn ni ilọsiwaju nla kan fun imuse ailewu awọn igbesẹ tuntun titun. 

Àdàkọ ẹri àtúnṣe ní agbára láti ṣe ìfọwọ́sọ̀rọ̀ àìmọye ìṣirò, kíkóda àwọn ètò tí a pín káàkiri tó ṣeé ṣàyẹwò, èyí sì mú Zcash lágbára gidigidi pàápàá pẹ̀lú yípadà sí Ẹrí Ìpín. Èyí tún wúlò fún àwọn ìtèsíwájú bí Àwọn Ohun-ìní Aṣọ́ra ti Zcash àti títún Agbára Layer 1 gbé lárugẹ ni òpin gíga lílò gbogbo nóù nínú ọdún díbọ̀ fun Zcash.


## Halo in the wider ecosystem 

The Electric Coin Company ti wọle si adehun pẹlu Protocol Labs, Filecoin Foundation ati Ethereum Foundation lati ṣawari Halo R&D, pẹlu bi imọ-ẹrọ ṣe le ṣee lo ninu awọn nẹtiwọọki wọn. Adehun naa ni ifọkansi lati pese iwọn didun to dara julọ, ibaramu ati asiri kọja ilolupo eda abemi ati fun Wẹẹbu 3.0.

Ni afikun, Halo 2 wa labẹ awọn [MIT ati Apache 2.0 orisun-orisun iwe aṣẹ](https://github.com/zcash/halo2#readme), tí ó túmọ̀ sí pé ẹnikẹ́ni nínú ètò àyíká lè kọ́lé pẹ̀lú ìlànà ìfiwéra.

### Filecoin (ìyẹn owó ẹyọ)

Lati igba ti a gbe e jade, ile-ikawe halo2 ni wọn gba ninu awọn iṣẹ bii zkEVM. O ṣee ṣe lati ṣajọ Halo 2 sinu eto ẹri fun Filecoin Virtual Machine .Filecoin nilo ọpọlọpọ awọn idaniloju iyebiye ti aaye / akoko itẹwọgba.Halo2 yoo jẹ pataki ni sisun lilo aye, titobi nẹtiwọki daradara.

[Filecoin Foundation fídíò pẹ̀lú Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw)

Additionally, it would be highly beneficial to both the Filecoin and Zcash ecosystems if Filecoin storage payments could be made in ZEC, affording the same level of privacy for storage purchases that exists in Zcash shielded transfers. This support would add the ability to encrypt files in Filecoin storage and add support to mobile clients so that they could **attach** media or files to a Zcash encrypted memo. 

[ECC x Filecoin Blog Post] Àwọn ojúewé wọ̀nyí jápọ̀ mọ́ "Ec" (ìmọ̀)](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Ethereum (ìyẹn owó ẹyọ)

Ìmúṣẹ ti ẹri Halo 2 fun iṣẹ ṣiṣe Verifiable Delay Function (VDF) ni idagbasoke. VDF jẹ aṣiṣe cryptographic kan ti o ni ọpọlọpọ awọn ọran lilo agbara. 

O le ṣee lo bi orisun ti gbogbogbo idi randomness pẹlu lilo ni smati adehun ohun elo bii olori yiyan ninu Ẹri ti Igbese lori Ethereum & awọn ilana miiran.

ECC, Ile-iṣẹ Filecoin Foundation, Awọn ile-iṣelọpọ Protocol Labs ati Ẹgbẹ Ethereum yoo tun ṣiṣẹ pẹlu [SupraNational](https://www.supranational.net/), olutaja ti o ṣe amọja ni ohun elo-iṣẹ cryptography, fun GPU ati ASIC apẹrẹ agbara ati idagbasoke VDF.

[Awọn ẹgbẹ ti Iwadii Asiri ati Ṣiṣe iwọn](https://appliedzkp.org/) tun n ṣe iwadi awọn ọna oriṣiriṣi ti ẹri Halo 2 le mu aṣiri ati iwọn didun pọ si fun eto ilolupo Ethereum. Ẹgbẹ yii ṣan soke si ipilẹ Ethereum, o ni idojukọ gbooro lori awọn idaniloju imọ-kukuru ati awọn primitives cryptographic. 

## Àwọn iṣẹ́ míì tí wọ́n ń lo Halo

+ [Anoma, Àdéhùn ìyípadà atomiki tí ó ní ẹ̀rọ-ìmọ́lẹ̀ tó pọ̀ lọ́nà púpọ̀ ti ń dáàbò bo àṣírí](https://anoma.net/blog/an-introduction-to-zk-snark-plonkup)

+ [Oribis, ohun L2 zkRollup lori Cardano](https://docs.orbisprotocol.com/orbis/technology/halo-2)

+ [Darkfi, a ikọkọ L1 zkEVM blockchain](https://darkrenaissance.github.io/darkfi/architecture/architecture.html)

+ [Iyípadà, a L2 zkRollup on Ethereum](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k)


**Ìkẹ́kọ̀ọ́ síwájú sí i**:

[ìdásílẹ̀ sí zkp àti halo 2 - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)

[Halo 2 pẹ̀lú Daira & Str4d - ZKPodcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)

[Ìwé Àlàyé nípa Ìmòye](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)

[Halo 2 Community Showcase - Ying Tong @Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Ìwé-ìfiweranṣẹ**

[Àwọn ohun àmúṣọrọ̀ Halo 2](https://github.com/adria0/awesome-halo2)

[Àwọn ìwé ìròyìn Halo 2](https://zcash.github.io/halo2/)

[Halo 2 github ì í ë ¤ì 'í ̧ë¦¬](https://github.com/zcash/halo2)
