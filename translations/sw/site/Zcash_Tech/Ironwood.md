<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ironwood

> Ironwood iliwashwa kwenye mtandao mkuu wa Zcash katika kitalu namba 3,428,143 mnamo Julai 28, 2026 UTC, na imekuwa ikitumika moja kwa moja tangu wakati huo.

Utakachochukua: mabadiliko Ironwood, kwa nini hitilafu katika pesa zilizofichwa ni kubwa, na jinsi turnstile inavyomruhusu mtu yeyote kuthibitisha kwamba hakuna ZEC iliyoghushiwa.

Ironwood ni Zcash [uboreshaji wa mtandao](../start-here/network-upgrades), rasmi NU6.3, ambayo inaleta bwawa jipya lenye ngao lenye jina moja [bwawa la kuogelea lenye ngao](../using-zcash/shielded-pools) ni seti ya fedha ambazo kiasi na wamiliki wake hufichwa na [usimbaji fiche usio na maarifa](../zcash-tech/zk-snarks)Ironwood ipo ili kudhibiti na kukagua mdudu wa uthabiti aliyepatikana katika bwawa lililopo la bustani Orchard, na kuipa jamii njia bora ya kuangalia kama jumla ya usambazaji wa ZEC ni wa kweli. Sheria zake za makubaliano zimeainishwa katika [ZIP 258](https://zips.z.cash/zip-0258).

Kwa nini hii ni muhimu? Kwa pesa zenye uwazi kama Bitcoin, mtu yeyote anaweza kuhakikisha kuwa hakuna sarafu zilizoghushiwa kwa kusoma leja ya umma. Pesa zilizolindwa huficha kiasi, kwa hivyo huwezi kuangalia tu. Badala yake, usimbaji fiche wenyewe lazima uhakikishe kuwa hakuna mtu anayeweza kuunda pesa kwa siri. Ironwood ni muhimu kwa sababu hitilafu ilipatikana katika dhamana hiyo ya bwawa Orchard. Uboreshaji huo unafunga pengo na kumpa mtu yeyote njia ya kuthibitisha kwamba jumla ya usambazaji wa ZEC bado ni wa kweli.

Je, ni mgeni katika Zcash? Anza na [ZEC na Zcash ni nini?](../start-here/what-is-zec-and-zcash) na [Mabwawa ya Kuogelea Yenye Ngao](../using-zcash/shielded-pools), kisha rudi hapa.

![Ironwood value migration flow: value leaves the Orchard pool, passes through the turnstile checkpoint, and enters the new Ironwood pool](/content-images/ironwood-flow-8af7a58b99.webp)

## Kwa nini Ironwood ilihitajika

Mwishoni mwa Mei 2026, mtafiti huru wa usalama Taylor Hornby, wakati wa ukaguzi wa itifaki kwa [Shielded Labs](../zcash-organizations/shielded-labs), ilifichua kwa uwajibikaji hitilafu ya utimamu katika bwawa Orchard lililolindwa. Orchard ilikuwa bwawa jipya zaidi Zcash's lililolindwa wakati huo, na dosari hiyo ilikuwa katika sehemu ya mviringo ya mzunguko wake wa maarifa yasiyo na msingi, ambayo hutumia [Halo](../zcash-tech/halo) 2 mfumo wa kuthibitisha.

1. Hitilafu ya uthabiti inamaanisha kuwa hesabu inayothibitisha muamala ni halali haitoi dhamana kamili.
2. Kinadharia, mshambuliaji angeweza kutumia dosari hiyo kughushi thamani batili ndani ya bwawa Orchard na kutumia pesa ambazo hazikuwa zake, bila kuacha alama yoyote ambayo nodi ya kawaida ingekamata.
3. Kipande Zcash's bado kiliweka kikomo cha thamani ambayo ingeondoka Orchard, kwa hivyo jumla ya usambazaji haikuweza kuongezwa, lakini usimbaji fiche wa bwawa hilo haukuhakikisha tena kwamba kila sarafu iliyofichwa ndani yake ilikuwa halisi.

![The bug explained: a transaction puts in 5 ZEC, but the flawed proof still passes when 7 ZEC come out, creating 2 ZEC from nothing](/content-images/ironwood-bug-8f689d6f61.webp)

Nambari zilizo hapo juu ni picha iliyorahisishwa. Dosari halisi ilikuwa katika kipande maalum cha hesabu ya saketi, si hesabu halisi ya sarafu zinazoingia na kutoka. Jambo la kuzingatia ni kwamba tu kidudu cha uthabiti kinaweza kuruhusu thamani iundwe ndani ya bwawa bila kugunduliwa.

Muhimu zaidi, hakuna ushahidi kwamba hitilafu hiyo iliwahi kutumiwa vibaya, hakuna ushahidi wa athari kwa fedha za watumiaji, na hakuna ushahidi kwamba jumla ya usambazaji wa ZEC ilibadilika. Ilipatikana kupitia utafiti wa usalama na kurekebishwa kabla ya madhara yoyote yanayojulikana.

## Jibu

Jumuiya ya Zcash ilisafirisha marekebisho kwa hatua badala ya yote kwa wakati mmoja.

![Ironwood response timeline: the Orchard bug is found in May 2026, the pool is paused in June 2026, the circuit is fixed in NU6.2, and Ironwood activated at block 3,428,143 on July 28, 2026](/content-images/ironwood-timeline-36243f0cd7.webp)

1. Mwanzoni mwa Juni 2026, hatua ya muda ilizima bwawa Orchard huku marekebisho kamili yakiandaliwa.
2. Uboreshaji wa NU6.2 ulirekebisha saketi ya Orchard yenyewe, na kufunga udhaifu wa msingi wa utimamu.
3. Uboreshaji wa NU6.3, Ironwood, unaleta bwawa jipya lenye ulinzi na kituo cha ukaguzi cha umma ili thamani iweze kuhama kutoka bwawa la zamani Orchard chini ya ukaguzi kamili.

![The fix in NU6.2: the corrected proof requires inputs to equal outputs, so a valid 5 ZEC output passes while an attempt to output 7 ZEC is rejected](/content-images/ironwood-fix-bb4f70ddc9.webp)

## Kinachofanya bwawa la Ironwood

NU6.2 ililinda saketi Orchard kwa miamala yote mipya, lakini thamani iliyoundwa chini ya sheria za zamani bado iko kwenye bwawa Orchard. Ironwood huipa thamani hiyo mahali safi na njia ya kuiangalia inaposonga.

Bwawa la Ironwood ni bwawa la thamani lililolindwa lililoundwa na NU6.3 kwenye kitalu namba 3,428,143. Limejengwa kwenye saketi iliyosahihishwa na hutumia umbizo la noti linaloweza kurejeshwa kwa kiasi (muundo unaoruhusu fedha kurejeshwa ikiwa [kompyuta za kwanta](../zcash-tech/post-quantum-security) ever break cryptography ya leo), iliyofafanuliwa katika [ZIP 2005](https://zips.z.cash/zip-2005).

1. Baada ya kuamilishwa, bwawa la zamani Orchard linakuwa la matumizi pekee, kwa hivyo hakuna thamani mpya inayoweza kuingia ndani yake.
2. Thamani iliyolindwa hivi karibuni hutiririka hadi Ironwood badala yake.
3. Ndani ya Ironwood, ZEC iliyolindwa huhifadhi faragha inayoficha mtumaji, mpokeaji, na kiasi. Kuhamisha ZEC kutoka Orchard hadi Ironwood kunaonyesha kiasi kilichohamishwa.

## Kijiti cha kugeuza

Wazo kuu katika Ironwood ni turnstile, kituo cha ukaguzi wa uhasibu ambacho kila sarafu lazima ipitie wakati wa kuhama kutoka bwawa la zamani Orchard hadi Ironwood.

> Kifaa cha kugeuza dari hufanya kazi kwa pesa zilizofichwa kama vile mlango wa kioo hufanya kazi kwa ghala la benki. Bado huwezi kuona ndani, lakini unaweza kuhesabu hasa kinachoingia na kinachotoka.

1. Fedha zinazotoka Orchard huhesabiwa katika sehemu ya uthibitishaji wa umma kabla ya kuingia Ironwood.
2. Hii inamruhusu mtu yeyote kukagua ni kiasi gani ZEC kinachohamishwa, na kuimarisha imani katika usambazaji halisi unaozunguka.
3. Kama ZEC yoyote bandia ingeundwa kupitia hitilafu ya awali, hesabu hii ya uhamiaji ndipo itakapoonekana.

Turnstiles si mpya kwa Zcash. Mtandao umewahi kuzitumia hapo awali, kwenye mipaka kati ya mabwawa ya Sprout, Sapling, na Orchard, ili thamani inayohamishwa kati ya mabwawa iendelee kukaguliwa na hakuna bwawa linaloweza kutoa zaidi ya iliyoingia kihalali.

Sheria za makubaliano huweka kila kundi la thamani, ikiwa ni pamoja na Ironwood, ndani ya kikomo cha juu cha pesa cha mtandao, kwa hivyo salio la kundi haliwezi kuwa hasi kamwe.

## Kile ambacho watumiaji wanahitaji kufanya

Pochi na programu za nodi hushughulikia mengi ya haya kiotomatiki, lakini mabadiliko ya vitendo ni rahisi: baada ya muda, songa sehemu zilizolindwa kutoka bwawa la zamani Orchard kupitia turnstile hadi bwawa la Ironwood. Kila hatua inaonyesha kiasi chake kwenye blockchain, hivyo pochi zinazofuata [ZIP 318](https://zips.z.cash/zip-0318) Gawanya katika viwango vya kawaida na uvitume baada ya muda. Fuata mwongozo kutoka kwa mtoa huduma wako wa pochi, na uweke programu yako kwenye toleo linaloungwa mkono.

## Faharasa

| Muhula | Maana ya Kiingereza cha kawaida |
|---|---|
| Shielded pool | Seti ya fedha ambazo kiasi na wamiliki wake wamefichwa na usimbaji fiche usio na maarifa yoyote |
| Soundness bug | Dosari inayoruhusu muamala batili kupitisha ukaguzi wa uthibitisho kana kwamba ni halali |
| Turnstile | Kituo cha ukaguzi cha umma kinachohesabu thamani inayohamishwa kati ya mabwawa ili usambazaji uendelee kukaguliwa |
| Spend-only | Bwawa la kuogelea unaloweza kutumia, lakini huwezi kuongeza thamani mpya |
| Network upgrade (NU) | Mabadiliko yaliyoratibiwa kwa sheria za makubaliano Zcash's, yaliyoamilishwa kwa urefu wa vitalu vilivyowekwa |
| Quantum-recoverable note | Muundo wa noti ulioundwa ili fedha ziweze kupatikana ikiwa kompyuta za kwantum zitavunja usimbaji fiche wa leo |

## Maswali Yanayoulizwa Mara kwa Mara

Je ZEC yangu iliathiriwa? Hapana. Hakuna ushahidi kwamba hitilafu iliwahi kutumika, hakuna athari kwa fedha za watumiaji, na hakuna mabadiliko kwa jumla ya usambazaji.

Je, ninahitaji kufanya chochote? Weka pochi yako na programu ya nodi kwenye toleo linaloungwa mkono. Fedha za matumizi Orchard huzihamisha hadi Ironwood, na kiasi kinachovuka ni cha umma. Baadhi ya pochi hutoa uhamishaji unaotuma kiasi cha kawaida baada ya muda, kwa hivyo salio lako ni gumu kuunganisha. Fuata mwongozo wa mtoa huduma wako wa pochi.

Je, Zcash bado ni ya faragha? Ndiyo. Malipo ndani ya Ironwood huficha mtumaji, mpokeaji, na kiasi, kama malipo ya Orchard yalivyofanya. Kiasi kinachohama kati ya mabwawa, kama vile kutoka Orchard hadi Ironwood, ni cha umma. Uboreshaji huu unahusu uadilifu wa usambazaji.

Je, mdudu huyo aliwahi kudhulumiwa? Hakuna ushahidi kwamba alidhulumiwa. Alipatikana kupitia utafiti wa usalama, akafichuliwa kwa uwajibikaji, na akarekebishwa kabla ya madhara yoyote yanayojulikana.

Nini kitatokea kwa bwawa la zamani Orchard? Linakuwa la matumizi pekee. Hakuna thamani mpya inayoweza kuingia, na thamani iliyopo huhamia Ironwood kupitia turnstile, ambapo uhamiaji hukaguliwa hadharani.

## Jaribu uelewa wako

Ikiwa ZEC ndani ya mabwawa yaliyolindwa imefichwa, mtu anawezaje kuthibitisha kwamba mdudu Orchard hakuongeza usambazaji kwa siri?

<details>
<summary>Answer</summary>

Kupitia kwenye turnstile. Kila sarafu inayotoka kwenye bwawa la zamani Orchard huhesabiwa katika kituo cha ukaguzi cha umma inapoingia Ironwood. Ikiwa thamani zaidi ingejaribiwa kuondoka kuliko ilivyoingizwa kihalali, hesabu haingesawazishwa, kwa hivyo bandia yoyote ambayo mdudu angeweza kuunda ingeonekana kwenye lango hilo.
</details>

### Rasilimali

[ZIP 258: Utekelezaji wa Uboreshaji wa Mtandao NU6.3](https://zips.z.cash/zip-0258)

[ZIP 257: Utekelezaji wa Upunguzaji wa Muda wa Udhaifu Orchard na Uboreshaji wa Mtandao wa NU6.2](https://zips.z.cash/zip-0257)

[ZIP 2005: Urejeshaji wa Quantum Ironwood](https://zips.z.cash/zip-2005)

[ZIP 229: Umbizo la Muamala la Toleo la 6](https://zips.z.cash/zip-0229)

[ZIP 318: Uhamiaji wa Orchard hadi Ironwood](https://zips.z.cash/zip-0318)

[Ironwood: Bwawa Jipya la Kuogelea kwa Zcash](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/)

### Tazama pia

[Maboresho ya Mtandao wa Zcash](../start-here/network-upgrades)

[Mabwawa ya Kuogelea Yenye Ngao](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Usalama wa Baada ya Quantum](../zcash-tech/post-quantum-security)

[Shielded Labs](../zcash-organizations/shielded-labs)

[ZEC na Zcash ni nini?](../start-here/what-is-zec-and-zcash)

---

Mfululizo: [Faharasa ya Uboreshaji wa Mtandao](../start-here/network-upgrades) · Iliyotangulia: [NU6.2](../zcash-tech/nu6-2)
