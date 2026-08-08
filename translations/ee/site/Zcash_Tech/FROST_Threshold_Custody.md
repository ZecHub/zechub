<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST_Threshold_Custody.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# FROST & Kpoƒe si Woade Ŋku Ame Siwo Le Xɔnametɔ Ƒe Nudidi Me la dzi le ZEC siwo ŋu wotrɔ asi le me.

> Ne èdi be yeakpɔ FROST protocol ƒe nya ɣaɣla ŋuti nyatakakawo katã la, kpɔ [FROST technical page] si le Eʋegbe me.](FROST.md).

FROST ƒe nuxeƒe dzikpɔkpɔ le Zcash dzeɖoɖowo me  enyea dziƒonɔlawo tɔ ɖe ZecHub Hackathon 2026 la me 🔥 gake womegblɔna nya sia ɣesiaɣi be ele bɔbɔe o. axa sia ƒo nu tso nusi wòfia, ɣeyiɣi si nèhiãe ŋutɔŋutɔ, nusiwo nàtsɔ adzra ɖo kple dɔwɔnu siwo doa alɔ ewɔwɔ egbea ŋu.

---

## TL;DR

- FROST na be ame gbogbo aɖewo siwo si Zcash ƒe adrɛs le la kpɔ ŋusẽ ɖe edzi, eye womedina be wo dometɔ ɖeka pɛ ko nanɔ woƒe adzameʋatɔa dzi o.
- Aƒleƒe si le t-wo dome fia be: ele na ame t be woaŋlɔ agbalẽ akpe asi ɖe ga ŋu; ne wo dometɔ ɖesiaɖe ƒe xexlẽme mede o la, mate ŋu atrɔ gaawo ɖeɖe ko ayi teƒe bubu o.
- Nuwɔnawo le abe nuwɔwɔ bubu ɖesiaɖe si ŋu wotrɔ asi le ene  womekpɔa nusi dzi woato awɔ dɔe o.
- Esia to vovo kura tso nu si woyɔna be transparent multisig (si nye nusi dzi ame geɖe ate ŋu aka ɖo le kadodo me eye Zcash da asi ɖe edzi ɣeyiɣi didi aɖe)  FROST wɔa dɔ le teƒe siwo woxɔa ga dome.
- Eɖea vi na DAOwo, gadzraɖoƒewo, nudzidzɔname ƒe dɔwɔƒe siwo kpɔa nuwo dzi la kple habɔbɔawo me tɔwo - le teƒe ɖesiaɖe si womate ŋu axɔ vodada vevi aɖe o.

---

## Nukae nye FROST le gbegbɔgblɔ si me kɔ la me?

Bu eŋu kpɔ be asitsala etɔ̃ siwo dometɔ ɖesiaɖe léa woƒe ga ƒe akpa aɖe ɖe asi. Ne woazã nu tso woƒe gakotoku si wotsɔna dea ame bubuwo tɔ me ŋu la, ele na woa kple eve le wo dome be woawɔ ɖeka eye woatsɔ ŋkɔ akpee. Nuƒlewɔƒe si do go adze abe amesiame ŋutɔ to eƒe mɔɖeɖe dzi ɖo ɖa ene  ŋkuléleɖetakpɔlawo mate ŋu agblɔ le blockchain-awo dzi be amesiwo de ha kplii sɔ gbɔ o.

FROST (**Flexible Round-Optimized Schnorr Threshold Signatures **) nye cryptographic protocol si na esia le bɔbɔe be Zcash nanɔ dedie. Chelsea Komlo (University of Waterloo / Zcash Foundation) kple Ian Goldberg ye wɔe.

Eƒe nɔnɔme vevitɔwo:

- **Afɔku**: ame t-wo le n dome koe hiã be woade (le kpɔɖeŋu me, 2 tso 3, 3 tso 5)
- **Esiwo ŋu wotrɔ asi le**: wowɔa dɔ siwo katã le Orchard ƒe nuŋɔŋlɔ me.  Ga home, ame si ɖo eŋu kple amesi xɔe la nɔa ɣaɣla ɖaa
- **Womate ŋu ade vovototo wo dome o**: nuŋɔŋlɔ mamlɛa le abe Zcash ƒe asitsatsa bubu ɖesiaɖe si dzi wotona ene.
- **Menye ame si kpɔa wo dzi o**: Ame aɖeke meɖua amegã le nu sia ŋu gbeɖe o  Kplɔla gɔ̃ hã menɔa eŋu o.

---

## Ɣekaɣie wòle be nàzã ame si gbɔ wòdi be yeakpɔ la ƒe ŋusẽkpɔɖeamedzi?

Gɔmesese le nuxexlẽ ƒe mɔ̃ dzi ŋu ne ame ɖeka alo safuia bubu aɖe bu gake ga la mebu ɖe amea o.

Nɔnɔme: Nu si tae ameɖokuigbɔdɔléle ɖea vi.
|-----------|----------------------------|
** DAO alo ƒuƒoƒo ƒe gaƒoƒome** Admin ɖeka aɖeke mate ŋu azã gakpekpeɖeŋu le eɖokui si o; ehiã be wo katã nawɔe.
** Exchange alo custodian**. Enaa afɔku gãwo nɔa dedienɔnɔ ƒe nutoawo me kple dɔwɔlawo dome
** Ame ŋutɔ ƒe nufamɔ̃ (le ame si dzi woka ɖo gbɔ) ** 2 le 3 dome mia kple ƒomea me tɔ eve  ku alo woagate ŋu age ɖe eme o, ga mele tsɔtsrɔ̃ ge o.
** Escrow**: Nunɔla, asitsala kple ʋɔnudrɔ̃la dometɔ ɖesiaɖe ƒe gomee nye; woɖea ga le esi ame eveawo lɔ̃ ɖe edzi ko dzi.
** Nudzɔdzɔ xɔasiwo ƒe ɖoɖo ɖe ame ŋu** ZCG-mɔ: ehiã be amesiwo de asi ete na ɖekaɖeka geɖe hafi woana ga.
 Eʋevi ƒe ŋɔdzidodo nu o. Mɔ̃ɖaŋudɔwɔla ɖeka mate ŋu azã ɖoɖowɔɖi me ga aɖeke le eɖokui si o.

Ðewohĩ màhiã be woaɖo ga si nèdzra ɖo ɖi la ɖe wò ŋutɔ ɖokuiwò ŋu o, alo ne èle asi trɔm le eŋu eye esia wɔe be nuwo ƒe ɖoɖowɔwɔ va sesẽ wu afɔkuwo dzi ɖeɖe kpɔtɔ.

---

## Aleke wòto vovo na asinuŋɔŋlɔgbalẽ gbogbo siwo me wodzena le?

Zcash kpe asi ɖe nuŋɔŋlɔ geɖe ŋu tso ɣeaɖeɣi ke. Gake nugbugbɔŋlɔla gbogbowo ƒe dɔwɔwɔ le ɣaɣlawo dome gblẽa nuwo: * Nugbugbɔ ŋlɔlawo, kple agbalẽdzesi siwo katã dzi amewo te ɖo la nɔa blockchain me.*

FROST kpɔa esia gbɔ to dɔwɔwɔ le tsiɖɔɖotaƒe si ŋu wotrɔ asi le me:

◯ Numeɖeɖe geɖe siwo me kɔ nyuie ❖ FROST ƒe ʋɔtrua (woxe enu) ❑ Gadzraɖo si dzi ame ato akpɔ egbɔ be woagaɖe mɔ na amewo o.
|--|---------------------|--------------------------|
| Pool | Transparent (public) | Orchard (shielded) |
 Eʋegbewo le dzedzem le kɔsɔkɔsɔ me.  Ɛ̃, ʋeŋe siwo katã li la dze ƒãa. ‬ Aɖeke o  Womate ŋu ade vovototo wo kple eʋegbe ɖeka ƒe ga si wozãna o
Ðekawɔwɔ ƒe agbɔsɔsɔme si wokpɔna. Ɛ̃, Ao.
❑ Ehiã be woawɔ ɖoɖowo. □ Woŋlɔa nu siwo le edzi yim la ɖi ɣesiaɣi, ne wole wo me tom ko.
▪ Ameɖokui ta kpɔkpɔ. - Ao. ● Amegbetɔwo ƒe nya ɣaɣla blibowo dzi wɔwɔ.

---

## Nuwo ƒe tsɔtsɔtsɔe kple wo dzi wɔwɔ ŋuti seɖoƒeawo

FROST wɔa dɔ ŋutɔ, gake ele be nànya nu siwo me wòate ŋu agblẽ le eŋu hafi azãe:

### Dɔwɔƒe si kpɔa ɖoɖowo gbɔ ƒe gazazã
Ele be amesiwo de asi agbalẽ te la nanɔ internet dzi le ɣeyiɣi ɖeka me (alo anɔ eme nenema) hafi woate ŋu awu woƒe ŋkɔwo ŋɔŋlɔ nu. Ne wò t-tɔ siwo dea dzesi wo ƒe xexlẽme kaka ɖe game alo kadodo si mele eteƒe o dome la, ga zazã bia ɖoɖowɔwɔ si ameɖekɛ tɔ mate ŋui awɔ o.

### Ne ame siwo ade ha la mede akpa aɖeke o la, womade asii te o.
Ne ame siwo le ʋɔtrua nu mele dɔ wɔm o (dɔléle, mɔzɔzɔ, ne womele nya ŋu ɖom na amewo o) la, ga mate ŋu asu wo si ɣeyiɣi kpui aɖe o. Tia wò agbɔsɔsɔme eye nàƒo asa nɛ nyuie  2 ɖe 3 me sẽ wu 2-ɖe 2.

### Aʋatɔŋutia ƒe ɖoɖowɔɖi
FROST ɖoɖo anyi bia be woawɔ nuƒle ƒe mɔ̃ si wota (DKG) le afisi amesiwo katã kpɔ gome la nɔ internet dzi ɖekae. Enye nusi wowɔna zi ɖeka, gake ele be woaɖɔ ŋu ɖo  ne ame siwo kpɔa gome le eme gblẽ DKG me la, ateŋu agblẽ dedienɔnɔa dome.

### Dɔwɔgbalẽwo le tsitsim kokoko.
FROST na Zcash si ŋu wotrɔ asi le la nye nu yeye. IETF ƒe ɖoɖo (draft-irtf-cfrg-frost) tsi, gake gaƒoɖokuigbalẽwo me sɔ gbɔ o. Kpɔ mɔ be woagate ɖe edzi wu ne wotsɔe asɔ kple esi dzi wowɔna ɖo zi ɖeka ko.

### Alesi nuwo gbugbɔgawɔ sesẽe
Menye xexeame ƒe nuwuwu enye be woagblẽ nu le eƒe akpa aɖe ŋu o (si nye nusi dzi wotrɔ ɖo), gake ele be woaŋlɔ nusiwo wodzɔ tso eme la ɖi do ŋgɔ. Amekae kpɔa nuwo ta? Nukae adzɔ ne nukpe eve bu ɖe ɣeyiɣi ɖeka me?

---

## Amekae le xɔtutu kple FROST dzi ɖe Zcash ŋu?

### Zcash Foundation  frost.zfnd.org
Zcash Foundation ɖo FROST ƒe dɔwɔwɔ kple demo site ɖe wo. Esiae nye nusiwo wowɔna le numekuku me kple ŋgɔyiyiwo wɔwɔ me la dometɔ ɖeka si wozãna na dɔ sia wɔdɔme.

### YWallet FROST Demo
YWallet (Zcash ga si wɔa dɔ nyuie) le FROST demo ƒe akpa aɖe. Kpɔ [YWallet FROST Demo guide](/guides/Ywallet_FROST_Demo) be nàkpɔ mɔfiamewo tso afɔɖeɖe ɖe sia ɖe ŋu.

### ZecHub Hackathon 2026 — FROST Track Projects

FROST ƒe mɔe nye esi dzi woƒo ƒu ɖo wu le ZecHub Hackathon 2026. Dɔwɔna siwo dze:

- **ZecVault**  2 le 3 ƒe ga si woxe ɖe gadzraɖoƒe dzi (FROST nuɖoanyi)
- **Gbɔdzɔla**  Nudzraɖoƒe si dzi woadzra Zcash ɖo le kple UX siwo ŋu wotrɔ asi le be woakpɔ ga la ta.

### Coinbase ƒe ŋkɔwo:
Coinbase wɔ FROST ƒe dɔwɔwɔ na woƒe nuxexlẽ me dzesiwo (na Bitcoin), kple tɔtrɔ siwo ɖea ŋgɔdɔwɔƒe dzi kpɔtɔ eye wo ma agbadɔlawo dome dɔwɔna le ame sia ame si kpɔ gome la ŋu. Woƒe nuteƒekpɔkpɔa ɖo kpe Frost ƒe dedienɔnɔ ŋuti kpɔɖeŋu dzi le dɔwɔƒewo katã.

---

## Alesi asitelefon dzi nuwɔwɔ le dɔ wɔm (le mɔ bɔbɔe aɖe nu)

1. ** Ðoɖo (zi ɖeka):** Amesiame n doa nukpɔla ƒe nuƒleƒe si woama ɖe ame bubuwo dzi. Ame sia ame xɔa eƒe private shard; wote ŋu kpɔa woƒe public key la le amewo gbɔ. Akpa aɖeke menya woƒe privɛt-kɔtɔa o.

2. ** Ðoɖowɔha me tɔ siwo de asi ete:** Ne ehiã be woazã ga aɖe la, ɖoɖowɔla (si ate ŋu anye agbalẽŋlɔlawo dometɔ ɖeka) ƒoa nu tso gome si le ame t siwo di be yewoade asi te ɖe eŋu la ƒe adzɔgbeɖeɖewo ŋu.

3. **Tɔtrɔ 1:** Ame sia ame si de asi agbalẽa te la ŋlɔ nya aɖe eye wòna amewo nyae be yewomedi be yewoawɔ nu vevi aɖeke o.

4. **Tɔtrɔ evelia:** Ame sia ame si de asi ete la zãa eƒe nuŋɔŋlɔ ƒe akpa aɖe tsɔ wɔa akɔnta eye wònaa nyatakakawo.

5. **Tɔtrɔ:** Nuhaƒolaa ƒoa t-ŋɔŋlɔdzesi siwo le akpa ɖeka la nu ƒu zu Schnorr ƒe asiɖeɖe mamlɛtɔ  si womate ŋu ade vovototoe kple esi ame ɖeka ko ate ŋu awɔ o.

6. **Agbadzedze:** Woɖea nu si wowɔ la ɖe go le Zcash-hadzraɖoƒea abe ale si wòdzɔna ɖaa ene.

Ne asitsala aɖe ɖo asi nu gbegblẽ dzi la, ɖoɖowɔɖia dea dzesi wo eye wòɖea wo ɖa (woaɖe mɔ na wo be womagakpɔ gome le kpekpe siwo ava va me o). Asitsatsa yia edzi le go bubuwo me  blockchain kpɔa nudzɔdzɔ mamlɛtɔ ko.

---

## Tia wò nuxexlẽ ƒe dzidzenuwo

Ðoɖowɔɖi. Kpekpeɖeŋuwɔwɔ. Afɔkuwo tsɔtsɔ na ame ɖokui.
|-------|-----------|------|
❑ 1 le 1. ● Kpekpeɖeŋu aɖeke meli o. □ Ðeka ƒe kpododonu ɖeka kolia. ▪ Aʋatrɔvi bubu bu = nu gbagbewo dome gblẽ keŋkeŋ.
 2 le 2 me. Ehiã be amesiwo de asi ete la katã naŋlɔe ɖi  vodada aɖeke mele wo ŋu o. Ðeka meli o = ga si womekpɔ mɔ atsɔ awɔ dɔe o.
2 le 3 me. Akpa ɖeka ate ŋu abu alo manɔ anyi o. Dedienɔnɔ ƒe akpa si mede etɔ̃ le atɔ̃ dzi o.
3 le 5 me: Akpa eve ate ŋu abu; dedienɔnɔ sesẽ. Nu geɖe wu ƒe ɖoɖowɔwɔ dzi ɖe edzi.
3 le 7 me: Eɖea mɔ ɖe vodada eve ŋu. Kpekpeɖeŋunana ƒe gazazãwo sɔ gbɔ ŋutɔ.

Mɔ nyui si dzi woate ŋu ato adze dɔe nye: **2-tso-3** (nuwɔwɔ ɖeka le ɖoɖo nu, eye womate ŋu awɔ naneke o) alo **3-tso-5** (dɔwɔƒewo me nɔnɔ, kple dedienɔnɔ).

---

## Axawo Siwo Do Ka Kple Wo Nɔewo

- [Tɔtrɔ si le FROST  Technical Deep Dive me](FROST.md)  ɖoɖowɔɖia ƒe nya ɣaɣla (DKG, asiɖeɖe ɖe agbalẽ dzi wɔwɔ ŋu, dedienɔnɔ ŋuti kpeɖodziwo)
- [YWallet FROST Demo Guide] (Mɔɖeɖewo ƒe Kplɔla)](/guides/Ywallet_FROST_Demo)  Ŋgɔdonya si me woato awɔ dɔ tso nɔnɔmea ŋu vivivi le.
- [FROST Demo (frostdemo)](/guides/frostdemo)  Zcash Foundation ƒe dɔwɔnawo ŋuti nyatakaka siwo le eme.
- [Kpɔ Kpuiawo](Viewing_Keys.md)  Adrɛs siwo ŋu wotrɔ asi le be woaxlẽ ko (woazu nu bubu si akpe ɖe mɔxenu ƒe dzikpɔkpɔ ŋu)
- [Zcash-Dɔ Siwo Woxe Mɔ̃ Na Toɖoɖo Me](Zcash_Shielded_Assets.md)  FROST hã nye mɔ̃ɖaŋunu vevi aɖe si dzi ZSA-gbalẽwo dona le.

## Ganyawo ƒe Kpekpeɖeŋu

- [FROST ƒe numekuku (Komlo & Goldberg, 2020) ](https://eprint.iacr.org/2020/852.pdf)
- [IETF FROST ƒe ɖoɖowɔɖi si me wota ɖo (drafts-irtf-cfrg-frost) ](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/)
- [Zcash Foundation FROST ƒe dɔwɔwɔ](https://frost.zfnd.org)
- [Chelsea Komlo  Nukae Nye Ŋkeke Ƒe Seɖoƒe ƒe Dzesiwo? (Zcon3) ](https://youtu.be/cAfTTfblzoU?t=110)
- [Coinbase  Numeɖeɖewo ƒe Ŋkɔ si Wotsɔna le Internet Dzi](https://www.coinbase.com/blog/threshold-digital-signatures)
- [AGBALẼDZƆ  Async Schnorr ƒe Ŋkekeɖekedzimɔ̃ Siwo Mewɔ Ðeka O (Blockstream) ](https://eprint.iacr.org/2022/550.pdf)
