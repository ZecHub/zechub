# Zero kwa Zero Maarifa: Hash Kazi

** Mfululizo Utangulizi ** 
Karibu kwenye mfululizo mpya: ** Zero hadi Zero Maarifa **! 

Katika mfululizo huu tutajifunza misingi juu ya anuwai ya teknolojia ambazo huenda katika itifaki zetu za kuhifadhi faragha.

---

## Sehemu ya 1: Hash Kazi

Leo sisi kuanza na ** Hash Kazi ** - kipande muhimu ya cryptography kutumika katika blockchains. Baadaye katika mfululizo huu tutaweza kufunika baadhi ya mada ambayo hutegemea mali zao.

### Ni nini kazi Hash?

Hash Kazi kuchukua pembejeo ya urefu wowote na kuzalisha pato la urefu wa kudumu.

- ** Ujumbe kuwa hashed ** = Input 
- ** Algorithm kwamba ni kutumika ** = Hash Kazi 
- ** Matokeo ya pato ** = Hash Value 


! [Hash kazi mchoro](https://pbs.twimg.com/media/Fn_NkFHXgAEtgse.png)

### Jaribu wewe mwenyewe!

Hebu kupata mikono juu ya uelewa kutumia chombo hiki! 
Ingiza maandishi yoyote arbitrary kuzalisha pato kudumu-urefu. Angalia jinsi pato inatofautiana kulingana na tofauti hashing algorithm.

Jaribu: https://cryptii.com/pipes/hash-function

---

### Mali ya Cryptographic Hash Kazi

Cryptographic Hash Functions lazima kuwa na hizi ** 3 mali **:

1. ** One-way ** - Ni lazima kuwa unfeasible reverse hash kazi 
2. ** mgongano Resistant ** - Inputs mbili tofauti haipaswi hash kwa pato sawa 
3. **Deterministic** - Kwa kila pembejeo, hash kazi lazima daima kutoa matokeo sawa

---

### Kawaida Hash Kazi

Kuna madarasa kadhaa ya Hash Kazi. Baadhi ya mifano:

- Salama Hashing Algorithm (** SHA-3**) 
- Ujumbe Digest Algorithm 5 (** MD5 **) 
- ** BLAKE2b ** - Kutumika katika Zcash ufunguo derivation

** Utangulizi wa BLAKE2 na Zooko**: https://www.zfnd.org/blog/blake2/

---

### Real-Dunia Matumizi ya Hash Kazi

#### 1. Uadilifu Hashing (Data Uadilifu Checks)
Data integrity checks are an example of "Integrity Hashing". They are used to generate checksums on data files and provide assurance of correctness to a user.

![Uadilifu Hashing mfano](https://pbs.twimg.com/media/Fn_Or0MWIAI6sgx.png)

#### 2. Miti ya Merkle (Miti ya Hashi)
Mti wa **hash** au **Merkle mti** unajumuisha matawi na nodes za majani ambazo zimewekwa alama na hash ya cryptographic ya block ya data.

[Merkle mti mchoro](https://pbs.twimg.com/media/Fn_O7ndWIAY5PA-.jpg)

Merkle miti ni mfano wa ** cryptographic ahadi mpango **. mti Mizizi ni kuonekana kama ahadi na majani nodes kuthibitika kuwa sehemu ya ahadi ya awali.

Wao kuthibitisha data kuhifadhiwa au kuhamishwa kwenye mitandao ya P2P, kuhakikisha data kupokea kutoka kwa wenzao ni unaltered.

#### 3. Kumbuka Commitment Mti katika Zcash
Katika Zcash **Sapling** & **Orchard** mifereji ulinzi, **Kumbuka Commitment Mti ** hutumiwa kuthibitisha shughuli ni halali dhidi ya makubaliano wakati kikamilifu kuficha mtumaji, mpokeaji & kiasi alitumia.

#### 4. saini Hash (Bitcoin-style vitalu)
**SHA256** is an example of a "Signature hash" used to enforce immutability of each block in the Bitcoin chain. Miners use the hash of previous block + A hash of all transactions in the current block (hashMerkleRoot) + Timestamp + random value / network difficulty for new blocks.

[SHA256 block mchoro](https://pbs.twimg.com/media/Fn_PaVZXoAApHPf.jpg)

#### 5. Equihash (Zcash Mining)
**Equihash** ni hashing algorithm kutumika katika madini Zcash. Pia ni kutumika na mitandao kama vile Komodo & Horizen.

**Zcash Blog ya awali kwenye Equihash**: https://electriccoin.co/blog/equihash/

---

### Kusoma Zaidi

Kujenga uelewa mkubwa wa aina tofauti za kazi za hash na matumizi yao yanayohusiana, hii ni rasilimali bora: 
https://en.wikipedia.org/wiki/Hash_function

---

** Mchoro wa ZecHub (@ZecHub) ** 
Asili X thread: https://x.com/ZecHub/status/1621240109663227906  

---

*Ukurasa huu ulikusanywa kutoka kwa mada ya awali ya Zero hadi Zero Knowledge kwa wiki ya ZecHub.*
