<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Crosslink_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Itifaki ya Crosslink

## TL;DR

* Itifaki Crosslink ni muundo uliopendekezwa kwa hatua Zcash's Uthibitisho-wa-Kazi/Uthibitisho-wa-Agizo (PoW/PoS). Inaunganisha PoW na itifaki ya Byzantine Fault Tolerance (BFT), kuwezesha uthabiti uliohakikishwa mradi PoW au PoS inabaki salama.
* PoS mseto inawatambulisha notaria wanaothibitisha vitalu kulingana na ZEC iliyowekewa vigingi — mwanzoni ikiwa tuli, baadaye ikichaguliwa kulingana na ZEC.
* Crosslink inalenga kutoa leja mbili: **leja iliyokamilishwa (LOG_fin)** kwa usalama wa kurudi nyuma, na **leja ya latency ya chini (LOG_ba)** ambayo inaiongeza kwa si zaidi ya vitalu vya *L*.
* **Hali ya Usalama** huamilishwa ikiwa leja iliyokamilishwa itasalia nyuma kwa zaidi ya vitalu vya *L*: PoW inaendelea, lakini shughuli za kiuchumi husimama hadi suala hilo litakapotatuliwa.
* Baada ya muda, wathibitishaji wa PoS watapokea sehemu inayoongezeka ya zawadi, na kupunguza mapato ya wachimbaji wa PoW; itifaki hiyo inaleta mabadiliko polepole.
* Itifaki hiyo inatengenezwa na Shielded Labs, ikiwa na ramani ya kuunganisha Crosslink 2* kwenye mteja Zcash's Zebra.
* Crosslink haifanyi kazi kwenye mtandao mkuu wa Zcash. Inaendeshwa kwenye Feature Net, Shielded Labs', mtandao wa majaribio ambao mtu yeyote anaweza kujiunga nao. Tazama "Mahali Crosslink inaposimama" hapa chini.

## Maelezo ya Msingi

### Utangulizi: Zcash Hybrid PoS na Itifaki ya Crosslink

Itifaki Crosslink ni maendeleo muhimu katika mageuzi ya Zcash, ikiielekeza kwenye mfumo wa **Uthibitisho Mseto wa Hisa (PoS)** na **Uthibitisho wa Kazi (PoW)**. PoW ya jadi, ingawa inaaminika kwa kuhakikisha usalama wa mtandao, inakabiliwa na ukosoaji kwa matumizi ya nishati na hatari za ujumuishaji zinazohusiana na uchimbaji madini wa viwandani. Crosslink inaanzisha mfumo mseto, ikiunganisha uimara uliothibitishwa wa PoW na faida za ufanisi na utawala za PoS.

![image](/content-images/a2ffb19d-e570-4723-b669-a66e14fc6b71-a727c958de.webp)

Mpito huu unaendana na mitindo ya kimataifa katika uvumbuzi wa blockchain, ambapo miradi inabadilika na kuwa mifumo endelevu ya mazingira na iliyogatuliwa. Mfumo wa makubaliano mawili wa Crosslinks unahakikisha Zcash inadumisha dhamana zake kali za faragha za kriptografia huku ikibadilika ili kukabiliana na changamoto za kisasa.

Mbinu mseto ya Uthibitisho wa Kazi (PoS) inachanganya Uthibitisho wa Kazi wa jadi (PoW) na PoS, ikilenga kushughulikia udhaifu kama vile mashambulizi ya 51% huku ikidumisha ugatuzi na kupunguza matumizi ya nishati. PoS mseto inaanzisha notarier wanaothibitisha vitalu kulingana na ZEC. Utaratibu huu umeundwa ili kuboresha usalama wa mnyororo na uthibitishaji wa vituo vya ukaguzi, na kutoa njia mbadala imara zaidi kwa mifumo safi ya PoW.

### Kwa nini PoS/PoW ya mseto kama jaribio la kwanza?

* Inafanya maendeleo kuelekea PoS safi.
* Inawezesha uchimbaji madini na matumizi ya pamoja na uvukaji wa mfumo ikolojia.
* Inapunguza matatizo yanayowezekana ya usalama kwa kutumia itifaki ya PoS hadi iwe na hisa na imani kubwa zaidi ya kithibitishaji.
* Mbinu ya jumla imeonyeshwa na Ethereum katika Uzalishaji.

### Crosslink ni nini

Itifaki Crosslink ni muundo uliopendekezwa kwa hatua Zcash's Uthibitisho-wa-Kazi/Uthibitisho-wa-Agizo (PoW/PoS). Inaunganisha PoW na itifaki ya Byzantine Fault Tolerance (BFT), kuwezesha uthabiti uliohakikishwa mradi PoW au PoS inabaki salama. Ubunifu unalenga kuimarisha usalama wa mtandao na ugatuzi kwa kuingiza uthibitisho wa dau huku ukidumisha ushiriki wa wachimbaji. Kipengele muhimu cha pendekezo, kinachoitwa Crosslink 2, hurahisisha usanifu kwa kuunganisha wapendekezaji na wachimbaji wa BFT. Mbinu hii iliyorahisishwa hupunguza mabadiliko ya kimuundo na inaruhusu matumizi ya safu ya BFT "isiyo ya kawaida", na kuifanya iwe rahisi kuiga na kusambaza huku ikidumisha viwango vya usalama wa hali ya juu.

Mpango wa utekelezaji unajumuisha ramani ya barabara yenye makadirio ya gharama za uhandisi za kuunganisha Crosslink 2* katika mteja Zcash's Zebra. Utekelezaji huu wa awamu unazingatia kusawazisha motisha za wadau, kupunguza usumbufu, na kuendana na malengo Zcash kwa ajili ya kupanuka, utumiaji, na ugatuzi. Kuongezeka kwa imani katika sifa imara za usalama za itifaki kunaimarisha zaidi uwezo wake kama hatua muhimu katika mageuzi Zcash. Kwa kushughulikia ufanisi wa nishati na kuimarisha mifumo ya makubaliano, Crosslink inatoa suluhisho linalotazamia mbele kwa changamoto zinazobadilika za blockchain. Kwa maelezo zaidi, rejelea [Hifadhi ya GitHub](https://github.com/ShieldedLabs/zebra-crosslink) na [Jukwaa la Jumuiya ya Zcash](https://forum.zcashcommunity.com).

### Malengo na Malengo ya Crosslink

Itifaki Crosslink imeundwa kushughulikia malengo kadhaa ya kimkakati muhimu kwa mustakabali wa Zcash:

1. **Ugatuzi**:
   * Kwa kuingiza PoS, Zcash hupunguza utegemezi wa vifaa maalum vya PoW (ASICs), ambavyo mara nyingi huzingatia nguvu ya uchimbaji madini miongoni mwa waendeshaji wachache wakubwa.
   * PoS inaruhusu ushiriki kutoka kwa jumuiya pana zaidi, ambapo wenye sarafu huweka mali zao kwenye hatari ili kulinda mtandao, na kuhakikisha makubaliano yaliyosambazwa zaidi.
   * Kwa kuanzisha uthibitisho wa masharti, itifaki inahakikisha kwamba washiriki wa kiuchumi wana jukumu kubwa katika makubaliano, na kupunguza utegemezi wa uchimbaji madini pekee.
2. **Utawala Ulioimarishwa**:
   * Wamiliki wa sarafu hupata haki za kupiga kura kupitia kuwekewa vikwazo, na kuwawezesha kushawishi maamuzi kuhusu uboreshaji wa mtandao, mgao wa fedha, na vipaumbele vya mfumo ikolojia. Utaratibu huu wa kidemokrasia unalinganisha mageuko ya itifaki na maslahi ya jamii.
3. **Ufanisi wa Nishati**:
   * Kubadilisha kwa kiasi fulani hadi PoS hupunguza kwa kiasi kikubwa mahitaji ya nishati, na kuoanisha Zcash na mipango endelevu ya kimataifa. PoS kiasili hutumia rasilimali kidogo ikilinganishwa na PoW nzito ya kompyuta. Mifumo mseto inalenga kupunguza matumizi ya nishati ikilinganishwa na mifumo ya PoW pekee huku ikidumisha usalama wa hali ya juu.
4. **Usalama wa Kiuchumi na Uendelevu**:
   * Kuchanganya PoW na PoS hutofautisha motisha za kiuchumi kwa washiriki wa mtandao, na kuhakikisha usalama thabiti bila kutegemea sana utaratibu mmoja.
   * Staking pia inaleta mfumo wa zawadi unaoweza kutabirika kwa washiriki, na kuunda pendekezo la kuvutia kwa wawekezaji wa muda mrefu.
5. **Kuongeza Usalama**: Crosslink inalenga kuongeza ustahimilivu wa mtandao dhidi ya mashambulizi ya upangaji upya wa mnyororo kwa kuunganisha PoS pamoja na PoW.

## Taswira / Analojia

![image](/content-images/b34afda4-fe33-448f-b0dd-279fd6cef1f5-73f58cdcc6.webp)

Fikiria huduma ya vifurushi inayotoa hati mbili tofauti kwa ajili ya uwasilishaji sawa. Ya kwanza ni skanisho la ufuatiliaji: inaonekana haraka, inakuambia mahali ambapo kifurushi kina uwezekano mkubwa, na mara kwa mara hurekebishwa. Ya pili ni risiti ya uwasilishaji iliyosainiwa: inafika baadaye, lakini mara tu inapokuwepo hakuna anayeipinga.

Kitabu cha kumbukumbu cha muda mfupi ni skanisho la ufuatiliaji, na kitabu cha kumbukumbu kilichokamilishwa ni risiti iliyosainiwa. Vyote viwili vinaelezea mlolongo sawa wa matukio; hutofautiana katika jinsi yanavyoonekana haraka na jinsi yanavyoshikilia kwa uthabiti.

Hali ya Usalama ndiyo inayofanywa na ghala la kuhifadhia bidhaa wakati risiti zilizosainiwa zinaacha kufika huku skani zikiendelea kurundikana. Vifurushi bado hupita ndani ya jengo — lakini ofisi huacha kulipa dhidi ya skani pekee hadi saini zitakapofika.

## Kupiga Mbizi Kina

### Malengo ya Usalama na Utendaji wa Crosslink

Itifaki Crosslink inalenga kutoa aina mbili za leja za Zcash: **leja iliyokamilishwa (LOG_fin)** na **leja ya latency ya chini (LOG_ba)**. Leja iliyokamilishwa inahakikisha usalama wa kurudi nyuma chini ya mawazo yanayofaa kuhusu itifaki ya Byzantine Fault Tolerance (BFT) au blockchain (BC). Imeundwa ili kubaki hai na salama hata chini ya vizigeu vya mtandao, huku latency ikiwa zaidi ya mara mbili ya ile ya blockchain ya sasa Zcash kwa uthibitisho sawa wa block.

Kitabu cha kumbukumbu cha chini kinapanua kitabu kilichokamilishwa kwa si zaidi ya vitalu vya *L*. Huhakikisha usalama wa kurudi nyuma chini ya itifaki ya blockchain pekee na hudumisha utulivu na usalama usio mbaya zaidi kuliko modeli iliyopo Zcash. Katika muundo ulioratibiwa wa Crosslink 2*, kitabu cha kumbukumbu cha chini cha kumbukumbu hurahisisha ukuzaji na utumiaji kwa kufanya kazi kama mnyororo wa PoW.

![image](/content-images/fd039664-4852-4fb0-8c88-0615f1ed116e-41459b81dc.webp)

### Upatikanaji na Hali ya Usalama Yenye Mipaka

Crosslink inajumuisha **Hali ya Usalama** ili kushughulikia hatari zinazohusiana na leja ya muda mfupi inayoendelea mbele ya leja iliyokamilishwa. Hii huzuia tofauti, kama vile hali za akaunti zisizo na usawa au mapengo ya usalama ambayo hayajathibitishwa katika suluhisho za muda na watoa huduma. Hali ya Usalama huwashwa ikiwa leja iliyokamilishwa inarudi nyuma kwa zaidi ya vitalu vya *L* vya mara kwa mara. Wakati wa hali hii, blockchain inaendelea na shughuli za PoW (kuhakikisha usalama wa msingi), lakini shughuli za kiuchumi husitishwa hadi suala litakapotatuliwa. Utaratibu huu umeundwa ili kupona kutokana na hali za kipekee kama vile mashambulizi makubwa huku ukiunga mkono sera za kurejesha nyuma zinazotegemea utawala.

### Maelezo ya Kiufundi na Utekelezaji

Itifaki Crosslink inaendelezwa na kusambazwa kikamilifu na Shielded Labs kwa ushirikiano na washirika muhimu wa mfumo ikolojia kama vile ZODL. Utekelezaji wa itifaki hiyo unajumuisha:

* Kuanzisha mifumo salama ya kuweka akiba kwa washiriki wa PoS.
* Kurekebisha muundo wa zawadi ili kusawazisha motisha kati ya wachimbaji madini na wadau.
* Kuhakikisha utangamano wa nyuma na uzoefu mzuri wa mtumiaji wakati wa mpito.
* Mfumo wa Notari: Itifaki hii inajumuisha notari ambao husaini kwenye vitalu. Hapo awali, notari tuli hutumika, na kubadilika hadi mfumo unaobadilika ambapo notari huchaguliwa kulingana na ZEC.
* Mantiki ya Uanzishaji: Kuanzishwa kwa Crosslink kunahitaji mabadiliko katika sheria za makubaliano ya Zcash, ikiwa ni pamoja na kufafanua mchakato wa usambazaji wa hisa na kusasisha sheria za itifaki za mtandao ili kuunga mkono makubaliano mseto.
* Utekelezaji wa Awamu: Itifaki itaanza kwa hatua ili kuhakikisha uthabiti wa mtandao na marekebisho ya jamii. Awamu za awali zinalenga utekelezaji wa kiufundi, ikifuatiwa na ujumuishaji wa utawala kwa ajili ya kuchagua notarier.

Mfano wa awali na nyaraka zake ziko katika [hazina ya zebra-crosslink kwenye GitHub](https://github.com/ShieldedLabs/zebra-crosslink) na [Kitabu cha kiungo cha zebra](https://shieldedlabs.github.io/zebra-crosslink/)Kazi ya sasa imeelezwa katika sehemu inayofuata.

### Ambapo Crosslink inasimama

Crosslink bado ni pendekezo. Shielded Labs' [Maswali Crosslink](https://shieldedlabs.net/crosslink-faq/) inasema "itahitaji kupitia mchakato wa kawaida wa utawala wa Zcash " kabla ya kuweza kuamilishwa kwenye mtandao mkuu.

Kilichopo leo ni **Feature Net**: mtandao wa majaribio unaoendeshwa na Shielded Labs, ukiwa na sarafu yake ya majaribio, cTAZ, ambapo mtu yeyote anaweza kuchimba, kuweka dau na kuendesha kiashiria cha mwisho. [Toleo la 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), iliyotolewa tarehe 1 Oktoba 2026, inaanza kama uthibitisho wa kazi na inawasha Crosslink katika hatua: ikiwekwa kutoka kwenye kitalu namba 20,736, orodha ya kwanza ya wahitimu waliochukuliwa kwenye kitalu namba 34,560, na mwisho wa BFT kutoka kitalu namba 36,288 ([chanzo](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555)).

Mambo mawili kwenye ukurasa huu yamebadilika tangu yalipoandikwa:

* **Jukumu linaloitwa mthibitishaji hapa linaitwa mkamilishaji** katika programu na maelezo ya kutolewa Shielded Labs'. Wawekaji hugawa sarafu kwa mkamilishaji, na wakamilishaji wenye kura nyingi zaidi za hisa ili kukamilisha vitalu.
* **Msimbo umehamishwa.** Hifadhi ya zebra-crosslink hapo juu ilisasishwa mara ya mwisho mnamo Aprili 2026. Matoleo Feature Net yanatoka [kiungo_msalaba_monolithi](https://github.com/ShieldedLabs/crosslink_monolith/releases), na muundo umeandikwa katika [Kitabu Crosslink](https://shieldedlabs.github.io/crosslink_book/).

Ili kujaribu mwenyewe, fuata [Vipengele vya Crosslink Feature Net](/guides/crosslink-feature-net) mwongozo. Ili kutazama mtandao bila kuendesha chochote, fungua kichupo cha Crosslink [Zana ZecHub](https://zechub.wiki/tools?tool=crosslink).

## Matokeo ya Kivitendo

### Athari kwa Mapato ya Wachimbaji wa PoW

Crosslink inatambua jukumu la msingi la wachimbaji wa PoW katika maendeleo ya mapema Zcash huku ikijiandaa kwa mabadiliko ya taratibu:

* **Zawadi za Block Zilizopunguzwa**:
  * Baada ya muda, wathibitishaji wa PoS watapokea sehemu inayoongezeka ya zawadi, na kupunguza mapato ya wachimbaji wa PoW. Usambazaji huu unaonyesha kupungua kwa jukumu la PoW katika mfumo mseto.
* **Mpito wa Haki**:
  * Itifaki hii inaleta mabadiliko hatua kwa hatua, ikihakikisha wachimbaji wana muda wa kutosha wa kuzoea au kuchunguza majukumu mapya ndani ya mfumo ikolojia Zcash, kama vile kubadilika hadi kuwekeza au kuchangia huduma zingine za mtandao.
* **Kupunguza Hatari za Utawala wa Kati**:
  * Mabwawa ya kuweka PoS yameundwa ili kuzuia mkusanyiko wa nguvu, na kuwapa wachezaji wadogo nafasi ya kushiriki kwa usawa. Mbinu hii jumuishi inapinga mkusanyiko wa sasa unaoonekana katika uchimbaji madini unaotegemea ASIC.
* Wachimbaji wa PoW watapata mapato yaliyopunguzwa kwani sehemu ya zawadi ya block inahamishiwa kwa wathibitishaji wa PoS. Uhamishaji huu unahakikisha mfumo wa motisha uliosawazishwa, unaowapa thawabu wachimbaji na wadau wote kwa ajili ya kulinda mtandao.
* Mpito wa taratibu umepangwa ili kupunguza athari za kiuchumi kwa wachimbaji madini huku ikikuza ushiriki wa wadau.

Utaratibu huu wa makubaliano mawili unaimarisha kujitolea Zcash's kwa faragha, uendelevu, na ugatuzi wa madaraka, na kuiweka kama kiongozi anayeangalia mbele katika nafasi ya blockchain.

## Makosa ya Kawaida

**Kusoma Crosslink kama sheria ya makubaliano amilifu**. Ukurasa huu unaelezea muundo uliopendekezwa wenye mpango wa utekelezaji wa awamu. Kuanzisha unahitaji mabadiliko kwenye sheria za makubaliano Zcash, ambayo ndiyo maana ya ramani ya barabara na kazi ya ujumuishaji wa Zebra.

**Tukichukulia PoS inachukua nafasi ya uchimbaji madini**. Crosslink ni muundo mseto: Uzalishaji wa vitalu vya PoW unaendelea pamoja na uthibitishaji wa dau. Hata katika Hali ya Usalama, blockchain inaendelea na shughuli za PoW huku shughuli za kiuchumi zikisitishwa.

**Kuchukulia "mwisho" kama uthibitisho wa haraka**. Daftari lililokamilishwa limeundwa kwa ajili ya muda wa kuchelewa zaidi ya mara mbili ya ule wa blockchain Zcash ya sasa kwa uthibitisho sawa wa vitalu. Kinachoongeza ni usalama wa kurudi nyuma, si kasi — daftari la muda wa chini ndilo mwonekano wa haraka.

**Kuchanganya leja mbili**. LOG_ba si mnyororo tofauti: hupanua leja iliyokamilishwa kwa si zaidi ya vitalu *L*, na katika muundo wa Crosslink 2* hufanya kazi kama mnyororo wa PoW.

## Kurasa Zinazohusiana

- [Vipengele vya Crosslink Feature Net](/guides/crosslink-feature-net) — sakinisha programu ya eneo-kazi ya Feature Net, tumia kidhibiti cha mwisho na uangalie nafasi yako.
- [Kifundo Kamili cha Zebra](/zcash-tech/zebra-full-node) — mteja Crosslink 2* amepangwa kuunganishwa ndani yake.
- [Nodi Kamili](/zcash-tech/full-nodes) — jinsi nodi zinavyothibitisha sheria za makubaliano leo, kabla ya mabadiliko yoyote ya makubaliano mseto.
- [Maboresho ya Mtandao](/start-here/network-upgrades) — jinsi mabadiliko ya sheria za makubaliano yanavyofikia mtandao Zcash.
- [Sera ya Fedha Zcash](/start-here/zcash-monetary-policy) — muundo wa zawadi ya block ambao Crosslink ingesambaza upya.

## Rasilimali za Ziada

- Majadiliano ya jamii: [Crosslink: Motisha ya Feature Net, kwenye Jukwaa la Jumuiya ya Zcash](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210)
- Masasisho rasmi: [Crosslink katika Shielded Labs](https://shieldedlabs.net/crosslink/) na [Matoleo Feature Net](https://github.com/ShieldedLabs/crosslink_monolith/releases)
- Marejeleo ya muundo: [Kitabu Crosslink](https://shieldedlabs.github.io/crosslink_book/)

  Marejeleo:

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
