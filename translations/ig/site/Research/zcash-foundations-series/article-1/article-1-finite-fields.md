# Ogige ndị nwere njedebe: Usoro ọnụọgụgụ nke Cryptography bi na ya
##### Nnyocha mbụ sitere na [Annkkitaaa](https://github.com/Annkkitaaa)

! [Alt ederede](image-5.png)

### Ihe mere "ịtụgharị" bụ ntọala nzuzo nke Zcash

> **Series:** *Zcash site na First Principles* . **Article 1 .
> **Audience:** newcomers. We assume only ordinary school arithmetic (adding, multiplying, dividing). No prior cryptography or higher mathematics.
> **What you'll leave with:** an intuitive and correct understanding of finite fields, why cryptographers use them, and where they show up inside Zcash.

Na [Nkeji edemede 0](article-0-shielded-transaction.md) we met five characters: the note, the commitment, the note commitment tree, the nullifier, and the zero-knowledge proof. We left a loose end hanging: *where do all the keys and secret recipes actually come from?* They come from numbers. But not the ordinary numbers you grew up with. They come from a special, self-contained number system called a **finite field**, and almost every piece of cryptography in Zcash is built on top of it.

Isiokwu a na-enweta echiche ahụ nwayọ nwayọ. Dị ka ekwere na nkwa, nghọta mbụ. Enweghị usoro ruo mgbe ha na-akwụ ụgwọ maka onwe ha.

---

## 1. Gịnị mere o ji dị mkpa ka i lebara ha anya?

Nọmba nkịtị nwere nsogbu maka cryptography: e nwere ọtụtụ n'ime ha, ha na-agbakwa ozi.

Chee echiche ihe ga-eme mgbe ọnụọgụgụ na-ebuwanye ibu. `8,142,067`, you already know quite a lot: it's a seven-digit number, it's odd, it's "fairly large." Size is a clue. And clues are exactly what a privacy system cannot afford to give away.

Cryptography chọrọ usoro ọnụọgụ ebe:

- enwere ** ọtụtụ njedebe **, yabụ kọmputa nwere ike ịchekwa nke ọ bụla n'ime ha n'ụzọ ziri ezi na enweghị mgbatị na enweghị overflow,
- uru **adịghị leak ha size**, n'ihi na usoro nwere dịghị ezigbo echiche nke "nnukwu",
- ị ka nwere ike ịgbakwunye, wepụ, mụbaa, ma kewaa n'enweghị ihe mgbochi, n'ihi na ntụziaka cryptographic chọrọ ezigbo algebra iji rụọ ọrụ, na
- Enwere ike ime ka mbara igwe buru ibu, yabụ ịkọ nkọ enweghị olileanya.

Ndepụta ọchịchọ ahụ nwere aha. Ọ bụ ** ubi a na-ejedebe **. Ka anyị wuo ihe omimi maka otu tupu anyị ede otu akara.

---

## 2. Ọgụgụ isi: elekere

Ị na-ejikarị ebe a na-agwụ agwụ eme ihe kwa ụbọchị. Ọ bụ elekere dị na mgbidi gị.

On a 12-hour clock, numbers *wrap around*. Start at 10 o'clock, add 5 hours, and you don't land on "15 o'clock," you land on **3 o'clock**. The clock has only twelve positions, and counting past the top simply loops back to the start.

! [Alt ederede](image-9.png)

Ihe atọ mere n'oge na-adịbeghị anya bụ isi ihe dị n'isiokwu a:

1. **Ụwa bụ ebe a na-emechi emechi.** E nwere ọnọdụ iri na abụọ, n'agbanyeghị ogologo oge ị gụrụ.
2. ** Ịgbakwunye ka na-arụ ọrụ.** Ị nwere ike ịgbakwunye awa kwa ụbọchị; ị na-ada mgbe niile na ọnọdụ elekere ziri ezi.
3. **Ogo kwụsịrị ihe.** "3 o'clock" anaghị agwa gị ma ị gụrụ awa 3 ma ọ bụ 15 maọbụ 27. *Wrap-around *ehichapụ ozi nha.* Ihichapụ ahụ bụ kpọmkwem ihe nzuzo anyị chọrọ.

Nke a wrap-gburugburu mgbakọ na mwepụ nwere a ukara aha: ** modular mgbakọ na eze **. The elekere ọrụ "modulo 12," dere ** mod 12 **. Mathematicians ahọrọ ịgụ ọnọdụ malite na 0, otú a "elekere mod 12" n'ezie nwere ọnọdụ `0, 1, 2, ..., 11`Oge elekere mod 7 ga-enwe ọnọdụ `0` site na `6`.

> **Otu iwu:** iji gbakọọ ihe ọ bụla "mod p", mee mgbakọ na mwepụ nkịtị, wee kewaa site `p` ma debe naanị ihe fọdụrụnụ.
> Ihe Nlereanya mod 7: `5 + 4 = 9`, na `9` akwụkwọ ndụ akwụkwọ ndụ fọdụrụ `2` mgbe ekewara site `7`, so `5 + 4 = 2 (mod 7)`.

---

## 3. Site n'elekere gaa n'ubi

Oge elekere na-eme ka anyị gbakwunye. A ** ubi ** bụ nkwalite: usoro ọnụọgụ ebe arụmọrụ anọ niile na-akpa agwa, gụnyere nke ahụ dị mgbagwoju anya, nkewa.

Informally, a **field** is any collection of "numbers" where you can **add, subtract, multiply, and divide** (by anything except zero), and all the familiar rules still hold: order doesn't matter for addition or multiplication, brackets can be regrouped, there's a `0` na a `1`, na ọnụọgụ ọ bụla nwere ihe na-adịghị mma na (ma e wezụga `0`) nke na-eme ka mmadụ abụọ ahụ nwee mmekọrịta.

Nọmba ndị nwere ezi uche bụ mpaghara. Ọnụ ọgụgụ ndị dị adị bụ mpaghara ihe anyị chọrọ bụ * njedebe *.

Nke a bụ isi ihe si na ya pụta, ọ dịkwa mma:

> ** Were nọmba ndị ahụ dum `0, 1, ..., p-1` ma na-eme ihe niile arithmetic mod `p`. If `p` bụ nọmba mbụ, nsonaazụ ya bụ mpaghara nwere njedebe.** Anyị na-ede ya `F_p` (gụọ "F sub p").

So `F_7 = {0, 1, 2, 3, 4, 5, 6}` site na usoro elekere-ụdị mgbakọ na mwepụ mod 7 bụ ezigbo ubi nwere njedebe. Ka anyị hụ ya ka ọ na-eku ume.

### Ịba ụba na F_7 (nyochara)

Ntinye ọ bụla bụ `(row x column) mod 7`:

| x | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| **0** | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **1** | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| **2** | 0 | 2 | 4 | 6 | 1 | 3 | 5 |
| **3** | 0 | 3 | 6 | 2 | 5 | 1 | 4 |
| **4** | 0 | 4 | 1 | 5 | 2 | 6 | 3 |
| **5** | 0 | 5 | 3 | 1 | 6 | 4 | 2 |
| **6** | 0 | 6 | 5 | 4 | 3 | 2 | 1 |

Lelee ahịrị ndị ahụ maka `1` site na `6`: onye ọ bụla nwere uru ọ bụla na-abụghị efu `1..6` Ọdịdị ahụ "enweghị ikwugharị, ọ dịghị ihe na-efu" bụ akara mkpịsị aka a na-ahụ anya nke ubi.

### Nkewa: anwansi nke na-achọ isi okwu

Nkewa bụ naanị "mmụba site na reciprocal". `F_7`, nke a na-akpọ reciprocal (ma ọ bụ **inverse**) nke ọnụọgụ `a` bụ uru `a^(-1)` maka nke `a x a^(-1) = 1`. Ịgụ ha ozugbo site na tebụl:

| `a` | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| `a⁻¹` | 1 | 4 | 5 | 2 | 3 | 6 |

Lelee nke mbụ: `2 x 4 = 8 = 1 (mod 7)`Ya mere "kewaa site na 2" n'ime `F_7` pụtara "mmụba site na 4." Onye ọ bụla na-abụghị efu nwere onye òtù ọlụlụ. ** Nke ahụ bụ ihe na-eme ka `F_7` ubi.**

---

## 4. Ihe mere modulus ga-eji bụrụ nke mbụ

Nke a bụ echiche kachasị mkpa n'isiokwu a, yabụ ka anyị mee ka ọ bụrụ ihe doro anya kama ịkọwapụta ya.

Lelee ihe na-agbaji ma ọ bụrụ na anyị na-agbalị iji wuru a "ubi" mod `6` (na `6` bụ *ọ bụghị* isi):

> È nwere nke ọ bụla `x` na `2 x x = 1 (mod 6)`? Na-enyocha ha niile: `2x0=0, 2x1=2, 2x2=4, 2x3=0, 2x4=2, 2x5=4`. ** Azịza ya `1` ọ dịghị mgbe ọ na-apụta.** Ya mere `2` enweghị mmeghachi omume mod 6. njọ, `2 x 3 = 6 = 0 (mod 6)`: ọnụọgụ abụọ na-abụghị efu mụbara iji nye efu.

That second sentence is a catastrophe for arithmetic. Two nonzero things multiplying to zero (called a **zero divisor**) means division is broken, and a system with broken division is not a field. It happens precisely because `6` ihe ndị dị ka `2 x 3`.

A prime, by definition, has no such factors. So mod a prime, no zero divisors can appear, every nonzero element gets a clean reciprocal, and the structure is a proper field.

! [Alt ederede](image-8.png)

> ** Otu-liner reusable maka isiokwu gị: ** * prime modulus n'ime, ọcha nkewa si.*

---

## 5. Otu usoro bara uru izute: otú kọmputa si achọta inverses

Anyị na-agụ inverse si a table maka `F_7`, ma Zcash's prime nwere ọtụtụ narị digits; enweghị tebụl ga-ekwe omume. Enwere ụzọ mkpirisi kpochapụla, ọ bụkwa naanị usoro dị n'isiokwu a.

**Fermat's Little Theorem** na-ekwu na maka prime `p` na ihe ọ bụla na-abụghị efu `a`:

```
a^(p-1) = 1   (mod p)
```

Gbanwee ya (wepụ otu ihe nke `a`) ị ga-enwetakwa ihe dị iche n'efu:

```
a^(-1) = a^(p-2)   (mod p)
```

Nnwale na `F_7` (`p = 7`, so `p - 2 = 5`): ihe inverse nke `2` kwesịrị ịbụ `2^5 = 32 = 4 (mod 7)`N'ezie , tebụl anyị kwuru `2^(-1) = 4`Kọmputa na-ebute nnukwu ike ngwa ngwa, yabụ nke a na-eme ka "chọta ihe dị iche" n'ime ngụkọta ọsọ ọsọ, nke ziri ezi ọbụna maka ọnụ ọgụgụ ndị buru ibu.

Ịkwesighi iburu nke a n'isi. Ịkwesịrị ịma na ** nkewa n'ọhịa nwere njedebe bụ ngwa ngwa, arụmọrụ zuru oke **, nke bụ kpọmkwem ihe mere ndị na-emepụta ihe nzuzo ji enwe obi ụtọ iwulite ya.

---

## 6. Ihe mere nkà mmụta nzuzo ji malite inwe mmasị n'ihe ndị a na-apụghị ịgụta ọnụ

N'ịchịkọta ihe ọmụma ahụ, lee ihe ndekọ ahụ dum n'otu peeji.

Ihe onwunwe `F_p` ❑ Gịnị mere usoro nzuzo ji chọọ ya ❑ Olee ihe mere ị ga-eji chọọ ya?
|---|---|
** Finite ** Kọmputa na-echekwa ihe ọ bụla n'ụzọ ziri ezi; enweghị mgbatị, enweghị overflow, enweghị ntụpọ na-ese n'elu mmiri.
**Wrap-around**. Ehichapụ "size", yabụ uru anaghị agbapụta ihe ọ bụla gbasara etu esi mepụta ya.
**Ọrụ anọ niile na-arụ ọrụ** Ntụziaka cryptographic (mkpịsị ugodi, nkwa, ihe akaebe) chọrọ ezigbo algebra, ọ bụghị naanị ịgụta ọnụ.
∙∙∙ ** Nhọrọ nha ** ∙• Họrọ 255-bit ma ọ bụ 381-bit isi na ubi nwere ihe ndị ọzọ karịa e nwere atọm na observable eluigwe na ala; guessing bụ enweghị olileanya
| **Exact and deterministic** | Two honest parties computing the same thing always get identical results, which proofs depend on |

A finite field is, in one phrase, **a perfectly closed, perfectly exact, perfectly huge playground for arithmetic.** Everything else in Zcash is built by playing inside it.

---

## Ebe nke a bi na Zcash

Ikwesighi iwere "Zcash na-eji ubi ndị nwere njedebe" na okwukwe. Nke a bụ map ahụ (igwe dị omimi bụ maka isiokwu ndị ọzọ; nke a bụ naanị igosi na mkpịsị aka dị adị).

- **Sapling** (an older shielded design) builds its proofs over a curve called **BLS12-381**, whose base field uses a prime that is **381 bits** long. Every coordinate, key, and proof element is an element of a finite field built on that prime.
- **Orchard** (the current shielded design) uses a pair of curves called **Pallas and Vesta** (the "Pasta" curves), whose fields use primes roughly **255 bits** long.
- **not commitment**, the **nullifier**, and the numbers inside a **zero-knowledge proof** from Article 0 are all, at bottom, elements of one of these finite fields. Mgbe protocol kwuru "compute this commitment", ọ pụtara "mee nke a arithmetic mod that prime".

! [Alt ederede](image-7.png)

So the answer to Article 0's open question, *"where do the secret recipes come from?"*, begins here: **everything starts as arithmetic in a finite field.** In the next article we'll take that field and build the actual objects, points on an elliptic curve, that become keys and commitments.

---

## 8. Onye na-ekwu eziokwu

Iji nọrọ ọhụrụ-enyi na enyi anyị simplified a ole na ole ezi ihe. `F_p` I nwekwara ike iji ya rụọ ubi. `p^n` elements (called **extension fields**), and those matter for the "pairings" that Sapling's proof system relies on. We also skipped the full list of field axioms and glossed over how primes of this size are chosen and validated. None of that changes the intuition you now hold; it refines it. We'll add the precision back, with flags, when a later article needs it.

---

## 9. Nchịkọta

- Cryptography needs a number system that is **finite, exact, size-blind, fully invertible, and enormous.** That system is a **finite field**.
- Intuition bụ ** elekere **: mgbakọ na mwepụ nke ** na-ekpuchi gburugburu ** (modular arithmetic), nke na-ehichapụ "nha" nke ọnụọgụ.
- Ịgụ nọmba `0..p-1` mod a **prime** `p` na-enye ezigbo ubi `F_p`, ebe ị nwekwara ike kewaa n'ihi na ọ bụla na-abụghị efu mmewere nwere ihe inverse.
- Modul ahụ ** ga-abụrịrị isi**: modulus mejupụtara na-emepụta ndị na-ekewa efu (dịka `2 x 3 = 0 mod 6`) ma mebie nkewa.
- Kọmputa na-achọpụta ngwa ngwa ngwa site na ** Fermat's Little Theorem ** (`a^(-1) = a^(p-2)`).
- Na **Zcash**, igodo ọ bụla, nkwenye, ihe na-eme ka ọ ghara ịdị irè, na ihe akaebe bụ n'ikpeazụ ihe dị n'ime nnukwu ubi nwere njedebe (ubi Pasta 255-bit maka Orchard, ubi 381-bit maka BLS12-381 nke Sapling).

---

## Okwu

Okwu. N'asụsụ Bekee nkịtị pụtara.
|---|---|
**Modular arithmetic** Arithmetics nke na-agbanye gburugburu mgbe ọ ruru uru a kapịrị ọnụ, dị ka elekere.
"Kekọrịta site na `p` ma debe ihe fọdụrụnụ".
** Ubi ** Ọ bụ usoro ọnụọgụgụ ebe agbakwunye, wepụ, mụbaa, ma kewaa ọrụ niile.
** Ala nwere njedebe `F_p`Ọnụ ọgụgụ ndị ahụ `0..p-1` na arithmetic mere mod a isi `p` |
** Inverse (reciprocal) ** Ihe ahụ `a^(-1)` na `a x a^(-1) = 1`; "kewara site na `a`" pụtara ịba ụba ya.
** Zero divisor**: Ihe abụọ na-abụghị efu nke ngwaahịa ha bụ zero; ihe na-emebi moduli mejupụtara.
 **Prime**  Ọnụ ọgụgụ zuru oke karịrị 1 na enweghị ihe ọ bụla ma e wezụga 1 na onwe ya

---

## FAQ

**Gịnị mere na ọ bụghị naanị iji integers nkịtị ma ọ bụ decimals?**
Decimals round and drift; integers grow without bound and leak size. Finite fields are exact, bounded, and size-blind, which cryptography requires.

**"Wrap around" ọ na-efunahụ ozi?**
N'ebumnuche, ee. Ihichapụ nha nke ụkpụrụ dị n'etiti bụ atụmatụ, ọ bụghị ahụhụ, maka nzuzo.

**Ọ bụ na ọ bụrụ na ọnụọgụgụ buru ibu karịa nke mbụ, ọ ga-adị nchebe karịa?**
Loosely, a bigger field means more possible values and harder guessing, but security depends on the whole construction, not the field size alone. Later articles make this precise.

**Gịnị kpatara ọnụọgụ ndị a akọwapụtara (255-bit, 381-bit) na Zcash?**
A na-ahọrọ ha ka usoro ndị e wuru n'elu ha nwee usoro ziri ezi na arụmọrụ maka usoro ihe akaebe. "Nhazi ziri ezi" ahụ bụ isiokwu nke isiokwu abụọ na-esonụ.

---

### Nwalee ihe ndị ị na-aghọta

In `F_7`, ihe bụ `5 - 6`(Cheta: nọrọ n'ime ụlọ `{0,...,6}` site n'ịtụgharị ya.) *(Zaa ajụjụ dị n'okpuru.)*

<details><summary>Answer</summary>

`5 - 6 = -1`, na `-1` a fụchiri n'ime `F_7` is `6` (n'ihi na `6 + 1 = 7 = 0`). So `5 - 6 = 6 (mod 7)`Nwepu anaghị ahapụ ubi ahụ; ọ na-agbanye n'ụzọ ọzọ.
</details>

---

### Kedu ihe ọzọ

**Article 2 . Elliptic curves:** we take the finite field we just built and use it to draw a strange kind of curve whose points can be "added" together. Those points become Zcash's keys and commitments, and they hide a one-way trapdoor that makes the whole privacy system possible. Intuition first, as always.

* Akụkụ nke usoro Zcash sitere na First Principles * maka [ZecHub]](https://zechub.org)Akwụkwọ ikike CC BY-SA 4.0.*
