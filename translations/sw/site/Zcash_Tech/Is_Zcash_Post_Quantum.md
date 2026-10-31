<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Is_Zcash_Post_Quantum.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Je, Zcash Ina Ustahimilivu Dhidi ya Kompyuta za Quantum?

## Jibu fupi

Hapana, bado.

Tangu uboreshaji wa Ironwood, Zcash **inaweza kurejeshwa baada ya quantum** kwa fedha zinazoshikiliwa katika bwawa la Ironwood. Hii ni hatua halisi, lakini si sawa na kuwa salama dhidi ya quantum. ZIP 2005, maelezo maalumu yaliyo nyuma yake, yanasema hivyo moja kwa moja: mabadiliko hayo “hayafanyi yenyewe itifaki kuwa salama dhidi ya wapinzani wa quantum”. Yanatayarisha fedha za Ironwood ili ziweze kuhamishwa kupitia Itifaki ya Urejeshaji ya baadaye mara kriptografia ya sasa itakapozimwa.

Ukurasa huu unatenganisha kile ambacho Zcash inalinda leo, kile ambacho Ironwood ilibadilisha, kile ambacho bado kiko wazi kwa hatari, na kile ambacho ni pendekezo pekee. Jedwali la hali la [](#status-table) karibu na mwisho linaonyesha mahali kila sehemu ilipo na wakati hilo lilipokaguliwa mara ya mwisho.

<br/>

## Ukurasa huu ni wa nani

- Mtu yeyote aliyeona “inaweza kurejeshwa baada ya quantum” na kuisoma kama “kinga dhidi ya quantum”
- Wamiliki wanaoamua kama wahamishe fedha hadi Ironwood
- Waandishi na wasimamizi wanaohitaji jibu lenye vyanzo la kuwaelekeza watu

Kwa maelezo ya msingi kuhusu kompyuta za quantum zenyewe, anza na [Usalama wa Baada ya Quantum katika Zcash](/zcash-tech/post-quantum-security).

<br/>

## Kwa nini swali hili linachanganya

“Baada ya quantum” hutumiwa kana kwamba ni sifa moja. Kwa Zcash kuna angalau maswali manne tofauti, nayo yana majibu tofauti:

1. **Faragha [Privacy].** Je, mshambulizi wa quantum anaweza kuona nani alimlipa nani na kiasi gani?
2. **Matumizi ya pesa [Spending].** Je, mshambulizi wa quantum anaweza kutumia sarafu ambazo si zake?
3. **Mfumuko wa kiasi cha sarafu [Inflation].** Je, mshambulizi wa quantum anaweza kuunda ZEC kutoka pasipo kitu?
4. **Urejeshaji [Recovery].** Ikiwa kriptografia ya sasa inapaswa kuzimwa, je, watumiaji waaminifu bado wanaweza kutoa fedha zao?

Ironwood hubadilisha tu jibu la swali la nne, na hilo kwa madokezo katika bwawa la Ironwood pekee.

Tishio lililo nyuma ya yote haya ni mshambulizi anayeweza kukokotoa logaritimu bainifu kwenye mikunjo ya duaradufu inayotumiwa na Zcash. Kompyuta ya quantum yenye uwezo wa kutosha inayotumia algoriti ya Shor inaweza kuwa njia moja ya kufanya hivyo. ZIP 2005 inaeleza kwamba kupata logaritimu bainifu **moja** kunatosha kusababisha mfumuko wa kiasi cha sarafu usio na kikomo au kuiba fedha.

<br/>

## Kile ambacho Zcash inalinda leo

Jedwali hili linaelezea itifaki inavyofanya kazi sasa, dhidi ya mshambulizi anayeweza kuvunja logaritimu bainifu. Linatumika kwa kila bwawa la faragha, ikiwemo Ironwood, kwa sababu Ironwood hutumia saketi ileile ya Orchard, mathibitisho ya Halo 2 na sahihi za RedPallas kama Orchard.

| Sifa | Dhidi ya mshambulizi wa quantum leo | Kile ambacho Ironwood ilibadilisha |
|---|---|---|
| Faragha | Hudumishwa ikiwa mshambulizi hajui anwani yako ya faragha. Mathibitisho na sahihi zilizofanywa kuwa nasibu upya hazifichui jambo la ziada. Ikiwa mshambulizi anaijua anwani, anaweza kufumbua madokezo yaliyotumwa humo, yakiwemo ya zamani yaliyohifadhiwa kutoka kwenye mnyororo. | Hakuna. ZIP 2005: “Hali kuhusu Faragha haijabadilika kwa bwawa lolote.” |
| Matumizi ya pesa | Hayajalindwa. Mshambulizi anaweza kughushi mathibitisho au sahihi za matumizi ya pesa na kuiba kutoka bwawa lolote la faragha, hata kwa anwani ambazo hajawahi kuziona. | Hakuna bado. Ulinzi unakuja tu baada ya mabadiliko ya baadaye kwenda Itifaki ya Urejeshaji. |
| Mfumuko wa kiasi cha sarafu | Haujakingwa. Mshambulizi anaweza kughushi thibitisho linaloonekana halali na kuunda ZEC ndani ya bwawa lolote la faragha, huenda bila mtu yeyote kutambua. Kikomo pekee ni [turnstile](/zcash-tech/the-turnstile): hakuna bwawa linaloweza kulipa zaidi ya salio lake lililorekodiwa. | Hakuna bado. Madokezo ya Ironwood sasa yana commitment kwa maudhui yake yote kwa namna ambayo mshambulizi wa quantum hapaswi kuweza kughushi, jambo ambalo Itifaki ya Urejeshaji ya baadaye inahitaji ili kuweka kiasi cha sarafu salama. |
| Urejeshaji | Madokezo ya Sprout, Sapling na Orchard hayana njia ya kurejeshwa. Itifaki zake zikizimwa, chochote kilichobaki ndani yake hakitafikika. | Kila dokezo la Ironwood linaweza kurejeshwa kimsingi. Hakuna dokezo la Sapling au Orchard linaloweza kurejeshwa. |

ZEC ya uwazi ni hali tofauti. Sahihi zake za ECDSA zinaweza kughushiwa mara ufunguo wa umma unapojulikana. Kwa anwani ya kawaida ya uwazi, hilo hutokea mara ya kwanza unapofanya matumizi kutoka kwayo, na pia kuna muda mfupi wakati muamala haujathibitishwa kwenye mempool. ZIP 2005 haibadilishi lolote kati ya hayo.

<br/>

## Kile ambacho Ironwood ilibadilisha

Ironwood ni uboreshaji wa mtandao wa NU6.3. Ilianzishwa kwenye Mainnet katika block 3,428,143 tarehe 28 Julai 2026. Kusudi lake kuu lilikuwa uadilifu wa kiasi cha sarafu baada ya hitilafu ya uthabiti ya Orchard (tazama ukurasa wa [Ironwood](/zcash-tech/ironwood)), na uwezo wa kurejeshwa baada ya quantum kutoka ZIP 2005 ulitolewa kama sehemu yake.

- **Muundo mpya wa dokezo.** Kila dokezo la pato la Ironwood hutumia muundo unaoweza kurejeshwa baada ya quantum (baiti inayoongoza ya maandishi wazi ya dokezo `0x03`). Unasibu wa dokezo sasa unatokana na sehemu zake zote, hivyo dokezo limefungwa kwa maudhui yake kwa hash badala ya hisabati ya mikunjo ya duaradufu pekee.
- **Njia ya kurejesha madokezo ya Ironwood pekee.** ZIP 326 inaeleza wazi kwamba kila dokezo la Ironwood linaweza kurejeshwa na hakuna dokezo la Orchard linaloweza kurejeshwa. Mpangilio wa pochi haubadilishi hilo.
- **Orchard ilisimamisha kupokea thamani mpya.** Zawadi za Coinbase haziwezi tena kwenda kwa Orchard, na Orchard haiwezi tena kutuma kwa anwani tofauti ya Orchard, hivyo thamani mpya ya faragha huingia katika Ironwood.
- **Pochi zinaelekezwa kuhamisha kila kitu.** ZIP 2005 inasema pochi ZINAPASWA kuhamisha fedha zote zinazodhibitiwa, zikiwemo fedha za uwazi, za Sprout na za Sapling, hadi madokezo ya Ironwood haraka iwezekanavyo, na kuendelea kufanya hivyo fedha mpya zinapowasili.

Kile ambacho Ironwood haikubadilisha: kriptografia inayotumika kwa matumizi na uthibitishaji leo, usimbaji fiche wa dokezo, na jambo lolote kuhusu ZEC ya uwazi.

<br/>

## Vikwazo vinavyobaki

**Kuna kipindi cha uwezekano wa hatari.** Kuanzia uanzishaji wa Ironwood hadi itifaki za zamani zizimwe, mshambulizi wa quantum bado anaweza kuiba, kuongeza kiasi cha sarafu au kuzuia fedha katika kila bwawa la faragha. ZIP 2005 hukiita hiki “kipindi muhimu cha uwezekano wa hatari” na kuonya kwamba shambulio ndani yake bado linaweza kudhuru uwezo wa mmiliki wa kurejesha baadaye. Ndiyo maana inasema Zcash lazima izime Orchard, Sapling na Sprout **kabla** mashambulio ya quantum hayajawa yanatekelezeka.

**Kuzimwa hakuna tarehe, isipokuwa kwa Sprout.** Hakuna ZIP inayopanga kuzima Orchard au Sapling. Sprout ni tofauti: [ZIP 259](https://zips.z.cash/zip-0259) inaorodhesha ZIP 2003 miongoni mwa mabadiliko ambayo NU7 hutekeleza, hivyo miamala ya toleo la 4 itakuwa batili NU7 itakapoanzishwa na ZEC yoyote iliyoachwa katika bwawa la Sprout itakuwa haiwezi kutumika. Uanzishaji wa Mainnet umewekwa kwenye block 3,543,405, unaolengwa tarehe 5 Novemba 2026 ([ZIP 259](https://zips.z.cash/zip-0259), [tangazo la jukwaa](https://forum.zcashcommunity.com/t/nu7-timeline/57655)). Majadiliano ya Sapling ya kutoa pekee yalianza kwenye jukwaa mnamo Aprili 2026.

**Itifaki ya Urejeshaji haijakamilika.** ZIP 2005 inaielezea kwa muhtasari pekee, na inasema maelezo “yanaweza kubadilika”. Hakuna sehemu yake iliyotekelezwa.

**Vuna sasa, fumua usimbaji fiche baadaye.** Maandishi fiche ya madokezo ya Ironwood, Orchard, Sapling na Sprout yote yako wazi kwenye mnyororo. Mtu anaweza kuyahifadhi leo na kuyafumbua baadaye, ikiwa pia anajua anwani inayopokea. Kila anwani unayochapisha au kutoa ni sehemu ya hatari hiyo. ZIP 2005 inasema “mabadiliko mengine ya itifaki yanazingatiwa” kwa uhamishaji wa baadaye.

**Fedha za uwazi hazijahusishwa.** Anwani ambazo zimetumika kufanya malipo, au zimetumika tena, zimefichua funguo za umma. Uwezo wa kurejesha kwa baadhi ya anwani za uwazi ni wazo tu hadi sasa (ZIP 2007, tazama hapa chini).

**Mipangilio ya FROST ina tahadhari ya ziada.** Kwa FROST, kila mshiriki ana ufunguo wa kutumia pesa wa quantum (`qsk`), na mshambulizi wa quantum anayeushikilia anaweza kuweza kuiba. ZIP 2005 inapendekeza kuhamisha fedha za FROST hadi itifaki kamili ya baada ya quantum yenye usaidizi wa kiwango cha juu mara itakapopatikana.

<br/>

## Mapendekezo na utafiti

Hakuna hata kimoja kati ya hivi kinachotumika moja kwa moja.

- **Itifaki ya Urejeshaji.** Utaratibu ambao ungewezesha fedha za Ironwood kutumika baada ya mabadiliko. Umeelezewa kwa muhtasari katika ZIP 2005, haujabainishwa.
- **ZIP 2007, uwezo wa kurejesha kwa baadhi ya anwani za uwazi.** Ni nambari ya ZIP iliyohifadhiwa pekee yenye majadiliano katika [zips#1302](https://github.com/zcash/zips/issues/1302). Wazo ni kwamba matokeo ya P2PKH na P2SH ambayo funguo zake za umma hazijawahi kufichuliwa yanaweza kurejeshwa, kwa dhamana dhaifu kuliko Ironwood.
- **Faragha ya baada ya quantum kwa anwani zinazojulikana.** Iko wazi tangu 2022 katika [zips#1133](https://github.com/zcash/zips/issues/1133), ambayo inaeleza kwamba Zcash “tayari imekusudiwa kuwa na faragha ya baada ya quantum” anwani zinapowekwa siri na kuuliza jinsi ya kupanua hilo hadi anwani zinazojulikana, kwa mfano kwa mpango wa encapsulation wa ufunguo wa baada ya quantum kama Kyber (sasa ML-KEM). Mnamo Juni 2026 [zips#1307](https://github.com/zcash/zips/issues/1307) ilipendekeza ZIP ili kuandika sifa za sasa za faragha na marekebisho yanayowezekana.
- **Mradi wa Tachyon.** Uboreshaji uliopendekezwa wa kupanua uwezo. Tovuti yake inasema ungepata “faragha kamili ya baada ya quantum” kama athari ya pembeni, kwa kuhamisha utoaji wa malipo nje ya mnyororo na kutumia ubadilishanaji wa ufunguo wa baada ya quantum. Maktaba yake ya data yenye thibitisho, Ragu, inaelezewa kuwa “bado inajengwa”. Tazama [Mradi wa Tachyon](/zcash-tech/project-tachyon).
- **Zcash kamili ya baada ya quantum.** Mathibitisho, sahihi na commitment za baada ya quantum kwa pamoja. Hufuatiliwa katika [zips#1134](https://github.com/zcash/zips/issues/1134), iko wazi tangu 2016. Hakuna maelezo maalumu wala ratiba.

<br/>

## Jedwali la hali

Ilikaguliwa mara ya mwisho tarehe 13 Septemba 2026, isipokuwa mstari wa Sprout, uliosasishwa tarehe 9 Oktoba 2026. Hali ya kichwa cha ZIP na hali yake ya mtandao ni vitu tofauti: ZIP 2005 bado inasema “Imependekezwa” kwenye kichwa chake ingawa kanuni zake zimetekelezwa kwenye Mainnet tangu Julai 2026.

| Kipengee | Hali ya ZIP | Hali ya mtandao | Tarehe | Chanzo |
|---|---|---|---|---|
| Bwawa la Ironwood lenye madokezo yanayoweza kurejeshwa baada ya quantum (NU6.3) | ZIP 2005 Imependekezwa, ZIP 229 na ZIP 258 Rasimu | **Imeanzishwa** kwenye Mainnet | 28 Jul 2026, block 3,428,143 | [ZIP 2005](https://zips.z.cash/zip-2005), [ZIP 258](https://zips.z.cash/zip-0258) |
| Orchard imefungwa kwa thamani mpya | ZIP 2006 Imehifadhiwa, kanuni katika ZIP 258 | **Imeanzishwa** kwenye Mainnet | 28 Jul 2026 | [ZIP 258](https://zips.z.cash/zip-0258) |
| Pochi zinazohamisha fedha hadi Ironwood | Mwongozo katika ZIP 2005, ZIP 318 na ZIP 326 (Rasimu) | Inapendekezwa, hutegemea pochi yako | Tangu 28 Jul 2026 | [ZIP 318](https://zips.z.cash/zip-0318), [ZIP 326](https://zips.z.cash/zip-0326) |
| Itifaki ya Urejeshaji | Imeelezewa kwa muhtasari ndani ya ZIP 2005 pekee | **Haijatekelezwa** | Hakuna tarehe | [ZIP 2005](https://zips.z.cash/zip-2005) |
| Kuzimwa kwa Orchard na Sapling | Hakuna ZIP | **Hakujaratibiwa** | Majadiliano ya Sapling kutoka Apr 2026 | [Jukwaa](https://forum.zcashcommunity.com/t/sapling-withdraw-only-discussion-kickoff/55223) |
| Kuzuia matumizi ya Sprout (ZIP 2003) | Imependekezwa, inatekelezwa na NU7 kulingana na ZIP 259 (Imependekezwa) | **Haijaanzishwa** | Urefu wa Mainnet 3,543,405, unaolengwa 5 Nov 2026 | [ZIP 2003](https://zips.z.cash/zip-2003), [ZIP 259](https://zips.z.cash/zip-0259) |
| Uwezo wa kurejesha wa uwazi (ZIP 2007) | Imehifadhiwa | **Pendekezo** | ZIP ilihifadhiwa 5 Jul 2025, majadiliano yalifunguliwa 17 Jun 2026 | [zips#1302](https://github.com/zcash/zips/issues/1302) |
| Faragha ya baada ya quantum kwa anwani zinazojulikana | Masuala yaliyo wazi, hakuna ZIP | **Utafiti** | #1133 ilifunguliwa 18 Ago 2022, #1307 ilifunguliwa 23 Jun 2026 | [zips#1133](https://github.com/zcash/zips/issues/1133), [zips#1307](https://github.com/zcash/zips/issues/1307) |
| Mradi wa Tachyon | Hakuna ZIP | **Pendekezo**, linaendelezwa | Ilichapishwa kwanza Apr 2025 | [tachyon.z.cash](https://tachyon.z.cash/roadmap/) |
| Itifaki kamili ya baada ya quantum | Suala lililo wazi, hakuna ZIP | **Kazi ya baadaye** | #1134 ilifunguliwa 28 Mar 2016 | [zips#1134](https://github.com/zcash/zips/issues/1134) |

Katika kura za maoni ya Zcash Foundation kuhusu NU7 (Februari 2026), uwezo wa kurejeshwa baada ya quantum ulikuwa na uungwaji mkono wa 90.5% kutoka ZCAP na 94.6% kutoka kwa wamiliki wa sarafu, na Tachyon ulikuwa na uungwaji mkono wa karibu wote. Hizo zilikuwa kura za maoni, si maamuzi kuhusu kile kinachoingia katika NU7.

<br/>

## Unachoweza kufanya sasa

- **Hamisha fedha zako hadi Ironwood.** Madokezo ya Sapling na Orchard hayatawahi kurejeshwa. Kuhamisha thamani kati ya mabwawa huonyesha kiasi on-chain, hivyo ZIP 318 hufanya pochi zigawanye salio katika kiasi maalumu na kuzituma kwa muda. Ruhusu pochi yako ifanye hivyo badala ya kuhamisha kila kitu mara moja.
- **Usichapishe anwani za faragha usizohitaji.** Faragha dhidi ya mshambulizi wa quantum wa baadaye hutegemea kutokujua anwani yako. Anwani zilizounganishwa ni nafuu kutengeneza, hivyo mpe kila mlipaji anwani mpya. ZIP 229 inapendekeza mzunguko wa anwani kwa sababu hii.
- **Usitumie tena anwani za uwazi.** Mara unapofanya matumizi kutoka kwa moja, ufunguo wake wa umma uko kwenye mnyororo milele.
- **Weka maneno yako ya kurejesha pochi salama.** Katika Itifaki ya Urejeshaji kama ilivyoelezewa, matumizi ya urejeshaji lazima yathibitishe kwamba unajua ufunguo wako wa kutumia pesa, na pochi za kawaida hupata ufunguo huo kutoka kwenye maneno ya kurejesha pochi.
- **Puuza madai kwamba “Zcash ina kinga dhidi ya quantum”.** Bado haina, na watu wanaoandika maelezo maalumu wanasema hivyo.

<br/>

## Kutoelewana kwa kawaida

- **“Ironwood ni ya baada ya quantum.”** Hapana. Inatumia kriptografia ileile ya Orchard, na ZIP 2005 inasema kipengele hicho “hakifanyi itifaki ya Orchard kuwa salama dhidi ya mashambulio ya quantum”.
- **“Inaweza kurejeshwa baada ya quantum inamaanisha kuwa salama dhidi ya kompyuta za quantum leo.”** Hapana. Inamaanisha kwamba fedha za Ironwood zinaweza kurejeshwa baada ya mabadiliko ya baadaye, mradi mabadiliko hayo yafanyike kwa wakati.
- **“Zcash ya faragha tayari ina faragha ya baada ya quantum.”** Hilo ni kweli tu wakati mshambulizi hajui anwani yako. Anwani zinazojulikana ziko wazi katika kila bwawa.
- **“Tachyon tayari imeongeza faragha ya baada ya quantum.”** Tachyon ni pendekezo. Hakuna kitu kutoka humo kinachotumika moja kwa moja.
- **“Kompyuta za quantum huvunja kila sehemu ya Zcash.”** Vitendaji vya hash hudhoofishwa tu, si kuvunjwa, na mashambulio ya quantum yanayojulikana. Uwezo wa kurejeshwa baada ya quantum hutegemea hasa tofauti hiyo.

<br/>

## Kurasa zinazohusiana

- [Usalama wa Baada ya Quantum katika Zcash](/zcash-tech/post-quantum-security)
- [Ironwood](/zcash-tech/ironwood)
- [Turnstile](/zcash-tech/the-turnstile)
- [Mradi wa Tachyon](/zcash-tech/project-tachyon)
- [FROST](/zcash-tech/frost)
- [Mabwawa ya Faragha](/using-zcash/shielded-pools)

<br/>

## Vyanzo

- [ZIP 2005: Ironwood Uwezo wa Kurejeshwa Baada ya Quantum](https://zips.z.cash/zip-2005)
- [ZIP 229: Muundo wa Muamala wa Toleo la 6](https://zips.z.cash/zip-0229)
- [ZIP 258: Utekelezaji wa Uboreshaji wa Mtandao wa NU6.3](https://zips.z.cash/zip-0258)
- [ZIP 318: Uhamishaji kutoka Orchard hadi Ironwood](https://zips.z.cash/zip-0318)
- [ZIP 326: Madhara ya NU6.3 kwa Pochi](https://zips.z.cash/zip-0326)
- [ZIP 2003: Zuia miamala ya toleo la 4](https://zips.z.cash/zip-2003)
- [ZIP 209: Kataza Salio Hasi za Bwawa la Thamani ya Mnyororo wa Faragha](https://zips.z.cash/zip-0209)
- [zips#1302: Uwezo wa kurejeshwa kwa quantum wa sehemu ndogo ya itifaki ya uwazi](https://github.com/zcash/zips/issues/1302)
- [zips#1133: Faragha ya baada ya quantum kwa Zcash](https://github.com/zcash/zips/issues/1133)
- [zips#1307: Faragha ya Zcash dhidi ya wapinzani wa quantum na wanaovunja logaritimu bainifu](https://github.com/zcash/zips/issues/1307)
- [zips#1134: Zcash kamili ya baada ya quantum](https://github.com/zcash/zips/issues/1134)
- [Ramani ya maendeleo ya Mradi wa Tachyon](https://tachyon.z.cash/roadmap/)
- [NU7 Matokeo ya Kura za Maoni: Tulichosikia na Tunakoelekea Kuanzia Hapa](https://forum.zcashcommunity.com/t/nu7-polling-results-what-we-heard-and-where-we-go-from-here/54775)
- [Block 3,428,143 kwenye ZecBlock](https://zecblock.com/block/3428143)
- [Ombi la jukwaa: Je, Zcash ni ya baada ya quantum?](https://forum.zcashcommunity.com/t/is-zcash-post-quantum-help-wanted-d-proposal/57154)
