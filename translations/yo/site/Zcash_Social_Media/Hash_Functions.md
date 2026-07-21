# Ìmọ̀ Nẹ́rẹ́ sí Nẹ̀rẹ́: Àwọn Àṣiṣẹ́ Hash

** Ìfilọ́lẹ̀ Ìtòlẹ́sẹẹsẹ** 
A kí yín káàbọ̀ sí ìtòlẹ́sẹẹsẹ tuntun: **Zero to Zero Knowledge**! 

Ninu jara yii a yoo kọ awọn ipilẹ lori ọpọlọpọ awọn imọ-ẹrọ ti o lọ sinu awọn ilana aabo aṣiri wa.

---

## Apá 1: Awọn iṣẹ Hash

Today we start with **Hash Functions** - a key piece of cryptography used in blockchains. Later in this series we'll cover some topics that rely on their properties.

### Kí ni Àṣekárími?

Awọn iṣẹ Hash gba ohun ti o wọle ti eyikeyi gigun ati ṣe agbejade iṣelọpọ ti gigun titilai.

- Ìsọfúnni tí a fẹ́ ṣe àdàkọ rẹ̀ = Input 
- **Alugoridimu ti a lo** = Iṣẹ́ Hash 
- **Ohun tí ó jẹ́ àbájáde rẹ̀** = Iye Hash 


![Àwòrán iṣẹ́ hash](https://pbs.twimg.com/media/Fn_NkFHXgAEtgse.png)

### O lè gbìyànjú ẹ̀ wò fúnra rẹ!

Ẹ jẹ́ ká lo ohun èlò yìí láti fi mọ ohun tó ń ṣẹlẹ̀! 
Tẹ eyikeyi ọrọ ti o yanilenu lati ṣe agbejade abajade ti o wa titi. Ṣayẹwo bi abajade ṣe yatọ da lori algorithm hashing ti o yatọ.

Gbìyànjú rẹ̀ wò: https://cryptii.com/pipes/hash-function

---

### Awọn ohun-ini ti Awọn iṣẹ Hash Cryptographic

Awọn iṣẹ Hash Cryptographic gbọdọ ni awọn ohun-ini ** 3 wọnyi **:

1. **One-way** - Kò yẹ kó ṣeé ṣe láti yí iṣẹ́ hash padà 
2. **Ohun ti o ni idiwọ ijamba** - Awọn titẹsi oriṣiriṣi meji ko gbọdọ ṣajọ si abajade kanna 
3. **Deterministic** - Fun eyikeyi input, a hash iṣẹ gbọdọ nigbagbogbo fun awọn kanna esi

---

### Awọn iṣẹ Hash ti o wọpọ

Àwọn ẹ̀ka bíi mélòó kan ti àwọn iṣẹ́ Hash wà.

- Alugoridimu Ṣiṣan Aabo (**SHA-3**) 
- Alugoridimu Àkójọ Ìsọfúnni 5 (**MD5**) 
- **BLAKE2b** - Ti a lo ninu itọsẹ bọtini Zcash

** Ìfilọ̀ sí BLAKE2 látọ̀dọ̀ Zooko**: https://www.zfnd.org/blog/blake2/

---

### Àwọn Ìlò Ayé Òtítọ́ ti Àwọn Àṣiṣẹ́ Hash

#### 1. Ìdánilójú Ìṣòtítọ́ (Ìdánwò Ìdákẹ́ńkọ́pọ̀ Ìsọfúnni)
Awọn ayẹwo iduroṣinṣin data jẹ apẹẹrẹ ti "Integrity Hashing". Wọn lo lati ṣe agbekalẹ awọn iṣayẹwo lori awọn faili data ati pese idaniloju ti ododo si olumulo kan.

![Àpẹẹrẹ Ìdálẹ́gbẹ́ Ọkàn](https://pbs.twimg.com/media/Fn_Or0MWIAI6sgx.png)

#### Àwọn Igi Merkle (Igi Hash)
A **hash tree** or **Merkle tree** is composed of branches and leaf nodes that are labelled with the cryptographic hash of a data block.

[Àwòrán igi Merkle](https://pbs.twimg.com/media/Fn_O7ndWIAY5PA-.jpg)

Awọn igi Merkle jẹ apẹẹrẹ ti ** eto ifaramọ crypto **. A wo gbongbo igi bi ifaramó ati awọn igun oju ewe ti a fihan lati jẹ apakan ti ifarada atilẹba.

Wọn ṣayẹwo data ti o fipamọ tabi gbigbe lori awọn nẹtiwọọki P2P, ni idaniloju data ti a gba lati ọdọ awọn ẹlẹgbẹ ko yipada.

#### 3. Wo Igi Iṣeduro ni Zcash
Ninu Zcash **Sapling** & **Orchard** awọn adagun ti o ni aabo, a lo **Ile-iṣowo Iṣeduro Akọsilẹ** lati ṣayẹwo awọn iṣowo jẹ wulo lodi si ifọkanbalẹ lakoko ti o fi aaye pamọ oluranlowo, olugba ati awọn iye ti o lo.

#### 4. Hash ìmúṣẹ (àwọn àlàfo Bitcoin-style)
**SHA256** jẹ́ àpẹẹrẹ "Signature hash" tí wọ́n máa ń lò láti mú kí ìdìpọ̀ kọ̀ọ̀kan nínú Bitcoin jẹ́ aláìṣeé yí padà. Àwọn oníṣẹ́ ìwakùsà máa ń lo ìdìpò̀ ti ìdìpákọ̀ tó ṣáájú + Ìdìpọ̀ ti gbogbo ìsòwò nínú ìdìwọ̀ tó wà nísinsìnyìí (hashMerkleRoot) + Àmì àsìkò + iye tí kò ṣeé ṣe/ìṣòro nẹ́ẹ̀tì fún àwọn ìdìpẹ̀ tuntun.

[SHA256 Àkọsílẹ̀ àlàfo!](https://pbs.twimg.com/media/Fn_PaVZXoAApHPf.jpg)

#### 5. Equihash (Ìwakùsà Zcash)
**Equihash** ni alugoridimu hashing ti a lo ninu iwakusa Zcash. O tun lo nipasẹ awọn nẹtiwọọki bii Komodo & Horizen.

** Oríṣun Zcash Blog lórí Equihash**: https://electriccoin.co/blog/equihash/

---

### Àwọn Ohun Míì Tó Yẹ Kó O Kà

To build a greater understanding of the different types of hash functions and their associated uses, this is an excellent resource:  
https://en.wikipedia.org/wiki/Hash_function

---

**Ohun tí ZecHub (@ZecHub) gbé jáde** 
Ìpilẹ̀ṣẹ̀ X: https://x.com/ZecHub/status/1621240109663227906  

---

*Ojúewé yìí ni a kó jọ láti inú àkọsílẹ̀ Zero to Zero Knowledge fún wiki ZecHub.*
