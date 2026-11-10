# Usoro E chebere echebe, Site na Mmalite ruo na Njedebe
##### Nnyocha Mbụ sitere n'aka [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-27-4094293ec0.webp)

### Ịchịkọta akụkụ ọ bụla n'ime otu Azụmahia Zcash nke onwe

> **Usoro isiokwu:** *Zcash site na Ụkpụrụ Mbụ* . **Edemede 6 . Usoro E chebere echebe** (njedebe)
> **Ndị e dere ya maka ha:** ndị ọhụrụ gụrụ Edemede 0 ruo 5. Nke a bụ ebe ihe niile jikọtara ọnụ.
> **Ihe ị ga-enweta:** echiche zuru oke ma zie ezie banyere Azụmahia Zcash nke e chebere echebe, nke echiche ọ bụla n'ime usoro isiokwu a dị n'ebe ya kwesịrị ekwesị, na nke mechiri ajụjụ ọ bụla sitere na Edemede 0.

Anyị malitere, n'ime [Edemede 0](article-0-shielded-transaction.md), site na ihe mgbagwoju anya na akụkọ gbasara envelopu e mechiri emechi n'elu bọọdụ ọha. Anyị wee jiri edemede ise wuo akụkụ ndị ahụ: finite fields, elliptic curves, commitments, Merkle trees, na zero-knowledge proofs. Ugbu a, anyị ga-achịkọta ha ma lelee otu Kwụọ ụhwọ nke onwe n'ezie si arụ ọrụ, site na mmalite ruo na njedebe.

---

## 1. Gịnị mere ị ga-eji lekọta ya?

N'otu n'otu, akụkụ ọ bụla ị mụtara nwere ọgụgụ isi. Ma *anwansi* nke Zcash dị n'otú ha si ejikọta onwe ha. Nullifier naanị ya anaghị enye Nzuzo [privacy]. Commitment naanị ya anaghị egbochi aghụghọ. Proof naanị ya anaghị egosi ihe bara uru. Ọ bụ **nchịkọta** ahụ na-agbanwe ihe ise mejupụtara ya ka ọ bụrụ ego nke bụ nke onwe ma bụrụkwa nke a pụrụ ịtụkwasị obi n'otu oge.

Edemede a bụ nchịkọta ahụ. Mgbe ị ruru na njedebe, ahịrịokwu *"network na-enyocha Azụmahia ọ na-apụghị ịhụ"* agaghị adị ka ihe mgbagwoju anya, kama ọ ga-adị ka nsonaazụ doro anya nke akụkụ ndị ị ghọtarala.

---

## 2. Ndị so na ya, e chịkọtaghachiri

Nke a bụ usoro isiokwu ahụ dum n'otu ibe, e si n'akụkọ Edemede 0 depụta ya gaa na usoro ọrụ n'ezie.

| Akụkụ nke akụkọ Edemede 0 | Akụkụ n'ezie | E si n'ihe a wuo ya |
|---|---|---|
| Ego dị n'ime envelopu | **Note** (uru, onye nnata, enweghị usoro) | e debere ya dịka field elements (Art 1) |
| Envelopu e mechiri emechi nke na-adịghị egosipụta ihe dị n'ime ya | **Note commitment** | Pedersen / Sinsemilla commitment (Art 2, 3) |
| Bọọdụ ọha | **Note commitment tree** (anchor = mgbọrọgwụ ya) | incremental Merkle tree (Art 4) |
| Token oghere | **Nullifier** | hash nke note + igodo nzuzo na-adị mma maka ZK (Art 2, 3) |
| "Ego batara hà ego pụtara" | **Value commitments + nlele nguzozi** | homomorphic Pedersen commitments (Art 2, 3) |
| Anwansi dị n'azụ ákwà mgbochi | **Zero-knowledge proof** | zk-SNARK n'elu arithmetic circuit (Art 5) |
| "Ọ bụ naanị gị nwere ike ịgụ envelopu gị" | **Note ezoro ezo + viewing keys** | Nzobe ederede [encryption] + usoro ọkwa igodo (edemede a) |

---

## 3. Ebe igodo si abịa

Ihe niile onye ọrụ nwere ike ime na-esite n'otu ihe nzuzo, ya bụ **Igodo ego [spending key]**, site na usoro ọkwa nke otu ụzọ (akụkụ ọ bụla na-egosi ntọpụta a na-apụghị ịtụgharị azụ, n'ihi trapdoors dị n'Edemede 2 na 3):

![alt text](/content-images/image-32-f443f9bb72.webp)

Ihe abụọ kwesịrị ịma, ha abụọ bụ nsonaazụ nke edemede ndị gara aga:

- Nkewa ahụ na-enye gị ohere inye mmadụ **viewing key** (dịka ọmụmaatụ, onye na-enyocha ego) nke na-ekpughe Azụmahia gị **na-enweghị** inye ya ikike imefu ego. Nzuzo bụ nhọrọ, ọ bụghị ihe dị naanị otu ụzọ.
- Ntọpụta ọ bụla bụ nke **otu ụzọ**: ịnwe viewing key anaghị ekwe ka onye ọ bụla nwetaghachi Igodo ego, kpọmkwem trapdoor elliptic-curve nke Edemede 2 na-arụ ọrụ ya.

---

## 4. Imefu note: nkwupụta anọ

Iji mefu note na nzuzo, ị ga-eme ka network kwenye n'ihe anọ n'otu oge **na-ekpugheghị note, uru ya, ọnọdụ ya, ma ọ bụ njirimara gị.** Akụkụ ị maralarị na-emeju nkwupụta ọ bụla.

![alt text](/content-images/image-31-86309af194.webp)

Proof ahụ anaghị ekpughe **nke ọ bụla** n'ime eziokwu ndị dị n'okpuru (note nke bụ, igodo onye bụ, uru ole). Ọ na-ekpughe naanị na *nkwupụta anọ ahụ niile bụ eziokwu.* Nke ahụ bụ aghụghọ dum nke Azụmahia Zcash e chebere echebe, e kwuru ya n'otu eserese.

---

## 5. Aghụghọ nguzozi uru (nsonaazụ anyị chebere)

Laa azụ n'Edemede 2 na 3, anyị kwuru na Pedersen commitments **na-agbakọta ọnụ**: commitment nke `v_1` tinyere commitment nke `v_2` bụ commitment nke `v_1 + v_2`. Lee ebe nke a bara uru.

Note ntinye na nke mpụta ọ bụla nwere **value commitment**: Pedersen commitment `v.G + r.H` nke na-ezo ego ya `v`. Maka na ndị a na-agbakọta, network nwere ike ịgbakọ:

```
(sum of input value commitments) − (sum of output value commitments)
```

Ọ bụrụ na Azụmahia ahụ nọ n'ọnọdụ nguzozi (e meghị ego ọhụrụ ma ọ bụ bibie ego), akụkụ `v` na-akagbu onwe ha kpamkpam, fọdụ naanị commitment nke **uru efu**, nke enweghị usoro fọdụrụ ezoro. Onye zipụrụ ego na-egosi na ọ maara enweghị usoro fọdụrụ ahụ site n'ịmepụta obere signature a na-akpọ **binding signature.** Binding signature ziri ezi ga-ekwe omume naanị mgbe uru ndị ahụ hà n'ezie, **ma ekpugheghị otu ego ọbụla.**

> Nke a bụ ihe atụ kacha doo anya n'usoro isiokwu a dum gbasara *ihe mere* anyị ji chọọ homomorphic commitments nke dabere na curve. A na-amanye iwu "ego batara hà ego pụtara" site n'**ịgbakọta envelopu ndị e mechiri emechi ọnụ** na inyocha na nsonaazụ ya mechiri ka ọ bụrụ efu.

---

## 6. Azụmahia zuru oke, elelere site na mmalite ruo na njedebe

Ka anyị chịkọta Alice na-akwụ Bob ego. Anyị ga-eji usoro doro anya nke Sapling, “akụkụ imefu / akụkụ mpụta”, dị ka ihe nlere maka ịkụzi.

**Azụmahia e chebere echebe na-achịkọta ụdị nkọwa abụọ:**

| Nkọwa imefu (na-eji note) | Nkọwa mpụta (na-emepụta note) |
|---|---|
| value commitment nke ntinye | value commitment nke mpụta |
| **anchor** nke ọ na-egosi proof megide ya (mgbọrọgwụ osisi) | **note commitment** ọhụrụ (akwụkwọ ọhụrụ) |
| **nullifier** nke note e mefuru | **ephemeral key** maka Nzobe ederede |
| igodo ọha e megharịrị enweghị usoro + spend-authorization signature | **note ezoro ezo** (ciphertext maka onye nnata) |
| **zk-SNARK** nke na-egosi nkwupụta anọ ahụ | **zk-SNARK** nke na-egosi na mpụta ahụ haziri nke ọma |

Tinyekwara otu **binding signature** n'elu nchịkọta ahụ dum, nke na-amanye nguzozi uru (Nkebi 5).

![alt text](/content-images/image-30-98511eb2d0.webp)

Chọpụta Nzuzo ahụ: network nyochara anchor, nyochara na nullifier dị ọhụrụ, kwadoro proof ahụ, ma kwadokwa nguzozi ahụ. Ọ nabatara Kwụọ ụhwọ ziri ezi **na-amụghị ego ole, Adreesị akpa ego ọ bụla, ma ọ bụ note e mefuru.** Ka ọ dị ugbu a, **nullifier** nke note e mefuru (ọnwụ ya) na **commitment** ọhụrụ Bob (ọmụmụ note ya) nọ n'ime usoro ọha abụọ dị iche iche na-enweghị njikọ a na-ahụ anya n'etiti ha, njikọ e bipụrụ site n'Edemede 0.

---

## 7. Imechi ajụjụ ọ bụla sitere na Edemede 0

Edemede 0 ji ụma mepee ajụjụ. Lee ha niile, e mechiela.

| Ajụjụ e meghere na Edemede 0 | Ihe mechiri ya |
|---|---|
| Olee otú envelopu e mechiri emechi ma a pụghị ịgha ya aghụghọ ga-esi kwe omume? | Commitments: nzuzo sitere n'enweghị usoro, njigide sitere na iguzogide collision / trapdoor curve (Art 3) |
| Ebee ka igodo na usoro nzuzo si abịa? | Field arithmetic na elliptic-curve scalar multiplication (Art 1, 2) |
| Gịnị kpọmkwem bụ "bọọdụ" ahụ? | Incremental Merkle tree nke note commitments; mgbọrọgwụ ya bụ anchor (Art 4) |
| Gịnị mere na a pụghị ijikọ token oghere na envelopu ya? | Nullifier bụ keyed hash edobere n'ime set dị iche na commitments (Art 2, 3, 4) |
| Olee otú ị ga-esi gosi izi ezi mgbe ị na-ekpugheghị ihe ọ bụla? | zk-SNARK n'elu arithmetic circuit nke na-edekọ nkwupụta anọ ahụ niile (Art 5) |
| Olee otú onye nnata si amata na akwụgoro ya ego? | A na-ezoro note ahụ ezo maka Adreesị akpa ego ya; ha na-eji viewing key nwalee iwepu Nzobe ederede (edemede a) |
| Olee otú a na-amanye "ego batara = ego pụtara" na nzuzo? | Homomorphic value commitments + binding signature (Sec 5) |

Ihe mgbagwoju anya sitere na ibe mbụ, *nyochaa ihe ị na-apụghị ịhụ*, agbazela ugbu a kpamkpam. Network na-enyocha **nkwupụta gbasara data ezoro ezo**, ọ bụghị data ahụ n'onwe ya.

---

## 8. Sapling megide Orchard, n'otu ume

Anyị jiri usoro Sapling kụzie ihe n'ihi na nkewa ya kacha doo anya. Nhazi dị ugbu a, **Orchard**, na-eme ka echiche ndị a ka mma kama dochie ha:

| | **Sapling** | **Orchard** |
|---|---|---|
| Ngalaba Azụmahia | **Spend** na **Output** descriptions dị iche | **Actions** jikọtara ọnụ (nke ọ bụla na-eme otu spend + otu output) |
| Usoro proof | **Groth16** (trusted setup) | **Halo 2** (enweghị trusted setup) |
| Curves | BLS12-381 + Jubjub | Pallas / Vesta (Pasta) |
| Commitment hash | Pedersen | Sinsemilla |

Echiche ọ bụla dị n'edemede a na-aga n'ihu kpọmkwem; Orchard na-achịkọta naanị spend na output ọnụ ma na-agbanwe gaa n'usoro proof na-enweghị emume. Ogidi ise ahụ agbanwebeghị.

---

## 9. Nkwupụta eziokwu

Nke a bụ nkọwa kacha zuo oke n'usoro isiokwu a, ma ọ ka bụ ihe nlereanya. Anyị chịkọtara nkọwa ziri ezi nke field encodings nke note, usoro ntọpụta igodo kpọmkwem, imegharị enweghị usoro nke spend keys, diversified addresses, memo fields, ijikwa ugwo, ọdịiche dị n'etiti value commitments na note commitments n'uju, na ọrụ kpọmkwem nke signature ọ bụla. Anyị gosikwara otu usoro kanọnik; Azụmahia n'ezie nwere ike iburu ọtụtụ spends na outputs n'otu oge ma nwekwaa akụkụ Oha na nke e chebere echebe. Ebe nwere ikike bụ Nkọwapụta Usoro Zcash. Ihe ị nwere ugbu a bụ ọdịdị ziri ezi; nkọwapụta ahụ na-ejuputa nha ọ bụla.

---

## 10. Nchịkọta

- Azụmahia e chebere echebe na-ejikọta ihe ise niile: **note** (uru ahụ), **commitment** ya n'ime **note commitment tree**, **nullifier** iji gbochie imefu ugboro abụọ, **value commitments** maka nguzozi, na **zk-SNARK** nke na-ejikọta ha niile ọnụ.
- Imefu na-egosi **nkwupụta anọ n'otu oge**: note ahụ dị, enyere gị ikike, nullifier ya ziri ezi, na uru ndị ahụ hà, n'ime **zero knowledge**, na-enweghị ikpughe eziokwu ọ bụla dị n'okpuru.
- A na-amanye **nguzozi uru** site n'**ịgbakọta homomorphic commitments** na inyocha na ha mechiri ka ọ bụrụ efu, site na **binding signature**, na-enweghị ikpughe ego ọ bụla.
- Ikike onye ọrụ na-esite n'otu **Igodo ego** site na **usoro ọkwa otu ụzọ**, na-enyere **viewing keys** aka ikpughe ihe na-enweghị inye ikike imefu.
- Network **na-enyocha nkwupụta gbasara data ezoro ezo**, nke na-agbaze ihe mgbagwoju anya verify-vs-privacy sitere na Edemede 0. Ajụjụ niile e meghere ebe ahụ emechiela ugbu a.
- **Orchard** na-eme ka **Sapling** ka mma (Actions jikọtara ọnụ, Halo 2 na-enweghị trusted setup, Pasta curves, Sinsemilla) na-agbanweghị ogidi ise ahụ.

---

## Nkọwa okwu

| Okwu | Nkọwa dị mfe n'asụsụ Bekee |
|---|---|
| **Spending key** | Otu ihe nzuzo mgbọrọgwụ nke igodo onye ọrụ niile si na ya apụta |
| **Viewing Key** | Na-ekpughe Azụmahia gị nye onye jidere ya n'enyeghị ya ohere imefu |
| **Spend description** | Akụkụ tx na-eji note (nullifier, anchor, proof) |
| **Output description** | Akụkụ tx na-emepụta note (commitment, ciphertext, proof) |
| **Action (Orchard)** | Ngalaba jikọtara ọnụ nke na-eme otu spend na otu output ọnụ |
| **Value commitment** | Homomorphic Pedersen commitment maka ego ole |
| **Binding signature** | Signature nke na-egosi na uru ndị ahụ hà na-ekpugheghị ha |
| **Anchor** | Mgbọrọgwụ osisi nke spend na-egosi membership megide ya |
| **Trial decryption** | Onye nnata na-anwale commitments ọhụrụ iji chọta notes e zubere maka ya |

---

## Ajụjụ a na-ajụkarị

**Network ọ na-ahụ ego ole ma ọ bụ onye kwụrụ onye ego?**
Mba. Ọ na-enyocha proof, ịdị ọhụrụ nullifier, anchor, na binding signature. Uru nzuzo niile ka na-ezoro ezo.

**Gịnị na-egbochi m imefu note ugboro abụọ?**
Nullifier. Imefu na-ebipụta ya; network na-ajụ nullifier ọ bụla dịbu n'ime nullifier set. Otu note ahụ na-emepụta otu nullifier ahụ mgbe niile.

**Olee otú e si enyocha nguzozi ma ọ bụrụ na ego ole ezoro ezo?**
Value commitments na-agbakọta homomorphically; commitments Azụmahia nọ n'ọnọdụ nguzozi na-akagbu onwe ha ka ha bụrụ commitment efu, nke binding signature na-egosi.

**Enwere m ike igosi onye na-enyocha ego Azụmahia m n'enyeghị ikike m?**
Ee. Nyefee viewing key. Ọ na-ekpughe ọrụ gị e chebere echebe ma enweghị ike inye ikike imefu, n'ihi usoro ọkwa igodo otu ụzọ.

**Sapling ọ bụrụla ihe ochie ugbu a ebe Orchard dị?**
Ha abụọ adịla na network; Orchard bụ nhazi dị ugbu a. Echiche ha na-ekekọrịta, ya mere ịghọta otu na-enye gị nke ọzọ.

---

### Nwale nghọta gị

Enyi gị kwuru: "Ebe proof na-ezo ego ole, onye ohi nwere ike ịsị na outputs ya bara uru karịa inputs ya ma bipụta ego n'efu." N'iji Nkebi 5, kọwaa n'ahịrịokwu abụọ ihe mere nke a anaghị arụ ọrụ. *(Azịza dị n'okpuru.)*

<details><summary>Azịza</summary>

Ego ndị ahụ ezoro ezo, mana nke ọ bụla dị n'ime homomorphic value commitment, network na-agbakọ commitments ntinye niile wee wepụ commitments mpụta niile; ọ bụrụ na uru ndị zoro ezo ahụ ahaghị, nsonaazụ ahụ agaghị emechi ka ọ bụrụ efu ma **a pụghị ịmepụta binding signature ziri ezi.** Onye ohi nwere ike izo *ego ole*, mana ọ pụghị ime ka uru ndị na-ahaghị gafee nlele nguzozi, ya mere ibipụta ego n'efu agaghị ekwe omume n'agbanyeghị na ekpugheghị ihe ọ bụla ma arithmetic ahụ ka jidere ya.
</details>

---

### Usoro isiokwu ahụ, e mezuru

Ị garala ugbu a site n'otu ihe mgbagwoju anya ruo na Kwụọ ụhwọ nke onwe zuru oke:

![alt text](/content-images/cd8bbb40-57b8-4854-b9cf-97f2485d126a-8847fae521.webp)


Site ebe a, ntụgharị na-esote nke eke na-abanye n'ime omimi: usoro ime Groth16 na Halo 2, emume trusted setup, circuits Sapling na Orchard n'uju, ntọpụta igodo na diversified addresses, na mmepe usoro ahụ n'ofe network upgrades. Mana ntọala ahụ adịla ugbu a, isiokwu nke ọ bụla n'ime ndị a nwekwara ebe ọ ga-adakwasị.

*Akụkụ nke usoro isiokwu* Zcash site na Ụkpụrụ Mbụ *maka [ZecHub](https://zechub.org). Enyere ikike CC BY-SA 4.0.*
