# Mikunjo ya Elliptiki [Elliptic Curves]: Ambapo Funguo na Commitments za Zcash Huzaliwa
##### Utafiti Asilia kutoka [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-10-c1097b22d7.webp)

### Njia ya upande mmoja iliyojengwa kwa pointi kwenye mkunjo

> **Mfululizo:** *Zcash kutoka Kanuni za Msingi* . **Makala ya 2 . Mikunjo ya Elliptiki**
> **Hadhira:** wanaoanza. Tunachukulia tu [Makala ya 1 (sehemu finiti)](article-1-finite-fields.md): hesabu inayozunguka upya mod namba ya kwanza. Hakuna maarifa mengine yanayohitajika.
> **Utaondoka na:** picha angavu na sahihi ya mikunjo ya elliptiki, “mlango wa siri” unaoifanya iwe muhimu, na jinsi hasa Zcash inavyoigeuza kuwa funguo na commitments.

[Makala ya 1](article-1-finite-fields.md) ilitupatia uwanja bora wa hesabu: sehemu finiti. Lakini sehemu yenyewe ni namba tu. Ili kujenga funguo na “bahasha zilizofungwa” kutoka [Makala ya 0](article-0-shielded-transaction.md), Zcash inahitaji kitu chenye aina maalumu ya ugumu wa upande mmoja: rahisi kukokotoa kwenda mbele, lakini kisichowezekana kiutendaji kurudisha nyuma. Kitu hicho ni **mkunjo wa elliptiki [elliptic curve]**. Makala hii inaujenga kuanzia chini, kwa utambuzi kabla ya aljebra.

---

## 1. Kwa nini unapaswa kujali?

Kila mfumo wa faragha unahitaji **njia ya upande mmoja**: operesheni ambayo ni rahisi sana kufuata kwenda mbele na haiwezekani kiutendaji kurudi nyuma.

Hii ndiyo sababu. **Ufunguo wako wa siri [secret key]** ni namba unayoiweka siri. **Ufunguo wako wa umma [public key]** (na anwani yako) unatokana nao na huonyeshwa kwa dunia. Usalama wote wa mfumo unategemea jambo moja: *kwa kupewa ufunguo wa umma, hakuna anayeweza kurudi nyuma hadi kwenye ufunguo wako wa siri.* Kama wangeweza, wangeweza kutumia pesa zako.

Hivyo tunahitaji operesheni ya kihisabati ambapo:

- kwenda **mbele** (siri -> umma) ni kwa haraka na rahisi, lakini
- kwenda **nyuma** (umma -> siri) ni kugumu kiasi kwamba kompyuta zote Duniani zikifanya kazi kwa muda wa uhai wa ulimwengu hazingemaliza.

Kuzidisha kwa sehemu finiti ya kawaida hakutoshi; kugawanya hukibatilisha papo hapo (hilo lilikuwa kusudi zima la Makala ya 1). Tunahitaji kitu kisicho na kitufe rahisi cha “kutengua.” Mikunjo ya elliptiki hutoa hilo hasa, na kama faida ya ziada, pointi zake huunganishwa kwa namna inayofaa sana kujenga commitments. Hebu tuone jinsi.

---

## 2. Utambuzi: mkunjo ambao pointi zake unaweza “kujumlisha”

Sahau kriptografia kwa muda. **Mkunjo wa elliptiki** ni mkusanyiko tu wa pointi `(x, y)` zinazotimiza mlinganyo wa umbo:

```
y^2 = x^3 + ax + b
```

Juu ya namba za kawaida unaonekana kama mkunjo laini unaopinda, mara nyingi ukiwa na kitanzi cha mviringo na mikia miwili:

![alt text](/content-images/image-14-1d2e8c25d2.webp)

Sehemu ya kushangaza kweli ni hii: **unaweza “kujumlisha” pointi mbili kwenye mkunjo huu ili kupata pointi ya tatu kwenye mkunjo huohuo.** Huu si ujumlishaji wa kawaida wa koordinati. Ni kanuni ya kijiometri, na ni rahisi zaidi *kuiona* kuliko kuieleza.

### Kanuni ya kamba (kujumlisha pointi mbili tofauti)

Ili kujumlisha `P + Q`:

1. Chora mstari mnyoofu kupitia `P` na `Q`.
2. Mstari huo hugonga mkunjo katika sehemu moja zaidi hasa. Iite `R*`.
3. **Akisi `R*` kwenye mhimili wa mlalo.** Akisi hiyo ndiyo jibu, `P + Q`.

![alt text](/content-images/image-11-61f3df1989.webp)

### Kanuni ya tanjenti (kujumlisha pointi na yenyewe)

Ili kukokotoa `P + P` (huandikwa `2P`), hakuna pointi ya pili ya kuchorea mstari kupita ndani yake, hivyo badala yake unatumia mstari wa **tanjenti [tangent]** kwenye `P`, kisha ufuate utaratibu huohuo wa “makutano ya tatu, kisha akisi.”

Hiyo ndiyo operesheni nzima. Kanuni mbili za kijiometri. Kwa hizo, pointi za mkunjo wa elliptiki huunda kile wanahisabati hukiita **kundi [group]**: mkusanyiko wenye “ujumlishaji” unaofanya kazi kwa utaratibu mzuri. Hata lina “sifuri.”

### Pointi isiyo na kikomo (sifuri ya mkunjo)

Kila mfumo wa namba unahitaji `0`, kitu ambacho hakibadilishi chochote unapokijumlisha. Kwenye mkunjo wa elliptiki, jukumu hilo hutimizwa na pointi maalumu ya ziada iitwayo **pointi isiyo na kikomo [point at infinity]**, inayoandikwa `O`. Unaweza kuifikiria kama “mbali sana juu,” mahali ambapo mistari ya wima hukutana. Kujumlisha `O` kwenye pointi yoyote huiwacha bila kubadilika, sawasawa na kujumlisha `0`.

---

## 3. Kutoka picha hadi sehemu finiti

Mkunjo laini hapo juu ndiyo *utambuzi*. Lakini Zcash haitumii namba halisi (huzungushwa na hufichua ukubwa, kulingana na Makala ya 1). Hutumia mkunjo wa elliptiki **juu ya sehemu finiti**: mlinganyo uleule `y^2 = x^3 + ax + b`, lakini hesabu zote hufanywa mod namba ya kwanza.

Unapofanya hivyo, mkunjo mzuri hugawanyika kuwa **mtawanyiko wa nukta zisizoungana**, nukta moja kwa kila jozi ya `(x, y)` inayotimiza mlinganyo mod `p`. Huacha kuonekana kama mkunjo kabisa. Lakini hapa kuna jambo muhimu:

> **Aljebra ya kanuni ya kamba-na-tanjenti bado hufanya kazi kikamilifu.** Formula zilezile zilizopata `P + Q` kijiometri sasa huikokotoa kwa hesabu ya sehemu finiti. Nukta bado huunda kundi, lenye `0` ileile (pointi isiyo na kikomo).

Hebu tufanye hili liwe halisi kwa mfano mdogo, uliothibitishwa kikamilifu.

### Mkunjo kamili, uliokokotolewa kwa usahihi

Chukua `y^2 = x^3 + 2x + 2` juu ya sehemu finiti `F_17`. Kukokotoa kila pointi halali kunatoa hasa **pointi 18, pamoja na pointi isiyo na kikomo = jumla ya 19.** Chache kati yake:

```
(0,6) (0,11) (3,1) (3,16) (5,1) (5,16) (6,3) (6,14) (7,6) (7,11) ...
```

Sasa chagua pointi `G = (5, 1)` na uendelee kuijumlisha yenyewe. Tazama kinachotokea (kila mstari hapa chini ulikokotolewa, haukukisiwa):

| Hatua | Pointi | Hatua | Pointi |
|---|---|---|---|
| `1G` | (5, 1) | `11G` | (13, 10) |
| `2G` | (6, 3) | `12G` | (0, 11) |
| `3G` | (10, 6) | `13G` | (16, 4) |
| `4G` | (3, 1) | `14G` | (9, 1) |
| `5G` | (9, 16) | `15G` | (3, 16) |
| `6G` | (16, 13) | `16G` | (10, 11) |
| `7G` | (0, 6) | `17G` | (6, 14) |
| `8G` | (13, 7) | `18G` | (5, 16) |
| `9G` | (7, 6) | `19G` | **O (isiyo na kikomo)** |
| `10G` | (7, 11) | | |

Mambo mawili ya kutambua:

- **Hutembelea pointi zote 18 finiti na kisha kutua kwenye `O`** katika hatua ya 19, kisha ingerudia milele. Pointi ya kuanzia `G` “huzalisha” kundi lote, kwa hivyo tunaipa jina **kizalishaji [generator]**.
- Ni kundi lililothibitishwa: kwa mfano `1G + 2G = (5,1) + (6,3) = (10,6)`, ambayo ni sawa kabisa na `3G`.  Ujumlishaji una uthabiti wa ndani, kama kundi linavyodai.

---

## 4. Mlango wa siri: kuzidisha skala

Jedwali hilo la `1G, 2G, 3G, ...` ndilo kiini cha kila kitu. Kujumlisha pointi yenyewe mara kwa mara huitwa **kuzidisha skala [scalar multiplication]**: pointi `kG` humaanisha “`G` iliyojumlishwa yenyewe mara `k`.”

Sasa uchawi. Zingatia pande mbili:

| Mwelekeo | Swali | Ugumu |
|---|---|---|
| **Mbele** | Kwa kupewa `k` na `G`, kokotoa `kG` | **Rahisi.** Hata kwa `k` kubwa sana kwa kiwango cha astronomia, mbinu iitwayo *double-and-add* hufika hapo kwa hatua mia chache |
| **Nyuma** | Kwa kupewa `G` na `kG`, pata tena `k` | **Haiwezekani kiutendaji** kwenye mkunjo halisi wa kriptografia |

Kutolingana huko ndiko **njia ya upande mmoja** tuliyohitaji katika Sehemu ya 1. Tatizo la kurudi nyuma (“ni `k` gani iliyozalisha pointi hii?”) huitwa **Tatizo la Logaritimu Tengefu ya Mkunjo wa Elliptiki (ECDLP)**, na kwenye mikunjo inayotumiwa na Zcash, hakuna mbinu inayojulikana inayolitatua kabla ya kifo cha joto cha ulimwengu.

![alt text](/content-images/image-12-86b9ace6cb.webp)

> Kwenye mkunjo wetu wa mfano wa `F_17` ungeweza kusoma tu `k` kutoka kwenye jedwali, kwa sababu una pointi 19 pekee. Mikunjo halisi ina takriban pointi `2^(255)`. Jedwali lingeweza kuwa na safu nyingi zaidi kuliko atomu zilizopo ulimwenguni, hivyo “kuisoma kutoka kwenye jedwali” si chaguo. Udogo ndio unaofanya mkunjo wa mfano uweze kufundishika na pia ndio sababu hauko salama.

---

## 5. Jinsi funguo huzaliwa (matokeo)

Sasa tuna kila kitu kinachohitajika kueleza ufunguo halisi wa kriptografia, na ni rahisi kwa kushangaza:

> **Chagua namba ya siri `k`. Chapisha pointi `kG`. Hiyo tu.**
> `k` ni **ufunguo wako binafsi [private key]**. `kG` ni **ufunguo wako wa umma**. Njia ya upande mmoja (ECDLP) inahakikisha hakuna anayeweza kurudisha `kG` hadi `k`.

Wazo hili moja, *ufunguo wa umma ni skala ya siri ikizidishwa na kizalishaji kisichobadilika*, ndilo mbegu ya funguo za kutumia pesa, funguo za kutazama, na anwani za Zcash. Mti kamili wa funguo huweka muundo zaidi juu yake, lakini kila tawi hukua kutoka kwenye mzizi huu.

### Ziada: kwa nini pointi za mkunjo hutengeneza commitments bora

Kumbuka “bahasha iliyofungwa” (commitment) kutoka Makala ya 0, ambayo ilipaswa **kuficha** yaliyomo lakini iwe **isiyowezekana kughushi**. Mikunjo ya elliptiki hutupatia njia safi ya kuijenga. Chukua pointi mbili za kizalishaji zisizobadilika, za umma `G` na `H`, thamani ya siri `v`, na namba ya uficheaji ya nasibu `r`, kisha unda:

```
Commitment  =  v.G  +  r.H
```

Hii ni **commitment ya Pedersen [Pedersen commitment]**, na ina sifa zote mbili tulizotaka:

- **Kuficha [Hiding]:** `r` ya nasibu hutawanya matokeo kwenye mkunjo wote, hivyo pointi haifichui chochote kuhusu `v`.
- **Kufunga [Binding]:** ECDLP hufanya isiwezekane kupata `(v, r)` *tofauti* inayotoa pointi ileile, hivyo huwezi kubadilisha mawazo yako kuhusu ulichojifunga nacho.

Sifa ya ziada inageuka kuwa yenye thamani kubwa baadaye: commitments hizi **hujumlishika**. Commitment ya `v_1` pamoja na commitment ya `v_2` ni commitment halali ya `v_1 + v_2`. Tabia hiyo ya “homomorphic” ndiyo jinsi Zcash itakavyothibitisha baadaye kwamba pesa zinazoingia *katika* muamala ni sawa na pesa zinazotoka, bila kufichua kiasi chochote. Tutaitumia karibu na Makala ya 6.

---

## 6. Mahali hili linapoishi katika Zcash

Alama zake ni mahususi na zinaweza kukaguliwa.

| Muundo wa Zcash | Mikunjo inayotumia | Jukumu |
|---|---|---|
| **Sapling** (ya zamani) | **BLS12-381** pamoja na mkunjo uliopachikwa uitwao **Jubjub** | BLS12-381 hubeba mfumo wa thibitisho; Jubjub imejengwa juu ya sehemu ya skala ya BLS12-381 ili operesheni za ufunguo na commitment ziwe nafuu kutekeleza *ndani* ya thibitisho la maarifa sifuri [zero-knowledge proof] |
| **Orchard** (ya sasa) | **Pallas** na **Vesta** (mzunguko wa “Pasta”) | Pallas hubeba funguo na commitments za Orchard; uoanishaji wa Pallas/Vesta umepangwa mahsusi kufanya mathibitisho ya hali ya juu yawe yenye ufanisi |

Sababu zinazofanya mkunjo mmoja “upachikwe” ndani ya sehemu ya mwingine, na kwa nini *mzunguko* wa mikunjo miwili ni muhimu, ni halisi na muhimu, lakini ni za makala za mfumo wa thibitisho. Kwa sasa hitimisho ni thabiti: **kila ufunguo wa Zcash ni skala mara kizalishaji, na kila commitment ya Zcash ni jumla ya pointi za mkunjo**, zikiishi kwenye mojawapo ya mikunjo hii iliyopewa majina.

![alt text](/content-images/image-13-ffdd703c60.webp)

---

## 7. Kanusho la uaminifu

Mambo machache ya kurahisisha yaliweka hili lisomeke. Tulitumia umbo la **short Weierstrass** (`y^2 = x^3 + ax + b`); mikunjo ya Zcash mara nyingi huandikwa kwa maumbo mengine sawia (Jubjub ni mkunjo wa *twisted Edwards*) yaliyochaguliwa kwa ufanisi na usalama, lakini wazo la kundi ni lilelile. Hatukufafanua formula kamili za kujumlisha pointi (ni toleo la kialjebra la “makutano ya tatu, kisha akisi”), na tuliweka pembeni undani kama mpangilio wa mkunjo, cofactors, na “pairings,” ambavyo huwa muhimu katika makala za mfumo wa thibitisho. Hakuna kati ya haya yanayobadilisha utambuzi; huyafanya kuwa makali zaidi.

---

## 8. Muhtasari

- Mfumo wa faragha unahitaji **njia ya upande mmoja**: rahisi kwenda mbele, isiyowezekana kurudi nyuma. Mikunjo ya elliptiki hutoa hiyo.
- **Mkunjo wa elliptiki** ni mkusanyiko wa pointi zinazotimiza `y^2 = x^3 + ax + b`, na pointi zake zinaweza **kujumlishwa** kupitia kanuni ya kijiometri ya **kamba-na-tanjenti**, huku **pointi isiyo na kikomo** maalumu ikifanya kazi kama sifuri.
- Juu ya **sehemu finiti** mkunjo huwa mtawanyiko wa nukta, lakini ujumlishaji uleule bado hufanya kazi na pointi huunda **kundi**. (Mfano uliothibitishwa: `y^2 = x^3 + 2x + 2` juu ya `F_17` una pointi 19, na `G = (5,1)` huzalisha zote.)
- **Kuzidisha skala** `kG` ni rahisi kukokotoa lakini haiwezekani kurudisha nyuma: **ECDLP**. Huo ndio mlango wa siri.
- **Funguo:** ufunguo binafsi `k`, ufunguo wa umma `kG`. **Commitments:** umbo la Pedersen `v.G + r.H`, ambalo huficha, hufunga, na kwa urahisi **hujumlishika**.
- Katika **Zcash**, Sapling hutumia **BLS12-381 + Jubjub** na Orchard hutumia mikunjo ya **Pallas/Vesta (Pasta)**; kila ufunguo na commitment huishi kwenye hiyo.

---

## Kamusi

| Istilahi | Maana kwa lugha rahisi |
|---|---|
| **Elliptic curve** | Pointi zinazotimiza `y^2 = x^3 + ax + b`, zikiwa na “ujumlishaji” maalumu wa pointi |
| **Point addition** | Kanuni ya kamba-na-tanjenti: mstari kupitia pointi mbili, chukua mguso wa tatu, akisi |
| **Point at infinity (`O`)** | “Sifuri” ya mkunjo; kuijumlisha hakubadilishi chochote |
| **Generator (`G`)** | Pointi ya msingi ambayo vizidisho vyake hatimaye hufunika kundi lote |
| **Scalar multiplication (`kG`)** | Kujumlisha `G` yenyewe mara `k`; rahisi kwenda mbele, vigumu kurudisha nyuma |
| **ECDLP** | Tatizo gumu la kupata tena `k` kutoka `kG`; msingi wa usalama |
| **Pedersen commitment** | `v.G + r.H`; bahasha iliyofungwa inayoficha, kufunga, na kujumlishika |

---

## Maswali Yanayoulizwa Mara kwa Mara

**Kwa nini mikunjo badala ya namba kubwa tu mod namba ya kwanza?**
Vyote vinaweza kutoa njia ya upande mmoja, lakini mikunjo ya elliptiki hupata usalama uleule kwa funguo ndogo zaidi na operesheni za haraka zaidi, na hesabu yake ya pointi inafaa kwa commitments.

**Je, ECDLP imethibitishwa kuwa gumu?**
Haijathibitishwa kuwa haiwezekani, lakini miongo kadhaa ya juhudi kubwa haijapata shambulio lenye ufanisi dhidi ya mikunjo iliyochaguliwa vizuri. Usalama hutegemea dhana hiyo iliyojaribiwa vizuri.

**Je, kompyuta ya kwanta inaweza kuvunja hili?**
Kompyuta ya kwanta iliyo kubwa vya kutosha inaweza kuvunja ECDLP. Hilo ni suala linalojulikana la muda mrefu katika sekta nzima na eneo hai la utafiti; mikunjo ya leo hubaki salama dhidi ya kompyuta za kawaida.

**Kwa nini Zcash hutumia zaidi ya mkunjo mmoja?**
Majukumu tofauti. Mkunjo mmoja hubeba mfumo wa thibitisho la maarifa sifuri; mwingine (uliopachikwa kwenye sehemu ya wa kwanza) hufanya operesheni za ufunguo na commitment ndani ya thibitisho ziwe zenye ufanisi. Makala zinazofuata zinaeleza kwa nini uoanishaji huo ni muhimu.

---

### Jaribu utambuzi wako

Kwa kutumia jedwali lililothibitishwa katika Sehemu ya 3, `9G + 10G` ni nini kwenye mkunjo wetu wa mfano? Na jibu linakuambia nini kuhusu `G`? *(Jibu hapa chini.)*

<details><summary>Jibu</summary>

`9 + 10 = 19`, na tuliona kwamba `19G = O`, pointi isiyo na kikomo. Hivyo `9G + 10G = O`. Hii inamaanisha `10G` ni **kinyume hasi [negative]** (kinyume cha kijumlisha) cha `9G`: pointi mbili zinazojumlishwa hadi pointi ya “sifuri.” Kwenye mkunjo, kinyume hasi cha pointi ni taswira yake tu kwenye mhimili wa x, na kwa kweli `9G = (7,6)` na `10G = (7,11)` zina `x` sawa na zina thamani za `y` zinazojumlisha hadi `17 = 0 (mod 17)`. Muundo una uthabiti kamili, ambalo ndilo hasa linalohakikishwa na “ni kundi.”
</details>

---

### Kinachofuata

**Makala ya 3 . Hashing na commitments:** tutafungua vizuri “bahasha ya kichawi iliyofungwa.” Sasa umeona njia moja ya kujenga commitment kutoka pointi za mkunjo; inayofuata tunauliza maana halisi ya kuficha na kufunga, tunakutana na functions za hash, na kuunganisha vyote na commitments za dokezo zinazotia nanga kila malipo ya Zcash.

*Sehemu ya mfululizo wa* Zcash kutoka Kanuni za Msingi *kwa ajili ya [ZecHub](https://zechub.org). Imepewa leseni ya CC BY-SA 4.0.*
