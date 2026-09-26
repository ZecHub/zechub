# Usoro Nkwekọrịta E Chebere, Site ná Mmalite Ruo ná Ngwụsị
##### Nnyocha mbụ sitere na [Annkkitaaa](https://github.com/Annkkitaaa)

! ![Alt ederede](/content-images/image-27-4094293ec0.webp)

### Ịchịkọta iberibe niile n'otu azụmahịa Zcash nkeonwe

> **Series:** *Zcash site na First Principles* . **Article 6 .
> Ndị na-ege ntị: Ndị ọhụrụ bịara ọhụrụ ndị gụrụ isiokwu 0 ruo 5. Nke a bụ ebe ihe niile jikọtara.
> **What you'll leave with:** a complete, correct mental model of a shielded Zcash transaction, with every concept from the series in its proper place, and every loop from Article 0 closed.

Anyị malitere, na [Nkeji edemede 0](article-0-shielded-transaction.md), with a paradox and a story about sealed envelopes on a public board. Then we spent five articles building the parts: finite fields, elliptic curves, commitments, Merkle trees, and zero-knowledge proofs. Now we put them together and watch a real private payment work, start to finish.

---

## 1. Gịnị mere o ji dị mkpa ka i lebara ha anya?

Individually, each piece you've learned is clever. But the *magic* of Zcash is in how they interlock. A nullifier alone doesn't give privacy. A commitment alone doesn't prevent forgery. A proof alone proves nothing useful. It's the **assembly** that turns five components into money that is simultaneously private and trustworthy.

This article is the assembly. By the end, the sentence *"the network verifies a transaction it cannot see"* will feel not like a paradox but like an obvious consequence of parts you already understand.

---

## 2. E jikọtaghachiri ihe ndị e ji kpụọ ya

Nke a bụ usoro ahụ dum n'otu peeji, nke e depụtara site n'akụkọ nke Nkeji edemede 0 ruo n'ezi ígwè ọrụ.

| Ihe akụkọ nke edemede 0 | Ezigbo akụkụ | E wuru ya site na |
|---|---|---|
| Ego dị n'ime envelopu | **Rịba ama** (uru, onye nnata, enweghị usoro) | e tinyere koodu dị ka ihe ubi (Art 1) |
| Envelopu ahụ a na-anaghị ahụ anya nke e mechiri emechi | **Rịba ama nkwa** | Pedersen / Sinsemilla nkwa (Art 2, 3) |
| Òtù ọha na eze | **Rịba ama osisi nkwa** (anchor = mgbọrọgwụ ya) | Osisi Merkle nke na-abawanye ụba (Nkeji nke 4) |
| Ihe nrịbama efu | **Ihe na-emebi ihe** | ihe e ji edetu ihe nke ZK + igodo nzuzo (Art 2, 3) |
| "Ego dị n'ime ya hà nhata ego" | **Nkwa uru + nlele nguzozi** | Nkwa Pedersen nke nwere ụdị onwe ya (Art 2, 3) |
| Anwansi dị n'azụ ákwà mgbochi | **Ihe akaebe na-enweghị ihe ọmụma** | zk-SNARK n'elu sekit mgbakọ na mwepụ (Art 5) |
| "Naanị gị nwere ike ịgụ akwụkwọ ozi gị" | **Ndetu ezoro ezo + igodo nlele** | nzuzo + usoro isi (isiokwu a) |

---

## 3. Ebe e si enweta mkpịsị ugodi

Everything a user can do flows from a single secret, the **spending key**, through a one-way hierarchy (each arrow is an irreversible derivation, courtesy of the trapdoors in Articles 2 and 3):

! ![Alt ederede](/content-images/image-32-f443f9bb72.webp)

Ihe abụọ kwesịrị ka a rịba ama, ha abụọ bụ ihe ndị si n'isiokwu ndị bu ụzọ pụta:

- Nkewa ahụ na-enye gị ohere inyefe ** igodo nlele ** (kwuo, nye onye nyocha) nke na-ekpughe azụmahịa gị ** na-enweghị ** inye ikike imefu. Nzuzo bụ nhọrọ, ọ bụghị ihe niile ma ọ bụ ihe ọ bụla.
- Ihe ọ bụla a na-eme bụ ** otu ụzọ **: ijide igodo nlele anaghị ekwe ka onye ọ bụla weghachite igodo mmefu, kpọmkwem ụzọ mgbochi elliptic-curve site na edemede 2 na-arụ ọrụ ya.

---

## 4. Imefu ego: ihe anọ a chọrọ

To spend a note privately, you must convince the network of four things at once **without revealing the note, its value, its position, or your identity.** Each claim is satisfied by a component you already know.

! ![Alt ederede](/content-images/image-31-86309af194.webp)

The proof reveals **none** of the underlying facts (which note, whose key, what value). It reveals only that *all four claims hold.* That is the entire trick of shielded Zcash, stated in one diagram.

---

## 5. Ụzọ a na-esi eme ka ego ghara ịba ụba (ụgwọ anyị na-akwụghị)

Laa azụ n'isiokwu nke 2 na nke 3 anyị kwuru na Pedersen nkwa ** gbakwunye **: nkwa maka `v_1` gbakwunyere nkwa `v_2` bụ nkwa i kwere `v_1 + v_2`Nke a bụ ebe ọ na-akwụ ụgwọ.

Onye ọ bụla input na mmepụta akwụkwọ ozi na-ebu a ** uru nkwa **: a Pedersen nkwa `v.G + r.H` nke na-ezochi ego ya `v`Ebe ọ bụ na ndị a gbakwunyere, netwọk nwere ike ịgbakọ:

```
(sum of input value commitments) − (sum of output value commitments)
```

Ọ bụrụ na azụmahịa ahụ bụ ihe ziri ezi (ọ dịghị ego e kere ma ọ bụ bibie), `v` parts cancel exactly, leaving only a commitment to **zero value**, blinded by leftover randomness. The sender proves they know that leftover randomness by producing a small signature called the **binding signature.** A valid binding signature is only possible when the values truly balance, **yet not a single amount was revealed.**

> This is the cleanest illustration in the whole series of *why* we needed homomorphic, curve-based commitments. The "money in equals money out" rule is enforced by **adding sealed envelopes together** and checking the result seals to zero.

---

## 6. Azụmahịa zuru ezu, nke a na-ele anya site ná mmalite ruo ná ngwụsị

Ka anyị gbakọta Alice na-akwụ Bob. Anyị ga-eji Sapling's doro anya "na-emefu n'akụkụ / mmepụta n' akụkụ" Ọdịdị dị ka ihe nlereanya izi ihe.

**A na-ekpuchi azụmahịa na-ejikọta ụdị nkọwa abụọ:**

| Nkọwa mmefu (na-eri ihe ndetu) | Nkọwapụta (na-emepụta ndetu) |
|---|---|
| ntinye uru nke ntinye ahụ | ntinye uru nke mmepụta |
| **ankros** ọ na-egosi megide (mgbọrọgwụ osisi) | nkwa ọhụrụ **ndetu** (akwụkwọ ọhụrụ) |
| **ihe na-emebi ihe** nke akwụkwọ ego emefuru | igodo **ephemeral** maka izochi ihe |
| igodo ọha emegharịrị agbanwere + mbinye aka ikike mmefu | ndetu **e zoro ezo** (ederede ederede maka onye nnata) |
| **zk-SNARK** na-egosi nkwupụta anọ ahụ | a **zk-SNARK** na-egosi na mmepụta ahụ dị mma |

Tụkwasị na otu ** mbinye aka na-ejikọta ihe niile, na-eme ka nguzozi uru (Nkebi nke 5).

! ![Alt ederede](/content-images/image-30-98511eb2d0.webp)

Trace the privacy: the network checked the anchor, checked the nullifier was fresh, verified the proof, and verified balance. It accepted a valid payment **having learned no amount, no address, and not which note was spent.** Meanwhile the spent note's **nullifier** (its death) and Bob's new **commitment** (his note's birth) sit in two different public structures with no visible link between them, the severed link from Article 0.

---

## 7. Imechi usoro ọ bụla site na edemede 0

Nkeji edemede 0 kpachapụrụ anya mepee ajụjụ. Lee ha niile, mechiri emechi.

| Emepere oghere ahụ na Isiokwu 0 | Emechiri site na |
|---|---|
| Kedu otu esi enwe ike itinye envelopu emechiri emechi mana nke a na-apụghị ịgbanwe agbanwe? | Nkwa: izopụ onwe gị n'enweghị ihe mberede, ijikọta onwe gị site na iguzogide ihe mberede / ụzọ ọnyà mgbagọ (Art 3) |
| Ebee ka igodo na nri nzuzo si abịa? | Mmụba scalar mgbakọ na mwepụ ubi na elliptic-curve (Nkeji 1, 2) |
| Gịnị kpọmkwem bụ "bọọdụ" ahụ? | Osisi Merkle nke nkwa ndị a na-eme n'oge gara aga; mgbọrọgwụ ya bụ ihe e ji aka rụọ (Art 4) |
| Gịnị mere na enweghị ike ijikọ ihe ngosi efu na envelopu ya? | Ihe na-emebi ihe bụ ihe e ji aka dee nke dị iche na nkwa (Art 2, 3, 4) |
| Kedu ka ị si egosi na ị bụ onye eziokwu ma ghara ikpughe ihe ọ bụla? | zk-SNARK n'elu sekit mgbakọ na mwepụ nke na-akọwapụta nkwupụta anọ niile (Art 5) |
| Kedu ka onye nnata si amata na akwụọla ha ụgwọ? | E zoro ihe ndetu ahụ n'adres ha; ha na-anwale iji viewing key gbanwee ya (isiokwu a) |
| Kedu otu esi etinye "ego dị n'ime = ego" n'ọrụ n'onwe ya? | Nkwa uru nke Homomorphic + mbinye aka njikọ (Nkebi nke 5) |

Ihe mgbagwoju anya site na peeji nke mbụ, * nyochaa ihe ị na-apụghị ịhụ*, ugbu a ka etisasịwo kpamkpam. netwọk ahụ na-enyocha ** nkwupụta banyere data zoro ezo **, ọ dịghị mgbe data n'onwe ya.

---

## 8. Sapling vs Orchard, n'otu ume

Anyị jiri usoro Sapling kụzie ihe n'ihi na nkewa ya doro anya. Ihe eji eme ihe ugbu a, **Orchard**, na-edozi echiche ndị a kama dochie ha:

| | **Sapling** | **Orchard** |
|---|---|---|
| Ngalaba azụmahịa | Nkọwa dị iche iche **Mefu** na **Mmepụta** | **Mmemme dị n'otu** (nke ọ bụla na-emefu + otu mmepụta) |
| Sistemụ ihe akaebe | **Groth16** (ntọala a tụkwasịrị obi) | **Halo 2** (enweghị ntọala a tụkwasịrị obi) |
| Usoro mgbagọ | BLS12-381 + Jubjub | Pallas / Vesta (Pasta) |
| Ihe gbasara nkwa | Pedersen | Sinsemilla |

Every concept in this article carries over directly; Orchard mainly bundles spend-and-output together and swaps in a proof system with no ceremony. The five pillars are unchanged.

---

## 9. Onye na-ekwu eziokwu

This is the most complete picture in the series, but still a model. We compressed the exact field encodings of a note, the precise key-derivation formulas, the re-randomization of spend keys, diversified addresses, memo fields, fee handling, the difference between value commitments and note commitments in full detail, and the precise role of each signature. We also presented one canonical flow; real transactions can carry many spends and outputs at once and may mix transparent and shielded parts. The authoritative source is the Zcash Protocol Specification. What you now hold is the correct shape; the specification fills in every measurement.

---

## 10. Nchịkọta

- A shielded transaction interlocks all five components: a **note** (the value), its **commitment** in the **note commitment tree**, a **nullifier** to prevent double-spends, **value commitments** for balance, and a **zk-SNARK** binding it all together.
- Spending proves **four claims at once**, the note exists, you're authorized, its nullifier is correct, and value balances, in **zero knowledge**, revealing none of the underlying facts.
- **Value balance** is enforced by **adding homomorphic commitments** and checking they seal to zero, via the **binding signature**, with no amount disclosed.
- A user's powers flow from one **spending key** through a **one-way hierarchy**, enabling **viewing keys** that reveal without granting spend power.
- The network **verifies claims about hidden data**, dissolving the verify-vs-privacy paradox from Article 0. Every loop opened there is now closed.
- **Orchard** na-emezi **Sapling** (mmekọrịta dị n'otu, Halo 2 na-enweghị ntọala a tụkwasịrị obi, Pasta curves, Sinsemilla) n'agbanweghị ogidi ise ahụ.

---

## Okwu

| Oge okwu | Nkọwa Bekee dị mfe |
|---|---|
| **Spending key** | Ihe nzuzo otu mgbọrọgwụ nke igodo niile onye ọrụ si enweta |
| **Viewing key** | Na-ekpughe azụmahịa gị nye onye nwere ya n'ekweghị ka ha mefuo ego |
| **Spend description** | Akụkụ nke tx nke na-eri ihe ndetu (ihe na-emebi ihe, arịlịka, ihe akaebe) |
| **Output description** | Akụkụ nke tx nke na-emepụta ndetu (nkwa, ederede nzuzo, ihe akaebe) |
| **Action (Orchard)** | Otu n'otu na-emefu otu mmefu na otu mmepụta ọnụ |
| **Value commitment** | Nkwa Pedersen nwere njikọ na ego |
| **Binding signature** | Mbinye aka nke na-egosi na ụkpụrụ na-aga nke ọma n'ekpugheghị ha |
| **Anchor** | Mgbọrọgwụ osisi a na-emefu ego na-egosi na ọ bụ onye otu megidere |
| **Trial decryption** | Onye nnata na-anwale nkwa ọhụrụ iji chọta ndetu e mere maka ha |

---

## FAQ

**Ọ bụ na ụlọ ọrụ ahụ anaghị ahụ ego ole maọbụ onye kwụrụ onye?**
No. It verifies the proof, the freshness of the nullifier, the anchor, and the binding signature. All private values stay hidden.

Gịnị na-egbochi m imefu ego ugboro abụọ?
The nullifier. Spending publishes it; the network rejects any nullifier already in the nullifier set. The same note always yields the same nullifier.

**Olee otu esi enyocha nguzozi ma ọ bụrụ na e zoro ego?**
Value commitments add up homomorphically; a balanced transaction's commitments cancel to a commitment of zero, which the binding signature proves.

** Enwere m ike igosi onye na-enyocha ego azụmahịa m n'enyeghị m ikike? **
Ee. Nyefee igodo nlele. Ọ na-ekpughe ọrụ gị echekwara ma enweghị ike inye ikike mmefu ego, ekele maka usoro isi otu ụzọ.

**Ọ bụ na Sapling abaghịzi uru ugbu a na Orchard dị?**
Ha abụọ adịla na netwọkụ; Orchard bụ atụmatụ dị ugbu a. A na-ekerịta echiche ndị ahụ, yabụ ịghọta otu na-enye gị nke ọzọ.

---

### Nwalee ihe ndị ị na-aghọta

A friend says: "Since the proof hides the amount, a thief could just claim their outputs are worth more than their inputs and print free money." Using Section 5, explain in two sentences why this fails. *(Answer below.)*

<details><summary>Answer</summary>

The amounts are hidden, but each is wrapped in a homomorphic value commitment, and the network adds all input commitments and subtracts all output commitments; if the hidden values didn't balance, the result would not seal to zero and **no valid binding signature could be produced.** The thief can hide *how much*, but cannot make unbalanced values pass the balance check, so printing free money is impossible without revealing nothing yet still being caught by the arithmetic.
</details>

---

### Usoro ahụ, zuru ezu

Ugbu a, i sila n'otu ihe dị mgbagwoju anya gaa n'ịkwụ ụgwọ zuru ezu:

! ![Alt ederede](/content-images/cd8bbb40-57b8-4854-b9cf-97f2485d126a-8847fae521.webp)


From here, the natural next arc goes deeper: the inner workings of Groth16 and Halo 2, trusted-setup ceremonies, the Sapling and Orchard circuits in detail, key derivation and diversified addresses, and the protocol's evolution across network upgrades. But the foundation is now in place, and every one of those topics has a home to attach to.

* Akụkụ nke usoro Zcash sitere na First Principles * maka [ZecHub](https://zechub.org)Akwụkwọ ikike CC BY-SA 4.0.*
