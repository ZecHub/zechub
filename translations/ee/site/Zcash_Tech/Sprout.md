<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sprout.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sprout

> Zcash dze dɔ gɔme le October 28, 2016 dzi, kple Sprout shielded pool.

Nusi nàtsɔ adzoe: Sprout nye afisi Zcash dze egɔme tsoe, zi gbãtɔ si ame ŋutɔ ƒe ga si ŋu woate ŋu aɖo kpee la ƒu du le blockchain si le agbe dzi.

Sprout nye Zcash network ƒe gɔmedzedze gbãtɔ, ke menye emegbe o [network ƒe ŋgɔyiyi](../start-here/network-upgrades). Eyi agbe le genesis block le October 28, 2016. ZIP si ŋu xexlẽdzesi le aɖeke meɖe Sprout gɔme o: ZIP ƒe ɖoɖoa dze egɔme emegbe kple Overwinter, eyata woɖɔ Sprout to Zcash Protocol Specification gbãtɔ kple Zerocash xɔtutu si dzi wotue ɖo. The [Electric Coin Company](../zcash-organizations/electric-coin-company) (si nye Zerocoin Electric Coin Company ɣemaɣi), si Zooko Wilcox nɔ ŋgɔ na lae tue heɖoe ɖe meli. Sprout to zk-SNARK shielded transactions gbãtɔ siwo wɔa dɔ kple shielded pool gbãtɔ vɛ, ale be amewo ateŋu aɖo ZEC kple amesi ɖoe ɖa, amesi xɔe, kple ga home si woɣla esime network la gakpɔtɔ le ekpɔm be ga si susɔ la ƒo ƒu. Ŋkɔa fia kɔsɔkɔsɔ ɖekakpui aɖe si le tsitsim si ƒuƒoƒoa nɔ mɔ kpɔm be adzi ɖe edzi.

Nusitae esia le vevie ɖo. Dutoƒo blockchain ɖesiaɖe si do ŋgɔ na Sprout tsɔ wò fexexewo ɖe go: amesiame ate ŋu akpɔ amesi xe fe na amesi kple ga home si wòxe. Sprout ye nye network gbãtɔ si le agbe, si ŋu mɔɖeɖe mele o, si ɣla nyatakaka mawo tsitotsito eye wògaɖo kpe edzi kokoko be ame aɖeke mele ameflunyawo gblɔm o. Ema le vevie na ganyawo ƒe adzamenyawo gbɔgblɔ dzro ko, si ƒomevi nèkpɔa mɔ na tso ga alo gadzraɖoƒegbalẽvi si ame bubu mate ŋu axlẽ o me. Eɖo kpe edzi hã be adzamenyawo gbɔ kpɔkpɔ sesẽ le kɔsɔkɔsɔ me ate ŋu awɔ dɔ le nuwɔna me, wu pepa dzi wɔwɔme. Ðoɖowɔɖi si dzi woka ɖo si na wòte ŋu dzɔ la va zu nusi dzi woanɔ te ɖo awɔ nya ɣaɣlawo ƒe dɔwɔwɔ emegbe, eye kpeɖodziɖoɖo blewu, si ƒe ŋkuɖodzinu kpekpe si Sprout tsɔ ɖo ɖa lae nye nusi tututu ƒoe ɖe ƒuƒoƒoa nu be woatu Sapling le ƒe eve megbe.

## Ta gbãtɔ si wokpɔ ta na

Sprout wɔ adrɛs ƒomevi eve. Adrɛs siwo me kɔ (t-adrɛs) wɔa dɔ abe Bitcoin ene, eye nyatakakaawo dzena le dutoƒo agbalẽ gã la dzi. Adrɛs siwo wokpɔ ta na (z-adrɛs) ɖoa ga ɖe Sprout la me [ta si ŋu wokpɔ akpoxɔnu le](../using-zcash/shielded-pools), afisi ame si ɖoe ɖa, amesi xɔe, kple ga homea nɔa ɣaɣla le. Aɖaŋuae nye be [zk-SNARKs ƒe nyawo](../zcash-tech/zk-snarks), sidzedze zero ƒe kpeɖodzi siwo naa asitsatsa aɖe ɖenɛ fiana be esɔ, eye gazazã zi gbɔ zi eve kple ga si susɔ siwo ƒo ƒu, evɔ womeɖea nyatakakaawo dometɔ aɖeke ɖe go o. Sprout nye zi gbãtɔ si esia ƒu du le ewɔwɔ me le cryptocurrency si le agbe dzi.

![Transparent transactions expose sender, receiver, and amount, while Sprout shielded transactions hide all three yet stay verifiable](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-shielded-vs-transparent.png)

## Kɔnua

zk-SNARK siwo le Sprout hiã dutoƒo parameters ƒe hatsotso aɖe, eye wo wɔwɔ dedie bia be woawɔ ɖoɖo zi ɖeka si woyɔna be Ceremony. Gomenɔla ade siwo nɔ teƒe vovovowo, siwo le didiƒe, dometɔ ɖesiaɖe wɔ nu ɣaɣla aɖe, si woyɔna be gbeɖuɖɔ si me aɖi le. Ne ame aɖe gaƒo kakɛawo katã nu ƒu gbeɖeka la, ate ŋu awɔ ZEC tso naneke me o. Alesi wowɔe la trɔ afɔku ma wòzu se bɔbɔe aɖe: zi alesi gomekpɔla ɖeka ya teti tsrɔ̃ woƒe akpaa ko la, womate ŋu agbugbɔ nya ɣaɣla bliboa atu gbeɖe o, eyata aʋatsokaka gakpɔtɔ nye nusi mate ŋu adzɔ o. Gomenɔla siwo ƒe ŋkɔ woyɔ le dutoƒo dometɔ aɖewoe nye Zooko Wilcox, Andrew Miller, Peter Van Valkenburgh, Peter Todd, kple Derek Hinch siwo le NCC Ƒuƒoƒoa me. Gomenɔla ɖeka tiae be yemaɖe yeƒe ŋkɔ o.

![The Ceremony: six participants generate private shards, then destroy the toxic waste, leaving only the public Sprout parameters](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-ceremony-flow.png)

## Afisi wòdzɔ tso

Sprout ye nye gɔmeɖoanyi si dzi tɔtrɔ ɖesiaɖe si ava emegbe tua ɖo. Esi network-upgrade mechanism va ɖo kple Overwinter la, etsɔ ŋkɔ na se gbãtɔawo be consensus branch id 0, si fia ko be womewɔ upgrade aɖeke ŋudɔ haɖe o. Nusianu tso ɣemaɣi (Overwinter, Sapling, Blossom, Heartwood, Canopy, NU5, NU6, kple edziyiyi) bɔbɔ nɔ kɔsɔkɔsɔ si Sprout dze egɔme la dzi. Woɖe gbeƒã dodo ɖe ŋgɔ le August 2016 me na October 28 ƒe gɔmedzedze, Kɔnu la ƒu du le kwasiɖa siwo do ŋgɔ me, eye gɔmedzedze ƒe block ƒe ɣeyiɣi ƒe dzesi si woŋlɔ sesĩe la xlẽ October 28, 2016, le 07:56 UTC.

![Timeline from the August 2016 announcement through the parameter Ceremony to the October 28, 2016 Sprout launch](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-timeline.png)

## Nyagɔmeɖegbalẽ

| Nyagbe | Plain-Eŋlisigbe me gɔmesese |
|---|---|
| zk-SNARK | Kpeɖodzi si me sidzedze zero le si ɖea asitsatsa aɖe fiana la sɔ evɔ meɖe amesi ɖoe ɖa, amesi xɔe, alo ga home |
| Ta si wotsɔ akpoxɔnu wɔe | Zcash ƒe akpa si nye ame ŋutɔ tɔ si me woɣlaa ga homewo kple kplɔ̃ɖoƒewo le. Sprout ta lae nye gbãtɔ |
| z-adrɛs kple t-adrɛs | Wokpɔa z-adrɛs ta eye wònaa nyatakakawo nɔa ɣaɣla. T-adrɛs aɖe me kɔ eye wòɖea nyatakakawo fiana le dutoƒo ledger |
| Kɔnu la | Ƒe 2016 ƒe akpa geɖe ƒe ɖoɖo si na Sprout ƒe dutoƒo parameters eye emegbe wòtsɔ aɖi gbeɖuɖɔwo ƒu gbe |
| Gbeɖuɖɔ siwo me aɖi le | Safui ɣaɣla siwo tso Kɔnu la me siwo wòle be woatsrɔ̃ ale be womate ŋu awɔ ZEC o |
| Nubabla ƒe alɔdze id 0 | Sprout ƒe sewo ƒe dzeside, si gɔmee nye gɔmedzedze hafi network ƒe tɔtrɔ ɖesiaɖe |

## Nyabiasewo ƒe Nyabiasewo

Ðe Sprout trɔa nye ZEC alo nye adzamenyawo egbea? Ao, Sprout nye ŋutinya, gɔmedzedze si dze kɔsɔkɔsɔ si dzi wò ZEC le agbe ɖo la gɔme. Wò gakuwo kple wò adzamenyawo egbea nɔ te ɖe gakotoku kple ta si ŋu akpoxɔnu le si nèzãna fifia dzi, ke menye ɖe naneke si wòle be nàwɔ tso Sprout ŋu dzi o.

Nukatae ZIP xexlẽdzesi aɖeke meli na Sprout o? ZIP ƒe ɖoɖoa dze egɔme emegbe, kple Overwinter ƒe tɔtrɔ. Sprout nye gɔmedzedze gbãtɔ, si woɖɔ to Zcash Protocol Specification kple Zerocash xɔtutu si dzi wotue ɖo. ZIP 200 yɔ Sprout le megbekpɔkpɔ me ko, abe consensus branch id 0, gɔmedzedze hafi ŋgɔyiyi ɖesiaɖe ene.

Ðe wòhiã be maka ɖe ame ade siwo nɔ Kɔnua me dzia? Wotu ɖoɖoa ale be wo dometɔ ɖeka koe nèhiã be nàto nyateƒe. Wo dometɔ ɖesiaɖe lé nya ɣaɣla aɖe ɖe asi, eye zi alesi gomekpɔla ɖeka tsrɔ̃ wo tɔ ko la, womate ŋu agbugbɔ nya ɣaɣla bliboa atu gbeɖe o eye ame aɖeke mate ŋu awɔ ZEC o. Woyɔ gomekpɔla atɔ̃ ƒe ŋkɔ le dutoƒo eye ɖeka megaɖe ŋkɔ o.

Ðe Sprout-ta lae nye esi nye gakotoku zãna fifiaa? Ðewohĩ menye nenemae o. Sprout ye nye ta gbãtɔ si ŋu wokpɔ akpoxɔnu le, gake emegbe tɔtrɔ siwo wowɔ abe Sapling ene to aɖaŋu si wotsɔ akpoxɔnu ɖo kabakaba wu vɛ, eye gakotoku akpa gãtɔ zãa ta yeyewo egbea. Sprout gakpɔtɔ le vevie elabena dɔ si ɖo kpe edzi be ame ŋutɔ ƒe asitsatsa siwo ŋu woate ŋu aɖo kpee ate ŋu awɔ dɔ le live network dzi.

Nukae na Sprout to vovo tso Bitcoin gbɔ? Bitcoin tsɔa fexexe ɖesiaɖe dea dutoƒo agbalẽ gã aɖe me afisi ga homewo kple adrɛswo dzena le. Sprout tsɔ adzɔnuwɔna siwo wokpɔ ta na siwo ɣlaa amesi ɖoe ɖa, amesi xɔe, kple ga home la kpe ɖe eŋu esime wògaɖea mɔ na network la be wòaɖo kpe edzi be asitsatsa la sɔ. Ena adrɛs siwo me kɔ hã nɔna, eyata atsyã eveawo siaa nɔa kɔsɔkɔsɔ ɖeka dzi.

## Do wò nugɔmesese kpɔ

Woyɔa Sprout zi geɖe be network upgrade kple activation height. Nukatae nya ma mesɔ tututu o?

<details>
<summary>Answer</summary>

Sprout nye Zcash ƒe dodo gbãtɔ, ke menye emegbe ƒe tɔtrɔ o. Ewɔa dɔ tso esime wowɔ genesis block (block 0) le October 28, 2016 dzi, eyata dɔwɔwɔ ƒe kɔkɔme aɖeke meli si dzi woafia asi o. Network-upgrade mechanism la va emegbe eye wòtsɔ ŋkɔ na Sprout ƒe sewo be consensus branch id 0, gɔmedzenu si do ŋgɔ na upgrade ɖesiaɖe.
</details>

### Nunɔamesiwo

[ZIP 200: Netwɔƒe ƒe Ðɔɖɔɖo ƒe Mɔnu](https://zips.z.cash/zip-0200)

[Zcash network ƒe ŋgɔyiyiwo](https://z.cash/upgrade/)

[Electric Coin Company: Zcash Sprout launch](https://electriccoin.co/blog/zcash-sprout-launch/)

[Electric Coin Company: The Design of the Ceremony](https://electriccoin.co/blog/the-design-of-the-ceremony/)

### Kpɔe hã

[Ta Siwo Wotsɔ Akpoxɔnu Wɔe](../using-zcash/shielded-pools)

[zk-SNARKS ƑE NUÐEÐEŊUTI](../zcash-tech/zk-snarks)

[Zcash Network ƒe Ðɔɖɔɖowo](../start-here/network-upgrades)

[Nukae nye ZEC kple Zcash](../start-here/what-is-zec-and-zcash)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Siwo kplɔ wo nɔewo ɖo: [Network Upgrades ƒe dzesi](../start-here/network-upgrades) · Esi kplᴐe ɖo: [Dzomeŋɔli](../zcash-tech/overwinter)
