# ZIP 218: Kile Ambacho Block za Sekunde 25 Hubadilisha Kwa Hakika

Katika kura ya wamiliki wa sarafu ya NU7 iliyofungwa tarehe 14 Septemba 2026, takribani ZEC 2,397,669 walipiga kura kuunga mkono ZIP 218 na ZEC 141.6 walipiga kura kuipinga, matokeo ya 99.9%. Maelezo mengi yaliifupisha kama “Block za Zcash zinakuwa za haraka zaidi.” Hilo ni kweli, lakini linaacha sehemu kubwa ya kile ambacho pendekezo linafanya na sehemu kubwa ya kile ambacho kwa makusudi linaacha bila kubadilisha.

Ukurasa huu unaeleza ZIP 218 kwa kutegemea maandishi yake yenyewe: kile kinachobadilika, kile kisichobadilika, na gharama yake.

## Toleo fupi

| | Leo | Baada ya ZIP 218 |
|---|---|---|
| Nafasi lengwa kati ya block | Sekunde 75 | Sekunde 25 |
| Block kwa siku | 1,152 | 3,456 |
| Ruzuku ya block (kipindi cha sasa cha kupunguzwa kwa nusu [halving]) | ZEC 1.5625 | ZEC 0.52083333 |
| ZEC mpya kwa siku | Haibadiliki | Haibadiliki |
| Kipindi cha kupunguzwa kwa nusu | Block 1,680,000 | Block 5,040,000 |
| Vikomo vya vitendo vya faragha [shielded] kwa block | Hakuna (kikomo cha ukubwa wa MB 2 pekee) | 330 kwa jumla, yakiwa na vikomo kwa kila bwawa [pool] |
| Uwezo wa miamala [transactions] ya Orchard (miamala yenye vitendo 2) | Takribani 2.9 kwa sekunde | Takribani 6.6 kwa sekunde |

![ZIP 218 cuts block target spacing from 75 seconds to 25, tripling daily blocks from 1,152 to 3,456, while dividing the per-block subsidy by the same factor of three from 1.5625 to 0.52083333 ZEC, so daily issuance stays at 1,800 ZEC and the halving interval stretches from 1,680,000 to 5,040,000 blocks to hold halving dates fixed](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu7-block-timing.png)

Block nyingi mara tatu, kila moja ikilipa thuluthi moja ya kiasi. Ratiba ya ugavi inabaki ilipokuwa.

## Kwa nini kubadilisha muda wa block

Lengo kuu ni **kupunguza muda wa kusubiri**. Leo, malipo [payment] husubiri sekunde 75 kwa wastani ili kupata uthibitisho wake wa kwanza, bila kujali mzigo wa mtandao. Kwa sekunde 25, hali hiyo hushuka hadi sekunde 25 kwa wastani. ZIP inataja malipo ya sehemu za mauzo, amana za soko la kubadilishana sarafu [exchange], na madaraja ya cross-chain kama matumizi yanayohisi jambo hili zaidi.

Mambo mawili kutoka kwenye ZIP yanafaa kuzingatiwa:

- **Haiwaambii watu kutumia uthibitisho chache zaidi.** Kwa watumiaji wanaodumisha uvumilivu uleule wa hatari ya kurejeshwa nyuma kama leo, ZIP inatarajia muda wa uthibitisho kuboreka kwa chini kidogo ya mara tatu.
- **Si mbadala wa kazi ya ukamilifu.** ZIP inajieleza kuwa inayokamilishana na taratibu za ukamilifu kama Crosslink. Block za safu ya msingi zilizo haraka zaidi husaidia iwe safu ya ukamilifu itaongezwa baadaye au la.

ZIP pia inabainisha kwamba uwezo mkubwa wa miamala ungeweza kupatikana kwa kuongeza ukubwa wa block. Muda wa kusubiri ndio sababu ya kuchagua block fupi badala yake.

## Kile kinachobadilika

### Utoaji: ZEC zilezile kwa siku

Kuongeza idadi ya block mara tatu kungeongeza utoaji wa kila siku mara tatu iwapo hakuna kingine kingebadilika. ZIP 218 huzuia hilo kwa kugawanya ruzuku kwa kila block kwa kipengele kingine cha tatu pindi NU7 inapokuwa amilifu.

Katika kipindi cha sasa cha kupunguzwa kwa nusu, hilo hupunguza ruzuku ya block kutoka **ZEC 1.5625 hadi ZEC 0.52083333** (zatoshi 52,083,333). Kwa sababu zatoshi 156,250,000 haigawanyiki sawasawa kwa tatu, kila block huzungushwa chini kwa thuluthi ya zatoshi. Katika kipindi kamili cha kupunguzwa kwa nusu cha block 5,040,000, hilo ni takribani ZEC 0.0168 kwa jumla.

Ruzuku ni jumla ya ZEC mpya inayoundwa kwa kila block. Sehemu iliyopo ya ufadhili wa maendeleo bado huchukuliwa kutoka humo, kwa hiyo wachimbaji [miners] hupokea chini ya kiasi kamili, sawa kabisa na leo.

> **Dokezo kuhusu kiasi cha ZEC 0.26041666.** Dokezo la ufafanuzi la rasimu ya ZIP huchapisha ruzuku ya baada ya NU7 kama floor(156250000 / 6) = ZEC 0.26041666, na baadhi ya taarifa za habari zimelirudia. Dokezo hilo lina hitilafu ya kipengele cha mbili: zatoshi 156,250,000 tayari ni ruzuku ya baada ya Blossom, hivyo kuigawanya kwa sita hutumia kipengele cha mbili cha Blossom mara ya pili juu ya kipengele cha tatu cha NU7. Fomula ya kikanuni hutoa floor(1,250,000,000 / (2 · 3 · 4)) = zatoshi 52,083,333 katika faharasa ya sasa ya kupunguzwa kwa nusu. Toleo la Zebra la utekelezaji kwa mabadiliko haya ([#11463](https://github.com/ZcashFoundation/zebra/issues/11463)) linarekodi dokezo hilo kama lililohesabu kipengele cha Blossom mara mbili, linawaambia watekelezaji “tekelezeni fomula, si dokezo,” na linasema marekebisho yamewasilishwa dhidi ya ZIP. Kiasi sahihi wakati wa uanzishaji ni **ZEC 0.52083333**.

### Vipindi vya kupunguzwa kwa nusu vinadumisha muda wake

Kipindi cha kupunguzwa kwa nusu kinaongezeka mara tatu kutoka block 1,680,000 hadi block 5,040,000. Kwa kuwa block hufika mara tatu zaidi, vipindi vya kupunguzwa kwa nusu bado hutokea takribani wakati uleule ambavyo vingetokea bila mabadiliko. Kikomo cha jumla cha ugavi hakiathiriki.

Hili ni tofauti na swali lingine la utoaji katika kura ya NU7, ambapo wamiliki wa sarafu walipiga kura kudumisha kupunguzwa kwa nusu badala ya kukubali mkunjo uliosawazishwa. ZIP 218 hufanya kazi kwa muundo uliopo wa kupunguzwa kwa nusu na hauubadilishi.

### Vikomo vipya vya vitendo vya faragha kwa block

ZIP 218 huongeza vikomo vya kiasi cha shughuli za faragha ambacho block moja inaweza kubeba:

| Kikomo | Kiwango cha juu kwa block |
|---|---|
| Mabwawa yote ya faragha kwa pamoja | 330 (kila JoinSplit ya Sprout huhesabiwa kama 2) |
| Vitendo vya Orchard | 330 |
| Ingizo pamoja na matokeo ya Sapling | 300 |
| JoinSplit za Sprout | 25 |

Sehemu za uwazi [transparent] za miamala haziathiriki, na kikomo cha ukubwa wa block cha MB 2 bado kinatumika.

Vikomo hivi vipo kwa sababu block nyingi zaidi zingemaanisha kazi zaidi kwa pochi [wallets] na node. Vikomo vikiwekwa, hali mbaya zaidi kwa hakika inakuwa **bora** kuliko leo, hata kwa block nyingi mara tatu:

- **Usawazishaji wa pochi:** Kiwango kikubwa zaidi cha data ambacho pochi nyepesi inaweza kulazimishwa kupakua kwa siku kinashuka kutoka takribani MB 271 hadi takribani MB 169, upungufu wa karibu 38%. Usimbuaji fiche wa majaribio katika hali mbaya zaidi unashuka kutoka takribani milioni 4.8 hadi takribani milioni 2.3 kwa siku.
- **Uthibitishaji wa block:** Vigezo vya ZIP vinaweka block ya Orchard katika hali mbaya zaidi kuwa takribani ms 432 chini ya vikomo vipya, dhidi ya takribani ms 770 kwa hali mbaya zaidi ya leo. Kwa Sapling, upungufu ni mkubwa zaidi, kutoka takribani ms 3,175 hadi takribani ms 272.

Vikomo vya Sapling na Sprout vimebanwa kwa makusudi. Kufikia Mei 2026, Orchard ilishikilia 87.9% ya ZEC ya faragha, Sapling 11.6% na Sprout 0.5%, hivyo mabwawa madogo hupata nafasi ya kutosha kwa matumizi yao halisi huku yakimpa mshambuliaji kidogo cha kutumia vibaya. Kwa sababu ada [fees] za ZIP 317 hutoza kiasi kilekile kwa kila tendo la kimantiki katika kila bwawa, mshambuliaji hapati faida kwa kujaza bwawa moja kwa taka badala ya jingine.

### Uwezo wa miamala

Kwa vitendo 330 vya Orchard kwa kila block, muamala wa kawaida wa Orchard wenye vitendo 2 unatoshea ⌊330 / 2⌋ = 165 kwa kila block. Kwa block moja kila sekunde 25, hilo ni takribani **miamala 6.6 kwa sekunde**, kutoka takribani 2.9 leo — ZIP inaliita ongezeko la 2.3× katika uwezo wa kawaida wa miamala ya Orchard. Sapling hufikia takribani 3.0 kwa sekunde, bado juu ya kile ambacho Orchard husimamia leo.

### Urekebishaji wa ugumu

Algoriti ya ugumu hufanya wastani katika dirisha la block za karibuni. ZIP 218 huongeza dirisha hilo kutoka block 17 hadi 102, hivyo bado linafunika takribani sekunde 2,550 za muda halisi, muda uleule lililofunika wakati Zcash ilipozinduliwa kwa block za sekunde 150. ZIP inatoa sababu mbili: kuepuka kufanya mashambulizi ya udanganyifu wa ugumu kuwa mepesi zaidi (inataja tukio la MWEB la Litecoin la Aprili 2026), na kulainisha mabadiliko ya muda mfupi katika nyakati za block.

Mara tu baada ya uanzishaji, nyakati za block zitachukua muda kutulia katika lengo jipya. Hilo linatarajiwa na linafanana na kilichotokea katika Blossom, wakati Zcash ilipobadilika kutoka sekunde 150 hadi 75.

### Mipangilio chaguomsingi ya node na pochi

Haya ni mapendekezo kwa utekelezaji badala ya kanuni za makubaliano [consensus]:

- **Mwisho wa muda wa muamala:** Muda chaguomsingi wa mwisho unaongezeka kutoka block 40 hadi 120, ukidumisha takribani dakika 50 zilezile.
- **Kina cha juu zaidi cha reorg:** Kikomo cha Zebra kinaongezeka kutoka block 99 hadi 600, takribani saa 4.2 kwa sekunde 25, dirisha lilelile lililofunika wakati wa uzinduzi.
- **Kina cha nanga kwa miamala ya faragha:** Kinabaki block 3, kwa hiyo ucheleweshaji hupungua kutoka dakika 3.75 hadi dakika 1.25. ZIP hufuata mfano wa Blossom hapa.
- **Vigezo kadhaa vya mtandao** vinavyopimwa kwa block vinaongezwa mara tatu ili vifunike muda uleule.

## Kile kinachobaki sawa

- ZEC inayotolewa kwa siku, ratiba ya kupunguzwa kwa nusu, na kikomo cha ugavi
- Kikomo cha ukubwa wa block cha MB 2
- Miamala ya uwazi, ambayo vikomo vipya vya vitendo haviigusi
- Ukomavu wa Coinbase katika block 100. Kumbuka kwamba sasa hii inamaanisha takribani dakika 42 badala ya takribani 125, kwa sababu hesabu iko katika block, si muda.

## Ubadilishanaji: block zilizopitwa na wakati zaidi

Block za haraka zaidi si za bure. Block iliyopitwa na wakati ni block halali inayopoteza mbio za kujumuishwa katika mnyororo [chain] kwa sababu block nyingine ilifikia mtandao kwanza. Kadiri pengo kati ya block linavyokuwa fupi, ndivyo hali hii hutokea mara nyingi zaidi, na ZIP inahusisha kiwango cha block zilizopitwa na wakati na uenezaji wa block, muda wa uthibitishaji, na hatari ya mkusanyiko wa uchimbaji [mining].

- **Leo:** Takribani 0.4%, ambayo ZIP inabainisha inaweza kupunguza kiwango halisi kwa sababu hashpower imekusanyika katika mabwawa.
- **Kidhahania kwa sekunde 25:** Takribani 3.26%, kwa kutegemea ucheleweshaji uliopimwa wa uenezaji wa Zcash.
- **Jaribio la Devnet:** Node 99 za Zebra zilizosambazwa kijiografia zikizalisha block kamili za MB 2 kwa nafasi ya sekunde 25 zilipima kiwango cha block zilizopitwa na wakati cha 4.86% na kiwango cha fork cha 0.37%. Urekebishaji pekee uliohitajika ulikuwa usanidi wa TCP. Kwa sababu devnet hiyo ilikuwa imegatuliwa [decentralized] zaidi kuliko mainnet ya leo, ZIP huzichukulia hizi kama takwimu zilizo karibu na hali mbaya zaidi.
- **Kigezo cha marejeleo:** ZIP hutumia kiwango cha kihistoria cha block zilizopitwa na wakati cha Ethereum cha uthibitisho wa kazi [proof-of-work] cha 5.4% kama kizingiti chake cha usalama. Takwimu zote mbili za devnet ziko chini yake.

Pia kuna gharama mbili ndogo. Pochi nyepesi hupakua takribani KB 200 zaidi kwa siku za vichwa vya compact block. Na kwa sababu kuna block nyingi mara tatu, full node ambayo imekuwa nje ya mtandao ina block nyingi zaidi za kuchakata inapofidia, ingawa kila block ni nafuu zaidi kuthibitisha. ZIP inakubali yote mawili.

## Hali na ratiba

- **Hali ya ZIP:** Imependekezwa. Wamiliki ni Dev Ojha na Evan Forbes; iliundwa tarehe 13 Machi 2026.
- **Kura ya wamiliki wa sarafu:** Ilifungwa tarehe 14 Septemba 2026, kwa uungwaji mkono wa 99.9%. Kura huashiria upendeleo; haibadilishi kanuni za makubaliano yenyewe.
- **Ratiba:** Katika tangazo la Community Forum la Zcash tarehe 17 Septemba, mashirika ya maendeleo yalikubaliana kuhusu ratiba ya msimbo kukamilika kufikia tarehe 30 Septemba, NU7 kwenye testnet tarehe 6 Oktoba, na uamuzi wa mwisho tarehe 20 Oktoba. Urefu wa uanzishaji wa mainnet sasa umewekwa kuwa 3,543,405 ([ZIP 259](https://zips.z.cash/zip-0259)), ukilengwa kwa takribani tarehe 5 Novemba 2026.
- **Utekelezaji:** Unafuatiliwa katika Zebra ([#11440](https://github.com/ZcashFoundation/zebra/issues/11440)) na katika Zakura ([PR #1066](https://github.com/zakura-core/zakura/pull/1066)).

## Hii inamaanisha nini kwako

- **Kushikilia ZEC:** Hakuna cha kufanya. Salio lako na ratiba ya ugavi haviathiriki.
- **Kutumia pochi:** Sasisha wakati pochi yako inapotuma usaidizi wa NU7. Uthibitisho wa kwanza utawasili takribani mara tatu mapema zaidi.
- **Kuendesha node, soko la kubadilishana sarafu, au huduma:** Panga kusasisha kabla ya uanzishaji, na pitia mipangilio yoyote inayopimwa kwa block, kwa kuwa hesabu isiyobadilika ya block sasa inafunika thuluthi ya muda iliyokuwa ikifunika.

## Vyanzo

- [ZIP 218: Nafasi Lengwa ya Block ya Sekunde 25](https://zips.z.cash/zip-0218)
- [ZIP 208: Nafasi Lengwa Fupi ya Block](https://zips.z.cash/zip-0208), mfano wa Blossom
- [Forum: Pendekezo — Punguza Nafasi Lengwa ya Block ya Zcash hadi 25s](https://forum.zcashcommunity.com/t/proposal-lower-zcash-block-target-spacing-to-25s/54577)
- [Forum: Kupunguzwa kwa Muda wa Block wa Zcash Kunaonekana Salama kwa NU7 kwa Devnet ya Zebra-pekee](https://forum.zcashcommunity.com/t/zcash-block-time-reduction-appears-safe-for-nu7-w-zebra-only-devnet/55586)
- [Zebra suala #11463](https://github.com/ZcashFoundation/zebra/issues/11463), kipindi cha kupunguzwa kwa nusu baada ya NU7 na ruzuku
- [Zebra suala #11440](https://github.com/ZcashFoundation/zebra/issues/11440), ufuatiliaji wa utekelezaji wa ZIP 218
- NU7 matokeo ya kura na ratiba, kama ilivyoripotiwa na Bitcoin.com News, crypto.news na KuCoin (16–19 Septemba 2026)
