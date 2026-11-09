# Osisi Merkle [Merkle Trees]: Otu Blockchain Si Cheta Note Ọ bụla
##### Nnyocha Mbụ sitere n'aka [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-19-cfbdcf8f78.webp)

### Ịchịkọta ọtụtụ nde commitment n'ime otu obere mkpịsị aka dijitalụ [fingerprint]

> **Usoro isiokwu:** *Zcash site na Ụkpụrụ Mbụ* . **Edemede 4 . Osisi Merkle**
> **Ndị e lekwasịrị anya:** ndị mbido. Anyị na-ewulite n'elu [Edemede 3 (hashing na commitment)](article-3-hashing-commitments.md). Ọ bụrụ na ị maara ihe mkpịsị aka dijitalụ na commitment bụ, ị dị njikere.
> **Ihe ị ga-enwe mgbe ị gụchara:** nghọta doro anya, ziri ezi banyere osisi Merkle, otu esi egosi na ihe dị n'ime ya n'ekpugheghị ihe ị na-ekwu, na otu nke a si aghọ osisi note commitment nke Zcash.

[Edemede 0](article-0-shielded-transaction.md) kọwara “bọọdụ ọha” nke na-ejide note ọ bụla e mepụtara ma na-aga n'ihu ito naanị. Ka ọ dị ugbu a, ị nwere ike ịkọ ihe a kpọgidere na ya: **commitment** (Edemede 3), bụ envelopu ndị a kachiri emechi. Ma ezigbo bọọdụ ga-ejide *ọtụtụ narị nde* n'ime ha. Olee otu netwọk si echekwa nke ahụ, nyochaa ya, ma hapụ gị ka ị gosi na envelopu gị dị na bọọdụ ahụ n'atụghị aka na ya? Azịza ya bụ otu n'ime usoro kacha maa mma na sayensị kọmputa: **osisi Merkle.**

---

## 1. Gịnị mere ị ga-eji lekọta nke a?

Nsogbu abụọ na-apụta ozugbo ị nwere nnukwu ndepụta ọha nke commitment.

**Nsogbu nke mbụ: ntụkwasị obi n'ọkwa nnukwu.** Ọ bụrụ na ndepụta ahụ nwere ntinye nde 300, olee otú onye ọ bụla ga-esi kwado na *ọ dịghị otu* agbanweela na nzuzo? Ịleleghachi ihe nde 300 mgbe ọ bụla i lere anya abaghị uru.

**Nsogbu nke abụọ: ịbụ onye otu na nzuzo.** Iji mefu note (Edemede 0), ị ga-egosi na commitment gị dị n'ezie na bọọdụ ahụ. Ma ọ bụrụ na ị tụọ aka na ya (“ọ bụ ntinye nọmba 4,201,337!”), ị ka ekpughela onwe gị. Ị ga-egosi *“envelopu m dị ebe n'ime bọọdụ a”* n'ekpugheghị **nke** ọ bụ.

Osisi Merkle na-edozi ha abụọ n'otu oge. Ọ na-akpakọba ndepụta ahụ dum n'ime otu mkpịsị aka dijitalụ, ma kwe ka ị gosi ịbụ onye otu site na proof [proof] obere nke na-ezo ọnọdụ.

---

## 2. Nghọta mbụ: asọmpi mkpịsị aka dijitalụ

Were ya dịka nhazi asọmpi mmeri, mana kama ndị egwuregwu na-aga n'ihu, **a na-ejikọta mkpịsị aka dijitalụ.**

- N'okpuru, data ọ bụla na-enweta mkpịsị aka dijitalụ nke ya (hash ya sitere na Edemede 3). Ndị a bụ **akwụkwọ [leaves].**
- Jikọta ha ụzọ abụọ abụọ. A na-eme hash mkpịsị aka dijitalụ abụọ nke ụzọ ọ bụla *ọnụ* ka ọ ghọọ otu mkpịsị aka dijitalụ nne na nna.
- Jikọta ndị nne na nna ahụ, mee hash ụzọ ọ bụla ọnụ, ma gaa n'ihu otu ahụ.
- Gaa n'ihu ruo mgbe **otu mkpịsị aka dijitalụ** nọ n'elu. Onye mmeri ahụ bụ **mgbọrọgwụ Merkle [Merkle root].**

![alt text](/content-images/image-20-f5d57e425a.webp)

Njirimara kacha mkpa na-esite ozugbo n'aka mmetụta avalanche [avalanche effect] (Edemede 3):

> **Mgbọrọgwụ bụ mkpịsị aka dijitalụ nke *ihe niile* dị n'okpuru ya.** Gbanwee akwụkwọ ọ bụla, ọbụna naanị otu bit, mkpịsị aka dijitalụ ya agbanwee, nke na-agbanwe nne na nna ya, nke na-agbanwekwa nne na nna *ahụ*, ruo n'elu. **Mgbọrọgwụ agbanwee.** Ya mere, otu obere uru mgbọrọgwụ na-akwado ntụkwasị obi nke ndepụta ahụ dum. Nke a na-edozi Nsogbu nke mbụ.

---

## 3. Ezigbo osisi, a gbakọrọ ya kpọmkwem

Ka anyị wuo osisi akwụkwọ anọ dị n'elu site na iji mkpịsị aka SHA-256 n'ezie n'elu akwụkwọ `A, B, C, D` (e belatara digest ndị ahụ ka ọ dị mfe ịgụ):

```
hA = 559aead08264...     hB = df7e70e50215...
hC = 6b23c0d5f35d...     hD = 3f39d5c348e5...

hAB = H(hA , hB) = 63956f0ce48e...
hCD = H(hC , hD) = 98a2fbfddbc7...

ROOT = H(hAB , hCD) = 1b3faa3fcc5e...
```

Ihe niile bụ naanị “mee hash ihe, mechaa mee hash ụzọ abụọ nke hash.” Ọ dịghị ihe dị omimi karịa Edemede 3, naanị a haziri ya dịka osisi.

---

## 4. Akụkụ amamihe dị na ya: igosi ịbụ onye otu n'ekpugheghị ọnọdụ

Ugbu a Nsogbu nke abụọ. Ka anyị sị na ị chọrọ igosi na akwụkwọ `C` dị n'ime osisi ahụ, nye onye maara naanị **mgbọrọgwụ**. Ị naghị enye ha osisi ahụ dum. Ị na-enye ha naanị mkpịsị aka dijitalụ dị mkpa iji si na `C` rịgoro mgbọrọgwụ, nke a na-akpọ **ụzọ nkwenye [authentication path]** (ma ọ bụ **Merkle proof**):

> Iji gosi na `C` dị n'ime osisi ahụ, nye:
> - nwanne ya `hD`, na
> - nwanne nne ma ọ bụ nna ya `hAB`.

Onye na-enyocha, ebe ọ maara naanị mgbọrọgwụ, na-agbakọrịtakwa nrịgo ahụ:

```
step 1:  H(hC , hD)        = hCD       (combine C with its sibling)
step 2:  H(hAB , hCD)      = ROOT?     (combine with the uncle)
```

Mgbe a gbakọrọ ya n'ezie: nke a na-enye `1b3faa3fcc5e...`, nke **dakọtara na mgbọrọgwụ.**  E gosiwo na akwụkwọ ahụ dị n'ime osisi ahụ.

![alt text](/content-images/image-21-d9e5d6eaf6.webp)

Ihe abụọ na-eme ka nke a dị ike:

- **Ọ dị ntakịrị.** Maka akwụkwọ 4, ị nyere hash 2. Maka osisi nwere akwụkwọ `n`, ị na-enye naanị ihe dịka **log_2(n)** hash. Maka akwụkwọ ijeri otu, nke ahụ bụ ihe dịka **hash 30**, ọ bụghị ijeri otu. Proof ahụ anaghị eto nke ukwuu ọbụna mgbe osisi ahụ toro oke.
- **Ọ bụ mkpụrụ nke Nzuzo [privacy].** Proof ahụ na-egosi na akwụkwọ gị dị *ebe* n'ime osisi ahụ. Mgbe a na-eme otu nyocha a *n'ime zero-knowledge proof* (Edemede 5), ọbụna ụzọ ahụ n'onwe ya zoro ezo, yabụ ị na-egosi “note m dị n'ime osisi ahụ” n'ekpugheghị note ahụ ma ọ bụ ọnọdụ ya. Nke a na-edozi Nsogbu nke abụọ kpamkpam.

---

## 5. Site n'osisi Merkle gaa n'osisi note commitment nke Zcash

Ugbu a anyị nwere ike ikwu kpọmkwem ihe “bọọdụ ọha” nke Edemede 0 bụ n'ezie:

> **Osisi note commitment** bụ osisi Merkle nke **akwụkwọ ya bụ note commitment.** Oge ọ bụla e mepụtara note n'ebe ọ bụla n'ụwa, a na-agbakwunye commitment ya dịka akwụkwọ na-esote, a na-emelitekwa mgbọrọgwụ ya.

Nkọwa ole na ole n'ezie:

- **Ọ na-eto naanị.** A na-agbakwunye akwụkwọ, a naghị ewepụ ha. A na-akpọ nke a **osisi Merkle na-eto nwayọọ nwayọọ [incremental Merkle tree].** (Ọ dabara na okwu Edemede 0 na “bọọdụ ahụ anaghị ebibi ihe ọ bụla.”)
- **A na-akpọ mgbọrọgwụ ahụ *anchor*.** Mgbe ị na-emefu, Azụmahia gị na-atụ aka na anchor ọhụrụ ma gosi, na zero-knowledge, na commitment note gị dị n'ime osisi nwere mgbọrọgwụ ahụ.
- **Omimi a kapịrị ọnụ.** Osisi nke e chebere echebe nke Zcash nwere omimi **32**, nke pụtara na ha nwere ike ijide ruo `2^(32)` (ihe karịrị ijeri anọ) note.
- **Hashing dabara maka ZK.** Ejighị SHA-256 wuo osisi ahụ. Sapling ji **Pedersen hashes** mee hash osisi ahụ, Orchard na-eji **Sinsemilla** (ha abụọ sitere na Edemede 3), kpọmkwem ka nrịgo ịbụ onye otu dị ọnụ ala igosi n'ime circuit.

![alt text](/content-images/image-22-518354b8d5.webp)

### Otu ihe osisi ahụ *anaghị* edozi: imefu ugboro abụọ

Osisi ahụ na-egosi na note **dị**. Ọ naghị, n'onwe ya, egbochi gị imefu otu note ugboro abụọ. Ọrụ ahụ bụ nke **nhazi nullifier [nullifier set]** sitere na Edemede 0: nchịkọta dị iche nke “token efu.” Mgbe ị na-emefu, ị na-ebipụta nullifier note ahụ, netwọk ahụ ajụkwa nullifier ọ bụla ọ hụla mbụ.

Ya mere usoro ọha abụọ a na-arụkọ ọrụ nkwado, ma idebe ha iche bụ kpọmkwem ihe na-ebipụ njikọ dị n'etiti ọmụmụ note na ọnwụ ya:

| Usoro | Ajụjụ ọ na-aza | Mgbe a na-emelite ya |
|---|---|---|
| **Osisi note commitment** | “Note a ọ dị?” | A **mepụtara** note (a gbakwunyere commitment) |
| **Nhazi nullifier** | “E mefuworị note a?” | A **mefuru** note (a bipụtara nullifier) |

---

## 6. Nkwupụta eziokwu

Dịka o na-adị, e mere ka ihe dị mfe. Ezigbo osisi Merkle na-eto nwayọọ nwayọọ na-edobe node “frontier” ka mgbọrọgwụ nwee ike imelite n'ewughị ihe niile ọzọ; netwọk na-edobe windo nke anchor ndị ọhụrụ, ọ bụghị naanị nke kacha ọhụrụ, ka e-akpa ego ghara ịdaba n'ihi block ọhụrụ ọ bụla; akwụkwọ efu na-ejikwa uru padding akọwapụtara. Anyị kekwara osisi ọnụọgụ abụọ nwere ike abụọ dị mma. Ọ dịghị nke ọ bụla n'ime ihe ndị a gbanwere nghọta ahụ: akwụkwọ commitment, a na-eme ha hash ụzọ abụọ ruo otu mgbọrọgwụ, na proof ịbụ onye otu dị mkpirikpi. Nlekọta ndekọ kpọmkwem ga-alọghachi n'edemede protocol.

---

## 7. Nchịkọta

- **Osisi Merkle** na-eme data hash n'ime **akwụkwọ**, wee mee hash **ụzọ abụọ n'elu** ruo mgbe otu **mgbọrọgwụ** fọdụrụ.
- N'ihi mmetụta avalanche, **mgbọrọgwụ bụ mkpịsị aka dijitalụ nke ndepụta dum**: gbanwee otu akwụkwọ, mgbọrọgwụ agbanwee. Otu obere uru na-akwado nnukwu dataset.
- **Proof ịbụ onye otu (ụzọ nkwenye)** bụ naanị nwanne ndị dị n'akụkụ nrịgo ruo mgbọrọgwụ, ihe dịka **log_2(n)** hash, yabụ proof na-anọgide ntakịrị ọbụna maka ọtụtụ ijeri akwụkwọ.
- Mgbe a rụrụ ya **n'ime zero-knowledge proof**, nyocha ịbụ onye otu ahụ na-ezo *akwụkwọ* ị na-ekwu maka ya, na-egosi “note m dị n'ime osisi ahụ” n'ekpugheghị note ahụ ma ọ bụ ọnọdụ ya.
- **Osisi note commitment** nke Zcash bụ osisi Merkle **na-eto nwayọọ nwayọọ** nke note commitment, nwere omimi **32**, mgbọrọgwụ ya bụ **anchor**; Sapling ji **Pedersen** mee hash ya, Orchard na-eji **Sinsemilla**.
- Osisi ahụ na-egosi **ịdị adị**; **nhazi nullifier** dị iche na-egbochi **imefu ugboro abụọ**. Idebe ha iche bụ ihe na-ewepụ njikọ ọmụmụ note na ọnwụ ya.

---

## Nkọwa okwu

| Okwu | Ihe ọ pụtara n'asụsụ dị mfe |
|---|---|
| **Merkle tree** | Osisi hash; akwụkwọ bụ mkpịsị aka dijitalụ data, ndị nne na nna na-eme hash ụmụ ha |
| **Leaf** | Node dị n'okpuru; na Zcash, otu note commitment |
| **Merkle root** | Otu mkpịsị aka dijitalụ dị n'elu nke na-achịkọta osisi dum |
| **Authentication path / Merkle proof** | Hash nwanne dị mkpa iji gosi na akwụkwọ dị n'ime osisi |
| **Incremental Merkle tree** | Osisi Merkle a na-agbakwunye naanị (a na-agbakwunye akwụkwọ mgbe niile) |
| **Anchor** | Mgbọrọgwụ Merkle nke mmefu na-atụ aka dịka “ọnọdụ osisi m na-egosi megide” |
| **Nullifier set** | Nchịkọta dị iche nke akara egosila mmefu, nke na-egbochi imefu ugboro abụọ |

---

## Ajụjụ ndị a na-ajụkarị

**Gịnị mere osisi, ọ bụghị naanị ogologo ndepụta hash?**
Ndepụta kwụ ọtọ ga-amanye gị ikpughe ma ọ bụ hazie ntinye ọ bụla iji gosi ịbụ onye otu. Osisi na-enye gị proof nha logarithmic na otu mgbọrọgwụ maka ntụkwasị obi.

**Onye na-enyocha ọ chọrọ osisi ahụ dum?**
Mba. Onye na-enyocha chọrọ naanị **mgbọrọgwụ** tinyere ụzọ nkwenye gị dị mkpirikpi. Nke ahụ bụ isi okwu ya.

**Gịnị mere omimi 32 kpọmkwem?**
Ọ na-edobe oke osisi ahụ na ihe dịka note ijeri anọ, nke bụ ohere zuru oke, ma na-eme ka proof ịbụ onye otu (na ọnụ ahịa ya n'ime circuit) nwee nha a kapịrị ọnụ, nke a pụrụ ijikwa.

**Ọ bụrụ na mgbọrọgwụ na-agbanwe na note ọhụrụ ọ bụla, olee otú proof ochie si anọgide irè?**
Netwọk ahụ na-echeta windo nke mgbọrọgwụ ọhụrụ (anchor), yabụ proof e mere megide anchor nke dịtụla ochie ka na-enyocha nke ọma. Edemede protocol ga-akọwa nke a kpọmkwem.

---

### Nwale nghọta gị

N'ime osisi akwụkwọ 4 anyị, ka e were ya na onye mwakpo gbanwere akwụkwọ `C` na nzuzo maka uru ọzọ mana hapụ mgbọrọgwụ e bipụtara agbanweghị. Gịnị ga-emebi n'ebe ha nọ, gịnịkwa mere na ha enweghị ike idozi ya nwayọọ? *(Azịza dị n'okpuru.)*

<details><summary>Azịza</summary>

Ịgbanwe `C` na-agbanwe `hC` (mmetụta avalanche), nke na-agbanwe `hCD = H(hC, hD)`, nke na-agbanwe `ROOT = H(hAB, hCD)`. Ya mere, mgbọrọgwụ a gbakọrọ ọzọ adịghịzi adakọ na mgbọrọgwụ e bipụtara, a na-achọpụtakwa ntinye aka ahụ. Iji “dozie ya nwayọọ” ha ga-achọta `C` ọzọ nke na-emepụta *otu* `hC`, nke bụ nkukota hash [hash collision], ihe na-agaghị ekwe omume dịka Edemede 3 si kwuo. Ntụkwasị obi na-adịgide.
</details>

---

### Ihe na-esote

**Edemede 5 . Zero-knowledge proof:** oge kacha elu. Anyị ewulitela note, commitment, na osisi ugbu a, ma na-ekwu mgbe niile “egosiri na zero-knowledge.” Edemede 5 ga-emecha kọwaa otu ị ga-esi gosi na nkwupụta bụ eziokwu, na note gị dị n'ime osisi ahụ, na nullifier gị ziri ezi, na ego kwekọrọ, n'ekpugheghị nke ọ bụla n'ime ha.

*Akụkụ nke* Zcash site na Ụkpụrụ Mbụ *usoro isiokwu maka [ZecHub](https://zechub.org). Enyere ikike CC BY-SA 4.0.*
