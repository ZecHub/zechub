<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Crosslink_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Crosslink Ƒe Mɔɖoɖo

## Nu Si Wòle Be Nànya Le Kpuie

* Crosslink ƒe mɔɖoɖo nye ɖoɖo si woɖoe be wòanye Zcash ƒe Proof-of-Work/Proof-of-Stake (PoW/PoS) ƒe ƒomekɔkɔe ƒe akpa. Eƒoa PoW kple Byzantine Fault Tolerance (BFT) ƒe mɔɖoɖo nu, eye eƒea nuwuwu kakaɖedzi be woakpɔ ɖe edzi ne PoW alo PoS ɖeka koe gale dedie.
* Ƒomekɔkɔe PoS va kple notarywo siwo doa gaɖoɖowo ƒuƒoƒewo ɖe edzi le ZEC si woƒoe le ga ƒuƒoƒo [staking] me dzi — gbã la, wole te ɖe teƒe ɖeka; megbe la, woatia wo le ZEC si woƒoe le ga ƒuƒoƒo me dzi.
* Crosslink ƒe ta nye be wòana agbaleƒoƒo eve: **agbaleƒoƒo si wotsɔ nuwuwu wɔe (LOG_fin)** na trɔtrɔ megatrɔ o ƒe dedie, kple **agbaleƒoƒo si me gãmesese ƒe mɔnu mekpɔ akpa (LOG_ba)** si do ŋgɔ na eƒe gaɖoɖowo ƒuƒoƒe *L* ko.
* **Dedienɔnɔ ƒe Mɔnu** dzea dzi ne agbaleƒoƒo si wotsɔ nuwuwu wɔe megbe akpa wu gaɖoɖowo ƒuƒoƒe *L*: PoW yi edzi, ke ga ƒe dɔwɔwɔwo katã tɔ gbɔ va se ɖe esia ƒe fifi me.
* Ɣeyiɣi yi la, PoS ƒe nusiwo doa gaɖoɖowo ƒuƒoƒe ɖe edzi axɔ fetu ƒe akpa si le dzidzime yi edzi, eye esia aɖe PoW ƒe nukulawo ƒe xɔɖe le anyi; mɔɖoɖoa ɖea tɔtrɔwo ƒe mɔ le vie vie.
* Shielded Labs le mɔɖoɖoa ŋu wɔm, eye mɔɖoɖo li na Crosslink 2* ƒe kɔkɔe ɖe Zcash ƒe Zebra ƒe klient me.
* Crosslink menɔ dɔ wɔm le Zcash ƒe mainnet dzi o. Ele dɔ wɔm le Shielded Labs ƒe Feature Net, afi nudzodzro ƒe network si ame sia ame ate ŋu akpɔ ɖe eŋu. Kpɔ "Afi si Crosslink tsɔ tsi" le anyi.

## Ɖeɖe Me Tɔxɛ

### Gɔmedzedze: Zcash Ƒe Ƒomekɔkɔe PoS Kple Crosslink Ƒe Mɔɖoɖo

Crosslink ƒe Mɔɖoɖo nye ŋgɔyiyi gã aɖe le Zcash ƒe tɔtrɔ me, eye wòkplɔe yi **Ƒomekɔkɔe Proof-of-Stake (PoS)** kple **Proof-of-Work (PoW)** ƒe mɔnu gbɔ. PoW si wozãna le blema, togbɔ be wònye mɔ si dzi womate ŋu aka le network ƒe dedie ɖo o la, wometsɔe ɖe dzidzedze o, elabena eɖuna ŋusẽ geɖe, eye nukuku [mining] ƒe dɔwɔwɔ gãwo ƒe akpɔkpɔ le eŋu. Crosslink trɔna va kple ƒomekɔkɔe ƒe mɔnu aɖe, si ƒoa PoW ƒe ŋusẽ si woɖoe kpɔ kple PoS ƒe dɔwɔwɔ nyuitɔ kple dziɖuɖu [governance] ƒe viwo nu.

![image](/content-images/a2ffb19d-e570-4723-b669-a66e14fc6b71-a727c958de.webp)

Tɔtrɔ sia sɔ kple xexeame bliboa ƒe ɖoɖowo le gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu [blockchain] ƒe nu yeye wɔwɔ me, afi si dɔwɔwɔwo le yi yim le mɔnu siwo menoa anyigba gbegblẽ o kple ha nuɖo agni [decentralized] ƒe mɔnuwo gbɔ. Crosslinks ƒe gbegbɔgblɔ ɖi [consensus] ƒe mɔnu evea nana be Zcash nɔa ɣaɣla [privacy] ƒe kakaɖedzi si le eƒe asitsala mɔnuwo me la ɖeasi, le esime wòle tɔtrɔm be wòawɔ dɔ le egbea ƒe kuxiwo ŋu.

Ƒomekɔkɔe Proof-of-Stake (PoS) ƒe mɔnu ƒoa Proof-of-Work (PoW) si wozãna le blema kple PoS nu, eye eƒe ta nye be wòamɔ kuxiwo abe 51% ƒe asrɔ̃nu ene, le esime wònɔ ha nuɖo agni me eye wòɖe ŋusẽ ƒe zãzã le anyi. Ƒomekɔkɔe PoS va kple notarywo siwo doa gaɖoɖowo ƒuƒoƒewo ɖe edzi le ZEC si woƒoe le ga ƒuƒoƒo me dzi. Woɖo mɔnu sia be wòana ɖoɖonu [chain] ƒe dedie kple teƒe siwo wɔna be woakpɔ gaɖoɖowo ƒuƒoƒewo ɖe edzi nyuie wu, eye wòana mɔnu si sesẽ wu PoW ƒe mɔnuwo ko.

### Nu Ka Ta Ƒomekɔkɔe PoS/PoW Wòanye Nudzodzro Gbã?

* Ena ŋgɔyiyi yi PoS blibo gbɔ.
* Ena be nukuku kple ga ƒuƒoƒo ƒe zã nyawo [use case] nawɔ dɔ ɖekae, eye wòana ekɔsɔkɔsɔ ƒe akpawo nakpe ɖe eŋu.
* Eɖea dedie ƒe kuxi siwo ate ŋu ava le PoS ƒe mɔɖoɖoa me la ɖe anyi va se ɖe esime nusiwo doa gaɖoɖowo ƒuƒoƒe ɖe edzi la ƒe ga ƒuƒoƒo kple dzixɔse nava gã wu.
* Ethereum fia mɔnu sia xoxo le Production me.

### Nu Si Crosslink Nye

Crosslink ƒe mɔɖoɖo nye ɖoɖo si woɖoe be wòanye Zcash ƒe Proof-of-Work/Proof-of-Stake (PoW/PoS) ƒe ƒomekɔkɔe ƒe akpa. Eƒoa PoW kple Byzantine Fault Tolerance (BFT) ƒe mɔɖoɖo nu, eye eƒea nuwuwu kakaɖedzi be woakpɔ ɖe edzi ne PoW alo PoS ɖeka koe gale dedie. Ɖoɖoa le mɔ kpɔm be wòasesẽ network ƒe dedie kple ha nuɖo agni, to nusiwo doa gaɖoɖowo ƒuƒoƒe ɖe edzi si woƒoe le ga ƒuƒoƒo me ƒe kɔkɔe me, le esime wòle nukulawo ƒe gomekpɔkpɔ ɖeasi. Ɖoɖoa ƒe nɔnɔme vevi aɖe, si woyɔna be Crosslink 2, wɔna be mɔnu sia naɖe bɔbɔe to BFT ƒe nufialaawo kple nukulawo ƒoƒo ɖekae me. Mɔnu si me nu mekpɔ akpa sia ɖea ɖoɖo ƒe tɔtrɔwo ɖe anyi, eye ena be woazã BFT ƒe akpa "metsi o", eye esia nana be eƒe nudzodzro kple eƒe dɔwɔwɔ naɖe bɔbɔe, le esime wònɔ dedie ƒe se gãwo ɖeasi.

Dɔwɔwɔ ƒe ɖoɖoa kplɔ mɔɖoɖo si me woɖe injinia ƒe asixɔxɔwo fia be woakɔ Crosslink 2* ɖe Zcash ƒe Zebra ƒe klient me. Dɔwɔwɔ sia si woma akpa akpa la ɖo ŋku ɖe amesiwo katã ƒe dzidzenuwo ƒe sɔsɔ, kuxi ɖeɖe anyi, kple tsitsitɔtɔ kple Zcash ƒe taɖodzinuwo na nu ƒe dziyiyi [scaling], zãzã ƒe bɔbɔe, kple ha nuɖo agni. Dzixɔse si le mɔɖoɖoa ƒe dedie ƒe nɔnɔme sesẽwo me ƒe tsitsitɔtɔ sesẽna eƒe ŋutete be wòanye afɔɖeɖe vevi le Zcash ƒe tɔtrɔ me. To ŋusẽ ƒe zãzã ƒe dɔwɔwɔ nyuitɔ kple gbegbɔgblɔ ɖi ƒe mɔnuwo ƒe nyonyo me la, Crosslink nana ɖoɖo si kpɔ ŋgɔ na gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu ƒe kuxiwo siwo le tɔtrɔm. Na nyatakaka geɖe, yi [GitHub ƒe repository](https://github.com/ShieldedLabs/zebra-crosslink) kple [Zcash ƒe Community Forum](https://forum.zcashcommunity.com) gbɔ.

### Crosslink Ƒe Taɖodzinuwo Kple Eƒe Taɖoɖowo

Crosslink ƒe Mɔɖoɖo woɖoe be wòakpɔ ɖe taɖodzinu siwo le vevie na Zcash ƒe etsɔme ŋu:

1. **Ha Nuɖo Agni**:
   * To PoS ƒe kɔkɔe me la, Zcash ɖea asi le PoW ƒe dɔwɔnu xɔasi siwo woyɔna be ASICs ŋu, siwo hã dzɔna be nukuku ƒe ŋusẽ nɔa dɔwɔlawo ƒe amedzro aɖe ko ƒe asi me.
   * PoS na amehawo ƒe gomekpɔkpɔ si lolo wu, afi si ga ƒe tɔxɛlawo ƒoa woƒe nudzɔdzɔwo le ga ƒuƒoƒo me be woasecɔ network la, eye esia nana be gbegbɔgblɔ ɖi naa kpɔkplɔe le teƒe geɖe.
   * To nusiwo doa gaɖoɖowo ƒuƒoƒe ɖe edzi si woƒoe le ga ƒuƒoƒo me ƒe kɔkɔe me la, mɔɖoɖoa nana be ame siwo le ga ƒe akpa me la naxɔ gome vevie le gbegbɔgblɔ ɖi me, eye esia ɖea asi le nukuku ko ŋu.
2. **Dziɖuɖu Si Nyo Wu**:
   * Ga ƒe tɔxɛlawo kpɔ voti ƒe mɔnu to ga ƒuƒoƒo me, eye esia nana woate ŋu akplɔ ɖe network ƒe mɔ̃ ƒe sewo trɔtrɔ [network upgrade], ga ƒe maɖama, kple ekɔsɔkɔsɔ ƒe nu veviwo ƒe nya me. Amedziƒe mɔnu sia wɔa be mɔɖoɖoa ƒe tɔtrɔ nɔa amehawo ƒe dzidzenuwo me.
3. **Ŋusẽ Ƒe Zãzã Si Nyo Wu**:
   * PoS ƒe kɔkɔe le akpa aɖe me ɖea ŋusẽ si wozã la ɖe anyi ŋutɔ, eye wòƒoa Zcash kple xexeame ƒe anyigba ƒe dzidzɔɖoɖo ƒe dɔwɔwɔwo nu. PoS me dɔwɔnu xɔasi si PoW zãna geɖe o. Ƒomekɔkɔe ƒe mɔnuwo ƒe ta nye be woaɖe ŋusẽ ƒe zãzã ɖe anyi wu PoW-ko ƒe mɔnuwo, le esime woanɔ dedie gã ɖeasi.
4. **Ga Ƒe Dedie Kple Eƒe Dɔwɔwɔ Ƒe Tsitsi**:
   * PoW kple PoS ƒoƒo ɖekae wɔnɔa ga ƒe dzidzenuwo na network ƒe amesiwo le eƒe me la le mɔ geɖe nu, eye esia nana dedie sesẽ nanɔ anyi me esi wometsɔa asi ɖe mɔnu ɖeka ko ŋu o.
   * Ga ƒuƒoƒo hã trɔa fetu ƒe mɔnu si wònɔ kple nyateƒe na amesiwo le gome, eye esia nana nu sia nɔa dzeame na ame siwo di be woaɖo ga ɖe eŋu na ƒe geɖe.
5. **Dedie Ƒe Tsitsi**: Crosslink ƒe ta nye be wòasesẽ network la ƒe ŋutete be wòatsi tsitre ɖe ɖoɖonu ƒe ɖoɖo gagblẽ ƒe asrɔ̃nuwo ŋu, to PoS ƒe kɔkɔe kple PoW me.

## Nukpɔkpɔ / Sɔsɔme Nya

![image](/content-images/b34afda4-fe33-448f-b0dd-279fd6cef1f5-73f58cdcc6.webp)

Bu ɖe parcel ƒe dɔwɔƒe aɖe ŋu si doa agbalẽ vovovo eve na parcel ɖeka ƒe ɖoɖo. Gbãtɔ nye tracking ƒe scan: eɖea fia kaba, egblɔ na wò afi si parcel la le geɖe be wònɔ, eye wotrɔna eƒe nya ƒe akpa aɖe ɣeaɣi. Evelia nye parcel xɔxɔ ƒe agbalẽ si wode asi te: eva megbe, ke ne eli la, ame aɖeke metsia nya le eŋu o.

Agbaleƒoƒo si me gãmesese ƒe mɔnu mekpɔ akpa la nye tracking ƒe scan, eye agbaleƒoƒo si wotsɔ nuwuwu wɔe la nye agbalẽ si wode asi te. Woƒe evea katã le nudzɔdzɔ ƒe ɖoɖonu ɖeka gblɔm; nu si wɔa woƒe vovototoe nye ale si wova kaba kple ale si woƒe nyateƒe le sesẽ.

Dedienɔnɔ ƒe Mɔnu nye nu si depot wɔna ne agbalẽ siwo wode asi te mele vava o, ke scanwo le sɔ gbɔna. Parcelwo yi edzi le xɔa me — ke ofisi la medzra ga na scanwo ko dzi o va se ɖe esime asidede agbalẽ te [signature]wo nava sɔ.

## Nudzodzro Koko

### Crosslink Ƒe Dedie Kple Dɔwɔwɔ Ƒe Taɖodzinuwo

Crosslink ƒe mɔɖoɖo ƒe ta nye be wòana agbaleƒoƒo ƒomevi eve na Zcash: **agbaleƒoƒo si wotsɔ nuwuwu wɔe (LOG_fin)** kple **agbaleƒoƒo si me gãmesese ƒe mɔnu mekpɔ akpa (LOG_ba)**. Agbaleƒoƒo si wotsɔ nuwuwu wɔe nana be trɔtrɔ megatrɔ o le susu siwo dzɔ le Byzantine Fault Tolerance (BFT) alo gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu (BC) ƒe mɔɖoɖoa ŋu. Woɖoe be wòanɔ agbe eye wòanɔ dedie to network ƒe mama mama me hã, eye eƒe mɔkpɔmɔnu nɔ vie sãa wu enu eve sɔ kple fifia ƒe Zcash gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu ƒe gaɖoɖowo ƒuƒoƒe ƒe kakaɖedzi si sɔ.

Agbaleƒoƒo si me gãmesese ƒe mɔnu mekpɔ akpa la do ŋgɔ na agbaleƒoƒo si wotsɔ nuwuwu wɔe gaɖoɖowo ƒuƒoƒe *L* ko. Ena trɔtrɔ megatrɔ o le gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu ƒe mɔɖoɖoa ko ŋu, eye eƒe mɔkpɔmɔnu kple dedie menyo wu Zcash ƒe mɔnu si li xoxo la o. Le Crosslink 2* ƒe ɖoɖo si me nu mekpɔ akpa me la, agbaleƒoƒo si me gãmesese ƒe mɔnu mekpɔ akpa la nana dɔwɔwɔ kple zãzã naɖe bɔbɔe esi wòwɔa dɔ abe PoW ƒe ɖoɖonu ene.

![image](/content-images/fd039664-4852-4fb0-8c88-0615f1ed116e-41459b81dc.webp)

### Nɔnɔ Ƒe Ɣeyiɣi Si Wode Se Kple Dedienɔnɔ Ƒe Mɔnu

Crosslink tsɔ **Dedienɔnɔ Ƒe Mɔnu** va be wòakpɔ ɖe kuxi siwo ava ne agbaleƒoƒo si me gãmesese ƒe mɔnu mekpɔ akpa la yi ŋgɔ ŋutɔ na agbaleƒoƒo si wotsɔ nuwuwu wɔe la ŋu. Esia ƒoa nu ɖe vovototowo nu, abe account ƒe nɔnɔ siwo mesɔ o alo service ƒe dɔwɔlawo ƒe dedie ƒe gapwo si woƒe kakaɖedzi mele o le ɖoɖo ƒe mɔnu siwo wozãna enumake me. Dedienɔnɔ ƒe Mɔnu dzea dzi ne agbaleƒoƒo si wotsɔ nuwuwu wɔe megbe akpa wu gaɖoɖowo ƒuƒoƒe *L* si wode ɖo. Le nɔnɔ sia me la, gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu la yi edzi wɔa PoW ƒe dɔwo (be dedie vevi nanɔ anyi), ke woƒoa ga ƒe dɔwɔwɔwo katã nu va se ɖe esime woaɖo nya sia ɖo. Woɖo mɔnu sia be wòakpɔ tso nɔnɔ vovovo siwo dzi makpɔ o me, abe asrɔ̃nu gãwo ene, le esime wòle dziɖuɖu ƒe mɔnu me tɔtrɔ megatrɔ o ƒe sewo kpe ɖe eŋu.

### Teknikal Ƒe Nya Kple Dɔwɔwɔ

Crosslink ƒe Mɔɖoɖo la Shielded Labs le wɔm eye wole tsɔm wɔ dɔ kple ekɔsɔkɔsɔ ƒe hadɔwɔlawo abe ZODL ene. Mɔɖoɖoa ƒe dɔwɔwɔ me la, woakpɔ:

* Ga ƒuƒoƒo ƒe mɔnu siwo le dedie na PoS ƒe amesiwo le gome.
* Fetu ƒe ɖoɖoa ƒe tɔtrɔ be dzidzenuwo nasɔ le nukulawo kple amesiwo ƒoa ga me ƒe dome.
* Mɔnu si wɔa be blema ƒe dɔwɔwɔwo nadzɔ kple zãla ƒe nɔnɔ si me kuxi mele o le tɔtrɔa me.
* Notary Ƒe Mɔnu: Mɔɖoɖoa kplɔ notarywo va siwo dea asi te le gaɖoɖowo ƒuƒoƒewo ŋu. Gbã la, wozãna notary siwo nɔ te ɖe teƒe ɖeka, eye megbe la woatrɔ yi mɔnu si le dzidzime, afi si woatia notarywo le ZEC si woƒoe le ga ƒuƒoƒo me dzi.
* Dzedze Ƒe Se: Crosslink ƒe kɔkɔe hia tɔtrɔ le Zcash ƒe gbegbɔgblɔ ɖi ƒe sewo me, si me woana ga ƒuƒoƒo ƒe mama mɔnu ƒe gɔmeɖeɖe eye woatrɔ network ƒe mɔɖoɖo ƒe sewo be woakpe ɖe ƒomekɔkɔe gbegbɔgblɔ ɖi ŋu.
* Dɔwɔwɔ Le Akpa Akpa: Mɔɖoɖoa ava le akpa akpa me be network ƒe nɔnɔ nasɔ eye amehawo natsɔe awɔ dɔ. Gbãtɔ ƒe akpawo ɖo ŋku ɖe teknikal ƒe dɔwɔwɔ ŋu, eye megbe la woakɔ dziɖuɖu ƒe akpa be woatia notarywo.

Nudzodzro gbãtɔ kple eƒe nyatakakawo le [zebra-crosslink repository la me le GitHub](https://github.com/ShieldedLabs/zebra-crosslink) kple [The zebra-crosslink Book](https://shieldedlabs.github.io/zebra-crosslink/). Dɔ si le edzi fifia la ƒe gɔmeɖeɖe le akpa si kplɔe ɖo me.

### Afi Si Crosslink Tsɔ Tsi

Crosslink gale ɖoɖo aɖe ko. Shielded Labs ƒe [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/) gblɔ be "ele be wòato Zcash ƒe dziɖuɖu ƒe mɔnu si wozãna ɣesiaɣi" me hafi wòate ŋu adze dzi le mainnet dzi.

Nu si li egbea nye **Feature Net**: nudzodzro ƒe network si Shielded Labs nɔa dzi kplɔna, si ƒe nudzodzro ƒe ga tɔxɛ le, cTAZ, afi si ame sia ame ate ŋu anuku, aƒo ga, eye wòawɔ dɔ abe nuwuwu dɔwɔla [finalizer] ene. [Version 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), si woɖe tsoe le 1 October 2026, dzea egɔme abe proof-of-work blɔe ene eye wòkɔa Crosslink ɖe dɔ me le akpa akpa: ga ƒuƒoƒo tso gaɖoɖowo ƒuƒoƒe 20,736 dzi, nuwuwu dɔwɔlawo ƒe ƒometɔ gbãtɔ tso gaɖoɖowo ƒuƒoƒe 34,560 dzi, eye BFT ƒe nuwuwu kakaɖedzi tso gaɖoɖowo ƒuƒoƒe 36,288 dzi ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555)).

Nu eve le axa sia dzi trɔ tso esime woŋlɔe:

* **Dɔ si woyɔ be notary le afisia la, woyɔe be finalizer** le Shielded Labs ƒe software kple release notes me. Amesiwo ƒoa ga me la ɖoa gaɖoɖowo ɖe nuwuwu dɔwɔla aɖe ŋu, eye nuwuwu dɔwɔlawo siwo ƒe ga ƒuƒoƒo le gã wu la votia be woatsɔ gaɖoɖowo ƒuƒoƒewo awɔ nuwuwu.
* **Kodɛ la trɔ afi.** zebra-crosslink repository si le etame la wotrɔe le April 2026 me zi mamlɛtɔ. Feature Net ƒe releasewo tsoa [crosslink_monolith](https://github.com/ShieldedLabs/crosslink_monolith/releases), eye woŋlɔ ɖoɖoa ƒe nya le [Crosslink book](https://shieldedlabs.github.io/crosslink_book/) me.

Ne wòdi be nàate egɔme kpakple ŋuwò la, wɔ ɖe [Crosslink Feature Net](/guides/crosslink-feature-net) ƒe mɔfia la dzi. Ne wòdi be nàkpɔ network la eye mèwɔ naneke o la, ke ɖe Crosslink ƒe tab la ɖe [ZecHub Tools](https://zechub.wiki/tools?tool=crosslink) dzi.

## Nu Si Esia Gɔmee Le Dɔ Me

### Eƒe Nɔnɔ ɖe PoW Ƒe Nukulawo Ƒe Xɔɖe Ŋu

Crosslink dea bubu PoW ƒe nukulawo ƒe dɔ vevi le Zcash ƒe gɔmedzedze ƒe ŋgɔyiyi me, le esime wòle ɖoɖom na tɔtrɔ si ava vie vie:

* **Gaɖoɖowo Ƒuƒoƒe Ƒe Fetu Si Wotsɔ ɖe Anyi**:
  * Ɣeyiɣi yi la, PoS ƒe nusiwo doa gaɖoɖowo ƒuƒoƒe ɖe edzi axɔ fetu ƒe akpa si le dzidzime yi edzi, eye esia aɖe PoW ƒe nukulawo ƒe xɔɖe le anyi. Ga mama sia fia PoW ƒe dɔ si le ɖeɖem le ƒomekɔkɔe ƒe mɔnu me.
* **Tɔtrɔ Si Le Dɔmedzoe**:
  * Mɔɖoɖoa ɖea tɔtrɔwo ƒe mɔ le vie vie, eye esia nana nukulawo kpɔ ɣeyiɣi si sɔ be woatsɔ aɖe woƒe nɔnɔ alo woanɔ dɔ bubuwo wɔm le Zcash ƒe ekɔsɔkɔsɔ me, abe ga ƒuƒoƒo ƒe dɔwɔwɔ alo network ƒe subɔsubɔ bubuwo ene.
* **Nuwɔna Ƒe Ŋusẽ Ƒe ƒoƒo Ƒe Kuxiwo Ƒe Ɖeɖe Anyi**:
  * PoS ƒe ga ƒuƒoƒo gaƒuƒoƒowo [pool] woɖoe be woagblɔ ŋusẽ ƒe ƒoƒo ɖeka me, eye woana ame suewo hã mɔ be woakpɔ gome le teƒe si sɔ me. Mɔnu si kplɔ ame sia ame ɖe eŋu sia tsoa nu ɖe ƒoƒo si wole kpɔm fifia le ASIC ƒe nukuku me ŋu.
* PoW ƒe nukulawo ƒe xɔɖe aɖe anyi esi woatsɔ gaɖoɖowo ƒuƒoƒe ƒe fetu ƒe akpa aɖe ana PoS ƒe nusiwo doa gaɖoɖowo ƒuƒoƒe ɖe edzi. Ga mama sia nana dzidzenu ƒe mɔnu si sɔ, eye wòfetu nukulawo kple amesiwo ƒoa ga me la evea katã ɖe network ƒe secɔcɔ ta.
* Woɖo tɔtrɔ si ava vie vie be woaɖe eƒe ga ƒe veve ɖe nukulawo ŋu anyi, le esime woakplɔ ame siwo le gome la ɖe eŋu.

Gbegbeɖi ƒe mɔnu eve sia sesẽna Zcash ƒe adzɔgbeɖeɖe [commitment] na ɣaɣla, nɔnɔ si menoa anyigba gbegblẽ o, kple ha nuɖo agni, eye wòtsɔe dea teƒe abe amedzidze si kpɔ ŋgɔ le gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu ƒe teƒe ene.

## Vodada Siwo Wona Zi Geɖe

**Xexlẽ Crosslink abe gbegbɔgblɔ ɖi ƒe se si le dɔ wɔm ene**. Axa sia ƒe nya nye ɖoɖo si wode akpa akpa ƒe dɔwɔwɔ ƒe ɖoɖo kplɔe. Eƒe kɔkɔe hia tɔtrɔ le Zcash ƒe gbegbɔgblɔ ɖi ƒe sewo me, eye esiae ta mɔɖoɖoa kple Zebra ƒe kɔkɔe ƒe dɔwo li.

**Susu be PoS ɖea nukuku ɖe teƒe**. Crosslink nye ƒomekɔkɔe ƒe ɖoɖo: PoW ƒe gaɖoɖowo ƒuƒoƒe ƒe wɔwɔ yi edzi kple nusiwo doa gaɖoɖowo ƒuƒoƒe ɖe edzi si woƒoe le ga ƒuƒoƒo me. Le Dedienɔnɔ ƒe Mɔnu me hã la, gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu la yi edzi wɔa PoW ƒe dɔwo, le esime woƒoa ga ƒe dɔwɔwɔwo nu.

**Bu "nuwuwu" be wònye kakaɖedzi si va kaba wu**. Woɖo agbaleƒoƒo si wotsɔ nuwuwu wɔe be eƒe mɔkpɔmɔnu nɔ vie sãa wu enu eve sɔ kple fifia ƒe Zcash gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu ƒe gaɖoɖowo ƒuƒoƒe ƒe kakaɖedzi si sɔ. Nu si wòtsɔ kpee nye trɔtrɔ megatrɔ o, menye kaba o — agbaleƒoƒo si me gãmesese ƒe mɔnu mekpɔ akpa lae nye nukpɔkpɔ kaba.

**Ƒo agbaleƒoƒo evea nu**. LOG_ba menye ɖoɖonu bubu aɖeke o: edo ŋgɔ na agbaleƒoƒo si wotsɔ nuwuwu wɔe gaɖoɖowo ƒuƒoƒe *L* ko, eye le Crosslink 2* ƒe ɖoɖo me la, ewɔa dɔ abe PoW ƒe ɖoɖonu ene.

## Axawo Si Dze Eŋu

- [Crosslink Feature Net](/guides/crosslink-feature-net) — Ɖo Feature Net ƒe desktop app la ɖe, ƒo ga ɖe nuwuwu dɔwɔla aɖe ŋu, eye kpɔ nɔƒe si wòle.
- [Zebra Ɣaɣla Dzesi Ŋɔŋlɔ Blibo](/zcash-tech/zebra-full-node) — klient si woɖo be woakɔ Crosslink 2* ɖe eme.
- [Ɣaɣla Dzesi Ŋɔŋlɔwo Blibo](/zcash-tech/full-nodes) — ale si ɣaɣla dzesi ŋɔŋlɔwo doa gbegbɔgblɔ ɖi ƒe sewo ɖe edzi egbea, hafi ƒomekɔkɔe gbegbɔgblɔ ɖi ƒe tɔtrɔ aɖeke ava.
- [Mɔ̃ Ƒe Sewo Trɔtrɔ](/start-here/network-upgrades) — ale si gbegbɔgblɔ ɖi ƒe se ƒe tɔtrɔwo va ɖo Zcash ƒe network la gbɔ.
- [Zcash Ga Ƒe Ɖoɖo](/start-here/zcash-monetary-policy) — gaɖoɖowo ƒuƒoƒe ƒe fetu ƒe ɖoɖo si Crosslink akɔ ƒe akpa amama.

## Dɔwɔnu Bubuwo

- Amedzro ƒe ƒoƒo: [Crosslink: Feature Net Si Wode Fetu Ɖe Eŋu, le Zcash ƒe Community Forum](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210) dzi
- Nyatakaka siwo tsoa wɔnɔ: [Crosslink le Shielded Labs](https://shieldedlabs.net/crosslink/) kple [Feature Net ƒe releasewo](https://github.com/ShieldedLabs/crosslink_monolith/releases)
- Ɖoɖo ƒe nyatakaka: [The Crosslink book](https://shieldedlabs.github.io/crosslink_book/)

  Nya si wotsɔ ɖe edzi:

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
