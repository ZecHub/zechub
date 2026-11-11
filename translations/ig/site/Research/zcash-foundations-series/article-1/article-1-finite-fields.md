# Ubi Ọnụọgụ Nwere Oke [Finite Fields]: Usoro Ọnụọgụgụ Cryptography Bi N’ime Ya
##### Nnyocha Mbụ sitere n’aka [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-5-6e8a8950f8.webp)

### Ihe mere “ịlaghachi n’mbido” ji bụrụ ntọala nzuzo nke Zcash

> **Usoro isiokwu:** *Zcash sitere na Ụkpụrụ Mbụ* . **Isiokwu 1 . Ubi Ọnụọgụ Nwere Oke**
> **Ndị e bu n’uche:** ndị mbido. Anyị na-atụ anya naanị mgbakọ ụlọ akwụkwọ nkịtị (ịgbakwunye, ịmụba, ikewa). Enweghị mkpa ịma cryptography ma ọ bụ mgbakọ dị elu tupu oge a.
> **Ihe ị ga-enwe mgbe ị gụchara:** nghọta doro anya na nke ziri ezi banyere finite fields, ihe mere ndị cryptographer ji eji ha, na ebe ha pụtara n’ime Zcash.

N’ime [Isiokwu 0](article-0-shielded-transaction.md) anyị zutere agwa ise: note, commitment, osisi note commitment, nullifier, na zero-knowledge proof. Anyị hapụrụ ajụjụ a na-azabeghị: *eziokwu, olee ebe igodo niile na usoro nzuzo ndị ahụ si abịa?* Ha si n’ọnụọgụ abịa. Ma ọ bụghị ọnụọgụ nkịtị ndị ị tolitere na ha. Ha sitere n’usoro ọnụọgụ pụrụ iche, nke na-adabere n’onwe ya a na-akpọ **ubi ọnụọgụ nwere oke [finite field]**, ọ fọkwara nke nta ka ọ bụrụ akụkụ cryptography niile dị n’ime Zcash ka e wuru n’elu ya.

Isiokwu a ga-eji nwayọọ nwayọọ kọwaa echiche ahụ. Dị ka e kwere nkwa, nghọta mbụ. Enweghị usoro mgbakọ ruo mgbe ha bara uru n’onwe ha.

---

## 1. Gịnị mere nke a ga-eji metụta gị?

Ọnụọgụ nkịtị nwere nsogbu maka cryptography: ha enweghị njedebe, ha na-ekpughekwa ozi.

Chee echiche banyere ihe na-eme mgbe ọnụọgụ *na-ebuwanye ibu*. Ọ bụrụ na m agwa gị na mgbakọ nzuzo wepụtara `8,142,067`, ị maraworị ọtụtụ ihe: ọ bụ ọnụọgụ nwere ọnụọgụgụ asaa, ọ bụ ọnụọgụ na-adịghị ekewa nke ọma site na 2, ọ “dịkwa nnukwu.” Ogo bụ ihe na-enye ntụaka. Ihe ntụaka ndị ahụ bụkwa kpọmkwem ihe usoro Nzuzo na-enweghị ike ikwe ka ọ pụta ìhè.

Cryptography chọrọ usoro ọnụọgụ ebe:

- e nwere **ọnụọgụ uru nwere oke**, ka kọmpụta wee nwee ike idobe nke ọ bụla kpọmkwem n’enweghị ịgbakọ n’ọzọ ma ọ bụ ịgafe ókè,
- uru ndị ahụ **anaghị ekpughe ogo ha**, n’ihi na usoro ahụ enweghị ezi echiche nke “ibu karịa,”
- ị ka nwere ike **ịgbakwunye, iwepu, ịmụba, na ikewa** n’enweghị mgbochi ma n’ụzọ enwere ike ịlaghachi azụ, n’ihi na usoro cryptography chọrọ algebra n’eziokwu ka ha rụọ ọrụ, na
- enwere ike ime ka oghere ahụ bụrụ **nnukwu nke ukwuu karịa ka e nwere ike ịtụ anya**, ka ịkọ nkọ ghara ịdị irè.

Ndepụta ọchịchọ ahụ nwere aha. Ọ bụ **ubi ọnụọgụ nwere oke**. Ka anyị buru ụzọ wulite nghọta ya tupu anyị edee ọbụna otu akara.

---

## 2. Nghọta: elekere

Ị na-eji finite field kwa ụbọchị. Ọ bụ elekere dị n’ahụ mgbidi gị.

N’elekere awa 12, ọnụọgụ na *alaghachi n’mbido*. Malite n’awa 10, gbakwunye awa 5, ị gaghị erute “awa 15,” kama ị ga-erute **awa 3**. Elekere ahụ nwere naanị ọnọdụ iri na abụọ, ịgụta gafee n’elu ya na-eme ka ọ laghachi na mmalite.

![alt text](/content-images/image-9-30b39f4cc5.webp)

Ihe atọ mere ugbu a, ha bụkwa isi ihe nile dị n’isiokwu a:

1. **Ụwa ahụ nwere oke.** E nwere kpọmkwem ọnọdụ iri na abụọ, n’agbanyeghị oge ị gụrụ.
2. **Ịgbakwunye ka na-arụ ọrụ.** Ị nwere ike ịgbakwunye awa ụbọchị dum; ị ga-erute ọnọdụ elekere ziri ezi mgbe niile.
3. **Ogo kwụsịrị ịdị mkpa.** “Awa 3” anaghị agwa gị ma ị gụrụ awa 3, 15, ma ọ bụ 27. Ịlaghachi n’mbido *wepụrụ ozi banyere ogo ahụ.* Iwepụ ahụ bụ kpọmkwem njirimara dabara na Nzuzo anyị chọrọ.

Mgbakọ ịlaghachi n’mbido a nwere aha iwu: **mgbakọ modular [modular arithmetic]**. Elekere na-arụ ọrụ “modulo 12,” nke e dere **mod 12**. Ndị mgbakọ na-ahọrọ ịmalite ịgụta ọnọdụ site na 0, ya mere “elekere mod 12” nwere ọnọdụ `0, 1, 2, ..., 11` n’eziokwu. Elekere mod 7 ga-enwe ọnọdụ `0` ruo `6`.

> **Otu iwu ahụ:** iji gbakọọ ihe ọ bụla “mod p,” mee mgbakọ nkịtị, wee kee ya site na `p` ma debe naanị nke fọdụrụ.
> Ọmụmaatụ mod 7: `5 + 4 = 9`, na `9` na-ahapụ nke fọdụrụ ịbụ `2` mgbe e kesịrị ya site na `7`, ya mere `5 + 4 = 2 (mod 7)`.

---

## 3. Site n’elekere ruo n’ubi

Elekere na-enye anyị ohere ịgbakwunye. **Ubi [field]** bụ nkwalite: usoro ọnụọgụ ebe arụmọrụ anọ niile na-arụ ọrụ nke ọma, gụnyere nke siri ike, ikewa.

N’ụzọ dị mfe, **ubi** bụ nchịkọta “ọnụọgụ” ọ bụla ebe ị nwere ike **ịgbakwunye, iwepu, ịmụba, na ikewa** (site n’ihe ọ bụla ma e wezụga efu), iwu ndị a maara nke ọma ka na-arụkwa ọrụ: usoro adịghị mkpa maka ịgbakwunye ma ọ bụ ịmụba, enwere ike ịhazi braket n’ụzọ ọzọ, e nwere `0` na `1`, ọnụọgụ ọ bụla nwekwara ọnụọgụ na-adịghị mma ya na (ma e wezụga `0`) reciprocal ya.

Ọnụọgụ rational bụ ubi. Ọnụọgụ real bụ ubi. Ihe anyị chọrọ bụ nke *nwere oke*.

Nke a bụ nsonaazụ isi, ọ dịkwa mma nke ukwuu:

> **Were ọnụọgụ zuru ezu `0, 1, ..., p-1` ma mee mgbakọ niile mod `p`. Ọ bụrụ na `p` bụ ọnụọgụ prime, nsonaazụ ya bụ finite field.** Anyị na-ede ya `F_p` (gụọ ya “F sub p”).

Ya mere `F_7 = {0, 1, 2, 3, 4, 5, 6}` nwere mgbakọ ụdị elekere mod 7 bụ ezigbo finite field. Ka anyị hụ ka o si arụ ọrụ.

### Ịmụba na F_7 (enyochala ya)

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

Lee ahịrị maka `1` ruo `6`: nke ọ bụla nwere uru ọ bụla na-abụghị efu `1..6` kpọmkwem otu ugboro. Ụkpụrụ ahụ nke “enweghị ugboro abụọ, ọ dịghị ihe furu efu” bụ akara a na-ahụ anya nke ubi.

### Ikewa: anwansi chọrọ prime

Ikewa bụ naanị “ịmụba site na reciprocal.” N’ime `F_7`, reciprocal (ma ọ bụ **inverse**) nke ọnụọgụ `a` bụ uru `a^(-1)` nke `a x a^(-1) = 1`. Ịgụ ha ozugbo na tebụl:

| `a` | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| `a⁻¹` | 1 | 4 | 5 | 2 | 3 | 6 |

Nyochaa otu: `2 x 4 = 8 = 1 (mod 7)`. Ya mere “kewaa site na 2” n’ime `F_7` pụtara “mụbaa site na 4.” Ihe ọ bụla na-abụghị efu nwere onye ibe ya. **Nke ahụ bụ ihe na-eme `F_7` ka ọ bụrụ ubi.**

---

## 4. Ihe mere modulus ga-eji bụrụ prime

Nke a bụ otu echiche kacha mkpa n’isiokwu a, ya mere ka anyị mee ka ọ pụta ìhè kama ịbụ ihe nkịtị.

Lelee ihe na-emebi ma ọ bụrụ na anyị agbalịa n’amaghị ama iwulite “ubi” mod `6` (na `6` *abụghị* prime):

> Enwere `x` ọ bụla nke `2 x x = 1 (mod 6)`? Lelee ha niile: `2x0=0, 2x1=2, 2x2=4, 2x3=0, 2x4=2, 2x5=4`. **Azịza `1` anaghị apụta ma ọlị.** Ya mere `2` enweghị reciprocal mod 6. Nke ka njọ, `2 x 3 = 6 = 0 (mod 6)`: ọnụọgụ abụọ na-abụghị efu mụtara wee wepụta efu.

Ahịrịokwu nke abụọ ahụ bụ ọdachi nye mgbakọ. Ihe abụọ na-abụghị efu ịmụba wee bụrụ efu (a na-akpọ **zero divisor**) pụtara na ikewa emebiwo, usoro nke ikewa emebiworo abụghịkwa ubi. Nke a na-eme kpọmkwem n’ihi na `6` na-ekewa bụrụ `2 x 3`.

Prime, dịka nkọwa ya siri dị, enweghị factor ndị dị otu a. Ya mere mod prime, zero divisor agaghị apụta, ihe ọ bụla na-abụghị efu na-enweta reciprocal doro anya, usoro ahụ aghọkwa ubi ziri ezi.

![alt text](/content-images/image-8-573914db92.webp)

> **Ahịrịokwu otu nke ị nwere ike iji ọzọ n’isiokwu gị:** *prime modulus abanye, ikewa doro anya apụta.*

---

## 5. Otu usoro mgbakọ kwesịrị izute: otu kọmpụta si achọta inverse

Anyị gụrụ inverse site na tebụl maka `F_7`, mana prime nke Zcash nwere ọtụtụ narị digit; tebụl agaghị ekwe omume. E nwere ụzọ mkpirisi a ma ama, ọ bụkwa naanị usoro mgbakọ dị n’isiokwu a.

**Fermat's Little Theorem** na-ekwu na maka prime `p` na `a` ọ bụla na-abụghị efu:

```
a^(p-1) = 1   (mod p)
```

Hazigharịa ya (wepụ otu factor nke `a`) ị ga-enwetakwa inverse n’enweghị mgbalị:

```
a^(-1) = a^(p-2)   (mod p)
```

Nwalee na `F_7` (`p = 7`, ya mere `p - 2 = 5`): inverse nke `2` kwesịrị ịbụ `2^5 = 32 = 4 (mod 7)`. Tebụl anyị kwukwara n’ezie na `2^(-1) = 4`. Kọmpụta na-ebuli ọnụọgụ n’ike buru ibu ngwa ngwa nke ukwuu, ya mere nke a na-eme “chọta reciprocal” ka ọ bụrụ mgbakọ ngwa ngwa ma kpọmkwem ọbụna maka prime ndị buru ibu nke ukwuu.

Ikwesịghị iburu nke a n’isi. Ihe ị chọrọ ịma bụ na **ikewa n’ime finite field bụ arụmọrụ ngwa ngwa, nke ziri ezi**, nke bụ kpọmkwem ihe mere ndị cryptographer ji enwe obi ụtọ iwulite ihe n’elu ya.

---

## 6. Ihe mere cryptography ji hụ finite fields n’anya

Ijikọta nghọta ahụ, nke a bụ ikpe zuru ezu n’otu ibe.

| Njirimara nke `F_p` | Ihe mere usoro Nzuzo ji achọ ya |
|---|---|
| **Nwere oke** | Kọmpụta na-echekwa element ọ bụla kpọmkwem; enweghị ịgbakọ n’ọzọ, ịgafe ókè, ma ọ bụ mgbagwoju anya floating-point |
| **Ịlaghachi n’mbido** | Na-ewepụ “ogo,” ya mere uru anaghị ekpughe ihe ọ bụla banyere otu esi wepụta ya |
| **Arụmọrụ anọ niile na-arụ ọrụ** | Usoro cryptography (igodo, commitment, proof) chọrọ algebra n’eziokwu, ọ bụghị naanị ịgụta |
| **Enwere ike ịhọrọ ogo ya** | Họrọ prime 255-bit ma ọ bụ 381-bit, ubi ahụ ga-enwe ọtụtụ element karịa atom dị na eluigwe na ala anyị nwere ike ịhụ; ịkọ nkọ agaghị ekwe omume |
| **Kpọmkwem ma na-enweghị mgbanwe** | Ndị abụọ na-eme ihe n’eziokwu ma na-agbakọ otu ihe na-enweta nsonaazụ kwekọrọ mgbe niile, nke proof na-adabere na ya |

Finite field bụ, n’otu ahịrịokwu, **ebe egwuregwu zuru oke, kpọmkwem nke ọma, na nnukwu nke ukwuu maka mgbakọ.** Ihe ọ bụla ọzọ dị n’ime Zcash ka e wuru site n’ịrụ ọrụ n’ime ya.

---

## 7. Ebe nke a bi n’ime Zcash

Ikwesịghị ikwere na “Zcash na-eji finite fields” n’enweghị ihe akaebe. Nke a bụ maapụ doro anya (ngwaọrụ dị omimi bụ maka isiokwu ndị ọzọ; nke a bụ naanị igosi na akara ndị ahụ dị adị).

- **Sapling** (nhazi nke e chebere echebe ochie) na-ewu proof ya n’elu curve a na-akpọ **BLS12-381**, nke base field ya ji prime ogologo ya bụ **381 bits**. Coordinate, igodo, na proof element ọ bụla bụ element nke finite field e wuru n’elu prime ahụ.
- **Orchard** (nhazi nke e chebere echebe ugbu a) na-eji pair of curves a na-akpọ **Pallas and Vesta** (curve “Pasta”), nke ubi ha ji prime dị ihe dịka **255 bits** ogologo.
- **note commitment**, **nullifier**, na ọnụọgụ dị n’ime **zero-knowledge proof** sitere na Isiokwu 0 bụ, n’isi ala, element nke otu n’ime finite field ndị a. Mgbe protocol kwuru “gbakọọ commitment a,” ọ pụtara “mee mgbakọ a mod prime ahụ.”

![alt text](/content-images/image-7-c81fe982f0.webp)

Ya mere azịza ajụjụ ghe oghe nke Isiokwu 0, *“olee ebe usoro nzuzo ndị ahụ si abịa?”*, malitere ebe a: **ihe niile na-amalite dị ka mgbakọ n’ime finite field.** N’isiokwu na-esote, anyị ga-ewere field ahụ wee wuo ihe ndị bụ eziokwu, point dị n’elu elliptic curve, nke na-aghọ igodo na commitment.

---

## 8. Nkwupụta eziokwu

Iji mee ka o doo ndị mbido anya, anyị mere ka ihe ole na ole dị mfe. Finite field abụghị naanị n’ụdị `F_p`; ị nwekwara ike iwulite ubi nwere element `p^n` (a na-akpọ **extension fields**), ha dịkwa mkpa maka “pairings” nke usoro proof nke Sapling na-adabere na ya. Anyị hapụkwara ndepụta zuru ezu nke axioms ubi ma gafee otu esi ahọrọ ma kwado prime nke ogo a. Ọ dịghị nke ọ bụla n’ime ihe ndị ahụ gbanwere nghọta ị nwere ugbu a; ọ na-eme ka ọ ka zie ezi. Anyị ga-eweghachite izi ezi ahụ, tinyere akara, mgbe isiokwu ọzọ chọrọ ya.

---

## 9. Nchịkọta

- Cryptography chọrọ usoro ọnụọgụ **nwere oke, kpọmkwem, nke na-adịghị ekpughe ogo, nke a pụrụ ịtụgharị n’azụ kpamkpam, ma buru ibu nke ukwuu.** Usoro ahụ bụ **finite field**.
- Nghọta ya bụ **elekere**: mgbakọ **na-alaghachi n’mbido** (mgbakọ modular), nke na-ewepụ “ogo” nke ọnụọgụ n’ụzọ bara uru.
- Ime mgbakọ na ọnụọgụ `0..p-1` mod **prime** `p` na-enye ezigbo ubi `F_p`, ebe ị nwekwara ike **ikewa** n’ihi na element ọ bụla na-abụghị efu nwere inverse.
- Modulus ahụ **ga-abụrịrị prime**: composite modulus na-emepụta zero divisor (dịka `2 x 3 = 0 mod 6`) ma mebie ikewa.
- Kọmpụta na-achọta inverse ngwa ngwa site na **Fermat's Little Theorem** (`a^(-1) = a^(p-2)`).
- N’ime **Zcash**, igodo ọ bụla, commitment, nullifier, na proof element na-emecha bụrụ element nke nnukwu finite field (Pasta fields 255-bit maka Orchard, field 381-bit maka BLS12-381 nke Sapling).

---

## Nkọwa okwu

| Okwu | Ihe ọ pụtara n’asụsụ dị mfe |
|---|---|
| **Modular arithmetic** | Mgbakọ na-alaghachi n’mbido mgbe ọ ruru uru a kapịrị ọnụ, dịka elekere |
| **mod p** | “Kewaa site na `p` ma debe nke fọdụrụ” |
| **Field** | Usoro ọnụọgụ ebe ịgbakwunye, iwepu, ịmụba, na ikewa niile na-arụ ọrụ |
| **Finite field `F_p`** | Ọnụọgụ `0..p-1` nwere mgbakọ e mere mod prime `p` |
| **Inverse (reciprocal)** | Element `a^(-1)` nke `a x a^(-1) = 1`; “ikewa site na `a`” pụtara ịmụba site na ya |
| **Zero divisor** | Uru abụọ na-abụghị efu nke product ha bụ efu; ihe na-emebi composite modulus |
| **Prime** | Ọnụọgụ zuru ezu karịrị 1 nke enweghị factor ọzọ ma e wezụga 1 na ya onwe ya |

---

## Ajụjụ a na-ajụkarị

**Gịnị mere anyị agaghị eji integer nkịtị ma ọ bụ decimal?**
Decimal na-agbakọ n’ọzọ ma na-agbanwe; integer na-eto n’enweghị njedebe ma na-ekpughe ogo. Finite field bụ kpọmkwem, nwere oke, na-adịghị ekpughe ogo, nke cryptography chọrọ.

**“Ịlaghachi n’mbido” ọ na-atụfu ozi?**
Ee, n’uche ya. Iwepụ ogo nke uru etiti bụ njirimara, ọ bụghị mmejọ, maka Nzuzo.

**Prime buru ibu ọ na-adị nchebe karịa mgbe niile?**
N’ụzọ sara mbara, field buru ibu pụtara uru ndị nwere ike ịdị ọtụtụ na ịkọ nkọ siri ike, mana nchekwa dabere na nhazi zuru ezu, ọ bụghị naanị ogo field. Isiokwu ndị ọzọ ga-eme ka nke a doo anya.

**Gịnị mere eji prime ndị a kpọmkwem (255-bit, 381-bit) n’ime Zcash?**
A na-ahọrọ ha ka curve e wuru n’elu ha nwee nhazi na arụmọrụ kwesịrị ekwesị maka usoro proof. “Nhazi kwesịrị ekwesị” ahụ bụ isiokwu nke isiokwu abụọ na-esote.

---

### Nwalee nghọta gị

N’ime `F_7`, gịnị bụ `5 - 6`? (Cheta: nọrọ n’ime `{0,...,6}` site n’ịlaghachi n’mbido.) *(Azịza dị n’okpuru.)*

<details><summary>Azịza</summary>

`5 - 6 = -1`, na `-1` laghachiri n’ime `F_7` bụ `6` (n’ihi na `6 + 1 = 7 = 0`). Ya mere `5 - 6 = 6 (mod 7)`. Iwepu anaghị ahapụ ubi; ọ na-alaghachi n’akụkụ nke ọzọ.
</details>

---

### Ihe na-esote

**Isiokwu 2 . Elliptic curves:** anyị ga-ewere finite field anyị wuru ugbu a wee jiri ya see ụdị curve pụrụ iche nke enwere ike “ịgbakwunye” point ya ọnụ. Point ndị ahụ na-aghọ igodo na commitment nke Zcash, ha na-ezokwa one-way trapdoor nke na-eme ka usoro Nzuzo niile kwe omume. Nghọta mbụ, dịka mgbe niile.

*Akụkụ nke* Zcash sitere na Ụkpụrụ Mbụ *usoro isiokwu maka [ZecHub](https://zechub.org). Ikikere CC BY-SA 4.0.*
