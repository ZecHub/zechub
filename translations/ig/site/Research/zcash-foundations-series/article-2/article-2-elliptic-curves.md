# Elliptic Curves: Ebe a mụrụ igodo na nkwa nke Zcash
##### Nnyocha mbụ sitere na [Annkkitaaa](https://github.com/Annkkitaaa)

! [Alt ederede](image-10.png)

### Okporo ámá nwere nanị otu ụzọ nke e si n'ebe ndị dị n'akụkụ ụzọ gbagọrọ agbagọ wuo

> **Series:** *Zcash site na First Principles* . **Article 2 .
> **Ndị na-ege ntị:** ndị bịara ọhụrụ. Anyị na-ewere naanị [Nkeji edemede 1 (ubi nwere njedebe)](article-1-finite-fields.md): mgbakọ na mwepụ nke na-ekpuchi gburugburu mod a. Ọ dịghị mkpa ihe ọzọ.
> **What you'll leave with:** an intuitive and correct picture of elliptic curves, the "trapdoor" that makes them useful, and exactly how Zcash turns them into keys and commitments.

[Ihe nke 1](article-1-finite-fields.md) gave us a perfect playground for arithmetic: the finite field. But a field on its own is just numbers. To build keys and the "sealed envelopes" from [Article 0](article-0-shielded-transaction.md), Zcash chọrọ ihe nwere nsogbu pụrụ iche, otu ụzọ siri ike: dị mfe iji gbakọọ n'ihu, ọ fọrọ nke nta ka ọ bụrụ ihe na-agaghị ekwe omume ịlaghachi azụ. Ihe ahụ bụ ** elliptic curve **. Isiokwu a na-ewu ya site na ala, nghọta tupu algebra.

---

## 1. Gịnị mere o ji dị mkpa ka i lebara ha anya?

Usoro nzuzo ọ bụla chọrọ okporo ámá nwere naanị otu ụzọ: ọrụ nke na-adịghị mkpa ịga n'ihu ma bụrụ nke a na-apụghị ịlaghachi azụ.

Here's why. Your **secret key** is a number you keep hidden. Your **public key** (and your address) is derived from it and shown to the world. The entire security of the system rests on one fact: *given the public key, nobody can work backwards to your secret key.* If they could, they could spend your money.

Ya mere, anyị chọrọ ọrụ mgbakọ na mwepụ ebe:

- ịga **n'ihu** (nzuzo -> ọha) dị ngwa ma dị mfe, mana
- ịga ** azụ ** (ọha -> nzuzo) siri ike nke na kọmputa niile dị n'ụwa na-arụ ọrụ maka ndụ nke eluigwe na ala agaghị arụcha.

Plain finite-field multiplication isn't good enough; division undoes it instantly (that was the whole point of Article 1). We need something with no easy "undo" button. Elliptic curves provide exactly that, and as a bonus, their points combine in a way that's perfect for building commitments. Let's see how.

---

## 2. Ihe ị na-aghọtaghị: akụkụ ya ndị ị pụrụ "ịgbakwunye"

Echefu cryptography maka a oge. ** elliptic usoro ** bụ naanị set nke ihe `(x, y)` na-emeju otu nha nke ọdịdị:

```
y^2 = x^3 + ax + b
```

Over ordinary numbers it looks like a smooth, swooping curve, often with a rounded loop and two tails:

! [Alt ederede](image-14.png)

Ihe na-eju anya n'ezie: ** ị nwere ike "tinye" isi abụọ na usoro a iji nweta isi nke atọ na otu usoro ahụ.** Nke a abụghị mgbakwunye nke nhazi. Ọ bụ iwu geometric, ọ dịkwa mfe * ịhụ * karịa ikwu.

### Ụkpụrụ chord (ịgbakwunye ihe abụọ dị iche iche)

Iji gbakwunye `P + Q`:

1. Detuo ahịrị kwụ ọtọ site na `P` na `Q`.
2. Ahịrị ahụ na-adaba na curve n'otu ebe ọzọ. Kpọọ ya `R*`.
3. ** Chebara ya echiche `R*` n'ofe axis ahụ.** Ntụgharị uche ahụ bụ azịza ya, `P + Q`.

! [Alt ederede](image-11.png)

### Ụkpụrụ nke tangent (ịgbakwunye otu isi n'onwe ya)

Iji gbakọọ `P + P` (ederede `2P`), o nweghi ebe nke abuo i ga-adọta akara, ya mere i ji akara tangent na `P` Kama nke ahụ, gbasoo otu usoro "ntakịrị ụzọ nke atọ, ma tụgharịa uche".

That's the entire operation. Two geometric rules. With them, the points of an elliptic curve form what mathematicians call a **group**: a set with a well-behaved "addition." It even has a "zero."

### Ebe na-adịghị agwụ agwụ (nke dị n'elu)

Usoro ọnụọgụ ọ bụla chọrọ `0`, ihe na-agbanweghi ihe ọbụla mgbe ị gbakwunyere ya. N'elu usoro elliptic, ọrụ ahụ bụ site n'otu ebe pụrụ iche a na-akpọ **point at infinity**, nke e dere `O`I nwere ike iche ya dị ka "ebe dị anya nke na-enweghị nsọtụ", ebe ahịrị ndị kwụ ọtọ na-agbakọ. `O` n'ebe ọ bụla na-ahapụ ya agbanweghị agbanwe, kpọmkwem dị ka ịgbakwunye `0`.

---

## 3. Site n'ihe osise gaa n'ọhịa a kpaara ókè

The ezigbo usoro n'elu bụ *intuition*. Ma Zcash adịghị eji ezigbo nọmba (ha gburugburu na leak size, kwa Nkeji edemede 1). Ọ na-eji ihe elliptic usoro **n'elu a n'ókèala**: otu akụkụ `y^2 = x^3 + ax + b`, ma na arithmetic niile emere mod a isi.

Mgbe i mere nke ahụ, ọmarịcha curve ahụ ga-agbaji n'ime ihe dị iche iche na-enweghị njikọ, otu ntụpọ maka nke ọ bụla `(x, y)` di na nwunye nke na-eme ka ihe nhata mod `p`Ọ na-akwụsị ịdị ka a usoro na niile. Ma ebe a bụ ihe dị mkpa:

> ** The algebra nke chord-and-tangent iwu ka na-arụ ọrụ n'ụzọ zuru okè.** Otu formulas na hụrụ `P + Q` geometrically now compute it with finite-field arithmetic. The dots still form a group, with the same `0` (ebe na-enweghị ngwụcha).

Ka anyị mee ka nke a bụrụ eziokwu site n'iji obere ihe atụ e nyochara nke ọma mee ihe.

### A zuru ezu usoro, gbakọọ kpọmkwem

Were ya `y^2 = x^3 + 2x + 2` n'elu ubi a na-ejedebe `F_17`. Ịgụpụta isi ihe ọ bụla bara uru na-enye kpọmkwem **18 isi, gbakwunyere isi na enweghị njedebe = 19 ngụkọta.** Ole na ole n'ime ha:

```
(0,6) (0,11) (3,1) (3,16) (5,1) (5,16) (6,3) (6,14) (7,6) (7,11) ...
```

Ugbu a họrọ ebe `G = (5, 1)` ma na-agbakwunye ya n'onwe ya. Lee ihe na-eme (ahịrị nke ọ bụla dị n'okpuru ebe a bụ nke e mere atụmatụ, ọ bụghị nke e chepụtara echepụta):

Nzọụkwụ. Ebe.
|---|---|---|---|
| `1G` | (5, 1) | `11G` | (13, 10) |
| `2G` | (6, 3) | `12G` | (0, 11) |
| `3G` | (10, 6) | `13G` | (16, 4) |
| `4G` | (3, 1) | `14G` | (9, 1) |
| `5G` | (9, 16) | `15G` | (3, 16) |
| `6G` | (16, 13) | `16G` | (10, 11) |
| `7G` | (0, 6) | `17G` | (6, 14) |
| `8G` | (13, 7) | `18G` | (5, 16) |
| `9G` | (7, 6) | `19G` **O (enweghị ngwụcha) **
| `10G` | (7, 11) | | |

Ihe abụọ ị ga-arịba ama:

- Ọ na-eleta ebe iri na asatọ niile ma mechaa rute n'ebe ahụ. `O`** na nzọụkwụ 19, mgbe ahụ, ọ ga-ekpeghachi ruo mgbe ebighị ebi. `G` "na-emepụta" ìgwè ahụ dum, ya mere anyị na-akpọ ya onye na-emepụta ihe.
- Ọ bụ otu ndị e nyochara: dịka ọmụmaatụ `1G + 2G = (5,1) + (6,3) = (10,6)`, nke bụ kpọmkwem `3G`. Mgbakwunye ahụ na-agbanwe agbanwe n'ime, dịka otu ìgwè chọrọ.

---

## 4. Ọnụ ụzọ: ịba ụba scalar

Tebụl ahụ nke `1G, 2G, 3G, ...` bụ obi ihe niile. Ịgbakwụnye isi ihe ugboro ugboro na onwe ya ka a na-akpọ ** scalar multiplication **: isi ihe `kG` pụtara "`G` agbakwunye na onwe ya `k` oge. "

Ugbu a, ka anyị tụlee ụzọ abụọ e si eme anwansi:

Ntuziaka. Ajụjụ. Ihe isi ike.
|---|---|---|
** Na-aga n'ihu ** Given `k` na `G`, gbakọọ `kG` Ọ dị mfe. Ọbụna maka nnukwu mbara igwe. `k`, a trick called *double-and-add* gets there in a few hundred steps |
 ** Na-alaghachi azụ **  `G` na `kG`, gbakee `k` ** Ọ gaghị ekwe omume ** na ezigbo usoro nzuzo.

Nke ahụ asymmetry bụ ** otu ụzọ n'okporo ámá ** anyị mkpa na Nkebi nke 1. `k` produced this point?") is called the **Elliptic Curve Discrete Logarithm Problem (ECDLP)**, and on the curves Zcash uses, no known method solves it before the heat death of the universe.

! [Alt ederede](image-12.png)

> N'egwuregwu anyị `F_17` I nwere ike ịgụ ya `k` Ezi curves nwere gburugburu `2^(255)` N'ihi ya, ọ bụrụ na anyị agụọ ihe ndị a n'akwụkwọ ahụ, anyị ga-achọpụta na e nwere ihe ndị ọzọ dị mkpa anyị kwesịrị ime.

---

## 5. Otú e si enweta mkpịsị ugodi (ụgwọ ọrụ)

Ugbu a anyị nwere ihe nile dị mkpa iji kọwaa ezigbo igodo nzuzo, ọ dịkwa nnọọ mfe:

> **Họrọ nọmba nzuzo `k`. Kwusawa okwu ahụ `kG`Nke ahụ bụ ya.
> `k` bụ igodo nzuzo gị. `kG` bụ gị ** ọha isi **. The otu ụzọ n'okporo ámá (ECDLP) ana achi achi dịghị onye nwere ike na-agba ọsọ `kG` laghachi na `k`.

This single idea, *a public key is a secret scalar times a fixed generator*, is the seed of Zcash's spending keys, viewing keys, and addresses. The full key tree layers more structure on top, but every branch grows from this root.

### Ego: ihe mere curve isi na-eme ka zuru okè nkwa

Recall the "sealed envelope" (commitment) from Article 0, which had to **hide** its contents yet be **impossible to forge**. Elliptic curves hand us a clean way to build one. Take two fixed, public generator points `G` na `H`, ihe nzuzo bara uru `v`, na ọnụọgụ na-eme ka mmadụ kpuo ìsì `r`, na ụdị:

```
Commitment  =  v.G  +  r.H
```

Nke a bụ nkwa Pedersen, ma nwee ihe abụọ anyị chọrọ:

- **Izobe:** ihe na-eme na mberede `r` na-eme ka nsonaazụ ahụ gafee usoro ahụ dum, ya mere, isi ihe ahụ anaghị ekpughe ihe ọ bụla gbasara `v`.
- ** Ikike:** ECDLP na-eme ka ọ ghara ikwe omume ịchọta *dị iche iche* `(v, r)` na-enye otu isi ihe, yabụ na ị gaghị agbanwe obi gị banyere ihe i kwere nkwa ime.

A bonus onwunwe na-aghọ priceless mgbe e mesịrị: ndị a nkwa **gbakwunye elu**. `v_1` gbakwunyere nkwa `v_2` bụ nkwekọrịta dị irè `v_1 + v_2`. That "homomorphic" behaviour is how Zcash will later prove that the money going *into* a transaction equals the money coming *out*, without revealing any amount. We'll cash that in around Article 6.

---

## Ebe nke a bi na Zcash

Mkpịsị aka ndị ahụ bụ ihe e ji n'aka ma bụrụ ndị a pụrụ inyocha enyocha.

Zcash design curves ọ na-eji ọrụ
|---|---|---|
| **Sapling** (older) | **BLS12-381** plus an embedded curve called **Jubjub** | BLS12-381 carries the proof system; Jubjub is built over BLS12-381's scalar field so that key and commitment operations are cheap to perform *inside* a zero-knowledge proof |
| **Orchard** (current) | **Pallas** and **Vesta** (the "Pasta" cycle) | Pallas carries Orchard's keys and commitments; the Pallas/Vesta pairing is specially arranged to make advanced proofs efficient |

The reasons one curve gets "embedded" inside another's field, and why a *cycle* of two curves is useful, are real and important, but they belong to the proof-system articles. For now the takeaway is solid: **every Zcash key is a scalar times a generator, and every Zcash commitment is a sum of curve points**, living on one of these named curves.

! [Alt ederede](image-13.png)

---

## 7. Onye na-akwụwa aka ọtọ

Ihe ole na ole e mere iji mee ka ọ dị mfe ọgụgụ.`y^2 = x^3 + ax + b`); Zcash's curves are often written in other equivalent forms (Jubjub is a *twisted Edwards* curve) chosen for efficiency and safety, but the group idea is identical. We didn't define the exact point-addition formulas (they're the algebraic version of "third intersection, then reflect"), and we set aside subtleties like curve order, cofactors, and "pairings," which become important in the proof-system articles. None of this changes the intuition; it sharpens it.

---

## 8. Nchịkọta

- Usoro nzuzo chọrọ okporo ụzọ otu ụzọ: ọ dị mfe ịga n'ihu, enweghị ike ịlaghachi azụ. usoro elliptic na-enye otu.
- A **elliptic curve** bụ set nke isi ihe na-emeju `y^2 = x^3 + ax + b`, and its points can be **added** via the geometric **chord-and-tangent** rule, with a special **point at infinity** acting as zero.
- Over a **finite field** the curve becomes a scatter of dots, but the same addition still works and the points form a **group**. (Verified example: `y^2 = x^3 + 2x + 2` n'elu `F_17` nwere isi iri na itoolu, na `G = (5,1)` na-emepụta ha niile.)
- **Mgbakọta scalar** `kG` Ọ dị mfe ịgbakọ ma ọ gaghị ekwe omume ịgbanwe: ECDLP. Nke ahụ bụ ọnyà.
- ** Igodo: ** igodo nzuzo `k`, igodo ọha `kG`. **Nkwekọrịta:** Pedersen ụdị `v.G + r.H`, nke na-ezo, na-ejikọta, ma na-agbakwunye.
- In **Zcash**, Sapling uses **BLS12-381 + Jubjub** and Orchard uses the **Pallas/Vesta (Pasta)** curves; every key and commitment lives on these.

---

## Okwu

Okwu. N'asụsụ Bekee nkịtị pụtara.
|---|---|
** Elliptic curve ** Points afọ ojuju `y^2 = x^3 + ax + b`, na "nchịkọta" pụrụ iche nke isi ihe.
Ụkpụrụ chord-and-tangent: akara site na isi ihe abụọ, were nke atọ, tụgharịa uche.
**Ebe na-enweghị njedebe (`O`) **  Ọkpụkpụ ahụ bụ "efu"; ịgbakwunye ya agbanweghị ihe ọ bụla.
** Onye na-emepụta ihe (`G`) **. Ebe ndabere nke ọtụtụ ya na-emecha kpuchie ìgwè ahụ dum.
** Mgbakọta scalar (`kG`) ** Ịgbakwunye `G` onwe ya `k` Oge; ọ dị mfe ịga n'ihu, siri ike ịlaghachi azụ.
Nsogbu siri ike nke mgbake `k` site na `kG`; ntọala nchekwa
♬ **Pedersen nkwa nkwa** ♬ `v.G + r.H`; envelopu e mechiri emechi nke na-ezo, na-ejikọta, ma na-agbakọ.

---

## FAQ

**Gịnị mere curves kama ịbụ naanị nnukwu ọnụọgụ mod a prime?**
Ha abụọ nwere ike inye otu ụzọ, mana elliptic curves na-enweta otu nchekwa ahụ na igodo pere mpe ma rụọ ọrụ ngwa ngwa, na ntụpọ arithmetic ha dị mma maka nkwa.

** ECDLP egosila na o siri ike?**
Ọ bụghị ihe a na-apụghị ime eme, ma ọtụtụ iri afọ nke mgbalị siri ike achọtaghị mwakpo dị irè n'akụkụ ndị a họọrọ nke ọma. Nchebe dabeere na nkwenye ahụ a nwalere nke ọma

Kọmputa kọmpụta ọ̀ pụrụ imebi ihe a?
Kọmputa kọmpụta buru ibu nwere ike imebi ECDLP. Nke ahụ bụ nchegbu a maara ogologo oge n'ime ụlọ ọrụ na mpaghara nyocha na-arụsi ọrụ ike; usoro nke taa ka dị nchebe megide kọmputa ndị mgbe ochie.

**Gịnị mere Zcash ji eji ihe karịrị otu usoro?**
Different jobs. One curve carries the zero-knowledge proof system; another (embedded in the first's field) makes the in-proof key and commitment operations efficient. The next articles explain why that pairing matters.

---

### Nwalee ihe ndị ị na-aghọta

N'iji tebụl e nyochara enyocha dị na Nkebi nke 3, gịnị bụ `9G + 10G` Gịnị ka azịza ya na-agwa gị banyere `G`? *(Zaa n'okpuru.) *

<details><summary>Answer</summary>

`9 + 10 = 19`, anyị hụkwara nke ahụ `19G = O`, bụ ebe na-enweghị ngwụcha. `9G + 10G = O`Nke a pụtara `10G` bụ **negative** (additive inverse) nke `9G`: two points that add to the "zero" point. On a curve, a point's negative is just its mirror image across the x-axis, and indeed `9G = (7,6)` na `10G = (7,11)` na-ekerịta otu ihe ahụ `x` ma nwee `y`- uru ndị na-agbakọta `17 = 0 (mod 17)`Ọdịdị ahụ kwekọrọ nnọọ ekwekọ, nke bụ kpọmkwem ihe "ọ bụ otu" na-ekwe nkwa.
</details>

---

### Kedu ihe ọzọ

**Article 3 . Hashing and commitments:** we'll open up the "magic sealed envelope" properly. You've now seen one way to build a commitment from curve points; next we ask what hiding and binding really mean, meet hash functions, and connect both to the note commitments that anchor every Zcash payment.

* Akụkụ nke usoro Zcash sitere na First Principles * maka [ZecHub]](https://zechub.org)Akwụkwọ ikike CC BY-SA 4.0.*
