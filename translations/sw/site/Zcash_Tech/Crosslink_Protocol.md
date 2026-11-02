<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Crosslink_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Itifaki ya Crosslink

## Kwa Ufupi

* Itifaki ya Crosslink ni muundo unaopendekezwa kwa hatua ya Zcash ya mseto wa Uthibitisho wa Kazi (Proof-of-Work, PoW)/Uthibitisho wa Kuweka Sarafu (Proof-of-Stake, PoS). Inaunganisha PoW na itifaki ya Uvumilivu wa Hitilafu za Kibizanti (Byzantine Fault Tolerance, BFT), ikiruhusu ukamilisho wa uhakika mradi PoW au PoS ibaki salama.
* PoS mseto huanzisha waidhinishaji ambao huthibitisha block kulingana na ZEC iliyowekwa kama dhamana — mwanzoni wakiwa wa kudumu, baadaye wakichaguliwa kulingana na ZEC iliyowekwa kama dhamana.
* Crosslink inalenga kutoa daftari kuu mbili: **daftari kuu lililokamilishwa (LOG_fin)** kwa usalama dhidi ya urejeshaji nyuma, na **daftari kuu lenye muda mfupi wa kusubiri (LOG_ba)** linalolipanua kwa block zisizozidi *L*.
* **Hali ya Usalama** huwashwa ikiwa daftari kuu lililokamilishwa linabaki nyuma kwa block zaidi ya *L*: PoW huendelea, lakini shughuli za kiuchumi husimamishwa hadi tatizo litatuliwe.
* Kadri muda unavyopita, wathibitishaji wa PoS watapokea sehemu inayoongezeka ya zawadi, na kupunguza mapato ya wachimbaji wa PoW; itifaki huanzisha mabadiliko hatua kwa hatua.
* Itifaki inaendelezwa na Shielded Labs, pamoja na ramani ya njia ya kujumuisha Crosslink 2* katika mteja wa Zcash wa Zebra.
* Crosslink haijawashwa kwenye mainnet ya Zcash. Inaendeshwa kwenye Shielded Labs ya Feature Net, mtandao wa majaribio ambao mtu yeyote anaweza kujiunga nao. Tazama “Hali ya Crosslink” hapa chini.

## Maelezo ya Msingi

### Utangulizi: PoS Mseto ya Zcash na Itifaki ya Crosslink

Itifaki ya Crosslink ni maendeleo muhimu katika mageuzi ya Zcash, ikiielekeza kwenye modeli ya **Uthibitisho wa Kuweka Sarafu Mseto (PoS)** na **Uthibitisho wa Kazi (PoW)**. PoW ya jadi, ingawa inaaminika katika kuhakikisha usalama wa mtandao, hukosolewa kwa matumizi ya nishati na hatari za urasimishaji zinazohusishwa na uchimbaji wa viwandani. Crosslink huanzisha mfumo mseto, unaounganisha uimara uliothibitishwa wa PoW na faida za ufanisi na utawala za PoS.

![image](/content-images/a2ffb19d-e570-4723-b669-a66e14fc6b71-a727c958de.webp)

Mpito huu unaendana na mielekeo ya kimataifa katika ubunifu wa blockchain, ambapo miradi inahamia kwenye mifumo endelevu kimazingira na iliyogatuliwa. Muundo wa makubaliano mawili wa Crosslinks huhakikisha kuwa Zcash inadumisha dhamana zake thabiti za faragha ya kifumbo huku ikiendelea kukabiliana na changamoto za kisasa.

Mbinu ya Uthibitisho wa Kuweka Sarafu (PoS) mseto huunganisha Uthibitisho wa Kazi (PoW) wa jadi na PoS, ikilenga kushughulikia udhaifu kama mashambulizi ya 51% huku ikidumisha ugatuzi na kupunguza matumizi ya nishati. PoS mseto huanzisha waidhinishaji ambao huthibitisha block kulingana na ZEC iliyowekwa kama dhamana. Mbinu hii imeundwa kuboresha usalama wa mnyororo na uthibitishaji wa pointi za ukaguzi, ikitoa mbadala imara zaidi kwa mifumo ya PoW pekee.

### Kwa Nini PoS/PoW Mseto Kama Jaribio la Kwanza?

* Inaendeleza hatua kuelekea PoS safi.
* Inawezesha matumizi ya uchimbaji na kuweka sarafu kwa wakati mmoja pamoja na muingiliano wa mifumo ikolojia.
* Inapunguza matatizo ya usalama yanayoweza kutokea katika itifaki ya PoS hadi iwe na hisa kubwa zaidi ya wathibitishaji na imani zaidi.
* Mbinu ya jumla imeonyeshwa na Ethereum katika uzalishaji.

### Crosslink Ni Nini

Itifaki ya Crosslink ni muundo unaopendekezwa kwa hatua ya Zcash ya mseto wa Uthibitisho wa Kazi/Uthibitisho wa Kuweka Sarafu (PoW/PoS). Inaunganisha PoW na itifaki ya Uvumilivu wa Hitilafu za Kibizanti (BFT), ikiruhusu ukamilisho wa uhakika mradi PoW au PoS ibaki salama. Muundo huu unalenga kuimarisha usalama wa mtandao na ugatuzi kwa kujumuisha uthibitishaji unaotegemea dhamana huku ukidumisha ushiriki wa wachimbaji. Kipengele muhimu cha pendekezo, kinachoitwa Crosslink 2, hurahisisha usanifu kwa kuwaunganisha watoa mapendekezo wa BFT na wachimbaji. Mbinu hii iliyorahisishwa hupunguza mabadiliko ya kimuundo na kuruhusu matumizi ya safu ya BFT “bandia”, na hivyo kurahisisha kuunda mfano wa awali na kupeleka huku ikidumisha viwango vya juu vya usalama.

Mpango wa utekelezaji unajumuisha ramani ya njia yenye makadirio ya gharama za uhandisi za kujumuisha Crosslink 2* katika mteja wa Zcash wa Zebra. Utekelezaji huu wa hatua kwa hatua unalenga kusawazisha motisha za washikadau, kupunguza usumbufu, na kuendana na malengo ya Zcash ya kupanua uwezo, utumiaji, na ugatuzi. Imani inayokua katika sifa thabiti za usalama za itifaki huimarisha zaidi uwezo wake kama hatua muhimu katika mageuzi ya Zcash. Kwa kushughulikia ufanisi wa nishati na kuimarisha mifumo ya makubaliano, Crosslink hutoa suluhisho linalotazama mbele kwa changamoto zinazobadilika za blockchain. Kwa maelezo zaidi, rejelea hazina ya [GitHub](https://github.com/ShieldedLabs/zebra-crosslink) na Jukwaa la Jumuiya la [Zcash](https://forum.zcashcommunity.com).

### Malengo na Madhumuni ya Crosslink

Itifaki ya Crosslink imeundwa kushughulikia malengo kadhaa ya kimkakati yaliyo muhimu kwa mustakabali wa Zcash:

1. **Ugatuzi**:
   * Kwa kujumuisha PoS, Zcash hupunguza utegemezi wa vifaa maalumu vya PoW (ASIC), ambavyo mara nyingi hukusanya nguvu za uchimbaji miongoni mwa waendeshaji wakubwa wachache.
   * PoS huruhusu ushiriki kutoka kwa jumuiya pana zaidi, ambapo wamiliki wa sarafu huweka mali zao kama dhamana ili kuulinda mtandao, na kuhakikisha makubaliano yaliyosambazwa zaidi.
   * Kwa kuanzisha uthibitishaji unaotegemea dhamana, itifaki huhakikisha kuwa washiriki wa kiuchumi wanachukua nafasi amilifu katika makubaliano, na kupunguza utegemezi wa uchimbaji pekee.
2. **Utawala Ulioimarishwa**:
   * Wamiliki wa sarafu hupata haki za kupiga kura kupitia kuweka sarafu, na kuwawezesha kuathiri maamuzi kuhusu maboresho ya mtandao, mgao wa ufadhili, na vipaumbele vya mfumo ikolojia. Mbinu hii ya kidemokrasia huoanisha mageuzi ya itifaki na maslahi ya jumuiya.
3. **Ufanisi wa Nishati**:
   * Kuhamia kwa sehemu kwenye PoS hupunguza kwa kiasi kikubwa mahitaji ya nishati, na kuoanisha Zcash na mipango ya kimataifa ya uendelevu. Kwa asili, PoS hutumia rasilimali chache zaidi ikilinganishwa na PoW inayohitaji hesabu nyingi. Mifumo mseto inalenga kupunguza matumizi ya nishati ikilinganishwa na mifumo ya PoW pekee huku ikidumisha usalama wa juu.
4. **Usalama wa Kiuchumi na Uendelevu**:
   * Kuunganisha PoW na PoS hutofautisha motisha za kiuchumi kwa washiriki wa mtandao, na kuhakikisha usalama thabiti bila kutegemea kupita kiasi mbinu moja.
   * Kuweka sarafu pia huanzisha modeli ya zawadi inayotabirika kwa washiriki, na kutengeneza pendekezo linalovutia kwa wawekezaji wa muda mrefu.
5. **Usalama Ulioongezeka**: Crosslink inalenga kuongeza ustahimilivu wa mtandao dhidi ya mashambulizi ya upangaji upya wa mnyororo kwa kujumuisha PoS pamoja na PoW.

## Taswira / Mfano

![image](/content-images/b34afda4-fe33-448f-b0dd-279fd6cef1f5-73f58cdcc6.webp)

Fikiria huduma ya usafirishaji wa vifurushi inayotoa hati mbili tofauti kwa uwasilishaji uleule. Ya kwanza ni skani ya ufuatiliaji: huonekana haraka, hukuambia kifurushi kina uwezekano mkubwa wa kuwa wapi, na hurekebishwa mara chache. Ya pili ni risiti ya uwasilishaji yenye sahihi: hufika baadaye, lakini ikishakuwepo hakuna anayeibishia.

Daftari kuu lenye muda mfupi wa kusubiri ni skani ya ufuatiliaji, na daftari kuu lililokamilishwa ni risiti yenye sahihi. Zote mbili hueleza mnyororo uleule wa matukio; zinatofautiana katika kasi ya kuonekana na uimara wa kuthibitishwa kwake.

Hali ya Usalama ni kile ambacho bohari hufanya risiti zenye sahihi zinapoacha kuwasili huku skani zikiendelea kujikusanya. Vifurushi bado hupitia ndani ya jengo — lakini ofisi huacha kulipa kwa kutegemea skani pekee hadi sahihi zifikie kiwango kinachohitajika.

## Uchambuzi wa Kina

### Malengo ya Usalama na Utendaji ya Crosslink

Itifaki ya Crosslink inalenga kutoa aina mbili za daftari kuu kwa Zcash: **daftari kuu lililokamilishwa (LOG_fin)** na **daftari kuu lenye muda mfupi wa kusubiri (LOG_ba)**. Daftari kuu lililokamilishwa huhakikisha usalama dhidi ya urejeshaji nyuma chini ya dhana zinazofaa kuhusu itifaki ya Uvumilivu wa Hitilafu za Kibizanti (BFT) au blockchain (BC). Limeundwa kubaki hai na salama hata wakati wa mgawanyiko wa mtandao, likiwa na muda wa kusubiri unaozidi kidogo mara mbili ule wa blockchain ya sasa ya Zcash kwa uthibitisho sawa wa block.

Daftari kuu lenye muda mfupi wa kusubiri hulipanua daftari kuu lililokamilishwa kwa block zisizozidi *L*. Linahakikisha usalama dhidi ya urejeshaji nyuma chini ya itifaki ya blockchain pekee na hudumisha muda wa kusubiri na usalama usio mbaya zaidi kuliko modeli iliyopo ya Zcash. Katika muundo uliorahisishwa wa Crosslink 2*, daftari kuu lenye muda mfupi wa kusubiri hurahisisha maendeleo na utumiaji kwa kufanya kazi kama mnyororo wa PoW.

![image](/content-images/fd039664-4852-4fb0-8c88-0615f1ed116e-41459b81dc.webp)

### Upatikanaji Wenye Kikomo na Hali ya Usalama

Crosslink hujumuisha **Hali ya Usalama** kushughulikia hatari zinazohusishwa na daftari kuu lenye muda mfupi wa kusubiri kutangulia sana daftari kuu lililokamilishwa. Hii huzuia hitilafu kama hali za akaunti zisizosawazika au mapungufu ya usalama yasiyothibitishwa katika suluhisho za muda za watoa huduma. Hali ya Usalama huwashwa ikiwa daftari kuu lililokamilishwa linabaki nyuma kwa block zaidi ya idadi thabiti ya *L*. Katika hali hii, blockchain huendelea na shughuli za PoW (ikihakikisha usalama wa msingi), lakini shughuli za kiuchumi husimamishwa hadi tatizo litatuliwe. Mbinu hii imeundwa kurejea kutoka hali za kipekee kama mashambulizi makubwa huku ikiunga mkono sera za urejeshaji nyuma zinazotegemea utawala.

### Maelezo ya Kiufundi na Utekelezaji

Itifaki ya Crosslink inaendelezwa na kupelekwa kikamilifu na Shielded Labs kwa ushirikiano na washirika wakuu wa mfumo ikolojia kama ZODL. Utekelezaji wa itifaki unajumuisha:

* Kuanzisha mifumo salama ya kuweka sarafu kwa washiriki wa PoS.
* Kurekebisha muundo wa zawadi ili kusawazisha motisha kati ya wachimbaji na wanaoweka sarafu.
* Kuhakikisha uoanifu wa nyuma na matumizi laini kwa watumiaji wakati wa mpito.
* Mfumo wa Waidhinishaji: Itifaki hujumuisha waidhinishaji wanaotia sahihi block. Mwanzoni, waidhinishaji wa kudumu hutumika, kisha huhamia kwenye mfumo unaobadilika ambapo waidhinishaji huchaguliwa kulingana na ZEC iliyowekwa kama dhamana.
* Mantiki ya Uanzishaji: Kuanzishwa kwa Crosslink kunahitaji mabadiliko katika kanuni za makubaliano za Zcash, yakiwemo kufafanua mchakato wa usambazaji wa dhamana na kusasisha kanuni za itifaki ya mtandao ili kuunga mkono makubaliano mseto.
* Utekelezaji wa Hatua kwa Hatua: Itifaki itaanzishwa kwa hatua ili kuhakikisha uthabiti wa mtandao na urekebishaji wa jumuiya. Hatua za awali hulenga utekelezaji wa kiufundi, zikifuatiwa na ujumuishaji wa utawala kwa ajili ya kuchagua waidhinishaji.

Mfano wa awali na nyaraka zake ziko katika hazina ya [zebra-crosslink kwenye GitHub](https://github.com/ShieldedLabs/zebra-crosslink) na [Kitabu cha zebra-crosslink](https://shieldedlabs.github.io/zebra-crosslink/). Kazi ya sasa imeelezwa katika sehemu inayofuata.

### Hali ya Crosslink

Crosslink bado ni pendekezo. Maswali Yanayoulizwa Mara kwa Mara ya Shielded Labs ya [Crosslink](https://shieldedlabs.net/crosslink-faq/) yanasema kuwa “ingehitaji kupitia mchakato wa kawaida wa utawala wa Zcash” kabla ya kuwashwa kwenye mainnet.

Kilichopo leo ni **Feature Net**: mtandao wa majaribio unaoendeshwa na Shielded Labs, wenye sarafu yake ya majaribio, cTAZ, ambapo mtu yeyote anaweza kuchimba, kuweka sarafu na kuendesha kithibitishaji cha mwisho. [Toleo la 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), lililotolewa tarehe 1 Oktoba 2026, huanza kama uthibitisho wa kazi wa kawaida na kuwasha Crosslink kwa hatua: kuweka sarafu kuanzia block 20,736, orodha ya kwanza ya vithibitishaji vya mwisho ikichukuliwa kwenye block 34,560, na ukamilisho wa BFT kuanzia block 36,288 ([chanzo](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555)).

Mambo mawili katika ukurasa huu yamebadilika tangu ulipoandikwa:

* **Jukumu linaloitwa mwidhinishaji hapa linaitwa kithibitishaji cha mwisho** katika programu na maelezo ya matoleo ya Shielded Labs. Wanaoweka sarafu hukabidhi sarafu kwa kithibitishaji cha mwisho, na vithibitishaji vya mwisho vyenye dhamana kubwa zaidi hupiga kura kukamilisha block.
* **Msimbo umehamishwa.** Hazina ya zebra-crosslink hapo juu ilisasishwa mara ya mwisho Aprili 2026. Matoleo ya Feature Net yanatoka kwenye [crosslink_monolith](https://github.com/ShieldedLabs/crosslink_monolith/releases), na muundo umeandikwa katika kitabu cha [Crosslink](https://shieldedlabs.github.io/crosslink_book/).

Ili kuijaribu mwenyewe, fuata mwongozo wa [Crosslink Feature Net](/guides/crosslink-feature-net). Ili kutazama mtandao bila kuendesha chochote, fungua kichupo cha Crosslink kwenye Vifaa vya [ZecHub](https://zechub.wiki/tools?tool=crosslink).

## Athari za Kivitendo

### Athari kwa Mapato ya Wachimbaji wa PoW

Crosslink inatambua jukumu la msingi la wachimbaji wa PoW katika maendeleo ya awali ya Zcash huku ikijiandaa kwa mabadiliko ya taratibu:

* **Zawadi za Block Zilizopunguzwa**:
  * Kadri muda unavyopita, wathibitishaji wa PoS watapokea sehemu inayoongezeka ya zawadi, na kupunguza mapato ya wachimbaji wa PoW. Ugawaji huu upya unaonyesha jukumu linalopungua la PoW katika modeli mseto.
* **Mpito wa Haki**:
  * Itifaki huanzisha mabadiliko hatua kwa hatua, ikihakikisha wachimbaji wana muda wa kutosha wa kuzoea au kuchunguza majukumu mapya ndani ya mfumo ikolojia wa Zcash, kama kuhamia kwenye kuweka sarafu au kuchangia huduma nyingine za mtandao.
* **Kupunguza Hatari za Urasimishaji**:
  * Mabwawa ya kuweka sarafu ya PoS yameundwa kuzuia mkusanyiko wa mamlaka, yakitoa nafasi kwa washiriki wadogo kushiriki kwa usawa. Mbinu hii jumuishi hukabiliana na mkusanyiko wa sasa unaoonekana katika uchimbaji unaotegemea ASIC.
* Wachimbaji wa PoW watapata mapato yaliyopunguzwa kwa kuwa sehemu ya zawadi ya block inagawiwa upya kwa wathibitishaji wa PoS. Ugawaji huu upya huhakikisha mfumo wa motisha uliosawazika, ukiwazawadia wachimbaji na wanaoweka sarafu kwa kuulinda mtandao.
* Mpito wa taratibu umepangwa kupunguza athari za kiuchumi kwa wachimbaji huku ukikuza ushiriki wa washikadau.

Mbinu hii ya makubaliano mawili huimarisha dhamira ya Zcash kwa faragha, uendelevu, na ugatuzi, ikiweka nafasi yake kama kiongozi anayetazama mbele katika eneo la blockchain.

## Makosa ya Kawaida

**Kusoma Crosslink kama kanuni ya makubaliano inayotumika**. Ukurasa huu unaeleza muundo unaopendekezwa wenye mpango wa utekelezaji wa hatua kwa hatua. Kuuanzisha kunahitaji mabadiliko katika kanuni za makubaliano za Zcash, jambo ambalo ramani ya njia na kazi ya ujumuishaji ya Zebra vinahusu.

**Kudhani PoS inachukua nafasi ya uchimbaji**. Crosslink ni muundo mseto: uzalishaji wa block wa PoW huendelea pamoja na uthibitishaji unaotegemea dhamana. Hata katika Hali ya Usalama, blockchain huendelea na shughuli za PoW huku shughuli za kiuchumi zikiwa zimesimamishwa.

**Kuchukulia “ukamilisho” kuwa uthibitisho wa haraka zaidi**. Daftari kuu lililokamilishwa limeundwa kwa muda wa kusubiri unaozidi kidogo mara mbili ule wa blockchain ya sasa ya Zcash kwa uthibitisho sawa wa block. Kinachoongezwa ni usalama dhidi ya urejeshaji nyuma, si kasi — daftari kuu lenye muda mfupi wa kusubiri ndilo mwonekano wa haraka.

**Kuchanganya daftari kuu mbili**. LOG_ba si mnyororo tofauti: hulipanua daftari kuu lililokamilishwa kwa block zisizozidi *L*, na katika muundo wa Crosslink 2* hufanya kazi kama mnyororo wa PoW.

## Kurasa Zinazohusiana

- [Crosslink Feature Net](/guides/crosslink-feature-net) — sakinisha programu ya mezani ya Feature Net, weka sarafu kwa kithibitishaji cha mwisho na uangalie nafasi yako.
- [Zebra Full Node](/zcash-tech/zebra-full-node) — mteja ambao Crosslink 2* imepangwa kujumuishwa ndani yake.
- [Full Nodes](/zcash-tech/full-nodes) — jinsi node zinavyothibitisha kanuni za makubaliano leo, kabla ya mabadiliko yoyote ya makubaliano mseto.
- [Maboresho ya Mtandao](/start-here/network-upgrades) — jinsi mabadiliko ya kanuni za makubaliano yanavyofikia mtandao wa Zcash.
- [Sera ya Fedha ya Zcash](/start-here/zcash-monetary-policy) — muundo wa zawadi ya block ambao Crosslink ingegawa upya.

## Rasilimali za Ziada

- Majadiliano ya jumuiya: [Crosslink: Feature Net Yenye Motisha, kwenye Jukwaa la Jumuiya la Zcash](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210)
- Taarifa rasmi: [Crosslink katika Shielded Labs](https://shieldedlabs.net/crosslink/) na matoleo ya [Feature Net](https://github.com/ShieldedLabs/crosslink_monolith/releases)
- Rejeleo la muundo: [Kitabu cha Crosslink](https://shieldedlabs.github.io/crosslink_book/)

  Rejeleo:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
     <iframe
       className="w-full h-full"
       src="https://www.youtube.com/embed/O4wQi_i7k0I"
       title="Crosslink"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
       allowFullScreen
       loading="lazy"
     />
</div>
