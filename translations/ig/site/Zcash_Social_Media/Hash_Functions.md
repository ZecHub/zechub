# Ihe Ọmụma Na-aga n'Ihu: Ọrụ Hash

** Usoro Okwu Mmalite ** 
Nabata na usoro ohuru: **Zero to Zero Knowledge**! 

N'usoro isiokwu a, anyị ga-amụta ihe ndị bụ isi na ọtụtụ teknụzụ nke na-abanye n'usoro iwu nzuzo anyị.

---

## Nkebi nke 1: Hash Functions

Today we start with **Hash Functions** - a key piece of cryptography used in blockchains. Later in this series we'll cover some topics that rely on their properties.

### Kedu ihe bụ Ọrụ Hash?

Hash Functions na-ewere ntinye nke ogologo ọ bụla ma mepụta mmepụta nke ogologo oge.

- **Ozi a ga-agbagha** = Ntinye 
- **Usoro algorithm nke a na-eji** = Ọrụ Hash 
- ** Nsonaazụ mmepụta ** = Hash Value 


[Ihe osise nke ọrụ hash]](https://pbs.twimg.com/media/Fn_NkFHXgAEtgse.png)

### Gbalịa ya n'onwe gị!

Ka anyị jiri ngwá ọrụ a mee ihe iji nweta nghọta! 
Tinye ederede ọ bụla iji mepụta mmepụta ogologo oge. Lelee otú mmepụta si dịgasị iche dabere na algorithm hashing dị iche iche.

** Gbalịa ya: ** https://cryptii.com/pipes/hash-function

---

### Njirimara nke Cryptographic Hash Functions

Ọrụ Cryptographic Hash ga-enwerịrị ihe ndị a **3:

1. **Otu ụzọ** - Ọ ga-abụ ihe na-agaghị ekwe omume iji gbanwee ọrụ hash 
2. ** Mgbagha mgbagha ** - Ntinye abụọ dị iche iche agaghị enwe ike ịba n'otu mmepụta 
3. **Deterministic** - Maka ntinye ọ bụla, ọrụ hash ga-enye otu nsonaazụ ahụ

---

### Ọrụ Hash Ndị A Na-ahụkarị

E nwere ọtụtụ klas nke Hash Functions. Ụfọdụ ihe atụ:

- Secure Hashing Algorithm (**SHA-3**) 
- Ozi nchịkọta algọridim 5 (**MD5**) 
- ** BLAKE2b ** - Ejiri ya na isi ihe Zcash

** Okwu Mmalite nke BLAKE2 site n'aka Zooko **: https://www.zfnd.org/blog/blake2/

---

### Ezi-ụwa ojiji nke Hash ọrụ

#### 1. Integrity Hashing (Onyocha iguzosi ike n'ezi ihe nke data)
Nnyocha nyocha data bụ ihe atụ nke "Integrity Hashing". A na-eji ha emepụta nchịkọta ego na faịlụ data ma nye onye ọrụ obi ike nke izi ezi.

![Ntuziaka Hashing ihe atụ](https://pbs.twimg.com/media/Fn_Or0MWIAI6sgx.png)

#### 2. Osisi Merkle (Osisi Hash)
Osisi ** hash tree ** ma ọ bụ ** osisi Merkle ** mejupụtara alaka na akwụkwọ nodes nke ejiri akara hash nke data data.

[Merkle Osisi eserese](https://pbs.twimg.com/media/Fn_O7ndWIAY5PA-.jpg)

Osisi Merkle bụ ihe atụ nke usoro nkwekọrịta cryptographic. A na-ahụ mgbọrọgwụ osisi dị ka nkwa na akwụkwọ akwụkwọ gosipụtara ịbụ akụkụ nke nkwa mbụ.

Ha na-enyocha data echekwara ma ọ bụ bufee na netwọkụ P2P, na-eme ka data natara site n'aka ndị ọgbọ ghara ịgbanwe.

#### 3. Cheta Osisi Nkwa na Zcash
In Zcash **Sapling** & **Orchard** shielded pools, the **Note Commitment Tree** is used to verify transactions are valid against consensus while perfectly hiding the sender, recipient & amounts consumed.

#### 4. Mbinye aka Hash (bitcoin-style blocks)
**SHA256** is an example of a "Signature hash" used to enforce immutability of each block in the Bitcoin chain. Miners use the hash of previous block + A hash of all transactions in the current block (hashMerkleRoot) + Timestamp + random value / network difficulty for new blocks.

[SHA256 mgbochi eserese](https://pbs.twimg.com/media/Fn_PaVZXoAApHPf.jpg)

#### 5. Equihash (Zcash Mining)
**Equihash** bụ hashing algorithm eji na Ngwuputa Zcash. Ọ na-ejikwa ya site na netwọk dị ka Komodo & Horizen.

**Original Zcash Blog na Equihash**: https://electriccoin.co/blog/equihash/

---

### Ịgụ Ihe Ọzọ

Iji wulite nghọta ka ukwuu banyere ụdị ọrụ hash dị iche iche na ojiji ha metụtara, nke a bụ ezigbo akụ: 
https://en.wikipedia.org/wiki/Hash_function

---

**Nkọwa nke ZecHub (@ZecHub) ** 
Isi mmalite X: https://x.com/ZecHub/status/1621240109663227906  

---

*A chịkọtara peeji a site na isi mmalite Zero to Zero Knowledge maka wiki ZecHub.*
