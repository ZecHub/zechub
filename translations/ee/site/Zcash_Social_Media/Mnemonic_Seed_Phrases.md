# Sidzedze Zero va ɖo Zero: Nuku ƒe Nyagbe Siwo Wotsɔna Ŋkuɖoa Nui

**Series:** Zero vaseɖe Zero Sidzedze

Mnemonic nuku nyagbewo ɖo kpe cryptocurrency ƒe akpa vevitɔwo dometɔ ɖeka dzi - **ɖokuidzikpɔkpɔ**. 
Egbea míesrɔ̃a alesi wowɔa nuku ƒe nyagbe aɖe eye wozãnɛ le gakotokuwo me.

---

## Nukae nye Nuku ƒe Nyagbe Siwo Wotsɔna Ŋkuɖoa Nui?

Woɖea hayahaya ƒe nyagbewo gɔme to **BIP-39** ƒe nɔnɔmetata si nye hayahaya ƒe nyagbe ƒomevi si wozãna wu egbea dzi.

Nyagbe siwo woatsɔ agbugbɔ axɔe ƒe wɔwɔ dzea egɔme kple **randomness** wɔwɔ. Entropy geɖe wu fia be dedienɔnɔ si lolo wu. Wobua entropy ƒe **128 bits** be esɔ gbɔ na ezãla akpa gãtɔ.

![Nuku ƒe nyagbe ƒe nukpɔsusu](https://pbs.twimg.com/media/FooM3qWWACgrwzn.jpg)

Le entropy gbãtɔ ƒe didime nu la, nyagbɔgblɔ si woatsɔ agbugbɔ axɔe la didi **nya 12 va ɖo 24**.

---

## Afɔɖeɖe ɖesiaɖe: Alesi Wowɔa Nuku ƒe Nyagbe si me Nya 12 Le

### 1. Dzra Entropy
Míedzea egɔme kple **128 bits** ƒe entropy wɔwɔ.

### 2. Tsɔ Checksum kpee
Míewɔa hash na entropy la to **SHA256** zazã me. Hash sia ƒe akpa ʋee gbãtɔwo va zua checksum. 
Esia naa asibidɛ tɔxɛ aɖe mí na míaƒe entropy.

![Entropy + Checksum ƒe nɔnɔmetata](https://pbs.twimg.com/media/FooNoOEXgAAu-g6.png)

### 3. Mae ɖe akpa 11-bit me
Woma bit 132 (entropy 128 + checksum 4) katã ɖe akpa siwo nye bit 11 me.

### 4. Anyigbatata yi Nyawo ƒe Ŋkɔwo ƒe Ŋkɔwo dzi
Wotrɔa bit 11 ƒe ɖoɖo ɖesiaɖe wòzua xexlẽdzesi ewolia (0-2047). 
BIP-39 nyawo ƒe xexlẽdzesiwo me **nya 2048 pɛpɛpɛ** (Eŋlisigbe, Spaingbe, Chinagbe, kple bubuawo).

Wozãa xexlẽdzesi siawo tsɔ dia nya si sɔ ɖe enu le nyawo ƒe xexlẽdzesiwo me.

![Nyawo ƒe nɔnɔmetata ƒe kpɔɖeŋu](https://pbs.twimg.com/media/FooN9rfXEBoQuU2.png)

**Emetsonu:** Nya 12 gbugbɔgawɔ ƒe nyagbɔgblɔ si le dedie, si amegbetɔ ate ŋu axlẽ la le mía si fifia!

---

## Tso Gbugbɔgaxɔ ƒe Nyagbe -> Nuku -> Fexexe ƒe Adrɛswo

Ne gakotoku zã nyagbɔgblɔ si nye be woagbugbɔ ga axɔ la, ate ŋu awɔ safuiwo atsɔ awɔ fexexe ƒe adrɛswo kple gakotoku ƒe akɔntabubu vovovowo.

Safui siwo wowɔ la nye **deterministic** - input ɖeka ma ke wɔa output ɖeka ɣesiaɣi.

### Nukuwo Dzidzime
Woɖe gakotoku ƒe nukua tso ŋkuɖodzinyagbe me to **Key Derivation Function (KDF)** zazã me:

- Le **Bitcoin** me la: PBKDF2 
- Le **Zcash** me la: Blake2b-256/512

Esia naa **64-byte (512-bit)** nuku.

![Nuku be woabi ɖe safuiwo me](https://pbs.twimg.com/media/FooOuumXEAgcBm1.jpg)

### Aƒetɔ Safuiwo
Woma nukua ɖe ɖoɖo eve siwo ƒe didime nye byte 32 me:
- **Aƒetɔ Gazazã ƒe Safui**
- **Aƒetɔ Kɔsɔkɔsɔ ƒe Sedede**

Wozãa esiawo le **Hierarchical Deterministic (HD) Walets** me hena ɖeviwo ƒe safui ɖeɖe.

---

## Zcash ƒe Nɔnɔme Tɔxɛwo (ZIP-32) .

Le Zcash me la, woateŋu atsɔ **kpɔ ŋusẽ** alo **zazã ƒe ŋusẽ** ade asi na ame bubuwo le wo ɖokui si na ati suewo evɔ womagblẽ nu le nuku gã la ŋu o.

**ZIP-32** ɖe hierarchical deterministic key generation standard si wotrɔ asi le na Zcash ƒe adzamenyawo ƒe nɔnɔmewo gɔme.

Tso **Gazazã ƒe Safui si Wokeke** me la, míekpɔa:
- Full Viewing Key
- Incoming Viewing Key
- Fexexe ƒe adrɛswo ƒe ɖoɖo

Derivation mɔnu vovovowo wɔa gotagome adrɛs siwo sɔ na nunana na amedɔdɔwo to shielded pools (Sapling & Orchard).

![Zcash safui ƒe dzɔtsoƒe ƒe ɖoɖo](https://pbs.twimg.com/media/FooPKd4XEBUQhJ6.jpg)

Zcash hã doa alɔ **adrɛs ememetɔwo** na gakotoku ƒe dɔwɔwɔwo abe Auto-Shielding ene.

---

## Nunɔamesiwo

- [ZIP-32: Gakotoku Siwo Woɖo Ðe Ðoɖo Nu si Woɖo Ðe Ðoɖo Nu](https://zips.z.cash/zip-0032)  
- [Zcash ƒe Ðoɖowɔɖi ƒe Nyatakaka (NU5) .](https://zips.z.cash/protocol/protocol.pdf)  
- [Gakotoku siwo wokpɔ ta na le gɔmedzedzea me ƒe wɔwɔfia](https://zechub.wiki)

---

**Ka gbãtɔ si ZecHub (@ZecHub) ŋlɔ** 
https://x.com/ZecHub/status/1624125037945946145

---

*Woƒo axa sia nu ƒu tso Zero yi Zero Sidzedze ƒe ka gbãtɔ me na ZecHub wiki.*
