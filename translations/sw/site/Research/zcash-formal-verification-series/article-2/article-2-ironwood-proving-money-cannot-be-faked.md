![alt text](image-1.png)
# Ironwood: Kuthibitisha Kwamba Pesa Haziwezi Kughushiwa

### Jinsi Zcash ilivyojibu hitilafu kwa thibitisho lililokaguliwa na mashine

> **Mfululizo:** *Uthibitishaji Rasmi* · **Sehemu ya 3 kati ya 3**
> **Hadhira:** wanaoanza. Sehemu za 1 na 2 zinaanzisha uthibitishaji rasmi na hitilafu ya Orchard; hitimisho hili linaonyesha mawazo hayo mawili yakikutana katika mfumo halisi. Kila kinachohitajika kinakumbushwa tunapoendelea.
> **Mtajifunza:** uelewa sahihi wa kile ambacho Zcash ilithibitisha hasa kuhusu bwawa lake jipya la “Ironwood”, jinsi thibitisho hilo lilivyoundwa, kile linachoshughulikia na kisichoshughulikia, jinsi bwawa la zamani lilivyostaafishwa kwa usalama, na kwa nini hili linaelekea kuwa kiwango kipya cha kutengeneza pesa za kifumbo.

Katika Sehemu ya 1 tulijifunza maana ya *kuthibitisha* mfumo kuwa sahihi. Katika Sehemu ya 2 tuliona dosari halisi ambayo majaribio hayakuigundua kwa miaka minne, uzidishaji wa mviringo wa duaradufu uliokuwa na vikwazo pungufu ambao ungeweza kuruhusu ughushi usioonekana usio na kikomo. Makala haya ndiyo suluhisho: jinsi Zcash ilivyojibu si kwa kiraka pekee, bali kwa thibitisho lililokaguliwa na mashine kwamba aina nzima ya hitilafu imeondolewa.

---

## 1. Kwa nini hili likuhusu?

Hitilafu inapotishia pesa, jibu la kawaida ni kuitia kiraka na kuendelea. Zcash ilifanya jambo la kutamani zaidi. Sambamba na bwawa jipya la faragha (shielded) liitwalo **Ironwood**, lililoanzishwa tarehe 28 Julai 2026, wahandisi wake walichapisha **thibitisho la kihisabati lililokaguliwa na mashine**, lenye **zaidi ya teoremu 2,700** zilizoandikwa katika msaidizi wa uthibitisho wa **Lean**, likithibitisha kuwa bwawa jipya haliwezi kuunda sarafu ghushi chini ya dhana zake zilizotajwa. Thibitisho hilo ni la umma, katika hifadhi huria ya `ironwood`, na lilichukua timu tatu za watafiti na wataalamu wa kriptografia zaidi ya mwezi mmoja kulikamilisha.

Hili ni muhimu zaidi ya Zcash. Ni mojawapo ya maonyesho yaliyo wazi zaidi katika ulimwengu halisi kwamba unaweza kuchukua mfumo wa kifedha unaotumika, kuandika kwa usahihi maana ya “hakuna ughushi,” na *kuthibitisha* hilo, badala ya kutumaini majaribio yako yalikuwa ya kina. Hubadilisha ahadi kuwa teoremu.

---

## 2. Wazo kuu: thibitisha vipimo, ondoa aina ya hitilafu

Sehemu ya 2 ilimalizikia kwenye ufahamu uliowezesha hili. Ukumbuke, kwa sababu kila kitu hapa kinategemea huo:

> Hitilafu ya ughushi *isiyogundulika* inaweza kuwepo tu katika **vipimo** (specification) vya itifaki, maelezo ya kihisabati ya kile ambacho mzunguko lazima utekeleze. Kitu chochote kinachogundulika kingeonekana katika uhasibu wa umma. Kwa hiyo kuthibitisha vipimo kuwa sahihi huondoa aina nzima ya hitilafu ya ughushi uliojificha mara moja.

Kwa nini “tu katika vipimo”? Kwa sababu kila block hurekodi kwa kudumu maudhui kamili ya kila muamala (transaction), yakiwemo mathibitisho yake. Ikiwa *programu* ilikubali kimakosa muamala mbaya, yeyote angeweza kurudia historia kupitia programu iliyosahihishwa na kuliona hilo. Ushahidi huo ni wa kudumu na wa umma. Dosari katika *hisabati* ya msingi pekee inaweza kujificha milele, kwa sababu hakuna “toleo sahihi” la kulinganisha katika urudiaji. Hiyo ndiyo dosari ambayo uthibitishaji rasmi unalenga.

Majaribio hukagua *tabia katika ingizo zilizochaguliwa*, na hitilafu ya Orchard ilijificha hasa kwa sababu hakuna ingizo lililochaguliwa lililoifikia. Thibitisho kuhusu vipimo hushughulikia ingizo **zote** kwa wakati mmoja, zikiwemo hali za ukingoni ambazo hakuna mtu angefikiria kujaribu. Hiyo ndiyo aina pekee ya dhamana yenye nguvu ya kutosha kustaafisha dosari isiyoonekana ya miaka minne kwa ujasiri.

![alt text](image-2.png)

---

## 3. Nini hasa kilithibitishwa

Thibitisho linaanzisha sifa moja kuu, iliyojengwa juu ya sifa ya kina zaidi chini yake.

### Uadilifu wa salio (balance integrity) (kichwa kikuu)

> **Uadilifu wa salio:** thamani iliyofichwa inayohifadhiwa katika bwawa la faragha haizidi kamwe thamani halisi ya umma iliyotiririka kuingia humo.

Hii ndiyo sifa ya kupinga ughushi kwa lugha rahisi. Pesa zinaweza kuingia kwenye bwawa la faragha (zinaonekana hadharani) na kutoka humo (zinaonekana hadharani), lakini ndani, ambapo kiasi kimefichwa, hakuna thamani inayoweza kutungwa. Hebu tuilinganishe kwa daftari dogo la hesabu (hesabu iliyothibitishwa):

- **Muamala wa uaminifu:** ingizo zenye thamani ya `5 + 3 = 8` huzalisha matokeo yenye thamani ya `4 + 4 = 8`. Thamani inayoingia ni sawa na inayotoka. Uadilifu wa salio unadumishwa. ✓
- **Jaribio la ughushi:** ingizo zilezile zenye thamani ya `8`, lakini matokeo ya `4 + 4 + 2 = 10`. Hilo lingeunda vipimo `2` kutoka pasipo kitu. Uadilifu wa salio **unakataa** hili: bwawa haliwezi kamwe kulipa zaidi ya kilichoingia humo. ✗

Uadilifu wa salio ni kauli ya kihisabati kwamba hali ya pili haiwezi kamwe kuzalisha muamala halali.

### Uthabiti wa maarifa (knowledge soundness) (injini iliyo chini yake)

Ili kuhakikisha uadilifu wa salio, watafiti walipaswa kwanza kuthibitisha sifa ya kina zaidi na tata kuhusu mfumo wenyewe wa thibitisho la maarifa sifuri (zero-knowledge). Uthabiti wa kawaida (kauli ya Sehemu ya 2 ya “kauli za kweli pekee zina shahidi”) unaonekana kuwa *hautoshi* kwa bwawa la faragha, kwa sababu ya kuvutia: kwa kuwa muamala uliofichwa unaweza kuwa na chochote, karibu kila kauli kitaalamu *ina* shahidi fulani. Kwa hiyo watafiti walithibitisha sifa yenye nguvu zaidi:

> **Uthabiti wa maarifa:** yeyote anayeweza kutokeza thibitisho halali la muamala lazima *awe na* shahidi halali, yaani sarafu halisi, zilizotokana kwa usahihi, katika anwani sahihi.

Kifaa rasmi cha hili ni **kitoa-shahidi** (extractor): utaratibu ambao, ukipewa mthibitishaji yeyote anayeweza kumshawishi mthibitishaji-kaguzi, unaweza kutoa shahidi halisi kutoka kwake. Ikiwa shahidi anaweza kutolewa daima, basi mthibitishaji mwenye kushawishi lazima kweli alikuwa naye. Kwa lugha ya Sehemu ya 2, uthabiti wa maarifa ni ahadi rasmi kwamba hakuna **pengo la uthabiti**, hakuna kikwazo kilichokosekana ambacho kingeruhusu kauli ya uongo kupenya. Hii ndiyo hasa sifa ambayo *kutokuwepo* kwake kulikuwa hitilafu ya Orchard. Kuthibitisha uwepo wake, kwa wathibitishaji wote wanaowezekana, ndiko kunakofunga mlango huo kabisa.

![alt text](image-3.png)

---

## 4. Jinsi thibitisho lilivyojengwa

Uthibitishaji ulikuwa juhudi kubwa ya kibinadamu, si matokeo ya kubonyeza kitufe:

- Uliandikwa katika msaidizi wa uthibitisho wa **Lean** (kutoka Sehemu ya 1: mashine inayokagua kila hatua ya kimantiki).
- Una **zaidi ya teoremu 2,700**, zinazopatikana hadharani katika hifadhi ya `ironwood`.
- Ulitolewa na **timu tatu** za watafiti na wataalamu wa kriptografia kwa muda wa **zaidi ya mwezi mmoja**, ukijumuisha kazi iliyoongozwa na Tal Derei wa Project Tachyon, michango kutoka kwa Gregor Mitscha-Baude wa zkSecurity na Daira-Emma Hopwood wa Open Development Lab ya Zcash, pamoja na thibitisho huru sambamba la uthabiti kutoka kwa wataalamu wengine wa kriptografia.

Ili kufikiri kuhusu sifa hiyo, modeli ya Lean huelezea **daftari kuu** (ledger) zima kama orodha ya miamala, kila mmoja ukiwa na vitendo vyake, thamani yake ya umma iliyotangazwa, na sahihi zake. Kielezi ambacho watafiti wanakiita **ValidLedger** hunakili moja kwa moja kanuni za makubaliano (consensus) za mtandao: shahidi wa kila kitendo lazima atimize masharti yanayohitajika, hakuna alama ya matumizi (nullifier) inayoweza kuonekana mara mbili, kila hali ya mti inayorejelewa lazima iwe ile ambayo mfumo uliifikia kweli, na kila sahihi lazima ithibitike. Kisha teoremu hizo huhesabu juu ya **kila daftari kuu halali**. Kauli hiyo, “kila daftari kuu halali,” ndiyo hoja nzima: si sampuli, bali zote, mkusanyiko mpana zaidi ya chochote ambacho mshambulizi halisi angeweza kukusanya.

Matokeo ya uadilifu wa salio yamekusanywa kutoka kwa teoremu kadhaa za kiwango cha daftari kuu, kila moja ikithibitisha njia moja ya ughushi imefungwa: kwamba kila matumizi yanalingana na matokeo halisi ya awali, kwamba jumla ya thamani inahifadhiwa, kwamba dokezo (note) lililopokelewa linabaki linaweza kutumika na haliwezi kuibiwa, na kwamba matumizi yanahitaji idhini sahihi. Sehemu tofauti, **sahihi ya kuunganisha** (binding signature), huunganisha thamani zilizofichwa za kila muamala na kiasi cha umma kinachotangazwa, ili uhasibu uliofichwa na wa umma usitofautiane kimyakimya.

---

## 5. Ambapo hisabati hukutana na programu

Swali tata na la uaminifu: thibitisho linahusu modeli ya kihisabati, lakini mtandao huendesha msimbo wa Rust. Tunajuaje kuwa msimbo unalingana na modeli?

Timu iliweka mpaka makini wanaouita **alama ya utambulisho** (fingerprint) ya mthibitishaji-kaguzi. Juu ya mpaka huo, thibitisho za Lean hufikiri kuhusu mthibitishaji-kaguzi kama kitu sahihi cha kihisabati. Chini yake kuna utekelezaji wa kawaida wa Rust. Hoja kuu ni ileile ya Sehemu ya 2:

> Njia yoyote ambayo programu halisi ingeweza kupotoka kutoka kwa modeli iliyothibitishwa ingekuwa hitilafu ya *utekelezaji*, na hitilafu za utekelezaji zinaweza tu kuzalisha ughushi *unaogundulika*, kwa sababu kila thibitisho linalokubaliwa hurekodiwa kwa kudumu na linaweza kurudiwa kupitia programu iliyosahihishwa.

Kwa hiyo thibitisho hushughulikia aina isiyogundulika (vipimo), na rekodi ya kudumu ya umma hushughulikia aina inayogundulika (utekelezaji). Kati yao, hakuna mahali pa hitilafu ya ughushi *isiyogundulika* kujificha. Timu pia ilihakiki kwa mlinganisho, kwa kuendesha mthibitishaji-kaguzi halisi na kuthibitisha kuwa inazalisha alama ya utambulisho sawasawa katika matukio yaliyonaswa.

---

## 6. Tahadhari muhimu zaidi: “chini ya dhana zilizotajwa”

Sehemu ya 1 ilisisitiza kwamba thibitisho linahakikisha mfumo unatimiza vipimo *chini ya dhana zilizotajwa*, na kamwe halimaanishi “hakuna hitilafu yoyote kamwe.” Timu ya Zcash ilikuwa sahihi kwa kupendeza kuhusu hili hasa, na uandishi wa kielimu wa uaminifu unapaswa kuwa hivyo pia.

Thibitisho hupunguza usalama wa Ironwood hadi kwenye seti ndogo ya dhana za kawaida zilizopewa majina wazi. Hasa, uthabiti wake unategemea ugumu wa **tatizo la logaritimu tambuzi** (discrete logarithm problem) kwenye mviringo wa duaradufu unaotumiwa na Ironwood (dhana iliyofanyiwa utafiti wa kina, ambapo shambulio bora linalojulikana lingehitaji takribani shughuli `2^126`, mbali zaidi ya hesabu yoyote inayowezekana), pamoja na dhana za kawaida za uundaji wa modeli wa kazi ya heshi. Mipaka miwili inastahili kusemwa wazi:

- **Unatumika chini ya dhana hizo za kriptografia.** Ikiwa dhana ya msingi ingevunjwa, dhamana hiyo ingetoweka. Hili ni la kawaida na haliwezi kuepukika; kimsingi kriptografia yote inayotumika hutegemea dhana kama hizo.
- **Unashughulikia uadilifu wa salio, si faragha.** Thibitisho linahusu uthabiti wa ugavi (hakuna pesa bandia). Halidai kuthibitisha dhamana tofauti za faragha za bwawa, ambazo ni sifa tofauti zenye hoja tofauti.

Mbali na kudhoofisha mafanikio haya, kutaja mipaka hii ndiko kunakofanya yaaminike. Dai ni sahihi: *chini ya dhana za kawaida za kriptografia, bwawa hili haliwezi kuunda sarafu ghushi zisizogundulika.* Hiyo ni teoremu, si matumaini, na upeo wake sahihi umeelezwa wazi.

![alt text](image-4.png)

---

## 7. Kustaafisha bwawa la zamani kwa usalama: turnstile

Kuthibitisha bwawa *jipya* kuwa sahihi bado kunaacha swali: je, bwawa la zamani la Orchard, ambamo dosari iliishi kwa miaka minne? Huwezi kufichua yaliyopita. Lakini unaweza kuweka mpaka wa yajayo.

Zcash ilianzisha utaratibu unaoitwa **turnstile**. Kanuni ni rahisi na yenye nguvu:

> Thamani inaweza kutoka katika bwawa la zamani hadi kiwango cha kiasi kilichoingia humo kinachoweza kuthibitishwa.

Kwa sababu pesa zinazoingia na kutoka katika bwawa la faragha zinaonekana hadharani (ni shughuli *ndani* pekee zilizofichwa), turnstile huruhusu mtandao mzima kukagua kwamba hakuna zaidi inayotoka kuliko iliyowahi kuingia. Kama sarafu ghushi zingeundwa ndani ya bwawa la zamani, zingefikia kikomo hiki na zishindwe kutoka. Na fedha za uaminifu zinapohama kutoka na hakuna ziada inayoonekana, jumuiya hupata ushahidi thabiti wa umma kwamba dosari hiyo haikuwahi kutumiwa. Hii ndiyo kitu cha karibu zaidi na kukagua ugavi wa bwawa la faragha bila kuvunja faragha yake, na huleta uadilifu wa ugavi karibu zaidi na modeli ya uwazi ya mnyororo kama Bitcoin huku ikihifadhi faragha ya Zcash.

![alt text](image-5.png)

Ironwood yenyewe hutumia tena mzunguko wa thibitisho *uliorekebishwa*, huanza upya kwa bwawa tupu, na huongeza ulinzi wa kuangalia mbele (ukiwa na masharti ya fedha kubaki zinaweza kurejeshwa iwapo kompyuta za kwanta za siku zijazo zingetishia kriptografia ya leo). Shughuli mpya za faragha sasa hupitia Ironwood, huku bwawa la zamani la Orchard likizuiwa kwa utoaji pekee.

---

## 8. Picha kubwa zaidi: kriptografia yenye uhakika wa juu

Ironwood ni sehemu ya mabadiliko mapana katika jinsi Zcash inavyojenga. Juhudi yake ya kizazi kijacho ya kupanua uwezo (scaling) (usanifu unaoitwa **Tachyon**, uliojengwa juu ya mathibitisho ya urejeleaji na mkusanyiko wa vifaa unaoitwa **Ragu**) unaendelezwa chini ya falsafa wakati mwingine iitwayo **kriptografia yenye uhakika wa juu** (high-assurance cryptography): kuchukulia uthibitishaji rasmi unaokaguliwa na mashine si kama jambo la baadaye, bali kama sehemu ya kawaida ya kutoa mifumo mipya ya kriptografia.

Mantiki yake inashawishi. Kriptografia ya kisasa kabisa ndiyo hasa eneo ambako angalizo la binadamu ni dhaifu zaidi na ambako hali fiche ya ukingoni isiyojaribiwa inaweza kujificha kwa miaka, kama Orchard ilivyoonyesha. Kuthibitisha vipimo ndiyo mbinu moja inayopanuka hadi “ingizo zote zinazowezekana” na kuziba mapengo hayo kwa muundo. Timu imeashiria kuwa inakusudia kupanua uchunguzi huu zaidi kadiri muda unavyokwenda, kuelekea utekelezaji na zaidi ya hapo. Tarajia kiwango hiki kipitishwe kwa upana zaidi, ndani na nje ya Zcash.

---

## 9. Kanusho la uaminifu

Tumerahisisha kwa ajili ya uwazi. Uendelezaji halisi wa Lean una maelezo mengi zaidi kuliko muhtasari huu, ukiwa na fasili sahihi za vitendo, kauli, commitment, nullifier, na sahihi; “uadilifu wa salio” na “uthabiti wa maarifa” zina fasili rasmi sahihi tulizozieleza kwa maneno pekee; upunguzaji hadi ugumu wa logaritimu tambuzi hupitia modeli kadhaa za kati (modeli ya kialjebra ya mthibitishaji na modeli ya random-oracle ya heshi) ambazo tulizifupisha kuwa “dhana za kawaida”; na tulielezea alama ya utambulisho na turnstile katika kiwango cha kimawazo. Hakuna kati ya haya kinachobadilisha hadithi muhimu: vipimo vya “hakuna ughushi,” thibitisho lililokaguliwa na mashine juu ya madaftari makuu yote halali, kauli ya wazi na ya uaminifu kuhusu upeo na dhana, na kustaafishwa kwa usalama kwa bwawa lenye dosari. Kwa maelezo yenye mamlaka, soma maandiko ya uthibitishaji yaliyochapishwa ya Project Tachyon na hifadhi ya thibitisho ya `ironwood`.

---

## 10. Muhtasari

- Zcash ilijibu hitilafu ya Orchard si kwa kiraka pekee bali kwa **thibitisho lililokaguliwa na mashine** (lenye **zaidi ya teoremu 2,700** katika **Lean**, linalopatikana hadharani) kwa bwawa lake jipya la **Ironwood**.
- Thibitisho linaanzisha **uadilifu wa salio** (bwawa haliwahi kulipa zaidi ya kilichoingia humo hadharani), uliojengwa juu ya **uthabiti wa maarifa** (thibitisho halali huhitaji mthibitishaji awe kweli na shahidi halisi, anayethibitishwa kupitia **kitoa-shahidi**). Uthabiti wa maarifa ndiyo hasa sifa ambayo pengo lake lilikuwa hitilafu ya Orchard.
- Linatafakari kuhusu **kila daftari kuu halali**, si matukio yaliyochaguliwa, jambo ambalo hufunga aina ya hitilafu ya ughushi iliyofichwa ambayo majaribio hayakuigundua.
- Pengo kati ya hisabati na programu hushughulikiwa kwa mpaka wa **alama ya utambulisho**: hitilafu zisizogundulika huondolewa na thibitisho, na upotovu wowote wa utekelezaji ungekuwa **unaogundulika** katika rekodi ya kudumu ya umma.
- Dhamana inaelezwa kwa usahihi: inatumika chini ya **ugumu wa logaritimu tambuzi na dhana za kawaida za heshi**, na inashughulikia **ughushi, si faragha**. Uaminifu huu ni sifa nzuri, si udhaifu.
- **Turnstile** hustaafisha bwawa la zamani kwa usalama kwa kuweka ukomo wa kutoka kwake kuwa amana zake zinazoweza kuthibitishwa, kufichua ughushi wowote na kujenga ushahidi wa umma wa uadilifu wa ugavi.
- Ironwood inaonyesha mwelekeo kuelekea **kriptografia yenye uhakika wa juu**, ambamo uthibitishaji rasmi ni sehemu ya kawaida ya kutengeneza pesa mpya za kifumbo.

---

## Kamusi

| Neno | Maana kwa Kiingereza rahisi |
|---|---|
| **Ironwood** | Bwawa jipya la faragha la Zcash (2026), linalochukua nafasi ya bwawa lenye dosari la Orchard |
| **Balance integrity** | Bwawa halilipi kamwe thamani zaidi ya iliyoingia humo hadharani |
| **Knowledge soundness** | Thibitisho halali huhitaji mthibitishaji awe na shahidi halisi |
| **Extractor** | Utaratibu unaotoa shahidi kutoka kwa mthibitishaji yeyote mwenye kushawishi |
| **Lean** | Msaidizi wa uthibitisho anayetumiwa kukagua uthibitishaji kwa mashine |
| **ValidLedger** | Modeli rasmi ya kanuni za makubaliano ambazo teoremu hutafakari juu yake |
| **Fingerprint** | Mpaka kati ya hisabati iliyothibitishwa na programu ya Rust inayotekelezwa |
| **Under stated assumptions** | Thibitisho hutumika mradi dhana za kriptografia zilizotajwa zinatumika |
| **Turnstile** | Kanuni inayoweka ukomo wa kutoka kwa bwawa kuwa amana zake zinazoweza kuthibitishwa |
| **High-assurance cryptography** | Kutengeneza kriptografia huku uthibitishaji rasmi ukiwa hatua ya kawaida |

---

## Maswali Yanayoulizwa Mara kwa Mara

**Je, thibitisho linamaanisha Ironwood haina hitilafu?**
Hapana, wala halidai hivyo. Linathibitisha sifa moja sahihi, uadilifu wa salio, chini ya dhana zilizotajwa. Hilo huondoa ughushi usiogundulika, si kila hitilafu inayowezekana.

**Je, thibitisho linahakikisha miamala yangu ni ya faragha?**
Hapana. Uthibitishaji unashughulikia uthabiti wa ugavi (hakuna pesa bandia), si dhamana tofauti za faragha za bwawa. Hizo hujadiliwa kwa njia tofauti.

**Kwa nini uliamini thibitisho lililoandikwa na binadamu (na AI)?**
Kwa sababu limekaguliwa na mashine. Msaidizi wa uthibitisho wa Lean huhakiki kila hatua kimitambo, kwa hiyo imani hutegemea vipimo na dhana zilizotajwa, si umakini wa binadamu au AI katika kila hatua.

**Nini hutokea kwa sarafu ambazo bado ziko katika bwawa la zamani la Orchard?**
Zinaweza kutolewa, lakini hadi tu kiwango cha kiasi kilichoingia kinachoweza kuthibitishwa, kikitekelezwa na turnstile. Hili hulinda uadilifu wa ugavi na kusaidia kuonyesha kwamba dosari ya zamani haikuwahi kutumiwa.

**Je, hii ndiyo mwisho wa hadithi?**
Ni hatua muhimu, si mstari wa kumalizia. Usanifu wa baadaye wa Zcash (Tachyon, wenye mkusanyiko wa vifaa wa Ragu) unajengwa huku uthibitishaji rasmi ukiwa desturi ya kawaida, ukipanua mbinu hii zaidi.

---

### Jaribu angalizo lako

Mtu anadai: “Kwa kuwa Ironwood imethibitishwa rasmi, sasa haiwezekani chochote kwenda vibaya kamwe kwa Zcash.” Kwa kutumia mawazo kutoka sehemu zote tatu, toa sababu mbili tofauti kwa nini dai hilo ni kubwa kupita kiasi. *(Jibu hapa chini.)*

<details><summary>Jibu</summary>

Kwanza, thibitisho linashughulikia sifa *maalumu* (uadilifu wa salio) chini ya *dhana zilizotajwa* (ugumu wa logaritimu tambuzi na uundaji wa modeli wa kawaida wa heshi). Ikiwa dhana ya kriptografia ingevunjwa, au tatizo lingetokea nje ya kilichobainishwa (kwa mfano katika faragha, katika programu ya pochi, au katika sehemu fulani isiyothibitishwa), thibitisho halisemi chochote kulihusu. Pili, uthibitishaji rasmi huhakikisha mfumo unatimizia *vipimo vilivyoandikwa*; ikiwa vipimo hivyo vyenyewe vilishindwa kujumuisha hitaji fulani halisi, thibitisho lingethibitisha kwa uaminifu jambo lisilo sahihi. Hoja zote mbili ni tahadhari ya Sehemu ya 1 iliyosemwa tena: thibitisho ni sahihi na lenye mipaka, lina nguvu hasa kwa sababu upeo wake ni wa uaminifu, si dhamana ya jumla kwamba hakuna chochote kinachoweza kwenda vibaya kamwe.
</details>

---

### Mfululizo, kamili

Katika sehemu tatu tulihama kutoka wazo la jumla hadi matumizi hai: maana ya **kuthibitisha** programu kuwa sahihi badala ya kuijaribu (Sehemu ya 1), jinsi mzunguko halisi wenye vikwazo pungufu ungeweza kutengeneza pesa zisizoonekana (Sehemu ya 2), na jinsi thibitisho lililokaguliwa na mashine la **uadilifu wa salio** lilivyostaafisha aina hiyo ya hitilafu kabisa (Sehemu ya 3). Uzi unaounganisha yote ni ahadi moja ya uaminifu: si “hakuna hitilafu kamwe,” bali “sifa hii sahihi hutumika kwa kila tukio, chini ya dhana zilizotajwa.” Kwa pesa zinazoficha kiasi chake, hiyo ndiyo ahadi inayostahili kuthibitishwa.

*Sehemu ya mfululizo wa* Uthibitishaji Rasmi  *kwa [ZecHub](https://zechub.org).*
