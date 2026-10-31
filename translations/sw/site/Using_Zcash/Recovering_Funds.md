<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Urejeshaji wa fedha za pochi ya Zcash

**Kwa nini uhifadhi nyenzo zako za kurejesha?**

Mbegu, funguo za kutumia pesa [spending keys], funguo za kutazama [viewing keys], na faili za pochi si vitu vinavyoweza kubadilishana. Maneno ya kurejesha pochi [seed phrase] yanaweza kuzalisha funguo za pochi kwa pochi nyingi, lakini hayachukui nafasi ya kila ufunguo wa zamani au faili ya pochi. Ufunguo wa kutazama unaweza kufichua shughuli za faragha [shielded] lakini hauwezi kuidhinisha matumizi.

Urejeshaji hutegemea kuwa na mamlaka sahihi ya kutumia pesa na njia inayotumika kwa sasa kwa bwawa [pool] linaloshikilia fedha hizo. Hifadhi nyenzo za kurejesha kwa faragha na usiwahi kushiriki mbegu, funguo za kutumia pesa, au faili za pochi na mtu yeyote usiyemwamini.

# Usalama na Wajibu

Ni muhimu sana watumiaji waelewe hatari zinazohusika katika kushughulikia funguo binafsi na kuweka funguo hizi salama dhidi ya ufikiaji usioidhinishwa. Usalama wa fedha hutegemea wajibu wa mtumiaji kulinda funguo zake binafsi.

## Fedha za zamani za faragha: Sprout, Sapling na Orchard

Fedha za zamani za faragha za ZEC zinaweza kuhitaji kuhamishwa kama sehemu ya urejeshaji. Njia hutegemea ni bwawa gani la faragha kwa sasa linashikilia fedha hizo.

> **NU7 imepangwa kufanyika Novemba 5, 2026.** Pindi itakapowashwa, njia ya sasa ya uhamishaji kutoka bwawa la zamani la Sprout itaacha kufanya kazi.
>
> Ikiwa bado una ZEC katika bwawa la Sprout, zihamishe kabla ya uboreshaji. Baada ya kuwashwa, vifaa vilivyopo havitaweza tena kuhamisha fedha za Sprout kwenda Sapling, anwani za uwazi, au marudio mengine yoyote.
>
> Ikiwa unaona ukurasa huu **baada ya NU7** kuwashwa, **Sprout imegandishwa kwenye barafu** hadi mbinu ya urejeshaji ya baadaye itakapopatikana, ambayo kwa sasa haijapangwa.

## Jibu katika ukurasa mmoja

| Fedha zako ziko katika | Njia ya uhamishaji | Cha kufanya |
| --- | --- | --- |
| **Sprout** | **Sprout → Sapling → Ironwood** | Ikiwa una `wallet.dat` au ufunguo wa kutumia pesa wa kujitegemea wa Sprout, jaribu kwanza njia ya sasa ya urejeshaji ya Argos. Ikiwa Argos haifai, tumia njia ya sidecar ya zamani katika mwongozo kamili wa vitendo. Sprout lazima itue kwanza katika Sapling, kisha iendelee hadi Ironwood. Njia hii ina muda mdogo kutokana na NU7. |
| **Sapling** | **Sapling → Ironwood** | Mazingira ya urejeshaji ya Sprout hayahitajiki. Tumia pochi ya sasa inayoweza kurejesha au kutumia akaunti yako mahususi ya Sapling na kutengeneza miamala ya Ironwood. Usaidizi wa Ironwood pekee hauthibitishi usaidizi wa urejeshaji wa Sapling ya zamani. |
| **Orchard** | **Orchard → Ironwood** | Orchard ni ya kutoka tu. Tumia mtiririko wa uhamishaji uliojengewa ndani wa pochi ya sasa inayooana kutoka Orchard kwenda Ironwood. Tazama [Fedha zilizorejeshwa na bwawa la Ironwood](#recovered-funds-and-the-ironwood-pool). |

### Mtiririko wa maamuzi wa maswali matano

1. **Je, ni Sprout?** Maneno ya kurejesha pochi pekee yanaelekeza kwenye njia ya urejeshaji ya enzi ya baadaye ya Sapling/Orchard, si Sprout. Anwani ya `zc...`, au pochi iliyorejeshwa inayoonyesha salio la Sprout, inaelekeza kwenye Sprout.
2. **Una nyenzo gani za kurejesha?** Tafuta `wallet.dat`, kompyuta au datadir ya zamani, nakala rudufu ya `z_exportwallet`, au ufunguo wa kutumia pesa wa Sprout uliotolewa. Anwani ya `zc...` pekee haitoshi.
3. **Argos au sidecar ya zamani?** Ikiwa una `wallet.dat` au ufunguo wa kutumia pesa wa kujitegemea wa Sprout na unataka tu kuhamisha fedha kutoka humo, jaribu kwanza [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). Tumia njia ya sidecar ya zamani katika mwongozo kamili wa vitendo ikiwa Argos haiwezi kushughulikia nyenzo hizo au ikiwa unataka mkusanyiko kamili wa urejeshaji chini ya udhibiti wako mwenyewe.
4. **Je, tayari una datadir ya zcashd iliyosawazishwa na isiyopunguzwa?** Hili ni muhimu kwa njia ya sidecar ya zamani pekee. Nakili data iliyopo ya node baada ya kuzima kwa usafi pekee; vinginevyo mwongozo wa vitendo unashughulikia chaguo za snapshot/kuanza upya.
5. **Fedha zinaishia wapi?** **Ironwood.** Sprout hupitia kwanza Sapling kwa sababu hakuna muamala mmoja wa moja kwa moja wa Sprout-kwenda-Ironwood. Usiishie kwenye Sapling.

### Mwongozo Kamili wa Vitendo wa Uhamishaji wa Bwawa la ZEC

Kwa marejeleo kamili ya uhamishaji, ikijumuisha njia za kina za urejeshaji, amri, ada, mahitaji ya vifaa, masuala ya faragha, utatuzi wa hitilafu, na dondoo za vyanzo, soma mwongozo kamili.

**Toleo 1.1 · Limesasishwa Septemba 18, 2026**

[Soma Mwongozo Kamili wa Vitendo wa Uhamishaji wa Bwawa la ZEC katika ZecHub](/research/zec-pool-migration/view)

> **Kabla ya kuanza:** kwanza bainisha **unachorejesha na nyenzo za urejeshaji ambazo bado unazo**. Mbegu ya pochi ya sasa au ufunguo wa kutumia pesa unaotumika usio wa Sprout unaweza kuhitaji urejeshaji wa kawaida tu. Nyenzo za zamani — kama vile mbegu ya Zecwallet Lite, `wallet.dat` ya zamani, au ufunguo wa kutumia pesa wa kujitegemea wa Sapling au Sprout — zinaweza kuhitaji njia maalumu ya urejeshaji.
>
> Ikiwa unafikiri fedha ziko katika **Sprout**, thibitisha kuwa bado una mamlaka ya kutumia pesa kabla ya kutumia muda katika urejeshaji. Anwani ya `zc...` au nyenzo za kutazama pekee hazitoshi kuhamisha fedha.
>
> **YWallet haitumii tena Zcash baada ya Ironwood.** Tumia **Zkool** kwa urejeshaji wa kawaida usio wa Sprout kutoka mbegu na funguo zinazotumika. Tumia **Argos** kwa urejeshaji wa Zecwallet Lite, faili za pochi za zamani, na funguo za kutumia pesa za kujitegemea za Sapling/Sprout. Kwa Sprout, Argos ndiyo njia ya kwanza ya kujaribu; mwongozo kamili wa vitendo unashughulikia njia mbadala ya sidecar ya zamani.
>
> Tumia jedwali hapa chini kulingana na **kile ulicho nacho kwa kweli**, si kifaa cha urejeshaji unachokumbuka kutumia.

| Unacho | Anzia hapa |
| --- | --- |
| Maneno ya kurejesha pochi au **ufunguo wa kutumia pesa usio wa Sprout** kutoka pochi ya sasa au iliyotunzwa hivi karibuni, ikijumuisha nyenzo za zamani za YWallet Zcash | [Zkool](#fund-recovery-with-zkool) |
| **Ufunguo wa kutazama pekee** | Zkool inaweza kuingiza funguo za kutazama zinazotumika kwa ufikiaji wa kusoma tu, lakini ufunguo wa kutazama hauwezi kuidhinisha matumizi ya urejeshaji. Tafuta mbegu au ufunguo wa kutumia pesa unaolingana. |
| Mbegu ya maneno 24 ya **Zecwallet Lite** | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) |
| Zecwallet Lite au zcashd `wallet.dat`, au ufunguo wa kutumia pesa wa kujitegemea wa Sapling / Sprout | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). Kufikia Septemba 18, 2026, v1.3.0 ndilo toleo la sasa na linalopendekezwa; tumia v1.2.0 au toleo jipya zaidi kwa urejeshaji wa `wallet.dat` na Sprout. |
| Nyenzo za Sprout ambazo Argos haiwezi kushughulikia, au urejeshaji ambapo unataka vipengele vya zamani chini ya udhibiti wako mwenyewe | Tumia njia ya sidecar ya zamani katika [mwongozo kamili wa vitendo](/research/zec-pool-migration/view). |
| Hakuna mbegu au ufunguo wa kutumia pesa unaofanya kazi, lakini kuna kifaa kilichofungwa, nenosiri lililosahaulika, au diski iliyoharibika | [Urejeshaji wa kitaalamu](#professional-recovery-when-you-do-not-have-the-seed). Usiwahi kutuma mbegu au ufunguo wa kutumia pesa unaofanya kazi kwa mtu anayewasiliana nawe bila wewe kuomba. |

## Urejeshaji wa Fedha kwa Zkool

[Zkool](https://github.com/hhanh00/zkool2/releases) ni mrithi unaotunzwa wa Zcash wa YWallet kutoka kwa msanidi programu huyo huyo. Inatumia njia za urejeshaji za uwazi na za kisasa za faragha, ikijumuisha funguo za zamani za Sapling, lakini **si Sprout**.

Hali mbili zinashughulikiwa hapa:

1. **Kurejesha akaunti** kutoka maneno ya kurejesha pochi, ufunguo binafsi, au ufunguo wa kutazama
2. **Kufagilia fedha** kutoka pochi ambayo iliwahi kutumia anwani za uwazi pekee

### 1) Kurejesha Akaunti

1. Sakinisha Zkool kutoka [ukurasa wa matoleo](https://github.com/hhanh00/zkool2/releases) na uifungue
2. Kwenye **Account Manager** (ukurasa mkuu), gusa kitufe cha **+** ili kufikia skrini ya **New Account**
3. Weka **Account Name** ili kutambulisha akaunti hii
4. Washa **Restore Account?**. Hii hufichua sehemu za ufunguo na urefu wa kuzaliwa
5. Bandika ufunguo wako katika **Key (Seed Phrase, Private Key, or Viewing Key)**. Zkool hukubali maneno ya kurejesha pochi, funguo za siri za Sapling, funguo zilizopanuliwa za uwazi, na funguo za kutazama zinazotumika. Ufunguo wa kutazama ni wa kusoma tu na hauwezi kuidhinisha matumizi.
6. Weka **Birth Height** kwa akaunti ya zamani. Zkool haichanganui block kabla ya urefu huu, kwa hiyo chagua urefu ulio mapema kuliko shughuli ya kwanza ya pochi ikiwa huna uhakika. Urefu wa kuzaliwa uliowekwa kwa kuchelewa sana unaweza kufanya miamala halisi ionekane haipo.

![Zkool New Account screen with Restore Account and Advanced Options both turned on](/content-images/zkool-restore-account-60b1d2777e.webp)

7. Hifadhi akaunti, kisha isawazishe

### Kurejesha mbegu kutoka pochi tofauti

Ikiwa mbegu ilitoka kwenye pochi inayofuata ZIP 316 — ikijumuisha ZODL (zamani Zashi), Zingo, au zcashd — washa **Advanced Options** na uwashe **Use Internal Change** kabla ya kuhifadhi.

ZIP 316 hutumia anwani tofauti ya ndani/mabadiliko. Kurejesha mojawapo ya akaunti hizi bila **Use Internal Change** kunaweza kufanya matokeo ya mabadiliko yaonekane hayapo ingawa fedha bado zipo.

Sehemu mbili zaidi ziko chini ya **Advanced Options**:

- **Extra Passphrase (optional)**, ikiwa pochi asili ilitumia moja pekee
- **Account Index**, ikiwa pochi asili ilikuwa na akaunti kadhaa kwenye mbegu moja. Fedha zinaweza kuwa chini ya faharasa tofauti

> **Hizi mbili huonekana tu baada ya maneno halali ya kurejesha pochi kuwekwa katika sehemu ya Key.** Sehemu ikiwa tupu, au ikiwa na ufunguo binafsi au wa kutazama, Zkool huonyesha tu **Use Internal Change** na **H/W Ledger**. Bandika mbegu kwanza, kisha fungua Advanced Options.

### 2) Kufagilia Fedha kutoka Pochi ya Anwani za Uwazi Pekee

Ikiwa pochi au akaunti ya zamani ilikuwa na **ZEC za uwazi pekee**, rejesha kwanza akaunti, pata kila anwani ya uwazi iliyotumika, kisha hamisha fedha hadi marudio ya sasa ya faragha unayodhibiti. Usidhani brand ya zamani ya pochi ilikuwa daima ya anwani za uwazi pekee; baadhi ya bidhaa ziliongeza msaada wa faragha katika matoleo ya baadaye.

1. Rejesha akaunti kwa kutumia hatua zilizo hapo juu
2. Fungua akaunti na uende kwenye ukurasa wa **Receive Funds**
3. Gusa kioo cha kukuza katika upau wa juu (**Find other transparent addresses**). Pochi zinazobadilisha anwani, kama Ledger na Exodus, huzalisha anwani nyingi za uwazi kutoka mbegu moja, na hili hupata zile zinazoshikilia fedha
4. **Weka upya na sawazisha akaunti baadaye.** Anwani mpya zilizopatikana huchukua salio lake katika uchanganuzi unaofuata pekee, kwa hiyo kuruka hatua hii hufanya ionekane kama kufagilia hakukupata chochote
5. Nenda kwenye ukurasa wa **Send**. Karibu na salio utapata vitufe vitatu vya ikoni. Havina lebo za maandishi, kwa hiyo elekeza kielekezi juu yake au bonyeza kwa muda mrefu ili kuona majina yake:
   - **Shield One** (ngao yenye mstari) huhamisha anwani moja ya uwazi kwa wakati
   - **Shield All** (ngao imara) huhamisha kila kitu kutoka kila anwani ya uwazi kwa wakati mmoja
   - **Unshield All** (kufuli wazi) huelekea upande mwingine, hadi anwani ya uwazi

> **Shield One ndiyo chaguo lenye faragha zaidi.** Kuficha anwani kadhaa katika muamala mmoja kunaziunganisha hadharani kama za mtu yuleyule. Zkool huonya kuhusu hili yenyewe kabla ya kuendesha Shield All.

6. Kagua muamala na uutume

Unshield All ni muhimu unapotoa fedha kwenda soko la kubadilishana sarafu linalokubali anwani za uwazi pekee. Vitufe vya kuficha huonekana tu ikiwa akaunti ina anwani ya faragha, na Unshield All huonekana tu ikiwa ina anwani ya uwazi.

## Zecwallet Lite na urejeshaji wa pochi za zamani kwa Argos

[Zecwallet Lite](https://github.com/adityapk00/zecwallet-lite) haitunzwe tena na hazina yake imehifadhiwa kama kumbukumbu. Uzalishaji wake wa mbegu unatofautiana na mpangilio unaotumiwa na pochi za sasa, kwa hiyo kuingiza maneno yale yale katika pochi ya kisasa kunaweza kukosa fedha zilizoshikiliwa kwenye anwani za ziada zilizozalishwa za Zecwallet Lite. [Argos](https://argos.sovright.com), kutoka Sovright, ni eneo-kazi la urejeshaji lililoundwa kwa hali hii na hali nyingine za urejeshaji wa zamani.

Argos husoma mbegu za Zecwallet Lite na faili za pochi, zcashd `wallet.dat`, funguo zilizopanuliwa za kutumia pesa za kujitegemea za Sapling, na nyenzo za kutumia pesa za Sprout. Kwa Sprout, mbegu ya Zecwallet Lite pekee haitoshi kwa sababu funguo hizo zilizalishwa kando. Argos ni kifaa cha urejeshaji, si pochi ya matumizi ya kila siku: kagua nyenzo chanzo ndani ya kifaa chako, changanua, kisha fagilia hadi pochi inayotunzwa unayodhibiti.

Least Authority [ilikagua](https://argos.sovright.com/assets/least-authority-argos-audit-2026-06-29.pdf) kifaa hiki. Urejeshaji wenyewe haulipishwi. Mchango wa hiari kwa Sovright unaweza kuonekana wakati wa kufagilia.

> **Usiwahi kuandika mbegu kwenye tovuti.** Tovuti ya Argos ni ya upakuaji na [mwongozo wa mtumiaji](https://argos.sovright.com/guide.html) pekee. Funguo hubaki katika programu ya eneo-kazi iliyotiwa sahihi. Uthibitishaji hufanyika ndani ya kifaa dhidi ya checksum ya BIP-39. Sehemu ya mbegu hufutwa uchanganuzi unapoanza. Mtu yeyote anayekutumia ujumbe akiomba mbegu hiyo “kusaidia kurejesha fedha zako” anakulaghai.

### Kabla ya kufungua Argos

1. Pakua programu ya eneo-kazi kutoka [tovuti rasmi ya Argos](https://argos.sovright.com) au ukurasa wa matoleo wa [GitHub](https://github.com/sovright/argos/releases). Thibitisha checksum au sahihi zinapochapishwa.
2. Tumia toleo la sasa la Argos. Kufikia Septemba 18, 2026, **v1.3.0** ndilo toleo la sasa na linalopendekezwa. Tumia **v1.2.0 au toleo jipya zaidi kwa urejeshaji wa `wallet.dat` na Sprout**. Matoleo ya zamani kuliko 1.1.0 bado yanaweza kuchanganua lakini hutengeneza ufagiliaji wa kabla ya Ironwood ambao mtandao hukataa; sasisha na ujaribu tena.
3. Fanya kazi kwenye mashine unayoamini. Pendelea usimbaji fiche wa diski nzima. Usishiriki skrini wakati mbegu, kifungu cha siri, au ufunguo wa kutumia pesa unaonekana.
4. Andaa Anwani Iliyounganishwa ya marudio kutoka pochi inayotunzwa unayodhibiti, kama [ZODL](https://zodl.com/). Thibitisha anwani katika pochi hiyo kabla ya kuibandika kwenye Argos.

### Urejeshaji wa mbegu

1. Fungua Argos na uchague **I have my 24-word seed phrase**. Urejeshaji wa mbegu hauhitaji faili ya pochi.
2. Bandika maneno na ubofye **Validate seed**. Ikiwa inasema mbegu ni halali, endelea.
3. Weka **birthday block height**, au makadirio ya karibu zaidi ya wakati pochi ilipoundwa. Urefu wa mapema ni wa polepole zaidi lakini salama kuliko kukisia muda wa kuchelewa sana.
4. Chini ya vidhibiti vya seva, tumia mpangilio wa awali wa seva ya sasa, au weka URL za lightwalletd. URL zilizotenganishwa kwa koma hujaribiwa kwa mpangilio. Mifano ya umma:

   `https://zec.rocks:443,https://zec-node.cakewallet.com:443,https://na.zec.rocks:443`

5. Bandika Anwani Iliyounganishwa ya marudio.
6. Bofya **start scan**. Hili linaweza kuchukua dakika au siku kulingana na urefu wa block wa kuzaliwa. Unaweza kutoka na kufungua tena eneo-kazi lilelile; uchanganuzi utaendelea.
7. Uchanganuzi ukikamilika, kagua salio, makadirio ya ada, na marudio, kisha ubofye **sweep**.

Kutangaza ufagiliaji hakuwezi kutenduliwa. Hifadhi faili asili ya pochi hadi kila bwawa husika lifagiliwe na pochi ya marudio ionyeshe fedha zinazotarajiwa. Urejeshaji ukikamilika, acha kutumia siri za zamani badala ya kuendelea kuzitumia kwa shughuli mpya.

### Faili za pochi na funguo za kujitegemea

Kwenye skrini ya kukaribisha, **I have a wallet file** inajumuisha faili ya Zecwallet Lite, zcashd `wallet.dat`, au funguo zilizopanuliwa za kutumia pesa za kujitegemea za Sapling. Urejeshaji wa ufunguo wa kutumia pesa wa kujitegemea wa Sprout hushughulikiwa na njia ya urejeshaji ya Argos ya Sprout/CLI.

Argos husoma faili za pochi bila kuzibadilisha. Ikiwa pochi imesimbwa fiche, weka kifungu cha siri unapoombwa; hutumika kwenye kumbukumbu na hakiandikwi kwenye diski. Kagua hesabu za funguo za uwazi, Sapling, na Sprout kabla ya kuanza uchanganuzi.

Funguo za kutazama hazikubaliki kwa ufagiliaji kwa sababu haziwezi kuidhinisha matumizi.

### Madokezo ya Sprout

Mbegu ya Zecwallet Lite haizalishi funguo za Sprout. Funguo hizo zilizalishwa kando. Rejesha Sprout kutoka zcashd `wallet.dat`, au kutoka ufunguo wa kutumia pesa wa kujitegemea katika CLI.

Ikiwa faili tayari ina data ya dokezo inayoweza kutumika na shahidi uliohifadhiwa, Argos inaweza kutoa chaguo la **Sweep Sprout funds** bila uchanganuzi wa mnyororo. Vinginevyo inaweza kuendesha uchanganuzi kamili wa block unaoweza kuendelea kupitia mtandao wa P2P. Uchanganuzi huo ni mkubwa na wa polepole. Checkpoint inayoandikwa ina uwezo wa matumizi, kwa hiyo ilinde kama pochi asili.

Thamani ya Sprout inaweza kutua katika Sapling pekee. Baada ya fedha za Sapling kuthibitishwa na kuwa tayari kutumika, ziendeleze hadi **Ironwood** kwa pochi ya sasa inayotumia akaunti iliyorejeshwa ya Sapling. Usiishie kwenye Sapling.

## Fedha zilizorejeshwa na bwawa la Ironwood

Tangu uboreshaji wa Ironwood (NU6.3) ulipowashwa tarehe 28 Julai 2026, bwawa la Orchard ni la kutumia pesa pekee. Hakuna thamani mpya inayoweza kuingia humo, na thamani iliyopo hutoka kupitia turnstile hadi Ironwood.

Ikiwa fedha zako zilizorejeshwa ziko katika Orchard, zihamishe hadi Ironwood kwa kutumia **mtiririko wa uhamishaji uliojengewa ndani wa pochi ya sasa**. Orchard ni ya kutoka tu baada ya NU6.3.

Zkool 6.30.0 ndilo toleo la sasa kufikia Septemba 18, 2026 na linatumia Ironwood. Muundo wake wa uhamishaji unalenga faragha lakini si sawa na kudai utiifu wa ZIP 318. Pochi nyingine za sasa zinaweza kutumia uhamishaji wa hatua kwa hatua wa mtindo wa ZIP 318. Fuata skrini ya sasa ya uhamishaji na dondoo za matoleo za pochi iliyosakinishwa badala ya kubuni kiasi au ratiba ya mkono.

Uhamishaji wa hatua kwa hatua unaweza kutumia miamala mingi, kwa hiyo ada ya jumla inaweza kuwa kubwa kuliko uhamisho wa mara moja.

> **Kiasi cha uhamishaji ni cha umma.** Thamani inapovuka turnstile, kiasi na urefu wa block vinaonekana kwenye mnyororo ingawa mtumaji na mpokeaji hubaki wa faragha. Tumia sera ya uhamishaji ya faragha/ya hatua kwa hatua iliyojengewa ndani ya pochi wakati faragha ni muhimu, na tumia faragha ya kiwango cha mtandao kama Tor au safu nyingine ya faragha unayoamini inapofaa. Faragha ya mtandao inaweza kuficha kiungo chako cha IP; haifichi kiasi cha umma kinachovuka.

## Urejeshaji wa Kina kwa ZExCavator

[ZExCavator](https://github.com/zingolabs/zexcavator) ni mradi wa urejeshaji wa Zingo Labs ambao ni **kazi inayoendelea**, na kwa sasa unalenga faili za pochi za Zecwallet Lite na uhamishaji wa miundo ya pochi. README yake kwa sasa inaelekeza watumiaji wa urejeshaji wa fedha kwenye chaguo la kuuza nje la **Zingolib** huku msaada kamili wa ZeWIF ukiendelea kutengenezwa.

Ione kama kifaa cha hali za juu/maalumu badala ya njia chaguomsingi ya urejeshaji. Kwa mbegu za kawaida za Zecwallet Lite, faili za pochi, zcashd `wallet.dat`, na funguo za kutumia pesa za kujitegemea zinazotumika, jaribu kwanza Argos. Thibitisha chochote kilichorejeshwa na ZExCavator katika pochi inayotunzwa kabla ya kukitegemea.

## Urejeshaji wa kitaalamu wakati huna mbegu

Ikiwa mbegu au ufunguo umepotea, urejeshaji unaojiendesha mwenyewe hauwezi kuanza. Baadhi ya watu katika hali hiyo hutumia kampuni ya kitaalamu ya urejeshaji kwa manenosiri yaliyosahaulika, hitilafu za vifaa, au diski zisizosomeka.

Njia hiyo si sawa na kurejesha mbegu ambayo bado unayo. Usimpe mtu yeyote mbegu inayofanya kazi anayesema ataku“rejeshea” hiyo. Toleo la ulaghai la huduma hii ni la kawaida.

[Unciphered](https://unciphered.com) ni kampuni moja inayofanya kazi hii ndani ya kampuni na imezungumziwa katika maeneo kama Wired. Wao ni huduma ya jumla ya urejeshaji wa crypto, si kifaa mahususi cha Zcash, na hutoza kwa kazi hiyo. ZecHub haipendekezi kampuni yoyote ya urejeshaji. Ukiamua kufuata njia hii, thibitisha kikoa rasmi mwenyewe na chukulia mtu yeyote anayekutumia DM kwanza kuwa ni tapeli.

Ikiwa bado una mbegu au ufunguo wa kutumia pesa unaofanya kazi, anza badala yake na njia ya urejeshaji inayosimamiwa nawe kama Zkool au Argos kwenye mashine yako mwenyewe.

## YWallet haitunzwe tena

YWallet kilikuwa kifaa cha urejeshaji kilichopendekezwa kwenye ukurasa huu kwa muda mrefu, na miongozo mingi ya zamani bado inaelekeza huko.

Msanidi programu wake sasa anasema kwamba YWallet haitumii tena Zcash tangu sasisho la Ironwood na anaelekeza watumiaji wa Zcash kwenye **Zkool**, mrithi unaotunzwa. Hifadhi nyenzo za zamani za mbegu/ufunguo za YWallet, lakini usianze uhamishaji mpya wa Zcash katika YWallet.

Ikiwa tayari una nyenzo za urejeshaji za Zcash kutoka YWallet, zirejeshe katika Zkool kwa kutumia njia inayotumika ya mbegu/ufunguo hapo juu.

## Kurasa zinazohusiana

- [Pochi](/using-zcash/wallets) - pochi zipi zinatunzwa na utayari wake wa Ironwood, ikijumuisha Argos
- [Ironwood](/zcash-tech/ironwood) - kile uboreshaji ulibadilisha na kwa nini fedha huhamishwa
- [Jumbe](/using-zcash/memos) - jinsi jumbe zilizosimbwa fiche zinavyofanya kazi
- [Funguo za kutazama](/zcash-tech/viewing-keys) - ufikiaji wa kusoma tu bila uwezo wa kutumia pesa
- [Node za Lightwallet](/zcash-tech/lightwallet-nodes) - endpoints za umma za lightwalletd ambazo Argos inaweza kutumia
- [Argos mwongozo wa mtumiaji](https://argos.sovright.com/guide.html) - maelekezo rasmi kutoka Sovright
- [Naomi Brockwell kuhusu vifaa vya urejeshaji](https://x.com/naomibrockwell/status/2079146521405333526) - maelekezo ya Argos na dokezo kuhusu urejeshaji wa kitaalamu
