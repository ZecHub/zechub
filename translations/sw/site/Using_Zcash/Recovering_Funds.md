<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Urejeshaji wa Mfuko wa Pochi wa Zcash

**Kwa nini uhifadhi nyenzo zako za kurejesha?**

Mbegu, funguo za matumizi, funguo za kutazama, na faili za pochi haziwezi kubadilishwa. Kifunguo cha mbegu kinaweza kutoa funguo za pochi kwa pochi nyingi, lakini hakibadilishi kila funguo au faili ya pochi ya zamani. Ufunguo wa kutazama unaweza kufichua shughuli iliyolindwa lakini hauwezi kuidhinisha matumizi.

Urejeshaji unategemea kuwa na mamlaka sahihi ya matumizi na njia inayoungwa mkono kwa sasa kwa ajili ya hifadhi inayohifadhi fedha. Weka nyenzo za urejeshaji zikiwa za faragha na usiwahi kushiriki mbegu, funguo za matumizi, au faili za pochi na mtu yeyote ambaye humwamini.

# Usalama na Uwajibikaji

Ni muhimu kwa watumiaji kuelewa hatari zinazohusika katika kushughulika na funguo za kibinafsi na kulinda funguo hizi dhidi ya ufikiaji usioidhinishwa. Usalama wa fedha unategemea jukumu la mtumiaji kulinda funguo zao za kibinafsi.

## Hazina zilizolindwa za awali: Sprout, Sapling na Orchard

ZEC ya zamani iliyolindwa inaweza kuhitaji kuhamishwa kama sehemu ya urejeshaji. Njia inategemea ni bwawa gani lililolindwa linalohifadhi fedha kwa sasa.

> **NU7 imepangwa kufanyika Novemba 5, 2026.** Mara tu itakapoanza kutumika, njia ya sasa ya uhamiaji kutoka kwenye bwawa la Sprout la zamani itaacha kufanya kazi.
>
> Ikiwa bado una ZEC kwenye bwawa la Sprout, ihamishe kabla ya uboreshaji. Baada ya kuwasha, zana zilizopo hazitaweza tena kuhamisha fedha za Sprout kwenye Sapling, anwani zinazoonekana, au sehemu nyingine yoyote.
>
> Ukiangalia ukurasa huu **baada ya NU7** kuwashwa, **Sprout hugandishwa kwenye barafu** hadi njia ya urejeshaji ya baadaye ipatikane, ambayo haijapangwa kwa sasa.

## Jibu katika ukurasa mmoja

| Fedha zako ziko | Njia ya uhamiaji | Cha kufanya |
| --- | --- | --- |
| **Sprout** | **Sprout → Sapling → Ironwood** | If you have `wallet.dat` au ufunguo wa matumizi wa Sprout unaojitegemea, jaribu njia ya sasa ya kurejesha Argos kwanza. Ikiwa Argos haifai, tumia njia ya gari la pembeni la zamani katika mwongozo kamili wa uwanja. Sprout lazima itue kwenye Sapling kwanza, kisha usonge mbele hadi Ironwood. Njia hii inazingatia wakati kwa sababu ya NU7. |
| **Sapling** | **Sapling → Ironwood** | Hakuna mazingira ya urejeshaji wa Sprout yanayohitajika. Tumia pochi ya sasa ambayo inaweza kurejesha au kutumia akaunti yako maalum ya Sapling na kujenga miamala ya Ironwood. Usaidizi wa Ironwood pekee hauthibitishi usaidizi wa urejeshaji wa Sapling wa zamani. |
| **Orchard** | **Orchard → Ironwood** | Orchard ni ya kutoka pekee. Tumia mtiririko wa uhamiaji wa pochi ya sasa inayoendana na Orchard iliyojengewa ndani ya Orchard-to-Ironwood. Tazama [Fedha zilizorejeshwa na bwawa la kuogelea la Ironwood](#recovered-funds-and-the-ironwood-pool). |

### Mtiririko wa maamuzi ya maswali matano

1. **Is it Sprout?** A seed phrase alone points to a later Sapling/Orchard-era recovery path, not Sprout. A `zc...` anwani, au pochi iliyorejeshwa inayoripoti salio la Sprout, inaelekeza kwa Sprout.
2. **Una nyenzo gani za kurejesha?** Tafuta `wallet.dat`, kompyuta ya zamani au mtoa data, `z_exportwallet` nakala rudufu, au ufunguo wa matumizi wa Sprout uliosafirishwa. `zc...` anwani pekee haitoshi.
3. **Argos au gari la pembeni la zamani?** Kama una `wallet.dat` au ufunguo wa matumizi wa Sprout unaojitegemea na unataka tu pesa zitoke, jaribu [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) kwanza. Tumia njia ya gari la pembeni la zamani katika mwongozo kamili wa sehemu ikiwa Argos haiwezi kushughulikia nyenzo au ikiwa unataka rundo kamili la urejeshaji liwe chini ya udhibiti wako mwenyewe.
4. **Je, tayari una datadir ya zcashd iliyosawazishwa, isiyokatwa?** Hii ni muhimu tu kwa njia ya zamani ya pembeni. Nakili data ya nodi iliyopo tu baada ya kuzima kabisa; vinginevyo mwongozo wa sehemu unashughulikia chaguo za picha/kutoka mwanzo.
5. **Fedha zinaishia wapi?** **Ironwood.** Sprout hupitia Miche kwanza kwa sababu hakuna muamala mmoja wa moja kwa moja wa Sprout-to-Ironwood. Usiache kwenye Sapling.

### Mwongozo Kamili wa Uhamiaji wa Bwawa la ZEC

Kwa marejeleo kamili ya uhamiaji, ikijumuisha njia za urejeshaji zilizo na maelezo, amri, ada, mahitaji ya vifaa, mambo ya kuzingatia kuhusu faragha, utatuzi wa matatizo, na madokezo ya chanzo, soma mwongozo kamili.

**Toleo la 1.1 · Imesasishwa Septemba 18, 2026**

[Soma Mwongozo kamili wa Uhamiaji wa Mabwawa ya ZEC katika ZecHub](/research/zec-pool-migration/view)

> **Kabla ya kuanza:** kwanza tambua **unachorejesha na nyenzo gani za kurejesha ulizonazo**. Mbegu ya pochi ya sasa au ufunguo wa matumizi usio wa Sprout unaoungwa mkono unaweza kuhitaji tu urejeshaji wa kawaida. Nyenzo za zamani — kama vile mbegu ya ZecWallet Lite, urithi `wallet.dat`, or a standalone Sapling or Sprout spending key — may need a dedicated recovery path.
>
> Ukifikiri fedha ziko **Sprout**, thibitisha kwamba bado una mamlaka ya matumizi kabla ya kutenga muda wa kurejesha pesa. `zc...` anwani au nyenzo za kutazama pekee hazitoshi kuhamisha fedha.
>
> **YWallet haitumii tena Zcash baada ya Ironwood.** Tumia **Zkool** kwa urejeshaji wa kawaida usio wa Sprout kutoka kwa mbegu na funguo zinazoungwa mkono. Tumia **Argos** kwa urejeshaji wa ZecWallet Lite, faili za pochi ya zamani, na funguo za matumizi za Sapling/Sprout zinazojitegemea. Kwa Sprout, Argos ndiyo njia ya kwanza kujaribu; mwongozo kamili wa sehemu unashughulikia sehemu ya nyuma ya gari la pembeni la zamani.
>
> Tumia jedwali lililo hapa chini kulingana na **kile ulicho nacho**, si kifaa cha kurejesha unachokumbuka kutumia.

| Una | Anza hapa |
| --- | --- |
| Kifunguo cha mbegu au ufunguo wa matumizi usio wa Chipukizi unaoungwa mkono** kutoka kwa pochi ya sasa au iliyohifadhiwa hivi karibuni, ikijumuisha nyenzo za zamani za YWallet Zcash | [Zkool](#fund-recovery-with-zkool) |
| **Ufunguo wa kutazama pekee** | Zkool inaweza kuingiza funguo za kutazama zinazoungwa mkono kwa ufikiaji wa kusoma pekee, lakini ufunguo wa kutazama hauwezi kuidhinisha matumizi ya kurejesha. Tafuta ufunguo wa mbegu au matumizi unaolingana. |
| Mbegu ya **ZecWallet Lite** yenye maneno 24 | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) |
| ZecWallet Lite au zcashd `wallet.dat`, or a standalone Sapling / Sprout spending key | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). Kufikia Septemba 18, 2026, v1.3.0 ni ya sasa na inapendelewa; tumia v1.2.0 au baadaye kwa `wallet.dat` na kupona kwa Chipukizi. |
| Nyenzo ya chipukizi ambayo Argos haiwezi kushughulikia, au urejeshaji ambapo unataka vipengele vya zamani viwe chini ya udhibiti wako mwenyewe | Tumia njia ya gari la pembeni la zamani katika [mwongozo kamili wa uwanja](/research/zec-pool-migration/view). |
| Hakuna ufunguo wa pesa unaofanya kazi au wa matumizi, lakini kifaa kilichofungwa, nenosiri lililosahaulika, au diski iliyoshindwa | [Urejeshaji wa kitaalamu](#professional-recovery-when-you-do-not-have-the-seed)Usitumie kamwe mbegu ya kufanya kazi au ufunguo wa matumizi kwa mtu anayewasiliana nawe bila kuombwa.

## Urejeshaji wa Fedha na Zkool

[Zkool](https://github.com/hhanh00/zkool2/releases) ndiye mrithi wa Zcash anayedumishwa wa YWallet kutoka kwa msanidi programu huyo huyo. Inasaidia njia za urejeshaji zilizo wazi na za kisasa, ikiwa ni pamoja na funguo za zamani za Sapling, lakini **si Sprout**.

Hali mbili zimefunikwa hapa:

1. **Kurejesha akaunti** kutoka kwa kifungu cha mbegu, ufunguo wa faragha, au ufunguo wa kutazama
2. **Kutoa pesa** kutoka kwenye pochi ambayo huwa inaunga mkono anwani za uwazi pekee

### 1) Kurejesha Akaunti

1. Sakinisha Zkool kutoka [ukurasa wa matoleo](https://github.com/hhanh00/zkool2/releases) na uifungue
2. Kwenye **Kidhibiti Akaunti** (ukurasa mkuu), gusa kitufe cha ***** ili kufikia skrini ya **Akaunti Mpya**
3. Ingiza **Jina la Akaunti** ili kutambua akaunti hii
4. Washa **Rejesha Akaunti?**. Hii inaonyesha sehemu za urefu wa ufunguo na kuzaliwa
5. Bandika ufunguo wako kwenye sehemu ya **Key (Seed Phrase, Private Key, au Viewing Key)**. Zkool inakubali misemo ya urejeshaji (seed phrases), funguo za siri za Sapling, funguo zilizopanuliwa za aina ya uwazi, na viewing keys zinazotumika. Viewing key ni ya kusoma pekee na haiwezi kuidhinisha matumizi ya fedha.
6. Ingiza **Urefu wa Kuzaliwa** kwa akaunti ya zamani. Zkool haichanganui vizuizi kabla ya urefu huu, kwa hivyo chagua urefu kabla ya shughuli ya kwanza ya pochi ikiwa huna uhakika. Urefu wa kuzaliwa uliowekwa kuchelewa sana unaweza kufanya miamala halisi ionekane haipo.

![Zkool New Account screen with Restore Account and Advanced Options both turned on](/content-images/zkool-restore-account-60b1d2777e.webp)

7. Hifadhi akaunti, kisha isawazishe

### Kurejesha mbegu kutoka kwa pochi tofauti

Ikiwa mbegu ilitoka kwenye pochi inayofuata ZIP 316 — ikijumuisha ZODL (zamani Zashi), Zingo, au zcashd — washa **Chaguo za Kina** na uwashe **Tumia Mabadiliko ya Ndani** kabla ya kuhifadhi.

ZIP 316 hutumia anwani tofauti ya ndani/mabadiliko. Kurejesha moja ya akaunti hizi bila **Tumia Mabadiliko ya Ndani** kunaweza kufanya matokeo ya mabadiliko yaonekane kuwa hayapo ingawa fedha bado zipo.

Sehemu mbili zaidi zinaonekana chini ya **Chaguzi za Kina**:

- **Nenosiri la Ziada (si lazima)**, tu ikiwa pochi ya asili ilitumia moja
- **Kielezo cha Akaunti**, ikiwa pochi ya awali ilikuwa na akaunti kadhaa kwenye mbegu moja. Fedha zinaweza kuwa chini ya kielezo tofauti

> **Chaguo hizi mbili huonekana tu wakati kuna 'seed phrase' halali katika sehemu ya 'Key'.** Sehemu hiyo ikiwa tupu, au ikiwa na 'private key' au 'viewing key', Zkool huonyesha tu **Use Internal Change** na **H/W Ledger**. Bandika 'seed' kwanza, kisha ufungue **Advanced Options**.

### 2) Kutafuta Fedha kutoka kwa Pochi ya Uwazi Pekee

Ikiwa pochi au akaunti ya zamani ilikuwa na **uwazi wa ZEC pekee**, rejesha akaunti kwanza, tafuta kila anwani ya uwazi iliyotumika, kisha uhamishe pesa hadi sehemu ya sasa yenye ulinzi unaoidhibiti. Usidhani kwamba chapa ya pochi ya zamani ilikuwa na uwazi pekee kila wakati; baadhi ya bidhaa ziliongeza usaidizi wa ulinzi katika matoleo ya baadaye.

1. Rejesha akaunti kwa kutumia hatua zilizo hapo juu
2. Fungua akaunti na uende kwenye ukurasa wa **Pokea Fedha**
3. Gusa kioo cha kukuza kwenye upau wa juu (**Tafuta anwani zingine zinazoonekana wazi**). Pochi zinazozunguka anwani, kama vile Ledger na Exodus, hutoa anwani nyingi zinazoonekana wazi kutoka kwa mbegu moja, na hii hupata zile zinazoshikilia fedha.
4. **Weka upya na usawazishe akaunti baadaye.** Anwani mpya zilizopatikana huonyesha salio lake kwenye skanisho linalofuata, kwa hivyo kuruka hii kunafanya ionekane kama ufutaji haukupata chochote.
5. Nenda kwenye ukurasa wa **Tuma**. Karibu na salio utapata vitufe vitatu vya aikoni. Havina lebo za maandishi, kwa hivyo elekeza au bonyeza kwa muda mrefu ili kuona majina yao:
   - **Ngao Moja** (ngao iliyoainishwa) husogeza anwani moja inayoonekana kwa wakati mmoja
   - **Shield All** (ngao imara) huhamisha kila kitu kutoka kwa kila anwani inayoonekana kwa wakati mmoja
   - **Fungua Kizuizi Chote** (kufuli iliyo wazi) huenda kinyume chake, hadi anwani inayoonekana wazi

> **Shield One ndiyo chaguo la faragha zaidi.** Kulinda anwani kadhaa katika muamala mmoja huziunganisha hadharani kama za mtu yule yule. Zkool inaonya kuhusu hili lenyewe kabla ya kuendesha Shield All.

6. Kagua muamala na uutume

Unshield All ni muhimu wakati wa kujiondoa kwenye soko la kubadilishana ambalo linakubali anwani zinazoonekana wazi pekee. Vitufe vya kujikinga huonekana tu ikiwa akaunti ina anwani iliyolindwa, na Unshield All ikiwa tu ina anwani inayoonekana wazi.

## ZecWallet Lite na urejeshaji wa pochi ya zamani na Argos

[ZecWallet Lite](https://github.com/adityapk00/zecwallet-lite) haitumiki tena na hifadhi yake imehifadhiwa. Utoaji wake wa mbegu hutofautiana na mpangilio unaotumiwa na pochi za sasa, kwa hivyo kuingiza kifungu hicho hicho kwenye pochi ya kisasa kunaweza kukosa pesa zilizohifadhiwa katika anwani za ziada za ZecWallet Lite. [Argos](https://argos.sovright.com), kutoka Sovright, ni nafasi ya kazi ya kurejesha data kwenye kompyuta iliyojengwa kwa ajili ya kesi hii na nyingine za kurejesha data zilizopitwa na wakati.

Argos inasoma faili za mbegu na pochi za ZecWallet Lite, zcashd `wallet.dat`, standalone Sapling extended spending keys, and Sprout spending material. For Sprout, a ZecWallet Lite seed alone is not enough because those keys were generated separately. Argos is a recovery tool, not a day-to-day wallet: inspect the source material locally, scan, then sweep into a maintained wallet you control.

Least Authority [imekaguliwa](https://argos.sovright.com/assets/least-authority-argos-audit-2026-06-29.pdf) chombo. Urejeshaji wenyewe ni bure. Mchango wa hiari kwa Sovright unaweza kuonekana wakati wa uporaji.

> **Usichape mbegu kwenye tovuti.** Tovuti ya Argos ni upakuaji na upakuaji pekee [mwongozo wa mtumiaji](https://argos.sovright.com/guide.html)Funguo hubaki kwenye programu ya eneo-kazi iliyosainiwa. Uthibitisho ni wa ndani dhidi ya cheki za BIP-39. Sehemu ya mbegu hufunguka mara tu uchanganuzi unapoanza. Mtu yeyote anayekutumia ujumbe akiomba mbegu hiyo "ili kusaidia kurejesha pesa zako" anakulaghai.

### Kabla ya kufungua Argos

1. Pakua programu ya kompyuta ya mezani kutoka [tovuti rasmi ya Argos](https://argos.sovright.com) au [Ukurasa wa matoleo ya GitHub](https://github.com/sovright/argos/releases)Thibitisha hundi au sahihi zinapochapishwa.
2. Tumia toleo la sasa la Argos. Kufikia Septemba 18, 2026, **v1.3.0** ni toleo la sasa na linapendelewa zaidi. Tumia **v1.2.0 au baadaye kwa `wallet.dat` na urejeshaji wa Sprout**. Miundo iliyo na umri wa zaidi ya 1.1.0 bado inaweza kuchanganua lakini kujenga majaribio ya kabla ya Ironwood ambayo mtandao unakataa; sasisha na ujaribu tena.
3. Fanya kazi kwenye mashine unayoiamini. Pendelea usimbaji fiche wa diski nzima. Usishiriki skrini wakati nenosiri, msimbo wa siri, au ufunguo wa matumizi unaonekana.
4. Have a destination Unified Address ready from a maintained wallet you control, such as [ZODL](https://zodl.app/)Thibitisha anwani iliyo kwenye pochi hiyo kabla ya kuibandika kwenye Argos.

### Kurejesha mbegu

1. Fungua Argos na uchague **Nina kifungu changu cha maneno 24 cha mbegu**. Urejeshaji wa mbegu hauhitaji faili ya pochi.
2. Bandika kifungu cha maneno na ubofye **Thibitisha mbegu**. Ikiwa kinasema mbegu ni halali, endelea.
3. Ingiza **urefu wa siku ya kuzaliwa**, au makadirio ya karibu zaidi ya wakati pochi iliundwa. Urefu wa mapema ni polepole lakini salama kuliko kukisia kuchelewa.
4. Chini ya vidhibiti vya seva, tumia mpangilio wa awali wa seva ya sasa, au ingiza URL za lightwalletd. URL zilizotenganishwa kwa koma hujaribiwa kwa mpangilio. Mifano ya umma:

   `https://zec.rocks:443,https://zec-node.cakewallet.com:443,https://na.zec.rocks:443`

5. Bandika Unified Address ya mahali unapoelekea.
6. Bofya **anza kuchanganua**. Hii inaweza kuchukua dakika au siku kulingana na urefu wa siku ya kuzaliwa. Unaweza kuacha na kufungua tena nafasi ya kazi ile ile; uchanganuzi unaendelea.
7. Uchanganuzi utakapokamilika, kagua salio, makadirio ya ada, na unakoenda, kisha bofya **fagia**.

Kutangaza mrejesho wa pesa hakuwezi kurekebishwa. Weka faili asili ya mkoba hadi kila kifurushi husika kitakapofutwa na mkoba wa mwisho uonyeshe pesa zinazotarajiwa. Mara tu urejesho utakapokamilika, ondoa siri za urithi badala ya kuendelea kuzitumia kwa shughuli mpya.

### Faili za pochi na funguo zinazojitegemea

Kwenye skrini ya kukaribisha, **Nina faili ya pochi** inashughulikia faili ya ZecWallet Lite, zcashd `wallet.dat`, or standalone Sapling extended spending keys. Standalone Sprout spending-key recovery is handled by Argos's Sprout recovery path/CLI.

Argos husoma faili za mkoba bila kuzibadilisha. Ikiwa mkoba umesimbwa kwa njia fiche, weka neno-siri unapoombwa; hutumika kwenye kumbukumbu na haihifadhiwi kwenye diski. Kagua idadi ya funguo za aina ya uwazi, Sapling, na Sprout kabla ya kuanza uchanganuzi.

Funguo za kutazama hazikubaliki kwa ajili ya kufutwa kwa sababu haziwezi kuidhinisha matumizi.

### Maelezo ya chipukizi

Mbegu ya ZecWallet Lite haitoi funguo za Sprout. Funguo hizo zilizalishwa kando. Rejesha Sprout kutoka kwa zcashd `wallet.dat`, au kutoka kwa ufunguo wa matumizi wa kujitegemea katika CLI.

Ikiwa faili tayari ina data ya noti inayoweza kutumika na shahidi aliyehifadhiwa, Argos inaweza kutoa **Sweep Sprout funds** bila skanisho la mnyororo. Vinginevyo inaweza kuendesha skanisho kamili inayoweza kuendelea tena kupitia mtandao wa P2P. Skanisho hilo ni kubwa na la polepole. Sehemu ya ukaguzi inayoandika ina uwezo wa kutumia, kwa hivyo ilinde kama pochi ya asili.

Thamani ya chipukizi inaweza kutua kwenye Miche. Baada ya fedha za Miche kuthibitishwa na kutumika, zihamishe hadi **Ironwood** ukitumia pochi ya sasa inayounga mkono akaunti ya Miche iliyorejeshwa. Usisimame Sapling.

## Fedha zilizorejeshwa na bwawa la kuogelea la Ironwood

Kwa kuwa uboreshaji wa Ironwood (NU6.3) uliamilishwa tarehe 28 Julai 2026, bwawa la Orchard ni la matumizi pekee. Hakuna thamani mpya inayoweza kuingia ndani yake, na thamani iliyopo hutoka kupitia turnstile hadi Ironwood.

Ikiwa pesa zako zilizorejeshwa ziko Orchard, zihamishie Ironwood kwa kutumia mtiririko wa uhamiaji uliojengwa ndani wa pochi ya sasa**. Orchard inatoka tu baada ya NU6.3.

Zkool 6.30.0 ni ya sasa kuanzia Septemba 18, 2026 na inasaidia Ironwood. Muundo wake wa uhamiaji unazingatia faragha lakini si sawa na kudai kufuata ZIP 318. Pochi zingine za sasa zinaweza kutumia uhamiaji wa hatua kwa hatua wa mtindo wa ZIP 318. Fuata skrini ya uhamiaji ya sasa ya pochi iliyosakinishwa na maelezo ya kutolewa badala ya kubuni kiasi au ratiba ya mwongozo.

Uhamishaji wa hatua kwa hatua unaweza kutumia miamala mingi, kwa hivyo ada ya jumla inaweza kuwa kubwa kuliko uhamisho wa hatua moja.

> **Kiasi cha uhamishaji ni cha umma.** Thamani ikivuka turnstile, kiasi na urefu wa block huonekana kwenye mnyororo hata kama mtumaji na mpokeaji hubaki wamehifadhiwa. Tumia sera ya uhamishaji ya faragha/hatua iliyojengewa ndani ya pochi wakati faragha ni muhimu, na utumie faragha ya kiwango cha mtandao kama vile Tor au safu nyingine ya faragha inayoaminika inapohitajika. Faragha ya mtandao inaweza kuficha kiungo chako cha IP; haifichi kiasi cha uhamishaji wa umma.

## Urejeshaji wa Kina kwa kutumia ZExCavator

[ZExCavator](https://github.com/zingolabs/zexcavator) ni **kazi inayoendelea** Mradi wa kurejesha wa Zingo Labs unaolenga faili za pochi za ZecWallet Lite na uhamishaji wa umbizo la pochi. README yake kwa sasa inaelekeza watumiaji wa kurejesha fedha kwenye chaguo la **Zingolib** la kuuza nje huku usaidizi kamili wa ZeWIF bado ukitengenezwa.

Ichukulie kama kifaa cha hali ya juu/kingo badala ya njia chaguo-msingi ya kurejesha. Kwa mbegu za kawaida za ZecWallet Lite, faili za pochi, zcashd `wallet.dat`, na funguo za matumizi zinazotumika peke yake, jaribu Argos kwanza. Thibitisha chochote kilichorejeshwa na ZExCavator kwenye pochi iliyohifadhiwa kabla ya kutegemea.

## Urejeshaji wa kitaalamu wakati huna mbegu

Ikiwa ufunguo au mbegu imepotea, urejeshaji unaojiendesha wenyewe hauwezi kuanza. Baadhi ya watu katika nafasi hiyo hutumia kampuni ya kitaalamu ya urejeshaji kwa nywila zilizosahaulika, hitilafu za vifaa, au diski zisizosomeka.

Njia hiyo si sawa na kurejesha mbegu uliyonayo bado. Usimpe mtu yeyote mbegu inayofanya kazi anayejitolea "kuirejesha" kwa ajili yako. Toleo la ulaghai la huduma hii ni la kawaida.

[Unciphered](https://unciphered.com) ni kampuni moja inayofanya kazi hii ndani na imeshughulikiwa katika maeneo kama vile [Imeunganishwa kwa waya](https://www.wired.com/story/unciphered-crypto-wallet-recovery/). Ni huduma ya jumla ya kurejesha data ya kidijitali, si kifaa maalum cha Zcash, na hutoza ada kwa kazi hiyo. ZecHub haiungi mkono kampuni yoyote ya kurejesha data. Ukifuata njia hii, thibitisha kikoa rasmi mwenyewe na udhani mtu yeyote anayekutumia DM kwanza ni mlaghai.

Ikiwa bado una ufunguo wa mbegu au matumizi unaofanya kazi, anza na njia ya kurejesha data inayojiendesha kama vile Zkool au Argos kwenye mashine yako mwenyewe badala yake.

## YWallet haitumiki tena

YWallet ilikuwa kifaa cha kurejesha kilichopendekezwa kwenye ukurasa huu kwa muda mrefu, na miongozo mingi ya zamani bado inaelekeza kwenye hilo.

Msanidi programu wake sasa anasema kwamba YWallet haiungi mkono tena Zcash tangu Ironwood isasishwe na inawaelekeza watumiaji wa Zcash kwa **Zkool**, mrithi anayedumishwa. Hifadhi mbegu/nyenzo muhimu za zamani za YWallet, lakini usianze uhamishaji mpya wa Zcash katika YWallet.

Ikiwa tayari una nyenzo za kurejesha Zcash kutoka YWallet, zirejeshe katika Zkool kwa kutumia njia ya mbegu/funguo inayoungwa mkono hapo juu.

## Kurasa zinazohusiana

- [Pochi](/using-zcash/wallets) - pochi gani zinatunzwa na utayari wao wa Ironwood, ikiwa ni pamoja na Argos
- [Ironwood](/zcash-tech/ironwood) - uboreshaji huo ulibadilisha nini na kwa nini fedha zinahama
- [Kumbukumbu](/using-zcash/memos) - jinsi memo zilizosimbwa kwa njia fiche zinavyofanya kazi
- [Funguo za Kutazama](/zcash-tech/viewing-keys) - ufikiaji wa kusoma pekee bila nguvu ya matumizi
- [Nodi za Lightwallet](/zcash-tech/lightwallet-nodes) - public lightwalletd endpoints Argos can use
- [Mwongozo wa mtumiaji wa Argos](https://argos.sovright.com/guide.html) - muhtasari rasmi kutoka Sovright
- [Naomi Brockwell kuhusu zana za kurejesha](https://x.com/naomibrockwell/status/2079146521405333526) - Mwongozo wa Argos na maelezo kuhusu kupona kitaaluma
