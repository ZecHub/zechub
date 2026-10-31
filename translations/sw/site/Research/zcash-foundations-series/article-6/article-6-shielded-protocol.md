# Itifaki ya Faragha, Mwanzo hadi Mwisho
##### Utafiti Asili kutoka [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-27-4094293ec0.webp)

### Kuunganisha kila sehemu kuwa muamala mmoja wa faragha wa Zcash

> **Mfululizo:** *Zcash kutoka Kanuni za Kwanza* . **Makala ya 6 . Itifaki ya Faragha** (hitimisho)
> **Hadhira:** wanaoanza ambao wamesoma Makala ya 0 hadi 5. Hapa ndipo kila kitu kinaunganishwa.
> **Utakachobaki nacho:** muundo kamili na sahihi wa kiakili wa muamala wa faragha wa Zcash, wenye kila dhana kutoka katika mfululizo ikiwa mahali pake sahihi, na kila duara kutoka Makala ya 0 likiwa limefungwa.

Tulianza, katika [Makala ya 0](article-0-shielded-transaction.md), kwa kitendawili na simulizi kuhusu bahasha zilizofungwa kwenye ubao wa umma. Kisha tulitumia makala tano kujenga sehemu zake: nyuga zenye kikomo, mikunjo duaradufu, commitment, miti ya Merkle, na mathibitisho ya maarifa sifuri [zero-knowledge proofs]. Sasa tunaziunganisha na kutazama malipo halisi ya faragha yakifanya kazi, mwanzo hadi mwisho.

---

## 1. Kwa nini unapaswa kujali?

Kila sehemu uliyojifunza peke yake ina werevu. Lakini *uchawi* wa Zcash uko katika jinsi zinavyoungana. Nullifier pekee haitoi faragha. Commitment pekee haizuii ughushi. Thibitisho pekee halithibitishi jambo lolote muhimu. Ni **muunganiko** unaobadilisha vipengele vitano kuwa pesa ambazo kwa wakati mmoja zina faragha na zinaaminika.

Makala hii ni muunganiko huo. Mwishoni, sentensi *“mtandao unathibitisha muamala ambao hauwezi kuuona”* haitahisi tena kama kitendawili bali kama tokeo dhahiri la sehemu ambazo tayari unaelewa.

---

## 2. Wahusika, wameunganishwa tena

Huu hapa mfululizo mzima katika ukurasa mmoja, ukilinganisha simulizi la Makala ya 0 na utaratibu halisi.

| Kipengele cha simulizi la Makala ya 0 | Sehemu halisi | Imejengwa kutoka |
|---|---|---|
| Pesa ndani ya bahasha | **Dokezo [Note]** (thamani, mpokeaji, ubahatishaji) | husimbwa kama elementi za nyuga (Mak. 1) |
| Bahasha iliyofungwa isiyoonekana yaliyomo | **Commitment ya dokezo [Note commitment]** | commitment ya Pedersen / Sinsemilla (Mak. 2, 3) |
| Ubao wa umma | **Mti wa commitment za madokezo [Note commitment tree]** (anchor = mzizi wake) | mti wa Merkle unaoongezwa hatua kwa hatua (Mak. 4) |
| Tokeni ya utupu | **Nullifier** | hash rafiki kwa ZK ya dokezo + ufunguo wa siri (Mak. 2, 3) |
| “Pesa zinazoingia ni sawa na pesa zinazotoka” | **Commitment za thamani + ukaguzi wa salio [Value commitments + balance check]** | commitment za Pedersen homomofia (Mak. 2, 3) |
| Uchawi wa nyuma ya pazia | **Thibitisho la maarifa sifuri [Zero-knowledge proof]** | zk-SNARK juu ya sakiti ya kihisabati (Mak. 5) |
| “Ni wewe pekee unaweza kusoma bahasha yako” | **Dokezo lililosimbwa fiche + funguo za kutazama [Encrypted note + viewing keys]** | usimbaji fiche + mpangilio wa funguo (makala hii) |

---

## 3. Funguo zinatoka wapi

Kila kitu ambacho mtumiaji anaweza kufanya hutokana na siri moja, **ufunguo wa kutumia pesa [spending key]**, kupitia mpangilio wa njia moja (kila mshale ni utokaji usiorejesheka, kutokana na milango ya siri katika Makala ya 2 na 3):

![alt text](/content-images/image-32-f443f9bb72.webp)

Mambo mawili yanafaa kuzingatiwa, yote yakiwa matokeo ya makala za awali:

- Mgawanyo huu hukuruhusu kutoa **ufunguo wa kutazama [viewing key]** (kwa mfano, kwa mkaguzi) unaofichua miamala yako **bila** kumpa uwezo wa kutumia pesa. Faragha ni ya kuchagua, si ya yote-au-hakuna.
- Kila utokaji ni wa **njia moja**: kumiliki ufunguo wa kutazama hakumruhusu kamwe mtu yeyote kurejesha ufunguo wa kutumia pesa, hasa kama mlango wa siri wa mkunjo duaradufu kutoka Makala ya 2 unavyofanya kazi yake.

---

## 4. Kutumia dokezo: madai manne

Ili kutumia dokezo kwa faragha, lazima uushawishi mtandao kuhusu mambo manne kwa wakati mmoja **bila kufichua dokezo, thamani yake, nafasi yake, au utambulisho wako.** Kila dai hutimizwa na sehemu ambayo tayari unaijua.

![alt text](/content-images/image-31-86309af194.webp)

Thibitisho halifichui **hata moja** ya hoja za msingi (ni dokezo gani, ufunguo wa nani, thamani gani). Linafichua tu kwamba *madai yote manne ni sahihi.* Huo ndio ujanja wote wa Zcash wa faragha, ulioelezwa katika mchoro mmoja.

---

## 5. Mbinu ya salio la thamani (faida tuliyohifadhi)

Huko katika Makala ya 2 na 3 tulibaini kuwa commitment za Pedersen **hujumlishika**: commitment ya `v_1` pamoja na commitment ya `v_2` ni commitment ya `v_1 + v_2`. Hapa ndipo hilo linapolipa.

Kila dokezo la ingizo na utoaji hubeba **commitment ya thamani [value commitment]**: commitment ya Pedersen `v.G + r.H` inayoficha kiasi chake `v`. Kwa sababu hizi hujumlishika, mtandao unaweza kukokotoa:

```
(sum of input value commitments) − (sum of output value commitments)
```

Muamala unapokuwa na salio (hakuna pesa zinazoundwa au kuharibiwa), sehemu za `v` hufutika kikamilifu, zikibakisha commitment ya **thamani sifuri**, iliyofichwa na ubahatishaji uliosalia. Mtumaji huthibitisha kuwa anajua ubahatishaji huo uliosalia kwa kutengeneza sahihi ndogo iitwayo **sahihi ya kufunga [binding signature].** Sahihi halali ya kufunga inawezekana tu wakati thamani zinasawiana kweli, **ilhali hakuna kiasi hata kimoja kilichofichuliwa.**

> Huu ndio mfano safi zaidi katika mfululizo mzima wa *kwa nini* tulihitaji commitment za homomofia zinazotegemea mkunjo. Kanuni ya “pesa zinazoingia ni sawa na pesa zinazotoka” inatekelezwa kwa **kujumlisha bahasha zilizofungwa pamoja** na kukagua kuwa matokeo yanafungwa hadi sifuri.

---

## 6. Muamala kamili, ukitazamwa mwanzo hadi mwisho

Hebu tuunganishe Alice akimlipa Bob. Tutatumia muundo wazi wa Sapling wa “upande wa matumizi / upande wa utoaji” kama kielelezo cha kufundishia.

**Muamala wa faragha hujumuisha aina mbili za maelezo:**

| Maelezo ya matumizi [Spend description] (hutumia dokezo) | Maelezo ya utoaji [Output description] (huunda dokezo) |
|---|---|
| commitment ya thamani ya ingizo | commitment ya thamani ya utoaji |
| **anchor** inayothibitisha dhidi yake (mzizi wa mti) | **commitment ya dokezo** mpya (jani jipya) |
| **nullifier** ya dokezo lililotumika | **ufunguo wa muda mfupi [ephemeral key]** wa usimbaji fiche |
| ufunguo wa umma uliobahatishwa upya + sahihi ya uidhinishaji wa matumizi | **dokezo lililosimbwa fiche** (ciphertext kwa mpokeaji) |
| **zk-SNARK** inayothibitisha madai manne | **zk-SNARK** inayothibitisha utoaji umeundwa vizuri |

Pamoja na **sahihi ya kufunga** moja juu ya kifurushi kizima, inayotekeleza salio la thamani (Sehemu ya 5).

![alt text](/content-images/image-30-98511eb2d0.webp)

Fuatilia faragha: mtandao ulikagua anchor, ukakagua kuwa nullifier ilikuwa mpya, ukathibitisha thibitisho, na ukathibitisha salio. Ulikubali malipo halali **bila kujifunza kiasi chochote, anwani yoyote, wala dokezo lililotumika.** Wakati huo huo, **nullifier** ya dokezo lililotumika (kifo chake) na **commitment** mpya ya Bob (kuzaliwa kwa dokezo lake) hukaa katika miundo miwili tofauti ya umma bila kiungo kinachoonekana kati yake, kiungo kilichokatwa kutoka Makala ya 0.

---

## 7. Kufunga kila duara kutoka Makala ya 0

Makala ya 0 ilifungua maswali kimakusudi. Haya yote yapo hapa, yamefungwa.

| Duara lililofunguliwa katika Makala ya 0 | Limefungwa na |
|---|---|
| Bahasha iliyofungwa lakini isiyoweza kughushiwa inawezekanaje? | Commitment: kuficha kunatokana na ubahatishaji, kufunga kunatokana na ukinzani wa mgongano / mlango wa siri wa mkunjo (Mak. 3) |
| Funguo na taratibu za siri zinatoka wapi? | Hisabati ya nyuga na uzidishaji wa skala wa mkunjo duaradufu (Mak. 1, 2) |
| “Ubao” hasa ni nini? | Mti wa Merkle unaoongezwa hatua kwa hatua wa commitment za madokezo; mzizi wake ndio anchor (Mak. 4) |
| Kwa nini tokeni ya utupu haiwezi kuunganishwa na bahasha yake? | Nullifier ni hash yenye ufunguo inayowekwa katika seti tofauti na commitment (Mak. 2, 3, 4) |
| Unathibitishaje uhalali bila kufichua chochote? | zk-SNARK juu ya sakiti ya kihisabati inayosimba madai yote manne (Mak. 5) |
| Mpokeaji anajuaje amelipwa? | Dokezo husimbwa fiche kwa anwani yake; hujaribu kulifungua kwa ufunguo wa kutazama (makala hii) |
| “Pesa zinazoingia = pesa zinazotoka” hutekelezwaje kwa faragha? | Commitment za thamani homomofia + sahihi ya kufunga (Sehemu ya 5) |

Kitendawili kutoka ukurasa wa kwanza, *thibitisha usichoweza kuona*, sasa kimeondolewa kabisa. Mtandao huthibitisha **madai kuhusu data iliyofichwa**, kamwe data yenyewe.

---

## 8. Sapling dhidi ya Orchard, kwa kifupi

Tulifundisha kwa muundo wa Sapling kwa sababu mgawanyo wake uko wazi zaidi. Muundo wa sasa, **Orchard**, husafisha badala ya kubadilisha mawazo haya:

| | **Sapling** | **Orchard** |
|---|---|---|
| Kitengo cha muamala | maelezo tofauti ya **Matumizi [Spend]** na **Utoaji [Output]** | **Vitendo [Actions]** vilivyounganishwa (kila kimoja hufanya matumizi 1 + utoaji 1) |
| Mfumo wa uthibitisho | **Groth16** (usanidi unaoaminika) | **Halo 2** (hakuna usanidi unaoaminika) |
| Mikunjo | BLS12-381 + Jubjub | Pallas / Vesta (Pasta) |
| Hash ya commitment | Pedersen | Sinsemilla |

Kila dhana katika makala hii huhamishwa moja kwa moja; Orchard hasa huunganisha matumizi na utoaji pamoja na kubadilisha mfumo wa uthibitisho usio na sherehe. Nguzo tano hazijabadilika.

---

## 9. Tahadhari ya uaminifu

Hii ndiyo picha kamili zaidi katika mfululizo, lakini bado ni kielelezo. Tumefupisha usimbaji mahususi wa nyuga wa dokezo, fomula sahihi za utokaji wa funguo, ubahatishaji upya wa funguo za matumizi, anwani zilizoainishwa, sehemu za ujumbe, ushughulikiaji wa ada, tofauti kati ya commitment za thamani na commitment za madokezo kwa undani kamili, na jukumu sahihi la kila sahihi. Pia tumewasilisha mtiririko mmoja wa kawaida; miamala halisi inaweza kubeba matumizi na utoaji mengi kwa wakati mmoja na inaweza kuchanganya sehemu za uwazi na za faragha. Chanzo chenye mamlaka ni Ufafanuzi wa Itifaki wa Zcash. Sasa unashikilia umbo sahihi; ufafanuzi hujaza kila kipimo.

---

## 10. Muhtasari

- Muamala wa faragha huunganisha vipengele vyote vitano: **dokezo** (thamani), **commitment** yake katika **mti wa commitment za madokezo**, **nullifier** ya kuzuia matumizi mara mbili, **commitment za thamani** kwa salio, na **zk-SNARK** inayovifunga vyote pamoja.
- Matumizi huthibitisha **madai manne kwa wakati mmoja**, kwamba dokezo lipo, umeidhinishwa, nullifier yake ni sahihi, na thamani ina salio, katika **maarifa sifuri**, bila kufichua hoja zozote za msingi.
- **Salio la thamani** hutekelezwa kwa **kujumlisha commitment homomofia** na kukagua kuwa zinafungwa hadi sifuri, kupitia **sahihi ya kufunga**, bila kiasi chochote kufichuliwa.
- Uwezo wa mtumiaji hutokana na **ufunguo wa kutumia pesa** mmoja kupitia **mpangilio wa njia moja**, unaowezesha **funguo za kutazama** zinazofichua bila kutoa uwezo wa kutumia pesa.
- Mtandao **huthibitisha madai kuhusu data iliyofichwa**, hivyo kuondoa kitendawili cha uthibitishaji-dhidi-ya-faragha kutoka Makala ya 0. Kila duara lililofunguliwa hapo sasa limefungwa.
- **Orchard** husafisha **Sapling** (Vitendo vilivyounganishwa, Halo 2 bila usanidi unaoaminika, mikunjo ya Pasta, Sinsemilla) bila kubadilisha nguzo tano.

---

## Kamusi

| Istilahi | Maana kwa Kiingereza rahisi |
|---|---|
| **Spending key** | Siri moja ya mzizi ambayo funguo zote za mtumiaji hutokana nayo |
| **Viewing Key** | Hufichua miamala yako kwa mmiliki bila kumruhusu kutumia pesa |
| **Spend description** | Sehemu ya tx inayotumia dokezo (nullifier, anchor, thibitisho) |
| **Output description** | Sehemu ya tx inayounda dokezo (commitment, ciphertext, thibitisho) |
| **Action (Orchard)** | Kitengo kilichounganishwa kinachofanya matumizi moja na utoaji mmoja pamoja |
| **Value commitment** | Commitment ya Pedersen homomofia ya kiasi |
| **Binding signature** | Sahihi inayothibitisha kuwa thamani zina salio bila kuzifichua |
| **Anchor** | Mzizi wa mti ambao matumizi huthibitisha uanachama dhidi yake |
| **Trial decryption** | Mpokeaji anayejaribu commitment mpya ili kupata madokezo yaliyokusudiwa kwake |

---

## Maswali Yanayoulizwa Mara kwa Mara

**Je, mtandao huona kiasi au nani amelipa nani?**  
Hapana. Unathibitisha thibitisho, upya wa nullifier, anchor, na sahihi ya kufunga. Thamani zote za faragha hubaki zimefichwa.

**Ni nini kinachonizuia kutumia dokezo mara mbili?**  
Nullifier. Matumizi huiweka hadharani; mtandao hukataa nullifier yoyote ambayo tayari iko katika seti ya nullifier. Dokezo lilelile kila wakati hutoa nullifier ileile.

**Salio linawezaje kukaguliwa ikiwa kiasi kimefichwa?**  
Commitment za thamani hujumlishika kwa homomofia; commitment za muamala wenye salio hufutika hadi commitment ya sifuri, jambo ambalo sahihi ya kufunga huthibitisha.

**Je, ninaweza kuthibitisha miamala yangu kwa mkaguzi bila kupoteza udhibiti?**  
Ndiyo. Mpe ufunguo wa kutazama. Hufichua shughuli zako za faragha lakini hauwezi kuidhinisha matumizi, kutokana na mpangilio wa funguo wa njia moja.

**Je, Sapling imepitwa na wakati sasa kwa kuwa Orchard ipo?**  
Zote zimekuwepo kwenye mtandao; Orchard ndio muundo wa sasa. Dhana zake zinashirikiwa, hivyo kuelewa moja hukupa nyingine.

---

### Jaribu intuisheni yako

Rafiki anasema: “Kwa kuwa thibitisho huficha kiasi, mwizi angeweza kudai tu kuwa utoaji wake una thamani zaidi kuliko ingizo lake na kuchapisha pesa za bure.” Kwa kutumia Sehemu ya 5, eleza kwa sentensi mbili kwa nini hili haliwezekani. *(Jibu hapa chini.)*

<details><summary>Jibu</summary>

Kiasi kimefichwa, lakini kila kimoja kimefungwa katika commitment ya thamani homomofia, na mtandao hujumlisha commitment zote za ingizo na kutoa commitment zote za utoaji; ikiwa thamani zilizofichwa hazikuwa na salio, matokeo hayangefungwa hadi sifuri na **hakuna sahihi halali ya kufunga ingeweza kutengenezwa.** Mwizi anaweza kuficha *kiasi gani*, lakini hawezi kufanya thamani zisizo na salio zipite ukaguzi wa salio, kwa hiyo kuchapisha pesa za bure hakuwezekani bila kufichua chochote na bado kukamatwa na hesabu.
</details>

---

### Mfululizo, umekamilika

Sasa umesafiri kutoka kitendawili kimoja hadi malipo kamili ya faragha:

![alt text](/content-images/cd8bbb40-57b8-4854-b9cf-97f2485d126a-8847fae521.webp)


Kuanzia hapa, mkondo wa asili unaingia kwa kina zaidi: utendaji wa ndani wa Groth16 na Halo 2, sherehe za usanidi unaoaminika, sakiti za Sapling na Orchard kwa undani, utokaji wa funguo na anwani zilizoainishwa, na mageuzi ya itifaki katika maboresho ya mtandao. Lakini msingi sasa umewekwa, na kila moja ya mada hizo ina mahali pa kuunganishwa.

*Sehemu ya mfululizo wa* Zcash kutoka Kanuni za Kwanza *kwa [ZecHub](https://zechub.org). Imeidhinishwa chini ya CC BY-SA 4.0.*
