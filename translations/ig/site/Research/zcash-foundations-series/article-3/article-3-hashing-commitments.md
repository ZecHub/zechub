# Ịrụ Hash na Commitments: Akwụkwọ Ozi Ime Anwansi Emechiri Emechi
##### Nnyocha Mbụ sitere n'aka [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-15-0c16784b27.webp)

### Otu esi akpọchi ihe nzuzo n'ihu ọha ma ghara inwe ike ịgha ụgha banyere ya

> **Usoro:** *Zcash site n'Ụkpụrụ Mbụ* . **Isiokwu 3 . Ịrụ Hash na Commitments**
> **Ndị e mere ya maka ha:** ndị mbido. Anyị na-ewukwasị na [Isiokwu 1 (oghere nwere ngwụcha)](article-1-finite-fields.md) na [Isiokwu 2 (mgbanaka elliptic)](article-2-elliptic-curves.md), mana nghọta ahụ kwụụrụ onwe ya.
> **Ihe ị ga-apụ na ya:** nghọta doro anya banyere ọrụ hash, ihe “izochi” na “ijide n'aka” pụtara n'ezie, na otu Zcash si ewulite commitments note ndị na-agbado Kwụọ ụhwọ nzuzo ọ bụla.

Na [Isiokwu 0](article-0-shielded-transaction.md) anyị kọwara “akwụkwọ ozi ime anwansi emechiri emechi”: ihe ị nwere ike ịkpọgide n'ọdụ ọkwa ọha nke na-egosi na akwụkwọ ozi dị ebe ahụ mgbe ọ na-ezo ihe dị n'ime ya, na nke ị gaghị enwe ike ịgbanwe ma emechaa. Anyị kwere nkwa ịkọwa otu ihe dị otu a ga-esi kwe omume. Nke a bụ isiokwu ahụ. Anyị chọrọ ihe abụọ: **ọrụ hash [hash functions]** na **commitments**.

---

## 1. Gịnị mere o ji dị mkpa ka ị mata?

Were ya na ị buru amụma maka nsonaazụ ntuli aka ma chọọ igosi, *mgbe o mechara*, na ị buru amụma ahụ tupu oge eruo. Ị nweghị ike naanị ikwupụta amụma gị (n'ihi na nke ahụ nwere ike imetụta ndị mmadụ, ma ọ bụ kpatara ebubo na ị gbanwere ya). Ị nweghịkwa ike izobe ya kpamkpam (mgbe ahụ ị gaghị enwe ike igosi ihe ọ bụla ma emechaa).

Ihe ị chọrọ bụ ụzọ ị ga-esi **kpọchie uru ugbu a, n'ihu ọha, nke mere na:**

- ọ dịghị onye ga-amata ihe ị kpọchiri (ọ ga-anọgide nzuzo ugbu a), na
- mgbe e mesịrị, mgbe ị kpughere ya, ị **gaghị enwe ike ịgha ụgha** banyere ihe ọ bụ.

Ngwaọrụ a nke “kpọchie ugbu a, kpughee mgbe e mesịrị, enweghị ụgha” ka a na-akpọ **commitment**, ọ dịkwa ebe niile na Zcash. A na-akpọchi uru na onye nwe note n'ime commitment n'oge a na-emepụta note ahụ. Iji wuo commitments, anyị ga-ebu ụzọ chọọ ngwaọrụ ọrụ ya: ọrụ hash.

---

## 2. Nghọta: akara mkpịsị aka maka data

**Ọrụ hash** na-anara data ọ bụla, otu mkpụrụedemede ma ọ bụ ọbá akwụkwọ dum, wee pịachaa ya ka ọ bụrụ eriri mkpirikpi nwere ogo a kara aka nke a na-akpọ **digest** ma ọ bụ **hash**. Chee ya dị ka **akara mkpịsị aka maka data.**

![alt text](/content-images/image-16-52fdf62c87.webp)

Akara mkpịsị aka cryptographic ọma nwere njirimara anọ. Were ha dịka nghọta, ọ bụghị dịka equations:

| Njirimara | Ihe ọ pụtara n'asụsụ dị mfe | Ihe mere o ji dị mkpa |
|---|---|---|
| **Deterministic** | Otu input na-enye otu akara mkpịsị aka mgbe niile | Ị nwere ike nyochaa akara mkpịsị aka ọzọ n'oge ọ bụla |
| **Ọsọ n'ihu** | Ịgbakọ akara mkpịsị aka dị ngwa | Ọ bara uru iji ya ebe niile |
| **Otu ụzọ (na-eguzogide preimage)** | Ọ bụrụ na e nyere gị akara mkpịsị aka, ị gaghị achọta input mere ya | Ọ na-ezo data mbụ |
| **Na-eguzogide collision** | Ị gaghị achọta inputs abụọ dị iche nwere otu akara mkpịsị aka | Ọ dịghị onye nwere ike ịmepụta nkwekọrịta adịgboroja |

E nwekwara omume ọzọ na-eme ka akara mkpịsị aka yie ihe fọrọ nke nta ka ọ bụrụ anwansi:

### Mmetụta avalanche [avalanche effect] (enyochala)

Gbanwee input ntakịrị nke ukwuu, akara mkpịsị aka ahụ agbanwee *kpamkpam*, na-enweghị ihe ọ bụla yiri nke ochie. Lee akara mkpịsị aka SHA-256 abụọ n'ezie nke ozi dị iche naanị n'otu mkpụrụedemede:

```
H("Pay Bob 5 ZEC") = 6e2dc1a954c70cc865f18ea8cb70b7b56eeaf6ca42b380824a55d65dc342f34b
H("Pay Bob 6 ZEC") = 76abc346d8d3053f76a9ae18b617af71f02729a73ec6a51732d2d94934e4217f
```

N'ime ọnụọgụ hex 64, **59 dị iche.** Otu mkpụrụedemede batara, akara mkpịsị aka na-enweghị njikọ ọ bụla apụta. Nke a bụ ihe mere na ị pụghị ịkwagharị input nwayọọ nwayọọ ruo n'akara mkpịsị aka ebumnuche: enweghị akara “dị ọkụ / dị oyi” ị ga-eso.

---

## 3. Site n'akara mkpịsị aka ruo commitment

Nke a bụ echiche na-adọrọ mmasị ma mebiri emebi: iji mee commitment maka uru nzuzo `v`, bipụta naanị akara mkpịsị aka ya `H(v)`.

Nke a *na-ejikọ* gị nke ọma (ị gaghị enwe ike ikwu ma emechaa na `v` dị iche, n'ihi na nke ahụ ga-achọ collision). Mana ọ **anaghị ezo ya.** Ọ bụrụ na setị uru ndị nwere ike ịdị obere, onye ọgụ ga-eme hash nke onye ọ bụla nwere ike ịbụ wee jiri ha tụnyere. Ị na-eme commitment maka “ee” ma ọ bụ “mba”? Ha na-eme hash ha abụọ ma mata ozugbo nke ị họọrọ. Determinism, enyi anyị obere oge gara aga, na-agbapụzi ihe nzuzo.

Ndozi ya bụ otu okwu: **randomness [enweghị usoro].**

> **Commitment bụ akara mkpịsị aka nke uru gị a gwakọtara na nọmba random ọhụrụ:**
> `commitment = H(v, r)` ebe `r` bụ uru random nzuzo maka “ikpuchi”.

Ugbu a otu `v` na-emepụta commitment nwere ọdịdị dị iche oge ọ bụla, n'ihi na `r` dị iche. Njirimara abụọ anyị chọrọ mechara dị adị:

![alt text](/content-images/image-17-3ec4617665.webp)

Iji **meghee** (kpughee) commitment ahụ ma emechaa, ị na-ebipụta `v` na `r`; onye ọ bụla na-agbakọkwa `H(v, r)` ma nyochaa na ọ dabara. A kpọchiela gị n'ime ya. Nke ahụ bụ akwụkwọ ozi ime anwansi emechiri emechi sitere na Isiokwu 0, nke emeela n'ezie.

> **Ihe mmụta abụọ ị ga-eburu n'obi mgbe niile:** *ijide n'aka* sitere n'ọrụ hash na-eguzogide collision; *izochi* sitere n'ihe random nke na-ekpuchi, `r`.

---

## 4. Ụzọ abụọ e si ewulite akwụkwọ ozi ahụ

E nwere usoro abụọ a na-ahụkarị, Zcash na-ejikwa ha abụọ.

| | **Commitment dabere na hash** | **Pedersen commitment** (sitere na Isiokwu 2) |
|---|---|---|
| Usoro | `H(v, r)` | `v.G + r.H` (ebe dị na mgbanaka) |
| Izochi sitere na | `r` random | `r` random |
| Ijide n'aka sitere na | iguzogide collision | ọnyà mgbanaka elliptic (ECDLP) |
| Ike pụrụ iche | dị mfe ma dị ngwa | commitments **na-agbakọta ọnụ** (homomorphic) |

Ahịrị ikpeazụ ahụ bụ ihe mere Pedersen commitments ji dị oke mkpa na Zcash. N'ihi na `commit(v_1) + commit(v_2)` bụ `commit(v_1 + v_2)` ziri ezi, protocol ahụ nwere ike igosi ma emechaa na **ego batara hà ego pụtara** site n'ịgbakọta commitments ọnụ, n'enweghị ikpughe otu ego ọbụla. Anyị na-echekwa eziokwu ahụ maka Isiokwu 6.

---

## 5. Nkọwa dị omimi nke na-akpụzi Zcash dum: hashing dabara na ZK

Nke a bụ nghọta ọtụtụ mmalite na-atụfu, ọ bụkwa kpọmkwem ebe “mgbakọ na mwepụta ihe” kwesịrị ka a mata.

SHA-256 bụ akara mkpịsị aka magburu onwe ya maka mgbakọ kwa ụbọchị. Mana Zcash anaghị naanị *agbakọ* hashes; ọ ga-**egosi, n'ime proof zero-knowledge, na a gbakọrọ hash ahụ nke ọma** (Isiokwu 5 kọwara ihe kpatara ya). Ma ebe a bụ ihe isi ike: proof zero-knowledge na-arụ ọrụ n'asụsụ **arithmetic oghere nwere ngwụcha** (Isiokwu 1), ebe SHA-256 sitere n'ọrụ ntughari bit (shifts, ANDs, XORs). Igosipụta ntụgharị bit ndị ahụ niile n'ime arithmetic oghere dị nnukwu ọnụ, na-eme proofs buru ibu ma dịkwa nwayọọ.

Ya mere ndị cryptographer Zcash mere ọrụ hash ndị akụkụ ime ha bụ *arithmetic oghere* n'onwe ha, nke na-eme ka ọ dị ọnụ ala igosi:

![alt text](/content-images/image-18-89ade807ad.webp)

Nrụgide mwepụta ihe a naanị, *“ọ ga-adị ọnụ ala igosi,”* bụ ihe mere Zcash ji chepụta ma nabata ọrụ hash pụrụ iche kama iji SHA-256 ebe niile.

---

## 6. Ebe nke a dị na Zcash

Zcash ejirila hashes dị iche n'ofe atụmatụ ya, nke ọ bụla ahọpụtara maka ọrụ ya:

| Atụmatụ | Hashes ejiri | Ebe |
|---|---|---|
| **Sprout** (nke mbụ) | **SHA-256** | Note commitments na osisi ahụ |
| **Sapling** | **Pedersen hashes**, gbakwunyere **BLAKE2** | Pedersen maka note commitments na osisi Merkle; BLAKE2 maka mwepụta igodo na nullifiers |
| **Orchard** (nke ugbu a) | **Sinsemilla**, gbakwunyere **Poseidon** | Sinsemilla maka note commitments na osisi Merkle; Poseidon maka nullifier, ha niile e mere maka arithmetic circuits |

Aha ndị a ga-amata bụ **Pedersen** na **Sinsemilla** (hashes ụdị commitment nke sitere n'ebe mgbanaka, ya mere ha na-enweta ike “na-agbakọta ọnụ” ma dịkwa ọnụ ala igosi) na **Poseidon** (hash arithmetic oghere e mere kpọmkwem maka zero-knowledge circuits). Mgbe Isiokwu 0 kwuru na a na-emechi ọdịnaya note n'ime commitment, *nke a* bụ igwe na-arụ mmechi ahụ.

Ya mere, ajụjụ mepere emepe sitere na Isiokwu 0, *“kedu ka akwụkwọ ozi emechiri emechi ga-esi zoo ọdịnaya ya ma ghara ikwe omume ime ya adịgboroja?”*, emechiela ugbu a: **izochi sitere n'ihe random na-ekpuchi, ijide n'aka sitere n'iguzogide collision ma ọ bụ ọnyà mgbanaka.**

---

## 7. Nkwupụta eziokwu

Anyị mere ka ihe dị mfe iji mee ka ha doo anya. Usoro commitment n'ezie na-akọwa kpọmkwem otu esi encode `v` na `r` na generators ndị a na-eji; “izochi” na “ijide n'aka” nke ọ bụla nwere ụdị dị iche (zuru oke ma ọ bụ computational) nwere nkọwa nchekwa kpọmkwem; anyị egosighịkwa akụkụ ime Pedersen, Sinsemilla, ma ọ bụ Poseidon. Ọ dịghị nke ọ bụla n'ime nke a na-agbanwe nghọta ahụ: commitment bụ akara mkpịsị aka tinyere randomness nke na-ezo ugbu a ma jide n'aka ruo mgbe ebighị ebi. Nkọwa ndị ahụ ga-alọghachi, e depụtara ha nke ọma, mgbe isiokwu protocol chọrọ ha.

---

## 8. Nchịkọta

- **Ọrụ hash** bụ **akara mkpịsị aka maka data**: deterministic, na-adị ngwa n'ihu, otu ụzọ, na-eguzogide collision, nwere **mmetụta avalanche** (otu bit batara, akara mkpịsị aka dị kpamkpam iche apụta).
- **Commitment** na-enye gị ohere **ịkpọchie uru n'ihu ọha ugbu a ma kpughee ya ma emechaa n'enweghị ike ịgha ụgha.**
- Ibiipụta akara mkpịsị aka efu `H(v)` na-ejikọ ma **anaghị** ezo. Ịtinye ihe random na-ekpuchi, `H(v, r)`, na-edozi nke ahụ: **izochi sitere na `r`, ijide n'aka sitere n'iguzogide collision.**
- Zcash na-eji commitments **dabere na hash** na **Pedersen** abụọ; Pedersen commitments na-**agbakọtakwa ọnụ**, nke Isiokwu 6 ga-eji gosi nguzozi uru na nzuzo.
- N'ihi na a ga-**egosi** hashes n'ime proofs zero-knowledge, Zcash na-eji hashes **dabara na ZK** sitere na arithmetic oghere (**Pedersen**, **Sinsemilla**, **Poseidon**) kama SHA-256 ebe niile.

---

## Nkọwa okwu

| Okwu | Ihe ọ pụtara n'asụsụ Bekee dị mfe |
|---|---|
| **Hash function** | Na-apịa data ọ bụla ka ọ bụrụ akara mkpịsị aka mkpirikpi nwere ogo a kara aka (digest) |
| **Digest** | Akara mkpịsị aka mmepụta nke ọrụ hash |
| **Preimage resistance** | Enweghị ike ịlaghachi site na digest ruo input ya (otu ụzọ) |
| **Collision resistance** | Enweghị ike ịchọta inputs abụọ nwere otu digest |
| **Avalanche effect** | Obere mgbanwe input na-agbanwe digest kpamkpam |
| **Commitment** | Kpọchie uru ugbu a, kpughee ma emechaa, enweghị ike ịgha ụgha banyere ya |
| **Blinding factor (`r`)** | Nọmba random ọhụrụ nke na-eme commitment izo |
| **ZK-friendly hash** | Hash sitere na arithmetic oghere ka ọ dị ọnụ ala igosi |

---

## Ajụjụ a na-ajụkarị

**Gịnị mere na ị gaghị ezobe uru ahụ kama ime commitment maka ya?**
Nzobe ederede bụ maka *nzuzo ị nwere ike imeghe ma emechaa*. Commitment bụ maka *ijide n'aka*: nkwa na ị gaghị enwe ike ịgbanwe azịza gị ma emechaa. Ọrụ abụọ dị iche.

**Ọ bụrụ na commitments ezo uru ahụ, kedu ka onye ọ bụla si enyocha iwu?**
Nke ahụ bụ ọrụ proofs zero-knowledge (Isiokwu 5): ha na-egosi na uru zoro ezo na-agbaso iwu n'enweghị ikpughe ya.

**SHA-256 emebiela, ebe Zcash na-ezere ya n'ebe ụfọdụ?**
Mba. SHA-256 dị mma, Zcash ka na-ejikwa ya. Naanị na ọ dị ọnụ ị-*egosi n'ime circuit*, nke mere hashes dabara na ZK ji dị maka ọrụ ahụ kpọmkwem.

**Ebee ka `r` random si abịa, ònye na-edobe ya?**
A na-emepụta ya ọhụrụ mgbe a na-emepụta note ahụ, onye nwe note ahụ makwaara ya. Ọ bụ akụkụ nke na-eme note ọ bụla pụrụ iche na nzuzo.

---

### Nwale nghọta gị

Ị na-eme commitment maka amụma ntuli aka gị dịka `H(v, r)` ma bipụta ya. Enyi gị na-ekwusi ike na ị kwesịrị ibipụta naanị `H(v)` iji mee ka ọ dị mfe. N'otu ahịrịokwu, gịnị mere nke ahụ ji bụrụ echiche ọjọọ ma ọ bụrụ na e nwere naanị nsonaazụ abụọ? *(Azịza dị n'okpuru.)*

<details><summary>Azịza</summary>

N'ịdị naanị nsonaazụ abụọ, enyi gị nwere ike ịgbakọ `H("win")` na `H("lose")` n'onwe ya wee jiri ha tụnyere digest ị bipụtara, ma mata amụma gị ozugbo. Hash efu na-ejikọ ma anaghị ezo; `r` random bụ ihe na-akwụsị mwakpo amụma-na-nyocha a.
</details>

---

### Gịnị na-esote

**Isiokwu 4 . Osisi Merkle:** ugbu a, anyị nwere ọtụtụ nde commitments na-agbakọta. Isiokwu 4 na-egosi otu Zcash si ahazi ha n'ime otu osisi nke obere akara mkpịsị aka mgbọrọgwụ ya na-anọchite anya akụkọ ihe mere eme dum, na otu ị ga-esi gosi na note gị dị n'osisi ahụ n'enweghị ikpughe nke ọ bụ. Nke ahụ bụ ọdịdị n'ezie nke “ọdụ ọkwa ọha” nke Isiokwu 0.

*Akụkụ nke usoro* Zcash site n'Ụkpụrụ Mbụ *maka [ZecHub](https://zechub.org). Ikikere CC BY-SA 4.0.*
