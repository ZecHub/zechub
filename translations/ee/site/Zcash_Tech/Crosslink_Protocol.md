<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Crosslink_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Kɔmpiuta ƒe kadodowo ŋuti ɖoɖowɔɖi (Crosslink Protocol)

## TL;DR

* Crosslink protocol nye ɖoɖo si woɖo ɖe Zcash ƒe hybrid Proof-of-Work/Proof of Stake (PoW/PoS) dzi. Etsɔ PoW kpe asi kple Byzantine Fault Tolerance (BFT) ɖoɖoɖoa, eye wòna kakaɖedzi be nuwuwua ava le esi ko ne wo dometɔ ɖeka hã li alo eƒe akpa aɖe kpɔtɔ nɔ dedie la ta.
* Hybrid PoS na notaries siwo léa asi ɖe blocks dzi le stake ZEC  gbã la, wonɔa anyi ɖaa eye emegbe wotiae be woanɔ te ɖe stake zEC dzi.
* Crosslink ƒe taɖodzinue nye be yeana agbalẽ gã eve: ɖeka si ŋu wowɔ ɖoɖo ɖo xoxo (LOG_fin) ** hena tɔtrɔ ɖe megbe le dedienɔnɔ me, eye eveliae nye " low-latency ledger" (LO G ba)** si kekea enu wòdea * L* blɔ̃wo dzi.
* Ne agbalẽ si me nyawo le la ƒe akpa aɖe gbɔ eme wu *L* blowo ko la, woɖea mɔ̃a be wòayi edzi anɔ ʋiʋlim gake ɖeko dɔwɔlawo tsia tre va se ɖe esime wokpɔ nyaa gbɔ.
* Le ɣeyiɣi aɖe megbe la, PoS validators axɔ teƒeɖoɖowo ƒe akpa si le dzidzim ɖe edzi eye esia ana be PoW-dɔlawo ƒe fetu dzi naɖe akpɔtɔ; ɖoɖo sia va trɔna vivivi.
* Shielded Labs le ɖoɖo sia wɔm, eye wole mɔfiamɔ aɖe si dzi woato awɔ Crosslink 2* ɖe Zcash ƒe Zebra client me la hã ɖom.

## Nya Vevi Siwo Woɖe Fia

### Ŋgɔdonya: Zcash Hybrid PoS kple Crosslink Protocol

Crosslink Protocol nye ŋgɔyiyi vevi aɖe le Zcash ƒe tɔtrɔ me, eye wòna wòva zu **Hybrid Proof-of-Stake (PoS) ** kple **Proof- of-Work (PoW) ** model. Traditional PoW, esi wònye be kakaɖedzi li na kadodoa ta kpɔkpɔ la, ele nya hem ɖe eŋu le ŋusẽ zazã kple centralization afɔku siwo do ƒome kple tomenuku ŋu. Crosslinke ɖo hybrid system anyi, si tsɔ kpeɖodziwo tso PoW ƒe sesẽme kpakple viɖe siwo le PoS dzii hekpe ɖe eƒe dɔwɔna nyui ŋuti.

![image](/content-images/a2ffb19d-e570-4723-b669-a66e14fc6b71-a727c958de.webp)

Tɔtrɔ sia wɔ ɖeka kple xexeame katã ƒe nuɖoanyiwo le blockchain wɔwɔ me, afisi dɔwɔnawo trɔna yia nugbegblẽwɔwɔ si gbɔ eme eye woɖea mɔ ɖe nuwo ŋu dzi. Crosslinks' double consensus model naa Zcash kpɔa eƒe cryptographic privacy guarantees sesẽawo ta esime wòle tɔtrɔm be wòakpɔ egbegbe kuxiwo gbɔe.

Hybrid Proof-of-Stake (PoS) ƒe mɔnu la tsɔa kɔnuwo kple PoS ƒoa ƒu, si nye be woatsɔ akpɔ nu siwo ŋu afɔku le abe 51% dzi dzedze ene gbɔ eye woana ŋusẽ zazã nanɔ anyi. Hybrid PoS naa agbalẽŋlɔla aɖewo va léna ɖe mɔ̃wo me to ZEC dzi. Wowɔ ɖoɖo sia ale be wòado ŋgɔ na kɔsɔkɔsɔ ŋuti dedienɔnɔ kpakple teƒeɖoɖowo ŋudɔwɔwɔ nyuie wu esi wozãna ko hafi wɔa dɔe.

### Nukatae wòle be woazã PoS/PoW si nye mɔ̃ɖaŋunuwo ƒe mɔnu gbãtɔ?

* Ewɔ ŋgɔyiyi va ɖo teƒe si woazã Internet le.
* Enaa wote ŋu wɔa tomenuku kple tsatsadada le ɣeyiɣi ɖeka me eye wònana wotea ŋu toa ɖoɖo vovovowo dzi yia ŋgɔ.
* Eɖea dedienɔnɔ ƒe kuxiwo dzi kpɔtɔna vaseɖe esime ame si le edzi kpɔ ge la naxɔ asi nɛ eye wòka ɖe edzi.
* Ethereum le Dɔwɔƒe la ɖe alesi wòwɔnae fia.

### Nukae nye Crosslink?

The Crosslink protocol is a proposed design for Zcash's hybrid Proof-of-Work/Proof-of-Stake (PoW/PoS) stage. It integrates PoW with a Byzantine Fault Tolerance (BFT) protocol, enabling assured finality as long as either PoW or PoS remains secure. The design aims to strengthen network security and decentralization by incorporating staked validation while maintaining miner participation. A key feature of the proposal, called Crosslink 2, simplifies the architecture by unifying BFT proposers and miners. This streamlined approach minimizes structural changes and allows the use of a "dummy" BFT layer, making it easier to prototype and deploy while maintaining high-security standards.

The implementation plan includes a roadmap with estimated engineering costs for integrating Crosslink 2* into Zcash's Zebra client. This phased deployment focuses on balancing stakeholder incentives, reducing disruption, and aligning with Zcash goals for scalability, usability, and decentralization. Growing confidence in the protocol's robust security properties further solidifies its potential as a key step in Zcash evolution. By addressing energy efficiency and enhancing consensus mechanisms, Crosslink offers a forward-looking solution to evolving blockchain challenges. For more details, refer to the [GitHub ƒe nudzraɖoƒe](https://github.com/ShieldedLabs/zebra-crosslink) kple nu siwo le eme. [Zcash Community Forum (Zaka ƒe Kɔmitia)](https://forum.zcashcommunity.com).

### Crosslink ƒe Taɖodzinuwo kple taɖodzinuwo

Wowɔ Crosslink Protocol be wòakpe ɖe ɖoɖo siwo hiã vevie le Zcash ƒe etsɔme ŋu:

1. **Ðeɖekpɔkpɔ le dziɖuɖumegãwo te**:
   * To PoS zazã me la, Zcash ɖea asi le dɔwɔnu siwo wotsɔna wɔa dɔe (ASIC) ŋu si nana be ame ʋɛ aɖewo koe kpɔa ŋusẽ ɖe tomenuku dzi.
   * PoS naa mɔnukpɔkpɔ ame geɖe be woade ha, eye gaxɔlawo tsɔa woƒe nunɔamesiwo ɖoa asii tsɔ kpɔa nyatakakadzraɖoƒea ta. Esia wɔnɛ be amewo ƒe susu toa vovo le nu si wowɔna ŋu.
   * To mɔ̃ɖaŋununya sia dzi la, wokpɔa egbɔ be ganyawo me tɔwo wɔa akpa vevi aɖe le ɖoɖowɔwɔ ɖe nuwo ŋu ƒe nyaa gbɔ kpɔkpɔ me eye esia wɔnɛ be womegatsia dzi ɖe tomenuku ɖeɖe ko ŋu o.
2. ** Dziɖuɖu si Wodo Ŋgɔ**:
   * Gaxɔlawo xɔa gome le dziɖuɖudɔwɔƒewo to woƒe ga si woɖena la dede me, eye esia wɔnɛ be wote ŋu kpɔa ŋusẽ ɖe nyametsotso siwo wowɔna ku ɖe kadodoawo tutuɖowo kple ɖoɖowɔwɔ na ganyawo kpakple nu gbagbewo ƒe nyonyo ŋuti nyawo dzi. Mɔ̃ɖoɖo sia nana amewo wɔa ɖeka ne wole dɔ wɔm tso protokolua ŋu abe ale si ko wòhiã ene.
3. ** Ŋusẽdɔwɔwɔ nyuie**:
   * Ne woɖɔli PoS ƒe akpa aɖe la, enana be ŋusẽdɔkpɔkpɔ dzi ɖena kpɔtɔna ale gbegbe eye wònana Zcash wɔa ɖeka kple xexeme katã me nu siwo hiã. Ehiãa ga geɖe wu ne wotsɔe sɔ kple esi wozã le kɔmpiutawo ŋu si nana amewo tsɔa dzo ɖe eŋu vevie o. Mɔ̃ɖaŋunu vovovo siawo zãa elektrikŋusẽ ʋɛ wu esiwo wotsɔ wɔ mɔ̃ɖaŋununyawoe gake womegblẽa naneke le woƒe dedienɔnɔ hã ŋu o.
4. ** Ganyawo ƒe Dedienɔnɔ Kple Ŋutifafa**:
   * Ne wotsɔ PoW kple PoS wɔ ɖeka la, enana ganyawo ƒe viɖewo nɔa ame geɖe ŋu eye wònana wokpɔa dedienɔnɔ ta evɔ wometsɔa mɔ̃ɖaŋunu aɖe ko ɖoa dɔe o.
   * Dɔwɔƒe sia hã na mɔnukpɔkpɔa dɔwɔlawo be woade asixɔxɔ woƒe dɔwɔnawo ŋu, eye esia nana wòdzɔa dzi na ɣeyiɣi didi ƒe asisiwɔlawo.
5. ** Dedienɔnɔ ƒe Dzidziɖedzi: Crosslink di be yeana kadodoa nanɔ kplikplikpli kple adzamenuwo to eƒe dɔwɔwɔ ɖe PoS ŋu me.

## Ŋutega / Nuŋububu

![image](/content-images/b34afda4-fe33-448f-b0dd-279fd6cef1f5-73f58cdcc6.webp)

Bu nuɖoanyi aɖe si naa agbalẽ eve siwo to vovo le ɖoɖo ɖeka me ŋu kpɔ: gbãtɔe nye numekuku, eye wòɖea afi si nuawo anɔ la fiana kaba; eveliae nye ɖaseɖigbalẽvi si dzi woŋlɔ asi ɖo be woaxɔ wo vɛ na ame - wova ɖe megbe hafi va ɖo gake ne wokpɔ eteƒe ko la womegbea nya o.

Agbalẽ si me nyawo nɔa ɖiɖim le vie wu enye agbalẽ siwo ŋu wowɔ numekuku ɖo, eye esi nu va yi la nye esiwo dzi woŋlɔ ŋkɔ ɖo. Wo ame evea siaa ɖɔ nudzɔdzɔawo ƒe ɖoɖo ɖeka; vovototowo li tso ale si wo dzena kabae kple alesi woléa eme ɖe asii gbɔ.

Dzɔdzɔmefɔɖoanyi nye nusi dzraɖoƒe wɔna ne agbalẽ siwo dzi woda asi ɖo megale vavam o eye numekukuwo le agbɔ sɔm ɖe edzi. Ðɔdzɔwo gakpɔtɔ nɔa xɔa me  gake dɔwɔƒea megadzraa nu si wòda asi ɖo la ko ƒe fewo na wo o vaseɖe esime asinuŋɔŋlɔawo katã ava nɔ anyi.

## Ƒu Tsi Kɔkɔe

### Crosslink ƒe Dedienɔnɔ Kple Dɔwɔwɔ Ŋuti Taɖodzinuwo

Crosslink ɖoɖoɖoa ƒe taɖodzinu enye be yeana agbalẽ gã eve na Zcash: a ** finalized ledger (LOG_fin)** kple a ** lower-latency ledger, si nyea nuŋɔŋlɔwo me le ɣeyiɣi kpui aɖe megbe. Enaa kakaɖedzi ame siwo xɔe se nyuie be ele Byzantine Fault Tolerance alo blockchain protocol la dome ne wowɔ ɖoɖo sia ɖe wo ŋu. Woɖoe nenema bena wòanɔ agbe eye wòakpɔtɔ anɔ dedie nenye be wole kadodo dzi kple woƒe nudzraɖoƒe hã, gake eƒe didime megbɔna egbegbe Zcash blockade tɔ gbɔ wu zi eve o hena kpeɖodzi bubuwo ɖeɖe ko.

The lower-latency ledger extends the finalized ledger by no more than *L* blocks. It ensures rollback safety under the blockchain protocol alone and maintains latency and security no worse than the existing Zcash model. In the streamlined Crosslink 2* design, the lower latency ledger simplifies development and adoption by functioning as a PoW chain.

![image](/content-images/fd039664-4852-4fb0-8c88-0615f1ed116e-41459b81dc.webp)

### Mɔ̃ si ŋu womate ŋu awɔ naneke le o kple mɔ̃ siwo dzi woazãna atsɔ akpɔ egbɔe

Crosslink incorporates a **Safety Mode** to address risks associated with the lower-latency ledger running far ahead of the finalized ledger. This prevents discrepancies, such as imbalanced account states or unverified security gaps in temporary solutions by service providers. Safety Mode is activated if the finalized ledger falls behind by more than a constant *L* blocks. During this state, the blockchain continues PoW operations (ensuring basic security), but economic activities are paused until the issue is resolved. This mechanism is designed to recover from exceptional conditions like major attacks while supporting governance-based rollback policies.

### Mɔ̃ɖaŋununya Kple Ale Si Woazãe

Shielded Labs le Crosslink Protocol la dzi wɔm hele edom ɖe edzi kple eƒe dɔwɔhati siwo nye nu gbagbewo ƒe ɖoɖowɔɖi vevi abe Zodl ene. Eƒe dɔwɔna lɔ:

* Woana mɔ̃ siwo dzi woato awɔ dɔ sia la nanɔ anyi na dɔwɔlawo.
* Woatrɔ fetu ƒe ɖoɖowo be woana amesiwo le tomenuku wɔm kple esiwo kpɔa gome le dɔ me la nakpɔ ɖekawɔwɔ.
* Ne woana nuwo nanɔ ɖoɖo nu eye ame bubuwo hã nawɔe nenema la, ke ele be woawɔ tɔtrɔ siwo hiã.
* Notary System: Nuŋlɔɖigbalẽa me nyawo nye notaries siwo dea dzesi nu le agbalẽawo dzi. Gbã la, wozã static notaries eye wova trɔ ɖe dynamic system si me wotia nutatawo to ZEC ƒe kpeɖodzi dzii ŋu.
* Akɔdada ƒe susu: Crosslink ɖoɖowo wɔwɔ bia be woatrɔ asi le Zcash dziɖuɖua ŋu, eye esia lɔ nu siwo me wozãa ga si amewo da ɖe gameawo ta la ɖeɖe kple nyatakaka bubuwo zazã atsɔ akpe asi ɖe kadodo yeye sia ŋu.
* Mɔɖeɖewo ƒe ɖoɖowɔɖi: Woawɔ ɖoɖoa le mɔ vovovowo nu be woakpɔ egbɔ be kadodoa me anɔ anyi ɖaa eye nutoa me tɔwo hã nawɔ ɖe edzi. Gbãtɔawo ku ɖe mɔnu siwo dzi woato awɔ dɔa ŋu, emegbe wova wɔ ɖoɖo si ana woaɖo nutatalawo la ŋuti dɔ nyuie wu.

Àte ŋu adzro mɔ̃ɖaŋununyawo me eye nàkpɔ ale si wole edzii la le Internet dzi. [zebra-crosslink nuɖugba le GitHub dzi.](https://github.com/ShieldedLabs/zebra-crosslink) kple [Zebra-Crosslink Agbalẽa](https://shieldedlabs.github.io/zebra-crosslink/).

## Nusiwo Woate Ŋu Awɔ le Agbe Me

### Dɔ Siwo Wowɔna Ðe Kpovitɔwo Ƒe Ganyawo Dzi

Crosslink lɔ̃ ɖe dɔ vevi si PoW-dɔwɔlawo wɔ le Zcash ƒe ŋgɔyiyi me dzi eye wole dzadzram ɖo na tɔtrɔ vivivi:

* **Ðevi siwo woxe ɖe ame ta ƒe fetuwo**:
  * Le ɣeyiɣi aɖe megbe la, PoS validators axɔ teƒeɖoɖowo ƒe akpa si le dzidzim ɖe edzi eye esia ana be PoW-dɔlawo ƒe fetu dzi naɖe akpɔtɔ. Numeɖeɖe yeye sia ɖee fia be dɔ siwo wowɔna to PoW zazã me va nɔ tsitsim ɖe enu le hybrid model la me.
* **Tɔtrɔ si le Dzɔdzɔe Dim**:
  * Ðoɖowɔɖia ɖea tɔtrɔwo fiana vivivi, si nana be ɣeyiɣi sɔ gbɔ le tomenukulaawo si woatrɔ ɖe nɔnɔmea ŋu alo adzro akpa yeye siwo woawɔ le Zcash ƒe nutoa me la me. Wo dometɔ aɖewoe nye asitɔtrɔ ayi dɔdzikpɔlawo dzi loo alo asiɖeɖe le dɔwɔnu bubuwo ŋuti.
* **Ðeviwo ƒe Ðekawɔwɔ le Dɔwɔƒewo me Kpɔkpɔ**:
  * Wowɔ PoS staking poolwo be woagatsɔ ŋusẽ ade ame bubuwo dzi o, eye wona mɔnukpɔkpɔ amesiwo le sue wu la hã be woakpɔ gome le eme sɔsɔe. Mɔnu sia si me amewo katã nɔna ɖe nu ŋu tsi tre ɖe alesi wole asi trɔm le ASIC-dzigbledɔ mee fifia la ŋuti.
* Ga si PoW-dɔwɔlawo kpɔna la dzi aɖe kpɔtɔ elabena woagatsɔ ga siwo wokpɔna le woƒe dɔwo me ƒe akpa aɖewo ana ame siwo kpɔa ŋusẽ ɖe dɔwɔƒe sia dzi. Esia nana be ɖoɖo nyui nɔa dɔwɔwɔa ŋu eye wònana mɔnukpɔkpɔ sua tomenukula kple amesiwo wɔa dɔa siaa si na woakpɔ egbɔ be yewowɔ nu nyuie.
* Wowɔ ɖoɖo be woatrɔ asi le eŋu vivivi atsɔ aɖe gakuxi siwo adzɔha me tɔwo akpɔ la dzi kpɔtɔ eye woakpɔ gome le dɔ sia wɔwɔ me.

Nuwɔwɔ kple ame nɔewo le ɖoɖo sia nu doa ŋusẽ Zcash ƒe adzɔgbeɖeɖe ɖe dedienɔnɔ, agbenɔnɔ si anɔ anyi ɖaa, kple dziɖulanyenye ŋu eye wòtsia edzi wònyea ŋgɔxɔla siwo kpɔa etsɔme ɖa la dometɔ ɖeka.

## Vodada Siwo Dzɔna Zi Geɖe La

** Crosslink xexlẽ abe nuɖoanyi si le dɔ wɔm ƒe ɖoɖo ene**. axa sia ƒo nu tso aɖaŋuɖoɖo aɖe ŋu kple eƒe dɔwɔwɔ me tsotsowo ŋuti ɖoɖoa. Etsɔ ɖe eme bia tɔtrɔwɔwɔ na Zcash ƒe nyaŋuɖui-dziɖuɖu, eye esia tae mɔdzesia kple Zebra ƒokpli dɔa li ɖo.

**Ne míebui be PoS va xɔ ɖe tomenuku teƒe**. Crosslink nye ɖoɖo si me wotrɔ asi le: Woyi edzi wɔa PoW blɔkwo kple wo nɔewo ƒe dɔwɔwɔ dzi, eye wowɔa woƒe dɔ hã nenema ke. Ne wole Safety Mode la gɔ̃ hã la, blockchain yi edzi nɔa wɔwɔm na PoW-dɔwɔƒewo esime wogblẽ ga domee.

**Etsɔ "finity" sɔ kple kpeɖodzi si le bɔbɔe wu**. Wowɔ agbalẽ gbadzaa be eƒe didime nade zi gbɔ zi eve nu vie tsɔ wu esi li na Zcash blockchain fifia ƒe dodowo ne woaɖo kpe edzii la. Nusi wògblẽ ɖe anyi enye dedienɔnɔ, menye kaba o  nuŋlɔɖi siwo me wodea ame dzi fũu akpa ye nye esiwo woɖena fiana kabakaba.

**Tɔtɔ le agbalẽ eveawo dome**. LOG_ba menye kɔsɔkɔsɔ si to vovo o: eɖe nuŋlɔɖi siwo ŋu wowɔ ɖoɖo ɖo la ɖe enu wòde *L* blɔkwo dzi, eye ele dɔ wɔm abe PoW-mɔ̃ aɖe ene le Crosslink 2* ƒe wɔwɔme me.

## Axawo Siwo Do Ka Kple Wo Nɔewo

- [Zebra ƒe Dzogoe Blibo la](/zcash-tech/zebra-full-node)  Client si me woɖoe be woaƒo Crosslink 2* ɖo.
- [Nuwo ƒe Ŋutete Blibo](/zcash-tech/full-nodes)  alesi nodwo léa asi ɖe ɖoɖo siwo dzi wowɔ ɖeka le ŋu egbea, hafi woawɔ tɔtrɔ ɖesiaɖe si ava to mɔ vovovoawo ƒe nubabla me.
- [Ʋuʋu le Mɔ̃wo Ŋu](/start-here/network-upgrades)  alesi ɖoɖo si dzi wowɔ ɖeka ɖo la va ɖoa Zcash-a me.
- [Zcash Gakuxiwo ƒe Mɔfiamewo](/start-here/zcash-monetary-policy)  blɔki ƒe teƒeɖoɖo si Crosslink ana wo.

## Kpekpeɖeŋu Bubuwo

- Dukɔ me tɔwo ƒe susuwo: [Zcash Community Forum - Crosslink Dzodzrowo](https://forum.zcashcommunity.com)
- Nyatakaka yeyewo: [Electric Coin Company ƒe Blog](https://electriccoin.co)
- Ŋkuɖoɖo nu siwo ava dzɔ dzi: [Nu Si Tae Kɔmpiutawo Ƒe Dɔwɔƒe (POS) Le Vevie Na Zcash La](https://forum.zcashcommunity.com)

  Nya siwo gbɔna:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
     <iframe
       className="w-full h-full"
       src="https://www.youtube.com/embed/O4wQi_i7k0I"
       title="Crosslink"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
       allowFullScreen
       loading="lazy"
     />
</div>
