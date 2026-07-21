# Nkọwapụta na Nkwekọrịta: Envelopu E Ji Ime Anwansi Mechie
##### Nnyocha mbụ sitere na [Annkkitaaa](https://github.com/Annkkitaaa)

! [Alt ederede](image-15.png)

### Otu esi emechi ihe nzuzo n'ihu ọha ma ghara inwe ike ịgha ụgha banyere ya

> **Series:** *Zcash site na First Principles* . **Article 3 .
> **Ndị na-ege ntị:** ndị bịara ọhụrụ. Anyị na-ewulite na [Nkeji edemede 1 (ogige ndị nwere njedebe)](article-1-finite-fields.md) na [Article 2 (elliptic curves)](article-2-elliptic-curves.md), mana nghọta na-eguzo n'onwe ya.
> **What you'll leave with:** a clear understanding of hash functions, what "hiding" and "binding" really mean, and how Zcash builds the note commitments that anchor every private payment.

Na [Nkeji edemede 0](article-0-shielded-transaction.md) we described a "magic sealed envelope": something you can pin to a public board that proves an envelope exists while hiding what's inside, and which you can never swap out later. We promised to explain how such a thing is possible. This is that article. We need two ingredients: **hash functions** and **commitments**.

---

## 1. Gịnị mere o ji dị mkpa ka i lebara ha anya?

Imagine you predict the outcome of an election and want to prove, *afterwards*, that you called it in advance. You can't just announce your prediction (that influences people, or invites accusations you changed it). And you can't keep it fully secret (then you can't prove anything later).

Ihe ị chọrọ bụ ụzọ iji kpọchie na uru ugbu a, n'ihu ọha, dị ka nke ahụ:

- o nweghị onye ga-ama ihe ị kpọchiri n'ime (ọ na-anọgide na nzuzo maka ugbu a), na
- Mgbe e mesịrị, mgbe ị kpughere ya, ị pụghị ịgha ụgha banyere ihe ọ bụ.

This "lock now, reveal later, no lying" gadget is called a **commitment**, and it is everywhere in Zcash. A note's value and owner are locked into a commitment the moment the note is created. To build commitments, we first need their workhorse: the hash function.

---

## 2. Ọgụgụ isi: akara mkpịsị aka maka data

A **hash function** takes any data at all, a single letter or an entire library, and crushes it down to a short, fixed-size string called a **digest** or **hash**. Think of it as a **fingerprint for data.**

! [Alt ederede](image-16.png)

Ezigbo mkpisiaka mkpisi aka nwere njirimara anọ. Were ha dịka ihe omimi, ọ bụghị nha anya:

◯ Ihe onwunwe ◯ Nkọwa doro anya ◯ Gịnị mere o ji dị mkpa
|---|---|---|
**Deterministic** Otu ntinye na-enye otu akara mkpịsị aka mgbe niile. Ị nwere ike ịlele akara aka n'oge ọ bụla.
**Fast forward** Mgbakọ mkpịsị aka dị ngwa. Ọ bara uru iji ebe niile.
** One-way (preimage resistant) ** Given a fingerprint, you can't find the input that made it. Ọ na-ezochi data mbụ.
Ị pụghị ịchọta ihe ntinye abụọ dị iche iche nwere otu akara mkpịsị aka. Ọ dịghị onye nwere ike ịgha ụgha.

Na omume ọzọ na-eme ka mkpịsị aka dị ka anwansi:

### Mmetụta avalanche (nyochara)

Change the input by the tiniest amount and the fingerprint changes *completely*, with no resemblance to the old one. Here are two real SHA-256 fingerprints of messages differing by a single character:

```
H("Pay Bob 5 ZEC") = 6e2dc1a954c70cc865f18ea8cb70b7b56eeaf6ca42b380824a55d65dc342f34b
H("Pay Bob 6 ZEC") = 76abc346d8d3053f76a9ae18b617af71f02729a73ec6a51732d2d94934e4217f
```

N'ime mkpụrụ edemede 64 hex, **59 dị iche.** Otu mkpụrụedemede n'ime, akara mkpịsị aka na-enweghị ihe jikọrọ ya. Nke a bụ ihe mere na ịnweghị ike ịkwanye ntinye aka n'aka akara mkpisiaka: enweghị akara "ọkụ / oyi" ịgbaso.

---

## 3. Site n'akara mkpịsị aka ruo ná nkwekọrịta

Nke a bụ echiche na-adọrọ adọrọ ma mebie emebi: ịrara onwe gị nye ụkpụrụ nzuzo `v`, naanị bipụta akara mkpịsị aka ya `H(v)`.

Nke a na-ejikọta gị nke ọma (ị gaghị enwe ike ikwu n'oge na-adịghị anya ihe dị iche `v`, because that would need a collision). But it **fails to hide.** If the set of possible values is small, an attacker just fingerprints every candidate and compares. Committing to "yes" or "no"? They hash both and instantly learn which you chose. Determinism, our friend a moment ago, is now leaking the secret.

Ihe ngwọta ya bụ otu okwu: **randomness.**

> **Nkwekọrịta bụ akara mkpịsị aka nke uru gị agwakọtara ya na ọnụọgụgụ ọhụrụ:**
> `commitment = H(v, r)` ebe `r` bụ ihe nzuzo na-enweghị ihe ọ bụla "na-ekpuchi" uru.

Ugbu a otu ihe ahụ `v` na-emepụta a dị iche iche na-achọ nkwa oge ọ bụla, n'ihi na `r` ihe abụọ anyị chọrọ n'ikpeazụ ma jide:

! [Alt ederede](image-17.png)

Iji **meghee** (gosi) nkwa ahụ mgbe e mesịrị, ị na-ebipụta `v` na `r`; onye ọ bụla recalculates `H(v, r)` ọ na-enyocha ma ọ dabara. Ị kpọchiri gị. Nke ahụ bụ envelopu ahụ e ji anwansi mechie nke si n'Akwụkwọ 0, nke e mere ka ọ dị adị.

> **Two takeaways to carry forever:** *binding* comes from the hash being collision resistant; *hiding* comes from the random blinding factor `r`.

---

## 4. Ụzọ abụọ e si arụ envelopu ahụ

E nwere usoro abụọ a na-ahụkarị, Zcash na-ejikwa ha abụọ.

∙∙∙ **Nkwekọrịta dabere na hash** ∙••Pedersen commitment** (site na Nkeji edemede 2)
|---|---|---|
Ntụziaka. `H(v, r)` | `v.G + r.H` (na-egosi na a usoro)
Ịzobe onwe gị pụọ n'ihe ndị na-eme na mberede `r` ◯ ihe ndị na-eme na mberede `r` |
❖ Ikekọta site na ❖ ihe na-eguzogide mgbagwoju anya ❖ ọnụ ụzọ ọnyà elliptic-curve trapdoor (ECDLP)
◯ Ike pụrụ iche ◯ Ihe dị mfe na ngwa ngwa ◯ Mgbalị ndị e mere iji gbakọta ọnụ ◯ (homomorphic)

Ahịrị ikpeazụ ahụ bụ ihe mere Pedersen ji eme ihe dị mkpa na Zcash. `commit(v_1) + commit(v_2)` bụ ezigbo `commit(v_1 + v_2)`, the protocol can later prove that **money in equals money out** by adding commitments together, all without revealing a single amount. We're stockpiling that fact for Article 6.

---

## 5. A aghụghọ na-akpụzi niile nke Zcash: ZK-enyi na enyi hashing

Nke a bụ nghọta ọtụtụ mmeghe na-atụ uche, ọ bụkwa kpọmkwem "mgbakọ na mwepụ na-ezute injinịa" isi kwesịrị ịkọwapụta.

SHA-256 is a superb fingerprint for everyday computing. But Zcash doesn't just *compute* hashes; it has to **prove, inside a zero-knowledge proof, that a hash was computed correctly** (Article 5 explains why). And here's the catch: a zero-knowledge proof works in the language of **finite-field arithmetic** (Article 1), while SHA-256 is built from bit-twiddling operations (shifts, ANDs, XORs). Expressing all that bit-twiddling in field arithmetic is enormously expensive, making proofs huge and slow.

Ya mere, ndị na-emepụta Zcash chepụtara ọrụ hash nke dị n'ime ya bụ * ugbua * ubi arithmetic, na-eme ka ha dị ọnụ ala iji gosipụta:

! [Alt ederede](image-18.png)

Nrụgide injinịa a, * "ọ ga-abụrịrị ọnụ ala iji gosipụta",* bụ ihe mere Zcash ji mepụta ma nakweere ọrụ hash pụrụ iche kama iru SHA-256 ebe niile.

---

## Ebe nke a bi na Zcash

Zcash ejirila hashes dị iche iche n'ime atụmatụ ya, nke ọ bụla ahọpụtara maka ọrụ ahụ:

 Ọdịdị  Hashes eji  Ebe 
|---|---|---|
**Sprout** (nke mbụ) **SHA-256** Nkọwa nkwekọrịta na osisi
**Sapling** **Pedersen hashes**, gbakwunyere **BLAKE2**. Pedersen maka nkwekọrịta ndetu na osisi Merkle; BLAKE 2 maka isi mmalite na nullifiers
| **Orchard** (current) | **Sinsemilla**, plus **Poseidon** | Sinsemilla for note commitments and the Merkle tree; Poseidon for the nullifier, all designed for arithmetic circuits |

The names to recognize are **Pedersen** and **Sinsemilla** (commitment-style hashes built from curve points, so they inherit the "adds up" superpower and prove cheaply) and **Poseidon** (a field-arithmetic hash purpose-built for zero-knowledge circuits). When Article 0 said a note's contents are sealed into a commitment, *this* is the machinery doing the sealing.

So the open loop from Article 0, *"how can a sealed envelope hide its contents yet be impossible to forge?"*, is now closed: **hiding from a random blinding factor, binding from collision resistance or the curve trapdoor.**

---

## 7. Onye na-akwụwa aka ọtọ

Anyị mere ka ihe dị mfe iji mee ka ihe doo anya. `v` na `r` are encoded and which generators are used; "hiding" and "binding" each come in flavours (perfect vs computational) with precise security definitions; and we didn't show the internals of Pedersen, Sinsemilla, or Poseidon. None of that changes the intuition: a commitment is a fingerprint plus randomness that hides now and binds forever. The details return, flagged, when the protocol article needs them.

---

## 8. Nchịkọta

- A **hash ọrụ** bụ a **mkpịsị aka maka data**: deterministic, ngwa ngwa na-atụ, otu ụzọ, nkukota eguzogide, na a **avalanche mmetụta** (otu bit n'ime, a kpamkpam dị iche iche mkpịsị ụkwụ si).
- Nkwekọrịta na-enye gị ohere igbochi uru n'ihu ọha ugbu a ma kpughee ya mgbe e mesịrị n'enweghị ike ịgha ụgha.
- Ikwupụta mkpịsị aka gba ọtọ `H(v)` na-ejikọ ma ọ dịghị ezobe. `H(v, r)`, na-edozi na: `r`, na-ejikọta site na nkwụsị nkwụsị.**
- Zcash na-eji ma ** hash-based ** na ** Pedersen ** nkwa; Pedersen nkwa ọzọ ** tinye elu **, nke Nkeji edemede 6 ga-erigbu iji gosipụta nguzozi uru na nzuzo.
- Because hashes must be **proven** inside zero-knowledge proofs, Zcash uses **ZK-friendly** hashes built from field arithmetic (**Pedersen**, **Sinsemilla**, **Poseidon**) rather than SHA-256 everywhere.

---

## Okwu

Okwu. N'asụsụ Bekee nkịtị pụtara.
|---|---|
** Ọrụ hash ** na-agbaji data ọ bụla n'ime obere mkpịsị aka (digest)
**Digest** Ihe mkpịsị aka mmepụta nke ọrụ hash.
** Preimage resistance ** Enweghi ike ịlaghachi nchịkọta azụ na ntinye ya (otu ụzọ)
** Mgbagha mgbagha ** Enweghi ike ịchọta ntinye abụọ na otu nchịkọta.
** Avalanche mmetụta ** Obere mgbanwe ntinye na-agbanwe kpamkpam digest.
**Nkwekọrịta** Lock a value now, reveal later, cannot lie about it.
Ihe na-eme ka mmadụ kpuo ìsì`r`) **. Nọmba ọhụrụ na-enweghị usoro nke na-eme ka nkwa ahụ zoo.
** ZK-enyi na enyi hash ** A hash wuru si ubi mgbakọ na mwepụ n'ihi ya, ọ bụ ọnụ ala na-egosi

---

## FAQ

**Gịnị mere na ị gaghị ezochi uru ahụ kama itinye aka na ya?**
Encryption bụ ihe gbasara *ihe nzuzo ị nwere ike ịkọwapụta mgbe e mesịrị.* Nkwekorita bụ banyere *ịkwado*: nkwa na ị nweghị ike ịgbanwe azịza gị mgbe e mechara. Ọrụ dị iche iche.

** Ọ bụrụ na nkwa ndị ahụ na-ezochi uru ha bara, olee otú onye ọ bụla ga-esi nyochaa iwu ndị ahụ?**
Nke ahụ bụ ọrụ nke ihe akaebe na-enweghị ihe ọmụma (Nkeji edemede 5): ha na-egosi uru zoro ezo na-erube isi n'iwu ahụ n'ekpugheghị ya.

** Ọ bụ SHA-256 mebiri emebi, ebe ọ bụ na Zcash na-ezere ya n'ebe ụfọdụ?**
Mba. SHA-256 dị mma ma Zcash ka na-eji ya. Ọ dị oke ọnụ iji * gosipụta n'ime sekit, * nke bụ ihe mere ZK-enyi na enyi hashes ji dịrị maka ọrụ ahụ akọwapụtara.

**Ebee ka random `r` si, na onye na-edebe ya?**
A na-emepụta ya ọhụrụ mgbe edere akwụkwọ ahụ ma mara onye nwe akwụkwọ ahụ. Ọ bụ akụkụ nke ihe na-eme ka akwụkwọ ọ bụla dị iche na nkeonwe.

---

### Nwalee ihe ndị ị na-aghọta

I kwenyere na amụma ntuliaka gị dịka `H(v, r)` Otu enyi gị na-ekwusi ike na ị ga-ebipụta ya naanị `H(v)` iji mee ka ọ dị mfe. N'otu ahịrịokwu, gịnị kpatara nke ahụ ji bụrụ echiche ọjọọ ma ọ bụrụ na enwere naanị nsonaazụ abụọ? * ((Zaa n'okpuru.) *

<details><summary>Answer</summary>

Site na naanị ihe abụọ, enyi gị nwere ike ịgbakọ `H("win")` na `H("lose")` onwe ha na-atụnyere megide gị bipụtara chịkọtara, ozugbo amụta gị amụma. `r` bụ ihe na-akwụsị a maa-na-elele agha.
</details>

---

### Kedu ihe ọzọ

**Article 4 . Merkle trees:** we now have millions of commitments piling up. Article 4 shows how Zcash organizes them into a single tree whose tiny root fingerprint stands in for the entire history, and how you can prove your note is in that tree without revealing which one. That's the real shape of Article 0's "public board."

* Akụkụ nke usoro Zcash sitere na First Principles * maka [ZecHub]](https://zechub.org)Akwụkwọ ikike CC BY-SA 4.0.*
