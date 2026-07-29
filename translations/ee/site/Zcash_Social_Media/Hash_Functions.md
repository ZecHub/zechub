# Zero vaseɖe Zero Sidzedze: Hash Dɔwɔnawo

**Series ƒe ŋgɔdonya** 
Míexɔ mi nyuie ɖe nu yeye siwo kplɔ wo nɔewo ɖo me: **Zero to Zero Knowledge**! 

Le nyati sia me la, míasrɔ̃ nu vevi siwo ku ɖe mɔ̃ɖaŋununya vovovo siwo yia míaƒe ameŋunyatakakawo takpɔkpɔ ƒe ɖoɖowo me ŋu.

---

## Akpa 1: Hash ƒe Dɔwɔwɔwo

Egbea míedze egɔme kple **Hash Functions** - nya ɣaɣlawo ƒe akpa vevi aɖe si wozãna le blockchains me. Emegbe le nyati sia si kplɔ wo nɔewo ɖo me la, míaƒo nu tso nyati aɖewo siwo nɔ te ɖe woƒe nunɔamesiwo dzi ŋu.

### Nukae nye Hash Function?

Hash Functions xɔa input si didi ɖesiaɖe eye wòwɔa output si ƒe didime woɖo ɖi.

- **Gbedasi si woatsɔ awɔ hash** = Nyawo tsɔtsɔ de eme 
- **Algorithm si wozãna** = Hash Function 
- **Emetsonu si do tso eme** = Hash Value 


![Hash Dɔwɔwɔ ƒe nɔnɔmetata](https://pbs.twimg.com/media/Fn_NkFHXgAEtgse.png)

### Wò ŋutɔ te ekpɔ!

Mina míase nu gɔme le asi me to dɔwɔnu sia zazã me! 
Ŋlɔ nuŋɔŋlɔ ɖesiaɖe si nèdi be nàkpɔ emetsonu si ƒe didime woɖo ɖi. Lé ŋku ɖe alesi emetsonua toa vovo le hashing algorithm vovovoawo nu.

**Tee kpɔ:** https://cryptii.com/pipes/hash-function

---

### Cryptographic Hash Dɔwɔnawo ƒe Nɔnɔmewo

Ele be **nɔnɔme 3 siawo nanɔ Cryptographic Hash Functions si**:

1. **Mɔ ɖeka** - Ele be wòanye nusi mate ŋu adzɔ o be woatrɔ hash dɔwɔwɔ 
2. **Collision Resistant** - Mele be input vovovo eve nawɔ hash ɖe output ɖeka dzi o 
3. **Deterministic** - Le nyawo tsɔtsɔ de eme ɖesiaɖe gome la, ele be hash dɔwɔwɔ nana emetsonu ɖeka ɣesiaɣi

---

### Hash ƒe Dɔwɔwɔ Siwo Bɔ

Hash Functions ƒe hatsotso vovovowo li. Kpɔɖeŋu aɖewo:

- Dedienɔnɔ ƒe Hashing Algorithm (**SHA-3**) . 
- Gbedasɛ Digest ƒe Dɔwɔɖoɖo 5 (**MD5**) . 
- **BLAKE2b** - Wozãnɛ le Zcash safui ƒe dzɔtsoƒe me

**BLAKE2 ƒe ŋgɔdonya si Zooko ŋlɔ**: https://www.zfnd.org/blog/blake2/

---

### Hash Dɔwɔnawo Zazã le Xexeame Ŋutɔŋutɔ

#### 1. Integrity Hashing (Nyatakakawo ƒe Fɔmaɖimaɖi Me Dzodzro) .
Nyatakakawo ƒe blibonyenye me dzodzro nye "Integrity Hashing" ƒe kpɔɖeŋu. Wozãa wo tsɔ wɔa checksums le data files dzi eye wonaa kakaɖedzi be wosɔ na ezãla.

![Integrity Hashing ƒe kpɔɖeŋu](https://pbs.twimg.com/media/Fn_Or0MWIAI6sgx.png)

#### 2. Merkle Atiwo (Hash Atiwo) .
**hash tree** alo **Merkle tree** nye alɔwo kple aŋgba ƒe node siwo wotsɔ data block ƒe cryptographic hash de dzesii.

![Merkle Ati ƒe nɔnɔmetata](https://pbs.twimg.com/media/Fn_O7ndWIAY5PA-.jpg)

Merkle atiwo nye **cryptographic commitment scheme** ƒe kpɔɖeŋu. Wobua ati ƒe Ke be enye ɖokuitsɔtsɔna eye aŋgba ƒe ƒuƒoƒo siwo woɖo kpe edzi be wonye ɖokuitsɔtsɔna gbãtɔ ƒe akpa aɖe.

Woɖoa kpe nyatakaka siwo wodzra ɖo alo esiwo wotsɔ yi P2P networkwo dzi dzi, eye wokpɔa egbɔ be wometrɔ nyatakaka siwo woxɔ tso hatiwo gbɔ o.

#### 3. De dzesi Ðokuitsɔtsɔna Ati le Zcash me
Le Zcash **Sapling** & **Orchard** shielded pools me la, wozãa **Note Commitment Tree** tsɔ ɖoa ​​kpe edzi be asitsatsawo sɔ ɖe nukpɔsusu ɖeka nu esime woɣla ame si ɖoe ɖa, amesi xɔe & ga home siwo wozã bliboe.

#### 4. Asidede Hash (Bitcoin ƒe atsyã ƒe mɔxenuwo) .
**SHA256** nye "Signature hash" ƒe kpɔɖeŋu si wozãna tsɔ zia block ɖesiaɖe ƒe tɔtrɔmanɔmanɔ dzi le Bitcoin kɔsɔkɔsɔa me. Tomenukulawo zãa hash si le block si do ŋgɔ me + A hash si nye asitsatsa siwo katã le block si li fifia me (hashMerkleRoot) + Timestamp + random value / network difficulty na block yeyewo.

![SHA256 ƒe block ƒe nɔnɔmetata](https://pbs.twimg.com/media/Fn_PaVZXoAApHPf.jpg)

#### 5. Equihash (Zcash Tomenukuƒe) .
**Equihash** nye hashing algorithm si wozãna le Zcash tomenukuku me. Wozãnɛ hã le networkwo abe Komodo & Horizen ene.

**Zcash Blog gbãtɔ le Equihash**: https://electriccoin.co/blog/equihash/

---

### Nuxexlẽ Bubuwo

Be woatu gɔmesese geɖe wu ɖo le hash dɔwɔwɔ ƒomevi vovovoawo kple wo zazã siwo do ƒome kplii ŋu la, esia nye dɔwɔnu nyui aɖe ŋutɔ: 
https://en.wikipedia.org/wiki/Hash_function

---

**Ka si ZecHub (@ZecHub) ŋlɔ** 
X ka gbãtɔ: https://x.com/ZecHub/status/1621240109663227906  

---

*Woƒo axa sia nu ƒu tso Zero yi Zero Sidzedze ƒe ka gbãtɔ me na ZecHub wiki.*
