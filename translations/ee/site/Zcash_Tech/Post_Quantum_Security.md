<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Post_Quantum_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Dedienɔnɔ le Quantum megbe le Zcash

## TL;DR

- Quantum kɔmpiutawo nye afɔku le etsɔme elabena woate ŋu agbã dutoƒo-safui ƒe nya ɣaɣla aɖewo siwo blockchain zãna egbea.
- "Post-quantum" gɔmee nye nya ɣaɣla siwo zɔna le kɔmpiuta dzrowo dzi gake wowɔe be wòatsi tre ɖe amedzidzedze siwo tso quantum kɔmpiuta siwo ava va gbɔ ŋu.
- Zcash menye post-quantum bliboe egbea o.
- Shielded Zcash ɖea dutoƒonuwɔna ŋuti nyatakaka siwo etsɔme amedzidzelawo ate ŋu asrɔ̃ nu tsoe dzi kpɔtɔna, gake shielded zazã mesɔ kple quantum resistance blibo o.
- Zcash le dzadzram ɖo to numekuku, ZIP, kple ŋgɔyiyi ƒe aɖaŋuɖoɖowo abe ZIP 2005 kple Project Tachyon ene me.
- Ele be ʋuʋu le quantum megbe si le dedie nakpɔ ga, ame ŋutɔ ƒe nyatakakawo, gakotokuwo, asitɔtrɔwo, kple se siwo dzi woda asi ɖo ta le ɣeyiɣi ɖeka me.

## Nukae Nye Quantum Kɔmpiuta?

Kɔmpiuta si sɔ dzraa nyatakakawo ɖo abe bits ene. Bit ɖesiaɖe nye wo dometɔ ɖesiaɖe `0` or `1`.

Quantum kɔmpiuta zãa quantum bits, siwo woyɔna be qubits. Woate ŋu azã qubits to akɔntabubumɔnu tɔxɛ siwo kpɔa akɔntabubu ƒe kuxi aɖewo gbɔ kabakaba wu kɔmpiuta dzɔdzɔewo dzi.

Ema mefia be quantum kɔmpiuta wɔa dɔ kabakaba wu le nusianu me o. Afɔkua le tẽ. Nya ɣaɣla aɖewo nɔ te ɖe akɔntabubu ƒe kuxi siwo sesẽ ŋutɔ na kɔmpiuta dzɔdzɔewo gake wole bɔbɔe wu na quantum kɔmpiuta si lolo ale gbegbe.

Le blockchains gome la, kpɔɖeŋu vevitɔ kekeakee nye dutoƒo-safui cryptography. Wozãa dutoƒo safuiwo kple asidede agbalẽ te tsɔ ɖoa ​​kpe edzi be woɖe mɔ na ezãla be wòazã gaku.

## Nusita Blockchains Tsɔtsɔ Ðe Le Eme

Blockchains zãa nya ɣaɣlawo tsɔ wɔa dɔ vovovo geɖe:

| Dɔwɔnu si wotsɔ ŋlɔa nyawoe | Nusi wòwɔna | Quantum ƒe ŋusẽkpɔɖeamedzi |
| --- | --- | --- |
| Digitál asidede agbalẽ te | Ðe kpe edzi be aƒetɔa ɖe mɔ ɖe gazazã ŋu | Afɔku gã aɖe na elliptic-curve ɖoɖo siwo bɔ |
| Hash ƒe dɔwɔwɔwo | Tu adrɛswo, adzɔgbeɖeɖewo, Merkle-tiwo, kple kuxiwo | Afɔku dzi ɖe kpɔtɔ, gake dedienɔnɔ ƒe vovototowo le vevie |
| Zero-sidzedze ƒe kpeɖodziwo | Ðe kpe edzi be asitsatsa siwo wotsɔ akpoxɔnu wɔe la sɔ evɔ màɖe nyatakakawo afia o | Enɔ te ɖe kpeɖodzi ƒe ɖoɖo kple susuwo dzi |
| Nubabla vevi aɖe | Kpena ɖe gakotokuwo ŋu be woaɣla nuŋlɔɖiwo ŋuti nyatakakawo na amesiwo xɔa nyatakakawo | Hiahiã be woalé ŋku ɖe eŋu nyuie le quantum threat model te |

Quantum kɔmpiuta si ŋu ŋusẽ le ale gbegbe ate ŋu ade asidede agbalẽ te ƒe ɖoɖo geɖe siwo wozãna egbea, siwo dome elliptic-curve signatures hã le, afɔku me. Esia le vevie elabena asidede agbalẽ te nye nusi nana network la nya be woɖe mɔ ɖe asitsatsa aɖe ŋu to safui nyuitɔ dzi.

Hash ƒe dɔwɔwɔwo to vovo. Grover ƒe algorithm ateŋu awɔ brute force didi kabakaba, gake megbãa hash functions le mɔ ma ke nu tẽ o. Dedienɔnɔ ƒe vovototo gãwo ate ŋu akpe ɖe ame ŋu.

## Nukae Nye Post-Quantum Cryptography?

Post-quantum cryptography nye nya ɣaɣlawo ŋɔŋlɔ si ŋu wotrɔ asi le be wòanɔ dedie le kɔmpiuta dzɔdzɔewo kple quantum kɔmpiuta siwo ava va siaa si me.

Mefia be nya ɣaɣlawo zãa quantum kɔmpiuta o. Efia be wotu ɖoɖoa ɖe akɔntabubu sesẽ vovovowo dzi.

Le ƒe 2024 me la, NIST ɖe dzidzenu gbãtɔ siwo wowu enu le quantum megbe la ɖe go:

- **ML-KEM** na veviwo ɖoɖo
- **ML-DSA** na dijitaal asidede agbalẽ te
- **SLH-DSA** na hash-dzi dijitaal asidede agbalẽ te

Dzidzenu siawo nye nu vevi aɖe, gake blockchain mate ŋu atrɔ algorithm ɖeka kple bubu le zã ɖeka me ko o. Ele be woabu se siwo dzi woda asi ɖo, gakotokuwo, gakotoku siwo me wozãa xɔtunuwo le, asitsatsa ƒe lolome, fe siwo woxena, kple ame ŋutɔ ƒe nyawo ŋu.

## Alesi Quantum Risk Fiae Le Kɔsɔkɔsɔ Me

Mɔ bɔbɔe aɖe si dzi nàto abu afɔkua ŋue nye:

1. Zãla aɖe wɔa safui eve.
2. Dutoƒo safui alo asidede agbalẽ te ƒe nyatakakawo ate ŋu adze le kɔsɔkɔsɔ dzi.
3. Ðewohĩ amesi ava dze quantum dzi ate ŋu azã dutoƒonya ma atsɔ asrɔ̃ safui si nye ame ŋutɔ tɔ.
4. Ne safui ma gakpɔtɔ le ga dzi kpɔm la, ke woate ŋu aɖo afɔku me.

Blockchains siwo me kɔ la ɖea nyatakaka geɖe ɖe go to aɖaŋu me. Adrɛswo, ga homewo, kple asitsatsa ƒe kadodowo le dutoƒo. Dutoƒo safuiwo hã ate ŋu adze ne wozã gakuwo.

Esia nye susu siwo ta adrɛs gbugbɔgazã gblẽa nu le ame ŋu la dometɔ ɖeka. Gbugbɔgazã naa nyatakaka geɖe eteƒekpɔlawo be woatsɔ aɖo kadodo me egbea eye wònaa amedzidzelawo le etsɔme be woaku ŋutinya me nyatakaka geɖe me.

## Nukae To Vovo le Zcash Ŋu?

Zcash doa alɔ asitsatsa siwo me kɔ kple esiwo wokpɔ ta na siaa.

Transparent Zcash wɔa dɔ wu abe Bitcoin-style dutoƒo blockchain zazã ene. Adrɛswo, ga homewo, kple asitsatsa ƒe ƒomedodowo dzena.

Shielded Zcash to vovo. Asitsatsa siwo wokpɔ ta na zãa kpeɖodzi siwo me sidzedze aɖeke mele o ale be network la ate ŋu akpɔe ɖa be asitsatsa aɖe wɔ ɖe seawo dzi evɔ maɖe amesi ɖoe ɖa, amesi xɔe, alo ga home afia o.

Esia na Zcash kpɔa adzamenyawo ŋuti viɖe vevi aɖe:

- Wotaa asitsatsa ŋuti nyatakaka ʋɛ aɖewo ko be amesiame nakpɔ.
- Zãlawo ƒoa asa na dutoƒofexexe ƒe nɔnɔmetata wɔwɔ ne wole akpoxɔnu me.
- Dutoƒo gaŋutinya si ŋu woaku nu me le boo o.
- Nyaɖeɖefia tiatia ate ŋu adzɔ to safuiwo kpɔkpɔ me tsɔ wu be woakpɔ nuŋlɔɖi siwo wowɔ le dutoƒo le gɔmedzedzea me.

Gake Zcash si wokpɔ ta na la menye le eɖokui si le quantum megbe o. Tadeaguƒe siwo wokpɔ ta na la gakpɔtɔ nɔa te ɖe nya ɣaɣlawo ƒe susuwo dzi. Gazazã ƒe mɔɖeɖe, de dzesi ŋugbedodowo, nullifiers, kpeɖodziɖoɖowo, nya ɣaɣlawo, kple gakotoku ƒe safuiwo katã hiã be woalé ŋku ɖe wo ŋu nyuie.

Kpuie la:

> Shielded zazã ɖea dutoƒonukpɔkpɔ dzi kpɔtɔna, gake Zcash hiã kokoko be woaɖoe koŋ awɔ asitɔtrɔ le quantum megbe.

## Zcash Afɔku ƒe Nɔnɔmetata

| Nutoa me | Gɔmedzelawo ƒe numeɖeɖe | quantum megbe dzitsitsi |
| --- | --- | --- |
| Adrɛs siwo me kɔ nyuie | Dutoƒo adrɛswo kple dutoƒo asitsatsa ƒe nɔnɔmetata | Afɔku mawo tɔgbe le blockchain bubu siwo me kɔ ŋu |
| Gazazã ƒe mɔɖeɖe | Kpeɖodzi si fia be woɖe mɔ na zãla be wòazã | Asidede agbalẽ te ƒe ɖoɖowo ate ŋu ahiã be woaɖɔli wo alo woaʋu ayi teƒe bubu |
| Nuŋlɔɖi siwo wotsɔ akpoxɔnu wɔe | Ame ŋutɔ ƒe nuŋlɔɖi siwo ku ɖe asixɔxɔ ŋu le tadeaguƒe siwo wotsɔ akpoxɔnu wɔe me | Akpa aɖewo ate ŋu ahiã susu yeyewo alo dɔwɔnu siwo woatsɔ agbugbɔ axɔ |
| zk-SNARKs ƒe nyawo | Kpeɖodzi siwo ɖee fia be asitsatsa siwo wotsɔ akpoxɔnu wɔe la sɔ | Kpeɖodzi-ɖoɖo ƒe susuwo hiã be woagbugbɔ ŋku alé ɖe wo ŋu |
| Gakotoku ƒe scanning | Alesi gakotokuwo dia nuŋlɔɖi siwo woxɔ eye woɖea wo gɔmee | Key agreement kple note encryption hiã be woagbugbɔ ŋku alé ɖe eŋu |
| Ʋuʋu yi teƒe bubu | Gawo ʋuʋu yi nya ɣaɣlawo ƒe nuŋɔŋlɔ si le dedie wu gbɔ | Ele be woaƒo asa na ga ƒe bu kple ame ŋutɔ ƒe nyatakakawo ƒe dodo siaa |

## Alesi Zcash Le Dzadzram Ðo

### Zcash Le Network Upgrade Dɔwɔɖoɖo aɖe si

Zcash trɔ eƒe nya ɣaɣlawo do ŋgɔ. Sapling na be asitsatsa siwo ŋu wokpɔa akpoxɔnu le zazã nɔ bɔbɔe. NU5 to Orchard, Unified Addresses, kple Halo 2 vɛ.

Esia le vevie elabena dzadzraɖo ɖe quantum megbe menye kɔmpiutadziɖoɖo ƒe akpa ɖeka ƒe akpa aɖe o. Ebia be woawɔ ɖoɖo ɖe network ƒe ɖɔɖɔɖowo ŋu, woatrɔ gakotokuwo, awɔ agbalẽdzikpɔkpɔdɔ, kple ɣeyiɣi hafi ezãlawo naʋu.

Zcash ƒe tɔtrɔ siwo va yi ɖee fia be nuteƒekpɔkpɔ le lãwo ƒe agbenɔnɔ ƒe ɖoɖoa si le ʋuʋu tso nya ɣaɣla xoxowo dzi yi aɖaŋu yeyewo dzi.

### Halo And Orchard Reduced Older Assumptions

Halo 2 nye esi Orchard, Zcash ƒe egbegbe ta si ŋu wokpɔ akpoxɔnu le la zãna. Ŋgɔyiyi vevi ɖekae nye be Halo ɖe alesi wòhiã be woawɔ ɖoɖo si dzi woka ɖo na Orchard proof system la ɖa.

Ema menye nu ɖeka kple dedienɔnɔ le quantum megbe o. Egasɔ kokoko elabena eɖee fia be Zcash ateŋu axɔ ɖe cryptographic xɔtunu gãwo teƒe ne aɖaŋu nyuitɔwo li.

### ZIP 2005 He susu yi Quantum Recoverability Ŋu

ZIP 2005 ƒe tanyae nye "Atikutsetsebɔwo ƒe Agbɔsɔsɔme Gbugbɔgaxɔ." Edo tɔtrɔ siwo woɖo be woakpe ɖe Orchard zãlawo ŋu woaxɔ ga alo aʋu ne quantum amedzidzedze ɖe susu xoxowo ŋu va zu nusi woate ŋu awɔ.

Recoverability mesɔ kple dedienɔnɔ blibo le quantum megbe o. Ele kpuie wu eye wògaɖea vi kokoko:

- Dedienɔnɔ blibo le quantum megbe dzea agbagba be yeaxe mɔ na quantum ƒe amedzidzedzewo be woagawɔ dɔ o.
- Recoverability naa ezãla anukwareɖilawo kpɔa mɔ nyuitɔ ne nya ɣaɣla xoxowo meva le dedie o.

Le gɔmedzelawo gome la, bu esia be enye dodo kpata ƒe ɖoɖo. Meɖɔlia xɔ bliboa o, gake ekpena ɖe amewo ŋu wodzona le xɔ xoxoa me dedie ne gaƒoɖokui xoxoa gbɔdzɔ.

### Dɔwɔɖoɖo Tachyon Le Kpɔkpɔm le Ðoɖowɔɖiwo ƒe Ŋgɔyiyi Gãwo Ŋu

Project Tachyon nye Zcash ƒe dodoɖeŋgɔ si wodo ɖa si ƒe susu le lolome, sync, kple dukɔa ƒe dzidziɖedzi ŋu. Eƒe dutoƒo nyatakakadzraɖoƒe gblɔ be aɖaŋuɖoɖoa ƒe taɖodzinue nye be yeaɖe asitsatsa dzi akpɔtɔ, aɖe validator state ƒe dzidziɖedzi dzi akpɔtɔ, eye yeaxɔ adzamenyawo blibo le quantum megbe abe eƒe nugbegblẽ le ame ŋu ene.

Esi wònye be Tachyon nye aɖaŋuɖoɖo ta la, eganɔa te ɖe mɔ̃ɖaŋudɔwɔwɔ, ŋkuléle ɖe eŋu, kple nutoa me tɔwo ƒe mɔɖeɖe hafi woawɔ dɔ dzi kokoko. Wose egɔme nyuie wu be enye Zcash ƒe numekuku veviedodo kple ŋgɔyiyi ƒe mɔfiame ƒe akpa aɖe, ke menye abe nɔnɔme si le ezãlawo si xoxo egbea ene o.

### Numekuku Kple Dzidzenuwo Le Ʋuʋum

Nya ɣaɣlawo ŋɔŋlɔ ƒe xexe si keke ta wu hã le ʋuʋum. NIST ƒe dzidzenu siwo le quantum megbe naa xɔtuɖoɖo sesẽwo na dɔdzikpɔlawo hena asidede agbalẽ te kple veviwo ɖoɖo. Numekula siwo si sidzedze zero mele o yi edzi le nu srɔ̃m tso kpeɖodziɖoɖo siwo ate ŋu alé ɖe te le quantum susuwo te ŋu.

Zcash ate ŋu akpɔ viɖe tso dɔ ma me, gake ele kokoko be wòatrɔ asi le eŋu wòasɔ ɖe blockchain si kpɔa ame ŋutɔ ƒe nyawo ta.

## Mɔnu Siwo Ate Ŋu Azã Le Etsɔme Dodo Ðe Ŋgɔ

### Mɔɖeɖe le Gazazã le Quantum megbe

Zcash ate ŋu ahiã gazazã ƒe mɔɖeɖe si meɖoa ŋu ɖe asidede agbalẽ te ƒe ɖoɖo siwo me quantum-vulnerable ŋu o mlɔeba.

Esia ate ŋu azã asidede agbalẽ te le quantum megbe, asidede agbalẽ te siwo wotsɔ tsaka, alo aɖaŋu bubu aɖe. Hybrid design zãa classical kple post-quantum checks siaa le tɔtrɔɣi, eyata ɖoɖoa menɔa te ɖe susu ɖeka ko dzi o.

Kuxiae nye eƒe lolome kple gazazã. Asidede asi le quantum megbe ate ŋu alolo wu egbegbe asidede agbalẽ te, si kpɔa ŋusẽ ɖe asitsatsa ƒe lolome, bandwidth, fe siwo woxena, asitelefon dzi gakotokuwo, kple hardware gakotokuwo dzi.

### Adrɛs Yeye Kple Nɔnɔme Veviwo

Zi geɖe la, nya ɣaɣla yeyewo hiã safui kple adrɛs yeyewo. Zãlawo ahiã ʋuʋumɔ si me kɔ tso nɔnɔme xoxowo dzi yi nɔnɔme siwo le dedie wu dzi.

Ele be ʋuʋua nanɔ bɔbɔe le gakotokuwo me. Mele be ezãla akpa gãtɔ nase nya ɣaɣlawo ƒe nyatakaka ɖesiaɖe gɔme tsitotsito hafi anɔ dedie o.

### Ameŋunyatakakawo Takpɔkpɔ ƒe Ʋuʋu

Ʋuʋu nye nusi ŋu Zcash le vevie ŋutɔ. Ne ezãla geɖe tsɔ ga tso ta xoxowo me yi ta yeyewo me le nɔnɔme siwo dze ƒã me la, ʋuʋua ŋutɔ ate ŋu ana nyatakakawo nado go.

Ele be ʋuʋu ƒe ɖoɖo nyui aɖe nakpɔ:

- Zãlawo ƒe ga
- Zãla ƒe nya ɣaɣlawo
- Gakotoku ƒe ɖekawɔwɔ
- Woɖɔli kpekpeɖeŋunana
- Hardware gakotoku ƒe kpekpeɖeŋu
- Network ƒe nukpɔsusu ɖeka ƒe dedienɔnɔ

### Post-Quantum Kpeɖodzi Ðoɖo ƒe Totoɖeme

Asidede agbalẽ te ɖɔliɖɔli mesɔ gbɔ o. Zcash ƒe shielded design hã nɔ te ɖe zero-sidzedze kpeɖodziwo kple ŋugbedodowo dzi.

Ðewohĩ ahiã be woato dɔ siwo woawɔ le etsɔme me alo aɖɔli:

- zk-SNARK ƒe susuwo
- Polynomial ƒe ŋugbedodowo
- Fiat-Shamir tsɔ nya ɖe hashes ŋu
- De dzesi adzɔgbeɖeɖewo
- Nullifier xɔtutu
- Merkle ati ƒe susuwo
- De dzesi nya ɣaɣlawo tsɔtsɔ ɣla kple nukpɔkpɔ-safui ƒe nuwɔna

Akpa aɖewo ate ŋu anye esiwo dzi woda asi ɖo ne wotrɔ asi le woƒe nɔnɔmewo ŋu. Ðewohĩ ahiã be woatrɔ asi le akpa bubuwo ŋu.

## Gɔmedzelawo ƒe Kpɔɖeŋuwo

### Kpɔɖeŋu 1: Gaxɔ Xoxoa

Kpɔe ɖa le susu me be dedienɔƒe aɖe si ƒe gaƒoɖokui sesẽ egbea. Dɔwɔnu yeye aɖe si woato vɛ le etsɔme ate ŋu aʋu gaƒoɖokui xoxo ma kaba.

Post-quantum cryptography le abe alesi woatsɔ aɖaŋu aɖe si womele mɔ kpɔm be dɔwɔnu yeyea agbã o ɖɔli gaxɔa ene.

Le blockchain gome la, gaxɔa ɖɔliɖɔli sesẽ elabena ele be gakotoku, node, exchange, kple hardware device ɖesiaɖe nase aɖaŋu yeyea gɔme.

### Kpɔɖeŋu 2: Dutoƒoxɔgbalẽvi ƒe Aɖaka

Blockchain data siwo me kɔ la le abe gaxɔgbalẽvi ɖesiaɖe dada ɖe dutoƒoɖaka me tegbee ene. Ne ame aɖeke mate ŋu axlẽ kpɔɖeŋu ɖesiaɖe egbea o hã la, dɔwɔnu siwo ava va ate ŋu asrɔ̃ nu geɖe emegbe.

Shielded Zcash dzea agbagba be yeaƒo asa na gaxɔgbalẽvi mawo tata le gɔmedzedzea me. Ema kpena ɖe ameŋunyatakakawo ŋu ɣeyiɣi didi, gake ele kokoko be woato gaƒoɖokui si kpɔa akpoxɔnu si wotsɔ akpoxɔnu me ta la me hena etsɔme quantum.

### Kpɔɖeŋu 3: Dodo ƒe Ðoɖo

Nusiwo woate ŋu agbugbɔ axɔ la le abe ɖoɖowɔwɔ ɖe mɔ si dzi woato ado le eme ŋu hafi dzo natɔ ene. Èle mɔ kpɔm be yemahiãe o, gake ele dedie wu be nàwɔ eƒe nɔnɔmetata kaba wu le nɔnɔme kpata aɖe me.

ZIP 2005 sɔ ɖe susu sia nu na Orchard ƒe nuŋlɔɖiwo.

## Nusi Zãlawo Ate Ŋu Awɔ Egbea

Mehiã be ezãlawo natsi dzodzodzoe o. Dutoƒo quantum kɔmpiuta gã siwo ate ŋu agbã blockchain cryptography siwo wozã la meli egbea o.

Numame nyuiwo gakpɔtɔ kpena ɖe ame ŋu:

- Ti Zcash zazã si wokpɔ ta na wu ne anya wɔ.
- Ƒo asa na adrɛswo gbugbɔgazã.
- Na gakotokuwo nanɔ yeyee.
- Dze Zcash network ƒe ŋgɔyiyi ƒe gbeƒãɖeɖewo yome.
- Kpɔ ZIPwo kple gakotoku ƒe mɔfiame siwo ku ɖe gaxɔmenɔnɔ alo ʋuʋu ŋu.
- Mègasusu be dɔwɔna si me wowɔa nu le gaglãgbe nye ame ŋutɔ tɔ o.
- Mèganɔ te ɖe nya siwo wogblɔna dzi aʋuʋu ga o; lala mɔfiame si me kɔ tso Zcash dɔwɔla siwo dzi woka ɖo kple gakotoku ƒe ƒuƒoƒowo gbɔ.

## Kuxiwo

Post-quantum upgrades sesẽ na blockchain ɖesiaɖe.

Kuxi siwo bɔ dometɔ aɖewoe nye:

- Safui gãwo kple asidede agbalẽ te
- Asitsatsa gãwo
- Ga si wozãna ɖe kpeɖodzinana ŋu si lolo wu
- Bandwidth zazã geɖe wu
- Dedienɔnɔ ŋuti numekuku yeyewo
- Hardware gakotoku ƒe kpekpeɖeŋu
- Asitelefon dzi gakotoku ƒe dɔwɔwɔ
- Nuwo ɖɔliɖɔli kple vidzikpɔkpɔ ƒe ɖekawɔwɔ
- Ameŋunyatakakawo ƒe nyatakakawo dona le ʋuʋuɣi
- Nutoa me tɔwo ƒe nubabla le tɔtrɔ siwo dzi woda asi ɖo ŋu

Le Zcash gome la, menye gaku siwo woate ŋu azã koe nye nusi sesẽ wu o. Akpa sesẽae nye be woana gakuwo nate ŋu azã esime wole ame ŋutɔ ƒe nyawo ta si na Zcash to vovo.

## Totoɖeme

Quantum kɔmpiutawo ate ŋu ade ŋɔdzi na nya ɣaɣla aɖewo siwo blockchain zãna mlɔeba. Post-quantum cryptography nye ŋuɖoɖo si anɔ anyi ɣeyiɣi didi, gake ele be woazãe nyuie.

Zcash menye post-quantum bliboe egbea o. Ke hã, ŋusẽ nyuiwo le Zcash ŋu: asitsatsa siwo ŋu wokpɔ ta na la ɖea dutoƒonukpɔkpɔ dzi kpɔtɔna, nya ɣaɣlawo ƒe tɔtrɔwo ƒe ŋutinya le network la si, eye numekuku siwo li fifia abe ZIP 2005 kple Project Tachyon ene la ɖoe xoxo ɖe etsɔme quantum afɔkuwo ŋu.

Le gɔmedzelawo gome la, susu vevitɔa le bɔbɔe: ame ŋutɔ ƒe nyawo tsɔtsɔ aɣla egbea ɖea nyatakakawo ƒe ɖeɖefia le etsɔme dzi kpɔtɔna, eye asitɔtrɔ nyuie ate ŋu akpe ɖe Zcash ŋu wòaʋu ayi dedienɔnɔ sesẽtɔ gbɔ le quantum-ɣeyiɣia me evɔ womatsɔ zazã asa vɔe o.

## Axa Siwo Do Ƒome Kplii

- [Ta Siwo Wotsɔ Akpoxɔnu Wɔe](/using-zcash/shielded-pools) - Alesi Zcash shielded transactions kpɔa asitsatsa ŋuti nyatakakawo ta
- [Halo](/zcash-tech/halo) - Zcash ƒe kpeɖodziɖoɖo si me ɖoɖo si dzi woka ɖo manɔmee
- [ZKP & ZK-SNARKS ƒe agbalẽwo](/zcash-tech/zk-snarks) - Alesi zero-sidzedze kpeɖodziwo wɔa dɔ le Zcash me
- [Nukpɔkpɔ ƒe Safuiwo](/zcash-tech/viewing-keys) - Alesi tiatiawɔblɔɖe ɖeɖefia wɔa dɔ na Zcash si wokpɔ ta na
- [Zcash ƒe Nunɔamesi Siwo Wokpɔna](/zcash-tech/zcash-shielded-assets) - Etsɔme nunɔamesi siwo wokpɔ ta na kple ame ŋutɔ ƒe nunɔamesiwo ƒe kpekpeɖeŋu
- [Ame ŋutɔ ƒe nyawo gbɔ kpɔkpɔ abe Gɔmeɖose Vevi aɖe ene](/privacy/privacy-as-a-core-principle) - Nusita ganyawo ƒe adzamenyawo le vevie

## Nusiwo ŋu woke ɖo

- [NIST: Wowu quantum encryption megbe dzidzenuwo nu zi gbãtɔ](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)
- [NIST Post-Quantum Cryptography Dɔwɔɖoɖo](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [ZIP 2005: Orchard Quantum Recoverability](https://zips.z.cash/zip-2005)
- [Dɔwɔwɔ si nye Tachyon](https://tachyon.z.cash/)
- [Zcash ƒe Ðoɖowɔɖi ƒe Nyatakaka](https://zips.z.cash/protocol/protocol.pdf)
- [Halo 2 ƒe Agbalẽ](https://zcash.github.io/halo2/)
