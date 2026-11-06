<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ironwood

> Ironwood ilianzishwa kwenye mainnet ya Zcash katika block 3,428,143 mnamo Julai 28, 2026 UTC, na imekuwa ikitumika tangu wakati huo.

Utakachojifunza: kile ambacho Ironwood inabadilisha, kwa nini hitilafu katika fedha zilizofichwa ni kubwa, na jinsi turnstile inavyomwezesha yeyote kuthibitisha kwamba hakuna ZEC iliyoghushiwa.

Ironwood ni Zcash [uboreshaji wa mtandao](../start-here/network-upgrades) [network upgrade], unaoitwa rasmi NU6.3, unaoanzisha bwawa jipya la faragha lenye jina hilo hilo. [Bwawa la faragha](../using-zcash/shielded-pools) [shielded pool] ni mkusanyiko wa fedha ambao kiasi na wamiliki wake hubaki wamefichwa kwa [kriptografia ya maarifa sifuri](../zcash-tech/zk-snarks) [zero-knowledge cryptography]. Ironwood ipo ili kudhibiti na kukagua hitilafu ya uthabiti iliyopatikana katika bwawa la faragha la Orchard lililopo, na kuipa jumuiya njia thabiti zaidi ya kuthibitisha kwamba jumla ya ugavi wa ZEC ni sahihi. Kanuni zake za makubaliano [consensus] zimeainishwa katika [ZIP 258](https://zips.z.cash/zip-0258).

Kwa nini hili ni muhimu. Kwa fedha za uwazi [transparent] kama Bitcoin, yeyote anaweza kuthibitisha kwamba hakuna sarafu zilizoghushiwa kwa kusoma leja ya umma. Fedha za faragha huficha kiasi, kwa hiyo huwezi kutazama tu. Badala yake, kriptografia yenyewe lazima ihakikishe kwamba hakuna anayeweza kuunda fedha kwa siri. Ironwood ni muhimu kwa sababu hitilafu ilipatikana katika dhamana hiyo kwa bwawa la Orchard. Uboreshaji huu unaziba pengo hilo na humpa yeyote njia ya kuthibitisha kwamba jumla ya ugavi wa ZEC bado ni sahihi.

Je, wewe ni mpya kwa Zcash? Anza na [ZEC ni nini na Zcash](../start-here/what-is-zec-and-zcash) na [Mabwawa ya Faragha](../using-zcash/shielded-pools), kisha rudi hapa.

![Ironwood value migration flow: value leaves the Orchard pool, passes through the turnstile checkpoint, and enters the new Ironwood pool](/content-images/ironwood-flow-8af7a58b99.webp)

## Kwa nini Ironwood ilihitajika

Mwishoni mwa Mei 2026, mtafiti huru wa usalama Taylor Hornby, wakati wa ukaguzi wa itifaki kwa [Shielded Labs](../zcash-organizations/shielded-labs), alifichua kwa uwajibikaji hitilafu ya uthabiti katika bwawa la faragha la Orchard. Orchard lilikuwa bwawa jipya zaidi la faragha la Zcash wakati huo, na kasoro hiyo ilikuwa katika sehemu ya mviringo duara ya sakiti yake ya maarifa sifuri, inayotumia mfumo wa uthibitishaji wa [Halo](../zcash-tech/halo) 2.

1. Hitilafu ya uthabiti inamaanisha kwamba hesabu inayothibitisha muamala [transaction] ni halali haiuhakikishii kikamilifu.
2. Kinadharia, mshambulizi angeweza kutumia kasoro hiyo kughushi thamani batili ndani ya bwawa la Orchard na kutumia fedha ambazo hazikuwa zake hasa, bila kuacha alama ambayo node ya kawaida ingeweza kugundua.
3. Turnstile ya Zcash bado iliweka kikomo cha thamani ambayo ingeweza kutoka kwenye Orchard, hivyo jumla ya ugavi isingeweza kuongezwa, lakini kriptografia ya bwawa lenyewe haikuhakikisha tena kwamba kila sarafu iliyofichwa ndani yake ilikuwa halisi.

![The bug explained: a transaction puts in 5 ZEC, but the flawed proof still passes when 7 ZEC come out, creating 2 ZEC from nothing](/content-images/ironwood-bug-8f689d6f61.webp)

Namba zilizo hapo juu ni picha iliyorahisishwa. Kasoro halisi ilikuwa katika sehemu maalumu ya hesabu ya sakiti, wala si hesabu halisi ya sarafu zinazoingia na kutoka. Jambo la kuelewa ni tu kwamba hitilafu ya uthabiti inaweza kuruhusu thamani kuundwa ndani ya bwawa bila kugunduliwa.

Muhimu, hakuna ushahidi kwamba hitilafu hiyo iliwahi kutumiwa vibaya, hakuna ushahidi wa athari kwa fedha za watumiaji, na hakuna ushahidi kwamba jumla ya ugavi wa ZEC ilibadilika. Ilipatikana kupitia utafiti wa usalama na kurekebishwa kabla ya madhara yoyote yanayojulikana.

## Mwitikio

Jumuiya ya Zcash ilitoa marekebisho kwa hatua badala ya yote kwa wakati mmoja.

![Ironwood response timeline: the Orchard bug is found in May 2026, the pool is paused in June 2026, the circuit is fixed in NU6.2, and Ironwood activated at block 3,428,143 on July 28, 2026](/content-images/ironwood-timeline-36243f0cd7.webp)

1. Mapema Juni 2026, hatua ya muda ilizima bwawa la Orchard huku marekebisho kamili yakitayarishwa.
2. Uboreshaji wa NU6.2 ulisahihisha sakiti yenyewe ya Orchard, ukiziba udhaifu wa msingi wa uthabiti.
3. Uboreshaji wa NU6.3, Ironwood, unaanzisha bwawa jipya la faragha na alama ya ukaguzi wa umma ili thamani iweze kutoka kwenye bwawa la zamani la Orchard chini ya ukaguzi kamili.

![The fix in NU6.2: the corrected proof requires inputs to equal outputs, so a valid 5 ZEC output passes while an attempt to output 7 ZEC is rejected](/content-images/ironwood-fix-bb4f70ddc9.webp)

## Bwawa la Ironwood hufanya nini

NU6.2 ililinda sakiti ya Orchard kwa miamala yote mipya, lakini thamani iliyoundwa chini ya kanuni za zamani bado ipo katika bwawa la Orchard. Ironwood huipa thamani hiyo mahali safi pa kuelekea na njia ya kuikagua inapohama.

Bwawa la Ironwood ni bwawa la thamani ya faragha lililoundwa na NU6.3 katika block 3,428,143. Limejengwa juu ya sakiti iliyosahihishwa na hutumia muundo wa dokezo [note] linaloweza kurejeshwa kwa enzi ya quantum (muundo unaoruhusu fedha kurejeshwa ikiwa [kompyuta za quantum](../zcash-tech/post-quantum-security) [quantum computers] zitavunja kriptografia ya leo), uliofafanuliwa katika [ZIP 2005](https://zips.z.cash/zip-2005).

1. Baada ya uanzishaji, bwawa [pool] la zamani la Orchard huwa la matumizi pekee, hivyo hakuna thamani mpya inayoweza kuingia ndani yake.
2. Thamani mpya ya faragha [shielded] badala yake huingia katika Ironwood.
3. Ndani ya Ironwood, ZEC ya faragha hudumisha faragha [privacy] inayomficha mtumaji, mpokeaji, na kiasi. Kuhamisha ZEC kutoka Orchard hadi Ironwood huonyesha kiasi kilichohamishwa.

## Turnstile

Wazo kuu katika Ironwood ni turnstile, kituo cha ukaguzi wa hesabu ambacho kila sarafu lazima ipitie inapohama kutoka bwawa la zamani la Orchard kwenda Ironwood.

> Turnstile hufanya kwa fedha zilizofichwa kile ambacho mlango wa kioo hufanya kwa ghala la benki. Bado huwezi kuona ndani, lakini unaweza kuhesabu kwa usahihi kinachoingia na kinachotoka.

1. Fedha zinazotoka Orchard huhesabiwa katika sehemu ya uthibitishaji ya umma kabla ya kuingia Ironwood.
2. Hii humwezesha yeyote kukagua kiasi cha ZEC kinachohama, na kuimarisha imani katika ugavi halisi unaozunguka.
3. Ikiwa ZEC yoyote bandia ingeundwa kupitia hitilafu ya awali, uhasibu huu wa uhamishaji ndio ungeifunua.

Turnstile si mpya kwa Zcash. Mtandao umewahi kuzitumia katika mipaka kati ya mabwawa ya Sprout, Sapling, na Orchard, ili thamani inayohama kati ya mabwawa ibaki ikikaguliwa na hakuna bwawa linaloweza kutoa zaidi ya thamani iliyoingia kihalali.

Kanuni za makubaliano huweka kila bwawa la thamani, ikiwemo Ironwood, chini ya kikomo cha juu cha fedha cha mtandao, hivyo salio la mabwawa haliwezi kamwe kuwa hasi.

## Watumiaji wanahitaji kufanya nini

Pochi [wallet] na programu ya node hushughulikia mengi ya haya kiotomatiki, lakini mabadiliko ya vitendo ni rahisi: kadiri muda unavyopita, hamisha akiba za faragha kutoka bwawa la zamani la Orchard kupitia turnstile hadi bwawa la Ironwood. Kila uhamisho huonyesha kiasi chake kwenye blockchain, hivyo pochi zinazofuata [ZIP 318](https://zips.z.cash/zip-0318) hugawanya kiasi hicho katika viwango vya kawaida na kuvituma kadiri muda unavyopita. Fuata mwongozo kutoka kwa mtoa pochi wako, na udumishe programu yako katika toleo linalotumika.

## Fahirisi ya istilahi

| Istilahi | Maana kwa lugha rahisi |
|---|---|
| Shielded pool | Mkusanyiko wa fedha ambazo kiasi na wamiliki wake wamefichwa kwa kriptografia ya maarifa sifuri |
| Soundness bug | Kasoro inayoruhusu muamala batili kupita ukaguzi wa thibitisho kana kwamba ni halali |
| Turnstile | Kituo cha ukaguzi wa umma kinachohesabu thamani inayohama kati ya mabwawa ili ugavi ubaki ukikaguliwa |
| Spend-only | Bwawa ambalo unaweza kutumia fedha kutoka humo, lakini huwezi kuongeza thamani mpya |
| Network upgrade (NU) | Mabadiliko yaliyoratibiwa kwa kanuni za makubaliano za Zcash, yanayoanzishwa katika urefu maalumu wa block |
| Quantum-recoverable note | Muundo wa dokezo ulioundwa ili fedha ziweze kurejeshwa iwapo kompyuta za quantum zitavunja kriptografia ya leo |

## Maswali yanayoulizwa mara kwa mara

Je, ZEC yangu iliathirika? Hapana. Hakuna ushahidi kwamba hitilafu hiyo iliwahi kutumiwa, hakuna athari kwa fedha za watumiaji, na hakuna mabadiliko katika jumla ya ugavi.

Je, ninahitaji kufanya chochote? Dumisha pochi yako na programu ya node katika toleo linalotumika. Kutumia fedha za Orchard huzihamisha kwenda Ironwood, na kiasi kinachovuka ni cha umma. Baadhi ya pochi hutoa uhamishaji unaotuma kiasi cha kawaida kadiri muda unavyopita, ili iwe vigumu zaidi kuunganisha salio lako. Fuata mwongozo wa mtoa pochi wako.

Je, Zcash bado ni ya faragha? Ndiyo. Malipo ndani ya Ironwood huficha mtumaji, mpokeaji, na kiasi, kama malipo ya Orchard yalivyofanya. Kiasi kinachohama kati ya mabwawa, kama vile kutoka Orchard hadi Ironwood, ni cha umma. Uboreshaji huu unahusu uadilifu wa ugavi.

Je, hitilafu hiyo iliwahi kutumiwa vibaya? Hakuna ushahidi kwamba ilitumika. Ilipatikana kupitia utafiti wa usalama, ikafichuliwa kwa uwajibikaji, na kurekebishwa kabla ya madhara yoyote yanayojulikana.

Nini hutokea kwa bwawa la zamani la Orchard? Linakuwa la matumizi pekee. Hakuna thamani mpya inayoweza kuingia ndani yake, na thamani iliyopo huhamia Ironwood kupitia turnstile, ambako uhamishaji huo hukaguliwa hadharani.

## Jaribu uelewa wako

Ikiwa ZEC ndani ya mabwawa ya faragha imefichwa, yeyote anawezaje kuthibitisha kwamba hitilafu ya Orchard haikuongeza kwa siri jumla ya ugavi?

<details>
<summary>Jibu</summary>

Kupitia turnstile. Kila sarafu inayotoka katika bwawa la zamani la Orchard huhesabiwa katika kituo cha ukaguzi wa umma inapoingia Ironwood. Ikiwa thamani zaidi ingejaribu kutoka kuliko iliyoingia kihalali, uhasibu haungelingana, hivyo thamani yoyote bandia ambayo hitilafu ingeweza kuunda ingefichuliwa katika lango hilo.
</details>

### Rasilimali

[ZIP 258: Utekelezaji wa Uboreshaji wa Mtandao wa NU6.3](https://zips.z.cash/zip-0258)

[ZIP 257: Utekelezaji wa Upunguzaji wa Muda wa Udhaifu wa Orchard na Uboreshaji wa Mtandao wa NU6.2](https://zips.z.cash/zip-0257)

[ZIP 2005: Uwezo wa Kurejeshwa kwa Quantum wa Ironwood](https://zips.z.cash/zip-2005)

[ZIP 229: Muundo wa Muamala wa Toleo la 6](https://zips.z.cash/zip-0229)

[ZIP 318: Uhamishaji kutoka Orchard hadi Ironwood](https://zips.z.cash/zip-0318)

[Ironwood: Bwawa Jipya la Faragha kwa Zcash](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/)

### Tazama pia

[Maboresho ya Mtandao wa Zcash](../start-here/network-upgrades)

[Mabwawa ya Faragha](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Usalama wa Baada ya Quantum](../zcash-tech/post-quantum-security)

[Shielded Labs](../zcash-organizations/shielded-labs)

[ZEC ni nini na Zcash](../start-here/what-is-zec-and-zcash)

---

Mfululizo: [Faharasa ya Maboresho ya Mtandao](../start-here/network-upgrades) · Iliyotangulia: [NU6.2](../zcash-tech/nu6-2)
