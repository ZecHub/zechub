# Ìmọ̀ òdo sí òdo: Àwọn Iṣẹ́ Hash

**Ìfihàn Ṣíṣeré** 
Ẹ kú àbọ̀ sí ìtẹ̀jáde tuntun kan: **Ìmọ̀ Òdo sí Òdo**! 

Nínú àtẹ̀jáde yìí, a ó kọ́ àwọn ìpìlẹ̀ lórí onírúurú ìmọ̀ ẹ̀rọ tí ó wọ inú àwọn ìlànà ìpamọ́ ìpamọ́ wa.

---

## Apá 1: Àwọn Iṣẹ́ Hash

Lónìí a bẹ̀rẹ̀ pẹ̀lú **Hash Functions** - kókó pàtàkì kan nínú ìkọ̀kọ̀ tí a ń lò nínú blockchains. Nígbà tó bá yá nínú jara yìí, a ó sọ̀rọ̀ nípa àwọn kókó kan tí ó gbára lé àwọn ànímọ́ wọn.

### Kí ni iṣẹ́ Hash?

Àwọn iṣẹ́ Hash gba ìtẹ̀síwájú gígùn èyíkéyìí ó sì mú ìjáde gígùn tí a ti pinnu jáde wá.

- **Ifiranṣẹ lati wa ni hashed** = Input 
- **Alugoridimu tí a lò** = Iṣẹ́ Hash 
- **Ìjáde tó jáde** = Iye Hash 


![Hash Function diagram](/content-images/Fn_NkFHXgAEtgse-474c24c373.webp)

### Gbìyànjú rẹ̀ fúnra rẹ!

Ẹ jẹ́ ká gba òye tó jinlẹ̀ nípa lílo irinṣẹ́ yìí! 
Tẹ eyikeyi ọrọ lainidii sii lati ṣe agbejade ipari ti o wa titi. Ṣakiyesi bi abajade ṣe yatọ si da lori awọn algoridimu hashing oriṣiriṣi.

**Gbìyànjú rẹ̀:** https://cryptii.com/pipes/hash-function

---

### Àwọn ohun ìní ti Cryptographic Hash Awọn iṣẹ́

Àwọn iṣẹ́ Hash ìkọ̀kọ̀ gbọ́dọ̀ ní àwọn ohun ìní mẹ́ta wọ̀nyí**:

1. **Ọ̀nà kan ṣoṣo** - Kò yẹ kí ó ṣeé ṣe láti yí iṣẹ́ hash padà 
2. **Agbára ìkọlù** - Àwọn ìtẹ̀jáde méjì tó yàtọ̀ kò gbọdọ̀ yípadà sí ìjáde kan náà 
3. **Ipinnu** - Fun eyikeyi titẹ sii, iṣẹ hash gbọdọ funni ni abajade kanna nigbagbogbo

---

### Àwọn Iṣẹ́ Hash tí a Wọ́pọ̀

Ọ̀pọ̀lọpọ̀ ìpele iṣẹ́ Hash ló wà. Àwọn àpẹẹrẹ díẹ̀:

- Algorithm Hashing Secure (**SHA-3**) 
- Àlàyé Ìránṣẹ́ 5 (**MD5**) 
- **BLAKE2b** - A lo ninu ìtújáde bọtini Zcash

**Ìfihàn sí BLAKE2**: https://www.blake2.net

---

### Àwọn lílo Hash Fun Awọn Iṣẹ́ Àgbáyé Gíga

#### 1. Ìdènà Ìwà-bí-Ọlọ́run (Àwọn Àyẹ̀wò Ìwà-bí-Ọlọ́run Dátà)
Àwọn àyẹ̀wò ìdúróṣinṣin dátà jẹ́ àpẹẹrẹ "Ìdúróṣinṣin Hashing". Wọ́n ń lò wọ́n láti ṣe àyẹ̀wò àwọn fáìlì dátà àti láti fún olùlò ní ìdánilójú pé ó tọ́.

![Integrity Hashing example](/content-images/Fn_Or0MWIAI6sgx-9aab89b808.webp)

#### 2. Àwọn Igi Merkle (Àwọn Igi Hash)
Igi **hash** tàbí **Merkle** ni a fi àwọn ẹ̀ka àti ewé ṣe tí a fi àmì ìkọ̀kọ̀ ti ìdènà dátà kan.

![Merkle Tree diagram](/content-images/Fn_O7ndWIAY5PA-8e30e442ed.webp)

Àwọn igi Merkle jẹ́ àpẹẹrẹ ètò ìfọwọ́sowọ́pọ̀ **ìwé-àfọwọ́sọ**. A rí gbòǹgbò igi náà gẹ́gẹ́ bí ìfọwọ́sowọ́pọ̀ àti àwọn ewé tí a fihàn pé ó jẹ́ ara ìfọwọ́sowọ́pọ̀ àkọ́kọ́.

Wọ́n ń fìdí àwọn dátà tí a tọ́jú tàbí tí a gbé sórí àwọn nẹ́tíwọ́ọ̀kì P2P múlẹ̀, wọ́n sì ń rí i dájú pé àwọn dátà tí a gbà láti ọ̀dọ̀ àwọn ẹlẹgbẹ́ wa kò yí padà.

#### 3. Igi Ifaramo Akọsilẹ ni Zcash
Nínú àwọn adágún Zcash **Sapling** àti **Orchard** tí wọ́n ní ààbò, a lo **Note Commitment Tree** láti rí i dájú pé àwọn ìṣòwò wúlò lòdì sí ìfohùnṣọ̀kan nígbàtí a fi olùránṣẹ́, olùgbà àti iye tí a jẹ pamọ́ pátápátá.

#### 4. Signature Hash (Àwọn búlọ́ọ̀kù bíi Bitcoin)
**SHA256** jẹ́ àpẹẹrẹ "Hash Ibuwọlu" tí a lò láti fi agbára mú kí gbogbo bulọọki nínú ẹ̀wọ̀n Bitcoin lágbára. Àwọn awakùsà máa ń lo hash ti bulọọki tẹ́lẹ̀ + Hash ti gbogbo ìṣòwò nínú bulọọki lọ́wọ́lọ́wọ́ (hashMerkleRoot) + Timestamp + ìṣòro àìròtẹ́lẹ̀ / nẹ́tíwọ́ọ̀kì fún àwọn bulọọki tuntun.

![SHA256 block diagram](/content-images/Fn_PaVZXoAApHPf-936e479067.webp)

#### 5. Equihash (Zcash)
**Equihash** ni algoridimu hashing tí a lò nínú wíwakùsà Zcash. Àwọn nẹ́tíwọ́ọ̀kì bíi Komodo & Horizen tún ń lò ó.

**Equihash: Ẹ̀rí Iṣẹ́ Àìdọ́gba Tí Ó Dá Lórí Ìṣòro Ọjọ́ Ìbí Gbogbogbò** (Biryukov àti Khovratovich): https://eprint.iacr.org/2015/946

---

### Kíkà Síwájú

Láti kọ́ òye tó jinlẹ̀ nípa àwọn oríṣiríṣi iṣẹ́ hash àti àwọn lílò wọn tó ní í ṣe pẹ̀lú wọn, orísun tó dára gan-an nìyí: 
https://en.wikipedia.org/wiki/Hash_function

---

**Ìwé láti ọwọ́ ZecHub (@ZecHub)** 
Ìfọ̀rọ̀wérọ̀ X àtilẹ̀bá: https://x.com/ZecHub/status/1621240109663227906  

---

*A ṣe àkójọ ojú ìwé yìí láti inú ìfọ̀rọ̀wérọ̀ Zero sí Zero Knowledge àtilẹ̀wá fún wiki ZecHub.*
