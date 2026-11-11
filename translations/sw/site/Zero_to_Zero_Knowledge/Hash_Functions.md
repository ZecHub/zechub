# Zero to Zero Knowledge: Vitendakazi vya Hash [Hash Functions]

**Utangulizi wa Mfululizo**  
Karibu kwenye mfululizo mpya: **Zero to Zero Knowledge**!  

Katika mfululizo huu tutajifunza misingi ya aina mbalimbali za teknolojia zinazotumika katika itifaki zetu za kuhifadhi faragha.

---

## Sehemu ya 1: Vitendakazi vya Hash

Leo tunaanza na **Vitendakazi vya Hash** - sehemu muhimu ya kriptografia inayotumika katika blockchain. Baadaye katika mfululizo huu tutashughulikia mada zinazotegemea sifa zake.

### Kitendakazi cha Hash ni nini?

Vitendakazi vya Hash huchukua ingizo la urefu wowote na kutoa matokeo ya urefu usiobadilika.

- **Ujumbe wa kufanyiwa hash** = Ingizo  
- **Algoriti inayotumika** = Kitendakazi cha Hash  
- **Matokeo yanayotolewa** = Thamani ya Hash  


![Hash Function diagram](/content-images/Fn_NkFHXgAEtgse-474c24c373.webp)

### Jaribu mwenyewe!

Hebu tupate uelewa wa vitendo kwa kutumia kifaa hiki!  
Weka maandishi yoyote ya kiholela ili kutoa matokeo ya urefu usiobadilika. Angalia jinsi matokeo yanavyotofautiana kulingana na algoriti tofauti ya hash.

**Jaribu:** https://cryptii.com/pipes/hash-function

---

### Sifa za Vitendakazi vya Hash vya Kikriptografia

Vitendakazi vya Hash vya Kikriptografia lazima viwe na **sifa hizi 3**:

1. **Ya upande mmoja [One-way]** - Haipaswi kuwezekana kiutendaji kurejesha nyuma kitendakazi cha hash  
2. **Kinachostahimili mgongano [Collision Resistant]** - Ingizo mbili tofauti hazipaswi kufanyiwa hash na kutoa matokeo yale yale  
3. **Thabiti [Deterministic]** - Kwa ingizo lolote, kitendakazi cha hash lazima kila wakati kitoe matokeo yale yale

---

### Vitendakazi vya Hash vya Kawaida

Kuna aina kadhaa za Vitendakazi vya Hash. Baadhi ya mifano ni:

- Algoriti Salama ya Hash (**SHA-3**)  
- Algoriti ya Muhtasari wa Ujumbe 5 (**MD5**)  
- **BLAKE2b** - Hutumika katika uundaji wa funguo wa Zcash

**Utangulizi wa BLAKE2**: https://www.blake2.net

---

### Matumizi ya Vitendakazi vya Hash Katika Ulimwengu Halisi

#### 1. Kufanyia Hash Uadilifu (Ukaguzi wa Uadilifu wa Data)
Ukaguzi wa uadilifu wa data ni mfano wa “Kufanyia Hash Uadilifu”. Hutumika kutengeneza jumla hakiki kwenye faili za data na kumpa mtumiaji uhakikisho wa usahihi.

![Integrity Hashing example](/content-images/Fn_Or0MWIAI6sgx-9aab89b808.webp)

#### 2. Miti ya Merkle (Miti ya Hash)
**Mti wa hash** au **mti wa Merkle** huundwa na matawi na node za majani ambazo zimewekewa lebo ya hash ya kikriptografia ya block ya data.

![Merkle Tree diagram](/content-images/Fn_O7ndWIAY5PA-8e30e442ed.webp)

Miti ya Merkle ni mfano wa **mpango wa commitment wa kikriptografia [cryptographic commitment scheme]**. Mzizi wa mti huonekana kama commitment, na node za majani huthibitishwa kuwa sehemu ya commitment ya awali.

Huthibitisha data iliyohifadhiwa au kuhamishwa kwenye mitandao ya P2P, na kuhakikisha data iliyopokelewa kutoka kwa wenzao haijabadilishwa.

#### 3. Mti wa Commitment wa Dokezo katika Zcash
Katika mabwawa ya faragha ya **Sapling** na **Orchard** ya Zcash, **Mti wa Commitment wa Dokezo [Note Commitment Tree]** hutumika kuthibitisha kuwa miamala ni halali kulingana na makubaliano huku ukificha kikamilifu mtumaji, mpokeaji na kiasi kilichotumika.

#### 4. Hash ya Sahihi (block za mtindo wa Bitcoin)
**SHA256** ni mfano wa “hash ya sahihi [Signature hash]” inayotumika kutekeleza kutobadilika kwa kila block katika mnyororo wa Bitcoin. Wachimbaji hutumia hash ya block iliyotangulia + hash ya miamala yote katika block ya sasa (hashMerkleRoot) + Muhuri wa muda + thamani ya nasibu / ugumu wa mtandao kwa block mpya.

![SHA256 block diagram](/content-images/Fn_PaVZXoAApHPf-936e479067.webp)

#### 5. Equihash (Uchimbaji wa Zcash)
**Equihash** ni algoriti ya hash inayotumika katika uchimbaji [mining] wa Zcash. Pia hutumiwa na mitandao kama Komodo na Horizen.

**Equihash: Uthibitisho wa Kazi Usio Linganifu Unaotegemea Tatizo la Jumla la Siku ya Kuzaliwa** (Biryukov na Khovratovich): https://eprint.iacr.org/2015/946

---

### Usomaji Zaidi

Ili kujenga uelewa mkubwa wa aina mbalimbali za vitendakazi vya hash na matumizi yake yanayohusiana, hiki ni chanzo bora:  
https://en.wikipedia.org/wiki/Hash_function

---

**Mnyororo wa ZecHub (@ZecHub)**  
Mnyororo asilia wa X: https://x.com/ZecHub/status/1621240109663227906  

---

*Ukurasa huu ulikusanywa kutoka kwenye mnyororo asilia wa Zero to Zero Knowledge kwa ajili ya wiki ya ZecHub.*
