<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nukae Zcash TEX Adrɛswo?

## TL;DR

* TEX adrɛs nye Zcash adrɛs si me kɔ si woŋlɔ ɖe nɔnɔme bubu me. Edzea egɔme tso `tex1` eye woɖe egɔme le [ZIP 320 ƒe xexlẽdzesi](https://zips.z.cash/zip-0320).
* Egblɔa nu ɖeka na wò gakotokua: ga si me kɔ koe nàtsɔ axe adrɛs sia.
* Ne wokpɔ wò ga si susɔ la ta la, gakotoku si sɔ la wɔa afɔɖeɖe eve na wò. Etsɔa ga homea yia adrɛs si me kɔ hena ɣeyiɣi aɖe, emegbe eɖonɛ ɖe TEX adrɛs la dzi.
* Le ƒe 2023 me la, Binance bia tso Zcash nutoa me tɔwo si be woana mɔnu aɖe yewo si dzi yewoato agbe ga si wotsɔ de gadzraɖoƒe siwo ŋu wokpɔ ta na eye yewoagbugbɔe aɖo ɖa. TEX adrɛswoe nye ŋuɖoɖoa, eye Binance nye asitɔtrɔ le ZecHub dzi [Vidzikpɔkpɔ ƒe Asitɔtrɔ](/using-zcash/custodial-exchanges) xexlẽdzesi si xɔa TEX deposits.
* Kpekpeɖeŋu dzi ɖe edzi le dɔdɔ ƒe akpa hã: Coinbase na ezãlawo ɖoa ZEC ɖe TEX adrɛswo, eye gakotoku ƒe dɔwɔnuwo nɔ ZIP 320 ƒe kpekpeɖeŋu kpem ɖe eŋu.
* Fexexe ɖe TEX adrɛs dzi nye dutoƒo le blockchain la dzi, abe fexexe ɖesiaɖe si wowɔna le gaglãgbe ene. Wò ga si susɔ si nèkpɔ ta na la nɔa ame ŋutɔ si.

## Numeɖeɖe Vevitɔ

Zcash TEX adrɛs nye adrɛs tɔxɛ aɖe si xɔa adrɛs. TEX tsi tre ɖi na "Transparent Exchange". Enye Bech32m gbugbɔgaŋlɔ na p2pkh Transparent adrɛs ɖeka. TEX adrɛswo dzea egɔme tso `tex1` eye wonye ƒomevi aɖe si to vovo tso Adrɛs Ðeka gbɔ.

TEX adrɛs gblɔna na gakotoku si sɔ be wòawɔ Transparent-Only (T -> T) ƒe asitsatsa. 

Susu si le emee nye esi: Ne gakotoku si sɔ la de dzesi TEX Adrɛs la, eɖea eƒe nyawo gɔme be yeaxɔ Transparent receiver si le eme. Emegbe gakotokua ɖoa ga si hiã na tx la tso Shielded pool la me yia adrɛs si le vovo, si dzi zãla kpɔna, si nɔa anyi ɣeyiɣi kpui aɖe, Transparent (Z -> T). Emegbe eɖoa ga mawo ɖe TEX adrɛs (T -> T) ƒe Transparent receiver si woɖe tso eme. 

Wogblɔ mɔ̃ɖaŋununya ƒe aɖaŋuɖoɖo na TEX adrɛswo le Zcash me [ZIP 320 ƒe xexlẽdzesi](https://zips.z.cash/zip-0320), si ɖea adrɛs ƒomevi aɖe si woatsɔ axɔ ga tso Adrɛs siwo me kɔ gbɔ ko.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

### Aleke gbegbee wozãa TEX adrɛswoe?

Vixɔxɔnyi gakpɔtɔ nyea akpa aɖe, gake meganye vixɔxɔnyi zi ɖeka ko o. Dɔ vovovo eve sɔ be woama:

* **TEX deposit adrɛswo nana.** Binance nye asitɔtrɔ le míaƒe [Vidzikpɔkpɔ ƒe Asitɔtrɔ](/using-zcash/custodial-exchanges) xexlẽdzesi si naa TEX adrɛs na ga si woda ɖe gadzraɖoƒe, ale be ga natso teƒe si me kɔ ([ZIP 320, Megbenyawo](https://zips.z.cash/zip-0320#background)). ZIP 320 mekpɔa mɔ be dɔwɔƒe bubuwo natsɔ TEX adrɛswo ana o negbe ɖe wòhiã be woanya adrɛs si me woxe fe aɖe tso ko hafi.
* **Dɔdɔdɔ ɖe TEX adrɛswo.** Esia nye akpa si tsi. Le October 2024 me la, Coinbase ɖe gbeƒãe be Coinbase.com zãlawo ateŋu aɖo Zcash ɖe TEX adrɛswo ([Coinbase Assets ƒe gbeƒãɖeɖe](https://x.com/CoinbaseAssets/status/1844428577921507416)). Gakotoku ƒe dɔwɔnuwo le ZIP 320 ƒe kpekpeɖeŋu hã kpem ɖe eŋu: KeepKey tsɔ asidede agbalẽ te kpee na TEX ƒe asitsatsa le firmware 7.15 ([keepkey/hdwallet #75 ƒe nudzraɖoƒe](https://github.com/keepkey/hdwallet/pull/75)), kple XChainJS `zcash-js` agbalẽdzraɖoƒea ƒe ɖɔɖɔɖo le esi wògbe be esɔ vɔ megbe `tex1` amesiwo xɔe (nya geɖe tso ema ŋu le ete).

Eyata TEX adrɛswo menye xexeame katã tɔ o, gake mele be nuxlẽla natsɔe be Binance koe nye teƒe si wodzena le o.

### Ɣekaɣie Mehiã TEX Adrɛs

#### Èhiã TEX adrɛs ne èle ga ɖom ɖe Transparent adrɛs to gakotoku si mewɔa dɔ ɖe Transparent adrɛs dzi tẽ o zazã me.

Gakotoku aɖewo meɖea mɔ be woaɖoe ɖe Transparent adrɛs tẽ o, eye ɖewohĩ amesi xɔe la matsɔ TEX si sɔ kplii ana o. Eyata, ate ŋu abia ɣeaɖewoɣi be woatrɔ tso Transparent dzi ayi TEX adrɛs dzi. Woateŋu awɔ esia kple asi to nufiame ƒe dɔwɔwɔ si wogblɔ le [zip-320 dzi](https://zips.z.cash/zip-0320#reference-implementation).

#### Èhiã na TEX adrɛs ne èle ga ɖom ɖe asitsaƒe si le titina si bia be ga mawo natso Transparent dzɔtsoƒe.

[Binance](https://www.binance.com/) nye nusita TEX adrɛswo li ɖo. Le November 2023 me la, egblɔ na Zcash habɔbɔa be woate ŋu aɖe ZEC ŋkɔ ɖa negbe ɖe mɔ aɖe li si dzi woato agbe gadede asi tso adrɛs siwo wokpɔ ta na dzi eye woagbugbɔe aɖo ɖe gadelawo ([ZIP 320, Megbenyawo](https://zips.z.cash/zip-0320#background)). ZIP 320 mekpɔa mɔ be dɔwɔƒe bubuwo natsɔ TEX adrɛswo ana o negbe ɖe wòhiã be woanya adrɛs si me woxe fe aɖe tso ko hafi. Binance nye asitɔtrɔ le míaƒe [Vidzikpɔkpɔ ƒe Asitɔtrɔ](/using-zcash/custodial-exchanges) xexlẽdzesi si tsɔa ga si woda ɖe eme yia TEX adrɛs dzi.
TEX adrɛswo naa gakotoku si sɔ na nyanya be ele be ga siwo katã woɖo ɖe adrɛs ma dzi la nadze ƒã eye woaɖe asixɔxɔ ɖesiaɖe si wokpɔ ta na la ɖa be woagaɖoe ɖe adrɛs si woyɔ la o.
Ne asitɔtrɔ abe Binance ene gbe asixɔxɔ si woɖo ɖa la, mɔnu si hiã le esi be wòatrɔ asixɔxɔ ma atrɔ ayi adrɛs si dzi wòtso la dzi. Ekpena ɖe dɔwɔƒewo abe Binance ene hã ŋu be woawɔ ɖe se kple ɖoɖo siwo dziɖuɖuwo alo dziɖuɖumegã bubuwo de dzi.

### Gakotoku kawoe doa alɔ TEX Adrɛswo?

Àte ŋu akpɔ xexlẽdzesi siwo sɔ ɖe ɣeyiɣia nu wu le míaƒe.. [gakotokuwo](/using-zcash/wallets) axa 10. Zã TEX Adrɛs ƒe ʋuƒoa.

## Nukpɔkpɔ / Nusɔsrɔ̃

Bu wò ga si susɔ si ŋu wokpɔ ta na la be enye ga si le dedienɔƒe si wotu le aƒeme. Ame aɖeke si le egodo mate ŋu akpɔ agbɔsɔsɔme si le eme o.

Dzesi aɖe le gaɖɔliɖɔli abe Binance ene ƒe kplɔ̃ dzi: woxɔa fexexe le agbalẽkotoku si me kɔ me ko, ale be gadzikpɔla nate ŋu akpɔ afisi ga la tso eye wòagbugbɔe ana ne ehiã. TEX adrɛs lae nye dzesi ma.

Ne wò gakotokua kpɔ dzesia la, eɖea ga homea le gaxɔa me, tsɔnɛ dea agbalẽkotoku si me kɔ si dzi woŋlɔ wò tɔtrɔyi ƒe adrɛs ɖo (adrɛs si me kɔ hena ɣeyiɣi aɖe), eye wòtsɔa agbalẽkotokua yia nudzraƒea. Dedienɔnɔa nɔa gaxɔ me, eye ame aɖeke mesrɔ̃a nu bubu siwo le eme o.

## Deep Dive (Tsi me tsi goglo)

### Alesi wotua TEX adrɛs

Adrɛs si me kɔ si sɔ si dzea egɔme tso `t1` léa 20-byte key hash, si woŋlɔ ɖe Base58Check me. TEX adrɛs léa byte 20 ma ke, si wogbugbɔ ŋlɔ ɖe Bech32m me kple ŋgɔdonya `tex` (`textest` le testnet dzi). Ðeka tɔtrɔ ɖe evelia me xɔa kɔda ƒe fli ʋɛ aɖewo, si ZIP 320 ɖena fiana le eƒe nufiamedɔwɔwɔ me.

Aɖaŋu bɔbɔe la nye nudidi tso Binance: ele be tɔtrɔa nawɔ dɔ kple Base58Check kple Bech32m agbalẽdzraɖoƒewo ko le exchange ƒe ŋgɔgbe-nuwuwu kɔda me. ZIP 320 ƒe ɖoɖo aɖe si wowɔ do ŋgɔ la tu susua ɖe Adrɛs Ðeka me, eye woɖe asi le eƒe tɔtrɔ ma ŋu le susu sia ta.

TEX adrɛswo doa Bech32m ƒe nuŋɔŋlɔ tso Unified Address ƒe nɔnɔme me gake womeléa eƒe wɔwɔme aɖeke kloe me ɖe asi o. Ne ènye ame yeye le Bech32m kple alesi woɖoa kpe Zcash adrɛswo dzii la,.. [Adrɛs Siwo Wowɔ Ðekae](/using-zcash/unified-addresses) axaa ƒo nu tso gɔmedzenu siwo le ete ŋu [ZIP 316 ƒe xexlẽdzesi](https://zips.z.cash/zip-0316). TEX adrɛs to vovo tso Adrɛs Ðeka gbɔ le mɔ ene ŋutɔŋutɔ nu:

| | Adrɛs si Wowɔ Ðeka (ZIP 316) | TEX adrɛs (ZIP 320) |
|---|---|---|
| Nusi wòlé ɖe asi | xɔla geɖe siwo woƒo ƒu ɖekae | P2PKH ƒe xɔla ɖeka si me kɔ |
| Gbãtɔ si amegbetɔ ate ŋu axlẽ (HRP) | `u` (mainnet) | `tex` (`textest` le testnet dzi) |
| F4Jumble ƒe ʋuʋu | Ɛ̃ | no |
| Typecodes na receiver ɖesiaɖe | Ɛ̃ | no |

Kpuie ko la, TEX adrɛs nye Bech32m ƒe agbalẽ xatsaxatsa si me kɔ wu: safui hash ɖeka si me kɔ, a `tex` ŋgɔdonya, eye menye nu bubu aɖeke o.

### Se siwo ku ɖe gakotokuwo kple integrators ŋudɔwɔwɔ ŋu

Esia nye akpa si implementations nɔ gbegblẽm, eyata enyo be míagblɔe eme kɔ. Le TEX adrɛs didi me la, gakotoku alo integrator **mele be wòazã ga tso shielded pool la me ayi TEX ƒe teƒe si woɖo tae tẽ o.** ZIP 320 bia be nusianu si woatsɔ ade TEX fexexe me nadze ƒã, eyata wotu fexexea abe afɔɖeɖe eve ene:

1. **Deshield.** Tsɔ ga home la tso ta si wokpɔ ta na la me yi adrɛs yeye si dzi zãla kpɔ ŋusẽ ɖo si me kɔ si me kɔ ɣeyiɣi kpui aɖe si le gakotokua si (Z -> T).
2. **Send transparent to transparent.** Zã ɣeyiɣi kpui aɖe ƒe emetsonu ma ɖe P2PKH xɔla si woɖe le eme le TEX adrɛs la me (T -> T).

Se ʋɛ aɖewo na esia le dedie, eye wo katã tso ZIP 320 gbɔ:

* Ele be woaɖe adrɛs si nɔa anyi ɣeyiɣi kpui aɖe la tso wò nuku ƒe nyagbea me, ale be ne gaɖɔliƒea trɔ ga la, wò gakotokua nate ŋu ake ɖe wo ŋu ahazã wo kokoko.
* Ele be woazã ɣeyiɣi kpui aɖe ƒe adrɛs yeye ɣesiaɣi, eyata womate ŋu atsɔ fexexe vovovowo aƒo ƒu ɖe wo nɔewo ŋu o.
* Ele be asitsatsa evelia nazã nusiwo wotsɔ de eme siwo me kɔ ko, eyata asitɔtrɔa kpɔa ga si woda ɖe gadzraɖoƒe dzadzɛ si me kɔ va ɖo esi me kɔ.

Woɖe tɔtrɔ kple afɔɖeɖe eve ƒe sisi fia le [ZIP 320 ƒe nufiame ƒe dɔwɔwɔ](https://zips.z.cash/zip-0320#reference-implementation). Esia xɔxɔ vodadatɔe nye kuxi ŋutɔŋutɔ, nyitsɔ laa: le October 2026 me la, XChainJS `zcash-js` agbalẽdzraɖoƒe gbe be esɔ `tex1` xɔla siwo si "Invalid 'to' address" vodada le, elabena eƒe kpeɖodziwɔla xɔ Base58Check ko `t1` form, si gblẽ ZEC ƒe gadede asi na dɔwɔƒe siwo taa a `tex1` adrɛs ([tata #1782](https://github.com/xchainjs/xchainjs-lib/issues/1782)). Woɖɔe ɖo to nufiafia na amesi ɖo kpe edzi be wòalɔ̃ ɖe ZIP 320 ƒe nuŋɔŋlɔa dzi ([PR #1783](https://github.com/xchainjs/xchainjs-lib/pull/1783)).

### Nusi TEX ɖoɖo aɖe ɖena fiana

TEX ƒe fexexe nye fexexe si wowɔna le gaglãgbe, eyata enye dutoƒofe, gake enyo be nàgblɔ nusi eteƒekpɔla ate ŋu akpɔ kple nusi mate ŋu akpɔ o la pɛpɛpɛ.

Nusi nye **si wokpɔna** le kɔsɔkɔsɔ dzi:

* Adrɛs si me kɔ si nɔa anyi ɣeyiɣi kpui aɖe, elabena edzena abe deshield afɔɖeɖea ƒe dodo kple dɔdɔ mamlɛtɔ ƒe nyawo ene.
* Ga home eveawo siaa: asixɔxɔ si dzo le ta si wokpɔ ta na la me le Z -> T afɔɖeɖea me, kple asixɔxɔ si wotsɔ na le T -> T afɔɖeɖea me.
* Exchange ƒe transparent receiver, si nye P2PKH adrɛs si woŋlɔ ɖe TEX adrɛs la me.

Nusiwo nɔa anyi **ɣla**:

* Wò ga si susɔ si nèkpɔ ta na, kple gagbalẽ tɔxɛ siwo wotsɔ akpoxɔnu wɔe siwo tsɔ ga xe fea. Deshield afɔɖeɖea ɖee fia be *aɖewo* ƒe asixɔxɔ gblẽ ta la ɖe ɣeyiɣi kpui aɖe ƒe adrɛs la gbɔ, ke menye afisi wòtso le ta la me o.

Eyata eteƒekpɔla ate ŋu atsɔ adrɛs si nɔa anyi ɣeyiɣi kpui aɖe la asɔ kple ga si woxena (ga mawo ke, siwo me kɔ va ɖo esiwo me kɔ) eye ate ŋu akpɔe be wotsɔ ga si woɖe tso ga si woɖe le eme si wotsɔ akpoxɔnu kpee la kpe ɖe eŋu. Womate ŋu atsɔe asɔ kple wò ga alo dɔwɔna bubu siwo ŋu wokpɔ ta na o. Naneke si le kɔsɔkɔsɔ me medea dzesi fexexea ŋutɔŋutɔ be enye "TEX" ɖoɖo o: abe alesi ZIP 320 de dzesii ene la, womate ŋu ade vovototo fexexe ɖe TEX adrɛs dzi kple fexexe na esi sɔ kplii dome o `t1` adrɛs, elabena se siwo dzi woda asi ɖo la metrɔ o eye se bliboa nɔa gakotokua me.

![On-chain footprint of a TEX send: funds leave the shielded pool to an ephemeral transparent address, then go transparent-to-transparent to the exchange; the ephemeral address, both amounts and the exchange address are visible, while the rest of the shielded balance stays hidden](/content-images/tex-onchain-footprint.webp)

### Nusi blockchain la ɖena fiana

TEX sea nɔa gakotokuwo me. Nodes meléa ŋku ɖe eŋu o, eyata se siwo dzi woda asi ɖo la nɔa nenema ke. Le kɔsɔkɔsɔ me la, fexexe ɖe TEX adrɛs dzi dzena abe fexexe na nusi sɔ kplii ene `t1` adrɛs. Ga homea, ɣeyiɣi kpui aɖe ƒe adrɛs, kple asitɔtrɔ ƒe adrɛs nye dutoƒo, abe alesi wòle le asitsatsa ɖesiaɖe si wowɔna le gaglãgbe gome ene.

## Axa Siwo Do Ƒome Kplii

- [Adrɛs Siwo Wowɔ Ðekae](/using-zcash/unified-addresses): the `u1` adrɛs ƒe nɔnɔme le ZIP 316 te, eye Bech32m gɔmedzenuawo TEX adrɛs gbugbɔ zãna.
- [Vidzikpɔkpɔ ƒe Asitɔtrɔ](/using-zcash/custodial-exchanges): asitɔtrɔ siwo xɔa adrɛs ƒomevi siwo, siwo dome Binance's TEX gadedewo hã le.
- [Gakotokuwo](/using-zcash/wallets): zã TEX Address ƒe ʋuƒoa nàtsɔ adi gakotoku siwo ate ŋu axe TEX adrɛs.
- [Ta Siwo Wotsɔ Akpoxɔnu Wɔe](/using-zcash/shielded-pools): afisi wò ame ŋutɔ ƒe ga si susɔ la nɔa hafi TEX ƒe fetu aɖe ʋua eƒe akpa aɖe doa goe.
- [Amekae Ate Ŋu Akpɔ Wò Zcash Fexexe](/start-here/who-can-see-your-zcash-payment): nusi va dzena ne ga do le ta si ŋu wokpɔ akpoxɔnu le me ko.
- [Nusi Block Explorer Ate Ŋu Akpɔ](/zcash-tech/what-a-block-explorer-can-see): alesi fexexe si me kɔ la dzena le kɔsɔkɔsɔ me.
- [Zcash Fexexe Biabia URIwo](/using-zcash/payment-request-uris): gakotoku ƒe dzidzenu bubu na ga si woxe do ŋgɔ.

**Wotrɔ asi le eŋu zi mamlɛtɔ:** October 2026
