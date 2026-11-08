<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Is_Zcash_Post_Quantum.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Axa Aƒe"/>
</a>

# Ɖe Zcash le Post-Quantum?

## Ŋuɖoɖo kpui

Ao, menye fifia o.

Tso Ironwood ƒe mɔ̃ ƒe sewo trɔtrɔ me la, Zcash nye **quantum-recoverable** na ga siwo le Ironwood gaƒuƒoƒo me. Esia nye afɔɖeɖe vavã aɖe, gake menye nu ma ke si nye post-quantum dedienɔnɔ o. ZIP 2005, si nye eƒe se gbadza, gblɔe kple nyateƒe be: trɔtrɔa "meɖe protocol la ɖe quantum ƒe futɔwo ŋu le eɖokui me o". Eɖo Ironwood ƒe gawo ɖe nu ŋu be woate ŋu akplɔ wo ayi to Recovery Protocol si ava le etsɔme me, ne woɖe cryptography si le fifia la ɖa.

Axa sia ma nu si Zcash kpɔa fifia, nu si Ironwood trɔ, nu si gale afia, kple nu si nye ɖoɖo koe. [status table](#status-table) si le nuwuwu gbɔ la fia afisi akpa sia akpa le kple ɣeyiɣi si wotsɔ kpe ɖe eŋu mlɔeba.

<br/>

## Ame kawoe wotu e ɖe wo ta

- Ame sia ame si se "quantum-recoverable" eye woxlẽe be "quantum-proof"
- Ga ƒe dzilawo siwo le ɖoɖo wɔm be woakplɔ ga ayi Ironwood me
- Nuŋlɔlawo kple moderatorwo siwo hia ŋuɖoɖo si ƒe nuɖoɖowɔƒe le be woafia amewo

Ne wòdi gɔmeɖeɖe tso quantum computing ŋutɔ ŋu la, dze egɔme kple [Post-Quantum Security le Zcash](/zcash-tech/post-quantum-security).

<br/>

## Nu ka ta biabia sia le vɔvɔ̃

Wozãa "Post-quantum" abe ne enye nɔnɔ ƒe ɖeka ene. Na Zcash la, biabia vovovo ene koŋ le esia me, eye woƒe ŋuɖoɖowo vovovo:

1. **Ɣaɣla [Privacy].** Ɖe quantum ƒe futɔ ate ŋu akpɔ ame si xe fɛ na ame kae kple fɛ si woxe?
2. **Gazaza [Spending].** Ɖe quantum ƒe futɔ ate ŋu azã ga si menye etɔ o?
3. **Gaƒe dziyiyi [Inflation].** Ɖe quantum ƒe futɔ ate ŋu awɔ ZEC tso naneke me?
4. **Gaxɔxɔ [Recovery].** Ne wòwɔ be woate ŋu aɖe cryptography si le fifia la ɖa la, ɖe dzilawo ate ŋu aɖe woƒe gaawo ado go?

Ironwood trɔ ŋuɖoɖo si le biabia ene lia ko, eye esia le didienuwo siwo le Ironwood gaƒuƒoƒo me ko ŋu.

Fifiamea si le esia katã megbe nye futɔ si ate ŋu awɔ discrete logarithm le elliptic curves siwo Zcash zã la dzi. Quantum computer gã aɖe si le Shor's algorithm wɔm ate ŋu anye mɔ ɖeka si wòato awɔe. ZIP 2005 fia be ne wòkpɔ **ɖeka** discrete logarithm ko la, esia dze egɔme be wòate ŋu awɔ ga ƒe dziyiyi si meɖoɖo mele o alo afi ga.

<br/>

## Nu si Zcash kpɔa fifia

Kplɔlawo sia gblɔ protocol la ƒe nɔnɔ ale si wòle fifia, le futɔ si ate ŋu agbã discrete logarithm ŋu. Ewɔ dɔ na ɣaɣla gaƒuƒoƒo siawo katã, Ironwood hã le eme, elabena Ironwood zã Orchard circuit ma, Halo 2 ɖaseɖigbalɛwo kple RedPallas asidede agbalẽ tewo abe Orchard ene.

| Nɔnɔ | Le quantum ƒe futɔ ŋu egbe | Nu si Ironwood trɔ |
|---|---|---|
| Ɣaɣla | Ele teƒe ne futɔa menya wò ɣaɣla gaɖoƒe ƒe dzesi o. Ɖaseɖigbalɛwo kple asidede agbalẽ te siwo wogatrɔ wɔnɔa mefia nu bubu aɖeke o. Ne futɔa nya gaɖoƒe ƒe dzesi la, ate ŋu aɣaɣlaŋlɔŋlɔ didienu siwo wodo ɖe eŋu, esia gblɔna xoxo siwo wotsɔ ɖe ɖoɖonu dzi hã. | Naneke o. ZIP 2005: "Nɔnɔ si le Ɣaɣla ŋu metɔ o na gaƒuƒoƒo aɖeke." |
| Gazaza | Womekpɔe ɖe anyi o. Futɔ aɖe ate ŋu awɔ ɖaseɖigbalɛ alo gazaza ƒe asidede agbalẽ te si nye alakpa eye wòafi ga tso ɣaɣla gaƒuƒoƒo aɖeke me, togbɔ be mekɔ gaɖoƒe ƒe dzesi ma kpɔ hafi o. | Naneke haɖe o. Kpɔɖeŋu la ava ne woatrɔ ayi Recovery Protocol si le etsɔme me. |
| Gaƒe dziyiyi | Womekpɔe ɖe anyi o. Futɔ aɖe ate ŋu awɔ ɖaseɖigbalɛ si nɔ abe vavã ene eye wòawɔ ZEC le ɣaɣla gaƒuƒoƒo aɖeke me, eye ame aɖeke mate ŋu aŋlɔ esia dzi o. Ɖoɖo ɖeka si le eŋu koe nye [gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe](/zcash-tech/the-turnstile): gaƒuƒoƒo aɖeke mate ŋu axe ga akpe wu eƒe balance si woŋlɔ ɖi o. | Naneke haɖe o. Ironwood didienuwo le adzɔgbeɖeɖe wɔnɔm na woƒe emetɔwo katã fifia le mɔ si quantum ƒe futɔ mate ŋu awɔ alakpa kplee o, si nye nu si Recovery Protocol si ava la hia be wòana gaƒe ƒe nɔnɔ nakpɔ ɖe anyi. |
| Gaxɔxɔ | Sprout, Sapling kple Orchard didienuwo mekpɔ mɔ aɖeke na gaxɔxɔ o. Ne woɖe woƒe protocolwo ɖa la, nu siwo katã gale wo me la mate ŋu akpɔ o. | Ironwood didienu ɖe sia ɖe ate ŋu axɔ gake le gɔme. Sapling alo Orchard didienu aɖeke mate ŋu axɔ o. |

Nuwo ƒe ʋuʋuɖi ZEC nye nya bubu. Eƒe ECDSA asidede agbalẽ tewo ate ŋu anye alakpa ne woanya public key la. Na transparent gaɖoƒe ƒe dzesi mamãe la, esia dzɔna zi gbãtɔ si nèzã ga tsoe me, eye ɣeyiɣi kpui aɖe hã li esi gaɖoɖo aɖe nɔ mempool me hegblẽ be woakpe ɖe edzi. ZIP 2005 metrɔ naneke le esiawo ŋu o.

<br/>

## Nu si Ironwood trɔ

Ironwood nye NU6.3 mɔ̃ ƒe sewo trɔtrɔ. Eya wɔ dɔ le Mainnet dzi le gaɖoɖowo ƒuƒoƒe 3,428,143 me le 28 July 2026. Eƒe ta vevi nye gaƒe ƒe nɔnɔ nyuitɔ le Orchard soundness bug megbe (kpɔ [Ironwood](/zcash-tech/ironwood) axa), eye quantum recoverability tso ZIP 2005 va kplee.

- **Didienu ƒe nɔnɔ yeye.** Ironwood output didienu ɖe sia ɖe zã quantum-recoverable nɔnɔ (didienu plaintext ƒe lead byte `0x03`). Fifia la, woxɔ didienu ƒe randomness tso eƒe fieldwo katã me, ale be hash wɔ didienua ƒe kadodo kple eƒe emetɔwo, menye elliptic-curve mathematics ko o.
- **Mɔ na gaxɔxɔ le Ironwood didienuwo ko ta.** ZIP 326 gblɔe kple nyateƒe be Ironwood didienu ɖe sia ɖe ate ŋu axɔ, eye Orchard didienu aɖeke mate ŋu axɔ o. Gakotoku ƒe ɖoɖo aɖe matrɔ esia o.
- **Orchard megaxɔa ga yeye o.** Coinbase ƒe fetuwo magate ŋu ayi Orchard o, eye Orchard mate ŋu ado ɖe Orchard gaɖoƒe ƒe dzesi bubu o, ale ɣaɣla ga yeye tsɔa doa Ironwood me.
- **Wogblɔ na gakotokuwo be woakplɔ nu katã ayi.** ZIP 2005 gblɔ be gakotokuwo ELE BE woakplɔ ga siwo katã woƒe dzikpɔɖeƒe le, esia gblɔna transparent, Sprout kple Sapling gaawo hã, ayi Ironwood didienuwo me enumake ne wòte ŋu, eye woagayi edzi awɔe esi ga yeyeava.

Nu si Ironwood metrɔ o: cryptography si wɔ gazaza kple ɖaseɖigbalɛ fifia, didienu ƒe ɣaɣlaŋlɔŋlɔ, kple nu sia nu si le transparent ZEC ŋu.

<br/>

## Ɖoɖowo siwo gale

**Ɣeyiɣi si afia le.** Tso ɣeyiɣi si Ironwood dze egɔme va se ɣeyiɣi si woaɖe protocol xoxoawo ɖa la, quantum ƒe futɔ aɖe ate ŋu agate ŋu afi ga, awɔ gaƒe dziyiyi alo atsi ga le ɣaɣla gaƒuƒoƒo sia me. ZIP 2005 yɔ esia be "critical exposure period" eye wòɖe dzesi be afia aɖe le eme ate ŋu aɖo nu vɔ̃ na dzila ƒe ŋutete be wòaxɔ eƒe ga le etsɔme hã. Esia ta wògblɔ be Zcash ELE BE wòaɖe Orchard, Sapling kple Sprout ɖa **hafi** quantum ƒe afiawo ate ŋu awɔ dɔ.

**Ŋkeke aɖeke mele na ɖeɖa o, negbe na Sprout.** ZIP aɖeke meɖo ɣeyiɣi na Orchard alo Sapling ƒe ɖeɖa o. Sprout nye tɔ vovo: [ZIP 259](https://zips.z.cash/zip-0259) xlɔ ZIP 2003 ɖe trɔtrɔ siwo NU7 azã me, ale version 4 gaɖoɖowo anɔ anyi le se me o ne NU7 dze egɔme, eye ZEC siwo katã gale Sprout gaƒuƒoƒo me la mate ŋu azã o. Wode Mainnet ƒe dzeɖoɖo ɖe gaɖoɖowo ƒuƒoƒe 3,543,405, si wode ta be wòanɔ le 5 November 2026 ([ZIP 259](https://zips.z.cash/zip-0259), [forum announcement](https://forum.zcashcommunity.com/t/nu7-timeline/57655)). Sapling withdraw-only ƒe amewo ƒe nuxexlẽ dze egɔme le forum la dzi le April 2026.

**Recovery Protocol la menyo haɖe o.** ZIP 2005 ƒo nu tsoe ko, eye wògblɔ be emetɔwo "ate ŋu atrɔ". Naneke tsoe mewɔ dɔ o.

**Xɔ fifia, ɣaɣlaŋlɔŋlɔ le etsɔme.** Didienu ƒe ciphertextwo na Ironwood, Orchard, Sapling kple Sprout le ɖoɖonu dzi le amewo katã ŋkume. Ame aɖe ate ŋu adzra wo egbe eye wòaɣaɣlaŋlɔŋlɔ wo le etsɔme, ne enya xɔla ƒe gaɖoƒe ƒe dzesi hã. Gaɖoƒe ƒe dzesi sia sia si nèɖe fia alo nèna ame aɖe la le afia sia me. ZIP 2005 gblɔ be "wole protocol trɔtrɔ bubuwo kpɔm ɖa" na fexexe siwo ava.

**Nuwo ƒe ʋuʋuɖi gaawo mele eme o.** Gaɖoƒe ƒe dzesi siwo wozã ga tso alo wogazã la ƒe public keywo do go. Gaxɔxɔ na transparent gaɖoƒe ƒe dzesi aɖewo nye susu koe haɖe (ZIP 2007, kpɔ nu si le ete).

**FROST ƒe ɖoɖowo ƒe nya bubu aɖe hã le.** Kple FROST la, ɖeɖeƒe me tɔ sia sia le quantum gazazãsafui (`qsk`), eye quantum ƒe futɔ si le esi la ate ŋu afi ga. ZIP 2005 de asi be woakplɔ FROST gaawo ayi protocol si nye post-quantum blibo kple threshold ƒe kpekpeɖeŋu ne eƒome li.

<br/>

## Ɖoɖowo kple numekpɔkpɔ

Womekplɔ wo aɖeke ɖe dɔ me o.

- **Recovery Protocol.** Mɔ si ana Ironwood gaawo azã le ɖeɖa megbe vavã. ZIP 2005 ƒo nu tsoe, gake womede se gbadza na eŋu o.
- **ZIP 2007, gaxɔxɔ na transparent gaɖoƒe ƒe dzesi aɖewo.** Nye ZIP number si woɖo ɖi ko kple nuxexlẽ le [zips#1302](https://github.com/zcash/zips/issues/1302). Susuae nye be P2PKH kple P2SH output siwo ƒe public keywo mede go kpɔ o ate ŋu axɔ, kple dzadzra siwo mele ŋusẽ abe Ironwood tɔ ene o.
- **Post-quantum ɣaɣla na gaɖoƒe ƒe dzesi siwo woanya.** Ewɔ dɔ tso 2022 le [zips#1133](https://github.com/zcash/zips/issues/1133), si gblɔ be Zcash "wode ta xoxo be wòanye post-quantum private" ne woɖe gaɖoƒe ƒe dzesiwo ɣla, eye wobia ale si woate ŋu ado esia ɖe gaɖoƒe ƒe dzesi siwo woanya ŋu, abe post-quantum key encapsulation scheme si nye Kyber (fifia ML-KEM) ene. Le June 2026, [zips#1307](https://github.com/zcash/zips/issues/1307) do ZIP ɖe ŋgɔ be wòaŋlɔ ɣaɣla ƒe nɔnɔ si le fifia kple mɔ siwo ate ŋu anyo nu.
- **Project Tachyon.** Nye scaling nu ƒe dziyiyi ƒe mɔ̃ ƒe sewo trɔtrɔ si wodo ɖe ŋgɔ. Eƒe site la gblɔ be eɖo "full post-quantum privacy" to fexexe ƒe delivery ƒe kplɔɖoɖo tso ɖoɖonu dzi eye wòzã post-quantum key exchange. Wogblɔ be eƒe proof-carrying data library, Ragu, "gale tutu me". Kpɔ [Project Tachyon](/zcash-tech/project-tachyon).
- **Zcash si nye post-quantum blibo.** Post-quantum ɖaseɖigbalɛwo, asidede agbalẽ tewo kple adzɔgbeɖeɖewo ɖekae. Wole eŋu kpɔm le [zips#1134](https://github.com/zcash/zips/issues/1134), si dze egɔme tso 2016. Se gbadza alo ɣeyiɣiɖoɖo aɖeke mele o.

<br/>

## Nɔnɔ ƒe kplɔla

Wokpɔe mlɔeba le 13 September 2026, negbe Sprout ƒe kɔkɔe si wotrɔ le 9 October 2026. ZIP ƒe header nɔnɔ kple eƒe network nɔnɔ menye nu ma ke o: ZIP 2005 gale "Proposed" le eƒe header me togbɔ be wode eƒe sewo dzi le Mainnet le July 2026 me.

| Nu | ZIP ƒe nɔnɔ | Network ƒe nɔnɔ | Ŋkeke | Nuɖoɖowɔƒe |
|---|---|---|---|---|
| Ironwood gaƒuƒoƒo kple quantum-recoverable didienuwo (NU6.3) | ZIP 2005 Proposed, ZIP 229 kple ZIP 258 Draft | **Wode dzi** le Mainnet | 28 Jul 2026, gaɖoɖowo ƒuƒoƒe 3,428,143 | [ZIP 2005](https://zips.z.cash/zip-2005), [ZIP 258](https://zips.z.cash/zip-0258) |
| Orchard wotu na ga yeye | ZIP 2006 Reserved, sewo le ZIP 258 me | **Wode dzi** le Mainnet | 28 Jul 2026 | [ZIP 258](https://zips.z.cash/zip-0258) |
| Gakotokuwo le ga kplɔm yina Ironwood me | Kplɔɖoɖo le ZIP 2005, ZIP 318 kple ZIP 326 (Draft) me | Wode asi, eɖo wò gakotoku ŋu | Tso 28 Jul 2026 | [ZIP 318](https://zips.z.cash/zip-0318), [ZIP 326](https://zips.z.cash/zip-0326) |
| Recovery Protocol | Woƒo nu tsoe le ZIP 2005 ko me | **Womede dɔ me o** | Ŋkeke aɖeke mele o | [ZIP 2005](https://zips.z.cash/zip-2005) |
| Orchard kple Sapling ƒe ɖeɖa | ZIP aɖeke mele o | **Womeɖo ɣeyiɣi o** | Sapling nuxexlẽ tso Apr 2026 | [Forum](https://forum.zcashcommunity.com/t/sapling-withdraw-only-discussion-kickoff/55223) |
| Sprout gazazawo ƒe tɔtɔ (ZIP 2003) | Proposed, NU7 de dɔ me le ZIP 259 (Proposed) nu | **Womede dzi o** | Mainnet ƒe teƒe 3,543,405, wode ta na 5 Nov 2026 | [ZIP 2003](https://zips.z.cash/zip-2003), [ZIP 259](https://zips.z.cash/zip-0259) |
| Transparent gaxɔxɔ (ZIP 2007) | Reserved | **Ɖoɖo** | ZIP woɖo ɖi le 5 Jul 2025, nuxexlẽ dze egɔme le 17 Jun 2026 | [zips#1302](https://github.com/zcash/zips/issues/1302) |
| Post-quantum ɣaɣla na gaɖoƒe ƒe dzesi siwo woanya | Nya siwo le dzi, ZIP aɖeke mele o | **Numekpɔkpɔ** | #1133 dze egɔme 18 Aug 2022, #1307 dze egɔme 23 Jun 2026 | [zips#1133](https://github.com/zcash/zips/issues/1133), [zips#1307](https://github.com/zcash/zips/issues/1307) |
| Project Tachyon | ZIP aɖeke mele o | **Ɖoɖo**, gale tutu me | Woɖe fia gbã le Apr 2025 | [tachyon.z.cash](https://tachyon.z.cash/roadmap/) |
| Protocol si nye post-quantum blibo | Nya si le dzi, ZIP aɖeke mele o | **Dɔ si le etsɔme** | #1134 dze egɔme 28 Mar 2016 | [zips#1134](https://github.com/zcash/zips/issues/1134) |

Le Zcash Foundation ƒe NU7 sentiment polling (February 2026) me la, quantum recoverability kpɔ kpekpeɖeŋu 90.5% tso ZCAP gbɔ eye 94.6% tso coinholders gbɔ, eye Tachyon kpɔ kpekpeɖeŋu si va te ɖe ame katã. Esiwo nye ame ƒe susu ƒe pollingwo, menye nyamuzi siwo ku ɖe nu si ado NU7 me ŋu o.

<br/>

## Nu si nàte ŋu awɔ fifia

- **Kplɔ wò gaawo ayi Ironwood me.** Sapling kple Orchard didienuwo mate ŋu axɔ akpɔ o. Ga kplɔlɔ tso gaƒuƒoƒo aɖe me yi bubu me fia asɔme le ɖoɖonu dzi, ale ZIP 318 de be gakotokuwo ma balancewo ɖe asɔme siwo ɖo anyi eye woado wo ayi le ɣeyiɣi vovovowo me. Na wò gakotoku nawɔe ɖe teƒe, eye mègaɖo nu katã zi ɖeka o.
- **Mèɖe ɣaɣla gaɖoƒe ƒe dzesi siwo mèhia o fia.** Ɣaɣla le quantum ƒe futɔ si ava la ŋu ɖo eŋu be wòanya wò gaɖoƒe ƒe dzesi o. Unified addresses mekpɔxɔ asi o be woawɔ, ale na fexela sia sia gaɖoƒe ƒe dzesi yeye. ZIP 229 de asi be woatrɔ gaɖoƒe ƒe dzesiwo le ta sia.
- **Mègazã transparent gaɖoƒe ƒe dzesi o.** Ne nèzã ga tso ɖeka me la, eƒe public key le ɖoɖonu dzi tegbee.
- **Lé wò gadzraɖoɖi nya [seed phrase] ɖe anyi nyuie.** Le Recovery Protocol la me ale si woƒo nu tsoe la, recovery spend aɖe hia be nàɖe fia be nènya wò gazazãsafui, eye gakotoku mamãeawo xɔa safui ma tso seed me.
- **Mèkɔ "Zcash nye quantum-proof" ƒe gblɔgblɔwo dzi o.** Menye nenema hafi o, eye amewo siwo ŋlɔa se gbadzawo gblɔ esia.

<br/>

## Gɔmesese vɔ̃ siwo zi geɖe

- **"Ironwood nye post-quantum."** Ao. Ezãa Orchard cryptography ma, eye ZIP 2005 gblɔ be nɔnɔa "meɖe Orchard protocol la ɖe quantum afiawo ŋu o".
- **"Quantum-recoverable fia be quantum computerwo mate ŋu awɔ nu vɔ̃ egbe o."** Ao. Efia be woate ŋu axɔ Ironwood gaawo le trɔtrɔ si ava megbe, ne trɔtrɔ ma dzɔ le ɣeyiɣi nyuitɔ me.
- **"Shielded Zcash nye post-quantum private xoxo."** Ne futɔa menya wò gaɖoƒe ƒe dzesi o ko. Gaɖoƒe ƒe dzesi siwo woanya le afia me le gaƒuƒoƒo sia sia me.
- **"Tachyon de post-quantum privacy kple xoxo."** Tachyon nye ɖoɖo. Naneke tsoe mewɔ dɔ o.
- **"Quantum computerwo gbãa Zcash ƒe akpa sia sia."** Hash functionwo gbɔ dzidzedze koe wɔ, menye be wogbã wo o, le quantum afia siwo woanya nu. Quantum recoverability ɖo eɖokui ɖe vovototo ma ŋu tututu.

<br/>

## Axawo siwo kplɔe ɖo

- [Post-Quantum Security le Zcash](/zcash-tech/post-quantum-security)
- [Ironwood](/zcash-tech/ironwood)
- [The Turnstile](/zcash-tech/the-turnstile)
- [Project Tachyon](/zcash-tech/project-tachyon)
- [FROST](/zcash-tech/frost)
- [Shielded Pools](/using-zcash/shielded-pools)

<br/>

## Nuɖoɖowɔƒewo

- [ZIP 2005: Ironwood Quantum Recoverability](https://zips.z.cash/zip-2005)
- [ZIP 229: Version 6 Transaction Format](https://zips.z.cash/zip-0229)
- [ZIP 258: NU6.3 Network Upgrade ƒe dede dɔ me](https://zips.z.cash/zip-0258)
- [ZIP 318: Orchard yi Ironwood Migration](https://zips.z.cash/zip-0318)
- [ZIP 326: NU6.3 ƒe Nu siwo dzɔ na Gakotokuwo](https://zips.z.cash/zip-0326)
- [ZIP 2003: Mèna version 4 gaɖoɖowo nɔ anyi o](https://zips.z.cash/zip-2003)
- [ZIP 209: Mèna Shielded Chain Value Pool Balances siwo le negative o](https://zips.z.cash/zip-0209)
- [zips#1302: Quantum recoverability na transparent protocol ƒe akpa aɖe](https://github.com/zcash/zips/issues/1302)
- [zips#1133: Post-quantum privacy na Zcash](https://github.com/zcash/zips/issues/1133)
- [zips#1307: Ɣaɣla na Zcash le quantum kple discrete-log-breaking futɔwo ŋu](https://github.com/zcash/zips/issues/1307)
- [zips#1134: Post-quantum Zcash si nye blibo](https://github.com/zcash/zips/issues/1134)
- [Project Tachyon ƒe mɔmapu](https://tachyon.z.cash/roadmap/)
- [NU7 Polling Ƒe Nuɖoɖowo: Nu si Míese kple Afisi Míayi Tso Afisia](https://forum.zcashcommunity.com/t/nu7-polling-results-what-we-heard-and-where-we-go-from-here/54775)
- [Gaɖoɖowo ƒuƒoƒe 3,428,143 le ZecBlock](https://zecblock.com/block/3428143)
- [Forum ƒe biabia: Ɖe Zcash nye post-quantum?](https://forum.zcashcommunity.com/t/is-zcash-post-quantum-help-wanted-d-proposal/57154)
