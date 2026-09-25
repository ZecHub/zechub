<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Payment_Disclosures.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Fexexe ƒe kpeɖodzi si wokpɔ ta na kple fexexe ŋuti nyatakakawo

## TL;DR

- Asitsatsa ƒe ID dea dzesi asitsatsa aɖe, gake meɖea amesi xɔe, ga home, alo nuŋlɔɖi si wokpɔ ta na la fiana o.
- Wotrɔ asi le fexexe ŋuti nyatakaka aɖe ŋu be wòana amesi ɖoe ɖa la naɖo kpe fexexe ɖeka ŋuti nyatakaka tiatia aɖewo dzi evɔ womaɖe woƒe gakotoku ŋutinya susɔea ɖe go o.
- Nukpɔkpɔ ƒe safui naa nuxexlẽ si yia edzi be wòakpɔ adrɛs alo akɔnta aɖe. Zãe na agbalẽdzikpɔkpɔ siwo yi edzi, ke menye na nyaʋiʋli si ku ɖe fetu ɖeka ŋu o.
- Fexexe ŋuti nyatakaka mate ŋu aɖo kpe adzɔnuwo ɖoɖo ɖe amewo dzi, ade dzesi ame aɖe le eɖokui si, atrɔ ga si woxe, alo aɖɔli kpeɖodzigbalẽviwo o.
- [ZIP 311 ƒe xexlẽdzesi](https://zips.z.cash/zip-0311) gakpɔtɔ nye **Draft**. Eƒe nuŋɔŋlɔ si li fifia gblẽ Orchard ƒe kpekpeɖeŋu, transparent-input support, encoding, versioning, kple user-interface sewo ɖi womewu enu o.

## Nusitae asitsatsa ƒe ID mesɔ gbɔ o

Ame sia ame ate ŋu alé ŋku ɖe Zcash ƒe fexexe si me kɔ la ŋuti nyatakakawo ŋu le dutoƒo. Block explorer ateŋu aɖe eƒe adrɛswo, ga homewo, kple kpeɖodzi ƒe nɔnɔme afia.

Fexexe si wokpɔ ta na la wɔa dɔ le mɔ bubu nu. Kɔsɔkɔsɔa ɖo kpe edzi be asitsatsa la wɔ ɖe Zcash ƒe sewo dzi, gake metaa amesi ɖoe ɖa, amesi xɔe, ga home, alo nuŋlɔɖi si wokpɔ ta na o. Asitsatsa ƒe ID la mama ate ŋu afia be woɖe asitsatsa aɖe, gake mate ŋu aɖo kpe edzi na asitsala alo ame etɔ̃lia be ame ŋutɔ ƒe fetu kae nɔ eme o.

Esia hea kuxi ŋutɔŋutɔ aɖe vɛ. Ðewohĩ ahiã be asisi aɖe nakpɔ asitsalawo ƒe nyaʋiʋli aɖe gbɔ, ahiã be asitsaha aɖe naɖo kpe edzi be yewɔ dɔ tso ga si woɖe le eme ŋu, alo nunala aɖe adi be yeaɖo kpe nudzɔdzɔ ɖeka dzi. Ne woama nukpɔkpɔ ƒe safui bliboa la, aɖe nu geɖe afia wu alesi nya siawo dometɔ ɖesiaɖe abia.

[ZIP 311: Zcash Fexexe Ŋuti Nyatakakawo](https://zips.z.cash/zip-0311) do ŋuɖoɖo si le kpuie wu ƒe susu ɖa: ɖe nyatakaka tiatia siwo tso asitsatsa ɖeka me la ɖe go eye nàɖo kpe wo dzi.

![A transaction ID proves that a transaction exists but does not reveal shielded payment details. A ZIP 311 payment disclosure would let a verifier authenticate only the selected recipient, amount, memo, and optional sender details against the mined transaction.](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/payment-disclosure-proof-flow.png)

## Alesi fexexe ŋuti nyatakaka aɖe wɔa dɔe

Sisi vevitɔe nye:

1. Nusi ɖo kpe edzi la naa kuxi alo nufiame tɔxɛ aɖe ame si ɖoe ɖa, ne kpeɖodzi si woatsɔ awɔ dɔe sɔ.
2. Ame si ɖoe ɖa la tiaa asitsatsa la kple nusiwo woɖe tso eme alo nusiwo woɖe tso eme siwo ŋu wokpɔ ta na be yeaɖe afia.
3. Gakotoku ƒe kɔmpiutadziɖoɖo siwo sɔ la wɔa fexexe ŋuti nyatakaka si bla ɖe asitsatsa ma ŋu eye ne èdi la, kuxia hã.
4. Amesi ɖoe ɖa la tsɔa nyatakakaa naa amesi ɖo kpe edzi.
5. Dzɔla la xɔa asitsatsa ŋutɔŋutɔ tso Zcash node si dzi woka ɖo gbɔ, léa ŋku ɖe eŋu be woɖee, eye wòɖoa kpe nyatakaka si woɖe ɖe go la dzi le eŋu.
6. Nusi do tso eme si sɔ ɖo kpe nya siwo wogblɔ le nyatakaka ma me ko dzi.

ZIP ƒe Sapling ƒe wɔwɔme zãa cipher key si dona tsɔ gbugbɔa emetsonu ɖesiaɖe si wotia. Esia ate ŋu aɖe amesi axɔ nusi woɖe tso eme, ga home, kple nuŋlɔɖi. Ebia hã be woaɖo kpe gazazã ƒe ŋusẽ dzi na asitsatsa ƒe nyatakaka ɖeka ya teti, eyata amesi kpɔ asitsatsa la ko mate ŋu awɔ nyatakaka si sɔ abe ɖe wòɖoe ɖa ene o.

Mehiã be Sapling ƒe fexexe ŋuti nyatakaka aɖe naɖe amesi ɖoe ɖa ƒe adrɛs afia o. Gazazã ƒe ŋusẽ ate ŋu akpɔ ŋusẽ ɖe adrɛs vovovo geɖe dzi, eyata ne woɖo kpe gazazã dzi kpɔkpɔ dzi la, medea dzesi adrɛs ɖeka le eɖokui si o. ZIP 311 lɔ adrɛs ƒe kpeɖodzi si woate ŋu atia na nya siwo me wòhiã be woatsɔ kpeɖodzia aƒo ƒu kple adrɛs si wonya si ɖoe ɖa.

## Fexexe ŋuti nyatakakawo ɖeɖe ɖe go alo nukpɔkpɔ ƒe safui?

| Mɔnu | Zãzã nyuitɔ kekeake | Nusi wòɖe fia | Mɔɖeɖe ɖe nu ŋu yi edzia? | Wotsɔ nya ɣaɣlawo bla ɖe fexexea ŋua? |
| --- | --- | --- | --- | --- |
| Asitsatsa ƒe ID | Kpɔkpɔ be woɖe asi le asitsatsa aɖe ŋu | Dutoƒo asitsatsa ŋuti nyatakakawo kple kpeɖodzinyawo | Ao | Ẽ, gake fexexe ŋuti nyatakaka siwo wokpɔ ta na la gakpɔtɔ le ɣaɣla |
| Screenshot alo xɔgbalẽvi | Nuŋlɔɖiwo wɔwɔ le vome | Nuka kee amesi ɖoe ɖa tia be yeaɖe afia | Ao | Ao; woate ŋu atrɔ asi le nɔnɔmetata la ŋu |
| Fexexe ƒe nyatakakawo ɖeɖefia | Fexexe ɖeka ŋuti nyatakaka tiatia aɖewo ƒe kpeɖodzinana | Asitsatsa ƒe emetsonu tiatia kple amedɔdɔ ɖesiaɖe si le eme alo gbetɔame ƒe kpeɖodzi | Ao, gake woate ŋu awɔ kpeɖodzi si woama la ƒe kɔpi | Ẽ |
| Incoming Viewing Key | Lé ŋku ɖe fe siwo akɔntabubu aɖe xɔ ŋu | Dɔwɔna si gbɔna si ŋu safuia ƒo nu tsoe | Ɛ̃ | Eɖea ga si woxena ɖe eta siwo sɔ la me |
| Full Viewing Key | Akɔntabubu alo akɔntabubu aɖe me dzodzro | Dɔwɔna si va kple esi dona, ga homewo, nuŋlɔɖiwo, kple ga si susɔ si safuia xe | Ɛ̃ | Eɖea akɔntabubu ƒe dɔwɔna siwo sɔ la me |

Zã nya suetɔ kekeake si woɖe ɖe go si ɖo nyabiasea ŋu. Zi geɖe la, asitsalawo ƒe nyaʋiʋli le fetu ɖeka ŋu mefia be woate ŋu akpɔ ga ɖesiaɖe si woxe le gakɔnta me o. Akɔntanyala si wòle be wòato akɔntabubu ƒe ɣeyiɣi bliboa me ate ŋu ahiã be wòakpɔ safui ɖe eteƒe.

Mɔnu eveawo dometɔ aɖeke menaa mɔɖeɖe be woazã ga o. Mègatsɔ nuku ƒe nyagbe, gazazã ƒe safui, ame ŋutɔ ƒe safui, alo gakotoku ƒe nudzraɖoƒe ƒe kpeɖodzi gbeɖe abe fexexe ƒe kpeɖodzi ene o.

![A transaction record is available today but provides no new third-party proof. A payment disclosure would prove selected details of one payment. A viewing key provides broader, ongoing visibility.](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/payment-disclosure-scope.png)

## Nukae mate ŋu azã egbea?

Womede dzesi gakotoku aɖeke si li fifia le afisia be ewɔa ZIP 311 ƒe fexexe-nyatakakawo wɔwɔ alo eƒe kpeɖodzinana ŋudɔ o. ZIP gakpɔtɔ nye nuŋlɔɖi eye wòŋlɔ eƒe nufiame dɔwɔwɔ be "TBD." Dɔwɔnu siwo gbɔna siwo ŋu wodzra ɖo ate ŋu akpe ɖe ame si ɖoe ɖa, amesi xɔe, alo agbalẽdzikpɔla si ŋu woɖe mɔ ɖo ŋu kokoko be wòalé ŋku ɖe nuŋlɔɖi siwo li egbea ŋu:

| App | Viɖe le eŋu egbea na | Seɖoƒe vevi aɖe |
| --- | --- | --- |
| [Zkool](https://github.com/hhanh00/zkool2) | Adzɔnuwo ƒe metadata tsitotsito, ga homewo, pool inputs kple outputs, kple memos kpɔkpɔ; tsɔtsɔ de Unified alo Sapling ƒe nukpɔkpɔ safuiwo me ɖe nukpɔkpɔ ɖeɖeko ƒe akɔntabubuwo me | Medoa boblo ZIP 311 ƒe nyatakakaɖeɖefia wɔwɔ alo eƒe kpeɖodzi o |
| [Zingo PC](https://github.com/zingolabs/zingo-pc) | Asitsatsa ŋutinya kple nuŋlɔɖi siwo wokpɔ ta na la me toto; importing a Unified Full Viewing Key le nuxexlẽ ɖeɖeko ƒe nɔnɔme me | Gakotoku ƒe nuŋlɔɖi alo akɔnta si woxlẽna ɖeɖeko menye fexexe ŋuti nyatakaka si woɖo tiatia aɖe o |
| [Zallet](https://zcash.github.io/zallet/) | Operator ƒe dɔwɔwɔ ƒe ɖoɖowo zã `z_viewtransaction`, `z_exportviewingkey`, kple `z_importviewingkey` | Beta kɔmpiutadziɖoɖowo; eƒe nukpɔkpɔ-safui kple asitsatsa RPCwo nye esiwo keke ta wu alo nutoa me nuŋlɔɖiwo, ke menye ZIP 311 kpeɖodziwo o |

Zã gakotoku si ɖo ga la ɖa alo xɔe gbã. Kpɔ eƒe asitsatsa ŋuti nyatakakawo, nuŋlɔɖigbalẽ, asitsatsa ƒe ID, kple kpeɖodzinyawo ɖa, emegbe nàbia tso akpa kemɛa si be wòatsɔ nyatakaka mawo asɔ kple eya ŋutɔ ƒe nuŋlɔɖiwo. Mègade gakotoku yeye eme eye nàŋlɔ nuku ƒe nyagbe aɖe ɖe eme be yeatsɔ aɖe kpeɖodzi afia ko o. Ne agbalẽdzikpɔla hiã be woayi edzi akpɔe la, bu akɔnta si sɔ na nukpɔkpɔ ɖeɖeko ŋu eye nàse nukpɔkpɔ ƒe safuia ƒe lolome gɔme hafi nàmae.

Dɔdamɔnu siawo nye mɔnu nyui siwo dzi woato alé ŋku ɖe nuŋlɔɖiwo ŋu, ke menye kpeɖodzi be fexexe ŋuti nyatakaka si woɖo ɖi li o. Screenshot ate ŋu akpe ɖe amewo ŋu woatsɔ nuŋlɔɖiwo asɔ kple wo nɔewo, gake woate ŋu atrɔ asi le eŋu eye menye nya ɣaɣlawo ƒe kpeɖodzi o.

## Afisi fexexe ŋuti nyatakakawo ku ɖo le

### Asitsalawo ƒe nyaʋiʋliwo

Asisi aɖe ate ŋu aɖo kpe edzi be woɖo ga home aɖe koŋ ɖe asitsala la ƒe adrɛs si ŋu wokpɔ ta na. Kpeɖodzia meɖo kpe edzi be wotsɔ adzɔnuwo vɛ, be wonyi fe si wogbugbɔ na wo, alo be ame si tsɔe ɖo ŋkume la ƒe dzesideŋkɔ tɔxɛ aɖe le se nu o. Nyabiase mawo gakpɔtɔ nɔ te ɖe nudɔdɔa ŋuti nuŋlɔɖi kple akpa eveawo ƒe nubabla dzi.

### Nusiwo woɖena le ga me siwo ŋu wokpɔ ta na

ZIP 311 yɔ ga si woɖe le eme si wokpɔ ta na abe taɖodzinu zazã ƒe nɔnɔme ene: asitɔtrɔ aɖe aɖo kpe amesi xɔe kple ga home dzi evɔ womata nyatakaka mawo ɖe kɔsɔkɔsɔ me o. Eƒe kpeɖodzi si nye transparent-input la mewu enu haɖe o, eyata esia menye dɔwɔwɔ si woɖo ɖe ɖoɖo nu bliboe haɖe o. Ele be asisi la nalé ŋku ɖe asitsatsa la ƒe kpeɖodzi ƒe nɔnɔme hã ŋu le eɖokui si.

### Nudzɔdzɔwo

Nunala alo dɔdzikpɔha aɖe ate ŋu aɖo kpe nudzɔdzɔ aɖe koŋ dzi esime wògblẽ fe siwo medo ƒome kplii o ɖe ame ŋutɔ si. Nyatakaka si woɖe ɖe go la tata nana be amesiame si axɔ eƒe kɔpi nadze le gaglãgbe, eyata ame ŋutɔ ƒe mɔ si dzi woato aɖo kpe edzi la le dedie wu ne dutoƒo kpeɖodzi mehiã o.

### Akɔntabubu

Zã fexexe ŋuti nyatakaka ne akɔntanyala hiã kpeɖodzi na asitsatsa ɖeka. Zã nukpɔkpɔ ƒe safui si le kpuie wu si sɔ ne ehiã be akɔntanyala la nayi edzi akpɔ asitsatsa geɖe alo akɔntabubu ƒe ɣeyiɣi blibo aɖe.

## Dɔwɔwɔ ƒe ɖoɖo si me ame ŋutɔ ƒe nyawo le dedie

ZIP 311 menye gakotoku ƒe dzidzenu si wowu enu, si woate ŋu azã le afisiafi haɖe o. Ne dɔwɔnu siwo sɔ ɖe dɔdzikpɔla kple kpeɖodzinana nu va li la, zã ɖaseɖigbalẽ sia:

1. **Ðo kpe ɖekawɔwɔ dzi gbã.** Ele be dɔwɔnu eveawo siaa nado alɔ nyatakakawo ɖeɖefia ƒe ɖoɖo ɖeka kple shielded pool si fexexea zãna.
2. **Mikpɔ kuxi dzrowo gbɔ gbã.** Kpɔ gakotoku ƒe wɔwɔ ɖekae, asitsatsa ƒe ID, kpeɖodzi ƒe xexlẽme, ɣeyiɣi si wu enu ƒe nɔnɔme, kple amesi xɔe ƒe nuŋlɔɖiwo hafi nàɖe ame ŋutɔ ƒe nyatakakawo afia.
3. **Bibia be woatsɔ nya ɖe ye ŋu.** Le nyaʋiʋli aɖe ta la, ele be amesi ɖo kpe edzi la natsɔ nudɔdɔ ƒe xexlẽdzesi yeye alo nyaʋiʋli si wowɔ le vome ale be nyatakaka si woɖe ɖe go la nabla ɖe biabia ma ŋu.
4. **Tia nusi hiã koe.** Mègatsɔ nusiwo medo ƒome kple wo nɔewo o tso asitsatsa ɖeka me de eme o.
5. **Kpɔ agble ɖesiaɖe si woɖe fia do ŋgɔ.** Kpɔ amesi xɔe, ga home, nuŋlɔɖi, amedɔdɔ-adrɛs ƒe kpeɖodzi, kple gbetɔame hafi nàɖoe ɖe duta.
6. **Mae to ame ŋutɔ ƒe mɔnu dzi.** Nyaɖeɖefia menye gazazã ƒe safui le adzame o, gake amesiame si axɔe ate ŋu alé nyatakaka siwo wòɖe fia la ɖe asi alo agbugbɔ ama wo.
7. **Ðo kpe edzi ɖe kɔsɔkɔsɔa ŋu.** Ele be kpeɖodziwɔla la naxɔ asitsatsa la tututu tso node si dzi woka ɖo gbɔ, aɖo kpe edzi be ele network si woɖo be wòaxe la me eye wòaxe mɔ nɛ, emegbe wòada asi ɖe nyatakaka si woɖe ɖe go dzi.
8. **Ŋlɔ emetsonua ɖi, ke menye nya ɣaɣla bubuwo o.** Nusiwo nyaʋiʋli, gaɖeɖe, nudzɔdzɔ, alo akɔntabubu ƒe ɖoɖoa bia ko dzra ɖo.

Ne gakotokua mate ŋu awɔ nyatakaka aɖe o la, mègatsɔ nukpɔkpɔ ƒe safui blibo aɖo eteƒe ne mèse eƒe kekeme si keke ta wu eye wònɔa anyi ɖaa gɔme o. Bia nenye be amesi xɔe ate ŋu aɖo kpe ga si wòxe dzi tso eya ŋutɔ ƒe gakotoku me nuŋlɔɖiwo me alo axɔ nuŋlɔɖi si me mekɔ tututu o ɖe eteƒe.

## Nusi nyatakaka si woɖe ɖe go si sɔ meɖo kpe edzi o

Kpeɖodzinya dzidzedzetɔe meɖo kpe edzi be:

- Be kpeɖodzi siwo sɔ le asitsatsa la si na amesi ɖo kpe edzi ƒe afɔku ŋuti ɖoɖoa
- Be kɔsɔkɔsɔ ƒe ɖoɖo yeye mate ŋu aɖe asitsatsa aɖe si wowɔ nyitsɔ laa ɖa o
- Be wotsɔ adzɔnuwo alo dɔwɔnawo yi na amewo
- Be wobia be woagbugbɔ ga la ana alo agbugbɔ ga axɔ
- Be amesi ɖoe ɖa la kpɔa adrɛs aɖe koŋ dzi, negbe ɖe wotsɔ adrɛs ƒe kpeɖodzi si sɔ kpe ɖe eŋu hafi
- Be ame si tsɔ nyatakakaa ɖe go la ƒe amenyenye si wogblɔ be enye xexeame ŋutɔŋutɔ la le esi
- Be asixɔxɔ aɖe koŋ le nusiwo womeɖe fia o, asitsatsa bubuwo, alo gakotokua ƒe ga si susɔ ŋu
- Be nyatakaka si woɖe ɖe go la gakpɔtɔ nye ame ŋutɔ tɔ ne womae vɔ

Ele be kpeɖodziwɔla nalé ŋku ɖe kɔsɔkɔsɔ ƒe dede eme kple kpeɖodzi ƒe nɔnɔme ŋu ɖe vovo. ZIP 311 ƒe kpeɖodzinana ƒe ɖoɖoa tsɔe be ame si le ka ƒom la xɔ asitsatsa si woɖe tome kple eƒe block ƒe kɔkɔme xoxo.

## Seɖoƒe siwo li fifia

Bu ZIP 311 abe dzidzenu si wodo ɖa ene, ke menye abe ŋugbedodo be **Ðo kpe fexexe dzi** ƒe dzesi si le dɔ wɔm le gakotoku si li fifia ŋu o.

Fifia la, nuŋlɔɖia gblɔ Sapling ƒe gazazãwo kple nusiwo dona tso eme, gake nusiwo womewu enu haɖe o na Orchard, nusiwo wotsɔ de eme si me kɔ, nyatakakawo ɖeɖefia ƒe nuŋɔŋlɔ, tɔtrɔ, kple alesi wòle be gakotokuwo naɖe woƒe nyonyome ƒe seƒe vovovowo afia la gakpɔtɔ le eme. Woŋlɔ eƒe nufiame dɔwɔwɔ hã be "TBD." Abe alesi woŋlɔe ene la, meɖe fexexe ŋuti nyatakakawo me na Orchard alo Ironwood ƒe fexexe o.

Ate ŋu adzɔ hã be amesi ɖoe ɖa la mate ŋu aɖe emetsonu aɖe afia nenye be woɖoe koŋ wɔ asitsatsa la evɔ womekpɔa nukpɔkpɔ ƒe safui si dona le eme na nusi do tso eme ma o. ZIP 311 kpɔa ameŋunyatakakawo ƒe tiatia ma ta tsɔ wu be wòawɔ mɔ yeye si dzi woato agbugbɔe axɔ.

Nuŋlɔɖi xoxowo ƒo nu tso dodokpɔa ŋu `z_getpaymentdisclosure` kple `z_validatepaymentdisclosure` sededewo le `zcashd`. Sedede mawo do alɔ **Sprout JoinSplit ƒe dodokpɔwo ɖeɖeko**, ke menye Sapling ƒe ɖoɖo si le ZIP 311 me o, eye woɖe asi le wo ŋu. `zcashd` reached its final End-of-Support halt in July 2026. Mègazã domenyinu ƒe azɔlizɔzɔ ma abe mɔfiame ene na ga siwo li fifia o.

Dodokpɔ siawo mena viɖe aɖeke mele susua ŋu o. Woɖe nusita wòle be mɔfiame si ŋuɖɔɖɔɖo le nama ameŋunyatakakawo ŋuti nyatakakawo kple wo zazã ƒe nɔnɔmewo ɖa tso kɔmpiutadziɖoɖo siwo sɔ na ezãla dzrowo gbɔ la me.

## Nyabiasewo ƒe Nyabiasewo

### Ðe mate ŋu aɖo kpe fexexe si wokpɔ ta na dzi kple asitsatsa ƒe ID ɖeɖekoa?

Ao, ID la ate ŋu ade dzesi asitsatsa la kple eƒe kpeɖodzi ƒe nɔnɔme, gake amesi xɔ akpoxɔnu, ga home, kple nuŋlɔɖi si wowɔ la mele dutoƒo o.

### Ðe fexexe ŋuti nyatakaka aɖe sɔ kple safui si wotsɔ kpɔa nua?

Ao, woɖoa nyatakaka aɖe ɖe go ɖe asitsatsa ɖeka ŋuti nyatakaka tiatia aɖewo ŋu. Nukpɔkpɔ ƒe safui ate ŋu aɖe dɔwɔna si sɔ kple adrɛs alo akɔnta aɖe afia le ɣeyiɣi aɖe megbe.

### Ðe amesi xɔe ate ŋu awɔ ame si ɖoe ɖa la ƒe kpeɖodzia?

Menye le ZIP 311 ƒe nɔnɔme te o. Ele be nyaɖeɖefia si sɔ naɖo kpe gazazã ƒe ŋusẽ dzi na nyatakaka ɖeka ya teti. Ame si xɔa ga la ate ŋu azã woawo ŋutɔ ƒe gakotoku me nuŋlɔɖiwo atsɔ aɖo kpe ga si wòxe dzi, gake nya bubue nye ema.

### Ðe mate ŋu ate fli ɖe nyatakaka aɖe si woɖe ɖe go me ne memae vɔa?

Ao, menaa mɔnukpɔkpɔ ame be wòakpɔ akɔntabubu le etsɔme abe safui si wotsɔ kpɔa nu ene o, gake woate ŋu awɔ nyatakaka kple kpeɖodzi siwo woɖe ɖe go la ƒe kɔpi. Mae nyuie abe alesi ame ŋutɔ ƒe ganyawo ŋuti nuŋlɔɖi ɖesiaɖe mae ene.

### Ðe kpeɖodzinana ʋua ZEC aɖe alo tua enua?

Ao, nyatakaka aɖe wɔwɔ alo edzidada mezãa ga, gbugbɔa ga, tsia tre ɖe eŋu, alo trɔa asi le eŋu o.

### Nukae wòle be mazã egbea ne nyaɖeɖefia ƒe mɔnu aɖeke mele nye gakotokua me o?

Dze egɔme kple amesi xɔe ƒe gakotoku me nuŋlɔɖiwo, asitsatsa ƒe ID kple kpeɖodzi ƒe nɔnɔme, adzɔxegbalẽvi ƒe nyatakaka si le nuŋlɔɖi si wotsɔ nya ɣaɣlawo ŋlɔ me, alo gaxɔgbalẽvi bubu si dzi wo ame evea da asi ɖo. Ne eƒe kekeme si keke ta wu hiã vavã eye wose egɔme ko hafi nàzã nukpɔkpɔ ƒe safui.

## Nunɔamesiwo

- [ZIP 311: Zcash Fexexe Ŋuti Nyatakakawo](https://zips.z.cash/zip-0311) - ɖoɖowɔɖi si wowɔ, nudidiwo, kpeɖodzinana ƒe ɖoɖo, kple ameŋunyatakakawo ŋuti nukpɔsusuwo
- [ZIP 310: Sapling Viewing Keys ƒe Dedienɔnɔ ƒe Nɔnɔmewo](https://zips.z.cash/zip-0310) - nusiwo nukpɔkpɔ ƒe safuiwo ɖena fiana kple kakaɖedzi siwo wonana
- [ZIP 304: Sapling Adrɛs ƒe Asidede Asi](https://zips.z.cash/zip-0304) - adrɛs-kpeɖodzi ƒe mɔnu si woate ŋu atia si ŋu ZIP 311 ƒo nu tsoe
- [Zcash ƒe ɖoɖowɔɖi ƒe nɔnɔmetata](https://zips.z.cash/protocol/protocol.pdf) - Sapling note encryption, outgoing viewing keys, kple gazazã ƒe mɔɖeɖe
- [Archived zcashd fexexe-ɖeɖefia ƒe nuŋlɔɖi](https://github.com/zcash/zcash/blob/master/doc/payment-disclosure.md) - ŋutinya me Sprout-ko ƒe dɔwɔwɔ, menye fifi mɔfiame o
- [zcashd ƒe nɔnɔme siwo woɖe ɖa](https://zcash.github.io/zcash/user/deprecation.html) - nɔnɔme si le dodokpɔ xoxoawo me ɖeɖefia ƒe sededewo ŋu

## Axa siwo do ƒome kplii

- [Asitsatsa](/using-zcash/transactions) - fexexe siwo wokpɔ ta na, kpeɖodzinyawo, kple asitsatsa ƒe kuxiwo gbɔ kpɔkpɔ
- [Safuiwo kpɔkpɔ](/zcash-tech/viewing-keys) - nuxexlẽ ɖeɖeko ƒe mɔɖeɖe si yia edzi kple fifi dɔdɔ ƒe tiatia
- [Nusi block explorer ate ŋu akpɔ](/zcash-tech/what-a-block-explorer-can-see) - dukɔa kple ame ŋutɔ ƒe asitsatsa ƒe agblewo
- [Nuŋlɔɖiwo wɔwɔ kple ZEC si wotsɔ akpoxɔnu wɔe](/zcash-use-cases/keeping-records-with-shielded-zec) - akɔntabubu si me wota gakotoku ŋutinya o
