# Usoro Nkwekọrịta E Chebere, Site ná Mmalite Ruo ná Ngwụsị
##### Nnyocha mbụ sitere na [Annkkitaaa](https://github.com/Annkkitaaa)

! [Alt ederede](image-27.png)

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

Isiokwu 0 Akụkọ ihe mere eme. Akụkụ dị adị. E wuru site na...
|---|---|---|
Ego dị n'ime envelopu. ** Rịba ama ** (uru, onye nnata, randomness) encoded dị ka ubi ọcha (Art 1)
Envelopu a na-ekpuchi ekpuchi. ** Nkwupụta ntinye aka ** Pedersen / Sinsemilla ntinye aka (Art 2, 3)
| The public board | **Note commitment tree** (anchor = its root) | incremental Merkle tree (Art 4) |
 Token efu  ** Nullifier  ZK-enyi na enyi hash nke ndetu + igodo nzuzo (Art 2, 3)
"Ego n'ime ya bụ ego na-apụ". ** Uru nkwa + itule ego** homomorphic Pedersen nkwa (Art 2, 3)
| The behind-the-curtain magic | **Zero-knowledge proof** | zk-SNARK over an arithmetic circuit (Art 5) |
◯ "Naanị gị nwere ike ịgụ envelopu gị". ◯ **Nkọwa ezoro ezo + igodo nlele** ◯ ezoro ezoro + usoro isi (isiokwu a) ◯

---

## 3. Ebe e si enweta mkpịsị ugodi

Everything a user can do flows from a single secret, the **spending key**, through a one-way hierarchy (each arrow is an irreversible derivation, courtesy of the trapdoors in Articles 2 and 3):

! [Alt ederede](image-32.png)

Ihe abụọ kwesịrị ka a rịba ama, ha abụọ bụ ihe ndị si n'isiokwu ndị bu ụzọ pụta:

- Nkewa ahụ na-enye gị ohere inyefe ** igodo nlele ** (kwuo, nye onye nyocha) nke na-ekpughe azụmahịa gị ** na-enweghị ** inye ikike imefu. Nzuzo bụ nhọrọ, ọ bụghị ihe niile ma ọ bụ ihe ọ bụla.
- Ihe ọ bụla a na-eme bụ ** otu ụzọ **: ijide igodo nlele anaghị ekwe ka onye ọ bụla weghachite igodo mmefu, kpọmkwem ụzọ mgbochi elliptic-curve site na edemede 2 na-arụ ọrụ ya.

---

## 4. Imefu ego: ihe anọ a chọrọ

To spend a note privately, you must convince the network of four things at once **without revealing the note, its value, its position, or your identity.** Each claim is satisfied by a component you already know.

! [Alt ederede](image-31.png)

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

| Spend description (consumes a note) | Output description (creates a note) |
|---|---|
❖ Nkwekọrịta uru nke ntinye ❖ Nkwenye uru nke mmepụta ❖
❖ ọ na-agba akaebe megide (mgbọrọgwụ osisi) ❖ nkwa ọhụrụ e kwere (akwụkwọ ọhụrụ)
❖ ihe na-eme ka ego e mefuru ghara ịba uru ❖ igodo na-adịru nwa oge e ji ezochi ihe ❖
◯ igodo ọha na eze a họpụtara ahọpụta ọzọ + mbinye aka inye ikike imefu ego ◯ ihe e dere n'usoro e ji ezoro ezo ◯
| the **zk-SNARK** proving the four claims | a **zk-SNARK** proving the output is well-formed |

Tụkwasị na otu ** mbinye aka na-ejikọta ihe niile, na-eme ka nguzozi uru (Nkebi nke 5).

! [Alt ederede](image-30.png)

Trace the privacy: the network checked the anchor, checked the nullifier was fresh, verified the proof, and verified balance. It accepted a valid payment **having learned no amount, no address, and not which note was spent.** Meanwhile the spent note's **nullifier** (its death) and Bob's new **commitment** (his note's birth) sit in two different public structures with no visible link between them, the severed link from Article 0.

---

## 7. Imechi usoro ọ bụla site na edemede 0

Nkeji edemede 0 kpachapụrụ anya mepee ajụjụ. Lee ha niile, mechiri emechi.

❖ E meghere okirikiri na Nkeji edemede 0❖ E mechiri ya na ❖
|---|---|
| How is a sealed-yet-unforgeable envelope possible? | Commitments: hiding from randomness, binding from collision resistance / the curve trapdoor (Art 3) |
❑ Ebee ka igodo na usoro nzuzo si abịa? ❑ Ọgụgụ ubi na elliptic-curve scalar multiplication (Art 1, 2)
❑ Gịnị kpọmkwem bụ "bọọdụ"? ❑ Osisi Merkle nke na-amụbawanye nke ihe ndị e dere ede; mgbọrọgwụ ya bụ arịlịka (Art 4) ❑ Ihe ndị a na-akpọ bọọdụ bụ ihe ndị dị n'ime bọọdụ.
| Why can't the void token be linked to its envelope? | The nullifier is a keyed hash kept in a separate set from commitments (Art 2, 3, 4) |
| How do you prove validity while revealing nothing? | A zk-SNARK over an arithmetic circuit encoding all four claims (Art 5) |
| How does the recipient learn they were paid? | The note is encrypted to their address; they trial-decrypt with a viewing key (this article) |
| How is "money in = money out" enforced privately? | Homomorphic value commitments + the binding signature (Sec 5) |

Ihe mgbagwoju anya site na peeji nke mbụ, * nyochaa ihe ị na-apụghị ịhụ*, ugbu a ka etisasịwo kpamkpam. netwọk ahụ na-enyocha ** nkwupụta banyere data zoro ezo **, ọ dịghị mgbe data n'onwe ya.

---

## 8. Sapling vs Orchard, n'otu ume

Anyị jiri usoro Sapling kụzie ihe n'ihi na nkewa ya doro anya. Ihe eji eme ihe ugbu a, **Orchard**, na-edozi echiche ndị a kama dochie ha:

♬ Sapling ♬ Orchard ♬
|---|---|---|
◯ Nhazi azụmahịa ◯ nkọwa dị iche iche nke mmefu na mmepụta ◯ Omume e jikọtara ọnụ (nke ọ bụla na-emefu otu ihe + mmepụta otu ihe)
◯ Usoro ihe akaebe ◯ Groth16 ◯ Halo 2 ◯
◯ Curves ◯ BLS12-381 + Jubjub ◯ Pallas / Vesta (Pasta) ◯ Ihe ndị a na-eme n'oge okpomọkụ
◯ Nkwekọrịta ◯ Pedersen ◯ Sinsemilla

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

Okwu. N'asụsụ Bekee nkịtị pụtara.
|---|---|
** Igodo na-emefu ego ** Otu ihe nzuzo mgbọrọgwụ nke isi ihe niile onye ọrụ na-enweta.
** Igodo ngosi ** Na-ekpughe azụmahịa gị na onye nwe ya n'ekweghị ka ha jiri ya mee ihe.
**Spend description** Akụkụ nke tx nke na-eri ihe edeturu (nullifier, anchor, proof)
** Nkọwapụta mmepụta ** Akụkụ nke tx nke na-emepụta ihe edeturu (nkwekọrịta, ederede ederede, ihe akaebe)
**Action (Orchard) ** A n'otu unit eme otu mmefu na otu mmepụta ọnụ.
** Nkwekorita uru ** A homomorphic Pedersen nkwekorita na ego.
** Mbinye aka na-ejikọta** Mbinya aka nke na-egosi nguzozi uru n'ekpugheghị ha.
**Anchor** Osisi mgbọrọgwụ a na-emefu na-egosi ịbụ onye otu megide
** Trial decryption ** A nnata ule ọhụrụ nkwa ịchọta ndetu pụtara maka ha.

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

! [Alt ederede](https://github.com/user-attachments/assets/cd8bbb40-57b8-4854-b9cf-97f2485d126a)


From here, the natural next arc goes deeper: the inner workings of Groth16 and Halo 2, trusted-setup ceremonies, the Sapling and Orchard circuits in detail, key derivation and diversified addresses, and the protocol's evolution across network upgrades. But the foundation is now in place, and every one of those topics has a home to attach to.

* Akụkụ nke usoro Zcash sitere na First Principles * maka [ZecHub]](https://zechub.org)Akwụkwọ ikike CC BY-SA 4.0.*
