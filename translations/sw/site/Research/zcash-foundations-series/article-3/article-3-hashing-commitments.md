# Hashing na Commitment: Bahasha ya Kiajabu Iliyofungwa
##### Utafiti Asilia kutoka kwa [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-15-0c16784b27.webp)

### Jinsi ya kufunga siri hadharani na usiweze kamwe kudanganya kuihusu

> **Mfululizo:** *Zcash kutoka Kanuni za Msingi* . **Makala ya 3 . Hashing na Commitment**
> **Hadhira:** wanaoanza. Tunajenga juu ya [Makala ya 1 (nyuga zenye kikomo)](article-1-finite-fields.md) na [Makala ya 2 (mikondo duaradufu)](article-2-elliptic-curves.md), lakini intuisheni inajitegemea.
> **Utakachobaki nacho:** ufahamu wazi wa vitendakazi vya hash [hash functions], maana halisi ya “kuficha” na “kufunga,” na jinsi Zcash hutengeneza commitment za dokezo zinazotia nanga kila malipo ya faragha [private payment].

Katika [Makala ya 0](article-0-shielded-transaction.md) tulieleza “bahasha ya kiajabu iliyofungwa”: kitu unachoweza kubandika kwenye ubao wa umma kinachothibitisha kuwa bahasha ipo huku kikificha kilichomo, na ambacho huwezi kamwe kukibadilisha baadaye. Tuliahidi kueleza jinsi kitu kama hicho kinavyowezekana. Hii ndiyo makala hiyo. Tunahitaji viambato viwili: **vitendakazi vya hash** na **commitment**.

---

## 1. Kwa nini ujali?

Fikiria unatabiri matokeo ya uchaguzi na unataka kuthibitisha, *baadaye*, kwamba uliyatabiri mapema. Huwezi kutangaza tu utabiri wako (hilo huathiri watu, au hualika tuhuma kwamba uliubadilisha). Pia huwezi kuuweka siri kabisa (basi huwezi kuthibitisha chochote baadaye).

Unachotaka ni njia ya **kufunga thamani sasa, hadharani, hivi kwamba:**

- hakuna anayeweza kujua ulichofunga (kinabaki siri kwa sasa), na
- baadaye, utakapoifichua, **huwezi kudanganya** kuhusu ilivyokuwa.

Kifaa hiki cha “funga sasa, fichua baadaye, bila udanganyifu” huitwa **commitment**, na kipo kila mahali katika Zcash. Thamani na mmiliki wa dokezo hufungwa katika commitment wakati dokezo linapoundwa. Ili kujenga commitment, kwanza tunahitaji farasi wake wa kazi: kitendakazi cha hash.

---

## 2. Intuisheni: alama ya kidole ya data

**Kitendakazi cha hash** huchukua data yoyote ile, herufi moja au maktaba nzima, na kuibana hadi kuwa mfuatano mfupi wa ukubwa usiobadilika unaoitwa **digest** au **hash**. Kifikirie kama **alama ya kidole ya data.**

![alt text](/content-images/image-16-52fdf62c87.webp)

Alama nzuri ya kidole ya kriptografia ina sifa nne. Zichukulie kama intuisheni, si milinganyo:

| Sifa | Maana rahisi | Kwa nini ni muhimu |
|---|---|---|
| **Inayobainika** | Ingizo lilelile daima hutoa alama ileile ya kidole | Unaweza kukagua upya alama ya kidole wakati wowote |
| **Husonga mbele kwa haraka** | Kuhesabu alama ya kidole ni haraka | Ni rahisi kutumika kila mahali |
| **Ya njia moja (sugu kwa preimage)** | Ukipewa alama ya kidole, huwezi kupata ingizo lililoitengeneza | Huficha data asilia |
| **Sugu kwa collision** | Huwezi kupata maingizo mawili tofauti yenye alama ileile ya kidole | Hakuna anayeweza kughushi ulinganifu |

Na kuna tabia moja zaidi inayofanya alama za vidole zionekane karibu za kiajabu:

### Athari ya maporomoko (imethibitishwa)

Badilisha ingizo kwa kiasi kidogo kabisa na alama ya kidole hubadilika *kabisa*, bila kufanana na ya zamani. Hizi hapa ni alama mbili halisi za SHA-256 za ujumbe zinazotofautiana kwa herufi moja:

```
H("Pay Bob 5 ZEC") = 6e2dc1a954c70cc865f18ea8cb70b7b56eeaf6ca42b380824a55d65dc342f34b
H("Pay Bob 6 ZEC") = 76abc346d8d3053f76a9ae18b617af71f02729a73ec6a51732d2d94934e4217f
```

Kati ya tarakimu 64 za hex, **59 ni tofauti.** Herufi moja ikiingia, alama ya kidole isiyohusiana kabisa hutoka. Hii ndiyo sababu huwezi kusogeza ingizo kuelekea alama ya kidole lengwa: hakuna ishara ya “joto zaidi / baridi zaidi” ya kufuata.

---

## 3. Kutoka alama ya kidole hadi commitment

Hili hapa wazo la kuvutia lakini lililoharibika: ili kufunga thamani ya siri `v`, chapisha tu alama yake ya kidole `H(v)`.

Hii *inakufunga* vizuri (huwezi baadaye kudai `v` tofauti, kwa sababu hilo lingehitaji collision). Lakini **inashindwa kuficha.** Ikiwa seti ya thamani zinazowezekana ni ndogo, mshambuliaji huweka tu alama ya kidole kwa kila chaguo na kulinganisha. Unafunga “ndiyo” au “hapana”? Anafanya hash kwa zote mbili na kujua mara moja uliyochagua. Ubainikaji, rafiki yetu muda mfupi uliopita, sasa unavuja siri.

Suluhisho ni neno moja: **unasibu.**

> **Commitment ni alama ya kidole ya thamani yako iliyochanganywa na nambari nasibu mpya:**
> `commitment = H(v, r)` ambapo `r` ni thamani ya siri nasibu ya “kufifisha.”

Sasa `v` ileile hutoa commitment yenye mwonekano tofauti kila wakati, kwa sababu `r` ni tofauti. Sifa mbili tulizotaka hatimaye zote zinatimia:

![alt text](/content-images/image-17-3ec4617665.webp)

Ili **kufungua** (kufichua) commitment baadaye, unachapisha `v` na `r`; mtu yeyote huhesabu upya `H(v, r)` na kukagua kuwa inalingana. Umefungwa. Hiyo ndiyo bahasha ya kiajabu iliyofungwa kutoka Makala ya 0, iliyofanywa kuwa halisi.

> **Mambo mawili ya kukumbuka milele:** *kufunga* hutokana na hash kuwa sugu kwa collision; *kuficha* hutokana na kigezo nasibu cha kufifisha `r`.

---

## 4. Njia mbili za kujenga bahasha

Kuna mapishi mawili ya kawaida, na Zcash hutumia yote mawili.

| | **Commitment inayotegemea hash** | **Commitment ya Pedersen** (kutoka Makala ya 2) |
|---|---|---|
| Mapishi | `H(v, r)` | `v.G + r.H` (pointi kwenye mkunjo) |
| Kuficha hutokana na | `r` nasibu | `r` nasibu |
| Kufunga hutokana na | usugu kwa collision | mtego wa mkunjo duaradufu (ECDLP) |
| Nguvu maalumu | rahisi na haraka | commitment **hujumlishika** (homomorphic) |

Safu hiyo ya mwisho ndiyo sababu commitment za Pedersen ni muhimu sana katika Zcash. Kwa sababu `commit(v_1) + commit(v_2)` ni `commit(v_1 + v_2)` halali, itifaki inaweza baadaye kuthibitisha kwamba **pesa zinazoingia ni sawa na pesa zinazotoka** kwa kujumlisha commitment pamoja, yote hayo bila kufichua kiasi hata kimoja. Tunahifadhi ukweli huo kwa ajili ya Makala ya 6.

---

## 5. Ujanja unaounda Zcash yote: hashing rafiki kwa ZK

Huu hapa ni ufahamu ambao utangulizi mwingi hukosa, na ndio hasa hoja ya “hisabati hukutana na uhandisi” inayofaa kusisitizwa.

SHA-256 ni alama bora kabisa ya kidole kwa kompyuta za kila siku. Lakini Zcash haihesabu tu hash; inapaswa **kuthibitisha, ndani ya thibitisho la maarifa sifuri [zero-knowledge proof], kwamba hash ilihesabiwa kwa usahihi** (Makala ya 5 inaeleza kwa nini). Na hapa kuna tatizo: thibitisho la maarifa sifuri hufanya kazi katika lugha ya **hesabu za nyuga zenye kikomo** (Makala ya 1), ilhali SHA-256 imejengwa kwa operesheni za kubadilisha biti (shifts, ANDs, XORs). Kueleza ubadilishaji huo wote wa biti katika hesabu za nyuga ni ghali sana, na kufanya mathibitisho kuwa makubwa na polepole.

Kwa hiyo wanakryptografia wa Zcash walibuni vitendakazi vya hash ambavyo sehemu zake za ndani *tayari* ni hesabu za nyuga, na hivyo kuwa rahisi kuthibitisha:

![alt text](/content-images/image-18-89ade807ad.webp)

Shinikizo hili moja la uhandisi, *“lazima iwe nafuu kuthibitisha,”* ndilo sababu Zcash ilibuni na kutumia vitendakazi maalumu vya hash badala ya kutumia SHA-256 kila mahali.

---

## 6. Ambapo hili lipo katika Zcash

Zcash imetumia hash tofauti katika miundo yake, kila moja ikichaguliwa kwa kazi husika:

| Muundo | Hash zilizotumika | Wapi |
|---|---|---|
| **Sprout** (wa mwanzo kabisa) | **SHA-256** | Commitment za dokezo na mti |
| **Sapling** | **Hash za Pedersen**, pamoja na **BLAKE2** | Pedersen kwa commitment za dokezo na mti wa Merkle; BLAKE2 kwa utokaji wa funguo na nullifier |
| **Orchard** (wa sasa) | **Sinsemilla**, pamoja na **Poseidon** | Sinsemilla kwa commitment za dokezo na mti wa Merkle; Poseidon kwa nullifier, zote zikiwa zimeundwa kwa saketi za hesabu |

Majina ya kutambua ni **Pedersen** na **Sinsemilla** (hash za mtindo wa commitment zilizojengwa kutoka pointi za mkunjo, hivyo hurithi uwezo wa “kujumlishika” na kuthibitishwa kwa gharama nafuu) na **Poseidon** (hash ya hesabu za nyuga iliyoundwa mahsusi kwa saketi za maarifa sifuri). Makala ya 0 iliposema yaliyomo kwenye dokezo yamefungwa ndani ya commitment, *hii* ndiyo mitambo inayofanya ufungaji huo.

Kwa hiyo mzunguko wazi kutoka Makala ya 0, *“bahasha iliyofungwa inawezaje kuficha yaliyomo lakini isiwezekane kuighushi?”*, sasa umefungwa: **kuficha hutokana na kigezo nasibu cha kufifisha, kufunga hutokana na usugu kwa collision au mtego wa mkunjo.**

---

## 7. Kanusho la uaminifu

Tumerahisisha ili kuweka mambo wazi. Mipango halisi ya commitment hubainisha kwa usahihi jinsi `v` na `r` zinavyosimbwa na jenereta zipi zinatumika; “kuficha” na “kufunga” kila kimoja huwa na aina zake (kamili dhidi ya kikokotozi) zenye fasili sahihi za usalama; na hatukuonyesha sehemu za ndani za Pedersen, Sinsemilla, au Poseidon. Hakuna kati ya hayo kinachobadilisha intuisheni: commitment ni alama ya kidole pamoja na unasibu unaoficha sasa na kufunga milele. Maelezo yatarejea, yakiwa yamebainishwa, wakati makala ya itifaki yatakapoyahitaji.

---

## 8. Muhtasari

- **Kitendakazi cha hash** ni **alama ya kidole ya data**: kinabainika, husonga mbele kwa haraka, ni cha njia moja, sugu kwa collision, na kina **athari ya maporomoko** (biti moja ikiingia, alama ya kidole tofauti kabisa hutoka).
- **Commitment** hukuruhusu **kufunga thamani hadharani sasa na kuifichua baadaye bila kuweza kudanganya.**
- Kuchapisha alama tupu ya kidole `H(v)` hufunga lakini **hakufichi**. Kuongeza kigezo nasibu cha kufifisha, `H(v, r)`, hurekebisha hilo: **kuficha hutokana na `r`, kufunga hutokana na usugu kwa collision.**
- Zcash hutumia commitment **zinazotegemea hash** na za **Pedersen**; commitment za Pedersen pia **hujumlishika**, jambo ambalo Makala ya 6 itatumia kuthibitisha usawa wa thamani kwa faragha.
- Kwa kuwa hash lazima **zithibitishwe** ndani ya mathibitisho ya maarifa sifuri, Zcash hutumia hash **rafiki kwa ZK** zilizojengwa kutoka hesabu za nyuga (**Pedersen**, **Sinsemilla**, **Poseidon**) badala ya SHA-256 kila mahali.

---

## Fahirisi ya istilahi

| Istilahi | Maana kwa Kiingereza rahisi |
|---|---|
| **Hash function** | Hubana data yoyote hadi kuwa alama fupi ya kidole ya ukubwa usiobadilika (digest) |
| **Digest** | Alama ya kidole inayotolewa na kitendakazi cha hash |
| **Preimage resistance** | Huwezi kurudisha digest hadi ingizo lake (njia moja) |
| **Collision resistance** | Huwezi kupata maingizo mawili yenye digest ileile |
| **Avalanche effect** | Mabadiliko madogo kwenye ingizo hubadilisha digest kabisa |
| **Commitment** | Funga thamani sasa, fichua baadaye, huwezi kudanganya kuihusu |
| **Blinding factor (`r`)** | Nambari nasibu mpya inayofanya commitment ifiche |
| **ZK-friendly hash** | Hash iliyojengwa kutoka hesabu za nyuga ili iwe nafuu kuthibitisha |

---

## Maswali Yanayoulizwa Mara Kwa Mara

**Kwa nini usisimbie fiche tu thamani badala ya kutengeneza commitment kuihusu?**  
Usimbaji fiche [encryption] unahusu *usiri unaoweza kuufumbua baadaye*. Commitment inahusu *kufunga*: dhamana kwamba huwezi kubadilisha jibu lako baadaye. Ni kazi tofauti.

**Ikiwa commitment huficha thamani, mtu yeyote hukaguaje kanuni?**  
Hiyo ndiyo kazi ya mathibitisho ya maarifa sifuri (Makala ya 5): yanathibitisha kwamba thamani iliyofichwa inatii kanuni bila kuifichua.

**Je, SHA-256 imeharibika, kwa kuwa Zcash huiepuka sehemu fulani?**  
Hapana. SHA-256 ni nzuri na Zcash bado huitumia. Ni ghali tu *kuthibitisha ndani ya saketi*, ndiyo sababu hash rafiki kwa ZK zipo kwa kazi hiyo mahususi.

**`r` nasibu hutoka wapi, na ni nani huihifadhi?**  
Huzalishwa upya wakati dokezo linapoundwa na hujulikana kwa mmiliki wa dokezo. Ni sehemu ya kinachofanya kila dokezo liwe la kipekee na la faragha.

---

### Jaribu intuisheni yako

Unafunga utabiri wako wa uchaguzi kama `H(v, r)` na kuuchapisha. Rafiki anasisitiza kwamba uchapishe tu `H(v)` ili iwe rahisi zaidi. Kwa sentensi moja, kwa nini hilo ni wazo baya ikiwa kuna matokeo mawili tu yanayowezekana? *(Jibu hapa chini.)*

<details><summary>Jibu</summary>

Kukiwa na matokeo mawili tu, rafiki yako anaweza tu kuhesabu `H("win")` na `H("lose")` mwenyewe na kulinganisha na digest uliyochapisha, hivyo kujua mara moja utabiri wako. Hash tupu hufunga lakini haifiche; `r` nasibu ndiyo inayozuia shambulio hili la kubashiri na kukagua.
</details>

---

### Kinachofuata

**Makala ya 4 . Miti ya Merkle:** sasa tuna mamilioni ya commitment yakirundikana. Makala ya 4 inaonyesha jinsi Zcash huyapanga katika mti mmoja ambao alama yake ndogo ya kidole ya mzizi husimama kwa niaba ya historia nzima, na jinsi unavyoweza kuthibitisha dokezo lako limo katika mti huo bila kufichua ni lipi. Hiyo ndiyo sura halisi ya “ubao wa umma” wa Makala ya 0.

*Sehemu ya mfululizo wa* Zcash kutoka Kanuni za Msingi *kwa ajili ya [ZecHub](https://zechub.org). Imepewa leseni ya CC BY-SA 4.0.*
