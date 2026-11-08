<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Shielded_Coinholder_Voting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ɣaɣla (Shielded) Kɔin ƒe Nɔlawo ƒe Akɔtaɖoɖo

> Le August 2026 me la, Zcash wɔ kɔin ƒe nɔlawo ƒe akɔtaɖoɖo si me akɔtawo nɔ ɣaɣlaŋlɔŋlɔ te eye woɖe mamleawo ƒe xexlẽ bliboa ko fia, esi wowɔ ɣaɣla akɔtaɖoɖo ƒe ɖoɖo si Valar Group tu.

Nusi nàse egɔme: ale si woate ŋu ada akɔta ƒe kpekpeɖeŋu ɖe ZEC si nèle asiwò ƒe lolome, ana nàganɔ ɣaɣla me, eye woaxlẽe nyuie hã, ne ame aɖeke maɖe nusi nèɖo akɔta ɖo o alo nusi nèle asiwò o.

ɣaɣla kɔin ƒe nɔlawo ƒe akɔtaɖoɖo na Zcash ƒe nɔlawo nɔ akɔta ɖe ecosystem ƒe biabiawo ŋu kple woƒe ɣaɣla ZEC. Ame aɖeke mate ŋu anya nusi ame ɖeka sia ɖo akɔta ɖo alo ZEC aleke wòle asime o, gake ame sia ame ate ŋu akpɔe ɖa be xexlẽwo le eteŋu. Ewɔa dɔ le akɔtaɖoɖo ƒe ɖoɖonu si Valar Group tu ŋu, si maɖe le Zcash mainnet ŋu o, eye wòƒe ga vavã mele ɖe asi o. Ne èdi be nànya ale si Zcash wɔa ɖoɖo le gbogblɔ me la, kpɔ [Zcash Ga ƒe Nadzɔdzɔ kple Dziɖuɖu ƒe Nɔnɔmetata](../zcash-community/zcash-governance). Axa sia ƒe nya koe nye ɣaɣlaŋlɔŋlɔ ƒe akɔtaɖoɖo ƒe ɖoɖo.

Èya yeyee le Zcash ŋu oa? Dze egɔme kple [Nukae nye ZEC eye Zcash](../start-here/what-is-zec-and-zcash), [Ɣaɣla gaƒuƒoƒowo](../using-zcash/shielded-pools), eye [zk-SNARKs](../zcash-tech/zk-snarks), eye va megbe afisia.

![Shielded voting flow: a voter proves their Ironwood balance at a snapshot, casts an encrypted ballot split into shares, which are homomorphically tallied and then threshold-decrypted into totals only](/content-images/shielded-voting-flow.webp)

## Nu ka ta ɣaɣla akɔtaɖoɖo sesẽ

Kɔin ƒe nɔlawo ƒe akɔtaɖoɖo nyui di nu ene le ɣeyiɣi ɖeka me, eye mɔ siwo dze ŋgɔ be woatsɔ akpɔ wo la ƒoa ɣli kple wo nɔewo.

1. Kpekpeɖeŋu nanɛ le ga ƒe ƒuƒoƒo nu, ale be ZEC geɖe si wòlé la na kpekpeɖeŋu geɖe.
2. Tiaɖoɖo ƒe ɣaɣla, ale be ame aɖeke manya ale si nèɖo akɔta ɖo o.
3. Ga ƒe ƒuƒoƒo ƒe ɣaɣla, ale be ame aɖeke manya ZEC aleke nèle asiwò o.
4. Xexlẽ si le eteŋu eye woate ŋu akpɔe ɖa, si ame sia ame ate ŋu akpɔe ɖa.

Ne woadzro kpekpeɖeŋu le ga ƒe ƒuƒoƒo nu la, ekema wòle be woanya ame sia ame ƒe ga ƒe ƒuƒoƒo. Ne woadzro akɔtawo la, wòle be woaʋu wo. Ne wowɔ esia le mɔ bɔbɔe nu la, ekema edoa ŋutinya si ɣaɣla gaƒuƒoƒo [ɣaɣla gaƒuƒoƒo](../using-zcash/shielded-pools) le be wòakpɔ ɖa la fia, eye kɔin ƒe akɔtaɖoɖo siwo va yi hã ɖe ga ƒe ƒuƒoƒo ƒe nyawo fia le ta sia nu. ɣaɣla akɔtaɖoɖo wɔa ɖe dzɔdzɔ sia ŋu kple dɔwɔnu mawo ke siwo wɔa ɣaɣla fexexe dɔ: [zero-knowledge ɖaseɖigbalɛwo](../zcash-tech/zk-snarks), nullifiers, kple ɣaɣlaŋlɔŋlɔ.

## Nuxlɔ̃ame: akɔta ƒe aɖaka si xlẽa eɖokui

> Gaƒe ƒe xexlẽdzikpɔɖeƒe na wòate ŋu nàxlẽ nusi to gaƒe me la ne mèkpɔ eme o. ɣaɣla akɔta ƒe aɖaka yi edzi ɖeka: exlẽa akɔta siwo woƒo ɣaɣla la ƒe xexlẽ ne meʋu wo kpɔ o.

Bu akɔta ƒe aɖaka aɖe si si ŋusẽ tɔxɛ lɔ̃. Ete ŋu atsɔ envelop si woƒo ɣaɣla akpe ɖe xexlẽ si le edzi yim la ŋu ne meʋu eƒe eme o. Dɔdzikpɔlawo ƒe ha aɖe, ame ɖeka mele wo dome si le kplɔɖeƒe la o, va ɖe mamleawo ƒe xexlẽ bliboa ko fia. Eye hafi nàte ŋu atsɔ envelop aɖe ade eme la, èɖe ɖase le ɣaɣla me be nèlé ZEC le ɣeyiɣi si va yi aɖe me eye mèɖo akɔta ɖo kpɔ o, ne mèfia kɔin kawoe nye tɔwò o. Nusiwo katã le ete lae nye ale si wotu aɖaka sia vavã.

## Ɖeɖe te ŋu akɔtaɖoɖo kple snapshot

Akɔtaɖoɖo ƒe ƒeɖeɖe aɖe tsɔa snapshot ƒe kɔkɔƒe, Zcash mainnet gaɖoɖowo ƒuƒoƒe ɖeka, ɖo anyi, eye wòƒe kpekpeɖeŋu nye wòƒe ɣaɣla ga si nàte ŋu azã le [Ironwood](../zcash-tech/ironwood) gaƒuƒoƒo me le gaɖoɖowo ƒuƒoƒe ma dzi. Se la bɔbɔe: Ironwood ƒe ZEC ɖeka le snapshot la dzi sɔ kple akɔta ɖeka. Na NU7 ƒe scope akɔtaɖoɖo la, snapshot la nye mainnet gaɖoɖowo ƒuƒoƒe 3,459,350, le August 24, 2026 ƒe 19:00 UTC ƒe ƒome, eye akɔtaɖoɖo la ʋu va se ɖe September 14, 2026 ƒe 19:00 UTC. Nuwo ƒe ʋuʋuɖi ZEC woatsɔ mɔ xoxo la wɔe le vovo me, menye ɖoɖo sia ŋu o.

1. Wòƒe ga mele ɖe asi o eye woƒoa eƒe mɔ o. Woɖo ame siate ŋu akɔtaɖoɖo le snapshot la dzi, eya ta nàte ŋu azã alo atsrɔ̃ ZEC enumake emegbe ne wòmeɖe wòƒe akɔta ŋu o.
2. Ŋkɔŋlɔɖeɖe ƒe afɔɖeɖe aɖeke mele o. Snapshot ƒe kɔkɔƒe ko hiã, si nana dɔa le bɔbɔe eye wòna ame siwo di be woaɖo akɔta ɖo la ƒe nyawo menɔ ʋuʋuɖi o.

## Ale si nàɖe wòƒe ga ƒe ƒuƒoƒo fia ne mèfia eya o

Ne nèɖo akɔta ɖo la, wòƒe gakotoku wɔa zero-knowledge ɖaseɖigbalɛ be le snapshot la me nèkplɔ ɣaɣla ZEC aɖewo siwo menye zãtɔ o. Eɖea ga ƒe ƒuƒoƒo si le eteŋu kple eƒe lolome fia na xexlẽ ƒe mɔ̃ɖaŋu si le ɣaɣla me, gake mefia didienu aɖeke o eye mewɔa gaɖoɖo aɖeke le Zcash mainnet ŋu o.

Ɖaseɖigbalɛ ma wɔa akɔtaɖoɖo ƒe credit le akɔtaɖoɖo ƒe ɖoɖonu la dzi, si sɔ kple wòƒe snapshot ga ƒe ƒuƒoƒo, eye akɔtaɖoɖo ƒe kplɔɖeƒe yeye si wòƒe gakotoku wɔ ɖe ƒeɖeɖe sia ta ko lae le eŋu. Esi kplɔɖeƒe la yeye eye womeɖo eƒe kadodo kple wòƒe Zcash ƒe gaɖoƒe ƒe dzesiwo o ta la, nu aɖeke le akɔtaɖoɖo ƒe ɖoɖonu la dzi mate ŋu ade mɔ ɖe wòƒe didienu vavãwo gbɔ o. Wòƒe ɖoɖonu dzi ame ƒe nyenye kple wòƒe akɔta le kadodo manɔ anyi le woƒe tututu me.

## Akɔtaɖoɖo zi eve ƒe nuxtɔxɔ, le ɣaɣla me

Be woaxɔ mɔ na ame aɖeke megaɖo akɔta zi eve kple kɔin ɖeka mawo o la, ele be ɖoɖoa na akpe be didienu siwo le wòƒe ga ƒe ƒuƒoƒo megbe la menye zãtɔ le snapshot la dzi. Le mainnet la dzi la, wowɔa esia to didienu ƒe gaɣaɣla ɖeɖe dzesi, eƒe zãzã dzesi tɔxɛ, ƒe ɖeɖefia me, si ɣaɣla dzesi ŋɔŋlɔ blibowo kpɔa be woatsɔ zãe ake o. Gake ne woɖe wòƒe gaɣaɣla ɖeɖe dzesi fia afii la, ekema woado wòƒe akɔtaɖoɖo ɖe didienuwo gbɔ enumake.

![Private double-vote prevention: instead of revealing a nullifier, the wallet uses Private Information Retrieval to fetch proof material while hiding which nullifier it asked about, then proves the note was unspent](/content-images/shielded-voting-pir.webp)

Eyata ɖoɖoa ɖea nu si to vovo me fia le ɣaɣla me. Ewɔa gaɣaɣla ɖeɖe dzesiwo katã siwo wozã xoxo le snapshot la dzi ƒe xexlẽ, eye wòƒe gakotoku ɖea ɖase fia le zero-knowledge me be wòƒe didienu ƒe gaɣaɣla ɖeɖe dzesi mele xexlẽ ma me o, si fia be didienu la menye zãtɔ ne mefia didienu kae o.

Nuxaxa ɖeka gale. Ne woaxɔ xexlẽ ma ƒe akpa si hiã tso server aɖe gbɔ la, ekema woaɖe wòƒe gaɣaɣla ɖeɖe dzesi fia na server la, eye xexlẽ bliboa lolo, le GB 2 ƒe ƒome na Orchard-me ƒe data, eye wòanɔ gã wu esia le Zcash ƒe tsitsi me. [Nya ƒe Xɔxɔ ɣaɣla Me (Private Information Retrieval)](../zcash-tech/private-information-retrieval) (PIR) ɖɔa nya evea sia: wòƒe gakotoku xɔa data si hiãe tututu, esi ɣaɣlaŋlɔŋlɔ tsɔ fia data si wobia la ɣaɣla. Wokpɔa emetsonu la ɖe gaɣaɣla ɖeɖe dzesi ƒe xexlẽ ƒe nɔnɔmetata si woɖe fia la ŋu, ale be server si menyo o mate ŋu awɔ emetsonu aɖe si menye vavã o.

## Akɔta si woŋlɔ ɣaɣla ƒe ɖoɖo

Na biabia sia biabia la, wòƒe gakotoku wɔa nu etɔ.

1. Eŋlɔa wòƒe akɔta ƒe kpekpeɖeŋu ɣaɣla na xexlẽ ƒe komiti la kple homomorphic encryption, ɣaɣlaŋlɔŋlɔ ƒe ƒome si me woate ŋu akpe ciphertexts ɖe wo nɔewo ŋu ne woaɖe wo ƒe ɣaɣla kpɔ o. Esiae na aɖaka la ate ŋu axlẽ akɔtawo siwo mate ŋu exlẽ o.
2. Ema wòƒe akɔta ƒe akpa 16 vovovo, ale be hã ne komiti bliboa wɔ ɖeka la, nanɔ sesẽ be woaƒo nusi ame ɖeka ɖo akɔta ɖo kplee la ƒe lolome ake.
3. Edoa akpa mawo ɖe ɣeyiɣi siwo woɖe ɖe vovo me la dzi to servers geɖewo dzi, ale be nukpɔla aɖeke mate ŋu anya be akpa mawo tso akɔtaɖola ma ke gbɔ to ɣeyiɣi si wova me o.

Akpa sia akpa tsɔa eya ŋutɔ ƒe zero-knowledge ɖaseɖigbalɛ be enye akpa si le eteŋu tso akɔta vavã aɖe me, ale be ame aɖeke mate ŋu akpe akɔtawo siwo meɖo ɖase me o. Woakpe akpa siwo woakpɔe ɖa be wole eteŋu la ɖe xexlẽ si woŋlɔ ɣaɣla na wòƒe ŋuɖoɖo si nètsɔ tia la dzi kple homomorphic mɔ.

## Xexlẽ ne woaʋu akɔta aɖeke kpɔ o

Xexlẽa wɔa dɔ kple akɔtaɖoɖo ƒe ŋusẽmama si woama le vovototo me: akɔtaɖoɖo-ɖoɖonu ƒe dɔdzikpɔla 10 alo sɔe kple esia wu, eye ame ɖeka aɖeke le wo dome mate ŋu aɖe nu aɖeke ƒe ɣaɣla kpɔ o. Le ƒeɖeɖe aɖe ƒe gɔmedzedze la, wo katã wɔa kplɔɖeƒe-wɔwɔ ƒe kpekpe ɖeka si wɔa ɣaɣlaŋlɔŋlɔ ƒe kplɔɖeƒe, si eƒe ɣaɣla-ɖeɖe kplɔɖeƒe si sɔ kplee la mamla wo dome eye womeƒoa eƒe akpa katã ɖe teƒe ɖeka o.

> Dɔdzikpɔla ɖeka aɖeke mele si le kplɔɖeƒe la o. Aɖaka la ʋua ne woƒe akpa etɔ le ene me trɔ woƒe kplɔɖeƒewo ɖeka, eye hã le ɣeyiɣi ma me la, mamleawo ƒe xexlẽ koe wòɖea fia.

Ne ƒeɖeɖe la ƒo nu la, xexlẽ siwo woŋlɔ ɣaɣla la le afi ma xoxo tso homomorphic kpekpeɖeŋu si le etame. Dɔdzikpɔla sia sia ɖea ɣaɣla ƒe akpa aɖe kple ɖaseɖigbalɛ be eɖe ɣaɣla la nyuie fia. Ne woƒe akpa etɔ le ene me dze eme la, woƒe akpa mawo ƒoa ɖeka wɔa xexlẽ si mewoŋlɔ ɣaɣla o na biabia sia biabia, eye womeɖea nu bubu aɖeke ƒe ɣaɣla kpɔ o. ɣaɣla dzesi ŋɔŋlɔ blibo sia sia ate ŋu akpɔ ɖaseɖigbalɛ si woƒo ɖeka ƒe nyonyo ɖa, ale be dukɔ la ate ŋu akpɔ xexlẽa ɖa ne womekplɔ dzidzɔ ɖe dɔdzikpɔlawo ŋu o.

## Ame kawoe wɔa dɔa, eye nusi womate ŋu awɔ o

Nɔnɔmetata la ma dɔwɔƒe eve ɖe vovo me, ale be ha aɖeke magakpɔ ŋusẽ geɖe akpa o.

![Separation of powers: a coordinator multisig sets which questions appear but cannot see votes, while a validator set counts but cannot read individual ballots or forge a tally](/content-images/shielded-voting-roles.webp)

Coordinator multisig la nye ame 2 tso ame 5 ƒe ha, si me ame tso Project Tachyon, [Zcash Foundation](../zcash-organizations/zcash-foundation), ZODL, [Shielded Labs](../zcash-organizations/shielded-labs), kple Valar Group le. Wòɖoa nya siwo adze ɖoɖonu la dzi kple wòɖea ɖase na ƒeɖeɖe sia ƒe ɣaɣlaŋlɔŋlɔ ƒe kplɔɖeƒe, gake mate ŋu akpɔ, atrɔ, alo axɔ mɔ na akɔta ɖekaɖeka o. Ame sia ame si melɔ̃ biabiawo o ate ŋu awɔ eya ŋutɔ ƒe akɔtaɖoɖo ƒe ɖoɖonu, elabena software la le ʋuʋuɖi eye zãzã faa.

Dɔdzikpɔlawo nye ɣaɣla dzesi ŋɔŋlɔwo 10 alo sɔe kple esia wu siwo le ɣaɣla-ɖeɖe kplɔɖeƒe si woema dome la eye wowɔa threshold ɣaɣla-ɖeɖe. Womate ŋu aɖe akɔta ɖekaɖeka ƒe ɣaɣla kpɔ alo awɔ xexlẽ aɖe si menye vavã o, elabena ɣaɣla-ɖeɖe sia sia tsɔa nyonyo ƒe ɖaseɖigbalɛ na dukɔ la.

## Nusi ta quorum le

Dɔwɔlawo ɖoa ame siwo ɖo akɔta ƒe lolome ɖe anyi: woabua akɔtaɖoɖo ƒe emetsonu be ena kɔin ƒe nɔlawo ƒe susu ko ne ZEC 1,000,000 le akpa le biabia aɖe me hã, ne woate ŋu agblɔ be wometsɔ akɔta ɖo o hã. Quorum la meɖoa biabia aɖeke o eye wometsɔe wɔa dɔ na biabia sia biabia o. Enye akpɔkpɔ ɖeka le akɔtaɖoɖo bliboa ŋu, ale be woabua emetsonu aɖe be ele vevie ko ne ZEC geɖe aɖe va le eme. Ne edze teƒe ma nu la, womabu emetsonu la be enye dzesi si le gɔme o.

## Nusi ɖoɖo sia mekɔ ɖa o

Nɔnɔmetata la ƒe gbɔgbɔwo ƒe gblɔɖe nyuie nye ƒe akpa aɖe.

1. Enye dzesi, menye ɖoɖo si wòle be woawɔ tututu o. Kɔin ƒe nɔlawo ƒe akɔtaɖoɖo ɖea amewo ƒe susu si woɖo kple ga ƒe ƒuƒoƒo fia eye wòdea eme le Zcash ƒe [dziɖuɖu ƒe mɔƉoɖo](../zcash-community/zcash-governance) me, le teƒe be wòatrɔe o.
2. Woɖoa akɔta ɖe kɔin ƒe lolome nu, eya ta ŋusẽ dze ɖe nɔnɔwo ŋu. Mɔ faƒe wu ate ŋu awɔ be ame geɖe aɖo akɔta ɖo, gake ema trɔ ZEC ƒe ƒoƒo ɖe teƒe ɖeka o.
3. Coordinator multisig lae ɖoa agenda la, si tia biabia siwo ado ɖe eme. Mate ŋu akpɔ akɔtawo o, eye ame sia ame ate ŋu awɔ ɖoɖonu si ana tsitretsitsi, gake agenda ƒe ɖoɖo gale abe ŋusẽ ƒe teƒe aɖe ene.
4. Xexlẽa hiã be dɔdzikpɔlawo nanɔ internet dzi. Mamlea ƒe wɔwɔ hiã be woƒe akpa etɔ le ene me nɔ kpe ɖe eŋu, eya ta internet dɔƒe ŋutɔƒe ƒe gbegblẽ gã aɖe alo tɔtrɔ ƒe agbe gbɔɖeɖe ate ŋu aɖe emetsonu aɖe ɖe megbe.
5. Ga ƒe ƒuƒoƒo ƒe ɣaɣla ne ame katã wɔ ɖeka nye ɖeɖekpɔɖeŋu si wotsɔ kpe ɖe eŋu, menye nu si woɖe fia be wòle eteŋu o. Ne komiti bliboa ƒo kplɔɖeƒe la ɣaɣla, akpa-ma-ma kple ɖoɖe ɣeyiɣi siwo wotsɔ do akɔta lae akɔ wòƒe ga ƒe ƒuƒoƒo ɖa, eye nɔnɔmetata ƒe dɔwɔlawo gblɔ be esiawo sɛ gbɔ vie ne ame katã wɔ ɖeka. Traffic ƒe dzodzro si le nunya me kpɔtɔ nye afɔku.
6. Dɔwɔnu geɖe wu nɔnɔmetata xoxo la. PIR servers, submission servers, akɔtaɖoɖo ƒe kplɔɖeƒe yeye, kple ɖaseɖigbalɛ ƒe afɔafɔ geɖewo nye teƒe si bug alo ɖoɖo si menyo o ate ŋu adze. Ɖoɖoa le open source, eye woakpɔ eƒe akpa aɖewo ɖa le woŋutɔ ŋu, si dzea afɔku sia ŋu le teƒe be wòatsrɔ̃e katã o.

Nusi wòkɔ ɖa sesĩe kple si woate ŋu akpɔ ɖa la nye nu eve siwo le vevie wu: womate ŋu ado wòƒe akɔta ɖe wòƒe ame-nyenye ŋu o, eye mamleawo ƒe xexlẽ bliboa koe woɖea fia.

## Nyawo ƒe Gɔme

| Nya | Gɔme le English bɔbɔe me |
|---|---|
| Akɔtaɖoɖo ƒe ɖoɖonu | Blockchain vovovo si Valar Group tu, si wɔa akɔtaɖoɖo la; wòƒe Zcash didienuwo mele ɖe eŋu o |
| Snapshot ƒe kɔkɔƒe | Mainnet gaɖoɖowo ƒuƒoƒe si ƒe ga ƒe ƒuƒoƒowo ɖoa akɔta ƒe kpekpeɖeŋu (gaɖoɖowo ƒuƒoƒe 3,459,350 na NU7 ƒe akɔtaɖoɖo) |
| Gaɣaɣla ɖeɖe dzesi | Didienu ƒe zãzã dzesi tɔxɛ; ne woɖe eya fia la, wòado akɔta aɖe ɖe didienu aɖe ŋu, eya ta akɔtaɖoɖo ɖea ɖase be mele xexlẽ me o le teƒe ma |
| Nya ƒe Xɔxɔ ɣaɣla Me (PIR) | Data ƒe xɔxɔ tso server aɖe gbɔ ne èɣla data kae nèbia |
| Homomorphic ɣaɣlaŋlɔŋlɔ | Ɣaɣlaŋlɔŋlɔ si ƒe ciphertexts woate ŋu akpe ɖe wo nɔewo ŋu ne woaɖe wo ƒe ɣaɣla kpɔ o |
| Coordinator multisig | Ame 2 tso ame 5 ƒe ha si na mɔ na biabiawo kple ƒeɖeɖe ƒe kplɔɖeƒe, gake mate ŋu akpɔ alo atrɔ akɔtawo o |
| Akɔtaɖoɖo ƒe ŋusẽmama | Dɔdzikpɔla 10 alo sɔe kple esia wu siwo le ɣaɣla-ɖeɖe kplɔɖeƒe si woema dome la eye woɖea mamle bliboa ko fia |
| Threshold ɣaɣla-ɖeɖe | Emetsonu ƒe xɔxɔ ne kplɔɖeƒe ƒe akpa ƒe nɔlawo ƒe lolome de eme, afii la woƒe akpa etɔ le ene me |
| Quorum | ZEC 1,000,000 ƒe ame siwo le akpa le akɔtaɖoɖo me ƒe lolome si woabua be ena kɔin ƒe nɔlawo ƒe susu |

## Biabia siwo wobia zi geɖe

Le nye kɔinwo ɖea asi alo woƒoa wo ƒe mɔ ne meɖo akɔta ɖo? Ao. Woɖea ame siate ŋu akɔtaɖoɖo le snapshot gaɖoɖowo ƒuƒoƒe la dzi, eya ta wòƒe ZEC nɔa afi ma eye nàte ŋu azãe. Akɔtaɖoɖo wɔa ɖaseɖigbalɛwo le ɖoɖonu vovovo aɖe dzi, menye Zcash gaɖoɖo o.

Ame aɖeke ate ŋu anya ale si meɖo akɔta ɖo alo ga aleke le asinyea? Ao. Woŋlɔ akɔtawo ɣaɣla eye mamle ƒe xexlẽwo koe woɖea ɣaɣla. Wòƒe akɔta le kadodo manɔ anyi kple wòƒe ame-nyenye, eye woema wòƒe ga ƒe ƒuƒoƒo akpa 16 siwo woɖoa le ɣeyiɣi vovovowo me be woakɔe ɖa hã ne komiti aɖe wɔ ɖeka.

Nu kae na ame aɖeke mete ŋu aɖo akɔta zi eve, alo aɖo akɔta kple kɔin siwo mele asime o? Akɔta sia sia tsɔa zero-knowledge ɖaseɖigbalɛwo be woɖo eŋu kple snapshot ga ƒe ƒuƒoƒo vavã si menye zãtɔ, eye PIR-ɖoɖo ƒe ɖase be mele xexlẽ me o fia be didienu si le eƒe megbe la menye zãtɔ kpɔ o, ne mefia didienu kae o.

Ame kawoe xlẽa akɔtawo? Dɔdzikpɔla 10 alo sɔe kple esia wu ƒe ha si woama le vovototo me, eye ame aɖeke le wo dome mate ŋu aɖe nu aɖeke ƒe ɣaɣla kpɔ eya ɖeka o. Woƒe akpa etɔ le ene me le be woawɔ ɖeka hafi woaɖe mamleawo fia, eye ɣaɣla-ɖeɖe sia sia tsɔa nyonyo ƒe ɖaseɖigbalɛ na dukɔ la.

Emeɖoɖo la le be woawɔe tututua? Enye kɔin ƒe nɔlawo ƒe susu ƒe dzesi si woɖo kple ga ƒe ƒuƒoƒo. Edea eme le Zcash ƒe dziɖuɖu ƒe mɔƉoɖo me le teƒe be wòawɔ tɔtrɔ aɖe enumake o.

Mate ŋu awɔ alo akpɔ esia ɖa nye ŋutɔa? Ẽ. Akɔtaɖoɖo-ɖoɖonu ƒe software, circuits, PIR ƒe ɖoɖo, kple mamle ƒe dɔdzikpɔla la katã Valar Groupeɖe fia be ame sia ame nakpɔ wo ɖa eye wòawɔ wo.

## Ɖe wòƒe gɔmesese kpɔ

Ne woŋlɔ akɔta sia sia ɣaɣla eye akɔtaɖola sia sia ƒe ŋkɔ mele ɣla, aleke ame aɖeke ate ŋu aka ɖe edzi be mamle si woɖe fia la le eteŋu eye ame aɖeke meɖo akɔta zi eve o?

<details>
<summary>Ŋuɖoɖo</summary>

Ɖaseɖigbalɛ atọe wɔa dɔa. Akɔta sia sia tsɔa zero-knowledge ɖaseɖigbalɛ be woɖo eŋu kple snapshot ga ƒe ƒuƒoƒo vavã, ale be womexlẽa akɔta siwo meɖo ɖase me o. PIR-ɖoɖo ƒe ɖase be mele xexlẽ me o fia be didienu si le eƒe megbe la menye zãtɔ, si xɔa mɔ na akɔtaɖoɖo zi eve ne mefia didienu la o. Eye ne dɔdzikpɔlawo ɖe mamleawo ƒe ɣaɣla kpɔ la, ame sia sia ɖea nyonyo ƒe ɖaseɖigbalɛ fia, ale be ɣaɣla dzesi ŋɔŋlɔ blibo sia sia ate ŋu aka ɖe edzi be woɖe mamle ƒe xexlẽ siwo mlɔ o tso akɔta siwo woŋlɔ ɣaɣla la me.
</details>

## Nuɖeɖewo

- [NU7 Kɔin ƒe Nɔlawo ƒe Akɔtaɖoɖo ƒe gblɔɖeɖe (Valar Group kple Project Tachyon)](https://forum.zcashcommunity.com/t/nu7-coinholder-vote/56912) - forum ƒe nuŋɔŋlɔ si ɖoa akɔtaɖoɖo la ƒe teƒe, snapshot ƒe kɔkɔƒe, kple ɣeyiɣi ƒe ɖoɖo
- [Kɔin ƒe Nɔlawo ƒe Akɔtaɖoɖo ƒe Ɖoɖonu: nɔnɔmetata ƒe ɖoɖo](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925) - ɖoɖo ƒe nuŋɔŋlɔ si axa sia dze egɔme tsoe
- [Valar Group ɣaɣla akɔtaɖoɖo ƒe nukuɖeɖewo](https://valargroup.gitbook.io/shielded-vote-docs) - nuɖeɖe si wowɔ ɣeyiɣi sia me na akɔtaɖoɖo ƒe ɖoɖonu
- [Valar Group akɔtaɖoɖo ƒe code kple dɔdzikpɔwo (GitHub)](https://github.com/valargroup/vote-sdk) - open-source ƒe wɔwɔ kple eƒe dɔdzikpɔwo

## Axa siwo ka ɖe eŋu

- [Nya ƒe Xɔxɔ ɣaɣla Me](../zcash-tech/private-information-retrieval) - ɖase be mele xexlẽ me o ƒe mɔ si le double-vote ɣaɣla me ƒe nuxtɔxɔ megbe
- [Ironwood](../zcash-tech/ironwood) - ɣaɣla gaƒuƒoƒo si ƒe ga ƒe ƒuƒoƒowo ɖoa akɔta ƒe kpekpeɖeŋu
- [zk-SNARKs](../zcash-tech/zk-snarks) - ɖaseɖigbalɛ ƒe ɖoɖo si le ga ƒe ƒuƒoƒo kple ame siate ŋu akɔtaɖoɖo ƒe ɖasewo megbe
- [ɣaɣla Gaƒuƒoƒowo](../using-zcash/shielded-pools) - nukae nye ɣaɣla ga ƒe ƒuƒoƒo eye nu ka ta wònɔa ɣla
- [Zcash Ga ƒe Nadzɔdzɔ kple Dziɖuɖu ƒe Nɔnɔmetata](../zcash-community/zcash-governance) - ale si susu ƒe dzesi sia dea eme le Zcash ƒe ɖoɖo ƒe mɔ blibo me
- [Shielded Labs](../zcash-organizations/shielded-labs) - coordinator multisig ƒe ame atɔwo dometɔ ɖeka
