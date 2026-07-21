<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zgo_Payment_Processor.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Olùṣiṣẹ́ Ìsanwó ZGo: Gbígba Zcash Láìsí Ìtọ́jú

ZGo jẹ́ ètò ìsanwó tí kì í ṣe ti ìpamọ́ fún Zcash. Oníbàárà kan máa ń sanwó ní ZEC láti inú àpò owó tirẹ̀, ZGo máa ń tọ́jú ìsopọ̀ ìsọ̀rí Zcash fún ìnáwó náà, owó náà sì máa ń wọlé tààrà sí àpò oníṣòwò náà nípasẹ̀ ìyàsọ́tọ̀ tí a fi ààbò pamọ́.

This guide explains how the payment flow works, how to set up an account, and how to integrate ZGo with Xero and WooCommerce. It also covers the two mistakes that cause most first-time setup problems.

## Ní ojú ewé yìí

1. [Kí ló dé tó o fi lo ZGo](#why-use-zgo)
2. [Báwo ni ZGo ṣe ń ṣiṣẹ́](#how-zgo-works)
3. [Lí ṣí àkáǹtì](#setting-up-an-account)
4. [Jáde pẹ̀lú Xero](#zgo-with-xero)
5. [ZGo pẹlu WooCommerce](#zgo-with-woocommerce)
6. [Àwọn Ànímọ́](#features)
7. [Àwọn àṣìṣe tó wọ́pọ̀](#common-mistakes)
8. [Ìparí Àlàyé]](#conclusion)
9. [Àwọn ohun àmúṣọrọ̀](#resources)

## Ìdí tí a fi ń lo ZGo

Pupọ julọ awọn oniṣẹ isanwo cryptocurrency jẹ idaduro. Awọn owo akọkọ ni ilẹ ni akọọlẹ ti oniṣẹ naa ati pe a firanṣẹ si oniṣowo nigbamii, eyiti o tumọ si ẹgbẹ kẹta kan ṣakoso owo naa fun igba diẹ ati pe o le ṣe igbaduro, pẹ, tabi royin lori rẹ.

ZGo takes the opposite approach. Payments move from the customer's wallet directly to the merchant's wallet through a Zcash shielded transaction. The processor only generates the invoice and watches the blockchain for confirmation. There is no intermediary balance, no withdrawal flow, and no third party that can hold up settlement.

For a merchant, this means three practical things: full custody of incoming ZEC, shielded transaction privacy by default, and no dependency on a centralized provider staying online or solvent.

## Bí ZGo ṣe ń ṣiṣẹ́

Owo sisan jẹ kanna laibikita boya a lo ZGo ni iduro, nipasẹ Xero, tabi nipasẹ WooCommerce:

1. Onisowo naa n ṣe igbasilẹ ibeere sisan ni ZGo, eyi ti o ṣe bi koodu QR pẹlu iye, ID iwe-owo, ati adirẹsi gbigba Zcash.
2. Oníbàárà náà yóò fi àpò Zcash (Orchard, Sapling, àti àwọn oríṣi adirẹsi Transparent ni gbogbo wọn ni a ṣe atilẹyin lori ohun itanna WordPress) sì fọwọ́ sí ìsanwó.
3. Iṣowo naa ni igbohunsafefe si nẹtiwọọki Zcash bi gbigbe gbigbe lati apamọwọ alabara si apamọwọ oniṣowo.
4. ZGo n ṣetọju blockchain Zcash fun iṣowo naa.
5. Lẹ́yìn ìdánilójú márùn-ún, ZGo máa ń fi àmì sí ìsanwó náà gẹ́gẹ́ bí èyí tí ó parí, yóò sì sọ fún ọ nípa ìsowọ́pọ̀ tí ó bá ti so (Xero, WooCommerce, tàbí webhook).

The five-confirmation threshold is the key number. Anything earlier is a payment in progress, not a payment received. Order fulfilment, inventory updates, and any irreversible action on the merchant side should wait for step 5.

ZGo n ṣiṣẹ ni eyikeyi aṣàwákiri igbalode lori tabili tabi alagbeka, laisi fifi sori ẹrọ ni ẹgbẹ mejeeji. Onibara nilo apamọwọ Zcash; oniṣowo nilo apamọ Zcash ati akọọlẹ ZGo kan.

<img width="672" height="378" alt="ZGo payment request and blockchain monitoring overview" src="https://github.com/user-attachments/assets/de50885b-b068-4157-bbda-0981ca23efc8" />

## Ṣíṣíṣe àkọọ́lẹ̀

Lati ṣẹda akọọlẹ ZGo, a nilo apamọwọ Zcash pẹlu iye kekere ti ZEC. Idaduro kekere ZEC bo idiyele on-chain fun idunadura iṣowo-akọkọ. Eyikeyi apamọwọ pataki Zcash ṣiṣẹ fun eyi; wo [ZecHub Wallets](https://zechub.wiki/wallets) fún àwọn ohun tí ó wà nílẹ̀.

Ìtòlẹ́sẹẹsẹ ìpilẹ̀ṣẹ̀:

1. Ṣíṣí [zgo.cash](https://zgo.cash/) nínú aṣàwákiri.
2. Ṣẹda akọọlẹ kan nipa lilo apamọwọ Zcash labẹ iṣakoso ti oniṣowo. apamọwọ yii gbọdọ tọju awọn bọtini. adirẹsi idogo paṣipaarọ kii yoo ṣiṣẹ (wo [Awọn aṣiṣe ti o wọpọ](#common-mistakes)).
3. Fọwọsi apamọwọ nipa fifiranṣẹ iṣowo ibẹrẹ kekere.
4. Ṣeto adirẹsi ti o gba. Gbogbo owo sisan ti a ṣe nipasẹ akọọlẹ yii yoo de inu apamọwọ yii.

Lọgan ti akọọlẹ naa ba ti ṣiṣẹ, oniṣowo kanna le lo ZGo fun awọn sisanwo ẹẹkan (koodu QR kan ṣoṣo ni iṣẹlẹ pop-up) tabi fi okun si iṣeto titilai nipasẹ Xero tabi WooCommerce.

## ZGo pẹ̀lú Xero

[Xero](https://www.xero.com/) ZGoXero jẹ pẹpẹ iṣiro awọsanma ti a lo nipasẹ ọpọlọpọ awọn iṣowo kekere ati alabọde. Integration ZGo  Xero jẹ ki oniṣowo kan gbe iwe-owo kan jade ni Xero, jẹ ki alabara sanwo rẹ ni ZEC, ati pe Xero ṣe aami laifọwọyi iwe-iṣowo naa bi o ti sanwo ni kete ti idunadura naa ba jẹrisi.

Bí ó ṣe ń ṣiṣẹ́:

1. Oníṣòwò náà yóò ṣe àkáǹtì ìnáwó ní Xero bí ó ti máa ń ṣe.
2. ZGo ṣe àfikún ètò ìsanwó Zcash sí ìwé-ìṣírò náà.
3. Àwọn oníbàárà máa ń sanwó wọn ní ZEC láti inú àpò wọn.
4. ZGo n ṣetọju awọn [Zcash blockchain](https://z.cash/) fún ìnáwó náà.
5. Lẹ́yìn ìdánilójú márùn-ún, ZGo sọ owó náà padà fún Xero, èyí tí ó fi àmì sí àkáǹtì náà gẹ́gẹ́ bí èyí tí a san.

The ZEC lands in the merchant's wallet, not in any ZGo-controlled or Xero-controlled account. The accounting record in Xero stays in sync with the on-chain settlement automatically.

Fun iṣeto akoko akọkọ, tẹle igbesẹ ti a ṣe pataki: [Awọn iṣeto Integration Xero](https://hedgedoc.vergara.tech/s/4iXC67fmb).

## ZGo pẹlu WooCommerce

Fun awọn ile itaja ori ayelujara ti n ṣiṣẹ lori [WooCommerce](https://woocommerce.com/) àti [WordPress](https://wordpress.org/), ZGo pese ohun itanna ti a ṣe iyasọtọ. Ohun itanna naa ṣafikun Zcash bi ọna isanwo ni iṣayẹwo ati mu ipo aṣẹ ṣiṣẹ laifọwọyi nigbati isanwo ba jẹrisi.

<img width="672" height="378" alt="ZGo WooCommerce plugin checkout and order flow" src="https://github.com/user-attachments/assets/55a791bb-1947-4f55-b5b9-55083be8ed49" />

Ìṣàn láti òpin dé òpin nínú ilé ìtajà WooCommerce:

1. Onibara naa de ibi iforukọsilẹ ati yan Zcash gẹgẹbi ọna isanwo.
2. Àfikún náà máa ń ṣe ìforúkọsílẹ̀ owó tí yóò sì fi kóòdì QR hàn ní ojúewé ìsanwó.
3. Àwọn oníbàárà ló máa ń sanwó wọn.
4. Ìṣirò náà máa ń tàn dé orí ẹ̀rọ Zcash tí ZGo á sì bẹ̀rẹ̀ sí ṣe àyẹ̀wò rẹ̀.
5. Lẹ́yìn ìdánilójú márùn-ún, ZGo ròyìn ìsanwó náà gẹ́gẹ́ bí ìkẹyìn sí àfikún náà.
6. Àfikún náà ń fi àmì àṣẹ WooCommerce hàn gẹ́gẹ́ bí ẹni tí ó sanwó, ó sì ń ṣe àtúnṣe sí ìpamọ́ àṣẹ.

Aago ti a san nikan nigbati igbesẹ 6 pari. Awọn ipo iṣaaju (itankalẹ, awọn ijẹrisi akọkọ) le han si alabara bi "owo ti o gba, nduro ijẹri", ṣugbọn akojopo, imuse, ati eyikeyi adaṣiṣẹ isalẹ yẹ ki o duro fun ipinle ikẹhin.

The plugin also installs an administrative dashboard inside WordPress, where the merchant can monitor orders and incoming ZEC payments alongside the normal WooCommerce order view. The plugin supports all current Zcash address types: Orchard, Sapling, and Transparent. Customers paying from any compliant wallet can complete the transaction.

## Àwọn Ànímọ́

**Non-custodial.** Awọn sisanwo n gbe taara lati apamọwọ ti alabara si apamọwọ oniṣowo nipasẹ awọn iṣowo aabo. ZGo ko ni awọn owo laarin, ati pe onijaja n ṣetọju iṣakoso kikun jakejado.

** Ifilọlẹ irọrun.** ZGo le ṣee lo fun ọsan kan ni ọja pop-up kan, fun iṣeto aaye tita to wa titilai, tabi bi ẹhin fun ile itaja ori ayelujara nipasẹ awọn iṣọpọ Xero tabi WooCommerce.

**Base lori aṣàwákiri.** Ko si fifi sori ẹrọ lori boya awọn onibara tabi awọn oniṣowo ẹgbẹ. ZGo ṣiṣe ni eyikeyi igbalode browser lori deskitọpu tabi mobile.

**Wallet compatibility.** Major Zcash wallets, including those supporting Orchard, Sapling, and Transparent address types, can pay a ZGo invoice without extra configuration on the customer's side.

**Awọn isopọpọ.** Awọn isopọmọ taara pẹlu Xero (iṣiro) ati WooCommerce (e-commerce) bo awọn ṣiṣan iṣẹ oniṣowo meji ti o wọpọ julọ lati inu apoti naa.

## Àwọn àṣìṣe tó wọ́pọ̀

**Treating the order as paid before five confirmations.** A broadcast transaction is not the same as a confirmed payment. The transaction can still fail to confirm or be replaced. Only after five confirmations does ZGo report the payment as final, and only then should the order be marked paid downstream. If a merchant configures inventory or fulfilment to trigger on the broadcast event, fraudulent or failed payments will cause real losses.

**Pointing ZGo at an exchange deposit address.** It looks like a Zcash address, but exchange deposit addresses are controlled by the exchange, not the merchant. The exchange holds the keys, which means the exchange holds the funds, which defeats the reason for using a non-custodial processor. The wallet address configured in ZGo must be a wallet whose seed phrase the merchant controls directly.

ZGo jẹ ẹrọ ṣiṣe owo sisan, kii ṣe apamọwọ kan. Ko tọju awọn bọtini, tọju iyokù, tabi jẹ ki oniṣowo lo awọn owo. Iwe apamọwọ Zcash ti o ya sọtọ labẹ iṣakoso onijaja ni a nilo lati gba owo ti ZGo routes.

## Ìparí

ZGo gives merchants a way to accept Zcash payments without giving up custody, without depending on an intermediary, and without exposing transaction details on a public chain. The two integrations (Xero and WooCommerce) cover the most common merchant workflows; for everything else, ZGo can be used standalone from any browser.

Fun iṣeto, ọna naa kuru: gba apamọwọ Zcash, ṣẹda akọọlẹ kan ni [zgo.cash](https://zgo.cash/), ki o si bẹrẹ lati ṣe ipilẹṣẹ awọn ibeere isanwo taara tabi fi sori ẹrọ isopọmọ ti o yẹ.

## Àwọn ohun àmúṣọrọ̀

- [Ìkànnì àjọ ZGo](https://zgo.cash/)
- [Xero Integration Configuration walkthrough] Àwọn àlàyé tó ṣe pàtàkì](https://hedgedoc.vergara.tech/s/4iXC67fmb)
- [WooCommerce] [ì í ì ¤í ë ¤]](https://woocommerce.com/) àti [WordPress](https://wordpress.org/)
- [Xero](https://www.xero.com/)
- [Ojúewé ìkànnì iṣẹ́ Zcash](https://z.cash/)
- [Àwọn Wàléètì ZecHub](https://zechub.wiki/wallets), akojọ awọn apamọwọ Zcash ti o ni ibamu
- [Àkópòsí àwọn Ẹ̀rọ Ìṣiṣẹ́ Ìsanwó ZecHub]](https://zechub.wiki/payment-processors), ZGo nínú ìtumọ̀ àwọn ètò ìsanwó Zcash mìíràn
- [BTCPayServer Zcash Àfikún](https://zechub.wiki/guides/btcpayserver-zcash-plugin), itọsọna ZecHub ti o ni ibatan fun yiyan ti o gbalejo ara ẹni
