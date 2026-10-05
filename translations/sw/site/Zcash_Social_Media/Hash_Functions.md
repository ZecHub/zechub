# Maarifa ya Zero hadi Zero: Kazi za Hash

**Utangulizi wa Mfululizo** 
Karibu kwenye mfululizo mpya: **Maarifa ya Zero hadi Zero**! 

Katika mfululizo huu tutajifunza misingi ya teknolojia mbalimbali zinazotumika katika itifaki zetu za kuhifadhi faragha.

---

## Sehemu ya 1: Vitendakazi vya Hash

Leo tunaanza na **Hash Functions** - kipande muhimu cha usimbaji fiche kinachotumika katika blockchain. Baadaye katika mfululizo huu tutaangazia baadhi ya mada zinazotegemea sifa zao.

### Kitendakazi cha Hash ni nini?

Vitendakazi vya Hash huchukua ingizo la urefu wowote na kutoa matokeo ya urefu usiobadilika.

- **Ujumbe wa kuharakishwa** = Ingizo 
- **Algorithm inayotumika** = Kazi ya Hash 
- **Tokeo linalotokana** = Thamani ya Hash 


![Hash Function diagram](/content-images/Fn_NkFHXgAEtgse-474c24c373.webp)

### Jaribu mwenyewe!

Hebu tupate uelewa wa vitendo kwa kutumia zana hii! 
Ingiza maandishi yoyote ya kiholela ili kutoa matokeo ya urefu usiobadilika. Angalia jinsi matokeo yanavyotofautiana kulingana na algoriti tofauti ya hashing.

**Jaribu:** https://cryptii.com/pipes/hash-function

---

### Sifa za Kazi za Hash za Kikriptografia

Kazi za Hash za Kikriptografia lazima ziwe na sifa hizi **3**:

1. **Njia moja** - Inapaswa kuwa vigumu kubadilisha kitendakazi cha hashi 
2. **Kinga dhidi ya Mgongano** - Ingizo mbili tofauti hazipaswi kuhamisha matokeo sawa 
3. **Deterministic** - Kwa ingizo lolote, chaguo la kukokotoa hashi lazima litoe matokeo sawa kila wakati

---

### Kazi za Kawaida za Hash

Kuna aina kadhaa za Vitendakazi vya Hash. Baadhi ya mifano:

- Algorithm Salama ya Hashing (**SHA-3**) 
- Algorithimu ya Mchoro wa Ujumbe 5 (**MD5**) 
- **BLAKE2b** - Inatumika katika uundaji wa funguo Zcash

**Utangulizi wa BLAKE2**: https://www.blake2.net

---

### Matumizi Halisi ya Vitendakazi vya Hash

#### 1. Uhifadhi wa Uadilifu (Ukaguzi wa Uadilifu wa Data)
Ukaguzi wa uadilifu wa data ni mfano wa "Uhifadhi wa Uadilifu". Hutumika kutengeneza hesabu za cheki kwenye faili za data na kutoa uhakikisho wa usahihi kwa mtumiaji.

![Integrity Hashing example](/content-images/Fn_Or0MWIAI6sgx-9aab89b808.webp)

#### 2. Miti ya Merkle (Miti ya Hash)
Mti wa **hashi** au **Mti wa Merkle** una matawi na nodi za majani ambazo zimebandikwa alama ya hashi ya kriptografia ya kizuizi cha data.

![Merkle Tree diagram](/content-images/Fn_O7ndWIAY5PA-8e30e442ed.webp)

Miti ya Merkle ni mfano wa mpango wa ahadi ya kisiri**. Mzizi wa mti unaonekana kama ahadi na nodi za majani zimethibitishwa kuwa sehemu ya ahadi ya awali.

Wanathibitisha data iliyohifadhiwa au kuhamishwa kwenye mitandao ya P2P, wakihakikisha data inayopokelewa kutoka kwa wenzao haibadilishwi.

#### 3. Mti wa Ahadi wa Kumbuka katika Zcash
Katika mabwawa ya ulinzi ya Zcash **Sapling** & **Orchard**, **Mti wa Kujitolea wa Kumbuka** hutumika kuthibitisha miamala kuwa halali kinyume cha makubaliano huku ukificha kikamilifu mtumaji, mpokeaji na kiasi kilichotumika.

#### 4. Hash ya Saini (Vizuizi vya mtindo wa Bitcoin)
**SHA256** ni mfano wa "Hashi ya Saini" inayotumika kutekeleza kutobadilika kwa kila kizuizi katika mnyororo wa Bitcoin. Wachimbaji hutumia hashi ya kizuizi kilichopita + Hashi ya miamala yote katika kizuizi cha sasa (hashMerkleRoot) + Muhuri wa Muda + thamani nasibu / ugumu wa mtandao kwa vizuizi vipya.

![SHA256 block diagram](/content-images/Fn_PaVZXoAApHPf-936e479067.webp)

#### 5. Equihash (Zcash)
**Equihash** ni algoriti ya hashing inayotumika katika kuchimba Zcash. Pia hutumiwa na mitandao kama vile Komodo na Horizen.

**Equihash: Uthibitisho Usio na Ulinganifu wa Kazi Kulingana na Tatizo la Kuzaliwa la Jumla** (Biryukov na Khovratovich): https://eprint.iacr.org/2015/946

---

### Usomaji Zaidi

Ili kujenga uelewa mkubwa wa aina tofauti za kazi za hash na matumizi yake yanayohusiana, hii ni rasilimali bora: 
https://en.wikipedia.org/wiki/Hash_function

---

**Uzi na ZecHub (@ZecHub)** 
Uzi halisi wa X: https://x.com/ZecHub/status/1621240109663227906  

---

*Ukurasa huu ulikusanywa kutoka kwa uzi asili wa Maarifa ya Zero hadi Zero kwa wiki ya ZecHub.*
