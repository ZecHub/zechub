# Zero to Zero Knowledge: Ọrụ Hash [Hash Functions]

**Okwu Mmalite nke Usoro**  
Nnọọ na usoro ọhụrụ: **Zero to Zero Knowledge**!  

N'ime usoro a, anyị ga-amụta ihe ndị bụ isi gbasara teknụzụ dị iche iche na-abanye n'ime ụkpụrụ anyị na-echekwa Nzuzo [privacy].

---

## Akụkụ 1: Ọrụ Hash [Hash Functions]

Taa, anyị na-amalite na **Ọrụ Hash** — akụkụ dị mkpa nke cryptography [cryptography] a na-eji na blockchain. N'ikpeazụ n'ime usoro a, anyị ga-ekpuchi ụfọdụ isiokwu ndị dabere na njirimara ha.

### Gịnị bụ Ọrụ Hash?

Ọrụ Hash na-anata ntinye [input] nke ogologo ọ bụla ma mepụta mmepụta [output] nke ogologo edobere.

- **Ozi a ga-eme hash** = Ntinye  
- **Algọridim a na-eji** = Ọrụ Hash  
- **Mmepụta na-apụta** = Uru Hash [Hash Value]  


![Hash Function diagram](/content-images/Fn_NkFHXgAEtgse-474c24c373.webp)

### Nwaa ya n'onwe gị!

Ka anyị jiri ngwá ọrụ a nweta nghọta bara uru!  
Tinye ederede ọ bụla masịrị gị iji mepụta mmepụta nwere ogologo edobere. Lelee otú mmepụta si agbanwe dabere n'algọridim hash dị iche iche.

**Nwaa ya:** https://cryptii.com/pipes/hash-function

---

### Njirimara nke Ọrụ Hash Cryptographic

Ọrụ Hash Cryptographic ga-enwerịrị **njirimara 3** ndị a:

1. **Otu ụzọ [One-way]** — Ọ ga-esiri ike nke ukwuu ịtụgharị Ọrụ Hash azụ  
2. **Na-eguzogide nkukota [Collision Resistant]** — Ntinye abụọ dị iche ekwesịghị ime hash gaa n'otu mmepụta  
3. **Nke a pụrụ ịdabere na ya [Deterministic]** — Maka ntinye ọ bụla, Ọrụ Hash ga na-enye otu nsonaazụ ahụ mgbe niile

---

### Ọrụ Hash A Na-ahụkarị

E nwere ụdị Ọrụ Hash dị iche iche. Ụfọdụ ọmụmaatụ:

- Secure Hashing Algorithm (**SHA-3**)  
- Message Digest Algorithm 5 (**MD5**)  
- **BLAKE2b** — A na-eji ya na mmepụta igodo [key derivation] nke Zcash

**Okwu mmalite banyere BLAKE2**: https://www.blake2.net

---

### Ojiji Ọrụ Hash N'Ezi Ụwa

#### 1. Hashing Maka Ịdị Mmasị Data (Nlele Ịdị Mmasị Data)
Nlele ịdị mma data bụ ọmụmaatụ nke “Hashing Maka Ịdị Mmasị Data”. A na-eji ha emepụta checksums n'elu faịlụ data ma nye onye ọrụ nkwenye na data ahụ ziri ezi.

![Integrity Hashing example](/content-images/Fn_Or0MWIAI6sgx-9aab89b808.webp)

#### 2. Osisi Merkle (Osisi Hash)
**Osisi hash** ma ọ bụ **osisi Merkle** nwere alaka na node akwụkwọ ndị e ji hash cryptographic nke block data kpọọ aha.

![Merkle Tree diagram](/content-images/Fn_O7ndWIAY5PA-8e30e442ed.webp)

Osisi Merkle bụ ọmụmaatụ nke **atụmatụ commitment cryptographic**. A na-ahụ mgbọrọgwụ osisi ahụ dịka commitment, a na-egosikwa na node akwụkwọ bụ akụkụ nke commitment mbụ.

Ha na-enyocha data echekwara ma ọ bụ ebufere na netwọk P2P, na-ahụ na data enwetara n'aka ndị otu agbanwebeghị.

#### 3. Osisi Note Commitment na Zcash
N'ime pool ndị e chebere echebe nke Zcash **Sapling** & **Orchard**, a na-eji **Osisi Note Commitment** enyocha na Azụmahia dị irè megide consensus, ebe a na-ezobe onye zitere ya, onye natara ya & ego e ji mee ya nke ọma.

#### 4. Hash Signature (block n'ụdị Bitcoin)
**SHA256** bụ ọmụmaatụ nke “hash signature” a na-eji eme ka block ọ bụla dị na chain Bitcoin ghara ịgbanwe agbanwe. Ndị na-egwụputa na-eji hash nke block gara aga + hash nke Azụmahia niile dị na block ugbu a (hashMerkleRoot) + Timestamp + uru enweghị usoro / ihe isi ike netwọk maka block ọhụrụ.

![SHA256 block diagram](/content-images/Fn_PaVZXoAApHPf-936e479067.webp)

#### 5. Equihash (Ịgwụputa Zcash)
**Equihash** bụ algọridim hashing a na-eji n'ịgwụputa Zcash. Netwọk dịka Komodo & Horizen na-ejikwa ya.

**Equihash: Asymmetric Proof-of-Work Based on the Generalized Birthday Problem** (Biryukov and Khovratovich): https://eprint.iacr.org/2015/946

---

### Ọgụgụ Ndị Ọzọ

Iji wulite nghọta ka ukwuu banyere ụdị ọrụ hash dị iche iche na ojiji ha, nke a bụ akụ ọma magburu onwe ya:  
https://en.wikipedia.org/wiki/Hash_function

---

**Eriri okwu nke ZecHub (@ZecHub)**  
Eriri okwu X mbụ: https://x.com/ZecHub/status/1621240109663227906  

---

*E chịkọtara ibe a site na eriri okwu Zero to Zero Knowledge mbụ maka wiki ZecHub.*
