# ZIP 218: Kile Kinachobadilika kwa Vitalu vya Sekunde 25

Katika kura ya maoni ya wamiliki wa sarafu NU7 iliyofungwa mnamo Septemba 14, 2026, takriban ZEC 2,397,669 walipiga kura ya ZIP 218 na ZEC 141.6 walipiga kura dhidi yake, matokeo ya 99.9%. Wadau wengi waliifupisha kama "Zcash vinakuwa haraka zaidi." Hiyo ni kweli, lakini inaacha sehemu kubwa ya kile ambacho pendekezo hilo hufanya na mengi ya kile ambacho linaweka sawa kimakusudi.

Ukurasa huu unaelezea ZIP 218 kutoka kwa maandishi yake: kinachobadilika, kisichobadilika, na kinachogharimu kiasi gani.

## Toleo fupi

| | Leo | Baada ya ZIP 218 |
|---|---|---|
| Nafasi ya kulenga vitalu | Sekunde 75 | Sekunde 25 |
| Vitalu kwa siku | 1,152 | 3,456 |
| Ruzuku ya vitalu (enzi ya sasa ya nusu) | 1.5625 ZEC | 0.52083333 ZEC |
| ZEC mpya kwa siku | haijabadilika | haijabadilika |
| Kipindi cha nusu | Vitalu 1,680,000 | Vitalu 5,040,000 |
| Vizuizi vya vitendo vilivyolindwa kwa kila kizuizi | hakuna (kikomo cha ukubwa wa MB 2 pekee) | Jumla ya 330, pamoja na vifuniko vya kila bwawa |
| Uzalishaji wa Orchard (miamala ya vitendo 2) | kama 2.9 kwa sekunde | kama 6.6 kwa sekunde |

Mara tatu ya vitalu vingi, kila kimoja kikilipa theluthi moja ya kiasi hicho. Ratiba ya usambazaji inabaki pale ilipokuwa.

## Kwa nini ubadilishe muda wa kuzuia

Lengo kuu ni **muda mdogo wa kusubiri**. Leo malipo husubiri sekunde 75 kwa wastani kwa uthibitisho wake wa kwanza, bila kujali mzigo wa mtandao. Kwa sekunde 25 hiyo hupungua hadi sekunde 25 kwa wastani. ZIP inataja malipo ya sehemu ya mauzo, amana za kubadilishana na madaraja ya mnyororo mtambuka kama matumizi yanayohisiwa zaidi.

Mambo mawili kutoka kwa ZIP yanafaa kukumbukwa:

- **Haimwambii mtu yeyote kutumia uthibitisho mdogo.** Kwa watumiaji ambao wana uvumilivu sawa wa hatari ya kurudi nyuma kama ilivyo leo, ZIP inatarajia muda wa uthibitisho kuimarika kwa chini kidogo ya mara tatu.
- **Sio mbadala wa kazi ya umaliziaji.** ZIP inajielezea kama inayosaidiana na mifumo ya umaliziaji kama vile Crosslink. Vitalu vya safu ya msingi vya kasi husaidia iwe safu ya umaliziaji itaongezwa baadaye au la.

ZIP pia inabainisha kuwa upitishaji wa juu pekee ungeweza kupatikana kwa ukubwa mkubwa wa vitalu. Ucheleweshaji ndio sababu ya kuchagua vitalu vifupi badala yake.

## Mabadiliko gani

### Utoaji: ZEC sawa kwa siku

Kuongeza mara tatu idadi ya vitalu kungeongeza mara tatu utoaji wa kila siku ikiwa hakuna kingine kilichobadilika. ZIP 218 inazuia hilo kwa kugawa ruzuku ya kila kitalu kwa kipengele kingine cha tatu mara tu NU7 itakapokuwa inafanya kazi.

Katika enzi ya sasa ya ugawaji nusu, hiyo inachukua ruzuku ya vitalu kutoka **1.5625 ZEC hadi 0.52083333 ZEC** (52,083,333 zatoshi). Kwa sababu zatoshi 156,250,000 hazigawanyiki sawasawa kwa tatu, kila vitalu huzungushwa chini kwa theluthi moja ya zatoshi. Katika kipindi chote cha ugawaji nusu wa vitalu 5,040,000 ambacho ni takriban 0.0168 ZEC kwa jumla.

Ruzuku hiyo ni jumla ya ZEC mpya iliyoundwa kwa kila kitalu. Sehemu iliyopo ya ufadhili wa maendeleo bado inachukuliwa kutoka humo, kwa hivyo wachimbaji hupokea chini ya takwimu kamili, kama ilivyo leo.

> **Dokezo kwenye takwimu ya ZEC ya 0.26041666.** Dokezo la maelezo la rasimu ZIP's linachapisha ruzuku post-NU7 kama ghorofa (156250000 / 6) = 0.26041666 ZEC, na baadhi ya habari zimerudia. Dokezo hilo si sahihi kwa sababu ya mbili: 156,250,000 zatoshi tayari ni ruzuku post-Blossom, kwa hivyo kuigawanya kwa sita hutumia kipengele cha Blossom cha mbili kwa mara ya pili juu ya kipengele cha NU7 cha tatu. Fomula ya kawaida inatoa ghorofa (1,250,000,000 / (2 · 3 · 4)) = 52,083,333 zatoshi katika faharisi ya sasa ya nusu. Suala la utekelezaji wa Zebra's kwa mabadiliko haya ([#11463](https://github.com/ZcashFoundation/zebra/issues/11463)) hurekodi noti kama inayohesabu mara mbili kipengele cha Blossom, huwaambia watekelezaji "kutekeleza fomula, si noti," na husema marekebisho yamewasilishwa dhidi ya ZIP. Takwimu sahihi wakati wa uanzishaji ni **0.52083333 ZEC**.

### Kupunguza nusu huweka muda wake

Kipindi cha nusu kinaongezeka mara tatu kutoka vitalu 1,680,000 hadi vitalu 5,040,000. Kwa kuwa vitalu hufika mara tatu zaidi, nusu bado huanguka katika kipindi kile kile kama vile ambavyo vingekuwa bila mabadiliko. Jumla ya kikomo cha usambazaji haiathiriwi.

Hili ni tofauti na swali lingine la utoaji katika kura ya maoni NU7, ambapo wenye sarafu walipiga kura kuweka nusu badala ya kuzibadilisha na mkunjo uliolainishwa. ZIP 218 inafanya kazi na modeli iliyopo ya nusu na haibadilishi.

### Mipaka mipya kwenye vitendo vilivyolindwa kwa kila kizuizi

ZIP 218 inaongeza kikomo cha shughuli zilizolindwa ambazo kizuizi kimoja kinaweza kushikilia:

| Kikomo | Kiwango cha juu zaidi kwa kila kizuizi |
|---|---|
| Mabwawa yote yenye ulinzi yameunganishwa | 330 (kila Sprout JoinSplit huhesabiwa kama 2) |
| Vitendo Orchard | 330 |
| Pembejeo za Sapling pamoja na matokeo | 300 |
| Sprout JoinSplits | 25 |

Sehemu za miamala zisizo na uwazi haziathiriwi, na kikomo cha ukubwa wa block 2 MB bado kinatumika.

Mipaka ipo kwa sababu vitalu vingi vinginevyo vingemaanisha kazi zaidi kwa pochi na nodi. Kwa kuwa na vifuniko vilivyowekwa, hali mbaya zaidi inakuwa **bora** kuliko leo, hata kwa vitalu mara tatu zaidi:

- **Usawazishaji wa pochi:** data nyingi zaidi ambayo pochi nyepesi inaweza kupakua kwa siku moja hupungua kutoka takriban MB 271 hadi takriban MB 169, takriban punguzo la 38%. Uondoaji wa usimbaji fiche katika kesi mbaya zaidi hupungua kutoka takriban milioni 4.8 hadi takriban milioni 2.3 kwa siku.
- **Uthibitishaji wa vizuizi:** Vipimo ZIP's vinaweka kizuizi Orchard chenye kesi mbaya zaidi kwa takriban milisekunde 432 chini ya mipaka mipya, dhidi ya takriban milisekunde 770 kwa kesi mbaya zaidi ya leo. Kwa Sapling tone ni kubwa zaidi, kutoka takriban milisekunde 3,175 hadi takriban milisekunde 272.

Vifuniko Sapling na Sprout vimefungwa kimakusudi. Kufikia Mei 2026, Orchard ilikuwa na 87.9% ya ZEC, Sapling 11.6% na Sprout 0.5%, kwa hivyo mabwawa madogo hupata nafasi ya kutosha kwa matumizi yao halisi huku ikimpa mshambuliaji matumizi kidogo. Kwa sababu ada za ZIP 317 hutoza sawa kwa kila kitendo cha kimantiki katika kila bwawa, mshambuliaji hatapata faida yoyote kwa kutuma barua taka kwenye bwawa moja badala ya jingine.

### Upitishaji

Kwa vitendo 330 vya Orchard kwa kila kizuizi, muamala wa kawaida Orchard wa vitendo 2 unafaa ⌊330 / 2⌋ = mara 165 kwa kila kizuizi. Kwa kizuizi kimoja kila baada ya sekunde 25 hiyo ni takriban miamala **6.6 kwa sekunde**, kutoka takriban 2.9 leo — ZIP inaiita ongezeko la 2.3× katika upitishaji wa kawaida Orchard. Sapling hutoka kwa takriban 3.0 kwa sekunde, bado juu ya kile Orchard inachoweza kufanya leo.

### Marekebisho ya ugumu

Algorithm ya ugumu huongezeka kwa wastani katika dirisha la vizuizi vya hivi karibuni. ZIP 218 huinua dirisha hilo kutoka vizuizi 17 hadi 102, kwa hivyo bado inashughulikia takriban sekunde 2,550 za muda halisi, muda uleule uliofunika wakati Zcash ilipozindua na vizuizi vya sekunde 150. ZIP inatoa sababu mbili: ili kuepuka kurahisisha mashambulizi ya ujanja-ujanja (inataja tukio la Litecoin la Aprili 2026 MWEB), na kupunguza tofauti za muda mfupi katika nyakati za vizuizi.

Mara tu baada ya uanzishaji, muda wa kuzuia utachukua muda kutulia kwenye shabaha mpya. Hilo linatarajiwa na linaakisi kile kilichotokea Blossom, wakati Zcash ilipopanda kutoka sekunde 150 hadi 75.

### Chaguo-msingi za nodi na pochi

Haya ni mapendekezo ya utekelezaji badala ya sheria za makubaliano:

- **Muamala wa mwisho:** muda wa mwisho wa muamala huongezeka kutoka vitalu 40 hadi 120, na kudumu takriban dakika 50 sawa.
- **Kina cha juu zaidi cha urekebishaji upya:** Kikomo Zebra's kinaongezeka kutoka vitalu 99 hadi 600, kama saa 4.2 kwa sekunde 25, dirisha lile lile alilofunika wakati wa uzinduzi.
- **Kina cha nanga kwa miamala iliyolindwa:** kinabaki katika vitalu 3, kwa hivyo ucheleweshaji hupungua kutoka dakika 3.75 hadi dakika 1.25. ZIP inafuata mfano wa Blossom hapa.
- **Vigezo kadhaa vya mtandao** vinavyopimwa katika vitalu huongezwa kwa tatu ili viweze kugharamia muda sawa.

## Kinachobaki vile vile

- ZEC iliyotolewa kwa siku, ratiba ya kupunguza nusu na kikomo cha usambazaji
- Kikomo cha ukubwa wa vitalu 2 MB
- Miamala ya uwazi, ambayo mipaka mipya ya vitendo haigusi
- Ukomavu wa Coinbase katika vitalu 100. Kumbuka kwamba hii sasa inamaanisha kama dakika 42 badala ya kama 125, kwa sababu hesabu iko katika vitalu, si wakati.

## Makubaliano: vitalu vya zamani zaidi

Vizuizi vya kasi si vya bure. Kizuizi cha zamani ni kizuizi halali kinachopoteza mbio za kujumuishwa kwenye mnyororo kwa sababu kizuizi kingine kilifika kwenye mtandao kwanza. Kadiri pengo kati ya vizuizi linavyopungua, ndivyo hili linavyotokea mara nyingi, na ZIP huunganisha kiwango cha zamani na uenezaji wa kuzuia, muda wa uthibitishaji na hatari ya uchimbaji kati.

- **Leo:** karibu 0.4%, ambayo ZIP inabainisha inaweza kupuuza kiwango cha msingi kwa sababu nguvu ya hash imejilimbikizia kwenye mabwawa.
- **Kinadharia kwa sekunde 25:** karibu 3.26%, kulingana na ucheleweshaji wa uenezaji wa Zcash uliopimwa.
- **Jaribio la Devnet:** Nodi 99 za Zebra zilizosambazwa kijiografia zinazozalisha vizuizi kamili vya MB 2 kwa nafasi ya sekunde 25 zilipima kiwango cha zamani cha 4.86% na kiwango cha uma cha 0.37%. Urekebishaji pekee uliohitajika ulikuwa usanidi wa TCP. Kwa sababu devnet hiyo ilikuwa imegawanywa zaidi kuliko mtandao mkuu wa leo, ZIP inachukulia hizi kama takwimu zinazokaribiana na hali mbaya zaidi.
- **Kigezo cha marejeleo:** ZIP inatumia kiwango cha kihistoria cha uthibitisho wa kazi cha 5.4% kama kizingiti chake cha usalama. Takwimu zote mbili za waendelezaji ziko chini yake.

Pia kuna gharama mbili ndogo. Pochi nyepesi hupakua takriban KB 200 zaidi kwa siku ya vichwa vya habari vya block ndogo. Na kwa sababu kuna block mara tatu zaidi, nodi kamili ambayo imekuwa nje ya mtandao ina block zaidi za kusindika inapofikia, ingawa kila block ni ya bei rahisi kuthibitisha. ZIP inakubali zote mbili.

## Hali na ratiba

- **ZIP:** Rasimu. Wamiliki Dev Ojha na Evan Forbes; iliundwa Machi 13, 2026.
- **Kura ya maoni ya wamiliki wa sarafu:** ilifungwa tarehe 14 Septemba 2026, ikiwa na uungwaji mkono wa 99.9%. Kura ya maoni inaonyesha upendeleo; haibadilishi sheria za makubaliano yenyewe.
- **Muda wa Matumizi:** katika tangazo la Jukwaa la Jumuiya Zcash mnamo Septemba 17, mashirika ya maendeleo yalikubaliana ratiba ya msimbo kukamilika ifikapo Septemba 30, NU7 kwenye testnet mnamo Oktoba 6, uamuzi wa mwisho na urefu wa uanzishaji wa mainnet mnamo Oktoba 20, na uanzishaji wa mainnet unaolengwa kwa takriban Novemba 5, 2026. Novemba 5 ni lengo, si tarehe maalum, hadi urefu utakapowekwa.
- **Utekelezaji:** unafuatiliwa katika Zebra ([#11440](https://github.com/ZcashFoundation/zebra/issues/11440)) na katika Zakura ([PR #1066](https://github.com/zakura-core/zakura/pull/1066)).

## Hii ina maana gani kwako

- **Kushikilia ZEC:** hakuna cha kufanya. Salio lako na ratiba ya usambazaji havijaathiriwa.
- **Kutumia pochi:** sasisha pochi yako inapotuma usaidizi wa NU7. Uthibitisho wa kwanza utafika karibu mara tatu mapema zaidi.
- **Kuendesha nodi, ubadilishaji au huduma:** panga kusasisha kabla ya kuamilishwa, na kukagua mipangilio yoyote iliyopimwa katika vizuizi, kwani hesabu ya vizuizi vilivyowekwa sasa inashughulikia theluthi moja ya muda ilivyokuwa hapo awali.

## Vyanzo

- [ZIP 218: Nafasi ya Kulenga ya Vitalu vya Sekunde 25](https://zips.z.cash/zip-0218)
- [ZIP 208: Nafasi Fupi ya Kulenga Vitalu](https://zips.z.cash/zip-0208), mfano wa Blossom
- [Jukwaa: Pendekezo — Nafasi ya Lengo la Kizuizi Zcash cha Chini hadi sekunde 25](https://forum.zcashcommunity.com/t/proposal-lower-zcash-block-target-spacing-to-25s/54577)
- [Jukwaa: Kupunguza Muda wa Kuzuia Zcash Kunaonekana Kuwa Salama kwa NU7 na Zebra-only](https://forum.zcashcommunity.com/t/zcash-block-time-reduction-appears-safe-for-nu7-w-zebra-only-devnet/55586)
- [Toleo la Zebra #11463](https://github.com/ZcashFoundation/zebra/issues/11463), kipindi cha nusu ya post-NU7 na ruzuku
- [Toleo la Zebra #11440](https://github.com/ZcashFoundation/zebra/issues/11440), Ufuatiliaji wa utekelezaji wa ZIP 218
- Matokeo ya kura ya maoni NU7 na ratiba, kama ilivyoripotiwa na Bitcoin.com News, crypto.news na KuCoin (16–19 Septemba 2026)
