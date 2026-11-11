# Sehemu zenye Kikomo: Mfumo wa Namba Ambamo Kriptografia Huishi
##### Utafiti Asilia kutoka [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-5-6e8a8950f8.webp)

### Kwa nini “kuzunguka” ndio msingi wa siri wa Zcash

> **Mfululizo:** *Zcash kuanzia Kanuni za Msingi* . **Makala ya 1 . Sehemu zenye Kikomo**
> **Walengwa:** wanaoanza. Tunachukulia kuwa unajua tu hesabu za kawaida za shuleni (kujumlisha, kuzidisha, kugawanya). Hakuna ujuzi wa awali wa kriptografia au hisabati ya juu unaohitajika.
> **Utachobaki nacho:** uelewa wa kiintuitivu na sahihi wa sehemu zenye kikomo, kwa nini wanakriptografia huzitumia, na mahali zinapoonekana ndani ya Zcash.

Katika [Makala ya 0](article-0-shielded-transaction.md) tulikutana na wahusika watano: dokezo [note], commitment, mti wa commitment wa dokezo, nullifier, na thibitisho la maarifa sifuri [zero-knowledge proof]. Tuliacha swali lisilojibiwa: *funguo zote na mbinu za siri hutoka wapi hasa?* Hutoka kwenye namba. Lakini si namba za kawaida ulizokulia nazo. Hutoka kwenye mfumo maalumu wa namba unaojitosheleza unaoitwa **uga wenye kikomo [finite field]**, na karibu kila sehemu ya kriptografia katika Zcash imejengwa juu yake.

Makala hii inajenga wazo hilo polepole. Kama tulivyoahidi, kiintuisheni kwanza. Hakuna fomula hadi zitakapokuwa na manufaa.

---

## 1. Kwa nini ujali?

Namba za kawaida zina tatizo kwa kriptografia: zipo zisizo na kikomo, na hufichua taarifa.

Fikiria kinachotokea namba inapokuwa *kubwa zaidi*. Nikikuambia hesabu ya siri ilitoa `8,142,067`, tayari unajua mengi: ni namba yenye tarakimu saba, ni witiri, na ni “kubwa kwa kiasi.” Ukubwa ni kidokezo. Na vidokezo ndivyo hasa mfumo wa faragha hauwezi kumudu kutoa.

Kriptografia inahitaji mfumo wa namba ambapo:

- kuna thamani **zenye kikomo**, ili kompyuta iweze kuhifadhi yoyote kati yake kwa usahihi bila kukadiria au kufurika,
- thamani **hazifichui ukubwa wake**, kwa sababu mfumo hauna dhana halisi ya “kubwa zaidi,”
- bado unaweza **kujumlisha, kutoa, kuzidisha, na kugawanya** kwa uhuru na kwa kurejesheka, kwa sababu mbinu za kriptografia zinahitaji aljebra halisi ili zifanye kazi, na
- nafasi inaweza kufanywa kuwa **kubwa kupita kiasi**, ili kubahatisha kusiwe na matumaini.

Orodha hiyo ya matamanio ina jina. Ni **uga wenye kikomo**. Hebu tujenge intuisheni yake kabla ya kuandika alama hata moja.

---

## 2. Intuisheni: saa

Tayari unatumia uga wenye kikomo kila siku. Ni saa iliyo ukutani kwako.

Kwenye saa ya saa 12, namba *huzunguka*. Anza saa 10, ongeza saa 5, na hufiki “saa 15,” bali unafika **saa 3**. Saa ina nafasi kumi na mbili pekee, na kuhesabu kupita kilele hurudi tu mwanzo.

![alt text](/content-images/image-9-30b39f4cc5.webp)

Mambo matatu yametokea sasa ambayo ndiyo kiini cha makala hii:

1. **Ulimwengu una kikomo.** Kuna nafasi kumi na mbili hasa, haijalishi unahesabu kwa muda gani.
2. **Kujumlisha bado hufanya kazi.** Unaweza kuongeza saa siku nzima; daima unafika kwenye nafasi halali ya saa.
3. **Ukubwa haukuwa muhimu tena.** “Saa 3” haikuambii kama ulihesabu saa 3 au 15 au 27. Kuzunguka *kumeondoa taarifa ya ukubwa.* Kuondoa huko ndicho hasa sifa rafiki kwa faragha tulichotaka.

Hesabu hii ya kuzunguka ina jina rasmi: **hesabu moduli [modular arithmetic]**. Saa hufanya kazi “modulo 12,” huandikwa **mod 12**. Wanahisabati hupendelea kuhesabu nafasi kuanzia 0, kwa hiyo “saa mod 12” kwa kweli ina nafasi `0, 1, 2, ..., 11`. Saa mod 7 ingekuwa na nafasi `0` hadi `6`.

> **Kanuni moja:** ili kuhesabu kitu chochote “mod p,” fanya hesabu ya kawaida, kisha gawa kwa `p` na ubaki na masalio pekee.
> Mfano mod 7: `5 + 4 = 9`, na `9` huacha salio `2` baada ya kugawanywa kwa `7`, kwa hiyo `5 + 4 = 2 (mod 7)`.

---

## 3. Kutoka saa hadi uga

Saa hutuwezesha kujumlisha. **Uga** ni toleo lililoboreshwa: mfumo wa namba ambamo vitendo vyote vinne hufanya kazi, ikiwemo kigumu, kugawanya.

Kwa maelezo yasiyo rasmi, **uga** ni mkusanyiko wowote wa “namba” ambamo unaweza **kujumlisha, kutoa, kuzidisha, na kugawanya** (kwa chochote isipokuwa sifuri), na kanuni zote zinazofahamika bado zinashikilia: mpangilio haujalishi katika kujumlisha au kuzidisha, mabano yanaweza kupangwa upya, kuna `0` na `1`, na kila namba ina hasi na (isipokuwa `0`) kinyume chake.

Namba za uwiano ni uga. Namba halisi ni uga. Tunachotaka ni uga *wenye kikomo*.

Haya ndiyo matokeo makuu, na ni mazuri:

> **Chukua namba kamili `0, 1, ..., p-1` na ufanye hesabu zote mod `p`. Ikiwa `p` ni namba tasa, matokeo ni uga wenye kikomo.** Tunauandika `F_p` (husomwa “F chini ya p”).

Kwa hiyo `F_7 = {0, 1, 2, 3, 4, 5, 6}` yenye hesabu ya mtindo wa saa mod 7 ni uga wenye kikomo halisi. Hebu tuuone ukifanya kazi.

### Kuzidisha katika F_7 (kumethibitishwa)

Kila ingizo ni `(row x column) mod 7`:

| x | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| **0** | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **1** | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| **2** | 0 | 2 | 4 | 6 | 1 | 3 | 5 |
| **3** | 0 | 3 | 6 | 2 | 5 | 1 | 4 |
| **4** | 0 | 4 | 1 | 5 | 2 | 6 | 3 |
| **5** | 0 | 5 | 3 | 1 | 6 | 4 | 2 |
| **6** | 0 | 6 | 5 | 4 | 3 | 2 | 1 |

Tazama safu za `1` hadi `6`: kila moja ina kila thamani isiyo sifuri `1..6` mara moja hasa. Muundo huo wa “hakuna marudio, hakuna kinachokosekana” ni alama inayoonekana ya uga.

### Kugawanya: uchawi unaohitaji namba tasa

Kugawanya ni “kuzidisha kwa kinyume.” Katika `F_7`, kinyume (au **inverse**) cha namba `a` ni thamani `a^(-1)` ambayo `a x a^(-1) = 1`. Tukiyachukua moja kwa moja kutoka kwenye jedwali:

| `a` | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| `a⁻¹` | 1 | 4 | 5 | 2 | 3 | 6 |

Hakiki moja: `2 x 4 = 8 = 1 (mod 7)`. Kwa hiyo “gawanya kwa 2” katika `F_7` inamaanisha “zidisha kwa 4.” Kila elementi isiyo sifuri ina mwenzi. **Hicho ndicho kinachofanya `F_7` kuwa uga.**

---

## 4. Kwa nini moduli lazima iwe tasa

Hili ndilo wazo muhimu zaidi katika makala hii, kwa hiyo hebu tulifanye la kivitendo badala ya dhahania.

Tazama kinachoharibika tukijaribu kwa urahisi kujenga “uga” mod `6` (na `6` *si* tasa):

> Je, kuna `x` yoyote ambayo `2 x x = 1 (mod 6)`? Tukizikagua zote: `2x0=0, 2x1=2, 2x2=4, 2x3=0, 2x4=2, 2x5=4`. **Jibu `1` halitokei kamwe.** Kwa hiyo `2` haina kinyume mod 6. Mbaya zaidi, `2 x 3 = 6 = 0 (mod 6)`: namba mbili zisizo sifuri zilizidishwa na kutoa sifuri.

Sentensi hiyo ya pili ni janga kwa hesabu. Vitu viwili visivyo sifuri kuzidishwa na kutoa sifuri (vinavyoitwa **kigawanyaji sifuri [zero divisor]**) kunamaanisha kugawanya kumeharibika, na mfumo wenye kugawanya kilichoharibika si uga. Hutokea hasa kwa sababu `6` inaweza kugawanywa kuwa `2 x 3`.

Namba tasa, kwa ufafanuzi, haina vigawanyaji kama hivyo. Kwa hiyo mod namba tasa, hakuna vigawanyaji sifuri vinavyoweza kutokea, kila elementi isiyo sifuri hupata kinyume safi, na muundo huo ni uga sahihi.

![alt text](/content-images/image-8-573914db92.webp)

> **Sentensi moja inayoweza kutumika tena katika makala zako:** *moduli tasa ikiingia, ugawanyaji safi hutoka.*

---

## 5. Fomula moja inayofaa kuifahamu: jinsi kompyuta hupata vinyume

Tulisoma vinyume kutoka kwenye jedwali kwa `F_7`, lakini namba tasa ya Zcash ina mamia ya tarakimu; hakuna jedwali linalowezekana. Kuna njia ya mkato maarufu, na ndiyo fomula pekee katika makala hii.

**Nadharia Ndogo ya Fermat** inasema kwamba kwa namba tasa `p` na `a` yoyote isiyo sifuri:

```
a^(p-1) = 1   (mod p)
```

Ipange upya (ondoa kipengele kimoja cha `a`) na unapata kinyume bila gharama:

```
a^(-1) = a^(p-2)   (mod p)
```

Ijaribu katika `F_7` (`p = 7`, kwa hiyo `p - 2 = 5`): kinyume cha `2` kinapaswa kuwa `2^5 = 32 = 4 (mod 7)`. Na kwa kweli jedwali letu lilisema `2^(-1) = 4`. Kompyuta hupandisha namba kwa vipeo vikubwa kwa kasi sana, kwa hiyo hii hubadilisha “pata kinyume” kuwa hesabu ya haraka na sahihi hata kwa namba tasa kubwa sana.

Huhitaji kukariri hili. Unahitaji kujua kwamba **kugawanya katika uga wenye kikomo ni tendo la haraka na sahihi**, na ndiyo hasa sababu wanakriptografia wanafurahia kujenga juu yake.

---

## 6. Kwa nini kriptografia ilizipenda sana sehemu zenye kikomo

Tukiunganisha intuisheni, hapa kuna hoja yote kwenye ukurasa mmoja.

| Sifa ya `F_p` | Kwa nini mfumo wa faragha huitaka |
|---|---|
| **Yenye kikomo** | Kompyuta huhifadhi elementi yoyote kwa usahihi; hakuna kukadiria, kufurika, au ukungu wa namba za nukta zinazoelea |
| **Kuzunguka** | Hufuta “ukubwa,” kwa hiyo thamani haifichui chochote kuhusu jinsi ilivyotolewa |
| **Vitendo vyote vinne hufanya kazi** | Mbinu za kriptografia (funguo, commitments, thibitisho) zinahitaji aljebra halisi, si kuhesabu pekee |
| **Ukubwa unaoweza kuchaguliwa** | Chagua namba tasa ya biti 255 au biti 381 na uga una elementi nyingi kuliko atomi zilizopo katika ulimwengu unaoweza kuonekana; kubahatisha hakutakuwa na matumaini |
| **Sahihi na bainifu** | Wahusika wawili waaminifu wanaohesabu kitu kilekile hupata matokeo yanayofanana daima, jambo ambalo thibitisho hutegemea |

Uga wenye kikomo ni, kwa maneno machache, **uwanja wa michezo uliofungwa kikamilifu, sahihi kikamilifu, na mkubwa kupita kiasi kwa hesabu.** Kila kitu kingine katika Zcash hujengwa kwa kucheza ndani yake.

---

## 7. Mahali hili linapoishi katika Zcash

Huhitaji kuamini tu kwamba “Zcash hutumia sehemu zenye kikomo.” Hapa kuna ramani halisi (mitambo ya kina ni ya makala zijazo; hii ni kuonyesha tu kwamba alama hizo ni halisi).

- **Sapling** (muundo wa zamani wa faragha) hujenga thibitisho zake juu ya mviringo unaoitwa **BLS12-381**, ambao uga wake wa msingi hutumia namba tasa yenye urefu wa **biti 381**. Kila kiolezo, ufunguo, na elementi ya thibitisho ni elementi ya uga wenye kikomo uliojengwa juu ya namba tasa hiyo.
- **Orchard** (muundo wa sasa wa faragha) hutumia jozi ya miviringo iitwayo **Pallas and Vesta** (miviringo ya “Pasta”), ambayo sehemu zake hutumia namba tasa zenye urefu wa takribani **biti 255**.
- **Commitment ya dokezo**, **nullifier**, na namba zilizo ndani ya **thibitisho la maarifa sifuri** kutoka Makala ya 0 zote, kimsingi, ni elementi za mojawapo ya sehemu hizi zenye kikomo. Itifaki inaposema “hesabu commitment hii,” inamaanisha “fanya hesabu hii mod namba tasa hiyo.”

![alt text](/content-images/image-7-c81fe982f0.webp)

Kwa hiyo jibu la swali wazi la Makala ya 0, *“mbinu za siri hutoka wapi?”*, linaanza hapa: **kila kitu huanza kama hesabu katika uga wenye kikomo.** Katika makala inayofuata tutachukua uga huo na kujenga vitu halisi, pointi kwenye mviringo wa duaradufu, ambazo huwa funguo na commitments.

---

## 8. Kanusho la uaminifu

Ili kubaki rafiki kwa wanaoanza, tulirahisisha mambo machache ya kweli. Sehemu zenye kikomo haziji tu katika umbo la `F_p`; unaweza pia kujenga sehemu zenye elementi `p^n` (zinazoitwa **sehemu za upanuzi [extension fields]**), na hizo ni muhimu kwa “pairings” ambazo mfumo wa thibitisho wa Sapling hutegemea. Pia tuliruka orodha kamili ya aksiomu za uga na kupita haraka jinsi namba tasa za ukubwa huu huchaguliwa na kuthibitishwa. Hakuna kati ya hayo yanayobadilisha intuisheni uliyo nayo sasa; yanaiweka sahihi zaidi. Tutarudisha usahihi huo, kwa alama, wakati makala ya baadaye itakapouhitaji.

---

## 9. Muhtasari

- Kriptografia inahitaji mfumo wa namba ambao ni **wenye kikomo, sahihi, usiojali ukubwa, unaoweza kugeuzwa kikamilifu, na mkubwa sana.** Mfumo huo ni **uga wenye kikomo**.
- Intuisheni ni **saa**: hesabu ambayo **huzunguka** (hesabu moduli), na kwa urahisi hufuta “ukubwa” wa namba.
- Kufanya hesabu kwa namba `0..p-1` mod namba tasa `p` hutoa uga halisi `F_p`, ambamo unaweza pia **kugawanya** kwa sababu kila elementi isiyo sifuri ina kinyume.
- Moduli **lazima iwe tasa**: moduli changamano huunda vigawanyaji sifuri (kama `2 x 3 = 0 mod 6`) na huharibu kugawanya.
- Kompyuta hupata vinyume haraka kupitia **Nadharia Ndogo ya Fermat** (`a^(-1) = a^(p-2)`).
- Katika **Zcash**, kila ufunguo, commitment, nullifier, na elementi ya thibitisho hatimaye ni elementi ya uga mkubwa wenye kikomo (sehemu za Pasta za biti 255 kwa Orchard, uga wa biti 381 kwa BLS12-381 ya Sapling).

---

## Faharasa

| Neno | Maana kwa lugha rahisi |
|---|---|
| **Modular arithmetic** | Hesabu inayozunguka baada ya kufikia thamani maalumu, kama saa |
| **mod p** | “Gawa kwa `p` na ubaki na salio” |
| **Field** | Mfumo wa namba ambamo kujumlisha, kutoa, kuzidisha, na kugawanya vyote hufanya kazi |
| **Finite field `F_p`** | Namba `0..p-1` zenye hesabu inayofanywa mod namba tasa `p` |
| **Inverse (reciprocal)** | Elementi `a^(-1)` ambayo `a x a^(-1) = 1`; “kugawanya kwa `a`” kunamaanisha kuizidisha nayo |
| **Zero divisor** | Thamani mbili zisizo sifuri ambazo zao ni sifuri; kitu kinachoharibu moduli changamano |
| **Prime** | Namba kamili kubwa kuliko 1 isiyo na vigawanyaji isipokuwa 1 na yenyewe |

---

## Maswali Yanayoulizwa Mara kwa Mara

**Kwa nini tusitumie tu namba kamili au desimali za kawaida?**
Desimali hukadiria na kupotoka; namba kamili hukua bila kikomo na hufichua ukubwa. Sehemu zenye kikomo ni sahihi, zina mipaka, na hazijali ukubwa, ambavyo kriptografia inahitaji.

**Je, “kuzunguka” kunapoteza taarifa?**
Kwa makusudi, ndiyo. Kufuta ukubwa wa thamani za kati ni sifa, si hitilafu, kwa faragha.

**Je, namba tasa kubwa zaidi huwa salama zaidi daima?**
Kwa ujumla, uga mkubwa zaidi unamaanisha thamani zinazowezekana zaidi na kubahatisha kwa ugumu zaidi, lakini usalama hutegemea muundo mzima, si ukubwa wa uga pekee. Makala za baadaye zitafafanua hili kwa usahihi.

**Kwa nini namba tasa hizi maalumu (biti 255, biti 381) katika Zcash?**
Huchaguliwa ili miviringo inayojengwa juu yake iwe na muundo na ufanisi unaofaa kwa mfumo wa thibitisho. “Muundo unaofaa” huo ndio mada ya makala mbili zinazofuata.

---

### Jaribu intuisheni yako

Katika `F_7`, `5 - 6` ni nini? (Kumbuka: baki ndani ya `{0,...,6}` kwa kuzunguka.) *(Jibu hapa chini.)*

<details><summary>Jibu</summary>

`5 - 6 = -1`, na `-1` ikizungushwa ndani ya `F_7` ni `6` (kwa sababu `6 + 1 = 7 = 0`). Kwa hiyo `5 - 6 = 6 (mod 7)`. Kutoa hakuondoki kamwe kwenye uga; kunazunguka tu upande mwingine.
</details>

---

### Kinachofuata

**Makala ya 2 . Miviringo ya duaradufu:** tunachukua uga wenye kikomo tulioujenga sasa na kuutumia kuchora aina ya ajabu ya mviringo ambao pointi zake zinaweza “kujumlishwa” pamoja. Pointi hizo huwa funguo na commitments za Zcash, na huficha mtego wa njia moja unaowezesha mfumo mzima wa faragha. Intuisheni kwanza, kama kawaida.

*Sehemu ya* mfululizo wa Zcash kuanzia Kanuni za Msingi *kwa [ZecHub](https://zechub.org). Imepewa leseni ya CC BY-SA 4.0.*
