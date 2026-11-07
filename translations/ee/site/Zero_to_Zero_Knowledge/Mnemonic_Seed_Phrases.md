# Zero to Zero Knowledge: Nunya ƒe Gadzraɖoɖi Nyawo

**Series:** Zero to Zero Knowledge

Nunya ƒe gadzraɖoɖi nyawo [Mnemonic seed phrases] doa alɔ na cryptocurrency ƒe akpa vevi aɖe — **ɖokui ƒe asikplɔwɔwɔ [self-custody]**.  
Egbe míesrɔ ale si wogbea gadzraɖoɖi nya ɖe eme eye wozae le gakotoku [wallet]wo me.

---

## Nukae Nye Nunya ƒe Gadzraɖoɖi Nyawo?

Wode gagbɔɖoɖi nyawo [Recovery phrases] ƒe gɔme le **BIP-39** ƒe ɖoɖowɔwɔ nu, si nye gagbɔɖoɖi nya ƒome si wozã wu egbe.

Gagbɔɖoɖi nyawo ƒe wɔwɔ dzea egɔme kple **dzodzro [randomness]** ƒe dzidzenu. Entropy geɖe fia dedienyenye geɖe. Wobu be **128 bits** ƒe entropy de na zãlawo ƒe akpa gãtɔ.

![Seed phrase concept](/content-images/FooM3qWWACgrwzn-f222c4081f.webp)

Le entropy gɔmedzeƒe ƒe didime nu la, gagbɔɖoɖi nya la anɔ nya **12 va se ɖe 24** ƒe didime.

---

## Ɖoɖoɖo Kple Ɖoɖoɖo: Ale Si Wogbea Nya 12 ƒe Gadzraɖoɖi Nya

### 1. Gbe Entropy
Míedzea egɔme kple entropy **128 bits** ƒe gbegbe.

### 2. Tsɔ Checksum Kpee
Míetsɔ **SHA256** hea entropy la. Hash sia ƒe bits gbãtɔ aɖewo zu checksum la.  
Esia na dzesi si nye tɔxɛ na míawo ƒe entropy.

![Entropy + Checksum diagram](/content-images/FooNoOEXgAAu-g6-613238fa7e.webp)

### 3. Ma Ƒe Akpa 11-bitwo
Bits 132 blibo la (entropy 128 kple checksum 4) mae ɖe akpa 11 bits ƒe akpa-akpa me.

### 4. Ɖe Nya Ƒe Ƒomea Ɖo
11-bit ƒe ƒoƒo siawo dometɔ ɖe sia ɖe trɔna zu decimal xexlẽme (0-2047).  
BIP-39 ƒe nya ƒomeawo me nya **2048** koe le tututu (English, Spanish, Chinese, kple bubuawo).

Wozã xexlẽme siawo be woakpɔ nya si sɔ kple wo le nya ƒomea me.

![Word mapping example](/content-images/FooN9rfXEBoQuU2-d11331fc0a.webp)

**Nɔnɔmetata:** Fifia míexɔ gagbɔɖoɖi nya 12 si wɔ dzodzro eye amegbetɔ ate ŋu axlẽ!

---

## Tso Gagbɔɖoɖi Nya Me -> Seed -> Fexexe ƒe Gaɖoƒe Ƒe Dzesiawo

Kple gagbɔɖoɖi nya la, gakotoku atee agbe safuiwo be woawɔ fexexe [payment] ƒe gaɖoƒe ƒe dzesiwo [addresses] kple gakotoku ƒe akonta vovovowo.

Safui siwo wogbe la nye **deterministic** — gbedodonu ma ke ɣeaɣi kpɔa dzenu ma ke.

### Seed Ƒe Gbebetata
Wokpɔ gakotoku ƒe seed la tso nunya ƒe nya la me kple **Key Derivation Function (KDF)**:

- Le **Bitcoin** me: PBKDF2  
- Le **Zcash** me: Blake2b-256/512

Esia doa **64-byte (512-bit)** ƒe seed.

![Seed to master keys](/content-images/FooOuumXEAgcBm1-dc7c66b84a.webp)

### Afi Ƒe Safuiwo
Womaa seed la ɖe 32-byte ƒe ƒoƒo eve me:
- **Afi Ƒe Gazazãsafui [Master Spending Key]**
- **Afi Ƒe Ɖoɖonu ƒe Kode [Master Chain Code]**

Wozã esiawo le **Hierarchical Deterministic (HD) Wallets** me be woakpɔ vi safuiwo.

---

## Zcash Ƒe Tɔxɛwo (ZIP-32)

Le Zcash me la, woate ŋu ade **nukpɔsafui [viewing] ƒe mɔɖeɖe** alo **gazazãsafui [spending] ƒe mɔɖeɖe** ɖe asi ɖeɖe na ati ƒe akpa suewo me tɔwo, eye esia magblẽ afi ƒe seed la o.

**ZIP-32** ɖe hierarchical deterministic safui ƒe gbebetata ƒe ɖoɖowɔwɔ si wotrɔ be wanasɔ kple Zcash ƒe ɣaɣla [privacy] ƒe tɔxɛwo gɔme.

Tso **Expanded Spending Key** me la, míekpɔ:
- Full Viewing Key
- Incoming Viewing Key
- Fexexe ƒe gaɖoƒe ƒe dzesiwo ƒe ƒoƒo

Safui ƒe gbebetata ƒome vovovowo wɔa gota ƒe gaɖoƒe ƒe dzesiwo siwo dze be woana na dɔlilawo le ɣaɣla [shielded] ƒe gaƒuƒoƒo [pools]wo katã me (Sapling kple Orchard).

![Zcash key derivation hierarchy](/content-images/FooPKd4XEBUQhJ6-af133c01bf.webp)

Zcash hã dea **emexɔ ƒe gaɖoƒe ƒe dzesiwo** alɔ na gakotoku ƒe dɔwɔwɔwo abe Auto-Shielding ene.

---

## Nuƒoƒowo

- [ZIP-32: Ɣaɣla ƒe Hierarchical Deterministic Gakotokuwo](https://zips.z.cash/zip-0032)  
- [Zcash Protocol Ƒe Ɖoɖowɔwɔ (NU5)](https://zips.z.cash/protocol/protocol.pdf)  
- [Ɣaɣla-le-gɔmedze me gakotokuwo ƒe nukpɔkpɔ](https://zechub.wiki)

---

**Ɖeɖefɔ ƒe Dzetugbe Tso ZecHub (@ZecHub) Gbɔ**  
https://x.com/ZecHub/status/1624125037945946145

---

*Wotsɔ ɖeɖefɔ ƒe Zero to Zero Knowledge dzetugbe la ƒe nya wɔ axa sia na ZecHub wiki la.*
