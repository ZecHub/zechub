<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Processors.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Àwọn Ẹ̀rọ Ìṣiṣẹ́ Ètò Owó-ìsan Zcash

Awọn ọna lati gba ZEC gẹgẹbi oniṣowo, ti a ṣe afiwe lẹgbẹẹ. Gbogbo titẹsi ni o ṣayẹwo pẹlu aaye ati API olupese naa lori ** 29 Keje 2026** .

Atilẹyin fun awọn ohun-ini aṣiri yipada nigbagbogbo, nitorina ila kọọkan ni ọjọ idanwo tirẹ. Ti o ba n ka eyi lẹhin osu diẹ, ṣayẹwo aaye ti olupese ṣaaju ki o to ṣepọ.

<div class="processor-table">

| Processor | Custody | Shielded ZEC | Self-host | Merchant fee | Regions / KYC | Verified |
|:--|:--|:--|:--|:--|:--|:--|
[Ìdánilójú owó ẹyọ]](https://www.cipherpay.app)  Kò sí ìpamọ́. Bẹẹni, Orchard nipasẹ Adirẹsi Aṣọpọ̀ Bẹẹ ni, orisun ṣiṣi 1% fun owo sisan kan, ọfẹ ti o ba jẹ pe ara ẹni gbalejo rẹ Ko si KYC, awọn agbegbe ko sọ 2026-07-29
[Àgbàlá Bitcoin Pay]](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)  Kò sí ìpamọ́, wíwo kókó nìkan. Bẹẹni, ààbò nikan (Sapling, Orchard, UA) Bẹ̀ ni, orísun ìmọ̀-ìmọ̀. Rárá o, ẹ san owó nẹtiwọki nìkan. Àgbáyé, kò ní KYC 2026-07-29
[Máa lọ.](https://zgo.cash/) | Non-custodial | Yes, Sapling and Orchard | No, hosted service | Prepaid session, price not published | No KYC stated, regions not stated | 2026-07-29 |
[Àtúnṣe ojú ìwé]](https://flexa.co/) ☐ Owó tí àwọn oníbàárà fi sí àkáǹtì, owó ti òwò náà sì ń san ní ẹ̀rọ fiat. Àwọn oníbààrọ́ máa ń ná nǹkan láìsí ìdìbò kankan lórí rẹ̀, ẹni tó bá gbà á kò rí ìwé-ìwé kan nínú rẹ̀. Kò sí 1% fún gbogbo iye tí wọ́n bá ta. Orílẹ̀ èdè Amẹrika àti 37 lára àwọn orílẹ̀-èdè SEPA, ZEC ni EU a kò fìdí múlẹ̀ 2026-07-29
[ÌFÍN Ìpèsè]](https://nowpayments.io/supported-coins/zcash-payments)  Kò sí ìpamọ́ ní àṣeparí. Rárá, àdírẹ́sì tí ó ṣe kedere nìkan ni o wà. Ko si 0.5%, tabi 1% pẹ̀lú iyipada. Gbogbogbo ayafi ibi ti a fi òfin dè é, kò sí KYC láti bẹ̀rẹ̀ 2026-07-29
[Plisio] Èmi náà ń ṣe é.](https://plisio.net/accept-zcash) | Custodial, despite marketing | Not documented | No | 0.5% API, 1.5% white label | No KYC to receive | 2026-07-29 |
[Binance Pay] Ẹ jẹ́ kí á máa bá a lọ.](https://pay.binance.com/en) | Custodial, off-chain | No, shielded deposits rejected | No | Free wallet to wallet, 0.8% payouts | Geo-restricted, ZEC delisted in FR, ES, IT, PL | 2026-07-29 |

</div>

### Ohun tí àwọn òpó náà túmọ̀ sí ni pé:

**Ìkáàbò** ni bóyá ẹ̀rọ náà ní ZEC rẹ. tí kò bá sí ìkáàbò túmọ̀ si pé ó lọ sínú àpò-ìpamọ́ tóo ń darí.

**Shielded ZEC** ni boya o le sanwo sinu adagun-odo ti a fi bo. Transparent nikan tumọ si iye ati awọn adirẹsi jẹ gbangba lori blockchain naa.

** Self-host** ni boya o le ṣiṣe awọn software ara rẹ, pẹlu ko si ile ise ninu arin.

**Owó oníṣòwò** kò ní àwọn owó ẹ̀rọ Zcash, tí ẹnìkan ń san nínú gbogbo ọ̀ràn.

Níbi tí olùpèsè kò bá ti tẹ nǹkan kan jáde, àkọsílẹ̀ náà sọ pé "kò wí" tàbí "kì í ṣe ìwé-ìwé", dípò kí ó máa rò. Èyí kì í ṣe ohun tó jọ "bẹ́ẹ̀ kọ́".

### Èwo ni kó o yàn?

Fun aṣiri ati iṣakoso ti o pọ julọ, lo ** BTCPay Server** tabi a-ara ẹni ni alejo gbigba ** CipherPay. Awọn mejeeji jẹ aabo, orisun ṣiṣi, ko si awọn owo fun ọ.

Tó o bá fẹ́ gba owó ní ilé ìtajà dípò orí ayélujára, lo **Flexa**.

Fun ẹnu-ọna ti o gbalejo nibiti awọn sisanwo ṣiṣanwọle ṣe itẹlọrun, lo ** NOWPayments** tabi ** Plisio.

ìkìlọ̀ kan tó yẹ kí a tún sọ: olùṣiṣẹ́ tí ó jẹ́ aláyọjú nìkan máa ń tẹ iye owó àti àdírẹ́sì gbogbo àsanwó jáde lórí ẹ̀rọ-ìpínlẹ̀. pẹlú àwọn oníṣẹ́ ìṣọ́ ti kò ní alábòójútó, o fi kókó wíwo rẹ sílẹ̀ fún ilé iṣẹ́ náà láti rí i bí wọ́n bá ṣe san án bó tilẹ̀ jẹ pé wọn ò lè ná an. gbígbé ara ẹni ni ọ̀nà kan ṣoṣo lati yàgò fún èyí.

<div class="processor-note">

** ìkìlọ̀ iṣẹ́ ZGo, 29 July 2026.** Ìsọlẹyìn ZGo ní api.zgo.cash dá HTTP 503 padà lórí gbogbo àwọn àlàfo nígbà tí ojúewé yìí ń yẹra wò. Àkànṣe náà kò ti jáwọ́ àti olùtọjú rẹ̀ wà nínú ìgbòkègbodò láwùjọ oṣù yìí, ṣùgbọ́n rí i dájú pé ètò náà n ṣiṣẹ kí o tó gbára lé e.

</div>

---

## [CipherPay](https://www.cipherpay.app) <img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" class="processor-logo" />
- **Irú ìtìlẹyìn**: Aṣọ́ (Orchard, nípasẹ̀ Adirẹsi Àjọṣe)
- Àpèjúwe: Gbígba Zcash ní ìṣẹ́jú, Kò sí ààbò, kò si oníbàárà kankan tí ó mọ̀ nípa rẹ̀, kò sì sí alákọ̀wé.
- ** URL**: [CipherPay] (ì í ì ë¡ ê°)](https://www.cipherpay.app)
<img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" width="200" hidden />

O fún CipherPay ní kókó tí o lè rí nìkan, kí owó náà sì lọ sí àpamọ́ rẹ kò fi gba àwọn ìnáwó kankan. Ó máa ń lo àdírésì tuntun fún gbogbo ìwé-ìwé ọ̀fẹ́.

Orchard only. There is no Sapling or transparent support, even though the repository README mentions Sapling.

O jẹ 1% fun isanwo, ati pe ko si nkankan ti o ba ṣiṣẹ ni ara rẹ. Gbogbo ohun naa wa ni orisun ṣiṣi, bi Rust alakomeji pẹlu SQLite tabi gẹgẹbi aworan Docker. Ko si KYC, ati awọn olutaja ko nilo akọọlẹ kan.

Àwọn ìsowọ́pọ̀ náà ní Shopify, WooCommerce, REST API kan, àtìlẹyìn tí a gbalejo, àwọn ìjápọ̀ owó-sanwó àti QR ẹni.

ohun méjì láti gbé yẹ̀ wò. ó ti jáde ní oṣù kejì ọdún 2026 kò sì sí àyẹ̀wò ìpamọ́ tí a tẹ̀ jáde. àti lórí ipele onílé, òsìsẹ́ ń mú kókó wíwo rẹ lọ́wọ́ kí ó lè rí àwọn owó ọ̀fẹ́ rẹ. gbígbé ara ẹni kúrò nínú èyí. iye owo tó wà lábẹ́ ìdènà náà jẹ́ ìkẹyìn pẹ̀lú, nítorí náà èrè padà nílò pé kí olùrajà fún ẹ ní àdírẹ́sì kan. bí o bá ṣe é ni, ìwọ yóò gba gbogbo owó yìí láìṣe ohunkóhun mìíràn ju dídáwó sílẹ̀ lọ. ṣùgbọ́n nígbàtí wọ́n bá fi kọǹpútà ránṣẹ

** Àtúnyẹ̀wò ìkẹyìn:** 2026-07-29

---

## [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) <img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" class="processor-logo" />
- **Irú ìtìlẹyìn**: Aṣọ́ nìkan (Sapling, Orchard, Unified Address)
- **Àpèjúwe**: BTCPay Server jẹ àlẹmọ̀ ìmọ, ti ara-gbalejo cryptocurrency owo isise.
- ** URL**: [Oríṣiṣẹ́ BTCPay]](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
<img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" width="200" hidden />

Àṣàyàn tó lágbára jùlọ lórí ìpamọ́. Ìsọ̀rí àpò-ìwé rẹ jẹ wíwo nìkan, kò sì ní irúgbìn tàbí kókó àṣírí kankan, nítorí náà kódà àwọn olùgbàrá tí wọ́n ti ṣe jàǹbá ò lè ná owó yín.

Aṣọ́ nìkan, tó bo Sapling, Orchard àti Adirẹsi Àjọpọ̀. Kò sí ààbò tí ó ṣe kedere, nítorí náà má ṣètò ní ìtòsí ẹyọ kan.

Lati fi sori ẹrọ o nilo btcpay-zcash Docker forklift lori feat/zec ẹka, pẹlu bọtini wiwo ti a gbe jade lati apamọwọ kan bii Ywallet tabi Zingo. Nipa aiyipada o ba sọrọ si lightwalletd latọna jijin, tabi o le ṣiṣe Zebra ati lightwallettd funrararẹ .

Ìdánwò kan láti mọ̀ nípa: àfikún náà ńlo apamọwọ Zcash kan fún gbogbo ilé ìtajà lórí ẹyọ, nítorí náà má ṣe fi ṣiṣẹ́ ní orí àwọn ohun-èlò tí a pín. Àwòrán owó onílé-ìjàtà ni wọ́n ti n ṣiṣẹ́ lé e lọ́wọ́ báyìí.

Kò sí owó fún ẹ̀rọ náà fúnra rẹ. O sanwó ìsopọ́ Zcash àti ohunkóhun tí ó jẹ mọ́ àtìlégbé yín.

** Àtúnyẹ̀wò ìkẹyìn:** 2026-07-29

---

## [ZGo](https://zgo.cash/) <img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" class="processor-logo" />
- **Support Type**: Shielded (Sapling and Orchard)
- **Àpèjúwe**: ZGo jẹ́ ètò ìsanwó orí ẹ̀rọ tí ó ń lọ tààrà láti ọ̀dọ̀ oníbàárà rẹ sí ìwọ, láìsí ẹnikẹta tó wà nídìí.
- ** URL**: [ZGo]](https://zgo.cash/)
<img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" width="200" hidden />

A till o ṣiṣe ni a aṣàwákiri, ki kan laptop, tabulẹti tabi foonu di awọn owo. nibẹ jẹ tun ohun WooCommerce afikun ati REST API. ti wa ni itumọ nipasẹ Vergara Technologies ati fifun nipa Zcash Community Grants, pẹlu awọn gbigbe lati zcashd to Zebra .

Owó náà á wá máa lọ látọ̀dọ̀ oníbàárà rẹ, ó sì máa wà ní àpamọ́ra. Kò séèyàn tó lè ṣe bẹ́ẹ̀.

Shielded, covering Sapling and Orchard through Unified Addresses, and it follows ZIP 321. No current source says it handles transparent addresses, so this page no longer claims that it does.

O ko le ṣe adani ara rẹ. ZGo nṣiṣẹ awọn amayederun Zcash fun ọ ati pe o tẹjade itọsọna iṣafihan kankan. orisun naa jẹ gbangba lori olupin Git ti olutọju, botilẹjẹpe eniyan daakọ GitLab nigbagbogbo rii ni digi 2022 kan.

Kò sí ìnáwó kankan. ZGo ń ta àwọn ìpàdé tí wọ́n ti san owó fún tẹ̀lẹ̀, ó sì nílò àpérò Pro fun WooCommerce, ṣùgbọ́n ojúewé iye owo kò ṣeé dé nísinsìnyí, nítorí náà a ò sọ iye kan lórí rẹ̀.

** Àtúnyẹ̀wò ìkẹyìn:** 2026-07-29

---

## [Flexa](https://flexa.co/) <img src="/content-images/flexa-mark.png" alt="Flexa logo" class="processor-logo" />
- **Irú ìtìlẹyìn**: Àwọn oníbàárà ń náwó láìsí ààbò, àwọn tó gba owó náà kò ní ìwé-ìwé kankan.
- **Àpèjúwe**: Flexa jẹ́ àkànṣe ìsanwó tí ó ń jé kí àwọn oníbàárà ná owó orí, títí kan Zcash ní ilé-ìtajà láti inú apamọwọ ti ara ẹni.
- ** URL**: [Flexa ì í ë ¤ì 'í ̧ë¦¬ê° êμ¬]](https://flexa.co/)
<img src="/content-images/flexa-mark.png" alt="Flexa logo" width="200" hidden />

Flexa kìí ṣe àyè ìsanwó, nítorí náà kì í se pàṣípààrọ̀ fún àwọn yòókù níbí. Olówò ṣí apamọwọ tí ó jẹ́ kí Flexa ṣiṣẹ bí Zodl, fi kóòdì ìgbà kan hàn, ilé-ìtajà sì ṣàyẹ̀wò rẹ̀. Kò sí ìwé owó ZEC àti kò sí ohun èlò e-commerce kankan.

àwọn oníbàárà máa ń ní owó ẹyọ wọn títí tí wọ́n á fi sanwó. ìwọ gẹ́gẹ́ bí oníṣòwò kò rí ZEC gbà rárá. flexa yóò bá ọ yan owó náà, nítorí náà ọwọ́ rẹ ni a ó sì gbé apá ti crypto sí.

Flexa's own announcement describes the Zcash integration as paying with shielded ZEC. Ohun ti adirẹsi iru gba to Flexa ni ko si ibi kan wa atejade.

Owó náà jẹ 1% fún ìsanwó kan, tí a fi àyípadà àti ìṣọ́ sí láìṣe pé ó ní owó tó ń wọlé.

O ṣiṣẹ ni Amẹrika ati, lati Oṣu Keje ọdun 2026, ni awọn orilẹ-ede 37 SEPA ati agbegbe. Boya ZEC le ṣee lo paapaa ni Yuroopu ko sọ.

** Àtúnyẹ̀wò ìkẹyìn:** 2026-07-29

---

## [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) <img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" class="processor-logo processor-logo-wide" />
- **Irú ìtìlẹyìn**: Ìríjú nìkan ni.
- **Àpèjúwe**: NOWPayments jẹ́ ẹnu ọ̀nà ìsanwó crypto tí ó fún àwọn oníṣòwò láàyè láti gba owó Zcash àti ọrẹ ni rọọrun.
- **URL**: [NÍGBÀYínà àwọn ìsanwó]](https://nowpayments.io/supported-coins/zcash-payments)
<img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" width="200" hidden />

Ko si atilẹyin aabo. iwe aṣẹ wọn sọ fun ọ lati ṣeto adirẹsi ṣiṣanwọle kan fun Zcash, ati pe ZEC nikan ni owo ti wọn yan ọna yẹn. gbogbo isanwo ti o gba jẹ gbangba lori blockchain.

Ko si ààbò nípasẹ̀ ìpilẹ̀ṣẹ. FAQ wọn sọ pé àwọn kò fi owó pamọ́ àti wípé wọn kì í kókó ìdánilójú mọ́ rárá. Àṣedégbé àbò wà láìsí ìdí, nítorí náà ṣayẹwo ètò àkọsílẹ̀ rẹ bí o bá fẹ láti dá ara ẹ lójú.

Fees are 0.5% for a straight payment, or 1% for multi-currency, fixed-rate, or "fee paid by user" payments, with network fees on top.

O ko nilo KYC lati bẹrẹ gbigba crypto, nikan lati yọ owo fiat.

** Àtúnyẹ̀wò ìkẹyìn:** 2026-07-29

---

## [Plisio](https://plisio.net/accept-zcash) <img src="/content-images/plisio-wordmark.png" alt="Plisio logo" class="processor-logo processor-logo-wide" />
- **Irú ìtìlẹyìn**: Òróró (kò sí àkọsílẹ̀)
- **Àpèjúwe**: Plisio jẹ́ ìlẹ̀kùn owó-ìṣírò tí ó ń fún àwọn ilé iṣẹ́ láyè láti gba owo Zcash.
- ** URL**: [Plisio] Ìpínlẹ̀ Òkun Àríwá.](https://plisio.net/accept-zcash)
<img src="/content-images/plisio-wordmark.png" alt="Plisio logo" width="200" hidden />

Ṣe itọju rẹ bi iṣọra. Titaja Plisio pe ni kii ṣe idaduro, ṣugbọn awọn oju-iwe iranlọwọ tirẹ ṣalaye awọn iwontunwonsi ti o wa lori pẹpẹ, ibi ipamọ tutu ati ilana yiyọ kuro kan. Ibeere naa ko le jẹrisi.

Plisio kò sọ irú àdírésì Zcash tí ó ń lò, nítorí náà rò pé ó jẹ́ àlàfo títí ẹnìkan yóò fi fìdí rẹ̀ múlẹ̀.

Àpò owó náà jẹ́ ọ̀fẹ́, ẹnu òpó àti API ná 0.5%, White Label sì ń tà 1.5%. White Label ni orúkọ tuntun ti iṣẹ wọn tí wọ́n gbà sílé, kì í ṣe ìkóra-ẹni.

O kò nílò KYC láti gba owó, a ò sì tẹ àkọsílẹ̀ àwọn orílẹ̀-èdè tí òfin ti fòfin dè jáde.

** Àtúnyẹ̀wò ìkẹyìn:** 2026-07-29

---

## [Binance Pay](https://pay.binance.com/en) <img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" class="processor-logo" />
- **Irú ìtìlẹyìn**: Àwọn àpò tí ó ní òó-òun nìkan ni a kọ sílẹ̀, àwọn àpò tó wà lábẹ́ ìdènà.
- **Àpèjúwe**: Binance Pay jẹ́ ìkànnì tí ó ń sanwó owó-ìpamọ̀ tó n ṣe àtìlẹyìn fún àwọn sisan Zcash.
- ** URL**: [Isanwo Binance] (ìyẹn owó ìtanràn)](https://pay.binance.com/en)
<img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" width="200" hidden />

Binance kọ ZEC ti a firanṣẹ lati awọn adirẹsi aabo. Idaduro yẹn ni idi ti wọn fi ṣẹda awọn adiresi TEX.

O jẹ ohun ti o ni aabo patapata. Awọn sisanwo n gbe kuro-agbegbe laarin awọn apamọwọ Binance Pay, ati pe o nilo akọọlẹ Binance kan ti a ṣayẹwo.

Awọn gbigbe owo-owo si apamọwọ jẹ ọfẹ, awọn sisanwo oniṣowo ni idiyele 0.8% ti o pari ni 5 USD, ati pe awọn oniṣọnà Eto Mini san 1%.

Check availability where you are before depending on it. Binance Pay is not offered in some countries and industries, ZEC has been delisted for users in France, Spain, Italy and Poland since 2023, and service in the EEA has been disrupted under MiCA.

** Àtúnyẹ̀wò ìkẹyìn:** 2026-07-29

---

### Kò gba ZEC mọ́.

Àwọn méjèèjì ni a ti ṣe àkọsílẹ̀ wọn níbí tẹ́lẹ̀. A ṣayẹwo àwọn oníṣẹ owó tí ó wà nínú ìsọfúnni fún ẹnìkọ̀ọ̀kan lọ́jọ́ 29 July 2026 àti pé Zcash kò sí mọ́ lára àwọn méjì náà.

**CoinPayments** kò ṣe àkójọ ZEC nínú àtòkọ owó v2 rẹ̀, tàbí àwọn orúkọ tí ó wà ní ìpilẹ̀ṣẹ̀ wọn, tabi API ti wọ́n fi ń ṣàmúlò owó gidi. Àkójọ ohun tó jẹ mọ́ Zcash báyìí tún darí sí ojúewé àkọlé náà.

**CoinGate** kò ṣe àkójọ ZEC ní ojúewé owó tí ó ń tẹ̀lé rẹ tàbí nínú API tó wà fún gbogbo ènìyàn. Kò sí ìfilọ́lẹ̀, nítorí náà ìdí àti ọjọ́ a ò mọ̀.

Bí èyíkéyìí nínú wọn bá mú Zcash padà, tún un kúnlẹ̀ pẹ̀lú ọjọ́ tí a ṣẹ̀ṣẹ̀ ṣètẹríba.

### Mímú kí ojúewé yìí ṣe pàtó

Ìrànlọ́wọ́ owó ìdákọ̀kọ máa ń yí padà, nítorí náà ojúewé yìí dára bí àyèwò rẹ̀ tó kẹ́yìn. Nígbà tí o bá yẹ ẹ wò:

1. Ṣayẹwo akojọ owo ti olupese tabi API. Awọn atokọ ẹgbẹ kẹta ko ni ọjọ fun awọn onise-iṣẹ mejeeji ti a yọ loke.
2. Ṣayẹwo iru awọn adirẹsi Zcash wo ni o wa. "Ti ṣe atilẹyin fun Zcash" maa n tumọ si awọn adiresi ti ko le wọle nikan.
3. Ṣe àtúnṣe ọjọ́ tí a ṣètẹríba nínú tábìlì àti ní abala ti olùpèsè náà.
