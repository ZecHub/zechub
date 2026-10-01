<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Is_Zcash_Post_Quantum.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ðe Zcash nye Post-Quantum?

## Ŋuɖoɖo kpui aɖe

Ao, menye haɖe o.

Tso esime wowɔ Ironwood ŋgɔyiyi la, Zcash nye **quantum-recoverable** na ga siwo le Ironwood ta la me. Ema nye afɔɖeɖe ŋutɔŋutɔ, gake menye nu ɖeka kple dedienɔnɔ le quantum megbe o. ZIP 2005, spec si le megbe nɛ, gblɔe tẽ: tɔtrɔa "mewɔe le eɖokui si be protocol la nanɔ dedie tso quantum futɔwo si me o". Edzraa Ironwood ƒe ga ɖo ale be woate ŋu atsɔ wo ato etsɔme Gbugbɔgadzɔ ƒe Ðoɖo aɖe me ne wonya tsi nya ɣaɣla si li fifia ko.

Axa sia ma nusiwo Zcash kpɔ ta na egbea, nusiwo Ironwood trɔ, nusiwo wogaɖe ɖe go, kple nusiwo nye aɖaŋuɖoɖo ko. The [nɔnɔme ƒe kplɔ̃](#status-table) le nuwuwu lɔƒo la fia afisi kakɛ ɖesiaɖe tsi tre ɖo kple ɣeyiɣi si me wolé ŋku ɖe ema ŋu zi mamlɛtɔ.

<br/>

## Ameka tae esia nye

- Ame sia ame si kpɔ "quantum-recoverable" eye wòxlẽe be "quantum-proof"
- Gaxɔlawo le nya me tsom nenye be yewoatsɔ ga ayi Ironwood
- Agbalẽŋlɔlawo kple nudzikpɔla siwo hiã ŋuɖoɖo si tso teƒe aɖe be woafia asi amewo

Ne èdi nyatakaka tso quantum computing ŋutɔ ŋu la, dze egɔme kple [Dedienɔnɔ le Quantum megbe le Zcash](/zcash-tech/post-quantum-security).

<br/>

## Nusitae biabia la tɔtɔa ame

"Post-quantum" va zu numame abe ɖe wònye nunɔamesi ɖeka ene. Le Zcash gome la, enye nyabiase ene ya teti siwo to vovo, eye woƒe ŋuɖoɖowo to vovo:

1. **Adzamenyawo.** Ðe quantum amedzidzela ate ŋu akpɔ amesi xe fe na ameka kple ga home si wòxea?
2. **Gazazã.** Ðe quantum attacker ate ŋu azã gaku siwo menye wo tɔ oa?
3. **Ga ƒe asixɔxɔ.** Ðe quantum attacker ate ŋu awɔ ZEC tso naneke mea?
4. **Gbugbɔgadzɔ.** Ne ele be woatsi nya ɣaɣla siwo li fifia la, ɖe ezãla anukwareɖilawo ate ŋu akpɔ woƒe ga kokokoa?

Nyabiase enelia ƒe ŋuɖoɖo koe Ironwood trɔna, eye nuŋlɔɖi siwo le Ironwood ta la me koe wòtrɔna.

Afɔku si le esiawo katã megbe enye amedzidzela si ate ŋu abu logarithm siwo le vovo le elliptic curves siwo Zcash zãna la dzi. Quantum kɔmpiuta si lolo ale gbegbe si zãa Shor ƒe algorithm anye mɔ ɖeka si dzi woato awɔ ema. ZIP 2005 ɖee fia be **single** discrete logarithm didi sɔ gbɔ be wòana ga ƒe asixɔxɔ nayi dzi le mɔ si wodi nu alo afi ga.

<br/>

## Nusi Zcash kpɔa ta na egbea

Tabla sia ɖɔa ɖoɖowɔɖia abe alesi wòle zɔzɔm fifia ene, ɖe amedzidzela si ateŋu agbã logarithm siwo le vovo la ŋu. Eku ɖe ta ɖesiaɖe si ŋu wokpɔ akpoxɔnu le ŋu, Ironwood hã le eme, elabena Ironwood zãa Orchard nutome sue, Halo 2 ƒe kpeɖodziwo kple RedPallas ƒe asidede agbalẽ te abe Orchard.

| Nunᴐamesi | Ðe quantum amedzidzela aɖe ŋu egbea | Nusi Ironwood trɔ |
|---|---|---|
| Adzame | Eléa ne amedzidzela la menya wò adrɛs si wotsɔ akpoxɔnu wɔe o. Kpeɖodziwo kple asidede agbalẽ te siwo wogbugbɔ ɖo ɖe ɖoɖo nu meɖea naneke kpena ɖe eŋu o. Ne amedzidzela la nya adrɛs la nyateƒe la, woate ŋu aɖe nuŋlɔɖi siwo woɖo ɖee, siwo dome xoxo siwo wodzra ɖo tso kɔsɔkɔsɔa me hã le la me. | Naneke o. ZIP 2005: "Nɔnɔme si ku ɖe Ameŋunyatakakawo ŋu metrɔ na ta aɖeke o." |
| Gazazã | Womekpɔa wo ta o. Amedzidzela ate ŋu awɔ kpeɖodziwo alo azã asidede agbalẽ te ahafi fi le ta ɖesiaɖe si ŋu wokpɔ akpoxɔnu le me, na adrɛs siwo womekpɔ kpɔ o gɔ̃ hã. | Naneke meli haɖe o. Ne wotrɔ ɖe Recovery Protocol ŋu le etsɔme vɔ ko hafi ametakpɔkpɔa va ɖona. |
| Dziyiyi | Womekpɔa wo ta o. Amedzidzela ate ŋu awɔ kpeɖodzi si dze abe ɖe wòsɔ ene eye wòawɔ ZEC le ta ɖesiaɖe si ŋu wokpɔ ta na la me, ɖewohĩ ame aɖeke made dzesii o. Seɖoƒe ɖeka kolia si li enye.. [turnstile ƒe ʋuƒo](/zcash-tech/the-turnstile): ta aɖeke mate ŋu axe fe si wu eƒe ga si woŋlɔ ɖi o. | Naneke meli haɖe o. Ironwood nuŋlɔɖiwo tsɔ wo ɖokui na fifia ɖe wo me nyawo katã ŋu le mɔ si nu mele be quantum amedzidzela nate ŋu awɔ aʋatso o nu, si nye nusi hiã le etsɔme Gbugbɔgadzɔ ƒe Ðoɖowɔɖi aɖe be wòana nusiwo woatsɔ ana la nanɔ nyuie. |
| Hayahaya | Mɔ aɖeke meli si dzi woato ahaya Sprout, Sapling kple Orchard ƒe nuŋlɔɖiwo me o. Ne wonya tsi woƒe ɖoɖowɔɖiwo ko la, nusianu si susɔ ɖe wo me la, womate ŋu aɖo wo gbɔ o. | Woate ŋu agbugbɔ Ironwood ƒe nuŋlɔɖi ɖesiaɖe axɔ le gɔmeɖose nu. Sapling alo Orchard nuŋlɔɖi aɖeke mele nenema o. |

ZEC si me kɔ la nye nya si to vovo. Woate ŋu awɔ aʋatso eƒe ECDSA asidede agbalẽ te ne wonya nya dutoƒo safuia ko. Na adrɛs si me kɔ si sɔ si dzɔna zi gbãtɔ si nèzã ga tso eme, eye fesre kpui aɖe hã li esime asitsatsa aɖe bɔbɔ nɔ anyi si dzi womeɖo kpee o le mempool la me. ZIP 2005 metrɔa nu mawo dometɔ aɖeke o.

<br/>

## Nusi Ironwood trɔ

Ironwood nye NU6.3 network ƒe tɔtrɔ. Ewɔ dɔ le Mainnet dzi le block 3,428,143 le 28 July 2026. Eƒe taɖodzinu vevitɔe nye supply integrity le Orchard soundness bug megbe (kpɔ [Ironwood](/zcash-tech/ironwood) axa), kple quantum recoverability tso ZIP 2005 si woɖo ɖa abe eƒe akpa aɖe ene.

- **Nuŋlɔɖi ƒe nɔnɔme yeye.** Ironwood ƒe nuŋlɔɖi ɖesiaɖe zãa quantum-recoverable format (de dzesi plaintext lead byte `0x03`). Fifia woɖea nuŋlɔɖia ƒe vovototodedeameme tso eƒe agblewo katã me, eyata wotsɔa hash blaa nuŋlɔɖia ɖe emenyawo ŋu tsɔ wu be woatsɔ akɔntabubu si nye elliptic-curve ɖeɖeko ablae.
- **Mɔ si dzi woato agbugbɔ axɔ Ironwood ƒe nuŋlɔɖiwo ɖeɖeko.** ZIP 326 gblɔe kɔte be woate ŋu agbugbɔ Ironwood ƒe nuŋlɔɖi ɖesiaɖe axɔ eye Orchard nuŋlɔɖi aɖeke hã mele nenema o. Gakotoku ƒe ɖoɖo metrɔa ema o.
- **Orchard dzudzɔ asixɔxɔ yeye xɔxɔ.** Coinbase teƒeɖoɖowo megate ŋu yi Orchard, eye Orchard megate ŋu ɖoa ɖe Orchard adrɛs bubu o, eyata asixɔxɔ yeye si wotsɔ akpoxɔnu wɔe la ɖina ɖe Ironwood.
- **Wogblɔna na gakotokuwo be woaʋu nusianu.** ZIP 2005 gblɔ be ELE BE gakotokuwo natsɔ ga siwo katã dzi wokpɔna, siwo dome ga si me kɔ, Sprout kple Sapling ga hã le, ayi Ironwood ƒe gagbalẽwo me ne enya wɔ ko, eye woayi edzi anɔ ewɔm ne ga yeyewo va ɖo.

Nusi Ironwood metrɔ o: nya ɣaɣla siwo wozãna tsɔ zãa gazazã kple kpeɖodzinana egbea, nuŋlɔɖiwo ƒe nya ɣaɣlawo tsɔtsɔ ɣla, kple nusianu si ku ɖe ZEC.

<br/>

## Seɖoƒe siwo susɔ

**Fesre aɖe li si dzi woɖea nu le.** Tso Ironwood's dɔwɔwɔ dzi vaseɖe esime woatsi ɖoɖowɔɖi xoxoawo la, quantum amedzidzela ate ŋu afi ga, ado ya alo axe mɔ na ga le ta ɖesiaɖe si wotsɔ akpoxɔnu wɔe me kokoko. ZIP 2005 yɔ esia be "ɣeyiɣi vevi si me woaɖe nu le" eye wòxlɔ̃ nu be amedzidzedze le ɣeyiɣi si me ate ŋu agblẽ nu le amesi lée ŋu ƒe ŋutete be wòahaya emegbe ŋu kokoko. Esia tae wògblɔ be ele be Zcash natsi Orchard, Sapling kple Sprout **hafi** quantum attacks nazu nusi woateŋu awɔ.

**Ŋkeke aɖeke mele ʋuʋua ŋu o.** ZIP ɖoɖowɔɖi aɖeke meli si atsi Orchard alo Sapling. ZIP 2003, si nye Draft kple NU7 ametiakɔdala, awɔ Sprout ƒe gazazãwo nuwɔametɔe to mɔɖeɖe ɖe tɔtrɔ 4 ƒe asitsatsa ŋu me. Sapling ƒe asiɖeɖe le eŋu ɖeɖeko ƒe numedzodzro dze egɔme le nyamedzroƒea le April 2026 me.

**Recovery Protocol la mewu enu o.** ZIP 2005 ɖeko wògblɔe, eye wògblɔ be nyatakakaawo "ate ŋu atrɔ". Womewɔa naneke tso eŋu o.

**Nu ŋe fifia, decrypt emegbe.** De dzesii be ciphertexts na Ironwood, Orchard, Sapling kple Sprout katã le dutoƒo le kɔsɔkɔsɔa dzi. Ame aɖe ate ŋu adzra wo ɖo egbea eye wòaɖe wo gɔme emegbe, ne eya hã nya adrɛs si dzi woxɔ wo. Adrɛs ɖesiaɖe si nàta alo ana la nye afɔku ma ƒe akpa aɖe. ZIP 2005 gblɔ be "wole ɖoɖowɔɖi ƒe tɔtrɔ bubuwo ŋu bum" hena etsɔme asitɔtrɔwo.

**Womexea ga si le gaglãgbe o.** Adrɛs siwo wozã tso, alo wogbugbɔ zã, ɖe dutoƒo safuiwo ɖe go. Recoverability na adrɛs aɖewo siwo me kɔ la nye susu aɖe ko vaseɖe fifia (ZIP 2007, kpɔ ete).

**FROST ɖoɖowo le nuxlɔ̃ame bubu aɖe.** Le FROST, gomekpɔla ɖesiaɖe léa quantum gazazã ƒe safui (`qsk`), eye quantum amedzidzela si lée ɖe asi ate ŋu afi. ZIP 2005 kafui be woatsɔ FROST ga ayi quantum megbe ɖoɖowɔɖi blibo si me threshold support le ne ɖeka li ko.

<br/>

## Aɖaŋuɖoɖowo kple numekukuwo

Amesiawo dometɔ aɖeke mele agbe o.

- **Recovery Protocol.** Mɔnu si ana woazã Ironwood ƒe ga ŋutɔŋutɔ le tɔtrɔa megbe. Wogblɔe le ZIP 2005 me, womegblɔe o.
- **ZIP 2007, gbugbɔgaxɔ na adrɛs aɖewo siwo me kɔ.** ZIP xexlẽdzesi si wodzra ɖo ɖi si me wodzro le [zipwo#1302](https://github.com/zcash/zips/issues/1302). Susua enye be P2PKH kple P2SH ƒe dodo siwo ƒe dutoƒo safuiwo womeɖe fia kpɔ o ateŋu anye esiwo woateŋu axɔ, kple kakaɖedzi siwo gbɔdzɔ wu Ironwood.
- **Post-quantum privacy na adrɛs siwo wonya.** Woʋu tso ƒe 2022 me le [zipwo#1133](https://github.com/zcash/zips/issues/1133), si de dzesii be Zcash "ɖoe xoxo be wòanye post-quantum private" ne woɣla adrɛswo eye wòbia alesi woawɔ akeke ema ɖe enu ayi adrɛs siwo wonya, le kpɔɖeŋu me kple post-quantum key encapsulation scheme abe Kyber (fifia ML-KEM) ene. Le June 2026 me [zipwo#1307](https://github.com/zcash/zips/issues/1307) do susua ɖa be woawɔ ZIP be woatsɔ aŋlɔ ameŋunyatakakawo ƒe nɔnɔme siwo li fifia kple esiwo woate ŋu aɖɔ ɖo.
- **Dɔwɔwɔ Tachyon.** Wodo susua ɖa be woawɔ scaling upgrade. Eƒe nyatakakadzraɖoƒea gblɔ be yeakpɔ "full post-quantum privacy" abe eƒe nugbegblẽ le ame ŋu ene, to fexexe ƒe tsɔtsɔ yi kɔsɔkɔsɔ me kple post-quantum key exchange zazã me. Wogblɔ tso eƒe nyatakakadzraɖoƒe si tsɔa kpeɖodziwo, Ragu, ŋu be "wogale tutum". Kpɔ [Dɔwɔɖoɖo si nye Tachyon](/zcash-tech/project-tachyon).
- **A fully post-quantum Zcash.** Post-quantum kpeɖodziwo, asidede agbalẽ te kple ŋugbedodowo ɖekae. Wokplɔe ɖo le eme [zipwo#1134](https://github.com/zcash/zips/issues/1134), open since 2016. Spec alo ɣeyiɣi ƒe ɖoɖo aɖeke meli o.

<br/>

## Nɔnɔme ƒe kplɔ̃

Last checked 13 September 2026. ZIP's ta ƒe nɔnɔme kple eƒe network ƒe nɔnɔme nye nu vovovowo: ZIP 2005 gakpɔtɔ gblɔna be "Proposed" le eƒe ta me togbɔ be wowɔ eƒe sewo dzi le Mainnet tso July 2026 me hã.

| Nu | ZIP nɔnɔme | Network ƒe nɔnɔme | Ŋkeke | Dzᴐtsoƒe |
|---|---|---|---|---|
| Ironwood ta si me nuŋlɔɖi siwo woate ŋu agbugbɔ axɔ le quantum me (NU6.3) | ZIP 2005 Dodo ɖa, ZIP 229 kple ZIP 258 ƒe Nɔnɔmetata | **Wowɔ dɔ** le Mainnet dzi | 28 Jul 2026, xɔ 3,428,143 | [ZIP ƒe 2005](https://zips.z.cash/zip-2005), [ZIP 258 ƒe xexlẽdzesi](https://zips.z.cash/zip-0258) |
| Wotu Orchard ɖe asixɔxɔ yeye nu | ZIP 2006 Wodzrae ɖo, sewo le ZIP 258 me | **Wowɔ dɔ** le Mainnet dzi | 28 Dzove 2026. Eƒe dukɔ nye … | [ZIP 258 ƒe xexlẽdzesi](https://zips.z.cash/zip-0258) |
| Gakotoku siwo tsɔa ga yia Ironwood | Mɔfiame le ZIP 2005, ZIP 318 kple ZIP 326 (Draft) me | Wokafui, nɔ te ɖe wò gakotoku dzi | Tso 28 Jul 2026 dzi | [ZIP 318 ƒe xexlẽdzesi](https://zips.z.cash/zip-0318), [ZIP 326 ƒe xexlẽdzesi](https://zips.z.cash/zip-0326) |
| Gbugbɔgadzɔ ƒe Ðoɖowɔɖi | Wogblɔe le ZIP 2005 me ɖeɖeko | **Womewɔe o** | Ɣletiŋkeke aɖeke meli o | [ZIP ƒe 2005](https://zips.z.cash/zip-2005) |
| Tsitretsitsi ɖe Orchard kple Sapling ŋu | ZIP aɖeke meli o | **Womewɔ ɖoɖo ɖe eŋu o** | Sapling numedzodzro tso Apr 2026 | [Nyamedzroƒe](https://forum.zcashcommunity.com/t/sapling-withdraw-only-discussion-kickoff/55223) |
| Sprout ƒe gazazãwo nuwɔametɔe (ZIP 2003) | Draft, NU7 ametiakɔdala | **Womewɔ dɔ o** | Ɣletiŋkeke aɖeke meli o | [ZIP ƒe 2003](https://zips.z.cash/zip-2003) |
| Nusiwo woate ŋu agbugbɔ axɔ le gaglãgbe (ZIP 2007) | Wodzrae ɖo ɖi | **Nyadoɖa** | ZIP reserved 5 Jul 2025, woʋu numedzodzro 17 Jun 2026 | [zipwo#1302](https://github.com/zcash/zips/issues/1302) |
| Post-quantum adzamenyawo na adrɛs siwo wonya | Tata siwo woʋu, ZIP aɖeke meli o | **Numekuku** | #1133 ʋu le 18 Aug 2022, #1307 ʋu le 23 Jun 2026 | [zipwo#1133](https://github.com/zcash/zips/issues/1133), [zipwo#1307](https://github.com/zcash/zips/issues/1307) |
| Dɔwɔɖoɖo si nye Tachyon | ZIP aɖeke meli o | **Aɖaŋuɖoɖo**, wole ŋgɔyiyi wɔm | Wotae zi gbãtɔ le Apr 2025 | [tachyon.z.ga si wotsɔna xɔa gae](https://tachyon.z.cash/roadmap/) |
| Bliboe le post-quantum protocol | Tata si woʋu, ZIP aɖeke meli o | **Dɔwɔwɔ le etsɔme** | #1134 ʋu le 28 Mar 2016 dzi | [zipwo#1134](https://github.com/zcash/zips/issues/1134) |

Le Zcash Foundation's NU7 seselelãme ƒe numekuku (February 2026) me la, quantum recoverability xɔ 90.5% ƒe kpekpeɖeŋu tso ZCAP gbɔ eye 94.6% tso gakuxɔlawo gbɔ, eye Tachyon xɔ kpekpeɖeŋu si le xexeame katã kloe. Emawo nye seselelãme ŋuti numekukuwo, ke menye nyametsotsowo le nusiwo yi NU7.

<br/>

## Nusi nàte ŋu awɔ fifia

- **Tsɔ wò ga yi Ironwood.** Womate ŋu axɔ Sapling kple Orchard ƒe nuŋlɔɖiwo gbeɖe o. Asixɔxɔ si le ʋuʋum le tadeaguƒewo dome ɖea ga home si le kɔsɔkɔsɔa dzi fiana, eyata ZIP 318 na gakotokuwo ma ga si susɔ ɖe ga home siwo woɖo ɖi me eye woɖoa wo ɖe gota le ɣeyiɣi aɖe megbe. Na wò gakotokua nawɔe tsɔ wu be nàʋuʋu nusianu zi ɖeka.
- **Mègata adrɛs siwo wokpɔ ta na o.** Ame ŋutɔ ƒe nyawo tsɔtsɔ aɣla ɖe quantum amedzidzela si ava va ŋu nɔ te ɖe woƒe wò adrɛs manyamanya dzi. Adrɛs siwo wowɔ ɖekae la wɔwɔ mexɔ asi o, eyata na fexela ɖesiaɖe na yeye. ZIP 229 kafu adrɛs ƒe tɔtrɔ le susu sia ta.
- **Mègazã adrɛs siwo me kɔ o.** Ne ènya zã ga tso ɖeka dzi ko la, eƒe dutoƒo safui nɔa kɔsɔkɔsɔa dzi tegbee.
- **Na wò nuku ƒe nyagbea nanɔ dedie.** Le Gbugbɔgadzɔ ƒe Ðoɖowɔɖi me abe alesi wogblɔe ene la, ele be gazazã ɖe gaxɔgbalẽvi ŋu naɖo kpe edzi be ènya wò gazazã ƒe safui, eye gakotoku siwo sɔ la xɔa safui ma tso nukua me.
- **Aɖaba ƒu "Zcash is quantum-proof" nyawo dzi.** Menye haɖe o, eye ame siwo le specs la ŋlɔm la gblɔe nenema.

<br/>

## Nugɔmesese totro siwo bɔ

- **"Ironwood nye post-quantum."** Ao. Ewɔa Orchard cryptography ma ke, eye ZIP 2005 gblɔ be nɔnɔmea "mena Orchard ƒe ɖoɖowɔɖia le dedie tso quantum ƒe amedzidzedzewo me o".
- **"Quantum-recoverable fia be ele dedie tso quantum kɔmpiutawo gbɔ egbea."** Ao. Efia be woate ŋu axɔ Ironwood ƒe ga le etsɔme tɔtrɔ megbe, nenye be tɔtrɔ ma dzɔ le ɣeyiɣi aɖe megbe ko.
- **"Shielded Zcash nye post-quantum private xoxo."** Ne amedzidzela la menya wò adrɛs o ko. Woɖea adrɛs siwo wonya la ɖe go le ta ɖesiaɖe me.
- **"Tachyon tsɔ post-quantum privacy kpe ɖe eŋu xoxo."** Tachyon nye aɖaŋuɖoɖo. Naneke metso eme si le agbe o.
- **"Quantum kɔmpiutawo gblẽa Zcash."** Ðeko hash dɔwɔwɔwo gbɔdzɔna, ke menye wogbãna o, to quantum amedzidzedze siwo wonya me. Quantum recoverability nɔ te ɖe vovototo ma tututu dzi.

<br/>

## Axa siwo do ƒome kplii

- [Dedienɔnɔ le Quantum megbe le Zcash](/zcash-tech/post-quantum-security)
- [Ironwood](/zcash-tech/ironwood)
- [Turnstile ƒe ʋuƒoa](/zcash-tech/the-turnstile)
- [Dɔwɔɖoɖo si nye Tachyon](/zcash-tech/project-tachyon)
- [FROST](/zcash-tech/frost)
- [Ta Siwo Wotsɔ Akpoxɔnu Wɔe](/using-zcash/shielded-pools)

<br/>

## Dzɔtsoƒewo

- [ZIP 2005: Ironwood ƒe Agbɔsɔsɔme Gbugbɔgaxɔ](https://zips.z.cash/zip-2005)
- [ZIP 229: Version 6 Asitsatsa ƒe Nɔnɔme](https://zips.z.cash/zip-0229)
- [ZIP 258: NU6.3 Network Upgrade ƒe dɔwɔwɔ](https://zips.z.cash/zip-0258)
- [ZIP 318: Orchard yi Ironwood Ʋuʋu](https://zips.z.cash/zip-0318)
- [ZIP 326: NU6.3 Emetsonuwo na Gakotokuwo](https://zips.z.cash/zip-0326)
- [ZIP 2003: Gbe mɔ na version 4 ƒe asitsatsa](https://zips.z.cash/zip-2003)
- [ZIP 209: De se ɖe Kɔsɔkɔsɔ ƒe Asixɔxɔ si Wokpɔna le Takpɔƒe ƒe Dadaɖeamedzi Madzɔmadzɔwo Nu](https://zips.z.cash/zip-0209)
- [zips#1302: Quantum recoverability si nye ɖoɖo si me kɔ ƒe hatsotso sue aɖe](https://github.com/zcash/zips/issues/1302)
- [zips#1133: Post-quantum adzamenyawo na Zcash](https://github.com/zcash/zips/issues/1133)
- [zips#1307: Zcash ƒe adzamenyawo ɖe quantum kple discrete-log-breaking futɔwo ŋu](https://github.com/zcash/zips/issues/1307)
- [zips#1134: Zcash si le quantum megbe bliboe](https://github.com/zcash/zips/issues/1134)
- [Dɔwɔɖoɖo Tachyon ƒe mɔfiame](https://tachyon.z.cash/roadmap/)
- [NU7 ƒe Nyametsotsowo: Nusiwo Míese Kple Afisi Míeyi Tso Afisia](https://forum.zcashcommunity.com/t/nu7-polling-results-what-we-heard-and-where-we-go-from-here/54775)
- [Block 3,428,143 le Blockchair dzi](https://blockchair.com/zcash/block/3428143)
- [Nyamedzroƒe ƒe biabiawo: Ðe Zcash nye post-quantum?](https://forum.zcashcommunity.com/t/is-zcash-post-quantum-help-wanted-d-proposal/57154)
