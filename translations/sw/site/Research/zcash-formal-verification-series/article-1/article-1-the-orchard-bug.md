![alt text](image-1.png)
# Hitilafu ya Orchard: Wakati Mfumo wa Uthibitisho Una Pengo

### Jinsi mstari mmoja wa hesabu wenye vikwazo visivyotosha ungeweza kutengeneza pesa za siri zisizo na kikomo

> **Mfululizo:** *Mfululizo wa Uthibitishaji Rasmi [Formal Verification]* · **Sehemu ya 2 kati ya 3**
> **Hadhira:** wanaoanza. Sehemu ya 1 ilitambulisha uthibitishaji rasmi; hapa tunakutana na hitilafu halisi iliyoifanya kuwa ya dharura. Kila kinachohitajika kinafafanuliwa kuanzia mwanzo.
> **Utakachobaki nacho:** picha ya kiintuisia lakini sahihi ya jinsi mfumo wa uthibitisho wa kriptografia unaweza kuwa na pengo la usahihi, hitilafu ya “Orchard” ya Zcash ya mwaka 2026 ilikuwa nini hasa, kwa nini aina hii ya hitilafu inaweza kujificha kwa miaka mingi, na kwa nini imeshawahi kutokea hapo awali.

Katika Sehemu ya 1 tulisema kuwa majaribio yanaweza kuonyesha uwepo wa hitilafu lakini kamwe si kutokuwepo kwake, na kwamba hitilafu hatari zaidi huishi katika *ubainifu [specification]* wa mfumo, yaani hesabu yake ya msingi. Makala hii ni uchunguzi wa kisa. Mwaka 2026, dosari ilipatikana katika bwawa la faragha la Orchard la Zcash ambayo ingeweza kumruhusu mshambulizi kutengeneza pesa ghushi zisizo na kikomo bila kuonekana. Ilikuwa imenusurika miaka minne na ukaguzi wa mara kwa mara. Kuielewa, pamoja na zilizotangulia, ndiyo motisha iliyo wazi zaidi ya kuthibitisha usahihi wa mifumo.

---

## 1. Kwa nini unapaswa kujali?

Zcash ni sarafu-fiche yenye hali ya faragha. Katika bwawa lake la faragha, kiasi, watumaji, na wapokeaji wa miamala **hufichwa**. Faragha hii huundwa kwa kutumia **mathibitisho ya maarifa sifuri [zero-knowledge proofs]**: mathibitisho ya kriptografia kwamba muamala unafuata sheria zote, bila kufichua maudhui ya muamala.

Muundo huo una pande mbili. Kwenye leja ya uwazi kama ya Bitcoin, ikiwa mtu angetengeneza sarafu kutoka pasipo kitu, idadi zilizoongezwa zingeonekana kwa kila mtu, na mtandao ungeweza kuitambua na kuirejesha nyuma. Katika bwawa la faragha, idadi hufichwa kwa makusudi. Kwa hiyo, ikiwa mfumo wa uthibitisho wenyewe ungekuwa na dosari inayoruhusu muamala batili kuonekana kuwa halali, ughushi huo ungekuwa **usioonekana**. Usingeweza kuutambua kwa kukagua leja, kwa sababu leja imefanywa isiwe wazi kimakusudi.

Hiyo ndiyo hasa hatari iliyotokea katika Orchard. Ili kuielewa, tunahitaji kuangalia ndani ya kile ambacho thibitisho la maarifa sifuri hukagua hasa.

---

## 2. Intuisia: thibitisho ni zuri kadiri ya orodha yake ya ukaguzi

Muwazie afisa wa mpakani anayepaswa kuidhinisha wasafiri bila kuona nyaraka zao moja kwa moja. Badala yake, kila msafiri hujaza **orodha ya ukaguzi**, na afisa humuidhinisha yeyote ambaye orodha yake imewekewa alama zote. Orodha hiyo imeundwa ili *msafiri halali pekee aweze kuweka alama katika kila kisanduku.*

Sasa fikiria orodha hiyo haina kisanduku kimoja muhimu, kwa mfano, “pasipoti haijaisha muda.” Karibu kila mtu bado huijaza kwa uaminifu na hakuna kinachoonekana kuwa kibaya. Lakini mtu mwenye pasipoti iliyoisha muda anaweza *pia* kuweka alama katika kila kisanduku kilichobaki na kupita kwa urahisi. Mfumo huonekana mzuri katika matumizi ya kila siku. Pengo hilo lina umuhimu kwa mtu anayelitafuta tu.

Thibitisho la maarifa sifuri hufanya kazi kama orodha hiyo ya ukaguzi. Halifichui maelezo ya faragha; hukagua kwamba yanatimiza seti maalumu ya masharti. Na sharti moja la lazima likiachwa kwa bahati mbaya, basi baadhi ya ingizo batili yanaweza *pia* kupita, huku kila kitu kikiendelea kuonekana kawaida.

Hebu tufanye “orodha ya masharti ya ukaguzi” iwe sahihi, kwa sababu hapo ndipo hitilafu ilipoishi hasa.

---

## 3. Hesabu: saketi, vikwazo, na usahihi

Ndani kabisa, kauli “muamala huu ni halali” husimbwa kama **saketi [circuit]**: mkusanyiko maalumu wa masharti ya kihesabu, yanayoitwa **vikwazo [constraints]**, yaliyoandikwa kama milinganyo juu ya nambari. Ili kutengeneza thibitisho halali, mthibitishaji lazima atoe thamani za siri (**shahidi [witness]**) zinazotimiza *kila* kizuizi. Thibitisho humshawishi mthibitishaji kwamba shahidi wa aina hiyo yupo, bila kumfichua.

Sifa tunayohitaji kutoka kwa mfumo huu ina jina:

> **Usahihi [Soundness]:** lazima isiwezekane kutengeneza thibitisho halali kwa kauli *ya uongo*. Kauli za kweli pekee zinapaswa kuwa na mashahidi wanaotimiza vikwazo vyote.

Usahihi ndiyo dhamana dhidi ya ughushi. Ikiwa usahihi upo, thibitisho halali humaanisha kwa kweli kwamba muamala halisi unaofuata sheria ulitokea. Ikiwa usahihi una pengo, thibitisho halali linaweza lisimaanishe chochote kabisa.

### Kile ambacho kizuizi kinachokosekana hufanya (mfano uliothibitishwa)

Vikwazo mara nyingi huhitaji kulazimisha thamani iwe rahisi. Mfano wa kawaida ni kulazimisha thamani `b` iwe **biti [bit]** moja, ama `0` au `1`. Njia ya kawaida ya kufanya hivi ni kizuizi kimoja:

```
b × (b − 1) = 0
```

Kwa nini hufanya kazi? Zao huwa sifuri tu wakati mojawapo ya vipengele vyake ni sifuri. Kwa hiyo `b × (b − 1) = 0` hulazimisha `b = 0` au `b = 1`, na hakuna kingine. Tukikagua kila thamani kuanzia 0 hadi 16 (katika hesabu inayozunguka tena inapofika 17), thamani *pekee* zinazokitimizia ni **0 na 1**. ✓

Sasa fikiria mstari huo **umeachwa kwa bahati mbaya** kwenye saketi. Ghafla `b` haina kizuizi. Mthibitishaji asiye mwaminifu anaweza kuweka `b` kuwa `5`, au `9`, au chochote kile, na bado atimize vikwazo vilivyosalia. Mstari huo mmoja unaokosekana ni **pengo la usahihi [soundness gap]**: kauli za uongo sasa zina mashahidi wanaotimiza masharti.

Hili si jambo la kinadharia. Kizuizi cha boolean kinachokosekana cha aina hii hasa kilipatikana katika muundo wa kwanza kabisa wa faragha wa Zcash, Sprout, wakati wa uundaji, na kurekebishwa kabla ya uzinduzi. Kuweka vikwazo visivyotosha ni mojawapo ya makosa ya kawaida na hatari zaidi katika kujenga saketi hizi.

![alt text](image-2.png)

Huu ndio umbo lote la hitilafu ya Orchard, kwa kiwango kidogo. Sasa jambo halisi.

---

## 4. Hitilafu ya Orchard ilikuwa nini hasa

Mathibitisho ya faragha ya Zcash yamejengwa juu ya **mikondo ya eliptiki [elliptic curves]**, vitu vya kihesabu ambavyo nukta zake zinaweza kuunganishwa na “kuzidishwa” kwa nambari, operesheni ambazo saketi lazima izitekeleze kwa vikwazo. Saketi ina vifaa vinavyotekeleza **uzidishaji wa mkondo wa eliptiki [elliptic-curve multiplication]** na kukagua kwamba umefanywa kwa usahihi.

Kulingana na ufichuzi wa Shielded Labs na mtafiti Taylor Hornby, dosari ya Orchard ilikuwa hii hasa:

> **Kipengele chenye vikwazo visivyotosha cha saketi ya Orchard** kiliwezesha kuingiza **ingizo la uongo la kiholela katika uzidishaji wa mkondo wa eliptiki na bado kufanya ukaguzi wa uzidishaji upite.**

Kwa maneno rahisi, orodha ya ukaguzi ya saketi haikuwa na visanduku vilivyopaswa kuufunga uzidishaji huo. Kwa sababu ya pengo hilo, mshambulizi mwenye utaalamu wa kutosha angeweza kutengeneza thibitisho la muamala ambalo mfumo ungekubali hata ingawa muamala huo ulitengeneza thamani kutoka pasipo kitu. Huu ni **ughushi**, na kwa sababu kiasi katika bwawa la faragha hufichwa, usingeweza **kugunduliwa** kutoka kwenye leja. Timu ya Tachyon baadaye ilielezea dosari hiyohiyo katika kiwango cha msimbo kama mistari inayokosekana kwenye saketi ambayo ilichanganya kimya kimya milinganyo ya msingi.

Ulinganifu na simulizi letu la orodha ya ukaguzi ni sahihi kabisa:

| Simulizi la orodha ya ukaguzi | Hitilafu ya Orchard |
|---|---|
| Kisanduku kinachokosekana cha “pasipoti haijaisha muda” | Kizuizi kinachokosekana katika uzidishaji wa mkondo wa eliptiki |
| Msafiri mwenye pasipoti iliyoisha muda hupita hata hivyo | Ingizo la uongo la kiholela hupita ukaguzi wa uzidishaji |
| Wengine wote hawaathiriki, kwa hiyo hakuna kinachoonekana kuwa kibaya | Miamala ya kawaida ilifanya kazi kikamilifu, ikificha dosari |
| Mtu anayeitafuta pekee hupata nafasi hiyo | Ilichukua mtaalamu kuchunguza kimakusudi hesabu ya saketi |

Ili kuweka wazi jinsi hili lilivyokuwa zito: mtafiti, kwa msaada wa AI, aliandika *tumiaji kamili wa shambulio unaofanya kazi* na kuthibitisha katika mtandao wa majaribio wa ndani kwamba ulitengeneza sarafu ghushi zisizo na kikomo na zisizoweza kugunduliwa. Hii ilikuwa dosari halisi inayoweza kutumiwa, si wasiwasi wa kinadharia.

---

## 5. Kwa nini ilijificha kwa miaka minne

Hitilafu hiyo iliishi katika Orchard tangu ilipoanzishwa mnamo **Mei 2022** hadi marekebisho ya dharura mnamo **Juni 2026**, ikipitia ukaguzi wa kitaalamu wa mara kwa mara uliofanywa na baadhi ya wataalamu bora zaidi wa kriptografia duniani. Vipi?

Kwa sababu, kama Sehemu ya 1 ilivyoonya, **majaribio huchukua sampuli za hali, na dosari hii iliishi katika hali ambayo hakuna aliyeichukua kama sampuli.** Miamala ya kawaida haikutumia kamwe kizuizi kilichokosekana, hivyo kila jaribio lilipita na kila siku ya utendaji wa kawaida ilionekana bila dosari. Dosari hiyo iliweza kufikiwa tu kwa kutengeneza kimakusudi shahidi usio wa kawaida uliolenga moja kwa moja pengo hilo. Hatimaye haikupatikana kwa kuendesha majaribio, bali kwa *kufikiri kuhusu hesabu ya saketi*.

Ugunduzi wenyewe ni ishara ya mwelekeo wa usalama. Mnamo Aprili 2026, Shielded Labs ilimhusisha mtafiti wa usalama **Taylor Hornby** hasa kutafuta aina hii ya dosari. Muda mfupi baada ya modeli mpya ya AI ya kiwango cha juu (Claude Opus 4.8 ya Anthropic) kutolewa mwishoni mwa Mei 2026, Hornby aliitumia, pamoja na mazingira maalumu ya uchambuzi na mbinu za jadi, katika ukaguzi uliolengwa wa saketi ya Orchard. Mnamo **Mei 29, 2026**, ukaguzi huo ulipata udhaifu huo.

Mambo mawili ya tahadhari kutoka katika ufichuzi yanafaa kusemwa wazi:

- Timu haikupata **ushahidi wowote** kwamba hitilafu hiyo iliwahi kutumiwa, na inaona matumizi ya awali kuwa yasiyowezekana (ilikuwa imekwepa uchunguzi wa wataalamu kwa miaka, na ilipatikana kupitia juhudi ya kimakusudi ya white-hat). Lakini asili yenyewe ya dosari *isiyoweza kugunduliwa* inamaanisha kuwa leja pekee haiwezi kuthibitisha kikamilifu kwamba haikutokea kamwe.
- Ugunduzi huo ulisababisha msukosuko mkubwa, ukiwemo kushuka kwa kasi kwa bei ya mali hiyo, hasa kwa sababu *uwezekano* wa ughushi uliofichwa ni jambo zito sana kwa pesa.

![alt text](image-3.png)

---

## 6. Hii haikuwa mara ya kwanza

Hitilafu ya Orchard ni sehemu ya familia inayojirudia, na kuona familia hiyo ndiko kunakofanya uthibitishaji rasmi uonekane si wa hiari bali wa lazima. Dosari ya ughushi kila mara hufuatwa hadi mojawapo ya vyanzo vitatu (uainishaji kutoka Sehemu ya 1): **ubainifu** (hesabu yenyewe), **utekelezaji [implementation]** (msimbo kushindwa kufuata hesabu sahihi), au **dhana iliyovunjika [broken assumption]**. Na muhimu zaidi:

> Hitilafu ya ughushi haiwezi **kugunduliwa** tu ikiwa ipo katika **ubainifu**. Hitilafu za utekelezaji huacha ushahidi wa kudumu wa umma, kwa sababu kila block hurekodi maudhui kamili ya kila muamala, hivyo kurudia historia kupitia programu iliyorekebishwa kungeanika muamala wowote ambao msimbo wenye hitilafu ulikubali kimakosa.

Historia ya Zcash yenyewe inaonyesha muundo huu:

| Hitilafu (mwaka) | Chanzo | Inaweza kugunduliwa? |
|---|---|---|
| Dosari ya commitment ya Zerocash (2016, kabla ya uzinduzi) | Ubainifu (hash iliyokatwa ilivunja sifa ya binding) | Haiwezi kugunduliwa |
| Dosari ya usahihi ya usanidi unaoaminika (2018) | Ubainifu (kosa katika waraka wa msingi wa zk-SNARK) | Haiwezi kugunduliwa |
| Mgongano wa query wa mfumo wa kuthibitisha (2025) | Ubainifu (ukaguzi uliokosekana katika mfumo wa uthibitisho) | Inaweza kugunduliwa |
| Hitilafu ya uthibitishaji wa kikundi kidogo cha mkondo (2016) | Utekelezaji (ukaguzi wa subgroup uliokosekana) | Inaweza kugunduliwa |
| **Uzidishaji wa Orchard wenye vikwazo visivyotosha (2026)** | **Ubainifu (saketi)** | **Haiwezi kugunduliwa** |

Mstari unaounganisha ni wazi: dosari zinazoweza kujificha milele ni zile zilizo katika hesabu. Hiyo ndiyo hasa aina ambayo thibitisho la ubainifu lililokaguliwa na mashine linaweza kuondoa, kwa hali zote mara moja. Majaribio na ukaguzi huchukua sampuli; kuthibitisha hesabu pekee kunashughulikia kila ingizo.

---

## 7. Majibu

Wasanidi programu wa Zcash walichukua hatua haraka na kwa awamu:

1. **Marekebisho ya dharura (kufikia Juni 1-2, 2026).** Ndani ya siku chache baada ya ufichuzi, uboreshaji wa dharura wa mtandao ulifunga dirisha la udhaifu, ukiongeza vikwazo vilivyokosekana ili hesabu ya saketi iwe sahihi tena.
2. **Mwanzo mpya unaoweza kuthibitishwa (“Ironwood,” ulioanzishwa Julai 28, 2026).** Badala ya kuamini toleo lililorekebishwa la bwawa la zamani kwa muda usiojulikana, jamii ilizindua bwawa jipya kabisa la faragha, Ironwood, lililotegemea saketi iliyorekebishwa lakini likianza upya, na kuambatana na thibitisho rasmi la usahihi lililokaguliwa na mashine.

Hatua hiyo ya pili ndiyo mahali uthibitishaji rasmi unapoingia katika simulizi, na ndiyo mada ya Sehemu ya 3. Utambuzi ambao timu ilitekeleza unafaa kuutazamia mapema, kwa sababu unaunganisha mfululizo huu wote:

> Dosari ya ughushi *isiyoweza kugunduliwa* inaweza kuishi tu katika **ubainifu** wa itifaki. Kwa hiyo, ukiweza **kuthibitisha ubainifu** unaondoa ughushi, unaondoa aina nzima ya hitilafu iliyojificha hapa kwa miaka minne.

Hilo ndilo hasa wazo la nguzo ya kwanza kutoka Sehemu ya 1: thibitisha ubainifu, na unafunga pengo ambalo majaribio yasingeweza kamwe kulifunga.

---

## 8. Kanusho la uaminifu

Tumerahisisha kwa makusudi. Saketi halisi inahusisha mamia ya maeneo na maelfu mengi ya vikwazo, na dosari halisi ni changamani zaidi kiufundi kuliko ukaguzi mmoja wa biti unaokosekana; tulitumia ukaguzi wa biti kwa sababu unaonyesha *umbo* la saketi yenye vikwazo visivyotosha kwa usahihi, na kwa sababu kosa hilo hasa ni la kweli katika historia ya Zcash. Dosari sahihi ya Orchard ilikuwa uzidishaji wa mkondo wa eliptiki wenye vikwazo visivyotosha, kama ilivyoelezwa katika ufichuzi rasmi. Pia tumefupisha ratiba ya ufichuzi na marekebisho. Kwa maelezo ya kiufundi yenye mamlaka, tazama ufichuzi wa Shielded Labs na maandishi ya Project Tachyon.

---

## 9. Muhtasari

- Bwawa la faragha la Zcash huficha kiasi kwa kutumia **mathibitisho ya maarifa sifuri**, hivyo dosari katika mathibitisho hayo ingeweza kuwezesha **ughushi usioonekana**.
- Mfumo wa uthibitisho hukagua **saketi** maalumu ya **vikwazo**; sifa yake muhimu ni **usahihi**: kauli za kweli pekee zinapaswa kuwa na **shahidi** anayetimiza masharti.
- **Kizuizi kinachokosekana** huunda **pengo la usahihi**, likiruhusu kauli za uongo kupita. (Kisa kidogo kilichothibitishwa: `b(b−1)=0` hulazimisha `b` kuwa 0 au 1; ukikiondoa, `b` inaweza kuwa chochote. Aina hii hasa ya hitilafu ni halisi katika historia ya Zcash.)
- **Hitilafu ya Orchard** ilikuwa **uzidishaji wa mkondo wa eliptiki wenye vikwazo visivyotosha**: ingizo la uongo la kiholela lingeweza kupita ukaguzi wa uzidishaji, na kuwezesha ughushi usio na kikomo usioweza kugunduliwa. Shambulio linalofanya kazi lilionyeshwa katika mtandao wa majaribio.
- Ilijificha kwa **miaka minne** (Mei 2022 hadi Juni 2026) kwa sababu majaribio huchukua sampuli za hali na hayakuwahi kuichukua; ilipatikana kwa kufikiri kuhusu hesabu, kwa msaada wa AI, mnamo Mei 29, 2026.
- Ughushi usioweza kugunduliwa unaweza kuishi tu katika **ubainifu**, na Zcash imeshawahi kuona familia hii ya hitilafu hapo awali. Zcash ilijibu kwa marekebisho ya dharura na bwawa jipya lililothibitishwa rasmi, **Ironwood**, mada ya Sehemu ya 3.

---

## Kamusi

| Istilahi | Maana kwa lugha rahisi |
|---|---|
| **Shielded pool** | Hali ya faragha ya Zcash ambapo kiasi na wahusika hufichwa |
| **Zero-knowledge proof** | Thibitisho kwamba kauli iliyofichwa ni halali, bila kufichua kitu kingine |
| **Circuit** | Seti maalumu ya masharti ya kihesabu ambayo muamala halali lazima utimize |
| **Constraint** | Sharti moja (milinganyo) ndani ya saketi |
| **Witness** | Thamani za siri zinazotimiza vikwazo |
| **Soundness** | Dhamana kwamba kauli za kweli pekee zinaweza kutengeneza thibitisho halali |
| **Soundness gap** | Kizuizi kinachokosekana kinachoruhusu kauli za uongo kupita |
| **Under-constrained** | Saketi inayokosa sharti ililohitaji, chanzo cha hitilafu ya Orchard |
| **Detectable / undetectable** | Ikiwa matumizi mabaya yangeacha ushahidi katika leja ya umma |

---

## Maswali Yanayoulizwa Mara kwa Mara

**Je, Zcash ghushi ilitengenezwa kweli?**
Hakuna ushahidi wa matumizi mabaya uliopatikana, na timu inaona hali hiyo kuwa isiyowezekana. Lakini kwa sababu dosari hiyo isingeweza kugunduliwa kutoka kwenye leja, leja pekee haiwezi kuthibitisha kikamilifu kwamba haikutokea kamwe, ndiyo maana majibu yalikuwa ya kina sana.

**Kwa nini kuficha kiasi hufanya hitilafu kuwa mbaya zaidi?**
Kwenye mnyororo wa uwazi, sarafu zilizotengenezwa huonekana na zinaweza kutambuliwa na kurejeshwa. Kiasi kinapofichwa kwa faragha, hitilafu ya ughushi haitoi hali yoyote isiyo ya kawaida inayoonekana, hivyo inaweza kuendelea bila kuonekana.

**Kwa nini miaka ya ukaguzi haikuipata?**
Ukaguzi na majaribio kwa kiasi kikubwa huchunguza tabia katika hali halisi. Dosari hii ilijitokeza tu chini ya ingizo lisilo la kawaida lililotengenezwa kimakusudi na kulenga hali ya ukingo wa kihesabu, jambo ambalo ukaguzi wa kawaida haukulitumia. Ilipatikana kwa ufikiri uliolengwa kuhusu saketi, si kwa majaribio.

**Je, kizuizi kinachokosekana ndicho pekee kinachohitajika?**
Ndiyo. Mfumo wa uthibitisho una nguvu tu kadiri ya seti yake kamili ya vikwazo. Sharti moja muhimu likiachwa linatosha kuruhusu kauli batili kupita.

**AI ilicheza jukumu gani?**
Mtafiti alitumia modeli ya AI ya kiwango cha juu pamoja na mazingira maalumu na mbinu za jadi kukagua hesabu ya saketi na kupata dosari hiyo. AI inazidi kutumiwa pande zote mbili za usalama, jambo ambalo ni sehemu ya sababu ya kuthibitisha usahihi wa mifumo kuwa muhimu sana sasa.

---

### Jaribu intuisia yako

Tuseme muamala wa faragha unatakiwa kuthibitisha “pesa inayoingia ni sawa na pesa inayotoka,” lakini saketi inasahau kuweka kizuizi kwa thamani moja ya pato. Mthibitishaji asiye mwaminifu angeweza kufanya nini, na kwa nini leja ya umma ingeonekana kuwa ya kawaida kabisa? *(Jibu hapa chini.)*

<details><summary>Jibu</summary>

Kwa pato hilo kukosa kizuizi, mthibitishaji angeweza kuliweka kubwa kuliko ingizo halisi linavyoruhusu, na kutengeneza thamani kutoka pasipo kitu, yaani ughushi. Thibitisho bado lingethibitishwa, kwa sababu kizuizi kinachokosekana ndicho kitu pekee ambacho kingetambua ukosefu wa uwiano. Na kwa kuwa bwawa la faragha huficha kiasi, leja huonyesha tu kwamba “muamala halali umetokea,” bila ukosefu wa uwiano unaoonekana wa kutoa tahadhari. Ughushi ni halisi lakini hauonekani, ndiyo sababu usahihi wa saketi ni muhimu sana, na ndiyo sababu lazima uthibitishwe badala ya kujaribiwa.
</details>

---

### Kinachofuata

**Sehemu ya 3 · Ironwood:** marekebisho hayakuwa kiraka tu. Wahandisi wa Zcash walijenga bwawa jipya la faragha na kuliambatanisha na thibitisho la kihesabu lililokaguliwa na mashine, zaidi ya teorema 2,700 zilizoandikwa katika msaidizi wa uthibitishaji wa Lean, kwamba haliwezi kutengeneza pesa ghushi chini ya dhana zake zilizoelezwa. Tutaona “uadilifu wa mizani” na “usahihi wa maarifa” vinamaanisha nini, thibitisho linashughulikia nini hasa na lisichoshughulikia, na jinsi bwawa la zamani lilivyostaafishwa kwa usalama.

*Sehemu ya* mfululizo wa Uthibitishaji Rasmi *kwa ajili ya [ZecHub](https://zechub.org).*
