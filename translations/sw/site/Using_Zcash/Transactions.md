<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Miamala

ZEC ni rasilimali ya kidijitali inayotumiwa kwa wingi kwa malipo [payments], ikitoa vipengele imara vya faragha [privacy] vinavyoifanya ifae kwa miamala [transactions] mbalimbali kama kulipa marafiki, kufanya ununuzi, au kutoa mchango. Ili kuongeza faragha na usalama, ni muhimu kuelewa jinsi aina tofauti za miamala zinavyofanya kazi ndani ya Zcash.

## Kwa Ufupi

- Zcash inaunga mkono aina mbili za muamala: **ya faragha [shielded]**, ambayo huweka maelezo kuwa ya siri, na **ya uwazi [transparent]**, ambayo huyarekodi hadharani.
- Anwani za faragha huanza na `u` au `z`. Anwani za uwazi huanza na `t` na hutenda kwa namna inayofanana sana na anwani ya Bitcoin.
- Chaguo ni lako katika kila malipo. Faragha ni chaguo ambalo Zcash inakupa, si mpangilio ambao mtu mwingine anakuamulia.
- Kutoa fedha kutoka kwenye soko la kubadilishana sarafu ndiko kunakosababisha watu wengi kupoteza faragha. Ikiwa soko la kubadilishana sarafu linaunga mkono utoaji wa uwazi pekee, weka fedha hizo katika hali ya faragha mwenyewe pindi zinapowasili.
- Ada [fees] hufuata [ZIP 317](https://zips.z.cash/zip-0317) na huongezeka kulingana na ukubwa wa muamala. Pochi [wallets] ambazo bado hutuma ada ya zamani isiyobadilika zinaweza kuona miamala yake ikichelewa.
- Miamala mingi ya Zcash ina urefu wa mwisho wa muda chini ya [ZIP 203](https://zips.z.cash/zip-0203). Ikiwa muamala unaisha muda kabla haujachimbwa, hauwezi kuthibitishwa baada ya urefu huo wa mwisho wa muda na huenda ukahitajika kutumwa tena.

## Miamala ya Faragha [Shielded Transactions]

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Explained: Zcash Shielded Transactions"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

Miamala ya faragha hutokea unapohamisha ZEC hadi kwenye pochi yako ya faragha. Anwani yako ya pochi ya faragha huanza na `u` au `z`. Unapotuma miamala ya faragha, wewe na watu unaofanya nao miamala mnaweza kudumisha kiwango cha faragha kisichowezekana katika mitandao ya malipo iliyo wazi kwa chaguo-msingi.

Kutuma muamala wa faragha ni rahisi zaidi unapotumia pochi inayounga mkono mtandao wa sasa wa Zcash na mabwawa ya sasa ya faragha [shielded pools]. Kabla ya kutegemea pochi kwa faragha, hakikisha ikiwa inaunga mkono kutuma kwa faragha, kupokea kwa faragha, na bwawa unalopanga kutumia. Unapotoa ZEC kutoka kwenye soko la kubadilishana sarafu, hakikisha ikiwa soko hilo linaunga mkono utoaji wa faragha au wa uwazi. Ikiwa linaunga mkono utoaji wa uwazi pekee, hamisha fedha kwenye pochi yenye uwezo wa faragha baada ya kuwasili.

Kutumia miamala ya faragha kutuma na kupokea fedha ndiyo njia bora ya kuhifadhi faragha na kupunguza hatari ya kuvuja kwa data ya malipo.

## Miamala ya Uwazi [Transparent Transactions]

Miamala ya uwazi hufanya kazi kwa namna inayofanana na miamala ya Bitcoin. Maelezo ya muamala huonekana hadharani kwenye blockchain, yakiwemo anwani za uwazi na thamani za uwazi. Miamala ya uwazi inapaswa kuepukwa pale faragha inapopewa kipaumbele.

Anwani za uwazi bado zinafaa katika hali fulani, hasa wakati soko la kubadilishana sarafu au huduma haiungi mkono anwani za faragha. Ukipokea ZEC kwenye anwani ya uwazi, zingatia kuiweka katika hali ya faragha kabla ya kufanya malipo ya baadaye.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Learn Zcash shielded wallets!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Njia Rahisi ya Kuielewa

Muamala wa uwazi ni kadi ya posta. Mpeleka barua huifikisha, lakini mtu yeyote anayeishughulikia njiani anaweza kusoma ujumbe, kuona aliyeituma na kuona anayeipokea.

Muamala wa faragha ni bahasha iliyofungwa. Huduma ya posta bado inathibitisha kwamba barua halisi yenye ada halisi ya posta ilipitia kwenye mfumo, na hakuna mtu anayeweza kughushi barua au kutuma barua ileile mara mbili. Kilichomo ndani ya bahasha hubaki kati ya mtumaji na mpokeaji.

Jambo muhimu ni kwamba Zcash inakuwezesha kuamua ni ipi utume, malipo kwa malipo.

## Ada za Zcash

Ruhusu pochi yako ikokotoe ada ya mtandao, na uikague kabla ya kutuma. Ada hulipwa kwa ZEC: **ZEC 1 = zatoshis 100,000,000**. Ada kwa dola za Marekani pia hutegemea kiwango cha ubadilishaji cha ZEC.

### Kwa nini malipo mawili yanaweza kuwa na ada tofauti

[ZIP 317](https://zips.z.cash/zip-0317#fee-calculation) hukokotoa ada ya kawaida kutokana na **vitendo vya kimantiki** (logical actions), badala ya asilimia ya kiasi kinachotumwa:

```text
fee in zatoshis = marginal fee × max(2, logical actions)
```

Vitendo vya kimantiki (logical actions) hupima vipengele vya muamala. Kwa mfano, muamala wa Orchard pekee hutumia idadi ya vitendo vyake vya Orchard; muamala wa Sapling pekee hutumia idadi kubwa zaidi kati ya idadi ya matumizi (spends) na matokeo (outputs) yake. Michango kutoka mabwawa (pools) tofauti hujumlishwa. Vipengele vya uwazi (transparent) hutumia hesabu inayotegemea ukubwa. Tazama ZIP 317 kwa fomula kamili, ikijumuisha Ironwood na Sprout ya zamani.

Kwa hiyo, kutumia madokezo (notes) mengi madogo yaliyopokelewa au kutumia mabwawa (pools) kadhaa kunaweza kugharimu zaidi kuliko malipo rahisi zaidi ya thamani ileile. Idadi ya wapokeaji pekee haitoshi kukokotoa ada (fee): chenji na ujazaji (padding) pia huathiri ada.

Mifano hii inaanza na idadi ya vitendo vya kimantiki (logical actions) ambayo tayari imekokotolewa:

| Vitendo vya kimantiki | Kwa zatoshi 5,000 kwa kila kitendo | Kwa zatoshi 1,000 kwa kila kitendo |
| --- | --- | --- |
| 2 | zatoshi 10,000 / 0.0001 ZEC | zatoshi 2,000 / 0.00002 ZEC |
| 3 | zatoshi 15,000 / 0.00015 ZEC | zatoshi 3,000 / 0.00003 ZEC |
| 10 | zatoshi 50,000 / 0.0005 ZEC | zatoshi 10,000 / 0.0001 ZEC |

### Ni ada ipi ya pambizoni inayotumika

**Imekaguliwa tarehe 11 Novemba 2026:** ZIP 317 inaorodhesha marekebisho ya 2 na [ZIP 2009](https://zips.z.cash/zip-2009) kama yaliyopendekezwa. Kabla ya marekebisho ya 2, ada ya ziada kwa kila sehemu (marginal fee) ni zatoshi 5,000. Marekebisho ya 2 yanabainisha 1,000, hivyo kiwango cha chini kinakuwa zatoshi 2,000 badala ya 10,000.

Pendekezo hili linabainisha kimo cha Mainnet cha **3,590,000**, kinachotarajiwa karibu tarehe 19 Novemba 2026, na kimo cha Testnet cha **4,465,026**. Makadirio ya kalenda si sharti la kuanzishwa. Kwa pochi, kimo kinachohusika ni kile cha block ambamo muamala unatarajiwa kuchimbwa; node hutumia kimo cha block inayofuata. Tafadhali kagua tena vipimo vilivyounganishwa na mwongozo wa matoleo ya pochi yako kadri utekelezaji unavyobadilika.

Usilazimishe ada ya chini kwa mkono kwa sababu tu pendekezo au toleo la programu linaitaja. ZIP 2009 inahitaji node zianze kutumia sera mpya ya kusambaza miamala kabla pochi hazijaanza kutumia ada hiyo; node zinazotumia vigezo vya zamani zinaweza kukataa kusambaza muamala wenye ada ya chini. Pia Testnet na Mainnet zina urefu tofauti wa block ambapo mabadiliko huanza kutumika (activation heights).

### Ikiwa makadirio yanaonekana si sahihi

Hakikisha kwamba pochi yako imesasishwa na imesawazishwa. Linganisha ada ya mtandao ya pochi hiyo na gharama ya kutoa pesa ya huduma inayotuma, ukizitazama kila moja peke yake: makadirio ya bei ya huduma si fomula ya ZIP 317. Kwa malipo yanayosubiri, fuata [hatua za utatuzi wa matatizo zilizo hapa chini](#troubleshooting-stuck-transactions) kabla ya kutuma tena.

ZIP 317 ni sera ya pochi na ya node, si kanuni ya makubaliano (consensus) inayolazimisha ada (fee) hii hasa. Kulipa ada ya kawaida huboresha uwezekano wa muamala kusambazwa na node nyingine; haiahidi muda wa uthibitisho.

## Kutatua Matatizo ya Miamala Iliyokwama

Muamala wa Zcash si wa mwisho kwa sababu tu unaonekana kwenye pochi yako. Unakuwa wa mwisho kwa matumizi ya kawaida baada ya kuchimbwa kwenye block na kupokea idadi ya kutosha ya uthibitisho kwa hali yako. Masoko ya kubadilishana sarafu na huduma zinaweza kuhitaji uthibitisho zaidi kuliko pochi inavyoonyesha kwa chaguo-msingi.

Muda wa kuisha ni **urefu wa block** (block height), si hesabu ya muda maalum. Kwa malipo ya kawaida yenye urefu wa kuisha usio sifuri, urefu huo ndio block ya mwisho ambayo malipo yanaweza kuchimbwa ndani yake. Kwa mfano, malipo yanayoisha kwenye urefu wa 3539 yanaweza kujumuishwa kwenye block 3539; block 3540 imechelewa. Urefu wa kuisha wa 0 unamaanisha kwamba malipo ya kawaida hayana muda wa kuisha. Tazama [ZIP 203](https://zips.z.cash/zip-0203).

Thamani za chaguo-msingi si tarehe za mwisho zinazotumika kila mahali. ZIP 203 inabainisha block 40 baada ya Blossom, takriban dakika 50 kwa nafasi lengwa ya sekunde 75 kati ya block. Mabadiliko ya NU7 yanayopendekezwa yanapendekeza block 120 kwa nafasi lengwa ya sekunde 25, ambayo pia ni takriban dakika 50 ([ZIP 218](https://zips.z.cash/zip-0218)). Mipangilio ya pochi na utekelezaji wake vinaweza kutofautiana, na vipindi halisi kati ya block hubadilika. Angalia urefu wa kuisha muda (expiry height) wa muamala husika badala ya kupima muda kabla ya kuutuma tena.

Kuisha kwa muda wa matumizi hakubatilishi malipo ambayo tayari yamechimbwa wala hakuundi muamala wa kurejesha pesa. Ikiwa muamala wa awali uliisha muda wake bila kuchimbwa, haukuwahi kukamilika on-chain. Huenda pochi yako ikahitaji kusawazishwa kabla ya kuonyesha tena fedha husika kuwa zinaweza kutumika.

Tumia mti huu wa maamuzi kabla ya kutuma tena:

1. **Je, pochi (wallet) yako inaonyesha kitambulisho cha muamala (transaction ID)?**
   - Ikiwa hapana, huenda pochi bado haijaunda au kutangaza muamala. Kagua hali ya usawazishaji, muunganisho wa intaneti, toleo la pochi, na ujumbe wowote wa hitilafu wa pochi.
   - Ikiwa ndiyo, nakili kitambulisho cha muamala na uendelee.
2. **Je, muamala umethibitishwa ndani ya block?**
   - Ikiwa ndiyo, subiri idadi ya uthibitisho inayohitajika na pochi yako, soko la kubadilishana sarafu (exchange), mfanyabiashara, au huduma yako.
   - Ikiwa hapana, endelea.
3. **Je, muamala ambao haujachimbwa umepita urefu wake wa kuisha muda usio sifuri (nonzero expiry height)?**
   - Ikiwa hapana, usitume tena malipo hayo hayo kwa mkono kwa sasa. Muamala wa awali bado unaweza kuthibitishwa.
   - Ikiwa ndiyo, acha pochi isawazishe na uhakikishe kwamba muamala wa awali haukuchimbwa katika urefu huo au kabla yake. Kisha fuata mwongozo wa pochi kuhusu kuunda muamala mbadala ikiwa unahitajika.
4. **Je, muamala unaonekana kwenye seva moja au kichunguzi kimoja lakini si kwenye kingine?**
   - Lichukulie hili kama tatizo la mwonekano ndani ya mtandao, si thibitisho (proof) kwamba muamala umeshindwa. Node tofauti zinaweza kuwa na mwonekano tofauti wa mempool.
   - Subiri, sawazisha pochi yako upya, au badili kwenda seva nyingine unayoiamini ikiwa pochi yako inaruhusu hivyo.
5. **Je, muamala ulitoweka baada ya kuonekana umethibitishwa?**
   - Upangaji upya mfupi wa mnyororo (chain) unaweza kuondoa muamala kwa muda kutoka kwenye mnyororo bora.
   - Subiri block zaidi. Ikiwa muamala utarudi, endelea kusubiri uthibitisho. Ikiwa haurudi na baadaye muda wake ukaisha, unda muamala mpya.
6. **Je, pochi inakuomba utume tena?**
   - Fuata mwongozo wa sasa wa pochi tu baada ya kukagua kwamba muamala uliotangulia umeisha muda, umeshindwa, au si halali tena.
   - Ikiwa huna uhakika, uliza timu ya usaidizi kabla ya kutuma tena.

## Inasubiri, Imeisha Muda, Imeondolewa, na Imepangwa Upya

- **Inasubiri** inamaanisha muamala umeundwa au kusambazwa lakini bado haujachimbwa kwenye block.
- **Imeisha muda** inamaanisha urefu wa mwisho wa muda wa muamala umepita. Chini ya ZIP 203, muamala wenye urefu wa mwisho wa muda hauwezi kuchimbwa baada ya urefu huo.
- **Imeondolewa** inamaanisha node moja au zaidi hazihifadhi tena muamala katika mempool yake. Hii inaweza kutokea kwa sababu ya kuisha muda, ada ndogo, sera ya mempool, tabia ya kuwasha upya, au tofauti za usambazaji.
- **Imepangwa upya** inamaanisha block ambayo hapo awali ilikuwa na muamala si sehemu tena ya mnyororo bora. Muamala unaweza kuchimbwa tena baadaye, au unaweza kurudi katika hali ya kusubiri ikiwa bado ni halali.

## Wakati wa Kutotuma Tena

Usitume tena mara moja kwa sababu tu muamala unasubiri, ni wa polepole, au haupo kwenye kitafutaji kimoja. Kutuma tena mapema sana kunaweza kusababisha mkanganyiko na, kulingana na jinsi pochi inavyojenga malipo mapya, kunaweza kuhatarisha kulipa mara mbili.

Subiri au pata usaidizi kwanza wakati:

- Muamala una kitambulisho cha muamala na haujaisha muda.
- Seva moja inauonyesha huku nyingine haionyeshi.
- Ulichimbwa hivi karibuni lakini ukapoteza uthibitisho baada ya upangaji upya unaowezekana.
- Huduma inayopokea haijamaliza kuhesabu uthibitisho.
- Pochi yako bado inasawazisha.

Kwa kawaida ni salama zaidi kutuma tena tu baada ya pochi kuonyesha wazi kwamba muamala umeisha muda au umeshindwa, au baada ya usaidizi kuthibitisha kwamba muamala wa awali hauwezi kuthibitishwa.

## Ukaguzi Salama kwa Faragha

Unaweza kukagua hali ya msingi ya muamala bila kufichua maelezo zaidi kuliko inavyohitajika:

- Angalia ikiwa pochi yako imesawazishwa kikamilifu.
- Angalia ikiwa programu ya pochi imesasishwa.
- Angalia ikiwa muamala una kitambulisho cha muamala.
- Angalia ikiwa muamala umethibitishwa, unasubiri, umeisha muda, au umeshindwa.
- Angalia urefu wa sasa wa block na ulinganishe na urefu wa mwisho wa muda wa muamala ikiwa pochi yako inaonyesha hilo.
- Kwa miamala ya uwazi, kitafutaji cha block kinaweza kuonyesha muamala wa umma, anwani, thamani, na uthibitisho.
- Kwa miamala ya faragha, kitafutaji cha block kinaweza kuonyesha kwamba muamala upo, lakini hakiwezi kuonyesha mtumaji wa faragha, mpokeaji, kiasi, au maelezo ya ujumbe [memo].

## Usichoshiriki Hadharani

Usiwahi kuchapisha vitu hivi kwenye gumzo la umma, mitandao ya kijamii, au kifuatiliaji cha matatizo:

- Maneno ya kurejesha pochi [seed phrase] au maneno ya urejeshaji
- Ufunguo wa kutumia pesa [spending key], ufunguo binafsi, au nakala ya akiba ya pochi
- Full Viewing Key
- Picha za skrini zinazoonyesha salio, anwani kamili, jumbe, misimbo ya QR, au maelezo ya akaunti ya soko la kubadilishana sarafu
- Hati za utambulisho binafsi au rekodi za kurejesha akaunti

Kitambulisho cha muamala ni cha umma kwenye mnyororo, lakini bado kinaweza kuunganisha swali lako la usaidizi na utambulisho wako. Ikiwa faragha ni muhimu, kishiriki tu na njia ya usaidizi inayoaminika.

## Mambo Ambayo Timu za Usaidizi Zinahitaji

Unapoomba msaada kutoka kwa pochi, soko la kubadilishana sarafu, au huduma, shiriki taarifa za chini kabisa zenye manufaa:

- Jina la pochi au huduma
- Toleo la programu na mfumo wa uendeshaji
- Ikiwa muamala ni wa faragha, wa uwazi, au kati ya anwani za faragha na uwazi
- Kitambulisho cha muamala, ikiwa uko tayari kukishiriki
- Muda wa takriban uliotumwa
- Ikiwa pochi imesawazishwa kikamilifu
- Hali ya sasa inayoonyeshwa na pochi
- Ujumbe kamili wa hitilafu, ukiwa umeondoa data binafsi
- Picha ya skrini yenye salio, anwani, jumbe, na maelezo ya akaunti yaliyofichwa

Timu za usaidizi hazihitaji maneno yako ya kurejesha pochi, ufunguo wa kutumia pesa, ufunguo binafsi, au ufunguo kamili wa kutazama.

## Makosa ya Kawaida

- **Kudhani kwamba pochi yoyote inayoorodhesha ZEC inaweza kuituma kwa faragha.** Pochi kadhaa za sarafu nyingi zinaunga mkono upande wa uwazi wa Zcash pekee. Angalia mabwawa yanayoungwa mkono na pochi kabla ya kuitegemea kwa faragha. Ukurasa wa [Wallets](https://zechub.wiki/using-zcash/wallets) unaorodhesha hili kwa kila chaguo.
- **Kutoa fedha kwenye anwani ya uwazi na kuziacha hapo.** Utoaji wenyewe ni wa umma, na kila uhamishaji wa baadaye kutoka kwenye anwani hiyo unabaki wa umma pia. Weka fedha katika hali ya faragha zinapowasili.
- **Kuchukulia faragha kama kitu unachowasha mara moja.** Kila muamala ni chaguo tofauti. Kutuma kwa faragha leo hakuondoi malipo ya uwazi uliyofanya wiki iliyopita.
- **Kutumia tena anwani ya uwazi kwa kila kitu.** Kwa sababu shughuli za uwazi zinaonekana daima, anwani moja inayotumiwa tena huunganisha hatua kwa hatua malipo ambayo hayakuwa na sababu ya kuhusishwa.
- **Kutuma kwa ada chaguo-msingi iliyopitwa na wakati.** Pochi ambazo hazijapitisha ZIP 317 zinaweza bado kutuma ada ya zamani isiyobadilika, ambayo inaweza kuacha muamala ukiwa haujathibitishwa.
- **Kutuma tena kabla ya kuisha muda.** Muamala unaosubiri unaweza bado kuthibitishwa hadi utakapoisha muda. Angalia hali ya kuisha muda kabla ya kuunda malipo mengine.

## Dokezo [Note]

Tafadhali kumbuka kwamba njia salama zaidi ya kutumia ZEC ni kutumia miamala ya faragha kila wakati mtumaji, mpokeaji, pochi, na huduma zote zinaiunga mkono. Baadhi ya pochi na masoko ya kubadilishana sarafu yanaunga mkono [anwani zilizounganishwa](https://web.archive.org/web/20260823012524/https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.), ambazo zinaweza kuunganisha aina nyingi za vipokezi vya Zcash katika anwani moja.

## Rasilimali

- [ZIP 203: Kuisha Muda kwa Muamala](https://zips.z.cash/zip-0203)
- [ZIP 317: Utaratibu wa Ada ya Uhamishaji Inayolingana](https://zips.z.cash/zip-0317)
- [ZIP za Zcash](https://zips.z.cash/)

## Kurasa Zinazohusiana

- [Wallets](/using-zcash/wallets) - pochi zipi zinaunga mkono kutuma kwa faragha, na zipi ni za uwazi pekee
- [Taarifa za malipo](/zcash-tech/payment-disclosures) - jinsi mtumaji anavyoweza kuthibitisha maelezo yaliyochaguliwa ya malipo moja ya faragha
- [Mabwawa ya Faragha](/using-zcash/shielded-pools) - Sapling na Orchard, mabwawa ambamo fedha zako za faragha zinahifadhiwa
- [Jumbe](/using-zcash/memos) - ujumbe uliosimbwa fiche unaoweza kusafiri pamoja na muamala wa faragha
- [Anwani za Uwazi za Soko la Kubadilishana Sarafu](/using-zcash/transparent-exchange-addresses) - anwani za TEX na kwa nini masoko ya kubadilishana sarafu huzitumia
- [Masoko ya Kubadilishana Sarafu Yanayohifadhiwa na Mtu Mwingine](/using-zcash/custodial-exchanges) - masoko yapi yanaunga mkono utoaji wa faragha

## Kigeuzi cha ZEC hadi ZAT
