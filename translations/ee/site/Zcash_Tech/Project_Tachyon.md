<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Project_Tachyon.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Project Tachyon

## TL;DR

- Tachyon nye ɖoɖo yeye si woɖoe be wòatrɔ ale si Zcash gakotokuwo [wallets] di eye wotsãa ga ɣaɣla [shielded] le eme, be network la ate ŋu akuku va se ɖe zãlawo ƒe xexlẽ gã aɖe dzi
- Egbea la, gakotoku aɖe ele be wòage ɣaɣlaŋlɔŋlɔ [encryption] ƒe gagbã agateŋu le gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu [blockchain] la ƒe akpa gã aɖe ŋu, be wòanya fexexewo [payments] siwo nye etɔ, eye esia nye ta vevi si ta ɣaɣla ƒe syncing dzea le dzodzoe
- Tachyon trɔa esia kple **nunya-menya syncɖoɖo**, ale be gakotoku aɖe axɔ nu si wòhia, le esi me wòmele nu katã lekpɔm o, eye wòmegblɔna na server aɖe akpa siwo wòdi o
- Eya hã tsɔa fexexe ƒe nyatakakawo doa tso gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu la me yi fexexe ƒe biabia la me, si wɔa be protocol la nasẽ gɔme, gake etsɔ dzikpɔkpɔ ƒe agbalẽ doa ɖe gakotokuwɔlawo dzi
- Enye ɖoɖo aɖe si woɖe gbe dzi zi gbãtɔ le April 2025. Menye NU7 ƒe akpa o eye **womeɖoe va dze dzi o**, eye ehiã mɔ̃ ƒe ɖoɖoŋlɔla [developer] ƒe dɔ sesẽ si sɔ kple Sapling mɔ̃ ƒe sewo trɔtrɔ [network upgrade]

<br/>

## Ame kae wòwɔe na

- Ame sia ame si kpɔ ɣaɣla gakotoku aɖe ƒe syncɖoɖo kpɔ eye wòbia be nukatae wòɖea ƒeɖe nenema
- Ame yeye siwo kpɔa Tachyon ƒe nya le NU7 kple Zcash ƒe nu ƒe dziyiyi [scaling] gbɔ zi geɖe
- Nuxlalawo siwo di be woase susu la gɔme tsã hafi woava ɖe cryptography ŋu

<br/>

## Kuxi si Tachyon solve

Zcash ɣlaa ame si wode fexexe na la. Eyae nye ta katã, eye ewɔa kuxi aɖe si me nyuie o: ne ame aɖeke mate ŋu anya ame si fexexe la le etɔ o la, aleke wò ŋutɔ ƒe gakotoku ate ŋu afi wòtɔwo?

Le Bitcoin me la, esia bɔbɔe. Gaɖoƒe ƒe dzesiwo [addresses] nye dukɔme, eyata gakotoku aɖe ate ŋu abia server aɖe be "Nu kae wode ɖe gaɖoƒe ƒe dzesi sia ŋu?" eye wòaxɔ ŋuɖoɖo. Zcash ɣaɣla gakotoku mate ŋu abia biabia ma o, elabena ne wòbiae la, emafia nu si ɣaɣla gaƒuƒoƒo [pool] la wɔna be wòaɣlae tututu.

Eyata Zcash wɔa nu bubu. Dɔla la ɣlaa fexexe ƒe nyatakakawo kple ɣaɣlaŋlɔŋlɔ eye wòtsɔe ɖe gaɖoɖo [transaction] la ŋutɔ me. Emegbe wò gakotoku la doa dɔ le ɖoɖonu la dzi ƒe gaɖoɖowo ŋu eye wòɖea ŋku be yeadze ɣaɣlaŋlɔŋlɔ le ɖe sia ɖe ŋu. Zaza geɖe be esia ƒe dɔwɔwɔwo katã medzea dzi o. Vi siwo dzea dzi lae nye wò fexexewo. Woyɔ esia be **dodokpɔ ɣaɣlaŋlɔŋlɔ ƒe gagbã**, eye enye ɣaɣla, tso ete ŋu, eye wòlea ɣeyiɣi.

![Today a Zcash wallet downloads every shielded transaction and tries to decrypt each one, with almost every attempt failing, to find the few payments that belong to it](/content-images/tachyon-scanning-today.svg)

Nu si le eme lae nye nu si dɔ la tɔ ɖe edzi. Dɔ si wò gakotoku wɔna ƒe sesẽ ɖe ɖoɖonu la ƒe lolome ŋu, menye fexexe siwo wòxɔ vavã ƒe xexlẽ ŋu o. Ame si mexɔ fexexe ɖeka gɔ̃ hãkpɔ o wɔa dɔ sɔ kple ame si xɔa wo gbe sia gbe. Ne Zcash ƒe lolome le dzidzime la, esia vɔ̃a ɖe ame sia ame ŋu. Le ɖoɖo la ƒe nyawo me la, "eɖe be menye nu si ate ŋu akuku o."

<br/>

## Nu si Tachyon trɔna

Tachyon wɔa kuxi la ɖe eƒe ke me: etsɔa nu nu tsia blockchain la ƒe zazã be wòanye fexexe ƒe ɣaɣlawo ƒe mɔ doɖa.

Le esia ƒe teƒe la, nyatakaka siwo wòhia la zɔa kple fexexe ƒe biabia la ŋutɔ, le mɔ bubu dzi. Fexexe ƒe biabia, URI, alo QR code aɖe tsɔa nyatakaka siwo woɣla le gaɖoɖo la me tsã la. Sean Bowe gblɔa be esia nye **fexexewo siwo mele mɔ la me o** ƒe zazã gbãtɔ le Zcash ɣaɣla protocol aɖe me.

Ne ɖoɖonu la megale nyatakaka mawo tsɔm o la, ta aɖeke megale na wò gakotoku be wòadi wo le eme o, eye dodokpɔ ɣaɣlaŋlɔŋlɔ ƒe gagbã ƒe kuxi la bu.

Ke hã, wò gakotoku hia be wòanya ɖoɖonu la ƒe nɔnɔme fifia be yeate ŋu atsã ga. Eyae nye ɖoɖo la ƒe akpa evelia, **nunya-menya syncɖoɖo**: mɔ aɖe si ana gakotoku aɖe nakpɔ nu siwo wòhia le esi me wòmefia na server la nu siwo wòbia o.

![With Tachyon the sender passes payment details to the recipient out of band, and the wallet uses oblivious synchronization to retrieve only the data it needs instead of scanning the whole chain](/content-images/tachyon-oblivious-sync.svg)

<br/>

## Nu si esia anɔe na ame si le gakotoku zazãm

- **Syncɖoɖo ƒe lolome magblẽ kple ɖoɖonu la o.** Ɣeyiɣi si wò gakotoku atsɔ akpɔ nu siwo dzɔ la adze wò ŋutɔ ƒe dɔwɔwɔ ɖo, menye Zcash ƒe lolome o.
- **Fexexewo anɔ abe ne wòle asi tsɔa fexexe ƒe agbale na ame aɖe ene.** Fexexe ƒe biabia la tsɔa nu si xɔla la hia, eyata dzodzro si le dɔla kple xɔla dome la le vevie wu ale si wònɔ egbea.
- **Gakotokuwɔlawo atsɔ dzikpɔkpɔ geɖe.** Elabena ɖoɖonu la megale wò fexexe ƒe nyatakakawo ƒe ɣaɣlaŋlɔŋlɔ ƒe kɔpi aɖe dzɔm o la, wò gakotoku ƒe data gbuƒe le vevie wu. Backup kple gbugbɔxɔxɔ tso protocol ƒe nɔnɔme me yi nu si gakotoku ƒe software lae wòle be wòawɔe nyuie.
- **Nu siwo míaɖo ŋku na va trɔ alo abu.** Tachyon doa key diversification, nukpɔsafui [viewing keys], kple fexexe ƒe gaɖoƒe ƒe dzesiwo ɖe core protocol la me, eye wòle wo deŋgɔ ɖe gakotoku ƒe layer la dzi. Esia nye ɖoɖo la ƒe akpa siwo wɔnɛ vevie ŋutɔ dometɔ aɖe, eye wogale dɔ wɔm ɖe edzi ha.

<br/>

## Nukpɔkpɔ tsitotsito na technical nuxlalawo

Tachyon wogblɔe be enye tɔtrɔ si sɔ kple nu si le megbe na Orchard protocol la. Woate ŋu aɖoe va dze dzi abe mɔ̃ ƒe sewo trɔtrɔ na Orchard gaƒuƒoƒo si le afi ma ene, alo abe ɣaɣla gaƒuƒoƒo bubu si woɖo to [gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe](https://zechub.wiki/zcash-tech/the-turnstile) me ene; eyae nye mɔ ɖeka ma si Zcash zã na Ironwood. Tiaɖoɖo la doa asi ɖe ɖoɖe dzi, menye design la ŋu o.

Ewɔa nu geɖe tso Orchard me: RedPallas key re-randomization, value commitmentwo siwo le homomorphic, binding signaturewo, kple key ƒe ɖoɖo si woɖe mama, si naa device aɖe ate ŋu ana ɖaseɖigbalɛ [proof] ƒe wɔwɔ ame bubu hafi wòtsɔ tsã ga ƒe mɔɖeke nɛ o.

Nu ƒe dziyiyi ƒe dɔ la ɖe asi ɖe **ɖaseɖigbalɛ-tsɔ data** ŋu, si nye mɔ aɖe me data zɔa kple eŋutɔ ƒe nyateƒe ƒe ɖaseɖigbalɛ, ale be ne woƒo eya kple ɖaseɖigbalɛ-tsɔ data bubu la, nu aɖe ava dzɔ si xɔa eye wòɖea ɖaseɖigbalɛ mawo dzi. Eyae naa dɔ si woɖe kpee eye woɖe ƒo kple dada gã aɖe nɔa ƒeŋu abe nu sue si woate ŋu akpɔ le kaba me ene. Halo, si team si le Zcash megbe kpɔ la, eyae wɔ be ɖaseɖigbalɛ-tsɔ data la nɔ ŋutɔ be woate ŋu atu nu ɖe edzi.

Akpa etɔe nye **ɣaɣla gaɖoɖo ƒe ƒoƒo**, si trɔa ale si ɣaɣla ƒe nɔnɔme ƒe tɔtrɔwo zɔna, eye wòwɔa tɔtrɔwo le ale si wòle be woana asidede agbalẽ te [signature] la hã ŋu.

<br/>

## Afisi dɔ la tɔ

Tachyon nye **ɖoɖo, menye nu si woɖo va dze dzi o**. Woɖe gbe dzi le April 2025, eye nuŋlɔŋlɔ si dze edzi le May 2025 wɔ dɔ le consensus [gbegbɔgblɔ ɖi] ƒe emetsonuwo ŋu. Woyɔe be candidate na NU7, si nye mɔ̃ ƒe sewo trɔtrɔ si dze Ironwood yome, gake NU7 ƒe scope si woɖo ɖe 17 September 2026 la me melé eme o: [ZIP 259](https://zips.z.cash/zip-0259) xlɔ nu siwo NU7 ɖoa va dzea, eye [forum ƒe gbeɖeɖe](https://forum.zcashcommunity.com/t/nu7-timeline/57655) gblɔ be gaɖoɖo ƒe format yeye aɖeke mele eme o. Wometsɔ ɣeyiɣi aɖeke de be Tachyon adze dzi o.

Nuŋlɔla la ŋutɔ ƒe gɔmesesee nye be esia nye ɖoɖo si woate ŋu awɔ va dzɔ, menye research ƒe susuɖeɖe aɖe o, gake ehiã mɔ̃ ƒe ɖoɖoŋlɔla ƒe dɔ sɔ kple Sapling, eye wotsɔ biabia sesẽ aɖewo de megbe kple ta.

Dɔ siwo ɖe tsiem kpɔ la le afi ma xoxo. [Zakura](https://zechub.wiki/zcash-tech/zakura-node), ɣaɣla dzesi ŋɔŋlɔ blibo [full node] si woɖe gbe dzi le July 2026, nye dɔ si Project Tachyon kple Valar Group wɔ ɖekae eye wòfia network ƒe tɔtrɔ siawo ƒe akpa aɖewo. [Private information retrieval](https://zechub.wiki/zcash-tech/private-information-retrieval) research le dɔ wɔm ɖe scanning ƒe kuxi ma ŋu tso mɔ bubu aɖe nu.

<br/>

## Gɔmesese vɔ̃vɔ̃ siwo bɔbɔe

- **Tachyon mele dzi o.** Gakotoku aɖeke mezãa egbegbe o, eye mɔ̃ ƒe sewo trɔtrɔ aɖeke metsɔe va dze dzi o.
- **Tachyon menye Ironwood ene o.** Ironwood dze dzi le July 2026 eye wòwɔ dɔ kple Orchard gaƒuƒoƒo kple gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe. Tachyon nye ɖoɖo bubu si va emegbe ku ɖe nu ƒe dziyiyi ŋu.
- **Tachyon menye ɣaɣla ƒe ɖeɖe kpɔ o.** Ta lae nye be woanɔ ledger indistinguishability dzi le esi woate ɖe nu ƒe dziyiyi ƒe gaƒoƒo ɖa, menye be woatsɔ ɣaɣla aɖe kpea tsɔ axɔ kabakaba o.
- **zk-SNARK ƒe verification menye bottleneck la kpɔ gbeɖeka o.** Ɖoɖo la gblɔ kpuie be akpa si lea ɣeyiɣi lae nye ale si gakotokuwɔlawo kpɔa eye wole state la ƒe dɔwo ɖom, menye ɖaseɖigbalɛwo ƒe kpɔkpɔ ƒe gaƒoƒo o.
- **Tachyon mele NU7 me o.** Woyɔe be candidate kpɔ, gake scope si woɖo le September 2026 la kpɔ block ƒe sekond 25, fee ƒe gbugbɔzazã, kple version 4 gaɖoɖowo ƒe nuwuwu, si me gaɖoɖo ƒe format yeye aɖeke mele o ([ZIP 259](https://zips.z.cash/zip-0259)).

<br/>

## Nyagbalẽ

| Nyagbalẽ | Gɔmesese |
|---|---|
| Trial decryption | Ɣeɣeɣe le gaɖoɖowo ƒe ɣaɣlaŋlɔŋlɔ ƒe gagbã ŋu be woakpɔ siwo woɖo ɖe wò ŋu |
| In-band secret distribution | Fexexe ƒe sirinunu la ɖo ɖe gaɖoɖo la me le blockchain la dzi, abe ale si Zcash wɔna egbea ene |
| Out-of-band payment | Fexexe ƒe nyatakakawo zɔa to dɔla kple xɔla dome tẽ, menye to ɖoɖonu la me o |
| Oblivious synchronization | Ɖoɖonu ƒe data si gakotoku aɖe hia ƒe xɔxɔ le esi me wòmefia data si wobia o |
| Proof-carrying data (PCD) | Data si zɔa kple eŋutɔ ƒe nyateƒe ƒe ɖaseɖigbalɛ, ale be woate ŋu aƒo ɖaseɖigbalɛwo eye woatsɔ wo awɔ nu sue |
| Shielded transaction aggregate | Tachyon ƒe mɔ si wòtsɔa ɣaɣla ƒe nɔnɔme ƒe tɔtrɔwo ƒoa nu ɖekae, eye wòtrɔa ale si woɖea gbe tso wo ŋu eye wole asidede agbalẽ te wo ŋu |
| ledger indistinguishability | Nɔnɔme si wɔa be womate ŋu ade vovototo le ɣaɣla gaɖoɖowo dome o |

<br/>

## FAQ

**Esia awɔ be nye gakotoku ƒe syncɖoɖo anɔ kaba wu oa?** Eyae nye ta la. Syncɖoɖo ƒe ɣeyiɣi adze wò ŋutɔ ƒe dɔwɔwɔ ɖo, menye ɖoɖonu la ƒe lolome o. Womeɖo nu aɖeke va dze dzi ha o, eyata xexlẽ si woɖe kpɔ aɖeke mele be woagblɔ o.

**Ele be mawɔ nu aɖeke fifia oa?** Ao. Tachyon nye ɖoɖo. Ne woɖo eƒe dzi la, ava to mɔ̃ ƒe sewo trɔtrɔ me kple gbeɖeɖe si wònɔa zi sia zi.

**Nukpɔsafuiwo ƒe ɖeɖe fia be maɖe mɔ na ame bubu be wòakpɔ nyatakaka oa?** Ɖoɖo la tsɔa mɔ ma doa tso core protocol la me yi gakotoku ƒe layer la me. Ale si esia anɔa le vavã me nye biabia siwo ƒe ŋuɖoɖo mede o dometɔ aɖe.

**Nye ga le afɔku me ne Tachyon dze dzi oa?** Woatsɔ ɖoɖo va dze dzi to Orchard mɔ̃ ƒe sewo trɔtrɔ alo gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe aɖe me; wo katã woɖoe be ga ƒe zãzã nadzɔ le dukɔme ƒe xexlẽɖoɖowo te. Ironwood ƒe axa la gblɔ ale si gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe aɖe wɔa dɔe.

<br/>

## Axawo siwo ƒe kadodo le eme

- [Private Information Retrieval](https://zechub.wiki/zcash-tech/private-information-retrieval) - mɔ bubu aɖe na gakotoku ƒe scanning ƒe bottleneck ma
- [Zakura Node](https://zechub.wiki/zcash-tech/zakura-node) - ɣaɣla dzesi ŋɔŋlɔ aɖe si wotu eƒe akpa aɖe tso Tachyon ƒe mɔ̃ ƒe ɖoɖoŋlɔla ƒe dɔ me
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) - mɔ̃ ƒe sewo trɔtrɔ si dze dzi le July 2026, ame geɖewo bui be enye Tachyon
- [The Turnstile](https://zechub.wiki/zcash-tech/the-turnstile) - mɔ si Tachyon ate ŋu azã ne woɖo eƒe dzi abe gaƒuƒoƒo tɔxɛ ene
- [Post-Quantum Security](https://zechub.wiki/zcash-tech/post-quantum-security) - afi si Tachyon le le protocol ƒe dɔ siwo le ɣeyiɣi didi me gbɔ
- [How Zcash Is Organized](https://zechub.wiki/start-here/how-zcash-is-organized) - ame siwo wɔ dɔ sia kple ale si ecosystem la ƒe akpawoe ƒoa nu ɖekae

<br/>

## Nudzɔdzɔwo

- [Tachyon: Scaling Zcash with Oblivious Synchronization](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) - Sean Bowe, 2 April 2025, ɖoɖo gbãtɔ
- [Tachyaction at a Distance](https://seanbowe.com/blog/tachyaction-at-a-distance/) - Sean Bowe, 15 May 2025, consensus kple protocol ƒe emetsonuwo, woŋlɔe na protocol ƒe mɔ̃ ƒe ɖoɖoŋlɔlawo
- [Sean Bowe's blog](https://seanbowe.com/blog/) - afi si woɖea Tachyon ƒe series la gbe dzi
- [tachyon.z.cash](https://tachyon.z.cash/) - project ƒe site
