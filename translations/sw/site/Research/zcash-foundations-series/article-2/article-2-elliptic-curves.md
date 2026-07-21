# Elliptic Curves: Ambapo Zcash ya funguo na ahadi ni kuzaliwa
##### Utafiti wa awali kutoka [Annkkitaaa](https://github.com/Annkkitaaa)

! [ alt maandishi](image-10.png)

### Barabara yenye mwendo mmoja iliyojengwa kutoka kwa sehemu zilizo kwenye mviringo

> **Series:** *Zcash kutoka Kanuni za Kwanza* . **Kifungu cha 2 . Curves Elliptic**
> Sisi kudhani tu [Kifungu cha 1 (maeneo ya mwisho)](article-1-finite-fields.md): arithmetic kwamba wraps karibu mod a msingi. hakuna background nyingine zinahitajika.
> **What you'll leave with:** an intuitive and correct picture of elliptic curves, the "trapdoor" that makes them useful, and exactly how Zcash turns them into keys and commitments.

[Kifungu cha 1](article-1-finite-fields.md) alitupa kamili uwanja wa michezo kwa ajili ya hesabu: uwanja mwisho. Lakini uwanja yenyewe ni tu namba. Kujenga funguo na "envelopes muhuri" kutoka [Kifungu 0](article-0-shielded-transaction.md), Zcash inahitaji kitu na maalum, aina moja ya mwelekeo wa ugumu: rahisi kuhesabu mbele, karibu haiwezekani kurudi nyuma. Kitu hicho ni ** curve elliptic **. Makala hii hujenga kutoka chini, intuition kabla ya algebra.

---

## 1. Kwa nini unapaswa kuhangaikia jambo hilo?

Kila mfumo wa faragha unahitaji barabara ya njia moja: operesheni ambayo ni ya kawaida kutembea mbele na kwa ufanisi haiwezekani kurudi nyuma.

Here's why. Your **secret key** is a number you keep hidden. Your **public key** (and your address) is derived from it and shown to the world. The entire security of the system rests on one fact: *given the public key, nobody can work backwards to your secret key.* If they could, they could spend your money.

Hivyo tunahitaji operesheni ya hisabati ambapo:

- kwenda ** mbele ** (siri -> umma) ni ya haraka na rahisi, lakini
- kwenda ** nyuma ** (ya umma -> siri) ni vigumu sana kwamba kompyuta zote duniani kufanya kazi kwa ajili ya maisha ya ulimwengu hawezi kumaliza.

Tu finite-shamba kuzidisha si nzuri ya kutosha; mgawanyiko undoes yake mara moja (hiyo ilikuwa pointi nzima ya Kifungu 1). Tunahitaji kitu bila rahisi "undo" kifungo. curves elliptic kutoa hasa kwamba, na kama ziada, pointi zao kuchanganya kwa njia ambayo ni kamili kwa ajili ya kujenga ahadi. Hebu tuone jinsi.

---

## 2. Intuition: curve ambayo pointi unaweza "kuongeza"

Kusahau cryptography kwa muda mfupi. ** curve elliptic ** ni tu seti ya pointi `(x, y)` kuridhisha equation ya sura:

```
y^2 = x^3 + ax + b
```

Juu ya nambari za kawaida inaonekana kama mviringo laini, unaoanguka, mara nyingi na kitanzi kilichokunjwa na mikia miwili:

! [ alt maandishi](image-14.png)

The genuinely surprising part: **you can "add" two points on this curve to get a third point on the same curve.** This isn't ordinary addition of coordinates. It's a geometric rule, and it's easier to *see* than to say.

### Sheria ya chord (kuongeza pointi mbili tofauti)

Kuongeza `P + Q`:

1. Chora mstari wa moja kwa moja kupitia `P` na `Q`.
2. Mstari huo hits curve katika hasa sehemu moja zaidi. `R*`.
3. **Kutafakari `R*` katika mhimili wa usawa.** kwamba reflection ni jibu, `P + Q`.

! [ alt maandishi](image-11.png)

### Kanuni ya tangent (kuongeza uhakika kwa yenyewe)

Ili kuhesabu `P + P` (kwa maandishi `2P`), hakuna hatua ya pili kuteka mstari kupitia, hivyo kutumia ** tangent ** line katika `P` badala yake, kisha kufuata sawa "mkutano wa tatu, kisha kutafakari" mapishi.

Hiyo ni operesheni nzima. sheria mbili za kijiometri. pamoja nao, pointi ya curve elliptic fomu nini wanahisabati wito ** kikundi **: seti na vizuri-kufanya "addition". Hata ina "zero".

### uhakika katika infinity (curve ya sifuri)

Kila mfumo wa idadi inahitaji `0`, kitu ambacho mabadiliko chochote wakati kuongeza yake. Juu ya curve elliptic, kwamba jukumu ni alicheza na maalum ziada uhakika aitwaye ** uhakika katika infinity **, imeandikwa `O`. Unaweza picha yake kama "infinitely mbali juu", mahali ambapo mistari ya wima kukutana. `O` kwa hatua yoyote majani ni unchanged, hasa kama kuongeza `0`.

---

## 3. Kutoka picha hadi uwanja mdogo

Curve laini juu ni * Intuition*. Lakini Zcash haina kutumia namba halisi (wao pande zote na kuvuja ukubwa, kwa Kifungu 1). Inatumia curve elliptic ** juu ya uwanja mdogo **: sawa `y^2 = x^3 + ax + b`, lakini kwa arithmetic yote kufanyika mod a msingi.

Unapofanya hivyo, curve nzuri vipande katika ** kutawanyika ya dots disconnected **, dot moja kwa kila `(x, y)` jozi kwamba kuridhisha equation mod `p`Lakini hapa ni jambo muhimu:

> **Algebra ya kanuni chord-na-tangent bado kazi kikamilifu.** Fomula sawa kwamba kupatikana `P + Q` geometrically sasa mahesabu yake na finite-shamba arithmetic. dots bado kuunda kundi, na sawa `0` (hatua katika infinity).

Hebu tufanye hii kuwa halisi kwa mfano mdogo, uliothibitishwa kikamilifu.

### Curve kamili, mahesabu hasa

Chukua `y^2 = x^3 + 2x + 2` juu ya uwanja wa mwisho `F_17`. Kuhesabu kila uhakika halali inatoa hasa ** pointi 18, pamoja na uhakika katika infinity = 19 jumla.** Baadhi yao:

```
(0,6) (0,11) (3,1) (3,16) (5,1) (5,16) (6,3) (6,14) (7,6) (7,11) ...
```

Sasa chagua uhakika `G = (5, 1)` Angalia nini kinatokea (kila mstari hapa chini umehesabiwa, haukugunduliwa):

Hatua. Kituo. Hatua-kituo.
|---|---|---|---|
| `1G` | (5, 1) | `11G` | (13, 10) |
| `2G` | (6, 3) | `12G` | (0, 11) |
| `3G` | (10, 6) | `13G` | (16, 4) |
| `4G` | (3, 1) | `14G` | (9, 1) |
| `5G` | (9, 16) | `15G` | (3, 16) |
| `6G` | (16, 13) | `16G` | (10, 11) |
| `7G` | (0, 6) | `17G` | (6, 14) |
| `8G` | (13, 7) | `18G` | (5, 16) |
| `9G` | (7, 6) | `19G` **O (Infinity) **
| `10G` | (7, 11) | | |

Mambo mawili ya kuzingatia:

- Ni ** ziara zote 18 pointi mwisho na kisha ardhi juu ya `O`** katika hatua ya 19, basi itakuwa kurudia milele. `G` "huzalisha" kundi zima, hivyo sisi kuiita ** jenereta **.
- Ni kundi kuthibitishwa: kwa mfano `1G + 2G = (5,1) + (6,3) = (10,6)`, ambayo ni hasa `3G`. Kuongeza ni ndani thabiti, tu kama kundi mahitaji.

---

## 4. Mlango wa mtego: kuzidisha kwa scalar

Hiyo meza ya `1G, 2G, 3G, ...` ni moyo wa kila kitu. mara kwa mara kuongeza hatua kwa yenyewe inaitwa ** scalar kuzidisha **: hatua `kG` inamaanisha "`G` imeongezwa yenyewe `k` nyakati".

Sasa uchawi. Fikiria mwelekeo mbili:

Mwongozo Swali Ugumu
|---|---|---|
**Kupita mbele**. `k` na `G`, hesabu `kG` Hata kwa astronomically kubwa `k`, mbinu inayoitwa *double-na-kuongeza* anapata huko katika hatua mia chache.
** Nyuma ** Given `G` na `kG`, kupona `k` ** Kwa kweli haiwezekani ** kwenye curve halisi ya cryptographic.

Kwamba asymmetry ni ** moja ya njia ya barabara ** sisi zinahitajika katika Sehemu 1. nyuma tatizo ("ambayo `k` alitengeneza hatua hii?") inaitwa ** Elliptic Curve Discrete Logarithm Problem (ECDLP) **, na kwenye curves Zcash hutumia, hakuna njia inayojulikana inayotatua kabla ya kifo cha joto cha ulimwengu.

! [ alt maandishi](image-12.png)

> Katika toy yetu `F_17` curve wewe *could* tu kusoma `k` mbali meza, kwa sababu ina pointi 19 tu. curves halisi kuwa karibu `2^(255)` Meza itakuwa na safu zaidi kuliko kuna atomu katika ulimwengu, hivyo "kusoma ni mbali" si chaguo. ndogo ni nini hufanya toy curve kufundishwa na pia kwa nini si salama.

---

## 5. Jinsi funguo huzaliwa (thawabu)

Sasa tuna kila kitu kinachohitajika kuelezea ufunguo halisi wa kificho, na ni rahisi sana:

> ** Chagua namba ya siri `k`. Chapisha jambo hilo `kG`. Hiyo ni.**
> `k` ni ** ufunguo wako binafsi **. `kG` ni ** ufunguo wako wa umma **. barabara moja ya upande (ECDLP) dhamana hakuna mtu anaweza kukimbia `kG` nyuma hadi `k`.

Hii wazo moja, * ufunguo wa umma ni siri scalar mara generator fasta *, ni mbegu ya Zcash ya matumizi ya funguo, kuona funguo na anwani. kamili muhimu mti tabaka zaidi muundo juu, lakini kila tawi hukua kutoka mzizi huu.

### Bonus: kwa nini curve pointi kufanya ahadi kamilifu

Kumbuka "muhuri muhuri" (kujitolea) kutoka Kifungu cha 0, ambayo ilibidi ** kuficha ** yaliyomo lakini haiwezekani **. curves Elliptic kutupa njia safi ya kujenga moja. Kuchukua mbili za kudumu, umma jenereta pointi `G` na `H`, thamani ya siri `v`, na idadi ya kipofu random `r`, na fomu:

```
Commitment  =  v.G  +  r.H
```

Hii ni ** kujitolea Pedersen **, na ina mali zote mbili tulitaka:

- ** Kuficha:** random `r` smears matokeo katika curve nzima, hivyo uhakika inaonyesha kitu kuhusu `v`.
- ** Kufunga: ** ECDLP hufanya ni haiwezekani kupata * tofauti * `(v, r)` kutoa hatua sawa, hivyo huwezi kubadilisha mawazo yako kuhusu nini wewe nia ya.

Mali ya ziada inageuka kuwa bila bei baadaye: ahadi hizi ** kuongeza up **. `v_1` pamoja na ahadi ya `v_2` ni ahadi halali ya `v_1 + v_2`. Hiyo "homomorphic" tabia ni jinsi Zcash baadaye kuthibitisha kwamba fedha kwenda * katika * shughuli ni sawa na fedha kuja * nje *, bila kufunua kiasi chochote. Tutaweza fedha kwamba katika karibu Kifungu 6.

---

## 6. Ambapo hii anaishi katika Zcash

Alama za vidole ni thabiti na zinaweza kuchunguzwa.

Zcash design. Curves it uses. Role.
|---|---|---|
| **Sapling** (older) | **BLS12-381** plus an embedded curve called **Jubjub** | BLS12-381 carries the proof system; Jubjub is built over BLS12-381's scalar field so that key and commitment operations are cheap to perform *inside* a zero-knowledge proof |
**Orchard** (sasa) **Pallas** na **Vesta** (mzunguko wa "Pasta") Pallas hubeba funguo na ahadi za Orchard; Pallas / Vesta jozi imepangwa mahsusi kufanya uthibitisho wa hali ya juu ufanisi.

The reasons one curve gets "embedded" inside another's field, and why a *cycle* of two curves is useful, are real and important, but they belong to the proof-system articles. For now the takeaway is solid: **every Zcash key is a scalar times a generator, and every Zcash commitment is a sum of curve points**, living on one of these named curves.

! [ alt maandishi](image-13.png)

---

## 7. Kujitenga kwa unyoofu

Baadhi ya kurahisisha kuweka hii kusoma. Sisi kutumika ** short Weierstrass ** fomu (`y^2 = x^3 + ax + b`); Zcash's curves are often written in other equivalent forms (Jubjub is a *twisted Edwards* curve) chosen for efficiency and safety, but the group idea is identical. We didn't define the exact point-addition formulas (they're the algebraic version of "third intersection, then reflect"), and we set aside subtleties like curve order, cofactors, and "pairings," which become important in the proof-system articles. None of this changes the intuition; it sharpens it.

---

## 8. Muhtasari

- Mfumo wa faragha unahitaji ** barabara ya njia moja **: rahisi mbele, haiwezekani nyuma. Curves elliptic kutoa moja.
- ** curve elliptic ** ni seti ya pointi kuridhisha `y^2 = x^3 + ax + b`, na pointi zake zinaweza ** kuongezwa ** kupitia sheria ya kijiometri ya ** chord-na-tangent **, na ** uhakika maalum katika infinity ** inayofanya kama sifuri.
- Zaidi ya ** uwanja wa mwisho ** curve inakuwa kutawanyika kwa dots, lakini kuongeza sawa bado kazi na pointi kuunda ** kikundi **. (Mfano kuthibitishwa: `y^2 = x^3 + 2x + 2` zaidi `F_17` ina pointi 19, na `G = (5,1)` inazalisha yao yote.)
- ** Scalar kuzidisha ** `kG` ni rahisi kuhesabu lakini haiwezekani kugeuza: ** ECDLP **. Hiyo ni mtego.
- ** funguo:** siri ufunguo `k`, ufunguo wa umma `kG`. ** Mahusiano:** Fomu ya Pedersen `v.G + r.H`, ambayo huficha, hufunga, na kwa urahisi huongeza.
- Katika ** Zcash **, Sapling anatumia ** BLS12-381 + Jubjub ** na Orchard anatumia mapengo ya ** Pallas / Vesta (Pasta) **; kila ufunguo na ahadi huishi juu ya haya.

---

## Orodha ya maneno

Neno. Maana ya Kiingereza ya kawaida.
|---|---|
Pointi kuridhisha `y^2 = x^3 + ax + b`, na maalum "kuongeza" ya pointi.
Sheria ya chord-na-tangent: mstari kupitia pointi mbili, kuchukua hit ya tatu, kutafakari.
** Pointi katika infinity (`O`) **. Curve ni "zero"; kuongeza ni mabadiliko chochote.
** Jenereta (`G`) **. A msingi uhakika ambao mara nyingi hatimaye kufunika kundi zima.
** Scalar kuzidisha (`kG`Kuongeza `G` yenyewe `k` nyakati; rahisi mbele, vigumu kurudi nyuma.
** ECDLP ** tatizo ngumu ya kufufua `k` kutoka `kG`; msingi wa usalama.
"Ujitoleaji wa kusamehewa" `v.G + r.H`; bahasha iliyofungwa ambayo huficha, hufunga, na kuongeza

---

## FAQ

** Kwa nini curves badala ya idadi kubwa tu mod msingi? **
Wote wanaweza kutoa barabara ya njia moja, lakini curves elliptic kufikia usalama huo kwa funguo ndogo sana na shughuli za haraka, na pointi yao hesabu ni bora kwa ajili ya ahadi.

** Je, ECDLP kuthibitika kuwa ngumu? **
Si * kuthibitishwa * haiwezekani, lakini miongo ya juhudi kali hawajapata mashambulizi ufanisi juu ya curves vizuri kuchaguliwa. Usalama inategemea kwamba dhana vizuri majaribio.

** Je, kompyuta ya quantum inaweza kuvunja hii? **
Kompyuta kubwa ya quantum inaweza kuvunja ECDLP. Hiyo ni inayojulikana ya muda mrefu wasiwasi katika sekta na eneo la utafiti hai; curves leo kubaki salama dhidi ya kompyuta classical.

** Kwa nini Zcash kutumia zaidi ya curve moja? **
Kazi tofauti. Curve moja hubeba zero-maarifa mfumo ushahidi; mwingine (kuingizwa katika uwanja wa kwanza) inafanya muhimu katika-ushahidi na ahadi shughuli ufanisi. makala yafuatayo kueleza kwa nini kwamba pairing mambo.

---

### Jaribu ufahamu wako wa ndani

Kutumia meza kuthibitishwa katika Sehemu ya 3, ni nini `9G + 10G` Na nini jibu anakuambia kuhusu `G`? * ((Jibu hapa chini.) *

<details><summary>Answer</summary>

`9 + 10 = 19`, na tuliona kwamba `19G = O`, uhakika katika infinity. Hivyo `9G + 10G = O`Hii inamaanisha `10G` ni **negative** (additive inverse) ya `9G`: pointi mbili ambazo kuongeza kwa "zero" uhakika. Juu ya curve, hasi ya uhakika ni tu picha yake kioo katika mhimili wa x, na kwa kweli `9G = (7,6)` na `10G = (7,11)` kushiriki sawa `x` na kuwa na `y`- Thamani ambazo jumla ya `17 = 0 (mod 17)`Muundo ni thabiti kikamilifu, ambayo ni nini hasa "ni kundi" dhamana.
</details>

---

### Ni nini kinachofuata

**Article 3 . Hashing and commitments:** we'll open up the "magic sealed envelope" properly. You've now seen one way to build a commitment from curve points; next we ask what hiding and binding really mean, meet hash functions, and connect both to the note commitments that anchor every Zcash payment.

* Sehemu ya * Zcash kutoka Kanuni za Kwanza * mfululizo kwa [ZecHub](https://zechub.org). Leseni CC BY-SA 4.0.*
