# Osisi Merkle: Otu Blockchain si echeta Nkọwa Ọ bụla
##### Nnyocha mbụ sitere na [Annkkitaaa](https://github.com/Annkkitaaa)

! [Alt ederede](image-19.png)

### Nchịkọta nke ọtụtụ nde nkwekọrịta n'otu mkpịsị aka pere mpe

> **Series:** *Zcash site na First Principles* . **Article 4 .
> **Audience:** newcomers. We build on [Article 3 (hashing and commitments)](article-3-hashing-commitments.md)Ọ bụrụ na ị maara ihe mkpịsị aka na nkwa bụ, ị dịla njikere.
> **What you'll leave with:** an intuitive, correct picture of Merkle trees, how to prove membership without revealing which item you mean, and exactly how this becomes Zcash's note commitment tree.

[Ihe nke 0](article-0-shielded-transaction.md) described a "public board" that holds every note ever created and only ever grows. By now you can guess what's pinned to it: **commitments** (Article 3), the sealed envelopes. But a real board would hold *hundreds of millions* of them. How does the network store that, verify it, and let you prove your envelope is on the board without pointing to it? The answer is one of the most elegant structures in computer science: the **Merkle tree.**

---

## 1. Gịnị mere o ji dị mkpa ka i lebara ha anya?

Nsogbu abụọ na-apụta ozugbo i nwere nnukwu ndepụta nke ihe ndị ị ga-eme.

**Problem one: integrity at scale.** If the list has 300 million entries, how does anyone confirm that *not one* has been secretly altered? Re-checking 300 million items on every glance is hopeless.

**Problem two: private membership.** To spend a note (Article 0), you must prove your commitment is genuinely on the board. But if you point at it ("it's entry number 4,201,337!"), you've just deanonymized yourself. You need to prove *"my envelope is somewhere on this board"* without revealing **which** one.

A Merkle tree solves both at once. It compresses the entire list into a single fingerprint, and it lets you prove membership with a tiny, position-hiding proof.

---

## 2. Intuition: asọmpi nke akara mkpịsị aka

Cheedị echiche banyere asọmpi nkwụsị, ma kama ndị egwuregwu ịga n'ihu, a na-ejikọta akara mkpịsị aka.

- N'okpuru, mpempe data ọ bụla na-enweta akara mkpịsị aka ya (hash ya site na Nkeji edemede 3).
- Gwakọta ha. A na-ejikọta mkpịsị aka abụọ nke ụzọ ọ bụla * ọnụ * n'ime otu mkpisiaka nne na nna.
- Gwakọta nne na nna ahụ, jikọta ha abụọ ọnụ, werezie ha mee otu.
- Gaa n'ihu ruo mgbe otu mkpịsị aka na-anọdụ n'elu. Onye mmeri ahụ bụ mgbọrọgwụ Merkle.

! [Alt ederede](image-20.png)

Otu ihe kachasị mkpa na-esote ozugbo site na mmetụta avalanche (Nkeji edemede 3):

> **The root is a fingerprint of *everything* below it.** Change any leaf, even by one bit, and its fingerprint changes, which changes its parent, which changes *that* parent, all the way up. **The root changes.** So one small root value certifies the integrity of the entire list. That solves Problem one.

---

## 3. Osisi dị adị n'ezie, nke a gbakọrọ ọnụ kpọmkwem

Ka anyị wuo osisi nwere akwụkwọ anọ dị n'elu ya na mkpịsị aka SHA-256 n'ezie na akwụkwọ `A, B, C, D` (a na-egosipụta ihe ndị a na-egosi maka ịgụ ihe):

```
hA = 559aead08264...     hB = df7e70e50215...
hC = 6b23c0d5f35d...     hD = 3f39d5c348e5...

hAB = H(hA , hB) = 63956f0ce48e...
hCD = H(hC , hD) = 98a2fbfddbc7...

ROOT = H(hAB , hCD) = 1b3faa3fcc5e...
```

Ihe niile bụ "hash ihe, mgbe ahụ hash ụzọ abụọ nke hashes. " Ọ dịghị ihe dị iche karịa Nkeji edemede 3, ahaziri n'osisi.

---

## 4. Akụkụ dị nkọ: igosi ịbụ onye otu n'ekpugheghị ọnọdụ

Ugbu a nsogbu nke abụọ. Kwuo na ị chọrọ igosi na akwukwo `C` na osisi, nye onye maara naanị mgbọrọgwụ. ị * adịghị * enye ha osisi ahụ dum. ị nye ha naanị mkpịsị aka dị mkpa iji rịgoro site na ya `C` na mgbọrọgwụ, a na-akpọ ** ụzọ nyocha ** (ma ọ bụ ** ihe akaebe Merkle **):

> Iji gosi `C` dị n'osisi ahụ, nye:
> - nwanne ya nwoke `hD`, na
> - nwanne nna ya `hAB`.

Onye nyocha ahụ, na-ama naanị mgbọrọgwụ, na -agbakọ ịrị elu:

```
step 1:  H(hC , hD)        = hCD       (combine C with its sibling)
step 2:  H(hAB , hCD)      = ROOT?     (combine with the uncle)
```

Gbakọọ maka n'ezie: nke a na-enye `1b3faa3fcc5e...`, nke ** kwekọrọ na mgbọrọgwụ.** A na-egosi na akwụkwọ ahụ dị n'osisi ahụ.

! [Alt ederede](image-21.png)

Ihe abụọ na-eme ka nke a dị ike:

- ** Ọ dị obere. ** Maka akwụkwọ 4 ị nyere 2 hashes. `n` akwụkwọ na-enye gị naanị ihe dịka ** log_2 ((n) ** hashes. Maka otu ijeri akwụkwọ, nke ahụ bụ ihe dị ka ** 30 hashes **, ọ bụghị otu puku ijeri. Ihe akaebe ahụ na-eto ngwa ngwa ka osisi ahụ gbawara na nha.
- **It's the seed of privacy.** The proof shows your leaf is *somewhere* in the tree. When this same check is performed *inside a zero-knowledge proof* (Article 5), even the path itself is hidden, so you prove "my note is in the tree" while revealing neither the note nor its position. That fully solves Problem two.

---

## 5. Site n'osisi Merkle ruo osisi nkwekọrịta nke Zcash

Ugbu a, anyị nwere ike ikwu kpọmkwem ihe isiokwu 0's "n'ihu ọha osisi" n'ezie bụ:

> The **note commitment tree** is a Merkle tree whose **leaves are note commitments.** Every time a note is created anywhere in the world, its commitment is appended as the next leaf, and the root is updated.

Ihe ole na ole doro anya:

- **It only grows.** Leaves are appended, never removed. This is called an **incremental Merkle tree.** (It matches Article 0's "the board never tears anything down.")
- **The root is called the *anchor*.** When you spend, your transaction references a recent anchor and proves, in zero knowledge, that your note's commitment sits in the tree with that root.
- Osisi ndị Zcash na-echebe nwere omimi nke 32m, nke pụtara na ha nwere ike ijide ruo `2^(32)` (ihe karịrị ijeri anọ)
- **ZK-friendly hashing.** The tree isn't built with SHA-256. Sapling hashes the tree with **Pedersen hashes** and Orchard uses **Sinsemilla** (both from Article 3), precisely so the membership climb is cheap to prove inside a circuit.

! [Alt ederede](image-22.png)

### Otu ihe osisi anaghị eme bụ imefu ego okpukpu abụọ

The tree proves a note **exists**. It does not, by itself, stop you from spending the same note twice. That job belongs to the **nullifier set** from Article 0: a separate collection of "void tokens." When you spend, you publish the note's nullifier, and the network rejects any nullifier it has seen before.

So the two public structures play complementary roles, and keeping them separate is exactly what severs the link between a note's birth and its death:

Ọdịdị. Ajụjụ ọ na-aza. E melite mgbe.
|---|---|---|
 **Nkọwa osisi ntinye aka**  "Ihe edeturu a ọ dị adị?"  A na-edepụta ihe edetu (agbakwunyere ntinye aka)
"Ejirila akwụkwọ a emefu?" Akwụkwọ bụ akwụkwọ e ji emefu ego.

---

## 6. Onye na-ekwu eziokwu

Simplifications, as usual. Real incremental Merkle trees track "frontier" nodes so the root can update without rebuilding everything; the network keeps a window of recent anchors, not just the latest, so wallets aren't broken by every new block; and empty leaves use a defined padding value. We also drew binary trees with neat powers of two. None of this changes the intuition: leaves of commitments, hashed in pairs up to one root, with short membership proofs. The exact bookkeeping returns in the protocol article.

---

## 7. Nchịkọta

- Osisi Merkle na-agbanye data n'ime akwụkwọ, wee gbanye ụzọ abụọ ruo mgbe otu mgbọrọgwụ fọdụrụ.
- N'ihi mmetụta mmiri ozuzo, ** mgbọrọgwụ bụ akara mkpịsị aka nke ndepụta dum **: gbanwee otu akwukwo na mgbọrọkpụ gbanwere. Otu obere uru na-egosi nnukwu dataset.
- A **membership proof (authentication path) ** bụ naanị ụmụnne n'akụkụ ịrịgo na mgbọrọgwụ, banyere **log_2(n) ** hashes, yabụ ihe akaebe na-adị obere ọbụlagodi maka ijeri akwụkwọ.
- Performed **inside a zero-knowledge proof**, that membership check hides *which* leaf you mean, proving "my note is in the tree" without revealing the note or its position.
- Zcash's **note commitment tree** is an **incremental** Merkle tree of note commitments, depth **32**, whose root is the **anchor**; Sapling hashes it with **Pedersen** and Orchard with **Sinsemilla**.
- The tree proves **existence**; the separate **nullifier set** prevents **double-spends**. Keeping them apart is what unlinks a note's birth from its death.

---

## Okwu

Okwu. N'asụsụ Bekee nkịtị pụtara.
|---|---|
**Merkle tree** A osisi nke hashes; epupụta bụ data mkpịsị aka, nne na nna hash ụmụ ha.
**Leaf**: A n'okpuru ọnụ; na Zcash, otu note nkwa.
**Merkle mgbọrọgwụ**. The otu n'elu mkpịsị aka na-achịkọta dum osisi.
 ** Ụzọ nkwenye / Ihe akaebe Merkle **  Ụmụnne hashes dị mkpa iji gosipụta akwụkwọ dị na osisi ahụ
** Osisi Merkle na-abawanye** Osisi osisi Merkle nke na-agbakwunye naanị (a na-etinye akwụkwọ naanị mgbe ọ bụla)
**Anchor** A Merkle mgbọrọgwụ na a na-emefu zoro aka dị ka "osisi ala m na-egosi megide".
** Nullifier set ** Nchịkọta dị iche iche nke ihe eji eme ihe na-egbochi okpukpu abụọ.

---

## FAQ

** Gịnị mere e ji nwee osisi kama ịbụ ogologo ndepụta nke hashes? **
Ndepụta dị larịị ga-amanye gị ikpughe ma ọ bụ nyochaa ntinye ọ bụla iji gosipụta ịbụ onye otu. Osisi na-enye gị ihe akaebe nke logarithmic na otu mgbọrọgwụ maka iguzosi ike n'ezi ihe.

**Onye nyocha ahụ ọ chọrọ osisi ahụ dum?**
Mba, naanị ihe onye nyocha ahụ chọrọ bụ mgbọrọgwụ tinyere ụzọ nkwenye gị dị mkpirikpi.

**Gịnị kpatara omimi 32 kpọmkwem?**
It bounds the tree at about four billion notes, which is ample headroom, while keeping the membership proof (and its in-circuit cost) a fixed, manageable size.

** Ọ bụrụ na mgbọrọgwụ na-agbanwe na ọkwa ọhụrụ ọ bụla, kedu ka ihe akaebe ochie si dị irè? **
Netwọk ahụ na-echeta windo nke mgbọrọgwụ ndị na-adịbeghị anya (anchor), yabụ nkwenye emere megide arịlịka ochie ka na-enyocha.

---

### Nwalee ihe ndị ị na-aghọta

N'osisi anyị nwere akwụkwọ anọ, ka e were ya na onye na-awakpo anyị zoro ezo gbanwee akwụkwọ ya `C` for a different value but leaves the published root unchanged. What goes wrong for them, and why can't they fix it quietly? *(Answer below.)*

<details><summary>Answer</summary>

Ịgbanwe `C` mgbanwe `hC` (mmetụta avalanche), nke na-agbanwe `hCD = H(hC, hD)`, nke gbanwere `ROOT = H(hAB, hCD)`. So the recomputed root no longer matches the published root, and the tampering is detected. To "fix it quietly" they'd need to find a different `C` nke na-emepụta *otu* `hC`, nke bụ a hash nkwekọrịta, unfeasible site Nkeji edemede 3.
</details>

---

### Kedu ihe ọzọ

**Article 5 . Zero-knowledge proofs:** the crescendo. We've now built notes, commitments, and the tree, and we keep saying "proven in zero knowledge." Article 5 finally explains how you can prove a statement is true, that your note is in the tree, that your nullifier is correct, that money balances, while revealing none of it.

* Akụkụ nke usoro Zcash sitere na First Principles * maka [ZecHub]](https://zechub.org)Akwụkwọ ikike CC BY-SA 4.0.*
