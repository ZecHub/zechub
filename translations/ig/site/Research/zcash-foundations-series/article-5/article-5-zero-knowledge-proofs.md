# Zero-Knowledge Proofs: Igosipụta na Ị Ziri Ezi n'Ekweghị Ihe Mere Ya
##### Nnyocha Mbụ sitere na [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-23-71534bece9.webp)

### Ákwà mgbochi nke na-eme ka ụwa nyochaa ihe ọ na-enweghị ike ịhụ

> **Usoro:** *Zcash sitere na Ụkpụrụ Mbụ* . **Edemede 5 . Zero-Knowledge Proofs**
> **Ndị e lekwasịrị anya:** ndị ọhụrụ. Anyị na-adabere n'edemede ọ bụla gara aga (finite fields, curves, commitments, Merkle trees), ma a na-echetara echiche ọ bụla mgbe anyị chọrọ ya.
> **Ihe ị ga-enweta:** nghọta doro anya, ziri ezi banyere ihe zero-knowledge proof bụ, nkwa atọ ọ na-enye, otu e si egosi nkwupụta dị iche iche, na ihe na-enye Zcash's Sapling na Orchard ike.

Nke a bụ edemede usoro a dum nọ na-arịgo iru. Site na [Edemede 0](article-0-shielded-transaction.md) gaa n'ihu, anyị nọ na-ekwu na a na-akwado Kwụọ ụhwọ “n'azụ ákwà mgbochi,” na-egosi na ọ ziri ezi ebe ọ naghị ekpughe ihe ọ bụla. Zero-knowledge proof bụ ákwà mgbochi ahụ. Ọ bụ akụkụ nke n'ikpeazụ na-edozi mgbagwoju anya anyị malitere: *kedu ka ọhaneze ga-esi nyochaa Azụmahia a na-ekweghị ka ha hụ?*

---

## 1. Gịnị mere ị ga-eji lekọta nke a?

Cheta esemokwu dị n'obi Zcash:

- Blockchain bụ nke a tụkwasịrị obi n'ihi na ọ bụ **ihe onye ọ bụla nwere ike nyochaa n'ihu ọha**.
- Zcash Kwụọ ụhwọ bụ **nke Nzuzo kpamkpam**: ego, onye zitere ya, onye natara ya, ha niile zoro ezo.

Ndị a dị ka ha enweghị ike ịdịkọ ọnụ. Nyocha yiri ka ọ *chọrọ* ile anya. Nzuzo *machibidoro* ile anya. Ọ bụrụ na ị nweghị ike ime ka ha kwekọọ, ị gaghị enwe ego Nzuzo nke onye ọ bụla tụkwasịrị obi.

**Zero-knowledge proof (ZKP)** bụ ihe na-eme ka ha kwekọọ. Ọ na-eme ka **onye na-egosi [prover]** kwenye **onye na-enyocha [verifier]** na nkwupụta bụ eziokwu **n'ekpugheghị ihe ọ bụla karịrị eziokwu ahụ n'onwe ya.** Enweghị ego. Enweghị njirimara. Enweghị note. Naanị: *“ihe niile ebe a na-agbaso iwu.”* Ka anyị wuo nghọta ahụ tupu usoro mgbagwoju anya ọ bụla.

---

## 2. Nghọta: proof atọ a na-ahụ kwa ụbọchị

**Proof na ị maara paswọọdụ, n'ekwughị ya.** Weebụsaịtị nwere ike nyochaa na ị maara paswọọdụ gị site n'ile ka ị meghee ihe naanị paswọọdụ ahụ nwere ike imeghe, n'ahụghị paswọọdụ ahụ n'onwe ya. Ị na-egosi *ihe ọmụma* n'enweghị *mkpughe*.

**Enyi anaghị ahụ agba nke ọma na bọọlụ abụọ.** Ị ji bọọlụ uhie na bọọlụ ndụ ndụ, nke yiri ibe ha nye enyi gị na-adịghị ahụ agba nke ọma. Ị chọrọ ime ka o kwenye na ha bụ *agba dị iche* n'agwaghị ya nke bụ nke. Ọ na-ezo ha abụọ n'azụ azụ ya, ọ nwere ike gbanwee ha, wee gosi gị otu. Ị na-ekwu ma ọ gbanwere ha. Ọ bụrụ na bọọlụ ndị ahụ dị iche n'ezie, ị na-adị mma mgbe niile. Ọ bụrụ na ha yiri ibe ha, ị ga na-atụrụ anya, ma bụrụ ezi naanị ọkara oge. Mgbe agba 20 gachara, usoro mmeri gị na-adịghị akwụsị na-eme ka o kwenye na ha dị iche, ma ọ ka maghị nke bọọlụ bụ uhie. **O kwenyesiri ike banyere otu eziokwu ebe ọ naghị amụta ihe ọzọ.** Nke ahụ bụ zero knowledge n'obere ihe atụ.

**Ọgba ahụ.** Ọgba dị ka mgbanaka nwere ọnụ ụzọ anwansi n'azụ nke na-emeghe naanị site n'okwu nzuzo. Ị na-ekwu na ị maara okwu ahụ. Iji gosi ya n'ekpugheghị ya: onye na-enyocha na-eche n'èzí ebe ị na-abanye ma họrọ ụzọ aka ekpe ma ọ bụ aka nri na-enweghị usoro. Onye na-enyocha ahụ na-eti mkpu akụkụ ọ chọrọ ka ị *pụta* na ya. Ọ bụrụ na ị maara okwu ahụ n'eziokwu, ị nwere ike irube isi mgbe niile (ị nwere ike imepe ọnụ ụzọ ka ị gbanwee akụkụ ma ọ dị mkpa). Ọ bụrụ na ị na-agha ụgha, ị nwere ike isi n'akụkụ ziri ezi pụta naanị site n'ohere, 50/50 na agba ọ bụla. Tinyegharịa ya ugboro 20, ohere onye na-agha ụgha nwere isi lanarị dị ihe na-erughị otu n'ime nde.

Akụkọ ọgba ahụ na-egosi nwayọọ nwayọọ **nkwa atọ [three guarantees]** zero-knowledge proof ọ bụla ga-enwerịrị.

---

## 3. Nkwa atọ ahụ

![alt text](/content-images/image-24-b559d31849.webp)

| Nkwa | N'akụkọ ọgba | Na Zcash |
|---|---|---|
| **Izu oke [Completeness]** | Ọ bụrụ na ị maara okwu ahụ, ị na-apụta n'akụkụ ziri ezi mgbe niile | Azụmahia ziri ezi na-emepụta proof a nabatara mgbe niile |
| **Ịdị mma [Soundness]** | A na-ejide onye na-agha ụgha n'ohere dị ukwuu | Azụmahia aghụghọ (ego e mepụtara n'aghụghọ, imefu ugboro abụọ) enweghị ike imepụta proof a nabatara |
| **Zero-knowledge** | Onye na-enyocha anaghị anụ okwu nzuzo ahụ | Netwọk anaghị amụta ego, Adreesị akpa ego, ma ọ bụ note nke ọ bụ |

Ọ bụrụ na nke ọ bụla n'ime ndị a ada, usoro ahụ agbajiela: enweghị izu oke, a ga-ajụ ndị ọrụ ezi omume; enweghị ịdị mma, ndị aghụghọ ga-ebipụta ego; enweghị zero-knowledge, Nzuzo ga-apụ n'anya.

---

## 4. Site n'ọgba ruo na *nkwupụta ọ bụla*: circuits na witnesses

Ọgba ahụ na-egosi otu eziokwu mara mma. Zcash kwesịrị igosi nkwupụta bara ụba: *“Amaara m note a na-emefubeghị n'ime osisi, enyere m ikike imefu ya, a gụpụtara nullifier ya nke ọma, ihe m tinyere hà na ihe m wepụtara.”* Kedu ka anyị si esi na bọọlụ na ọgba ruo ebe ahụ?

Bridge bụ echiche jikọtara usoro a dum:

> **Nkwupụta ọ bụla ị nwere ike nyochaa site na mgbakọ nwere ike idegharịa dịka arithmetic circuit:** netwọk nke mgbakwunye na mmụba n'elu finite field (Edemede 1).

Chee na circuit ahụ bụ ndepụta nke mgbochi mgbakọ nke *ha niile na-emezu naanị ma nkwupụta ahụ bụrụ eziokwu.* Ntinye nzuzo na-eme ka ihe niile kwekọọ, note gị, igodo gị, ụzọ Merkle, ka a na-akpọ **witness [witness].**

![alt text](/content-images/image-25-2479377e43.webp)

Nke a bụ ihe mere anyị ji tinye Edemede 1 na finite fields na Edemede 3 na hashes dabara ZK: circuit ahụ na-ekwu mgbakọ field, ya mere ọrụ ọ bụla n'ime nkwupụta ahụ (gụnyere hashing na ịrịgo Merkle nke Edemede 4) ga-egosipụta otu a. Ka ọrụ ọ bụla dị ọnụ ala n'igosipụta ya, ka proof ahụ na-adị nta ma dị ngwa.

---

## 5. Ime ka ọ baa uru: non-interactive na succinct

Ọgba ahụ chọrọ ọtụtụ agba nke ịga na ịbịa. Nke ahụ adịghị mma maka blockchain, ebe a ga-ebipụta proof otu ugboro ma onye ọ bụla nyochaa ya, ruo mgbe ebighị ebi. Nkwalite abụọ na-edozi nke a.

**Non-interactive (echiche Fiat-Shamir).** Kama onye na-enyocha dị ndụ na-eti ihe ịma aka na-enweghị usoro, onye na-egosi na-emepụta “ihe ịma aka na-enweghị usoro” ahụ n'onwe ya site na *hashing* proof ya ruo ebe ahụ. N'ihi na hash dị mma enweghị ike ibu amụma (Edemede 3), onye na-egosi enweghị ike ịhazi ihe ịma aka ahụ ka ọ baara ya uru. Mkparịta ụka ahụ nke nwere ọtụtụ okwu na-agbakọta ghọọ **proof otu zuru ezu n'onwe ya** onye ọ bụla nwere ike nyochaa mgbe e mesịrị, na-enweghị mmekọrịta.

**Succinct [Succinct].** Usoro kachasị mma na-eme ka proof ahụ bụrụ **obere nke ukwuu ma dị ngwa inyocha, n'agbanyeghị etu nkwupụta ahụ hà.** Nke a bụ akụkụ dị ịtụnanya n'ezie.

> Groth16 proof (usoro Sapling ji) dị ihe dịka **192 bytes** ma na-enyocha n'ime milliseconds, *ma nkwupụta ọ na-egosi hà obere ma ọ bụ buru ibu nke ukwuu.* Ole na ole nari bytes nwere ike kwado mgbakọ gụnyere ọtụtụ puku mgbochi.

Tinye ndị ahụ ọnụ, ị ga-enweta acronym ị ga-ahụ ebe niile:

> **zk-SNARK** = **z**ero-**k**nowledge **S**uccinct **N**on-interactive **AR**gument of **K**nowledge. Zero-knowledge (adịghị ekpughe ihe ọ bụla), succinct (obere ma dị ngwa), non-interactive (otu oge), argument of knowledge (onye na-egosi maara witness ziri ezi n'ezie).

---

## 6. Otu nsogbu: trusted setup

Enweghị nri efu. Ọtụtụ SNARKs chọrọ **trusted setup** otu ugboro nke na-emepụta public parameters maka circuit ahụ. Setup ahụ na-emepụta randomness nzuzo dị ka ihe so ya, a ga-**ebibikwa** nzuzo ahụ. Ọ bụrụ na onye ọ bụla debe ya, o nwere ike imepụta proofs aghụghọ, ya bụ, **imepụta ego aghụghọ** (ọ bụ ezie na, n'ụzọ dị mkpa, ọ ka gaghị enwe ike imebi Nzuzo).

A na-akpọ nzuzo fọdụrụ a **toxic waste.** Iji kpochapụ ya n'enweghị nsogbu, Zcash mere **emume ọtụtụ ndị sonyere** dị mgbagwoju anya ebe ọtụtụ ndị sonyere nọọrọ onwe ha nyere randomness; ọ bụrụ na *ọbụna otu* bibiri akụkụ ya n'ezi omume, toxic waste ahụ agaghị enwe ike iweghachite.

![alt text](/content-images/image-26-cdad6625cd.webp)

Usoro ọhụrụ na-ewepụ ihe achọrọ a kpamkpam, nke bụ otu n'ime ihe kachasị mere Zcash ji gbanwee usoro proof ya ka oge na-aga.

---

## 7. Ebe nke a dị na Zcash

| Nhazi | Usoro proof | Trusted setup? | Ewubere na |
|---|---|---|---|
| **Sprout** (nke mbụ) | zk-SNARK mbụ | Ee | emume mbụ |
| **Sapling** | **Groth16** | Ee (emume ọtụtụ ndị sonyere “Powers of Tau” + emume Sapling) | **BLS12-381** (Edemede 2) |
| **Orchard** (nke ugbu a) | **Halo 2** | **Enweghị trusted setup** | **Pallas / Vesta** (Edemede 2) |

Ije site na Sprout gaa Sapling ruo Orchard bụ n'ụzọ dị ukwuu akụkọ banyere proofs na-adị nta, na-adị ngwa, ma na-ahapụ trusted setup. **Halo 2**, nke Orchard ji, anaghị achọ emume ọ bụla ma ewuru ya iji kwado *recursion* (proofs na-enyocha proofs ndị ọzọ), nke mere Orchard ji eji **cycle** curves Pallas/Vesta sitere na Edemede 2: a haziri curve ọ bụla iji nyochaa proofs e dere n'elu nke ọzọ.

Nke a na-emechi nnukwu njikọ sitere na Edemede 0. Anwansi “n'azụ ákwà mgbochi” bụ **zk-SNARK**: ọ na-egosi na Azụmahia gị na-emeju arithmetic circuit nke na-etinye iwu niile, ebe ọ naghị ekpughe ihe ọ bụla ma e wezụga otu bit “ziri ezi.”

---

## 8. Nkwupụta eziokwu

Zero-knowledge proofs bụ ngalaba miri emi, anyị kpachaara anya nọrọ n'ogo nghọta. Anyị akọwaghị oke ohere kpọmkwem na soundness, ụdị arithmetic circuit kpọmkwem (R1CS, PLONKish, na ndị ọzọ), otu polynomials na commitments si eme circuit ghọọ proof dị mkpirikpi, ma ọ bụ ihe dị n'ime Groth16 na Halo 2 n'ezie. Ọgba ahụ bụ proof *interactive*; usoro mmepụta bụ non-interactive ma dị mgbagwoju anya karịa. Ọ dịghị nke a gbanwere isi okwu ahụ: gosi na circuit mezuru site na witness nzuzo, n'ụzọ zuru oke, n'ụzọ dị mma, na-enweghị ikpughe ihe ọ bụla. Usoro ahụ n'onwe ya kwesịrị usoro edemede dum.

---

## 9. Nchịkọta

- **Zero-knowledge proof** na-eme ka onye na-egosi mee ka onye na-enyocha kwenye na nkwupụta bụ eziokwu **ebe ọ naghị ekpughe ihe ọzọ**, na-edozi mgbagwoju anya n'etiti nyocha na Nzuzo.
- Ọ ga-emezu nkwa atọ: **izu oke** (nkwupụta eziokwu na-ekwenye), **ịdị mma** (nkwupụta ụgha agaghị ekwe omume), na **zero-knowledge** (onye na-enyocha na-amụta naanị “ọ bụ eziokwu”).
- Nkwupụta dị iche iche na-aghọ **arithmetic circuits** n'elu finite field; ntinye nzuzo na-emeju circuit ahụ bụ **witness**. Nke a bụ ihe mere finite fields na hashes dabara ZK ji dị mkpa.
- **Fiat-Shamir** na-eme proofs ka ha bụrụ **non-interactive** (otu oge); usoro kacha mma bụkwa **succinct** (Groth16 proof dị ihe dịka **192 bytes** ma na-enyocha n'ime milliseconds n'agbanyeghị nha nkwupụta). Ọnụ: **zk-SNARK**.
- Ụfọdụ SNARKs chọrọ **trusted setup** nke **toxic waste** fọdụrụ ga-ebibi (site n'emume ọtụtụ ndị sonyere); mmebi ya ga-eme ka e nwee ike imepụta ego aghụghọ ma **ọ bụghị** imebi Nzuzo.
- **Sapling** ji **Groth16** (trusted setup, BLS12-381); **Orchard** ji **Halo 2** (enweghị trusted setup, Pallas/Vesta, recursion-friendly).

---

## Nkọwa okwu

| Okwu | Ihe ọ pụtara n'asụsụ dị mfe |
|---|---|
| **Zero-knowledge proof** | Mee ka mmadụ kwenye na nkwupụta bụ eziokwu ebe ị naghị ekpughe ihe ọzọ |
| **Onye na-egosi / Onye na-enyocha** | Onye na-eme proof / onye na-enyocha ya |
| **Izu oke** | A na-anabata nkwupụta eziokwu mgbe niile (site n'aka onye na-egosi ezi omume) |
| **Ịdị mma** | A na-ajụ nkwupụta ụgha (ndị aghụghọ enweghị ike imeri ma e wezụga site n'ohere) |
| **Witness** | Ntinye nzuzo na-eme nkwupụta ahụ ka ọ bụrụ eziokwu |
| **Arithmetic circuit** | Nkwupụta e degharịrị dịka mgbakwunye na mmụba n'elu finite field |
| **Non-interactive (Fiat-Shamir)** | Proof otu oge nke na-adịghị achọ ịga na ịbịa dị ndụ |
| **Succinct** | Proof ahụ dị nta ma dị ngwa inyocha n'agbanyeghị nha nkwupụta |
| **zk-SNARK** | Zero-knowledge Succinct Non-interactive ARgument of Knowledge |
| **Trusted setup / toxic waste** | Ọgbọ parameters otu ugboro nke a ga-ebibi nzuzo fọdụrụ ya |

---

## FAQ

**Ọ bụrụ na proof anaghị ekpughe ihe ọ bụla, kedu ka inyocha ya si apụta ihe ọ bụla?**
N'ihi na a haziri mgbakọ ahụ ka naanị witness ziri ezi, nke dị adị, nwere ike imepụta proof na-agafe. Ịgafe nyocha ahụ bụ n'onwe ya ihe akaebe, na-enweghị mkpughe a chọrọ.

**Mmadụ nwere ike ime proof adịgboroja?**
Soundness na-eme ka nke a ghara ịdị irè. Otu e wezụga bụ SNARK nke e debere toxic waste trusted setup ya; nke ahụ bụ kpọmkwem ihe mere emume iji bibie ya ji dị mkpa.

**Trusted setup mebiri emebi ọ ga-ekpughe data Nzuzo m?**
Mba. Ọ ga-eme ka onye mwakpo nwee ike imepụta ego *ọhụrụ*, ma ọ **gaghị** ekpughe ego, Adreesị akpa ego, ma ọ bụ notes. Nzuzo na soundness bụ nkwa dị iche.

**Gịnị mere Zcash ji gbanwee usoro proof ka oge na-aga?**
Iji nweta proofs dị nta, dị ngwa, na, site na Halo 2, iwepụ trusted setup kpamkpam ma kwado recursion.

---

### Nwale nghọta gị

N'ọgba ahụ, gịnị mere o ji dị mkpa na onye na-enyocha họrọ akụkụ ụzọ ọpụpụ *mgbe* onye na-egosi abanyelarị, kama ikwupụta ya tupu oge ahụ? *(Azịza dị n'okpuru.)*

<details><summary>Azịza</summary>

Ọ bụrụ na onye na-enyocha ekwupụta akụkụ ahụ mbụ, onye na-agha ụgha nke na-amaghị okwu ahụ nwere ike ịbanye n'akụkụ ahụ site na mmalite ma si na ya jee pụta, n'enweghị mkpa ọnụ ụzọ ahụ. Ịhọrọ *mgbe* onye na-egosi kwere nkwa n'otu ụzọ na-amanye onye na-agha ụgha ịdabere n'ohere (50/50 n'agba ọ bụla), nke bụ ihe na-eme ka ịmegharị agba ahụ kwenye. Usoro a nke “buru ụzọ kwe nkwa, mgbe ahụ nata ihe ịma aka” bụ kpọmkwem ihe Fiat-Shamir na-echekwa site n'ịmepụta ihe ịma aka site na hash nke proof onye na-egosi kwere nkwa na ya.

</details>

---

### Ihe na-abịa

**Edemede 6 . Shielded protocol, site na mmalite ruo n'isi ngwụcha:** mmechi. Anyị na-ewere akụkụ ọ bụla, notes, commitments, osisi note commitment, nullifiers, value balance, na zero-knowledge proof, wee chịkọta Azụmahia nke e chebere echebe Zcash zuru ezu, na-emechi njikọ ọ bụla e meghere na Edemede 0.

*Akụkụ nke usoro* Zcash sitere na Ụkpụrụ Mbụ *maka [ZecHub](https://zechub.org). Ikikere CC BY-SA 4.0.*
