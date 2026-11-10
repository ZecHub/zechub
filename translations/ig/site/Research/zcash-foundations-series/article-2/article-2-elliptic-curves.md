# Mgbanaka Elliptic [Elliptic Curves]: Ebe A Mụrụ Igodo na Commitments nke Zcash
##### Nnyocha Mbụ sitere n'aka [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-10-c1097b22d7.webp)

### Okporo ụzọ otu ụzọ e ji isi ihe dị n'elu mgbanaka wuo

> **Usoro:** *Zcash site na Ụkpụrụ Mbụ* . **Edemede 2 . Mgbanaka Elliptic**
> **Ndị e lekwasịrị anya:** ndị ọhụrụ. Anyị na-eche naanị na ị maara [Edemede 1 (ubi nwere oke)](article-1-finite-fields.md): mgbakọ na mwepụ na-alaghachi gburugburu mod nọmba mbụ. Ọ dịghị ihe ọmụma ọzọ achọrọ.
> **Ihe ị ga-amụta:** nghọta ziri ezi ma dị mfe banyere mgbanaka elliptic, “ọnụ ụzọ nzuzo” nke na-eme ka ha baa uru, na kpọmkwem otu Zcash si atụgharị ha bụrụ igodo na commitments.

[Edemede 1](article-1-finite-fields.md) nyere anyị ebe egwuregwu zuru oke maka mgbakọ na mwepụ: ubi nwere oke. Mana ubi n'onwe ya bụ naanị ọnụọgụgụ. Iji wuo igodo na “akwụkwọ ozi e mechiri emechi” sitere na [Edemede 0](article-0-shielded-transaction.md), Zcash chọrọ ihe nwere ụdị ihe isi ike pụrụ iche nke na-aga n'otu ụzọ: ọ dị mfe ịgbakọ ya n'ihu, ma ọ fọrọ nke nta ka ọ ghara ikwe omume ịtụgharị ya azụ. Ihe ahụ bụ **mgbanaka elliptic [elliptic curve]**. Edemede a na-ewu ya site na ntọala, na-ebute nghọta tupu algebra.

---

## 1. Gịnị mere ị ga-eji lekọta nke a?

Usoro Nzuzo ọ bụla chọrọ **okporo ụzọ otu ụzọ**: ọrụ dị mfe ịga n'ihu ma sie ike nke ukwuu ịlaghachi azụ.

Nke a bụ ihe kpatara ya. **Igodo nzuzo [secret key]** gị bụ ọnụọgụ ị na-ezo. A na-enweta **igodo ọha [public key]** gị (na Adreesị akpa ego gị) site na ya ma gosi ụwa. Nchedo dum nke usoro ahụ dabere n'otu eziokwu: *ma e nye igodo ọha, ọ nweghị onye nwere ike ịlaghachi azụ chọpụta igodo nzuzo gị.* Ọ bụrụ na ha nwere ike, ha nwere ike imefu ego gị.

Ya mere, anyị chọrọ ọrụ mgbakọ na mwepụ ebe:

- ịga **n'ihu** (nzuzo -> ọha) na-adị ngwa ma dị mfe, mana
- ịga **azụ** (ọha -> nzuzo) siri ike nke na kọmputa niile dị n'Ụwa, na-arụ ọrụ ruo mgbe eluigwe na ala ga-adị, agaghị arụcha ya.

Mmụba n'ubi nwere oke nkịtị ezughị; nkewa na-emebi ya ozugbo (nke ahụ bụ isi ihe Edemede 1). Anyị chọrọ ihe na-enweghị bọtịnụ dị mfe iji “megharịa.” Mgbanaka elliptic na-enye kpọmkwem nke ahụ, ma dịka uru mgbakwunye, isi ihe ha na-agbakọta n'ụzọ zuru oke maka iwulite commitments. Ka anyị hụ otú ọ si arụ ọrụ.

---

## 2. Nghọta: mgbanaka nke ị nwere ike “ịgbakwunye” isi ihe ya

Chefuo cryptography nwa oge. **Mgbanaka elliptic** bụ naanị nchịkọta isi ihe `(x, y)` nke na-emezu nhata nke ụdị a:

```
y^2 = x^3 + ax + b
```

N'elu ọnụọgụ nkịtị, ọ na-adị ka mgbanaka dị larịị na-agbagọ agbagọ, nke na-enwekarị okirikiri gbara gburugburu na ọdụ abụọ:

![alt text](/content-images/image-14-1d2e8c25d2.webp)

Akụkụ na-eju mmadụ anya n'ezie: **ị nwere ike “ịgbakwunye” isi ihe abụọ dị n'elu mgbanaka a iji nweta isi ihe nke atọ nke dịkwa n'otu mgbanaka ahụ.** Nke a abụghị mgbakwunye nkịtị nke koọdineti. Ọ bụ iwu jiometrị, ọ dịkwa mfe *ịhụ* karịa ikwu ya.

### Iwu ụdọ [chord rule] (ịgbakwunye isi ihe abụọ dị iche)

Iji gbakwunye `P + Q`:

1. See ahịrị kwụ ọtọ site na `P` na `Q`.
2. Ahịrị ahụ na-akụ mgbanaka ahụ n'otu ebe ọzọ kpọmkwem. Kpọọ ya `R*`.
3. **Tụgharịa `R*` n'akụkụ nke ọzọ gafee anyụike kwụ ọtọ.** Ntughari ahụ bụ azịza ya, `P + Q`.

![alt text](/content-images/image-11-61f3df1989.webp)

### Iwu tangent [tangent rule] (ịgbakwunye isi ihe na onwe ya)

Iji gbakọọ `P + P` (e dere ya dịka `2P`), ọ nweghị isi ihe nke abụọ ị ga-esi see ahịrị, yabụ ị na-eji ahịrị **tangent** dị na `P` kama nke ahụ, wee soro otu usoro ahụ nke “mkpakọrịta nke atọ, mesịa tụgharịa.”

Nke ahụ bụ ọrụ ahụ dum. Iwu jiometrị abụọ. Site na ha, isi ihe nke mgbanaka elliptic na-etolite ihe ndị mgbakọ na mwepụ kpọrọ **otu [group]**: nchịkọta nwere “mgbakwunye” na-arụ ọrụ nke ọma. Ọ nwekwara “efu.”

### Isi ihe na enweghị ngwụcha (efu nke mgbanaka)

Usoro ọnụọgụ ọ bụla chọrọ `0`, ihe na-adịghị agbanwe ihe ọ bụla mgbe ị gbakwụnyere ya. N'elu mgbanaka elliptic, ọ bụ isi ihe pụrụ iche ọzọ a na-akpọ **isi ihe na enweghị ngwụcha [point at infinity]**, nke e dere `O`, na-arụ ọrụ ahụ. Ị nwere ike iche ya dịka “ebe dị anya n'elu na-enweghị ngwụcha,” ebe ahịrị kwụ ọtọ na-ezukọ. Ịgbakwunye `O` na isi ihe ọ bụla na-ahapụ ya ka ọ dị, dịka ịgbakwunye `0`.

---

## 3. Site na eserese gaa n'ubi nwere oke

Mgbanaka larịị dị n'elu bụ *nghọta*. Mana Zcash anaghị eji ọnụọgụ n'ezie (ha na-agbakọ ma na-ekpughe nha, dịka Edemede 1 siri kwuo). Ọ na-eji mgbanaka elliptic **n'elu ubi nwere oke**: otu nhata ahụ `y^2 = x^3 + ax + b`, mana a na-eme mgbakọ niile mod nọmba mbụ.

Mgbe ị mere nke ahụ, mgbanaka mara mma ahụ na-agbaji ghọọ **ntakịrị ntụpọ ndị kewapụrụ**, otu ntụpọ maka ụzọ abụọ `(x, y)` ọ bụla na-emezu nhata ahụ mod `p`. Ọ kwụsịrị ịdị ka mgbanaka ọbụla. Mana ebe a bụ ihe dị mkpa:

> **Algebra nke iwu ụdọ-na-tangent ka na-arụ ọrụ nke ọma.** Otu usoro ndị chọpụtara `P + Q` n'ụzọ jiometrị na-agbakọzi ya site na mgbakọ ubi nwere oke. Ntụpọ ndị ahụ ka na-etolite otu, na otu `0` ahụ (isi ihe na enweghị ngwụcha).

Ka anyị mee ka nke a bụrụ ihe doro anya site n'ihe atụ dị nta e nyochara kpamkpam.

### Mgbanaka zuru ezu, a gbakọrọ ya kpọmkwem

Were `y^2 = x^3 + 2x + 2` n'elu ubi nwere oke `F_17`. Ịgbakọ isi ihe ọ bụla ziri ezi na-enye kpọmkwem **isi ihe 18, tinyere isi ihe na enweghị ngwụcha = 19 n'ozuzu.** Ụfọdụ n'ime ha bụ:

```
(0,6) (0,11) (3,1) (3,16) (5,1) (5,16) (6,3) (6,14) (7,6) (7,11) ...
```

Ugbu a họrọ isi ihe `G = (5, 1)` ma na-agbakwunye ya na onwe ya. Lee ihe na-eme (a gbakọrọ ahịrị ọ bụla dị n'okpuru, ọ bụghị ịkọ nkọ):

| Nzọụkwụ | Isi ihe | Nzọụkwụ | Isi ihe |
|---|---|---|---|
| `1G` | (5, 1) | `11G` | (13, 10) |
| `2G` | (6, 3) | `12G` | (0, 11) |
| `3G` | (10, 6) | `13G` | (16, 4) |
| `4G` | (3, 1) | `14G` | (9, 1) |
| `5G` | (9, 16) | `15G` | (3, 16) |
| `6G` | (16, 13) | `16G` | (10, 11) |
| `7G` | (0, 6) | `17G` | (6, 14) |
| `8G` | (13, 7) | `18G` | (5, 16) |
| `9G` | (7, 6) | `19G` | **O (enweghị ngwụcha)** |
| `10G` | (7, 11) | | |

Ihe abụọ ị ga-ahụ:

- Ọ **na-eleta isi ihe nwere oke 18 niile wee rute `O`** na nzọụkwụ 19, emesịa ọ ga-emeghachi ruo mgbe ebighị ebi. Isi ihe mmalite `G` “na-emepụta” otu ahụ dum, yabụ anyị na-akpọ ya **onye nrụpụta [generator]**.
- Ọ bụ otu e nyochara: dịka ọmụmaatụ `1G + 2G = (5,1) + (6,3) = (10,6)`, nke bụ kpọmkwem `3G`. Mgbakwunye ahụ na-ekwekọ n'ime ya, dịka otu kwesịrị isi chọọ.

---

## 4. Ọnụ ụzọ nzuzo: scalar multiplication

Tebụl ahụ nke `1G, 2G, 3G, ...` bụ obi ihe niile. Ịgbakwunye isi ihe ugboro ugboro na onwe ya ka a na-akpọ **scalar multiplication**: isi ihe `kG` pụtara “`G` agbakwunyere na onwe ya ugboro `k`.”

Ugbu a anwansi ahụ. Tụlee ntụziaka abụọ a:

| Ntụziaka | Ajụjụ | Ihe isi ike |
|---|---|---|
| **N'ihu** | E nyere `k` na `G`, gbakọọ `kG` | **Dị mfe.** Ọbụna maka `k` buru ibu nke ukwuu, aghụghọ a kpọrọ *double-and-add* na-eme ya n'ime narị nzọụkwụ ole na ole |
| **Azụ** | E nyere `G` na `kG`, weghachite `k` | **Ọ fọrọ nke nta ka ọ ghara ikwe omume** n'elu mgbanaka cryptographic n'ezie |

Nkewa ahụ bụ **okporo ụzọ otu ụzọ** anyị chọrọ na Ngalaba 1. Nsogbu azụ ahụ (“kedu `k` mepụtara isi ihe a?”) ka a na-akpọ **Elliptic Curve Discrete Logarithm Problem (ECDLP)**, ma n'elu mgbanaka Zcash ji, ọ nweghị usoro a maara nke ga-edozi ya tupu ọnwụ okpomọkụ nke eluigwe na ala.

![alt text](/content-images/image-12-86b9ace6cb.webp)

> N'elu mgbanaka egwuregwu anyị `F_17`, ị nwere ike ịgụ `k` ozugbo na tebụl, n'ihi na o nwere naanị isi ihe 19. Mgbanaka n'ezie nwere ihe dịka isi ihe `2^(255)`. Tebụl ahụ ga-enwe ahịrị karịrị ọnụọgụ atọm dị n'eluigwe na ala, yabụ “ịgụ ya ozugbo” abụghị nhọrọ. Obere nha ya bụ ihe na-eme ka mgbanaka egwuregwu a dị mfe ịkụzi, ma bụrụkwa ihe kpatara na ọ naghị echekwa nchekwa.

---

## 5. Otu e si amụ igodo (nsonaazụ ya)

Anyị nwere ugbu a ihe niile dị mkpa iji kọwaa ezigbo igodo cryptographic, ọ dịkwa mfe n'ụzọ na-eju anya:

> **Họrọ ọnụọgụ nzuzo `k`. Bipụta isi ihe `kG`. Ọ gwụla.**
> `k` bụ **igodo nzuzo** gị. `kG` bụ **igodo ọha** gị. Okporo ụzọ otu ụzọ (ECDLP) na-ekwe nkwa na ọ dịghị onye ga-enwe ike ịlaghachi `kG` ruo `k`.

Echiche a naanị ya, *igodo ọha bụ scalar nzuzo mụbara onye nrụpụta a kapịrị ọnụ*, bụ mkpụrụ nke Igodo ego, viewing key, na Adreesị akpa ego nke Zcash. Osisi igodo zuru ezu na-agbakwunye nhazi ọzọ n'elu ya, mana alaka ọ bụla na-eto site na mgbọrọgwụ a.

### Uru mgbakwunye: ihe mere isi ihe mgbanaka ji eme commitments zuru oke

Cheta “akwụkwọ ozi e mechiri emechi” (commitment) sitere na Edemede 0, nke kwesịrị **izochi** ihe dị n'ime ya ma bụrụkwa **ihe na-agaghị ekwe omume ịgha ụgha**. Mgbanaka elliptic na-enye anyị ụzọ doro anya isi wuo otu. Were isi ihe nrụpụta ọha abụọ a kapịrị ọnụ, `G` na `H`, uru nzuzo `v`, na ọnụọgụ ikpuchi na-enweghị usoro `r`, wee mepụta:

```
Commitment  =  v.G  +  r.H
```

Nke a bụ **Pedersen commitment**, o nwekwara àgwà abụọ anyị chọrọ:

- **Nzuzo:** `r` na-enweghị usoro na-agbasa nsonaazụ ahụ n'elu mgbanaka dum, yabụ isi ihe ahụ anaghị ekpughe ihe ọ bụla gbasara `v`.
- **Njikọta:** ECDLP na-eme ka o sie ike ịchọta `(v, r)` *ọzọ* nke na-enye otu isi ihe ahụ, yabụ ị pụghị ịgbanwe uche gị gbasara ihe i commitara.

Àgwà uru mgbakwunye mechara bụrụ nke dị oké ọnụ ahịa: commitments ndị a **na-agbakọta**. Commitment maka `v_1` tinyere commitment maka `v_2` bụ commitment ziri ezi maka `v_1 + v_2`. Omume “homomorphic” ahụ bụ otú Zcash ga-esi mesịa proof na ego na-abanye *n'ime* Azụmahia hà ego na-apụta, na-enweghị ikpughe ego ọ bụla. Anyị ga-eji nke ahụ rụọ ọrụ gburugburu Edemede 6.

---

## 6. Ebe nke a dị na Zcash

Akara mkpịsị aka ya doro anya ma nwee ike inyocha.

| Nhazi Zcash | Mgbanaka ndị ọ na-eji | Ọrụ |
|---|---|---|
| **Sapling** (ochie) | **BLS12-381** tinyere mgbanaka agbakwunyere a kpọrọ **Jubjub** | BLS12-381 na-eburu usoro proof; Jubjub ka e wuru n'elu ubi scalar nke BLS12-381 ka ọrụ igodo na commitment dị ọnụ ala ịrụ *n'ime* zero-knowledge proof |
| **Orchard** (nke ugbu a) | **Pallas** na **Vesta** (okirikiri “Pasta”) | Pallas na-eburu igodo na commitments nke Orchard; a haziri njikọta Pallas/Vesta pụrụ iche iji mee ka proofs dị elu rụọ ọrụ nke ọma |

Ihe mere e ji “agbakwunye” otu mgbanaka n'ime ubi nke ọzọ, na ihe mere *okirikiri* mgbanaka abụọ ji baa uru, bụ ihe dị adị ma dị mkpa, mana ha bụ nke edemede usoro proof. Maka ugbu a, isi ihe ahụ siri ike: **igodo Zcash ọ bụla bụ scalar mụbara onye nrụpụta, commitment Zcash ọ bụla bụkwa nchikọta isi ihe mgbanaka**, nke dị n'elu otu n'ime mgbanaka ndị a kpọrọ aha.

![alt text](/content-images/image-13-ffdd703c60.webp)

---

## 7. Nkọwa eziokwu

Ntụgharị ole na ole mere ka nke a dị mfe ịgụ. Anyị jiri ụdị **short Weierstrass** (`y^2 = x^3 + ax + b`); a na-edekarị mgbanaka Zcash n'ụdị ndị ọzọ kwekọrọ na ya (Jubjub bụ mgbanaka *twisted Edwards*) ahọpụtara maka ịrụ ọrụ nke ọma na nchekwa, mana echiche otu ahụ bụ otu. Anyị akọwaghị usoro mgbakwunye isi ihe kpọmkwem (ha bụ ụdị algebra nke “mkpakọrịta nke atọ, mesịa tụgharịa”), ma anyị wepụrụ ihe mgbagwoju anya dịka order mgbanaka, cofactors, na “pairings,” ndị ghọrọ ihe dị mkpa na edemede usoro proof. Ọ dịghị nke a na-agbanwe nghọta ahụ; ọ na-eme ka ọ sie ike karịa.

---

## 8. Nchịkọta

- Usoro Nzuzo chọrọ **okporo ụzọ otu ụzọ**: dị mfe n'ihu, agaghị ekwe omume n'azụ. Mgbanaka elliptic na-enye otu.
- **Mgbanaka elliptic** bụ nchịkọta isi ihe na-emezu `y^2 = x^3 + ax + b`, isi ihe ya nwekwara ike **ịgbakọta** site n'iwu jiometrị **chord-and-tangent**, ebe **isi ihe na enweghị ngwụcha** pụrụ iche na-arụ ọrụ dị ka efu.
- N'elu **ubi nwere oke**, mgbanaka ahụ aghọ ntụpọ gbasasịrị, mana otu mgbakwunye ahụ ka na-arụ ọrụ, isi ihe ya na-etolitekwa **otu**. (Ihe atụ enyochara: `y^2 = x^3 + 2x + 2` n'elu `F_17` nwere isi ihe 19, na `G = (5,1)` na-emepụta ha niile.)
- **Scalar multiplication** `kG` dị mfe ịgbakọ ma sie ike ịtụgharị azụ: nke a bụ **ECDLP**. Nke ahụ bụ ọnụ ụzọ nzuzo.
- **Igodo:** igodo nzuzo `k`, igodo ọha `kG`. **Commitments:** ụdị Pedersen `v.G + r.H`, nke na-ezo, na-ejikọta, ma na-adịkwa mfe **ịgbakọta**.
- Na **Zcash**, Sapling na-eji **BLS12-381 + Jubjub**, ebe Orchard na-eji mgbanaka **Pallas/Vesta (Pasta)**; igodo na commitment ọ bụla dị n'elu ndị a.

---

## Nkọwa okwu

| Okwu | Ihe ọ pụtara n'asụsụ dị mfe |
|---|---|
| **Elliptic curve** | Isi ihe na-emezu `y^2 = x^3 + ax + b`, nwere “mgbakwunye” pụrụ iche nke isi ihe |
| **Point addition** | Iwu chord-and-tangent: ahịrị gafere isi ihe abụọ, were mkpakọrịta nke atọ, tụgharịa ya |
| **Point at infinity (`O`)** | “Efu” nke mgbanaka; ịgbakwunye ya anaghị agbanwe ihe ọ bụla |
| **Generator (`G`)** | Isi ihe ntọala nke ọtụtụ ya mechara kpuchie otu ahụ dum |
| **Scalar multiplication (`kG`)** | Ịgbakwunye `G` na onwe ya ugboro `k`; dị mfe n'ihu, sie ike ịtụgharị azụ |
| **ECDLP** | Nsogbu siri ike nke iweghachite `k` site na `kG`; ntọala nchekwa |
| **Pedersen commitment** | `v.G + r.H`; akwụkwọ ozi e mechiri emechi nke na-ezo, na-ejikọta, ma na-agbakọta |

---

## Ajụjụ a Na-ajụkarị

**Gịnị mere a ji eji mgbanaka kama naanị ọnụ ọgụgụ buru ibu mod nọmba mbụ?**
Ha abụọ nwere ike inye okporo ụzọ otu ụzọ, mana mgbanaka elliptic na-enye otu nchekwa ahụ site n'igodo pere mpe karị na ọrụ ngwa ngwa, mgbakọ isi ihe ha dịkwa mma nke ukwuu maka commitments.

**A gosila na ECDLP siri ike?**
Egosibeghị na ọ *gaghị ekwe omume*, mana ọtụtụ iri afọ nke mgbalị siri ike ahụbeghị mwakpo rụọ ọrụ nke ọma megide mgbanaka ahọpụtara nke ọma. Nchedo dabere n'echiche ahụ a nwalere nke ọma.

**Kọmputa quantum nwere ike imebi ya?**
Kọmputa quantum buru ibu nke ọma nwere ike imebi ECDLP. Nke ahụ bụ nchegbu a maara nke dị ogologo oge n'ofe ụlọ ọrụ ahụ na mpaghara nyocha na-arụsi ọrụ ike; mgbanaka nke taa ka dị nchebe megide kọmputa nkịtị.

**Gịnị mere Zcash ji eji ihe karịrị otu mgbanaka?**
Ọrụ dị iche iche. Otu mgbanaka na-eburu usoro zero-knowledge proof; nke ọzọ (agbakwunyere n'ubi nke nke mbụ) na-eme ka ọrụ igodo na commitment n'ime proof rụọ ọrụ nke ọma. Edemede ndị na-esote na-akọwa ihe mere njikọta ahụ ji dị mkpa.

---

### Nwalee nghọta gị

N'iji tebụl e nyochara na Ngalaba 3, gịnị bụ `9G + 10G` n'elu mgbanaka egwuregwu anyị? Gịnịkwa ka azịza ahụ na-agwa gị banyere `G`? *(Azịza dị n'okpuru.)*

<details><summary>Azịza</summary>

`9 + 10 = 19`, anyị hụkwara na `19G = O`, isi ihe na enweghị ngwụcha. Ya mere, `9G + 10G = O`. Nke a pụtara na `10G` bụ **ọjọọ** (additive inverse) nke `9G`: isi ihe abụọ na-agbakọta na “efu” isi ihe. N'elu mgbanaka, ọjọọ nke isi ihe bụ naanị onyinyo ya n'akụkụ nke ọzọ gafee anyụike x, ma n'ezie `9G = (7,6)` na `10G = (7,11)` nwere otu `x` na ụkpụrụ `y` ha na-agbakọta ruo `17 = 0 (mod 17)`. Nhazi ahụ na-ekwekọ n'ụzọ zuru oke, nke bụ kpọmkwem ihe “ọ bụ otu” na-ekwe nkwa.
</details>

---

### Gịnị na-esote

**Edemede 3 . Hashing na commitments:** anyị ga-emeghe “akwụkwọ ozi anwansi e mechiri emechi” nke ọma. Ị hụla ugbu a otu ụzọ esi eji isi ihe mgbanaka wuo commitment; nke na-esote, anyị jụrụ ihe izo na ijikọ pụtara n'ezie, mata ọrụ hash, ma jikọta ha abụọ na note commitments na-akwado Kwụọ ụhwọ Zcash ọ bụla.

*Akụkụ nke usoro* Zcash site na Ụkpụrụ Mbụ *maka [ZecHub](https://zechub.org). Ikikere CC BY-SA 4.0.*
