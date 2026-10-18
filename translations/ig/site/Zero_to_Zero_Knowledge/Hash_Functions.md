# Ihe Ọmụma Zero ruo Zero: Ọrụ Hash

**Okwu Mmalite Usoro** 
Nnọọ na usoro ọhụrụ: **Ihe ọmụma efu ruo efu**! 

N'usoro a, anyị ga-amụta ihe ndị bụ isi gbasara ọtụtụ teknụzụ dị iche iche nke na-abanye na usoro nchekwa nzuzo anyị.

---

## Nkebi nke 1: Ọrụ Hash

Taa, anyị na-amalite site na **Hash Functions** - isi ihe e ji cryptography eme na blockchains. Ma emechaa n'usoro a, anyị ga-ekpuchi ụfọdụ isiokwu dabere na ihe onwunwe ha.

### Kedu ihe bụ ọrụ Hash?

Ọrụ Hash na-ewe ntinye nke ogologo ọ bụla ma na-emepụta mmepụta nke ogologo edobere.

- **Ozi a ga-eji hash** = Ntinye 
- **Algọridim eji** = Ọrụ Hash 
- **Mwepụta sitere na ya** = Uru Hash 


![Hash Function diagram](/content-images/Fn_NkFHXgAEtgse-474c24c373.webp)

### Nwaa ya n'onwe gị!

Ka anyị jiri ngwa a nweta nghọta dị mma! 
Tinye ederede ọ bụla a na-anaghị agbaso iwu iji mepụta mmepụta ogologo oge. Lee ka mmepụta si dị iche dabere na algọridim hashing dị iche iche.

**Nwalee ya:** https://cryptii.com/pipes/hash-function

---

### Njirimara nke Ọrụ Hash Cryptographic

Ọrụ Hash Cryptographic ga-enwerịrị **ihe atọ a**:

1. **Otu ụzọ** - O kwesịghị ịdị mfe ịtụgharị ọrụ hash 
2. **Ihe Na-eguzogide Nsogbu** - Ntinye abụọ dị iche iche agaghị ejikọta na otu mmepụta 
3. **Deterministic** - Maka ntinye ọ bụla, ọrụ hash ga-enye otu nsonaazụ ahụ mgbe niile

---

### Ọrụ Hash Ndị A Na-ahụkarị

E nwere ọtụtụ klaasị nke ọrụ Hash. Ụfọdụ ihe atụ:

- Algọridim Hashing Edobere (**SHA-3**) 
- Algọridim Nchịkọta Ozi 5 (**MD5**) 
- **BLAKE2b** - Ejiri ya na mmepụta igodo Zcash

**Okwu mmalite maka BLAKE2**: https://www.blake2.net

---

### Ojiji nke Ọrụ Hash n'Eziokwu n'Ụwa

#### 1. Ịhazi Ezi Uche (Nyocha Ezi Uche Data)
Nlele iguzosi ike n'ezi ihe data bụ ihe atụ nke "Ịhazi iguzosi ike n'ezi ihe". A na-eji ha emepụta checksums na faịlụ data ma na-emesi onye ọrụ obi ike na izi ezi.

![Integrity Hashing example](/content-images/Fn_Or0MWIAI6sgx-9aab89b808.webp)

#### 2. Osisi Merkle (Osisi Hash)
Osisi hash** ma ọ bụ **Merkle** nwere alaka na mkpụrụ akwụkwọ nke ejiri hash cryptographic nke blọk data mee akara ya.

![Merkle Tree diagram](/content-images/Fn_O7ndWIAY5PA-8e30e442ed.webp)

Osisi Merkle bụ ihe atụ nke **atụmatụ nkwa nzuzo**. A na-ahụ Mgbọrọgwụ osisi ahụ dị ka nkwa na mkpụrụ akwụkwọ egosipụtara na ọ bụ akụkụ nke nkwa mbụ ahụ.

Ha na-enyocha data echekwara ma ọ bụ ebufe na netwọk P2P, na-ahụ na data enwetara n'aka ndị ọgbọ ya agbanwebeghị.

#### 3. Osisi Nkwanye Ùgwù na Zcash
N'ime ọdọ mmiri ndị e ji kpuchie Zcash **Sapling** na **Orchard**, a na-eji **Note Commitment Tree** iji hụ na azụmahịa dị irè megide nkwekọrịta ma zoo onye zitere ya, onye nnata na ego e riri nke ọma.

#### 4. Akara ngosi (Mgbochi ụdị Bitcoin)
**SHA256** bụ ihe atụ nke "Hash Mbinye aka" eji eme ka blọk ọ bụla ghara ịgbanwe agbanwe na Bitcoin. Ndị na-egwuputa ihe na-eji hash nke blọk gara aga + Hash nke azụmahịa niile dị na blọk ugbu a (hashMerkleRoot) + Timestamp + uru random / nsogbu netwọk maka blọk ọhụrụ.

![SHA256 block diagram](/content-images/Fn_PaVZXoAApHPf-936e479067.webp)

#### 5. Equihash (Zcash)
**Equihash** bụ usoro hashing eji arụ ọrụ n'ịgwupụta Zcash. Netwọk dịka Komodo & Horizen na-ejikwa ya.

**Equihash: Ihe akaebe ọrụ na-adịghị nhata dabere na nsogbu ọmụmụ izugbe** (Biryukov na Khovratovich): https://eprint.iacr.org/2015/946

---

### Ịgụkwu Ihe

Iji wulite nghọta ka mma nke ụdị ọrụ hash dị iche iche na ojiji ha jikọtara ya, nke a bụ ezigbo akụrụngwa: 
https://en.wikipedia.org/wiki/Hash_function

---

**Edemede nke ZecHub (@ZecHub)** 
Eriri X mbụ: https://x.com/ZecHub/status/1621240109663227906  

---

*E si na eriri Zero ruo Zero Knowledge nke mbụ chịkọta ibe a maka wiki ZecHub.*
