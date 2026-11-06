<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Processors.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Zcash Vichakataji vya malipo [Payment Processors]

Njia za kukubali ZEC kama mfanyabiashara, zikilinganishwa bega kwa bega. Kila ingizo lilichunguzwa dhidi ya tovuti na API ya mtoa huduma mwenyewe tarehe **29 Julai 2026**.

Usaidizi wa mali za faragha [privacy assets] hubadilika mara kwa mara, kwa hiyo kila safu ina tarehe yake ya uthibitisho. Ikiwa unasoma hili miezi kadhaa baadaye, angalia tovuti ya mtoa huduma kabla ya kuunganisha huduma hiyo.

<div class="processor-table">

| Kichakataji | Uhifadhi | ZEC ya faragha [shielded] | Kujihudumia | Ada ya mfanyabiashara | Maeneo / KYC | Imethibitishwa |
|:--|:--|:--|:--|:--|:--|:--|
| [CipherPay](https://www.cipherpay.app) | Isiyohifadhiwa na mtu mwingine [Non-custodial] | Ndiyo, Orchard kupitia Anwani Zilizounganishwa | Ndiyo, chanzo huria | 1% kwa kila malipo, bila malipo ikiwa unajihudumia | Hakuna KYC, maeneo hayajaelezwa | 2026-07-29 |
| [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) | Isiyohifadhiwa na mtu mwingine, ufunguo wa kutazama pekee | Ndiyo, ya faragha pekee (Sapling, Orchard, UA) | Ndiyo, chanzo huria | Hakuna, unalipa ada za mtandao pekee | Ulimwenguni kote, hakuna KYC | 2026-07-29 |
| [ZGo](https://zgo.cash/) | Isiyohifadhiwa na mtu mwingine | Ndiyo, Sapling na Orchard | Hapana, huduma inayopangishwa | Kipindi kinacholipiwa mapema, bei haijachapishwa | Hakuna KYC iliyoelezwa, maeneo hayajaelezwa | 2026-07-29 |
| [Flexa](https://flexa.co/) | Mteja hujihifadhi mwenyewe, mfanyabiashara hulipwa kwa fiat | Mteja hutumia mali za faragha, upande unaopokea haujaandikwa | Hapana | 1% kwa kila malipo | Marekani na nchi 37 za SEPA, ZEC katika EU haijathibitishwa | 2026-07-29 |
| [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) | Isiyohifadhiwa na mtu mwingine kwa chaguomsingi | Hapana, anwani ya uwazi [transparent] pekee | Hapana | 0.5%, au 1% pamoja na ubadilishaji | Ulimwenguni kote isipokuwa palipokatazwa, hakuna KYC kuanza | 2026-07-29 |
| [Plisio](https://plisio.net/accept-zcash) | Inayohifadhiwa na mtu mwingine, licha ya matangazo | Haijaandikwa | Hapana | 0.5% API, 1.5% white label | Hakuna KYC ili kupokea | 2026-07-29 |
| [Binance Pay](https://pay.binance.com/en) | Inayohifadhiwa na mtu mwingine, off-chain | Hapana, amana za faragha zinakataliwa | Hapana | Pochi hadi pochi bila malipo, malipo ya utoaji 0.8% | Ina vikwazo vya kijiografia, ZEC imeondolewa kwenye orodha nchini FR, ES, IT, PL | 2026-07-29 |

</div>

### Maana ya safu

**Uhifadhi** ni kama kichakataji kinashikilia ZEC yako. Isiyohifadhiwa na mtu mwingine inamaanisha kuwa inaingia kwenye pochi [wallet] unayodhibiti.

**ZEC ya faragha** ni kama unaweza kulipwa kwenye bwawa la faragha [shielded pool]. Uwazi pekee inamaanisha kiasi na anwani ziko wazi kwenye blockchain.

**Kujihudumia** ni kama unaweza kuendesha programu mwenyewe, bila kampuni katikati.

**Ada ya mfanyabiashara** haijumuishi ada za mtandao za Zcash, ambazo mtu hulipa katika kila hali.

Ambapo mtoa huduma hajachapisha kitu, ingizo linasema “haijaelezwa” au “haijaandikwa” badala ya kukisia. Hilo si sawa na “hapana”.

### Lipi uchague

Kwa faragha na udhibiti wa juu zaidi, tumia **BTCPay Server** au **CipherPay** inayojihudumia. Vyote ni vya faragha, vya chanzo huria, na havikuhifadhii fedha.

Kwa kupokea malipo dukani badala ya mtandaoni, tumia **Flexa**.

Kwa lango linalopangishwa ambapo malipo ya uwazi yanakubalika, tumia **NOWPayments** au **Plisio**.

Tahadhari moja inayostahili kurudiwa: kichakataji cha uwazi pekee huchapisha kila kiasi cha malipo na anwani kwenye blockchain. Na kwa kichakataji chochote kinachopangishwa kisichohifadhiwa na mtu mwingine, unakabidhi ufunguo wako wa kutazama, hivyo kampuni inaweza kuona malipo yako ingawa haiwezi kuyatumia. Kujihudumia ndiyo njia pekee ya kuepuka hilo.

<div class="processor-note">

**Onyo la huduma ya ZGo, 29 Julai 2026.** Mfumo wa nyuma wa ZGo katika api.zgo.cash ulirejesha HTTP 503 kwenye kila endpoint wakati ukurasa huu ulipokuwa ukichunguzwa. Mradi haujaachwa na msimamizi wake alikuwa hai katika jumuiya mwezi huu, lakini thibitisha kuwa huduma inaendeshwa kabla ya kuitegemea.

</div>

---

## [CipherPay](https://www.cipherpay.app) <img src="/content-images/cipherpay-mark.png" alt="Nembo ya CipherPay" class="processor-logo" />
- **Aina ya Usaidizi**: Ya faragha (Orchard, kupitia Anwani Zilizounganishwa)
- **Maelezo**: Kubali Zcash kwa dakika chache, isiyohifadhiwa na mtu mwingine, bila data ya mnunuzi, bila mpatanishi.
- **URL**: [CipherPay](https://www.cipherpay.app)
<img src="/content-images/cipherpay-mark.png" alt="Nembo ya CipherPay" width="200" hidden />

Unaipa CipherPay ufunguo wa kutazama pekee, hivyo malipo huenda moja kwa moja kwenye pochi yako mwenyewe na haihifadhi kamwe fedha. Hutumia anwani mpya kwa kila ankara.

Orchard pekee. Hakuna usaidizi wa Sapling au wa uwazi, ingawa README ya hifadhi inataja Sapling.

Inagharimu 1% kwa kila malipo, na hakuna chochote kabisa ukiendesha mwenyewe. Kila kitu ni chanzo huria, kama binary ya Rust yenye SQLite au kama picha ya Docker. Hakuna KYC, na wanunuzi hawahitaji akaunti.

Miunganisho inajumuisha Shopify, WooCommerce, REST API, checkout inayopangishwa, viungo vya malipo, na QR ya ana kwa ana.

Mambo mawili ya kutathmini. Ilizinduliwa Februari 2026 na haina ukaguzi wa usalama uliochapishwa. Na katika kiwango kinachopangishwa, mwendeshaji anashikilia ufunguo wako wa kutazama, hivyo anaweza kuona malipo yako. Kujihudumia huondoa hilo. Malipo ya faragha pia ni ya mwisho, hivyo kurejesha fedha kunahitaji mnunuzi akupe anwani.

**Ilithibitishwa mwisho:** 2026-07-29

---

## [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) <img src="/content-images/btcpay-mark.png" alt="Nembo ya BTCPay Server" class="processor-logo" />
- **Aina ya Usaidizi**: Ya faragha pekee (Sapling, Orchard, Anwani Iliyounganishwa)
- **Maelezo**: BTCPay Server ni kichakataji cha malipo ya sarafu-fiche chenye chanzo huria, kinachojihudumia.
- **URL**: [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
<img src="/content-images/btcpay-mark.png" alt="Nembo ya BTCPay Server" width="200" hidden />

Chaguo imara zaidi kuhusu uhifadhi. Mfumo wake wa nyuma wa pochi ni wa kutazama pekee na haushikilii seed wala ufunguo wa siri, hivyo hata seva iliyoathiriwa haiwezi kutumia fedha zako.

Ya faragha pekee, ikijumuisha Sapling, Orchard na Anwani Zilizounganishwa. Hakuna mbadala wa uwazi, kwa hiyo usipange ukitegemea huo.

Ili kuisakinisha unahitaji fork ya Docker ya btcpay-zcash kwenye tawi la feat/zec, pamoja na ufunguo wa kutazama uliosafirishwa kutoka pochi kama Zkool au Zingo. Kwa chaguomsingi huwasiliana na lightwalletd ya mbali, au unaweza kuendesha Zebra na lightwalletd mwenyewe.

Kizuizi kimoja cha kujua: programu-jalizi hutumia pochi moja ya Zcash kwa kila duka kwenye instance, kwa hiyo usiiendeshe kwenye seva inayoshirikiwa. Pochi za kila duka zinafanyiwa kazi.

Hakuna ada kwa programu yenyewe. Unalipa ada za mtandao za Zcash na gharama zozote za upangishaji wako.

**Ilithibitishwa mwisho:** 2026-07-29

---

## [ZGo](https://zgo.cash/) <img src="/content-images/zgo-prp2-497679039b.webp" alt="Nembo ya ZGo" class="processor-logo" />
- **Aina ya Usaidizi**: Ya faragha (Sapling na Orchard)
- **Maelezo**: ZGo ni jukwaa la malipo ya kielektroniki linalokwenda moja kwa moja kutoka kwa mteja wako hadi kwako, bila wahusika wa tatu.
- **URL**: [ZGo](https://zgo.cash/)
<img src="/content-images/zgo-prp2-497679039b.webp" alt="Nembo ya ZGo" width="200" hidden />

Mashine ya malipo unayoendesha kwenye kivinjari, hivyo kompyuta mpakato, tableti au simu huwa checkout. Pia kuna programu-jalizi ya WooCommerce na REST API. Ilijengwa na Vergara Technologies na kufadhiliwa na Zcash Community Grants, ikijumuisha kuhama kutoka zcashd hadi Zebra.

Fedha huenda moja kwa moja kutoka kwa mteja hadi kwenye pochi yako, bila mtu katikati.

Ya faragha, ikijumuisha Sapling na Orchard kupitia Anwani Zilizounganishwa, na inafuata ZIP 321. Hakuna chanzo cha sasa kinachosema inashughulikia anwani za uwazi, kwa hiyo ukurasa huu hausisitizi tena kwamba inafanya hivyo.

Huwezi kwa hakika kujiendeshea mwenyewe. ZGo huendesha miundombinu ya Zcash kwa ajili yako na haichapishi mwongozo wa usambazaji. Chanzo kiko wazi kwenye seva ya Git ya msimamizi mwenyewe, ingawa nakala ya GitLab ambayo watu hupata kwa kawaida ni kioo cha zamani cha 2022.

Pia si bure. ZGo huuza vipindi vinavyolipiwa mapema na huhitaji kipindi cha Pro kwa WooCommerce, lakini ukurasa wa bei haupatikani kwa sasa, kwa hiyo hakuna kiasi kinachonukuliwa hapa.

**Ilithibitishwa mwisho:** 2026-07-29

---

## [Flexa](https://flexa.co/) <img src="/content-images/flexa-mark.png" alt="Nembo ya Flexa" class="processor-logo" />
- **Aina ya Usaidizi**: Mteja hutumia mali za faragha, upande unaopokea haujaandikwa
- **Maelezo**: Flexa ni mtandao wa malipo unaowaruhusu wateja kutumia mali za kidijitali, ikijumuisha Zcash, katika maeneo ya rejareja kutoka pochi ya kujihifadhi mwenyewe.
- **URL**: [Flexa](https://flexa.co/)
<img src="/content-images/flexa-mark.png" alt="Nembo ya Flexa" width="200" hidden />

Flexa si lango la checkout, kwa hiyo si mbadala wa nyingine zilizo hapa. Mteja hufungua pochi iliyowezeshwa na Flexa kama Zodl, huonyesha msimbo wa matumizi ya mara moja, na duka huuchanganua. Hakuna ankara ya ZEC wala programu-jalizi ya e-commerce.

Mteja huweka sarafu zake mwenyewe hadi wakati wa kulipa. Wewe kama mfanyabiashara hupokei kamwe ZEC. Flexa hulipa nawe kwa sarafu unayochagua, hivyo upande wa crypto hushughulikiwa nao.

Tangazo la Flexa lenyewe linaeleza muunganisho wa Zcash kama kulipa kwa ZEC ya faragha. Aina ya anwani ambayo Flexa hupokea haijachapishwa popote.

Ada ni 1% kwa kila malipo, huku ubadilishaji na uhifadhi vikijumuishwa bila gharama ya ziada.

Hufanya kazi Marekani na, tangu Julai 2026, katika nchi na maeneo 37 ya SEPA. Ikiwa ZEC hasa inaweza kutumika Ulaya haijaelezwa.

**Ilithibitishwa mwisho:** 2026-07-29

---

## [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) <img src="/content-images/nowpayments-wordmark.png" alt="Nembo ya NOWPayments" class="processor-logo processor-logo-wide" />
- **Aina ya Usaidizi**: Uwazi pekee
- **Maelezo**: NOWPayments ni lango la malipo ya crypto linalowawezesha wafanyabiashara kukubali malipo na michango ya Zcash kwa urahisi.
- **URL**: [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments)
<img src="/content-images/nowpayments-wordmark.png" alt="Nembo ya NOWPayments" width="200" hidden />

Hakuna usaidizi wa faragha. Nyaraka zao zinakuambia uweke anwani ya uwazi kwa Zcash, na ZEC ndiyo sarafu pekee wanayoitenga kwa namna hiyo. Kila malipo unayopokea yako wazi kwenye blockchain.

Isiyohifadhiwa na mtu mwingine kwa chaguomsingi. Maswali yao yanayoulizwa mara kwa mara yanasema hawahifadhi fedha na kamwe hawashikilii funguo za faragha. Kuna salio la hiari linalohifadhiwa, kwa hiyo angalia mipangilio ya akaunti yako ikiwa unahitaji kuwa na uhakika.

Ada ni 0.5% kwa malipo ya moja kwa moja, au 1% kwa malipo ya sarafu nyingi, kiwango kisichobadilika, au malipo ya “ada hulipwa na mtumiaji”, pamoja na ada za mtandao juu yake.

Inapatikana ulimwenguni kote isipokuwa pale sheria inapokataza. Huhitaji KYC kuanza kukubali crypto, ila tu kutoa fiat.

**Ilithibitishwa mwisho:** 2026-07-29

---

## [Plisio](https://plisio.net/accept-zcash) <img src="/content-images/plisio-wordmark.png" alt="Nembo ya Plisio" class="processor-logo processor-logo-wide" />
- **Aina ya Usaidizi**: Uwazi (haijaandikwa)
- **Maelezo**: Plisio ni lango la malipo ya sarafu-fiche linaloruhusu biashara kukubali malipo ya Zcash.
- **URL**: [Plisio](https://plisio.net/accept-zcash)
<img src="/content-images/plisio-wordmark.png" alt="Nembo ya Plisio" width="200" hidden />

Ichukulie kama inayohifadhiwa na mtu mwingine. Matangazo ya Plisio huiita isiyohifadhiwa na mtu mwingine, lakini kurasa zake za usaidizi zinaeleza salio linaloshikiliwa kwenye jukwaa, cold storage na mchakato wa kutoa fedha. Dai la kutohifadhiwa na mtu mwingine halikuweza kuthibitishwa.

Plisio haisemi kamwe aina za anwani za Zcash inazotumia, kwa hiyo dhania uwazi hadi mtu athibitishe vinginevyo.

Pochi ni bure, lango na API hugharimu 0.5%, na White Label ni 1.5%. White Label ni kubadilisha chapa kwa huduma yao inayopangishwa, si kujihudumia.

Huhitaji KYC kupokea malipo, na hakuna orodha ya nchi zilizozuiwa iliyochapishwa.

**Ilithibitishwa mwisho:** 2026-07-29

---

## [Binance Pay](https://pay.binance.com/en) <img src="/content-images/binancepay-mark.png" alt="Nembo ya Binance Pay" class="processor-logo" />
- **Aina ya Usaidizi**: Uwazi pekee, amana za faragha zinakataliwa
- **Maelezo**: Binance Pay ni jukwaa la malipo ya sarafu-fiche linalounga mkono malipo ya Zcash.
- **URL**: [Binance Pay](https://pay.binance.com/en)
<img src="/content-images/binancepay-mark.png" alt="Nembo ya Binance Pay" width="200" hidden />

Binance hukataa ZEC inayotumwa kutoka anwani za faragha. Kukataliwa huko ndiko sababu anwani za TEX ziliundwa.

Inahifadhiwa na mtu mwingine kikamilifu. Malipo husogea off-chain kati ya pochi za Binance Pay, na unahitaji akaunti ya Binance iliyothibitishwa.

Uhamisho wa pochi hadi pochi hauna malipo, malipo ya utoaji kwa wafanyabiashara hugharimu 0.8% yenye ukomo wa USD 5, na wafanyabiashara wa Mini Program hulipa 1%.

Angalia upatikanaji ulipo kabla ya kuitegemea. Binance Pay haitolewi katika baadhi ya nchi na sekta, ZEC imeondolewa kwenye orodha kwa watumiaji nchini Ufaransa, Hispania, Italia na Poland tangu 2023, na huduma katika EEA imevurugika chini ya MiCA.

**Ilithibitishwa mwisho:** 2026-07-29

---

### Hazikubali tena ZEC

Zote hizi mbili ziliorodheshwa hapa awali. Orodha ya sarafu hai ya kila mtoa huduma ilichunguzwa tarehe 29 Julai 2026 na Zcash haipo tena kwa zote mbili.

**CoinPayments** haijaorodhesha ZEC katika orodha yake ya sarafu ya v2, orodha yake ya zamani, wala API yake ya sarafu hai, na makala yake ya Zcash sasa inaelekeza kwenye ukurasa mkuu.

**CoinGate** haijaorodhesha ZEC kwenye ukurasa wake wa sarafu zinazoungwa mkono wala katika API yake ya umma. Hakuna kuondolewa kwenye orodha kulikotangazwa, kwa hiyo sababu na tarehe havijulikani.

Ikiwa mojawapo itarudisha Zcash, iongeze tena kwa tarehe mpya ya uthibitisho.

### Kuweka ukurasa huu sahihi

Usaidizi wa sarafu za faragha hubadilika, kwa hiyo ukurasa huu ni mzuri kadiri ya ukaguzi wake wa mwisho. Unapouhakiki:

1. Angalia orodha ya sarafu au API ya mtoa huduma mwenyewe. Orodha za wahusika wengine zilikuwa zimepitwa na wakati kwa vichakataji vyote viwili vilivyoondolewa hapo juu.
2. Angalia aina za anwani za Zcash zinazoungwa mkono. “Inaauni Zcash” kwa kawaida humaanisha anwani za uwazi pekee.
3. Sasisha tarehe ya uthibitisho katika jedwali na katika sehemu ya mtoa huduma huyo.
