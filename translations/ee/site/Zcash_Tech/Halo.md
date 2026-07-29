<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo


## Nukae nye Halo?

Halo nye kakaɖedzimanɔamesi, si gbugbɔna zero-sidzedze kpeɖodzi (ZKP) si ŋu Sean Bowe ke ɖo le Electric Coin Co. Eɖea ɖoɖo si dzi woka ɖo la ɖa eye wòɖea mɔ na Zcash blockchain ƒe scalability geɖe wu. Halo nye gbãtɔ zero-sidzedze kpeɖodzi ɖoɖo si nye siaa efficient & recursive ame geɖe bu be enye dzɔdzɔmeŋutinunya ƒe ŋgɔyiyi.

![halo](https://electriccoin.co/wp-content/uploads/2021/01/Halo-on-Z-1440x720.png "halo")


**Akpa siwo le eme**

Succinct Polynomial Commitment Scheme: Enaa mɔ na committer be wòatsɔ eɖokui ana polynomial si me ka kpui aɖe le si verifier ateŋu azã atsɔ aɖo kpe committed ƒe dodokpɔ siwo wogblɔ be wowɔ dzi.

Polynomial Interactive Oracle Proof: Verifier bia tso prover (algorithm) si be wòaʋu adzɔgbeɖeɖewo katã le teƒe vovovo siwo wotia to polynomial commitment scheme zazã me & léa ŋku ɖe identity holds true le wo dome ŋu. 


### Ðoɖo aɖeke Meli si Dzi Woka Ðo O

zkSNARKs ɖoa ŋu ɖe nufiame ka si bɔ (CRS) ŋu abe dutoƒonukpɔkpɔ ene hena kpeɖodzi & kpeɖodzi. Ele be ame aɖe si dzi woka ɖo nawɔ CRS sia do ŋgɔ. Vaseɖe nyitsɔ laa la, akɔntabubu siwo me kɔ nyuie siwo me ame geɖe le (MPC) abe esiwo Aztec network & Zcash wɔna ene la hiã be woatsɔ aɖe afɔku si le eme le ɖoɖo sia [ɖoɖowɔwɔ ƒe wɔna si dzi woka ɖo me dzi akpɔtɔ](https://zkproof.org/2021/06/30/setup-ceremonies/amp/). 

Tsã la, Zcash ƒe Sprout & Sapling takpɔƒe siwo wotsɔ akpoxɔnu wɔe la zãa BCTV14 & Groth 16 zk-proving systems. Togbɔ be nusiawo nɔ dedie hã la, seɖoƒewo nɔ anyi. Womete ŋu trɔa asi le wo ŋu o elabena wobla wo ɖe dɔwɔwɔ ɖeka ŋu, "gbeɖuɖɔ si me aɖi le" (siwo susɔ tso nya ɣaɣla siwo wowɔ le gɔmedzedze ƒe wɔnawo me) ate ŋu anɔ anyi, eye kakaɖedzi ƒe akpa aɖe nɔ anyi (togbɔ be aɖabaƒoƒo koe wònye hã) be ezãlawo nabu wɔnaa be esɔ.

To kuxi sesẽwo ƒe kpɔɖeŋu geɖewo ƒoƒo ɖekae enuenu le elliptic curves ƒe tsatsam dzi ale be woate ŋu azã akɔntabubu ƒe kpeɖodziwo atsɔ ade ŋugble le wo ɖokui ŋu nyuie (Nested amortization) megahiã be woaɖo ɖoɖo si dzi woka ɖo o. Esia fia hã be ɖoɖowɔɖi ƒe nufiame ka (si do tso kɔnu me) nye esi woate ŋu atrɔ asi le si naa dɔwɔwɔwo abe smart contracts ene te ŋu trɔna.

Halo naa kakaɖedzi vevi eve ezãlawo ku ɖe sidzedze zero-sidzedze ƒe kpeɖodziɖoɖo gã la ƒe dedienɔnɔ ŋu. Gbã la, enaa ezãlawo te ŋu ɖoa kpe edzi be ame aɖeke si kpɔ gome le gɔmedzedze ƒe wɔnaa me mewɔ megbeʋɔtru aɖe le adzame be woatsɔ awɔ asitsatsa siwo me ameflunyawo le o. Evelia, enaa ezãlawo ɖenɛ fiana be ɖoɖoa gakpɔtɔ le dedie le ɣeyiɣi aɖe megbe, togbɔ be wowɔ asitɔtrɔ kple tɔtrɔwo le eŋu gɔ̃ hã.

[Sean Bowes Numeɖela le Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo) 
 


### Kpeɖodzi Siwo Wogbugbɔ gblɔna

Kpeɖodzi ƒe wɔwɔme si wogbugbɔ ŋlɔna ɖea mɔ na kpeɖodzi ɖeka be wòaɖo kpe kpeɖodzi bubu siwo seɖoƒe meli na o kloe ƒe nyateƒenyenye dzi, si wɔnɛ be woate ŋu aƒo akɔntabubu (kple nyatakaka) gbogbo aɖewo nu ƒu. Esia nye akpa vevi aɖe na scalabilty, menye esi wònaa míete ŋu dzidzea network la le tsia dzi esime wògaɖea mɔ na gomekpɔlawo ƒe kotokuwo be woaka ɖe network la ƒe akpa susɔea ƒe blibonyenye dzi kokoko o.

Do ŋgɔ na Halo la, kpeɖodzi si wogbugbɔna ƒe wɔwɔme gbɔ ɖoɖo bia akɔntabubu ƒe gazazã gã kple ɖoɖo si dzi woka ɖo. Nu vevi siwo ŋu woke ɖo dometɔ ɖekae nye mɔnu aɖe si woyɔna be **nested amortization**. Mɔnu sia ɖea mɔ na nuwɔwɔ gbugbɔgawɔ to polynomial commitment scheme si wotu ɖe ememe nuwɔna ƒe nyaʋiʋli dzi zazã me, si naa dɔwɔwɔ nyona ɖe edzi ŋutɔ eye wòƒoa asa na ɖoɖo si dzi woka ɖo.

Le [Halo ƒe agbalẽa me](https://eprint.iacr.org/2019/1021.pdf), míeƒo nu tso polynomial commitment scheme sia ŋu bliboe eye míekpɔe be aggregation mɔnu yeye aɖe li le eme. Mɔnua na woate ŋu aɖo kpe kpeɖodzi gbogbo aɖewo siwo wowɔ le wo ɖokui si dzi kabakaba abe kpeɖodzi ɖeka dzi dada ene kloe. Esia ɖeɖe dzaa ana mɔnu nyuitɔ si woatsɔ aɖɔli zk-SNARK siwo wozãna tsã le Zcash me.


### Halo 2 lia

Halo 2, nye zk-SNARK dɔwɔwɔ si wɔa dɔ nyuie si woŋlɔ ɖe Rust me si ɖea ɖoɖo si dzi woka ɖo ƒe hiahiã ɖa esime wòle afɔɖeɖe ɖom na scalability le Zcash me. 

<a href="">
    <img src="https://electriccoin.co/wp-content/uploads/2020/09/Halo-puzzle-03-1024x517.jpg" alt="" width="500" height="300"/>
</a>

Elɔ míaƒe mɔnu si woyɔna be **accumulation scheme** ɖe eme. Sedziwɔwɔ yeye sia ɖe alesi míaƒe nested amortization mɔnu wɔa dɔ ŋutɔŋutɔ ɖe go; to kpeɖodziwo tsɔtsɔ kpe ɖe nusi woyɔna be **accumulator,** afisi kpeɖodziawo bua tame tso accumulator ƒe nɔnɔme si nɔ anyi va yi ŋu le la, míate ŋu akpɔe ɖa be kpeɖodzi siwo katã nɔ anyi va yi la sɔ (to induction me) to accumulator la ƒe nɔnɔme si li fifia me dzodzro ko me.

<a href="">
    <img src="https://i.imgur.com/l4HrYgE.png" alt="" width="500" height="300"/>
</a>



Le ɣeyiɣi ma ke me la, ƒuƒoƒo bubu geɖe nɔ Polynomial IOP yeye siwo wɔa dɔ nyuie wu Sonic (si wozã le Halo 1 me), abe Marlin ene, kem. 

Ðoɖo yeye siawo dometɔ si wɔa dɔ nyuie wue nye PLONK, si naa asitɔtrɔ gã aɖe le ɖoɖowɔwɔ ɖe dɔwɔwɔ nyuie ŋu si wotu ɖe dɔwɔwɔ-koŋ ƒe hiahiãwo dzi kple prover ɣeyiɣi si nyo wu 5x nana tso Sonic gbɔ.

[PLONK ƒe nyatakaka kpui aɖe](https://www.youtube.com/watch?v=P1JeN30RdwQ)


### Aleke esia ɖea vi na Zcash?

Orchard Shielded pool si wowɔ dɔ kple NU5 & nye kpeɖodziɖoɖo yeye sia ƒe dɔwɔwɔ le Zcash Network dzi. Wotsɔa ʋuƒo si wotsɔ trɔa asi le nu ŋu ƒe nɔnɔme ma ke si wozã le Sprout kple Sapling dome dzɔna kple susu be yewoaɖe asi le ta xoxo siwo ŋu wokpɔ akpoxɔnu le la ŋu vivivi. Esia dea dzi ƒo na ʋuʋu yi kpeɖodziɖoɖo si dzi womate ŋu aka ɖo bliboe o, si doa ŋusẽ kakaɖedzi le gaxɔa ƒe nyonyome ŋu, eye wòɖea dɔwɔwɔ ƒe sesẽ kple Zcash ƒe amedzidzedze ƒe anyigba bliboa dzi kpɔtɔna. Le NU5 ƒe dɔwɔwɔ le ƒe 2022 ƒe domedome megbe la, kpeɖodzi siwo wogbugbɔ gblɔ ƒe ƒoƒo ƒu va te ŋu dzɔ (togbɔ be esia mede blibo o hã). Wowɔ ame ŋutɔ ƒe nyawo ƒe nyonyo geɖe hã le mɔ si sɔ nu. ‘Actions’ ƒe dodo ɖe ŋgɔ be woatsɔ aɖɔli nusiwo wotsɔ de eme/do goe kpe ɖe eŋu be woɖe asitsatsa ƒe metadata ƒe agbɔsɔsɔ dzi kpɔtɔ. 

Zi geɖe la, esesẽna be woawɔ ɖoɖo ɖe ɖoɖo siwo dzi woka ɖo ŋu & tsɔ ɖoɖowɔɖi ƒe afɔku aɖe ɖo ŋkume. Ahiã be woagbugbɔ wo awɔ na ɖoɖowɔɖi ƒe tɔtrɔ gã ɖesiaɖe. Wo ɖeɖe ɖa hea ŋgɔyiyi gã aɖe vɛ na ɖoɖowɔɖi yeyewo ƒe ɖɔɖɔɖowo zazã dedie. 

Recursive proof composition lé ŋutete si le compressing agbɔsɔsɔme si seɖoƒe meli na o ƒe akɔntabubu, wɔwɔ auditable mama ɖoɖo, si na Zcash ŋutete gã aɖe vevietɔ kple tɔtrɔ yi Proof of Stake. Esia hã ɖea vi na kekeɖenudɔwo abe Zcash Shielded Assets kple Layer 1 ƒe ŋutete ƒe nyonyo le node blibo zazã ƒe nuwuwu si kɔkɔ wu le ƒe siwo gbɔna me na Zcash.


## Halo le lãwo ƒe agbenɔnɔ ƒe ɖoɖo si keke ta wu me 

Electric Coin Company wɔ nubabla kple Protocol Labs, Filecoin Foundation, kple Ethereum Foundation be woaku Halo R&D me, si me alesi woateŋu azã mɔ̃ɖaŋununya la le woƒe networkwo me hã le. Nubabla la ƒe taɖodzinue nye be wòana woate ŋu atrɔ asi le nu ŋu nyuie wu, woawɔ dɔ aduadu kple ame ŋutɔ ƒe nyawo le lãwo ƒe agbenɔnɔ ƒe ɖoɖowo katã me kple na Nyatakakadzraɖoƒe 3.0.

Tsɔ kpe ɖe eŋu la, Halo 2 le [MIT kple Apache 2.0 ƒe mɔɖegbalẽ siwo le ʋuʋu ɖi te](https://github.com/zcash/halo2#readme), si fia be amesiame si le lãwo ƒe agbenɔnɔ ƒe ɖoɖoa me ate ŋu atu kple ɖoɖo si ɖo kpe edzi.

### Filecoin ƒe agbalẽ

Tso esime woɖoe ɖe dɔ me la, woxɔ halo2 agbalẽdzraɖoƒea le dɔwo abe zkEVM ene me la, Halo 2 ƒe ɖekawɔwɔ si ate ŋu adzɔ ɖe kpeɖodziɖoɖoa me na Filecoin Virtual Machine la li. Filecoin bia kpeɖodzi gbogbo aɖewo siwo xɔ asi le spacetime / kpeɖodzi siwo ku ɖe egbugbɔgawɔ ŋu. Halo2 anye nu vevi aɖe le yamenutome zazã ƒe nutete me, adzi network la ɖe edzi nyuie wu.

[Filecoin Foundation ƒe video kple Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw)

Tsɔ kpe ɖe eŋu la, aɖe vi ŋutɔ na Filecoin kple Zcash ƒe lãwo ƒe agbenɔnɔ ƒe ɖoɖowo siaa ne woate ŋu axe Filecoin ƒe nudzraɖoƒe ƒe fewo le ZEC me, si ana adzamenyawo ƒe seƒe ma ke na nudzraɖoƒe ƒeƒle siwo li le Zcash ƒe nudzraɖoƒe ƒe asitɔtrɔwo me. Kpekpeɖeŋu sia atsɔ ŋutete si le ame si be woatsɔ aɣla faɛlwo le Filecoin nudzraɖoƒe akpe ɖe eŋu eye wòatsɔ kpekpeɖeŋu akpe ɖe asitelefon dzi asisiwo ŋu ale be woate ŋu **atsɔ nyadzɔdzɔwo alo faɛlwo akpe ɖe** nyatakakamɔnu alo faɛlwo ŋu ɖe Zcash ƒe nuŋlɔɖi si wotsɔ nya ɣaɣlawo ŋlɔe ŋu. 

[ECC x Filecoin ƒe Blog ƒe Nyatakaka](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Ethereum ƒe dɔwɔwɔ

Halo 2 ƒe kpeɖodzi ƒe dɔwɔwɔ na Verifiable Delay Function (VDF) si wɔa dɔ nyuie si wole wɔwɔm. VDF nye cryptographic primitive si me woateŋu azãe geɖe le. 

Woate ŋu azãe abe dzɔtsoƒe na taɖodzinu gbadzaa ƒe randomness si me zazã le smart contract applications kpakple kplɔla tiatia le Proof of Stake le Ethereum & bubuwo protocols.

ECC, Filecoin Foundation, Protocol Labs, kple Ethereum Foundation hã awɔ dɔ kple [SupraNational](https://www.supranational.net/), si nye nudzrala si bi ɖe nya ɣaɣla siwo wotsɔa xɔtunuwo ƒoa ƒui kabakaba me, hena GPU kple ASIC ƒe ɖoɖowɔwɔ kple VDF ƒe ŋgɔyiyi si ate ŋu adzɔ.

[Adzamenyawo Kple Dzidzedzekpɔkpɔ Ŋuti Numekuku ƒe ƒuƒoƒoa](https://appliedzkp.org/) le numekuku wɔm tso mɔ vovovo siwo dzi Halo 2 ƒe kpeɖodziwo ate ŋu ato ana ame ŋutɔ ƒe nyawo kple woƒe lolome nanyo ɖe edzi na Ethereum ƒe lãwo ƒe agbenɔnɔ ƒe ɖoɖoa hã ŋu. Ƒuƒoƒo sia ƒoa ƒu ɖe Ethereum gɔmeɖoanyia dzi, eye woƒe susu le zero-sidzedze kpeɖodziwo kple nya ɣaɣlawo ƒe gɔmedzenuwo ŋu le mɔ gbadza nu. 

## Dɔ bubu siwo wowɔ to Halo zazã me

+ [Anoma, si nye atɔmik ɖɔliɖɔli ƒe ɖoɖo si me kɔsɔkɔsɔ geɖe le si kpɔa ame ŋutɔ ƒe nyawo ta](https://anoma.net/blog/an-introduction-to-zk-snark-plonkup)

+ [Oribis, si nye L2 zkRollup si le Cardano dzi](https://docs.orbisprotocol.com/orbis/technology/halo-2)

+ [Darkfi, si nye ame ŋutɔ ƒe L1 zkEVM blockchain](https://darkrenaissance.github.io/darkfi/architecture/architecture.html)

+ [Agbalẽxatsaxatsa, L2 zkRollup aɖe le Ethereum dzi](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k)


**Nusɔsrɔ̃ Bubuwo**:

[Zkp kple halo 2 ƒe ŋgɔdonya - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)

[Halo 2 kple Daira & Str4d - ZKPodcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)

[Mɔ̃ɖaŋununya Ŋuti Numeɖela ƒe Blog](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)

[Halo 2 Nutome ƒe Nukpɔkpɔ - Ying Tong @Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Nuŋlɔɖiwo**

[Halo 2 ƒe dɔwɔnuwo](https://github.com/adria0/awesome-halo2)

[Halo 2 ƒe nuŋlɔɖiwo](https://zcash.github.io/halo2/)

[Halo 2 ƒe github](https://github.com/zcash/halo2)
