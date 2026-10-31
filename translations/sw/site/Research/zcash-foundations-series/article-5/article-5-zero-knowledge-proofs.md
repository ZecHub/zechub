# Thibitisho za Maarifa Sifuri (Zero-Knowledge Proofs): Kuthibitisha Uko Sahihi Bila Kusema Kwa Nini
##### Utafiti Asilia kutoka [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-23-71534bece9.webp)

### Pazia linaloruhusu ulimwengu kuthibitisha kile ambacho hauwezi kamwe kuona

> **Mfululizo:** *Zcash kuanzia Kanuni za Msingi* . **Makala ya 5 . Thibitisho za Maarifa Sifuri**
> **Hadhira:** wanaoanza. Tunategemea kila makala ya awali (sehemu zenye kikomo, mikunjo, commitment, miti ya Merkle), lakini kila wazo linakumbushwa tunapolihitaji.
> **Utakachobaki nacho:** uelewa wa kiintuisia na sahihi wa thibitisho la maarifa sifuri ni nini, dhamana tatu linazotoa, jinsi kauli za aina yoyote zinavyothibitishwa, na kinachoendesha Zcash ya Sapling na Orchard.

Hii ndiyo makala ambayo mfululizo mzima umekuwa ukipanda kuifikia. Kuanzia [Makala ya 0](article-0-shielded-transaction.md) na kuendelea, tuliendelea kusema malipo yanathibitishwa “nyuma ya pazia,” yanathibitishwa kuwa sahihi huku hayafichui chochote. Thibitisho la maarifa sifuri ndilo pazia hilo. Ni kipengele kinachotatua hatimaye kitendawili tulichoanza nacho: *umma unawezaje kuthibitisha muamala ambao hauruhusiwi kuuona?*

---

## 1. Kwa nini unapaswa kujali?

Kumbuka mgongano ulioko kiini cha Zcash:

- Blockchain inaaminika kwa sababu **inaweza kuthibitishwa hadharani**.
- Malipo ya Zcash ni **ya faragha kabisa**: kiasi, mtumaji, mpokeaji, vyote vimefichwa.

Haya yanaonekana kutopatana. Uthibitishaji unaonekana *kuhitaji* kuangalia. Faragha *inakataza* kuangalia. Ikiwa huwezi kuvipatanisha, huwezi kuwa na pesa binafsi ambayo kila mtu anaamini.

**Thibitisho la maarifa sifuri (ZKP)** ndilo upatanisho huo. Linamruhusu **mthibitishaji** kumshawishi **mhakiki** kwamba kauli ni ya kweli **bila kufichua chochote zaidi ya ukweli kwamba ni ya kweli.** Hakuna kiasi. Hakuna utambulisho. Hakuna dokezo. Ni tu: *“Kila kitu hapa kinatii kanuni.”* Hebu tujenge intuisia kabla ya mitambo yoyote.

---

## 2. Intuisia: uthibitisho tatu za kila siku

**Uthibitisho kwamba unajua nenosiri, bila kulisema.** Tovuti inaweza kuthibitisha kwamba unajua nenosiri lako kwa kukuangalia ukifungua kitu ambacho ni nenosiri pekee linaweza kufungua, bila kamwe kuliona nenosiri lenyewe. Unathibitisha *maarifa* bila *ufichuaji*.

**Rafiki asiyeweza kutofautisha rangi na mipira miwili.** Unashikilia mpira mwekundu na mpira wa kijani vinavyoonekana sawa kwa rafiki yako asiyeweza kutofautisha rangi. Unataka kumshawishi kuwa vina *rangi tofauti* bila kumwambia kipi ni kipi. Anavificha vyote nyuma ya mgongo wake, anaweza kuvibadilisha nafasi, kisha anakuonyesha kimoja. Unasema kama alivibadilisha. Ikiwa mipira hiyo kwa kweli inatofautiana, daima uko sahihi. Ikiwa ingekuwa sawa, ungekuwa unakisia, ukiwa sahihi nusu tu ya wakati. Baada ya raundi 20, mfululizo wako usiovunjika unamshawishi kuwa vinatofautiana, ilhali hajifunzi kamwe mpira upi ni mwekundu. **Anashawishika kuhusu ukweli huku hajifunzi kitu kingine chochote.** Hayo ni maarifa sifuri kwa kiwango kidogo.

**Pango.** Pango lenye umbo la pete lina mlango wa kichawi nyuma unaofunguka kwa neno siri pekee. Unadai kujua neno hilo. Ili kulithibitisha bila kulifichua: mhakiki anasubiri nje huku ukiingia na kuchagua njia ya kushoto au kulia kwa nasibu. Kisha mhakiki anapaza sauti akisema upande anaotaka utoke *kwenye* pango. Ikiwa kwa kweli unajua neno hilo, unaweza kutii daima (unaweza kufungua mlango kubadilisha upande ikihitajika). Ikiwa unadanganya, unaweza kutoka upande sahihi kwa bahati tu, 50/50 katika kila raundi. Rudia mara 20 na uwezekano wa mdanganyifu kunusurika ni chini ya mmoja katika milioni.

Hadithi hiyo ya pango inaonyesha kwa utulivu **dhamana tatu** ambazo kila thibitisho la maarifa sifuri lazima litoe.

---

## 3. Dhamana tatu

![alt text](/content-images/image-24-b559d31849.webp)

| Dhamana | Katika hadithi ya pango | Katika Zcash |
|---|---|---|
| **Ukamilifu** | Ikiwa unajua neno, unatoka daima upande sahihi | Muamala halali daima huzalisha thibitisho linalokubaliwa |
| **Uimara** | Mdanganyifu anakamatwa kwa uwezekano mkubwa sana | Muamala wa udanganyifu (pesa ghushi, matumizi mara mbili) hauwezi kuzalisha thibitisho linalokubaliwa |
| **Maarifa sifuri** | Mhakiki hasikii kamwe neno siri | Mtandao haujifunzi kiasi, anwani, au dokezo lipi |

Ikiwa hata moja kati ya hizi itashindwa, mfumo huvunjika: bila ukamilifu watumiaji waaminifu wanakataliwa; bila uimara waghushi wanachapisha pesa; bila maarifa sifuri faragha hutoweka.

---

## 4. Kutoka pangoni hadi kauli *yoyote*: saketi na shahidi

Pango linathibitisha ukweli mmoja wa kuvutia. Zcash inahitaji kuthibitisha kauli pana: *“Ninajua dokezo lisilotumika katika mti, nina idhini ya kulitumia, nullifier yake imekokotolewa kwa usahihi, na pembejeo zangu ni sawa na matokeo yangu.”* Tunatokaje kwenye mipira na mapango hadi hapo?

Daraja ni wazo linalounganisha mfululizo huu wote:

> **Kauli yoyote unayoweza kukagua kwa ukokotoaji inaweza kuandikwa upya kama saketi ya kihesabu:** mtandao wa jumlisho na uzidishaji juu ya sehemu yenye kikomo (Makala ya 1).

Fikiria saketi kama orodha ya vikwazo vya kihesabu ambavyo *vyote hutimizwa tu ikiwa kauli ni ya kweli.* Pembejeo za faragha zinazofanya kila kitu kihakikiwe, dokezo lako, ufunguo wako, njia ya Merkle, huitwa **shahidi.**

![alt text](/content-images/image-25-2479377e43.webp)

Hii ndiyo sababu tulitumia Makala ya 1 kuhusu sehemu zenye kikomo na Makala ya 3 kuhusu heshi rafiki kwa ZK: saketi hutumia hesabu ya sehemu, hivyo kila operesheni ndani ya kauli (ikiwemo kuheshi na kupanda kwa Merkle katika Makala ya 4) lazima ielezwe kwa namna hiyo. Kadiri kila operesheni inavyokuwa nafuu kueleza, ndivyo thibitisho linavyokuwa dogo na la haraka zaidi.

---

## 5. Kuifanya iwe ya vitendo: isiyo ya mwingiliano na fupi

Pango lilihitaji raundi nyingi za mawasiliano ya kwenda na kurudi. Hilo halitekelezeki kwa blockchain, ambapo thibitisho lazima lichapishwe mara moja na kukaguliwa na kila mtu, milele. Maboresho mawili yanarekebisha hili.

**Isiyo ya mwingiliano (wazo la Fiat-Shamir).** Badala ya mhakiki wa moja kwa moja kupaza sauti changamoto za nasibu, mthibitishaji huzalisha “changamoto za nasibu” mwenyewe kwa *kuheshi* thibitisho lake hadi hapo. Kwa sababu heshi nzuri haitabiriki (Makala ya 3), mthibitishaji hawezi kutengeneza changamoto kwa manufaa yake. Mazungumzo marefu yanakunjwa kuwa **thibitisho moja linalojitosheleza** ambalo mtu yeyote anaweza kukagua baadaye, bila mwingiliano.

**Fupi.** Mifumo bora hufanya thibitisho liwe **dogo sana na la haraka kukaguliwa, bila kujali kauli ni kubwa kiasi gani.** Hii ndiyo sehemu ya kushangaza kweli.

> Thibitisho la Groth16 (mfumo unaotumiwa na Sapling) lina takriban **baiti 192** na hukaguliwa kwa milisekunde, *iwe kauli inayothibitishwa ni ndogo au kubwa sana.* Baiti mia chache zinaweza kushuhudia ukokotoaji unaohusisha maelfu mengi ya vikwazo.

Unganisha haya na utapata kifupi utakachokiona kila mahali:

> **zk-SNARK** = **z**ero-**k**nowledge **S**uccinct **N**on-interactive **AR**gument of **K**nowledge. Maarifa sifuri (hayafichui chochote), fupi (dogo na la haraka), isiyo ya mwingiliano (jaribio moja), hoja ya maarifa (mthibitishaji kwa kweli *anajua* shahidi halali).

---

## 6. Kikwazo kimoja: usanidi unaoaminika

Hakuna faida isiyo na gharama. SNARK nyingi zinahitaji **usanidi unaoaminika** wa mara moja unaozalisha vigezo vya umma vya saketi. Usanidi huo huzalisha nasibu siri kama zao la pembeni, na siri hiyo lazima **iharibiwe.** Ikiwa mtu yeyote angeihifadhi, angeweza kughushi thibitisho, yaani, **kughushi pesa** (ingawa, muhimu zaidi, bado hangeweza *kuvunja* faragha).

Siri hii inayobaki hupewa jina la utani **taka zenye sumu.** Ili kuziondoa kwa usalama, Zcash iliendesha **sherehe za wahusika wengi** zilizo tata ambapo washiriki wengi huru kila mmoja alichangia nasibu; mradi *hata mmoja* aliharibu sehemu yake kwa uaminifu, taka zenye sumu haziwezi kurejeshwa.

![alt text](/content-images/image-26-cdad6625cd.webp)

Mifumo mipya huondoa hitaji hili kabisa, jambo ambalo ni mojawapo ya sababu kubwa zaidi za Zcash kubadilisha mfumo wake wa thibitisho kadiri muda ulivyopita.

---

## 7. Hapa ndipo hili linapoishi katika Zcash

| Muundo | Mfumo wa thibitisho | Usanidi unaoaminika? | Umejengwa juu ya |
|---|---|---|---|
| **Sprout** (wa mwanzo kabisa) | zk-SNARK ya awali | Ndiyo | sherehe ya awali |
| **Sapling** | **Groth16** | Ndiyo (sherehe ya wahusika wengi ya “Powers of Tau” + sherehe ya Sapling) | **BLS12-381** (Makala ya 2) |
| **Orchard** (ya sasa) | **Halo 2** | **Hakuna usanidi unaoaminika** | **Pallas / Vesta** (Makala ya 2) |

Safari kutoka Sprout hadi Sapling hadi Orchard kwa kiasi kikubwa ni hadithi ya thibitisho kuwa madogo, ya haraka, na kuondoa usanidi unaoaminika. **Halo 2**, inayotumiwa na Orchard, haihitaji sherehe hata kidogo na imejengwa kusaidia *urejelezaji* (thibitisho zinazothibitisha thibitisho nyingine), ndiyo maana Orchard hutumia **mzunguko** wa mikunjo wa Pallas/Vesta kutoka Makala ya 2: kila mkunjo umeundwa kuthibitisha thibitisho zilizoandikwa juu ya ule mwingine.

Hili linafunga mzunguko mkubwa zaidi kutoka Makala ya 0. Uchawi wa “nyuma ya pazia” ni **zk-SNARK**: unathibitisha muamala wako unatimiza saketi ya kihesabu inayoweka kanuni zote, huku ukifichua chochote isipokuwa biti moja “halali.”

---

## 8. Kanusho la uaminifu

Thibitisho za maarifa sifuri ni eneo pana, na tulibaki kimakusudi katika kiwango cha intuisia. Hatukufafanua mipaka sahihi ya uwezekano katika uimara, umbo halisi la saketi ya kihesabu (R1CS, PLONKish, na kadhalika), jinsi polinomu na commitment zinavyogeuza saketi kuwa thibitisho fupi, au miundo halisi ya ndani ya Groth16 na Halo 2. Pango ni thibitisho *shirikishi*; mifumo ya uzalishaji si ya mwingiliano na ni changamani zaidi. Hakuna kati ya hayo yanayobadilisha kiini: thibitisha saketi inatimizwa na shahidi siri, kwa ukamilifu, uimara, na bila kufichua chochote. Mitambo hiyo ni mfululizo mzima kivyake.

---

## 9. Muhtasari

- **Thibitisho la maarifa sifuri** humruhusu mthibitishaji kumshawishi mhakiki kwamba kauli ni ya kweli **huku akifichua chochote kingine**, likitatua kitendawili cha uthibitishaji dhidi ya faragha.
- Lazima litimize dhamana tatu: **ukamilifu** (kauli za kweli hushawishi), **uimara** (kauli za uongo haziwezi), na **maarifa sifuri** (mhakiki hujifunza tu “ni kweli”).
- Kauli za aina yoyote huwa **saketi za kihesabu** juu ya sehemu yenye kikomo; pembejeo siri zinazotimiza saketi ni **shahidi**. Hii ndiyo sababu sehemu zenye kikomo na heshi rafiki kwa ZK zilikuwa muhimu.
- **Fiat-Shamir** hufanya thibitisho ziwe **zisizo za mwingiliano** (jaribio moja); mifumo bora pia ni **mifupi** (thibitisho la Groth16 ni takriban **baiti 192** na hukaguliwa kwa milisekunde bila kujali ukubwa wa kauli). Kwa pamoja: **zk-SNARK**.
- SNARK nyingine huhitaji **usanidi unaoaminika** ambao **taka zenye sumu** zilizobaki lazima ziharibiwe (kupitia sherehe za wahusika wengi); kuathiriwa kungewezesha kughushi pesa lakini **si** kuvunja faragha.
- **Sapling** hutumia **Groth16** (usanidi unaoaminika, BLS12-381); **Orchard** hutumia **Halo 2** (hakuna usanidi unaoaminika, Pallas/Vesta, rafiki kwa urejelezaji).

---

## Kamusi

| Istilahi | Maana kwa Kiingereza rahisi |
|---|---|
| **Zero-knowledge proof** | Kumshawishi mtu kwamba kauli ni ya kweli huku ukifichua chochote kingine |
| **Prover / Verifier** | Anayetengeneza thibitisho / anayelikagua |
| **Completeness** | Kauli za kweli hukubaliwa daima (kutoka kwa mthibitishaji mwaminifu) |
| **Soundness** | Kauli za uongo hukataliwa (wadanganyifu hawawezi kushinda isipokuwa kwa bahati) |
| **Witness** | Pembejeo siri zinazofanya kauli iwe ya kweli |
| **Arithmetic circuit** | Kauli iliyoandikwa upya kama jumlisho na uzidishaji juu ya sehemu yenye kikomo |
| **Non-interactive (Fiat-Shamir)** | Thibitisho la jaribio moja lisilohitaji mawasiliano ya moja kwa moja ya kwenda na kurudi |
| **Succinct** | Thibitisho ni dogo na la haraka kukaguliwa bila kujali ukubwa wa kauli |
| **zk-SNARK** | Hoja Fupi Isiyo ya Mwingiliano ya Maarifa ya Maarifa Sifuri |
| **Trusted setup / toxic waste** | Uzalishaji wa vigezo wa mara moja ambao siri yake iliyobaki lazima iharibiwe |

---

## Maswali Yanayoulizwa Mara kwa Mara

**Ikiwa thibitisho halifichui chochote, kulikagua kunawezaje kuwa na maana?**
Kwa sababu hesabu imepangwa ili *shahidi halisi na halali pekee* aweze kuzalisha thibitisho linalopita. Kupita ukaguzi wenyewe ni ushahidi, hakuna ufichuaji unaohitajika.

**Je, mtu anaweza kughushi thibitisho?**
Uimara hufanya hili lisitekelezeke. Isipokuwa moja ni SNARK ambayo taka zake zenye sumu za usanidi unaoaminika zilihifadhiwa; ndiyo maana sherehe za kuziharibu ni muhimu.

**Je, usanidi unaoaminika uliovunjika huvuja data yangu ya faragha?**
Hapana. Ungemruhusu mshambuliaji kughushi pesa *mpya*, lakini **haufichui** kiasi, anwani, au madokezo. Faragha na uimara ni dhamana tofauti.

**Kwa nini Zcash ilibadilisha mifumo ya thibitisho kadiri muda ulivyopita?**
Ili kupata thibitisho ndogo na za haraka zaidi, na kwa Halo 2, kuondoa usanidi unaoaminika kabisa na kuwezesha urejelezaji.

---

### Jaribu intuisia yako

Katika pango, kwa nini ni muhimu kwamba mhakiki achague upande wa kutokea *baada ya* mthibitishaji kuwa tayari ameingia, badala ya kuutangaza kabla? *(Jibu hapa chini.)*

<details><summary>Jibu</summary>

Ikiwa mhakiki angetangaza upande kwanza, mdanganyifu ambaye hajui neno angeweza tu kuingia upande huo tangu mwanzo na kutoka nje kwa kutembea, bila kuhitaji kamwe mlango. Kuchagua *baada ya* mthibitishaji kujifunga kwa njia kunamlazimisha mdanganyifu kutegemea bahati (50/50 kwa kila raundi), jambo linalofanya raundi zinazorudiwa kushawishi. Mpangilio huu wa “jifunge kwanza, kisha upewe changamoto” ndio hasa Fiat-Shamir huhifadhi kwa kupata changamoto kutoka kwenye heshi ya thibitisho ambalo mthibitishaji tayari amejifunga nalo.
</details>

---

### Kinachofuata

**Makala ya 6 . Itifaki ya faragha, mwanzo hadi mwisho:** hitimisho. Tunachukua kila kipengele, madokezo, commitment, mti wa commitment wa dokezo, nullifier, uwiano wa thamani, na thibitisho la maarifa sifuri, na kuunganisha muamala kamili wa faragha wa Zcash, tukifunga kila mzunguko tuliofungua katika Makala ya 0.

*Sehemu ya mfululizo wa* Zcash kuanzia Kanuni za Msingi *wa [ZecHub](https://zechub.org). Imetolewa kwa leseni ya CC BY-SA 4.0.*
