<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zgo_Payment_Processor.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZGo Fexexe ƒe mɔdzɔla [Payment Processor]: Xɔ Zcash Mawo ƒe Asikplɔɖe

ZGo nye fexexe ƒe mɔdzɔla si menye asikplɔ-dzralá o na Zcash. Asiƒlela aɖe fea ZEC tso eya ŋutɔ ƒe gakotoku [wallet] me, ZGo kpɔa Zcash gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu [blockchain] la be gaɖoɖo [transaction] la va me, eye ga la va ɖo dzrɔla la ƒe gakotoku me tẽ to ɣaɣla [shielded] ƒe trɔtrɔ me. ZGo mekplɔa ga la ɖe eƒe asi le mɔa dome o.

Nufiame sia ɖe ale si fexexe ƒe mɔ la wɔa dɔe, ale si nàɖo akɔŋu ɖe anyi, kple ale si nàtsɔ ZGo akpe ɖe Xero kple WooCommerce ŋu. Eɖe vodada eve si wotsɔa va gbãa ɖoɖo ƒe kuxi geɖe le zi gbãtɔ me la hã fia.

## Le axa sia dzi

1. [Nu ka ta nàtsɔ ZGo awɔ dɔ](#why-use-zgo)
2. [Ale si ZGo wɔa dɔe](#how-zgo-works)
3. [Akɔŋu ɖoɖo ɖe anyi](#setting-up-an-account)
4. [ZGo kple Xero](#zgo-with-xero)
5. [ZGo kple WooCommerce](#zgo-with-woocommerce)
6. [Nɔnɔmetatawo](#features)
7. [Vodada siwo dzɔna zi geɖe](#common-mistakes)
8. [Nuƒoƒo](#conclusion)
9. [Nuƒoɖoɖowo](#resources)

## Nu ka ta nàtsɔ ZGo awɔ dɔ

Crypto fexexe ƒe mɔdzɔla geɖewo nye asikplɔ-dzralá [custodial]. Gaawo gblɔa ɖe mɔdzɔla la ƒe akɔŋu me gbã, eye wogblɔa wo na dzrɔla la emegbe, si fia be ame atọ aɖe kpɔa ga la dzi le ɣeyiɣi kpui aɖe me eye ate ŋu aɖe fli na e, aɖe mɔ na e, alo aɖe nya tso eŋu.

ZGo tsɔa mɔ bubu wɔa dɔ. Fexexewo tsoa asiƒlela la ƒe gakotoku me tẽ yi dzrɔla la ƒe gakotoku me to Zcash ɣaɣla gaɖoɖo me. Mɔdzɔla la wɔa invoice la ko eye wòkpɔa blockchain la be wòanye kpekpeɖeŋu. Ga mele ame aɖe ƒe asi le mɔa dome o, gaɖeɖe ƒe mɔ mele o, eye ame atọ aɖeke manɔ si ate ŋu aɖe mɔ na fexexe ƒe nuwuwu o.

Na dzrɔla aɖe, esia fia nu siwo wɔa dɔ le ŋutinya me atọ: asikplɔ bliboa na ZEC siwo va, ɣaɣla gaɖoɖo ƒe ɣaɣla [privacy] le gota, kple mekpɔa ɖe mɔdzɔla ƒe dɔwɔƒe aɖe si nɔa agbe alo si wɔnɔa ga me o.

## Ale si ZGo wɔa dɔe

Fexexe ƒe mɔ la koe le, evɔ be wotsɔ ZGo wɔa dɔ ɖeka, to Xero me, alo to WooCommerce me:

1. Dzrɔla la wɔa fexexe ƒe biabia le ZGo me, si doa eɖe QR code me kple gaƒe, invoice ƒe ID, kple Zcash gaɖoƒe ƒe dzesi [address] si xɔna ga.
2. Asiƒlela la tsɔa Zcash gakotoku skena QR la (Orchard, Sapling, kple Transparent address ƒe ƒomeviwo katã wode asi le WordPress plugin la me) eye wòɖoa fexexe la dzi.
3. Wotsɔa gaɖoɖo la ɖea Zcash network la dzi abe ɣaɣla trɔtrɔ tso asiƒlela la ƒe gakotoku me yi dzrɔla la ƒe gakotoku me ene.
4. ZGo kpɔa Zcash blockchain la be gaɖoɖo la va me.
5. Le kpekpeɖeŋu atɔ̃ megbe, ZGo dea dzesi be fexexe la wu nu eye wòna nyadzɔdzɔ na integration aɖe si wɔa dɔ kplii (Xero, WooCommerce, alo webhook aɖe).

Kpekpeɖeŋu atɔ̃ ƒe seƒoƒo lae nye nọmba vevi la. Nu siawo katã si wɔa va do ŋgɔ na ema nye fexexe si le edzim, menye fexexe si woxɔ o. Nuƒoƒo ƒe dɔwɔwɔ, nudzraɖoɖo ƒe trɔtrɔwo, kple dɔ aɖe si woate ŋu atrɔ o le dzrɔla la ƒe akpa la dzi la ele be woalalala ɖe afɔ 5 dzi.

ZGo wɔa dɔ le browser yeyee aɖe sia aɖe me le desktop alo mobile dzi, eye womedi be nàɖo naneke ɖe anyi le akpa aɖeke o. Asiƒlela la hiã Zcash gakotoku; dzrɔla la hiã Zcash gakotoku kple ZGo akɔŋu.

<img width="672" height="378" alt="ZGo payment request and blockchain monitoring overview" src="/content-images/de50885b-b068-4157-bbda-0981ca23efc8-a00a274776.webp" />

## Akɔŋu ɖoɖo ɖe anyi

Be nàwɔ ZGo akɔŋu la, Zcash gakotoku si me ZEC sue aɖe le la hiã. ZEC ƒe balance sue la xɔa ɖoɖonu dzi [on-chain] ƒe adzɔ [fee] na gaɖoɖo si tsɔa akɔŋu la ƒe gɔmedzedze ɖe anyi. Zcash gakotoku gã aɖe sia aɖe wɔa dɔ na esia; kpɔ [ZecHub Gakotokuwɔwo](https://zechub.wiki/wallets) be nànya amegbe ƒe tiatiawo.

Ɖoɖo veviwo:

1. Ʋu [zgo.cash](https://zgo.cash/) le browser me.
2. Tsɔ Zcash gakotoku si dzrɔla la kpɔa dzi wɔ akɔŋu. Gakotoku sia mele be wòakplɔ keys la. Gatrɔƒe [exchange] ƒe deposit gaɖoƒe ƒe dzesi mate ŋu awɔ dɔ o (kpɔ [Vodada siwo dzɔna zi geɖe](#common-mistakes)).
3. Ɖo gakotoku la ƒe nyateƒenya ɖe afɔ me to gɔmedzedze gaɖoɖo sue la ɖoɖo dzi.
4. Ɖo gaɖoƒe ƒe dzesi si xɔna ga la ɖe anyi. Fexexe gbogbo si woawɔ to akɔŋu sia me la aɖo gakotoku sia me.

Ne akɔŋu la wɔ dɔ vɔ la, dzrɔla ma ke ate ŋu atsɔ ZGo awɔ dɔ na fexexe ɖeka-ɖeka (QR code ɖeka le pop-up nudzraƒe aɖe) alo atsɔ akpe ɖe ɖoɖo si nɔa teɖeŋu aɖe ŋu to Xero alo WooCommerce me.

## ZGo kple Xero

[Xero](https://www.xero.com/) nye accounting ƒe platform le alilikpo me si bizinesi sue kple titina geɖe tsɔa wɔa dɔ. ZGo–Xero ƒe integration la na dzrɔla aɖe mɔ be wòawɔ invoice le Xero me, asiƒlela la nàfe e le ZEC me, eye Xero ade dzesi le invoice la ŋu be wofe ne gaɖoɖo la va me.

Ale si wɔa dɔe:

1. Dzrɔla la wɔa invoice le Xero me abe ale si wònɔa ene.
2. ZGo dea Zcash fexexe ƒe mɔ aɖe ɖe invoice la ŋu.
3. Asiƒlela la fea le ZEC me to eƒe gakotoku me.
4. ZGo kpɔa [Zcash blockchain](https://z.cash/) la be gaɖoɖo la va me.
5. Le kpekpeɖeŋu atɔ̃ megbe, ZGo gblɔa fexexe la ƒe nya ɖo ɖe Xero ŋu, si dea dzesi le invoice la ŋu be nuwo va yi nyuie.

ZEC la ɖoa dzrɔla la ƒe gakotoku me, menye akɔŋu si ZGo alo Xero kpɔa dzi me o. Accounting ƒe rekord le Xero me nɔa ɖeka kple ɖoɖonu dzi ƒe nuwuwu la le eɖokui si.

Na ɖoɖo zi gbãtɔ, wɔ ɖe mɔfia si woɖe ɖe eŋu tɔxɛ dzi: [Xero ƒe Integration Ɖoɖoɖe](https://hedgedoc.vergara.tech/s/4iXC67fmb).

## ZGo kple WooCommerce

Na online shop siwo le [WooCommerce](https://woocommerce.com/) kple [WordPress](https://wordpress.org/) dzi la, ZGo na plugin si woɖe toɖo toɖo. Plugin la tsɔa Zcash dea fexexe ƒe mɔ ene le checkout me eye wòkpɔa order ƒe nɔnɔ le eɖokui si ne fexexe la va me.

<img width="672" height="378" alt="ZGo WooCommerce plugin checkout and order flow" src="/content-images/55a791bb-1947-4f55-b5b9-55083be8ed49-2bc8d2571e.webp" />

Mɔ bliboa le WooCommerce store me:

1. Asiƒlela la va checkout eye wòtia Zcash abe fexexe ƒe mɔ ene.
2. Plugin la wɔa fexexe ƒe biabia eye wòɖea QR code la fia le checkout ƒe axa dzi.
3. Asiƒlela la fea tso eƒe gakotoku me.
4. Gaɖoɖo la ɖea ɖe Zcash network la dzi eye ZGo dzea eƒe kpɔkpɔ gɔme.
5. Le kpekpeɖeŋu atɔ̃ megbe, ZGo gblɔa na plugin la be fexexe la wu nu.
6. Plugin la dea dzesi be WooCommerce order la wofe eye wòtrɔa order ƒe database la.

Order la nye wofe ko ne afɔ 6 wu nu. Nɔnɔ siwo va do ŋgɔ na ema (broadcast, kpekpeɖeŋu gbãtɔwo) ate ŋu woaɖe afia asiƒlela la be "Woxɔ fexexe, miŋlɔa kpekpeɖeŋu laŋu," gake nudzraɖoɖo, nuƒoƒo ƒe dɔwɔwɔ, kple automation siwo katã va emegbe la ele be woalalala ɖe nɔnɔ mamlɛtɔ la dzi.

Plugin la hã ɖoa ɖoɖowo ƒuƒopé [dashboard] ƒe dɔdzikpɔƒe aɖe ɖe WordPress me, afi si dzrɔla la ate ŋu akpɔ orderwo kple ZEC fexexe siwo va le WooCommerce order ƒe nukpɔkpɔ kawaida la gbɔ. Plugin la de asi le Zcash gaɖoƒe ƒe dzesi ƒomevi yeyewo katã me: Orchard, Sapling, kple Transparent. Asiƒlela siwo katã tsɔa gakotoku si dze ɖoɖo la ŋu la ate ŋu awu gaɖoɖo la nu.

## Nɔnɔmetatawo

**Menye asikplɔ-dzralá o.** Fexexewo tsoa asiƒlela la ƒe gakotoku me tẽ yi dzrɔla la ƒe gakotoku me to ɣaɣla gaɖoɖowo me. ZGo mekplɔa gaawo ɖe eƒe asi le mɔa dome o, eye dzrɔla la kpɔa gaawo dzi blibo le ɣeyiɣi sia katã.

**Dɔwɔƒe si ate ŋu atrɔ.** Wòate ŋu atsɔ ZGo awɔ dɔ na fiẽ ɖeka le pop-up market aɖe, na point-of-sale ɖoɖo si nɔa teɖeŋu, alo abe backend na online store aɖe to Xero alo WooCommerce ƒe integrations me.

**Browser-dzi.** Ɖoɖo mele asiƒlela la alo dzrɔla la ƒe akpa aɖeke o. ZGo wɔa dɔ le browser yeyee aɖe sia aɖe me le desktop alo mobile dzi.

**Gakotoku ƒe dzeɖoɖo.** Zcash gakotoku gãwo, esiwo de asi le Orchard, Sapling, kple Transparent address ƒe ƒomeviwo me la, ate ŋu afe ZGo invoice aɖe ne asiƒlela la ƒe akpa la medi ɖoɖo bubu o.

**Integrationwo.** Integration tẽwo kple Xero (accounting) kple WooCommerce (e-commerce) kpɔa dzrɔla ƒe dɔwɔmɔ siwo bɔbɔe wu la eve katã gbɔ enumake.

## Vodada siwo dzɔna zi geɖe

**Mìebu order la be wofe hafi kpekpeɖeŋu atɔ̃ va.** Gaɖoɖo si woɖe ɖe network la dzi menye fexexe si wòva me kple edzi o. Gaɖoɖo la ate ŋu magava me o alo woate ŋu atrɔe. Le kpekpeɖeŋu atɔ̃ megbe ko ZGo gblɔa be fexexe la wu nu, eye emegbe ko woate ŋu ade dzesi be order la wofe le dɔ siwo va emegbe la me. Ne dzrɔla aɖe ɖoa nudzraɖoɖo alo nuƒoƒo ƒe dɔwɔwɔ ɖe anyi be woadze egɔme le broadcast ƒe nudzɔdzɔ la dzi la, fexexe aɖe si nye alakpa alo si va me o awɔ be woadzo nu vavã.

**Mìɖo ZGo ɖe gatrɔƒe ƒe deposit gaɖoƒe ƒe dzesi ŋu.** Eɖi abe Zcash gaɖoƒe ƒe dzesi ene, gake gatrɔƒe ƒe deposit gaɖoƒe ƒe dzesiwo le gatrɔƒe la ƒe asi, menye dzrɔla la ƒe asi o. Gatrɔƒe la kpɔa keys la dzi, si fia be gatrɔƒe la kpɔa gaawo hã dzi, si tsɔa ta si wowɔ mɔdzɔla si menye asikplɔ-dzralá o la ɖa ɖe aga. Gakotoku ƒe gaɖoƒe ƒe dzesi si woɖoa ɖe anyi le ZGo me la mele be wòanye gakotoku si dzrɔla la ŋutɔ kpɔa eƒe gadzraɖoɖi nya [seed phrase] dzi.

**Mìetsɔ ZGo be gakotoku.** ZGo nye fexexe ƒe mɔdzɔla, menye gakotoku o. Mekpɔa keys ɖe anyi o, mekplɔa balancewo ɖe eƒe asi o, eye mena mɔ dzrɔla la be wòatsɔ ga aɖeke aɖo o. Zcash gakotoku bubu si dzrɔla la kpɔa dzi la hiã be wòaxɔ ga si ZGo ɖoa mɔ na la.

## Nuƒoƒo

ZGo naa mɔ dzrɔlawo be woaxɔ Zcash ƒe fexexewo ne womade asi le woƒe asikplɔ me o, ne wometsɔ wɔnɔa ame aɖe ŋu o, eye ne wometsɔa gaɖoɖo ƒe nyawo dea ɖe ɖoɖonu si nye dukɔ ƒe tɔ kple nuwo ƒe ʋuʋuɖi [transparent] la dzi o. Integration eve la (Xero kple WooCommerce) kpɔa dzrɔla ƒe dɔwɔmɔ siwo bɔbɔe wu la gbɔ; na nu bubuwo katã, wòate ŋu atsɔ ZGo awɔ dɔ ɖeka tso browser aɖe sia aɖe me.

Na ɖoɖo, mɔ la mekpɔ o: xɔ Zcash gakotoku, wɔ akɔŋu le [zgo.cash](https://zgo.cash/), eye dze fexexe ƒe biabiawo wɔwɔ gɔme tẽ alo ɖo integration si dze egɔme la ɖe anyi.

## Nuƒoɖoɖowo

- [ZGo ƒe nyatakakadzraƒe vevitɔ](https://zgo.cash/)
- [Xero ƒe Integration Ɖoɖoɖe ƒe mɔfia](https://hedgedoc.vergara.tech/s/4iXC67fmb)
- [WooCommerce](https://woocommerce.com/) kple [WordPress](https://wordpress.org/)
- [Xero](https://www.xero.com/)
- [Zcash ƒe dɔa ƒe home page](https://z.cash/)
- [ZecHub Gakotokuwɔwo](https://zechub.wiki/wallets), gakotoku Zcash siwo dze egɔme la ƒe xexlẽme
- [ZecHub Fexexe ƒe Mɔdzɔlawo ƒe nukpɔkpɔ](https://zechub.wiki/payment-processors), ZGo le Zcash ƒe fexexe ƒe tiatia bubuwo ƒe nɔnɔme
- [BTCPayServer Zcash Plugin](https://zechub.wiki/guides/btcpayserver-zcash-plugin), ZecHub ƒe mɔfia si do ŋgɔ na tiatia si wòŋutɔ nàkpɔa dzi
