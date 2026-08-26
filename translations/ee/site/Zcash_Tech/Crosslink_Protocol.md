<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Crosslink_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Crosslink ƒe Ðoɖowɔɖi

## TL;DR

* Crosslink ƒe ɖoɖowɔɖi nye aɖaŋu si wodo ɖa na Zcash ƒe Hybrid Proof-of-Work/Proof-of-Stake (PoW/PoS) stage. Ewɔa PoW ɖekae kple Byzantine Fault Tolerance (BFT) ɖoɖowɔɖi, si wɔnɛ be kakaɖedzi le nuwuwu ŋu zi alesi PoW alo PoS gakpɔtɔ le dedie.
* Hybrid PoS toa notaries siwo ɖoa kpe block siwo wotu ɖe staked ZEC dzi — le gɔmedzedzea me la, wotia wo ɖe staked ZEC dzi.
* Crosslink ɖoe be yeana ledger eve: **finalized ledger (LOG_fin)** hena rollback dedienɔnɔ, kple **lower-latency ledger (LOG_ba)** si kekee ɖe enu wu *L* blocks.
* **Dedienɔnɔ ƒe Nɔnɔme** aɖe wɔa dɔ ne agbalẽ gã si wowu enu la tsi megbe wu *L* blocks: PoW yi edzi, gake ganyawo ƒe dɔwɔnawo tɔ vie vaseɖe esime wokpɔ nyaa gbɔ.
* Le ɣeyiɣi aɖe megbe la, PoS ƒe kpeɖodzinalawo axɔ teƒeɖoɖo ƒe akpa si le dzidzim ɖe edzi, si aɖe PoW tomenukulawo ƒe fetu dzi akpɔtɔ; ɖoɖowɔɖia toa tɔtrɔwo vɛ vivivi.
* Shielded Labs ye le ɖoɖowɔɖia wɔm, kple mɔfiame si woatsɔ awɔ Crosslink 2* ɖekae ɖe Zcash ƒe Zebra asisi me.

## Numeɖeɖe Vevitɔ

### Ɖoɖowɔɖi: Zcash Hybrid PoS kple Crosslink ƒe Ðoɖowɔɖi

Crosslink Protocol nye ŋgɔyiyi ɖedzesi aɖe le Zcash ƒe nɔnɔmetɔtrɔ me, si fia mɔe yi **Hybrid Proof-of-Stake (PoS)** kple **Proof-of-Work (PoW)** ƒe kpɔɖeŋu gbɔ. PoW deŋgɔ, togbɔ be kakaɖedzi le eŋu le kadodo ƒe dedienɔnɔ ƒe kakaɖedzi nana me hã la, edzea ŋgɔ ɖeklemiɖeɖe le ŋusẽzazã kple titina ƒe afɔku siwo do ƒome kple dɔwɔƒewo ƒe tomenukuƒewo ta. Crosslink to ɖoɖo si me wotsɔa nu vovovowo tsakana vɛ, si tsɔa PoW ƒe ŋusẽ si ŋu kpeɖodzi le la tsakana kple PoS ƒe dɔwɔwɔ nyuie kple dziɖuɖu ƒe viɖewo.

![image](/content-images/a2ffb19d-e570-4723-b669-a66e14fc6b71-a727c958de.webp)

Tɔtrɔ sia sɔ kple xexeame katã ƒe nɔnɔme siwo le blockchain ƒe nu yeyewo dodo ɖe ŋgɔ me, afisi dɔwo le tɔtrɔm ɖe mɔnu siwo li tegbee le nutome ŋu eye woɖe mɔ ɖe wo nɔewo ŋu le. Crosslinks ƒe nukpɔsusu eve ƒe kpɔɖeŋu kpɔa egbɔ be Zcash lé eƒe nya ɣaɣlawo ƒe adzamenyawo ƒe kakaɖedzi sesẽwo me ɖe asi esime wòle tɔtrɔm be yeakpɔ egbegbe kuxiwo gbɔ.

Mɔnu si nye Hybrid Proof-of-Stake (PoS) tsɔa Proof-of-Work (PoW) si wozãna tsã la tsakana kple PoS, si ƒe taɖodzinue nye be yeakpɔ afɔkuwo abe 51% ƒe amedzidzedze ene gbɔ esime wòle be woalé decentralization me ɖe asi eye woaɖe ŋusẽzazã dzi akpɔtɔ. Hybrid PoS toa notaries siwo ɖoa kpe block siwo wotu ɖe staked ZEC dzi la vɛ. Wotrɔ asi le mɔnu sia ŋu be wòana kɔsɔkɔsɔ ƒe dedienɔnɔ kple ɖaseɖigbalẽ ƒe kpeɖodzi nanyo ɖe edzi, si ana mɔnu bubu si sesẽ wu ɖe PoW ɖoɖo dzadzɛwo teƒe.

### Nukatae Hybrid PoS/PoW abe dodokpɔ gbãtɔ ene?

* Ewɔa ŋgɔyiyi ɖoa ta PoS dzadzɛ gbɔ.
* Enaa tomenukuƒewo kple staking zazã ƒe nɔnɔmewo kple lãwo ƒe agbenɔnɔ ƒe vovototodedeameme le ɣeyiɣi ɖeka me te ŋu dzɔna.
* Eɖea dedienɔnɔ ƒe nya siwo ate ŋu ado mo ɖa kple PoS ɖoɖowɔɖia dzi kpɔtɔna vaseɖe esime wòakpɔ gome le validator ƒe akpa dzi kple kakaɖedzi geɖe wu.
* Mɔnu si wozãna le xexeame katã la dze le Ethereum le Production me.

### Nusi Crosslink nye

Crosslink ƒe ɖoɖowɔɖi nye aɖaŋu si wodo ɖa na Zcash ƒe Hybrid Proof-of-Work/Proof-of-Stake (PoW/PoS) stage. Ewɔa PoW ɖekae kple Byzantine Fault Tolerance (BFT) ɖoɖowɔɖi, si wɔnɛ be kakaɖedzi le nuwuwu ŋu zi alesi PoW alo PoS gakpɔtɔ le dedie. Aɖaŋuɖoɖoa ƒe taɖodzinue nye be woado ŋusẽ network ƒe dedienɔnɔ kple decentralization to staked validation dede eme esime tomenukulawo ƒe gomekpɔkpɔ le eme. Nu vevi aɖe si le aɖaŋuɖoɖoa me, si woyɔna be Crosslink 2, na xɔtuɖaŋua le bɔbɔe to BFT ƒe aɖaŋuɖolawo kple tomenukulawo ƒe ɖekawɔwɔ me. Mɔnu sia si wowɔ wòle bɔbɔe la ɖea xɔtuɖaŋu ƒe tɔtrɔwo dzi kpɔtɔna eye wòɖea mɔ be woazã "dummy" BFT layer, si wɔnɛ be wònɔa bɔbɔe be woawɔ kpɔɖeŋu eye woatsɔe ade dɔwɔwɔ me esime wole dedienɔnɔ ƒe dzidzenu kɔkɔwo me ɖe asi.

Dɔwɔwɔ ƒe ɖoɖoa lɔ mɔfiame si me wobu mɔ̃ɖaŋununya ƒe gazazãwo le hena Crosslink 2* tsɔtsɔ de Zcash ƒe Zebra asisi me. Dɔwɔwɔ vivivi sia ku ɖe dadasɔ le amesiwo kpɔ gome le eme ƒe dzideƒonamenuwo, tɔtɔ dzi ɖeɖe kpɔtɔ, kple ɖekawɔwɔ kple Zcash ƒe taɖodzinuwo hena dzidziɖedzi, zazã, kple ɖoɖowɔwɔ ɖe teƒe bubuwo ŋu. Kakaɖedzi si le dzidzim ɖe edzi ɖe ɖoɖowɔɖia ƒe dedienɔnɔ ƒe nɔnɔme sesẽwo ŋu gasẽ ɖe edzi be eƒe ŋutete nye afɔɖeɖe vevi aɖe le Zcash ƒe tɔtrɔ me. To ŋusẽzazã nyuie gbɔ kpɔkpɔ kple nukpɔsusu ɖeka ƒe mɔnuwo dodo ɖe ŋgɔ me la, Crosslink naa egbɔkpɔnu si kpɔa ŋgɔ na blockchain ƒe kuxi siwo le tɔtrɔm. Ne èdi nyatakaka bubuwo la, kpɔ... [GitHub repository](https://github.com/ShieldedLabs/crosslink-deployment) kple... [Zcash Nutome Takpekpe](https://forum.zcashcommunity.com).

### Crosslink ƒe Taɖodzinuwo Kple Taɖodzinuwo

Wotrɔ asi le Crosslink Protocol la ŋu be wòakpɔ aɖaŋuɖoɖo ƒe taɖodzinu geɖe siwo le vevie na Zcash ƒe etsɔme gbɔ:

1. **Dziɖuɖu ƒe ɖoɖowo tsɔtsɔ de asi na amewo**:
   * To PoS dede eme me la, Zcash ɖea ŋuɖoɖo ɖe PoW hardware tɔxɛwo (ASIC) ŋu dzi kpɔtɔna, si zi geɖe la, eƒoa tomenukuŋusẽ nu ƒu ɖe dɔwɔƒe gã ʋee aɖewo dome.
   * PoS ɖea mɔ na gomekpɔkpɔ tso nuto si keke ta wu gbɔ, afisi gakulawo tsɔa woƒe nunɔamesiwo dea afɔku me be woakpɔ network la ta, si ana woakpɔ egbɔ be woma nukpɔsusu ɖeka si woma wu.
   * To staked validation toto vɛ me la, ɖoɖowɔɖia kpɔa egbɔ be ganyawo me gomekpɔlawo wɔa akpa vevi aɖe le nukpɔsusu ɖeka me, si ɖea ŋuɖoɖo ɖe tomenukuƒewo ɖeɖeko ŋu dzi kpɔtɔna.
2. **Dziɖuɖu si Wodo Ðe Ŋgɔ**:
   * Gakuxɔlawo kpɔa gome le akɔdada me to gadede asi me, si wɔnɛ be woate ŋu akpɔ ŋusẽ ɖe nyametsotso siwo ku ɖe network ƒe nyonyo, gazazã ƒe mama, kple lãwo ƒe agbenɔnɔ ƒe ɖoɖo siwo le vevie wu ŋu dzi. Demokrasi ƒe mɔnu sia naa ɖoɖowɔɖia ƒe tɔtrɔ sɔ kple nutoa me tɔwo ƒe didiwo.
3. **Ŋusẽ Zazã Nyuie**:
   * Trɔtrɔ ɖe PoS ŋu ƒe akpa aɖe ɖea ŋusẽ ƒe hiahiã dzi kpɔtɔna ŋutɔ, si wɔnɛ be Zcash sɔ kple xexeame katã ƒe ŋgɔyiyi ƒe ɖoɖowo. Le dzɔdzɔme nu la, PoS mexɔa nunɔamesi geɖe o ne wotsɔe sɔ kple PoW si ƒe akɔntabubu kpekpe. Hybrid systems ƒe taɖodzinue nye be woaɖe ŋusẽzazã dzi akpɔtɔ ne wotsɔe sɔ kple PoW-only systems esime wole dedienɔnɔ gã aɖe me tom.
4. **Ganyawo ƒe Dedienɔnɔ kple Nusiwo Li Eteƒe Didi**:
   * PoW kple PoS tsɔtsɔ ƒo ƒui naa ganyawo ƒe dzideƒonamenu vovovowo na network gomekpɔlawo, si naa dedienɔnɔ sesẽ nɔa anyi evɔ womeɖoa ŋu ɖe mɔnu ɖeka ŋu fũu akpa o.
   * Staking hã to teƒeɖoɖo ƒe kpɔɖeŋu si woate ŋu agblɔ ɖi vɛ na gomekpɔlawo, si wɔnɛ be wòhea susu aɖe vɛ na gadelawo ɣeyiɣi didi.
5. **Dedienɔnɔ ƒe dzidziɖedzi**: Crosslink ƒe taɖodzinue nye be yeana network la nate ŋu anɔ te ɖe kɔsɔkɔsɔ gbugbɔgaɖoɖo ƒe amedzidzedzewo nu to PoS tsɔtsɔ kpe ɖe PoW ŋu me.

## Nukpɔkpɔ / Nusɔsrɔ̃

![image](/content-images/b34afda4-fe33-448f-b0dd-279fd6cef1f5-73f58cdcc6.webp)

Bu agbalẽviwo ƒe dɔwɔƒe aɖe si naa agbalẽ vovovo eve hena agbalẽ ɖeka ɖoɖo ɖe amewo ŋu kpɔ. Gbãtɔ nye tracking scan: edzena kabakaba, egblɔa afisi agbalẽvi la anya le wu, eye woɖɔnɛ ɖo ɣeaɖewoɣi. Evelia nye agbalẽ si dzi woŋlɔ nu ɖo be woatsɔe ayi na amewo: eva ɖona emegbe, gake ne enya li ko la, ame aɖeke meʋlia nya le eŋu o.

Ledger si ƒe ɣeyiɣi le bɔbɔe wue nye tracking scan, eye ledger si wowu enu lae nye gaxɔgbalẽvi si wode asi ete. Wo ame evea siaa ƒo nu tso nudzɔdzɔ siwo kplɔ wo nɔewo ɖo ɖeka ma ke ŋu; woto vovo le alesi wodzena kabakabae kple alesi woléa woe sesĩe me.

Dedienɔnɔ ƒe Nɔnɔme nye nusi nudzraɖoƒea wɔna ne gaxɔgbalẽvi siwo wode asi ete la dzudzɔ vava esime scan-wo yi edzi le dzidzim ɖe edzi. Parcels gakpɔtɔ zɔna to xɔa me — gake ɔfis la dzudzɔa fexexe ɖe scan ɖeɖeko ta vaseɖe esime asidede agbalẽ te la va ɖo.

## Deep Dive (Tsi me tsi goglo).

### Dedienɔnɔ Kple Dɔwɔwɔ ƒe Taɖodzinuwo le Crosslink

Crosslink ƒe ɖoɖowɔɖia ƒe taɖodzinue nye be yeana agbalẽ gã ƒomevi eve na Zcash: **agbalẽ gã si wowu enu (LOG_fin)** kple **agbalẽ gã si ƒe ɣeyiɣi mede o (LOG_ba)**. Ledger si wowu enu la kpɔa egbɔ be rollback dedienɔnɔ le susu siwo sɔ ku ɖe Byzantine Fault Tolerance (BFT) alo blockchain (BC) protocol ŋu. Wotrɔ asi le eŋu be wòanɔ agbe eye wòanɔ dedie le network ƒe mamawo gɔ̃ hã te, kple latency si wu Zcash blockchain si li fifia tɔ ƒe teƒe eve vie hena block ƒe kpeɖodzi siwo sɔ.

Ledger si le anyime la kekea ledger si wowu enu la ɖe enu wu *L* blocks. Ekpɔa egbɔ be rollback dedienɔnɔ le blockchain protocol ɖeɖeko te eye wòléa latency kple dedienɔnɔ me ɖe asi mevɔ̃ɖi wu Zcash ƒe kpɔɖeŋu si li fifia o. Le Crosslink 2* ƒe ɖoɖo si wowɔ wòle bɔbɔe me la, latency ledger si le anyime la naa ŋgɔyiyi kple exɔxlɔ̃ nɔa bɔbɔe to dɔwɔwɔ abe PoW kɔsɔkɔsɔ ene me.

![image](/content-images/fd039664-4852-4fb0-8c88-0615f1ed116e-41459b81dc.webp)

### Bounded Availability kple Dedienɔnɔ ƒe Nɔnɔme

Crosslink tsɔ **Dedienɔnɔ ƒe Nɔnɔme** de eme be woatsɔ akpɔ afɔku siwo do ƒome kple agbalẽ si ƒe ɣeyiɣi bɔbɔ wu si le du dzi sã do ŋgɔ na agbalẽ si wowu enu la gbɔ. Esia xea mɔ na masɔmasɔwo, abe akɔntabubu ƒe nɔnɔme siwo meda sɔ o alo dedienɔnɔ ƒe dometsotso siwo ŋu womeɖo kpee o le ɣeyiɣi kpui aɖe ƒe egbɔkpɔnu siwo dɔwɔƒe siwo naa kpekpeɖeŋu amewo wɔna me ene. Wowɔa Dedienɔnɔ ƒe Nɔnɔme ne ledger si wowu enu la tsi megbe wu *L* blocks si nɔa anyi ɖaa. Le nɔnɔme sia me la, blockchain la yia PoW dɔwɔwɔwo dzi (si kpɔa egbɔ be dedienɔnɔ veviwo), gake wotɔa ganyawo ƒe dɔwɔnawo vaseɖe esime wokpɔ nyaa gbɔ. Wotrɔ asi le mɔnu sia ŋu be wòahaya tso nɔnɔme tɔxɛwo abe amedzidzedze gãwo ene me esime wòle asi kpem ɖe ɖoɖo siwo wotu ɖe dziɖuɖu dzi le megbedede ŋu.

### Mɔ̃ɖaŋu Ŋuti Nyatakakawo Kple Wo Zazã

Shielded Labs le Crosslink Protocol la wɔm vevie hele ezãm le nuwɔwɔ aduadu kple lãwo ƒe agbenɔnɔ ŋuti dɔwɔha veviwo abe Zodl ene. Ðoɖoa ƒe dɔwɔwɔ ƒe akpa aɖewoe nye:

* Asidadamɔnu siwo le dedie ɖoɖo anyi na PoS gomekpɔlawo.
* Trɔtrɔ le teƒeɖoɖo ƒe ɖoɖoa ŋu be wòada asɔ le dzideƒonamenu siwo le tomenukulawo kple amesiwo le ga me dome.
* Kakaɖedzi nana be megbenyawo sɔ kple wo nɔewo eye zãla ƒe nuteƒekpɔkpɔ si me kuxi aɖeke mele o le tɔtrɔa me.
* Notary System: Nuŋlɔɖiwɔla siwo dea asi agbalẽ te le blockwo dzi la dea ɖoɖowɔɖia me. Le gɔmedzedzea me la, wozãa static notaries, trɔna yia dynamic system si me wotua notaries le staked ZEC dzi.
* Activation Logic: Crosslink ƒe dodo bia be woatrɔ asi le Zcash ƒe nukpɔsusu ɖeka ƒe sewo ŋu, siwo dometɔ aɖewoe nye be woaɖe stake mama ƒe ɖoɖoa gɔme eye woawɔ network protocol ƒe sewo yeyee be woado alɔ hybrid consensus.
* Akpaɖekedzimademade: Woaɖe ɖoɖowɔɖia ɖe go le afɔɖeɖewo me be woakpɔ egbɔ be network la li ke eye nutoa me tɔwo trɔ ɖe nɔnɔmeawo ŋu. Akpa gbãtɔwo ku ɖe mɔ̃ɖaŋununya ƒe dɔwɔwɔ ŋu, eye emegbe dziɖuɖu ƒe ɖekawɔwɔ hena agbalẽŋlɔlawo tiatia.

Àte ŋu aku mɔ̃ɖaŋu ŋuti nyatakakawo me tsitotsito eye nàkpɔ eƒe ŋgɔyiyi to... [Crosslink Deployment Nudzraɖoƒe le GitHub dzi](https://github.com/ShieldedLabs/crosslink-deployment).

## Nusiwo wòfia ŋutɔŋutɔ

### Ŋusẽkpɔɖeamedzi ɖe PoW Tomenukulawo ƒe Gakpɔkpɔ Dzi

Crosslink lɔ̃ ɖe akpa vevi si PoW tomenukulawo wɔna le Zcash ƒe ŋgɔyiyi gbãtɔ me dzi esime wole dzadzram ɖo ɖe tɔtrɔ vivivi ŋu:

* **Woɖe Block ƒe Teƒeɖoɖowo Dzi kpɔtɔ**:
  * Le ɣeyiɣi aɖe megbe la, PoS ƒe kpeɖodzinalawo axɔ teƒeɖoɖo ƒe akpa si le dzidzim ɖe edzi, si aɖe PoW tomenukulawo ƒe fetu dzi akpɔtɔ. Gbugbɔmamã sia ɖe akpa si PoW wɔna si le ɖeɖem kpɔtɔ le hybrid model la me fia.
* **Tɔtrɔ Dzɔdzɔe**:
  * Ðoɖoa toa tɔtrɔwo vɛ vivivi, si kpɔa egbɔ be ɣeyiɣi si sɔ le tomenukulawo si be woatrɔ asi le akpa yeyewo ŋu alo aku nu me le Zcash ƒe lãwo ƒe agbenɔnɔ ƒe ɖoɖoa me, abe tɔtrɔ yi staking alo nudzɔdzɔ na network dɔwɔna bubuwo ene.
* **Afɔku siwo le Centralization dzi ɖeɖe kpɔtɔ**:
  * Wotrɔ asi le PoS staking pools ŋu be woaxe mɔ ɖe ŋusẽ ƒe ƒoƒo ƒu nu, si ana mɔnukpɔkpɔ fefewɔla suewo be woakpɔ gome le eme sɔsɔe. Mɔnu sia si xɔa amewo katã ɖe eme la tsi tre ɖe alesi wokpɔa tomenukuƒe siwo wotu ɖe ASIC dzi fifia ŋu.
* PoW tomenukulawo akpɔ gakpɔkpɔ dzi ɖeɖe kpɔtɔ esi wogbugbɔ ma block reward ƒe akpa aɖe na PoS validators. Gbugbɔmamã sia naa dzideƒonamenu ƒe ɖoɖo si da sɔ, si ɖoa eteƒe na tomenukulawo kple amesiwo le eme siaa le esi wokpɔ kadodoa ta.
* Woɖoe be woawɔ tɔtrɔ vivivi be woatsɔ aɖe ganyawo ƒe ŋusẽkpɔɖeamedzi ɖe tomenukulawo dzi dzi akpɔtɔ esime wole gomekpɔlawo ƒe gomekpɔkpɔ dom ɖe ŋgɔ.

Mɔnu sia si dzi woda asi ɖo zi eve la doa ŋusẽ Zcash ƒe ɖokuitsɔtsɔna ɖe ame ŋutɔ ƒe nyawo gbɔ kpɔkpɔ, nusiwo li tegbee, kple dziɖuɖu ƒe ɖoɖowɔwɔ ŋu, si na wòɖoe be enye kplɔla si kpɔa ŋgɔ le blockchain ƒe teƒea.

## Vodada Siwo Wowɔna Zi geɖe

**Crosslink xexlẽ abe se si dzi woda asi ɖo si le dɔ wɔm ene**. Axa sia ƒo nu tso aɖaŋu si wodo ɖa ŋu kple ɖoɖo si wowɔ ɖe dɔwɔwɔ ŋu vivivi. E dodo ɖe ŋgɔ bia be woawɔ tɔtrɔ le Zcash ƒe nukpɔsusu ɖeka ƒe sewo ŋu, si nye nusi ta mɔfiame kple Zebra ƒe ɖekawɔwɔdɔa nye.

**Ne míetsɔe be PoS xɔ ɖe tomenukuƒewo teƒe**. Crosslink nye aɖaŋu si wotsɔ tsaka: PoW block wɔwɔ yi edzi kpe ɖe staked validation ŋu. Le Dedienɔnɔ ƒe Nɔnɔme gɔ̃ hã me la, blockchain la yia PoW dɔwɔwɔ dzi esime wotɔ te ganyawo ƒe dɔwɔnawo.

**Nuwɔwɔ ɖe "mlɔetɔ" ŋu abe kpeɖodzi si le kabakaba wu ene**. Wotrɔ asi le agbalẽ gã si wowu enu la ŋu na ɣeyiɣi si woatsɔ aɣlae si wu Zcash blockchain si li fifia ƒe teƒe eve vie hena block ƒe kpeɖodzi siwo sɔ. Nusi wòtsɔ kpe ɖe eŋue nye rollback dedienɔnɔ, ke menye duƒuƒu o — lower-latency ledger nye nukpɔkpɔ kabakaba.

**Tɔtɔ le agbalẽ gã eveawo me**. LOG_ba menye kɔsɔkɔsɔ si le eɖokui si o: ekekea agbalẽ gã si wowu enu la ɖe enu wu *L* blocks, eye le Crosslink 2* ƒe nɔnɔme me la, ewɔa dɔ abe PoW kɔsɔkɔsɔ ene.

## Axa Siwo Do Ƒome Kplii

- [Zebra ƒe Node Bliboe](/zcash-tech/zebra-full-node) — woɖoe be woatsɔ Crosslink 2* awɔ ɖeka kple asisi la.
- [Nodes Blibowo](/zcash-tech/full-nodes) — alesi nodes da asi ɖe se siwo dzi woda asi ɖo dzi egbea, hafi nukpɔsusu ɖeka si wotsɔ tsaka ɖesiaɖe natrɔ.
- [Netwɔƒea ƒe Ðɔɖɔɖowo](/start-here/network-upgrades) — alesi se ƒe tɔtrɔ siwo dzi woda asi ɖo ɖoa Zcash network la gbɔe.
- [Zcash Ganyawo Ŋuti Ðoɖo](/start-here/zcash-monetary-policy) — block reward structure si Crosslink agbugbɔ ama.

## Dɔwɔnu Bubuwo

- Nutoa me tɔwo ƒe gɔmesesewo: [Zcash Hadome Takpekpe - Crosslink Dzeɖoɖowo](https://forum.zcashcommunity.com)
- Nyatakaka yeye siwo dziɖuɖua gblɔ: [Electric Coin Company Blog](https://electriccoin.co)
- Nusiwo ŋu wotsia dzi ɖo le nusiwo li tegbee ŋu: [Nusita Hybrid PoS Le Vevie Na Zcash](https://forum.zcashcommunity.com)

  Ɖeɖe fiã:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
     <iframe
       className="w-full h-full"
       src="https://www.youtube.com/embed/O4wQi_i7k0I"
       title="Crosslink"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
       ɖe mɔ ɖeFullScreen ŋu
       loading="lazy"
     />
</div>
