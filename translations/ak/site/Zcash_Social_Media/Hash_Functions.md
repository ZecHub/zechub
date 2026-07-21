# Zero to Zero Nimdeɛ: Hash Dwumadi ahorow

**Series Nnianim Nsɛm** 
Yɛma wo akwaaba ba nsɛm foforo a ɛtoatoa so mu: **Zero to Zero Knowledge**! 

Wɔ saa nsɛm a ɛtoatoa so yi mu no yɛbɛsua mfitiaseɛ a ɛfa mfiridwuma ahodoɔ pii a ɛkɔ yɛn kokoam nsɛm a yɛkora so nhyehyɛeɛ mu.

---

## Ɔfa 1: Hash Dwumadie

Ɛnnɛ yɛde **Hash Functions** - cryptography afã titiriw bi a wɔde di dwuma wɔ blockchains mu na efi ase. Akyiri yi wɔ saa nsɛm a ɛtoatoa so yi mu no yɛbɛka nsɛmti bi a ɛde ne ho to wɔn agyapade so ho asɛm.

### Dɛn ne Hash Dwumadi?

Hash Functions fa input a ne tenten biara na ɛma output a ne tenten yɛ fixed.

- **Nkrasɛm a ɛsɛ sɛ wɔde hash** = Input 
- **Algorithm a wɔde di dwuma** = Hash Function 
- **Nneɛma a ɛfiri mu ba** = Hash Value 


![Hash Dwumadie mfonini](https://pbs.twimg.com/media/Fn_NkFHXgAEtgse.png)

### W’ankasa sɔ hwɛ!

Momma yɛmfa saa adwinnade yi nnya nsaano ntease! 
Hyehyɛ nkyerɛwee biara a wopɛ na ama woanya nea ɛyɛ tenten a wɔahyɛ da ayɛ. Hwɛ sɛnea output no gu ahorow gyina hashing algorithm soronko no so.

**Sɔ hwɛ:** https://cryptii.com/pipes/hash-function

---

### Nneɛma a ɛwɔ Cryptographic Hash Dwumadi ahorow mu

Ɛsɛ sɛ Cryptographic Hash Functions nya saa **3 su** yi:

1. **Ɔkwan baako** - Ɛsɛ sɛ ɛyɛ nea entumi nyɛ yiye sɛ wobɛdan hash dwumadie bi 
2. **Collision Resistant** - Ɛnsɛ sɛ input ahorow abien yɛ hash kɔ output koro no ara so 
3. **Deterministic** - Wɔ input biara ho no, ɛsɛ sɛ hash function ma nea efi mu ba koro no ara bere nyinaa

---

### Hash Dwumadi Ahorow a Wɔtaa Yɛ

Hash Functions ahorow pii wɔ hɔ. Nhwɛso ahorow bi:

- Hashing Algorithm a Ɛyɛ Ahobammɔ (**SHA-3**) . 
- Nkrasɛm Digest Algorithm 5 (**MD5**) . 
- **BLAKE2b** - Wɔde di dwuma wɔ Zcash safoa derivation mu

**Nnianim asɛm bi a ɛfa BLAKE2 ho a Zooko yɛe**: https://www.zfnd.org/blog/blake2/

---

### Hash Dwumadie a Wɔde Di Dwuma Wɔ Wiase Ankasa

#### 1. Integrity Hashing (Data mudi mudi Nhwehwɛmu) .
Data mudi mudi nhwehwɛmu yɛ "Integrity Hashing" ho nhwɛso. Wɔde yɛ checksums wɔ data fael ahorow so na ɛma awerɛhyem sɛ ɛteɛ ma obi a ɔde di dwuma.

![Integrity Hashing nhwɛsoɔ](https://pbs.twimg.com/media/Fn_Or0MWIAI6sgx.png)

#### 2. Merkle Nnua (Hash Nnua) .
**hash dua** anaa **Merkle dua** yɛ nkorabata ne nhaban node a wɔde data block bi cryptographic hash ahyɛ so.

![Merkle Dua ho mfonini](https://pbs.twimg.com/media/Fn_O7ndWIAY5PA-.jpg)

Merkle nnua yɛ nhwɛsoɔ a ɛfa **cryptographic commitment scheme** ho. Wohu dua Ntini no sɛ ahofama ne ahaban ntini a wɔada no adi sɛ ɛyɛ mfitiase ahofama no fã.

Wɔhwɛ sɛ data a wɔde asie anaa wɔde kɔ P2P ntam nkitahodi so no yɛ nokware, na wɔhwɛ hu sɛ data a wonya fi atipɛnfo hɔ no nsakra.

#### 3. Hyɛ Ahofama Dua a ɛwɔ Zcash mu no nsow
Wɔ Zcash **Sapling** & **Orchard** shielded pools mu no, wɔde **Note Commitment Tree** no di dwuma de hwɛ sɛ nnwuma no yɛ nokware tia adwene a wɔahyia bere a wɔde nea ɔde kɔmaa, nea ogye & sika dodow a wɔde di dwuma no sie pɛpɛɛpɛ.

#### 4. Signature Hash (Bitcoin-kwan so blocks) .
**SHA256** yɛ nhwɛsoɔ a ɛfa "Signature hash" a wɔde di dwuma de hyɛ inmutability a ɛwɔ block biara mu wɔ Bitcoin chain no mu. Miners de hash a ɛwɔ block a atwam no di dwuma + Hash a ɛfa nnwuma nyinaa a ɛwɔ mprempren block no mu (hashMerkleRoot) + Timestamp + random value / network difficulty ma blocks foforo.

![SHA256 block mfonini](https://pbs.twimg.com/media/Fn_PaVZXoAApHPf.jpg)

#### 5. Equihash (Zcash a Wɔde Tu Fam) .
**Equihash** yɛ hashing algorithm a wɔde di dwuma wɔ Zcash a wotu mu. Ɛsan nso de di dwuma wɔ networks te sɛ Komodo & Horizen.

**Mfitiase Zcash Blog wɔ Equihash**: https://electriccoin.co/blog/equihash/

---

### Akenkan a Ɛkɔ Akyiri

Sɛ yɛbɛnya nteaseɛ kɛseɛ wɔ hash dwumadie ahodoɔ ne dwumadie a ɛbata ho no ho a, yei yɛ adeɛ a ɛkyɛn so: 
https://en.wikipedia.org/wiki/Hash_function

---

**Asɛm a ZecHub (@ZecHub) na ɔkyerɛwee** 
Mfitiase X asaawa: https://x.com/ZecHub/status/1621240109663227906  

---

*Wɔboaboaa krataafa yi ano fii mfitiase Zero to Zero Knowledge thread no mu maa ZecHub wiki.*
