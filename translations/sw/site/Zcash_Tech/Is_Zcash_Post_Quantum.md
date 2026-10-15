<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Is_Zcash_Post_Quantum.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Je Zcash ni Baada ya Quantum?

## Jibu fupi

Hapana, bado.

Tangu uboreshaji wa Ironwood, Zcash inaweza kurejeshwa kwa kiasi kikubwa** kwa fedha zilizohifadhiwa katika bwawa la Ironwood. Hiyo ni hatua halisi, lakini si sawa na kuwa salama baada ya kiasi. ZIP 2005, vipimo vilivyo nyuma yake, vinasema hivyo moja kwa moja: mabadiliko "hayafanyi itifaki yenyewe kuwa salama dhidi ya wapinzani wa kiasi". Inaandaa fedha za Ironwood ili ziweze kuhamishwa kupitia Itifaki ya Urejeshaji ya siku zijazo mara tu usimbaji fiche wa sasa utakapozimwa.

Ukurasa huu unatenganisha kile ambacho Zcash inalinda leo, kile ambacho Ironwood ilibadilisha, kile ambacho bado kinafichuliwa, na kile ambacho ni pendekezo tu [jedwali la hali](#status-table) karibu na mwisho inaonyesha mahali ambapo kila kipande kinasimama na wakati ambacho kilikaguliwa mara ya mwisho.

<br/>

## Hii ni kwa ajili ya nani

- Mtu yeyote ambaye ameona "quantum-recoverable" na akaisoma kama "quantum-proof"
- Wamiliki wa fedha wakiamua kama watahamisha fedha kwenda Ironwood
- Waandishi na wasimamizi wanaohitaji jibu la chanzo ili kuwaelekeza watu

Kwa usuli kuhusu kompyuta ya quantum yenyewe, anza na [Usalama wa Baada ya Quantum huko Zcash](/zcash-tech/post-quantum-security).

<br/>

## Kwa nini swali linachanganya

"Post-quantum" hutumika kana kwamba ni sifa moja. Kwa Zcash kuna angalau maswali manne tofauti, na yana majibu tofauti:

1. **Faragha.** Je, mshambuliaji wa quantum anaweza kuona ni nani aliyemlipa nani na kiasi gani?
2. **Matumizi.** Je, mshambuliaji wa quantum anaweza kutumia sarafu ambazo si zake?
3. **Mfumko wa bei.** Je, mshambuliaji wa quantum anaweza kuunda ZEC kutokana na kitu chochote?
4. **Kurejesha data.** Ikiwa usimbaji fiche wa sasa lazima uzimwe, je, watumiaji waaminifu bado wanaweza kupata pesa zao?

Ironwood hubadilisha jibu la swali la nne pekee, na kwa maelezo tu katika bwawa la Ironwood.

Tishio nyuma ya haya yote ni mshambuliaji anayeweza kukokotoa logaritimu zisizo na mpangilio maalum kwenye mikunjo ya duaradufu ambayo Zcash hutumia. Kompyuta kubwa ya quantum inayotumia algoriti ya Shor itakuwa njia moja ya kufanya hivyo. ZIP 2005 inabainisha kuwa kupata logaritimu moja isiyo na mpangilio maalum kunatosha kusababisha mfumuko wa bei kiholela au kuiba fedha.

<br/>

## Kile ambacho Zcash inalinda leo

Jedwali hili linaelezea itifaki inavyoendelea sasa, dhidi ya mshambuliaji anayeweza kuvunja logariti tofauti. Inatumika kwa kila bwawa lililolindwa, ikiwa ni pamoja na Ironwood, kwa sababu Ironwood hutumia saketi sawa Orchard, uthibitisho wa Halo 2 na sahihi za RedPallas kama Orchard.

| Mali | Dhidi ya mshambuliaji wa quantum leo | Kilichobadilika Ironwood |
|---|---|---|
| Faragha | Hushikilia ikiwa mshambuliaji hajui anwani yako iliyolindwa. Uthibitisho na sahihi zilizopangwa upya hazivujishi chochote cha ziada. Ikiwa mshambuliaji anajua anwani, anaweza kuondoa maandishi yaliyotumwa kwake, ikiwa ni pamoja na yale ya zamani yaliyohifadhiwa kutoka kwa mnyororo. | Hakuna. ZIP 2005: "Hali kuhusu Faragha haijabadilika kwa bwawa lolote." |
| Matumizi | Haijalindwa. Mshambuliaji anaweza kughushi ushahidi au kutumia sahihi na kuiba kutoka kwenye bwawa lolote lililolindwa, hata kwa anwani ambazo hajawahi kuziona. | Hakuna kitu bado. Ulinzi unafika tu baada ya kuhamia Itifaki ya Urejeshaji katika siku zijazo. |
| Mfumuko wa bei | Haijalindwa. Mshambuliaji anaweza kughushi ushahidi halali na kuunda ZEC ndani ya bwawa lolote lililolindwa, labda bila mtu yeyote kugundua. Kikomo pekee ni [turnstile](/zcash-tech/the-turnstile): hakuna bwawa linaloweza kulipa zaidi ya salio lake lililorekodiwa. | Hakuna kitu bado. Ironwood notes sasa zinajitolea kwa maudhui yake yote kwa njia ambayo mshambuliaji wa quantum hapaswi kuweza kuiga, ambayo ndiyo Itifaki ya Urejeshaji ya siku zijazo inahitaji ili kudumisha sauti ya usambazaji. |
| Urejeshaji | Vidokezo vya Sprout, Sapling na Orchard havina njia ya kurejesha. Mara tu itifaki zao zitakapozimwa, chochote kilichobaki ndani yake hakitaweza kufikiwa. | Kila noti Ironwood inaweza kupatikana kimsingi. Hakuna noti Sapling au Orchard inayoweza kupatikana. |

ZEC ya uwazi ni kesi tofauti. Saini zake za ECDSA zinaweza kughushiwa mara tu ufunguo wa umma unapojulikana. Kwa anwani ya kawaida ya uwazi inayotokea mara ya kwanza unapotumia pesa kutoka humo, na pia kuna dirisha fupi wakati muamala haujathibitishwa kwenye memo. ZIP 2005 haibadilishi yoyote kati ya hayo.

<br/>

## Kilichobadilika Ironwood

Ironwood ni uboreshaji wa mtandao NU6.3. Iliamilishwa kwenye Mainnet kwenye kitalu namba 3,428,143 mnamo tarehe 28 Julai 2026. Kusudi lake kuu lilikuwa kutoa uadilifu baada ya hitilafu ya utimamu Orchard (tazama [Ironwood](/zcash-tech/ironwood) ukurasa), na uwezo wa kurejesha kwantamu kutoka ZIP 2005 iliyosafirishwa kama sehemu yake.

- **Muundo mpya wa noti.** Kila noti Ironwood inayotolewa hutumia umbizo linaloweza kurejeshwa kwa quantum (kumbuka baiti ya lead ya maandishi wazi `0x03`). Ubaguzi wa noti sasa unatokana na sehemu zake zote, kwa hivyo noti imeunganishwa na yaliyomo kwa hashi badala ya hesabu ya mviringo-mkunjo pekee.
- **Njia ya kurejesha noti za Ironwood pekee.** ZIP 326 iko wazi kwamba kila noti Ironwood inaweza kurejeshwa na hakuna noti ya Orchard inayoweza kurejeshwa. Mpangilio wa pochi haubadilishi hilo.
- **Orchard iliacha kuchukua thamani mpya.** Zawadi za Coinbase haziwezi tena kwenda Orchard, na Orchard haiwezi tena kutuma kwa anwani tofauti Orchard, kwa hivyo thamani mpya iliyolindwa inatua Ironwood.
- **Pochi zinaambiwa zihamishe kila kitu.** ZIP 2005 inasema pochi ZINAPASWA kuhamisha fedha zote wanazodhibiti, ikiwa ni pamoja na fedha za uwazi, Sprout na Sapling, kwenye noti za Ironwood haraka iwezekanavyo, na kuendelea kufanya hivyo kadri fedha mpya zinavyowasili.

Kile ambacho Ironwood haikubadilisha: usimbaji fiche unaotumika kwa matumizi na kuthibitisha leo, usimbaji fiche wa noti, na chochote kuhusu ZEC.

<br/>

## Vikwazo vilivyobaki

**Kuna dirisha la kufichua.** Kuanzia uanzishaji Ironwood's hadi itifaki za zamani zitakapozimwa, mshambuliaji wa quantum bado anaweza kuiba, kuingiza au kuzuia fedha katika kila bwawa lililolindwa. ZIP 2005 inaita hii "kipindi muhimu cha kufichua" na inaonya kwamba shambulio wakati huo bado linaweza kuathiri uwezo wa mmiliki wa kurejesha nguvu baadaye. Ndiyo maana inasema Zcash lazima izime Orchard, Sapling na Sprout **kabla** mashambulizi ya quantum hayajawezekana.

**Kuzima hakuna tarehe.** Hakuna ratiba za ZIP za kuzima Orchard au Sapling. ZIP 2003, Draft na mgombea wa NU7, ingezima matumizi ya Sprout kwa kukataa miamala ya toleo la 4. Majadiliano ya kutoa pesa Sapling pekee yalianza kwenye jukwaa mnamo Aprili 2026.

**Itifaki ya Urejeshaji haijakamilika.** ZIP 2005 inaielezea tu, na inasema maelezo "yanaweza kubadilika". Hakuna kitu kinachotumika kuihusu.

**Vuna sasa, ondoa msimbo baadaye.** Kumbuka kwamba maandishi ya siri ya Ironwood, Orchard, Sapling na Sprout yote yanapatikana hadharani kwenye mnyororo. Mtu anaweza kuyahifadhi leo na kuondoa msimbo baadaye, ikiwa pia anajua anwani ya kupokea. Kila anwani unayochapisha au kutoa ni sehemu ya hatari hiyo. ZIP 2005 inasema "mabadiliko mengine ya itifaki yanazingatiwa" kwa ajili ya uhamisho wa siku zijazo.

**Fedha za uwazi hazijafunikwa.** Anwani ambazo zimetumika kutoka, au kutumika tena, zimefichua funguo za umma. Urejeshaji wa baadhi ya anwani za uwazi ni wazo tu hadi sasa (ZIP 2007, tazama hapa chini).

**FROST ina tahadhari ya ziada.** Kwa FROST, kila mshiriki anashikilia ufunguo wa matumizi ya quantum (`qsk`), na mshambuliaji wa quantum anayeshikilia anaweza kuiba. ZIP 2005 inapendekeza kuhamisha fedha za FROST hadi itifaki kamili ya baada ya quantum yenye usaidizi wa kizingiti mara tu itakapokuwepo.

<br/>

## Mapendekezo na utafiti

Hakuna hata moja kati ya hizi iliyoonyeshwa moja kwa moja.

- **Itifaki ya Urejeshaji.** Utaratibu ambao ungeruhusu fedha za Ironwood kutumika baada ya kubadili. Imeainishwa katika ZIP 2005, haijabainishwa.
- **ZIP 2007, uwezo wa kurejesha anwani zingine zenye uwazi.** Nambari ya ZIP iliyohifadhiwa pekee yenye majadiliano ndani [zipu#1302](https://github.com/zcash/zips/issues/1302)Wazo ni kwamba matokeo ya P2PKH na P2SH ambayo funguo zake za umma hazijawahi kufichuliwa yanaweza kurejeshwa, kwa dhamana dhaifu kuliko Ironwood.
- **Faragha ya baada ya kiasi kwa anwani zinazojulikana.** Imefunguliwa tangu 2022 mnamo [zipu#1133](https://github.com/zcash/zips/issues/1133), ambayo inabainisha kuwa Zcash "tayari imekusudiwa kuwa ya faragha baada ya kiasi" wakati anwani zinapofichwa na kuuliza jinsi ya kupanua hiyo hadi anwani zinazojulikana, kwa mfano kwa mpango wa ujumuishaji wa ufunguo baada ya kiasi kama Kyber (sasa ML-KEM). Mnamo Juni 2026 [zipu#1307](https://github.com/zcash/zips/issues/1307) ilipendekeza ZIP ili kuorodhesha sifa za sasa za faragha na marekebisho yanayowezekana.
- **Project Tachyon.** Uboreshaji uliopendekezwa wa kuongeza ukubwa. Tovuti yake inasema itapata "faragha kamili ya baada ya kiasi" kama athari ya upande, kwa kuhamisha uwasilishaji wa malipo kutoka kwa mnyororo na kutumia ubadilishanaji wa funguo za baada ya kiasi. Maktaba yake ya data inayobeba uthibitisho, Ragu, inaelezewa kama "bado inajengwa". Tazama [Mradi Tachyon](/zcash-tech/project-tachyon).
- **Zcash.** Uthibitisho wa baada ya kiasi, saini na ahadi pamoja. Imefuatiliwa katika [zipu#1134](https://github.com/zcash/zips/issues/1134), imefunguliwa tangu 2016. Hakuna vipimo au ratiba.

<br/>

## Jedwali la hali

Ilikaguliwa mara ya mwisho tarehe 13 Septemba 2026. Hali ya kichwa ZIP's na hali ya mtandao wake ni vitu tofauti: ZIP 2005 bado inasema "Imependekezwa" kwenye kichwa chake ingawa sheria zake zimetekelezwa kwenye Mainnet tangu Julai 2026.

| Bidhaa | Hali ya ZIP | Hali ya mtandao | Tarehe | Chanzo |
|---|---|---|---|---|
| Bwawa la Ironwood lenye noti zinazoweza kurejeshwa kwa quantum (NU6.3) | Rasimu ZIP 2005 Iliyopendekezwa, ZIP 229 na ZIP 258 | **Imewashwa** kwenye Mainnet | 28 Julai 2026, kitalu 3,428,143 | [ZIP 2005](https://zips.z.cash/zip-2005), [ZIP 258](https://zips.z.cash/zip-0258) |
| Orchard imefungwa kwa thamani mpya | ZIP 2006 Imehifadhiwa, sheria katika ZIP 258 | **Imewashwa** kwenye Mainnet | 28 Julai 2026 | [ZIP 258](https://zips.z.cash/zip-0258) |
| Pochi zinazohamisha fedha kwenda Ironwood | Mwongozo katika ZIP 2005, ZIP 318 na ZIP 326 (Rasimu) | Imependekezwa, inategemea pochi yako | Tangu 28 Julai 2026 | [ZIP 318](https://zips.z.cash/zip-0318), [ZIP 326](https://zips.z.cash/zip-0326) |
| Itifaki ya Urejeshaji | Imeorodheshwa ndani ya ZIP 2005 pekee | **Haijatekelezwa** | Hakuna tarehe | [ZIP 2005](https://zips.z.cash/zip-2005) |
| Kuzima Orchard na Sapling | Hakuna ZIP | **Haijapangwa** | Majadiliano Sapling kuanzia Aprili 2026 | [Jukwaa](https://forum.zcashcommunity.com/t/sapling-withdraw-only-discussion-kickoff/55223) |
| Kuzima matumizi ya Sprout (ZIP 2003) | Mgombea wa rasimu, mgombea NU7 | **Haijawashwa** | Hakuna tarehe | [ZIP 2003](https://zips.z.cash/zip-2003) |
| Uwezekano wa kurejesha data kwa uwazi (ZIP 2007) | Imehifadhiwa | **Pendekezo** | ZIP imehifadhiwa 5 Julai 2025, majadiliano yalifunguliwa 17 Juni 2026 | [zipu#1302](https://github.com/zcash/zips/issues/1302) |
| Faragha ya baada ya kiasi kwa anwani zinazojulikana | Matatizo yamefunguliwa, hakuna ZIP | **Utafiti** | #1133 ilifunguliwa 18 Agosti 2022, #1307 ilifunguliwa 23 Juni 2026 | [zipu#1133](https://github.com/zcash/zips/issues/1133), [zipu#1307](https://github.com/zcash/zips/issues/1307) |
| Mradi Tachyon | Hakuna ZIP | **Pendekezo**, linaendelea kutengenezwa | Ilichapishwa kwa mara ya kwanza Aprili 2025 | [tachyon.z.cash](https://tachyon.z.cash/roadmap/) |
| Itifaki kamili ya baada ya kiasi | Hitilafu imefunguliwa, hakuna ZIP | **Kazi ya siku zijazo** | #1134 ilifunguliwa Machi 28, 2016 | [zipu#1134](https://github.com/zcash/zips/issues/1134) |

Katika kura ya maoni ya NU7 Zcash Foundation's (Februari 2026), urejeshaji wa quantum ulikuwa na usaidizi wa 90.5% kutoka kwa ZCAP na 94.6% kutoka kwa wamiliki wa sarafu, na Tachyon ilikuwa na usaidizi wa karibu wote. Hizo zilikuwa kura za maoni, si maamuzi kuhusu kile kinachoingia katika NU7.

<br/>

## Unachoweza kufanya sasa

- **Hamisha pesa zako hadi Ironwood.** Noti za Sapling na Orchard hazitapatikana tena. Thamani ya kuhamisha kati ya mabwawa inaonyesha kiasi kilichopo kwenye mnyororo, kwa hivyo ZIP 318 ina pochi zinazogawanya salio katika kiasi kisichobadilika na kuzituma baada ya muda. Acha pochi yako ifanye hivyo badala ya kuhamisha kila kitu kwa wakati mmoja.
- **Usichapishe anwani zilizolindwa ambazo huhitaji.** Faragha dhidi ya mshambuliaji wa quantum wa siku zijazo inategemea kutojua anwani yako. Anwani zilizounganishwa ni rahisi kutengeneza, kwa hivyo mpe kila mlipaji anwani mpya. ZIP 229 inapendekeza mzunguko wa anwani kwa sababu hii.
- **Usitumie tena anwani zinazoonekana.** Ukishatumia kutoka kwa moja, ufunguo wake wa umma utakuwa kwenye mnyororo milele.
- **Weka kifungu chako cha mbegu salama.** Katika Itifaki ya Urejeshaji kama ilivyoainishwa, matumizi ya kurejesha yanapaswa kuthibitisha unajua ufunguo wako wa matumizi, na pochi za kawaida hupata ufunguo huo kutoka kwa mbegu.
- **Puuza madai ya "Zcash haidhibitiwi kwa kiasi kikubwa".** Bado haijathibitishwa, na watu wanaoandika vipimo wanasema hivyo.

<br/>

## Kutoelewana kwa kawaida

- **"Ironwood ni baada ya kiasi."** Hapana. Inaendesha usimbaji fiche uleule Orchard, na ZIP 2005 inasema kipengele hicho "hakifanyi itifaki Orchard kuwa salama dhidi ya mashambulizi ya kiasi".
- **"Inayoweza kurejeshwa kwa quantum inamaanisha kuwa salama kutokana na kompyuta za quantum leo."** Hapana. Inamaanisha kuwa fedha za Ironwood zinaweza kurejeshwa baada ya kubadili baadaye, mradi tu kubadili huko kutatokea kwa wakati.
- **" Zcash iliyolindwa tayari ni ya faragha baada ya kiasi."** Ni wakati tu mshambuliaji hajui anwani yako. Anwani zinazojulikana hufichuliwa katika kila kundi la watu.
- **"Tachyon tayari imeongeza faragha baada ya kiasi."** Tachyon ni pendekezo. Hakuna chochote kutoka kwake kilicho hai.
- **"Kompyuta za Quantum huvunja kila sehemu ya Zcash."** Vitendaji vya Hash hudhoofishwa tu, si kuvunjwa, na mashambulizi ya quantum yanayojulikana. Urejeshaji wa quantum hutegemea tofauti hiyo haswa.

<br/>

## Kurasa zinazohusiana

- [Usalama wa Baada ya Quantum huko Zcash](/zcash-tech/post-quantum-security)
- [Ironwood](/zcash-tech/ironwood)
- [Turnstile](/zcash-tech/the-turnstile)
- [Mradi Tachyon](/zcash-tech/project-tachyon)
- [FROST](/zcash-tech/frost)
- [Mabwawa ya Kuogelea Yenye Ngao](/using-zcash/shielded-pools)

<br/>

## Vyanzo

- [ZIP 2005: Urejeshaji wa Quantum Ironwood](https://zips.z.cash/zip-2005)
- [ZIP 229: Umbizo la Muamala la Toleo la 6](https://zips.z.cash/zip-0229)
- [ZIP 258: Utekelezaji wa Uboreshaji wa Mtandao NU6.3](https://zips.z.cash/zip-0258)
- [ZIP 318: Uhamiaji wa Orchard hadi Ironwood](https://zips.z.cash/zip-0318)
- [ZIP 326: Matokeo ya NU6.3 kwa Pochi](https://zips.z.cash/zip-0326)
- [ZIP 2003: Usiruhusu miamala ya toleo la 4](https://zips.z.cash/zip-2003)
- [ZIP 209: Kataza Mizani Hasi ya Thamani ya Mnyororo Uliolindwa](https://zips.z.cash/zip-0209)
- [zips#1302: Uwezo wa kurejesha kwa kiasi cha sehemu ndogo ya itifaki ya uwazi](https://github.com/zcash/zips/issues/1302)
- [zips#1133: Faragha ya baada ya kiasi kwa Zcash](https://github.com/zcash/zips/issues/1133)
- [zips#1307: Faragha ya Zcash dhidi ya wapinzani wa quantum na diski-mbalimbali](https://github.com/zcash/zips/issues/1307)
- [zip#1134: Zcash kamili baada ya kiasi](https://github.com/zcash/zips/issues/1134)
- [Ramani ya Mradi Tachyon](https://tachyon.z.cash/roadmap/)
- [Matokeo ya Kura ya NU7: Tulichosikia na Tunaelekea Wapi Kutoka Hapa](https://forum.zcashcommunity.com/t/nu7-polling-results-what-we-heard-and-where-we-go-from-here/54775)
- [Kitalu 3,428,143 kwenye Blockchair](https://blockchair.com/zcash/block/3428143)
- [Ombi la jukwaa: Je Zcash ni baada ya kiasi?](https://forum.zcashcommunity.com/t/is-zcash-post-quantum-help-wanted-d-proposal/57154)
