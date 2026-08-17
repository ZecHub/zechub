<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sapling.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sapling

> Sapling yi agbe le Zcash mainnet dzi le block 419,200 (October 29, 2018, 02:15 UTC).

Nusi nàtsɔ adzoe: Sapling wɔ Zcash ƒe fe siwo ame ŋutɔ xena kabakaba eye wònɔa bɔbɔe ale gbegbe be woate ŋu awɔ dɔ le telefon alo gakotoku si me wozãa xɔtunuwo le dzi.

Sapling nye Zcash network ƒe tɔtrɔ gã evelia, si wɔ dɔ le Zcash ƒe ƒezã evelia dzi. Enye fɔkpa sesẽ si dzi woda asi ɖo si gbugbɔ tu alesi wotsɔa asitsatsa siwo wokpɔ ta na (ame ŋutɔ tɔ) ƒoa ƒui. Woɖea dɔwɔwɔ gɔme to ZIP 205 dzi, asitsatsa ƒe asidede agbalẽ te ƒe se yeyeawo to ZIP 243 dzi, eye wo ame evea siaa tu ɖe ZIP 200, si nye network ƒe ŋgɔyiyi ƒe mɔnu dzi. Nyatakaka bliboa le Zcash Protocol Specification me. Electric Coin Company tu ɖɔɖɔɖoa eye wòɖo gbãtɔ si do alɔe, zcashd 2.0.0, le August 2018. Le kɔsɔkɔsɔ me la, network la dea dzesi Sapling seawo to eƒe alɔdze id si dzi woda asi ɖo dzi.

Nusitae esia le vevie ɖo. Do ŋgɔ na Sapling la, ame ŋutɔ ƒe fexexe ŋutɔŋutɔ fia be nàlala aɖabaƒoƒo geɖe esime wò kɔmpiuta le ŋkuɖodzinu gigabytewo ɖum be yeatu kpeɖodzia. Ema nɔ blewu akpa eye wòlolo akpa na ame akpa gãtɔ, eyata ezãla, nuɖɔlilawo, kple fiase geɖe do kpo asitsatsa siwo ŋu wokpɔ ta na la eye woɖo ZEC ɖe gaglãgbe boŋ. Sapling ɖe dɔa dzi kpɔtɔ va ɖo sɛkɛnd ʋɛ aɖewo kple ŋkuɖodzinu si ade megabyte 40. Tɔtrɔ ɖeka mae nye nusi na ZEC si wotsɔ akpoxɔnu wɔe la sɔ be woazã le gbesiagbegbenɔnɔ me, le telefon dzrowo dzi kple le gakotoku siwo me wozãa xɔtunuwo le me.

## Nusi trɔ

Sapling ƒe dzi nye mɔnu si le kabakaba wu si dzi woato atu sidzedze zero-sidzedze ƒe kpeɖodzi si naa asitsatsa si wokpɔ ta na la nɔa ɣaɣla. Sprout ƒe nɔnɔme gbãtɔ zã kpeɖodzi nutome sue ɖeka (JoinSplit nutome) si nɔa blewu eye ŋkuɖodzinyawo ƒe dɔ nɔa eŋu. Sapling tsɔ nutome eve siwo wotu ɖe taɖodzinu aɖe ta, Spend nutome kple Output nutome, si ŋu woƒo nu tsoe le Zcash Protocol Specification me, ɖɔ li. Nusi dona tso emee nye gazazã ƒe ɖiɖi gã aɖe. Le Electric Coin Company ƒe nya nu la, woate ŋu atu asitsatsa si ŋu wokpɔ ta na le sɛkɛnd ʋɛ aɖewo ko me to ŋkuɖodzinu si ade megabyte 40 zazã me. Gɔmedzedze si nɔ anyi do ŋgɔ na Sapling Sprout la kpekpe wu sã, le aɖabaƒoƒo kple ŋkuɖodzinu gigabyte geɖe ƒe ɖoɖo nu (Sprout ƒe akpa dzi xexlẽdzesi siawoe nye gɔmedzedze si gogo si woyɔ le afisiafi).

![Sprout versus Sapling shielded transaction cost](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-before-after.png)

## Safui yeyewo

Sapling to adrɛs kple safui yeye aɖe hã vɛ. Safui ɖeka ate ŋu akpɔ adrɛs vovovo geɖe, siwo nye fexexe ƒe adrɛs vovovo siwo gotagome eteƒekpɔla mate ŋu atsɔ wo aɖo wo nɔewo gbɔ o. Sapling tsɔ nukpɔkpɔ ƒe safuiwo hã kpee: nukpɔkpɔ ƒe safui si yɔ fũ alo si gbɔna la na nèma ŋutete si le asiwò be nàkpɔ gakotoku ƒe asitsatsa ŋuti nyatakakawo evɔ màtsɔ ŋutete si le asiwò be nàzã eƒe ga la ade asi na ame o. Ema ɖea vi na agbalẽdzikpɔkpɔ, akɔntabubu, alo kpeɖodzi ko be woxe fe aɖe.

Tɔtrɔ si do ƒome kplii enye be Sapling ma kpeɖodzia tutudɔa kple asidede asitsatsa la te ƒe dɔa dome. Mehiã be mɔ̃ si wɔa zero-sidzedze ƒe kpeɖodzia nanye mɔ̃ si lé gazazã ƒe ŋusẽ ɖe asi o. Decoupling siae nye nusi naa hardware gakotoku nana wò gazazã ƒe safuia ɖea eɖokui ɖe aga esime mɔ̃ si le eɖokui si wɔa kpeɖodzidɔ si kpekpe wu.

![Proving device hands the proof to a separate signing device](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-decoupled-spend.png)

## Ðoɖo si dzi woka ɖo

Sapling ƒe nutome suewo ɖoa ŋu ɖe dutoƒo parameters ƒe hatsotso aɖe si wòle be woawɔ nyuie ŋu. Ne ɖe akpa ɖeka koe wɔ wo eye wòdzra nyatakaka ɣaɣla siwo susɔ ("aɖi gbeɖuɖɔ") ɖo la, anye ne akpa ma ate ŋu awɔ kpeɖodziwo aʋatso. Be woaƒo asa na esia la, parameterawo tso wɔna si me wowɔa akpa eve le, si me akpa vovovowo nɔna. Akpa 1, si woyɔna be Powers of Tau, nye nutome-agnostic, si fia be womeblae ɖe Sapling ƒe nutome sue tɔxɛwo ŋu o. Akpa 2 lia, si nye Sapling MPC, nye nutome sue aɖe koŋ tɔ. Akpa ɖesiaɖe nɔa dedie zi alesi gomekpɔla ɖeka ya teti ɖi anukware eye wògblẽ woƒe gbeɖuɖɔ siwo me aɖi le dome ko, eyata ne gomekpɔla ɖesiaɖe wɔ ɖeka ko hafi wɔnaa do kpo nu.

## Alesi wòwɔ dɔe

Sapling kplɔ Overwinter, si nye June 2018 ƒe tɔtrɔ si dzra network la ƒe dodoɖeŋgɔ ƒe mɔnu ɖo. Electric Coin Company ɖo mainnet ƒe dɔwɔwɔ ƒe kɔkɔme le zcashd 2.0.0 me, si woɖe ɖe go le August 2018 me, eye network la trɔ ɖe Sapling ƒe sewo ŋu esime woɖe block 419,200. Le kɔsɔkɔsɔ dzi la, wotsɔa Sapling ƒe nukpɔsusu ɖeka ƒe alɔdze id dea dzesi ɣeyiɣi ma.

![Timeline from Zcash launch to Sapling activation](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-timeline.png)

## Nyagɔmeɖegbalẽ

| Nyagbe | Plain-Eŋlisigbe me gɔmesese |
|---|---|
| Adzɔnu si wotsɔ akpoxɔnu wɔe | Zcash ƒe asitsatsa si nye ame ŋutɔ tɔ si ɣlaa amesi ɖoe ɖa, amesi xɔe, kple ga home. |
| Sprout | Gbãtɔ shielded protocol Zcash dze egɔme kple, blewu eye wòlolo wu Sapling. |
| Gazazã kple Dɔwɔwɔ ƒe nutome suewo | Sapling ƒe kpeɖodzi nutome yeye eve siwo xɔ ɖe Sprout ƒe JoinSplit nutome ɖeka teƒe. |
| Adrɛs vovovowo | Fexexe ƒe adrɛs geɖe siwo ŋu kadodo aɖeke mele o siwo nàte ŋu akpɔ tso safui ɖeka me la dometɔ ɖeka. |
| Nukpɔkpɔ ƒe safui | Safui si nana ame aɖe kpɔa gakotoku ƒe asitsatsa evɔ mate ŋu azã ga tso eme o. |
| Nubabla ƒe alɔdze id | Kɔda kpui aɖe si gblɔna na network la be upgrade ƒe se siwo dzi asitsatsa aɖe zɔna ɖo. |

## Nyabiasewo ƒe Nyabiasewo

Ðe Sapling trɔ ZEC agbɔsɔsɔme si le asinyea? Ao, Sapling trɔ alesi wotua asitsatsa siwo ŋu akpoxɔnu le, ke menye ZEC ƒe agbɔsɔsɔ si le ame aɖe si alo nusiwo katã woatsɔ anae o. Mekpɔ ŋusẽ ɖe wò dadasɔ dzi o.

Ðe nye ZEC gakpɔtɔ nye ame ŋutɔ tɔ le Sapling megbea? Ẽ, eye woate ŋu azãe wu. Sapling lé asitsatsa siwo ŋu wokpɔ ta na ƒe adzamenyawo sẽŋu ɖe asi eye wòna wo kabakaba eye woƒe asi bɔbɔ ale gbegbe be woate ŋu azã wo ŋutɔŋutɔ. Ga siwo wokpɔ ta na la nɔa ɣaɣla nenema ke.

Ðe wòle be mawɔ nanea? Womebiaa afɔɖeɖe aɖeke tso gbɔwò abe amesi léa nu ɖe ​​te ene o. Sapling nye network upgrade si gakotoku kple node software xɔ. Egbegbe gakotokuwo doa alɔ Sapling adrɛswo xoxo.

Vovototo kae le Sprout kple Sapling dome? Sprout ye nye ɖoɖowɔɖi gbãtɔ si wotsɔ akpoxɔnu wɔe eye wòzã nutome sue ɖeka si ɖoa kpe edzi blewu, si ƒe ŋkuɖodzinu kpekpe. Sapling tsɔ Spend kple Output nutome sue siwo zɔna kabakaba wu ɖɔ li, etsɔ nukpɔkpɔ ƒe safuiwo kple adrɛs vovovowo kpee, eye wòna asitsatsa siwo ŋu wokpɔ ta na la le bɔbɔe ale gbegbe be woate ŋu azã telefonwo kple gakotoku siwo me wozãa xɔtunuwo le.

Nukatae nyatakakatsoƒe aɖewo gblɔ be October 28 eye bubuwo gblɔ be October 29? Woɖo dɔwɔwɔ ƒe kɔkɔme do ŋgɔ be woaɖo taɖodzinu na October 28, 2018. Woɖe mɔxenu si he tɔtrɔa vɛ ŋutɔŋutɔ, si nye block 419,200, le October 29 UTC ƒe gaƒoƒo gbãtɔwo me. Le nutoa me ƒe ɣeyiɣi ƒe didime geɖe me la, egakpɔtɔ nye October 28. Enye block ɖeka ma ke eye wònye ɣeyiɣi ɖeka ma ke le mɔ evea siaa nu.

Nukae nye nukpɔkpɔ ƒe safui? Nukpɔkpɔ ƒe safui na be nàte ŋu ama nuxexlẽ ƒe mɔnukpɔkpɔ ɖe gakotoku si ŋu wokpɔ ta na la me. Ame aɖe si si nukpɔkpɔ ƒe safui blibo alo esi gbɔna ate ŋu akpɔ gakotokua ƒe asitsatsa ŋuti nyatakakawo gake mate ŋu azã eƒe ga o. Kpɔ [Safuiwo Kpɔkpɔ](../zcash-tech/viewing-keys) hena bubuwo.

## Do wò nugɔmesese kpɔ

Le Sprout ƒe dziɖuɣi la, nukatae ame geɖe ƒoa asa na asitsatsa siwo ŋu wokpɔ ta na, eye aleke Sapling ɖɔe ɖoe?

<details>
<summary>Answer</summary>
Le Sprout te la, asitsatsa si ŋu wokpɔ ta na tutu xɔa aɖabaƒoƒo geɖe eye wòzãa ŋkuɖodzinu gigabyte, eyata enɔa blewu akpa eye wòlolona na ezãla akpa gãtɔ, nuɖɔlilawo, kple fiasewo. Sapling to Spend and Output circuits siwo zɔna kabakaba wu vɛ siwo ɖea dɔa dzi kpɔtɔna va ɖoa sɛkɛnd ʋɛ aɖewo kple abe megabyte 40 ene, si wɔe be asitsatsa siwo ŋu wokpɔa akpoxɔnuwo le la ɖea vi le gbesiagbe telefonwo kple gakotoku siwo me wozãa xɔtunuwo le me.
</details>

### Nunɔamesiwo

- [ZIP 205: Sapling Network ƒe Dodoɖeŋgɔ ƒe Dɔwɔwɔ](https://zips.z.cash/zip-0205)
- [ZIP 243: Asitsatsa ƒe Asidede Asi ƒe Dzesidede na Sapling](https://zips.z.cash/zip-0243)
- [Zcash Sapling ƒe ŋgɔyiyi ƒe axa](https://z.cash/upgrade/sapling/)
- [Electric Coin Company: Sapling announcement](https://electriccoin.co/blog/sapling/)
- [Electric Coin Company: Gbeƒãɖeɖe le Sapling MPC ŋu](https://electriccoin.co/blog/sapling-mpc/)

### Kpɔe hã

- [Ta Siwo Wotsɔ Akpoxɔnu Wɔe](../using-zcash/shielded-pools)
- [Safuiwo Kpɔkpɔ](../zcash-tech/viewing-keys)
- [zk-SNARKS ƑE NUÐEÐEŊUTI](../zcash-tech/zk-snarks)
- [Zcash Network ƒe Ðɔɖɔɖowo](../start-here/network-upgrades)
- [Gakotokuwo](../using-zcash/wallets)
- [Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Siwo kplɔ wo nɔewo ɖo: [Network Upgrades ƒe dzesi](../start-here/network-upgrades) · Si do ŋgᴐ: [Dzomeŋɔli](../zcash-tech/overwinter) · Esi kplᴐe ɖo: [Seƒoƒo ƒe ʋuʋu](../zcash-tech/blossom)
