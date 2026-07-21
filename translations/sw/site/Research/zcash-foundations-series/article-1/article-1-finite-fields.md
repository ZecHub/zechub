# Finite Fields: Nambari System Cryptography Anaishi Katika
##### Utafiti wa awali kutoka [Annkkitaaa](https://github.com/Annkkitaaa)

! [ alt maandishi](image-5.png)

### Kwa nini "wrapping kuzunguka" ni msingi siri ya Zcash

> **Series:** *Zcash kutoka Kanuni za Kwanza* . **Kifungu cha 1 .
> ** Wasikilizaji: ** wageni. Tunadhani tu shule ya kawaida hesabu (kuongeza, kuzidisha, kugawanya). Hakuna cryptography kabla au hisabati ya juu.
> ** Nini wewe kuondoka na: ** uelewa intuitive na sahihi ya mashamba finite, kwa nini cryptographers kuzitumia, na ambapo wao kuonyesha juu ndani ya Zcash.

Katika [Kifungu cha 0](article-0-shielded-transaction.md) we met five characters: the note, the commitment, the note commitment tree, the nullifier, and the zero-knowledge proof. We left a loose end hanging: *where do all the keys and secret recipes actually come from?* They come from numbers. But not the ordinary numbers you grew up with. They come from a special, self-contained number system called a **finite field**, and almost every piece of cryptography in Zcash is built on top of it.

Makala hii inapata wazo hilo polepole. Kama ilivyoahidiwa, intuition kwanza. Hakuna formula mpaka wao kulipa kwa wenyewe.

---

## 1. Kwa nini unapaswa kuhangaikia jambo hilo?

Nambari za kawaida zina tatizo kwa cryptography: kuna infinitely wengi wao, na wao kuvuja habari.

Fikiria nini kinatokea wakati idadi anapata * kubwa. * Kama mimi kukuambia mahesabu siri zinazozalishwa `8,142,067`, you already know quite a lot: it's a seven-digit number, it's odd, it's "fairly large." Size is a clue. And clues are exactly what a privacy system cannot afford to give away.

Cryptography anataka mfumo wa idadi ambapo:

- kuna **finitely wengi** maadili, hivyo kompyuta unaweza kuhifadhi yoyote ya yao hasa na hakuna rounding na hakuna overflow,
- maadili ** wala kuvuja ukubwa wao **, kwa sababu mfumo hana dhana halisi ya "kubwa",
- bado unaweza ** kuongeza, kutoa, kuzidisha, na kugawanya ** kwa uhuru na reversibly, kwa sababu mapishi cryptographic haja algebra halisi ya kazi, na
- nafasi inaweza kufanywa **astronomically kubwa **, hivyo nadhani ni matumaini.

Hiyo orodha ya matakwa ina jina. Ni ** uwanja wa mwisho **. Hebu kujenga intuition kwa moja kabla ya kuandika ishara moja.

---

## 2. Intuition: saa

Tayari unatumia uwanja wa mwisho kila siku. Ni saa kwenye ukuta wako.

On a 12-hour clock, numbers *wrap around*. Start at 10 o'clock, add 5 hours, and you don't land on "15 o'clock," you land on **3 o'clock**. The clock has only twelve positions, and counting past the top simply loops back to the start.

! [ alt maandishi](image-9.png)

Mambo matatu tu yaliyotokea ndiyo kusudi la makala hii:

1. Kuna nafasi kumi na mbili, bila kujali muda gani unauhesabu.
2. **Kuongeza bado kazi.** Unaweza kuongeza masaa siku nzima; wewe daima kutua juu ya nafasi halali saa.
3. ** ukubwa kusimamishwa jambo. * "3 saa" haina kukuambia kama kuhesabiwa 3 masaa au 15 au 27. wrap-karibu * erased ukubwa habari. * kwamba kufuta ni hasa faragha ya kirafiki mali tulitaka.

Hii wrap-karibu hesabu ina jina rasmi: ** modular hesabu **. saa kazi "modulo 12," imeandikwa ** mod 12 **. Wataalam wa hisabati wanapendelea kuhesabu nafasi kuanzia 0, hivyo "saa mod 12" kweli ina nafasi `0, 1, 2, ..., 11`. saa mod 7 ingekuwa na nafasi `0` kupitia `6`.

> ** sheria moja: ** kwa mahesabu chochote "mod p", kufanya hesabu ya kawaida, kisha kugawanya na `p` na kuweka tu mabaki.
> Mfano mod 7: `5 + 4 = 9`, na `9` majani mabaki `2` baada ya kugawanywa na `7`, so `5 + 4 = 2 (mod 7)`.

---

## 3. Kutoka saa hadi shamba

Saa inaruhusu sisi kuongeza. ** shamba ** ni kuboresha: mfumo wa idadi ambapo wote nne shughuli tabia, ikiwa ni pamoja na gumu moja, mgawanyiko.

Bila rasmi, ** shamba ** ni mkusanyiko wowote wa "nambari" ambapo unaweza ** kuongeza, kutoa, kuzidisha, na kugawanya ** (na chochote isipokuwa sifuri), na sheria zote zinazojulikana bado zinashikilia: utaratibu hauna maana kwa kuongeza au kuzidishwa, brackets inaweza kuunganishwa tena, kuna `0` na a `1`, na kila idadi ina hasi na (isipokuwa `0`), na kuanzisha uhusiano wa kirafiki.

Nambari rational ni uwanja. idadi halisi ni shamba. nini tunataka ni * mwisho * moja.

Hapa ni matokeo ya kichwa cha habari, na ni nzuri:

> ** Kuchukua namba nzima `0, 1, ..., p-1` na kufanya yote mod hesabu `p`. If `p` ni idadi ya msingi, matokeo ni uwanja wa mwisho.** Sisi kuandika `F_p` (Soma "F sub p").

So `F_7 = {0, 1, 2, 3, 4, 5, 6}` na saa-style hesabu mod 7 ni uwanja halisi ya mwisho. Hebu kuona ni kupumua.

### Kuzidisha katika F_7 (kuthibitishwa)

Kila kuingia ni `(row x column) mod 7`:

| x | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| **0** | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **1** | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| **2** | 0 | 2 | 4 | 6 | 1 | 3 | 5 |
| **3** | 0 | 3 | 6 | 2 | 5 | 1 | 4 |
| **4** | 0 | 4 | 1 | 5 | 2 | 6 | 3 |
| **5** | 0 | 5 | 3 | 1 | 6 | 4 | 2 |
| **6** | 0 | 6 | 5 | 4 | 3 | 2 | 1 |

Angalia safu kwa ajili ya `1` kupitia `6`: kila moja ina kila thamani nonzero `1..6` Hiyo "hakuna kurudia, hakuna kitu kukosa" muundo ni alama inayoonekana ya uwanja.

### Ugawaji: uchawi ambao unahitaji msingi

Idadi ni tu "kuzidisha kwa kinyume". Katika `F_7`, kinyume (au ** kinyume **) cha idadi `a` ni thamani `a^(-1)` ambayo `a x a^(-1) = 1`. Kusoma yao moja kwa moja kutoka meza:

| `a` | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| `a⁻¹` | 1 | 4 | 5 | 2 | 3 | 6 |

Angalia moja: `2 x 4 = 8 = 1 (mod 7)`. Hivyo "gawanya na 2" katika `F_7` inamaanisha "kuzidisha kwa 4". Kila kipengele nonzero ina mpenzi. ** Hiyo ni nini hufanya `F_7` shamba.**

---

## 4. Kwa nini moduli ni lazima iwe ya msingi

Hii ni wazo moja muhimu zaidi katika makala, hivyo hebu kufanya hivyo halisi badala ya abstract.

Angalia nini mapumziko kama sisi naively kujaribu kujenga "shamba" mod `6` (na `6` ni * sio * msingi):

> Je, kuna yeyote `x` na `2 x x = 1 (mod 6)`? Kuangalia wote: `2x0=0, 2x1=2, 2x2=4, 2x3=0, 2x4=2, 2x5=4`Jibu `1` kamwe inaonekana.** Hivyo `2` hana mbadala mod 6. mbaya zaidi, `2 x 3 = 6 = 0 (mod 6)`: nambari mbili zisizo na sifuri zinazidishwa ili kutoa sifuri.

Hiyo sentensi ya pili ni janga kwa ajili ya hesabu. vitu mbili si sifuri kuzidisha kwa sifuri (aitwaye ** zero mgawanyiko **) ina maana mgawanyo ni kuvunjwa, na mfumo na kugawanyika kuvunjWA si uwanja. hutokea hasa kwa sababu `6` sababu kama `2 x 3`.

Mkuu, kwa ufafanuzi, hana mambo kama hayo. Hivyo mod mkuu, hakuna zero divisors inaweza kuonekana, kila kipengele nonzero anapata safi kinyume, na muundo ni uwanja sahihi.

! [ alt maandishi](image-8.png)

> ** Reusable moja-lineer kwa ajili ya makala yako: ** * prime modulus katika, safi mgawanyiko nje. *

---

## 5. formula moja ya thamani ya mkutano: jinsi kompyuta kupata inverse

Sisi kusoma inverses nje ya meza kwa `F_7`, lakini Zcash ya msingi ina mamia ya tarakimu; hakuna meza inawezekana. Kuna njia ya mkato classic, na ni formula tu katika makala hii.

**Fermat's Little Theorem** anasema kwamba kwa ajili ya msingi `p` na yoyote nonzero `a`:

```
a^(p-1) = 1   (mod p)
```

Rearrange ni (peel mbali moja sababu ya `a`) na unapata kinyume kwa bure:

```
a^(-1) = a^(p-2)   (mod p)
```

Mtihani katika `F_7` (`p = 7`, so `p - 2 = 5`): kinyume cha `2` inapaswa kuwa `2^5 = 32 = 4 (mod 7)`Na kwa hakika meza yetu ilisema `2^(-1) = 4`Kompyuta kuongeza kwa nguvu kubwa sana haraka, hivyo hii anarudi "kupata kinyume" katika haraka, hesabu sahihi hata kwa primes kubwa.

Huna haja ya kukumbuka hii. Unahitaji kujua kwamba ** mgawanyiko katika uwanja wa mwisho ni haraka, sahihi operesheni **, ambayo ni kwa nini cryptographers ni furaha ya kujenga juu yake.

---

## 6. Kwa nini cryptography akaanguka katika upendo na mashamba finite

Kuweka intuition pamoja, hapa ni kesi nzima katika ukurasa mmoja.

Mali ya `F_p` Kwa nini mfumo wa faragha unataka.
|---|---|
** Finite** Kompyuta huhifadhi kipengele chochote hasa; hakuna rounding, hakuna overflow, hakuna fuzz-pointi floating.
** Wrap-karibu ** Erases "saizi", hivyo thamani kuvuja chochote kuhusu jinsi ilitolewa.
** zote nne kazi kazi ** mapishi cryptographic (funguo, ahadi, uthibitisho) haja algebra halisi, si tu kuhesabu.
** Ukubwa wa kuchagua ** Chagua 255-bit au 381-bit msingi na shamba ina vipengele zaidi kuliko kuna atomu katika ulimwengu inayoonekana; nadhani ni matumaini.
** sahihi na deterministic ** pande mbili waaminifu computing kitu kimoja daima kupata matokeo sawa, ambayo ushahidi hutegemea.

uwanja wa mwisho ni, katika kifungu kimoja, ** kikamilifu kufungwa, kikamilifu sahihi, kikamili kubwa uwanja kwa ajili ya hesabu.** Kila kitu kingine katika Zcash ni kujengwa kwa kucheza ndani yake.

---

## 7. Ambapo hii anaishi katika Zcash

You don't have to take "Zcash uses finite fields" on faith. Here's the concrete map (the deeper machinery is for later articles; this is just to show the fingerprints are real).

- ** Sapling ** (a zamani kulindwa kubuni) hujenga uthibitisho wake juu ya curve aitwaye ** BLS12-381 **, ambayo msingi uwanja anatumia prime kwamba ni ** 381 bits ** muda mrefu. Kila uratibu, muhimu, na ushahidi kipengele ni kipengele cha uwanja wa mwisho kujengwa juu ya kwamba prime.
- ** Orchard ** (sasa ulinzi kubuni) inatumia jozi ya curves kuitwa ** Pallas na Vesta ** (ya "Pasta" curves), ambayo mashamba kutumia primes takriban **255 bits ** muda mrefu.
- The **note commitment**, the **nullifier**, and the numbers inside a **zero-knowledge proof** from Article 0 are all, at bottom, elements of one of these finite fields. When the protocol says "compute this commitment," it means "do this arithmetic mod that prime."

! [ alt maandishi](image-7.png)

Hivyo jibu kwa Sura ya 0 ya wazi swali, * "ambapo mapishi siri kuja kutoka?" *, huanza hapa: ** kila kitu huanza kama hesabu katika uwanja wa mwisho. * Katika makala ijayo sisi kuchukua uwanja huo na kujenga mali halisi, pointi juu ya curve elliptic, ambayo kuwa funguo na ahadi.

---

## 8. Mtu anayetoa taarifa kwa uaminifu

Ili kukaa wageni-kirafiki sisi kurahisishwa baadhi ya mambo ya kweli. mashamba Finite si tu kuja katika `F_p` ladha; unaweza pia kujenga mashamba na `p^n` elements (called **extension fields**), and those matter for the "pairings" that Sapling's proof system relies on. We also skipped the full list of field axioms and glossed over how primes of this size are chosen and validated. None of that changes the intuition you now hold; it refines it. We'll add the precision back, with flags, when a later article needs it.

---

## 9. Muhtasari

- Cryptography inahitaji mfumo wa idadi ambayo ni ** kumalizika, sahihi, ukubwa-kipofu, kikamilifu invertible, na kubwa.** Mfumo huo ni ** uwanja wa mwisho **.
- Intuition ni ** saa **: hesabu kwamba ** wraps karibu ** (arithmetic modular), ambayo conveniently erases "ukubwa" wa idadi.
- Kufanya hesabu na namba `0..p-1` mod a **prime** `p` inatoa uwanja halisi `F_p`, ambapo unaweza pia ** kugawanywa ** kwa sababu kila kipengele si sifuri ina inverse.
- Moduli ** lazima kuwa msingi **: moduli composite inajenga zero divisors (kama `2 x 3 = 0 mod 6`) na kuvunja mgawanyiko.
- Kompyuta kupata inverses haraka kupitia ** Fermat ya Little Theorem ** (`a^(-1) = a^(p-2)`).
- Katika ** Zcash **, kila muhimu, ahadi, nullifier, na uthibitisho kipengele ni hatimaye kipengele cha uwanja kubwa mwisho (255-bit Pasta mashamba kwa Orchard, 381-bit shamba kwa Sapling ya BLS12-381).

---

## Orodha ya maneno

Neno. Maana ya Kiingereza ya kawaida.
|---|---|
** Arithmetic ya moduli** Arithmeti inayozunguka baada ya kufikia thamani fulani, kama saa.
**mod p** "Kugawanywa na `p` na kuweka iliyobaki".
Mfumo wa hesabu ambapo kuongeza, kutoa, kuzidisha, na kugawanya kazi yote.
** uwanja Finite `F_p`** Namba `0..p-1` na hesabu kufanyika mod msingi `p` |
** Inverse (kinyume) ** Kipengele `a^(-1)` na `a x a^(-1) = 1`; "kugawanya na `a`" inamaanisha kuzidisha kwa hiyo.
** Zero mgawanyiko **.Two nonzero maadili ambayo bidhaa ni sifuri; kitu ambacho kuharibiwa composite moduli.
Nambari nzima kubwa kuliko 1 na hakuna sababu isipokuwa 1 na yenyewe.

---

## FAQ

**Kwa nini si tu kutumia integers kawaida au decimals?**
Decimals pande zote na drift; integers kukua bila bound na kuvuja ukubwa. mashamba Finite ni sahihi, bounded, na ukubwa-kipofu, ambayo cryptography inahitaji.

**Je, "kuzunguka" hupoteza habari?**
Kwa makusudi, ndiyo. Kufuta ukubwa wa maadili ya kati ni kipengele, si mdudu, kwa faragha.

**Je, prime kubwa daima ni salama zaidi?**
Kwa ufupi, uwanja mkubwa zaidi unamaanisha maadili zaidi ya uwezekano na kukisia zaidi, lakini usalama hutegemea ujenzi wote, si ukubwa wa uwanja pekee. Makala za baadaye hufanya hili kuwa sahihi.

** Kwa nini hizi primes maalum (255-bit, 381-bit) katika Zcash?**
Wao ni kuchaguliwa hivyo pembe kujengwa juu yao kuwa na muundo sahihi na ufanisi kwa mfumo ushahidi. "Muundo sahihi" kwamba ni mada ya makala mbili zifuatazo.

---

### Jaribu ufahamu wako wa ndani

In `F_7`, ni nini `5 - 6`? (Kumbuka: kukaa ndani `{0,...,6}` kwa wrapping kuzunguka.) * ((Jibu chini.) *

<details><summary>Answer</summary>

`5 - 6 = -1`, na `-1` iliyofungwa katika `F_7` is `6` (kwa sababu `6 + 1 = 7 = 0`). So `5 - 6 = 6 (mod 7)`. Kuondoa kamwe majani shamba; ni tu wraps njia nyingine.
</details>

---

### Ni nini kinachofuata

** Kifungu cha 2. curves elliptic:** sisi kuchukua uwanja wa mwisho sisi tu kujengwa na kuitumia kuteka aina ya ajabu ya curve ambayo pointi inaweza kuwa "aliongeza" pamoja. Pointi hizo kuwa funguo Zcash na ahadi, na wao kuficha moja-njia trapdoor kwamba inafanya mfumo wote faragha inawezekana. Intuition kwanza, kama siku zote.

* Sehemu ya * Zcash kutoka Kanuni za Kwanza * mfululizo kwa [ZecHub](https://zechub.org). Leseni CC BY-SA 4.0.*
